import { WrittenQuestion, WrittenEvaluationResult } from '../types';

export interface EvaluationOptions {
  passMark?: number; // default 7 out of 10
}

/**
 * Evaluates a written answer strictly against the textbook marking rubric.
 * - Enforces default pass mark of 7/10 (70%).
 * - Tolerates flexible student phrasing/synonyms (no rigid word-for-word penalty).
 * - Identifies points included, points missed, terminology check, corrections, suggested answer, and improvement steps.
 */
export async function evaluateWrittenAnswerAsync(
  question: WrittenQuestion,
  userAnswer: string,
  options?: EvaluationOptions
): Promise<WrittenEvaluationResult> {
  const passMark = options?.passMark ?? 7;

  // Attempt server-side Gemini AI evaluation first if backend proxy is active
  try {
    const res = await fetch('/api/evaluate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        question,
        userAnswer,
        passMark,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data && typeof data.score === 'number') {
        return {
          questionId: question.id,
          userAnswer: userAnswer.trim(),
          score: Math.max(0, Math.min(question.maxMarks, Math.round(data.score))),
          maxMarks: question.maxMarks,
          passed: data.score >= passMark,
          passMark,
          expectedAnswerGuide: question.expectedAnswerGuide,
          pointsIncluded: Array.isArray(data.pointsIncluded) ? data.pointsIncluded : [],
          pointsMissed: Array.isArray(data.pointsMissed) ? data.pointsMissed : [],
          inaccurateStatements: Array.isArray(data.inaccurateStatements) ? data.inaccurateStatements : [],
          terminologyCheck: Array.isArray(data.terminologyCheck) ? data.terminologyCheck : [],
          corrections: Array.isArray(data.corrections) ? data.corrections : [],
          suggestedAnswer: data.suggestedAnswer || question.expectedAnswerGuide,
          howToImprove: Array.isArray(data.howToImprove) ? data.howToImprove : [],
          sourceReference: question.sourceReference,
          feedbackExplanation: data.feedbackExplanation || (data.score >= passMark ? 'Unit requirement passed.' : 'Review missed concepts and retry.'),
          engineUsed: 'gemini_grounded',
          evaluatedAt: new Date().toISOString(),
        };
      }
    }
  } catch {
    // Graceful fallback to deterministic local textbook rubric evaluator
  }

  return evaluateWrittenAnswerLocal(question, userAnswer, passMark);
}

/**
 * Local deterministic evaluation based strictly on textbook rubric and conceptual matching.
 */
export function evaluateWrittenAnswerLocal(
  question: WrittenQuestion,
  userAnswer: string,
  passMark = 7
): WrittenEvaluationResult {
  const trimmed = userAnswer.trim();
  const maxMarks = question.maxMarks || 10;

  // If answer is empty or too brief (< 4 words)
  if (!trimmed || trimmed.split(/\s+/).length < 4) {
    return {
      questionId: question.id,
      userAnswer: trimmed,
      score: 0,
      maxMarks,
      passed: false,
      passMark,
      expectedAnswerGuide: question.expectedAnswerGuide,
      pointsIncluded: [],
      pointsMissed: question.keyRubricPoints,
      inaccurateStatements: trimmed ? ['Answer is too brief to demonstrate academic understanding.'] : ['No answer submitted.'],
      terminologyCheck: ['Essential academic terminology from the textbook is absent.'],
      corrections: ['You must provide a substantive written response containing the essential definitions, classifications, or explanations specified in the textbook.'],
      suggestedAnswer: question.expectedAnswerGuide,
      howToImprove: [
        'Write a complete answer using sentences and paragraphs.',
        'Address the specific components asked in the question prompt.',
        'Reference the primary definitions or formulas provided in the course unit.'
      ],
      sourceReference: question.sourceReference,
      feedbackExplanation: 'To pass this unit examination, you must provide a substantive written response. The pass mark is 7/10.',
      engineUsed: 'textbook_retrieval',
      evaluatedAt: new Date().toISOString(),
    };
  }

  const normalizedUser = trimmed.toLowerCase();
  const words = normalizedUser.split(/\s+/);
  const pointsIncluded: string[] = [];
  const pointsMissed: string[] = [];
  const inaccurateStatements: string[] = [];
  const terminologyCheck: string[] = [];
  const corrections: string[] = [];
  const howToImprove: string[] = [];

  // Stopwords list
  const stopWords = new Set([
    'that', 'this', 'with', 'from', 'which', 'their', 'there', 'they',
    'have', 'were', 'been', 'must', 'should', 'more', 'also', 'such',
    'into', 'than', 'when', 'what', 'some', 'about', 'other'
  ]);

  // Synonyms and flexible equivalent phrasing dictionary for textbook concepts
  const conceptSynonyms: Record<string, string[]> = {
    'viability': ['workability', 'feasibility', 'practicality', 'survivability', 'success'],
    'profitability': ['profit', 'financial return', 'gain', 'revenue', 'earning'],
    'influence': ['guide', 'direct', 'lead', 'motivate', 'persuade', 'stimulate'],
    'willing': ['voluntary', 'cooperative', 'enthusiastic', 'readily'],
    'legitimate': ['hierarchical', 'official', 'positional', 'formal', 'status'],
    'coercive': ['fear', 'punishment', 'sanction', 'penalty', 'force'],
    'referent': ['reference', 'admiration', 'emulate', 'charisma', 'identification'],
    'expert': ['competence', 'skill', 'knowledge', 'expertise', 'proficiency'],
    'stewardship': ['trust', 'trustee', 'holding in trust', 'care', 'custodian'],
    'agency': ['principal', 'agent', 'conflict', 'separation', 'monitoring'],
    'stakeholder': ['constituent', 'community', 'employee', 'creditor', 'society'],
    'unfreezing': ['unfreeze', 'readiness', 'comfort zone', 'breaking habit'],
    'refreezing': ['refreeze', 'stabilize', 'norm', 'routine', 'permanent'],
  };

  // Evaluate each rubric point against student's answer
  question.keyRubricPoints.forEach((point) => {
    const rawTokens = point
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, ' ')
      .split(/\s+/)
      .filter((w) => w.length >= 4 && !stopWords.has(w));

    let matchedTokensCount = 0;

    rawTokens.forEach((token) => {
      // Direct stem match
      if (normalizedUser.includes(token) || (token.length > 5 && normalizedUser.includes(token.slice(0, -1)))) {
        matchedTokensCount++;
        return;
      }

      // Check concept synonyms
      for (const [key, synList] of Object.entries(conceptSynonyms)) {
        if (token.includes(key) || key.includes(token)) {
          const hasSyn = synList.some((syn) => normalizedUser.includes(syn));
          if (hasSyn) {
            matchedTokensCount++;
            return;
          }
        }
      }
    });

    // Flexible threshold: ~30% of key tokens matched counts as conceptual capture
    const threshold = Math.max(1, Math.ceil(rawTokens.length * 0.3));
    if (matchedTokensCount >= threshold) {
      pointsIncluded.push(point);
    } else {
      pointsMissed.push(point);
    }
  });

  const totalPoints = question.keyRubricPoints.length;
  const includedCount = pointsIncluded.length;
  const fraction = totalPoints > 0 ? includedCount / totalPoints : 0.5;

  // Base score calculation out of maxMarks (usually 10)
  let rawScore = Math.round(fraction * maxMarks);

  // Depth and substance bonus:
  // If the student wrote an extensive answer (>= 40 words) that addressed at least half the points
  if (words.length >= 40 && fraction >= 0.5 && rawScore < maxMarks) {
    rawScore = Math.min(maxMarks, rawScore + 1);
  }

  // Completeness check
  if (includedCount === totalPoints && words.length >= 35) {
    rawScore = maxMarks; // Full 10/10 if all key criteria are met
  }

  // Ensure score stays within bounds [0, maxMarks]
  const finalScore = Math.max(0, Math.min(maxMarks, rawScore));
  const passed = finalScore >= passMark;

  // Generate Terminology Check
  if (pointsIncluded.length > 0) {
    terminologyCheck.push(`Demonstrated appropriate usage of key concepts related to: ${pointsIncluded.slice(0, 2).map((p) => p.split(':')[0]).join(', ')}.`);
  }
  if (pointsMissed.length > 0) {
    terminologyCheck.push(`Remember to incorporate precise textbook terminology: ${pointsMissed.slice(0, 2).map((p) => p.split(':')[0]).join(', ')}.`);
  }

  // Generate Inaccuracies and Corrections
  if (pointsMissed.length > 0 && finalScore < passMark) {
    corrections.push(`Your response omitted several required criteria specified in ${question.sourceReference}. Ensure all numbered points are covered.`);
  }
  if (words.length < 25 && finalScore < passMark) {
    inaccurateStatements.push('The explanation lacks the depth expected in a NOUN degree written examination.');
  }

  // Generate How To Improve
  if (pointsMissed.length > 0) {
    howToImprove.push(`Add the missing points: ${pointsMissed.join('; ')}.`);
  }
  howToImprove.push(`Structure your answer with clear headings or numbered lists matching ${question.sourceReference}.`);
  if (!passed) {
    howToImprove.push(`Review the Suggested Model Answer below and retry this question to meet the ${passMark}/${maxMarks} pass mark.`);
  }

  let feedbackExplanation = '';
  if (passed) {
    feedbackExplanation = `Passed (${finalScore}/${maxMarks} marks). You met the ${passMark}/${maxMarks} requirement by capturing ${includedCount} of ${totalPoints} required textbook criteria. Good conceptual understanding!`;
  } else {
    feedbackExplanation = `Not Yet Passed (${finalScore}/${maxMarks} marks). The pass mark for this unit is ${passMark}/${maxMarks}. Review the missed points and suggested answer below, then click "Try Again" to improve your score.`;
  }

  return {
    questionId: question.id,
    userAnswer: trimmed,
    score: finalScore,
    maxMarks,
    passed,
    passMark,
    expectedAnswerGuide: question.expectedAnswerGuide,
    pointsIncluded,
    pointsMissed,
    inaccurateStatements,
    terminologyCheck,
    corrections,
    suggestedAnswer: question.expectedAnswerGuide,
    howToImprove,
    sourceReference: question.sourceReference,
    feedbackExplanation,
    engineUsed: 'textbook_retrieval',
    evaluatedAt: new Date().toISOString(),
  };
}

export function evaluateWrittenAnswer(
  question: WrittenQuestion,
  userAnswer: string
): WrittenEvaluationResult {
  return evaluateWrittenAnswerLocal(question, userAnswer, 7);
}
