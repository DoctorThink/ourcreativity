
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChevronDown, Tag, Eye, ExternalLink } from 'lucide-react';
import { Database } from '@/integrations/supabase/types';

type KaryaType = Database['public']['Tables']['karya']['Row'];

interface KaryaInfoPanelProps {
  karya: KaryaType;
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

export const KaryaInfoPanel = ({ karya }: KaryaInfoPanelProps) => {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const tags = extractTags(karya.description);

  const toggleDescription = () => setIsDescriptionExpanded(!isDescriptionExpanded);

  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      className="bg-gradient-to-b from-secondary/95 to-background/95 backdrop-blur-md absolute bottom-0 left-0 right-0 z-10 max-h-[60vh] sm:max-h-[50vh] overflow-y-auto rounded-t-3xl border-t border-white/10 shadow-[0_-10px_30px_rgba(0,0,0,0.2)] md:static md:w-1/3 md:max-h-full md:rounded-none md:border-t-0 md:border-l"
    >
      {/* Header with title and category info */}
      <div className="flex justify-between items-start p-4 sm:p-6 border-b border-border/20">
        <div className="flex-1">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground font-sans">{karya.title}</h2>
          <p className="text-foreground/70 mt-1 font-medium text-sm sm:text-base">
            by {karya.creator_name}
          </p>
        </div>
        <div className="flex items-center gap-2 bg-black/20 backdrop-blur-sm py-1.5 px-3 rounded-full border border-white/10 shadow-md">
          <div className="bg-white/90 p-1.5 rounded-full">
            <img
              src={categoryIcons[karya.category] || '/lovable-uploads/design.png'}
              alt={karya.category}
              className="w-5 h-5 object-contain"
            />
          </div>
          <span className="text-sm text-foreground/80 font-medium">
            {categoryNames[karya.category] || 'Karya'}
          </span>
        </div>
      </div>
      
      {/* View count section */}
      {karya.view_count != null && karya.view_count > 0 && (
        <div className="px-4 sm:px-6 pt-4 pb-2 border-b border-border/20">
          <div className="flex items-center gap-2 bg-black/20 backdrop-blur-sm px-3 py-2 rounded-full border border-white/10 shadow-md w-fit">
            <Eye className="w-4 h-4 text-foreground/80" />
            <span className="text-sm font-medium text-foreground/90">
              {karya.view_count} views
            </span>
          </div>
        </div>
      )}
      
      {/* Tags section */}
      {tags.length > 0 && (
        <div className="px-4 sm:px-6 pt-4 pb-2 border-b border-border/20">
          <div className="flex items-center gap-2 mb-2">
            <Tag className="w-4 h-4 text-foreground/60" />
            <span className="text-sm font-medium text-foreground/80">Tags</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <Badge
                key={index}
                className="bg-foreground/10 hover:bg-foreground/15 text-foreground/90 border-none font-medium"
              >
                #{tag}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Expandable description section */}
      {karya.description && (
        <div className="p-4 sm:p-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-sm font-medium text-foreground/80">Description</span>
          </div>
          <div className={`transition-all duration-300 ${
            isDescriptionExpanded ? 'max-h-none' : 'max-h-[120px]'
          } overflow-hidden relative`}>
            <ScrollArea className={`${
              isDescriptionExpanded ? 'h-auto max-h-[40vh]' : 'h-[120px]'
            }`}>
              <p className="text-foreground/90 leading-relaxed font-sans text-sm sm:text-base whitespace-pre-wrap break-words pr-4">
                {karya.description}
              </p>
            </ScrollArea>
            {!isDescriptionExpanded && (
              <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-secondary/95 to-transparent pointer-events-none"></div>
            )}
          </div>
          {karya.description.length > 200 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleDescription}
              className="mt-3 text-foreground/60 hover:text-foreground hover:bg-foreground/5 gap-1 rounded-full font-medium"
            >
              {isDescriptionExpanded ? 'Show Less' : 'Read More'}
              <ChevronDown
                className={`h-4 w-4 transition-transform ${isDescriptionExpanded ? 'rotate-180' : ''}`}
              />
            </Button>
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div className="p-4 sm:p-6 pt-4 flex flex-col sm:flex-row justify-between items-center">
        <p className="text-xs text-foreground/60 mb-4 sm:mb-0 font-medium">
          Dibuat pada {new Date(karya.created_at).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          {karya.content_url && !karya.link_url && (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full">
              <Button 
                onClick={() => window.open(karya.content_url, '_blank')}
                className="gap-2 w-full rounded-full shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-r from-mint to-sage text-white border border-white/10 font-medium" 
                size="sm"
              >
                <ExternalLink className="h-4 w-4" />
                <span>Link Konten</span>
              </Button>
            </motion.div>
          )}
          {karya.link_url && (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full">
              <Button 
                onClick={() => window.open(karya.link_url, '_blank')}
                className="gap-2 w-full rounded-full shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-r from-lavender to-purpleLight text-white border border-white/10 font-medium" 
                size="sm"
              >
                <ExternalLink className="h-4 w-4" />
                <span>Lihat Karya Lengkap</span>
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
