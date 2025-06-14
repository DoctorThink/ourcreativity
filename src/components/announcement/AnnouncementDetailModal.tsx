
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, X, ExternalLink } from "lucide-react";
import { format } from "date-fns";
import ReactMarkdown from "react-markdown";
import { Announcement } from "@/models/Announcement";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
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
  const [scrollY, setScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = (e: Event) => {
      const target = e.target as HTMLElement;
      const scrollTop = target.scrollTop;
      setScrollY(scrollTop);
      setIsScrolled(scrollTop > 50);
    };

    if (isOpen) {
      const modalContent = document.querySelector('[data-radix-dialog-content]');
      if (modalContent) {
        modalContent.addEventListener('scroll', handleScroll);
        return () => modalContent.removeEventListener('scroll', handleScroll);
      }
    }
  }, [isOpen]);

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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="max-w-5xl max-h-[95vh] p-0 border-0 bg-secondary/95 backdrop-blur-xl overflow-hidden"
        style={{ zIndex: 10000 }}
      >
        <DialogTitle className="sr-only">{announcement.title}</DialogTitle>
        <DialogDescription className="sr-only">
          {getCategoryLabel()} - {getDisplayDate()}
        </DialogDescription>
        
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
              {/* Dynamic Shrinking Header */}
              <motion.div 
                className="sticky top-0 z-20 bg-secondary/95 backdrop-blur-xl border-b border-white/10 transition-all duration-300"
                animate={{
                  paddingTop: isScrolled ? "0.75rem" : "1.5rem",
                  paddingBottom: isScrolled ? "0.5rem" : "1rem",
                  paddingLeft: "1.5rem",
                  paddingRight: "1.5rem"
                }}
              >
                <div className="flex items-start justify-between gap-4">
                  <motion.div 
                    className="flex-1"
                    animate={{
                      marginBottom: isScrolled ? "0" : "1rem"
                    }}
                  >
                    {/* Badges Row - Hide when scrolled */}
                    <motion.div 
                      className="flex items-center gap-3 overflow-hidden"
                      animate={{
                        height: isScrolled ? 0 : "auto",
                        marginBottom: isScrolled ? 0 : "1rem",
                        opacity: isScrolled ? 0 : 1
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <Badge className={getCategoryColor()}>
                        {getCategoryLabel()}
                      </Badge>
                      {announcement.important && (
                        <Badge className="bg-red-500/20 text-red-400 border-red-500/30 animate-pulse-subtle">
                          ⚠️ Penting
                        </Badge>
                      )}
                    </motion.div>
                    
                    {/* Title - Shrinks when scrolled */}
                    <motion.h1 
                      className="font-serif font-bold text-foreground leading-tight"
                      animate={{
                        fontSize: isScrolled ? "1.25rem" : "2rem",
                        lineHeight: isScrolled ? "1.4" : "1.2"
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {announcement.title}
                    </motion.h1>
                    
                    {/* Date - Hide when scrolled */}
                    <motion.div 
                      className="flex items-center gap-2 text-sm text-foreground/60 overflow-hidden"
                      animate={{
                        height: isScrolled ? 0 : "auto",
                        marginTop: isScrolled ? 0 : "0.75rem",
                        opacity: isScrolled ? 0 : 1
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <Calendar className="w-4 h-4" />
                      <span>{getDisplayDate()}</span>
                    </motion.div>
                  </motion.div>
                  
                  {/* Close Button - Always visible */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onClose}
                    className="p-2 hover:bg-white/10 rounded-full transition-all duration-200 hover:scale-110 flex-shrink-0"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                {/* Compact badges when scrolled */}
                <motion.div
                  className="flex items-center gap-2 overflow-hidden"
                  animate={{
                    height: isScrolled ? "auto" : 0,
                    opacity: isScrolled ? 1 : 0,
                    marginTop: isScrolled ? "0.5rem" : 0
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <Badge className={`${getCategoryColor()} text-xs`}>
                    {getCategoryLabel()}
                  </Badge>
                  <span className="text-xs text-foreground/50">•</span>
                  <span className="text-xs text-foreground/60">{getDisplayDate()}</span>
                  {announcement.important && (
                    <>
                      <span className="text-xs text-foreground/50">•</span>
                      <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-xs">
                        Penting
                      </Badge>
                    </>
                  )}
                </motion.div>
              </motion.div>

              {/* Content Section */}
              <div className="px-6 pb-6">
                {/* Image */}
                {announcement.image_url && (
                  <motion.div 
                    className="relative overflow-hidden rounded-2xl border border-white/10 group mb-8"
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
                  className="max-w-none space-y-6 text-readable prose prose-invert prose-lg max-w-none"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <ReactMarkdown
                    components={{
                      h1: ({ children }) => <h1 className="text-3xl font-serif font-bold text-foreground mb-4">{children}</h1>,
                      h2: ({ children }) => <h2 className="text-2xl font-serif font-semibold text-foreground mb-3">{children}</h2>,
                      h3: ({ children }) => <h3 className="text-xl font-serif font-semibold text-foreground mb-2">{children}</h3>,
                      p: ({ children }) => <p className="text-base leading-relaxed text-foreground/90 mb-4">{children}</p>,
                      strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
                      em: ({ children }) => <em className="italic text-foreground/90">{children}</em>,
                      ul: ({ children }) => <ul className="space-y-2 mb-4">{children}</ul>,
                      ol: ({ children }) => <ol className="space-y-2 mb-4 list-decimal list-inside">{children}</ol>,
                      li: ({ children }) => (
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-amethyst mt-2.5 flex-shrink-0" />
                          <span className="text-base leading-relaxed text-foreground/90 flex-1">{children}</span>
                        </li>
                      ),
                      blockquote: ({ children }) => (
                        <blockquote className="border-l-4 border-amethyst/50 pl-6 py-4 my-6 bg-amethyst/5 rounded-r-lg">
                          <div className="text-lg leading-relaxed text-foreground/90 italic">{children}</div>
                        </blockquote>
                      ),
                      code: ({ children }) => (
                        <code className="bg-secondary/50 px-2 py-1 rounded text-sm font-mono text-mint">{children}</code>
                      ),
                    }}
                  >
                    {announcement.content}
                  </ReactMarkdown>
                </motion.div>
                
                {/* Enhanced Link */}
                {announcement.link_url && (
                  <motion.div 
                    className="pt-8 border-t border-white/10 mt-8"
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
