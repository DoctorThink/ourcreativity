
import React from "react";
import { motion } from "framer-motion";
import { 
  Calendar, 
  Clock, 
  Users, 
  Megaphone,
  ArrowUpRight,
  Code,
  AlertTriangle
} from "lucide-react";
import { format } from "date-fns";
import { Announcement } from "@/models/Announcement";
import BentoCard from "@/components/ui/BentoCard";
import { getCategoryTheme, getSolidCategoryBgClass } from "@/lib/themeUtils"; // Import theme helper

interface AnnouncementCardProps {
  announcement: Announcement;
  onClick: () => void;
}

export const AnnouncementCard: React.FC<AnnouncementCardProps> = ({ 
  announcement, 
  onClick 
}) => {
  const theme = getCategoryTheme(announcement.category);
  
  const categoryIconsMap: Record<string, React.ElementType> = {
    event: Calendar,
    recruitment: Users,
    update: Megaphone,
  };
  const CategoryIcon = categoryIconsMap[announcement.category] || Megaphone;

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

  // Check if this is the Gerakan 27 April event
  const isGerakan27April = announcement.title.includes('Gerakan 27 April') || announcement.content.includes('Gerakan 27 April');
  
  // Check if this is the Version 4.0 announcement
  const isVersionFour = announcement.title.includes('4.0') || announcement.title.includes('Versi 4');
  
  // Check if this is Ardelyo related
  const isArdelyo = announcement.content.includes('Ardelyo') || announcement.content.includes('Unix Series');
  
  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="h-full">
      <BentoCard
        className={`p-0 h-full relative overflow-hidden flex flex-col border-t-4 ${theme.borderClass} ${isGerakan27April ? 'bg-black/60 !border-red-700' : theme.bgClass}`}
        interactive={true}
        onClick={onClick}
        glowColor={
          isGerakan27April ? "rgba(234, 56, 76, 0.2)" : 
          isVersionFour ? "rgba(155, 109, 255, 0.2)" : 
          undefined // Or use theme.accentClass with opacity for a default glow
        }
      >
        {/* Image Display */}
        {announcement.image_url && (
          <div className="w-full h-32 sm:h-40 overflow-hidden">
            <img 
              src={announcement.image_url} 
              alt={announcement.title} 
              className="w-full h-full object-cover" 
            />
          </div>
        )}
        
        {/* Content Area */}
        <div className="p-4 sm:p-5 flex flex-col flex-grow">
          {/* Decorative background elements (conditional) */}
          {isGerakan27April && (
            <>
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-red-900/20 rounded-full blur-3xl opacity-50"></div>
              <div className="absolute bottom-5 right-5 w-20 h-20 bg-red-800/10 rounded-full blur-xl opacity-50"></div>
            </>
          )}
          {isVersionFour && (
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-amethyst/5 rounded-full blur-2xl opacity-50"></div>
          )}
          {isArdelyo && (
            <div className="absolute top-5 -left-10 w-24 h-24 bg-turquoise/5 rounded-full blur-xl opacity-50"></div>
          )}

          <div className="flex items-start justify-between z-10 relative mb-3">
            <div className={`px-2.5 py-1 rounded-full 
              ${isGerakan27April 
                ? 'bg-gradient-to-r from-red-900/80 to-red-600/70 text-white' 
                : `${getSolidCategoryBgClass(announcement.category)} ${theme.badgeTextClass}`} 
              text-xs font-sans font-medium flex items-center gap-1.5`}
            >
              <CategoryIcon className="w-3 h-3" />
              <span className="capitalize">
                {announcement.category === "event" ? "Acara" : 
                 announcement.category === "recruitment" ? "Rekrutmen" : 
                 announcement.category || "Info"}
              </span>
            </div>
            
            <div className="flex gap-1.5">
            {isGerakan27April && (
              <motion.span 
                className="bg-gradient-to-r from-red-800 to-red-600 text-white text-xs px-1.5 sm:px-2 py-0.5 rounded-full flex items-center"
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              >
                <AlertTriangle className="w-2.5 h-2.5 mr-1" />
                Penting
              </motion.span>
            )}
            
            {isVersionFour && (
              <motion.span 
                className="bg-gradient-to-r from-amethyst/80 to-turquoise/70 text-white text-xs px-1.5 sm:px-2 py-0.5 rounded-full"
                animate={{ y: [0, -3, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              >
                v4.0
              </motion.span>
            )}
            
            {announcement.important && !isGerakan27April && (
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
        
          
          <div className="mt-1 flex-grow"> {/* Changed mt-3 to mt-1 and added flex-grow */}
            <h3 className={`text-base sm:text-lg font-serif mb-2 ${isGerakan27April ? 'text-red-200' : theme.accentClass}`}>
              {announcement.title}
            </h3>
            <p className={`line-clamp-3 text-xs sm:text-sm font-sans mb-3 ${isGerakan27April ? 'text-red-100/80' : 'text-foreground/80'}`}>
              {announcement.content.substring(0, 120)}...
            </p>
          </div>
          
          <div className="flex items-center justify-between text-xs text-foreground/60 mt-auto font-sans">
            <span className={`flex items-center gap-1.5 ${isGerakan27April ? 'text-red-200/70' : 'text-foreground/70'}`}>
              <Clock className="w-3 h-3" />
              {displayDate}
            </span>
            <span className={`font-medium hover:underline flex items-center ${isGerakan27April ? 'text-red-300 hover:text-red-200' : `${theme.accentClass} hover:${theme.textClass}`}`}>
              Selengkapnya
              <ArrowUpRight className="w-3 h-3 ml-0.5" />
            </span>
          </div>
        </div>
      </BentoCard>
    </motion.div>
  );
};
