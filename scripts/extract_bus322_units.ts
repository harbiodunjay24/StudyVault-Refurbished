import fs from 'fs';
import { PDFParse } from 'pdf-parse';

async function extractMissingUnits() {
  const buf322 = fs.readFileSync('public/assets/aistudio/BUS322_765e78f6.pdf');
  const res322 = await (new PDFParse(new Uint8Array(buf322))).getText();
  const text322 = res322.text || '';

  console.log('=== EXTRACTING BUS 322 MODULE 3 UNITS ===');
  // Pages 100 to 169
  // Find where Unit 2 Motivation, Unit 3 Motivational Processes, Unit 4 Money, Unit 5 Organizational Structure start
  const u2Idx = text322.indexOf('UNIT 2 MOTIVATION');
  const u3Idx = text322.indexOf('UNIT 3 MOTIVATIONAL PROCESSES');
  const u4Idx = text322.indexOf('UNIT 4 MONEY');
  const u5Idx = text322.indexOf('UNIT 5 ORGANIZATIONAL STRUCTURE');

  console.log('Unit 2 MOTIVATION index:', u2Idx);
  console.log('Unit 3 MOTIVATIONAL PROCESSES index:', u3Idx);
  console.log('Unit 4 MONEY index:', u4Idx);
  console.log('Unit 5 ORGANIZATIONAL STRUCTURE index:', u5Idx);

  if (u2Idx !== -1) {
    console.log('\n--- Unit 2 Snippet ---');
    console.log(text322.slice(u2Idx, u2Idx + 800));
  }
  if (u3Idx !== -1) {
    console.log('\n--- Unit 3 Snippet ---');
    console.log(text322.slice(u3Idx, u3Idx + 800));
  }
  if (u4Idx !== -1) {
    console.log('\n--- Unit 4 Snippet ---');
    console.log(text322.slice(u4Idx, u4Idx + 800));
  }
  if (u5Idx !== -1) {
    console.log('\n--- Unit 5 Snippet ---');
    console.log(text322.slice(u5Idx, u5Idx + 800));
  }
}

extractMissingUnits().catch(console.error);
