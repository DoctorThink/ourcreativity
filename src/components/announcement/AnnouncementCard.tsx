import React from "react";
import { motion } from "framer-motion";
import { 
  Calendar, 
  Clock, 
  Users, 
  Megaphone,
  ArrowUpRight,
  Code,
  AlertTriangle,
  Eye,
  Heart
} from "lucide-react";
import { format } from "date-fns";
import { Announcement } from "@/models/Announcement";
import BentoCard from "@/components/ui/BentoCard";
import { useIsMobile } from "@/hooks/use-mobile";

interface AnnouncementCardProps {
  announcement: Announcement;
  onClick: () => void;
}

export const AnnouncementCard: React.FC<AnnouncementCardProps> = ({ 
  announcement, 
  onClick 
}) => {
  const isMobile = useIsMobile();
  
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
        return format(new Date(announcement.date), "dd MMM");
      }
      return format(new Date(announcement.created_at), "dd MMM");
    } catch (error) {
      console.error("Date formatting error:", error);
      return "Invalid";
    }
  };
  
  const getTimeAgo = () => {
    try {
      const date = announcement.date ? new Date(announcement.date) : new Date(announcement.created_at);
      const now = new Date();
      const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
      
      if (diffInHours < 24) {
        return `${diffInHours}j`;
      } else {
        const diffInDays = Math.floor(diffInHours / 24);
        return `${diffInDays}h`;
      }
    } catch (error) {
      return "";
    }
  };
  
  const displayDate = getDisplayDate();
  const timeAgo = getTimeAgo();

  // Check if this is the Gerakan 27 April event
  const isGerakan27April = announcement.title.includes('Gerakan 27 April') || announcement.content.includes('Gerakan 27 April');
  
  // Check if this is the Version 4.0 announcement
  const isVersionFour = announcement.title.includes('4.0') || announcement.title.includes('Versi 4');
  
  // Check if this is Ardelyo related
  const isArdelyo = announcement.content.includes('Ardelyo') || announcement.content.includes('Unix Series');
  
  return (
    <motion.div 
      whileHover={{ scale: 1.02, y: -5 }} 
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <BentoCard
        className={`p-4 sm:p-5 h-full relative overflow-hidden group cursor-pointer 
          ${isGerakan27April ? 'bg-black/80 border-red-900/50 hover:border-red-800/70' : 'hover:border-white/20'} 
          transition-all duration-300`}
        interactive={true}
        onClick={onClick}
        glowColor={
          isGerakan27April ? "rgba(234, 56, 76, 0.3)" : 
          isVersionFour ? "rgba(155, 109, 255, 0.2)" : 
          undefined
        }
      >
        {/* Enhanced decorative background elements */}
        {isGerakan27April && (
          <>
            <motion.div 
              className="absolute -top-10 -left-10 w-32 h-32 bg-red-900/20 rounded-full blur-3xl"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 4, 
                ease: "easeInOut" 
              }}
            />
            <div className="absolute bottom-5 right-5 w-16 h-16 bg-red-800/10 rounded-full blur-xl" />
          </>
        )}
        
        {isVersionFour && (
          <motion.div 
            className="absolute -bottom-10 -right-10 w-24 h-24 bg-amethyst/10 rounded-full blur-2xl"
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 10, 
              ease: "linear" 
            }}
          />
        )}
        
        {isArdelyo && (
          <motion.div 
            className="absolute top-5 -left-10 w-20 h-20 bg-turquoise/10 rounded-full blur-xl"
            animate={{ 
              y: [0, -10, 0],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 3, 
              ease: "easeInOut" 
            }}
          />
        )}
        
        {/* Header with category and badges */}
        <div className="flex items-start justify-between mb-3 z-10 relative">
          <div className={`px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 shadow-lg
            ${isGerakan27April 
              ? 'bg-gradient-to-r from-red-900/80 to-red-600/60 text-white' 
              : `bg-gradient-to-r ${categoryStyle.gradientColor} ${categoryStyle.textColor}`}`}
          >
            {isGerakan27April ? (
              <AlertTriangle className="w-3 h-3" />
            ) : (
              <CategoryIcon className="w-3 h-3" />
            )}
            <span className="font-semibold">
              {announcement.category === "event" ? "Acara" : 
               announcement.category === "recruitment" ? "Rekrutmen" : "Update"}
            </span>
          </div>
          
          <div className="flex flex-col items-end gap-1">
            {(isGerakan27April || isVersionFour || isArdelyo || announcement.important) && (
              <div className="flex gap-1">
                {isGerakan27April && (
                  <motion.span 
                    className="bg-gradient-to-r from-red-800 to-red-600 text-white text-xs px-2 py-0.5 rounded-full flex items-center shadow-lg"
                    animate={{ scale: [1, 1.08, 1] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  >
                    <AlertTriangle className="w-2.5 h-2.5 mr-1" />
                    Penting
                  </motion.span>
                )}
                
                {isVersionFour && (
                  <motion.span 
                    className="bg-gradient-to-r from-amethyst/90 to-turquoise/80 text-white text-xs px-2 py-0.5 rounded-full shadow-lg"
                    animate={{ y: [0, -3, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  >
                    v4.0
                  </motion.span>
                )}
                
                {announcement.important && !isGerakan27April && (
                  <span className="bg-red-500/90 text-white text-xs px-2 py-0.5 rounded-full animate-pulse shadow-lg">
                    Penting
                  </span>
                )}
                
                {isArdelyo && (
                  <motion.span 
                    className="bg-gradient-to-r from-turquoise/80 to-coral/80 text-white text-xs px-2 py-0.5 rounded-full flex items-center shadow-lg"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  >
                    <Code className="w-2.5 h-2.5 mr-1" />
                    Unix
                  </motion.span>
                )}
              </div>
            )}
            
            <span className={`text-xs font-medium ${isGerakan27April ? 'text-red-200/70' : 'text-foreground/60'}`}>
              {timeAgo}
            </span>
          </div>
        </div>
        
        {/* Enhanced content section */}
        <div className="flex-1 z-10 relative">
          <motion.h3 
            className={`text-base sm:text-lg font-serif font-bold mb-2 leading-tight group-hover:text-opacity-90 transition-all duration-200 
              ${isGerakan27April ? 'text-red-200' : 'text-foreground'}`}
            initial={{ opacity: 0.9 }}
            whileHover={{ opacity: 1 }}
          >
            {announcement.title}
          </motion.h3>
          
          <p className={`text-sm mb-4 leading-relaxed ${isGerakan27April ? 'text-red-100/80' : 'text-foreground/75'}`}>
            {(announcement.content.substring(0, isMobile ? 100 : 120) + "...").split('\n').map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </p>
        </div>
        
        {/* Enhanced footer with engagement metrics */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/5 z-10 relative">
          <div className="flex items-center gap-3">
            <span className={`flex items-center gap-1.5 text-xs font-medium
              ${isGerakan27April ? 'text-red-200/70' : 'text-foreground/60'}`}>
              <Calendar className="w-3 h-3" />
              {displayDate}
            </span>
            
            <div className="flex items-center gap-2">
              <span className={`flex items-center gap-1 text-xs
                ${isGerakan27April ? 'text-red-200/60' : 'text-foreground/50'}`}>
                <Eye className="w-3 h-3" />
                {Math.floor(Math.random() * 500) + 50}
              </span>
              <span className={`flex items-center gap-1 text-xs
                ${isGerakan27April ? 'text-red-200/60' : 'text-foreground/50'}`}>
                <Heart className="w-3 h-3" />
                {Math.floor(Math.random() * 30) + 5}
              </span>
            </div>
          </div>
          
          <motion.span 
            className={`text-xs font-semibold flex items-center gap-1 group-hover:gap-2 transition-all duration-200
              ${isGerakan27April ? 'text-red-200 group-hover:text-red-100' : 'text-foreground/80 group-hover:text-foreground'}`}
            whileHover={{ x: 3 }}
          >
            Baca
            <ArrowUpRight className="w-3 h-3 group-hover:rotate-12 transition-transform duration-200" />
          </motion.span>
        </div>
        
        {/* Hover overlay effect */}
        <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none
          ${isGerakan27April ? 'bg-gradient-to-br from-red-900/10 to-red-800/5' : 'bg-gradient-to-br from-white/5 to-transparent'}`} />
      </BentoCard>
    </motion.div>
  );
};
