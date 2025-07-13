// src/components/karya/detail/KaryaInfoPanel.tsx

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChevronDown, Tag, Eye } from 'lucide-react';
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
    <div className="h-full flex flex-col bg-gradient-to-b from-secondary/95 to-background/95 backdrop-blur-md overflow-hidden">
      {/* Header with title and category info */}
      <div className="flex-shrink-0 p-4 md:p-6 border-b border-border/20">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 pr-3 min-w-0">
            <h2 className="text-lg md:text-xl font-bold tracking-tight text-foreground font-sans leading-tight mb-2 truncate">
              {karya.title}
            </h2>
            <p className="text-foreground/70 font-medium text-xs md:text-sm truncate">
              by {karya.creator_name}
            </p>
          </div>
          <div className="flex-shrink-0">
            <div className="flex items-center gap-1.5 bg-black/20 backdrop-blur-sm py-1 px-2 rounded-full border border-white/10 shadow-md">
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
        
        {/* View count section */}
        {karya.view_count != null && karya.view_count > 0 && (
          <div className="flex items-center gap-2 bg-black/20 backdrop-blur-sm px-2.5 py-1.5 rounded-full border border-white/10 shadow-md w-fit">
            <Eye className="w-3.5 h-3.5 text-foreground/80" />
            <span className="text-xs font-medium text-foreground/90">
              {karya.view_count} views
            </span>
          </div>
        )}
      </div>
      
      {/* Tags section */}
      {tags.length > 0 && (
        <div className="flex-shrink-0 px-4 md:px-6 py-3 border-b border-border/20">
          <div className="flex items-center gap-2 mb-2">
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

      {/* Expandable description section */}
      {karya.description && karya.category !== 'writing' && (
        <div className="flex-1 min-h-0 flex flex-col px-4 md:px-6 py-3">
          <div className="flex items-center gap-2 mb-2 flex-shrink-0">
            <span className="text-xs font-medium text-foreground/80">Description</span>
          </div>
          <ScrollArea className="flex-1 min-h-0">
            <div className={`${
              isDescriptionExpanded ? '' : 'max-h-24 overflow-hidden'
            } transition-all duration-300 relative`}>
              <p className="text-foreground/90 leading-relaxed font-sans text-xs md:text-sm whitespace-pre-wrap break-words pr-2">
                {karya.description}
              </p>
              {!isDescriptionExpanded && karya.description.length > 150 && (
                <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-secondary/95 to-transparent pointer-events-none"></div>
              )}
            </div>
          </ScrollArea>
          {karya.description.length > 150 && (
            <div className="flex-shrink-0 pt-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleDescription}
                className="text-foreground/60 hover:text-foreground hover:bg-foreground/5 gap-1 rounded-full font-medium text-xs h-7 px-3"
              >
                {isDescriptionExpanded ? 'Show Less' : 'Read More'}
                <ChevronDown
                  className={`h-3 w-3 transition-transform ${isDescriptionExpanded ? 'rotate-180' : ''}`}
                />
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Created date section */}
      <div className="flex-shrink-0 p-4 md:p-6 pt-2 border-t border-border/20 mt-auto">
        <p className="text-xs text-foreground/60 font-medium">
          Dibuat pada {new Date(karya.created_at).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </p>
      </div>
    </div>
  );
};
