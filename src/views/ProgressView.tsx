import React, { useState } from 'react';
import {
  BarChart3,
  BookOpen,
  CheckCircle2,
  Clock,
  Award,
  ArrowRight,
  Bookmark as BookmarkIcon,
  Trash2,
  Flag,
  AlertTriangle,
  RotateCcw,
  Check,
  Compass,
  Sparkles
} from 'lucide-react';
import { Course, UserProgress, Bookmark, QuestionMistakeRecord } from '../types';

interface ProgressViewProps {
  courses: Course[];
  progress: UserProgress;
  bookmarks: Bookmark[];
  onSelectTopic: (courseId: string, unitId: string, topicId: string) => void;
  onRemoveBookmark: (bookmarkId: string) => void;
  onToggleRevisionFlag: (topicId: string) => void;
  onClearMistakeRecord: (mistakeId: string) => void;
  onOpenAddCourse: () => void;
}

export const ProgressView: React.FC<ProgressViewProps> = ({
  courses,
  progress,
  bookmarks,
  onSelectTopic,
  onRemoveBookmark,
  onToggleRevisionFlag,
  onClearMistakeRecord,
  onOpenAddCourse,
}) => {
  const [activeTab, setActiveTab] = useState<'reading' | 'revision' | 'assessment'>('reading');

  // Aggregate stats
  let totalTopics = 0;
  courses.forEach((c) => {
    c.modules.forEach((m) => {
      m.units.forEach((u) => {
        totalTopics += u.topics.length;
      });
    });
  });

  const completedCount = progress.completedTopicIds.length;
  const overallPercent = totalTopics > 0 ? Math.round((completedCount / totalTopics) * 100) : 0;

  // Quiz statistics
  const quizEntries = Object.values(progress.quizScores);
  let totalQuizQuestionsAnswered = 0;
  let totalQuizScore = 0;
  quizEntries.forEach((q) => {
    totalQuizScore += q.score;
    totalQuizQuestionsAnswered += q.total;
  });
  const quizAccuracy =
    totalQuizQuestionsAnswered > 0
      ? Math.round((totalQuizScore / totalQuizQuestionsAnswered) * 100)
      : 0;

  // Find all topics flagged for revision
  const revisionTopics: { course: Course; unitTitle: string; topicId: string; topicTitle: string; unitId: string }[] = [];
  courses.forEach((c) => {
    c.modules.forEach((m) => {
      m.units.forEach((u) => {
        u.topics.forEach((t) => {
          if (progress.flaggedForRevisionTopicIds?.includes(t.id)) {
            revisionTopics.push({
              course: c,
              unitTitle: u.title,
              topicId: t.id,
              topicTitle: t.title,
              unitId: u.id,
            });
          }
        });
      });
    });
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in">
      {/* Header Bar */}
      <div className="bg-white border border-[#E8E4DC] rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#E8E4DC]">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#14382B]">
              <Compass className="w-3.5 h-3.5 text-[#C88A36]" />
              <span>Retention & Mastery Analytics</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-4xl font-bold text-[#14382B]">
              Progress & Retention Hub
            </h1>
            <p className="text-xs sm:text-sm text-[#585E5A]">
              Detailed tracking across reading completion, revision bookmarks, and mistake resolution.
            </p>
          </div>

          {/* 3 Segregated Tracking Tabs */}
          <div className="flex items-center gap-1 p-1 bg-[#F0ECE4] rounded-xl self-start md:self-auto">
            <button
              onClick={() => setActiveTab('reading')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'reading' ? 'bg-white text-[#191C1A] shadow-xs' : 'text-[#585E5A] hover:text-[#191C1A]'
              }`}
            >
              1. Reading ({completedCount}/{totalTopics})
            </button>
            <button
              onClick={() => setActiveTab('revision')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'revision' ? 'bg-white text-[#191C1A] shadow-xs' : 'text-[#585E5A] hover:text-[#191C1A]'
              }`}
            >
              2. Revision ({revisionTopics.length})
            </button>
            <button
              onClick={() => setActiveTab('assessment')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'assessment' ? 'bg-white text-[#191C1A] shadow-xs' : 'text-[#585E5A] hover:text-[#191C1A]'
              }`}
            >
              3. Mistakes Bank ({progress.mistakesBank?.length || 0})
            </button>
          </div>
        </div>

        {/* KPI Strip with tabular numbers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#FAF8F5] border border-[#E8E4DC] p-5 rounded-xl space-y-1">
            <span className="text-xs text-[#585E5A]">Enrolled Courses</span>
            <div className="font-mono text-2xl font-bold text-[#191C1A] tabular-nums">
              {courses.length}
            </div>
            <p className="text-[11px] text-[#8C928E] pt-1">
              Isolated course vaults
            </p>
          </div>

          <div className="bg-[#FAF8F5] border border-[#E8E4DC] p-5 rounded-xl space-y-1">
            <span className="text-xs text-[#585E5A]">Reading Mastery</span>
            <div className="font-mono text-2xl font-bold text-[#14382B] tabular-nums">
              {completedCount} <span className="text-xs font-normal text-[#585E5A]">/ {totalTopics}</span>
            </div>
            <div className="w-full h-1.5 bg-[#E8E4DC] rounded-full overflow-hidden mt-2">
              <div
                className="h-full bg-[#14382B] rounded-full transition-all duration-300"
                style={{ width: `${overallPercent}%` }}
              />
            </div>
          </div>

          <div className="bg-[#FAF8F5] border border-[#E8E4DC] p-5 rounded-xl space-y-1">
            <span className="text-xs text-[#585E5A]">Revision Queue</span>
            <div className="font-mono text-2xl font-bold text-amber-700 tabular-nums">
              {revisionTopics.length}
            </div>
            <p className="text-[11px] text-[#8C928E] pt-1">
              Flagged topics awaiting review
            </p>
          </div>

          <div className="bg-[#FAF8F5] border border-[#E8E4DC] p-5 rounded-xl space-y-1">
            <span className="text-xs text-[#585E5A]">Checkpoint Accuracy</span>
            <div className="font-mono text-2xl font-bold text-[#14382B] tabular-nums">
              {quizAccuracy}%
            </div>
            <p className="text-[11px] text-[#8C928E] pt-1">
              {totalQuizScore} / {totalQuizQuestionsAnswered} answered correctly
            </p>
          </div>
        </div>
      </div>

      {/* TAB 1: READING MASTERY */}
      {activeTab === 'reading' && (
        <div className="space-y-6">
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-lg font-bold text-[#191C1A]">
                Course Reading Ledger ({courses.length})
              </h3>
            </div>

            {courses.length === 0 ? (
              <div className="bg-white border border-[#E8E4DC] p-10 rounded-2xl text-center space-y-2 shadow-xs">
                <BookOpen className="w-8 h-8 text-[#8C928E] mx-auto" />
                <p className="text-sm font-semibold text-[#191C1A]">No courses enrolled</p>
                <button
                  onClick={onOpenAddCourse}
                  className="mt-2 px-4 py-2 text-xs font-semibold text-white bg-[#14382B] hover:bg-[#0E261D] rounded-xl"
                >
                  + Add Course
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {courses.map((course) => {
                  let totalUnits = 0;
                  let courseTopics = 0;
                  let courseCompleted = 0;
                  let unitsStarted = 0;
                  let unitsCompleted = 0;
                  let unitsPassed = 0;
                  let unitsAwaitingAssessment = 0;
                  let firstTopic: { unitId: string; topicId: string } | null = null;

                  course.modules.forEach((mod) => {
                    mod.units.forEach((u) => {
                      totalUnits++;
                      let uTopics = 0;
                      let uCompleted = 0;

                      u.topics.forEach((t) => {
                        if (!firstTopic) firstTopic = { unitId: u.id, topicId: t.id };
                        courseTopics++;
                        uTopics++;
                        if (progress.completedTopicIds.includes(t.id)) {
                          courseCompleted++;
                          uCompleted++;
                        }
                      });

                      const status = progress.unitStatuses[u.id];
                      const evalList = progress.writtenEvaluations[u.id] || [];
                      const isPassed = evalList.some((e) => e.passed);

                      if (uCompleted > 0 || status === 'in_progress' || status === 'completed') {
                        unitsStarted++;
                      }
                      if (uCompleted === uTopics && uTopics > 0) {
                        unitsCompleted++;
                      }
                      if (isPassed) {
                        unitsPassed++;
                      } else if (uCompleted === uTopics && uTopics > 0) {
                        unitsAwaitingAssessment++;
                      }
                    });
                  });

                  const coursePct = courseTopics > 0 ? Math.round((courseCompleted / courseTopics) * 100) : 0;
                  const courseBookmarks = bookmarks.filter((b) => b.courseId === course.id);

                  return (
                    <div
                      key={course.id}
                      className="bg-white border border-[#E8E4DC] rounded-2xl p-6 space-y-4 shadow-xs"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="space-y-1 sm:max-w-md">
                          <div className="flex items-center gap-2 text-xs text-[#585E5A]">
                            <span className="font-mono font-bold text-[#14382B] bg-[#FAF8F5] border border-[#E8E4DC] px-2 py-0.5 rounded">
                              {course.code}
                            </span>
                            <span>{totalUnits} Units</span>
                            <span aria-hidden="true">·</span>
                            <span>{courseTopics} Topics</span>
                          </div>
                          <h4 className="font-serif text-lg font-bold text-[#14382B]">
                            {course.title}
                          </h4>
                        </div>

                        {firstTopic && (
                          <button
                            onClick={() => onSelectTopic(course.id, firstTopic!.unitId, firstTopic!.topicId)}
                            className="flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#14382B] hover:bg-[#0E261D] rounded-xl transition-all self-start sm:self-center shrink-0 shadow-2xs"
                          >
                            <span>Study Syllabus</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>

                      {/* Reading Progress Bar */}
                      <div className="space-y-1.5 pt-1">
                        <div className="flex justify-between text-xs text-[#585E5A]">
                          <span>{courseCompleted} of {courseTopics} topics read</span>
                          <span className="font-mono font-semibold text-[#14382B]">{coursePct}%</span>
                        </div>
                        <div className="w-full h-2 bg-[#F0ECE4] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#14382B] rounded-full transition-all"
                            style={{ width: `${coursePct}%` }}
                          />
                        </div>
                      </div>

                      {/* Units Breakdown Strip */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2 border-t border-[#E8E4DC] text-xs">
                        <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#E8E4DC]">
                          <span className="text-[10px] text-[#8C928E] block uppercase tracking-wider font-semibold">Total Units</span>
                          <span className="font-mono text-base font-bold text-[#191C1A]">{totalUnits}</span>
                        </div>
                        <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#E8E4DC]">
                          <span className="text-[10px] text-[#8C928E] block uppercase tracking-wider font-semibold">In Progress</span>
                          <span className="font-mono text-base font-bold text-amber-700">{unitsStarted}</span>
                        </div>
                        <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#E8E4DC]">
                          <span className="text-[10px] text-[#8C928E] block uppercase tracking-wider font-semibold">Completed</span>
                          <span className="font-mono text-base font-bold text-emerald-800">{unitsCompleted}</span>
                        </div>
                        <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                          <span className="text-[10px] text-emerald-800 block uppercase tracking-wider font-semibold">Passed Units</span>
                          <span className="font-mono text-base font-bold text-emerald-900">{unitsPassed}</span>
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="flex items-center gap-4 text-xs text-[#8C928E] pt-1">
                        <span>{courseBookmarks.length} Bookmarks</span>
                        <span aria-hidden="true">·</span>
                        <span>{course.documents[0]?.name || 'Course Document'}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>

          {/* Bookmarks Section */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-lg font-bold text-[#191C1A]">
                Saved Reading Bookmarks ({bookmarks.length})
              </h3>
            </div>

            {bookmarks.length === 0 ? (
              <div className="bg-white border border-[#E8E4DC] p-8 rounded-2xl text-center space-y-2 shadow-xs">
                <BookmarkIcon className="w-8 h-8 text-[#8C928E] mx-auto" />
                <p className="text-sm font-semibold text-[#191C1A]">No bookmarks saved yet</p>
                <p className="text-xs text-[#585E5A]">
                  Click the bookmark icon in the reading header to pin important paragraphs.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {bookmarks.map((bm) => (
                  <div
                    key={bm.id}
                    className="bg-white border border-[#E8E4DC] rounded-2xl p-5 flex flex-col justify-between hover:border-[#14382B]/40 transition-all shadow-2xs"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs text-[#585E5A]">
                        <span className="font-semibold text-[#14382B]">{bm.courseTitle}</span>
                        <button
                          onClick={() => onRemoveBookmark(bm.id)}
                          className="text-[#8C928E] hover:text-rose-600 transition-colors p-1"
                          title="Remove bookmark"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <h4 className="font-serif text-sm font-bold text-[#191C1A] leading-snug">
                        {bm.topicTitle}
                      </h4>
                      <p className="text-[11px] text-[#8C928E] truncate">{bm.unitTitle}</p>
                    </div>

                    <div className="pt-3 mt-3 border-t border-[#E8E4DC] flex items-center justify-between">
                      <span className="text-[10px] text-[#8C928E]">
                        {new Date(bm.savedAt).toLocaleDateString()}
                      </span>
                      <button
                        onClick={() => onSelectTopic(bm.courseId, bm.unitId, bm.topicId)}
                        className="text-xs font-semibold text-[#14382B] hover:underline flex items-center gap-1"
                      >
                        <span>Resume</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      )}

      {/* TAB 2: REVISION TRACKING */}
      {activeTab === 'revision' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif text-lg font-bold text-[#191C1A]">
                Topics Flagged for Revision ({revisionTopics.length})
              </h3>
              <p className="text-xs text-[#585E5A]">
                Topics you flagged during study sessions to revisit before exams.
              </p>
            </div>
          </div>

          {revisionTopics.length === 0 ? (
            <div className="bg-white border border-[#E8E4DC] p-12 rounded-2xl text-center space-y-2 shadow-xs">
              <Flag className="w-8 h-8 text-[#8C928E] mx-auto" />
              <p className="text-sm font-semibold text-[#191C1A]">No topics flagged for revision</p>
              <p className="text-xs text-[#585E5A] max-w-sm mx-auto">
                While reading any unit topic, click the "Flag" button in the reading header to queue it here.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {revisionTopics.map((item) => (
                <div
                  key={item.topicId}
                  className="bg-white border border-amber-200 rounded-2xl p-6 space-y-3.5 shadow-2xs hover:border-amber-400 transition-all"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono font-bold text-[#14382B] bg-[#FAF8F5] border border-[#E8E4DC] px-2 py-0.5 rounded">
                      {item.course.code}
                    </span>
                    <button
                      onClick={() => onToggleRevisionFlag(item.topicId)}
                      className="text-xs text-amber-800 hover:text-amber-950 font-semibold flex items-center gap-1"
                      title="Unflag from revision"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Mark Revised</span>
                    </button>
                  </div>

                  <div>
                    <h4 className="font-serif text-base font-bold text-[#191C1A]">
                      {item.topicTitle}
                    </h4>
                    <p className="text-xs text-[#8C928E] mt-0.5">{item.unitTitle}</p>
                  </div>

                  <div className="pt-3 border-t border-amber-100 flex items-center justify-between">
                    <span className="text-[11px] text-amber-900 font-medium">Pending Review</span>
                    <button
                      onClick={() => onSelectTopic(item.course.id, item.unitId, item.topicId)}
                      className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-[#14382B] hover:bg-[#0E261D] rounded-xl transition-colors shadow-2xs"
                    >
                      <span>Open Topic</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: MISTAKES BANK */}
      {activeTab === 'assessment' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="font-serif text-lg font-bold text-[#191C1A]">
                Mistakes Bank & Resolution Queue
              </h3>
              <p className="text-xs text-[#585E5A]">
                Targeted review of missed checkpoint items to reinforce weak points before exams.
              </p>
            </div>
          </div>

          {(!progress.mistakesBank || progress.mistakesBank.length === 0) ? (
            <div className="bg-white border border-[#E8E4DC] p-12 rounded-2xl text-center space-y-2 shadow-xs">
              <CheckCircle2 className="w-8 h-8 text-emerald-700 mx-auto" />
              <p className="text-sm font-semibold text-[#191C1A]">Zero Outstanding Mistakes</p>
              <p className="text-xs text-[#585E5A] max-w-sm mx-auto">
                Whenever you answer a checkpoint question incorrectly, it appears here for spaced review.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {progress.mistakesBank.map((mistake) => (
                <div
                  key={mistake.id}
                  className="bg-white border border-[#E8E4DC] rounded-2xl p-6 space-y-3.5 shadow-2xs hover:border-[#14382B]/30 transition-all"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-[#14382B] bg-[#FAF8F5] border border-[#E8E4DC] px-2 py-0.5 rounded">
                        {mistake.courseCode}
                      </span>
                      <span className="text-[#585E5A]">{mistake.topicTitle}</span>
                    </div>

                    <button
                      onClick={() => onClearMistakeRecord(mistake.id)}
                      className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 flex items-center gap-1"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Mark Resolved</span>
                    </button>
                  </div>

                  <p className="font-serif text-base font-bold text-[#191C1A] leading-relaxed">
                    {mistake.questionPrompt}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-rose-950">
                      <span className="font-semibold block text-rose-800 mb-0.5">Your Selected Answer:</span>
                      <span>{mistake.selectedOptionText}</span>
                    </div>

                    <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-950">
                      <span className="font-semibold block text-emerald-800 mb-0.5">Correct Answer:</span>
                      <span>{mistake.correctOptionText}</span>
                    </div>
                  </div>

                  <div className="p-3.5 bg-[#FAF8F5] border border-[#E8E4DC] rounded-xl text-xs text-[#585E5A] leading-relaxed">
                    <strong className="text-[#191C1A]">Textbook Rationale: </strong>
                    {mistake.explanation}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
