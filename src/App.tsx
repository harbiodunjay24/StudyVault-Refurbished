/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar, NavView } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeView } from './views/HomeView';
import { CoursesView } from './views/CoursesView';
import { CourseDetailView } from './views/CourseDetailView';
import { StudyReaderView } from './views/StudyReaderView';
import { PastQuestionsView } from './views/PastQuestionsView';
import { NotesView } from './views/NotesView';
import { ProgressView } from './views/ProgressView';
import { AddCourseModal } from './components/AddCourseModal';
import { AddDocumentModal } from './components/AddDocumentModal';
import { AITutorChat } from './components/AITutorChat';
import { AudioStudyPlayer } from './components/AudioStudyPlayer';
import { AccountSyncModal } from './components/AccountSyncModal';
import { AuthView } from './views/AuthView';
import {
  cloudSyncService,
  SyncStatus,
  AuthenticatedUser,
  StudySessionRecord,
} from './services/cloudSyncService';
import {
  voiceLearningEngine,
  buildUnitLearnQueue,
  buildUnitPastQuestionsRevisionQueue,
  buildCombinedQueue,
  VoiceLearningMode
} from './services/voiceLearningService';
import { Sparkles, Headphones } from 'lucide-react';
import {
  Course,
  PastExamQuestionItem,
  PersonalNote,
  Bookmark,
  UserProgress,
  StudyUnit,
  StudyTopic,
  QuestionMistakeRecord,
  WrittenEvaluationResult,
  UnitStatus,
  PastQuestionDocument
} from './types';
import {
  getStoredCourses,
  saveStoredCourses,
  getStoredPastQuestions,
  saveStoredPastQuestions,
  getStoredNotes,
  saveStoredNotes,
  getStoredBookmarks,
  saveStoredBookmarks,
  getStoredProgress,
  saveStoredProgress,
  setActiveUserStorageContext,
  clearActiveUserStorageCache,
  loadSampleFMS304,
  loadSampleENT302,
  loadSampleENT304,
  loadSampleENT308,
  loadSampleCSC202,
  clearLibraryData,
  triggerManualDeduplication,
  getStoredConsolidationReport,
  getPastQuestionsForCourse,
  getPastQuestionsForUnit,
} from './services/storage';

export default function App() {
  const [currentView, setCurrentView] = useState<NavView>('home');
  const [courses, setCourses] = useState<Course[]>([]);
  const [pastQuestions, setPastQuestions] = useState<PastExamQuestionItem[]>([]);
  const [notes, setNotes] = useState<PersonalNote[]>([]);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [progress, setProgress] = useState<UserProgress>({
    completedTopicIds: [],
    unitStatuses: {},
    readingMinutesByCourse: {},
    totalMinutesStudied: 0,
    flaggedForRevisionTopicIds: [],
    revisionCount: 0,
    quizScores: {},
    writtenEvaluations: {},
    mistakesBank: [],
  });

  // Navigation sub-states
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [activeReadingTopic, setActiveReadingTopic] = useState<{
    courseId: string;
    unitId: string;
    topicId: string;
  } | null>(null);

  // Modals, Audio & Chatbot
  const [isAddCourseModalOpen, setIsAddCourseModalOpen] = useState(false);
  const [isAddDocumentModalOpen, setIsAddDocumentModalOpen] = useState(false);
  const [globalAiTutorOpen, setGlobalAiTutorOpen] = useState(false);
  const [audioPlayerOpen, setAudioPlayerOpen] = useState(false);
  const [audioPlayerCourse, setAudioPlayerCourse] = useState<Course | null>(null);
  const [audioPlayerUnit, setAudioPlayerUnit] = useState<StudyUnit | null>(null);

  const handleOpenAudioPlayer = (
    targetCourse: Course,
    unit?: StudyUnit | null,
    questions?: PastExamQuestionItem[],
    mode?: VoiceLearningMode
  ) => {
    setAudioPlayerCourse(targetCourse);
    setAudioPlayerUnit(unit || null);
    setAudioPlayerOpen(true);

    const targetUnit = unit || targetCourse.modules[0]?.units[0] || null;
    const targetMode = mode || (questions && questions.length > 0 ? 'past-questions-revision' : 'learn-understand');

    voiceLearningEngine.setMode(targetMode);

    if (targetUnit) {
      const unitPQs = (questions && questions.length > 0)
        ? questions
        : getPastQuestionsForUnit(
            pastQuestions,
            targetCourse.id,
            targetUnit.id,
            targetUnit.unitNumber,
            targetUnit.title,
            courses
          );

      let queue = [];
      if (targetMode === 'learn-understand') {
        queue = buildUnitLearnQueue(targetCourse, targetUnit);
      } else if (targetMode === 'past-questions-revision') {
        queue = buildUnitPastQuestionsRevisionQueue(targetCourse, targetUnit, unitPQs);
      } else {
        queue = buildCombinedQueue(targetCourse, targetUnit, unitPQs);
      }
      voiceLearningEngine.setPlaylist(queue, 0, true);
    } else if (questions && questions.length > 0) {
      const dummyUnit: StudyUnit = {
        id: 'selection',
        unitNumber: 1,
        number: 1,
        title: `${targetCourse.code} Selected Examination Questions`,
        topics: [],
      };
      const queue = buildUnitPastQuestionsRevisionQueue(targetCourse, dummyUnit, questions);
      voiceLearningEngine.setPlaylist(queue, 0, true);
    }
  };

  // Cloud Sync & Account State
  const [currentUser, setCurrentUser] = useState<AuthenticatedUser | null>(() => {
    const user = cloudSyncService.getCurrentUser();
    if (user) {
      setActiveUserStorageContext(user.id);
    } else {
      setActiveUserStorageContext(null);
    }
    return user;
  });
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [syncStatus, setSyncStatus] = useState<SyncStatus>('saved');
  const [syncMessage, setSyncMessage] = useState<string>('Saved');
  const [lastSyncedAt, setLastSyncedAt] = useState<string | null>(null);

  const loadUserData = (userId: string) => {
    setActiveUserStorageContext(userId);
    const loadedCourses = getStoredCourses();
    const loadedPQ = getStoredPastQuestions();
    const loadedNotes = getStoredNotes();
    const loadedBookmarks = getStoredBookmarks();
    const loadedProgress = getStoredProgress();

    setCourses(loadedCourses);
    setPastQuestions(loadedPQ);
    setNotes(loadedNotes);
    setBookmarks(loadedBookmarks);
    setProgress(loadedProgress);
    if (loadedProgress.lastActiveCourseId) {
      setSelectedCourseId(loadedProgress.lastActiveCourseId);
    }
  };

  // Load from local storage on mount/auth and synchronize with Cloud
  useEffect(() => {
    if (!currentUser || !cloudSyncService.isAuthenticated()) {
      return;
    }

    loadUserData(currentUser.id);

    // Subscribe to cloud sync service status
    const unsubscribe = cloudSyncService.subscribe((status, msg, lastSync) => {
      setSyncStatus(status);
      setSyncMessage(msg);
      setLastSyncedAt(lastSync);
    });

    // Pull latest synchronized state from cloud
    const initCloud = async () => {
      try {
        const cloudData = await cloudSyncService.pullLatest();
        if (cloudData) {
          if (cloudData.progress) {
            setProgress(cloudData.progress);
            saveStoredProgress(cloudData.progress);
            if (cloudData.progress.lastActiveCourseId) {
              setSelectedCourseId(cloudData.progress.lastActiveCourseId);
            }
          }
          if (cloudData.notes) {
            setNotes(cloudData.notes);
            saveStoredNotes(cloudData.notes);
          }
          if (cloudData.bookmarks) {
            setBookmarks(cloudData.bookmarks);
            saveStoredBookmarks(cloudData.bookmarks);
          }
          if (cloudData.customCourses && Array.isArray(cloudData.customCourses)) {
            if (currentUser.id === 'usr_abiodun_ayodeji_24') {
              setCourses((prev) => {
                let changed = false;
                const prevMap = new Map(prev.map((c) => [c.id, { ...c }]));

                cloudData.customCourses!.forEach((cloudC: Course) => {
                  const existingKey = Array.from(prevMap.keys()).find((k) => {
                    const local = prevMap.get(k)!;
                    return (
                      local.id === cloudC.id ||
                      (local.code &&
                        cloudC.code &&
                        local.code.replace(/\s+/g, '').toUpperCase() ===
                          cloudC.code.replace(/\s+/g, '').toUpperCase())
                    );
                  });

                  if (!existingKey) {
                    prevMap.set(cloudC.id, cloudC);
                    changed = true;
                  } else {
                    const existingCourse = prevMap.get(existingKey)!;
                    const existingPqDocs = existingCourse.pastQuestionDocuments || [];
                    const cloudPqDocs = cloudC.pastQuestionDocuments || [];
                    const mergedPqDocs = [...existingPqDocs];

                    cloudPqDocs.forEach((d) => {
                      const exists = mergedPqDocs.some((mp) => mp.id === d.id || mp.name === d.name);
                      if (!exists) {
                        mergedPqDocs.push(d);
                        changed = true;
                      }
                    });

                    const existingDocs = existingCourse.documents || [];
                    const cloudDocs = cloudC.documents || [];
                    const mergedDocs = [...existingDocs];

                    cloudDocs.forEach((d) => {
                      const exists = mergedDocs.some((ed) => ed.id === d.id || ed.name === d.name);
                      if (!exists) {
                        mergedDocs.push(d);
                        changed = true;
                      }
                    });

                    prevMap.set(existingKey, {
                      ...existingCourse,
                      pastQuestionDocuments: mergedPqDocs,
                      documents: mergedDocs,
                    });
                  }
                });

                if (changed) {
                  const updated = Array.from(prevMap.values());
                  saveStoredCourses(updated);
                  return updated;
                }
                return prev;
              });
            } else {
              setCourses(cloudData.customCourses);
              saveStoredCourses(cloudData.customCourses);
            }
          }
          if (cloudData.customPastQuestions && Array.isArray(cloudData.customPastQuestions)) {
            if (currentUser.id === 'usr_abiodun_ayodeji_24') {
              setPastQuestions((prev) => {
                const prevIds = new Set(prev.map((q) => q.id));
                const toMerge = cloudData.customPastQuestions!.filter((q: any) => !prevIds.has(q.id));
                if (toMerge.length > 0) {
                  const updated = [...toMerge, ...prev];
                  saveStoredPastQuestions(updated);
                  return updated;
                }
                return prev;
              });
            } else {
              setPastQuestions(cloudData.customPastQuestions);
              saveStoredPastQuestions(cloudData.customPastQuestions);
            }
          }
        }
      } catch (err) {
        console.warn('Initial cloud sync pull failed:', err);
      }
    };
    initCloud();

    return () => unsubscribe();
  }, [currentUser?.id]);

  const handleUserAuthenticated = async (user: AuthenticatedUser) => {
    setActiveUserStorageContext(user.id);
    setCurrentUser(user);
    loadUserData(user.id);

    try {
      const cloudData = await cloudSyncService.pullLatest();
      if (cloudData) {
        if (cloudData.progress) {
          setProgress(cloudData.progress);
          saveStoredProgress(cloudData.progress);
          if (cloudData.progress.lastActiveCourseId) {
            setSelectedCourseId(cloudData.progress.lastActiveCourseId);
          }
        }
        if (cloudData.notes) {
          setNotes(cloudData.notes);
          saveStoredNotes(cloudData.notes);
        }
        if (cloudData.bookmarks) {
          setBookmarks(cloudData.bookmarks);
          saveStoredBookmarks(cloudData.bookmarks);
        }
        if (cloudData.customCourses && Array.isArray(cloudData.customCourses)) {
          setCourses(cloudData.customCourses);
          saveStoredCourses(cloudData.customCourses);
        }
        if (cloudData.customPastQuestions && Array.isArray(cloudData.customPastQuestions)) {
          setPastQuestions(cloudData.customPastQuestions);
          saveStoredPastQuestions(cloudData.customPastQuestions);
        }
      }
    } catch (err) {
      console.warn('Post-auth cloud sync pull failed:', err);
    }
  };

  const handleLogout = () => {
    cloudSyncService.logout();
    clearActiveUserStorageCache();
    setActiveUserStorageContext(null);
    setCurrentUser(null);
    setCourses([]);
    setPastQuestions([]);
    setNotes([]);
    setBookmarks([]);
    setProgress({
      completedTopicIds: [],
      unitStatuses: {},
      readingMinutesByCourse: {},
      totalMinutesStudied: 0,
      flaggedForRevisionTopicIds: [],
      revisionCount: 0,
      quizScores: {},
      writtenEvaluations: {},
      mistakesBank: [],
    });
    setSelectedCourseId(null);
    setActiveReadingTopic(null);
    setCurrentView('home');
  };

  // Update handlers
  const handleCourseCreated = (newCourse: Course) => {
    const updated = [newCourse, ...courses];
    setCourses(updated);
    saveStoredCourses(updated);
    triggerCloudSave(progress, notes, bookmarks, true, pastQuestions, updated, true);
    // Switch to the newly created course's dashboard
    setSelectedCourseId(newCourse.id);
    setCurrentView('courses');
  };

  const handleDocumentAdded = (updatedCourse: Course) => {
    const updated = courses.map((c) => (c.id === updatedCourse.id ? updatedCourse : c));
    setCourses(updated);
    saveStoredCourses(updated);
    triggerCloudSave(progress, notes, bookmarks, true, pastQuestions, updated, true);
  };

  const handleDeleteCourse = (courseId: string) => {
    const updated = courses.filter((c) => c.id !== courseId);
    setCourses(updated);
    saveStoredCourses(updated);
    if (selectedCourseId === courseId) {
      setSelectedCourseId(null);
    }
    if (activeReadingTopic?.courseId === courseId) {
      setActiveReadingTopic(null);
    }
    triggerCloudSave(progress, notes, bookmarks, true, pastQuestions, updated, true);
  };

  const triggerCloudSave = (
    updatedProgress: UserProgress = progress,
    updatedNotes: PersonalNote[] = notes,
    updatedBookmarks: Bookmark[] = bookmarks,
    immediate: boolean = false,
    updatedPQ: PastExamQuestionItem[] = pastQuestions,
    updatedCoursesList: Course[] = courses,
    isFullLibrarySync: boolean = false
  ) => {
    if (isFullLibrarySync) {
      cloudSyncService.queueCloudSave(
        {
          progress: updatedProgress,
          notes: updatedNotes,
          bookmarks: updatedBookmarks,
          customPastQuestions: updatedPQ,
          customCourses: updatedCoursesList,
          lastActiveStudySession: updatedProgress.lastActiveStudySession,
          unitReadingPositions: updatedProgress.unitReadingPositions,
        },
        immediate
      );
    } else {
      // Lightweight progress delta sync (< 5KB vs 3.5MB): instant & non-blocking
      cloudSyncService.queueProgressDeltaSave(
        {
          progress: updatedProgress,
          notes: updatedNotes,
          bookmarks: updatedBookmarks,
          lastActiveStudySession: updatedProgress.lastActiveStudySession,
          unitReadingPositions: updatedProgress.unitReadingPositions,
        },
        immediate
      );
    }
  };

  const handleReadingPositionUpdate = (
    courseId: string,
    unitId: string,
    topicId: string,
    scrollRatio: number
  ) => {
    const courseObj = courses.find((c) => c.id === courseId);
    const unitObj = courseObj?.modules.flatMap((m) => m.units).find((u) => u.id === unitId);
    const topicObj = unitObj?.topics.find((t) => t.id === topicId);

    const studySession: StudySessionRecord = {
      courseId,
      courseCode: courseObj?.code || '',
      courseTitle: courseObj?.title || '',
      unitId,
      unitTitle: unitObj?.title || '',
      topicId,
      topicTitle: topicObj?.title || '',
      readingPositionRatio: scrollRatio,
      timestamp: new Date().toISOString(),
    };

    const updatedProgress: UserProgress = {
      ...progress,
      lastActiveCourseId: courseId,
      lastActiveUnitId: unitId,
      lastActiveTopicId: topicId,
      lastReadingPositionRatio: scrollRatio,
      unitReadingPositions: {
        ...(progress.unitReadingPositions || {}),
        [unitId]: scrollRatio,
      },
      lastActiveStudySession: studySession,
    };

    setProgress(updatedProgress);
    saveStoredProgress(updatedProgress);
    triggerCloudSave(updatedProgress, notes, bookmarks, false);
  };

  const handleSelectTopic = (courseId: string, unitId: string, topicId: string) => {
    // 1. Instantly display the reading interface without waiting for disk or network I/O (< 5ms)
    setActiveReadingTopic({ courseId, unitId, topicId });

    // 2. Asynchronously record study session & persist progress delta calmly in the background
    setTimeout(() => {
      const courseObj = courses.find((c) => c.id === courseId);
      const unitObj = courseObj?.modules.flatMap((m) => m.units).find((u) => u.id === unitId);
      const topicObj = unitObj?.topics.find((t) => t.id === topicId);
      const savedPos = progress.unitReadingPositions?.[unitId] || progress.lastReadingPositionRatio || 0;

      const studySession: StudySessionRecord = {
        courseId,
        courseCode: courseObj?.code || '',
        courseTitle: courseObj?.title || '',
        unitId,
        unitTitle: unitObj?.title || '',
        topicId,
        topicTitle: topicObj?.title || '',
        readingPositionRatio: savedPos,
        timestamp: new Date().toISOString(),
      };

      const updatedProgress: UserProgress = {
        ...progress,
        lastActiveCourseId: courseId,
        lastActiveUnitId: unitId,
        lastActiveTopicId: topicId,
        lastActiveStudySession: studySession,
      };
      setProgress(updatedProgress);
      saveStoredProgress(updatedProgress);
      triggerCloudSave(updatedProgress, notes, bookmarks, false);
    }, 40);
  };

  const handleMarkTopicCompleted = (topicId: string) => {
    if (!progress.completedTopicIds.includes(topicId)) {
      const updatedProgress: UserProgress = {
        ...progress,
        completedTopicIds: [...progress.completedTopicIds, topicId],
      };
      setProgress(updatedProgress);
      saveStoredProgress(updatedProgress);
      triggerCloudSave(updatedProgress, notes, bookmarks, true);
    }
  };

  const handleSetUnitStatus = (unitId: string, status: UnitStatus) => {
    const updatedProgress: UserProgress = {
      ...progress,
      unitStatuses: {
        ...progress.unitStatuses,
        [unitId]: status,
      },
    };
    setProgress(updatedProgress);
    saveStoredProgress(updatedProgress);
    triggerCloudSave(updatedProgress, notes, bookmarks, true);
  };

  const handleToggleRevisionFlag = (topicId: string) => {
    const currentFlags = progress.flaggedForRevisionTopicIds || [];
    const exists = currentFlags.includes(topicId);
    const updatedFlags = exists
      ? currentFlags.filter((id) => id !== topicId)
      : [...currentFlags, topicId];

    const updatedProgress: UserProgress = {
      ...progress,
      flaggedForRevisionTopicIds: updatedFlags,
      revisionCount: exists ? progress.revisionCount : (progress.revisionCount || 0) + 1,
    };
    setProgress(updatedProgress);
    saveStoredProgress(updatedProgress);
    triggerCloudSave(updatedProgress, notes, bookmarks, true);
  };

  const handleRecordQuizScore = (
    topicId: string,
    score: number,
    total: number,
    newMistakes: QuestionMistakeRecord[]
  ) => {
    const existing = progress.quizScores[topicId];

    // Filter out previous mistakes for this topic to avoid duplicate records
    const previousOtherMistakes = (progress.mistakesBank || []).filter(
      (m) => m.topicId !== topicId
    );

    const updatedProgress: UserProgress = {
      ...progress,
      quizScores: {
        ...progress.quizScores,
        [topicId]: {
          score,
          total,
          attempts: (existing?.attempts || 0) + 1,
          timestamp: new Date().toISOString(),
        },
      },
      mistakesBank: [...newMistakes, ...previousOtherMistakes],
    };
    setProgress(updatedProgress);
    saveStoredProgress(updatedProgress);
    triggerCloudSave(updatedProgress, notes, bookmarks, true);
  };

  const handleRecordWrittenEvaluation = (
    topicId: string,
    evaluations: WrittenEvaluationResult[]
  ) => {
    const updatedProgress: UserProgress = {
      ...progress,
      writtenEvaluations: {
        ...progress.writtenEvaluations,
        [topicId]: evaluations,
      },
    };
    setProgress(updatedProgress);
    saveStoredProgress(updatedProgress);
    triggerCloudSave(updatedProgress, notes, bookmarks, true);
  };

  const handleClearMistakeRecord = (mistakeId: string) => {
    const updatedMistakes = (progress.mistakesBank || []).filter((m) => m.id !== mistakeId);
    const updatedProgress: UserProgress = {
      ...progress,
      mistakesBank: updatedMistakes,
    };
    setProgress(updatedProgress);
    saveStoredProgress(updatedProgress);
    triggerCloudSave(updatedProgress, notes, bookmarks, true);
  };

  const handleToggleBookmark = (course: Course, unit: StudyUnit, topic: StudyTopic) => {
    const exists = bookmarks.some((b) => b.topicId === topic.id);
    let updated: Bookmark[];
    if (exists) {
      updated = bookmarks.filter((b) => b.topicId !== topic.id);
    } else {
      const newBm: Bookmark = {
        id: `bm-${Date.now()}`,
        courseId: course.id,
        unitId: unit.id,
        topicId: topic.id,
        courseTitle: course.title,
        unitTitle: unit.title,
        topicTitle: topic.title,
        savedAt: new Date().toISOString(),
      };
      updated = [newBm, ...bookmarks];
    }
    setBookmarks(updated);
    saveStoredBookmarks(updated);
    triggerCloudSave(progress, notes, updated, true);
  };

  const handleRemoveBookmark = (bookmarkId: string) => {
    const updated = bookmarks.filter((b) => b.id !== bookmarkId);
    setBookmarks(updated);
    saveStoredBookmarks(updated);
    triggerCloudSave(progress, notes, updated, true);
  };

  const handleSaveNote = (noteData: Omit<PersonalNote, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newNote: PersonalNote = {
      ...noteData,
      id: `note-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const updated = [newNote, ...notes];
    setNotes(updated);
    saveStoredNotes(updated);
    triggerCloudSave(progress, updated, bookmarks, true);
  };

  const handleUpdateNote = (id: string, title: string, content: string) => {
    const updated = notes.map((n) =>
      n.id === id ? { ...n, title, content, updatedAt: new Date().toISOString() } : n
    );
    setNotes(updated);
    saveStoredNotes(updated);
    triggerCloudSave(progress, updated, bookmarks, true);
  };

  const handleDeleteNote = (id: string) => {
    const updated = notes.filter((n) => n.id !== id);
    setNotes(updated);
    saveStoredNotes(updated);
    triggerCloudSave(progress, updated, bookmarks, true);
  };

  const handleBatchAddPastQuestions = (
    newQuestions: PastExamQuestionItem[],
    docInfo?: PastQuestionDocument,
    targetCourseId?: string
  ) => {
    const existingIds = new Set(pastQuestions.map((q) => q.id));
    const toAdd = newQuestions.filter((q) => !existingIds.has(q.id));
    const updatedPQ = [...toAdd, ...pastQuestions];
    setPastQuestions(updatedPQ);
    saveStoredPastQuestions(updatedPQ);

    let updatedCourses = courses;
    if (docInfo) {
      const cId = targetCourseId || docInfo.courseId;
      updatedCourses = courses.map((item) => {
        if (item.id === cId || item.code === docInfo.courseCode) {
          const curDocs = item.pastQuestionDocuments || [];
          const docExists = curDocs.some((d) => d.id === docInfo.id || d.name === docInfo.name);
          return {
            ...item,
            pastQuestionDocuments: docExists ? curDocs : [...curDocs, docInfo],
          };
        }
        return item;
      });
      setCourses(updatedCourses);
      saveStoredCourses(updatedCourses);
    }

    triggerCloudSave(progress, notes, bookmarks, true, updatedPQ, updatedCourses, true);
  };

  const handleToggleBookmarkQuestion = (questionId: string) => {
    const curBookmarked = progress.bookmarkedQuestionIds || [];
    const exists = curBookmarked.includes(questionId);
    const updatedBookmarked = exists
      ? curBookmarked.filter((id) => id !== questionId)
      : [...curBookmarked, questionId];

    const updatedProgress: UserProgress = {
      ...progress,
      bookmarkedQuestionIds: updatedBookmarked,
    };
    setProgress(updatedProgress);
    saveStoredProgress(updatedProgress);
    triggerCloudSave(updatedProgress, notes, bookmarks, true);
  };

  const handleMarkQuestionStatus = (
    questionId: string,
    status: 'read' | 'answered' | 'completed' | 'in_progress',
    courseId?: string,
    courseCode?: string
  ) => {
    const curRead = progress.readQuestionIds || [];
    const readSet = new Set(curRead);
    if (status !== 'in_progress') {
      readSet.add(questionId);
    }

    const history = [...(progress.recentQuestionHistory || [])].filter((h) => h.questionId !== questionId);
    history.unshift({
      questionId,
      courseId: courseId || progress.lastActiveCourseId || '',
      courseCode,
      openedAt: new Date().toISOString(),
      status,
    });

    const updatedPracticeRecords = { ...(progress.pastQuestionPracticeRecords || {}) };
    if (status === 'answered' || status === 'completed') {
      updatedPracticeRecords[questionId] = {
        attempted: true,
        passed: true,
        lastAttemptedAt: new Date().toISOString(),
      };
    } else if (status === 'in_progress') {
      updatedPracticeRecords[questionId] = {
        attempted: false,
        lastAttemptedAt: new Date().toISOString(),
      };
    }

    const updatedProgress: UserProgress = {
      ...progress,
      readQuestionIds: Array.from(readSet),
      lastOpenedQuestionId: questionId,
      recentQuestionHistory: history.slice(0, 30),
      pastQuestionPracticeRecords: updatedPracticeRecords,
    };
    setProgress(updatedProgress);
    saveStoredProgress(updatedProgress);
    triggerCloudSave(updatedProgress, notes, bookmarks, false);
  };

  const handleLoadPresetCourse = (presetType: 'fms' | 'ent' | 'ent304' | 'ent308' | 'csc') => {
    if (presetType === 'ent308') {
      const res = loadSampleENT308();
      setCourses(res.courses);
      setPastQuestions(res.pastQuestions);
    } else if (presetType === 'ent304') {
      const res = loadSampleENT304();
      setCourses(res.courses);
      setPastQuestions(res.pastQuestions);
    } else if (presetType === 'fms') {
      const res = loadSampleFMS304();
      setCourses(res.courses);
      setPastQuestions(res.pastQuestions);
    } else if (presetType === 'ent') {
      const res = loadSampleENT302();
      setCourses(res.courses);
      setPastQuestions(res.pastQuestions);
    } else if (presetType === 'csc') {
      const res = loadSampleCSC202();
      setCourses(res.courses);
    }
  };

  const handleResetLibrary = () => {
    if (
      confirm(
        'Are you sure you want to reset your study vault? This returns the app to its clean starting state.'
      )
    ) {
      clearLibraryData();
      setCourses([]);
      setPastQuestions([]);
      setNotes([]);
      setBookmarks([]);
      setProgress({
        completedTopicIds: [],
        unitStatuses: {},
        readingMinutesByCourse: {},
        totalMinutesStudied: 0,
        flaggedForRevisionTopicIds: [],
        revisionCount: 0,
        quizScores: {},
        writtenEvaluations: {},
        mistakesBank: [],
      });
      setSelectedCourseId(null);
      setActiveReadingTopic(null);
      setCurrentView('home');
    }
  };

  // Resolve currently active reading topic
  const activeCourse = courses.find((c) => c.id === activeReadingTopic?.courseId);
  let activeUnit: StudyUnit | null = null;
  let activeTopic: StudyTopic | null = null;
  if (activeCourse && activeReadingTopic) {
    for (const mod of activeCourse.modules) {
      const u = mod.units.find((unit) => unit.id === activeReadingTopic.unitId);
      if (u) {
        activeUnit = u;
        const t = u.topics.find((top) => top.id === activeReadingTopic.topicId);
        if (t) {
          activeTopic = t;
          break;
        }
      }
    }
  }

  // Handle main navigation selection:
  // "Start Studying" always opens the Choose Your Course screen without auto-selecting any fixed course!
  const handleNavigate = (view: NavView) => {
    setActiveReadingTopic(null);
    if (view === 'start-studying') {
      setSelectedCourseId(null);
      setCurrentView('courses');
      return;
    }

    if (view === 'courses') {
      setSelectedCourseId(null);
    }

    setCurrentView(view);
  };

  if (!currentUser || !cloudSyncService.isAuthenticated()) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] text-[#191C1A]">
        <AuthView onAuthenticated={handleUserAuthenticated} />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#191C1A]">
      {/* Top Bar adhering to Top Bar Contract */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenAddCourse={() => setIsAddCourseModalOpen(true)}
        onOpenAITutor={() => setGlobalAiTutorOpen(true)}
        onOpenAudio={() => {
          const target = courses.find((c) => c.id === selectedCourseId) || courses[0];
          if (target) {
            handleOpenAudioPlayer(target);
          }
        }}
        onOpenAccount={() => setIsAccountModalOpen(true)}
        onLogout={handleLogout}
        syncStatus={syncStatus}
        syncMessage={syncMessage}
        userDisplayName={currentUser?.displayName || 'Student'}
        coursesCount={courses.length}
        courses={courses}
        selectedCourseId={selectedCourseId}
        onSelectCourse={(id) => setSelectedCourseId(id)}
      />

      {/* Main View Router */}
      <div className="flex-1">
        {/* If Active Reading Topic, prioritize Study Reader View */}
        {activeCourse && activeUnit && activeTopic ? (
          <StudyReaderView
            course={activeCourse}
            courses={courses}
            currentUnit={activeUnit}
            currentTopic={activeTopic}
            unitStatus={progress.unitStatuses?.[activeUnit.id] || 'in_progress'}
            isBookmarked={bookmarks.some((b) => b.topicId === activeTopic!.id)}
            isRevisionFlagged={
              progress.flaggedForRevisionTopicIds?.includes(activeTopic!.id) || false
            }
            notes={notes}
            pastQuestions={pastQuestions}
            completedTopicIds={progress.completedTopicIds}
            initialReadingPosition={
              (progress.unitReadingPositions?.[activeUnit.id]) ??
              (progress.lastReadingPositionRatio) ??
              0
            }
            onUpdateReadingPosition={handleReadingPositionUpdate}
            syncStatus={syncStatus}
            syncMessage={syncMessage}
            onBackToCourse={() => {
              setActiveReadingTopic(null);
              setSelectedCourseId(activeCourse.id);
              setCurrentView('courses');
            }}
            onSelectTopic={handleSelectTopic}
            onToggleBookmark={handleToggleBookmark}
            onToggleRevisionFlag={handleToggleRevisionFlag}
            onSaveNote={handleSaveNote}
            onMarkTopicCompleted={handleMarkTopicCompleted}
            onSetUnitStatus={handleSetUnitStatus}
            onRecordQuizScore={handleRecordQuizScore}
            onRecordWrittenEvaluation={handleRecordWrittenEvaluation}
            onOpenAudioPlayer={handleOpenAudioPlayer}
          />
        ) : (
          <>
            {currentView === 'home' && (
              <HomeView
                courses={courses}
                progress={progress}
                onNavigate={handleNavigate}
                onOpenAddCourse={() => setIsAddCourseModalOpen(true)}
                onSelectCourseAndTopic={(cId, uId, tId) => {
                  setSelectedCourseId(cId);
                  handleSelectTopic(cId, uId, tId);
                }}
                onLoadPresetCourse={handleLoadPresetCourse}
              />
            )}

            {currentView === 'courses' && (
              <>
                {selectedCourseId ? (
                  (() => {
                    const c = courses.find((x) => x.id === selectedCourseId);
                    if (!c) {
                      return (
                        <CoursesView
                          courses={courses}
                          progress={progress}
                          onOpenAddCourse={() => setIsAddCourseModalOpen(true)}
                          onSelectCourse={(id) => setSelectedCourseId(id)}
                          onDeleteCourse={handleDeleteCourse}
                          onSelectTopic={handleSelectTopic}
                          onLoadPresetCourse={handleLoadPresetCourse}
                          onReloadCourses={() => setCourses(getStoredCourses())}
                        />
                      );
                    }
                    return (
                      <CourseDetailView
                        course={c}
                        allCourses={courses}
                        progress={progress}
                        notes={notes}
                        pastQuestions={pastQuestions}
                        onBack={() => setSelectedCourseId(null)}
                        onSelectTopic={handleSelectTopic}
                        onOpenAddDocument={() => setIsAddDocumentModalOpen(true)}
                        onStartCoursePractice={(courseId) => {
                          setCurrentView('past-questions');
                        }}
                        onSetUnitStatus={handleSetUnitStatus}
                        onSaveNote={handleSaveNote}
                        onOpenAudioPlayer={handleOpenAudioPlayer}
                        onAddPastQuestions={(newQuestions, docInfo) => {
                          const existingIds = new Set(pastQuestions.map((q) => q.id));
                          const toAdd = newQuestions.filter((q) => !existingIds.has(q.id));
                          const updatedPQ = [...toAdd, ...pastQuestions];
                          setPastQuestions(updatedPQ);
                          saveStoredPastQuestions(updatedPQ);
                          let updatedCourses = courses;
                          if (docInfo) {
                            updatedCourses = courses.map((item) => {
                              if (item.id === c.id || item.code === c.code) {
                                const curDocs = item.pastQuestionDocuments || [];
                                const docExists = curDocs.some((d) => d.id === docInfo.id || d.name === docInfo.name);
                                return {
                                  ...item,
                                  pastQuestionDocuments: docExists ? curDocs : [...curDocs, docInfo],
                                };
                              }
                              return item;
                            });
                            setCourses(updatedCourses);
                            saveStoredCourses(updatedCourses);
                          }
                          triggerCloudSave(progress, notes, bookmarks, true, updatedPQ, updatedCourses);
                        }}
                      />
                    );
                  })()
                ) : (
                  <CoursesView
                    courses={courses}
                    progress={progress}
                    onOpenAddCourse={() => setIsAddCourseModalOpen(true)}
                    onSelectCourse={(id) => setSelectedCourseId(id)}
                    onDeleteCourse={handleDeleteCourse}
                    onSelectTopic={handleSelectTopic}
                    onLoadPresetCourse={handleLoadPresetCourse}
                    onReloadCourses={() => setCourses(getStoredCourses())}
                  />
                )}
              </>
            )}

            {currentView === 'past-questions' && (
              <PastQuestionsView
                courses={courses}
                pastQuestions={pastQuestions}
                progress={progress}
                selectedCourseId={selectedCourseId}
                onSelectCourse={(id) => setSelectedCourseId(id)}
                onAddPastQuestion={(q) => handleBatchAddPastQuestions([q])}
                onBatchAddPastQuestions={handleBatchAddPastQuestions}
                onOpenAddCourse={() => setIsAddCourseModalOpen(true)}
                onOpenAudioPlayer={(c, qs) => handleOpenAudioPlayer(c, null, qs, 'past-questions-revision')}
                onToggleBookmarkQuestion={handleToggleBookmarkQuestion}
                onMarkQuestionStatus={handleMarkQuestionStatus}
              />
            )}

            {currentView === 'notes' && (
              <NotesView
                notes={notes}
                courses={courses}
                onSaveNote={handleSaveNote}
                onUpdateNote={handleUpdateNote}
                onDeleteNote={handleDeleteNote}
                onOpenCourse={(cId) => {
                  setSelectedCourseId(cId);
                  setCurrentView('courses');
                }}
              />
            )}

            {currentView === 'progress' && (
              <ProgressView
                courses={courses}
                progress={progress}
                bookmarks={bookmarks}
                onSelectTopic={handleSelectTopic}
                onRemoveBookmark={handleRemoveBookmark}
                onToggleRevisionFlag={handleToggleRevisionFlag}
                onClearMistakeRecord={handleClearMistakeRecord}
                onOpenAddCourse={() => setIsAddCourseModalOpen(true)}
              />
            )}
          </>
        )}
      </div>

      {/* Global Modals */}
      <AddCourseModal
        isOpen={isAddCourseModalOpen}
        onClose={() => setIsAddCourseModalOpen(false)}
        onCourseCreated={handleCourseCreated}
        existingCourseCodes={courses.map((c) => c.code)}
        existingCourses={courses}
        onSelectExistingCourse={(id) => {
          setSelectedCourseId(id);
          setCurrentView('courses');
        }}
      />

      {selectedCourseId && courses.find((c) => c.id === selectedCourseId) && (
        <AddDocumentModal
          isOpen={isAddDocumentModalOpen}
          onClose={() => setIsAddDocumentModalOpen(false)}
          course={courses.find((c) => c.id === selectedCourseId)!}
          onDocumentAdded={handleDocumentAdded}
        />
      )}

      {/* Global AI Tutor Chatbot (lazy mounted) */}
      {courses.length > 0 && globalAiTutorOpen && (
        <AITutorChat
          courses={courses}
          initialCourseId={selectedCourseId}
          activeUnit={activeUnit}
          activeTopic={activeTopic}
          isOpen={globalAiTutorOpen}
          onClose={() => setGlobalAiTutorOpen(false)}
          onSaveExplanationAsNote={(title, content) => {
            const courseObj = courses.find((c) => c.id === selectedCourseId) || courses[0];
            handleSaveNote({
              courseId: courseObj.id,
              courseCode: courseObj.code,
              courseTitle: courseObj.title,
              unitId: activeUnit?.id,
              unitTitle: activeUnit?.title,
              topicId: activeTopic?.id || 'assistant-note',
              title,
              content,
              tags: ['AI Assistant', courseObj.code],
            });
          }}
        />
      )}

      {/* Quick Floating AI Tutor button if not currently reading in study view */}
      {!activeCourse && courses.length > 0 && !globalAiTutorOpen && (
        <button
          onClick={() => setGlobalAiTutorOpen(true)}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-3 bg-[#14382B] text-white rounded-full shadow-lg hover:bg-[#0E261D] transition-all hover:scale-105 active:scale-95 cursor-pointer"
          title="Open StudyVault AI Assistant"
        >
          <Sparkles className="w-4 h-4 text-[#E2C799]" />
          <span className="text-xs font-semibold">AI Assistant</span>
        </button>
      )}

      {/* Dedicated Voice Learning Audio Player */}
      {audioPlayerOpen && audioPlayerCourse && (
        <AudioStudyPlayer
          course={audioPlayerCourse}
          availableCourses={courses}
          currentUnit={audioPlayerUnit}
          allUnits={audioPlayerCourse.modules.flatMap((m) => m.units)}
          pastQuestions={getPastQuestionsForCourse(pastQuestions, audioPlayerCourse, courses)}
          isOpen={audioPlayerOpen}
          onClose={() => setAudioPlayerOpen(false)}
          onSelectUnit={(unitId) => {
            const u = audioPlayerCourse.modules.flatMap((m) => m.units).find((x) => x.id === unitId);
            if (u) {
              setAudioPlayerUnit(u);
            }
          }}
          onSelectCourse={(courseId) => {
            const c = courses.find((x) => x.id === courseId);
            if (c) {
              handleOpenAudioPlayer(c);
            }
          }}
        />
      )}

      {/* Account & Cloud Sync Modal */}
      <AccountSyncModal
        isOpen={isAccountModalOpen}
        onClose={() => setIsAccountModalOpen(false)}
        onLogout={handleLogout}
        onUserChanged={async () => {
          const user = cloudSyncService.getCurrentUser();
          if (user) {
            handleUserAuthenticated(user);
          } else {
            handleLogout();
          }
        }}
        onTriggerSync={async () => {
          await cloudSyncService.queueCloudSave(
            {
              progress,
              notes,
              bookmarks,
              lastActiveStudySession: progress.lastActiveStudySession,
              unitReadingPositions: progress.unitReadingPositions,
            },
            true
          );
        }}
      />

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
