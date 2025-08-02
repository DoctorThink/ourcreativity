import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface KaryaDialogNavigationProps {
  onPrevious: () => void;
  onNext: () => void;
  totalCount: number;
}

export const KaryaDialogNavigation: React.FC<KaryaDialogNavigationProps> = ({
  onPrevious,
  onNext,
  totalCount
}) => {
  if (totalCount <= 1) return null;

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/60 text-white/90 hover:text-white rounded-full border border-white/20 backdrop-blur-md transition-all duration-200 hover:scale-110 shadow-lg"
        onClick={onPrevious}
      >
        <ArrowLeft className="h-5 w-5" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/60 text-white/90 hover:text-white rounded-full border border-white/20 backdrop-blur-md transition-all duration-200 hover:scale-110 shadow-lg"
        onClick={onNext}
      >
        <ArrowRight className="h-5 w-5" />
      </Button>
    </>
  );
};