
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, X, ExternalLink } from "lucide-react";
import { format } from "date-fns";
import { Announcement } from "@/models/Announcement";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface AnnouncementDetailModalProps {
  announcement: Announcement | null;
  isOpen: boolean;
  onClose: () => void;
}

export const AnnouncementDetailModal: React.FC<AnnouncementDetailModalProps> = ({
  announcement,
  isOpen,
  onClose,
}) => {
  if (!announcement) return null;

  const getDisplayDate = () => {
    try {
      const date = announcement.date ? new Date(announcement.date) : new Date(announcement.created_at);
      return format(date, "dd MMMM yyyy");
    } catch (error) {
      return "Tanggal tidak valid";
    }
  };

  const getCategoryLabel = () => {
    switch (announcement.category) {
      case "event": return "Acara";
      case "recruitment": return "Rekrutmen";
      case "update": return "Update";
      default: return "Pengumuman";
    }
  };

  const getCategoryColor = () => {
    switch (announcement.category) {
      case "event": return "bg-coral/20 text-coral border-coral/30";
      case "recruitment": return "bg-mint/20 text-mint border-mint/30";
      case "update": return "bg-amethyst/20 text-amethyst border-amethyst/30";
      default: return "bg-secondary/20 text-foreground border-border/30";
    }
  };

  // Enhanced markdown-like parsing with better formatting
  const parseContent = (content: string) => {
    return content.split('\n\n').map((paragraph, idx) => {
      // Handle headers (lines starting with #)
      if (paragraph.startsWith('# ')) {
        return (
          <h2 key={idx} className="text-2xl font-serif font-bold text-foreground mb-4 mt-6 first:mt-0">
            {paragraph.replace('# ', '')}
          </h2>
        );
      }
      
      if (paragraph.startsWith('## ')) {
        return (
          <h3 key={idx} className="text-xl font-serif font-semibold text-foreground mb-3 mt-5 first:mt-0">
            {paragraph.replace('## ', '')}
          </h3>
        );
      }

      if (paragraph.startsWith('### ')) {
        return (
          <h4 key={idx} className="text-lg font-serif font-semibold text-foreground mb-2 mt-4 first:mt-0">
            {paragraph.replace('### ', '')}
          </h4>
        );
      }

      // Handle lists (lines with - or *)
      if (paragraph.includes('- ') || paragraph.includes('* ') || paragraph.includes('• ')) {
        const items = paragraph.split('\n').filter(line => line.trim());
        return (
          <div key={idx} className="space-y-3 my-4">
            {items.map((item, itemIdx) => {
              if (item.includes('- ') || item.includes('* ') || item.includes('• ')) {
                return (
                  <div key={itemIdx} className="flex items-start gap-3 group">
                    <div className="w-2 h-2 rounded-full bg-amethyst mt-2.5 flex-shrink-0 group-hover:bg-coral transition-colors duration-200" />
                    <p className="text-base leading-relaxed text-foreground/90 flex-1">
                      {item.replace(/^[•*-]\s*/, '')}
                    </p>
                  </div>
                );
              }
              return (
                <p key={itemIdx} className="text-lg leading-relaxed font-medium text-foreground mb-2">
                  {item}
                </p>
              );
            })}
          </div>
        );
      }

      // Handle numbered lists
      if (/^\d+\./.test(paragraph)) {
        const items = paragraph.split('\n').filter(line => line.trim());
        return (
          <ol key={idx} className="space-y-3 my-4 counter-reset-list">
            {items.map((item, itemIdx) => {
              if (/^\d+\./.test(item)) {
                const number = item.match(/^\d+/)?.[0];
                const text = item.replace(/^\d+\.\s*/, '');
                return (
                  <li key={itemIdx} className="flex items-start gap-3 group">
                    <div className="w-6 h-6 rounded-full bg-amethyst/20 text-amethyst flex items-center justify-center text-sm font-medium flex-shrink-0 group-hover:bg-coral/20 group-hover:text-coral transition-colors duration-200">
                      {number}
                    </div>
                    <p className="text-base leading-relaxed text-foreground/90 flex-1">
                      {text}
                    </p>
                  </li>
                );
              }
              return null;
            }).filter(Boolean)}
          </ol>
        );
      }

      // Handle quotes (lines starting with >)
      if (paragraph.startsWith('> ')) {
        return (
          <blockquote key={idx} className="border-l-4 border-amethyst/50 pl-6 py-4 my-6 bg-amethyst/5 rounded-r-lg">
            <p className="text-lg leading-relaxed text-foreground/90 italic">
              {paragraph.replace('> ', '')}
            </p>
          </blockquote>
        );
      }

      // Handle bold text (**text**)
      let processedText = paragraph.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-foreground">$1</strong>');
      
      // Handle italic text (*text*)
      processedText = processedText.replace(/\*(.*?)\*/g, '<em class="italic text-foreground/90">$1</em>');

      // Handle inline code (`code`)
      processedText = processedText.replace(/`(.*?)`/g, '<code class="bg-secondary/50 px-2 py-1 rounded text-sm font-mono text-mint">$1</code>');

      // Regular paragraph
      return (
        <p 
          key={idx} 
          className="text-base leading-relaxed text-foreground/90 mb-4"
          dangerouslySetInnerHTML={{ __html: processedText }}
        />
      );
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[95vh] p-0 border-0 bg-secondary/95 backdrop-blur-xl overflow-hidden">
        <AnimatePresence mode="wait">
          {announcement && (
            <motion.div
              key={announcement.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="overflow-y-auto max-h-[95vh] scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent"
            >
              {/* Enhanced Header */}
              <div className="sticky top-0 z-20 bg-secondary/90 backdrop-blur-xl border-b border-white/10 p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <Badge className={getCategoryColor()}>
                        {getCategoryLabel()}
                      </Badge>
                      {announcement.important && (
                        <Badge className="bg-red-500/20 text-red-400 border-red-500/30 animate-pulse-subtle">
                          ⚠️ Penting
                        </Badge>
                      )}
                      <div className="flex items-center gap-2 text-sm text-foreground/60">
                        <Calendar className="w-4 h-4" />
                        <span>{getDisplayDate()}</span>
                      </div>
                    </div>
                    
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-foreground leading-tight mb-2">
                      {announcement.title}
                    </h1>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onClose}
                    className="p-2 hover:bg-white/10 rounded-full transition-all duration-200 hover:scale-110"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              {/* Enhanced Content */}
              <div className="p-6 space-y-6">
                {/* Image */}
                {announcement.image_url && (
                  <motion.div 
                    className="relative overflow-hidden rounded-2xl border border-white/10 group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <img 
                      src={announcement.image_url} 
                      alt={announcement.title}
                      className="w-full h-auto object-cover max-h-[500px] transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.div>
                )}
                
                {/* Enhanced Content with Markdown Support */}
                <motion.div 
                  className="prose prose-lg max-w-none space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {parseContent(announcement.content)}
                </motion.div>
                
                {/* Enhanced Link */}
                {announcement.link_url && (
                  <motion.div 
                    className="pt-6 border-t border-white/10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <a
                      href={announcement.link_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-amethyst/20 to-coral/20 hover:from-amethyst/30 hover:to-coral/30 text-amethyst border border-amethyst/30 rounded-2xl text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg group"
                    >
                      <ExternalLink className="w-4 h-4 group-hover:rotate-12 transition-transform duration-200" />
                      Kunjungi Link
                    </a>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};
