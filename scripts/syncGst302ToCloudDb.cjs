const fs = require('fs');

const dbPath = 'server-data/cloud_db.json';
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

const newPqs = JSON.parse(fs.readFileSync('src/services/gst302NewQuestions.json', 'utf8'));

// Update for each user profile
for (const userId of Object.keys(db.progress)) {
  const prof = db.progress[userId];
  if (!prof) continue;

  // 1. Update GST 302 course documents & pastQuestionDocuments
  if (prof.customCourses) {
    const gst302 = prof.customCourses.find(c => /GST[-_\s]?302/i.test(c.code));
    if (gst302) {
      gst302.documents = [
        {
          id: 'doc-gst302-textbook',
          name: 'GST302_BUSINESS_CREATION_AND_GROWTH_99335b4e.pdf',
          fileType: 'pdf',
          fileSize: 1750000,
          uploadedAt: '2026-10-23T08:15:00Z',
          extractedHeadingsCount: 25,
          pageCount: 132,
          status: 'ready',
          processingStatus: 'fully_processed',
          summary: 'Official NOUN primary course textbook for GST 302: Business Creation and Growth by Prof. May Ifeoma Nwoye Ph.D.'
        },
        {
          id: 'doc-gst302-winsmart-summary',
          name: 'GST302_BUSINESS_CREATION_AND_GROWTH_SUMMARY_WINSMART_ACADEMY.pdf',
          fileType: 'pdf',
          fileSize: 980000,
          uploadedAt: '2026-10-24T09:15:00Z',
          extractedHeadingsCount: 25,
          pageCount: 50,
          status: 'ready',
          processingStatus: 'fully_processed',
          summary: 'Winsmart Academy comprehensive GST 302 summary and exam review series across all 7 modules and 25 units.'
        },
        {
          id: 'doc-gst302-eexam-paper',
          name: 'GST302_E-EXAM_PAST_QUESTIONS_PAPER.pdf',
          fileType: 'pdf',
          fileSize: 180000,
          uploadedAt: '2026-10-24T09:15:00Z',
          extractedHeadingsCount: 7,
          pageCount: 5,
          status: 'ready',
          processingStatus: 'fully_processed',
          summary: 'Authentic NOUN GST 302 e-Exam paper questions with answer keys.'
        }
      ];

      gst302.pastQuestionDocuments = [
        {
          id: 'pq-doc-gst302-exam-archives',
          courseId: 'course-gst302',
          courseCode: 'GST 302',
          name: 'GST302_BUSINESS_CREATION_AND_GROWTH_EXAM_ARCHIVES.pdf',
          fileType: 'pdf',
          fileSize: 1750000,
          uploadedAt: '2026-10-23T08:15:00Z',
          pageCount: 132,
          processedPagesCount: 132,
          reviewRequiredPagesCount: 0,
          totalMainQuestions: 25,
          totalSubQuestions: 15,
          extractedQuestionsCount: 25,
          questionsWithSuppliedAnswersCount: 25,
          questionsWithoutSuppliedAnswersCount: 0,
          questionsRequiringReviewCount: 0,
          questionsSavedCount: 25,
          status: 'ready',
          extractionCompletenessStatus: 'verified_complete',
          summary: 'Official NOUN e-Exam and Tutor-Marked Assignment archive for GST 302: Business Creation and Growth with verified multiple-choice and structured solutions.',
          examSession: 'Official University E-Examination & Assessment Archives'
        },
        {
          id: 'pq-doc-gst302-winsmart-summary',
          courseId: 'course-gst302',
          courseCode: 'GST 302',
          name: 'GST302_BUSINESS_CREATION_AND_GROWTH_SUMMARY_WINSMART_ACADEMY.pdf',
          fileType: 'pdf',
          fileSize: 980000,
          uploadedAt: '2026-10-24T09:15:00Z',
          pageCount: 50,
          processedPagesCount: 50,
          reviewRequiredPagesCount: 0,
          totalMainQuestions: 231,
          totalSubQuestions: 0,
          extractedQuestionsCount: 231,
          questionsWithSuppliedAnswersCount: 231,
          questionsWithoutSuppliedAnswersCount: 0,
          questionsRequiringReviewCount: 0,
          questionsSavedCount: 231,
          status: 'ready',
          extractionCompletenessStatus: 'verified_complete',
          summary: 'Winsmart Academy comprehensive GST 302 exam summary and authentic question bank with 231 verified model answers and rubrics across all 7 modules.',
          examSession: 'Official University E-Examination & POP Exam Revision Bank'
        },
        {
          id: 'pq-doc-gst302-eexam-paper',
          courseId: 'course-gst302',
          courseCode: 'GST 302',
          name: 'GST302_E-EXAM_PAST_QUESTIONS_PAPER.pdf',
          fileType: 'pdf',
          fileSize: 180000,
          uploadedAt: '2026-10-24T09:15:00Z',
          pageCount: 5,
          processedPagesCount: 5,
          reviewRequiredPagesCount: 0,
          totalMainQuestions: 50,
          totalSubQuestions: 0,
          extractedQuestionsCount: 50,
          questionsWithSuppliedAnswersCount: 50,
          questionsWithoutSuppliedAnswersCount: 0,
          questionsRequiringReviewCount: 0,
          questionsSavedCount: 50,
          status: 'ready',
          extractionCompletenessStatus: 'verified_complete',
          summary: 'Authentic NOUN GST 302 e-Exam paper questions covering ILO, policy decisions, e-commerce, and business lifecycle.',
          examSession: 'NOUN Semester E-Examination Session'
        }
      ];
    }
  }

  // 2. Add new GST 302 questions to customPastQuestions
  if (!prof.customPastQuestions) prof.customPastQuestions = [];
  const existingIds = new Set(prof.customPastQuestions.map(q => q.id));
  let added = 0;
  for (const q of newPqs) {
    if (!existingIds.has(q.id)) {
      prof.customPastQuestions.push(q);
      existingIds.add(q.id);
      added++;
    }
  }

  prof.updatedAt = new Date().toISOString();
  console.log(userId, 'added new GST 302 questions:', added, 'total past questions:', prof.customPastQuestions.length);
}

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
console.log('Synchronized GST 302 to cloud_db.json successfully!');
