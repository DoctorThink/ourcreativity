
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
    <div className="h-full flex flex-col bg-gradient-to-b from-secondary/95 to-background/95 backdrop-blur-md">
      {/* Header with title and category info */}
      <div className="flex-shrink-0 p-6 border-b border-border/20">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 pr-4">
            <h2 className="text-xl font-bold tracking-tight text-foreground font-sans leading-tight mb-2">
              {karya.title}
            </h2>
            <p className="text-foreground/70 font-medium text-sm">
              by {karya.creator_name}
            </p>
          </div>
          <div className="flex-shrink-0">
            <div className="flex items-center gap-2 bg-black/20 backdrop-blur-sm py-1.5 px-3 rounded-full border border-white/10 shadow-md">
              <div className="bg-white/90 p-1 rounded-full">
                <img
                  src={categoryIcons[karya.category] || '/lovable-uploads/design.png'}
                  alt={karya.category}
                  className="w-4 h-4 object-contain"
                />
              </div>
              <span className="text-xs text-foreground/80 font-medium">
                {categoryNames[karya.category] || 'Karya'}
              </span>
            </div>
          </div>
        </div>
        
        {/* View count section */}
        {karya.view_count != null && karya.view_count > 0 && (
          <div className="flex items-center gap-2 bg-black/20 backdrop-blur-sm px-3 py-2 rounded-full border border-white/10 shadow-md w-fit">
            <Eye className="w-4 h-4 text-foreground/80" />
            <span className="text-sm font-medium text-foreground/90">
              {karya.view_count} views
            </span>
          </div>
        )}
      </div>
      
      {/* Tags section */}
      {tags.length > 0 && (
        <div className="flex-shrink-0 px-6 py-4 border-b border-border/20">
          <div className="flex items-center gap-2 mb-3">
            <Tag className="w-4 h-4 text-foreground/60" />
            <span className="text-sm font-medium text-foreground/80">Tags</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <Badge
                key={index}
                className="bg-foreground/10 hover:bg-foreground/15 text-foreground/90 border-none font-medium text-xs"
              >
                #{tag}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Expandable description section */}
      {karya.description && (
        <div className="flex-1 min-h-0 flex flex-col px-6 py-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-sm font-medium text-foreground/80">Description</span>
          </div>
          <div className="flex-1 min-h-0">
            <ScrollArea className={`${
              isDescriptionExpanded ? 'h-full' : 'h-32'
            }`}>
              <div className={`transition-all duration-300 relative`}>
                <p className="text-foreground/90 leading-relaxed font-sans text-sm whitespace-pre-wrap break-words pr-4">
                  {karya.description}
                </p>
                {!isDescriptionExpanded && karya.description.length > 200 && (
                  <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-secondary/95 to-transparent pointer-events-none"></div>
                )}
              </div>
            </ScrollArea>
          </div>
          {karya.description.length > 200 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleDescription}
              className="mt-3 text-foreground/60 hover:text-foreground hover:bg-foreground/5 gap-1 rounded-full font-medium self-start"
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
      <div className="flex-shrink-0 p-6 pt-4 border-t border-border/20">
        <p className="text-xs text-foreground/60 mb-4 font-medium">
          Dibuat pada {new Date(karya.created_at).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </p>
        
        <div className="flex flex-col gap-2">
          {karya.content_url && !karya.link_url && (
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
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
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
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
    </div>
  );
};
