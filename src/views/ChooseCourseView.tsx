import React, { useState } from 'react';
import {
  Search,
  Plus,
  Upload,
  BookOpen,
  Clock,
  ArrowRight,
  CheckCircle2,
  FileText,
  Layers,
  Sparkles,
  Compass
} from 'lucide-react';
import { Course, UserProgress } from '../types';

interface ChooseCourseViewProps {
  courses: Course[];
  progress: UserProgress;
  onSelectCourse: (courseId: string) => void;
  onOpenAddCourse: () => void;
  onLoadAuthoritativeENT302?: () => void;
  onLoadPresetCourse?: (preset: 'ent304' | 'ent308') => void;
}

export const ChooseCourseView: React.FC<ChooseCourseViewProps> = ({
  courses,
  progress,
  onSelectCourse,
  onOpenAddCourse,
  onLoadAuthoritativeENT302,
  onLoadPresetCourse,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter courses by search
  const filteredCourses = courses.filter((c) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      c.code.toLowerCase().includes(q) ||
      c.title.toLowerCase().includes(q) ||
      (c.department && c.department.toLowerCase().includes(q))
    );
  });

  // Identify recently studied courses
  const recentlyStudied = [...courses]
    .filter((c) => c.lastStudiedAt)
    .sort(
      (a, b) =>
        new Date(b.lastStudiedAt!).getTime() - new Date(a.lastStudiedAt!).getTime()
    )
    .slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8 animate-in fade-in">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E8E4DC]">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#585E5A] mb-1">
            <Compass className="w-3.5 h-3.5 text-[#14382B]" />
            <span>Academic Vault</span>
            <span aria-hidden="true">·</span>
            <span>Course Selector</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#191C1A]">
            Choose Your Course
          </h2>
          <p className="text-xs sm:text-sm text-[#585E5A] mt-1 max-w-2xl">
            Select an isolated course vault to read textbook units, consult the AI tutor, view chapter notes, and take verified written exam assessments.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={onOpenAddCourse}
            className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-white bg-[#14382B] hover:bg-[#0E261D] rounded-lg shadow-sm transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Add New Course</span>
          </button>
        </div>
      </div>

      {/* Quick Search & Actions Strip */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 text-[#8C928E] absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search by course code, title, or department..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-white border border-[#D8D2C6] rounded-xl focus:outline-none focus:border-[#14382B] shadow-xs text-[#191C1A] placeholder-[#8C928E]"
          />
        </div>

        <button
          onClick={onOpenAddCourse}
          className="flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-[#14382B] bg-white border border-[#D8D2C6] hover:bg-[#F3EFEA] rounded-xl transition-colors whitespace-nowrap cursor-pointer shadow-xs"
        >
          <Upload className="w-3.5 h-3.5 text-[#14382B]" />
          <span>Upload Syllabus / Material</span>
        </button>
      </div>

      {/* If No Courses in Library */}
      {courses.length === 0 ? (
        <div className="bg-white border border-[#E8E4DC] rounded-2xl p-8 sm:p-12 text-center max-w-xl mx-auto space-y-5 shadow-xs">
          <div className="w-14 h-14 rounded-2xl bg-[#FAF8F5] border border-[#E8E4DC] text-[#14382B] flex items-center justify-center mx-auto shadow-xs">
            <BookOpen className="w-7 h-7" />
          </div>
          <div>
            <h3 className="font-serif text-xl font-bold text-[#191C1A]">
              No Courses in Your Study Vault
            </h3>
            <p className="text-xs sm:text-sm text-[#585E5A] leading-relaxed max-w-md mx-auto mt-2">
              Add your university course by uploading your official PDF or DOCX syllabus, or load an authoritative textbook preset below.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onOpenAddCourse}
              className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-5 py-2.5 text-xs font-semibold text-white bg-[#14382B] hover:bg-[#0E261D] rounded-xl shadow-sm cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ Add Course</span>
            </button>

            {onLoadPresetCourse && (
              <button
                onClick={() => onLoadPresetCourse('ent304')}
                className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-[#14382B] bg-[#F4F1EA] border border-[#E2DCCE] hover:bg-[#ECE5D8] rounded-xl transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#C88A36]" />
                <span>Load ENT 304 Textbook</span>
              </button>
            )}
          </div>
        </div>
      ) : (
        <>
          {/* Recently Studied Section */}
          {recentlyStudied.length > 0 && !searchQuery.trim() && (
            <section className="space-y-3">
              <div className="flex items-center gap-2 text-xs text-[#585E5A]">
                <Clock className="w-3.5 h-3.5 text-[#14382B]" />
                <span className="font-semibold text-[#191C1A]">Recently Studied Courses</span>
                <span className="text-[#8C928E]">· Click to open study dashboard</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {recentlyStudied.map((course) => (
                  <div
                    key={`recent-${course.id}`}
                    onClick={() => onSelectCourse(course.id)}
                    className="p-5 bg-white border border-[#E8E4DC] rounded-xl hover:border-[#14382B]/60 cursor-pointer transition-all shadow-xs hover:shadow-sm space-y-3 group"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono font-semibold text-[#14382B] bg-[#FAF8F5] border border-[#E8E4DC] px-2 py-0.5 rounded text-[11px]">
                        {course.code}
                      </span>
                      <span className="text-[11px] text-[#8C928E]">
                        Active recently
                      </span>
                    </div>

                    <h4 className="font-serif text-sm sm:text-base font-bold text-[#191C1A] group-hover:text-[#14382B] transition-colors truncate">
                      {course.title}
                    </h4>

                    <div className="pt-3 border-t border-[#E8E4DC] flex items-center justify-between text-xs text-[#585E5A]">
                      <span className="group-hover:text-[#14382B] transition-colors">Open Course Dashboard</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#14382B] group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* All Enrolled Courses */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-lg font-bold text-[#191C1A]">
                All Enrolled Courses ({filteredCourses.length})
              </h3>
              <span className="text-xs text-[#585E5A] hidden sm:inline">
                Each course functions as an isolated study vault
              </span>
            </div>

            {filteredCourses.length === 0 ? (
              <div className="bg-white border border-[#E8E4DC] p-8 rounded-xl text-center text-xs text-[#585E5A]">
                No courses match "{searchQuery}".
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredCourses.map((course) => {
                  let totalTopics = 0;
                  let completedTopics = 0;

                  course.modules.forEach((m) => {
                    m.units.forEach((u) => {
                      u.topics.forEach((t) => {
                        totalTopics++;
                        if (progress.completedTopicIds.includes(t.id)) {
                          completedTopics++;
                        }
                      });
                    });
                  });

                  const pct = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;

                  return (
                    <div
                      key={course.id}
                      onClick={() => onSelectCourse(course.id)}
                      className="bg-white border border-[#E8E4DC] rounded-xl p-5 hover:border-[#14382B]/60 cursor-pointer transition-all shadow-xs hover:shadow-sm flex flex-col justify-between space-y-4 group"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-xs font-semibold text-[#14382B] bg-[#FAF8F5] border border-[#E8E4DC] px-2 py-0.5 rounded">
                            {course.code}
                          </span>
                          <span className="text-xs text-[#585E5A]">
                            {course.modules.length} Mod · {course.modules.reduce((s, m) => s + m.units.length, 0)} Units
                          </span>
                        </div>

                        <div>
                          <h4 className="font-serif text-base font-bold text-[#191C1A] group-hover:text-[#14382B] transition-colors leading-snug line-clamp-2">
                            {course.title}
                          </h4>
                          {course.department && (
                            <p className="text-[11px] text-[#8C928E] mt-0.5 truncate">
                              {course.department}
                            </p>
                          )}
                        </div>

                        <p className="text-xs text-[#585E5A] line-clamp-2 leading-relaxed">
                          {course.description}
                        </p>
                      </div>

                      <div className="space-y-3 pt-3 border-t border-[#E8E4DC]">
                        <div className="space-y-1">
                          <div className="flex justify-between text-[11px] text-[#585E5A]">
                            <span>Syllabus Mastery</span>
                            <span className="font-mono font-medium text-[#14382B]">{pct}%</span>
                          </div>
                          <div className="w-full h-1.5 bg-[#F0ECE4] rounded-full overflow-hidden">
                            <div
                              className="h-full bg-[#14382B] rounded-full transition-all duration-300"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-xs text-[#14382B] font-semibold pt-1">
                          <span>Enter Study Dashboard</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
};
