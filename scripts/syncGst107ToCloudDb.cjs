const fs = require('fs');

const dbPath = 'server-data/cloud_db.json';
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

// Load the newly built GST 107 course and past questions
// We can require the JSON directly
const gst107Questions = JSON.parse(fs.readFileSync('src/services/gst107Questions.json', 'utf8'));

// Build GST 107 course object
const gst107Course = {
  id: 'course-gst107',
  code: 'GST 107',
  title: 'A Study Guide for the Distance Learner',
  department: 'General Studies Unit (GST) / Directorate of Learner Support Services',
  description:
    'National Open University of Nigeria (NOUN) foundational compulsory 2-credit course developed by Prof. Olubiyi Adewale, Dr. Johnson Opateye, Dr. Chidinma Onwubere, and Miss Nora Onwumelu; edited by Dr. Juliet O. Inegbedion. Covers the history and philosophy of Open and Distance Learning (ODL), learner demography and characteristics, the learning environment as third teacher, the four foundational study skills (Listening, Speaking, Reading, Writing), study strategies and mnemonic devices (SQ3R, Cornell note-taking, SMART, SWOT), instructional and summative assessment modes (CMA, TMA, POP, e-Examination), assessment of non-examinable courses (SIWES, practicum, teaching practice, research projects), and the comprehensive learners support services framework.',
  createdAt: '2026-10-24T08:30:00Z',
  documents: [
    {
      id: 'doc-gst107-textbook',
      name: 'GST107_A_STUDY_GUIDE_FOR_DISTANCE_LEARNER_3a4d0ed2.pdf',
      fileType: 'pdf',
      fileSize: 1850000,
      uploadedAt: '2026-10-24T08:30:00Z',
      extractedHeadingsCount: 16,
      pageCount: 132,
      status: 'ready',
      processingStatus: 'fully_processed',
      summary:
        'Official NOUN primary course textbook for GST 107: A Study Guide for the Distance Learner (First Edition 2018, ISBN: 978-978-8521-90-7) developed by Prof. Olubiyi Adewale, Dr. Johnson Opateye, Dr. Chidinma Onwubere, and Miss Nora Onwumelu.'
    },
    {
      id: 'doc-gst107-psalmdata-summary',
      name: 'NOUN-NOU107_STUDY_GUIDE_FOR_THE_DISTANCE_LEARNER_SUMMARY_1826c371.pdf',
      fileType: 'pdf',
      fileSize: 1250000,
      uploadedAt: '2026-10-24T08:30:00Z',
      extractedHeadingsCount: 16,
      pageCount: 84,
      status: 'ready',
      processingStatus: 'fully_processed',
      summary:
        'Comprehensive examination summary and 1,039 verified past-question and assessment items with official model solutions for NOU 107 / GST 107 by Psalmdata Telecom and Computer Café.'
    }
  ],
  pastQuestionDocuments: [
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
  ],
  modules: []
};

// Also load the modules from src/services/gst107Data.ts by dynamic regex or eval
// Or simple require if compiled: let's read GST107_COURSE from gst107Data.ts
const dataFile = fs.readFileSync('src/services/gst107Data.ts', 'utf8');
const modulesMatch = dataFile.match(/modules:\s*(\[[\s\S]*?\n\s*\]\n\s*\};)/);
if (modulesMatch) {
  // Extract modules safely
  try {
    const modulesStr = modulesMatch[1].replace(/\};$/, '');
    const modulesEvaluated = eval('(' + modulesStr + ')');
    gst107Course.modules = modulesEvaluated;
    console.log('Loaded modules count:', gst107Course.modules.length);
  } catch (err) {
    console.error('Failed to eval modules:', err);
  }
}

// Update usr_abiodun_ayodeji_24
const abiodun = db.progress['usr_abiodun_ayodeji_24'];
if (abiodun) {
  if (!abiodun.customCourses) abiodun.customCourses = [];
  const existingGst107Idx = abiodun.customCourses.findIndex(c => /GST[-_\s]?107|NOU[-_\s]?107/i.test(c.code));
  if (existingGst107Idx >= 0) {
    abiodun.customCourses[existingGst107Idx] = gst107Course;
  } else {
    abiodun.customCourses.push(gst107Course);
  }

  if (!abiodun.customPastQuestions) abiodun.customPastQuestions = [];
  const existingPqIds = new Set(abiodun.customPastQuestions.map(q => q.id));
  let newPqAdded = 0;
  for (const q of gst107Questions) {
    if (!existingPqIds.has(q.id)) {
      abiodun.customPastQuestions.push(q);
      existingPqIds.add(q.id);
      newPqAdded++;
    }
  }

  abiodun.updatedAt = new Date().toISOString();
  console.log('Abiodun courses total:', abiodun.customCourses.length);
  console.log('Abiodun new PQs added:', newPqAdded, 'Total PQs:', abiodun.customPastQuestions.length);
}

// Also update usr_59c22898337934ca
const user2 = db.progress['usr_59c22898337934ca'];
if (user2) {
  if (!user2.customCourses) user2.customCourses = [];
  const existingGst107Idx = user2.customCourses.findIndex(c => /GST[-_\s]?107|NOU[-_\s]?107/i.test(c.code));
  if (existingGst107Idx >= 0) {
    user2.customCourses[existingGst107Idx] = gst107Course;
  } else {
    user2.customCourses.push(gst107Course);
  }

  if (!user2.customPastQuestions) user2.customPastQuestions = [];
  const existingPqIds = new Set(user2.customPastQuestions.map(q => q.id));
  let newPqAdded = 0;
  for (const q of gst107Questions) {
    if (!existingPqIds.has(q.id)) {
      user2.customPastQuestions.push(q);
      existingPqIds.add(q.id);
      newPqAdded++;
    }
  }
  user2.updatedAt = new Date().toISOString();
  console.log('User2 courses total:', user2.customCourses.length);
  console.log('User2 new PQs added:', newPqAdded, 'Total PQs:', user2.customPastQuestions.length);
}

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
console.log('cloud_db.json successfully synchronized!');
