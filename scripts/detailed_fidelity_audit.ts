import fs from 'fs';
import {
  ENT308_AUTHENTIC_COURSE,
  ENT304_AUTHENTIC_COURSE,
  ENT302_AUTHENTIC_COURSE,
  FMS304_SAMPLE_COURSE,
  BUS330_COURSE,
  BUS322_COURSE
} from '../src/services/sampleData';
import { ECO344_COURSE } from '../src/services/eco344Data';
import { GST302_COURSE } from '../src/services/gst302Data';
import { GST107_COURSE } from '../src/services/gst107Data';

const courses = [
  ENT308_AUTHENTIC_COURSE,
  ENT304_AUTHENTIC_COURSE,
  ENT302_AUTHENTIC_COURSE,
  FMS304_SAMPLE_COURSE,
  BUS330_COURSE,
  BUS322_COURSE,
  ECO344_COURSE,
  GST302_COURSE,
  GST107_COURSE,
];

console.log('=================================================================');
console.log('         STUDYVAULT AI — DETAILED TEXTBOOK FIDELITY AUDIT        ');
console.log('=================================================================\n');

courses.forEach((course, idx) => {
  console.log(`-----------------------------------------------------------------`);
  console.log(`COURSE [${idx + 1}/9]: ${course.code} — ${course.title} (ID: ${course.id})`);
  console.log(`Department: ${course.department || 'N/A'}`);
  console.log(`Source Documents (${(course.documents || []).length}):`);
  (course.documents || []).forEach(d => console.log(`  - ${d.name || d.id}`));
  console.log(`Past Question Documents (${(course.pastQuestionDocuments || []).length}):`);
  (course.pastQuestionDocuments || []).forEach(d => console.log(`  - ${d.name || d.id}`));

  const modules = course.modules || [];
  const allUnits = modules.flatMap(m => m.units || []);
  const allTopics = allUnits.flatMap(u => u.topics || []);

  console.log(`Structure Summary:`);
  console.log(`  Modules: ${modules.length}`);
  console.log(`  Units: ${allUnits.length}`);
  console.log(`  Topics: ${allTopics.length}`);

  // Inspect unit numbering and continuity
  const unitNumbers = allUnits.map(u => ({
    id: u.id,
    number: u.unitNumber ?? u.number,
    title: u.title,
    topicsCount: (u.topics || []).length,
  }));

  console.log(`\n  Unit Progression:`);
  unitNumbers.forEach((u, uIdx) => {
    console.log(`    Unit ${uIdx + 1} (Declared #${u.number}): "${u.title}" [${u.topicsCount} topics]`);
  });

  // Check content depth and presence of definitions, tables, case studies
  let emptyTopics = 0;
  let totalContentChars = 0;
  let totalDefinitions = 0;
  let totalTables = 0;
  let totalWrittenQuestions = 0;

  allTopics.forEach(t => {
    if (!t.content || t.content.trim().length === 0) {
      emptyTopics++;
    } else {
      totalContentChars += t.content.length;
    }
    if (t.textbookDefinitions && Array.isArray(t.textbookDefinitions)) {
      totalDefinitions += t.textbookDefinitions.length;
    }
    if (t.tables && Array.isArray(t.tables)) {
      totalTables += t.tables.length;
    }
    if (t.writtenQuestions && Array.isArray(t.writtenQuestions)) {
      totalWrittenQuestions += t.writtenQuestions.length;
    }
  });

  console.log(`\n  Content Depth & Fidelity Metrics:`);
  console.log(`    Total textbook content characters: ${totalContentChars.toLocaleString()}`);
  console.log(`    Average characters per topic: ${allTopics.length ? Math.round(totalContentChars / allTopics.length) : 0}`);
  console.log(`    Empty topics: ${emptyTopics}`);
  console.log(`    Embedded textbook definitions: ${totalDefinitions}`);
  console.log(`    Embedded data tables: ${totalTables}`);
  console.log(`    Embedded written assessment questions: ${totalWrittenQuestions}`);
  console.log(`-----------------------------------------------------------------\n`);
});
