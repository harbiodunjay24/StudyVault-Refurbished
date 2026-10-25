import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  Send,
  Sparkles,
  BookOpen,
  ShieldCheck,
  Copy,
  Check,
  Maximize2,
  Minimize2,
  X,
  Plus,
  Compass,
  Layers,
  ChevronDown,
  StopCircle,
  RotateCcw
} from 'lucide-react';
import { Course, StudyUnit, StudyTopic, AITutorMessage } from '../types';
import { askAITutorStream, INSUFFICIENT_INFORMATION_SENTENCE } from '../services/aiTutorService';

interface AITutorChatProps {
  course?: Course;
  courses?: Course[];
  initialCourseId?: string | null;
  activeUnit?: StudyUnit | null;
  activeTopic?: StudyTopic | null;
  isOpen: boolean;
  onClose: () => void;
  onSaveExplanationAsNote?: (title: string, content: string) => void;
}

export const AITutorChat: React.FC<AITutorChatProps> = ({
  course,
  courses,
  initialCourseId,
  activeUnit,
  activeTopic,
  isOpen,
  onClose,
  onSaveExplanationAsNote,
}) => {
  const courseList = useMemo(
    () => (courses && courses.length > 0 ? courses : course ? [course] : []),
    [courses, course]
  );

  // Scope: 'all' or course.id
  const [selectedScope, setSelectedScope] = useState<string>(() => {
    if (initialCourseId && courseList.some((c) => c.id === initialCourseId)) {
      return initialCourseId;
    }
    if (course) return course.id;
    return courseList.length > 0 ? courseList[0].id : 'all';
  });

  const activeCourse = courseList.find((c) => c.id === selectedScope) || course;

  const [messages, setMessages] = useState<AITutorMessage[]>(() => [
    {
      id: 'init-msg',
      sender: 'tutor',
      text: `Hello! I am your **StudyVault AI Assistant**.\n\nI am strictly grounded in your uploaded university textbooks. You can ask me questions about any course in your library, compare concepts between textbooks (such as ENT 304 and ENT 308), explain difficult passages in simpler English, or test your readiness with authentic examination questions.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sourceReference: 'StudyVault Library',
      engineUsed: 'textbook_retrieval',
      suggestedFollowUps: [
        'Explain difficult concepts in simpler English',
        'Compare ENT 304 vs ENT 308',
        'Ask me a 10-mark examination question'
      ]
    }
  ]);

  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [lastQueryFailed, setLastQueryFailed] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Sync initialCourseId when it changes externally
  useEffect(() => {
    if (initialCourseId && courseList.some((c) => c.id === initialCourseId)) {
      setSelectedScope(initialCourseId);
    }
  }, [initialCourseId, courseList]);

  // Clean up in-flight requests on unmount or close
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  // Auto-scroll on new message (avoid scroll animation on initial mount)
  useEffect(() => {
    if (messages.length > 1 || isTyping) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages.length, isTyping]);

  const handleScopeChange = (newScope: string) => {
    setSelectedScope(newScope);
    const scopeLabel = newScope === 'all'
      ? 'All Library Courses'
      : courseList.find((c) => c.id === newScope)?.code || 'Selected Course';

    setMessages((prev) => [
      ...prev,
      {
        id: `switch-${Date.now()}`,
        sender: 'tutor',
        text: `Switched scope to **${scopeLabel}**. ${
          newScope === 'all'
            ? 'I can now compare concepts and retrieve answers across all your uploaded textbooks.'
            : 'All explanations and questions will focus on this textbook.'
        }`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sourceReference: scopeLabel,
        suggestedFollowUps: newScope === 'all'
          ? [
              'Compare ENT 304 and ENT 308',
              'Explain corporate governance vs leadership',
              'Give me a multidisciplinary exam question'
            ]
          : [
              `What are the core topics in ${scopeLabel}?`,
              'Explain this unit in simpler English',
              'Ask me a 10-mark question from this textbook'
            ]
      }
    ]);
  };

  const handleStopGenerating = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
      setIsTyping(false);
    }
  };

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || inputText).trim();
    if (!query || isTyping) return;

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;

    setLastQueryFailed(null);
    const userMsg: AITutorMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      courseCode: activeCourse?.code || 'Library',
    };

    const tutorMsgId = `tutor-${Date.now()}`;
    const initialTutorMsg: AITutorMessage = {
      id: tutorMsgId,
      sender: 'tutor',
      text: '',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sourceReference: activeCourse ? `${activeCourse.code} Textbook` : 'Library Materials',
      engineUsed: 'gemini_grounded',
      courseCode: activeCourse?.code,
    };

    setMessages((prev) => [...prev, userMsg, initialTutorMsg]);
    setInputText('');
    setIsTyping(true);

    try {
      const response = await askAITutorStream(
        query,
        {
          course: activeCourse,
          courses: courseList,
          selectedScope,
          activeUnit: selectedScope === activeCourse?.id ? activeUnit : null,
          activeTopic: selectedScope === activeCourse?.id ? activeTopic : null,
          conversationHistory: [...messages, userMsg],
        },
        (_chunk, accumulated) => {
          setMessages((prev) =>
            prev.map((m) =>
              m.id === tutorMsgId
                ? {
                    ...m,
                    text: accumulated,
                  }
                : m
            )
          );
        },
        controller.signal
      );

      setMessages((prev) =>
        prev.map((m) =>
          m.id === tutorMsgId
            ? {
                ...m,
                text: response.text,
                sourceReference: response.sourceReference,
                engineUsed: response.engineUsed,
                suggestedFollowUps: response.suggestedFollowUps,
              }
            : m
        )
      );
    } catch (err: any) {
      if (err?.name === 'AbortError') {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === tutorMsgId
              ? {
                  ...m,
                  text: m.text ? `${m.text}\n\n*(Generation stopped by user)*` : '*(Generation stopped by user)*',
                }
              : m
          )
        );
      } else {
        setLastQueryFailed(query);
        setMessages((prev) =>
          prev.map((m) =>
            m.id === tutorMsgId
              ? {
                  ...m,
                  text: INSUFFICIENT_INFORMATION_SENTENCE,
                  sourceReference: activeCourse ? `${activeCourse.code} Textbook` : 'Library Materials',
                  engineUsed: 'textbook_retrieval',
                }
              : m
          )
        );
      }
    } finally {
      setIsTyping(false);
      abortControllerRef.current = null;
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const quickPrompts = selectedScope === 'all'
    ? [
        'Compare ENT 304 and ENT 308',
        'Explain governance vs leadership',
        'Explain this in simpler English',
        'Ask me a practice exam question',
        'Why would an answer be marked wrong?'
      ]
    : [
        'Explain this in simpler English',
        'What does this term mean in my textbook?',
        'Give me an analogy to remember this',
        'Ask me a 10-mark exam question',
        'What are the key points for exams?'
      ];

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-label="StudyVault AI Assistant"
      className={`fixed z-50 transition-all duration-200 flex flex-col bg-white border border-[#E8E4DC] shadow-2xl overflow-hidden ${
        isExpanded
          ? 'inset-2 sm:inset-6 rounded-2xl'
          : 'bottom-0 inset-x-0 sm:inset-x-auto sm:right-6 sm:bottom-6 w-full sm:w-[500px] h-[85vh] sm:h-[640px] max-h-[100dvh] rounded-t-2xl sm:rounded-2xl'
      }`}
    >
      {/* Header */}
      <div className="bg-[#14382B] text-white p-3.5 sm:p-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4 text-[#E2C799]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-serif font-bold text-sm leading-none">StudyVault AI Assistant</h3>
              <span className="text-[10px] text-emerald-200/90 hidden sm:inline">
                · General Academic Assistant
              </span>
            </div>
            <p className="text-[11px] text-[#D8D2C6] truncate max-w-[220px] sm:max-w-[280px] mt-0.5">
              {selectedScope === 'all'
                ? `Cross-Textbook Knowledge (${courseList.length} courses)`
                : `${activeCourse?.code}: ${activeCourse?.title}`}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            title={isExpanded ? 'Minimize' : 'Maximize'}
          >
            {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
          <button
            onClick={onClose}
            className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            title="Close Assistant"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Scope Selector Bar */}
      <div className="bg-[#FAF8F5] border-b border-[#E8E4DC] px-3.5 py-2 flex items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-1.5 min-w-0">
          <Layers className="w-3.5 h-3.5 text-[#14382B] shrink-0" />
          <span className="text-[#585E5A] text-[11px] shrink-0">Scope:</span>
          <div className="relative inline-block max-w-[190px] sm:max-w-[230px]">
            <select
              value={selectedScope}
              onChange={(e) => handleScopeChange(e.target.value)}
              className="appearance-none w-full bg-white border border-[#D8D2C6] text-[#191C1A] text-[11px] font-medium py-1 pl-2 pr-6 rounded-md truncate cursor-pointer hover:border-[#14382B] focus:outline-none"
            >
              <option value="all">🌐 All Library Courses ({courseList.length})</option>
              {courseList.map((c) => (
                <option key={c.id} value={c.id}>
                  📚 {c.code} · {c.title}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3 h-3 text-[#585E5A] absolute right-1.5 top-2 pointer-events-none" />
          </div>
        </div>

        <div className="flex items-center gap-1 text-[10px] text-[#585E5A] shrink-0">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
          <span>Grounded in NOUN Textbooks</span>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#FBF9F5]/40 text-xs sm:text-sm">
        {messages.map((m) => {
          const isTutor = m.sender === 'tutor';
          const isInsufficient = m.text.includes(INSUFFICIENT_INFORMATION_SENTENCE);

          return (
            <div
              key={m.id}
              className={`flex flex-col ${isTutor ? 'items-start' : 'items-end'} space-y-1`}
            >
              <div
                className={`max-w-[92%] sm:max-w-[85%] p-3.5 rounded-xl leading-relaxed ${
                  isTutor
                    ? isInsufficient
                      ? 'bg-amber-50 border border-amber-200 text-amber-950 rounded-tl-xs'
                      : 'bg-white border border-[#E8E4DC] text-[#191C1A] rounded-tl-xs shadow-xs'
                    : 'bg-[#14382B] text-white rounded-tr-xs'
                }`}
              >
                {/* Content */}
                <div className="whitespace-pre-line font-sans">{m.text}</div>

                {/* Source Citation & Actions */}
                {isTutor && (
                  <div className="mt-3 pt-2 border-t border-[#E8E4DC] flex flex-wrap items-center justify-between gap-2 text-[10px] text-[#585E5A]">
                    {m.sourceReference && (
                      <span className="font-mono text-[#14382B] bg-[#FAF8F5] px-1.5 py-0.5 rounded border border-[#E8E4DC] truncate max-w-[220px]">
                        Ref: {m.sourceReference}
                      </span>
                    )}

                    <div className="flex items-center gap-2 ml-auto">
                      {onSaveExplanationAsNote && (
                        <button
                          onClick={() =>
                            onSaveExplanationAsNote(
                              `StudyVault Assistant: ${m.sourceReference || 'Note'}`,
                              m.text
                            )
                          }
                          className="hover:text-[#14382B] flex items-center gap-1 transition-colors"
                          title="Save as Study Note"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Save Note</span>
                        </button>
                      )}

                      <button
                        onClick={() => handleCopy(m.id, m.text)}
                        className="hover:text-[#14382B] flex items-center gap-1 transition-colors"
                        title="Copy response"
                      >
                        {copiedId === m.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600" />
                            <span className="text-emerald-600">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Follow-up suggestions */}
              {isTutor && m.suggestedFollowUps && m.suggestedFollowUps.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1 pl-1 max-w-[92%]">
                  {m.suggestedFollowUps.map((prompt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSend(prompt)}
                      className="text-[11px] bg-white hover:bg-[#FAF8F5] border border-[#D8D2C6] text-[#14382B] px-2.5 py-1 rounded-md text-left transition-colors truncate max-w-full shadow-xs"
                    >
                      💡 {prompt}
                    </button>
                  ))}
                </div>
              )}

              <span className="text-[10px] text-[#8C928E] px-1">{m.timestamp}</span>
            </div>
          );
        })}

        {isTyping && (
          <div className="flex items-center gap-2 text-xs text-[#585E5A] bg-white border border-[#E8E4DC] p-3 rounded-xl rounded-tl-xs max-w-[260px] shadow-xs">
            <Sparkles className="w-3.5 h-3.5 animate-spin text-[#14382B]" />
            <span>Consulting textbook passages...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts Bar */}
      <div className="px-3 py-2 bg-[#FAF8F5] border-t border-[#E8E4DC] overflow-x-auto whitespace-nowrap flex gap-1.5 scrollbar-thin">
        {quickPrompts.map((p, i) => (
          <button
            key={i}
            onClick={() => handleSend(p)}
            className="text-[11px] bg-white hover:bg-[#F3EFEA] border border-[#D8D2C6] text-[#585E5A] hover:text-[#14382B] px-2.5 py-1 rounded-md transition-colors shrink-0"
          >
            {p}
          </button>
        ))}
      </div>

      {/* Retry Bar if last query failed */}
      {lastQueryFailed && !isTyping && (
        <div className="px-3 py-1.5 bg-amber-50 border-t border-amber-200 flex items-center justify-between text-xs text-amber-900 shrink-0">
          <span>The previous request was interrupted.</span>
          <button
            onClick={() => handleSend(lastQueryFailed)}
            className="flex items-center gap-1 font-semibold text-[#14382B] hover:underline"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Retry</span>
          </button>
        </div>
      )}

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="p-3 bg-white border-t border-[#E8E4DC] flex items-center gap-2 shrink-0"
      >
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={
            isTyping
              ? 'Streaming response from your textbook...'
              : selectedScope === 'all'
              ? 'Ask about any course or compare concepts (e.g. ENT 304 vs ENT 308)...'
              : `Ask about ${activeCourse?.code || 'this course'}...`
          }
          className="flex-1 text-xs sm:text-sm bg-[#FAF8F5] border border-[#D8D2C6] rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#14382B] focus:bg-white text-[#191C1A] placeholder-[#8C928E]"
          disabled={isTyping}
        />
        {isTyping ? (
          <button
            type="button"
            onClick={handleStopGenerating}
            className="px-3 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl transition-all shrink-0 cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
            title="Stop generating"
          >
            <StopCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Stop</span>
          </button>
        ) : (
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="p-2.5 bg-[#14382B] hover:bg-[#0E261D] disabled:opacity-40 text-white rounded-xl transition-all shrink-0 cursor-pointer"
            title="Send message"
          >
            <Send className="w-4 h-4" />
          </button>
        )}
      </form>
    </div>
  );
};
