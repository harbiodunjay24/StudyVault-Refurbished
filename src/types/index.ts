export type FileType = 'pdf' | 'docx' | 'pptx' | 'txt';

export type UnitStatus =
  | 'locked'
  | 'not_started'
  | 'in_progress'
  | 'assessment_required'
  | 'needs_practice'
  | 'passed'
  | 'completed'
  | 'needs_revision';

export type QuestionType =
  | 'written_definition'
  | 'written_discussion'
  | 'written_difference'
  | 'written_process'
  | 'written_calculation'
  | 'written_short_notes'
  | 'written_structured'
  | 'calculation'
  | 'multiple_choice';

export type ProcessingStatus = 'fully_processed' | 'partially_processed' | 'failed';

export interface StudyDocument {
  id: string;
  name: string;
  fileType: FileType;
  fileSize: number; // in bytes
  uploadedAt: string;
  pageCount?: number;
  wordCount?: number;
  status: 'processing' | 'ready' | 'partial' | 'error';
  processingStatus?: ProcessingStatus;
  verifiedAuthentic?: boolean;
  errorMessage?: string;
  summary?: string;
  processingNotes?: string;
  extractedHeadingsCount?: number;
  isPartiallyProcessed?: boolean;
}

export interface QuizQuestion {
  id: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  optionExplanations?: string[]; // Detailed explanation for why each individual option is right or wrong based on the textbook
  origin: 'original_past_question' | 'ai_generated';
  sourceYear?: string;
  sourceReference?: string;
  linkedTopicId?: string;
  linkedCourseId?: string;
}

export interface WrittenQuestion {
  id: string;
  questionType?: QuestionType;
  prompt: string;
  maxMarks: number; // e.g. 5, 10, 15
  sourceReference: string; // e.g. "ENT 302, Unit 1, Section 3.1, p. 11"
  expectedAnswerGuide: string; // Grounded in textbook
  keyRubricPoints: string[]; // Essential points for scoring
  examinerTips?: string;
  origin?: 'original_textbook_tma' | 'authentic_past_exam' | 'ai_synthesized_practice';
  sourceLabel: string; // e.g. "TMA 1 Question 1" or "Textbook-Grounded Practice"
}

export interface WrittenEvaluationResult {
  questionId: string;
  userAnswer: string;
  score: number; // e.g. 7
  maxMarks: number; // e.g. 10
  passed: boolean; // score >= passMark (default 7/10)
  passMark: number; // default 7
  expectedAnswerGuide: string;
  pointsIncluded: string[];
  pointsMissed: string[];
  inaccurateStatements: string[];
  terminologyCheck: string[];
  corrections: string[];
  suggestedAnswer: string;
  howToImprove: string[];
  sourceReference: string;
  feedbackExplanation: string;
  engineUsed: 'gemini_grounded' | 'textbook_retrieval';
  evaluatedAt: string;
}

export interface AITutorMessage {
  id: string;
  sender: 'user' | 'tutor';
  text: string;
  timestamp: string;
  sourceReference?: string;
  engineUsed?: 'gemini_grounded' | 'textbook_retrieval';
  suggestedFollowUps?: string[];
  courseCode?: string;
}

export interface TextbookDefinition {
  term: string;
  definition: string;
  verbatimDefinition?: string;
  authorCitation?: string;
  sourceAuthor?: string;
}

export interface TextbookTable {
  title: string;
  headers: string[];
  rows: string[][];
  sourceCitation?: string;
}

export interface FormulaVariable {
  symbol: string;
  name: string;
  explanation: string;
  unitOrScale?: string;
  textbookNote?: string;
}

export interface FormulaWorkedExample {
  title: string;
  problemStatement: string;
  givenValues: { symbol: string; label: string; value: string }[];
  steps: { stepNumber: number; description: string; mathExpression: string; explanation: string }[];
  finalResult: string;
  authorInterpretation: string;
  sourceReference?: string;
}

export interface TextbookFormula {
  id: string;
  name: string;
  formulaDisplay: string; // Math display string, e.g. "n = N / [1 + N(e)^2]"
  contextAndPurpose: string;
  variables: FormulaVariable[];
  workedExamples?: FormulaWorkedExample[];
  sourceReference?: string;
}

export interface StudyTopic {
  id: string;
  title: string;
  readingMinutes?: number;
  order?: number;
  content: string; // Verifiable textbook content ONLY
  summaryPoints: string[];
  sourceReference?: string;
  keyTerms?: string[];
  textbookDefinitions?: TextbookDefinition[];
  tables?: TextbookTable[];
  formulas?: TextbookFormula[];
  formulaRules?: any[];
  commonPitfalls?: any[];
  simplifiedExplanation?: {
    analogy: string;
    plainEnglish?: string;
    coreConcept?: string;
    practicalExample?: string;
    keyTakeaway: string;
    examTip?: string;
  };
  writtenQuestions?: WrittenQuestion[];
  checkpointQuiz?: QuizQuestion[];
  isCompleted?: boolean;
}

export interface StudyUnit {
  id: string;
  unitNumber: number | string;
  number?: number | string;
  title: string;
  overview?: string;
  objectives?: string[];
  learningObjectives?: string[];
  topics: StudyTopic[];
  sourceChapter?: string;
  pageRange?: string;
  isComplete?: boolean;
  verificationStatus?: string;
  unitRecapPoints?: string[];
  endOfUnitWrittenExams?: WrittenQuestion[];
  writtenQuestions?: WrittenQuestion[];
}

export interface StudyModule {
  id: string;
  moduleNumber?: number | string;
  order?: number;
  title: string;
  description?: string;
  units: StudyUnit[];
}

export interface PersonalNote {
  id: string;
  courseId: string;
  courseCode: string;
  courseTitle: string;
  unitId?: string;
  unitTitle?: string;
  topicId?: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
}

export interface Bookmark {
  id: string;
  courseId: string;
  unitId: string;
  topicId: string;
  courseTitle: string;
  unitTitle: string;
  topicTitle: string;
  savedAt: string;
}

export type AnswerStatus =
  | 'answer_supplied'
  | 'no_answer_supplied'
  | 'verification_required'
  | 'ai_explanation_available';

export type UnitMappingStatus = 'mapped' | 'requires_review' | 'multi_unit';

export interface PastQuestionDocument {
  id: string;
  courseId: string;
  courseCode: string;
  name: string;
  fileType: FileType;
  fileSize: number;
  uploadedAt: string;
  pageCount?: number;
  processedPagesCount?: number;
  reviewRequiredPagesCount?: number;
  totalMainQuestions?: number;
  totalSubQuestions?: number;
  extractedQuestionsCount: number;
  questionsWithSuppliedAnswersCount: number;
  questionsWithoutSuppliedAnswersCount?: number;
  questionsRequiringReviewCount: number;
  questionsSavedCount?: number;
  status: 'processing' | 'ready' | 'partial' | 'error';
  extractionCompletenessStatus?: 'verified_complete' | 'review_required' | 'partially_processed';
  processingNotes?: string;
  summary?: string;
  examSession?: string;
  isPartiallyProcessed?: boolean;
}

export interface Course {
  id: string;
  code: string; // e.g., "ENT 302" or "FMS 304"
  title: string; // e.g., "Feasibility and Business Planning"
  department?: string; // e.g., "Faculty of Management Sciences"
  description: string;
  colorTheme?: string;
  coverImage?: string;
  createdAt?: string;
  documents: StudyDocument[];
  pastQuestionDocuments?: PastQuestionDocument[];
  modules: StudyModule[];
  lastStudiedTopicId?: string;
  lastStudiedUnitId?: string;
  lastStudiedAt?: string;
}

export interface PastExamQuestionItem {
  id: string;
  courseId: string;
  courseCode: string;
  courseTitle: string;
  unitId?: string;
  documentId?: string;
  documentName?: string;
  linkedUnitId?: string;
  linkedUnitTitle?: string;
  linkedModuleNumber?: number;
  linkedUnitNumber?: number;
  topicTitle?: string;
  year: string; // e.g. "2025_2", "2024_2", "2023_2", "2020_1", "2017"
  session?: string; // e.g. "2025/2026 Second Semester", "POP 2024_2"
  sourceType?: 'uploaded_document' | 'manual_entry' | 'ai_generated' | 'ai_synthesized';
  sourceFileName?: string;
  sourceReference?: string;
  pageNumber?: number | string;
  questionNumber?: number | string;
  originalQuestionNumber?: number | string;
  subQuestion?: string;
  questionText: string;
  questionType?: QuestionType;
  options?: string[];
  correctAnswer?: string; // for MCQ
  modelAnswer?: string; // Examiner's solution / marking guide
  officialAnswer?: string;
  textbookExplanation?: string;
  answerGuide?: string;
  unitOrigin?: string;
  keyRubricPoints?: string[];
  marks?: number;
  totalMarks?: number;
  difficulty?: 'Standard' | 'Challenging' | 'Core' | 'Intermediate';
  examType?: 'TMA' | 'End-of-Semester' | 'POP' | 'E-Exam' | string;
  semester?: string;
  isPastQuestion?: boolean; // true = authentic past exam question, false = generated
  verifiedAuthentic?: boolean;
  // Answer verification & source attribution
  answerStatus?: AnswerStatus;
  suppliedAnswer?: string; // Exact answer printed in the source document
  workedSolutionSteps?: { stepNumber: number; description: string; mathExpression?: string; calculation?: string }[];
  aiExplanation?: string; // Clearly distinguished AI-generated explanation
  unitMappingStatus?: UnitMappingStatus;
  mappedUnitIds?: string[];
  duplicateGroup?: string; // Links identical/recurring examination questions without destroying records
  recurringAppearances?: { year: string; questionNumber: string; documentName: string; marks?: number }[];
  extractionNotes?: string;
}

export interface QuestionMistakeRecord {
  id: string;
  questionId: string;
  questionPrompt: string;
  questionType: 'written' | 'multiple_choice';
  selectedOptionText?: string;
  correctOptionText?: string;
  userAnswer?: string;
  expectedAnswer?: string;
  explanation: string;
  courseId: string;
  courseCode: string;
  topicId: string;
  topicTitle: string;
  timestamp: string;
  reviewed: boolean;
}

export interface UserProgress {
  // Reading tracking
  lastActiveCourseId?: string;
  lastActiveUnitId?: string;
  lastActiveTopicId?: string;
  completedTopicIds: string[];
  unitStatuses: Record<string, UnitStatus>; // unitId -> UnitStatus
  readingMinutesByCourse?: Record<string, number>;
  totalMinutesStudied: number;

  // Revision tracking
  flaggedForRevisionTopicIds: string[];
  revisionCount: number;

  // Assessment tracking
  quizScores: Record<
    string,
    {
      score: number;
      total: number;
      attempts: number;
      timestamp: string;
    }
  >;
  writtenEvaluations: Record<string, WrittenEvaluationResult[]>; // topicId or unitId -> results
  mistakesBank: QuestionMistakeRecord[];
  pastQuestionPracticeRecords?: Record<
    string,
    {
      attempted: boolean;
      userAttempt?: string;
      score?: number;
      passed?: boolean;
      lastAttemptedAt: string;
      flaggedForRevision?: boolean;
    }
  >;

  // Flexible Non-Linear Question Reading & Status
  readQuestionIds?: string[]; // IDs of questions opened and read
  bookmarkedQuestionIds?: string[]; // IDs of questions specifically bookmarked to revisit
  lastOpenedQuestionId?: string; // Last active question ID for quick jump/continue
  recentQuestionHistory?: {
    questionId: string;
    courseId: string;
    courseCode?: string;
    openedAt: string;
    status: 'read' | 'answered' | 'completed' | 'in_progress';
  }[];

  // Cross-device Reading Continuity & Cloud Sync
  lastReadingPositionRatio?: number; // 0 to 100 percentage in reader
  unitReadingPositions?: Record<string, number>; // unitId -> percentage 0 to 100
  lastActiveStudySession?: {
    courseId: string;
    courseCode?: string;
    courseTitle?: string;
    unitId: string;
    unitTitle?: string;
    topicId: string;
    topicTitle?: string;
    readingPositionRatio?: number;
    timestamp: string;
  };
  lastSyncedAt?: string;
  lastSyncedDevice?: string;
}
