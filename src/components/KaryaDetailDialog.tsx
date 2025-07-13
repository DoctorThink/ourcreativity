// src/components/KaryaDetailDialog.tsx

import React, { useState, useEffect, useCallback } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Database } from '@/integrations/supabase/types';
import { AnimatePresence, motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { KaryaMediaViewer } from './karya/detail/KaryaMediaViewer';
import { KaryaInfoPanel } from './karya/detail/KaryaInfoPanel';
import { KaryaDialogHeader } from './karya/detail/KaryaDialogHeader';
import { KaryaDialogNavigation } from './karya/detail/KaryaDialogNavigation';

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
        <DialogTitle className="sr-only">
          {karya?.title || 'Karya Detail'}
        </DialogTitle>
        
        <KaryaDialogHeader 
          currentIndex={currentIndex}
          totalCount={karyaList.length}
          onClose={onClose}
        />

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
                    className="flex-shrink-0 w-full lg:w-1/3 h-2/5 lg:h-full bg-gradient-to-b from-secondary/95 via-secondary/90 to-background/95 backdrop-blur-xl border-t lg:border-t-0 lg:border-l border-border/20"
                  >
                    <KaryaInfoPanel karya={karya} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
          
          <KaryaDialogNavigation 
            onPrevious={() => changeKarya(-1)}
            onNext={() => changeKarya(1)}
            totalCount={karyaList.length}
          />
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-amethyst/20 to-transparent rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-turquoise/20 to-transparent rounded-full blur-3xl pointer-events-none"></div>
      </DialogContent>
    </Dialog>
  );
};

export default KaryaDetailDialog;
