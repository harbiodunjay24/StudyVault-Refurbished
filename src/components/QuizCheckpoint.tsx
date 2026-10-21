import React, { useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  RotateCcw,
  ArrowRight,
  Award,
  AlertTriangle,
  BookOpen,
  HelpCircle,
  ExternalLink
} from 'lucide-react';
import { QuizQuestion, QuestionMistakeRecord } from '../types';

interface QuizCheckpointProps {
  questions: QuizQuestion[];
  topicTitle: string;
  courseCode: string;
  courseId: string;
  topicId: string;
  onQuizCompleted: (score: number, total: number, mistakes: QuestionMistakeRecord[], isPassed: boolean) => void;
  onContinueReading?: () => void;
  hasNextTopic?: boolean;
  passPercentageRequired?: number;
}

export const QuizCheckpoint: React.FC<QuizCheckpointProps> = ({
  questions,
  topicTitle,
  courseCode,
  courseId,
  topicId,
  onQuizCompleted,
  onContinueReading,
  hasNextTopic,
  passPercentageRequired = 70,
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [showMistakesReview, setShowMistakesReview] = useState(false);

  if (!questions || questions.length === 0) {
    return null;
  }

  const handleSelectOption = (questionIndex: number, optionIndex: number) => {
    if (submitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: optionIndex,
    }));
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        score++;
      }
    });
    return score;
  };

  const score = calculateScore();
  const allAnswered = questions.every((_, idx) => selectedAnswers[idx] !== undefined);
  const percentage = questions.length > 0 ? Math.round((score / questions.length) * 100) : 0;
  const isPassed = submitted && percentage >= passPercentageRequired;
  const isPerfect = submitted && score === questions.length;

  // Compile mistakes
  const mistakes: QuestionMistakeRecord[] = [];
  if (submitted) {
    questions.forEach((q, idx) => {
      const selectedIdx = selectedAnswers[idx];
      if (selectedIdx !== undefined && selectedIdx !== q.correctIndex) {
        mistakes.push({
          id: `mistake-${Date.now()}-${idx}`,
          questionId: q.id,
          questionPrompt: q.prompt,
          questionType: 'multiple_choice',
          selectedOptionText: q.options[selectedIdx] || 'No selection',
          correctOptionText: q.options[q.correctIndex] || '',
          explanation: q.explanation,
          courseId,
          courseCode,
          topicId,
          topicTitle,
          timestamp: new Date().toISOString(),
          reviewed: false,
        });
      }
    });
  }

  const handleSubmit = () => {
    setSubmitted(true);
    const calculated = calculateScore();
    const calculatedPercentage = questions.length > 0 ? Math.round((calculated / questions.length) * 100) : 0;
    const passed = calculatedPercentage >= passPercentageRequired;

    const mistakeList: QuestionMistakeRecord[] = [];
    questions.forEach((q, idx) => {
      const selectedIdx = selectedAnswers[idx];
      if (selectedIdx !== undefined && selectedIdx !== q.correctIndex) {
        mistakeList.push({
          id: `mistake-${Date.now()}-${idx}`,
          questionId: q.id,
          questionPrompt: q.prompt,
          questionType: 'multiple_choice',
          selectedOptionText: q.options[selectedIdx] || 'No selection',
          correctOptionText: q.options[q.correctIndex] || '',
          explanation: q.explanation,
          courseId,
          courseCode,
          topicId,
          topicTitle,
          timestamp: new Date().toISOString(),
          reviewed: false,
        });
      }
    });

    onQuizCompleted(calculated, questions.length, mistakeList, passed);
  };

  const handleRetry = () => {
    setSelectedAnswers({});
    setSubmitted(false);
    setShowMistakesReview(false);
  };

  const handleRetryMissedOnly = () => {
    // Keep only the correctly answered questions locked, reset the wrong ones
    const newAnswers: Record<number, number> = {};
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        newAnswers[idx] = selectedAnswers[idx];
      }
    });
    setSelectedAnswers(newAnswers);
    setSubmitted(false);
    setShowMistakesReview(false);
  };

  return (
    <div className="mt-12 pt-8 border-t border-[#E8E4DC]">
      <div className="bg-[#FAF8F5] border border-[#E8E4DC] rounded-xl p-6 sm:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E8E4DC]">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#585E5A] mb-1">
              <span>Section Checkpoint</span>
              <span aria-hidden="true">·</span>
              <span>{questions.length} Comprehension Check{questions.length > 1 ? 's' : ''}</span>
            </div>
            <h4 className="font-serif text-lg font-bold text-[#191C1A]">
              Check Your Understanding
            </h4>
          </div>

          {submitted && (
            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className="text-xs text-[#585E5A] block">Score</span>
                <span className="font-mono text-base font-bold text-[#14382B]">
                  {score} / {questions.length} ({Math.round((score / questions.length) * 100)}%)
                </span>
              </div>
              <button
                onClick={handleRetry}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#14382B] bg-[#14382B]/10 hover:bg-[#14382B]/15 rounded-lg transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retry All</span>
              </button>
            </div>
          )}
        </div>

        {/* Questions list */}
        <div className="mt-6 space-y-6">
          {questions.map((question, qIdx) => {
            const selectedOpt = selectedAnswers[qIdx];
            const isAnswered = selectedOpt !== undefined;
            const isCorrect = submitted && selectedOpt === question.correctIndex;
            const isIncorrect = submitted && isAnswered && selectedOpt !== question.correctIndex;

            return (
              <div key={question.id || qIdx} className="space-y-3">
                <div className="flex items-start gap-2">
                  <span className="font-mono text-xs font-semibold text-[#585E5A] mt-0.5">
                    0{qIdx + 1}.
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-[#191C1A] leading-relaxed">
                      {question.prompt}
                    </p>
                    {/* Clear distinction of question origin & source citation */}
                    <div className="flex items-center gap-2 text-[11px] text-[#8C928E] mt-1">
                      {question.origin === 'original_past_question' ? (
                        <span className="text-[#14382B] font-medium">
                          Authentic Exam Question ({question.sourceYear || 'Official'})
                        </span>
                      ) : (
                        <span>Grounded Reading Checkpoint</span>
                      )}
                      {question.sourceReference && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span>Source: {question.sourceReference}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Options */}
                <div className="grid grid-cols-1 gap-2 pl-6">
                  {question.options.map((option, optIdx) => {
                    const isSelected = selectedOpt === optIdx;
                    const isTheCorrectOne = submitted && optIdx === question.correctIndex;
                    const isSelectedWrong = submitted && isSelected && optIdx !== question.correctIndex;

                    let optionStyle = 'border-[#E8E4DC] bg-white text-[#2D312E] hover:border-[#14382B]/40';

                    if (submitted) {
                      if (isTheCorrectOne) {
                        optionStyle = 'border-emerald-600 bg-emerald-50 text-emerald-950 font-medium';
                      } else if (isSelectedWrong) {
                        optionStyle = 'border-rose-300 bg-rose-50 text-rose-950';
                      } else {
                        optionStyle = 'border-[#E8E4DC] bg-white text-[#8C928E] opacity-70';
                      }
                    } else if (isSelected) {
                      optionStyle = 'border-[#14382B] bg-[#14382B]/5 text-[#14382B] font-medium';
                    }

                    return (
                      <div key={optIdx} className="space-y-1">
                        <button
                          type="button"
                          disabled={submitted}
                          onClick={() => handleSelectOption(qIdx, optIdx)}
                          className={`w-full text-left p-3 text-xs sm:text-sm rounded-lg border transition-all flex items-start gap-2.5 ${optionStyle}`}
                        >
                          <span className="font-mono text-xs text-[#585E5A] shrink-0 mt-0.5">
                            {String.fromCharCode(65 + optIdx)}.
                          </span>
                          <span className="flex-1 leading-relaxed">{option}</span>
                          {submitted && isTheCorrectOne && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                          )}
                          {submitted && isSelectedWrong && (
                            <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                          )}
                        </button>
                        {submitted && question.optionExplanations && question.optionExplanations[optIdx] && (
                          <div
                            className={`px-3 py-1.5 rounded-lg text-[11px] leading-relaxed ml-6 ${
                              isTheCorrectOne
                                ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                                : 'bg-[#FAF8F5] text-[#585E5A] border border-[#E8E4DC]'
                            }`}
                          >
                            <span className="font-semibold mr-1">
                              {isTheCorrectOne ? '✓ Textbook Rule:' : '✗ Why Incorrect:'}
                            </span>
                            {question.optionExplanations[optIdx]}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Explanation on submission */}
                {submitted && (
                  <div
                    className={`mt-2 p-3.5 rounded-xl text-xs leading-relaxed pl-6 ${
                      isCorrect
                        ? 'bg-emerald-50 text-emerald-950 border border-emerald-200'
                        : 'bg-rose-50 text-rose-950 border border-rose-200'
                    }`}
                  >
                    <p className="font-semibold mb-1">
                      {isCorrect ? 'Correct Answer' : 'Explanation & Source Grounding:'}
                    </p>
                    <p>{question.explanation}</p>
                    {question.sourceReference && (
                      <p className="mt-1.5 text-[11px] opacity-80">
                        Reference: {question.sourceReference}
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Pass / Fail Outcome Notification Banner */}
        {submitted && (
          <div className="mt-6">
            {isPassed ? (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-950 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
                  <div>
                    <span className="font-bold text-xs sm:text-sm block">Unit Assessment Passed ({percentage}% - Required: {passPercentageRequired}%)</span>
                    <span className="text-xs text-emerald-800">You have verified your comprehension of this material. Advancement to the next unit is now unlocked.</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 text-amber-950 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0" />
                  <div>
                    <span className="font-bold text-xs sm:text-sm block">Passing Score Not Achieved ({percentage}% - Minimum {passPercentageRequired}% Required)</span>
                    <span className="text-xs text-amber-800">You must achieve at least {passPercentageRequired}% on this checkpoint before advancing to subsequent units. Review your mistakes below and click "Retry Missed Questions".</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Post-Submission Actions Bar */}
        <div className="mt-8 pt-4 border-t border-[#E8E4DC] flex flex-wrap items-center justify-between gap-3">
          {!submitted ? (
            <button
              onClick={handleSubmit}
              disabled={!allAnswered}
              className="flex items-center gap-2 px-5 py-2 text-xs font-semibold text-white bg-[#14382B] hover:bg-[#0E261D] disabled:opacity-40 disabled:cursor-not-allowed rounded-xl shadow-xs transition-all ml-auto"
            >
              <span>Submit Answers</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <>
              <div className="flex flex-wrap items-center gap-3">
                {mistakes.length > 0 && (
                  <button
                    onClick={() => setShowMistakesReview(!showMistakesReview)}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-red-800 bg-red-100 hover:bg-red-200 border border-red-200 rounded-lg transition-colors"
                  >
                    <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
                    <span>Review Mistakes ({mistakes.length})</span>
                  </button>
                )}

                {mistakes.length > 0 && (
                  <button
                    onClick={handleRetryMissedOnly}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#1E3A2F] hover:bg-[#F0ECE4] rounded-lg transition-colors"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Retry Missed Questions</span>
                  </button>
                )}
              </div>

              {onContinueReading && (
                <button
                  onClick={() => {
                    if (!isPassed) return;
                    onContinueReading();
                  }}
                  disabled={!isPassed}
                  className={`flex items-center gap-2 px-5 py-2.5 text-xs font-semibold rounded-xl shadow-xs transition-all ml-auto ${
                    isPassed
                      ? 'bg-[#14382B] hover:bg-[#0E261D] text-white'
                      : 'bg-[#D8D2C6] text-[#585E5A] cursor-not-allowed opacity-75'
                  }`}
                  title={isPassed ? 'Assessment passed! Proceed.' : `Must score at least ${passPercentageRequired}% to advance.`}
                >
                  <span>
                    {isPassed
                      ? hasNextTopic
                        ? 'Passed! Continue to Next Topic'
                        : 'Passed! Return to Course Syllabus'
                      : `Pass Checkpoint to Proceed (${passPercentageRequired}% Required)`}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </>
          )}
        </div>

        {/* Expanded Mistakes Review Panel */}
        {submitted && showMistakesReview && mistakes.length > 0 && (
          <div className="mt-6 p-5 bg-white border border-red-200 rounded-xl space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between pb-2 border-b border-red-100">
              <div className="flex items-center gap-2 text-xs font-bold text-red-900">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                <span>Mistake Breakdown & Correction Guide</span>
              </div>
              <button
                onClick={() => setShowMistakesReview(false)}
                className="text-xs text-[#8C928E] hover:text-[#191C1A]"
              >
                Close
              </button>
            </div>

            <div className="space-y-4 divide-y divide-red-100">
              {mistakes.map((m, mIdx) => (
                <div key={m.id} className="pt-3 first:pt-0 space-y-2 text-xs">
                  <p className="font-semibold text-[#191C1A]">{m.questionPrompt}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                    <div className="p-2.5 bg-red-50 rounded border border-red-200 text-red-900">
                      <span className="font-semibold block text-red-700">Your Answer:</span>
                      <span>{m.selectedOptionText}</span>
                    </div>
                    <div className="p-2.5 bg-[#F1F7F4] rounded border border-[#CDE1D6] text-[#1E3A2F]">
                      <span className="font-semibold block text-[#2E6247]">Correct Answer:</span>
                      <span>{m.correctOptionText}</span>
                    </div>
                  </div>

                  <p className="text-[#585E5A] bg-[#FAF8F5] p-2.5 rounded border border-[#E8E4DC] leading-relaxed">
                    <strong className="text-[#191C1A]">Why: </strong>
                    {m.explanation}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
