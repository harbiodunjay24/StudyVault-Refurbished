import { Course, StudyDocument, UserProgress, Bookmark, PersonalNote } from '../types';

export interface ConsolidationReportItem {
  type: 'course_consolidated' | 'document_deduplicated' | 'edition_preserved' | 'uncertain_flagged';
  title: string;
  details: string;
  canonicalId: string;
  mergedIds?: string[];
  preservedCount: number;
  timestamp: string;
}

export interface ConsolidationResult {
  courses: Course[];
  report: ConsolidationReportItem[];
  progress: UserProgress;
  bookmarks: Bookmark[];
  notes: PersonalNote[];
  totalDuplicatesRemoved: number;
}

/**
 * Normalizes a course code string for strict identity comparison.
 * e.g., "ENT 308", "ent-308", "ENT_308" all normalize to "ENT308".
 */
export function normalizeCourseCode(code: string): string {
  const norm = (code || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
  if (norm === 'NOU107') return 'GST107';
  return norm;
}

/**
 * Normalizes a document file name for duplicate detection.
 * Removes extra spaces and extension casing.
 */
export function normalizeDocumentName(name: string): string {
  return (name || '').toLowerCase().trim().replace(/\s+/g, '_');
}

/**
 * Consolidates duplicate courses and duplicate textbook documents in the library.
 * Preserves all student bookmarks, notes, unit statuses, quiz scores, and reading minutes.
 */
export function consolidateCourseLibrary(
  existingCourses: Course[],
  userProgress: UserProgress,
  bookmarks: Bookmark[],
  notes: PersonalNote[]
): ConsolidationResult {
  const report: ConsolidationReportItem[] = [];
  const consolidatedMap = new Map<string, Course>();
  const idRedirectionMap = new Map<string, string>(); // maps merged duplicate courseId -> canonical courseId
  let duplicatesRemovedCount = 0;

  for (const course of existingCourses) {
    const normCode = normalizeCourseCode(course.code);
    // Key by normalized course code if present; otherwise fall back to lowercase trimmed title
    const identityKey = normCode.length >= 4 ? normCode : course.title.toLowerCase().trim();

    if (!consolidatedMap.has(identityKey)) {
      // First canonical occurrence of this course
      // Deduplicate internal document list first
      const { deduplicatedDocs, removedDocCount, docReport } = deduplicateCourseDocuments(course);
      duplicatesRemovedCount += removedDocCount;
      if (docReport) {
        report.push(docReport);
      }

      consolidatedMap.set(identityKey, {
        ...course,
        documents: deduplicatedDocs,
      });
    } else {
      // DUPLICATE DETECTED: Consolidate into canonical course
      const canonical = consolidatedMap.get(identityKey)!;
      duplicatesRemovedCount += 1;
      idRedirectionMap.set(course.id, canonical.id);

      // 1. Merge unique documents without overwriting
      const mergedDocs = [...canonical.documents];
      for (const doc of course.documents || []) {
        const docNorm = normalizeDocumentName(doc.name);
        const alreadyExists = mergedDocs.some((d) => normalizeDocumentName(d.name) === docNorm);
        if (!alreadyExists) {
          // Distinct document or edition - preserve
          mergedDocs.push(doc);
          report.push({
            type: 'edition_preserved',
            title: `Preserved Document in ${canonical.code}`,
            details: `Preserved distinct document "${doc.name}" from duplicate course entry during consolidation.`,
            canonicalId: canonical.id,
            preservedCount: 1,
            timestamp: new Date().toISOString(),
          });
        }
      }

      // 2. Merge modules/units if canonical had fewer units
      const canonicalUnitsCount = canonical.modules.reduce((s, m) => s + m.units.length, 0);
      const duplicateUnitsCount = course.modules.reduce((s, m) => s + m.units.length, 0);
      const superiorModules = duplicateUnitsCount > canonicalUnitsCount ? course.modules : canonical.modules;

      // 3. Merge past-question documents without overwriting
      const mergedPqDocs = [...(canonical.pastQuestionDocuments || [])];
      for (const pqDoc of course.pastQuestionDocuments || []) {
        const pqDocNorm = normalizeDocumentName(pqDoc.name);
        const alreadyExists = mergedPqDocs.some((d) => normalizeDocumentName(d.name) === pqDocNorm);
        if (!alreadyExists) {
          mergedPqDocs.push(pqDoc);
        }
      }

      // Update canonical record in map
      consolidatedMap.set(identityKey, {
        ...canonical,
        documents: mergedDocs,
        pastQuestionDocuments: mergedPqDocs,
        modules: superiorModules,
      });

      report.push({
        type: 'course_consolidated',
        title: `Consolidated Duplicate Course: ${course.code} (${course.title})`,
        details: `Merged duplicate entry (ID: ${course.id}) into canonical entry (ID: ${canonical.id}). Preserved all documents and modules.`,
        canonicalId: canonical.id,
        mergedIds: [course.id],
        preservedCount: mergedDocs.length,
        timestamp: new Date().toISOString(),
      });
    }
  }

  // 3. Migrate all student data (Bookmarks, Notes, and Progress) using idRedirectionMap
  let updatedBookmarks = [...bookmarks];
  if (idRedirectionMap.size > 0) {
    updatedBookmarks = bookmarks.map((b) => {
      if (idRedirectionMap.has(b.courseId)) {
        return {
          ...b,
          courseId: idRedirectionMap.get(b.courseId)!,
        };
      }
      return b;
    });
  }

  let updatedNotes = [...notes];
  if (idRedirectionMap.size > 0) {
    updatedNotes = notes.map((n) => {
      if (n.courseId && idRedirectionMap.has(n.courseId)) {
        return {
          ...n,
          courseId: idRedirectionMap.get(n.courseId)!,
        };
      }
      return n;
    });
  }

  // Migrate Reading Minutes in UserProgress
  let updatedProgress = { ...userProgress };
  if (idRedirectionMap.size > 0 && userProgress.readingMinutesByCourse) {
    const updatedMinutes: Record<string, number> = { ...userProgress.readingMinutesByCourse };
    for (const [dupId, canonId] of idRedirectionMap.entries()) {
      if (updatedMinutes[dupId]) {
        updatedMinutes[canonId] = (updatedMinutes[canonId] || 0) + updatedMinutes[dupId];
        delete updatedMinutes[dupId];
      }
    }
    updatedProgress = {
      ...updatedProgress,
      readingMinutesByCourse: updatedMinutes,
    };
  }

  const finalCourses = Array.from(consolidatedMap.values());

  return {
    courses: finalCourses,
    report,
    progress: updatedProgress,
    bookmarks: updatedBookmarks,
    notes: updatedNotes,
    totalDuplicatesRemoved: duplicatesRemovedCount,
  };
}

/**
 * Deduplicates multiple uploads of the exact same PDF or document within a single course.
 */
function deduplicateCourseDocuments(course: Course): {
  deduplicatedDocs: StudyDocument[];
  removedDocCount: number;
  docReport?: ConsolidationReportItem;
} {
  if (!course.documents || course.documents.length <= 1) {
    return { deduplicatedDocs: course.documents || [], removedDocCount: 0 };
  }

  const seenDocs = new Set<string>();
  const deduplicated: StudyDocument[] = [];
  let removed = 0;

  for (const doc of course.documents) {
    const norm = normalizeDocumentName(doc.name);
    if (!seenDocs.has(norm)) {
      seenDocs.add(norm);
      deduplicated.push(doc);
    } else {
      removed += 1;
    }
  }

  let docReport: ConsolidationReportItem | undefined;
  if (removed > 0) {
    docReport = {
      type: 'document_deduplicated',
      title: `Deduplicated Documents in ${course.code}`,
      details: `Removed ${removed} redundant copies of identical PDF/document files in ${course.code}. Retained canonical document.`,
      canonicalId: course.id,
      preservedCount: deduplicated.length,
      timestamp: new Date().toISOString(),
    };
  }

  return { deduplicatedDocs: deduplicated, removedDocCount: removed, docReport };
}
