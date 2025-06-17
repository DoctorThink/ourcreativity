// src/components/KaryaDetailDialog.tsx

import React, { useState, useEffect, useCallback } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Database } from '@/integrations/supabase/types';
import { AnimatePresence, motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { KaryaMediaViewer } from './karya/detail/KaryaMediaViewer';
import { KaryaInfoPanel } from './karya/detail/KaryaInfoPanel';
import { Button } from './ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

type KaryaType = Database['public']['Tables']['karya']['Row'];

interface KaryaDetailDialogProps {
  karyaList: KaryaType[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

const KaryaDetailDialog = ({ karyaList, initialIndex, isOpen, onClose }: KaryaDetailDialogProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [direction, setDirection] = useState(0);
  const [showInfoPanel, setShowInfoPanel] = useState(true);
  const queryClient = useQueryClient();

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex, isOpen]);

  const karya = karyaList[currentIndex];

  // --- CHANGE #1: Determine the work type at the top level ---
  const isTextWork = karya?.category === 'writing';

  const viewCountMutation = useMutation({
    mutationFn: async (karyaId: string) => {
      const { error } = await supabase.functions.invoke('increment-view-count', {
        body: { karya_id: karyaId },
      });
      if (error) throw new Error(error.message);
      return karyaId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['karya'] });
    },
    onError: (error) => {
      console.error('View count increment error:', error);
    },
  });

  useEffect(() => {
    if (karya && isOpen) {
      viewCountMutation.mutate(karya.id);
    }
  }, [karya?.id, isOpen]);

  const toggleInfoPanel = useCallback(() => {
    setShowInfoPanel(prev => !prev);
  }, []);

  const changeKarya = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex(prevIndex => {
      const nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) return karyaList.length - 1;
      if (nextIndex >= karyaList.length) return 0;
      return nextIndex;
    });
  };

  if (!karya) return null;

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 50 : -50,
      opacity: 0
    })
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-0 overflow-hidden border-border/30 bg-background/50 backdrop-blur-xl shadow-xl transition-all duration-300 w-full h-full max-w-full max-h-full md:max-w-7xl md:max-h-[90vh] md:rounded-2xl flex">
        
        {/* --- CHANGE #2: Conditional Layout Rendering --- */}
        {isTextWork ? (
          // Layout for Written Works (Text-only View)
          <div className="relative h-full w-full">
            <KaryaMediaViewer 
              karya={karya} 
              onClose={onClose} 
              isTextWork={isTextWork}
              showInfoPanel={false} // Info panel is never shown here
              toggleInfoPanel={() => {}} // No-op
            />
          </div>
        ) : (
          // Layout for Visual Media (Side-by-side View)
          <div className="relative flex flex-col md:flex-row h-full w-full overflow-hidden">
            <motion.div 
              className={`relative flex-grow h-1/2 md:h-full bg-black transition-all duration-300 ${showInfoPanel ? 'md:w-3/4' : 'md:w-full'}`}
              key={`${currentIndex}-media`}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
            >
              <KaryaMediaViewer 
                karya={karya} 
                onClose={onClose} 
                isTextWork={isTextWork}
                showInfoPanel={showInfoPanel}
                toggleInfoPanel={toggleInfoPanel}
              />
            </motion.div>
            
            <AnimatePresence initial={false}>
              {showInfoPanel && (
                <motion.div 
                  key={`${currentIndex}-info`}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 100 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="flex-shrink-0 w-full md:w-1/4 h-1/2 md:h-full overflow-y-auto bg-secondary/95 backdrop-blur-md border-l border-border/20"
                >
                  <KaryaInfoPanel karya={karya} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
        
        {/* Navigation Arrows remain outside the conditional layout */}
        {karyaList.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 bg-black/20 hover:bg-black/50 text-white rounded-full"
              onClick={() => changeKarya(-1)}
            >
              <ArrowLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 bg-black/20 hover:bg-black/50 text-white rounded-full"
              onClick={() => changeKarya(1)}
            >
              <ArrowRight className="h-6 w-6" />
            </Button>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default KaryaDetailDialog;
