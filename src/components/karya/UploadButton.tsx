
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
        className={`gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-full px-6 py-3 font-medium shadow-lg ${className}`}
      >
        <Plus className="w-5 h-5" />
        Unggah Karya
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
