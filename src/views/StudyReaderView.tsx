import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Bookmark as BookmarkIcon,
  Sparkles,
  CheckCircle2,
  BookOpen,
  Edit3,
  Save,
  Type,
  Clock,
  RotateCcw,
  Flag,
  FileText,
  Table as TableIcon,
  Quote,
  Check,
  ChevronDown,
  ChevronUp,
  Calculator,
  Sliders,
  Sun,
  Moon,
  Compass,
  Palette,
  Maximize2,
  AlertTriangle,
  X,
  Headphones
} from 'lucide-react';
import {
  Course,
  StudyUnit,
  StudyTopic,
  PersonalNote,
  WrittenEvaluationResult,
  UnitStatus,
  QuestionMistakeRecord,
  PastExamQuestionItem
} from '../types';
import { ExplainSimplyModal } from '../components/ExplainSimplyModal';
import { WrittenAssessmentCheckpoint } from '../components/WrittenAssessmentCheckpoint';
import { QuizCheckpoint } from '../components/QuizCheckpoint';
import { AITutorChat } from '../components/AITutorChat';
import { UnitPastQuestionsSection } from '../components/UnitPastQuestionsSection';
import { getPastQuestionsForUnit } from '../services/storage';
import {
  voiceLearningEngine,
  buildUnitLearnQueue,
  buildUnitPastQuestionsRevisionQueue,
  VoiceLearningMode
} from '../services/voiceLearningService';

interface StudyReaderViewProps {
  course: Course;
  courses?: Course[];
  currentUnit: StudyUnit;
  currentTopic: StudyTopic;
  isBookmarked: boolean;
  isRevisionFlagged: boolean;
  notes: PersonalNote[];
  completedTopicIds: string[];
  unitStatus?: UnitStatus;
  pastQuestions?: PastExamQuestionItem[];
  onBackToCourse: () => void;
  onSelectTopic: (courseId: string, unitId: string, topicId: string) => void;
  onToggleBookmark: (course: Course, unit: StudyUnit, topic: StudyTopic) => void;
  onToggleRevisionFlag: (topicId: string) => void;
  onSaveNote: (note: Omit<PersonalNote, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onMarkTopicCompleted: (topicId: string) => void;
  onSetUnitStatus?: (unitId: string, status: UnitStatus) => void;
  onRecordWrittenEvaluation?: (topicId: string, evaluations: WrittenEvaluationResult[]) => void;
  onRecordQuizScore?: (topicId: string, score: number, total: number, newMistakes: QuestionMistakeRecord[]) => void;
  onOpenAudioPlayer?: (course: Course, unit: StudyUnit, questions?: PastExamQuestionItem[], mode?: VoiceLearningMode) => void;
  onUpdateReadingPosition?: (courseId: string, unitId: string, topicId: string, scrollRatio: number) => void;
  initialReadingPosition?: number;
  syncStatus?: 'saved' | 'saving' | 'syncing' | 'offline' | 'error';
  syncMessage?: string;
}

type ReaderTheme = 'parchment' | 'sepia' | 'white' | 'night';
type ReaderFontFamily = 'serif' | 'sans';

export const StudyReaderView: React.FC<StudyReaderViewProps> = ({
  course,
  courses,
  currentUnit,
  currentTopic,
  isBookmarked,
  isRevisionFlagged,
  notes,
  completedTopicIds,
  unitStatus = 'in_progress',
  pastQuestions = [],
  onBackToCourse,
  onSelectTopic,
  onToggleBookmark,
  onToggleRevisionFlag,
  onSaveNote,
  onMarkTopicCompleted,
  onSetUnitStatus,
  onRecordWrittenEvaluation,
  onRecordQuizScore,
  onOpenAudioPlayer,
  onUpdateReadingPosition,
  initialReadingPosition = 0,
  syncStatus = 'saved',
  syncMessage = 'Saved',
}) => {
  const [explainModalOpen, setExplainModalOpen] = useState(false);
  const [showInlineExplanation, setShowInlineExplanation] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notesPanelOpen, setNotesPanelOpen] = useState(false);
  const [aiTutorOpen, setAiTutorOpen] = useState(false);
  const [appearanceMenuOpen, setAppearanceMenuOpen] = useState(false);

  // Reading Appearance Preferences
  const [theme, setTheme] = useState<ReaderTheme>('parchment');
  const [fontFamily, setFontFamily] = useState<ReaderFontFamily>('serif');
  const [fontSizeLevel, setFontSizeLevel] = useState<number>(2); // 1: 15px, 2: 17px, 3: 19px, 4: 21px
  const [isWideMeasure, setIsWideMeasure] = useState<boolean>(false);

  // Scroll Progress Tracking & iPhone Scroll Stability
  const [scrollProgress, setScrollProgress] = useState(initialReadingPosition || 0);
  const hasRestoredTopicIdRef = useRef<string | null>(null);
  const scrollDebounceTimerRef = useRef<any>(null);

  // Restore reading position ONCE when entering a new topic - never while user is scrolling
  useEffect(() => {
    if (hasRestoredTopicIdRef.current === currentTopic.id) return;
    hasRestoredTopicIdRef.current = currentTopic.id;

    if (initialReadingPosition && initialReadingPosition > 0) {
      const timer = setTimeout(() => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (totalHeight > 0) {
          const targetY = (initialReadingPosition / 100) * totalHeight;
          window.scrollTo({ top: targetY, behavior: 'instant' });
        }
      }, 120);
      return () => clearTimeout(timer);
    }
  }, [currentTopic.id]);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          if (totalHeight > 0) {
            const progress = Math.min(100, Math.max(0, Math.round((window.scrollY / totalHeight) * 100)));
            setScrollProgress(progress);

            // Debounce parent progress record updates so scrolling on iOS touch devices is calm and jitter-free
            if (scrollDebounceTimerRef.current) {
              clearTimeout(scrollDebounceTimerRef.current);
            }
            scrollDebounceTimerRef.current = setTimeout(() => {
              if (onUpdateReadingPosition) {
                onUpdateReadingPosition(course.id, currentUnit.id, currentTopic.id, progress);
              }
            }, 600);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollDebounceTimerRef.current) {
        clearTimeout(scrollDebounceTimerRef.current);
      }
    };
  }, [course.id, currentUnit.id, currentTopic.id, onUpdateReadingPosition]);

  // Quick note state
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteBody, setNewNoteBody] = useState('');
  const [noteSavedFeedback, setNoteSavedFeedback] = useState(false);

  const isCompleted = completedTopicIds.includes(currentTopic.id);
  const topicNotes = notes.filter((n) => n.courseId === course.id && n.topicId === currentTopic.id);

  // Compute next and previous topics across all modules/units of this course
  const allCourseTopics: { unit: StudyUnit; topic: StudyTopic }[] = [];
  course.modules.forEach((mod) => {
    mod.units.forEach((u) => {
      u.topics.forEach((t) => {
        allCourseTopics.push({ unit: u, topic: t });
      });
    });
  });

  const currentIndex = allCourseTopics.findIndex((item) => item.topic.id === currentTopic.id);
  const prevItem = currentIndex > 0 ? allCourseTopics[currentIndex - 1] : null;
  const nextItem = currentIndex < allCourseTopics.length - 1 ? allCourseTopics[currentIndex + 1] : null;

  const handleSaveQuickNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteBody.trim()) return;

    onSaveNote({
      courseId: course.id,
      courseCode: course.code,
      courseTitle: course.title,
      unitId: currentUnit.id,
      unitTitle: currentUnit.title,
      topicId: currentTopic.id,
      title: newNoteTitle.trim() || `Notes on ${currentTopic.title}`,
      content: newNoteBody.trim(),
      tags: [course.code],
    });

    setNewNoteTitle('');
    setNewNoteBody('');
    setNoteSavedFeedback(true);
    setTimeout(() => setNoteSavedFeedback(false), 2500);
  };

  const handleExplainSimplySaveNote = (title: string, content: string) => {
    onSaveNote({
      courseId: course.id,
      courseCode: course.code,
      courseTitle: course.title,
      unitId: currentUnit.id,
      unitTitle: currentUnit.title,
      topicId: currentTopic.id,
      title,
      content,
      tags: [course.code, 'Explain Simply'],
    });
  };

  const hasAssessments = Boolean(
    (currentTopic.checkpointQuiz && currentTopic.checkpointQuiz.length > 0) ||
    (currentTopic.writtenQuestions && currentTopic.writtenQuestions.length > 0)
  );

  const isCurrentUnitPassed = unitStatus === 'passed' || unitStatus === 'completed';

  const scrollToAssessment = () => {
    const el = document.getElementById('unit-assessment-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleContinueReading = () => {
    onMarkTopicCompleted(currentTopic.id);

    if (nextItem) {
      onSelectTopic(course.id, nextItem.unit.id, nextItem.topic.id);
      window.scrollTo({ top: 0, behavior: 'instant' });
    } else {
      if (onSetUnitStatus) onSetUnitStatus(currentUnit.id, 'completed');
      onBackToCourse();
    }
  };

  const handleAttemptSelectTopic = (targetUnit: StudyUnit, targetTopicId: string) => {
    // Open any topic or unit freely in any order
    onSelectTopic(course.id, targetUnit.id, targetTopicId);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  // Theme styling dictionary
  const themeClasses: Record<ReaderTheme, { bg: string; surface: string; border: string; text: string; subtext: string }> = {
    parchment: {
      bg: 'bg-[#FAF8F5]',
      surface: 'bg-white',
      border: 'border-[#E8E4DC]',
      text: 'text-[#191C1A]',
      subtext: 'text-[#585E5A]',
    },
    sepia: {
      bg: 'bg-[#F4EFE6]',
      surface: 'bg-[#FCFAF6]',
      border: 'border-[#E2DAC8]',
      text: 'text-[#2B2318]',
      subtext: 'text-[#6B5E4F]',
    },
    white: {
      bg: 'bg-[#F8FAFC]',
      surface: 'bg-white',
      border: 'border-[#E2E8F0]',
      text: 'text-[#0F172A]',
      subtext: 'text-[#475569]',
    },
    night: {
      bg: 'bg-[#0E1613]',
      surface: 'bg-[#15201C]',
      border: 'border-[#22322C]',
      text: 'text-[#ECEFE8]',
      subtext: 'text-[#96A39C]',
    },
  };

  const currentTheme = themeClasses[theme];

  // Retrieve authentic past examination questions mapped to this unit from both uploaded documents
  const unitPastQuestions = getPastQuestionsForUnit(
    pastQuestions,
    course.id,
    currentUnit.id,
    currentUnit.unitNumber,
    currentUnit.title
  );

  // Font size classes for article body
  const fontSizeClasses = [
    'text-[15px] sm:text-[16px] leading-[1.7]',
    'text-[16px] sm:text-[17px] leading-[1.75]',
    'text-[17px] sm:text-[19px] leading-[1.8]',
    'text-[19px] sm:text-[21px] leading-[1.85]',
  ][fontSizeLevel - 1] || 'text-[16px] sm:text-[17px] leading-[1.75]';

  return (
    <div className={`min-h-screen ${currentTheme.bg} ${currentTheme.text} flex flex-col transition-colors duration-200`}>
      {/* Scroll Progress Bar */}
      <div className="fixed top-16 left-0 right-0 z-50 h-1 bg-black/5 pointer-events-none">
        <div
          className="h-full bg-[#14382B] transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Reader Utility Subheader */}
      <div className={`sticky top-16 z-30 ${currentTheme.bg}/95 backdrop-blur-md border-b ${currentTheme.border} px-4 sm:px-6 lg:px-8 py-2.5 transition-colors`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Breadcrumb Info */}
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={onBackToCourse}
              className={`p-1.5 ${currentTheme.subtext} hover:${currentTheme.text} rounded-lg transition-colors shrink-0`}
              title="Return to syllabus outline"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 text-xs truncate">
              <span className="font-mono font-bold text-[#14382B] px-1.5 py-0.5 rounded bg-black/5 shrink-0">
                {course.code}
              </span>
              <span className="text-[#8C928E] hidden sm:inline" aria-hidden="true">·</span>
              <span className={`truncate hidden md:inline ${currentTheme.subtext}`}>
                {currentUnit.title}
              </span>
              <span className="text-[#8C928E]" aria-hidden="true">·</span>
              <span className="font-semibold truncate max-w-[200px] sm:max-w-xs">
                {currentTopic.title}
              </span>
            </div>
          </div>

          {/* Reader Controls & Actions */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Appearance Settings Trigger */}
            <div className="relative">
              <button
                onClick={() => setAppearanceMenuOpen(!appearanceMenuOpen)}
                className={`p-2 rounded-lg text-xs font-medium border ${currentTheme.border} ${currentTheme.surface} ${currentTheme.subtext} hover:${currentTheme.text} transition-colors`}
                title="Reading Canvas Appearance"
              >
                <Type className="w-4 h-4" />
              </button>

              {/* Appearance Popover */}
              {appearanceMenuOpen && (
                <div className={`absolute right-0 mt-2 w-72 ${currentTheme.surface} border ${currentTheme.border} rounded-2xl shadow-xl p-4 z-50 space-y-4 animate-in fade-in zoom-in-95`}>
                  <div className="flex items-center justify-between pb-2 border-b border-black/10">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#8C928E]">
                      Reader Preferences
                    </span>
                    <button
                      onClick={() => setAppearanceMenuOpen(false)}
                      className="text-xs text-[#8C928E] hover:text-[#191C1A]"
                    >
                      ✕
                    </button>
                  </div>

                  {/* Themes */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium block">Color Tone</label>
                    <div className="grid grid-cols-4 gap-1.5">
                      <button
                        onClick={() => setTheme('parchment')}
                        className={`px-2 py-1.5 text-xs rounded-lg border text-center font-medium ${
                          theme === 'parchment'
                            ? 'bg-[#FAF8F5] border-[#14382B] text-[#14382B] font-bold shadow-xs'
                            : 'bg-[#FAF8F5] border-[#E8E4DC] text-[#585E5A]'
                        }`}
                      >
                        Parchment
                      </button>
                      <button
                        onClick={() => setTheme('sepia')}
                        className={`px-2 py-1.5 text-xs rounded-lg border text-center font-medium ${
                          theme === 'sepia'
                            ? 'bg-[#F4EFE6] border-[#8C5E1E] text-[#8C5E1E] font-bold shadow-xs'
                            : 'bg-[#F4EFE6] border-[#E2DAC8] text-[#6B5E4F]'
                        }`}
                      >
                        Sepia
                      </button>
                      <button
                        onClick={() => setTheme('white')}
                        className={`px-2 py-1.5 text-xs rounded-lg border text-center font-medium ${
                          theme === 'white'
                            ? 'bg-white border-[#0F172A] text-[#0F172A] font-bold shadow-xs'
                            : 'bg-white border-[#E2E8F0] text-[#475569]'
                        }`}
                      >
                        Clean
                      </button>
                      <button
                        onClick={() => setTheme('night')}
                        className={`px-2 py-1.5 text-xs rounded-lg border text-center font-medium ${
                          theme === 'night'
                            ? 'bg-[#0E1613] border-[#58A67E] text-[#ECEFE8] font-bold shadow-xs'
                            : 'bg-[#0E1613] border-[#22322C] text-[#96A39C]'
                        }`}
                      >
                        Night
                      </button>
                    </div>
                  </div>

                  {/* Typography Font */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium block">Typeface</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setFontFamily('serif')}
                        className={`px-3 py-1.5 text-xs rounded-lg border font-serif text-center ${
                          fontFamily === 'serif'
                            ? 'border-[#14382B] font-bold shadow-xs'
                            : 'border-black/10'
                        }`}
                      >
                        Editorial Serif
                      </button>
                      <button
                        onClick={() => setFontFamily('sans')}
                        className={`px-3 py-1.5 text-xs rounded-lg border font-sans text-center ${
                          fontFamily === 'sans'
                            ? 'border-[#14382B] font-bold shadow-xs'
                            : 'border-black/10'
                        }`}
                      >
                        Modern Sans
                      </button>
                    </div>
                  </div>

                  {/* Font Size */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <label className="font-medium">Text Size</label>
                      <span className="font-mono text-[11px] opacity-70">
                        {['Small (15px)', 'Default (17px)', 'Large (19px)', 'Comfort (21px)'][fontSizeLevel - 1]}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-serif">A</span>
                      <input
                        type="range"
                        min={1}
                        max={4}
                        step={1}
                        value={fontSizeLevel}
                        onChange={(e) => setFontSizeLevel(Number(e.target.value))}
                        className="w-full accent-[#14382B] cursor-pointer"
                      />
                      <span className="text-base font-serif font-bold">A</span>
                    </div>
                  </div>

                  {/* Reading Measure Width */}
                  <div className="pt-2 border-t border-black/10 flex items-center justify-between text-xs">
                    <span className="font-medium">Expanded Margin</span>
                    <button
                      onClick={() => setIsWideMeasure(!isWideMeasure)}
                      className={`px-2.5 py-1 rounded-md text-xs font-semibold border ${
                        isWideMeasure
                          ? 'bg-[#14382B] text-white border-[#14382B]'
                          : 'bg-black/5 border-black/10'
                      }`}
                    >
                      {isWideMeasure ? 'Wide' : 'Standard'}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Revision Flag button */}
            <button
              onClick={() => onToggleRevisionFlag(currentTopic.id)}
              className={`p-2 rounded-lg text-xs font-medium border transition-colors ${
                isRevisionFlagged
                  ? 'bg-amber-100 text-amber-900 border-amber-300'
                  : `${currentTheme.surface} ${currentTheme.border} ${currentTheme.subtext} hover:${currentTheme.text}`
              }`}
              title={isRevisionFlagged ? 'Flagged for exam revision' : 'Flag for revision'}
            >
              <Flag className={`w-4 h-4 ${isRevisionFlagged ? 'fill-current' : ''}`} />
            </button>

            {/* Bookmark button */}
            <button
              onClick={() => onToggleBookmark(course, currentUnit, currentTopic)}
              className={`p-2 rounded-lg text-xs font-medium border transition-colors ${
                isBookmarked
                  ? 'bg-amber-100 text-amber-900 border-amber-300'
                  : `${currentTheme.surface} ${currentTheme.border} ${currentTheme.subtext} hover:${currentTheme.text}`
              }`}
              title={isBookmarked ? 'Topic is bookmarked' : 'Bookmark this topic'}
            >
              <BookmarkIcon className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>

            {/* Cloud Sync Status Indicator */}
            <div
              className="hidden xl:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-medium border border-black/10 bg-black/[0.02]"
              title={`Cloud Persistence: ${syncMessage}`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                  syncStatus === 'saved'
                    ? 'bg-emerald-600'
                    : syncStatus === 'saving' || syncStatus === 'syncing'
                    ? 'bg-amber-500 animate-pulse'
                    : syncStatus === 'offline'
                    ? 'bg-slate-400'
                    : 'bg-rose-500'
                }`}
              />
              <span className="text-[#585E5A] font-sans">{syncMessage}</span>
            </div>

            {/* Audio Study Mode Trigger */}
            <button
              onClick={() => {
                if (onOpenAudioPlayer) {
                  onOpenAudioPlayer(course, currentUnit, unitPastQuestions, 'learn-understand');
                } else {
                  const queue = buildUnitLearnQueue(course, currentUnit);
                  voiceLearningEngine.setPlaylist(queue, 0, true);
                }
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#14382B] bg-[#FAF2E6] border border-[#E8DEC9] hover:bg-[#F5ECD8] rounded-lg shadow-2xs transition-colors"
              title="Listen to textbook unit & past questions with voice audio"
            >
              <Headphones className="w-3.5 h-3.5 text-[#C88A36]" />
              <span className="hidden sm:inline">Listen & Learn</span>
            </button>

            {/* AI Tutor Chatbot Trigger */}
            <button
              onClick={() => setAiTutorOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-[#14382B] hover:bg-[#0E261D] rounded-lg shadow-2xs transition-colors"
              title="Open StudyVault AI Tutor"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C88A36]" />
              <span className="hidden sm:inline">AI Tutor</span>
            </button>

            {/* Notes drawer toggle */}
            <button
              onClick={() => setNotesPanelOpen(!notesPanelOpen)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                notesPanelOpen
                  ? 'bg-[#14382B] text-white border-[#14382B]'
                  : `${currentTheme.surface} text-[#14382B] ${currentTheme.border} hover:bg-black/5`
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Notes</span>
              {topicNotes.length > 0 && (
                <span className="font-mono text-[11px] ml-0.5">({topicNotes.length})</span>
              )}
            </button>

            {/* Outline sidebar toggle */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className={`flex items-center gap-1.5 p-2 ${currentTheme.surface} ${currentTheme.subtext} border ${currentTheme.border} hover:${currentTheme.text} rounded-lg transition-colors`}
              title="Toggle syllabus outline"
            >
              <BookOpen className="w-4 h-4" />
              <span className="text-xs font-semibold hidden md:inline">Syllabus</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Reading Workspace */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex gap-8 relative">
        {/* Mobile Syllabus Drawer Backdrop & Panel */}
        {sidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex">
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-xs"
              onClick={() => setSidebarOpen(false)}
            />
            <div className={`relative w-80 max-w-[85vw] h-full ${currentTheme.surface} border-r ${currentTheme.border} p-5 overflow-y-auto space-y-4 shadow-2xl z-10 animate-in slide-in-from-left duration-200`}>
              <div className="flex items-center justify-between pb-3 border-b border-black/10">
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8C928E] block">
                    Textbook Syllabus
                  </span>
                  <h4 className="font-serif text-sm font-bold truncate max-w-[200px]">
                    {course.title}
                  </h4>
                </div>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-1.5 text-[#585E5A] hover:text-[#191C1A] rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                {course.modules.map((mod) => (
                  <div key={mod.id} className="space-y-2">
                    <p className="text-[11px] font-semibold text-[#8C928E] uppercase tracking-wider">
                      Module {mod.moduleNumber}
                    </p>
                    {mod.units.map((u) => (
                      <div key={u.id} className="space-y-1 pl-1">
                        <p className="text-xs font-semibold line-clamp-1 opacity-90">
                          {u.title}
                        </p>
                        <div className={`space-y-1 pl-2 border-l ${currentTheme.border}`}>
                          {u.topics.map((t) => {
                            const isCurrent = t.id === currentTopic.id;
                            const isTopicDone = completedTopicIds.includes(t.id);
                            return (
                              <button
                                key={t.id}
                                onClick={() => {
                                  handleAttemptSelectTopic(u, t.id);
                                  setSidebarOpen(false);
                                }}
                                className={`w-full text-left text-xs py-2 px-2.5 rounded-lg transition-colors flex items-center justify-between gap-2 ${
                                  isCurrent
                                    ? 'bg-[#14382B] text-white font-medium'
                                    : `${currentTheme.subtext} hover:${currentTheme.text} hover:bg-black/5`
                                }`}
                              >
                                <span className="truncate">{t.title}</span>
                                {isTopicDone && (
                                  <CheckCircle2
                                    className={`w-3.5 h-3.5 shrink-0 ${isCurrent ? 'text-white' : 'text-emerald-600'}`}
                                  />
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Desktop Left: Collapsible Outline Sidebar */}
        {sidebarOpen && (
          <aside className="hidden lg:block w-72 shrink-0 space-y-6">
            <div className={`sticky top-32 ${currentTheme.surface} border ${currentTheme.border} rounded-2xl p-5 max-h-[calc(100vh-9.5rem)] overflow-y-auto space-y-4 shadow-xs`}>
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8C928E] block mb-1">
                  Textbook Syllabus
                </span>
                <h4 className="font-serif text-sm font-bold truncate">
                  {course.title}
                </h4>
              </div>

              <div className={`space-y-4 pt-2 border-t ${currentTheme.border}`}>
                {course.modules.map((mod) => (
                  <div key={mod.id} className="space-y-2">
                    <p className="text-[11px] font-semibold text-[#8C928E] uppercase tracking-wider">
                      Module {mod.moduleNumber}
                    </p>
                    {mod.units.map((u) => (
                      <div key={u.id} className="space-y-1 pl-1">
                        <p className="text-xs font-semibold line-clamp-1 opacity-90">
                          {u.title}
                        </p>
                        <div className={`space-y-1 pl-2 border-l ${currentTheme.border}`}>
                          {u.topics.map((t) => {
                            const isCurrent = t.id === currentTopic.id;
                            const isTopicDone = completedTopicIds.includes(t.id);
                            return (
                              <button
                                key={t.id}
                                onClick={() => handleAttemptSelectTopic(u, t.id)}
                                className={`w-full text-left text-xs py-1.5 px-2 rounded-lg transition-colors flex items-center justify-between gap-2 ${
                                  isCurrent
                                    ? 'bg-[#14382B] text-white font-medium'
                                    : `${currentTheme.subtext} hover:${currentTheme.text} hover:bg-black/5`
                                }`}
                              >
                                <span className="truncate">{t.title}</span>
                                {isTopicDone && (
                                  <CheckCircle2
                                    className={`w-3 h-3 shrink-0 ${isCurrent ? 'text-white' : 'text-emerald-600'}`}
                                  />
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </aside>
        )}

        {/* Center: Reading Canvas */}
        <main className={`flex-1 min-w-0 mx-auto space-y-8 ${isWideMeasure ? 'max-w-4xl' : 'max-w-3xl'}`}>
          {/* Topic Title & Actions Header */}
          <div className={`space-y-4 pb-6 border-b ${currentTheme.border}`}>
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex flex-wrap items-center gap-2">
                <span>{currentUnit.title}</span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1 font-mono">
                  <Clock className="w-3.5 h-3.5 text-[#14382B]" />
                  ~{currentTopic.readingMinutes || 12} min read
                </span>
                {currentTopic.sourceReference && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="text-[#8C928E]">Ref: {currentTopic.sourceReference}</span>
                  </>
                )}
              </div>

              {isCompleted ? (
                <span className="inline-flex items-center gap-1.5 text-emerald-700 font-semibold text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Topic Completed</span>
                </span>
              ) : (
                <button
                  onClick={() => onMarkTopicCompleted(currentTopic.id)}
                  className="text-xs text-[#14382B] font-semibold hover:underline"
                >
                  Mark as Read
                </button>
              )}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <h1 className={`text-2xl sm:text-4xl font-bold tracking-tight leading-[1.2] ${fontFamily === 'serif' ? 'font-serif' : 'font-sans'}`}>
                {currentTopic.title}
              </h1>

              {/* Explain Simply Button */}
              <button
                onClick={() => setExplainModalOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-[#14382B] bg-[#FAF2E6] border border-[#E8DEC9] hover:bg-[#F5ECD8] rounded-xl transition-all self-start sm:self-auto shrink-0 shadow-xs"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#C88A36]" />
                <span>Explain Simply</span>
              </button>
            </div>
          </div>

          {/* Section A: Original Authoritative Definitions */}
          {currentTopic.textbookDefinitions && currentTopic.textbookDefinitions.length > 0 && (
            <div className={`${currentTheme.surface} border ${currentTheme.border} p-5 sm:p-6 rounded-2xl space-y-3.5 shadow-xs`}>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#14382B] uppercase tracking-wider">
                <Quote className="w-3.5 h-3.5 text-[#C88A36]" />
                <span>Authoritative Textbook Definitions</span>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {currentTopic.textbookDefinitions.map((def, idx) => (
                  <div key={idx} className={`p-4 rounded-xl border ${currentTheme.border} bg-black/[0.02] text-xs sm:text-sm space-y-1.5`}>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#14382B]">{def.term}</span>
                      {def.sourceAuthor && (
                        <span className="text-[11px] text-[#8C928E] font-medium">({def.sourceAuthor})</span>
                      )}
                    </div>
                    <p className={`leading-relaxed italic ${fontFamily === 'serif' ? 'font-serif' : 'font-sans'}`}>
                      "{def.definition}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section A: Original Textbook Content (Preserved Fully) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between text-[11px] font-semibold text-[#8C928E] uppercase tracking-wider pb-1">
              <span>Section A: Original Textbook Content</span>
              {currentTopic.sourceReference && <span>{currentTopic.sourceReference}</span>}
            </div>

            <article
              className={`prose max-w-none transition-all space-y-5 ${fontSizeClasses} ${
                fontFamily === 'serif' ? 'font-serif' : 'font-sans'
              }`}
            >
              {currentTopic.content.split('\n\n').map((paragraph, pIdx) => {
                if (
                  paragraph.startsWith('1.') ||
                  paragraph.startsWith('2.') ||
                  paragraph.startsWith('-') ||
                  paragraph.startsWith('i)') ||
                  paragraph.startsWith('ii)')
                ) {
                  return (
                    <div
                      key={pIdx}
                      className={`${currentTheme.surface} border ${currentTheme.border} p-5 sm:p-6 rounded-2xl whitespace-pre-line text-xs sm:text-sm leading-relaxed my-4 shadow-xs`}
                    >
                      {paragraph}
                    </div>
                  );
                }
                return (
                  <p key={pIdx} className="leading-[1.8] opacity-95">
                    {paragraph}
                  </p>
                );
              })}
            </article>
          </div>

          {/* Section B: Explain It Simply (Directly Underneath) */}
          {currentTopic.simplifiedExplanation && (
            <div className="bg-[#FAF2E6]/60 border border-[#E8DEC9] rounded-2xl p-5 sm:p-6 space-y-3.5 mt-8 shadow-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-[#8C5E1E] uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-[#C88A36]" />
                  <span>Section B: Explain It Simply (Textbook-Grounded)</span>
                </div>
                <button
                  onClick={() => setShowInlineExplanation(!showInlineExplanation)}
                  className="text-xs text-[#8C5E1E] font-semibold hover:underline"
                >
                  {showInlineExplanation ? 'Hide' : 'Expand'}
                </button>
              </div>

              {showInlineExplanation && (
                <div className="space-y-3 pt-2 text-xs sm:text-sm leading-relaxed">
                  <div className="p-4 bg-white rounded-xl border border-[#E8DEC9] shadow-2xs">
                    <strong className="text-[#14382B] block mb-1">Real-World Analogy:</strong>
                    <p className="italic text-[#383D3B]">"{currentTopic.simplifiedExplanation.analogy}"</p>
                  </div>
                  <div className="p-4 bg-white rounded-xl border border-[#E8DEC9] shadow-2xs">
                    <strong className="text-[#14382B] block mb-1">Plain English Summary:</strong>
                    <p className="text-[#383D3B]">{currentTopic.simplifiedExplanation.plainEnglish}</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3.5 bg-white rounded-xl border border-[#E8DEC9] shadow-2xs">
                      <strong className="text-[#14382B] block mb-1">Core Takeaway:</strong>
                      <p className="text-[#383D3B]">{currentTopic.simplifiedExplanation.keyTakeaway}</p>
                    </div>
                    <div className="p-3.5 bg-white rounded-xl border border-[#E8DEC9] shadow-2xs">
                      <strong className="text-[#9C6B28] block mb-1">Exam Strategy Tip:</strong>
                      <p className="text-[#4A4031]">{currentTopic.simplifiedExplanation.examTip}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Section C: Key Points to Remember */}
          {currentTopic.summaryPoints && currentTopic.summaryPoints.length > 0 && (
            <div className={`${currentTheme.surface} border ${currentTheme.border} p-6 rounded-2xl space-y-3.5 mt-8 shadow-xs`}>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#14382B] uppercase tracking-wider">
                <BookOpen className="w-4 h-4 text-[#14382B]" />
                <span>Section C: Key Points to Remember</span>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm pl-4 list-disc">
                {currentTopic.summaryPoints.map((point, idx) => (
                  <li key={idx} className="leading-relaxed opacity-90">
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Section D: Tables and Comparisons */}
          {currentTopic.tables && currentTopic.tables.length > 0 && (
            <div className="space-y-4 mt-8">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#14382B] uppercase tracking-wider">
                <TableIcon className="w-4 h-4 text-[#14382B]" />
                <span>Section D: Textbook Tables & Comparisons</span>
              </div>

              {currentTopic.tables.map((table, tIdx) => (
                <div key={tIdx} className={`${currentTheme.surface} border ${currentTheme.border} rounded-2xl overflow-hidden shadow-xs`}>
                  <div className="px-5 py-3.5 border-b border-black/10 bg-black/[0.02]">
                    <h4 className="font-serif text-sm font-bold">
                      {table.title}
                    </h4>
                    {table.sourceCitation && (
                      <p className="text-[11px] text-[#8C928E] mt-0.5">Source: {table.sourceCitation}</p>
                    )}
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs sm:text-sm">
                      <thead className="border-b border-black/10 text-xs font-bold uppercase tracking-wider">
                        <tr>
                          {table.headers.map((h, hIdx) => (
                            <th key={hIdx} className="px-4 py-3">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-black/5">
                        {table.rows.map((row, rIdx) => (
                          <tr key={rIdx} className="hover:bg-black/[0.02]">
                            {row.map((cell, cIdx) => (
                              <td key={cIdx} className="px-4 py-3 align-top leading-relaxed">
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Section E: Formulae and Step-by-Step Calculations */}
          {currentTopic.formulas && currentTopic.formulas.length > 0 && (
            <div className="space-y-6 mt-8">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#14382B] uppercase tracking-wider">
                <Calculator className="w-4 h-4 text-[#14382B]" />
                <span>Section E: Textbook Formulae & Step-by-Step Calculations</span>
              </div>

              {currentTopic.formulas.map((form) => (
                <div key={form.id} className={`${currentTheme.surface} border ${currentTheme.border} rounded-2xl overflow-hidden shadow-xs space-y-4 p-5 sm:p-7`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-black/10">
                    <div>
                      <h4 className="font-serif text-base sm:text-lg font-bold">
                        {form.name}
                      </h4>
                      <p className="text-xs opacity-75 mt-0.5">{form.contextAndPurpose}</p>
                    </div>
                    {form.sourceReference && (
                      <span className="font-mono text-[11px] opacity-75 bg-black/5 px-2 py-0.5 rounded self-start sm:self-auto shrink-0">
                        {form.sourceReference}
                      </span>
                    )}
                  </div>

                  {/* Formula banner */}
                  <div className="p-4 bg-black/[0.02] border border-black/10 rounded-xl text-center">
                    <span className="text-[11px] font-semibold text-[#8C928E] uppercase tracking-wider block mb-1">
                      Authoritative Textbook Mathematical Model
                    </span>
                    <div className="font-mono text-base sm:text-xl font-bold text-[#14382B] tracking-wide py-1">
                      {form.formulaDisplay}
                    </div>
                  </div>

                  {/* Variable breakdown table */}
                  <div className="space-y-2">
                    <h5 className="text-xs font-semibold">
                      Variable Specification According to Textbook:
                    </h5>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs border border-black/10 rounded-xl">
                        <thead className="bg-black/[0.02] border-b border-black/10">
                          <tr>
                            <th className="px-3 py-2 w-20">Symbol</th>
                            <th className="px-3 py-2 w-40">Variable Name</th>
                            <th className="px-3 py-2">Author's Definition & Role</th>
                            <th className="px-3 py-2 w-28">Scale/Unit</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-black/5">
                          {form.variables.map((v, vIdx) => (
                            <tr key={vIdx} className="hover:bg-black/[0.02]">
                              <td className="px-3 py-2 font-mono font-bold text-[#14382B]">{v.symbol}</td>
                              <td className="px-3 py-2 font-medium">{v.name}</td>
                              <td className="px-3 py-2 leading-relaxed opacity-90">{v.explanation}</td>
                              <td className="px-3 py-2 opacity-75 font-mono text-[11px]">{v.unitOrScale || 'Scalar'}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Worked calculations */}
                  {form.workedExamples && form.workedExamples.length > 0 && (
                    <div className="space-y-4 pt-3 border-t border-black/10">
                      <h5 className="text-xs font-semibold uppercase tracking-wider text-[#14382B]">
                        Step-by-Step Textbook Worked Example:
                      </h5>

                      {form.workedExamples.map((ex, exIdx) => (
                        <div key={exIdx} className="bg-black/[0.02] border border-black/10 rounded-xl p-4 sm:p-5 space-y-4">
                          <div>
                            <span className="font-serif text-sm font-bold block">
                              {ex.title}
                            </span>
                            <p className="text-xs mt-1 leading-relaxed italic opacity-85">
                              "{ex.problemStatement}"
                            </p>
                          </div>

                          {/* Given parameters */}
                          <div className={`${currentTheme.surface} p-3 rounded-lg border border-black/10 text-xs`}>
                            <span className="font-semibold block mb-1.5">
                              Given Values from Problem Statement:
                            </span>
                            <div className="flex flex-wrap gap-2.5">
                              {ex.givenValues.map((gv, gvIdx) => (
                                <div key={gvIdx} className="flex items-center gap-1.5 bg-black/[0.03] px-2.5 py-1 rounded border border-black/10">
                                  <span className="font-mono font-bold text-[#14382B]">{gv.symbol}</span>
                                  <span className="opacity-75">({gv.label}):</span>
                                  <span className="font-semibold">{gv.value}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Calculation Steps */}
                          <div className="space-y-2">
                            <span className="text-xs font-semibold block">
                              Sequential Arithmetic Execution:
                            </span>
                            <div className="space-y-2">
                              {ex.steps.map((st) => (
                                <div key={st.stepNumber} className={`${currentTheme.surface} p-3 rounded-lg border border-black/10 text-xs space-y-1`}>
                                  <div className="flex items-center justify-between text-[#14382B] font-semibold">
                                    <span>Step {st.stepNumber}: {st.description}</span>
                                    <span className="font-mono text-[11px] bg-black/[0.03] px-2 py-0.5 rounded border border-black/10">
                                      {st.mathExpression}
                                    </span>
                                  </div>
                                  <p className="text-[11px] leading-relaxed opacity-85">
                                    {st.explanation}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Final Result & Academic Interpretation (Clean hairline border, NO thick left border) */}
                          <div className={`${currentTheme.surface} p-4 rounded-xl border border-black/15 space-y-1.5 shadow-2xs`}>
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-[#14382B] uppercase tracking-wider">
                                Final Calculated Result:
                              </span>
                              <span className="font-mono font-bold text-sm text-[#14382B] bg-[#FAF2E6] px-2.5 py-0.5 rounded border border-[#E8DEC9]">
                                {ex.finalResult}
                              </span>
                            </div>
                            <p className="text-xs leading-relaxed pt-1">
                              <strong>Textbook Interpretation: </strong>
                              <span className="opacity-90">{ex.authorInterpretation}</span>
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Past Questions and Answers for This Unit */}
          <UnitPastQuestionsSection
            course={course}
            unit={currentUnit}
            questions={unitPastQuestions}
            theme={currentTheme}
            onOpenAudioPlayer={onOpenAudioPlayer}
            onSaveNote={(note) => {
              onSaveNote({
                courseId: note.courseId,
                courseCode: note.courseCode,
                courseTitle: note.courseTitle,
                unitId: note.unitId,
                unitTitle: note.unitTitle,
                topicId: currentTopic.id,
                title: note.title,
                content: note.content,
                tags: note.tags,
              });
            }}
          />

          {/* Section F: Quick Comprehension Check & Examination Assessment */}
          <div id="unit-assessment-section" className="space-y-4 mt-10 pt-6 border-t border-black/10 scroll-mt-24">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#14382B] uppercase tracking-wider">
              <Check className="w-4 h-4 text-[#14382B]" />
              <span>Section F: Quick Comprehension Check & Examination Practice</span>
            </div>

            {/* Quick Checkpoint Multiple Choice Quiz with Option-Level Feedback */}
            {currentTopic.checkpointQuiz && currentTopic.checkpointQuiz.length > 0 && (
              <QuizCheckpoint
                questions={currentTopic.checkpointQuiz}
                topicTitle={currentTopic.title}
                courseCode={course.code}
                courseId={course.id}
                topicId={currentTopic.id}
                onQuizCompleted={(score, total, mistakes, isPassed) => {
                  onMarkTopicCompleted(currentTopic.id);
                  onRecordQuizScore?.(currentTopic.id, score, total, mistakes);
                  if (isPassed && onSetUnitStatus) {
                    onSetUnitStatus(currentUnit.id, 'passed');
                  }
                }}
                onContinueReading={handleContinueReading}
                hasNextTopic={Boolean(nextItem)}
              />
            )}

            {/* Tutor-Marked Assignment & Written Essay Practice */}
            {currentTopic.writtenQuestions && currentTopic.writtenQuestions.length > 0 && (
              <WrittenAssessmentCheckpoint
                questions={currentTopic.writtenQuestions}
                topicTitle={currentTopic.title}
                courseCode={course.code}
                courseId={course.id}
                topicId={currentTopic.id}
                unitId={currentUnit.id}
                onEvaluationCompleted={(evaluations) => {
                  onRecordWrittenEvaluation?.(currentTopic.id, evaluations);
                  onMarkTopicCompleted(currentTopic.id);
                  const allPassed = evaluations.every((e) => e.passed);
                  if (allPassed && onSetUnitStatus) {
                    onSetUnitStatus(currentUnit.id, 'passed');
                  }
                }}
                onContinueToNextUnit={handleContinueReading}
                hasNextUnit={Boolean(nextItem)}
              />
            )}
          </div>

          {/* Bottom Topic Navigation Row */}
          <div className={`pt-8 border-t ${currentTheme.border} flex items-center justify-between gap-4`}>
            {prevItem ? (
              <button
                onClick={() => {
                  onSelectTopic(course.id, prevItem.unit.id, prevItem.topic.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`flex items-center gap-2 text-xs font-semibold ${currentTheme.subtext} hover:${currentTheme.text} transition-colors p-2`}
              >
                <ChevronLeft className="w-4 h-4" />
                <div className="text-left hidden sm:block">
                  <span className="text-[10px] text-[#8C928E] block">Previous Topic</span>
                  <span className="truncate max-w-[180px] block font-medium">{prevItem.topic.title}</span>
                </div>
              </button>
            ) : (
              <div />
            )}

            {nextItem ? (
              <button
                onClick={handleContinueReading}
                className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#14382B] hover:bg-[#0E261D] rounded-xl shadow-xs hover:shadow transition-all"
              >
                <div className="text-right">
                  <span className="text-[10px] opacity-80 block">Continue Reading</span>
                  <span className="truncate max-w-[180px] block">{nextItem.topic.title}</span>
                </div>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => {
                  onMarkTopicCompleted(currentTopic.id);
                  if (onSetUnitStatus) onSetUnitStatus(currentUnit.id, 'completed');
                  onBackToCourse();
                }}
                className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#14382B] hover:bg-[#0E261D] rounded-xl transition-all shadow-xs"
              >
                <span>Finish Unit Syllabus</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </main>

        {/* Right: Personal Study Notes Panel */}
        {notesPanelOpen && (
          <>
            {/* Mobile Notes Drawer */}
            <div className="lg:hidden fixed inset-0 z-50 flex justify-end">
              <div
                className="fixed inset-0 bg-black/60 backdrop-blur-xs"
                onClick={() => setNotesPanelOpen(false)}
              />
              <div className={`relative w-84 max-w-[90vw] h-full ${currentTheme.surface} border-l ${currentTheme.border} p-5 overflow-y-auto space-y-4 shadow-2xl z-10 animate-in slide-in-from-right duration-200`}>
                <div className="flex items-center justify-between pb-3 border-b border-black/10">
                  <div className="flex items-center gap-2">
                    <Edit3 className="w-4 h-4 text-[#14382B]" />
                    <h4 className="font-serif text-sm font-bold">Personal Notes</h4>
                  </div>
                  <button
                    onClick={() => setNotesPanelOpen(false)}
                    className="p-1 opacity-60 hover:opacity-100 rounded"
                  >
                    ✕
                  </button>
                </div>

                {/* Note Creator */}
                <form onSubmit={handleSaveQuickNote} className="space-y-3">
                  <input
                    type="text"
                    placeholder="Note title (optional)..."
                    value={newNoteTitle}
                    onChange={(e) => setNewNoteTitle(e.target.value)}
                    className={`w-full px-3 py-2 text-xs ${currentTheme.bg} border ${currentTheme.border} rounded-lg focus:outline-none focus:ring-1 focus:ring-[#14382B]`}
                  />
                  <textarea
                    rows={4}
                    placeholder="Jot down notes or reflections on this section..."
                    value={newNoteBody}
                    onChange={(e) => setNewNoteBody(e.target.value)}
                    className={`w-full px-3 py-2 text-xs ${currentTheme.bg} border ${currentTheme.border} rounded-lg focus:outline-none focus:ring-1 focus:ring-[#14382B] leading-relaxed`}
                    required
                  />
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-1.5 py-2.5 text-xs font-semibold text-white bg-[#14382B] hover:bg-[#0E261D] rounded-lg transition-colors shadow-2xs"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Note to Course</span>
                  </button>
                  {noteSavedFeedback && (
                    <p className="text-[11px] text-emerald-700 font-semibold text-center">
                      Note saved to your library!
                    </p>
                  )}
                </form>

                {/* Existing Topic Notes */}
                <div className="space-y-3 pt-3 border-t border-black/10">
                  <span className="text-[11px] font-semibold text-[#8C928E] uppercase tracking-wider block">
                    Saved Notes on this Topic ({topicNotes.length})
                  </span>
                  {topicNotes.length === 0 ? (
                    <p className="text-xs opacity-60 italic">No notes for this topic yet.</p>
                  ) : (
                    topicNotes.map((note) => (
                      <div key={note.id} className={`p-3 rounded-xl border ${currentTheme.border} bg-black/[0.02] space-y-1 text-xs`}>
                        <p className="font-semibold text-[#14382B]">{note.title}</p>
                        <p className="whitespace-pre-line leading-relaxed opacity-85">{note.content}</p>
                        <p className="text-[10px] text-[#8C928E] pt-1">
                          {new Date(note.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Desktop Notes Sidebar */}
            <aside className="hidden lg:block w-80 shrink-0 space-y-4">
              <div className={`sticky top-32 ${currentTheme.surface} border ${currentTheme.border} rounded-2xl p-5 max-h-[calc(100vh-9.5rem)] overflow-y-auto space-y-4 shadow-sm`}>
                <div className="flex items-center justify-between pb-3 border-b border-black/10">
                  <div className="flex items-center gap-2">
                    <Edit3 className="w-4 h-4 text-[#14382B]" />
                    <h4 className="font-serif text-sm font-bold">Personal Notes</h4>
                  </div>
                  <button
                    onClick={() => setNotesPanelOpen(false)}
                    className="p-1 opacity-60 hover:opacity-100 rounded"
                  >
                    ✕
                  </button>
                </div>

                {/* Note Creator */}
                <form onSubmit={handleSaveQuickNote} className="space-y-3">
                  <input
                    type="text"
                    placeholder="Note title (optional)..."
                    value={newNoteTitle}
                    onChange={(e) => setNewNoteTitle(e.target.value)}
                    className={`w-full px-3 py-1.5 text-xs ${currentTheme.bg} border ${currentTheme.border} rounded-lg focus:outline-none focus:ring-1 focus:ring-[#14382B]`}
                  />
                  <textarea
                    rows={4}
                    placeholder="Jot down notes or reflections on this section..."
                    value={newNoteBody}
                    onChange={(e) => setNewNoteBody(e.target.value)}
                    className={`w-full px-3 py-2 text-xs ${currentTheme.bg} border ${currentTheme.border} rounded-lg focus:outline-none focus:ring-1 focus:ring-[#14382B] leading-relaxed`}
                    required
                  />
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-1.5 py-2 text-xs font-semibold text-white bg-[#14382B] hover:bg-[#0E261D] rounded-lg transition-colors shadow-2xs"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Note to Course</span>
                  </button>
                  {noteSavedFeedback && (
                    <p className="text-[11px] text-emerald-700 font-semibold text-center">
                      Note saved to your library!
                    </p>
                  )}
                </form>

                {/* Existing Topic Notes */}
                <div className="space-y-3 pt-3 border-t border-black/10">
                  <span className="text-[11px] font-semibold text-[#8C928E] uppercase tracking-wider block">
                    Saved Notes on this Topic ({topicNotes.length})
                  </span>
                  {topicNotes.length === 0 ? (
                    <p className="text-xs opacity-60 italic">No notes for this topic yet.</p>
                  ) : (
                    topicNotes.map((note) => (
                      <div key={note.id} className={`p-3 rounded-xl border ${currentTheme.border} bg-black/[0.02] space-y-1 text-xs`}>
                        <p className="font-semibold text-[#14382B]">{note.title}</p>
                        <p className="whitespace-pre-line leading-relaxed opacity-85">{note.content}</p>
                        <p className="text-[10px] text-[#8C928E] pt-1">
                          {new Date(note.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </aside>
          </>
        )}
      </div>

      {/* Explain Simply Interactive Modal */}
      <ExplainSimplyModal
        isOpen={explainModalOpen}
        onClose={() => setExplainModalOpen(false)}
        topic={currentTopic}
        course={course}
        unit={currentUnit}
        onSaveAsNote={handleExplainSimplySaveNote}
      />

      {/* StudyVault AI Tutor Chatbot */}
      <AITutorChat
        course={course}
        courses={courses}
        initialCourseId={course.id}
        activeUnit={currentUnit}
        activeTopic={currentTopic}
        isOpen={aiTutorOpen}
        onClose={() => setAiTutorOpen(false)}
        onSaveExplanationAsNote={handleExplainSimplySaveNote}
      />
    </div>
  );
};
