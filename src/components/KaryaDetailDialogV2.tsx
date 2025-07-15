// src/components/KaryaDetailDialogV2.tsx
// New stable implementation with proper scrolling and interaction

import React, { useState, useEffect, useCallback } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Database } from '@/integrations/supabase/types';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { X, ChevronLeft, ChevronRight, Info, Eye, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { KaryaMediaViewer } from './karya/detail/KaryaMediaViewer';

type KaryaType = Database['public']['Tables']['karya']['Row'];

interface KaryaDetailDialogV2Props {
  karyaList: KaryaType[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

const categoryIcons: Record<string, string> = {
  'design': '/lovable-uploads/design.png',
  'video': '/lovable-uploads/video.png',
  'writing': '/lovable-uploads/karyatulis.png',
  'meme': '/lovable-uploads/meme.png',
  'game': '/lovable-uploads/game.png',
};

const categoryNames: Record<string, string> = {
  'design': 'Design',
  'video': 'Video',
  'writing': 'Karya Tulis',
  'meme': 'Meme',
  'game': 'Game',
};

const extractTags = (description: string | null): string[] => {
  if (description) {
    const hashtags = description.match(/#[\w\u0080-\uFFFF]+/g);
    return hashtags ? hashtags.map(tag => tag.slice(1)) : [];
  }
  return [];
};

export const KaryaDetailDialogV2 = ({ karyaList, initialIndex, isOpen, onClose }: KaryaDetailDialogV2Props) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [showInfoPanel, setShowInfoPanel] = useState(true);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    setCurrentIndex(initialIndex);
    setIsDescriptionExpanded(false);
  }, [initialIndex, isOpen]);

  const karya = karyaList[currentIndex];
  const isTextWork = karya?.category === 'writing';
  const tags = extractTags(karya.description);

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
  });

  useEffect(() => {
    if (karya && isOpen) {
      viewCountMutation.mutate(karya.id);
    }
  }, [karya?.id, isOpen]);

  const toggleInfoPanel = useCallback(() => {
    setShowInfoPanel(prev => !prev);
  }, []);

  const toggleDescription = useCallback(() => {
    setIsDescriptionExpanded(prev => !prev);
  }, []);

  const changeKarya = (direction: number) => {
    setCurrentIndex(prevIndex => {
      const nextIndex = prevIndex + direction;
      if (nextIndex < 0) return karyaList.length - 1;
      if (nextIndex >= karyaList.length) return 0;
      return nextIndex;
    });
    setIsDescriptionExpanded(false);
  };

  if (!karya) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-0 border border-border/20 bg-background/95 backdrop-blur-xl shadow-2xl w-[95vw] h-[90vh] max-w-7xl rounded-2xl overflow-hidden">
        <DialogTitle className="sr-only">
          {karya?.title || 'Karya Detail'}
        </DialogTitle>
        <DialogDescription className="sr-only">
          View and interact with the selected karya (creative work) including media, description, and metadata.
        </DialogDescription>

        {/* Header */}
        <div className="relative flex items-center justify-between p-4 border-b border-border/20 bg-background/50 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-foreground/80">
              {currentIndex + 1} / {karyaList.length}
            </span>
            <div className="w-px h-4 bg-border/40" />
            <h3 className="text-lg font-bold text-foreground truncate max-w-[300px]">
              {karya.title}
            </h3>
          </div>
          
          <div className="flex items-center gap-2">
            {!isTextWork && (
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleInfoPanel}
                className="text-foreground/60 hover:text-foreground hover:bg-foreground/10 rounded-full"
              >
                <Info className="w-4 h-4" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-foreground/60 hover:text-foreground hover:bg-foreground/10 rounded-full"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Media Section */}
          <div className={`flex-1 relative bg-gradient-to-b from-black/95 to-black/90 ${
            showInfoPanel && !isTextWork ? 'lg:w-2/3' : 'w-full'
          }`}>
            <KaryaMediaViewer 
              karya={karya} 
              onClose={onClose} 
              isTextWork={isTextWork}
              showInfoPanel={showInfoPanel}
              toggleInfoPanel={toggleInfoPanel}
            />
          </div>

          {/* Info Panel */}
          {showInfoPanel && !isTextWork && (
            <div className="w-full lg:w-1/3 border-l border-border/20 bg-secondary/95 backdrop-blur-xl flex flex-col">
              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-foreground/20 scrollbar-track-transparent">
                <div className="p-6 space-y-6">
                  {/* Title and Creator */}
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <h2 className="text-xl font-bold text-foreground font-sans leading-tight">
                          {karya.title}
                        </h2>
                        <p className="text-foreground/70 font-medium text-sm mt-1">
                          by {karya.creator_name}
                        </p>
                      </div>
                      <div className="flex-shrink-0 ml-3">
                        <div className="flex items-center gap-1.5 bg-black/20 backdrop-blur-sm py-1 px-2 rounded-full border border-white/10">
                          <div className="bg-white/90 p-0.5 rounded-full">
                            <img
                              src={categoryIcons[karya.category] || '/lovable-uploads/design.png'}
                              alt={karya.category}
                              className="w-3 h-3 object-contain"
                            />
                          </div>
                          <span className="text-xs text-foreground/80 font-medium whitespace-nowrap">
                            {categoryNames[karya.category] || 'Karya'}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* View Count */}
                    {karya.view_count != null && karya.view_count > 0 && (
                      <div className="flex items-center gap-2 bg-black/20 backdrop-blur-sm px-2.5 py-1.5 rounded-full border border-white/10 w-fit">
                        <Eye className="w-3.5 h-3.5 text-foreground/80" />
                        <span className="text-xs font-medium text-foreground/90">
                          {karya.view_count} views
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Tags */}
                  {tags.length > 0 && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Tag className="w-3.5 h-3.5 text-foreground/60" />
                        <span className="text-xs font-medium text-foreground/80">Tags</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {tags.map((tag, index) => (
                          <Badge
                            key={index}
                            className="bg-foreground/10 hover:bg-foreground/15 text-foreground/90 border-none font-medium text-xs py-0.5 px-2"
                          >
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Description */}
                  {karya.description && (
                    <div className="space-y-3">
                      <span className="text-xs font-medium text-foreground/80">Description</span>
                      <div className="relative">
                        <div className={`${
                          isDescriptionExpanded 
                            ? 'max-h-none' 
                            : 'max-h-20 overflow-hidden'
                        } transition-all duration-300 ease-out`}>
                          <p className="text-foreground/90 leading-relaxed font-sans text-sm whitespace-pre-wrap break-words">
                            {karya.description}
                          </p>
                        </div>
                        {!isDescriptionExpanded && karya.description.length > 150 && (
                          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-secondary/95 via-secondary/80 to-transparent pointer-events-none"></div>
                        )}
                      </div>
                      {karya.description.length > 150 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={toggleDescription}
                          className="text-foreground/60 hover:text-foreground hover:bg-foreground/10 gap-1.5 rounded-full font-medium text-xs h-8 px-4 transition-all duration-200 hover:scale-105"
                        >
                          {isDescriptionExpanded ? 'Show Less' : 'Read More'}
                        </Button>
                      )}
                    </div>
                  )}

                  {/* Created Date */}
                  <div className="pt-4 border-t border-border/20">
                    <p className="text-xs text-foreground/60 font-medium">
                      Dibuat pada {new Date(karya.created_at).toLocaleDateString('id-ID', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Controls */}
        {karyaList.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => changeKarya(-1)}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 text-white border border-white/20 shadow-lg transition-all duration-200 hover:scale-110"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => changeKarya(1)}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 text-white border border-white/20 shadow-lg transition-all duration-200 hover:scale-110"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </>
        )}

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-secondary/20 to-transparent rounded-full blur-3xl pointer-events-none" />
      </DialogContent>
    </Dialog>
  );
};

export default KaryaDetailDialogV2;