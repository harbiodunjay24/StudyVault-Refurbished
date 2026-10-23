import { Course, PastExamQuestionItem } from '../types';
export {
  ENT302_MODULES,
  ENT302_AUTHENTIC_COURSE,
  AUTHENTIC_ENT302_PAST_QUESTIONS
} from './ent302Data';
export {
  ENT302_UPLOADED_PQ_DOCUMENTS,
  AUTHENTIC_ENT302_EXTRACTED_PAST_QUESTIONS
} from './ent302PastQuestionsData';
export {
  FMS304_MODULES,
  FMS304_AUTHENTIC_COURSE,
  FMS304_SAMPLE_COURSE,
  AUTHENTIC_FMS304_PAST_QUESTIONS
} from './fms304Data';
export {
  FMS304_UPLOADED_PQ_DOCUMENTS,
  AUTHENTIC_FMS304_EXTRACTED_PAST_QUESTIONS
} from './fms304PastQuestionsData';
export {
  ENT304_MODULES,
  ENT304_AUTHENTIC_COURSE,
  ENT304_PAST_QUESTIONS
} from './ent304Data';
export {
  ENT304_UPLOADED_PQ_DOCUMENTS,
  AUTHENTIC_ENT304_EXTRACTED_PAST_QUESTIONS
} from './ent304PastQuestionsData';
export {
  ENT308_MODULES,
  ENT308_AUTHENTIC_COURSE,
  AUTHENTIC_ENT308_PAST_QUESTIONS as ENT308_PAST_QUESTIONS
} from './ent308Data';
export {
  ENT308_UPLOADED_PQ_DOCUMENTS,
  AUTHENTIC_ENT308_EXTRACTED_PAST_QUESTIONS
} from './ent308PastQuestionsData';
export {
  BUS330_UPLOADED_PQ_DOCUMENTS,
  AUTHENTIC_BUS330_EXTRACTED_PAST_QUESTIONS
} from './bus330PastQuestionsData';
export {
  BUS322_UPLOADED_PQ_DOCUMENTS,
  AUTHENTIC_BUS322_EXTRACTED_PAST_QUESTIONS
} from './bus322PastQuestionsData';
export {
  ECO344_COURSE,
  ECO344_QUESTIONS,
  ECO344_UPLOADED_PQ_DOCUMENTS
} from './eco344Data';
export {
  GST302_COURSE,
  GST302_QUESTIONS,
  GST302_UPLOADED_PQ_DOCUMENTS
} from './gst302Data';

import { AUTHENTIC_ENT302_EXTRACTED_PAST_QUESTIONS } from './ent302PastQuestionsData';
import { AUTHENTIC_FMS304_EXTRACTED_PAST_QUESTIONS } from './fms304PastQuestionsData';
import { AUTHENTIC_ENT304_EXTRACTED_PAST_QUESTIONS } from './ent304PastQuestionsData';
import { AUTHENTIC_ENT308_EXTRACTED_PAST_QUESTIONS } from './ent308PastQuestionsData';
import { AUTHENTIC_BUS330_EXTRACTED_PAST_QUESTIONS } from './bus330PastQuestionsData';
import { AUTHENTIC_BUS322_EXTRACTED_PAST_QUESTIONS } from './bus322PastQuestionsData';
import { BUS330_COURSE, BUS330_QUESTIONS } from './bus330Data';
import { BUS322_COURSE, BUS322_QUESTIONS } from './bus322Data';
import { ECO344_COURSE, ECO344_QUESTIONS } from './eco344Data';
import { GST302_COURSE, GST302_QUESTIONS } from './gst302Data';

export { BUS330_COURSE, BUS330_QUESTIONS } from './bus330Data';
export { BUS322_COURSE, BUS322_QUESTIONS } from './bus322Data';

/**
 * ============================================================================
 * CSC 202: DATA STRUCTURES & ALGORITHMS
 * Clean second course demonstrating multi-course isolation without mixing.
 * ============================================================================
 */
export const CSC202_SECOND_COURSE: Course = {
  id: 'course-csc202-sample',
  code: 'CSC 202',
  title: 'Data Structures and Algorithms',
  department: 'Department of Computer Science',
  description: 'Foundational computer science study material covering asymptotic complexity, linear data structures, tree hierarchies, graph algorithms, and algorithmic paradigm design.',
  createdAt: '2025-01-10T08:00:00Z',
  documents: [
    {
      id: 'doc-csc202-textbook',
      name: 'CSC_202_Data_Structures_and_Algorithms.pdf',
      fileType: 'pdf',
      fileSize: 3120000,
      uploadedAt: '2025-01-10T08:00:00Z',
      pageCount: 160,
      wordCount: 38000,
      status: 'ready',
      summary: 'University textbook on fundamental algorithms, runtime analysis, and dynamic data organization.',
      processingNotes: 'Fully structured syllabus. Completely isolated from management and research methodology content.',
      extractedHeadingsCount: 36,
      isPartiallyProcessed: false
    }
  ],
  modules: [
    {
      id: 'mod-csc-1',
      moduleNumber: 1,
      title: 'Module 1: Algorithm Complexity & Linear Structures',
      units: [
        {
          id: 'unit-csc-1',
          unitNumber: '1.0',
          title: 'Unit 1: Asymptotic Analysis and Big-O Notation',
          objectives: [
            'Define Big-O, Big-Omega, and Big-Theta asymptotic bounds',
            'Analyze worst-case, best-case, and average-case time complexity',
            'Compare constant, logarithmic, linear, and quadratic growth rates'
          ],
          unitRecapPoints: [
            'Big-O represents an asymptotic upper bound on runtime growth.',
            'Linear search is O(n); binary search on a sorted array is O(log n).'
          ],
          topics: [
            {
              id: 'top-csc-1-1',
              title: 'Principles of Asymptotic Time Complexity',
              readingMinutes: 5,
              sourceReference: 'CSC 202 Course Material, Chapter 1, Section 1.2, pp. 8–14',
              textbookDefinitions: [
                {
                  term: 'Big-O Notation',
                  definition: 'A mathematical notation describing the limiting behavior of a function when the argument tends towards infinity, representing the worst-case asymptotic upper bound.',
                  sourceAuthor: 'Cormen et al. (2009)'
                }
              ],
              content: `Asymptotic analysis evaluates algorithm efficiency independently of specific hardware or programming language implementations.

By expressing computational time as a function of input size n, computer scientists classify algorithms into fundamental complexity classes:
- O(1): Constant time (e.g. hash table array lookup)
- O(log n): Logarithmic time (e.g. binary search on sorted collection)
- O(n): Linear time (e.g. sequential scan of an unsorted list)
- O(n log n): Linearithmic time (e.g. Merge Sort and Quick Sort average case)
- O(n^2): Quadratic time (e.g. Bubble Sort, Insertion Sort)`,
              summaryPoints: [
                'Focuses on growth rate as n approaches infinity.',
                'Disregards hardware clock speeds and low-order terms.',
                'Distinguishes worst-case (O), best-case (Ω), and tight bound (Θ).'
              ],
              checkpointQuiz: [
                {
                  id: 'q-csc-1-1-1',
                  prompt: 'Which Big-O complexity class represents an algorithm whose execution time scales logarithmically with input size, such as binary search on a sorted array?',
                  options: [
                    'O(log n)',
                    'O(n^2)',
                    'O(1)',
                    'O(n!)'
                  ],
                  correctIndex: 0,
                  explanation: 'Binary search halves the search space at each iteration, resulting in O(log n) logarithmic time complexity.',
                  origin: 'original_past_question',
                  sourceYear: '2021 Examination',
                  sourceReference: 'CSC 202, Chapter 1, Section 1.2, p. 11'
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};

export const SAMPLE_PAST_QUESTIONS: PastExamQuestionItem[] = [
  ...AUTHENTIC_ENT308_EXTRACTED_PAST_QUESTIONS,
  ...AUTHENTIC_ENT302_EXTRACTED_PAST_QUESTIONS,
  ...AUTHENTIC_ENT304_EXTRACTED_PAST_QUESTIONS,
  ...AUTHENTIC_FMS304_EXTRACTED_PAST_QUESTIONS,
  ...BUS330_QUESTIONS,
  ...AUTHENTIC_BUS330_EXTRACTED_PAST_QUESTIONS,
  ...BUS322_QUESTIONS,
  ...AUTHENTIC_BUS322_EXTRACTED_PAST_QUESTIONS,
  ...ECO344_QUESTIONS,
  ...GST302_QUESTIONS,
];
