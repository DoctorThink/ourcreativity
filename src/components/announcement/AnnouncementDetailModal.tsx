import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, X } from "lucide-react";
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[95vh] p-0 border-0 bg-secondary/95 backdrop-blur-xl overflow-hidden">
        <AnimatePresence mode="wait">
          {announcement && (
            <motion.div
              key={announcement.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="overflow-y-auto max-h-[95vh] scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent"
            >
              {/* Header */}
              <div className="sticky top-0 z-20 bg-secondary/90 backdrop-blur-xl border-b border-white/10 p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <Badge variant="secondary" className="bg-amethyst/20 text-amethyst border-amethyst/30">
                        {getCategoryLabel()}
                      </Badge>
                      {announcement.important && (
                        <Badge variant="destructive" className="bg-red-500/20 text-red-400 border-red-500/30">
                          Penting
                        </Badge>
                      )}
                    </div>
                    
                    <h1 className="text-2xl sm:text-3xl font-serif font-bold text-foreground leading-tight">
                      {announcement.title}
                    </h1>
                    
                    <div className="flex items-center gap-2 mt-3 text-sm text-foreground/60">
                      <Calendar className="w-4 h-4" />
                      <span>{getDisplayDate()}</span>
                    </div>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onClose}
                    className="p-2 hover:bg-white/10 rounded-full"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Image */}
                {announcement.image_url && (
                  <div className="relative overflow-hidden rounded-xl border border-white/10">
                    <img 
                      src={announcement.image_url} 
                      alt={announcement.title}
                      className="w-full h-auto object-cover max-h-[400px]"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                )}
                
                {/* Content */}
                {/* The `prose` classes might add their own margins, so `my-2` and `my-4` might need adjustment if there's too much space */}
                <Dialog.Description asChild>
                  <div className="prose prose-lg max-w-none"> {/* Removed space-y-6 from here to let parseContent handle spacing */}
                    {announcement.content.split('\n').map((line, index) => (
                      // Render each line. Using a simple text line with a line break,
                      // or a <p> tag for each block separated by '\n\n'.
                      // This simple version handles both cases gracefully.
                      <span key={index}>
                        {line}
                        <br />
                      </span>
                    ))}
                  </div>
                </Dialog.Description>
                
                {/* Link */}
                {announcement.link_url && (
                  <div className="pt-6 border-t border-white/10"> {/* This pt-6 might also interact with paragraph/list margins */}
                    <a
                      href={announcement.link_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-amethyst/20 hover:bg-amethyst/30 text-amethyst border border-amethyst/30 rounded-xl text-sm font-medium transition-all duration-200"
                    >
                      Kunjungi Link
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};
