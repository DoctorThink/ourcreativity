
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import UploadModal from './UploadModal';
import { categories, Category } from '@/lib/karyaCategories';

interface UploadButtonProps {
  onSuccess?: () => void;
  className?: string;
}

const UploadButton: React.FC<UploadButtonProps> = ({ onSuccess, className }) => {
  const [modalState, setModalState] = useState<{ isOpen: boolean; selectedCategory: Category | null }>({
    isOpen: false,
    selectedCategory: null,
  });

  const handleCategorySelect = (category: Category) => {
    setModalState({ isOpen: true, selectedCategory: category });
  };

  const handleCloseModal = () => {
    setModalState({ isOpen: false, selectedCategory: null });
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className={`group relative overflow-hidden gap-2 bg-gradient-to-r from-[#E5DEFF] via-[#98F5E1] to-[#FEC6A1] hover:from-[#9B6DFF] hover:via-[#40E0D0] hover:to-[#FF7F50] text-black hover:text-white rounded-full px-6 py-3 font-semibold shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl ${className}`}
          >
            <div className="relative z-10 flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-black/20 flex items-center justify-center group-hover:rotate-90 transition-transform duration-300">
                <Plus className="w-3 h-3" />
              </div>
              <span className="text-base font-medium">Unggah Karya</span>
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-gray-900/95 border-white/30 text-white rounded-xl backdrop-blur-xl">
          {categories.map((category) => (
            <DropdownMenuItem
              key={category.value}
              onClick={() => handleCategorySelect(category)}
              className="text-white hover:bg-white/20 focus:bg-white/20 rounded-lg m-1 cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#E5DEFF] via-[#98F5E1] to-[#FEC6A1] flex items-center justify-center">
                  <category.icon className="w-3 h-3 text-black" />
                </div>
                <div>
                  <div className="font-medium text-sm">{category.label}</div>
                </div>
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {modalState.selectedCategory && (
        <UploadModal
          isOpen={modalState.isOpen}
          onClose={handleCloseModal}
          onSuccess={onSuccess}
          category={modalState.selectedCategory}
        />
      )}
    </>
  );
};

export default UploadButton;
