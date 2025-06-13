import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, X } from "lucide-react";
import { format } from "date-fns";
import { Announcement } from "@/models/Announcement";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
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
              <DialogHeader className="sticky top-0 z-20 bg-secondary/90 backdrop-blur-xl border-b border-white/10 p-6">
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
                    
                    <DialogTitle className="text-2xl sm:text-3xl font-serif font-bold text-foreground leading-tight text-left">
                      {announcement.title}
                    </DialogTitle>
                    
                    <div className="flex items-center gap-2 mt-3 text-sm text-foreground/60">
                      <Calendar className="w-4 h-4" />
                      <span>{getDisplayDate()}</span>
                    </div>
                  </div>
                  
                  {/* The DialogClose is part of DialogContent in ui/dialog.tsx, so no explicit Button with X here if we follow strict Radix structure inside DialogHeader */}
                  {/* However, the original design has the X button aligned with the title area. Let's keep the explicit close button for now. */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onClose}
                    className="p-2 hover:bg-white/10 rounded-full absolute top-4 right-4 sm:top-6 sm:right-6" // Adjusted positioning
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              </DialogHeader>

              {/* Content */}
              <div className="p-6 space-y-6 prose prose-lg max-w-none"> {/* Added prose classes here for overall content styling if DialogDescription doesn't cover everything */}
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
                <DialogDescription asChild>
                  {/* The wrapping div for prose styling might be redundant if DialogDescription itself can take className, or if the parent div has prose */}
                  <div>
                    {announcement.content.split('\n').map((line, index) => (
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
