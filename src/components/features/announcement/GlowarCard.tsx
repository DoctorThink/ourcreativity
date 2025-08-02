
import React from "react";
import { motion } from "framer-motion";
import { Calendar, ArrowRight, AlertTriangle, Megaphone, Users } from "lucide-react";
import { format } from "date-fns";
import { Announcement } from "@/models/Announcement";

interface GlowarCardProps {
  announcement: Announcement;
  onClick: () => void;
}

export const GlowarCard: React.FC<GlowarCardProps> = ({ 
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
        return { 
          label: "Acara", 
          color: "bg-coral/20 text-coral border-coral/30",
          glowColor: "shadow-coral/20" 
        };
      case "recruitment":
        return { 
          label: "Rekrutmen", 
          color: "bg-turquoise/20 text-turquoise border-turquoise/30",
          glowColor: "shadow-turquoise/20" 
        };
      case "update":
        return { 
          label: "Update", 
          color: "bg-amethyst/20 text-amethyst border-amethyst/30",
          glowColor: "shadow-amethyst/20" 
        };
      default:
        return { 
          label: "Update", 
          color: "bg-amethyst/20 text-amethyst border-amethyst/30",
          glowColor: "shadow-amethyst/20" 
        };
    }
  };

  // Clean markdown from content for display
  const createCleanSummary = (text: string, maxLength: number = 120) => {
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
  const cleanSummary = createCleanSummary(announcement.content);

  return (
    <motion.div
      whileHover={{ 
        scale: 1.02, 
        y: -8,
        boxShadow: "0 20px 40px rgba(0,0,0,0.3), 0 0 30px rgba(155, 109, 255, 0.15)"
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="cursor-pointer group"
      onClick={onClick}
    >
      {/* Glowar Card Container */}
      <div className="relative h-full">
        {/* Hover Glow Effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-amethyst/30 via-turquoise/20 to-coral/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
        
        {/* Main Card */}
        <div className="relative bg-secondary/80 backdrop-blur-lg border border-white/10 rounded-2xl p-6 h-full flex flex-col group-hover:border-white/30 transition-all duration-300">
          
          {/* Grouped Tags Section */}
          <div className="flex items-start justify-between mb-5">
            <div className="flex items-center gap-2 flex-wrap">
              {/* Category Tag */}
              <div className={`
                px-3 py-1.5 rounded-full text-xs font-semibold border flex items-center gap-1.5
                ${categoryInfo.color}
              `}>
                {announcement.category === "event" && <Calendar className="w-3.5 h-3.5" />}
                {announcement.category === "recruitment" && <Users className="w-3.5 h-3.5" />}
                {announcement.category === "update" && <Megaphone className="w-3.5 h-3.5" />}
                <span>{categoryInfo.label}</span>
              </div>
              
              {/* Important Tag */}
              {announcement.important && (
                <div className="px-3 py-1.5 bg-red-500/20 text-red-300 border border-red-500/30 rounded-full text-xs font-semibold flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Penting</span>
                </div>
              )}
            </div>
          </div>

          {/* Content Section - Typography Hierarchy */}
          <div className="flex-1 space-y-4">
            {/* Clear Typography Hierarchy */}
            <h2 className="font-serif font-bold text-xl leading-tight text-foreground group-hover:text-opacity-95 transition-all duration-200">
              {announcement.title}
            </h2>
            
            {/* Clean Summary */}
            <p className="text-sm text-foreground/75 leading-relaxed font-normal">
              {cleanSummary}
            </p>
          </div>

          {/* Consistent Footer */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/5">
            {/* Left: Calendar + Date */}
            <div className="flex items-center gap-2 text-sm text-foreground/60">
              <Calendar className="w-4 h-4" />
              <span className="font-medium">{displayDate}</span>
            </div>
            
            {/* Right: Read More Link */}
            <div className="flex items-center gap-2 text-sm text-foreground/80 group-hover:text-foreground group-hover:gap-3 transition-all duration-200">
              <span className="font-semibold">Baca Selengkapnya</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
