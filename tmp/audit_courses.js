const fs = require('fs');

const courses = [
  { name: 'ENT 308', file: 'src/services/ent308Data.ts' },
  { name: 'ENT 304', file: 'src/services/ent304Data.ts' },
  { name: 'ENT 302', file: 'src/services/ent302Data.ts' },
  { name: 'FMS 304', file: 'src/services/fms304Data.ts' },
  { name: 'BUS 330', file: 'src/services/bus330Data.ts' },
  { name: 'BUS 322', file: 'src/services/bus322Data.ts' },
  { name: 'ECO 344', file: 'src/services/eco344Data.ts' },
  { name: 'GST 302', file: 'src/services/gst302Data.ts' },
  { name: 'GST 107', file: 'src/services/gst107Data.ts' }
];

console.log('=== COURSE SOURCE FILES INSPECTION ===');
courses.forEach(c => {
  if (fs.existsSync(c.file)) {
    const content = fs.readFileSync(c.file, 'utf8');
    console.log(`${c.name}: File size: ${(content.length / 1024).toFixed(1)} KB`);
  } else {
    console.log(`${c.name}: File ${c.file} NOT FOUND`);
  }
});
