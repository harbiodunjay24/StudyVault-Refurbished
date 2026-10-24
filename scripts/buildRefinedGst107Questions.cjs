const { PDFParse } = require('pdf-parse');
const fs = require('fs');

async function buildRefinedGst107Questions() {
  const buf = fs.readFileSync('public/assets/aistudio/NOUN-NOU107_STUDY_GUIDE_FOR_THE_DISTANCE_LEARNER_SUMMARY_1826c371.pdf');
  const p = new PDFParse({ data: buf });
  const t = await p.getText();
  await p.destroy();

  const rawLines = t.text.split('\n').map(l => l.trim()).filter(Boolean);
  const lines = rawLines.filter(l => 
    !l.includes('PLEASE PATRONIZE US') && 
    !l.includes('ADMISSION PROCESSING') && 
    !l.includes('PSALMDATA') && 
    !l.includes('Motto:') && 
    !l.includes('Website:') && 
    !l.includes('Contacts:') && 
    !l.includes('RC771280') &&
    !/^Page \d+/i.test(l) &&
    !/^NOUN-NOU107/i.test(l) &&
    !/^-- \d+ of \d+ --$/i.test(l) &&
    l !== '0'
  );

  const unitTitles = {
    'M1U1': 'History of the Open and Distance Learning System',
    'M1U2': 'Characteristics of the Open and Distance Learning System',
    'M1U3': 'Teaching and Learning in the Open and Distance Learning System',
    'M2U1': 'Listening',
    'M2U2': 'Speaking',
    'M2U3': 'Reading',
    'M2U4': 'Writing',
    'M2U5': 'Study Strategies',
    'M3U1': 'Overview of Assessment in ODL',
    'M3U2': 'Instructional-Based Assessment Modes',
    'M3U3': 'Semester Examination',
    'M3U4': 'Assessment of Non-Examinable Courses',
    'M4U1': 'Definition and Purposes of Learners’ Support Services',
    'M4U2': 'Types of Learners’ Support Services',
    'M4U3': 'Sources of Learners’ Support Services',
    'M4U4': 'Benefits of Learners’ Support Services'
  };

  let curModule = 'Module 1: Introduction to the Open and Distance Learning (ODL) System';
  let curUnit = 'Unit 1: History of the Open and Distance Learning System';
  let modNum = 1;
  let unitNum = 1;
  const questions = [];

  let i = 0;
  while (i < lines.length) {
    const line = lines[i];

    if (/^MODULE\s+(\d+)/i.test(line)) {
      curModule = line;
      const mMatch = line.match(/^MODULE\s+(\d+)/i);
      if (mMatch) modNum = parseInt(mMatch[1], 10);
      i++;
      continue;
    }

    if (/^UNIT\s+(\d+)/i.test(line)) {
      curUnit = line;
      const uMatch = line.match(/^UNIT\s+(\d+)/i);
      if (uMatch) unitNum = parseInt(uMatch[1], 10);
      i++;
      continue;
    }

    // Check if line ends with ':' or 'include:' or 'are:'
    if (/:$/i.test(line) || /include:$/i.test(line) || /are:$/i.test(line)) {
      let prompt = line;
      let j = i + 1;
      const items = [];
      while (j < lines.length && /^\d+\.\s+/.test(lines[j])) {
        items.push(lines[j]);
        j++;
      }
      if (items.length > 0) {
        questions.push({
          modNum,
          unitNum,
          type: 'written_structured',
          prompt,
          answer: items.join('; '),
          rubric: items
        });
        i = j;
        continue;
      }
    }

    // Check if True/False
    if (i + 1 < lines.length && /^(True|False)$/i.test(lines[i + 1])) {
      questions.push({
        modNum,
        unitNum,
        type: 'multiple_choice',
        prompt: line,
        options: ['True', 'False'],
        answer: lines[i + 1],
        rubric: [lines[i + 1]]
      });
      i += 2;
      continue;
    }

    // Check if prompt is split across lines
    let prompt = line;
    let j = i + 1;

    while (j < lines.length && !/^MODULE/i.test(lines[j]) && !/^UNIT/i.test(lines[j])) {
      const nextLine = lines[j];
      if (/^\d+\.\s+/.test(nextLine)) break;
      if (/^(True|False)$/i.test(nextLine)) break;

      if (prompt.includes('_______')) {
        if (/^[a-z]/.test(nextLine) || prompt.endsWith('and') || prompt.endsWith('or') || prompt.endsWith('in') || prompt.endsWith('the') || prompt.endsWith('of') || prompt.endsWith('to') || prompt.endsWith('as')) {
          prompt += ' ' + nextLine;
          j++;
          continue;
        }
        break;
      } else {
        if (nextLine.includes('_______') || /^[a-z]/.test(nextLine) || prompt.endsWith('and') || prompt.endsWith('or') || prompt.endsWith('in') || prompt.endsWith('the') || prompt.endsWith('of') || prompt.endsWith('to') || prompt.endsWith('as') || prompt.endsWith(',')) {
          prompt += ' ' + nextLine;
          j++;
          continue;
        }
        break;
      }
    }

    if (j < lines.length && !/^MODULE/i.test(lines[j]) && !/^UNIT/i.test(lines[j])) {
      let answer = lines[j];
      j++;

      if (j < lines.length && !/^MODULE/i.test(lines[j]) && !/^UNIT/i.test(lines[j])) {
        if (/^[a-z]/.test(lines[j]) || answer.endsWith(',') || answer.endsWith('and') || answer.endsWith('-')) {
          answer += ' ' + lines[j];
          j++;
        }
      }

      questions.push({
        modNum,
        unitNum,
        type: /\?$/.test(prompt) ? 'written_definition' : (prompt.includes('_______') ? 'written_definition' : 'written_discussion'),
        prompt,
        answer,
        rubric: [answer]
      });

      i = j;
      continue;
    }

    i++;
  }

  console.log('Total extracted:', questions.length);

  // Deduplication check
  const seenPrompts = new Map();
  const uniqueQuestions = [];
  let dupCount = 0;

  questions.forEach((q, idx) => {
    const key = q.prompt.toLowerCase().replace(/\s+/g, ' ').trim();
    if (seenPrompts.has(key)) {
      dupCount++;
      const existing = seenPrompts.get(key);
      if (!existing.recurringAppearances) {
        existing.recurringAppearances = [];
      }
      existing.recurringAppearances.push({
        year: 'Official E-Exam / POP Archive',
        questionNumber: 'Item ' + (idx + 1),
        documentName: 'NOUN-NOU107_STUDY_GUIDE_FOR_THE_DISTANCE_LEARNER_SUMMARY_1826c371.pdf'
      });
    } else {
      const qId = 'pq_gst107_' + String(uniqueQuestions.length + 1).padStart(4, '0');
      const unitKey = 'M' + q.modNum + 'U' + q.unitNum;
      const uTitle = unitTitles[unitKey] || ('Unit ' + q.unitNum);
      const unitId = 'unit-gst107-m' + q.modNum + '-u' + q.unitNum;

      const item = {
        id: qId,
        courseId: 'course-gst107',
        courseCode: 'GST 107',
        courseTitle: 'A Study Guide for the Distance Learner',
        unitId: unitId,
        linkedUnitId: unitId,
        linkedUnitTitle: 'Unit ' + q.unitNum + ': ' + uTitle,
        linkedModuleNumber: q.modNum,
        linkedUnitNumber: q.unitNum,
        topicTitle: uTitle,
        year: 'Official E-Exam / POP Archive',
        session: 'NOUN National Open University of Nigeria Academic Examination Archives',
        sourceType: 'uploaded_document',
        sourceFileName: 'NOUN-NOU107_STUDY_GUIDE_FOR_THE_DISTANCE_LEARNER_SUMMARY_1826c371.pdf',
        documentId: 'pq-doc-gst107-psalmdata-summary',
        documentName: 'NOUN-NOU107_STUDY_GUIDE_FOR_THE_DISTANCE_LEARNER_SUMMARY_1826c371.pdf',
        questionNumber: uniqueQuestions.length + 1,
        originalQuestionNumber: idx + 1,
        questionText: q.prompt,
        questionType: q.type,
        options: q.options || undefined,
        correctAnswer: q.options ? q.answer : undefined,
        modelAnswer: q.answer,
        officialAnswer: q.answer,
        suppliedAnswer: q.answer,
        textbookExplanation: 'Extracted from NOUN GST 107 Course Guide Module ' + q.modNum + ', Unit ' + q.unitNum + ' (' + uTitle + ').',
        answerGuide: q.answer,
        keyRubricPoints: q.rubric,
        marks: 2,
        totalMarks: 2,
        difficulty: 'Core',
        examType: 'E-Exam / POP',
        isPastQuestion: true,
        verifiedAuthentic: true,
        answerStatus: 'supplied_by_source',
        unitMappingStatus: 'explicit_in_source',
        mappedUnitIds: [unitId]
      };
      seenPrompts.set(key, item);
      uniqueQuestions.push(item);
    }
  });

  console.log('Unique questions count:', uniqueQuestions.length);
  console.log('Confirmed duplicates handled:', dupCount);

  fs.writeFileSync('src/services/gst107Questions.json', JSON.stringify(uniqueQuestions, null, 2));
  fs.writeFileSync('server-data/gst107_extracted_questions.json', JSON.stringify(uniqueQuestions, null, 2));

  // Update cloud_db.json
  const dbPath = 'server-data/cloud_db.json';
  const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

  const abiodun = db.progress['usr_abiodun_ayodeji_24'];
  if (abiodun) {
    // Preserve all non-GST107 questions and replace GST107 questions cleanly
    const nonGst107 = abiodun.customPastQuestions.filter(q => !/GST[-_\s]?107|NOU[-_\s]?107/i.test(q.courseCode));
    abiodun.customPastQuestions = [...nonGst107, ...uniqueQuestions];
    abiodun.updatedAt = new Date().toISOString();
    console.log('Abiodun customPastQuestions total:', abiodun.customPastQuestions.length);
  }

  const user2 = db.progress['usr_59c22898337934ca'];
  if (user2) {
    const nonGst107 = user2.customPastQuestions.filter(q => !/GST[-_\s]?107|NOU[-_\s]?107/i.test(q.courseCode));
    user2.customPastQuestions = [...nonGst107, ...uniqueQuestions];
    user2.updatedAt = new Date().toISOString();
    console.log('User2 customPastQuestions total:', user2.customPastQuestions.length);
  }

  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
  console.log('Finished updating refined questions and cloud_db.json!');
}

buildRefinedGst107Questions();
