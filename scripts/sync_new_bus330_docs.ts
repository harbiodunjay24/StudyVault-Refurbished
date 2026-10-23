import fs from 'fs';
import path from 'path';
import { BUS330_UPLOADED_PQ_DOCUMENTS, AUTHENTIC_BUS330_EXTRACTED_PAST_QUESTIONS } from '../src/services/bus330PastQuestionsData';
import { BUS330_COURSE } from '../src/services/bus330Data';

const dbPath = path.resolve('server-data/cloud_db.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

const userProgress = db.progress['usr_abiodun_ayodeji_24'];
if (!userProgress) {
  console.error('User usr_abiodun_ayodeji_24 not found in db.progress');
  process.exit(1);
}

// 1. Update BUS 330 Course documents
const bus330Idx = userProgress.customCourses.findIndex((c: any) => /BUS[-_\s]?330/i.test(c.code));
if (bus330Idx !== -1) {
  userProgress.customCourses[bus330Idx].documents = BUS330_COURSE.documents;
  userProgress.customCourses[bus330Idx].pastQuestionDocuments = BUS330_UPLOADED_PQ_DOCUMENTS;
  console.log('Updated BUS 330 Course documents and pastQuestionDocuments');
} else {
  userProgress.customCourses.push(BUS330_COURSE);
  console.log('Added BUS 330 to customCourses');
}

// 2. Merge Past Questions without duplicates
const existingPQIds = new Set((userProgress.customPastQuestions || []).map((q: any) => q.id));
let addedCount = 0;
let duplicateCount = 0;

for (const q of AUTHENTIC_BUS330_EXTRACTED_PAST_QUESTIONS) {
  if (existingPQIds.has(q.id)) {
    duplicateCount++;
  } else {
    userProgress.customPastQuestions.push(q);
    existingPQIds.add(q.id);
    addedCount++;
  }
}

userProgress.updatedAt = new Date().toISOString();
fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');

console.log(`Synchronization complete:`);
console.log(`- Added ${addedCount} new authentic BUS 330 past questions.`);
console.log(`- Detected and avoided ${duplicateCount} duplicate ID collisions.`);
console.log(`- Total Past Questions in Cloud DB: ${userProgress.customPastQuestions.length}`);
