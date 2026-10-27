import {
  ENT308_AUTHENTIC_COURSE,
  ENT304_AUTHENTIC_COURSE,
  ENT302_AUTHENTIC_COURSE,
  FMS304_SAMPLE_COURSE,
  BUS330_COURSE,
  BUS322_COURSE
} from '../src/services/sampleData';

const courses = [
  ENT308_AUTHENTIC_COURSE,
  ENT304_AUTHENTIC_COURSE,
  ENT302_AUTHENTIC_COURSE,
  FMS304_SAMPLE_COURSE,
  BUS330_COURSE,
  BUS322_COURSE
];

courses.forEach((course, idx) => {
  console.log(`-----------------------------------------------------------------`);
  console.log(`COURSE [${idx + 1}/6]: ${course.code} — ${course.title} (ID: ${course.id})`);
  const modules = course.modules || [];
  const allUnits = modules.flatMap(m => m.units || []);
  const allTopics = allUnits.flatMap(u => u.topics || []);

  console.log(`Structure Summary:`);
  console.log(`  Modules: ${modules.length}`);
  console.log(`  Units: ${allUnits.length}`);
  console.log(`  Topics: ${allTopics.length}`);

  let totalContentChars = 0;
  let totalDefinitions = 0;
  let totalTables = 0;
  let totalWrittenQuestions = 0;

  allTopics.forEach(t => {
    if (t.content) totalContentChars += t.content.length;
    if (t.textbookDefinitions) totalDefinitions += t.textbookDefinitions.length;
    if (t.tables) totalTables += t.tables.length;
    if (t.writtenQuestions) totalWrittenQuestions += t.writtenQuestions.length;
  });

  console.log(`  Total textbook characters: ${totalContentChars.toLocaleString()}`);
  console.log(`  Average chars/topic: ${allTopics.length ? Math.round(totalContentChars / allTopics.length) : 0}`);
  console.log(`  Embedded definitions: ${totalDefinitions}, tables: ${totalTables}, questions: ${totalWrittenQuestions}`);
  console.log(`  First 3 units: ${allUnits.slice(0, 3).map(u => u.title).join(' | ')}`);
  console.log(`  Last 3 units: ${allUnits.slice(-3).map(u => u.title).join(' | ')}`);
});
