
import React from "react";
import { motion } from "framer-motion";
import { 
  Calendar, 
  Clock, 
  Users, 
  Megaphone,
  ArrowUpRight,
  Code
} from "lucide-react";
import { format } from "date-fns";
import { Announcement } from "@/models/Announcement";
import BentoCard from "@/components/ui/BentoCard";

interface AnnouncementCardProps {
  announcement: Announcement;
  onClick: () => void;
}

export const AnnouncementCard: React.FC<AnnouncementCardProps> = ({ 
  announcement, 
  onClick 
}) => {
  const categoryStyles = {
    event: {
      bgColor: "bg-coral/20",
      textColor: "text-coral",
      icon: Calendar,
      gradientColor: "from-coral/20 to-coral/40",
    },
    recruitment: {
      bgColor: "bg-turquoise/20",
      textColor: "text-turquoise",
      icon: Users,
      gradientColor: "from-turquoise/20 to-turquoise/40",
    },
    update: {
      bgColor: "bg-amethyst/20",
      textColor: "text-amethyst",
      icon: Megaphone,
      gradientColor: "from-amethyst/20 to-amethyst/40",
    }
  };
  
  // Handle unknown category gracefully
  const categoryStyle = categoryStyles[announcement.category as keyof typeof categoryStyles] || categoryStyles.update;
  const CategoryIcon = categoryStyle.icon;
  
  // Format date safely
  const getDisplayDate = () => {
    try {
      if (announcement.date) {
        return format(new Date(announcement.date), "dd MMM yyyy");
      }
      return format(new Date(announcement.created_at), "dd MMM yyyy");
    } catch (error) {
      console.error("Date formatting error:", error);
      return "Tanggal tidak valid";
    }
  };
  
  const displayDate = getDisplayDate();

  // Check if this is the Version 4.0 announcement
  const isVersionFour = announcement.title.includes('4.0') || announcement.title.includes('Versi 4');
  const isArdelyo = announcement.content.includes('Ardelyo') || announcement.content.includes('Unix Series');
  
  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
      <BentoCard
        className="p-4 sm:p-6 h-full relative overflow-hidden"
        interactive={true}
        onClick={onClick}
        glowColor={isVersionFour ? "rgba(155, 109, 255, 0.2)" : undefined}
      >
        {/* Decorative background elements */}
        {isVersionFour && (
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-amethyst/5 rounded-full blur-2xl"></div>
        )}
        {isArdelyo && (
          <div className="absolute top-5 -left-10 w-24 h-24 bg-turquoise/5 rounded-full blur-xl"></div>
        )}
        
        <div className="flex items-start justify-between z-10 relative">
          <div className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-gradient-to-r ${categoryStyle.gradientColor} ${categoryStyle.textColor} text-xs font-medium flex items-center gap-1.5`}>
            <CategoryIcon className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
            <span>
              {announcement.category === "event" ? "Acara" : 
               announcement.category === "recruitment" ? "Rekrutmen" : "Update"}
            </span>
          </div>
          
          <div className="flex gap-1.5">
            {isVersionFour && (
              <motion.span 
                className="bg-gradient-to-r from-amethyst/80 to-turquoise/70 text-white text-xs px-1.5 sm:px-2 py-0.5 rounded-full"
                animate={{ y: [0, -3, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              >
                v4.0
              </motion.span>
            )}
            
            {announcement.important && (
              <span className="bg-red-500/80 text-white text-xs px-1.5 sm:px-2 py-0.5 rounded-full">
                Penting
              </span>
            )}
            
            {isArdelyo && (
              <motion.span 
                className="bg-gradient-to-r from-turquoise/70 to-coral/70 text-white text-xs px-1.5 sm:px-2 py-0.5 rounded-full flex items-center"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              >
                <Code className="w-2.5 h-2.5 mr-1" />
                Unix Series
              </motion.span>
            )}
          </div>
        </div>
        
        <div className="mt-3 sm:mt-4">
          <h3 className="text-base sm:text-xl font-serif mb-1.5 sm:mb-2">
            {announcement.title}
          </h3>
          <p className="text-foreground/70 line-clamp-3 text-xs sm:text-sm mb-3 sm:mb-4">
            {announcement.content.substring(0, 120)}...
          </p>
        </div>
        
        <div className="flex items-center justify-between text-xs text-foreground/60 mt-auto">
          <span className="flex items-center gap-1.5">
            <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            {displayDate}
          </span>
          <span className="text-foreground/80 text-xs sm:text-sm font-medium hover:underline flex items-center">
            Selengkapnya
            <ArrowUpRight className="w-3 h-3 ml-1" />
          </span>
        </div>
      </BentoCard>
    </motion.div>
  );
};
