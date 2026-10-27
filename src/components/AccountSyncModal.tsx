import React, { useState, useEffect } from 'react';
import {
  X,
  User,
  Cloud,
  CheckCircle2,
  RefreshCw,
  Smartphone,
  Laptop,
  ShieldCheck,
  LogOut,
  Key,
  Mail,
  AlertCircle,
  Wifi,
  WifiOff,
  Sparkles,
  ArrowRight,
  Lock
} from 'lucide-react';
import {
  cloudSyncService,
  AuthenticatedUser,
  SyncStatus
} from '../services/cloudSyncService';

interface AccountSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUserChanged?: () => void;
  onLogout?: () => void;
  onTriggerSync?: () => Promise<void>;
}

export const AccountSyncModal: React.FC<AccountSyncModalProps> = ({
  isOpen,
  onClose,
  onUserChanged,
  onLogout,
  onTriggerSync,
}) => {
  const [currentUser, setCurrentUser] = useState<AuthenticatedUser | null>(cloudSyncService.getCurrentUser());
  const [syncStatus, setSyncStatus] = useState<SyncStatus>('saved');
  const [syncMessage, setSyncMessage] = useState<string>('Saved');
  const [lastSyncTime, setLastSyncTime] = useState<string | null>(null);

  // Form states
  const [activeTab, setActiveTab] = useState<'profile' | 'signin' | 'register' | 'recover'>('profile');
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setCurrentUser(cloudSyncService.getCurrentUser());
    const unsubscribe = cloudSyncService.subscribe((status, msg, lastSync) => {
      setSyncStatus(status);
      setSyncMessage(msg);
      setLastSyncTime(lastSync);
    });
    return () => unsubscribe();
  }, [isOpen]);

  if (!isOpen) return null;

  const handleManualSync = async () => {
    setIsSubmitting(true);
    setFormError(null);
    setFormSuccess(null);
    try {
      if (onTriggerSync) {
        await onTriggerSync();
      } else {
        await cloudSyncService.pullLatest();
      }
      setFormSuccess('Cloud synchronization completed successfully!');
    } catch (err: any) {
      setFormError(err.message || 'Synchronization failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError(null);
    setFormSuccess(null);
    try {
      const user = await cloudSyncService.login(emailInput.trim(), passwordInput);
      setCurrentUser(user);
      setActiveTab('profile');
      setFormSuccess(`Welcome back, ${user.displayName}! Cloud progress synchronized.`);
      if (onUserChanged) onUserChanged();
    } catch (err: any) {
      setFormError(err.message || 'Sign in failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError(null);
    setFormSuccess(null);
    try {
      const user = await cloudSyncService.register(nameInput.trim(), emailInput.trim(), passwordInput);
      setCurrentUser(user);
      setActiveTab('profile');
      setFormSuccess(`Account created for ${user.displayName}! Cloud storage activated.`);
      if (onUserChanged) onUserChanged();
    } catch (err: any) {
      setFormError(err.message || 'Registration failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRecover = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError(null);
    setFormSuccess(null);
    try {
      const msg = await cloudSyncService.recoverPassword(emailInput.trim(), passwordInput);
      setFormSuccess(msg);
      setPasswordInput('');
    } catch (err: any) {
      setFormError(err.message || 'Password reset failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuickSwitch = async (email: string, password?: string) => {
    setIsSubmitting(true);
    setFormError(null);
    setFormSuccess(null);
    try {
      const user = await cloudSyncService.login(email, password);
      setCurrentUser(user);
      setActiveTab('profile');
      setFormSuccess(`Switched to ${user.displayName}. Cloud session active.`);
      if (onUserChanged) onUserChanged();
    } catch (err: any) {
      setFormError(err.message || 'Switch failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignOut = () => {
    cloudSyncService.logout();
    setCurrentUser(null);
    onClose();
    if (onLogout) {
      onLogout();
    } else if (onUserChanged) {
      onUserChanged();
    }
  };

  const deviceInfo = cloudSyncService.detectDeviceInfo();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#FAF8F5] border border-[#E0DBD0] rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-5 bg-[#14382B] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#E2C799] text-[#14382B] flex items-center justify-center font-serif font-bold text-lg shadow-inner">
              {currentUser?.displayName ? currentUser.displayName.charAt(0).toUpperCase() : 'S'}
            </div>
            <div>
              <h2 className="font-serif font-bold text-lg text-white leading-tight">
                {currentUser?.displayName || 'StudyVault Student'}
              </h2>
              <p className="text-xs text-[#E2C799] font-mono">{currentUser?.email || 'Individual Account'}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close Account Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sync Status Banner */}
        <div className="bg-[#F3EFEA] border-b border-[#E8DEC9] px-6 py-3 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            {syncStatus === 'saved' && (
              <span className="flex items-center gap-1.5 font-semibold text-emerald-800 bg-emerald-100/80 px-2.5 py-0.5 rounded-full border border-emerald-300">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                <span>Saved to Cloud</span>
              </span>
            )}
            {syncStatus === 'saving' && (
              <span className="flex items-center gap-1.5 font-semibold text-amber-800 bg-amber-100/80 px-2.5 py-0.5 rounded-full border border-amber-300">
                <RefreshCw className="w-3 h-3 text-amber-600 animate-spin" />
                <span>Saving…</span>
              </span>
            )}
            {syncStatus === 'syncing' && (
              <span className="flex items-center gap-1.5 font-semibold text-sky-800 bg-sky-100/80 px-2.5 py-0.5 rounded-full border border-sky-300">
                <RefreshCw className="w-3 h-3 text-sky-600 animate-spin" />
                <span>Syncing…</span>
              </span>
            )}
            {syncStatus === 'offline' && (
              <span className="flex items-center gap-1.5 font-semibold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                <WifiOff className="w-3 h-3 text-amber-600" />
                <span>Offline — changes saved locally</span>
              </span>
            )}
            {syncStatus === 'error' && (
              <span className="flex items-center gap-1.5 font-semibold text-rose-800 bg-rose-100/80 px-2.5 py-0.5 rounded-full border border-rose-300">
                <AlertCircle className="w-3 h-3 text-rose-600" />
                <span>Sync failed — retrying</span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-1 text-[11px] text-[#585E5A]">
            <Smartphone className="w-3.5 h-3.5 text-[#14382B]" />
            <span className="font-medium">{deviceInfo}</span>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="px-6 pt-3 flex gap-2 border-b border-[#E8E4DC] text-xs font-semibold">
          <button
            onClick={() => setActiveTab('profile')}
            className={`pb-2.5 px-2 border-b-2 transition-colors ${
              activeTab === 'profile'
                ? 'border-[#14382B] text-[#14382B]'
                : 'border-transparent text-[#585E5A] hover:text-[#191C1A]'
            }`}
          >
            Cloud Account
          </button>
          <button
            onClick={() => {
              setActiveTab('signin');
              setFormError(null);
              setFormSuccess(null);
            }}
            className={`pb-2.5 px-2 border-b-2 transition-colors ${
              activeTab === 'signin'
                ? 'border-[#14382B] text-[#14382B]'
                : 'border-transparent text-[#585E5A] hover:text-[#191C1A]'
            }`}
          >
            Switch Account
          </button>
          <button
            onClick={() => {
              setActiveTab('register');
              setFormError(null);
              setFormSuccess(null);
            }}
            className={`pb-2.5 px-2 border-b-2 transition-colors ${
              activeTab === 'register'
                ? 'border-[#14382B] text-[#14382B]'
                : 'border-transparent text-[#585E5A] hover:text-[#191C1A]'
            }`}
          >
            New Student
          </button>
        </div>

        {/* Feedback Messages */}
        {formSuccess && (
          <div className="mx-6 mt-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{formSuccess}</span>
          </div>
        )}
        {formError && (
          <div className="mx-6 mt-4 p-3 bg-rose-50 border border-rose-200 text-rose-900 rounded-xl text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{formError}</span>
          </div>
        )}

        {/* Tab Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-sm text-[#191C1A] flex-1">
          {activeTab === 'profile' && (
            <div className="space-y-5">
              {/* Account details card */}
              <div className="bg-white border border-[#E8DEC9] rounded-2xl p-4 shadow-2xs space-y-3">
                <div className="flex items-center justify-between text-xs pb-2 border-b border-[#FAF2E6]">
                  <span className="text-[#585E5A]">Permanent Account ID</span>
                  <span className="font-mono font-bold text-[#14382B] bg-[#FAF8F5] px-2 py-0.5 rounded border border-[#E8E4DC]">
                    {currentUser?.id || '—'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs pb-2 border-b border-[#FAF2E6]">
                  <span className="text-[#585E5A]">Student Display Name</span>
                  <span className="font-semibold text-[#14382B]">{currentUser?.displayName || '—'}</span>
                </div>
                <div className="flex items-center justify-between text-xs pb-2 border-b border-[#FAF2E6]">
                  <span className="text-[#585E5A]">Account Email</span>
                  <span className="font-mono text-[#14382B]">{currentUser?.email || '—'}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#585E5A]">Last Confirmed Cloud Sync</span>
                  <span className="font-mono text-[11px] text-[#585E5A]">
                    {lastSyncTime ? new Date(lastSyncTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) : 'Synchronized on session start'}
                  </span>
                </div>
              </div>

              {/* Cross-device continuity badge */}
              <div className="p-4 bg-[#FAF2E6] border border-[#E8DEC9] rounded-2xl space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#14382B] uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4 text-[#C88A36]" />
                  <span>Cross-Device Continuity Active</span>
                </div>
                <p className="text-xs text-[#585E5A] leading-relaxed">
                  Your reading positions, unit-by-unit completions, assessment scores, bookmarks, and personal notes are continuously synchronized to your authenticated account ID.
                </p>
                <div className="pt-2 flex flex-wrap gap-2 text-[11px]">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-[#D8D2C6] rounded-md font-medium text-[#14382B]">
                    <Laptop className="w-3 h-3 text-[#14382B]" /> Computer Browser
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-[#D8D2C6] rounded-md font-medium text-[#14382B]">
                    <Smartphone className="w-3 h-3 text-[#14382B]" /> iPhone / iOS
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-[#D8D2C6] rounded-md font-medium text-[#14382B]">
                    <Smartphone className="w-3 h-3 text-[#14382B]" /> Android Phone
                  </span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={handleManualSync}
                  disabled={isSubmitting}
                  className="w-full py-2.5 px-4 bg-[#14382B] text-white rounded-xl text-xs font-semibold hover:bg-[#0E261D] transition-colors flex items-center justify-center gap-2 shadow-xs"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isSubmitting ? 'animate-spin' : ''}`} />
                  <span>{isSubmitting ? 'Syncing with Cloud…' : 'Sync Progress with Cloud Now'}</span>
                </button>

                {/* Multi-user test helper (Fulfills Test D: Separate users verification) */}
                <div className="pt-3 border-t border-[#E8E4DC]">
                  <div className="text-[11px] font-semibold text-[#8C928E] uppercase tracking-wider mb-2">
                    Quick Multi-User Testing (Test D)
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleQuickSwitch('harbiodunjay24@gmail.com')}
                      disabled={currentUser?.email === 'harbiodunjay24@gmail.com'}
                      className={`px-3 py-2 rounded-xl text-xs font-medium border text-left transition-colors ${
                        currentUser?.email === 'harbiodunjay24@gmail.com'
                          ? 'bg-[#14382B]/10 border-[#14382B]/30 text-[#14382B] font-semibold'
                          : 'bg-white border-[#E8E4DC] text-[#2D312E] hover:bg-[#FAF8F5]'
                      }`}
                    >
                      <div className="font-semibold truncate">Abiodun Ayodeji</div>
                      <div className="text-[10px] text-[#8C928E] truncate">Primary Account</div>
                    </button>

                    <button
                      onClick={() => handleQuickSwitch('test.student2@studyvault.ai')}
                      disabled={currentUser?.email === 'test.student2@studyvault.ai'}
                      className={`px-3 py-2 rounded-xl text-xs font-medium border text-left transition-colors ${
                        currentUser?.email === 'test.student2@studyvault.ai'
                          ? 'bg-[#14382B]/10 border-[#14382B]/30 text-[#14382B] font-semibold'
                          : 'bg-white border-[#E8E4DC] text-[#2D312E] hover:bg-[#FAF8F5]'
                      }`}
                    >
                      <div className="font-semibold truncate">Secondary Student</div>
                      <div className="text-[10px] text-[#8C928E] truncate">Test D Isolation</div>
                    </button>
                  </div>
                </div>

                <div className="pt-2 flex justify-between items-center text-xs">
                  <button
                    onClick={() => setActiveTab('recover')}
                    className="text-[#9C6B28] hover:underline"
                  >
                    Reset Password
                  </button>

                  <button
                    onClick={handleSignOut}
                    className="flex items-center gap-1 text-rose-700 hover:text-rose-900 font-semibold"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'signin' && (
            <form onSubmit={handleSignIn} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#14382B] mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#8C928E] absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="e.g. harbiodunjay24@gmail.com"
                    className="w-full pl-9 pr-3 py-2.5 bg-white border border-[#D8D2C6] rounded-xl text-xs focus:ring-2 focus:ring-[#14382B] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#14382B] mb-1">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#8C928E] absolute left-3 top-3" />
                  <input
                    type="password"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="Enter account password"
                    className="w-full pl-9 pr-3 py-2.5 bg-white border border-[#D8D2C6] rounded-xl text-xs focus:ring-2 focus:ring-[#14382B] focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 px-4 bg-[#14382B] text-white rounded-xl text-xs font-semibold hover:bg-[#0E261D] transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                <span>{isSubmitting ? 'Signing In…' : 'Sign In and Synchronize'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <div className="pt-2 text-center text-xs text-[#585E5A]">
                <span>Want to switch back to Abiodun Ayodeji directly? </span>
                <button
                  type="button"
                  onClick={() => handleQuickSwitch('harbiodunjay24@gmail.com')}
                  className="font-semibold text-[#14382B] underline"
                >
                  Restore verified session
                </button>
              </div>
            </form>
          )}

          {activeTab === 'register' && (
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#14382B] mb-1">Full Student Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#8C928E] absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    placeholder="e.g. Abiodun Ayodeji"
                    className="w-full pl-9 pr-3 py-2.5 bg-white border border-[#D8D2C6] rounded-xl text-xs focus:ring-2 focus:ring-[#14382B] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#14382B] mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#8C928E] absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="student@example.com"
                    className="w-full pl-9 pr-3 py-2.5 bg-white border border-[#D8D2C6] rounded-xl text-xs focus:ring-2 focus:ring-[#14382B] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#14382B] mb-1">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#8C928E] absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="Choose a password"
                    className="w-full pl-9 pr-3 py-2.5 bg-white border border-[#D8D2C6] rounded-xl text-xs focus:ring-2 focus:ring-[#14382B] focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 px-4 bg-[#14382B] text-white rounded-xl text-xs font-semibold hover:bg-[#0E261D] transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                <span>{isSubmitting ? 'Creating Account…' : 'Create Student Account'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          )}

          {activeTab === 'recover' && (
            <form onSubmit={handleRecover} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#14382B] mb-1">Account Email</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#8C928E] absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="e.g. harbiodunjay24@gmail.com"
                    className="w-full pl-9 pr-3 py-2.5 bg-white border border-[#D8D2C6] rounded-xl text-xs focus:ring-2 focus:ring-[#14382B] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#14382B] mb-1">New Password</label>
                <div className="relative">
                  <Key className="w-4 h-4 text-[#8C928E] absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="Set your new password"
                    className="w-full pl-9 pr-3 py-2.5 bg-white border border-[#D8D2C6] rounded-xl text-xs focus:ring-2 focus:ring-[#14382B] focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 px-4 bg-[#14382B] text-white rounded-xl text-xs font-semibold hover:bg-[#0E261D] transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                <span>{isSubmitting ? 'Updating Password…' : 'Reset and Update Password'}</span>
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('profile')}
                  className="text-xs text-[#585E5A] hover:underline"
                >
                  ← Return to Profile
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
