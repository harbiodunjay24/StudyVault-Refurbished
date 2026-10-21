import React, { useState, useRef } from 'react';
import { X, Upload, FileText, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { Course } from '../types';
import { parseUploadedStudyFile, detectFileType } from '../services/fileParser';

interface AddDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: Course;
  onDocumentAdded: (updatedCourse: Course) => void;
}

export const AddDocumentModal: React.FC<AddDocumentModalProps> = ({
  isOpen,
  onClose,
  course,
  onDocumentAdded,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'processing' | 'done' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileSelect = (file: File) => {
    setErrorMessage(null);
    const fileType = detectFileType(file.name);
    if (!fileType) {
      setErrorMessage(`Unsupported format: .${file.name.split('.').pop()}. Supported formats: PDF, DOCX, PPTX, TXT.`);
      setSelectedFile(null);
      return;
    }
    // Check duplicate
    if (course.documents.some((d) => d.name.toLowerCase() === file.name.toLowerCase())) {
      setErrorMessage(`A document named "${file.name}" is already associated with this course.`);
      setSelectedFile(null);
      return;
    }
    setSelectedFile(file);
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
    if (!selectedFile) {
      setErrorMessage('Please select a study material file to append.');
      return;
    }

    try {
      setUploadStatus('uploading');
      setStatusMessage(`Reading "${selectedFile.name}"...`);

      await new Promise((r) => setTimeout(r, 400));
      setUploadStatus('processing');
      setStatusMessage('Extracting supplemental units and study questions...');

      const result = await parseUploadedStudyFile(selectedFile, course.code, course.title);

      await new Promise((r) => setTimeout(r, 450));
      setUploadStatus('done');
      setStatusMessage(result.diagnosticMessage);

      // Merge new document & modules cleanly without duplicating existing modules
      const existingModuleIds = new Set(course.modules.map((m) => m.id));
      const newModules = result.modules.filter((m) => !existingModuleIds.has(m.id));

      const currentUnitCount = course.modules.reduce((acc, m) => acc + m.units.length, 0);
      const resultUnitCount = result.modules.reduce((acc, m) => acc + m.units.length, 0);

      // If the current course was missing units (e.g. jumped from Unit 1 to 11) and the uploaded document
      // has the full authentic syllabus, upgrade to the complete modules!
      const resolvedModules =
        currentUnitCount < resultUnitCount ? result.modules : [...course.modules, ...newModules];

      const updatedCourse: Course = {
        ...course,
        documents: [...course.documents, result.document],
        modules: resolvedModules,
      };

      setTimeout(() => {
        onDocumentAdded(updatedCourse);
        onClose();
        resetForm();
      }, 500);
    } catch (err: any) {
      setUploadStatus('error');
      setErrorMessage(err.message || 'Failed to append study document.');
    }
  };

  const resetForm = () => {
    setSelectedFile(null);
    setUploadStatus('idle');
    setErrorMessage(null);
    setStatusMessage(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#FAF8F5] border border-[#E8E4DC] rounded-xl shadow-xl max-w-lg w-full p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-4 border-b border-[#E8E4DC]">
          <div>
            <h3 className="font-serif text-xl font-bold text-[#191C1A]">Add Study Document</h3>
            <p className="text-xs text-[#585E5A] mt-0.5">
              Append material to <span className="font-semibold text-[#191C1A]">{course.code} - {course.title}</span>
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
          <div>
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
                      {(selectedFile.size / 1024).toFixed(1)} KB · Ready to append
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-full bg-[#F3EFEA] text-[#1E3A2F] flex items-center justify-center mx-auto">
                    <Upload className="w-5 h-5" />
                  </div>
                  <p className="text-sm font-medium text-[#191C1A]">
                    Select additional course material
                  </p>
                  <p className="text-xs text-[#8C928E]">
                    PDF, DOCX, PPTX, or TXT
                  </p>
                </div>
              )}
            </div>
          </div>

          {errorMessage && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2.5 text-xs text-red-800">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {uploadStatus === 'uploading' || uploadStatus === 'processing' ? (
            <div className="p-3 bg-[#EBF3EF] border border-[#CDE1D6] rounded-xl flex items-center gap-2.5 text-xs text-[#14382B]">
              <Loader2 className="w-4 h-4 text-[#14382B] animate-spin shrink-0" />
              <span>{statusMessage}</span>
            </div>
          ) : null}

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
              disabled={uploadStatus === 'uploading' || uploadStatus === 'processing' || !selectedFile}
              className="flex items-center gap-2 px-5 py-2 text-xs font-semibold text-white bg-[#14382B] hover:bg-[#0E261D] disabled:opacity-50 rounded-xl shadow-xs transition-all"
            >
              {uploadStatus === 'uploading' || uploadStatus === 'processing' ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <span>Append Document</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
