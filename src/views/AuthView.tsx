import React, { useState } from 'react';
import {
  BookOpen,
  Lock,
  Mail,
  User,
  Eye,
  EyeOff,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  School,
  KeyRound,
  RotateCcw
} from 'lucide-react';
import { cloudSyncService, AuthenticatedUser } from '../services/cloudSyncService';

interface AuthViewProps {
  onAuthenticated: (user: AuthenticatedUser) => void;
  defaultEmail?: string;
}

type AuthMode = 'login' | 'register' | 'recover';

export const AuthView: React.FC<AuthViewProps> = ({ onAuthenticated, defaultEmail = '' }) => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState(defaultEmail);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [institution, setInstitution] = useState('National Open University of Nigeria (NOUN)');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail) {
      setError('Please enter your student email address.');
      return;
    }
    if (!password) {
      setError('Please enter your account password.');
      return;
    }

    setLoading(true);
    try {
      const user = await cloudSyncService.login(cleanEmail, password);
      onAuthenticated(user);
    } catch (err: any) {
      setError(err?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    const cleanName = displayName.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanName) {
      setError('Please enter your full student name.');
      return;
    }
    if (!cleanEmail || !cleanEmail.includes('@')) {
      setError('Please provide a valid student email address.');
      return;
    }
    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters in length.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match. Please re-enter.');
      return;
    }

    setLoading(true);
    try {
      const user = await cloudSyncService.register(cleanName, cleanEmail, password);
      setSuccessMessage('Account created successfully! Loading your personal study vault...');
      setTimeout(() => {
        onAuthenticated(user);
      }, 700);
    } catch (err: any) {
      setError(err?.message || 'Registration failed. This email may already be registered.');
    } finally {
      setLoading(false);
    }
  };

  const handleRecover = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail) {
      setError('Please enter your registered email address.');
      return;
    }
    if (!password || password.length < 6) {
      setError('New password must be at least 6 characters in length.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      const msg = await cloudSyncService.recoverPassword(cleanEmail, password);
      setSuccessMessage(msg || 'Password updated successfully. Signing you in...');
      const user = await cloudSyncService.login(cleanEmail, password);
      setTimeout(() => {
        onAuthenticated(user);
      }, 800);
    } catch (err: any) {
      setError(err?.message || 'Password reset failed. Verify that your email is correct.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickScholarLogin = async (scholarEmail: string, scholarPass?: string) => {
    setError(null);
    setEmail(scholarEmail);
    if (scholarPass) setPassword(scholarPass);
    setLoading(true);
    try {
      const user = await cloudSyncService.login(scholarEmail, scholarPass || 'StudyVault2025!');
      onAuthenticated(user);
    } catch (err: any) {
      setError(err?.message || 'Quick login failed. Please sign in manually.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#191C1A] flex flex-col justify-between selection:bg-[#14382B] selection:text-white">
      {/* Top Header */}
      <header className="border-b border-[#E8E4DC] bg-white/80 backdrop-blur-md px-6 py-4 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#14382B] flex items-center justify-center text-white shadow-xs">
              <BookOpen className="w-5 h-5 text-[#E2C799]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif font-black tracking-wider text-base text-[#14382B]">
                  STUDYVAULT AI
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#14382B]/10 text-[#14382B] font-bold">
                  v13
                </span>
              </div>
              <p className="text-[11px] text-[#585E5A]">
                Academic Textbook & Examination Engine
              </p>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs text-[#585E5A]">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>Encrypted Individual Student Vaults</span>
          </div>
        </div>
      </header>

      {/* Main Authentication Card */}
      <main className="flex-1 flex items-center justify-center px-4 py-8 sm:py-12">
        <div className="max-w-md w-full space-y-6">
          {/* Welcome Intro */}
          <div className="text-center space-y-2">
            <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#14382B]">
              {mode === 'login' && 'Sign in to your StudyVault'}
              {mode === 'register' && 'Create your Student Account'}
              {mode === 'recover' && 'Reset your Vault Password'}
            </h1>
            <p className="text-xs sm:text-sm text-[#585E5A] max-w-sm mx-auto">
              {mode === 'login' && 'Access your private textbook materials, extracted units, notes, bookmarks, and past questions.'}
              {mode === 'register' && 'Join StudyVault AI with an isolated, private workspace for your courses and study materials.'}
              {mode === 'recover' && 'Enter your registered email address and choose a new password.'}
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white border border-[#E8E4DC] rounded-2xl p-6 sm:p-8 shadow-sm space-y-5">
            {/* Mode Switcher Tabs */}
            <div className="flex rounded-lg bg-[#FAF8F5] p-1 border border-[#E8E4DC] text-xs font-semibold">
              <button
                type="button"
                onClick={() => {
                  setMode('login');
                  setError(null);
                  setSuccessMessage(null);
                }}
                className={`flex-1 py-2 rounded-md transition-all ${
                  mode === 'login'
                    ? 'bg-white text-[#14382B] shadow-xs'
                    : 'text-[#585E5A] hover:text-[#191C1A]'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode('register');
                  setError(null);
                  setSuccessMessage(null);
                }}
                className={`flex-1 py-2 rounded-md transition-all ${
                  mode === 'register'
                    ? 'bg-white text-[#14382B] shadow-xs'
                    : 'text-[#585E5A] hover:text-[#191C1A]'
                }`}
              >
                Create Account
              </button>
            </div>

            {/* Error Banner */}
            {error && (
              <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-800 flex items-start gap-2.5 animate-in fade-in">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <div className="flex-1 leading-relaxed">{error}</div>
              </div>
            )}

            {/* Success Banner */}
            {successMessage && (
              <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-start gap-2.5 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div className="flex-1 leading-relaxed">{successMessage}</div>
              </div>
            )}

            {/* Mode: Sign In */}
            {mode === 'login' && (
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-[#14382B]">
                    Student Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#8C928E] absolute left-3 top-3 pointer-events-none" />
                    <input
                      type="email"
                      required
                      placeholder="e.g. harbiodunjay24@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-9 pr-3.5 py-2.5 text-xs sm:text-sm bg-white border border-[#D8D2C6] rounded-xl text-[#191C1A] placeholder:text-[#8C928E] focus:outline-none focus:ring-1 focus:ring-[#14382B] focus:border-[#14382B]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-semibold text-[#14382B]">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => setMode('recover')}
                      className="text-[11px] text-[#C88A36] hover:text-[#9C6B28] font-semibold hover:underline"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-[#8C928E] absolute left-3 top-3 pointer-events-none" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="Enter account password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-9 pr-10 py-2.5 text-xs sm:text-sm bg-white border border-[#D8D2C6] rounded-xl text-[#191C1A] placeholder:text-[#8C928E] focus:outline-none focus:ring-1 focus:ring-[#14382B] focus:border-[#14382B]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="p-1.5 text-[#8C928E] hover:text-[#191C1A] absolute right-2.5 top-2"
                      title={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 text-xs sm:text-sm font-semibold text-white bg-[#14382B] hover:bg-[#0E261D] rounded-xl transition-all shadow-xs cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <RotateCcw className="w-4 h-4 animate-spin" />
                      <span>Authenticating...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In to Vault</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Mode: Create Account */}
            {mode === 'register' && (
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-[#14382B]">
                    Full Student Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#8C928E] absolute left-3 top-3 pointer-events-none" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Abiodun Ayodeji"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      className="w-full pl-9 pr-3.5 py-2.5 text-xs sm:text-sm bg-white border border-[#D8D2C6] rounded-xl text-[#191C1A] placeholder:text-[#8C928E] focus:outline-none focus:ring-1 focus:ring-[#14382B] focus:border-[#14382B]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-[#14382B]">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#8C928E] absolute left-3 top-3 pointer-events-none" />
                    <input
                      type="email"
                      required
                      placeholder="e.g. student@studyvault.ai"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-9 pr-3.5 py-2.5 text-xs sm:text-sm bg-white border border-[#D8D2C6] rounded-xl text-[#191C1A] placeholder:text-[#8C928E] focus:outline-none focus:ring-1 focus:ring-[#14382B] focus:border-[#14382B]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-[#14382B]">
                    Institution / University
                  </label>
                  <div className="relative">
                    <School className="w-4 h-4 text-[#8C928E] absolute left-3 top-3 pointer-events-none" />
                    <input
                      type="text"
                      value={institution}
                      onChange={(e) => setInstitution(e.target.value)}
                      className="w-full pl-9 pr-3.5 py-2.5 text-xs sm:text-sm bg-white border border-[#D8D2C6] rounded-xl text-[#191C1A] placeholder:text-[#8C928E] focus:outline-none focus:ring-1 focus:ring-[#14382B] focus:border-[#14382B]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-[#14382B]">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-[#8C928E] absolute left-3 top-3 pointer-events-none" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        placeholder="Min 6 chars"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-9 pr-3.5 py-2.5 text-xs bg-white border border-[#D8D2C6] rounded-xl text-[#191C1A] placeholder:text-[#8C928E] focus:outline-none focus:ring-1 focus:ring-[#14382B]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-[#14382B]">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-[#8C928E] absolute left-3 top-3 pointer-events-none" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        placeholder="Re-type password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full pl-9 pr-3.5 py-2.5 text-xs bg-white border border-[#D8D2C6] rounded-xl text-[#191C1A] placeholder:text-[#8C928E] focus:outline-none focus:ring-1 focus:ring-[#14382B]"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 text-xs sm:text-sm font-semibold text-white bg-[#14382B] hover:bg-[#0E261D] rounded-xl transition-all shadow-xs cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <RotateCcw className="w-4 h-4 animate-spin" />
                      <span>Creating Account...</span>
                    </>
                  ) : (
                    <>
                      <span>Create Personal Account</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Mode: Recover Password */}
            {mode === 'recover' && (
              <form onSubmit={handleRecover} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-[#14382B]">
                    Registered Student Email
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#8C928E] absolute left-3 top-3 pointer-events-none" />
                    <input
                      type="email"
                      required
                      placeholder="Enter registered email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-9 pr-3.5 py-2.5 text-xs sm:text-sm bg-white border border-[#D8D2C6] rounded-xl text-[#191C1A] focus:outline-none focus:ring-1 focus:ring-[#14382B]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-[#14382B]">
                    New Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-[#8C928E] absolute left-3 top-3 pointer-events-none" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="Enter new password (min 6 chars)"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-9 pr-10 py-2.5 text-xs sm:text-sm bg-white border border-[#D8D2C6] rounded-xl text-[#191C1A] focus:outline-none focus:ring-1 focus:ring-[#14382B]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="p-1.5 text-[#8C928E] hover:text-[#191C1A] absolute right-2.5 top-2"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-[#14382B]">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-[#8C928E] absolute left-3 top-3 pointer-events-none" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="Confirm new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full pl-9 pr-3.5 py-2.5 text-xs sm:text-sm bg-white border border-[#D8D2C6] rounded-xl text-[#191C1A] focus:outline-none focus:ring-1 focus:ring-[#14382B]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 text-xs sm:text-sm font-semibold text-white bg-[#14382B] hover:bg-[#0E261D] rounded-xl transition-all shadow-xs cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <RotateCcw className="w-4 h-4 animate-spin" />
                      <span>Updating Password...</span>
                    </>
                  ) : (
                    <>
                      <span>Reset Password & Sign In</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <div className="text-center pt-1">
                  <button
                    type="button"
                    onClick={() => setMode('login')}
                    className="text-xs text-[#585E5A] hover:text-[#14382B] underline"
                  >
                    Return to Sign In
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Dedicated Quick Scholar Access (Protects Primary Account for Abiodun) */}
          <div className="bg-[#FAF2E6]/80 border border-[#E8DEC9] rounded-2xl p-4 sm:p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#14382B]" />
                <span className="text-xs font-bold text-[#14382B] uppercase tracking-wider">
                  Verified Scholar Fast Access
                </span>
              </div>
              <span className="text-[10px] font-mono text-[#8C5E1E] bg-white px-2 py-0.5 rounded border border-[#E8DEC9]">
                Permanent Vault
              </span>
            </div>

            <p className="text-xs text-[#585E5A] leading-relaxed">
              Sign in directly to your primary verified scholar account with your existing 9 textbooks, 1,723 past questions, notes, and study records.
            </p>

            <div className="space-y-2 pt-1">
              {/* Abiodun Ayodeji */}
              <button
                type="button"
                onClick={() => handleQuickScholarLogin('harbiodunjay24@gmail.com', 'StudyVault2025!')}
                className="w-full flex items-center justify-between p-2.5 rounded-xl bg-white border border-[#E8DEC9] hover:border-[#14382B] text-left transition-all hover:shadow-2xs group cursor-pointer"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-7 h-7 rounded-full bg-[#14382B] text-[#E2C799] flex items-center justify-center font-bold text-xs shrink-0">
                    AA
                  </div>
                  <div className="truncate">
                    <p className="text-xs font-bold text-[#14382B] group-hover:text-[#0E261D]">
                      Abiodun Ayodeji
                    </p>
                    <p className="text-[11px] text-[#8C928E] truncate">
                      harbiodunjay24@gmail.com (9 Courses · 1,723 Questions)
                    </p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-[#14382B] shrink-0 ml-2 group-hover:translate-x-0.5 transition-transform">
                  Access &rarr;
                </span>
              </button>

              {/* Chioma Okonkwo (Secondary test student for isolation testing) */}
              <button
                type="button"
                onClick={() => handleQuickScholarLogin('test.student2@studyvault.ai', 'StudyVault2025!')}
                className="w-full flex items-center justify-between p-2.5 rounded-xl bg-white border border-[#E8DEC9] hover:border-[#14382B] text-left transition-all hover:shadow-2xs group cursor-pointer"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-7 h-7 rounded-full bg-[#8C5E1E] text-white flex items-center justify-center font-bold text-xs shrink-0">
                    CO
                  </div>
                  <div className="truncate">
                    <p className="text-xs font-bold text-[#14382B] group-hover:text-[#0E261D]">
                      Chioma Okonkwo (Test Student B)
                    </p>
                    <p className="text-[11px] text-[#8C928E] truncate">
                      test.student2@studyvault.ai (Isolated Account)
                    </p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-[#14382B] shrink-0 ml-2 group-hover:translate-x-0.5 transition-transform">
                  Access &rarr;
                </span>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-xs text-[#8C928E] border-t border-[#E8E4DC] bg-white">
        StudyVault AI &middot; Institutional Academic Vault System &middot; National Open University of Nigeria
      </footer>
    </div>
  );
};
