
import React, { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogContent
} from '@/components/ui/dialog';
import { Database } from '@/integrations/supabase/types';
import { AnimatePresence } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { KaryaMediaViewer } from './karya/detail/KaryaMediaViewer';
import { KaryaInfoPanel } from './karya/detail/KaryaInfoPanel';

type KaryaType = Database['public']['Tables']['karya']['Row'];

interface KaryaDetailDialogProps {
  karyaList: KaryaType[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

const KaryaDetailDialog = ({ karyaList, initialIndex, isOpen, onClose }: KaryaDetailDialogProps) => {
  const [showInfoPanel, setShowInfoPanel] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [hasLiked, setHasLiked] = useState(false);
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

  const likeMutation = useMutation({
    mutationFn: async (karyaId: string) => {
      // Optimistically update UI
      queryClient.setQueryData(['karya'], (oldData: { pages: { data: KaryaType[] }[] } | undefined) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          pages: oldData.pages.map(page => ({
            ...page,
            data: page.data.map(item => 
              item.id === karyaId 
                ? { ...item, likes_count: (item.likes_count || 0) + 1 } 
                : item
            ),
          })),
        };
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


  if (!karya) {
    return null;
  }

  const isText = karya.category === 'writing' && karya.content_url;

  const toggleInfoPanel = () => {
    setShowInfoPanel(!showInfoPanel);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-0 overflow-hidden border-border/30 backdrop-blur-xl shadow-xl transition-all duration-300 max-w-[100vw] max-h-[100vh] w-[100vw] h-[100vh] md:max-w-4xl md:max-h-[90vh] md:w-full md:h-auto md:rounded-2xl">
        <div className="flex flex-col md:flex-row h-full overflow-hidden">
          <KaryaMediaViewer 
            karya={karya}
            onClose={onClose}
            showInfoPanel={showInfoPanel}
            toggleInfoPanel={toggleInfoPanel}
          />
          
          <AnimatePresence>
            {(!isText && showInfoPanel) && (
              <KaryaInfoPanel 
                karya={karya}
                hasLiked={hasLiked}
                likeMutation={likeMutation}
              />
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default KaryaDetailDialog;
