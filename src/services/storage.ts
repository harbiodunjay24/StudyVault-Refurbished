import {
  Course,
  PastExamQuestionItem,
  PersonalNote,
  Bookmark,
  UserProgress,
  QuestionMistakeRecord,
  UnitStatus,
  WrittenEvaluationResult
} from '../types';
import {
  ENT302_AUTHENTIC_COURSE,
  AUTHENTIC_ENT302_PAST_QUESTIONS,
  FMS304_SAMPLE_COURSE,
  AUTHENTIC_FMS304_PAST_QUESTIONS,
  ENT304_AUTHENTIC_COURSE,
  ENT304_MODULES,
  ENT304_PAST_QUESTIONS,
  ENT308_AUTHENTIC_COURSE,
  ENT308_MODULES,
  ENT308_PAST_QUESTIONS,
  CSC202_SECOND_COURSE
} from './sampleData';
import {
  AUTHENTIC_ENT302_EXTRACTED_PAST_QUESTIONS,
  ENT302_UPLOADED_PQ_DOCUMENTS
} from './ent302PastQuestionsData';
import {
  AUTHENTIC_ENT308_EXTRACTED_PAST_QUESTIONS,
  ENT308_UPLOADED_PQ_DOCUMENTS
} from './ent308PastQuestionsData';
import {
  AUTHENTIC_ENT304_EXTRACTED_PAST_QUESTIONS,
  ENT304_UPLOADED_PQ_DOCUMENTS
} from './ent304PastQuestionsData';
import {
  AUTHENTIC_FMS304_EXTRACTED_PAST_QUESTIONS,
  FMS304_UPLOADED_PQ_DOCUMENTS
} from './fms304PastQuestionsData';
import { consolidateCourseLibrary, ConsolidationReportItem } from './courseDeduplication';

const CURRENT_VERSION = 'v13';
const STORAGE_KEYS = {
  COURSES: `studyvault_courses_${CURRENT_VERSION}`,
  PAST_QUESTIONS: `studyvault_past_questions_${CURRENT_VERSION}`,
  NOTES: `studyvault_notes_${CURRENT_VERSION}`,
  BOOKMARKS: `studyvault_bookmarks_${CURRENT_VERSION}`,
  PROGRESS: `studyvault_progress_${CURRENT_VERSION}`,
  CONSOLIDATION_LOG: `studyvault_consolidation_log_${CURRENT_VERSION}`,
};

const LEGACY_COURSE_KEYS = [
  'studyvault_courses_v13',
  'studyvault_courses_v12',
  'studyvault_courses_v11',
  'studyvault_courses_v10',
  'studyvault_courses_v9',
  'studyvault_courses_v8',
  'studyvault_courses_v7',
  'studyvault_courses_v6',
  'studyvault_courses_v5',
  'studyvault_courses_v4',
  'studyvault_courses_v3',
  'studyvault_courses_v2',
  'studyvault_courses_v1',
  'studyvault_courses',
];

const LEGACY_PQ_KEYS = [
  'studyvault_past_questions_v13',
  'studyvault_past_questions_v12',
  'studyvault_past_questions_v11',
  'studyvault_past_questions_v10',
  'studyvault_past_questions_v9',
  'studyvault_past_questions_v8',
  'studyvault_past_questions_v7',
  'studyvault_past_questions_v6',
  'studyvault_past_questions_v5',
  'studyvault_past_questions_v4',
  'studyvault_past_questions_v3',
  'studyvault_past_questions_v2',
  'studyvault_past_questions_v1',
  'studyvault_past_questions',
];

const LEGACY_NOTES_KEYS = [
  'studyvault_notes_v12',
  'studyvault_notes_v11',
  'studyvault_notes_v10',
  'studyvault_notes_v9',
  'studyvault_notes_v8',
  'studyvault_notes_v7',
  'studyvault_notes_v6',
  'studyvault_notes_v5',
  'studyvault_notes_v3',
  'studyvault_notes_v2',
  'studyvault_notes_v1',
  'studyvault_notes',
];

const LEGACY_BOOKMARKS_KEYS = [
  'studyvault_bookmarks_v12',
  'studyvault_bookmarks_v11',
  'studyvault_bookmarks_v10',
  'studyvault_bookmarks_v9',
  'studyvault_bookmarks_v8',
  'studyvault_bookmarks_v7',
  'studyvault_bookmarks_v6',
  'studyvault_bookmarks_v5',
  'studyvault_bookmarks_v4',
  'studyvault_bookmarks_v3',
  'studyvault_bookmarks_v2',
  'studyvault_bookmarks_v1',
  'studyvault_bookmarks',
];

const LEGACY_PROGRESS_KEYS = [
  'studyvault_progress_v12',
  'studyvault_progress_v11',
  'studyvault_progress_v10',
  'studyvault_progress_v9',
  'studyvault_progress_v8',
  'studyvault_progress_v7',
  'studyvault_progress_v6',
  'studyvault_progress_v5',
  'studyvault_progress_v4',
  'studyvault_progress_v3',
  'studyvault_progress_v2',
  'studyvault_progress_v1',
  'studyvault_progress',
];

/**
 * Ensures a course with missing, divergent, or scrambled units is upgraded to the verified authentic sequence
 * derived directly from its authoritative NOUN course guide and textbook document:
 * - ENT 308: 10 Modules, 23 Units (Dr. Mrs Bamidele Wale-Oshinowo, Prof. Emerole Gideon Ahamefula)
 * - ENT 304: 3 Modules, 14 Units (Dr. Mrs Victoria Akpa, Oluwatoyin Olaniyan, Prof. Onyemaechi Onwe)
 * - ENT 302: 4 Modules, 17 Units (Dr. Abdullahi S. Araga, Dr. Timothy O. Ishola)
 * - FMS 304: 3 Modules, 15 Units (Dr. Mrs P.E. Osuji, Prof. O.J. Onwe, Dr. Timothy Oladele Ishola)
 */
export function repairAndCompleteCourseUnits(course: Course): Course {
  const isEnt308 =
    /ENT[-_\s]?308/i.test(course.code) ||
    /Family[-_\s]?Business/i.test(course.title) ||
    /ENT[-_\s]?308/i.test(course.title) ||
    course.id.includes('ent308') ||
    (course.documents && course.documents.some((d) => /ENT[-_\s]?308|Family[-_\s]?Business|Succession/i.test(d.name)));

  const isEnt304 =
    /ENT[-_\s]?304/i.test(course.code) ||
    /Corporate[-_\s]?Governance|Leadership[-_\s]?and[-_\s]?Corporate/i.test(course.title) ||
    /ENT[-_\s]?304/i.test(course.title) ||
    course.id.includes('ent304') ||
    (course.documents && course.documents.some((d) => /ENT[-_\s]?304|Corporate[-_\s]?Governance|Leadership/i.test(d.name)));

  const isEnt302 =
    /ENT[-_\s]?302/i.test(course.code) ||
    /Feasibility/i.test(course.title) ||
    /ENT[-_\s]?302/i.test(course.title) ||
    course.id.includes('ent302') ||
    (course.documents && course.documents.some((d) => /ENT[-_\s]?302|Feasibility/i.test(d.name)));

  const isFms =
    /FMS[-_\s]?304|SMS[-_\s]?304/i.test(course.code) ||
    /Research[-_\s]?Methodology/i.test(course.title) ||
    /FMS[-_\s]?304|SMS[-_\s]?304/i.test(course.title) ||
    course.id.includes('fms304') ||
    (course.documents && course.documents.some((d) => /FMS[-_\s]?304|SMS[-_\s]?304|Research[-_\s]?Methodology/i.test(d.name)));

  if (isEnt308) {
    const existingUnitCount = course.modules.reduce((sum, m) => sum + m.units.length, 0);
    const mod10 = course.modules[9];
    const mod10Unit2Title = mod10?.units?.[1]?.title;
    const pastQuestionDocuments = (course.pastQuestionDocuments && course.pastQuestionDocuments.length >= 2)
      ? course.pastQuestionDocuments
      : ENT308_UPLOADED_PQ_DOCUMENTS;
    // ENT 308 must have exactly 23 verified units across 10 modules
    if (existingUnitCount !== 23 || course.modules.length !== 10 || !mod10Unit2Title?.includes('Women, Work-Life Balance')) {
      return {
        ...course,
        code: 'ENT 308',
        title: 'Family Business and Succession Planning',
        department: course.department || ENT308_AUTHENTIC_COURSE.department,
        description: ENT308_AUTHENTIC_COURSE.description,
        documents: course.documents && course.documents.length > 0 ? course.documents : ENT308_AUTHENTIC_COURSE.documents,
        pastQuestionDocuments,
        modules: ENT308_MODULES,
      };
    }
    return {
      ...course,
      pastQuestionDocuments,
    };
  }

  if (isEnt304) {
    const existingUnitCount = course.modules.reduce((sum, m) => sum + m.units.length, 0);
    const mod3Unit12Title = course.modules[2]?.units?.[3]?.title;
    const pastQuestionDocuments = (course.pastQuestionDocuments && course.pastQuestionDocuments.length >= 2)
      ? course.pastQuestionDocuments
      : ENT304_UPLOADED_PQ_DOCUMENTS;
    // ENT 304 must have exactly 14 verified units across 3 modules
    if (existingUnitCount !== 14 || course.modules.length !== 3 || !mod3Unit12Title?.includes('OECD')) {
      return {
        ...course,
        code: 'ENT 304',
        title: 'Leadership and Corporate Governance',
        department: course.department || ENT304_AUTHENTIC_COURSE.department,
        description: ENT304_AUTHENTIC_COURSE.description,
        documents: course.documents && course.documents.length > 0 ? course.documents : ENT304_AUTHENTIC_COURSE.documents,
        pastQuestionDocuments,
        modules: ENT304_MODULES,
      };
    }
    return {
      ...course,
      pastQuestionDocuments,
    };
  }

  if (isEnt302) {
    const existingUnitCount = course.modules.reduce((sum, m) => sum + m.units.length, 0);
    const mod4Unit15Title = course.modules[3]?.units?.[0]?.title;
    const mod4Unit15Topic = course.modules[3]?.units?.[0]?.topics?.[0]?.title;
    const pastQuestionDocuments = (course.pastQuestionDocuments && course.pastQuestionDocuments.length >= 2)
      ? course.pastQuestionDocuments
      : ENT302_UPLOADED_PQ_DOCUMENTS;
    if (
      existingUnitCount !== 17 ||
      course.modules.length !== 4 ||
      !mod4Unit15Title?.includes('Traditional Investment') ||
      !mod4Unit15Topic?.includes('Payback Period')
    ) {
      return {
        ...course,
        code: 'ENT 302',
        title: 'Feasibility and Business Planning',
        department: course.department || ENT302_AUTHENTIC_COURSE.department,
        description: ENT302_AUTHENTIC_COURSE.description,
        documents: course.documents && course.documents.length > 0 ? course.documents : ENT302_AUTHENTIC_COURSE.documents,
        pastQuestionDocuments,
        modules: ENT302_AUTHENTIC_COURSE.modules,
      };
    }
    return {
      ...course,
      pastQuestionDocuments,
    };
  }

  if (isFms) {
    const existingUnitCount = course.modules.reduce((sum, m) => sum + m.units.length, 0);
    const mod3Unit12Title = course.modules[2]?.units?.[1]?.title;
    const mod3Unit12Topic = course.modules[2]?.units?.[1]?.topics?.[0]?.title;
    const pastQuestionDocuments = (course.pastQuestionDocuments && course.pastQuestionDocuments.length >= 2)
      ? course.pastQuestionDocuments
      : FMS304_UPLOADED_PQ_DOCUMENTS;
    // FMS 304 must have exactly 15 verified units across 3 modules, and Unit 12 must be Population and Sampling with Taro Yamane
    if (
      existingUnitCount !== 15 ||
      course.modules.length !== 3 ||
      !mod3Unit12Title?.includes('Population and Sampling') ||
      !mod3Unit12Topic?.includes('Taro Yamane')
    ) {
      return {
        ...course,
        code: 'FMS 304',
        title: 'Research Methodology',
        department: course.department || FMS304_SAMPLE_COURSE.department,
        description: FMS304_SAMPLE_COURSE.description,
        documents: course.documents && course.documents.length > 0 ? course.documents : FMS304_SAMPLE_COURSE.documents,
        pastQuestionDocuments,
        modules: FMS304_SAMPLE_COURSE.modules,
      };
    }
    return {
      ...course,
      pastQuestionDocuments,
    };
  }

  return course;
}

/**
 * Returns courses; restores from any previous storage version, repairs truncated units,
 * consolidates duplicate course entries/documents while protecting student progress,
 * and ensures authentic courses are available if the store was empty.
 */
export function getStoredCourses(): Course[] {
  try {
    let loadedCourses: Course[] = [];

    // Attempt retrieval from current and all legacy keys
    for (const key of LEGACY_COURSE_KEYS) {
      const raw = localStorage.getItem(key);
      if (raw) {
        try {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed) && parsed.length > 0) {
            loadedCourses = parsed;
            break;
          }
        } catch {
          // Continue searching other keys
        }
      }
    }

    // If courses were found in localStorage, repair any missing units and preserve user courses
    if (loadedCourses.length > 0) {
      const repaired = loadedCourses.map(repairAndCompleteCourseUnits);

      // Verify whether ENT 308, ENT 304, ENT 302, and FMS 304 are present; if any authentic material was missing,
      // include it so the student's study materials are fully restored
      const hasEnt308 = repaired.some(
        (c) => /ENT[-_\s]?308/i.test(c.code) || /Family[-_\s]?Business/i.test(c.title) || c.id.includes('ent308')
      );
      const hasEnt304 = repaired.some(
        (c) => /ENT[-_\s]?304/i.test(c.code) || /Corporate[-_\s]?Governance/i.test(c.title) || c.id.includes('ent304')
      );
      const hasEnt302 = repaired.some(
        (c) => /ENT[-_\s]?302/i.test(c.code) || /Feasibility/i.test(c.title) || c.id.includes('ent302')
      );
      const hasFms = repaired.some(
        (c) => /FMS[-_\s]?304|SMS[-_\s]?304/i.test(c.code) || /Research[-_\s]?Methodology/i.test(c.title) || c.id.includes('fms304')
      );

      let workingCourses = [...repaired];
      if (!hasEnt308) {
        workingCourses = [ENT308_AUTHENTIC_COURSE, ...workingCourses];
      }
      if (!hasEnt304) {
        workingCourses = [...workingCourses, ENT304_AUTHENTIC_COURSE];
      }
      if (!hasEnt302) {
        workingCourses = [...workingCourses, ENT302_AUTHENTIC_COURSE];
      }
      if (!hasFms) {
        workingCourses = [...workingCourses, FMS304_SAMPLE_COURSE];
      }

      // Ensure all courses in workingCourses always have their authoritative pastQuestionDocuments attached
      workingCourses = workingCourses.map((c) => {
        if (/ENT[-_\s]?308/i.test(c.code) || /Family[-_\s]?Business/i.test(c.title) || c.id.includes('ent308')) {
          if (!c.pastQuestionDocuments || c.pastQuestionDocuments.length < 2) {
            return {
              ...c,
              pastQuestionDocuments: ENT308_UPLOADED_PQ_DOCUMENTS,
            };
          }
        }
        if (/ENT[-_\s]?304/i.test(c.code) || /Corporate[-_\s]?Governance|Leadership/i.test(c.title) || c.id.includes('ent304')) {
          if (!c.pastQuestionDocuments || c.pastQuestionDocuments.length < 2) {
            return {
              ...c,
              pastQuestionDocuments: ENT304_UPLOADED_PQ_DOCUMENTS,
            };
          }
        }
        if (/ENT[-_\s]?302/i.test(c.code) || /Feasibility/i.test(c.title) || c.id.includes('ent302')) {
          if (!c.pastQuestionDocuments || c.pastQuestionDocuments.length < 2) {
            return {
              ...c,
              pastQuestionDocuments: ENT302_UPLOADED_PQ_DOCUMENTS,
            };
          }
        }
        if (/FMS[-_\s]?304|SMS[-_\s]?304/i.test(c.code) || /Research[-_\s]?Methodology/i.test(c.title) || c.id.includes('fms304')) {
          if (!c.pastQuestionDocuments || c.pastQuestionDocuments.length < 2) {
            return {
              ...c,
              pastQuestionDocuments: FMS304_UPLOADED_PQ_DOCUMENTS,
            };
          }
        }
        return c;
      });

      // Execute library deduplication and consolidation while protecting student data
      const currentProgress = getStoredProgress();
      const currentBookmarks = getStoredBookmarks();
      const currentNotes = getStoredNotes();

      const consolidationRes = consolidateCourseLibrary(
        workingCourses,
        currentProgress,
        currentBookmarks,
        currentNotes
      );

      if (consolidationRes.totalDuplicatesRemoved > 0) {
        // Save migrated data
        saveStoredProgress(consolidationRes.progress);
        saveStoredBookmarks(consolidationRes.bookmarks);
        saveStoredNotes(consolidationRes.notes);
        saveStoredConsolidationReport(consolidationRes.report);
      }

      saveStoredCourses(consolidationRes.courses);
      return consolidationRes.courses;
    }

    // Default recovery state if completely empty: provide authentic textbooks
    // with complete sequence of units
    const initialCourses = [
      ENT308_AUTHENTIC_COURSE,
      ENT304_AUTHENTIC_COURSE,
      ENT302_AUTHENTIC_COURSE,
      FMS304_SAMPLE_COURSE
    ];
    saveStoredCourses(initialCourses);
    return initialCourses;
  } catch (e) {
    console.error('Failed to load courses from localStorage:', e);
    return [ENT308_AUTHENTIC_COURSE, ENT304_AUTHENTIC_COURSE, ENT302_AUTHENTIC_COURSE, FMS304_SAMPLE_COURSE];
  }
}

export function saveStoredCourses(courses: Course[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(courses));
  } catch (e) {
    console.error('Failed to save courses to localStorage:', e);
  }
}

export function getStoredPastQuestions(): PastExamQuestionItem[] {
  try {
    for (const key of LEGACY_PQ_KEYS) {
      const raw = localStorage.getItem(key);
      if (raw) {
        try {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed) && parsed.length > 0) {
            const ent308Questions = parsed.filter(
              (q: PastExamQuestionItem) =>
                /ENT[-_\s]?308/i.test(q.courseCode || '') ||
                (q.courseId && /ent[-_]?308/i.test(q.courseId))
            );
            const ent304Questions = parsed.filter(
              (q: PastExamQuestionItem) =>
                /ENT[-_\s]?304/i.test(q.courseCode || '') ||
                (q.courseId && /ent[-_]?304/i.test(q.courseId))
            );
            const ent302Questions = parsed.filter(
              (q: PastExamQuestionItem) =>
                /ENT[-_\s]?302/i.test(q.courseCode || '') ||
                (q.courseId && /ent[-_]?302/i.test(q.courseId))
            );
            const fmsQuestions = parsed.filter(
              (q: PastExamQuestionItem) =>
                /FMS[-_\s]?304|SMS[-_\s]?304/i.test(q.courseCode || '') ||
                (q.courseId && /fms[-_]?304/i.test(q.courseId))
            );
            let finalPQ = [...parsed];

            // Ensure all 97+ verified authentic ENT 308 past examination questions from the user's uploaded archives are present
            if (ent308Questions.length < 90) {
              const existingIds = new Set(finalPQ.map((q) => q.id));
              const missingEnt308 = AUTHENTIC_ENT308_EXTRACTED_PAST_QUESTIONS.filter((q) => !existingIds.has(q.id));
              finalPQ = [...missingEnt308, ...finalPQ];
            }
            // Ensure all 39 verified authentic ENT 304 past examination questions from uploaded archives are present
            if (ent304Questions.length < 35) {
              const existingIds = new Set(finalPQ.map((q) => q.id));
              const missingEnt304 = AUTHENTIC_ENT304_EXTRACTED_PAST_QUESTIONS.filter((q) => !existingIds.has(q.id));
              finalPQ = [...finalPQ, ...missingEnt304];
            }
            // Ensure all 58 verified authentic ENT 302 past questions from uploaded archives are present
            if (ent302Questions.length < 50) {
              const existingIds = new Set(finalPQ.map((q) => q.id));
              const missingEnt302 = AUTHENTIC_ENT302_EXTRACTED_PAST_QUESTIONS.filter((q) => !existingIds.has(q.id));
              finalPQ = [...finalPQ, ...missingEnt302];
            }
            // Ensure all 42 verified authentic FMS 304 past questions from uploaded archives are present
            if (fmsQuestions.length < 40) {
              const existingIds = new Set(finalPQ.map((q) => q.id));
              const missingFms = AUTHENTIC_FMS304_EXTRACTED_PAST_QUESTIONS.filter((q) => !existingIds.has(q.id));
              finalPQ = [...finalPQ, ...missingFms];
            }
            saveStoredPastQuestions(finalPQ);
            return finalPQ;
          }
        } catch {
          // Continue
        }
      }
    }

    // Default past questions from verified archives
    const defaultPQ = [
      ...AUTHENTIC_ENT308_EXTRACTED_PAST_QUESTIONS,
      ...AUTHENTIC_ENT302_EXTRACTED_PAST_QUESTIONS,
      ...AUTHENTIC_ENT304_EXTRACTED_PAST_QUESTIONS,
      ...AUTHENTIC_FMS304_EXTRACTED_PAST_QUESTIONS,
    ];
    saveStoredPastQuestions(defaultPQ);
    return defaultPQ;
  } catch (e) {
    console.error('Failed to load past questions from localStorage:', e);
    return [
      ...AUTHENTIC_ENT308_EXTRACTED_PAST_QUESTIONS,
      ...AUTHENTIC_ENT302_EXTRACTED_PAST_QUESTIONS,
      ...AUTHENTIC_ENT304_EXTRACTED_PAST_QUESTIONS,
      ...AUTHENTIC_FMS304_EXTRACTED_PAST_QUESTIONS,
    ];
  }
}

/**
 * Filter and curate all past questions matching a specific unit from both uploaded documents
 */
/**
 * Authoritative check whether a question belongs to a course.
 * Performs rigorous matching using direct course ID, normalized course code (e.g. ENT 308, ENT 304, ENT 302, FMS 304),
 * and verified course relationships. Strictly prevents cross-course question leaks.
 */
export function isQuestionForCourse(
  q: PastExamQuestionItem,
  courseOrId: Course | string,
  courses?: Course[]
): boolean {
  if (!q) return false;
  const courseList = courses && courses.length > 0 ? courses : (typeof window !== 'undefined' ? getStoredCourses() : []);
  const course = typeof courseOrId === 'string'
    ? (courseList.find((c) => c.id === courseOrId) || null)
    : courseOrId;
  const targetId = typeof courseOrId === 'string' ? courseOrId : courseOrId.id;

  // Direct exact courseId match
  if (q.courseId && (q.courseId === targetId || (course && q.courseId === course.id))) {
    return true;
  }

  // Normalized course code match (e.g. "ENT 308" === "ENT308", "ENT-308")
  const norm = (s?: string) => (s || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
  const qCode = norm(q.courseCode);
  const targetCode = course ? norm(course.code) : '';

  if (targetCode && qCode) {
    if (qCode === targetCode) return true;
    // Strictly prevent different course codes from matching (e.g. ENT302 vs ENT308 vs ENT304 vs FMS304)
    return false;
  }

  // Fallback: check if course ID contains normalized code
  const targetIdNorm = norm(targetId);
  const qIdNorm = norm(q.courseId);
  if (targetIdNorm && qIdNorm && targetIdNorm === qIdNorm) {
    return true;
  }

  // Fallback: match by known course prefix if target ID contains course code
  const knownPrefixes = ['ENT308', 'ENT304', 'ENT302', 'FMS304', 'CSC202'];
  for (const p of knownPrefixes) {
    if (targetIdNorm.includes(p) && (qCode === p || qIdNorm.includes(p))) {
      return true;
    }
  }

  // Fallback: check if course title is referenced
  if (course && course.title && q.courseTitle && norm(course.title) === norm(q.courseTitle)) {
    return true;
  }

  return false;
}

/**
 * Retrieves all past examination questions belonging strictly to the selected course.
 * Combines all questions across every uploaded document for that course.
 */
export function getPastQuestionsForCourse(
  pastQuestions: PastExamQuestionItem[],
  courseOrId: Course | string,
  courses?: Course[]
): PastExamQuestionItem[] {
  return pastQuestions.filter((q) => isQuestionForCourse(q, courseOrId, courses));
}

/**
 * Filter and curate all past questions matching a specific unit from both uploaded documents
 */
export function getPastQuestionsForUnit(
  pastQuestions: PastExamQuestionItem[],
  courseId: string,
  unitId: string,
  unitNumber?: number | string,
  unitTitle?: string,
  courses?: Course[]
): PastExamQuestionItem[] {
  const normTitle = (t?: string) => t?.toLowerCase().replace(/[^a-z0-9]/g, '') || '';
  const currentTitleNorm = normTitle(unitTitle);
  const currentUnitNum = typeof unitNumber === 'string' ? parseFloat(unitNumber) : unitNumber;

  // First isolate only questions that strictly belong to this course
  const courseQuestions = courseId
    ? pastQuestions.filter((q) => isQuestionForCourse(q, courseId, courses))
    : pastQuestions;

  return courseQuestions.filter((q) => {
    // Direct unit ID match
    if (q.linkedUnitId && q.linkedUnitId === unitId) return true;
    if (q.unitId && (q.unitId === unitId || q.unitId === `unit-${unitId}`)) return true;

    // mappedUnitIds array match
    if (q.mappedUnitIds && Array.isArray(q.mappedUnitIds) && q.mappedUnitIds.includes(unitId)) {
      return true;
    }

    // Unit number match
    if (currentUnitNum !== undefined && !isNaN(currentUnitNum) && q.linkedUnitNumber !== undefined && q.linkedUnitNumber === currentUnitNum) {
      return true;
    }

    // Normalized title match
    if (currentTitleNorm && q.linkedUnitTitle && normTitle(q.linkedUnitTitle).includes(currentTitleNorm)) {
      return true;
    }

    // Check if unitId has number like 'unit-ent-1' or 'ent308-u1' and q has linkedUnitNumber 1
    const matchUnitIdNum = unitId.match(/unit-[a-z0-9]+-(\d+)/i) || unitId.match(/[a-z0-9]+-u(\d+)/i);
    if (matchUnitIdNum) {
      const extractedNum = parseInt(matchUnitIdNum[matchUnitIdNum.length - 1], 10);
      if (q.linkedUnitNumber !== undefined && q.linkedUnitNumber === extractedNum) {
        return true;
      }
    }

    return false;
  });
}

export function saveStoredPastQuestions(questions: PastExamQuestionItem[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.PAST_QUESTIONS, JSON.stringify(questions));
  } catch (e) {
    console.error('Failed to save past questions to localStorage:', e);
  }
}

export function getStoredNotes(): PersonalNote[] {
  try {
    for (const key of LEGACY_NOTES_KEYS) {
      const raw = localStorage.getItem(key);
      if (raw) {
        try {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed) && parsed.length > 0) {
            saveStoredNotes(parsed);
            return parsed;
          }
        } catch {
          // Continue
        }
      }
    }
    return [];
  } catch (e) {
    console.error('Failed to load notes from localStorage:', e);
    return [];
  }
}

export function saveStoredNotes(notes: PersonalNote[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(notes));
  } catch (e) {
    console.error('Failed to save notes to localStorage:', e);
  }
}

export function getStoredBookmarks(): Bookmark[] {
  try {
    for (const key of LEGACY_BOOKMARKS_KEYS) {
      const raw = localStorage.getItem(key);
      if (raw) {
        try {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed) && parsed.length > 0) {
            saveStoredBookmarks(parsed);
            return parsed;
          }
        } catch {
          // Continue
        }
      }
    }
    return [];
  } catch (e) {
    console.error('Failed to load bookmarks from localStorage:', e);
    return [];
  }
}

export function saveStoredBookmarks(bookmarks: Bookmark[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(bookmarks));
  } catch (e) {
    console.error('Failed to save bookmarks to localStorage:', e);
  }
}

export function getStoredProgress(): UserProgress {
  try {
    for (const key of LEGACY_PROGRESS_KEYS) {
      const raw = localStorage.getItem(key);
      if (raw) {
        try {
          const parsed = JSON.parse(raw);
          if (parsed && typeof parsed === 'object') {
            const result: UserProgress = {
              completedTopicIds: parsed.completedTopicIds || [],
              unitStatuses: parsed.unitStatuses || {},
              readingMinutesByCourse: parsed.readingMinutesByCourse || {},
              totalMinutesStudied: parsed.totalMinutesStudied || 0,
              flaggedForRevisionTopicIds: parsed.flaggedForRevisionTopicIds || [],
              revisionCount: parsed.revisionCount || 0,
              quizScores: parsed.quizScores || {},
              writtenEvaluations: parsed.writtenEvaluations || {},
              mistakesBank: parsed.mistakesBank || [],
              pastQuestionPracticeRecords: parsed.pastQuestionPracticeRecords || {},
              lastActiveCourseId: parsed.lastActiveCourseId,
              lastActiveUnitId: parsed.lastActiveUnitId,
              lastActiveTopicId: parsed.lastActiveTopicId,
              readQuestionIds: parsed.readQuestionIds || [],
              bookmarkedQuestionIds: parsed.bookmarkedQuestionIds || [],
              lastOpenedQuestionId: parsed.lastOpenedQuestionId,
              recentQuestionHistory: parsed.recentQuestionHistory || [],
              lastReadingPositionRatio: parsed.lastReadingPositionRatio,
              unitReadingPositions: parsed.unitReadingPositions || {},
              lastActiveStudySession: parsed.lastActiveStudySession,
              lastSyncedAt: parsed.lastSyncedAt,
              lastSyncedDevice: parsed.lastSyncedDevice,
            };
            saveStoredProgress(result);
            return result;
          }
        } catch {
          // Continue
        }
      }
    }

    return {
      completedTopicIds: [],
      unitStatuses: {},
      readingMinutesByCourse: {},
      totalMinutesStudied: 0,
      flaggedForRevisionTopicIds: [],
      revisionCount: 0,
      quizScores: {},
      writtenEvaluations: {},
      mistakesBank: [],
      readQuestionIds: [],
      bookmarkedQuestionIds: [],
      recentQuestionHistory: [],
    };
  } catch (e) {
    return {
      completedTopicIds: [],
      unitStatuses: {},
      readingMinutesByCourse: {},
      totalMinutesStudied: 0,
      flaggedForRevisionTopicIds: [],
      revisionCount: 0,
      quizScores: {},
      writtenEvaluations: {},
      mistakesBank: [],
      readQuestionIds: [],
      bookmarkedQuestionIds: [],
      recentQuestionHistory: [],
    };
  }
}

export function saveStoredProgress(progress: UserProgress): void {
  try {
    localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(progress));
  } catch (e) {
    console.error('Failed to save progress to localStorage:', e);
  }
}

// Loads the authoritative ENT 302 course (17 units complete)
export function loadSampleENT302(): { courses: Course[]; pastQuestions: PastExamQuestionItem[] } {
  const currentCourses = getStoredCourses();
  const exists = currentCourses.some((c) => c.code === 'ENT 302');
  let updatedCourses = currentCourses;
  if (!exists) {
    updatedCourses = [ENT302_AUTHENTIC_COURSE, ...currentCourses];
  } else {
    updatedCourses = currentCourses.map((c) => (c.code === 'ENT 302' ? ENT302_AUTHENTIC_COURSE : c));
  }
  saveStoredCourses(updatedCourses);

  const currentPQ = getStoredPastQuestions();
  const existingIds = new Set(currentPQ.map((q) => q.id));
  const newPQ = [...currentPQ, ...AUTHENTIC_ENT302_PAST_QUESTIONS.filter((q) => !existingIds.has(q.id))];
  saveStoredPastQuestions(newPQ);

  return { courses: updatedCourses, pastQuestions: newPQ };
}

// Loads the authoritative FMS 304 course (15 units complete)
export function loadSampleFMS304(): { courses: Course[]; pastQuestions: PastExamQuestionItem[] } {
  const currentCourses = getStoredCourses();
  const exists = currentCourses.some((c) => c.code === 'FMS 304');
  let updatedCourses = currentCourses;
  if (!exists) {
    updatedCourses = [FMS304_SAMPLE_COURSE, ...currentCourses];
  } else {
    updatedCourses = currentCourses.map((c) => (c.code === 'FMS 304' ? FMS304_SAMPLE_COURSE : c));
  }
  saveStoredCourses(updatedCourses);

  const currentPQ = getStoredPastQuestions();
  const existingIds = new Set(currentPQ.map((q) => q.id));
  const newPQ = [...currentPQ, ...AUTHENTIC_FMS304_PAST_QUESTIONS.filter((q) => !existingIds.has(q.id))];
  saveStoredPastQuestions(newPQ);

  return { courses: updatedCourses, pastQuestions: newPQ };
}

// Loads the authoritative ENT 304 course (14 units complete)
export function loadSampleENT304(): { courses: Course[]; pastQuestions: PastExamQuestionItem[] } {
  const currentCourses = getStoredCourses();
  const exists = currentCourses.some((c) => c.code === 'ENT 304');
  let updatedCourses = currentCourses;
  if (!exists) {
    updatedCourses = [ENT304_AUTHENTIC_COURSE, ...currentCourses];
  } else {
    updatedCourses = currentCourses.map((c) => (c.code === 'ENT 304' ? ENT304_AUTHENTIC_COURSE : c));
  }
  saveStoredCourses(updatedCourses);

  const currentPQ = getStoredPastQuestions();
  const existingIds = new Set(currentPQ.map((q) => q.id));
  const newPQ = [...currentPQ, ...ENT304_PAST_QUESTIONS.filter((q) => !existingIds.has(q.id))];
  saveStoredPastQuestions(newPQ);

  return { courses: updatedCourses, pastQuestions: newPQ };
}

// Loads the authoritative ENT 308 course (Family Business and Succession Planning)
export function loadSampleENT308(): { courses: Course[]; pastQuestions: PastExamQuestionItem[] } {
  const currentCourses = getStoredCourses();
  const exists = currentCourses.some((c) => c.code === 'ENT 308');
  let updatedCourses = currentCourses;
  if (!exists) {
    updatedCourses = [ENT308_AUTHENTIC_COURSE, ...currentCourses];
  } else {
    updatedCourses = currentCourses.map((c) => (c.code === 'ENT 308' ? ENT308_AUTHENTIC_COURSE : c));
  }
  saveStoredCourses(updatedCourses);

  const currentPQ = getStoredPastQuestions();
  const existingIds = new Set(currentPQ.map((q) => q.id));
  const all308 = [
    ...AUTHENTIC_ENT308_EXTRACTED_PAST_QUESTIONS,
    ...ENT308_PAST_QUESTIONS
  ];
  const newPQ = [...all308.filter((q) => !existingIds.has(q.id)), ...currentPQ];
  saveStoredPastQuestions(newPQ);

  return { courses: updatedCourses, pastQuestions: newPQ };
}

export function getStoredConsolidationReport(): ConsolidationReportItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CONSOLIDATION_LOG);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Failed to load consolidation report:', e);
  }
  return [];
}

export function saveStoredConsolidationReport(report: ConsolidationReportItem[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.CONSOLIDATION_LOG, JSON.stringify(report));
  } catch (e) {
    console.error('Failed to save consolidation report:', e);
  }
}

/**
 * Explicit trigger for library deduplication and consolidation.
 */
export function triggerManualDeduplication(): ConsolidationReportItem[] {
  const currentCourses = getStoredCourses();
  const currentProgress = getStoredProgress();
  const currentBookmarks = getStoredBookmarks();
  const currentNotes = getStoredNotes();

  const res = consolidateCourseLibrary(
    currentCourses,
    currentProgress,
    currentBookmarks,
    currentNotes
  );

  saveStoredCourses(res.courses);
  saveStoredProgress(res.progress);
  saveStoredBookmarks(res.bookmarks);
  saveStoredNotes(res.notes);
  saveStoredConsolidationReport(res.report);

  return res.report;
}

// Loads the clean second course CSC 202 to test multi-course separation
export function loadSampleCSC202(): { courses: Course[] } {
  const currentCourses = getStoredCourses();
  const exists = currentCourses.some((c) => c.code === 'CSC 202');
  let updatedCourses = currentCourses;
  if (!exists) {
    updatedCourses = [...currentCourses, CSC202_SECOND_COURSE];
    saveStoredCourses(updatedCourses);
  }
  return { courses: updatedCourses };
}

export function clearLibraryData(): void {
  for (const k of [
    ...LEGACY_COURSE_KEYS,
    ...LEGACY_PQ_KEYS,
    ...LEGACY_NOTES_KEYS,
    ...LEGACY_BOOKMARKS_KEYS,
    ...LEGACY_PROGRESS_KEYS,
  ]) {
    localStorage.removeItem(k);
  }
}
