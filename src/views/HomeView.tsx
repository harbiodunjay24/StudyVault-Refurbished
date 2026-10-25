import React, { useMemo } from 'react';
import {
  ArrowRight,
  BookOpen,
  Sparkles,
  Archive,
  CheckCircle2,
  Plus,
  Clock,
  Compass,
  FileText,
  Flame,
  BookmarkCheck,
  BrainCircuit,
  GraduationCap,
  Layers,
  ChevronRight
} from 'lucide-react';
import { Course, UserProgress } from '../types';
import { NavView } from '../components/Navbar';

interface HomeViewProps {
  courses: Course[];
  progress: UserProgress;
  onNavigate: (view: NavView) => void;
  onOpenAddCourse: () => void;
  onSelectCourseAndTopic: (courseId: string, unitId: string, topicId: string) => void;
  onLoadPresetCourse?: (presetType: 'fms' | 'ent' | 'ent304' | 'ent308' | 'csc') => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  courses,
  progress,
  onNavigate,
  onOpenAddCourse,
  onSelectCourseAndTopic,
  onLoadPresetCourse,
}) => {
  // Find last studied item if available
  const lastCourse = courses.find((c) => c.id === progress.lastActiveCourseId) || courses[0];
  let lastTopic: any = null;
  let lastUnit: any = null;

  if (lastCourse && lastCourse.modules.length > 0) {
    for (const mod of lastCourse.modules) {
      for (const u of mod.units) {
        const found = u.topics.find((t) => t.id === progress.lastActiveTopicId);
        if (found) {
          lastTopic = found;
          lastUnit = u;
          break;
        }
      }
      if (lastTopic) break;
    }
    // Fallback to first topic if last not found
    if (!lastTopic && lastCourse.modules[0]?.units[0]?.topics[0]) {
      lastUnit = lastCourse.modules[0].units[0];
      lastTopic = lastCourse.modules[0].units[0].topics[0];
    }
  }

  // Count total topics and completed topics (memoized)
  const { totalTopics, overallPercentage } = useMemo(() => {
    let total = 0;
    courses.forEach((c) => {
      c.modules.forEach((m) => {
        m.units.forEach((u) => {
          total += u.topics.length;
        });
      });
    });
    const completed = progress.completedTopicIds.length;
    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { totalTopics: total, overallPercentage: percent };
  }, [courses, progress.completedTopicIds]);

  return (
    <div className="space-y-14 sm:space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative pt-10 sm:pt-16 pb-12 sm:pb-16 border-b border-[#E8E4DC] overflow-hidden">
        {/* Subtle Architectural Linework Background */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.035] flex items-center justify-center">
          <svg width="800" height="800" viewBox="0 0 100 100" fill="none" stroke="currentColor">
            <circle cx="50" cy="50" r="48" strokeWidth="0.5" />
            <circle cx="50" cy="50" r="36" strokeWidth="0.5" strokeDasharray="1 2" />
            <circle cx="50" cy="50" r="24" strokeWidth="0.5" />
            <polygon points="50,2 98,50 50,98 2,50" strokeWidth="0.5" />
            <polygon points="50,14 86,50 50,86 14,50" strokeWidth="0.5" strokeDasharray="2 2" />
            <line x1="0" y1="50" x2="100" y2="50" strokeWidth="0.5" />
            <line x1="50" y1="0" x2="50" y2="100" strokeWidth="0.5" />
          </svg>
        </div>

        <div className="max-w-4xl mx-auto text-center px-4 space-y-6 relative z-10">
          {/* Unboxed Kicker */}
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#14382B]">
            <Compass className="w-3.5 h-3.5 text-[#C88A36]" />
            <span>Academic Focus & Comprehension Engine</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#14382B] text-balance leading-[1.12]">
            Where academic syllabus becomes clarity and exam mastery.
          </h1>

          <p className="text-base sm:text-lg text-[#585E5A] max-w-2xl mx-auto leading-relaxed font-normal">
            An isolated, distraction-free study sanctuary. Upload your course syllabus, read with bespoke typography, simplify complex concepts, test yourself with checkpoints, and master authentic past exams.
          </p>

          {/* Primary Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <button
              onClick={() => onNavigate('start-studying')}
              className="w-full sm:w-auto px-7 py-3.5 text-sm font-semibold text-white bg-[#14382B] hover:bg-[#0E261D] rounded-xl shadow-md hover:shadow-lg transition-all active:scale-[0.99] flex items-center justify-center gap-2.5 group focus-visible:ring-2 focus-visible:ring-[#14382B]"
            >
              <span>{courses.length > 0 ? 'Open Study Library' : 'Start Studying'}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={onOpenAddCourse}
              className="w-full sm:w-auto px-6 py-3.5 text-sm font-semibold text-[#14382B] bg-white border border-[#D8D2C6] hover:bg-[#FAF8F5] hover:border-[#14382B]/40 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-2xs"
            >
              <Plus className="w-4 h-4" />
              <span>+ Add Course Material</span>
            </button>
          </div>

          {/* Unboxed Metadata */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-[#8C928E]">
            <span>Supports PDF, DOCX, PPTX & TXT</span>
            <span aria-hidden="true">·</span>
            <span>Local Browser Privacy</span>
            <span aria-hidden="true">·</span>
            <span>Grounded In Syllabus</span>
            <span aria-hidden="true">·</span>
            <span>Zero Distraction Reading</span>
          </div>
        </div>
      </section>

      {/* Dynamic Active Study Card (if active topic exists) */}
      {/* Prominent Continue Studying Banner */}
      {lastCourse && lastUnit && lastTopic && (
        <section className="max-w-4xl mx-auto px-4">
          <div className="bg-white border-2 border-[#14382B]/20 hover:border-[#14382B] rounded-3xl p-6 sm:p-8 shadow-md hover:shadow-xl transition-all relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#14382B]/5 rounded-bl-full pointer-events-none" />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
              <div className="space-y-3 flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="font-bold text-[#14382B] uppercase tracking-wider flex items-center gap-1.5 bg-[#FAF2E6] border border-[#E8DEC9] px-2.5 py-1 rounded-md">
                    <Clock className="w-3.5 h-3.5 text-[#C88A36]" />
                    Continue Studying
                  </span>
                  <span className="font-mono font-bold text-xs text-[#14382B] bg-[#F0ECE4] px-2 py-0.5 rounded">
                    {lastCourse.code}
                  </span>
                  <span className="text-[11px] text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1 font-medium">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    Cloud Synced
                  </span>
                  {((progress.lastActiveStudySession?.readingPositionRatio) ?? (progress.lastReadingPositionRatio) ?? (progress.unitReadingPositions?.[lastUnit.id] || 0)) > 0 && (
                    <span className="font-mono text-xs text-[#9C6B28] font-bold">
                      {(progress.lastActiveStudySession?.readingPositionRatio) ?? (progress.lastReadingPositionRatio) ?? (progress.unitReadingPositions?.[lastUnit.id] || 0)}% completed
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#191C1A] group-hover:text-[#14382B] transition-colors leading-snug">
                    {lastTopic.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#585E5A] mt-1">
                    {lastUnit.title} • {lastCourse.title}
                  </p>
                </div>

                {/* Reading position bar */}
                {((progress.lastActiveStudySession?.readingPositionRatio) ?? (progress.lastReadingPositionRatio) ?? (progress.unitReadingPositions?.[lastUnit.id] || 0)) > 0 && (
                  <div className="space-y-1 pt-1 max-w-md">
                    <div className="w-full h-2 bg-[#F0ECE4] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#14382B] rounded-full transition-all duration-300"
                        style={{
                          width: `${Math.max(
                            5,
                            (progress.lastActiveStudySession?.readingPositionRatio) ??
                              (progress.lastReadingPositionRatio) ??
                              (progress.unitReadingPositions?.[lastUnit.id] || 0)
                          )}%`,
                        }}
                      />
                    </div>
                    <span className="text-[10px] text-[#8C928E] block">
                      Pick up right where you stopped on your computer or phone (~
                      {(progress.lastActiveStudySession?.readingPositionRatio) ??
                        (progress.lastReadingPositionRatio) ??
                        (progress.unitReadingPositions?.[lastUnit.id] || 0)}
                      % scroll depth)
                    </span>
                  </div>
                )}
              </div>

              <div className="shrink-0 flex flex-col sm:items-end gap-2">
                <button
                  onClick={() => onSelectCourseAndTopic(lastCourse.id, lastUnit.id, lastTopic.id)}
                  className="px-7 py-3.5 text-sm font-semibold text-white bg-[#14382B] hover:bg-[#0E261D] rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group-hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <span>Continue Studying</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
                <span className="text-[11px] text-[#8C928E]">
                  Resumes automatically on any device
                </span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Quick Verified Presets Loader Strip (if user wants to test quickly) */}
      {courses.length === 0 && onLoadPresetCourse && (
        <section className="max-w-4xl mx-auto px-4">
          <div className="bg-[#FAF8F5] border border-[#E8DEC9] rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#C88A36]" />
              <h3 className="font-serif text-base font-bold text-[#191C1A]">
                Instant Study Sandbox (Pre-Verified Academic Curricula)
              </h3>
            </div>
            <p className="text-xs text-[#585E5A] leading-relaxed">
              Don't have your own course syllabus PDF right now? Click any verified university curriculum below to load full structured units, checkpoint quizzes, and authentic past questions instantly:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-1">
              <button
                onClick={() => onLoadPresetCourse('ent308')}
                className="p-3 bg-white border border-[#E8E4DC] hover:border-[#14382B]/60 rounded-xl text-left transition-all group"
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-mono font-bold text-[#14382B]">ENT 308</span>
                  <span className="text-[10px] text-[#8C928E]">14 Units</span>
                </div>
                <div className="font-serif text-xs font-bold text-[#191C1A] group-hover:text-[#14382B] transition-colors truncate">
                  Family Business Management
                </div>
                <div className="text-[11px] text-[#585E5A] mt-1">Verified NOUN PDF Guide</div>
              </button>

              <button
                onClick={() => onLoadPresetCourse('ent304')}
                className="p-3 bg-white border border-[#E8E4DC] hover:border-[#14382B]/60 rounded-xl text-left transition-all group"
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-mono font-bold text-[#14382B]">ENT 304</span>
                  <span className="text-[10px] text-[#8C928E]">12 Units</span>
                </div>
                <div className="font-serif text-xs font-bold text-[#191C1A] group-hover:text-[#14382B] transition-colors truncate">
                  Leadership & Corporate Gov.
                </div>
                <div className="text-[11px] text-[#585E5A] mt-1">Ethics & Accountability</div>
              </button>

              <button
                onClick={() => onLoadPresetCourse('fms')}
                className="p-3 bg-white border border-[#E8E4DC] hover:border-[#14382B]/60 rounded-xl text-left transition-all group"
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-mono font-bold text-[#14382B]">FMS 304</span>
                  <span className="text-[10px] text-[#8C928E]">10 Units</span>
                </div>
                <div className="font-serif text-xs font-bold text-[#191C1A] group-hover:text-[#14382B] transition-colors truncate">
                  Research Methodology
                </div>
                <div className="text-[11px] text-[#585E5A] mt-1">Sampling & Formulas</div>
              </button>
            </div>
          </div>
        </section>
      )}

      {/* 4 Pillars of Study Architecture */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#191C1A]">
            Architected for deep cognitive retention
          </h2>
          <p className="text-xs sm:text-sm text-[#585E5A]">
            Every feature in StudyVault AI is calibrated to avoid superficial skimming and foster long-term mastery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white border border-[#E8E4DC] p-6 rounded-2xl space-y-3 shadow-xs hover:border-[#14382B]/40 transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#FAF8F5] border border-[#E8E4DC] text-[#14382B] flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-base font-bold text-[#191C1A]">
              01. Focused Reading Canvas
            </h3>
            <p className="text-xs text-[#585E5A] leading-relaxed">
              Read without cognitive overload. Customize font sizes, switch between Serif and Sans, choose Parchment or Midnight modes, and highlight key ideas.
            </p>
          </div>

          <div className="bg-white border border-[#E8E4DC] p-6 rounded-2xl space-y-3 shadow-xs hover:border-[#14382B]/40 transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#FAF8F5] border border-[#E8E4DC] text-[#14382B] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-[#C88A36]" />
            </div>
            <h3 className="font-serif text-base font-bold text-[#191C1A]">
              02. Explain Simply Engine
            </h3>
            <p className="text-xs text-[#585E5A] leading-relaxed">
              Encountering dense academic jargon? Access intuitive real-world analogies, 5-year-old summaries, and actionable exam tips with one tap.
            </p>
          </div>

          <div className="bg-white border border-[#E8E4DC] p-6 rounded-2xl space-y-3 shadow-xs hover:border-[#14382B]/40 transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#FAF8F5] border border-[#E8E4DC] text-[#14382B] flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-[#14382B]" />
            </div>
            <h3 className="font-serif text-base font-bold text-[#191C1A]">
              03. Checkpoint Mastery
            </h3>
            <p className="text-xs text-[#585E5A] leading-relaxed">
              Test comprehension right after reading each topic. Receive immediate explanations for each choice option and bank mistakes for spaced review.
            </p>
          </div>

          <div className="bg-white border border-[#E8E4DC] p-6 rounded-2xl space-y-3 shadow-xs hover:border-[#14382B]/40 transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#FAF8F5] border border-[#E8E4DC] text-[#14382B] flex items-center justify-center">
              <Archive className="w-5 h-5 text-[#14382B]" />
            </div>
            <h3 className="font-serif text-base font-bold text-[#191C1A]">
              04. Past Questions Vault
            </h3>
            <p className="text-xs text-[#585E5A] leading-relaxed">
              Practice authentic past university exams with real timed sessions, marking guides, and rubric scoring without mixing content across courses.
            </p>
          </div>
        </div>
      </section>

      {/* Enrolled Courses Preview Strip if courses exist */}
      {courses.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#E8E4DC]">
            <div>
              <h3 className="font-serif text-lg font-bold text-[#191C1A]">
                Your Enrolled Study Vaults
              </h3>
              <p className="text-xs text-[#585E5A]">
                Isolated workspaces protecting your course progress
              </p>
            </div>
            <button
              onClick={() => onNavigate('courses')}
              className="text-xs font-semibold text-[#14382B] hover:underline flex items-center gap-1"
            >
              <span>View All ({courses.length})</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {courses.slice(0, 3).map((c) => {
              const cTopics = c.modules.flatMap((m) => m.units.flatMap((u) => u.topics));
              const cCompleted = cTopics.filter((t) => progress.completedTopicIds.includes(t.id)).length;
              const cPct = cTopics.length > 0 ? Math.round((cCompleted / cTopics.length) * 100) : 0;

              return (
                <div
                  key={c.id}
                  onClick={() => onNavigate('courses')}
                  className="bg-white border border-[#E8E4DC] rounded-xl p-5 hover:border-[#14382B]/50 transition-all cursor-pointer shadow-2xs group flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-[#14382B] bg-[#FAF8F5] border border-[#E8E4DC] px-2 py-0.5 rounded">
                        {c.code}
                      </span>
                      <span className="text-[11px] text-[#8C928E] font-mono">{cPct}% Read</span>
                    </div>
                    <h4 className="font-serif text-base font-bold text-[#191C1A] group-hover:text-[#14382B] transition-colors truncate">
                      {c.title}
                    </h4>
                    <p className="text-xs text-[#585E5A] line-clamp-2">
                      {c.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#E8E4DC] flex items-center justify-between text-xs text-[#14382B] font-semibold">
                    <span>Open Syllabus</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
};
