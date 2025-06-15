
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getInputTypeDetails, SubmissionType } from '@/lib/karyaCategories';

interface FileUploadProps {
  submissionType: Exclude<SubmissionType, 'text'> | 'document';
  onFileChange: (file: File | null) => void;
  file: File | null;
  previewUrl: string | null;
  uploading: boolean;
  uploadProgress: number;
  error?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  submissionType,
  onFileChange,
  file,
  previewUrl,
  uploading,
  uploadProgress,
  error,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const effectiveType = submissionType === 'document' ? 'text' : submissionType;
  const details = getInputTypeDetails(effectiveType);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileChange(e.dataTransfer.files[0]);
    }
  };
  
  const description = `Drag & Drop file di sini atau klik untuk pilih file`;
  const meta = effectiveType === 'text'
      ? `PDF, DOCX, DOC, TXT • Max ${details.maxSizeLabel}`
      : effectiveType === 'video'
      ? `MP4, MOV, WEBM • Max ${details.maxSizeLabel}`
      : `JPG, PNG, GIF, WEBP • Max ${details.maxSizeLabel}`;

  return (
    <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        className="space-y-4"
    >
      {file ? (
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-3 bg-white/10 border border-white/30 rounded-xl">
            {previewUrl ? (
              <div className="flex-shrink-0">
                {file.type.startsWith('image/') ? (
                  <img src={previewUrl} alt="Preview" className="w-12 h-12 object-cover rounded-lg border-2 border-white/30" />
                ) : file.type.startsWith('video/') ? (
                  <video src={previewUrl} className="w-12 h-12 object-cover rounded-lg border-2 border-white/30" muted />
                ) : <details.icon className="w-12 h-12 p-3 text-cyan-400 bg-white/5 rounded-lg border-2 border-white/30" />}
              </div>
            ) : <details.icon className="w-12 h-12 p-3 text-cyan-400 bg-white/5 rounded-lg border-2 border-white/30" />}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                {details.icon && <details.icon className="w-4 h-4 text-cyan-400 flex-shrink-0" />}
                <div className="min-w-0">
                  <p className="text-white font-medium truncate text-sm">{file.name}</p>
                  <p className="text-gray-400 text-xs">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              
              {uploading && uploadProgress > 0 && (
                <div className="mt-2">
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>Mengupload...</span>
                    <span>{Math.round(uploadProgress)}%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-1">
                    <div 
                      className="bg-gradient-to-r from-cyan-400 to-blue-500 h-1 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onFileChange(null)}
              className="border-white/30 bg-white/10 hover:bg-white/20 text-white rounded-lg flex-shrink-0 text-xs"
              disabled={uploading}
            >
              Ganti
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept={details.acceptedFiles}
            className="hidden"
            onChange={(e) => e.target.files && onFileChange(e.target.files[0])}
          />
          <div
            onClick={() => fileInputRef.current?.click()}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`cursor-pointer transition-all duration-300 border-2 border-dashed rounded-xl bg-white/5 p-4
              ${
                dragActive 
                  ? 'border-cyan-400/70 bg-cyan-400/10 scale-105' 
                  : 'border-white/30 hover:border-cyan-400/50 hover:bg-white/10'
              }`}
          >
            <div className="flex flex-col items-center justify-center w-full h-32">
              <div className="p-2 rounded-full bg-white/10 mb-2">
                <Upload className="w-6 h-6 text-cyan-400" />
              </div>
              <p className="text-white font-medium mb-1 text-sm">{description}</p>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <details.icon className="w-3 h-3" />
                <span>{meta}</span>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {error && (
        <p className="text-red-400 text-sm text-center">{error}</p>
      )}
    </motion.div>
  );
};

export default FileUpload;
