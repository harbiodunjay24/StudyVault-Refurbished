import React, { useState } from 'react';
import { Edit3, Plus, Trash2, Search, Filter, BookOpen, Download, Tag, Calendar, Compass } from 'lucide-react';
import { Course, PersonalNote } from '../types';

interface NotesViewProps {
  notes: PersonalNote[];
  courses: Course[];
  onSaveNote: (note: Omit<PersonalNote, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onUpdateNote: (id: string, title: string, content: string) => void;
  onDeleteNote: (id: string) => void;
  onOpenCourse: (courseId: string) => void;
}

export const NotesView: React.FC<NotesViewProps> = ({
  notes,
  courses,
  onSaveNote,
  onUpdateNote,
  onDeleteNote,
  onOpenCourse,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [courseFilter, setCourseFilter] = useState('all');
  const [isCreating, setIsCreating] = useState(false);
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);

  // New note form state
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [selectedCourseId, setSelectedCourseId] = useState(courses[0]?.id || '');

  // Edit form state
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');

  const filteredNotes = notes.filter((n) => {
    if (courseFilter !== 'all' && n.courseId !== courseFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = n.title.toLowerCase().includes(q);
      const matchBody = n.content.toLowerCase().includes(q);
      const matchCourse = n.courseCode.toLowerCase().includes(q);
      if (!matchTitle && !matchBody && !matchCourse) return false;
    }
    return true;
  });

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const course = courses.find((c) => c.id === selectedCourseId) || courses[0];
    onSaveNote({
      courseId: course?.id || 'general',
      courseCode: course?.code || 'GEN',
      courseTitle: course?.title || 'General Notes',
      title: newTitle.trim(),
      content: newContent.trim(),
      tags: [course?.code || 'General'],
    });

    setNewTitle('');
    setNewContent('');
    setIsCreating(false);
  };

  const startEdit = (note: PersonalNote) => {
    setEditingNoteId(note.id);
    setEditTitle(note.title);
    setEditContent(note.content);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingNoteId) return;
    onUpdateNote(editingNoteId, editTitle, editContent);
    setEditingNoteId(null);
  };

  const exportAllNotes = () => {
    if (notes.length === 0) return;
    const markdown = notes
      .map(
        (n) =>
          `# ${n.title}\n**Course**: ${n.courseCode} - ${n.courseTitle}\n**Date**: ${new Date(
            n.updatedAt
          ).toLocaleDateString()}\n\n${n.content}\n\n---\n`
      )
      .join('\n');

    const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `StudyVault_Notes_${new Date().toISOString().split('T')[0]}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in">
      {/* Header Bar */}
      <div className="bg-white border border-[#E8E4DC] rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#E8E4DC]">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#14382B]">
              <Compass className="w-3.5 h-3.5 text-[#C88A36]" />
              <span>Personal Knowledge Ledger</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-4xl font-bold text-[#14382B]">
              My Study Notes
            </h1>
            <p className="text-xs sm:text-sm text-[#585E5A]">
              Personal marginalia, simplified definitions, and study reflections written during reading sessions.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            {notes.length > 0 && (
              <button
                onClick={exportAllNotes}
                className="flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-semibold text-[#14382B] bg-[#FAF8F5] border border-[#D8D2C6] hover:bg-[#F3EFEA] rounded-xl transition-colors shadow-2xs"
                title="Download notes as Markdown file"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Notes (.md)</span>
              </button>
            )}

            <button
              onClick={() => setIsCreating(true)}
              disabled={courses.length === 0}
              className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-white bg-[#14382B] hover:bg-[#0E261D] disabled:opacity-40 rounded-xl shadow-xs transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ New Note</span>
            </button>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 text-[#8C928E] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search notes by title, content, or course code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-[#FAF8F5] border border-[#D8D2C6] rounded-xl focus:outline-none focus:border-[#14382B] focus:bg-white transition-all text-[#191C1A]"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-[#8C928E]" />
            <select
              value={courseFilter}
              onChange={(e) => setCourseFilter(e.target.value)}
              className="px-3 py-2 text-xs bg-[#FAF8F5] border border-[#D8D2C6] rounded-xl text-[#191C1A] focus:outline-none focus:border-[#14382B]"
            >
              <option value="all">All Courses ({courses.length})</option>
              {courses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.code}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* New Note Form */}
      {isCreating && (
        <div className="bg-white border border-[#14382B]/30 rounded-2xl p-6 sm:p-7 shadow-sm space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between pb-3 border-b border-[#E8E4DC]">
            <h3 className="font-serif text-base font-bold text-[#14382B]">Create New Study Note</h3>
            <button onClick={() => setIsCreating(false)} className="text-xs text-[#8C928E] hover:text-[#191C1A]">
              Cancel
            </button>
          </div>

          <form onSubmit={handleCreateSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <input
                  type="text"
                  placeholder="Note title (e.g. Sampling Distribution Properties)..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#FAF8F5] border border-[#D8D2C6] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#14382B]"
                  required
                />
              </div>
              <div>
                <select
                  value={selectedCourseId}
                  onChange={(e) => setSelectedCourseId(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#FAF8F5] border border-[#D8D2C6] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#14382B]"
                >
                  {courses.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.code}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <textarea
              rows={5}
              placeholder="Write your study notes, reflections, or exam reminders..."
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              className="w-full px-3.5 py-3 text-xs sm:text-sm bg-[#FAF8F5] border border-[#D8D2C6] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#14382B] leading-relaxed"
              required
            />

            <div className="flex justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setIsCreating(false)}
                className="px-4 py-2 text-xs font-semibold text-[#585E5A] hover:bg-[#F0ECE4] rounded-xl"
              >
                Discard
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-semibold text-white bg-[#14382B] hover:bg-[#0E261D] rounded-xl shadow-xs"
              >
                Save Note
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Notes Grid */}
      {filteredNotes.length === 0 ? (
        <div className="bg-white border border-[#E8E4DC] p-12 rounded-2xl text-center space-y-3 shadow-xs">
          <Edit3 className="w-8 h-8 text-[#8C928E] mx-auto" />
          <h3 className="font-serif text-lg font-bold text-[#191C1A]">No Notes Found</h3>
          <p className="text-xs text-[#585E5A] max-w-sm mx-auto">
            {searchQuery
              ? `No notes match "${searchQuery}".`
              : 'Take notes while reading in the study canvas, or click "+ New Note" above.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredNotes.map((note) => {
            const isEditing = editingNoteId === note.id;

            return (
              <div
                key={note.id}
                className="bg-white border border-[#E8E4DC] rounded-2xl p-6 flex flex-col justify-between space-y-4 hover:border-[#14382B]/40 transition-all shadow-2xs"
              >
                {isEditing ? (
                  <form onSubmit={handleEditSubmit} className="space-y-3">
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs font-bold text-[#191C1A] bg-[#FAF8F5] border border-[#D8D2C6] rounded-lg"
                      required
                    />
                    <textarea
                      rows={5}
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      className="w-full px-3 py-2 text-xs text-[#383D3B] bg-[#FAF8F5] border border-[#D8D2C6] rounded-lg leading-relaxed"
                      required
                    />
                    <div className="flex justify-end gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => setEditingNoteId(null)}
                        className="px-3 py-1 text-xs text-[#585E5A]"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-1 text-xs font-semibold text-white bg-[#14382B] rounded-lg"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                ) : (
                  <>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-mono font-bold text-[#14382B] bg-[#FAF8F5] border border-[#E8E4DC] px-2 py-0.5 rounded">
                          {note.courseCode}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => startEdit(note)}
                            className="p-1 text-[#8C928E] hover:text-[#191C1A] rounded"
                            title="Edit note"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm('Delete this note?')) onDeleteNote(note.id);
                            }}
                            className="p-1 text-[#8C928E] hover:text-rose-600 rounded"
                            title="Delete note"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-serif text-base font-bold text-[#191C1A] leading-snug">
                          {note.title}
                        </h4>
                        {note.unitTitle && (
                          <p className="text-[11px] text-[#8C928E] mt-0.5 truncate">{note.unitTitle}</p>
                        )}
                      </div>

                      <p className="text-xs text-[#383D3B] whitespace-pre-line leading-relaxed line-clamp-6">
                        {note.content}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#E8E4DC] flex items-center justify-between text-[11px] text-[#8C928E]">
                      <span>{new Date(note.updatedAt).toLocaleDateString()}</span>
                      <button
                        onClick={() => onOpenCourse(note.courseId)}
                        className="font-semibold text-[#14382B] hover:underline"
                      >
                        Open Course
                      </button>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
