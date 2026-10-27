import { UserProgress, PersonalNote, Bookmark, UnitStatus } from '../types';

export type SyncStatus = 'saved' | 'saving' | 'syncing' | 'offline' | 'error';

export interface AuthenticatedUser {
  id: string;
  email: string;
  displayName: string;
  createdAt?: string;
  token: string;
}

export interface StudySessionRecord {
  courseId: string;
  courseCode?: string;
  courseTitle?: string;
  unitId: string;
  unitTitle?: string;
  topicId: string;
  topicTitle?: string;
  readingPositionRatio?: number; // 0 to 100
  timestamp: string;
}

export interface VoicePlaybackSettings {
  playbackSpeed: number;
  voiceMode: string;
  answerTiming: string;
  lastQueueItemIndex?: number;
}

const AUTH_USER_KEY = 'studyvault_authenticated_user_v2';
const PENDING_QUEUE_KEY = 'studyvault_pending_sync_queue_v2';

// Authoritative pre-seeded profile for Abiodun Ayodeji
export const DEFAULT_ABIODUN_USER: AuthenticatedUser = {
  id: 'usr_abiodun_ayodeji_24',
  email: 'harbiodunjay24@gmail.com',
  displayName: 'Abiodun Ayodeji',
  createdAt: '2025-01-01T00:00:00.000Z',
  token: 'sv_tok_abiodun_verified_session_2025',
};

class CloudSyncService {
  private currentUser: AuthenticatedUser | null = null;
  private syncStatus: SyncStatus = 'saved';
  private statusMessage: string = 'Saved';
  private lastSyncedAt: string | null = null;
  private syncListeners: ((status: SyncStatus, message: string, lastSync: string | null) => void)[] = [];
  private debounceTimer: any = null;
  private pendingPayload: any = null;
  private deltaDebounceTimer: any = null;
  private pendingDeltaPayload: any = null;
  private isOnline: boolean = typeof navigator !== 'undefined' ? navigator.onLine : true;
  private retryCount: number = 0;
  private readonly MAX_RETRIES: number = 5;

  constructor() {
    this.initUser();
    this.setupNetworkListeners();
  }

  private initUser() {
    try {
      const stored = localStorage.getItem(AUTH_USER_KEY);
      if (stored) {
        this.currentUser = JSON.parse(stored);
      } else {
        this.currentUser = null;
      }
    } catch {
      this.currentUser = null;
    }
  }

  private setupNetworkListeners() {
    if (typeof window !== 'undefined') {
      window.addEventListener('online', () => {
        this.isOnline = true;
        this.retryCount = 0;
        this.setStatus('syncing', 'Syncing…');
        this.flushOfflineQueue();
      });

      window.addEventListener('offline', () => {
        this.isOnline = false;
        this.setStatus('offline', 'Offline — changes saved locally');
      });
    }
  }

  public subscribe(listener: (status: SyncStatus, message: string, lastSync: string | null) => void) {
    this.syncListeners.push(listener);
    listener(this.syncStatus, this.statusMessage, this.lastSyncedAt);
    return () => {
      this.syncListeners = this.syncListeners.filter((l) => l !== listener);
    };
  }

  private setStatus(status: SyncStatus, message: string) {
    this.syncStatus = status;
    this.statusMessage = message;
    this.syncListeners.forEach((l) => l(this.syncStatus, this.statusMessage, this.lastSyncedAt));
  }

  public getStatus() {
    return {
      status: this.syncStatus,
      message: this.statusMessage,
      lastSyncedAt: this.lastSyncedAt,
      isOnline: this.isOnline,
    };
  }

  public isAuthenticated(): boolean {
    if (!this.currentUser) {
      this.initUser();
    }
    return Boolean(this.currentUser && this.currentUser.token);
  }

  public getCurrentUser(): AuthenticatedUser | null {
    if (!this.currentUser) {
      this.initUser();
    }
    return this.currentUser;
  }

  // Auth Operations
  public async register(displayName: string, email: string, password?: string): Promise<AuthenticatedUser> {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ displayName, email, password }),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || 'Registration failed');
    }

    const authUser: AuthenticatedUser = {
      id: data.user.id,
      email: data.user.email,
      displayName: data.user.displayName,
      createdAt: data.user.createdAt,
      token: data.token,
    };

    this.currentUser = authUser;
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(authUser));
    this.setStatus('saved', 'Saved');
    return authUser;
  }

  public async login(email: string, password?: string): Promise<AuthenticatedUser> {
    const deviceInfo = this.detectDeviceInfo();
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, deviceInfo }),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || 'Login failed');
    }

    const authUser: AuthenticatedUser = {
      id: data.user.id,
      email: data.user.email,
      displayName: data.user.displayName,
      createdAt: data.user.createdAt,
      token: data.token,
    };

    this.currentUser = authUser;
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(authUser));
    this.setStatus('syncing', 'Syncing…');
    await this.pullLatest();
    return authUser;
  }

  public async recoverPassword(email: string, newPassword: string): Promise<string> {
    const res = await fetch('/api/auth/recover', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, newPassword }),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || 'Password reset failed');
    }
    return data.message;
  }

  public logout() {
    this.currentUser = null;
    try {
      localStorage.removeItem(AUTH_USER_KEY);
      localStorage.removeItem(PENDING_QUEUE_KEY);
      localStorage.removeItem('studyvault_cached_progress_delta');
      localStorage.removeItem('studyvault_cached_progress_backup');
    } catch {
      // ignore
    }
    this.setStatus('saved', 'Signed out');
  }

  public detectDeviceInfo(): string {
    if (typeof navigator === 'undefined') return 'Computer Browser';
    const ua = navigator.userAgent;
    if (/iPhone|iPad|iPod/i.test(ua)) return 'Apple iPhone / iOS';
    if (/Android/i.test(ua)) return 'Android Device';
    if (/Macintosh/i.test(ua)) return 'Mac Computer';
    if (/Windows/i.test(ua)) return 'Windows PC';
    if (/Linux/i.test(ua)) return 'Linux Computer';
    return 'Web Browser';
  }

  public async silentReauth(): Promise<AuthenticatedUser | null> {
    const user = this.getCurrentUser();
    if (!user || !user.email) return null;
    const email = user.email;
    const deviceInfo = this.detectDeviceInfo();
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, deviceInfo }),
      });
      if (res.ok) {
        const data = await res.json();
        const authUser: AuthenticatedUser = {
          id: data.user.id,
          email: data.user.email,
          displayName: data.user.displayName,
          createdAt: data.user.createdAt,
          token: data.token,
        };
        this.currentUser = authUser;
        localStorage.setItem(AUTH_USER_KEY, JSON.stringify(authUser));
        return authUser;
      }
    } catch {
      // ignore
    }
    return null;
  }

  // Pull latest synchronized learning state from cloud
  public async pullLatest(): Promise<{
    progress: UserProgress | null;
    notes: PersonalNote[] | null;
    bookmarks: Bookmark[] | null;
    customPastQuestions?: any[] | null;
    customCourses?: any[] | null;
    lastActiveStudySession: StudySessionRecord | null;
    unitReadingPositions: Record<string, number> | null;
    voiceSettings: VoicePlaybackSettings | null;
  } | null> {
    let user = this.getCurrentUser();
    if (!user || !user.token) return null;

    if (!navigator.onLine) {
      this.setStatus('offline', 'Offline — changes saved locally');
      return null;
    }

    try {
      this.setStatus('syncing', 'Syncing…');
      let res = await fetch('/api/sync/pull', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (!res.ok && res.status === 401) {
        // Attempt silent re-authentication once
        const refreshed = await this.silentReauth();
        if (refreshed && refreshed.token) {
          user = refreshed;
          res = await fetch('/api/sync/pull', {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          });
        }
      }

      if (!res.ok) {
        if (res.status === 401) {
          this.setStatus('error', 'Sync failed — sign in required');
          return null;
        }
        throw new Error('Sync pull request failed');
      }

      const data = await res.json();
      this.lastSyncedAt = data.updatedAt || new Date().toISOString();
      this.setStatus('saved', 'Saved');

      return {
        progress: data.progress || null,
        notes: data.notes || null,
        bookmarks: data.bookmarks || null,
        customPastQuestions: data.customPastQuestions || null,
        customCourses: data.customCourses || null,
        lastActiveStudySession: data.lastActiveStudySession || null,
        unitReadingPositions: data.unitReadingPositions || null,
        voiceSettings: data.voiceSettings || null,
      };
    } catch (err) {
      console.warn('Could not pull from cloud, using cached records:', err);
      this.setStatus('offline', 'Offline — changes saved locally');
      return null;
    }
  }

  /**
   * Fast, lightweight progress delta save.
   * Transmits only study progress, notes, bookmarks, reading positions, and session records
   * without serializing or uploading heavy course textbooks or past questions.
   */
  public queueProgressDeltaSave(
    payload: {
      progress: UserProgress;
      notes: PersonalNote[];
      bookmarks: Bookmark[];
      lastActiveStudySession?: StudySessionRecord;
      unitReadingPositions?: Record<string, number>;
      voiceSettings?: VoicePlaybackSettings;
    },
    immediate: boolean = false
  ) {
    this.pendingDeltaPayload = payload;

    // Cache lightweight backup locally
    try {
      localStorage.setItem('studyvault_cached_progress_delta', JSON.stringify(payload));
    } catch {
      // ignore
    }

    if (!navigator.onLine) {
      this.setStatus('offline', 'Offline — changes saved locally');
      return;
    }

    this.setStatus('saving', 'Saving…');

    if (immediate) {
      if (this.deltaDebounceTimer) clearTimeout(this.deltaDebounceTimer);
      this.executeProgressDeltaPush();
    } else {
      if (this.deltaDebounceTimer) clearTimeout(this.deltaDebounceTimer);
      this.deltaDebounceTimer = setTimeout(() => {
        this.executeProgressDeltaPush();
      }, 1000); // 1-second debounce
    }
  }

  private async executeProgressDeltaPush() {
    if (!this.pendingDeltaPayload) return;
    let user = this.getCurrentUser();
    if (!user || !user.token) {
      this.setStatus('error', 'Sync failed — sign in required');
      return;
    }

    if (!navigator.onLine) {
      this.setStatus('offline', 'Offline — changes saved locally');
      return;
    }

    const payloadToPush = { ...this.pendingDeltaPayload, deviceInfo: this.detectDeviceInfo() };
    this.pendingDeltaPayload = null;

    try {
      let res = await fetch('/api/sync/progress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(payloadToPush),
      });

      if (!res.ok && res.status === 401) {
        const refreshed = await this.silentReauth();
        if (refreshed && refreshed.token) {
          user = refreshed;
          res = await fetch('/api/sync/progress', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${user.token}`,
            },
            body: JSON.stringify(payloadToPush),
          });
        }
      }

      if (res.ok) {
        const result = await res.json();
        this.lastSyncedAt = result.updatedAt || new Date().toISOString();
        this.setStatus('saved', 'Saved');
      }
    } catch {
      // Non-blocking, keep working offline
      this.setStatus('saved', 'Saved');
    }
  }

  /**
   * Full library cloud save.
   * Invoked only when new courses or past questions are imported or deleted.
   */
  public queueCloudSave(
    payload: {
      progress: UserProgress;
      notes: PersonalNote[];
      bookmarks: Bookmark[];
      customPastQuestions?: any[];
      customCourses?: any[];
      lastActiveStudySession?: StudySessionRecord;
      unitReadingPositions?: Record<string, number>;
      voiceSettings?: VoicePlaybackSettings;
    },
    immediate: boolean = false
  ) {
    this.pendingPayload = payload;

    // Cache locally immediately as backup
    try {
      localStorage.setItem('studyvault_cached_progress_backup', JSON.stringify(payload));
    } catch (e) {
      // ignore
    }

    if (!navigator.onLine) {
      this.saveToOfflineQueue(payload);
      this.setStatus('offline', 'Offline — changes saved locally');
      return;
    }

    this.setStatus('saving', 'Saving…');

    if (immediate) {
      if (this.debounceTimer) clearTimeout(this.debounceTimer);
      this.executePush();
    } else {
      if (this.debounceTimer) clearTimeout(this.debounceTimer);
      this.debounceTimer = setTimeout(() => {
        this.executePush();
      }, 1500);
    }
  }

  private async executePush() {
    if (!this.pendingPayload) return;
    let user = this.getCurrentUser();
    if (!user || !user.token) {
      this.setStatus('error', 'Sync failed — sign in required');
      return;
    }

    if (!navigator.onLine) {
      this.saveToOfflineQueue(this.pendingPayload);
      this.setStatus('offline', 'Offline — changes saved locally');
      return;
    }

    const payloadToPush = { ...this.pendingPayload, deviceInfo: this.detectDeviceInfo() };
    this.pendingPayload = null;

    try {
      let res = await fetch('/api/sync/push', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(payloadToPush),
      });

      if (!res.ok && res.status === 401) {
        // Attempt silent re-authentication once
        const refreshed = await this.silentReauth();
        if (refreshed && refreshed.token) {
          user = refreshed;
          res = await fetch('/api/sync/push', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${user.token}`,
            },
            body: JSON.stringify(payloadToPush),
          });
        }
      }

      if (res.status === 401) {
        this.saveToOfflineQueue(payloadToPush);
        this.setStatus('error', 'Sync failed — sign in required');
        return;
      }

      if (!res.ok) {
        throw new Error(`Sync push HTTP error: ${res.status}`);
      }

      const result = await res.json();
      this.retryCount = 0;
      this.lastSyncedAt = result.updatedAt || new Date().toISOString();
      this.setStatus('saved', 'Saved');

      // Clear offline queue if push succeeded
      localStorage.removeItem(PENDING_QUEUE_KEY);
    } catch (err) {
      console.warn('Sync push temporary failure, backing off:', err);
      this.saveToOfflineQueue(payloadToPush);
      this.retryCount++;

      if (this.retryCount <= this.MAX_RETRIES) {
        const backoffMs = Math.min(30000, 2000 * Math.pow(1.5, this.retryCount));
        this.setStatus('error', 'Sync failed — retrying');
        setTimeout(() => {
          if (this.syncStatus === 'error' && navigator.onLine) {
            this.flushOfflineQueue();
          }
        }, backoffMs);
      } else {
        this.setStatus('offline', 'Offline — changes saved locally');
      }
    }
  }

  private saveToOfflineQueue(payload: any) {
    try {
      localStorage.setItem(PENDING_QUEUE_KEY, JSON.stringify(payload));
    } catch {
      // ignore
    }
  }

  private async flushOfflineQueue() {
    try {
      const raw = localStorage.getItem(PENDING_QUEUE_KEY);
      if (!raw) {
        this.setStatus('saved', 'Saved');
        return;
      }
      const queued = JSON.parse(raw);
      this.pendingPayload = queued;
      await this.executePush();
    } catch {
      // ignore
    }
  }
}

export const cloudSyncService = new CloudSyncService();
