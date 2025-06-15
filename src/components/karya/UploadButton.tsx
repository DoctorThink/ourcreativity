
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
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
        className={`group relative overflow-hidden gap-2 bg-gradient-to-r from-[#E5DEFF] via-[#98F5E1] to-[#FEC6A1] hover:from-[#9B6DFF] hover:via-[#40E0D0] hover:to-[#FF7F50] text-black hover:text-white rounded-full px-6 py-3 font-semibold shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl ${className}`}
      >
        <div className="relative z-10 flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-black/20 flex items-center justify-center group-hover:rotate-90 transition-transform duration-300">
            <Plus className="w-3 h-3" />
          </div>
          <span className="text-base font-medium">Unggah Karya</span>
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
