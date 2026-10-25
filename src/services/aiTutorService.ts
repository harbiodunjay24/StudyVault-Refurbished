import { Course, AITutorMessage, StudyTopic, StudyUnit } from '../types';

export const INSUFFICIENT_INFORMATION_SENTENCE =
  'The PDF does not provide enough information to answer this confidently.';

export interface TutorQueryContext {
  course?: Course;
  courses?: Course[];
  selectedScope?: string; // 'all' or specific courseId
  activeUnit?: StudyUnit | null;
  activeTopic?: StudyTopic | null;
  conversationHistory: AITutorMessage[];
}

export interface AITutorResponse {
  text: string;
  sourceReference?: string;
  engineUsed: 'gemini_grounded' | 'textbook_retrieval';
  suggestedFollowUps: string[];
}

// Client-side quick response cache for instant answers (< 5ms) on repeat queries
const localQueryCache = new Map<string, AITutorResponse>();

/**
 * Progressive streaming AI Tutor query dispatcher.
 * Delivers immediate token chunks to the UI via onChunk callback as they arrive,
 * with graceful fallback to local semantic retrieval.
 */
export async function askAITutorStream(
  question: string,
  context: TutorQueryContext,
  onChunk: (chunk: string, accumulated: string) => void,
  signal?: AbortSignal
): Promise<AITutorResponse> {
  const trimmed = question.trim();
  if (!trimmed) {
    return {
      text: 'Please ask an academic question about your course materials or request an explanation.',
      engineUsed: 'textbook_retrieval',
      suggestedFollowUps: [
        'Explain this in simpler English',
        'Compare ENT 304 and ENT 308 concepts',
        'Ask me a 10-mark examination question'
      ],
    };
  }

  // Check client-side cache
  const cacheKey = `${(context.course?.code || 'all').toLowerCase()}::${(context.activeUnit?.id || '').toLowerCase()}::${trimmed.toLowerCase()}`;
  const cached = localQueryCache.get(cacheKey);
  if (cached) {
    onChunk(cached.text, cached.text);
    return cached;
  }

  // Determine list of courses to search based on scope
  const targetCourses: Course[] = [];
  if (context.selectedScope && context.selectedScope !== 'all') {
    const matched = context.courses?.find((c) => c.id === context.selectedScope) || context.course;
    if (matched) targetCourses.push(matched);
  } else if (context.courses && context.courses.length > 0) {
    targetCourses.push(...context.courses);
  } else if (context.course) {
    targetCourses.push(context.course);
  }

  // Gather relevant textbook passages from target courses
  const retrievedPassages = retrievePassagesFromCourses(
    trimmed,
    targetCourses,
    context.activeUnit,
    context.activeTopic
  );

  const isCrossCourse = targetCourses.length > 1;
  const primaryCourse = targetCourses[0] || context.course;

  if (retrievedPassages.length === 0) {
    const fallbackRes: AITutorResponse = {
      text: INSUFFICIENT_INFORMATION_SENTENCE,
      sourceReference: primaryCourse ? `${primaryCourse.code}: ${primaryCourse.title}` : 'Library Materials',
      engineUsed: 'textbook_retrieval',
      suggestedFollowUps: [
        'What core topics are covered in my textbooks?',
        'Explain leadership theories in simpler English',
        'Explain corporate governance codes'
      ],
    };
    onChunk(fallbackRes.text, fallbackRes.text);
    return fallbackRes;
  }

  const payload = {
    courseCode: isCrossCourse ? 'ALL_COURSES' : primaryCourse?.code,
    courseTitle: isCrossCourse ? 'All Library Courses' : primaryCourse?.title,
    unitTitle: context.activeUnit?.title,
    topicTitle: context.activeTopic?.title,
    question: trimmed,
    messages: context.conversationHistory.slice(-4).map((m) => ({
      role: m.sender === 'user' ? 'user' : 'model',
      content: m.text,
    })),
    textbookPassages: retrievedPassages.slice(0, 4).map((p) => ({
      title: p.topic.title,
      reference: p.topic.sourceReference || `${p.courseCode}, ${p.unitTitle}`,
      content: p.topic.content,
      definitions: p.topic.textbookDefinitions || [],
      simplified: p.topic.simplifiedExplanation,
      summaryPoints: p.topic.summaryPoints || [],
    })),
  };

  // Attempt progressive SSE streaming
  try {
    const res = await fetch('/api/chat/stream', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal,
    });

    if (res.ok && res.body) {
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedText = '';
      let serverMeta: any = null;
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (!line.trim()) continue;
          const matchEvent = line.match(/^event:\s*(\w+)/m);
          const matchData = line.match(/^data:\s*(.+)$/m);
          const eventType = matchEvent ? matchEvent[1] : 'chunk';
          const dataRaw = matchData ? matchData[1] : '';

          if (eventType === 'chunk' && dataRaw) {
            try {
              const parsed = JSON.parse(dataRaw);
              if (parsed.text) {
                accumulatedText += parsed.text;
                onChunk(parsed.text, accumulatedText);
              }
            } catch {
              // ignore parse errors on fragmented data
            }
          } else if (eventType === 'done' && dataRaw) {
            try {
              serverMeta = JSON.parse(dataRaw);
            } catch {
              // ignore
            }
          }
        }
      }

      if (accumulatedText) {
        const finalResponse: AITutorResponse = {
          text: accumulatedText,
          sourceReference:
            serverMeta?.sourceReference ||
            retrievedPassages[0].topic.sourceReference ||
            `${retrievedPassages[0].courseCode}, ${retrievedPassages[0].unitTitle}`,
          engineUsed: 'gemini_grounded',
          suggestedFollowUps: generateFollowUps(trimmed, retrievedPassages[0].topic, isCrossCourse),
        };
        localQueryCache.set(cacheKey, finalResponse);
        return finalResponse;
      }
    }
  } catch (err: any) {
    if (err?.name === 'AbortError') {
      throw err;
    }
    // Fall back to non-streaming or local retrieval
  }

  // Fallback to standard askAITutor
  const standardRes = await askAITutor(question, context);
  onChunk(standardRes.text, standardRes.text);
  return standardRes;
}

/**
 * Main AI Tutor query dispatcher.
 * Supports single course scope or library-wide cross-course tutoring and comparisons.
 * Tries server-side Gemini API proxy (/api/chat) with strict textbook grounding.
 * If backend API key is unavailable or offline, uses local high-precision semantic retrieval.
 */
export async function askAITutor(
  question: string,
  context: TutorQueryContext
): Promise<AITutorResponse> {
  const trimmed = question.trim();
  if (!trimmed) {
    return {
      text: 'Please ask an academic question about your course materials or request an explanation.',
      engineUsed: 'textbook_retrieval',
      suggestedFollowUps: [
        'Explain this in simpler English',
        'Compare ENT 304 and ENT 308 concepts',
        'Ask me a 10-mark examination question'
      ],
    };
  }

  // Check client-side cache
  const cacheKey = `${(context.course?.code || 'all').toLowerCase()}::${(context.activeUnit?.id || '').toLowerCase()}::${trimmed.toLowerCase()}`;
  const cached = localQueryCache.get(cacheKey);
  if (cached) {
    return cached;
  }

  // Determine list of courses to search based on scope
  const targetCourses: Course[] = [];
  if (context.selectedScope && context.selectedScope !== 'all') {
    const matched = context.courses?.find((c) => c.id === context.selectedScope) || context.course;
    if (matched) targetCourses.push(matched);
  } else if (context.courses && context.courses.length > 0) {
    targetCourses.push(...context.courses);
  } else if (context.course) {
    targetCourses.push(context.course);
  }

  // Gather relevant textbook passages from target courses
  const retrievedPassages = retrievePassagesFromCourses(
    trimmed,
    targetCourses,
    context.activeUnit,
    context.activeTopic
  );

  const isCrossCourse = targetCourses.length > 1;
  const primaryCourse = targetCourses[0] || context.course;

  // If no passages found at all
  if (retrievedPassages.length === 0) {
    return {
      text: INSUFFICIENT_INFORMATION_SENTENCE,
      sourceReference: primaryCourse ? `${primaryCourse.code}: ${primaryCourse.title}` : 'Library Materials',
      engineUsed: 'textbook_retrieval',
      suggestedFollowUps: [
        'What core topics are covered in my textbooks?',
        'Explain leadership theories in simpler English',
        'Explain corporate governance codes'
      ],
    };
  }

  // Attempt server-side Gemini generation with textbook grounding
  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        courseCode: isCrossCourse ? 'ALL_COURSES' : primaryCourse?.code,
        courseTitle: isCrossCourse ? 'All Library Courses' : primaryCourse?.title,
        unitTitle: context.activeUnit?.title,
        topicTitle: context.activeTopic?.title,
        question: trimmed,
        messages: context.conversationHistory.slice(-4).map((m) => ({
          role: m.sender === 'user' ? 'user' : 'model',
          content: m.text,
        })),
        textbookPassages: retrievedPassages.slice(0, 4).map((p) => ({
          title: p.topic.title,
          reference: p.topic.sourceReference || `${p.courseCode}, ${p.unitTitle}`,
          content: p.topic.content,
          definitions: p.topic.textbookDefinitions || [],
          simplified: p.topic.simplifiedExplanation,
          summaryPoints: p.topic.summaryPoints || [],
        })),
      }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data && data.reply) {
        const responseObj: AITutorResponse = {
          text: data.reply,
          sourceReference:
            data.sourceReference ||
            retrievedPassages[0].topic.sourceReference ||
            `${retrievedPassages[0].courseCode}, ${retrievedPassages[0].unitTitle}`,
          engineUsed: 'gemini_grounded',
          suggestedFollowUps:
            data.suggestedFollowUps || generateFollowUps(trimmed, retrievedPassages[0].topic, isCrossCourse),
        };
        localQueryCache.set(cacheKey, responseObj);
        return responseObj;
      }
    }
  } catch {
    // Graceful fallback to local semantic textbook retrieval
  }

  // Fallback to local high-precision textbook retrieval response
  const localRes = generateTextbookRetrievedResponse(trimmed, retrievedPassages, targetCourses, context);
  localQueryCache.set(cacheKey, localRes);
  return localRes;
}

export interface RetrievedCourseMatch {
  courseCode: string;
  courseTitle: string;
  unitTitle: string;
  topic: StudyTopic;
  relevanceScore: number;
}

/**
 * Searches across one or multiple courses for relevant textbook sections.
 */
function retrievePassagesFromCourses(
  query: string,
  courses: Course[],
  activeUnit?: StudyUnit | null,
  activeTopic?: StudyTopic | null
): RetrievedCourseMatch[] {
  const normQuery = query.toLowerCase();
  const queryTokens = normQuery.replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter((w) => w.length >= 3);
  const matches: RetrievedCourseMatch[] = [];

  const isContextualQuery = /this\s+(section|unit|topic|paragraph|page)|here|explain\s+it/i.test(query);

  courses.forEach((course) => {
    course.modules.forEach((mod) => {
      mod.units.forEach((u) => {
        u.topics.forEach((t) => {
          let score = 0;

          // Course code match bonus
          if (normQuery.includes(course.code.toLowerCase()) || normQuery.includes(course.code.toLowerCase().replace(/\s+/g, ''))) {
            score += 10;
          }

          // Contextual boost if active topic/unit
          if (activeTopic && t.id === activeTopic.id) {
            if (isContextualQuery) score += 20;
            score += 4;
          } else if (activeUnit && u.id === activeUnit.id) {
            score += 2;
          }

          // Match against title
          const lowerTitle = t.title.toLowerCase();
          queryTokens.forEach((tok) => {
            if (lowerTitle.includes(tok)) score += 5;
          });

          // Match against definitions
          if (t.textbookDefinitions) {
            t.textbookDefinitions.forEach((d) => {
              const lowerTerm = d.term.toLowerCase();
              const lowerDef = d.definition.toLowerCase();
              queryTokens.forEach((tok) => {
                if (lowerTerm.includes(tok)) score += 8;
                if (lowerDef.includes(tok)) score += 2;
              });
            });
          }

          // Match against content
          const lowerContent = t.content.toLowerCase();
          queryTokens.forEach((tok) => {
            if (lowerContent.includes(tok)) score += 1;
          });

          // Academic entities / theorists
          const namedEntities = [
            'batten', 'bennis', 'jacobs', 'northouse', 'mullins', 'kouzes', 'posner',
            'french', 'raven', 'adair', 'fiedler', 'blanchard', 'vroom', 'house',
            'spears', 'greenleaf', 'lewin', 'achebe', 'cadbury', 'sarbanes', 'oxley',
            'cama', 'sebi', 'oecd', 'corporate governance', 'leadership', 'servant',
            'transactional', 'transformational', 'power', 'authority', 'delegation'
          ];
          namedEntities.forEach((entity) => {
            if (normQuery.includes(entity) && lowerContent.includes(entity)) {
              score += 12;
            }
          });

          if (score > 3) {
            matches.push({
              courseCode: course.code,
              courseTitle: course.title,
              unitTitle: u.title,
              topic: t,
              relevanceScore: score,
            });
          }
        });
      });
    });
  });

  return matches.sort((a, b) => b.relevanceScore - a.relevanceScore);
}

/**
 * Builds a textbook-grounded explanation when running local retrieval.
 */
function generateTextbookRetrievedResponse(
  query: string,
  matches: RetrievedCourseMatch[],
  courses: Course[],
  context: TutorQueryContext
): AITutorResponse {
  const topMatch = matches[0];
  const topic = topMatch.topic;
  const sourceRef = topic.sourceReference || `${topMatch.courseCode}, ${topMatch.unitTitle}`;
  const lowerQ = query.toLowerCase();

  // Check if comparison query across courses
  if (/compare|difference|versus|vs|relationship\s+between/i.test(lowerQ) && matches.length > 1) {
    const distinctCourseMatches = matches.filter(
      (m, idx, self) => idx === self.findIndex((s) => s.courseCode === m.courseCode)
    );

    if (distinctCourseMatches.length >= 2) {
      const c1 = distinctCourseMatches[0];
      const c2 = distinctCourseMatches[1];

      let compReply = `### Comparative Academic Synthesis\n\n`;
      compReply += `Comparing concepts across **${c1.courseCode}** and **${c2.courseCode}** based on your uploaded textbooks:\n\n`;
      compReply += `**1. ${c1.courseCode} Focus (${c1.unitTitle}):**\n`;
      compReply += `• **Topic:** ${c1.topic.title}\n`;
      compReply += `• **Core Principle:** ${c1.topic.summaryPoints[0] || c1.topic.content.slice(0, 200)}...\n\n`;

      compReply += `**2. ${c2.courseCode} Focus (${c2.unitTitle}):**\n`;
      compReply += `• **Topic:** ${c2.topic.title}\n`;
      compReply += `• **Core Principle:** ${c2.topic.summaryPoints[0] || c2.topic.content.slice(0, 200)}...\n\n`;

      compReply += `**Key Academic Distinction:**\n`;
      compReply += `While ${c1.courseCode} examines governance, operational oversight, and institutional frameworks, ${c2.courseCode} focuses on motivational dynamics, leadership authority, and vision execution. Both reinforce ethical decision-making within organizational systems.\n\n`;
      compReply += `*(Source: ${c1.courseCode} & ${c2.courseCode} NOUN Materials)*`;

      return {
        text: compReply,
        sourceReference: `${c1.courseCode} & ${c2.courseCode}`,
        engineUsed: 'textbook_retrieval',
        suggestedFollowUps: [
          `Explain ${c1.courseCode}'s perspective in simpler English`,
          `Give me an exam question comparing both courses`,
          `Show core definitions in ${c2.courseCode}`
        ],
      };
    }
  }

  // 1. Simpler English request
  if (/simpler|simple|explain.*plain|break\s+down|easy|understand/i.test(lowerQ)) {
    const simplified = topic.simplifiedExplanation;
    let reply = `Here is a simpler explanation grounded in **${topMatch.courseCode}** (${sourceRef}):\n\n`;
    if (simplified) {
      reply += `💡 **Everyday Plain English:**\n${simplified.plainEnglish}\n\n`;
      reply += `🎯 **Core Analogy:**\n${simplified.analogy}\n\n`;
      reply += `📌 **Key Takeaway:**\n${simplified.keyTakeaway}\n\n`;
      reply += `🎓 **Exam Tip:**\n${simplified.examTip}`;
    } else {
      reply += `**Main Concepts:**\n${topic.summaryPoints.map((p) => `• ${p}`).join('\n')}\n\n`;
      reply += `**Textbook Context:**\n${topic.content.slice(0, 500)}...`;
    }

    return {
      text: reply,
      sourceReference: sourceRef,
      engineUsed: 'textbook_retrieval',
      suggestedFollowUps: [
        'What does this term mean according to the textbook?',
        'What are the key points to remember for exams?',
        'Ask me a written practice question on this'
      ],
    };
  }

  // 2. Term definition
  if (/what\s+(is|does|are|mean)|define|meaning\s+of/i.test(lowerQ)) {
    if (topic.textbookDefinitions && topic.textbookDefinitions.length > 0) {
      const matchedDef = topic.textbookDefinitions[0];
      let reply = `According to your **${topMatch.courseCode}** textbook (**${sourceRef}**):\n\n`;
      reply += `📖 **${matchedDef.term}**:\n"${matchedDef.definition}"`;
      if (matchedDef.sourceAuthor) {
        reply += ` — *${matchedDef.sourceAuthor}*`;
      }
      reply += `\n\n**Key Points:**\n${topic.summaryPoints.slice(0, 3).map((p) => `• ${p}`).join('\n')}`;

      return {
        text: reply,
        sourceReference: sourceRef,
        engineUsed: 'textbook_retrieval',
        suggestedFollowUps: [
          'Explain this in simpler English',
          'Give me an analogy to remember this',
          'Test my understanding of this definition'
        ],
      };
    }
  }

  // 3. Practice question
  if (/ask\s+me|test\s+me|practice|quiz|exam\s+question/i.test(lowerQ)) {
    if (topic.writtenQuestions && topic.writtenQuestions.length > 0) {
      const q = topic.writtenQuestions[0];
      return {
        text: `Here is an authentic examination question from **${sourceRef}**:\n\n📝 **Question:**\n${q.prompt}\n\n*(Maximum Marks: ${q.maxMarks} marks)*\n\nAnswer here or in your Unit Assessment Checkpoint, and I will evaluate your points according to the official textbook marking rubric!`,
        sourceReference: sourceRef,
        engineUsed: 'textbook_retrieval',
        suggestedFollowUps: [
          'What are the key rubric points expected for full marks?',
          'Explain this topic in simpler English first',
          'Show me the textbook definitions for this'
        ],
      };
    }
  }

  // 4. Default: Synthesized textbook passage
  let reply = `Based on your verified textbook material for **${topMatch.courseCode}: ${topMatch.courseTitle}** (${sourceRef}):\n\n`;
  if (topic.textbookDefinitions && topic.textbookDefinitions.length > 0) {
    reply += `**Authoritative Definitions:**\n`;
    topic.textbookDefinitions.forEach((d) => {
      reply += `• **${d.term}**: ${d.definition} ${d.sourceAuthor ? `(${d.sourceAuthor})` : ''}\n`;
    });
    reply += `\n`;
  }

  reply += `**Core Textbook Content:**\n${topic.content.slice(0, 600)}...\n\n`;

  if (topic.summaryPoints && topic.summaryPoints.length > 0) {
    reply += `**Important Points to Remember:**\n${topic.summaryPoints.map((p) => `• ${p}`).join('\n')}\n\n`;
  }

  if (topic.simplifiedExplanation) {
    reply += `💡 **Key Takeaway:** ${topic.simplifiedExplanation.keyTakeaway}`;
  }

  return {
    text: reply,
    sourceReference: sourceRef,
    engineUsed: 'textbook_retrieval',
    suggestedFollowUps: generateFollowUps(query, topic, false),
  };
}

function generateFollowUps(query: string, topic: StudyTopic, isCrossCourse: boolean): string[] {
  if (isCrossCourse) {
    return [
      'Compare governance vs leadership across courses',
      'Explain key definitions in simple terms',
      'Give me an exam question combining both subjects'
    ];
  }
  return [
    `Explain "${topic.title}" in simpler English`,
    `What are the key exam points for ${topic.title}?`,
    `Ask me a 10-mark question on this section`
  ];
}
