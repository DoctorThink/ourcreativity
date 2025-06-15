import React, { useState, useEffect, useCallback } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Database } from '@/integrations/supabase/types';
import { AnimatePresence, motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
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
  const [hasLiked, setHasLiked] = useState(false);
  const [showInfoPanel, setShowInfoPanel] = useState(true);
  const queryClient = useQueryClient();

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex, isOpen]);

  const karya = karyaList[currentIndex];

  useEffect(() => {
    if (karya) {
      const likedInStorage = localStorage.getItem(`liked_${karya.id}`);
      setHasLiked(likedInStorage === 'true');
    }
  }, [karya]);

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

  const likeMutation = useMutation({
    mutationFn: async (karyaId: string) => {
      // Optimistically update UI
      queryClient.setQueryData(['karya'], (oldData: KaryaType[] | undefined) => {
        if (!oldData) return oldData;
        return oldData.map(item =>
          item.id === karyaId
            ? { ...item, likes_count: (item.likes_count || 0) + 1 }
            : item
        );
      });
      localStorage.setItem(`liked_${karyaId}`, 'true');
      setHasLiked(true);

      const { error } = await supabase.rpc('increment_likes', { karya_id: karyaId });

      if (error) {
        localStorage.removeItem(`liked_${karyaId}`);
        setHasLiked(false);
        throw new Error(error.message);
      }
      return karyaId;
    },
    onSuccess: () => {
      toast.success('Terima kasih sudah suka!');
      queryClient.invalidateQueries({ queryKey: ['karya'] });
    },
    onError: (error) => {
      toast.error('Gagal menyukai karya. Coba lagi nanti.');
      console.error('Like error:', error);
      queryClient.invalidateQueries({ queryKey: ['karya'] });
    },
  });

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
      <DialogContent className="p-0 overflow-hidden border-border/30 bg-background/50 backdrop-blur-xl shadow-xl transition-all duration-300 w-full h-full max-w-full max-h-full md:max-w-6xl md:max-h-[90vh] md:rounded-2xl flex">
        <div className="relative flex flex-col md:flex-row h-full w-full overflow-hidden">
          <motion.div 
            className="relative flex-grow h-1/2 md:h-full md:w-2/3 bg-black"
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
          >
            <KaryaMediaViewer 
              karya={karya} 
              onClose={onClose} 
              showInfoPanel={showInfoPanel}
              toggleInfoPanel={toggleInfoPanel}
            />
          </motion.div>
          
          <AnimatePresence initial={false}>
            {showInfoPanel && (
              <motion.div 
                key={currentIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="flex-shrink-0 w-full md:w-1/3 h-1/2 md:h-full overflow-y-auto"
              >
                <KaryaInfoPanel 
                  karya={karya}
                  hasLiked={hasLiked}
                  likeMutation={likeMutation}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {karyaList.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-black/20 hover:bg-black/50 text-white rounded-full"
              onClick={() => changeKarya(-1)}
            >
              <ArrowLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-black/20 hover:bg-black/50 text-white rounded-full"
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
