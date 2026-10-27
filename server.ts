import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import { PDFParse } from 'pdf-parse';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '50mb' }));

const INSUFFICIENT_INFO_SENTENCE =
  'The PDF does not provide enough information to answer this confidently.';

import { cloudDb } from './src/server/cloudStore';

// API Status & Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    hasGeminiKey: Boolean(process.env.GEMINI_API_KEY),
    model: 'gemini-3.8-flash',
    cloudPersistence: 'enabled',
    userAccounts: cloudDb.getAllUsersCount(),
  });
});

// Auth Middleware
const authenticateUser = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : (req.query.token as string);
  if (!token) {
    return res.status(401).json({ error: 'unauthorized', message: 'Authentication required' });
  }
  const user = cloudDb.getUserByToken(token);
  if (!user) {
    return res.status(401).json({ error: 'invalid_token', message: 'Session expired or invalid. Please sign in again.' });
  }
  (req as any).user = user;
  next();
};

// --- AUTHENTICATION ROUTES ---

// Register new account
app.post('/api/auth/register', (req, res) => {
  try {
    const { displayName, email, password } = req.body;
    if (!email || !displayName) {
      return res.status(400).json({ error: 'missing_fields', message: 'Email and display name are required' });
    }
    const result = cloudDb.registerUser(displayName, email, password);
    res.json({ success: true, ...result });
  } catch (err: any) {
    res.status(400).json({ error: 'registration_failed', message: err.message || 'Registration failed' });
  }
});

// Login
app.post('/api/auth/login', (req, res) => {
  try {
    const { email, password, deviceInfo } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'missing_email', message: 'Email is required' });
    }
    const result = cloudDb.loginUser(email, password, deviceInfo);
    res.json({ success: true, ...result });
  } catch (err: any) {
    res.status(401).json({ error: 'login_failed', message: err.message || 'Login failed' });
  }
});

// Password Recovery / Reset
app.post('/api/auth/recover', (req, res) => {
  try {
    const { email, newPassword } = req.body;
    if (!email || !newPassword) {
      return res.status(400).json({ error: 'missing_fields', message: 'Email and new password are required' });
    }
    cloudDb.resetPassword(email, newPassword);
    res.json({ success: true, message: 'Password reset successfully. You can now sign in with your new password.' });
  } catch (err: any) {
    res.status(400).json({ error: 'recovery_failed', message: err.message || 'Password reset failed' });
  }
});

// Verify Current User Session
app.get('/api/auth/me', authenticateUser, (req, res) => {
  res.json({ success: true, user: (req as any).user });
});

// --- CLOUD PROGRESS SYNCHRONIZATION ROUTES ---

// Pull latest user learning progress, notes, bookmarks, and last session
app.get('/api/sync/pull', authenticateUser, (req, res) => {
  try {
    const user = (req as any).user;
    const cloudRecord = cloudDb.getProgress(user.id);
    res.json({
      success: true,
      userId: user.id,
      progress: cloudRecord.progress,
      notes: cloudRecord.notes,
      bookmarks: cloudRecord.bookmarks,
      customPastQuestions: cloudRecord.customPastQuestions || [],
      customCourses: cloudRecord.customCourses || [],
      voiceSettings: cloudRecord.voiceSettings,
      lastActiveStudySession: cloudRecord.lastActiveStudySession,
      unitReadingPositions: cloudRecord.unitReadingPositions,
      version: cloudRecord.version,
      updatedAt: cloudRecord.updatedAt,
      lastSyncedDevice: cloudRecord.lastSyncedDevice,
    });
  } catch (err: any) {
    console.error('Error in /api/sync/pull:', err);
    res.status(500).json({ error: 'sync_pull_failed', message: err.message });
  }
});

// Push local progress changes to cloud with 3-way merge conflict resolution
app.post('/api/sync/push', authenticateUser, (req, res) => {
  try {
    const user = (req as any).user;
    const {
      progress,
      notes,
      bookmarks,
      customPastQuestions,
      customCourses,
      voiceSettings,
      lastActiveStudySession,
      unitReadingPositions,
      deviceInfo,
    } = req.body;

    const updatedRecord = cloudDb.pushProgress(user.id, {
      progress: progress || {},
      notes: notes || [],
      bookmarks: bookmarks || [],
      customPastQuestions: customPastQuestions || [],
      customCourses: customCourses || [],
      voiceSettings,
      lastActiveStudySession,
      unitReadingPositions,
      deviceInfo: deviceInfo || req.headers['user-agent'] || 'Web Client',
    });

    res.json({
      success: true,
      message: 'Progress successfully saved to cloud and synchronized.',
      version: updatedRecord.version,
      updatedAt: updatedRecord.updatedAt,
      mergedRecord: {
        progress: updatedRecord.progress,
        notes: updatedRecord.notes,
        bookmarks: updatedRecord.bookmarks,
        customPastQuestions: updatedRecord.customPastQuestions,
        customCourses: updatedRecord.customCourses,
        voiceSettings: updatedRecord.voiceSettings,
        lastActiveStudySession: updatedRecord.lastActiveStudySession,
        unitReadingPositions: updatedRecord.unitReadingPositions,
      },
    });
  } catch (err: any) {
    console.error('Error in /api/sync/push:', err);
    res.status(500).json({ error: 'sync_push_failed', message: err.message });
  }
});

// High-speed lightweight progress delta sync (5KB payload vs 3.5MB full library)
app.post('/api/sync/progress', authenticateUser, (req, res) => {
  try {
    const user = (req as any).user;
    const {
      progress,
      notes,
      bookmarks,
      voiceSettings,
      lastActiveStudySession,
      unitReadingPositions,
      deviceInfo,
    } = req.body;

    const result = cloudDb.pushProgressDelta(user.id, {
      progress: progress || {},
      notes: notes || [],
      bookmarks: bookmarks || [],
      voiceSettings,
      lastActiveStudySession,
      unitReadingPositions,
      deviceInfo: deviceInfo || req.headers['user-agent'] || 'Web Client',
    });

    res.json({
      success: true,
      message: 'Progress delta persisted.',
      version: result.version,
      updatedAt: result.updatedAt,
    });
  } catch (err: any) {
    console.error('Error in /api/sync/progress:', err);
    res.status(500).json({ error: 'sync_progress_failed', message: err.message });
  }
});

// Sync Status check
app.get('/api/sync/status', authenticateUser, (req, res) => {
  const user = (req as any).user;
  const cloudRecord = cloudDb.getProgress(user.id);
  res.json({
    status: 'connected',
    userId: user.id,
    userDisplayName: user.displayName,
    version: cloudRecord.version,
    lastSyncedAt: cloudRecord.updatedAt,
  });
});

// PDF Extraction Route - Authoritative document parser directly from uploaded binary
app.post('/api/extract-pdf', async (req, res) => {
  try {
    const { fileBase64, filename } = req.body;
    if (!fileBase64) {
      return res.status(400).json({ error: 'fileBase64 is required' });
    }

    const binaryBuffer = Buffer.from(fileBase64, 'base64');
    const pdfParser = new PDFParse(new Uint8Array(binaryBuffer));
    const parseResult = await pdfParser.getText();

    const fullText = parseResult.text || '';
    const totalPages = parseResult.total || 1;
    const words = fullText.split(/\s+/).filter(Boolean);
    const wordCount = words.length;

    // Detect Course Code & Course Title from original text
    const codeRegex = /(?:COURSE\s+CODE|COURSE|CODE)\s*[:\-\=]?\s*([A-Za-z]{2,4}\s?\d{3,4})/i;
    const titleRegex = /(?:COURSE\s+TITLE|TITLE)\s*[:\-\=]?\s*([A-Za-z0-9\s,\-\&]{4,60})/i;
    const codeMatch = fullText.slice(0, 5000).match(codeRegex);
    const titleMatch = fullText.slice(0, 5000).match(titleRegex);

    let detectedCode = codeMatch ? codeMatch[1].toUpperCase().replace(/\s+/, ' ').trim() : undefined;
    let detectedTitle = titleMatch ? titleMatch[1].trim() : undefined;

    // Fallback to filename detection
    if (!detectedCode && filename) {
      const fileCodeMatch = filename.match(/([A-Za-z]{2,4}[-_\s]?\d{3,4})/i);
      if (fileCodeMatch) {
        detectedCode = fileCodeMatch[1].toUpperCase().replace(/[-_]/, ' ').trim();
      }
    }

    if (!detectedTitle && filename) {
      const clean = filename.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
      if (detectedCode && clean.toUpperCase().includes(detectedCode.replace(' ', ''))) {
        const rest = clean.replace(new RegExp(detectedCode, 'i'), '').trim();
        if (rest.length > 3) detectedTitle = rest;
      }
    }

    // Identify structural units directly from the textbook text
    const lines = fullText.split(/\r?\n/);
    const extractedUnits: { unitNumber: string; title: string; textSample: string; wordCount: number }[] = [];
    let currentUnitNum = '1.0';
    let currentUnitTitle = detectedTitle ? `Unit 1: ${detectedTitle}` : 'Unit 1';
    let currentUnitLines: string[] = [];

    lines.forEach((line) => {
      const trimmed = line.trim();
      const unitHeaderMatch = trimmed.match(/^(?:UNIT|Unit)\s+(\d+(?:\.\d+)?)\s*[:\-–]?\s*(.*)$/i);
      if (unitHeaderMatch && currentUnitLines.length > 10) {
        extractedUnits.push({
          unitNumber: currentUnitNum,
          title: currentUnitTitle,
          textSample: currentUnitLines.join('\n').trim(),
          wordCount: currentUnitLines.join(' ').split(/\s+/).filter(Boolean).length,
        });
        currentUnitNum = unitHeaderMatch[1];
        currentUnitTitle = unitHeaderMatch[2] ? `Unit ${unitHeaderMatch[1]}: ${unitHeaderMatch[2]}` : `Unit ${unitHeaderMatch[1]}`;
        currentUnitLines = [];
      } else {
        currentUnitLines.push(line);
      }
    });

    if (currentUnitLines.length > 0) {
      extractedUnits.push({
        unitNumber: currentUnitNum,
        title: currentUnitTitle,
        textSample: currentUnitLines.join('\n').trim(),
        wordCount: currentUnitLines.join(' ').split(/\s+/).filter(Boolean).length,
      });
    }

    res.json({
      success: true,
      totalPages,
      wordCount,
      detectedCode: detectedCode || 'GEN 101',
      detectedTitle: detectedTitle || filename?.replace(/\.[^/.]+$/, '') || 'Course Study Material',
      extractedUnitsCount: extractedUnits.length,
      units: extractedUnits,
      fullTextPreview: fullText.slice(0, 100000),
    });
  } catch (error: any) {
    console.error('PDF extraction error in server:', error);
    res.status(500).json({
      error: 'pdf_extraction_failed',
      message: error?.message || 'Failed to extract PDF content',
    });
  }
});

// Global shared GoogleGenAI client with official aistudio-build header
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// In-memory study response cache for instant retrieval (< 5ms) on repeat questions
interface CacheEntry {
  reply: string;
  sourceReference: string;
  engine: string;
  model: string;
  timestamp: number;
}
const aiResponseCache = new Map<string, CacheEntry>();
const CACHE_TTL_MS = 30 * 60 * 1000; // 30 mins

function buildCacheKey(courseCode: string, question: string, unitTitle?: string, topicTitle?: string): string {
  return `${(courseCode || 'all').toLowerCase()}::${(unitTitle || '').toLowerCase()}::${(topicTitle || '').toLowerCase()}::${question.trim().toLowerCase()}`;
}

// Resilient AI generation with flash-lite primary model (ultra-fast ~1s) & flash fallback
async function generateGroundedResponse(
  contents: any,
  systemInstruction: string,
  temperature = 0.25
): Promise<{ text: string; model: string }> {
  // 1. Try gemini-3.1-flash-lite (fastest latency for academic study queries)
  try {
    const res = await ai.models.generateContent({
      model: 'gemini-3.1-flash-lite',
      contents,
      config: {
        systemInstruction,
        temperature,
      },
    });
    if (res.text) {
      return { text: res.text, model: 'gemini-3.1-flash-lite' };
    }
  } catch (err: any) {
    console.warn('Primary model gemini-3.1-flash-lite fallback:', err?.message || err);
  }

  // 2. Secondary fallback to gemini-3.8-flash
  try {
    const res = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents,
      config: {
        systemInstruction,
        temperature,
      },
    });
    if (res.text) {
      return { text: res.text, model: 'gemini-3.8-flash' };
    }
  } catch (err: any) {
    console.warn('Secondary model gemini-3.8-flash failed:', err?.message || err);
    throw err;
  }

  throw new Error('All AI generation models exhausted');
}

// AI Tutor Chat Route with strict textbook grounding & caching
app.post('/api/chat', async (req, res) => {
  try {
    const {
      courseCode,
      courseTitle,
      unitTitle,
      topicTitle,
      question,
      messages,
      textbookPassages,
    } = req.body;

    if (!question || typeof question !== 'string') {
      return res.status(400).json({ error: 'Question is required' });
    }

    // Check cache for instant response (< 5ms)
    const cacheKey = buildCacheKey(courseCode, question, unitTitle, topicTitle);
    const cached = aiResponseCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
      return res.json({
        reply: cached.reply,
        sourceReference: cached.sourceReference,
        engine: 'gemini_grounded',
        model: cached.model,
        cached: true,
      });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(503).json({
        error: 'api_key_missing',
        message: 'Server GEMINI_API_KEY is not configured. Falling back to local textbook retrieval engine.',
      });
    }

    // Build concise textbook grounding context (limit to top 4 relevant passages for speed & precision)
    const topPassages = Array.isArray(textbookPassages) ? textbookPassages.slice(0, 4) : [];
    if (topPassages.length === 0) {
      return res.json({
        reply: INSUFFICIENT_INFO_SENTENCE,
        sourceReference: courseCode || 'StudyVault Library',
        engine: 'textbook_retrieval',
        model: 'grounding_safeguard',
      });
    }
    const passagesText = topPassages.map((p: any, idx: number) => `
[PASSAGE ${idx + 1}]
Source Reference: ${p.reference || `${courseCode || 'Course Material'}, ${unitTitle || 'Unit'}`}
Topic: ${p.title}
Textbook Content:
${p.content}
${Array.isArray(p.definitions) && p.definitions.length > 0 ? `Definitions: ${p.definitions.map((d: any) => `${d.term}: ${d.definition} (${d.sourceAuthor || ''})`).join('; ')}` : ''}
${p.simplified ? `Key Takeaway: ${p.simplified.keyTakeaway}` : ''}
`).join('\n---\n');

    const isGeneralLibrary = !courseCode || courseCode === 'ALL_COURSES' || courseTitle?.includes('All Courses');

    const systemInstruction = `You are StudyVault AI Assistant, the intelligent academic study companion for the student's uploaded textbooks${isGeneralLibrary ? ' across all enrolled courses' : ` for "${courseCode}: ${courseTitle}"`}.

STRICT TEXTBOOK KNOWLEDGE & ACCURACY POLICY:
1. The uploaded course textbook passages provided below are your authoritative source of academic knowledge.
2. Preserve original definitions, terminology, classifications, theories, named authors, formulas, and distinctions from the textbooks.
3. You can answer questions about any course in the student's library, compare concepts across multiple courses when asked (e.g. comparing ENT 304 and ENT 308), explain difficult passages in clear everyday English, and provide relevant examples grounded in the textbooks.
4. If the provided textbook passages do NOT contain enough information to answer confidently, return EXACTLY this sentence: "${INSUFFICIENT_INFO_SENTENCE}"
5. When explaining, make difficult concepts easier to understand in clear, accessible language with analogies without changing their academic meaning.
6. Always cite the relevant course, unit, or section reference from the provided passages.

VERIFIED TEXTBOOK PASSAGES:
${passagesText}`;

    const formattedHistory = Array.isArray(messages)
      ? messages.slice(-4).map((m: any) => ({
          role: m.role === 'user' ? 'user' : 'model',
          parts: [{ text: m.content }],
        }))
      : [];

    const contents = [
      ...formattedHistory,
      {
        role: 'user',
        parts: [{ text: question }],
      },
    ];

    const { text, model } = await generateGroundedResponse(contents, systemInstruction, 0.25);
    const reply = text || INSUFFICIENT_INFO_SENTENCE;
    const firstRef = topPassages[0]?.reference || `${courseCode || 'StudyVault Library'}, ${unitTitle || 'Textbook'}`;

    // Store in cache
    aiResponseCache.set(cacheKey, {
      reply,
      sourceReference: firstRef,
      engine: 'gemini_grounded',
      model,
      timestamp: Date.now(),
    });

    res.json({
      reply,
      sourceReference: firstRef,
      engine: 'gemini_grounded',
      model,
    });
  } catch (error: any) {
    console.error('Gemini chat proxy error:', error);
    res.status(500).json({
      error: 'generation_failed',
      message: error?.message || 'Failed to generate response',
    });
  }
});

// AI Tutor Chat Streaming Route (Server-Sent Events) for instant progressive display
app.post('/api/chat/stream', async (req, res) => {
  try {
    const {
      courseCode,
      courseTitle,
      unitTitle,
      topicTitle,
      question,
      messages,
      textbookPassages,
    } = req.body;

    if (!question || typeof question !== 'string') {
      return res.status(400).json({ error: 'Question is required' });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(503).json({
        error: 'api_key_missing',
        message: 'Server GEMINI_API_KEY is not configured.',
      });
    }

    // Set up SSE headers
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache, no-transform');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('X-Accel-Buffering', 'no');
    res.flushHeaders?.();

    // Check cache
    const cacheKey = buildCacheKey(courseCode, question, unitTitle, topicTitle);
    const cached = aiResponseCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
      res.write(`event: chunk\ndata: ${JSON.stringify({ text: cached.reply })}\n\n`);
      res.write(
        `event: done\ndata: ${JSON.stringify({
          sourceReference: cached.sourceReference,
          engine: 'gemini_grounded',
          model: cached.model,
          cached: true,
        })}\n\n`
      );
      res.end();
      return;
    }

    const topPassages = Array.isArray(textbookPassages) ? textbookPassages.slice(0, 4) : [];
    if (topPassages.length === 0) {
      res.write(`event: chunk\ndata: ${JSON.stringify({ text: INSUFFICIENT_INFO_SENTENCE })}\n\n`);
      res.write(
        `event: done\ndata: ${JSON.stringify({
          sourceReference: courseCode || 'StudyVault Library',
          engine: 'textbook_retrieval',
          model: 'grounding_safeguard',
          cached: false,
        })}\n\n`
      );
      res.end();
      return;
    }
    const passagesText = topPassages.map((p: any, idx: number) => `
[PASSAGE ${idx + 1}]
Source Reference: ${p.reference || `${courseCode || 'Course Material'}, ${unitTitle || 'Unit'}`}
Topic: ${p.title}
Textbook Content:
${p.content}
${Array.isArray(p.definitions) && p.definitions.length > 0 ? `Definitions: ${p.definitions.map((d: any) => `${d.term}: ${d.definition} (${d.sourceAuthor || ''})`).join('; ')}` : ''}
${p.simplified ? `Key Takeaway: ${p.simplified.keyTakeaway}` : ''}
`).join('\n---\n');

    const isGeneralLibrary = !courseCode || courseCode === 'ALL_COURSES' || courseTitle?.includes('All Courses');

    const systemInstruction = `You are StudyVault AI Assistant, the intelligent academic study companion for the student's uploaded textbooks${isGeneralLibrary ? ' across all enrolled courses' : ` for "${courseCode}: ${courseTitle}"`}.

STRICT TEXTBOOK KNOWLEDGE & ACCURACY POLICY:
1. The uploaded course textbook passages provided below are your authoritative source of academic knowledge.
2. Preserve original definitions, terminology, classifications, theories, named authors, formulas, and distinctions from the textbooks.
3. You can answer questions about any course in the student's library, compare concepts across multiple courses when asked (e.g. comparing ENT 304 and ENT 308), explain difficult passages in clear everyday English, and provide relevant examples grounded in the textbooks.
4. If the provided textbook passages do NOT contain enough information to answer confidently, return EXACTLY this sentence: "${INSUFFICIENT_INFO_SENTENCE}"
5. When explaining, make difficult concepts easier to understand in clear, accessible language with analogies without changing their academic meaning.
6. Always cite the relevant course, unit, or section reference from the provided passages.

VERIFIED TEXTBOOK PASSAGES:
${passagesText}`;

    const formattedHistory = Array.isArray(messages)
      ? messages.slice(-4).map((m: any) => ({
          role: m.role === 'user' ? 'user' : 'model',
          parts: [{ text: m.content }],
        }))
      : [];

    const contents = [
      ...formattedHistory,
      {
        role: 'user',
        parts: [{ text: question }],
      },
    ];

    let fullAccumulated = '';
    let selectedModel = 'gemini-3.1-flash-lite';
    let stream: any = null;

    try {
      stream = await ai.models.generateContentStream({
        model: 'gemini-3.1-flash-lite',
        contents,
        config: {
          systemInstruction,
          temperature: 0.25,
        },
      });
    } catch {
      selectedModel = 'gemini-3.8-flash';
      stream = await ai.models.generateContentStream({
        model: 'gemini-3.8-flash',
        contents,
        config: {
          systemInstruction,
          temperature: 0.25,
        },
      });
    }

    let clientDisconnected = false;
    req.on('close', () => {
      clientDisconnected = true;
    });

    for await (const chunk of stream) {
      if (clientDisconnected) break;
      const chunkText = chunk.text || '';
      if (chunkText) {
        fullAccumulated += chunkText;
        res.write(`event: chunk\ndata: ${JSON.stringify({ text: chunkText })}\n\n`);
      }
    }

    const firstRef = topPassages[0]?.reference || `${courseCode || 'StudyVault Library'}, ${unitTitle || 'Textbook'}`;

    if (!clientDisconnected) {
      // Cache completed response
      if (fullAccumulated) {
        aiResponseCache.set(cacheKey, {
          reply: fullAccumulated,
          sourceReference: firstRef,
          engine: 'gemini_grounded',
          model: selectedModel,
          timestamp: Date.now(),
        });
      }

      res.write(
        `event: done\ndata: ${JSON.stringify({
          sourceReference: firstRef,
          engine: 'gemini_grounded',
          model: selectedModel,
        })}\n\n`
      );
      res.end();
    }
  } catch (error: any) {
    console.error('Gemini streaming proxy error:', error);
    if (!res.headersSent) {
      res.status(500).json({ error: 'stream_failed', message: error?.message || 'Failed to stream' });
    } else {
      res.write(`event: error\ndata: ${JSON.stringify({ message: error?.message || 'Streaming interrupted' })}\n\n`);
      res.end();
    }
  }
});

// Unit Written Exam Evaluation Route (Fast & Grounded)
app.post('/api/evaluate', async (req, res) => {
  try {
    const { question, userAnswer, passMark = 7 } = req.body;

    if (!question || !userAnswer) {
      return res.status(400).json({ error: 'Question and userAnswer are required' });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(503).json({
        error: 'api_key_missing',
        message: 'Server GEMINI_API_KEY is not configured. Falling back to local textbook rubric evaluator.',
      });
    }

    const systemInstruction = `You are the official Academic Examiner for StudyVault AI.
You evaluate student written examination responses strictly against the official course textbook marking scheme and rubric points.

EVALUATION RULES:
1. Award an integer score out of ${question.maxMarks || 10}.
2. The pass mark is ${passMark} out of ${question.maxMarks || 10}. A score of ${passMark} or above is "Passed"; below is "Not Yet Passed".
3. Do NOT penalize the student simply because sentence structure differs from the textbook. Accept different wording when it accurately expresses the same meaning and includes the necessary concepts.
4. Assess:
   - Whether the student understands the question.
   - Whether important rubric points are included.
   - Whether the explanation is accurate.
   - Whether key concepts or technical terms were omitted or misused.
   - Whether any incorrect claims or contradictions were made.
5. Provide structured JSON matching:
{
  "score": number, // 0 to ${question.maxMarks || 10}
  "passed": boolean, // score >= ${passMark}
  "pointsIncluded": string[], // points accurately covered
  "pointsMissed": string[], // essential concepts left out
  "inaccurateStatements": string[], // inaccurate claims
  "terminologyCheck": string[], // analysis of technical terms
  "corrections": string[], // specific corrections using the textbook
  "suggestedAnswer": string, // model answer based on the textbook
  "howToImprove": string[], // actionable advice
  "feedbackExplanation": string // scannable summary
}`;

    const prompt = `QUESTION PROMPT:
${question.prompt}

SOURCE REFERENCE:
${question.sourceReference}

OFFICIAL TEXTBOOK MODEL ANSWER:
${question.expectedAnswerGuide}

KEY RUBRIC POINTS:
${JSON.stringify(question.keyRubricPoints)}

STUDENT'S WRITTEN RESPONSE:
"${userAnswer}"

Please evaluate and output strictly valid JSON according to the instructions.`;

    // Try fast model first with 3.8-flash fallback
    let responseText = '{}';
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.1-flash-lite',
        contents: prompt,
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
          temperature: 0.1,
        },
      });
      responseText = response.text || '{}';
    } catch {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
          temperature: 0.1,
        },
      });
      responseText = response.text || '{}';
    }

    const parsed = JSON.parse(responseText);
    res.json(parsed);
  } catch (error: any) {
    console.error('Gemini evaluation proxy error:', error);
    res.status(500).json({
      error: 'evaluation_failed',
      message: error?.message || 'Evaluation failed',
    });
  }
});

// Mount Vite middleware in development
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`StudyVault AI full-stack server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
