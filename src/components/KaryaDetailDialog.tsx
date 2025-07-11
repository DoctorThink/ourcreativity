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
import { ArrowLeft, ArrowRight, X } from 'lucide-react';

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
      <DialogContent className="p-0 overflow-hidden border border-border/20 bg-background/80 backdrop-blur-xl shadow-2xl transition-all duration-500 w-[90vw] h-[80vh] max-w-5xl max-h-[80vh] rounded-2xl flex flex-col">
        
        {/* Enhanced Header with Glowar styling */}
        <div className="flex-shrink-0 h-14 bg-gradient-to-r from-background/90 via-background/80 to-background/90 backdrop-blur-md border-b border-border/20 rounded-t-2xl flex items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-amethyst to-turquoise animate-pulse"></div>
            <span className="text-sm font-medium text-foreground/80">Karya Detail</span>
          </div>
          <div className="flex items-center gap-2">
            {karyaList.length > 1 && (
              <div className="flex items-center gap-1 px-3 py-1 bg-black/20 backdrop-blur-sm rounded-full border border-white/10">
                <span className="text-xs font-medium text-foreground/80">
                  {currentIndex + 1} / {karyaList.length}
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

        {/* Main Content Area */}
        <div className="flex-1 min-h-0 relative">
          {isTextWork ? (
            // Layout for Written Works (Text-only View)
            <div className="h-full w-full">
              <KaryaMediaViewer 
                karya={karya} 
                onClose={onClose} 
                isTextWork={isTextWork}
                showInfoPanel={false}
                toggleInfoPanel={() => {}}
              />
            </div>
          ) : (
            // Layout for Visual Media (Side-by-side View)
            <div className="flex flex-col lg:flex-row h-full w-full">
              <motion.div 
                className={`flex-shrink-0 h-3/5 lg:h-full bg-gradient-to-b from-black/95 to-black/90 transition-all duration-500 ${showInfoPanel ? 'lg:w-2/3' : 'lg:w-full'} overflow-hidden`}
                key={`${currentIndex}-media`}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.3 } }}
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
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="flex-shrink-0 w-full lg:w-1/3 h-2/5 lg:h-full overflow-hidden bg-gradient-to-b from-secondary/95 via-secondary/90 to-background/95 backdrop-blur-xl border-t lg:border-t-0 lg:border-l border-border/20"
                  >
                    <KaryaInfoPanel karya={karya} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
          
          {/* Enhanced Navigation Arrows */}
          {karyaList.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/60 text-white/90 hover:text-white rounded-full border border-white/20 backdrop-blur-md transition-all duration-200 hover:scale-110 shadow-lg"
                onClick={() => changeKarya(-1)}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/60 text-white/90 hover:text-white rounded-full border border-white/20 backdrop-blur-md transition-all duration-200 hover:scale-110 shadow-lg"
                onClick={() => changeKarya(1)}
              >
                <ArrowRight className="h-5 w-5" />
              </Button>
            </>
          )}
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-amethyst/20 to-transparent rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-turquoise/20 to-transparent rounded-full blur-3xl pointer-events-none"></div>
      </DialogContent>
    </Dialog>
  );
};

export default KaryaDetailDialog;
