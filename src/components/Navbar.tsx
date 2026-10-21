import React, { useState } from 'react';
import { GraduationCap, Plus, Menu, X, Sparkles, BookOpen, ChevronDown, Headphones } from 'lucide-react';
import { Course } from '../types';

export type NavView = 'home' | 'start-studying' | 'courses' | 'past-questions' | 'notes' | 'progress';

interface NavbarProps {
  currentView: NavView;
  onNavigate: (view: NavView) => void;
  onOpenAddCourse: () => void;
  onOpenAITutor?: () => void;
  onOpenAudio?: () => void;
  onOpenAccount?: () => void;
  syncStatus?: 'saved' | 'saving' | 'syncing' | 'offline' | 'error';
  syncMessage?: string;
  userDisplayName?: string;
  coursesCount: number;
  courses?: Course[];
  selectedCourseId?: string | null;
  onSelectCourse?: (id: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  onOpenAddCourse,
  onOpenAITutor,
  onOpenAudio,
  onOpenAccount,
  syncStatus = 'saved',
  syncMessage = 'Saved',
  userDisplayName = 'Abiodun Ayodeji',
  coursesCount,
  courses = [],
  selectedCourseId,
  onSelectCourse,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [courseSwitcherOpen, setCourseSwitcherOpen] = useState(false);

  const navLinks: { id: NavView; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'start-studying', label: 'Study Library' },
    { id: 'courses', label: 'My Courses' },
    { id: 'past-questions', label: 'Past Questions' },
    { id: 'notes', label: 'Notes' },
    { id: 'progress', label: 'Progress Hub' },
  ];

  const handleNavClick = (view: NavView) => {
    onNavigate(view);
    setMobileMenuOpen(false);
  };

  const activeCourse = courses.find((c) => c.id === selectedCourseId);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#E8E4DC] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6 sm:gap-8">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-4 shrink-0">
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A2F] rounded-lg"
          >
            <div className="w-8 h-8 rounded-lg bg-[#14382B] text-white flex items-center justify-center shadow-xs transition-transform group-hover:scale-105">
              <GraduationCap className="w-4 h-4 text-[#D6E5DC]" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg sm:text-xl font-bold tracking-tight text-[#14382B] whitespace-nowrap">
                StudyVault<span className="text-[#C88A36] font-normal italic ml-0.5">AI</span>
              </span>
            </div>
          </button>

          {/* Optional active course quick-indicator chip */}
          {activeCourse && (
            <div className="relative hidden xl:block">
              <button
                onClick={() => setCourseSwitcherOpen(!courseSwitcherOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-[#1E3A2F] bg-white border border-[#E8E4DC] hover:border-[#1E3A2F]/40 rounded-md transition-colors"
              >
                <BookOpen className="w-3 h-3 text-[#1E3A2F]" />
                <span className="font-mono font-semibold">{activeCourse.code}</span>
                <ChevronDown className="w-3 h-3 text-[#8C928E]" />
              </button>

              {courseSwitcherOpen && (
                <div className="absolute left-0 mt-1.5 w-64 bg-white border border-[#E8E4DC] rounded-xl shadow-lg p-2 z-50 animate-in fade-in zoom-in-95">
                  <div className="px-2 py-1 text-[10px] font-semibold text-[#8C928E] uppercase tracking-wider">
                    Switch Active Course
                  </div>
                  <div className="space-y-0.5 mt-1 max-h-56 overflow-y-auto">
                    {courses.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => {
                          if (onSelectCourse) onSelectCourse(c.id);
                          setCourseSwitcherOpen(false);
                          onNavigate('courses');
                        }}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between transition-colors ${
                          c.id === selectedCourseId
                            ? 'bg-[#1E3A2F]/10 text-[#1E3A2F] font-semibold'
                            : 'text-[#2D312E] hover:bg-[#FAF8F5]'
                        }`}
                      >
                        <span className="font-mono truncate">{c.code}</span>
                        <span className="text-[11px] text-[#8C928E] truncate max-w-[120px]">{c.title}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Zone 2: Single-line Text Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => {
            const isActive = currentView === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`transition-colors whitespace-nowrap shrink-0 py-1 relative text-xs tracking-wide uppercase ${
                  isActive
                    ? 'text-[#14382B] font-semibold'
                    : 'text-[#626864] hover:text-[#191C1A]'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#14382B] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Cloud Sync & User Account */}
          <button
            onClick={onOpenAccount}
            className="flex items-center gap-2 px-2.5 py-1 text-xs rounded-lg border border-[#D8D2C6] bg-white hover:bg-[#FAF8F5] transition-all shadow-2xs group"
            title={`Account: ${userDisplayName} • Cloud Status: ${syncMessage}`}
          >
            <div className="w-5 h-5 rounded-full bg-[#E2C799] text-[#14382B] flex items-center justify-center font-serif font-bold text-[10px] shrink-0">
              {userDisplayName.charAt(0).toUpperCase()}
            </div>
            <div className="hidden sm:flex flex-col text-left leading-tight">
              <span className="font-semibold text-[#14382B] text-[11px] truncate max-w-[95px]">
                {userDisplayName}
              </span>
              <span
                className={`text-[9px] flex items-center gap-1 font-medium ${
                  syncStatus === 'saved'
                    ? 'text-emerald-700'
                    : syncStatus === 'saving' || syncStatus === 'syncing'
                    ? 'text-amber-700'
                    : syncStatus === 'offline'
                    ? 'text-slate-600'
                    : 'text-rose-700'
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                    syncStatus === 'saved'
                      ? 'bg-emerald-600'
                      : syncStatus === 'saving' || syncStatus === 'syncing'
                      ? 'bg-amber-500 animate-pulse'
                      : syncStatus === 'offline'
                      ? 'bg-slate-400'
                      : 'bg-rose-500'
                  }`}
                />
                <span className="truncate max-w-[85px]">{syncMessage}</span>
              </span>
            </div>
          </button>

          {onOpenAudio && (
            <button
              onClick={onOpenAudio}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#14382B] bg-[#FAF2E6] border border-[#E8DEC9] hover:bg-[#F5ECD8] rounded-lg transition-all shadow-2xs"
              title="Open Listen & Learn Audio Mode"
            >
              <Headphones className="w-3.5 h-3.5 text-[#C88A36]" />
              <span className="hidden sm:inline">Listen & Learn</span>
            </button>
          )}

          {onOpenAITutor && (
            <button
              onClick={onOpenAITutor}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#14382B] bg-white border border-[#D8D2C6] hover:bg-[#F3EFEA] hover:border-[#14382B]/30 rounded-lg transition-all shadow-2xs"
              title="Open StudyVault AI Tutor"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C88A36]" />
              <span className="hidden sm:inline">AI Tutor</span>
            </button>
          )}

          <button
            onClick={onOpenAddCourse}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-[#14382B] hover:bg-[#0E261D] rounded-lg shadow-xs hover:shadow transition-all active:scale-[0.98] whitespace-nowrap shrink-0 focus-visible:ring-2 focus-visible:ring-[#14382B]"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Add Course</span>
          </button>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#585E5A] hover:text-[#191C1A] rounded-lg focus-visible:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF8F5]/98 border-b border-[#E8E4DC] px-4 pt-2 pb-4 space-y-2 shadow-lg animate-in slide-in-from-top-2">
          {/* Mobile Account Banner */}
          <button
            onClick={() => {
              if (onOpenAccount) onOpenAccount();
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold bg-white border border-[#E8DEC9] text-[#14382B] shadow-2xs"
          >
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-[#E2C799] text-[#14382B] flex items-center justify-center font-serif font-bold text-xs shrink-0">
                {userDisplayName.charAt(0).toUpperCase()}
              </div>
              <div className="text-left">
                <span className="block text-xs font-bold leading-tight">{userDisplayName}</span>
                <span className="text-[10px] text-[#585E5A]">Cloud Sync: {syncMessage}</span>
              </div>
            </div>
            <span className="text-[11px] text-[#9C6B28] font-bold">Account</span>
          </button>
          {onOpenAudio && (
            <button
              onClick={() => {
                onOpenAudio();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold bg-[#FAF2E6] text-[#14382B] border border-[#E8DEC9] shadow-xs"
            >
              <div className="flex items-center gap-2">
                <Headphones className="w-4 h-4 text-[#C88A36]" />
                <span>Listen & Learn (Audio Study Mode)</span>
              </div>
              <span className="text-[11px] text-[#C88A36] font-bold">Listen</span>
            </button>
          )}

          {onOpenAITutor && (
            <button
              onClick={() => {
                onOpenAITutor();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold bg-[#14382B] text-white shadow-xs"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#E2C799]" />
                <span>StudyVault AI Assistant (All Textbooks)</span>
              </div>
              <span className="text-[11px] text-[#D8D2C6]">Open</span>
            </button>
          )}

          {courses.length > 0 && (
            <div className="pt-1 pb-1">
              <span className="text-[10px] font-semibold text-[#8C928E] uppercase tracking-wider px-3 block mb-1">
                Enrolled Courses ({courses.length})
              </span>
              <div className="flex gap-1.5 overflow-x-auto pb-1 px-1">
                {courses.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      if (onSelectCourse) onSelectCourse(c.id);
                      onNavigate('courses');
                      setMobileMenuOpen(false);
                    }}
                    className={`px-2.5 py-1 rounded-md text-xs font-mono shrink-0 border transition-all ${
                      c.id === selectedCourseId
                        ? 'bg-[#14382B] text-white border-[#14382B]'
                        : 'bg-white text-[#191C1A] border-[#D8D2C6] hover:bg-[#F3EFEA]'
                    }`}
                  >
                    {c.code}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="border-t border-[#E8E4DC] pt-1 space-y-1">
            {navLinks.map((link) => {
              const isActive = currentView === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium flex items-center justify-between ${
                    isActive
                      ? 'bg-[#14382B]/10 text-[#14382B] font-semibold'
                      : 'text-[#2D312E] hover:bg-[#F0ECE4]'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.id === 'courses' && coursesCount > 0 && (
                    <span className="text-xs text-[#585E5A] font-mono">{coursesCount}</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
