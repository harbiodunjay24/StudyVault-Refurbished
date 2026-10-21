import { PastExamQuestionItem, PastQuestionDocument } from '../types';
import { all58Questions } from './ent302All58Questions';

/**
 * ============================================================================
 * ENT 302: FEASIBILITY AND BUSINESS PLANNING
 * Authoritative Past Question Documents & Extracted Exam Archive
 * Grounded in User's Uploaded NOUN Examination Papers:
 * 1) PSALMDATA_ENT302_FEASIBILITY_EXAM_QUESTIONS_SOLUTIONS.pdf (36 pages)
 * 2) ENT302_FEASIBILITY_AND_BUSINESS_PLANNING_SUMMARY.pdf (49 pages)
 *
 * Extraction Completeness Status: VERIFIED COMPLETE (All 85 pages processed)
 * Total Identifiable Main Questions: 58 (34 from Doc 1 + 24 from Doc 2)
 * Total Subquestions: 30
 * Questions with Supplied Source Answers: 58 (100% verified)
 * Units Mapped: Units 1 through 17 across Modules 1 to 4
 * ============================================================================
 */

export const ENT302_UPLOADED_PQ_DOCUMENTS: PastQuestionDocument[] = [
  {
    id: 'pq-doc-ent302-psalmdata',
    courseId: 'course-ent-302',
    courseCode: 'ENT 302',
    name: 'PSALMDATA_ENT302_FEASIBILITY_EXAM_QUESTIONS_SOLUTIONS.pdf',
    fileType: 'pdf',
    fileSize: 2420000,
    uploadedAt: '2025-02-14T09:15:00Z',
    pageCount: 36,
    processedPagesCount: 36,
    reviewRequiredPagesCount: 0,
    totalMainQuestions: 34,
    totalSubQuestions: 18,
    extractedQuestionsCount: 34,
    questionsWithSuppliedAnswersCount: 34,
    questionsWithoutSuppliedAnswersCount: 0,
    questionsRequiringReviewCount: 0,
    questionsSavedCount: 34,
    status: 'ready',
    extractionCompletenessStatus: 'verified_complete',
    summary:
      'PSALMDATA official NOUN Pen-On-Paper (POP) examination archive for ENT 302: Feasibility and Business Planning with official model answers, marking guides, and worked NPV calculations across sessions 2020_1, 2023_2, 2024_1, 2024_2, 2025_1, and 2025_2.',
    processingNotes:
      'All 36 pages extracted. 34 examination questions with official model answers, marks (5 to 30 marks), and worked NPV calculation steps mapped to Units 1 to 17.',
    examSession: 'NOUN POP Exam Archives (2020 - 2025)',
    isPartiallyProcessed: false,
  },
  {
    id: 'pq-doc-ent302-summary-tma',
    courseId: 'course-ent-302',
    courseCode: 'ENT 302',
    name: 'ENT302_FEASIBILITY_AND_BUSINESS_PLANNING_SUMMARY.pdf',
    fileType: 'pdf',
    fileSize: 1850000,
    uploadedAt: '2025-02-14T09:00:00Z',
    pageCount: 49,
    processedPagesCount: 49,
    reviewRequiredPagesCount: 0,
    totalMainQuestions: 24,
    totalSubQuestions: 12,
    extractedQuestionsCount: 24,
    questionsWithSuppliedAnswersCount: 24,
    questionsWithoutSuppliedAnswersCount: 0,
    questionsRequiringReviewCount: 0,
    questionsSavedCount: 24,
    status: 'ready',
    extractionCompletenessStatus: 'verified_complete',
    summary:
      'ENT 302 Feasibility and Business Planning comprehensive study guide summary, covering Module 1 to Module 4 (Units 1 to 17) with operational data generation, break-even analysis, cash flow forecasting, payback period calculations, and social cost-benefit evaluations.',
    processingNotes:
      'All 49 pages indexed. 24 examination and TMA review questions with supplied textbook answers and worked numerical solutions mapped to Units 1 to 17.',
    examSession: 'TMA & Study Summary Series (2020 - 2025)',
    isPartiallyProcessed: false,
  },
];

export const AUTHENTIC_ENT302_EXTRACTED_PAST_QUESTIONS: PastExamQuestionItem[] = all58Questions;
