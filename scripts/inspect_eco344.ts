import fs from 'fs';
import { PDFParse } from 'pdf-parse';

async function inspectEco344() {
  const buf = fs.readFileSync('public/assets/aistudio/ECO344_37bf8463.pdf');
  const res = await (new PDFParse(new Uint8Array(buf))).getText();
  const text = res.text || '';

  console.log('=== ECO 344 TABLE OF CONTENTS IN SOURCE PDF ===');
  const lines = text.slice(0, 20000).split('\n');
  lines.forEach(l => {
    if (/Module\s+\d+|Unit\s+\d+/i.test(l)) {
      console.log(l.trim());
    }
  });
}

inspectEco344().catch(console.error);
