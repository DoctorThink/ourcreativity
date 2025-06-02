
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
      return format(date, "dd MMM");
    } catch (error) {
      return "Invalid";
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

  const categoryInfo = getCategoryInfo();
  const displayDate = getDisplayDate();

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
        <CardContent className="p-5 h-full flex flex-col">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className={`px-2.5 py-1 rounded-full text-xs font-medium border ${categoryInfo.color}`}>
              {categoryInfo.label}
            </div>
            {announcement.important && (
              <div className="px-2 py-0.5 bg-red-500/20 text-red-400 border border-red-500/30 rounded-full text-xs font-medium">
                Penting
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 space-y-3">
            <h3 className="text-lg font-serif font-bold text-foreground leading-tight group-hover:text-opacity-90 transition-all duration-200">
              {announcement.title}
            </h3>
            
            <p className="text-sm text-foreground/75 leading-relaxed line-clamp-3">
              {announcement.content.substring(0, 120)}...
            </p>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/5">
            <div className="flex items-center gap-1.5 text-xs text-foreground/60">
              <Calendar className="w-3 h-3" />
              <span>{displayDate}</span>
            </div>
            
            <div className="flex items-center gap-1 text-xs text-foreground/80 group-hover:text-foreground group-hover:gap-2 transition-all duration-200">
              <span className="font-medium">Baca</span>
              <ArrowRight className="w-3 h-3 group-hover:rotate-12 transition-transform duration-200" />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
