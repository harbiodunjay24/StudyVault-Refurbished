import { Course, StudyUnit, UserProgress, WrittenEvaluationResult, UnitStatus } from '../types';

export interface UnitMasteryRecord {
  courseId: string;
  unitId: string;
  passed: boolean;
  score: number; // average or total out of 10
  percentage: number;
  attempts: number;
  passedAt?: string;
  lastAttemptAt: string;
  history: {
    attemptNumber: number;
    score: number;
    passed: boolean;
    timestamp: string;
  }[];
}

const MASTERY_STORAGE_PREFIX = 'studyvault_mastery_v8_';

export function getStoredMasteryRecords(courseId: string): Record<string, UnitMasteryRecord> {
  try {
    const raw = localStorage.getItem(`${MASTERY_STORAGE_PREFIX}${courseId}`);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Failed to load unit mastery records:', e);
  }
  return {};
}

export function saveStoredMasteryRecords(
  courseId: string,
  records: Record<string, UnitMasteryRecord>
): void {
  try {
    localStorage.setItem(`${MASTERY_STORAGE_PREFIX}${courseId}`, JSON.stringify(records));
  } catch (e) {
    console.error('Failed to save unit mastery records:', e);
  }
}

/**
 * Returns all units in linear sequence across all modules of a course.
 */
export function getAllCourseUnitsInOrder(course: Course): StudyUnit[] {
  const units: StudyUnit[] = [];
  for (const mod of course.modules) {
    for (const u of mod.units) {
      units.push(u);
    }
  }
  return units;
}

export function isUnitUnlocked(
  _course: Course,
  _unitId: string,
  _progress: UserProgress
): { unlocked: boolean; reason?: string; requiredPrecedingUnit?: StudyUnit } {
  // All units and topics are freely accessible immediately in any order
  return { unlocked: true };
}

/**
 * Derives the accurate UnitStatus based on actual student progress,
 * reading completion, and optional assessment submissions.
 * Reading access is completely unrestricted across all units and topics.
 */
export function computeAccurateUnitStatus(
  course: Course,
  unit: StudyUnit,
  progress: UserProgress
): UnitStatus {
  const masteryRecords = getStoredMasteryRecords(course.id);
  const record = masteryRecords[unit.id];

  // If already passed optional assessment
  if (record?.passed || progress.unitStatuses?.[unit.id] === 'passed') {
    return 'passed';
  }

  // If assessment was attempted and needs practice
  if (record && !record.passed) {
    return 'needs_practice';
  }

  // Check reading progress of unit topics
  const unitTopicIds = unit.topics.map((t) => t.id);
  const completedInUnit = unitTopicIds.filter((tId) =>
    progress.completedTopicIds.includes(tId)
  ).length;

  if (completedInUnit === 0) {
    return 'not_started';
  }

  // If all topics in the unit have been read, mark as completed (assessments are optional)
  if (completedInUnit >= unitTopicIds.length) {
    return 'completed';
  }

  return 'in_progress';
}

/**
 * Evaluates written question submissions for a unit,
 * calculates the score out of 10 and percentage,
 * records the mastery record, and updates UserProgress.
 */
export function recordUnitMasteryEvaluation(
  course: Course,
  unit: StudyUnit,
  evaluations: WrittenEvaluationResult[],
  passThreshold = 7
): {
  passed: boolean;
  score: number;
  percentage: number;
  attemptNumber: number;
  nextUnitUnlocked: boolean;
  nextUnitTitle?: string;
} {
  const masteryRecords = getStoredMasteryRecords(course.id);
  const existing = masteryRecords[unit.id];

  // Calculate average score out of 10 across all evaluated questions
  const totalScore = evaluations.reduce((sum, ev) => sum + ev.score, 0);
  const maxPossible = evaluations.reduce((sum, ev) => sum + ev.maxMarks, 0);

  const normalizedScore =
    maxPossible > 0 ? Math.round((totalScore / maxPossible) * 10 * 10) / 10 : 0;
  const percentage = maxPossible > 0 ? Math.round((totalScore / maxPossible) * 100) : 0;

  // Pass threshold: score >= passThreshold (e.g. 7 out of 10 / 70%) AND all questions >= passMark
  const allQuestionsPassed = evaluations.every((ev) => ev.passed);
  const passed = (normalizedScore >= passThreshold || percentage >= passThreshold * 10) && allQuestionsPassed;

  const attemptNumber = (existing?.attempts || 0) + 1;
  const now = new Date().toISOString();

  const updatedRecord: UnitMasteryRecord = {
    courseId: course.id,
    unitId: unit.id,
    passed: existing?.passed || passed,
    score: Math.max(existing?.score || 0, normalizedScore),
    percentage: Math.max(existing?.percentage || 0, percentage),
    attempts: attemptNumber,
    passedAt: passed ? (existing?.passedAt || now) : existing?.passedAt,
    lastAttemptAt: now,
    history: [
      ...(existing?.history || []),
      {
        attemptNumber,
        score: normalizedScore,
        passed,
        timestamp: now,
      },
    ],
  };

  masteryRecords[unit.id] = updatedRecord;
  saveStoredMasteryRecords(course.id, masteryRecords);

  // Find next unit in sequence
  const allUnits = getAllCourseUnitsInOrder(course);
  const currentIndex = allUnits.findIndex((u) => u.id === unit.id);
  const nextUnit = currentIndex >= 0 && currentIndex < allUnits.length - 1 ? allUnits[currentIndex + 1] : undefined;

  return {
    passed,
    score: normalizedScore,
    percentage,
    attemptNumber,
    nextUnitUnlocked: passed && Boolean(nextUnit),
    nextUnitTitle: nextUnit?.title,
  };
}
