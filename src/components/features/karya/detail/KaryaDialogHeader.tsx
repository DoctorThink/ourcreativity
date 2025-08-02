import React from 'react';
import { X } from 'lucide-react';

interface KaryaDialogHeaderProps {
  currentIndex: number;
  totalCount: number;
  onClose: () => void;
}

export const KaryaDialogHeader: React.FC<KaryaDialogHeaderProps> = ({
  currentIndex,
  totalCount,
  onClose
}) => {
  return (
    <div className="flex-shrink-0 h-14 bg-gradient-to-r from-background/90 via-background/80 to-background/90 backdrop-blur-md border-b border-border/20 rounded-t-2xl flex items-center justify-between px-6">
      <div className="flex items-center gap-3">
        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-amethyst to-turquoise animate-pulse"></div>
        <span className="text-sm font-medium text-foreground/80">Karya Detail</span>
      </div>
      <div className="flex items-center gap-2">
        {totalCount > 1 && (
          <div className="flex items-center gap-1 px-3 py-1 bg-black/20 backdrop-blur-sm rounded-full border border-white/10">
            <span className="text-xs font-medium text-foreground/80">
              {currentIndex + 1} / {totalCount}
            </span>
          </div>
        )}
        <button
          onClick={onClose}
          className="rounded-full p-2 text-white/80 hover:text-white bg-black/20 hover:bg-black/40 backdrop-blur-md border border-white/10 transition-all duration-200 hover:scale-105"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};