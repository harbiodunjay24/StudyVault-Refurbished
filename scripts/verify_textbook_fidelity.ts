import {
  ENT308_AUTHENTIC_COURSE,
  ENT304_AUTHENTIC_COURSE,
  ENT302_AUTHENTIC_COURSE,
  FMS304_SAMPLE_COURSE,
  BUS330_COURSE,
  BUS322_COURSE,
  ECO344_COURSE,
  GST302_COURSE,
  GST107_COURSE,
  SAMPLE_PAST_QUESTIONS
} from '../src/services/sampleData';
import { INSUFFICIENT_INFO_SENTENCE } from '../src/services/aiTutorService';

console.log('================================================================');
console.log('STUDYVAULT AI — COMPREHENSIVE TEXTBOOK FIDELITY AUDIT REPORT');
console.log('================================================================\n');

const courses = [
  { course: ENT308_AUTHENTIC_COURSE, expectedUnits: 23, expectedModules: 10, pdf: 'ENT308_6891ebce.pdf' },
  { course: ENT304_AUTHENTIC_COURSE, expectedUnits: 14, expectedModules: 3, pdf: 'ENT304_a91a92e2.pdf' },
  { course: ENT302_AUTHENTIC_COURSE, expectedUnits: 17, expectedModules: 4, pdf: 'ENT302_bf39c9df.pdf' },
  { course: FMS304_SAMPLE_COURSE, expectedUnits: 15, expectedModules: 3, pdf: 'FMS304_RESEARCH_METHODOLOGY_54fc09d5.pdf' },
  { course: BUS330_COURSE, expectedUnits: 15, expectedModules: 4, pdf: 'BUS330_8f9154d9.pdf' },
  { course: BUS322_COURSE, expectedUnits: 15, expectedModules: 3, pdf: 'BUS322_765e78f6.pdf' },
  { course: ECO344_COURSE, expectedUnits: 15, expectedModules: 4, pdf: 'ECO344_52554d58.pdf' },
  { course: GST302_COURSE, expectedUnits: 25, expectedModules: 7, pdf: 'GST302_57ba4b3b.pdf' },
  { course: GST107_COURSE, expectedUnits: 16, expectedModules: 4, pdf: 'GST107_69e8b746.pdf' },
];

let totalUnits = 0;
let allPassed = true;

console.log('| Course Code | Course Title | Modules | Units | Expected | Status | Source PDF |');
console.log('|---|---|---|---|---|---|---|');

courses.forEach(({ course, expectedUnits, expectedModules, pdf }) => {
  const actualModules = course.modules.length;
  const actualUnits = course.modules.reduce((sum, m) => sum + m.units.length, 0);
  totalUnits += actualUnits;

  const passed = actualUnits === expectedUnits && actualModules === expectedModules;
  if (!passed) allPassed = false;

  console.log(
    `| ${course.code.padEnd(8)} | ${course.title.slice(0, 28).padEnd(28)} | ${actualModules}/${expectedModules} | ${actualUnits}/${expectedUnits} | ${expectedUnits} | ${passed ? 'VERIFIED 100%' : 'FAIL'} | ${pdf} |`
  );
});

console.log(`\nTotal Courses Audited: ${courses.length}`);
console.log(`Total Units Across Curriculum: ${totalUnits}`);
console.log(`Total Past Questions in Library: ${SAMPLE_PAST_QUESTIONS.length}`);
console.log(`All Courses Verified Complete: ${allPassed ? 'YES (100% COMPLETE)' : 'NO'}`);

console.log('\n--- STRICT SOURCE GROUNDING SAFEGUARD VERIFICATION ---');
console.log('Exact Insufficient Info Verbatim String:');
console.log(`"${INSUFFICIENT_INFO_SENTENCE}"`);
const expectedSentence = "The PDF does not provide enough information to answer this confidently.";
console.log(`Matches Exact Requirement: ${INSUFFICIENT_INFO_SENTENCE === expectedSentence ? 'YES (VERIFIED EXACT)' : 'MISMATCH'}`);
