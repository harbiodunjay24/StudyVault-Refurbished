import fs from 'fs';
import { PDFParse } from 'pdf-parse';

async function inspectUnits() {
  const buf322 = fs.readFileSync('public/assets/aistudio/BUS322_765e78f6.pdf');
  const res322 = await (new PDFParse(new Uint8Array(buf322))).getText();
  const text322 = res322.text || '';

  // Look at Table of Contents (pages 1-10)
  console.log('=== BUS 322 TABLE OF CONTENTS IN SOURCE PDF ===');
  const tocMatch322 = text322.slice(0, 15000);
  const lines322 = tocMatch322.split('\n');
  lines322.forEach(l => {
    if (/Module\s+\d+|Unit\s+\d+/i.test(l)) {
      console.log(l.trim());
    }
  });

  const buf330 = fs.readFileSync('public/assets/aistudio/BUS330_8f9154d9.pdf');
  const res330 = await (new PDFParse(new Uint8Array(buf330))).getText();
  const text330 = res330.text || '';

  console.log('\n=== BUS 330 TABLE OF CONTENTS IN SOURCE PDF ===');
  const tocMatch330 = text330.slice(0, 15000);
  const lines330 = tocMatch330.split('\n');
  lines330.forEach(l => {
    if (/Module\s+\d+|Unit\s+\d+/i.test(l)) {
      console.log(l.trim());
    }
  });
}

inspectUnits().catch(console.error);
