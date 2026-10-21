import React, { useState, useRef } from 'react';
import { X, Upload, FileText, CheckCircle2, AlertCircle, Loader2, BookOpen, Layers } from 'lucide-react';
import { Course } from '../types';
import { parseUploadedStudyFile, detectFileType, extractCodeAndTitleFromText } from '../services/fileParser';
import { FMS304_SAMPLE_COURSE, CSC202_SECOND_COURSE, ENT302_AUTHENTIC_COURSE, ENT304_AUTHENTIC_COURSE, ENT308_AUTHENTIC_COURSE } from '../services/sampleData';

interface AddCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCourseCreated: (course: Course) => void;
  existingCourseCodes?: string[];
  existingCourses?: Course[];
  onSelectExistingCourse?: (courseId: string) => void;
}

export const AddCourseModal: React.FC<AddCourseModalProps> = ({
  isOpen,
  onClose,
  onCourseCreated,
  existingCourseCodes = [],
  existingCourses = [],
  onSelectExistingCourse,
}) => {
  const [courseCode, setCourseCode] = useState('');
  const [courseTitle, setCourseTitle] = useState('');
  const [department, setDepartment] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'processing' | 'done' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [duplicateWarning, setDuplicateWarning] = useState<{
    courseId: string;
    courseCode: string;
    courseTitle: string;
    matchedBy: 'code' | 'filename';
  } | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileSelect = (file: File) => {
    setErrorMessage(null);
    setDuplicateWarning(null);
    const fileType = detectFileType(file.name);
    if (!fileType) {
      setErrorMessage(`Unsupported format: .${file.name.split('.').pop()}. StudyVault AI supports PDF, DOCX, PPTX, and TXT.`);
      setSelectedFile(null);
      return;
    }
    setSelectedFile(file);

    // Auto-detect course code and title from filename
    const { code, title } = extractCodeAndTitleFromText('', file.name);
    if (code && !courseCode) setCourseCode(code);
    if (title && !courseTitle) setCourseTitle(title);

    // Check for duplicates across existing courses
    const normalizedFileName = file.name.toLowerCase().trim().replace(/\s+/g, '_');
    const detectedNormCode = (code || '').toUpperCase().replace(/[^A-Z0-9]/g, '');

    const matchingByFile = existingCourses.find((c) =>
      c.documents.some((d) => d.name.toLowerCase().trim().replace(/\s+/g, '_') === normalizedFileName)
    );

    const matchingByCode = detectedNormCode
      ? existingCourses.find((c) => c.code.toUpperCase().replace(/[^A-Z0-9]/g, '') === detectedNormCode)
      : undefined;

    const matchedCourse = matchingByFile || matchingByCode;
    if (matchedCourse) {
      setDuplicateWarning({
        courseId: matchedCourse.id,
        courseCode: matchedCourse.code,
        courseTitle: matchedCourse.title,
        matchedBy: matchingByFile ? 'filename' : 'code',
      });
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const code = courseCode.trim().toUpperCase();
    const title = courseTitle.trim();

    if (!code) {
      setErrorMessage('Please enter a course code (e.g. FMS 304, CSC 202).');
      return;
    }
    if (!title) {
      setErrorMessage('Please enter a course title (e.g. Research Methodology).');
      return;
    }
    if (!selectedFile) {
      setErrorMessage('Please select a course study material file (.pdf, .docx, .pptx, or .txt).');
      return;
    }

    try {
      setUploadStatus('uploading');
      setStatusMessage(`Reading "${selectedFile.name}"...`);

      await new Promise((r) => setTimeout(r, 400));
      setUploadStatus('processing');
      setStatusMessage('Organising chapters, units, definitions, and comprehension questions...');

      const result = await parseUploadedStudyFile(selectedFile, code, title);

      await new Promise((r) => setTimeout(r, 450));
      setUploadStatus('done');
      setStatusMessage(result.diagnosticMessage);

      const newCourse: Course = {
        id: `course-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        code: result.detectedCode || code,
        title: result.detectedTitle || title,
        department: department.trim() || undefined,
        description: `Individually uploaded course study material for ${code} (${title}).`,
        createdAt: new Date().toISOString(),
        documents: [result.document],
        modules: result.modules,
        lastStudiedTopicId: result.modules[0]?.units[0]?.topics[0]?.id,
        lastStudiedAt: new Date().toISOString(),
      };

      setTimeout(() => {
        onCourseCreated(newCourse);
        onClose();
        resetForm();
      }, 500);
    } catch (err: any) {
      setUploadStatus('error');
      setErrorMessage(err.message || 'An error occurred while processing the document.');
    }
  };

  const handleUsePreset = (preset: Course) => {
    onCourseCreated({
      ...preset,
      id: `course-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      createdAt: new Date().toISOString()
    });
    onClose();
    resetForm();
  };

  const resetForm = () => {
    setCourseCode('');
    setCourseTitle('');
    setDepartment('');
    setSelectedFile(null);
    setUploadStatus('idle');
    setErrorMessage(null);
    setStatusMessage(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#FAF8F5] border border-[#E8E4DC] rounded-xl shadow-xl max-w-xl w-full p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-4 border-b border-[#E8E4DC]">
          <div>
            <h3 className="font-serif text-xl font-bold text-[#191C1A]">Add Course</h3>
            <p className="text-xs text-[#585E5A] mt-0.5">
              Upload individual course syllabus or textbook material (PDF, DOCX, PPTX, TXT)
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#585E5A] hover:text-[#191C1A] hover:bg-[#F0ECE4] rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          {/* Preset assist options for testing individual separate courses */}
          <div className="bg-[#F3EFEA] border border-[#E8E4DC] p-3 rounded-lg space-y-2 text-xs text-[#585E5A]">
            <div className="flex items-center gap-2 font-semibold text-[#191C1A]">
              <Layers className="w-4 h-4 text-[#1E3A2F]" />
              <span>Need testing material? Load sample verified curriculum:</span>
            </div>
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => handleUsePreset(ENT308_AUTHENTIC_COURSE)}
                className="px-2.5 py-1 bg-white border border-[#D8D2C6] rounded hover:border-[#1E3A2F] text-[#1E3A2F] font-semibold transition-colors"
              >
                + ENT 308: Family Business & Succession Planning (Verified NOUN PDF)
              </button>
              <button
                type="button"
                onClick={() => handleUsePreset(ENT304_AUTHENTIC_COURSE)}
                className="px-2.5 py-1 bg-white border border-[#D8D2C6] rounded hover:border-[#1E3A2F] text-[#1E3A2F] font-semibold transition-colors"
              >
                + ENT 304: Leadership & Corporate Governance (14 Units Complete)
              </button>
              <button
                type="button"
                onClick={() => handleUsePreset(ENT302_AUTHENTIC_COURSE)}
                className="px-2.5 py-1 bg-white border border-[#D8D2C6] rounded hover:border-[#1E3A2F] text-[#1E3A2F] font-semibold transition-colors"
              >
                + ENT 302: Feasibility & Business Planning (17 Units Complete)
              </button>
              <button
                type="button"
                onClick={() => handleUsePreset(FMS304_SAMPLE_COURSE)}
                className="px-2.5 py-1 bg-white border border-[#D8D2C6] rounded hover:border-[#1E3A2F] text-[#1E3A2F] font-semibold transition-colors"
              >
                + FMS 304: Research Methodology (15 Units Complete)
              </button>
              <button
                type="button"
                onClick={() => handleUsePreset(CSC202_SECOND_COURSE)}
                className="px-2.5 py-1 bg-white border border-[#D8D2C6] rounded hover:border-[#1E3A2F] text-[#1E3A2F] font-semibold transition-colors"
              >
                + CSC 202: Data Structures & Algorithms (2nd Course)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#191C1A] mb-1">
                Course Code <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. FMS 304"
                value={courseCode}
                onChange={(e) => setCourseCode(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-white border border-[#D8D2C6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A2F] focus:border-transparent"
                required
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-[#191C1A] mb-1">
                Course Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Research Methodology"
                value={courseTitle}
                onChange={(e) => setCourseTitle(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-white border border-[#D8D2C6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A2F] focus:border-transparent"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#191C1A] mb-1">
              Faculty / Department (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. School of Business Administration"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-white border border-[#D8D2C6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A2F] focus:border-transparent"
            />
          </div>

          {/* File Upload Dropzone */}
          <div>
            <label className="block text-xs font-semibold text-[#191C1A] mb-1">
              Course Study Material Document <span className="text-red-500">*</span>
            </label>
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragOver(true);
              }}
              onDragLeave={() => setIsDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors ${
                isDragOver
                  ? 'border-[#1E3A2F] bg-[#1E3A2F]/5'
                  : selectedFile
                  ? 'border-[#2E6247] bg-[#F4F9F6]'
                  : 'border-[#D8D2C6] bg-white hover:border-[#1E3A2F]/50 hover:bg-[#F9F7F3]'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.docx,.pptx,.txt"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleFileSelect(e.target.files[0]);
                  }
                }}
                className="hidden"
              />

              {selectedFile ? (
                <div className="flex items-center justify-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#1E3A2F]/10 text-[#1E3A2F] flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-[#191C1A] truncate max-w-xs">{selectedFile.name}</p>
                    <p className="text-xs text-[#585E5A]">
                      {(selectedFile.size / 1024).toFixed(1)} KB · Ready to index
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-full bg-[#F3EFEA] text-[#1E3A2F] flex items-center justify-center mx-auto">
                    <Upload className="w-5 h-5" />
                  </div>
                  <p className="text-sm font-medium text-[#191C1A]">
                    Click or drag course document here
                  </p>
                  <p className="text-xs text-[#8C928E]">
                    Supports PDF, DOCX, PPTX, TXT (up to 50MB)
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Duplicate Detection Alert */}
          {duplicateWarning && (
            <div className="p-3.5 bg-amber-50 border border-amber-300 rounded-lg text-xs space-y-2">
              <div className="flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-semibold text-amber-900">
                    Existing Material Detected: {duplicateWarning.courseCode} ({duplicateWarning.courseTitle})
                  </p>
                  <p className="text-amber-800 leading-relaxed">
                    This file or course code already exists in your vault. To prevent redundant duplicates, you can retain your existing canonical copy and student progress.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 pt-1">
                {onSelectExistingCourse && (
                  <button
                    type="button"
                    onClick={() => {
                      onSelectExistingCourse(duplicateWarning.courseId);
                      onClose();
                    }}
                    className="px-3 py-1.5 bg-[#14382B] text-white rounded-lg text-xs font-semibold hover:bg-[#0E261D] transition-colors"
                  >
                    Open Existing {duplicateWarning.courseCode} Course
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setDuplicateWarning(null)}
                  className="px-3 py-1.5 bg-white border border-amber-300 text-amber-900 rounded-lg text-xs font-medium hover:bg-amber-100 transition-colors"
                >
                  Proceed Anyway (New Edition)
                </button>
              </div>
            </div>
          )}

          {/* Upload Status & Error Feedback */}
          {errorMessage && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2.5 text-xs text-red-800">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {(uploadStatus === 'uploading' || uploadStatus === 'processing') && (
            <div className="p-3 bg-[#EBF3EF] border border-[#CDE1D6] rounded-xl flex items-center gap-2.5 text-xs text-[#14382B]">
              <Loader2 className="w-4 h-4 text-[#14382B] animate-spin shrink-0" />
              <span>{statusMessage}</span>
            </div>
          )}

          {uploadStatus === 'done' && (
            <div className="p-3 bg-[#EBF3EF] border border-[#CDE1D6] rounded-xl flex items-center gap-2.5 text-xs text-[#14382B]">
              <CheckCircle2 className="w-4 h-4 text-[#14382B] shrink-0" />
              <span>{statusMessage}</span>
            </div>
          )}

          <div className="pt-2 border-t border-[#E8E4DC] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={uploadStatus === 'uploading' || uploadStatus === 'processing'}
              className="px-4 py-2 text-xs font-semibold text-[#585E5A] hover:text-[#191C1A] hover:bg-[#F0ECE4] rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={uploadStatus === 'uploading' || uploadStatus === 'processing'}
              className="flex items-center gap-2 px-5 py-2 text-xs font-semibold text-white bg-[#14382B] hover:bg-[#0E261D] disabled:opacity-50 rounded-xl shadow-xs transition-all"
            >
              {uploadStatus === 'uploading' || uploadStatus === 'processing' ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <span>Create & Index Course</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
