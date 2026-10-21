import { Course, StudyUnit, StudyTopic, PastExamQuestionItem } from '../types';
import { getPastQuestionsForCourse, getPastQuestionsForUnit, isQuestionForCourse } from './storage';

export type VoiceLearningMode = 'learn-understand' | 'past-questions-revision' | 'combined';

export type AnswerTimingMode = 'immediate' | 'pause-3s' | 'pause-5s' | 'manual';

export interface VoicePlaylistItem {
  id: string;
  courseId: string;
  courseCode: string;
  unitId: string;
  unitTitle: string;
  contentType: 'textbook-section' | 'past-question' | 'supplied-answer' | 'textbook-explanation' | 'system-cue';
  title: string;
  subtitle?: string;
  textToRead: string;
  rawItem?: any;
  questionNumber?: number | string;
  sourceDocument?: string;
  isAnswer?: boolean;
  marks?: number;
  session?: string;
}

export interface VoicePlaybackState {
  status: 'idle' | 'playing' | 'paused' | 'stopped';
  currentTrackIndex: number;
  totalTracks: number;
  currentItem: VoicePlaylistItem | null;
  playbackSpeed: number;
  mode: VoiceLearningMode;
  answerTiming: AnswerTimingMode;
  isAnswerRevealed: boolean;
  isRepeatingCurrent: boolean;
  error: string | null;
}

/**
 * Split long text into manageable sentences (< 180 chars) to prevent
 * browser SpeechSynthesis 15-second cutoff bugs on Chrome / Safari.
 */
export function splitTextIntoSpeechChunks(text: string): string[] {
  if (!text) return [];
  // Clean markdown and unwanted formatting
  const cleaned = text
    .replace(/[#*_`~>\[\]]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  // Match sentences
  const sentenceRegex = /[^.!?]+[.!?]+(\s|$)|[^.!?]+$/g;
  const rawSentences = cleaned.match(sentenceRegex) || [cleaned];

  const chunks: string[] = [];
  let current = '';

  for (const sentence of rawSentences) {
    const s = sentence.trim();
    if (!s) continue;
    if ((current + ' ' + s).length < 160) {
      current = current ? current + ' ' + s : s;
    } else {
      if (current) chunks.push(current);
      if (s.length > 160) {
        // Split further on commas or semicolons
        const clauses = s.split(/([,;:\-–])\s*/);
        let clauseAccum = '';
        for (const c of clauses) {
          if ((clauseAccum + ' ' + c).length < 150) {
            clauseAccum = clauseAccum ? clauseAccum + ' ' + c : c;
          } else {
            if (clauseAccum) chunks.push(clauseAccum);
            clauseAccum = c;
          }
        }
        if (clauseAccum) chunks.push(clauseAccum);
        current = '';
      } else {
        current = s;
      }
    }
  }
  if (current) chunks.push(current);

  return chunks.length > 0 ? chunks : [cleaned];
}

class VoiceLearningEngine {
  private playlist: VoicePlaylistItem[] = [];
  private currentIndex: number = 0;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private currentChunkIndex: number = 0;
  private currentChunks: string[] = [];
  private rate: number = 1.0;
  private mode: VoiceLearningMode = 'learn-understand';
  private answerTiming: AnswerTimingMode = 'pause-3s';
  private isRepeatingCurrent: boolean = false;
  private isAnswerRevealedManually: boolean = false;
  private pauseTimer: any = null;
  private selectedVoice: SpeechSynthesisVoice | null = null;
  private audioCtx: AudioContext | null = null;
  private activeUtterances: Set<SpeechSynthesisUtterance> = new Set();
  private watchdogTimer: any = null;
  private keepAliveTimer: any = null;

  private stateChangeListeners: Array<(state: VoicePlaybackState) => void> = [];

  constructor() {
    if (typeof window !== 'undefined') {
      if ('speechSynthesis' in window) {
        this.initVoices();
        if (window.speechSynthesis.onvoiceschanged !== undefined) {
          window.speechSynthesis.onvoiceschanged = () => this.initVoices();
        }
      }

      // Proactively unlock iPhone audio engine on user interaction
      const unlockAudio = () => {
        this.unlockIOSAudio();
      };
      window.addEventListener('touchstart', unlockAudio, { once: true, passive: true });
      window.addEventListener('touchend', unlockAudio, { once: true, passive: true });
      window.addEventListener('click', unlockAudio, { once: true, passive: true });

      // Automatically re-awaken audio session when app returns to foreground
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
          if (this.audioCtx && this.audioCtx.state === 'suspended') {
            this.audioCtx.resume();
          }
          if (typeof window !== 'undefined' && 'speechSynthesis' in window && window.speechSynthesis.paused) {
            window.speechSynthesis.resume();
          }
        }
      });
    }
  }

  /**
   * On iOS Safari / iPhone WebKit, unlocks the browser audio engine and keeps
   * the audio session active between chunks and inter-question pauses.
   */
  private unlockIOSAudio() {
    try {
      if (typeof window !== 'undefined') {
        const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioCtxClass && !this.audioCtx) {
          this.audioCtx = new AudioCtxClass();
          // Create an inaudible buffer source loop to maintain background audio capability on iPhone
          const silentBuffer = this.audioCtx.createBuffer(1, this.audioCtx.sampleRate, this.audioCtx.sampleRate);
          const source = this.audioCtx.createBufferSource();
          source.buffer = silentBuffer;
          source.loop = true;
          const gainNode = this.audioCtx.createGain();
          gainNode.gain.value = 0.0001; // Inaudible
          source.connect(gainNode);
          gainNode.connect(this.audioCtx.destination);
          source.start(0);
        }
        if (this.audioCtx && this.audioCtx.state === 'suspended') {
          this.audioCtx.resume();
        }
      }
    } catch {
      // ignore
    }
  }

  private initVoices() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    const voices = window.speechSynthesis.getVoices();
    if (!voices || voices.length === 0) return;

    // Prioritize high-fidelity natural voices on iOS / Safari (Samantha, Karen, Daniel, Moira, Alex, Google, Natural)
    const naturalVoice =
      voices.find((v) => v.lang.startsWith('en') && (v.name.includes('Enhanced') || v.name.includes('Premium') || v.name.includes('Natural'))) ||
      voices.find((v) => v.lang.startsWith('en') && (v.name.includes('Samantha') || v.name.includes('Daniel') || v.name.includes('Karen') || v.name.includes('Alex') || v.name.includes('Moira') || v.name.includes('Google'))) ||
      voices.find((v) => v.lang.startsWith('en-US')) ||
      voices.find((v) => v.lang.startsWith('en-GB')) ||
      voices.find((v) => v.lang.startsWith('en-NG')) ||
      voices.find((v) => v.lang.startsWith('en'));

    this.selectedVoice = naturalVoice || voices[0] || null;
  }

  public subscribe(listener: (state: VoicePlaybackState) => void): () => void {
    this.stateChangeListeners.push(listener);
    listener(this.getState());
    return () => {
      this.stateChangeListeners = this.stateChangeListeners.filter((l) => l !== listener);
    };
  }

  private notifyState(errorMsg: string | null = null) {
    const state = this.getState(errorMsg);
    this.stateChangeListeners.forEach((listener) => {
      try {
        listener(state);
      } catch (err) {
        console.error('Error in voice learning state listener:', err);
      }
    });
  }

  public getState(errorMsg: string | null = null): VoicePlaybackState {
    const hasSynth = typeof window !== 'undefined' && 'speechSynthesis' in window;
    let status: 'idle' | 'playing' | 'paused' | 'stopped' = 'idle';

    if (hasSynth) {
      if (window.speechSynthesis.speaking) {
        status = window.speechSynthesis.paused ? 'paused' : 'playing';
      } else if (this.pauseTimer) {
        status = 'playing'; // In inter-item pause countdown
      } else if (this.currentIndex > 0 && this.currentIndex < this.playlist.length) {
        status = 'paused';
      } else {
        status = 'idle';
      }
    }

    const currentItem = this.playlist[this.currentIndex] || null;

    return {
      status,
      currentTrackIndex: this.currentIndex,
      totalTracks: this.playlist.length,
      currentItem,
      playbackSpeed: this.rate,
      mode: this.mode,
      answerTiming: this.answerTiming,
      isAnswerRevealed: this.isAnswerRevealedManually || currentItem?.isAnswer === true,
      isRepeatingCurrent: this.isRepeatingCurrent,
      error: errorMsg,
    };
  }

  public setPlaylist(items: VoicePlaylistItem[], startIndex: number = 0, autoPlay: boolean = true) {
    this.stop();
    this.playlist = items;
    this.currentIndex = Math.max(0, Math.min(startIndex, items.length - 1));
    this.isAnswerRevealedManually = false;

    if (autoPlay && items.length > 0) {
      this.playCurrentTrack();
    } else {
      this.notifyState();
    }
  }

  public setMode(mode: VoiceLearningMode) {
    this.mode = mode;
    this.notifyState();
  }

  public setAnswerTiming(timing: AnswerTimingMode) {
    this.answerTiming = timing;
    this.notifyState();
  }

  public setRate(speed: number) {
    this.rate = Math.max(0.5, Math.min(2.5, speed));
    if (this.currentUtterance && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      if (window.speechSynthesis.speaking) {
        // Restart current chunk at new rate
        this.stopSpeech();
        this.speakCurrentChunk();
      }
    }
    this.notifyState();
  }

  public toggleRepeat() {
    this.isRepeatingCurrent = !this.isRepeatingCurrent;
    this.notifyState();
  }

  public revealAnswerNow() {
    this.isAnswerRevealedManually = true;
    if (this.pauseTimer) {
      clearTimeout(this.pauseTimer);
      this.pauseTimer = null;
    }
    // If the next item in playlist is the answer to this question, advance directly to it
    const nextItem = this.playlist[this.currentIndex + 1];
    if (nextItem && nextItem.isAnswer) {
      this.currentIndex++;
      this.playCurrentTrack();
    } else {
      this.notifyState();
    }
  }

  private stopSpeech() {
    if (this.pauseTimer) {
      clearTimeout(this.pauseTimer);
      this.pauseTimer = null;
    }
    if (this.keepAliveTimer) {
      clearInterval(this.keepAliveTimer);
      this.keepAliveTimer = null;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch (e) {
        // ignore
      }
    }
    this.currentUtterance = null;
  }

  public play() {
    if (this.playlist.length === 0) return;
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
        this.notifyState();
        return;
      }
    }
    this.playCurrentTrack();
  }

  public pause() {
    if (this.pauseTimer) {
      clearTimeout(this.pauseTimer);
      this.pauseTimer = null;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.pause();
    }
    this.notifyState();
  }

  public resume() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      } else {
        this.speakCurrentChunk();
      }
    }
    this.notifyState();
  }

  public stop() {
    this.stopSpeech();
    this.currentIndex = 0;
    this.currentChunkIndex = 0;
    this.currentChunks = [];
    this.notifyState();
  }

  public next() {
    if (this.currentIndex < this.playlist.length - 1) {
      this.stopSpeech();
      this.currentIndex++;
      this.isAnswerRevealedManually = false;
      this.playCurrentTrack();
    } else {
      this.stop();
    }
  }

  public previous() {
    if (this.currentIndex > 0) {
      this.stopSpeech();
      this.currentIndex--;
      this.isAnswerRevealedManually = false;
      this.playCurrentTrack();
    } else {
      this.playCurrentTrack();
    }
  }

  public jumpToTrack(index: number) {
    if (index >= 0 && index < this.playlist.length) {
      this.stopSpeech();
      this.currentIndex = index;
      this.isAnswerRevealedManually = false;
      this.playCurrentTrack();
    }
  }

  private playCurrentTrack() {
    this.stopSpeech();
    const item = this.playlist[this.currentIndex];
    if (!item) {
      this.notifyState();
      return;
    }

    this.currentChunks = splitTextIntoSpeechChunks(item.textToRead);
    this.currentChunkIndex = 0;
    this.speakCurrentChunk();
  }

  private updateMediaSession() {
    if (typeof navigator !== 'undefined' && 'mediaSession' in navigator) {
      const item = this.playlist[this.currentIndex];
      if (item) {
        navigator.mediaSession.metadata = new MediaMetadata({
          title: item.title,
          artist: `${item.courseCode} • StudyVault AI`,
          album: item.unitTitle,
        });

        navigator.mediaSession.setActionHandler('play', () => this.play());
        navigator.mediaSession.setActionHandler('pause', () => this.pause());
        navigator.mediaSession.setActionHandler('previoustrack', () => this.previous());
        navigator.mediaSession.setActionHandler('nexttrack', () => this.next());
      }
    }
  }

  private speakCurrentChunk() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      this.notifyState('Speech synthesis is not supported on this browser or platform.');
      return;
    }

    if (this.currentChunkIndex >= this.currentChunks.length) {
      // Finished all chunks for this track
      this.handleTrackEnded();
      return;
    }

    const chunk = this.currentChunks[this.currentChunkIndex];
    if (!chunk || !chunk.trim()) {
      this.currentChunkIndex++;
      this.speakCurrentChunk();
      return;
    }

    // Unlock iPhone iOS audio session
    this.unlockIOSAudio();

    const utterance = new SpeechSynthesisUtterance(chunk);
    utterance.rate = this.rate;
    utterance.pitch = 1.0;
    if (this.selectedVoice) {
      utterance.voice = this.selectedVoice;
    }

    // Prevent WebKit Garbage Collection bug on iOS Safari
    this.activeUtterances.add(utterance);

    const cleanup = () => {
      this.activeUtterances.delete(utterance);
      if (this.watchdogTimer) {
        clearTimeout(this.watchdogTimer);
        this.watchdogTimer = null;
      }
      if (this.keepAliveTimer) {
        clearInterval(this.keepAliveTimer);
        this.keepAliveTimer = null;
      }
    };

    utterance.onend = () => {
      cleanup();
      this.currentChunkIndex++;
      this.speakCurrentChunk();
    };

    utterance.onerror = (e) => {
      cleanup();
      console.warn('SpeechSynthesis error:', e);
      if (e.error !== 'canceled' && e.error !== 'interrupted') {
        this.currentChunkIndex++;
        this.speakCurrentChunk();
      }
    };

    // Watchdog timer in case iOS WebKit misses onend event
    const estimatedDurationMs = Math.max(4000, (chunk.length / 12) * 1000 + 4000);
    this.watchdogTimer = setTimeout(() => {
      if (this.currentUtterance === utterance && typeof window !== 'undefined' && 'speechSynthesis' in window) {
        if (!window.speechSynthesis.speaking) {
          cleanup();
          this.currentChunkIndex++;
          this.speakCurrentChunk();
        } else {
          // If paused or stalled on iPhone, pulse resume
          window.speechSynthesis.resume();
        }
      }
    }, estimatedDurationMs);

    // Keepalive pulse for WebKit 15-second speech cutoff bug on iOS Safari
    if (this.keepAliveTimer) {
      clearInterval(this.keepAliveTimer);
      this.keepAliveTimer = null;
    }
    this.keepAliveTimer = setInterval(() => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
          window.speechSynthesis.pause();
          window.speechSynthesis.resume();
        }
      }
    }, 10000);

    this.currentUtterance = utterance;
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    }
    window.speechSynthesis.speak(utterance);
    this.updateMediaSession();
    this.notifyState();
  }

  private handleTrackEnded() {
    const currentItem = this.playlist[this.currentIndex];

    // If repeating current item
    if (this.isRepeatingCurrent) {
      this.playCurrentTrack();
      return;
    }

    // Check if next item is an answer and we need a pause before reading it
    const nextItem = this.playlist[this.currentIndex + 1];
    if (nextItem && nextItem.isAnswer && currentItem && !currentItem.isAnswer) {
      if (this.answerTiming === 'manual' && !this.isAnswerRevealedManually) {
        // Wait for user to explicitly request the answer
        this.notifyState();
        return;
      } else if (this.answerTiming === 'pause-3s' || this.answerTiming === 'pause-5s') {
        const delayMs = this.answerTiming === 'pause-5s' ? 5000 : 3000;
        this.notifyState();
        this.pauseTimer = setTimeout(() => {
          this.pauseTimer = null;
          this.next();
        }, delayMs);
        return;
      }
    }

    // Otherwise continue to next track after standard 400ms cadence
    if (this.currentIndex < this.playlist.length - 1) {
      this.pauseTimer = setTimeout(() => {
        this.pauseTimer = null;
        this.next();
      }, 400);
    } else {
      // Playlist finished
      this.notifyState();
    }
  }
}

export const voiceLearningEngine = new VoiceLearningEngine();

// ==========================================
// PLAYLIST GENERATORS FOR MODES A, B, AND COMBINED
// ==========================================

/**
 * MODE A: LEARN & UNDERSTAND (Verbatim Official Textbook)
 * Reads unit title, overview, learning objectives, and all topic content verbatim.
 */
export function buildUnitLearnQueue(course: Course, unit: StudyUnit): VoicePlaylistItem[] {
  const items: VoicePlaylistItem[] = [];

  // Unit Intro
  items.push({
    id: `unit-intro-${unit.id}`,
    courseId: course.id,
    courseCode: course.code,
    unitId: unit.id,
    unitTitle: unit.title,
    contentType: 'textbook-section',
    title: `${course.code}: ${unit.title}`,
    subtitle: 'Unit Introduction & Overview',
    textToRead: `Now listening to ${course.code}, ${course.title}. ${unit.title}. ${unit.overview || ''}`,
  });

  // Learning Objectives
  const objectives = unit.learningObjectives || unit.objectives || [];
  if (objectives.length > 0) {
    const objectivesText = objectives
      .map((obj: string, i: number) => `Objective ${i + 1}: ${obj}.`)
      .join(' ');
    items.push({
      id: `unit-objectives-${unit.id}`,
      courseId: course.id,
      courseCode: course.code,
      unitId: unit.id,
      unitTitle: unit.title,
      contentType: 'textbook-section',
      title: 'Learning Objectives',
      subtitle: `${objectives.length} key competencies`,
      textToRead: `At the end of this unit, you should be able to: ${objectivesText}`,
    });
  }

  // Topics
  unit.topics.forEach((topic: StudyTopic, index: number) => {
    // Topic Header & Content
    items.push({
      id: `topic-${topic.id}`,
      courseId: course.id,
      courseCode: course.code,
      unitId: unit.id,
      unitTitle: unit.title,
      contentType: 'textbook-section',
      title: topic.title,
      subtitle: `Topic ${index + 1} of ${unit.topics.length}`,
      textToRead: `Topic ${index + 1}: ${topic.title}. ${topic.content}`,
    });

    // Authoritative Definitions
    if (topic.textbookDefinitions && topic.textbookDefinitions.length > 0) {
      const defsText = topic.textbookDefinitions
        .map(
          (d) =>
            `${d.term}: ${d.verbatimDefinition || d.definition}. Author citation: ${d.authorCitation || d.sourceAuthor || 'Standard Textbook Citation'}.`
        )
        .join(' ');
      items.push({
        id: `topic-defs-${topic.id}`,
        courseId: course.id,
        courseCode: course.code,
        unitId: unit.id,
        unitTitle: unit.title,
        contentType: 'textbook-section',
        title: `${topic.title}: Key Definitions`,
        subtitle: 'Verbatim Authoritative Terms',
        textToRead: `Key terminology and citations for ${topic.title}. ${defsText}`,
      });
    }

    // Formulas & Calculations
    if (topic.formulas && topic.formulas.length > 0) {
      const formulaText = topic.formulas
        .map(
          (f) =>
            `Formula for ${f.name}: ${f.formulaDisplay}. Purpose: ${f.contextAndPurpose}.`
        )
        .join(' ');
      items.push({
        id: `topic-formulas-${topic.id}`,
        courseId: course.id,
        courseCode: course.code,
        unitId: unit.id,
        unitTitle: unit.title,
        contentType: 'textbook-section',
        title: `${topic.title}: Formulas & Rules`,
        subtitle: 'Examinable Calculations',
        textToRead: `Formulas and quantitative rules for ${topic.title}. ${formulaText}`,
      });
    }

    // Key Summary Points
    if (topic.summaryPoints && topic.summaryPoints.length > 0) {
      const summaryText = topic.summaryPoints
        .map((p: string, i: number) => `Point ${i + 1}: ${p}.`)
        .join(' ');
      items.push({
        id: `topic-summary-${topic.id}`,
        courseId: course.id,
        courseCode: course.code,
        unitId: unit.id,
        unitTitle: unit.title,
        contentType: 'textbook-section',
        title: `${topic.title}: Key Takeaways`,
        subtitle: 'Examiner Focus Points',
        textToRead: `Key concepts to remember for ${topic.title}: ${summaryText}`,
      });
    }
  });

  return items;
}

/**
 * MODE B: PAST QUESTIONS & ANSWERS REVISION
 * Reads authentic past questions, pauses, then reads supplied marking guide answers
 * and textbook-grounded explanations.
 */
export function buildUnitPastQuestionsRevisionQueue(
  course: Course,
  unit: StudyUnit,
  questions: PastExamQuestionItem[],
  options: {
    answerTiming?: AnswerTimingMode;
    includeAnswers?: boolean;
  } = {}
): VoicePlaylistItem[] {
  const items: VoicePlaylistItem[] = [];
  const includeAnswers = options.includeAnswers !== false;

  // Intro cue
  items.push({
    id: `pq-intro-${unit.id}`,
    courseId: course.id,
    courseCode: course.code,
    unitId: unit.id,
    unitTitle: unit.title,
    contentType: 'system-cue',
    title: `Exam Revision: ${unit.title}`,
    subtitle: `${questions.length} authentic past questions`,
    textToRead: `Beginning past question examination revision for ${course.code}, ${unit.title}. There are ${questions.length} authentic past examination questions mapped to this unit.`,
  });

  questions.forEach((q, idx) => {
    const qNum = q.originalQuestionNumber || q.questionNumber || idx + 1;
    const docSource = q.documentName || q.sourceFileName || 'University Past Paper';
    const marksLabel = q.marks ? `${q.marks} marks` : '';
    const sessionLabel = q.session ? `${q.session}` : '';

    // Question Item
    items.push({
      id: `q-${q.id}`,
      courseId: course.id,
      courseCode: course.code,
      unitId: unit.id,
      unitTitle: unit.title,
      contentType: 'past-question',
      title: `Question ${qNum}`,
      subtitle: `${docSource} • ${sessionLabel} ${marksLabel}`.trim(),
      textToRead: `Question ${qNum}. From ${docSource}. ${marksLabel ? `Worth ${marksLabel}.` : ''} ${q.questionText}`,
      rawItem: q,
      questionNumber: qNum,
      sourceDocument: docSource,
      marks: q.marks,
      session: q.session,
    });

    // Answer Item (if requested)
    if (includeAnswers) {
      const answerText = q.suppliedAnswer || q.modelAnswer || q.officialAnswer || q.answerGuide || '';
      if (answerText) {
        items.push({
          id: `ans-${q.id}`,
          courseId: course.id,
          courseCode: course.code,
          unitId: unit.id,
          unitTitle: unit.title,
          contentType: 'supplied-answer',
          title: `Official Marking Guide: Question ${qNum}`,
          subtitle: `Supplied Solution from ${docSource}`,
          textToRead: `Official marking guide answer for question ${qNum}: ${answerText}`,
          rawItem: q,
          questionNumber: qNum,
          sourceDocument: docSource,
          isAnswer: true,
        });
      } else if (q.textbookExplanation) {
        items.push({
          id: `ans-exp-${q.id}`,
          courseId: course.id,
          courseCode: course.code,
          unitId: unit.id,
          unitTitle: unit.title,
          contentType: 'textbook-explanation',
          title: `Textbook-Grounded Explanation: Question ${qNum}`,
          subtitle: `Verified against official textbook`,
          textToRead: `Textbook-grounded explanation for question ${qNum}: ${q.textbookExplanation}`,
          rawItem: q,
          questionNumber: qNum,
          sourceDocument: docSource,
          isAnswer: true,
        });
      } else {
        items.push({
          id: `ans-none-${q.id}`,
          courseId: course.id,
          courseCode: course.code,
          unitId: unit.id,
          unitTitle: unit.title,
          contentType: 'system-cue',
          title: `No Supplied Answer for Question ${qNum}`,
          subtitle: 'Source Archive Gap',
          textToRead: `The PDF does not provide enough information to answer this confidently.`,
          rawItem: q,
          questionNumber: qNum,
          sourceDocument: docSource,
          isAnswer: true,
        });
      }
    }
  });

  return items;
}

/**
 * COMBINED REVISION QUEUE
 * Reads textbook concepts followed by authentic examination questions for the unit.
 */
export function buildCombinedQueue(
  course: Course,
  unit: StudyUnit,
  questions: PastExamQuestionItem[],
  options?: { answerTiming?: AnswerTimingMode }
): VoicePlaylistItem[] {
  const learnQueue = buildUnitLearnQueue(course, unit);
  const revisionQueue = buildUnitPastQuestionsRevisionQueue(course, unit, questions, options);
  return [...learnQueue, ...revisionQueue];
}

/**
 * BUILD SINGLE QUESTION QUEUE
 * Lets user listen to one specific question and its answer on demand.
 */
export function buildSingleQuestionQueue(
  course: Course,
  unitTitle: string,
  question: PastExamQuestionItem
): VoicePlaylistItem[] {
  const qNum = question.originalQuestionNumber || question.questionNumber || 1;
  const docSource = question.documentName || question.sourceFileName || 'Past Paper';
  const items: VoicePlaylistItem[] = [
    {
      id: `single-q-${question.id}`,
      courseId: course.id,
      courseCode: course.code,
      unitId: question.unitId || question.linkedUnitId || '',
      unitTitle: unitTitle,
      contentType: 'past-question',
      title: `Question ${qNum}`,
      subtitle: `${docSource} • ${question.marks ? `${question.marks} marks` : ''}`,
      textToRead: `Question ${qNum}. From ${docSource}. ${question.marks ? `Worth ${question.marks} marks.` : ''} ${question.questionText}`,
      rawItem: question,
      questionNumber: qNum,
      sourceDocument: docSource,
    },
  ];

  const answerText = question.suppliedAnswer || question.modelAnswer || question.officialAnswer || question.answerGuide || '';
  if (answerText) {
    items.push({
      id: `single-ans-${question.id}`,
      courseId: course.id,
      courseCode: course.code,
      unitId: question.unitId || question.linkedUnitId || '',
      unitTitle: unitTitle,
      contentType: 'supplied-answer',
      title: `Official Marking Guide: Question ${qNum}`,
      subtitle: `Supplied Solution from ${docSource}`,
      textToRead: `Official marking guide answer: ${answerText}`,
      rawItem: question,
      questionNumber: qNum,
      isAnswer: true,
    });
  } else if (question.textbookExplanation) {
    items.push({
      id: `single-exp-${question.id}`,
      courseId: course.id,
      courseCode: course.code,
      unitId: question.unitId || question.linkedUnitId || '',
      unitTitle: unitTitle,
      contentType: 'textbook-explanation',
      title: `Textbook-Grounded Explanation: Question ${qNum}`,
      subtitle: 'Verified against official textbook',
      textToRead: `Textbook-grounded explanation: ${question.textbookExplanation}`,
      rawItem: question,
      questionNumber: qNum,
      isAnswer: true,
    });
  } else {
    items.push({
      id: `single-none-${question.id}`,
      courseId: course.id,
      courseCode: course.code,
      unitId: question.unitId || question.linkedUnitId || '',
      unitTitle: unitTitle,
      contentType: 'system-cue',
      title: `Question ${qNum}`,
      subtitle: 'Information gap',
      textToRead: `The PDF does not provide enough information to answer this confidently.`,
      rawItem: question,
      questionNumber: qNum,
      isAnswer: true,
    });
  }

  return items;
}

/**
 * SEQUENTIAL COURSE LISTENING
 * Queues units in their exact original order.
 */
export function buildSequentialCourseQueue(
  course: Course,
  mode: VoiceLearningMode,
  allQuestions: PastExamQuestionItem[]
): VoicePlaylistItem[] {
  const items: VoicePlaylistItem[] = [];

  // Intro
  items.push({
    id: `course-intro-${course.id}`,
    courseId: course.id,
    courseCode: course.code,
    unitId: '',
    unitTitle: 'Course Overview',
    contentType: 'system-cue',
    title: `${course.code}: ${course.title}`,
    subtitle: `${course.modules.length} Modules, Sequential Listening`,
    textToRead: `Beginning full sequential audio study for ${course.code}, ${course.title}. This course contains ${course.modules.length} modules and ${course.modules.reduce((acc, m) => acc + m.units.length, 0)} study units.`,
  });

  const coursePQs = getPastQuestionsForCourse(allQuestions, course);

  course.modules.forEach((module) => {
    module.units.forEach((unit) => {
      const unitPQs = getPastQuestionsForUnit(
        coursePQs,
        course.id,
        unit.id,
        unit.unitNumber,
        unit.title
      );

      if (mode === 'learn-understand') {
        items.push(...buildUnitLearnQueue(course, unit));
      } else if (mode === 'past-questions-revision') {
        if (unitPQs.length > 0) {
          items.push(...buildUnitPastQuestionsRevisionQueue(course, unit, unitPQs));
        }
      } else {
        items.push(...buildCombinedQueue(course, unit, unitPQs));
      }
    });
  });

  return items;
}
