import { PastExamQuestionItem, PastQuestionDocument } from '../types';
import rawQuestions from './gst107Questions.json';

export const GST107_UPLOADED_PQ_DOCUMENTS: PastQuestionDocument[] = [
  {
    id: 'pq-doc-gst107-psalmdata-summary',
    courseId: 'course-gst107',
    courseCode: 'GST 107',
    name: 'NOUN-NOU107_STUDY_GUIDE_FOR_THE_DISTANCE_LEARNER_SUMMARY_1826c371.pdf',
    fileType: 'pdf',
    fileSize: 1250000,
    uploadedAt: '2026-10-24T08:30:00Z',
    pageCount: 84,
    processedPagesCount: 84,
    reviewRequiredPagesCount: 0,
    totalMainQuestions: 1039,
    totalSubQuestions: 0,
    extractedQuestionsCount: 1039,
    questionsWithSuppliedAnswersCount: 1039,
    questionsWithoutSuppliedAnswersCount: 0,
    questionsRequiringReviewCount: 0,
    questionsSavedCount: 1039,
    status: 'ready',
    extractionCompletenessStatus: 'verified_complete',
    summary:
      'Authentic NOUN Study Guide for the Distance Learner (GST 107 / NOU 107) comprehensive examination question bank, review items, and verified solutions across all 16 study units by Psalmdata Telecom and Computer Café.',
    examSession: 'NOUN National Open University of Nigeria Academic Examination Archives'
  }
];

export const AUTHENTIC_GST107_EXTRACTED_PAST_QUESTIONS: PastExamQuestionItem[] = (rawQuestions as any[]).map(
  (q, idx) => ({
    ...q,
    id: q.id || 'pq_gst107_' + String(idx + 1).padStart(4, '0'),
    courseId: 'course-gst107',
    courseCode: 'GST 107',
    courseTitle: 'A Study Guide for the Distance Learner',
    documentId: 'pq-doc-gst107-psalmdata-summary',
    documentName: 'NOUN-NOU107_STUDY_GUIDE_FOR_THE_DISTANCE_LEARNER_SUMMARY_1826c371.pdf',
    sourceType: 'uploaded_document',
    sourceFileName: 'NOUN-NOU107_STUDY_GUIDE_FOR_THE_DISTANCE_LEARNER_SUMMARY_1826c371.pdf',
    isPastQuestion: true,
    verifiedAuthentic: true,
    answerStatus: 'supplied_by_source' as const,
    unitMappingStatus: 'explicit_in_source' as const,
  })
);
