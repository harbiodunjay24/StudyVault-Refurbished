import fs from 'fs';
import { PDFParse } from 'pdf-parse';

const pdfFiles = [
  { course: 'BUS 322', file: 'public/assets/aistudio/BUS322_765e78f6.pdf' },
  { course: 'BUS 330', file: 'public/assets/aistudio/BUS330_8f9154d9.pdf' },
  { course: 'ECO 344', file: 'public/assets/aistudio/ECO344_37bf8463.pdf' },
  { course: 'GST 302', file: 'public/assets/aistudio/GST302_BUSINESS_CREATION_AND_GROWTH_99335b4e.pdf' },
  { course: 'GST 107', file: 'public/assets/aistudio/GST107_A_STUDY_GUIDE_FOR_DISTANCE_LEARNER_3a4d0ed2.pdf' },
];

async function auditPDFs() {
  console.log('=== OFFICIAL NOUN UPLOADED TEXTBOOK PDF AUDIT ===\n');

  for (const item of pdfFiles) {
    if (!fs.existsSync(item.file)) {
      console.log(`[${item.course}] File not found: ${item.file}`);
      continue;
    }

    const buffer = fs.readFileSync(item.file);
    const pdfParser = new PDFParse(new Uint8Array(buffer));
    const result = await pdfParser.getText();

    const fullText = result.text || '';
    const totalPages = result.total || 0;
    const words = fullText.split(/\s+/).filter(Boolean);

    // Find table of contents / unit lines
    const lines = fullText.split(/\r?\n/);
    const unitLines: string[] = [];
    const moduleLines: string[] = [];

    lines.forEach(l => {
      const trimmed = l.trim();
      if (/^Module\s+\d+/i.test(trimmed) && trimmed.length < 80) {
        if (!moduleLines.includes(trimmed)) moduleLines.push(trimmed);
      }
      if (/^Unit\s+\d+/i.test(trimmed) && trimmed.length < 100) {
        if (!unitLines.includes(trimmed)) unitLines.push(trimmed);
      }
    });

    console.log(`-----------------------------------------------------------------`);
    console.log(`COURSE: ${item.course} — PDF: ${item.file}`);
    console.log(`  Total Pages: ${totalPages}`);
    console.log(`  Total Words: ${words.length.toLocaleString()}`);
    console.log(`  Modules identified in source: ${moduleLines.length}`);
    moduleLines.slice(0, 8).forEach(m => console.log(`    * ${m}`));
    console.log(`  Units identified in source (${unitLines.length}):`);
    unitLines.slice(0, 15).forEach(u => console.log(`    - ${u}`));
    if (unitLines.length > 15) {
      console.log(`    ... (${unitLines.length - 15} more units)`);
    }
  }
}

auditPDFs().catch(console.error);
