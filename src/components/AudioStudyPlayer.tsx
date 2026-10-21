import React, { useState, useEffect } from 'react';
import {
  Play,
  Pause,
  Square,
  SkipForward,
  SkipBack,
  RotateCcw,
  Volume2,
  VolumeX,
  Headphones,
  Maximize2,
  Minimize2,
  X,
  List,
  Sparkles,
  BookOpen,
  HelpCircle,
  Clock,
  ChevronDown,
  Layers,
  Award,
  CheckCircle2,
  Eye,
  Settings2
} from 'lucide-react';
import {
  voiceLearningEngine,
  VoicePlaybackState,
  VoiceLearningMode,
  AnswerTimingMode,
  buildUnitLearnQueue,
  buildUnitPastQuestionsRevisionQueue,
  buildCombinedQueue,
  buildSequentialCourseQueue
} from '../services/voiceLearningService';
import { getPastQuestionsForUnit } from '../services/storage';
import { Course, StudyUnit, PastExamQuestionItem } from '../types';

interface AudioStudyPlayerProps {
  course: Course;
  availableCourses?: Course[];
  currentUnit?: StudyUnit | null;
  allUnits?: StudyUnit[];
  pastQuestions: PastExamQuestionItem[];
  isOpen: boolean;
  onClose: () => void;
  onSelectUnit?: (unitId: string) => void;
  onSelectCourse?: (courseId: string) => void;
}

export const AudioStudyPlayer: React.FC<AudioStudyPlayerProps> = ({
  course,
  availableCourses = [],
  currentUnit,
  allUnits = [],
  pastQuestions,
  isOpen,
  onClose,
  onSelectUnit,
  onSelectCourse,
}) => {
  const [playbackState, setPlaybackState] = useState<VoicePlaybackState>(voiceLearningEngine.getState());
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [showQueue, setShowQueue] = useState<boolean>(false);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [selectedUnitId, setSelectedUnitId] = useState<string>(currentUnit?.id || allUnits[0]?.id || '');
  const [selectedMode, setSelectedMode] = useState<VoiceLearningMode>('past-questions-revision');
  const [answerTiming, setAnswerTiming] = useState<AnswerTimingMode>('pause-3s');
  const [speed, setSpeed] = useState<number>(1.0);

  // Sync with engine state
  useEffect(() => {
    const unsubscribe = voiceLearningEngine.subscribe((state) => {
      setPlaybackState(state);
      setSpeed(state.playbackSpeed);
      setSelectedMode(state.mode);
      setAnswerTiming(state.answerTiming);
    });
    return () => unsubscribe();
  }, []);

  // Update selected unit when currentUnit changes from props
  useEffect(() => {
    if (currentUnit && currentUnit.id !== selectedUnitId) {
      setSelectedUnitId(currentUnit.id);
    }
  }, [currentUnit]);

  // Handle changing unit and rebuilding queue
  const loadQueueForUnit = (unitId: string, mode: VoiceLearningMode, timing: AnswerTimingMode) => {
    const targetUnit = allUnits.find((u) => u.id === unitId) || currentUnit;
    if (!targetUnit) return;

    setSelectedUnitId(unitId);
    setSelectedMode(mode);
    setAnswerTiming(timing);
    voiceLearningEngine.setMode(mode);
    voiceLearningEngine.setAnswerTiming(timing);

    // Isolate past questions strictly to this course and unit
    const unitPQs = getPastQuestionsForUnit(
      pastQuestions,
      course.id,
      targetUnit.id,
      targetUnit.unitNumber,
      targetUnit.title
    );

    let queue = [];
    if (mode === 'learn-understand') {
      queue = buildUnitLearnQueue(course, targetUnit);
    } else if (mode === 'past-questions-revision') {
      queue = buildUnitPastQuestionsRevisionQueue(course, targetUnit, unitPQs, { answerTiming: timing });
    } else {
      queue = buildCombinedQueue(course, targetUnit, unitPQs, { answerTiming: timing });
    }

    voiceLearningEngine.setPlaylist(queue, 0, true);
  };

  const handleStartSequentialCourse = () => {
    voiceLearningEngine.setMode(selectedMode);
    voiceLearningEngine.setAnswerTiming(answerTiming);
    const queue = buildSequentialCourseQueue(course, selectedMode, pastQuestions);
    voiceLearningEngine.setPlaylist(queue, 0, true);
  };

  const handleModeChange = (newMode: VoiceLearningMode) => {
    setSelectedMode(newMode);
    loadQueueForUnit(selectedUnitId, newMode, answerTiming);
  };

  const handleTimingChange = (newTiming: AnswerTimingMode) => {
    setAnswerTiming(newTiming);
    voiceLearningEngine.setAnswerTiming(newTiming);
  };

  const handleSpeedChange = (newSpeed: number) => {
    setSpeed(newSpeed);
    voiceLearningEngine.setRate(newSpeed);
  };

  const currentItem = playbackState.currentItem;
  const isPlaying = playbackState.status === 'playing';
  const isPaused = playbackState.status === 'paused';

  // Compute unit questions count for badge
  const activeUnitObj = allUnits.find((u) => u.id === selectedUnitId) || currentUnit;
  const activeUnitPQs = activeUnitObj
    ? getPastQuestionsForUnit(
        pastQuestions,
        course.id,
        activeUnitObj.id,
        activeUnitObj.unitNumber,
        activeUnitObj.title
      )
    : [];

  if (!isOpen) return null;

  // MINIMIZED FLOATING BAR
  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 sm:right-6 z-50 bg-[#14382B] text-white rounded-2xl shadow-2xl border border-white/20 p-3 max-w-md w-[calc(100vw-2rem)] flex items-center justify-between gap-3 animate-in slide-in-from-bottom-4 duration-200">
        <div className="flex items-center gap-3 overflow-hidden min-w-0">
          <div className="w-10 h-10 rounded-xl bg-[#FAF2E6] text-[#14382B] flex items-center justify-center shrink-0 shadow-inner">
            <Headphones className={`w-5 h-5 ${isPlaying ? 'animate-pulse text-[#C88A36]' : ''}`} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 text-[11px] text-[#E8DEC9]">
              <span className="font-semibold uppercase tracking-wider">{course.code}</span>
              <span>•</span>
              <span className="truncate">{currentItem?.unitTitle || 'Audio Study'}</span>
            </div>
            <p className="text-xs font-semibold text-white truncate">
              {currentItem?.title || 'StudyVault Audio'}
            </p>
          </div>
        </div>

        {/* Floating Quick Controls */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={() => voiceLearningEngine.previous()}
            className="p-1.5 text-white/80 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
            title="Previous"
          >
            <SkipBack className="w-4 h-4" />
          </button>

          {isPlaying ? (
            <button
              onClick={() => voiceLearningEngine.pause()}
              className="p-2 bg-white text-[#14382B] rounded-xl hover:bg-[#FAF8F5] transition-all shadow-xs"
              title="Pause"
            >
              <Pause className="w-4 h-4 fill-current" />
            </button>
          ) : (
            <button
              onClick={() => voiceLearningEngine.play()}
              className="p-2 bg-[#C88A36] text-white rounded-xl hover:bg-[#B3792E] transition-all shadow-xs"
              title="Play"
            >
              <Play className="w-4 h-4 fill-current ml-0.5" />
            </button>
          )}

          <button
            onClick={() => voiceLearningEngine.next()}
            className="p-1.5 text-white/80 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
            title="Next"
          >
            <SkipForward className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsMinimized(false)}
            className="p-1.5 text-white/80 hover:text-white rounded-lg hover:bg-white/10 transition-colors ml-1"
            title="Expand Full Audio Player"
          >
            <Maximize2 className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              voiceLearningEngine.stop();
              onClose();
            }}
            className="p-1.5 text-white/60 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  // EXPANDED MODAL / FULL PLAYER
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#FAF8F5] text-[#191C1A] border border-[#E8E4DC] rounded-3xl shadow-2xl max-w-3xl w-full max-h-[92vh] flex flex-col overflow-hidden">
        {/* Top Header Bar */}
        <div className="bg-[#14382B] text-white px-5 sm:px-6 py-4 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-[#FAF2E6] text-[#14382B] flex items-center justify-center shrink-0">
              <Headphones className="w-5 h-5 text-[#C88A36]" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 text-xs text-[#E8DEC9]">
                <span className="font-semibold uppercase tracking-wider">{course.code}</span>
                <span>•</span>
                <span className="truncate">{course.title}</span>
              </div>
              <h2 className="font-serif text-base sm:text-lg font-bold text-white truncate">
                Listen & Learn: Voice Study Mode
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className={`p-2 rounded-xl text-xs font-medium transition-colors ${
                showSettings ? 'bg-white/20 text-white' : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
              title="Audio and Voice Settings"
            >
              <Settings2 className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsMinimized(true)}
              className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
              title="Minimize to Floating Player"
            >
              <Minimize2 className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                voiceLearningEngine.stop();
                onClose();
              }}
              className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
              title="Close Audio Player"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Subheader: Mode & Unit Switcher */}
        <div className="bg-white px-5 sm:px-6 py-3 border-b border-[#E8E4DC] flex flex-wrap items-center justify-between gap-3">
          {/* Mode Tabs */}
          <div className="flex items-center gap-1 p-1 bg-[#F0ECE4] rounded-xl text-xs font-semibold">
            <button
              onClick={() => handleModeChange('learn-understand')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                selectedMode === 'learn-understand'
                  ? 'bg-white text-[#14382B] shadow-xs'
                  : 'text-[#585E5A] hover:text-[#191C1A]'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Mode A: Learn (Textbook)</span>
            </button>

            <button
              onClick={() => handleModeChange('past-questions-revision')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                selectedMode === 'past-questions-revision'
                  ? 'bg-white text-[#14382B] shadow-xs'
                  : 'text-[#585E5A] hover:text-[#191C1A]'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5 text-[#C88A36]" />
              <span>Mode B: Exam Revision ({activeUnitPQs.length} PQs)</span>
            </button>

            <button
              onClick={() => handleModeChange('combined')}
              className={`px-3 py-1.5 rounded-lg transition-all hidden md:flex items-center gap-1.5 ${
                selectedMode === 'combined'
                  ? 'bg-white text-[#14382B] shadow-xs'
                  : 'text-[#585E5A] hover:text-[#191C1A]'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Combined</span>
            </button>
          </div>

          {/* Unit selector dropdown */}
          <div className="flex items-center gap-2">
            <label className="text-xs text-[#585E5A] font-medium hidden sm:inline">Unit:</label>
            <select
              value={selectedUnitId}
              onChange={(e) => loadQueueForUnit(e.target.value, selectedMode, answerTiming)}
              className="text-xs bg-[#FAF8F5] border border-[#D8D2C6] rounded-xl px-3 py-1.5 text-[#191C1A] max-w-[200px] sm:max-w-[260px] truncate focus:outline-none focus:border-[#14382B]"
            >
              {allUnits.map((u, idx) => (
                <option key={u.id} value={u.id}>
                  Unit {idx + 1}: {u.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Collapsible Settings Panel */}
        {showSettings && (
          <div className="bg-[#F5ECD8] border-b border-[#E8DEC9] px-5 sm:px-6 py-3.5 text-xs text-[#14382B] animate-in slide-in-from-top-2 duration-150 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-4">
              {/* Answer Revelation Timing for Mode B */}
              <div className="space-y-1">
                <span className="font-semibold block">Mode B Answer Timing:</span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleTimingChange('pause-3s')}
                    className={`px-2.5 py-1 rounded-lg border text-xs font-medium transition-colors ${
                      answerTiming === 'pause-3s'
                        ? 'bg-[#14382B] text-white border-[#14382B]'
                        : 'bg-white border-[#D8D2C6] text-[#191C1A] hover:bg-white/80'
                    }`}
                  >
                    3s Reflection Pause
                  </button>
                  <button
                    onClick={() => handleTimingChange('pause-5s')}
                    className={`px-2.5 py-1 rounded-lg border text-xs font-medium transition-colors ${
                      answerTiming === 'pause-5s'
                        ? 'bg-[#14382B] text-white border-[#14382B]'
                        : 'bg-white border-[#D8D2C6] text-[#191C1A] hover:bg-white/80'
                    }`}
                  >
                    5s Reflection Pause
                  </button>
                  <button
                    onClick={() => handleTimingChange('immediate')}
                    className={`px-2.5 py-1 rounded-lg border text-xs font-medium transition-colors ${
                      answerTiming === 'immediate'
                        ? 'bg-[#14382B] text-white border-[#14382B]'
                        : 'bg-white border-[#D8D2C6] text-[#191C1A] hover:bg-white/80'
                    }`}
                  >
                    Immediate
                  </button>
                  <button
                    onClick={() => handleTimingChange('manual')}
                    className={`px-2.5 py-1 rounded-lg border text-xs font-medium transition-colors ${
                      answerTiming === 'manual'
                        ? 'bg-[#14382B] text-white border-[#14382B]'
                        : 'bg-white border-[#D8D2C6] text-[#191C1A] hover:bg-white/80'
                    }`}
                  >
                    Manual Reveal Only
                  </button>
                </div>
              </div>

              {/* Sequential whole-course listening */}
              <div>
                <span className="font-semibold block mb-1">Continuous Course Playback:</span>
                <button
                  onClick={handleStartSequentialCourse}
                  className="px-3 py-1 bg-white border border-[#D8D2C6] hover:bg-[#FAF8F5] text-xs font-semibold rounded-lg text-[#14382B] shadow-2xs transition-colors flex items-center gap-1.5"
                >
                  <Headphones className="w-3.5 h-3.5 text-[#C88A36]" />
                  <span>Queue All Units Sequentially</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-5">
          {/* Active Item Card */}
          {currentItem ? (
            <div className="bg-white border border-[#E8E4DC] rounded-2xl p-6 sm:p-7 shadow-xs space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E8E4DC] pb-4">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider rounded-lg ${
                      currentItem.contentType === 'past-question'
                        ? 'bg-[#FAF2E6] text-[#9A6218] border border-[#E8DEC9]'
                        : currentItem.contentType === 'supplied-answer'
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : currentItem.contentType === 'textbook-explanation'
                        ? 'bg-blue-50 text-blue-800 border border-blue-200'
                        : 'bg-[#F0ECE4] text-[#14382B]'
                    }`}
                  >
                    {currentItem.contentType === 'past-question'
                      ? 'Authentic Past Question'
                      : currentItem.contentType === 'supplied-answer'
                      ? 'Official Supplied Answer'
                      : currentItem.contentType === 'textbook-explanation'
                      ? 'Textbook Explanation'
                      : 'Textbook Content'}
                  </span>

                  {currentItem.sourceDocument && (
                    <span className="text-[11px] text-[#585E5A] bg-[#FAF8F5] px-2.5 py-0.5 rounded-md border border-[#E8E4DC] font-mono">
                      {currentItem.sourceDocument}
                    </span>
                  )}
                </div>

                <div className="text-xs font-mono text-[#585E5A]">
                  Track {playbackState.currentTrackIndex + 1} of {playbackState.totalTracks}
                </div>
              </div>

              <div className="space-y-1">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#14382B]">
                  {currentItem.title}
                </h3>
                {currentItem.subtitle && (
                  <p className="text-xs sm:text-sm text-[#585E5A]">{currentItem.subtitle}</p>
                )}
              </div>

              {/* Spoken Text Display */}
              <div className="bg-[#FAF8F5] rounded-xl p-5 border border-[#E8E4DC] text-sm sm:text-base leading-relaxed text-[#191C1A] max-h-56 overflow-y-auto font-serif">
                {currentItem.textToRead}
              </div>

              {/* Manual Answer Reveal Button (if waiting in manual mode) */}
              {answerTiming === 'manual' &&
                currentItem.contentType === 'past-question' &&
                !playbackState.isAnswerRevealed && (
                  <div className="pt-2 flex justify-center">
                    <button
                      onClick={() => voiceLearningEngine.revealAnswerNow()}
                      className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#14382B] hover:bg-[#0E261D] rounded-xl shadow-xs transition-all"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Reveal and Read Official Answer Now</span>
                    </button>
                  </div>
                )}
            </div>
          ) : (
            <div className="bg-white border border-[#E8E4DC] rounded-2xl p-10 text-center space-y-4">
              <Headphones className="w-12 h-12 text-[#C88A36] mx-auto opacity-70" />
              <div className="space-y-1">
                <h3 className="font-serif text-lg font-bold text-[#14382B]">No Audio Track Loaded</h3>
                <p className="text-xs text-[#585E5A] max-w-sm mx-auto">
                  Select a study unit above or press start to load authentic course materials and examination questions into the voice queue.
                </p>
              </div>
              <button
                onClick={() => loadQueueForUnit(selectedUnitId, selectedMode, answerTiming)}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#14382B] hover:bg-[#0E261D] rounded-xl shadow-xs transition-all"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Start Audio Study</span>
              </button>
            </div>
          )}

          {/* Queue Drawer Accordion */}
          <div className="bg-white border border-[#E8E4DC] rounded-2xl overflow-hidden">
            <button
              onClick={() => setShowQueue(!showQueue)}
              className="w-full px-5 py-3.5 flex items-center justify-between text-xs font-semibold text-[#14382B] hover:bg-[#FAF8F5] transition-colors"
            >
              <div className="flex items-center gap-2">
                <List className="w-4 h-4 text-[#C88A36]" />
                <span>Audio Study Queue ({playbackState.totalTracks} items)</span>
              </div>
              <ChevronDown className={`w-4 h-4 transition-transform ${showQueue ? 'rotate-180' : ''}`} />
            </button>

            {showQueue && (
              <div className="border-t border-[#E8E4DC] p-3 max-h-60 overflow-y-auto space-y-1.5 divide-y divide-[#F0ECE4]">
                {voiceLearningEngine['playlist']?.map((item: any, idx: number) => {
                  const isCurrent = idx === playbackState.currentTrackIndex;
                  return (
                    <button
                      key={item.id + idx}
                      onClick={() => voiceLearningEngine.jumpToTrack(idx)}
                      className={`w-full text-left p-2.5 rounded-xl text-xs flex items-center justify-between gap-3 transition-colors ${
                        isCurrent
                          ? 'bg-[#FAF2E6] text-[#14382B] font-semibold'
                          : 'hover:bg-[#FAF8F5] text-[#585E5A]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="font-mono text-[11px] w-6 shrink-0">{idx + 1}.</span>
                        <div className="truncate">
                          <p className="truncate text-xs font-medium text-[#191C1A]">{item.title}</p>
                          <p className="text-[10px] text-[#585E5A] truncate">{item.subtitle}</p>
                        </div>
                      </div>
                      {isCurrent && (
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#9A6218] px-2 py-0.5 bg-white rounded-md border border-[#E8DEC9] shrink-0">
                          Playing
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Bottom Playback Control Bar */}
        <div className="bg-white border-t border-[#E8E4DC] px-5 sm:px-8 py-5 space-y-4">
          {/* Progress Bar */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-[11px] text-[#585E5A]">
              <span>
                Track {playbackState.totalTracks > 0 ? playbackState.currentTrackIndex + 1 : 0} of{' '}
                {playbackState.totalTracks}
              </span>
              <span>
                {playbackState.totalTracks > 0
                  ? Math.round(((playbackState.currentTrackIndex + 1) / playbackState.totalTracks) * 100)
                  : 0}
                % Completed
              </span>
            </div>
            <div className="w-full h-2 bg-[#F0ECE4] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#14382B] rounded-full transition-all duration-300"
                style={{
                  width: `${
                    playbackState.totalTracks > 0
                      ? ((playbackState.currentTrackIndex + 1) / playbackState.totalTracks) * 100
                      : 0
                  }%`,
                }}
              />
            </div>
          </div>

          {/* Controls Cluster */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Speed Buttons */}
            <div className="flex items-center gap-1">
              <span className="text-[11px] text-[#585E5A] font-medium mr-1">Speed:</span>
              {[0.75, 1.0, 1.25, 1.5, 2.0].map((s) => (
                <button
                  key={s}
                  onClick={() => handleSpeedChange(s)}
                  className={`px-2 py-1 text-xs font-semibold rounded-lg transition-colors ${
                    speed === s
                      ? 'bg-[#14382B] text-white shadow-xs'
                      : 'bg-[#FAF8F5] border border-[#D8D2C6] text-[#585E5A] hover:text-[#191C1A]'
                  }`}
                >
                  {s}×
                </button>
              ))}
            </div>

            {/* Central Playback Transport Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => voiceLearningEngine.previous()}
                className="p-2.5 text-[#14382B] hover:bg-[#F0ECE4] rounded-xl transition-colors"
                title="Previous Passage / Question"
              >
                <SkipBack className="w-5 h-5" />
              </button>

              <button
                onClick={() => voiceLearningEngine.toggleRepeat()}
                className={`p-2 rounded-xl transition-colors ${
                  playbackState.isRepeatingCurrent
                    ? 'bg-[#FAF2E6] text-[#9A6218] border border-[#E8DEC9]'
                    : 'text-[#585E5A] hover:bg-[#F0ECE4]'
                }`}
                title="Repeat Current Item"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              {isPlaying ? (
                <button
                  onClick={() => voiceLearningEngine.pause()}
                  className="p-3.5 bg-[#14382B] hover:bg-[#0E261D] text-white rounded-2xl shadow-md transition-all active:scale-95"
                  title="Pause Audio"
                >
                  <Pause className="w-6 h-6 fill-current" />
                </button>
              ) : (
                <button
                  onClick={() => {
                    if (playbackState.totalTracks === 0) {
                      loadQueueForUnit(selectedUnitId, selectedMode, answerTiming);
                    } else {
                      voiceLearningEngine.play();
                    }
                  }}
                  className="p-3.5 bg-[#C88A36] hover:bg-[#B3792E] text-white rounded-2xl shadow-md transition-all active:scale-95"
                  title="Play Audio"
                >
                  <Play className="w-6 h-6 fill-current ml-0.5" />
                </button>
              )}

              <button
                onClick={() => voiceLearningEngine.stop()}
                className="p-2.5 text-[#585E5A] hover:text-red-700 hover:bg-red-50 rounded-xl transition-colors"
                title="Stop Playback"
              >
                <Square className="w-4 h-4 fill-current" />
              </button>

              <button
                onClick={() => voiceLearningEngine.next()}
                className="p-2.5 text-[#14382B] hover:bg-[#F0ECE4] rounded-xl transition-colors"
                title="Next Passage / Question"
              >
                <SkipForward className="w-5 h-5" />
              </button>
            </div>

            {/* Answer Revelation Quick Action (Mode B) */}
            <div className="flex items-center gap-2">
              {currentItem?.contentType === 'past-question' && (
                <button
                  onClick={() => voiceLearningEngine.revealAnswerNow()}
                  className="px-3 py-1.5 bg-[#FAF2E6] border border-[#E8DEC9] hover:bg-[#F5ECD8] text-[#9A6218] text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5 shadow-2xs"
                  title="Jump to Answer immediately"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Reveal Answer</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
