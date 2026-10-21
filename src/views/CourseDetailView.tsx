import React, { useState } from 'react';
import {
  ArrowLeft,
  Plus,
  BookOpen,
  FileText,
  CheckCircle2,
  Clock,
  Upload,
  HelpCircle,
  Sparkles,
  ChevronRight,
  Bookmark,
  PenTool,
  Flag,
  Award,
  AlertCircle,
  Lock,
  X,
  Headphones
} from 'lucide-react';
import { Course, UserProgress, PersonalNote, PastExamQuestionItem, PastQuestionDocument, UnitStatus, StudyUnit, StudyTopic } from '../types';
import { AITutorChat } from '../components/AITutorChat';
import { CoursePastQuestionsSection } from '../components/CoursePastQuestionsSection';
import { VoiceLearningMode } from '../services/voiceLearningService';
import { getPastQuestionsForCourse } from '../services/storage';
import { ENT308_UPLOADED_PQ_DOCUMENTS } from '../services/ent308PastQuestionsData';
import { ENT304_UPLOADED_PQ_DOCUMENTS } from '../services/ent304PastQuestionsData';
import { ENT302_UPLOADED_PQ_DOCUMENTS } from '../services/ent302PastQuestionsData';
import { FMS304_UPLOADED_PQ_DOCUMENTS } from '../services/fms304PastQuestionsData';

interface CourseDetailViewProps {
  course: Course;
  allCourses?: Course[];
  progress: UserProgress;
  notes: PersonalNote[];
  pastQuestions: PastExamQuestionItem[];
  onBack: () => void;
  onSelectTopic: (courseId: string, unitId: string, topicId: string) => void;
  onOpenAddDocument: () => void;
  onStartCoursePractice: (courseId: string) => void;
  onSetUnitStatus?: (unitId: string, status: UnitStatus) => void;
  onAddPastQuestions?: (newQuestions: PastExamQuestionItem[], documentInfo?: PastQuestionDocument) => void;
  onSaveNote?: (note: Omit<PersonalNote, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onOpenAudioPlayer?: (course: Course, unit?: StudyUnit | null, questions?: PastExamQuestionItem[], mode?: VoiceLearningMode) => void;
}

export const CourseDetailView: React.FC<CourseDetailViewProps> = ({
  course,
  allCourses,
  progress,
  notes,
  pastQuestions,
  onBack,
  onSelectTopic,
  onOpenAddDocument,
  onStartCoursePractice,
  onAddPastQuestions,
  onSaveNote,
  onOpenAudioPlayer,
}) => {
  const [activeTab, setActiveTab] = useState<'syllabus' | 'past_questions' | 'documents' | 'notes'>('syllabus');
  const [aiTutorOpen, setAiTutorOpen] = useState(false);
  const [lockedModal, setLockedModal] = useState<{ open: boolean; message: string; blockingUnit?: StudyUnit } | null>(null);

  // Filter notes and past questions strictly to this course
  const courseNotes = notes.filter((n) => n.courseId === course.id);
  const courseQuestions = getPastQuestionsForCourse(pastQuestions, course, allCourses);

  // Authoritative past-question documents for this course
  const pqDocuments: PastQuestionDocument[] =
    course.pastQuestionDocuments && course.pastQuestionDocuments.length > 0
      ? course.pastQuestionDocuments
      : /ENT[-_\s]?308/i.test(course.code)
      ? ENT308_UPLOADED_PQ_DOCUMENTS
      : /ENT[-_\s]?304/i.test(course.code)
      ? ENT304_UPLOADED_PQ_DOCUMENTS
      : /ENT[-_\s]?302/i.test(course.code)
      ? ENT302_UPLOADED_PQ_DOCUMENTS
      : /FMS[-_\s]?304|SMS[-_\s]?304/i.test(course.code)
      ? FMS304_UPLOADED_PQ_DOCUMENTS
      : [];

  // Overall reading progress calculation
  let totalTopics = 0;
  let completedTopics = 0;
  course.modules.forEach((mod) => {
    mod.units.forEach((u) => {
      u.topics.forEach((t) => {
        totalTopics++;
        if (progress.completedTopicIds.includes(t.id)) {
          completedTopics++;
        }
      });
    });
  });
  const percentCompleted = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;

  // Compute unit status helper
  const getUnitStatus = (unitId: string, unitTopics: { id: string }[]): UnitStatus => {
    if (progress.unitStatuses && progress.unitStatuses[unitId]) {
      return progress.unitStatuses[unitId];
    }
    const completedInUnit = unitTopics.filter((t) => progress.completedTopicIds.includes(t.id)).length;
    if (completedInUnit === 0) return 'not_started';
    if (completedInUnit === unitTopics.length) return 'completed';
    return 'in_progress';
  };

  // Find next uncompleted topic or first topic
  let targetUnit = course.modules[0]?.units[0];
  let targetTopic = course.modules[0]?.units[0]?.topics[0];
  for (const mod of course.modules) {
    for (const u of mod.units) {
      for (const t of u.topics) {
        if (!progress.completedTopicIds.includes(t.id)) {
          targetUnit = u;
          targetTopic = t;
          break;
        }
      }
      if (targetTopic && !progress.completedTopicIds.includes(targetTopic.id)) break;
    }
    if (targetTopic && !progress.completedTopicIds.includes(targetTopic.id)) break;
  }

  // Sequential unit progression list & lock checker
  const orderedUnits = course.modules.flatMap((m) => m.units);
  const isUnitLocked = (unitId: string): { locked: boolean; reason?: string; blockingUnit?: StudyUnit } => {
    const idx = orderedUnits.findIndex((u) => u.id === unitId);
    if (idx <= 0) return { locked: false };

    // Check all previous units
    for (let i = 0; i < idx; i++) {
      const prev = orderedUnits[i];
      const prevStatus = getUnitStatus(prev.id, prev.topics);
      const isPrevPassed = prevStatus === 'passed' || prevStatus === 'completed';
      if (!isPrevPassed) {
        return {
          locked: true,
          reason: `Mandatory Unit Progression: You must complete and pass the assessment for "${prev.title}" (minimum 70% passing score) before unlocking this unit.`,
          blockingUnit: prev,
        };
      }
    }
    return { locked: false };
  };

  const statusLabels: Record<UnitStatus, { label: string; textClass: string }> = {
    locked: { label: 'Locked', textClass: 'text-[#8C928E]' },
    not_started: { label: 'Not Started', textClass: 'text-[#8C928E]' },
    in_progress: { label: 'In Progress', textClass: 'text-amber-700 font-medium' },
    assessment_required: { label: 'Assessment Required', textClass: 'text-blue-700 font-medium' },
    needs_practice: { label: 'Needs Practice', textClass: 'text-orange-700 font-medium' },
    passed: { label: 'Passed', textClass: 'text-emerald-700 font-medium' },
    completed: { label: 'Completed', textClass: 'text-emerald-700 font-medium' },
    needs_revision: { label: 'Needs Revision', textClass: 'text-rose-700 font-medium' },
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in">
      {/* Back button */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#585E5A] hover:text-[#14382B] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Course Selector</span>
      </button>

      {/* Course Hero Banner */}
      <div className="bg-white border border-[#E8E4DC] rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-5">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#585E5A]">
              <span className="font-mono font-bold text-[#14382B] bg-[#FAF8F5] border border-[#E8E4DC] px-2 py-0.5 rounded">
                {course.code}
              </span>
              {course.department && (
                <>
                  <span aria-hidden="true">·</span>
                  <span>{course.department}</span>
                </>
              )}
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#14382B]">
              {course.title}
            </h1>
            <p className="text-xs sm:text-sm text-[#585E5A] max-w-3xl leading-relaxed">
              {course.description}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 sm:self-start shrink-0">
            {targetUnit && targetTopic && (
              <button
                onClick={() => onSelectTopic(course.id, targetUnit.id, targetTopic.id)}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#14382B] hover:bg-[#0E261D] rounded-xl transition-all shadow-xs"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>
                  {completedTopics > 0 ? `Resume: ${targetUnit.title}` : 'Start Unit 1'}
                </span>
              </button>
            )}

            <button
              onClick={onOpenAddDocument}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#14382B] bg-[#FAF8F5] border border-[#D8D2C6] hover:bg-[#F3EFEA] rounded-xl transition-colors"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>+ Append Document</span>
            </button>

            <button
              onClick={() => {
                if (onOpenAudioPlayer) {
                  const firstUnit = course.modules[0]?.units[0] || null;
                  onOpenAudioPlayer(course, firstUnit, courseQuestions, 'learn-understand');
                }
              }}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#14382B] bg-[#FAF2E6] border border-[#E8DEC9] hover:bg-[#F5ECD8] rounded-xl transition-colors shadow-2xs"
              title="Listen to course materials and past questions on voice audio"
            >
              <Headphones className="w-3.5 h-3.5 text-[#C88A36]" />
              <span>Listen & Learn</span>
            </button>

            <button
              onClick={() => setAiTutorOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#14382B] bg-white border border-[#D8D2C6] hover:bg-[#FAF8F5] rounded-xl transition-colors shadow-2xs"
              title="Ask StudyVault AI Tutor about this course"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C88A36]" />
              <span>Ask AI Tutor</span>
            </button>

            {courseQuestions.length > 0 && (
              <button
                onClick={() => setActiveTab('past_questions')}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#14382B] bg-[#FAF2E6] border border-[#E8DEC9] hover:bg-[#F5ECD8] rounded-xl transition-colors shadow-2xs"
              >
                <HelpCircle className="w-3.5 h-3.5 text-[#C88A36]" />
                <span>Past Questions & Exam Practice ({courseQuestions.length})</span>
              </button>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="pt-4 border-t border-[#E8E4DC] grid grid-cols-1 sm:grid-cols-4 gap-4 items-center">
          <div className="sm:col-span-3 space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#585E5A]">Reading Progress</span>
              <span className="font-mono font-medium text-[#14382B]">
                {completedTopics} / {totalTopics} Topics Completed ({percentCompleted}%)
              </span>
            </div>
            <div className="w-full h-2 bg-[#F0ECE4] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#14382B] rounded-full transition-all duration-300"
                style={{ width: `${percentCompleted}%` }}
              />
            </div>
          </div>

          <div className="sm:text-right text-xs text-[#585E5A]">
            <span>{course.documents.length} Source Textbook{course.documents.length === 1 ? '' : 's'}</span>
          </div>
        </div>
      </div>

      {/* Segmented Tab Navigation */}
      <div className="flex items-center gap-1 p-1 bg-[#F0ECE4] rounded-xl self-start inline-flex">
        <button
          onClick={() => setActiveTab('syllabus')}
          className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
            activeTab === 'syllabus' ? 'bg-white text-[#191C1A] shadow-xs' : 'text-[#585E5A] hover:text-[#191C1A]'
          }`}
        >
          Study Units ({totalTopics})
        </button>
        <button
          onClick={() => setActiveTab('past_questions')}
          className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
            activeTab === 'past_questions' ? 'bg-white text-[#191C1A] shadow-xs' : 'text-[#585E5A] hover:text-[#191C1A]'
          }`}
        >
          Past Questions & Exam Practice ({courseQuestions.length})
        </button>
        <button
          onClick={() => setActiveTab('documents')}
          className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
            activeTab === 'documents' ? 'bg-white text-[#191C1A] shadow-xs' : 'text-[#585E5A] hover:text-[#191C1A]'
          }`}
        >
          Source Materials ({course.documents.length + pqDocuments.length})
        </button>
        <button
          onClick={() => setActiveTab('notes')}
          className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
            activeTab === 'notes' ? 'bg-white text-[#191C1A] shadow-xs' : 'text-[#585E5A] hover:text-[#191C1A]'
          }`}
        >
          Course Notes ({courseNotes.length})
        </button>
      </div>

      {/* Tab: Syllabus Outline */}
      {activeTab === 'syllabus' && (
        <div className="space-y-6">
          {course.modules.map((module, mIdx) => (
            <div key={module.id} className="bg-white border border-[#E8E4DC] rounded-2xl overflow-hidden shadow-xs">
              <div className="bg-[#FAF8F5] px-6 py-4 border-b border-[#E8E4DC] flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-semibold text-[#8C928E] uppercase tracking-wider">
                    Module 0{module.moduleNumber || mIdx + 1}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-[#14382B]">
                    {module.title}
                  </h3>
                </div>
                <span className="text-xs text-[#585E5A]">
                  {module.units.length} Unit{module.units.length === 1 ? '' : 's'}
                </span>
              </div>

              <div className="divide-y divide-[#E8E4DC]">
                {module.units.map((unit) => {
                  const unitStatus = getUnitStatus(unit.id, unit.topics);
                  const statusInfo = statusLabels[unitStatus];
                  const lockInfo = isUnitLocked(unit.id);

                  return (
                    <div key={unit.id} className="p-6 space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2.5 flex-wrap">
                            <h4 className="font-serif text-base font-bold text-[#191C1A]">
                              {unit.title}
                            </h4>
                            <span className="text-xs text-[#8C928E]" aria-hidden="true">·</span>
                            {lockInfo.locked ? (
                              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md">
                                <Lock className="w-3 h-3 text-amber-700" />
                                <span>Unit Locked</span>
                              </span>
                            ) : (
                              <span className={`text-xs ${statusInfo.textClass}`}>
                                {statusInfo.label}
                              </span>
                            )}
                          </div>
                          {unit.objectives && unit.objectives.length > 0 && (
                            <p className="text-xs text-[#585E5A] line-clamp-1">
                              Objectives: {unit.objectives.join(' · ')}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Topics inside this unit */}
                      <div className="grid grid-cols-1 gap-2.5 pt-1">
                        {unit.topics.map((topic) => {
                          const isDone = progress.completedTopicIds.includes(topic.id);
                          return (
                            <div
                              key={topic.id}
                              onClick={() => {
                                if (lockInfo.locked) {
                                  setLockedModal({
                                    open: true,
                                    message: lockInfo.reason || 'This unit is locked until previous units are completed.',
                                    blockingUnit: lockInfo.blockingUnit,
                                  });
                                  return;
                                }
                                onSelectTopic(course.id, unit.id, topic.id);
                              }}
                              className={`p-4 rounded-xl border transition-all flex items-center justify-between gap-4 group shadow-2xs cursor-pointer ${
                                lockInfo.locked
                                  ? 'bg-[#FAF8F5]/60 border-amber-200/70 hover:bg-amber-50/50 hover:border-amber-300'
                                  : 'border-[#E8E4DC] bg-[#FAF8F5] hover:bg-white hover:border-[#14382B]/40'
                              }`}
                            >
                              <div className="flex items-center gap-3 min-w-0">
                                {lockInfo.locked ? (
                                  <div className="w-5 h-5 rounded-md bg-amber-100/80 border border-amber-300/60 flex items-center justify-center shrink-0">
                                    <Lock className="w-3 h-3 text-amber-800" />
                                  </div>
                                ) : isDone ? (
                                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                                ) : (
                                  <div className="w-4 h-4 rounded-full border border-[#D8D2C6] shrink-0" />
                                )}
                                <div className="min-w-0">
                                  <p className={`text-sm font-medium transition-colors truncate ${
                                    lockInfo.locked ? 'text-[#585E5A]' : 'text-[#191C1A] group-hover:text-[#14382B]'
                                  }`}>
                                    {topic.title}
                                  </p>
                                  <div className="flex items-center gap-2 text-xs text-[#8C928E] mt-0.5">
                                    <span>~{topic.readingMinutes || 10} min read</span>
                                    <span aria-hidden="true">·</span>
                                    <span>
                                      {topic.writtenQuestions?.length || 0} Written Exam Questions
                                    </span>
                                    {topic.tables && topic.tables.length > 0 && (
                                      <>
                                        <span aria-hidden="true">·</span>
                                        <span>{topic.tables.length} Table{topic.tables.length > 1 ? 's' : ''}</span>
                                      </>
                                    )}
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center gap-2 shrink-0">
                                {lockInfo.locked ? (
                                  <span className="text-[11px] font-semibold text-amber-800 bg-amber-100/60 px-2 py-0.5 rounded border border-amber-200">
                                    Locked
                                  </span>
                                ) : (
                                  <>
                                    <span className="text-xs font-semibold text-[#14382B] opacity-0 group-hover:opacity-100 transition-opacity">
                                      Study Topic
                                    </span>
                                    <ChevronRight className="w-4 h-4 text-[#8C928E] group-hover:text-[#14382B] group-hover:translate-x-0.5 transition-all" />
                                  </>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab: Past Questions & Exam Practice */}
      {activeTab === 'past_questions' && (
        <CoursePastQuestionsSection
          course={course}
          questions={courseQuestions}
          onSelectTopic={onSelectTopic}
          onSaveNote={onSaveNote}
          onAddPastQuestions={onAddPastQuestions}
          onStartPracticeSession={() => onStartCoursePractice(course.id)}
          onOpenAudioPlayer={(c, qs) => {
            if (onOpenAudioPlayer) {
              onOpenAudioPlayer(c, null, qs, 'past-questions-revision');
            }
          }}
        />
      )}

      {/* Tab: Source Documents */}
      {activeTab === 'documents' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-xs text-[#585E5A]">
              Authoritative course materials, textbooks, and examination archives for <strong className="text-[#191C1A]">{course.code}</strong>.
            </p>
            <button
              onClick={onOpenAddDocument}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-[#14382B] hover:bg-[#0E261D] rounded-xl transition-colors shadow-2xs"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Append Another Document</span>
            </button>
          </div>

          {/* Section 1: Official Past-Question Documents */}
          {pqDocuments.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-1 border-b border-[#E8E4DC]">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#14382B] flex items-center gap-1.5">
                  <Archive className="w-3.5 h-3.5 text-[#C88A36]" />
                  <span>Uploaded Past-Question Documents ({pqDocuments.length})</span>
                </h4>
                <button
                  onClick={() => setActiveTab('past_questions')}
                  className="text-xs text-[#14382B] font-semibold hover:underline flex items-center gap-1"
                >
                  <span>Practice Questions ({courseQuestions.length})</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pqDocuments.map((pqDoc) => (
                  <div key={pqDoc.id} className="bg-white border border-[#E8DEC9] rounded-2xl p-5 space-y-3 shadow-xs hover:border-[#14382B]/40 transition-all">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#FAF2E6] border border-[#E8DEC9] text-[#14382B] flex items-center justify-center shrink-0">
                        <FileText className="w-5 h-5 text-[#C88A36]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-[#191C1A] truncate" title={pqDoc.name}>
                          {pqDoc.name}
                        </h4>
                        <div className="flex items-center gap-2 text-xs text-[#585E5A] mt-0.5">
                          <span className="uppercase font-mono text-[11px] font-semibold text-[#14382B]">{pqDoc.fileType}</span>
                          <span aria-hidden="true">·</span>
                          <span>{(pqDoc.fileSize / 1024).toFixed(0)} KB</span>
                          {pqDoc.pageCount && (
                            <>
                              <span aria-hidden="true">·</span>
                              <span>{pqDoc.pageCount} Pages</span>
                            </>
                          )}
                          <span aria-hidden="true">·</span>
                          <span className="font-semibold text-[#14382B]">{pqDoc.extractedQuestionsCount} Questions</span>
                        </div>
                      </div>
                      <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded shrink-0">
                        Verified
                      </span>
                    </div>

                    {pqDoc.summary && (
                      <p className="text-xs text-[#585E5A] leading-relaxed bg-[#FAF8F5] p-3 rounded-xl border border-[#E8E4DC]">
                        {pqDoc.summary}
                      </p>
                    )}

                    <div className="flex items-center justify-between text-[11px] text-[#8C928E] pt-2 border-t border-[#E8E4DC]">
                      <span className="truncate max-w-[200px]">{pqDoc.examSession || 'Official Exam Archive'}</span>
                      <button
                        onClick={() => setActiveTab('past_questions')}
                        className="text-xs text-[#14382B] font-semibold hover:underline flex items-center gap-1"
                      >
                        <span>Open Questions</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section 2: Course Textbooks */}
          <div className="space-y-3">
            <div className="pb-1 border-b border-[#E8E4DC]">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#14382B] flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-[#14382B]" />
                <span>Textbooks & Course Guides ({course.documents.length})</span>
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {course.documents.map((doc) => (
                <div key={doc.id} className="bg-white border border-[#E8E4DC] rounded-2xl p-5 space-y-3 shadow-xs">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#FAF8F5] border border-[#E8E4DC] text-[#14382B] flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-[#191C1A] truncate" title={doc.name}>
                        {doc.name}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-[#585E5A] mt-0.5">
                        <span className="uppercase font-mono">{doc.fileType}</span>
                        <span aria-hidden="true">·</span>
                        <span>{(doc.fileSize / 1024).toFixed(1)} KB</span>
                        {doc.pageCount && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span>~{doc.pageCount} Pages</span>
                          </>
                        )}
                      </div>
                    </div>
                    <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded shrink-0">
                      Processed
                    </span>
                  </div>

                  {doc.summary && (
                    <p className="text-xs text-[#585E5A] leading-relaxed bg-[#FAF8F5] p-3 rounded-xl border border-[#E8E4DC]">
                      {doc.summary}
                    </p>
                  )}

                  <div className="flex items-center justify-between text-[11px] text-[#8C928E] pt-2 border-t border-[#E8E4DC]">
                    <span>Uploaded {new Date(doc.uploadedAt).toLocaleDateString()}</span>
                    <span className="text-emerald-800 font-medium flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                      Authoritative Source
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab: Notes */}
      {activeTab === 'notes' && (
        <div className="space-y-4">
          {courseNotes.length === 0 ? (
            <div className="bg-white border border-[#E8E4DC] p-8 rounded-2xl text-center space-y-2">
              <Bookmark className="w-8 h-8 text-[#8C928E] mx-auto" />
              <p className="text-sm font-semibold text-[#191C1A]">No notes created for this course yet</p>
              <p className="text-xs text-[#585E5A]">
                Open any reading topic and write notes directly in the study margin.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {courseNotes.map((n) => (
                <div key={n.id} className="bg-white border border-[#E8E4DC] p-5 rounded-2xl space-y-2 shadow-xs">
                  <h4 className="text-sm font-bold text-[#191C1A]">{n.title}</h4>
                  {n.unitTitle && <p className="text-xs text-[#8C928E]">{n.unitTitle}</p>}
                  <p className="text-xs text-[#383D3B] whitespace-pre-line leading-relaxed">
                    {n.content}
                  </p>
                  <div className="pt-2 border-t border-[#E8E4DC] text-[11px] text-[#8C928E]">
                    {new Date(n.updatedAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Mandatory Unit Progression Modal */}
      {lockedModal?.open && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in"
        >
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-5 border border-[#E8E4DC] shadow-2xl animate-in zoom-in-95">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
                  <Lock className="w-5 h-5 text-amber-800" />
                </div>
                <div>
                  <h3 className="font-serif text-base font-bold text-[#191C1A]">
                    Mandatory Unit Progression
                  </h3>
                  <p className="text-xs text-[#8C928E]">Sequential Unit Requirement</p>
                </div>
              </div>
              <button
                onClick={() => setLockedModal(null)}
                className="p-1 text-[#8C928E] hover:text-[#191C1A] rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-[#383D3B] leading-relaxed bg-[#FAF8F5] p-4 rounded-xl border border-[#E8E4DC]">
              <p className="font-semibold text-amber-950">
                You cannot skip ahead to this unit yet.
              </p>
              <p>
                {lockedModal.message}
              </p>
              <p className="text-[#585E5A]">
                StudyVault AI enforces rigorous study mastery: you must properly study and pass each unit's assessment before progressing to subsequent textbook units.
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-1">
              <button
                onClick={() => setLockedModal(null)}
                className="px-4 py-2 text-xs font-semibold text-[#585E5A] hover:text-[#191C1A] transition-colors"
              >
                Close
              </button>
              {lockedModal.blockingUnit && (
                <button
                  onClick={() => {
                    const blk = lockedModal.blockingUnit!;
                    setLockedModal(null);
                    onSelectTopic(course.id, blk.id, blk.topics[0].id);
                  }}
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#14382B] hover:bg-[#0E261D] rounded-xl transition-all shadow-xs"
                >
                  Study {lockedModal.blockingUnit.title}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* StudyVault AI Tutor Chatbot */}
      <AITutorChat
        course={course}
        courses={allCourses}
        initialCourseId={course.id}
        isOpen={aiTutorOpen}
        onClose={() => setAiTutorOpen(false)}
      />
    </div>
  );
};
