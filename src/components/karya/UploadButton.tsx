
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import UploadModal from './UploadModal';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { categories } from '@/lib/karyaCategories';
import { Badge } from '@/components/ui/badge';

interface UploadButtonProps {
  onSuccess?: () => void;
  className?: string;
}

const UploadButton: React.FC<UploadButtonProps> = ({ onSuccess, className }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleSelectCategory = (categoryValue: string) => {
    setSelectedCategory(categoryValue);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCategory(null); // Reset category on close
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
        <DropdownMenuContent className="w-64 bg-black/90 border-white/30 text-white rounded-xl backdrop-blur-xl p-2">
          {categories.map((category) => (
            <DropdownMenuItem
              key={category.value}
              onSelect={() => handleSelectCategory(category.value)}
              className="text-white hover:bg-white/20 focus:bg-white/20 rounded-lg m-1 p-3 cursor-pointer"
            >
              <div className="flex justify-between items-center w-full">
                <div className="flex items-center gap-3">
                   <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#E5DEFF] via-[#98F5E1] to-[#FEC6A1] flex items-center justify-center">
                    <category.icon className="w-3 h-3 text-black" />
                  </div>
                  <span className="font-medium text-sm">{category.label}</span>
                </div>
                {category.recommended === 'editor' && (
                  <Badge variant="outline" className="border-cyan-400/50 text-cyan-400 text-xs bg-cyan-400/10">
                    Recommended ✨
                  </Badge>
                )}
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <UploadModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSuccess={() => {
          onSuccess?.();
          handleCloseModal();
        }}
        initialCategory={selectedCategory}
      />
    </>
  );
};

export default UploadButton;
