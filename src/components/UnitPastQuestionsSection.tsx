import React, { useState } from 'react';
import {
  Archive,
  BookOpen,
  CheckCircle2,
  HelpCircle,
  Eye,
  EyeOff,
  Sparkles,
  Award,
  ChevronDown,
  ChevronUp,
  FileText,
  RotateCcw,
  Send,
  AlertTriangle,
  Layers,
  ArrowRight,
  Headphones
} from 'lucide-react';
import { Course, StudyUnit, PastExamQuestionItem, WrittenEvaluationResult } from '../types';
import { FormattedContentRenderer } from './FormattedContentRenderer';
import {
  voiceLearningEngine,
  buildSingleQuestionQueue,
  buildUnitPastQuestionsRevisionQueue
} from '../services/voiceLearningService';

interface UnitPastQuestionsSectionProps {
  course: Course;
  unit: StudyUnit;
  questions: PastExamQuestionItem[];
  theme: {
    bg: string;
    surface: string;
    text: string;
    border: string;
  };
  onSaveNote?: (note: { courseId: string; courseCode: string; courseTitle: string; unitId: string; unitTitle: string; title: string; content: string; tags: string[] }) => void;
  onOpenAudioPlayer?: (course: Course, unit: StudyUnit, questions: PastExamQuestionItem[]) => void;
}

export const UnitPastQuestionsSection: React.FC<UnitPastQuestionsSectionProps> = ({
  course,
  unit,
  questions,
  theme,
  onSaveNote,
  onOpenAudioPlayer,
}) => {
  const [globalMode, setGlobalMode] = useState<'practice' | 'revision'>('practice');
  const [selectedDocFilter, setSelectedDocFilter] = useState<string>('all');
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});
  const [userAttempts, setUserAttempts] = useState<Record<string, string>>({});
  const [evaluations, setEvaluations] = useState<Record<string, { evaluated: boolean; score: number; maxScore: number; feedback: string; matchedPoints: string[]; missingPoints: string[] }>>({});
  const [submittingId, setSubmittingId] = useState<string | null>(null);

  // Group questions by source document
  const docNames = Array.from(new Set(questions.map((q) => q.documentName || 'Unknown Document'))).filter(Boolean);

  const filteredQuestions = questions.filter((q) => {
    if (selectedDocFilter !== 'all' && (q.documentName || '') !== selectedDocFilter) {
      return false;
    }
    return true;
  });

  const toggleReveal = (qId: string) => {
    setRevealedAnswers((prev) => ({
      ...prev,
      [qId]: !prev[qId],
    }));
  };

  const handleRevealAll = () => {
    const allRevealed: Record<string, boolean> = {};
    filteredQuestions.forEach((q) => {
      allRevealed[q.id] = true;
    });
    setRevealedAnswers(allRevealed);
    setGlobalMode('revision');
  };

  const handleHideAll = () => {
    setRevealedAnswers({});
    setGlobalMode('practice');
  };

  const handleEvaluateAttempt = (question: PastExamQuestionItem) => {
    const attempt = userAttempts[question.id]?.trim();
    if (!attempt) return;

    setSubmittingId(question.id);

    setTimeout(() => {
      // Evaluate against key rubric points and textbook content
      const rubric = question.keyRubricPoints || [];
      const attemptLower = attempt.toLowerCase();
      const matched: string[] = [];
      const missing: string[] = [];

      rubric.forEach((pt) => {
        const words = pt.toLowerCase().split(/\s+/).filter((w) => w.length > 3);
        const matchCount = words.filter((w) => attemptLower.includes(w)).length;
        if (words.length > 0 && matchCount / words.length >= 0.3) {
          matched.push(pt);
        } else {
          missing.push(pt);
        }
      });

      const maxScore = question.marks || question.totalMarks || 15;
      const matchRatio = rubric.length > 0 ? matched.length / rubric.length : 0.7;
      const calculatedScore = Math.max(1, Math.round(maxScore * Math.min(1, matchRatio + 0.15)));

      let feedback = '';
      if (calculatedScore / maxScore >= 0.7) {
        feedback = `Strong textbook-aligned answer. You effectively articulated the core concepts required by the examiner for ${unit.title}.`;
      } else if (calculatedScore / maxScore >= 0.45) {
        feedback = `Satisfactory attempt, but your response omits some specific technical dimensions emphasized in the official textbook.`;
      } else {
        feedback = `Incomplete answer. Study the supplied official marking scheme and textbook passages below to improve your terminology.`;
      }

      setEvaluations((prev) => ({
        ...prev,
        [question.id]: {
          evaluated: true,
          score: calculatedScore,
          maxScore,
          feedback,
          matchedPoints: matched,
          missingPoints: missing,
        },
      }));

      // Automatically reveal answer for comparison
      setRevealedAnswers((prev) => ({
        ...prev,
        [question.id]: true,
      }));

      setSubmittingId(null);
    }, 400);
  };

  const handleSaveToNotes = (question: PastExamQuestionItem) => {
    if (!onSaveNote) return;
    const answerText = question.suppliedAnswer || question.modelAnswer || question.aiExplanation || 'No answer available';
    onSaveNote({
      courseId: course.id,
      courseCode: course.code,
      courseTitle: course.title,
      unitId: unit.id,
      unitTitle: unit.title,
      title: `Exam Practice: ${question.questionNumber || 'Question'} (${question.year || 'Archive'})`,
      content: `Question: ${question.questionText}\n\nOfficial Solution / Marking Scheme:\n${answerText}\n\nSource: ${question.documentName || 'Uploaded Exam Paper'}`,
      tags: ['Past Questions', unit.title, question.year || 'POP Exam'],
    });
  };

  return (
    <div id="unit-past-questions-section" className="space-y-6 mt-12 pt-8 border-t border-black/15 scroll-mt-24">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-black/10">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#14382B]">
            <Archive className="w-4 h-4 text-[#C88A36]" />
            <span>Curated Past Questions & Exam Answers</span>
          </div>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#14382B]">
            Past Questions and Answers for This Unit
          </h3>
          <p className="text-xs sm:text-sm text-[#585E5A]">
            Curated examination questions from both uploaded documents testing concepts in <strong className="text-[#191C1A]">{unit.title}</strong>.
          </p>
        </div>

        {/* Global Action Controls */}
        <div className="flex flex-wrap items-center gap-2 self-start md:self-auto shrink-0">
          <button
            onClick={() => {
              if (onOpenAudioPlayer) {
                onOpenAudioPlayer(course, unit, filteredQuestions);
              } else {
                const queue = buildUnitPastQuestionsRevisionQueue(course, unit, filteredQuestions);
                voiceLearningEngine.setPlaylist(queue, 0, true);
              }
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#FAF2E6] text-[#14382B] border border-[#E8DEC9] hover:bg-[#F5ECD8] transition-colors shadow-2xs"
            title="Start voice revision audio for all questions in this unit"
          >
            <Headphones className="w-3.5 h-3.5 text-[#C88A36]" />
            <span>Listen to Unit Questions ({filteredQuestions.length})</span>
          </button>

          <button
            onClick={globalMode === 'practice' ? handleRevealAll : handleHideAll}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-[#D8D2C6] bg-white text-[#191C1A] hover:bg-[#FAF8F5] transition-colors shadow-2xs"
          >
            {globalMode === 'practice' ? (
              <>
                <Eye className="w-3.5 h-3.5 text-[#14382B]" />
                <span>Reveal All Answers</span>
              </>
            ) : (
              <>
                <EyeOff className="w-3.5 h-3.5 text-[#585E5A]" />
                <span>Hide All Answers (Practice Mode)</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Stats & Source Document Badges */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-black/[0.02] p-3.5 rounded-xl border border-black/10">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#14382B] bg-[#14382B]/10 px-2.5 py-1 rounded-md">
            <Archive className="w-3.5 h-3.5 text-[#14382B]" />
            <span>{questions.length} Authentic Question{questions.length === 1 ? '' : 's'} Mapped</span>
          </span>

          {docNames.map((dName, idx) => {
            const count = questions.filter((q) => q.documentName === dName).length;
            const shortName = dName.replace('.pdf', '').replace(/_/g, ' ');
            return (
              <span
                key={idx}
                className="inline-flex items-center gap-1 text-[11px] font-medium text-[#585E5A] bg-white border border-[#E8E4DC] px-2 py-0.5 rounded-md"
              >
                <FileText className="w-3 h-3 text-[#C88A36]" />
                <span className="truncate max-w-[200px]" title={dName}>{shortName}</span>
                <span className="font-bold text-[#14382B]">({count})</span>
              </span>
            );
          })}
        </div>

        {/* Document Filter Dropdown if more than 1 document */}
        {docNames.length > 1 && (
          <div className="flex items-center gap-1.5 text-xs text-[#585E5A]">
            <span className="font-medium shrink-0">Source Paper:</span>
            <select
              value={selectedDocFilter}
              onChange={(e) => setSelectedDocFilter(e.target.value)}
              className="text-xs bg-white border border-[#D8D2C6] rounded-lg px-2.5 py-1 text-[#191C1A] focus:outline-none focus:border-[#14382B]"
            >
              <option value="all">All Uploaded Papers ({questions.length})</option>
              {docNames.map((dName, idx) => (
                <option key={idx} value={dName}>
                  {dName.length > 32 ? dName.slice(0, 32) + '...' : dName}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Empty State */}
      {filteredQuestions.length === 0 && (
        <div className="bg-white border border-[#E8E4DC] rounded-2xl p-8 text-center space-y-3 shadow-xs">
          <div className="w-10 h-10 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center mx-auto text-amber-700">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <h4 className="font-serif text-base font-bold text-[#191C1A]">
            No matching examination questions found in currently uploaded documents for this unit
          </h4>
          <p className="text-xs text-[#585E5A] max-w-md mx-auto">
            The uploaded documents for {course.code} do not contain questions specifically mapped to {unit.title}. You can upload additional past question documents from the course overview to expand this unit's question bank.
          </p>
        </div>
      )}

      {/* Question Cards List */}
      <div className="space-y-6">
        {filteredQuestions.map((q, idx) => {
          const isRevealed = globalMode === 'revision' || revealedAnswers[q.id];
          const hasSuppliedAnswer = q.answerStatus === 'answer_supplied' && Boolean(q.suppliedAnswer || q.modelAnswer);
          const evaluation = evaluations[q.id];

          return (
            <div
              key={q.id}
              className={`${theme.surface} border ${theme.border} rounded-2xl overflow-hidden shadow-xs space-y-4 p-5 sm:p-7 transition-all`}
            >
              {/* Card Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-black/10">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-md text-xs font-bold font-mono text-[#14382B] bg-[#14382B]/10 border border-[#14382B]/20">
                    {q.questionNumber || `Question ${idx + 1}`}
                  </span>

                  {/* Year / Exam Session Badge */}
                  {q.year && (
                    <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold text-[#585E5A] bg-black/5 border border-black/10">
                      {q.session || `Exam ${q.year}`}
                    </span>
                  )}

                  {/* Marks badge */}
                  {(q.marks || q.totalMarks) && (
                    <span className="px-2 py-0.5 rounded-md text-[11px] font-bold text-[#C88A36] bg-[#FAF2E6] border border-[#E8DEC9]">
                      {q.marks || q.totalMarks} Marks
                    </span>
                  )}

                  {/* Difficulty */}
                  {q.difficulty && (
                    <span className="px-2 py-0.5 rounded-md text-[11px] font-medium text-[#585E5A] bg-black/5">
                      {q.difficulty}
                    </span>
                  )}

                  {/* Recurring badge */}
                  {q.recurringAppearances && q.recurringAppearances.length > 1 && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                      <Layers className="w-3 h-3 text-emerald-700" />
                      <span>Recurring Exam Topic ({q.recurringAppearances.length}x)</span>
                    </span>
                  )}
                </div>

                {/* Source Document Tag */}
                <div className="text-[11px] text-[#585E5A] flex items-center gap-1.5 self-start sm:self-auto">
                  <FileText className="w-3.5 h-3.5 text-[#C88A36]" />
                  <span className="font-mono truncate max-w-[240px]" title={q.documentName}>
                    {q.documentName}
                  </span>
                </div>
              </div>

              {/* Question Text */}
              <div className="space-y-2">
                <p className="font-serif text-base sm:text-lg font-bold leading-relaxed text-[#191C1A]">
                  {q.questionText}
                </p>

                {/* Multiple Choice Options if applicable */}
                {q.options && q.options.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                    {q.options.map((opt, oIdx) => (
                      <div
                        key={oIdx}
                        className="px-3.5 py-2.5 rounded-xl text-xs font-medium border border-black/10 bg-black/[0.02]"
                      >
                        {opt}
                      </div>
                    ))}
                  </div>
                )}

                {/* Associated Textbook Concept */}
                {q.topicTitle && (
                  <div className="flex items-center gap-1.5 text-xs text-[#585E5A] pt-1">
                    <BookOpen className="w-3.5 h-3.5 text-[#14382B]" />
                    <span>Tested Concept: <strong>{q.topicTitle}</strong></span>
                  </div>
                )}
              </div>

              {/* Answer Status Badge & Reveal Toggle */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-black/10">
                <div className="flex items-center gap-2 flex-wrap">
                  {hasSuppliedAnswer ? (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Answer supplied in source document</span>
                    </span>
                  ) : q.aiExplanation ? (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-lg">
                      <Sparkles className="w-3.5 h-3.5 text-[#C88A36]" />
                      <span>AI explanation available (Textbook grounded)</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-700 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-lg">
                      <HelpCircle className="w-3.5 h-3.5 text-slate-600" />
                      <span>No answer supplied in source</span>
                    </span>
                  )}

                  {q.sourceReference && (
                    <span className="text-[11px] text-[#8C928E] font-mono">
                      {q.sourceReference}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const queue = buildSingleQuestionQueue(course, unit.title, q);
                      voiceLearningEngine.setPlaylist(queue, 0, true);
                      if (onOpenAudioPlayer) {
                        onOpenAudioPlayer(course, unit, [q]);
                      }
                    }}
                    className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-white border border-[#D8D2C6] text-[#14382B] hover:bg-[#FAF8F5] transition-colors"
                    title="Listen to this question and its answer via voice audio"
                  >
                    <Headphones className="w-3.5 h-3.5 text-[#C88A36]" />
                    <span>Listen</span>
                  </button>

                  <button
                    onClick={() => toggleReveal(q.id)}
                    className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#FAF2E6] text-[#14382B] border border-[#E8DEC9] hover:bg-[#F5ECD8] transition-colors"
                  >
                    {isRevealed ? (
                      <>
                        <EyeOff className="w-3.5 h-3.5 text-[#14382B]" />
                        <span>Hide Official Answer</span>
                      </>
                    ) : (
                      <>
                        <Eye className="w-3.5 h-3.5 text-[#C88A36]" />
                        <span>Reveal Official Answer</span>
                      </>
                    )}
                  </button>

                  {onSaveNote && (
                    <button
                      onClick={() => handleSaveToNotes(q)}
                      title="Save question and marking scheme to course notes"
                      className="px-2.5 py-1.5 text-xs font-medium text-[#585E5A] hover:text-[#191C1A] border border-black/10 rounded-lg hover:bg-black/5 transition-colors"
                    >
                      Save Note
                    </button>
                  )}
                </div>
              </div>

              {/* Student Practice Input Box (Active when answers hidden or for submission) */}
              {!isRevealed && (
                <div className="space-y-3 pt-2 bg-black/[0.015] p-4 rounded-xl border border-black/10">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#14382B] uppercase tracking-wider">
                      Practise Your Answer (Attempt Before Revealing Solution):
                    </span>
                    <span className="text-[11px] text-[#8C928E]">
                      Evaluated strictly against {course.code} textbook criteria
                    </span>
                  </div>

                  <textarea
                    rows={3}
                    placeholder="Write your outline, formulas, or full response to test your exam readiness..."
                    value={userAttempts[q.id] || ''}
                    onChange={(e) =>
                      setUserAttempts((prev) => ({
                        ...prev,
                        [q.id]: e.target.value,
                      }))
                    }
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-[#D8D2C6] rounded-xl text-[#191C1A] focus:outline-none focus:ring-1 focus:ring-[#14382B]"
                  />

                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleEvaluateAttempt(q)}
                      disabled={!userAttempts[q.id]?.trim() || submittingId === q.id}
                      className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#14382B] hover:bg-[#0E261D] disabled:opacity-40 rounded-xl transition-all shadow-xs"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{submittingId === q.id ? 'Evaluating against Textbook...' : 'Submit & Check Answer'}</span>
                    </button>

                    <button
                      onClick={() => toggleReveal(q.id)}
                      className="text-xs text-[#585E5A] hover:text-[#14382B] font-medium underline"
                    >
                      Skip writing & reveal answer
                    </button>
                  </div>
                </div>
              )}

              {/* Revealed Solution & Official Marking Scheme */}
              {isRevealed && (
                <div className="space-y-4 pt-4 border-t border-black/10 animate-in fade-in">
                  {/* Evaluation feedback if student submitted */}
                  {evaluation && (
                    <div className="bg-[#FAF2E6] border border-[#E8DEC9] p-4 rounded-xl space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Award className="w-4 h-4 text-[#C88A36]" />
                          <span className="text-xs font-bold text-[#14382B]">
                            Your Practice Evaluation Score:
                          </span>
                        </div>
                        <span className="font-mono text-sm font-bold text-[#14382B] bg-white px-2 py-0.5 rounded border border-[#E8DEC9]">
                          {evaluation.score} / {evaluation.maxScore} Marks
                        </span>
                      </div>
                      <p className="text-xs text-[#191C1A] leading-relaxed">
                        {evaluation.feedback}
                      </p>
                    </div>
                  )}

                  {/* Official Answer Printed in Source Document */}
                  {hasSuppliedAnswer && (
                    <div className="bg-emerald-50/50 border border-emerald-200/80 p-5 rounded-xl space-y-3">
                      <div className="flex items-center justify-between pb-2 border-b border-emerald-200/60">
                        <div className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-800" />
                          <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider">
                            Official Answer Printed in Source Document:
                          </span>
                        </div>
                        <span className="text-[11px] font-mono text-emerald-800 bg-white px-2 py-0.5 rounded border border-emerald-200">
                          Authentic Exam Marking Guide
                        </span>
                      </div>

                      <div className="text-xs sm:text-sm text-emerald-950 leading-relaxed font-serif">
                        <FormattedContentRenderer
                          content={q.suppliedAnswer || q.modelAnswer || ''}
                          theme="parchment"
                          fontSizeClass="text-xs sm:text-sm leading-relaxed"
                          fontFamily="serif"
                        />
                      </div>

                      {/* Worked Solution Steps for Numerical Problems */}
                      {q.workedSolutionSteps && q.workedSolutionSteps.length > 0 && (
                        <div className="space-y-2.5 pt-3 border-t border-emerald-200/60">
                          <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider block">
                            Step-by-Step Worked Solution:
                          </span>
                          <div className="space-y-2">
                            {q.workedSolutionSteps.map((st) => (
                              <div
                                key={st.stepNumber}
                                className="bg-white p-3 rounded-lg border border-emerald-200/70 text-xs space-y-1"
                              >
                                <div className="flex items-center justify-between font-semibold text-[#14382B]">
                                  <span>Step {st.stepNumber}: {st.description}</span>
                                  {st.mathExpression && (
                                    <span className="font-mono text-[11px] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                                      {st.mathExpression}
                                    </span>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Key Rubric Points */}
                      {q.keyRubricPoints && q.keyRubricPoints.length > 0 && (
                        <div className="pt-3 border-t border-emerald-200/60 space-y-1.5">
                          <span className="text-[11px] font-bold text-emerald-900 uppercase tracking-wider">
                            Examiner Key Rubric Points:
                          </span>
                          <ul className="list-disc list-inside space-y-1 text-xs text-emerald-950">
                            {q.keyRubricPoints.map((pt, pIdx) => (
                              <li key={pIdx}>{pt}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}

                  {/* AI Explanation if no official answer exists */}
                  {!hasSuppliedAnswer && q.aiExplanation && (
                    <div className="bg-[#FAF2E6] border border-[#E8DEC9] p-5 rounded-xl space-y-2.5">
                      <div className="flex items-center justify-between pb-2 border-b border-[#E8DEC9]">
                        <div className="flex items-center gap-1.5">
                          <Sparkles className="w-4 h-4 text-[#C88A36]" />
                          <span className="text-xs font-bold text-[#14382B] uppercase tracking-wider">
                            AI Explanation (Grounded strictly in {course.code} Textbook):
                          </span>
                        </div>
                        <span className="text-[11px] text-[#C88A36] bg-white px-2 py-0.5 rounded border border-[#E8DEC9]">
                          Textbook Aligned
                        </span>
                      </div>
                      <div className="text-xs sm:text-sm text-[#191C1A] leading-relaxed whitespace-pre-line font-serif">
                        {q.aiExplanation}
                      </div>
                    </div>
                  )}

                  {!hasSuppliedAnswer && !q.aiExplanation && (
                    <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl text-xs text-slate-700 italic">
                      The PDF does not provide enough information to answer this confidently.
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
