
import React, { useState } from 'react';
import { Plus, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import UploadModal from './UploadModal';

interface UploadButtonProps {
  onSuccess?: () => void;
  className?: string;
}

const UploadButton: React.FC<UploadButtonProps> = ({ onSuccess, className }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setIsModalOpen(true)}
        className={`group relative overflow-hidden gap-3 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 hover:from-cyan-600 hover:via-blue-600 hover:to-purple-600 text-white rounded-full px-8 py-4 font-semibold shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-cyan-500/25 ${className}`}
      >
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Sparkle effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Sparkles className="absolute top-1 right-2 w-3 h-3 text-white/70 animate-pulse" />
          <Sparkles className="absolute bottom-1 left-2 w-2 h-2 text-white/50 animate-pulse delay-300" />
        </div>
        
        {/* Content */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:rotate-90 transition-transform duration-300">
            <Plus className="w-4 h-4" />
          </div>
          <span className="text-lg">Unggah Karya</span>
        </div>
      </Button>

      <UploadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={onSuccess}
      />
    </>
  );
};

export default UploadButton;
