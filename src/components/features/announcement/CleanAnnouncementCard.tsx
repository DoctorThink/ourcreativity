
import React from "react";
import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import { Announcement } from "@/models/Announcement";
import { Card, CardContent } from "@/components/ui/card";

interface CleanAnnouncementCardProps {
  announcement: Announcement;
  onClick: () => void;
}

export const CleanAnnouncementCard: React.FC<CleanAnnouncementCardProps> = ({ 
  announcement, 
  onClick 
}) => {
  const getDisplayDate = () => {
    try {
      const date = announcement.date ? new Date(announcement.date) : new Date(announcement.created_at);
      return format(date, "dd MMM yyyy");
    } catch (error) {
      return "Invalid date";
    }
  };

  const getCategoryInfo = () => {
    switch (announcement.category) {
      case "event":
        return { label: "Acara", color: "bg-coral/20 text-coral border-coral/30" };
      case "recruitment":
        return { label: "Rekrutmen", color: "bg-turquoise/20 text-turquoise border-turquoise/30" };
      case "update":
        return { label: "Update", color: "bg-amethyst/20 text-amethyst border-amethyst/30" };
      default:
        return { label: "Update", color: "bg-amethyst/20 text-amethyst border-amethyst/30" };
    }
  };

  // Clean markdown and create readable preview
  const createCleanPreview = (text: string, maxLength: number = 140) => {
    const cleanText = text
      .replace(/[#*_>`]/g, '') // Remove markdown characters
      .replace(/\n/g, ' ') // Replace newlines with spaces
      .replace(/\s+/g, ' ') // Replace multiple spaces with single space
      .trim();
    
    if (cleanText.length <= maxLength) {
      return cleanText;
    }
    return cleanText.slice(0, maxLength).trim() + '...';
  };

  const categoryInfo = getCategoryInfo();
  const displayDate = getDisplayDate();
  const cleanContent = createCleanPreview(announcement.content);

  return (
    <motion.div 
      whileHover={{ scale: 1.02, y: -4 }} 
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Card
        className="h-full cursor-pointer bg-secondary/60 backdrop-blur-sm border-white/10 hover:border-white/20 hover:bg-secondary/80 transition-all duration-300 group"
        onClick={onClick}
      >
        <CardContent className="p-6 h-full flex flex-col">
          {/* Header with category and importance tags */}
          <div className="flex items-start justify-between mb-5 gap-2">
            <div className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${categoryInfo.color}`}>
              {categoryInfo.label}
            </div>
            
            {announcement.important && (
              <div className="px-3 py-1 bg-red-500/20 text-red-400 border border-red-500/30 rounded-full text-xs font-semibold">
                Penting
              </div>
            )}
          </div>

          {/* Content with enhanced typography */}
          <div className="flex-1 space-y-4">
            <h3 className="font-serif font-bold text-xl leading-snug text-foreground group-hover:text-opacity-90 transition-all duration-200"
                style={{ 
                  letterSpacing: '0.01em'
                }}>
              {announcement.title}
            </h3>
            
            <p className="text-sm text-foreground/80 leading-relaxed"
               style={{ 
                 lineHeight: '1.7',
                 letterSpacing: '0.01em',
                 fontWeight: '400'
               }}>
              {cleanContent}
            </p>
          </div>

          {/* Footer with better spacing and typography */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/5">
            <div className="flex items-center gap-2 text-sm text-foreground/60">
              <Calendar className="w-4 h-4" />
              <span>{displayDate}</span>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-foreground/80 group-hover:text-foreground group-hover:gap-3 transition-all duration-200">
              <span className="font-medium">Baca Selengkapnya</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
