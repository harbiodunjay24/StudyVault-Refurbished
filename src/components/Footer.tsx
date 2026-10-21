import React from 'react';
import { GraduationCap, ShieldCheck } from 'lucide-react';
import { NavView } from './Navbar';

interface FooterProps {
  onNavigate: (view: NavView) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="mt-auto border-t border-[#E8E4DC] bg-[#FAF8F5] text-[#585E5A] text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#14382B] text-white flex items-center justify-center">
                <GraduationCap className="w-4 h-4 text-[#D6E5DC]" />
              </div>
              <span className="font-serif text-lg font-bold text-[#14382B]">StudyVault AI</span>
            </div>
            <p className="text-xs text-[#585E5A] leading-relaxed">
              An isolated, distraction-free study sanctuary designed for deep reading, simple concept breakdowns, checkpoint mastery, and dedicated past exam archives.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-[#14382B] uppercase tracking-wider mb-3">Study Navigation</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-[#14382B] transition-colors">
                  Home Overview
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('start-studying')} className="hover:text-[#14382B] transition-colors">
                  Study Library
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('courses')} className="hover:text-[#14382B] transition-colors">
                  My Courses
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('past-questions')} className="hover:text-[#14382B] transition-colors">
                  Past Questions Vault
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-[#14382B] uppercase tracking-wider mb-3">Learning Tools</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('notes')} className="hover:text-[#14382B] transition-colors">
                  Personal Study Notes
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('progress')} className="hover:text-[#14382B] transition-colors">
                  Comprehension Analytics
                </button>
              </li>
              <li className="text-[#8C928E]">Explain Simply Engine</li>
              <li className="text-[#8C928E]">Self-Paced Checkpoint Quizzes</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-[#14382B] uppercase tracking-wider mb-3">Local Privacy</h4>
            <p className="text-xs text-[#585E5A] leading-relaxed mb-2.5">
              All documents, notes, progress, and questions are stored strictly in your local browser storage. No unauthorized external telemetry or tracking.
            </p>
            <div className="flex items-center gap-1.5 text-xs text-emerald-800 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              <span>Isolated Local Client Storage Active</span>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-[#E8E4DC] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8C928E]">
          <p>© {new Date().getFullYear()} StudyVault AI. Built for intentional academic study.</p>
          <div className="flex items-center gap-4">
            <span>Focus & Retention</span>
            <span aria-hidden="true">·</span>
            <span>Zero Slop</span>
            <span aria-hidden="true">·</span>
            <span>Empirical Learning</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
