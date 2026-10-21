import React, { useState } from 'react';
import {
  PenTool,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  ArrowRight,
  BookOpen,
  HelpCircle,
  Award,
  FileText,
  ChevronDown,
  ChevronUp,
  Sliders,
  Sparkles,
  Info
} from 'lucide-react';
import { WrittenQuestion, WrittenEvaluationResult } from '../types';
import { evaluateWrittenAnswerAsync } from '../services/evaluator';

interface WrittenAssessmentCheckpointProps {
  questions: WrittenQuestion[];
  topicTitle: string;
  courseCode: string;
  courseId: string;
  topicId: string;
  unitId: string;
  onEvaluationCompleted: (evaluations: WrittenEvaluationResult[]) => void;
  onContinueToNextUnit?: () => void;
  hasNextUnit?: boolean;
}

export const WrittenAssessmentCheckpoint: React.FC<WrittenAssessmentCheckpointProps> = ({
  questions,
  topicTitle,
  courseCode,
  courseId,
  topicId,
  unitId,
  onEvaluationCompleted,
  onContinueToNextUnit,
  hasNextUnit,
}) => {
  const [activeQuestionIdx, setActiveQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [results, setResults] = useState<Record<string, WrittenEvaluationResult>>({});
  const [attemptHistory, setAttemptHistory] = useState<Record<string, WrittenEvaluationResult[]>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showMarkingGuide, setShowMarkingGuide] = useState<Record<string, boolean>>({});
  const [passMark, setPassMark] = useState<number>(7); // Default 7/10 (70%)
  const [showSettings, setShowSettings] = useState(false);

  if (!questions || questions.length === 0) {
    return null;
  }

  const currentQ = questions[activeQuestionIdx];
  const currentResult = results[currentQ.id];
  const currentAnswer = answers[currentQ.id] || '';
  const currentAttempts = attemptHistory[currentQ.id] || [];

  const handleAnswerChange = (val: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQ.id]: val,
    }));
  };

  const handleEvaluateCurrent = async () => {
    if (!currentAnswer.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const evalResult = await evaluateWrittenAnswerAsync(currentQ, currentAnswer, { passMark });
      const updatedResults = {
        ...results,
        [currentQ.id]: evalResult,
      };
      setResults(updatedResults);

      // Record in attempt history for tracking improvement
      setAttemptHistory((prev) => ({
        ...prev,
        [currentQ.id]: [...(prev[currentQ.id] || []), evalResult],
      }));

      // Notify parent
      onEvaluationCompleted(Object.values(updatedResults));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRetryQuestion = (qId: string) => {
    setAnswers((prev) => ({
      ...prev,
      [qId]: '',
    }));
    setResults((prev) => {
      const copy = { ...prev };
      delete copy[qId];
      return copy;
    });
  };

  // Compute total marks and pass statuses
  const totalMaxMarks = questions.reduce((sum, q) => sum + (q.maxMarks || 10), 0);
  const totalAwardedMarks = Object.values(results).reduce((sum, r) => sum + r.score, 0);
  const allAnswered = questions.every((q) => Boolean(results[q.id]));
  const allPassed = questions.every((q) => results[q.id] && results[q.id].passed);

  return (
    <div className="mt-12 pt-8 border-t border-[#E8E4DC]">
      <div className="bg-[#FAF8F5] border border-[#E8E4DC] rounded-xl p-6 sm:p-8 space-y-6">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E8E4DC]">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#585E5A] mb-1">
              <PenTool className="w-3.5 h-3.5 text-[#1E3A2F]" />
              <span className="font-semibold text-[#1E3A2F]">Compulsory Unit Understanding Examination</span>
              <span aria-hidden="true">·</span>
              <span>Pass Mark: {passMark}/10 ({Math.round((passMark / 10) * 100)}%)</span>
            </div>
            <h4 className="font-serif text-lg sm:text-xl font-bold text-[#191C1A]">
              Written Pen-on-Paper Assessment ({questions.length} Question{questions.length > 1 ? 's' : ''})
            </h4>
          </div>

          <div className="flex items-center gap-3">
            {Object.keys(results).length > 0 && (
              <div className="text-right">
                <span className="text-[11px] text-[#585E5A] block">Unit Assessment Score</span>
                <span className="font-mono text-base font-bold text-[#1E3A2F]">
                  {totalAwardedMarks} / {totalMaxMarks} Marks
                </span>
              </div>
            )}

            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 text-[#585E5A] hover:text-[#191C1A] hover:bg-white border border-[#D8D2C6] rounded-lg transition-colors text-xs flex items-center gap-1"
              title="Configure pass mark requirement"
            >
              <Sliders className="w-3.5 h-3.5 text-[#1E3A2F]" />
              <span className="hidden sm:inline">Pass Mark: {passMark}/10</span>
            </button>
          </div>
        </div>

        {/* Configurable Pass Mark Settings Drawer */}
        {showSettings && (
          <div className="p-4 bg-white border border-[#E8E4DC] rounded-xl text-xs space-y-3 animate-in fade-in">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-[#191C1A]">Configurable Unit Pass Mark (Default: 7/10)</span>
              <span className="font-mono font-bold text-[#1E3A2F]">{passMark}/10 ({passMark * 10}%)</span>
            </div>
            <p className="text-[#585E5A]">
              Adjust the threshold required before this unit is officially marked as passed. NOUN degree standard requires 70% (7/10).
            </p>
            <div className="flex items-center gap-2 pt-1">
              {[5, 6, 7, 8, 9].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setPassMark(val)}
                  className={`px-3 py-1 rounded-md font-semibold transition-colors ${
                    passMark === val
                      ? 'bg-[#1E3A2F] text-white'
                      : 'bg-[#FAF8F5] text-[#585E5A] border border-[#D8D2C6] hover:bg-[#F3EFEA]'
                  }`}
                >
                  {val}/10 ({val * 10}%)
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Question Selector Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-[#F0ECE4] rounded-lg overflow-x-auto">
          {questions.map((q, idx) => {
            const res = results[q.id];
            const isSelected = activeQuestionIdx === idx;
            return (
              <button
                key={q.id}
                onClick={() => setActiveQuestionIdx(idx)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all whitespace-nowrap flex items-center gap-2 ${
                  isSelected
                    ? 'bg-white text-[#191C1A] shadow-xs'
                    : 'text-[#585E5A] hover:text-[#191C1A]'
                }`}
              >
                <span>Question {idx + 1}</span>
                {res && (
                  <span
                    className={`font-mono text-[10px] px-1.5 py-0.5 rounded font-bold ${
                      res.passed
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {res.score}/{q.maxMarks} {res.passed ? '✓' : '✗'}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Current Question Container */}
        <div className="bg-white border border-[#E8E4DC] rounded-xl p-5 sm:p-6 space-y-4 shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-mono font-semibold text-[#1E3A2F] bg-[#FAF8F5] border border-[#E8E4DC] px-2 py-0.5 rounded">
                {currentQ.sourceLabel || `${courseCode} Examination`}
              </span>
              <span className="text-[#585E5A]">{currentQ.sourceReference}</span>
            </div>

            <span className="font-mono text-xs font-bold text-[#1E3A2F] bg-[#FAF8F5] border border-[#E8E4DC] px-2 py-0.5 rounded">
              Total: {currentQ.maxMarks} Marks (Pass: {passMark}/10)
            </span>
          </div>

          <p className="font-serif text-base sm:text-lg font-bold text-[#191C1A] leading-relaxed">
            {currentQ.prompt}
          </p>

          {/* Written Answer Input Box */}
          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between text-xs text-[#585E5A]">
              <label className="font-semibold text-[#191C1A]">
                Your Written Examination Response:
              </label>
              <span>Equivalent wording accepted (pen-on-paper style)</span>
            </div>

            <textarea
              rows={6}
              disabled={Boolean(currentResult)}
              placeholder="Type your structured answer here as you would in a pen-on-paper examination. Explain key concepts, list points, define terms, and provide textbook examples..."
              value={currentAnswer}
              onChange={(e) => handleAnswerChange(e.target.value)}
              className="w-full p-3.5 text-xs sm:text-sm bg-[#FAF8F5] border border-[#D8D2C6] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E3A2F] leading-relaxed disabled:opacity-85 disabled:bg-[#F9F7F3] text-[#191C1A]"
            />
          </div>

          {/* Action Row */}
          {!currentResult ? (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <span className="text-xs text-[#8C928E]">
                Submit your response to receive structured textbook assessment out of 10.
              </span>
              <button
                onClick={handleEvaluateCurrent}
                disabled={!currentAnswer.trim() || isSubmitting}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 text-xs font-semibold text-white bg-[#1E3A2F] hover:bg-[#152B22] disabled:opacity-40 rounded-lg shadow-sm transition-all"
              >
                <PenTool className="w-3.5 h-3.5" />
                <span>{isSubmitting ? 'Marking Answer Against Textbook...' : 'Submit Written Response for Marking'}</span>
              </button>
            </div>
          ) : (
            /* Results Breakdown as strictly specified by user */
            <div className="space-y-4 pt-4 border-t border-[#E8E4DC] animate-in fade-in">
              {/* Score & Result Banner */}
              <div
                className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  currentResult.passed
                    ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                    : 'bg-amber-50/80 border-amber-200 text-amber-950'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white shrink-0 ${
                      currentResult.passed ? 'bg-emerald-700' : 'bg-amber-700'
                    }`}
                  >
                    <Award className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xl font-bold">
                        My Score: {currentResult.score} / {currentResult.maxMarks}
                      </span>
                      <span
                        className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                          currentResult.passed
                            ? 'bg-emerald-200 text-emerald-900'
                            : 'bg-amber-200 text-amber-900'
                        }`}
                      >
                        Result: {currentResult.passed ? 'Passed ✓' : 'Not Yet Passed ✗'}
                      </span>
                    </div>
                    <p className="text-xs mt-0.5 opacity-90">
                      {currentResult.passed
                        ? `Congratulations! You met the required ${passMark}/10 pass mark.`
                        : `You scored below the required ${passMark}/10 pass mark. Review mistakes and retry.`}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handleRetryQuestion(currentQ.id)}
                  className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold bg-white border border-[#D8D2C6] hover:bg-[#FAF8F5] rounded-lg shadow-xs transition-colors self-start sm:self-auto text-[#1E3A2F]"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-[#1E3A2F]" />
                  <span>Review & Retry Question</span>
                </button>
              </div>

              {/* What I Got Right vs What I Missed */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {/* What I got right */}
                <div className="p-4 bg-[#F1F7F4] border border-[#CDE1D6] rounded-xl space-y-2">
                  <div className="flex items-center gap-1.5 font-bold text-[#1E3A2F]">
                    <CheckCircle2 className="w-4 h-4 text-[#2E6247]" />
                    <span>What I Got Right ({currentResult.pointsIncluded.length})</span>
                  </div>
                  {currentResult.pointsIncluded.length === 0 ? (
                    <p className="text-[#585E5A] italic">No textbook rubric points were recognized.</p>
                  ) : (
                    <ul className="list-disc pl-4 space-y-1.5 text-[#2D312E] leading-relaxed">
                      {currentResult.pointsIncluded.map((pt, pIdx) => (
                        <li key={pIdx}>{pt}</li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* What I missed */}
                <div className="p-4 bg-[#FDF6F5] border border-[#F3D5D0] rounded-xl space-y-2">
                  <div className="flex items-center gap-1.5 font-bold text-red-900">
                    <AlertTriangle className="w-4 h-4 text-red-600" />
                    <span>What I Missed ({currentResult.pointsMissed.length})</span>
                  </div>
                  {currentResult.pointsMissed.length === 0 ? (
                    <p className="text-[#2E6247] font-medium">None! You covered all essential textbook concepts.</p>
                  ) : (
                    <ul className="list-disc pl-4 space-y-1.5 text-red-950 leading-relaxed">
                      {currentResult.pointsMissed.map((pt, pIdx) => (
                        <li key={pIdx}>{pt}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              {/* Terminology Check & Corrections */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 bg-white border border-[#E8E4DC] rounded-xl space-y-2">
                  <strong className="text-[#191C1A] block font-serif">Terminology Check:</strong>
                  {currentResult.terminologyCheck && currentResult.terminologyCheck.length > 0 ? (
                    <ul className="list-disc pl-4 space-y-1 text-[#585E5A]">
                      {currentResult.terminologyCheck.map((t, i) => (
                        <li key={i}>{t}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-[#585E5A]">Terminology used was consistent with the textbook.</p>
                  )}
                </div>

                <div className="p-4 bg-white border border-[#E8E4DC] rounded-xl space-y-2">
                  <strong className="text-[#191C1A] block font-serif">Corrections:</strong>
                  {currentResult.corrections && currentResult.corrections.length > 0 ? (
                    <ul className="list-disc pl-4 space-y-1 text-amber-900">
                      {currentResult.corrections.map((c, i) => (
                        <li key={i}>{c}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-[#2E6247]">No contradictory or inaccurate statements found.</p>
                  )}
                </div>
              </div>

              {/* How To Improve */}
              {currentResult.howToImprove && currentResult.howToImprove.length > 0 && (
                <div className="p-4 bg-[#F8F5EE] border border-[#E8DEC9] rounded-xl text-xs space-y-1.5 text-[#383D3B]">
                  <strong className="text-[#191C1A] font-serif block">How to Improve:</strong>
                  <ul className="list-disc pl-4 space-y-1">
                    {currentResult.howToImprove.map((advice, i) => (
                      <li key={i}>{advice}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Suggested Answer & Marking Guide Accordion */}
              <div className="pt-1">
                <button
                  type="button"
                  onClick={() =>
                    setShowMarkingGuide((prev) => ({
                      ...prev,
                      [currentQ.id]: !prev[currentQ.id],
                    }))
                  }
                  className="w-full flex items-center justify-between p-3.5 bg-[#FAF8F5] border border-[#E8E4DC] rounded-xl text-xs font-semibold text-[#1E3A2F] hover:bg-[#F3EFEA] transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    <span>Suggested Model Answer & Source Reference</span>
                  </span>
                  {showMarkingGuide[currentQ.id] ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>

                {showMarkingGuide[currentQ.id] && (
                  <div className="p-4 bg-[#F8F5EE] border border-t-0 border-[#E8DEC9] rounded-b-xl text-xs text-[#383D3B] leading-relaxed space-y-3 animate-in fade-in">
                    <div>
                      <p className="font-semibold text-[#191C1A] mb-1">Official Textbook Model Answer:</p>
                      <p className="whitespace-pre-line bg-white/70 p-3 rounded-lg border border-[#E8DEC9]">
                        {currentResult.suggestedAnswer || currentQ.expectedAnswerGuide}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-[#E8DEC9] flex items-center justify-between text-[11px] text-[#8C928E]">
                      <span>Source: <strong>{currentResult.sourceReference || currentQ.sourceReference}</strong></span>
                      <span className="italic">Evaluated via {currentResult.engineUsed === 'gemini_grounded' ? 'Gemini AI Proxy' : 'Textbook Rubric Retrieval'}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Attempt History Tracker */}
              {currentAttempts.length > 1 && (
                <div className="p-3 bg-white border border-[#E8E4DC] rounded-xl text-xs text-[#585E5A] space-y-1">
                  <span className="font-semibold text-[#191C1A] block">Score History on this Question:</span>
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    {currentAttempts.map((att, aIdx) => (
                      <span
                        key={aIdx}
                        className={`font-mono px-2 py-0.5 rounded border text-[11px] ${
                          att.passed
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : 'bg-amber-50 text-amber-800 border-amber-200'
                        }`}
                      >
                        Attempt {aIdx + 1}: {att.score}/{att.maxMarks} ({att.passed ? 'Passed' : 'Failed'})
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Bottom Pager for Questions or Unit Completion */}
        <div className="pt-4 border-t border-[#E8E4DC] flex items-center justify-between">
          <button
            onClick={() => setActiveQuestionIdx((prev) => Math.max(0, prev - 1))}
            disabled={activeQuestionIdx === 0}
            className="px-3.5 py-1.5 text-xs font-semibold text-[#585E5A] hover:text-[#191C1A] disabled:opacity-40 transition-colors"
          >
            ← Previous Question
          </button>

          <div className="flex items-center gap-2">
            {activeQuestionIdx < questions.length - 1 ? (
              <button
                onClick={() => setActiveQuestionIdx((prev) => prev + 1)}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#14382B] hover:bg-[#0E261D] rounded-xl transition-colors"
              >
                <span>Next Question</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              /* Unit Completion Lock: Only enabled when student passes the unit exam! */
              onContinueToNextUnit && (
                <button
                  onClick={onContinueToNextUnit}
                  disabled={!allPassed}
                  className={`flex items-center gap-2 px-5 py-2.5 text-xs font-semibold rounded-xl shadow-xs transition-all ${
                    allPassed
                      ? 'bg-[#14382B] hover:bg-[#0E261D] text-white'
                      : 'bg-[#D8D2C6] text-[#585E5A] cursor-not-allowed opacity-75'
                  }`}
                  title={allPassed ? 'Pass mark achieved! Proceed to next unit.' : `Must score at least ${passMark}/10 on all questions to pass unit.`}
                >
                  <span>
                    {allPassed
                      ? hasNextUnit
                        ? 'Passed! Continue to Next Unit'
                        : 'Passed! Finish Course Syllabus'
                      : `Pass Exam to Proceed (${passMark}/10 Required)`}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
