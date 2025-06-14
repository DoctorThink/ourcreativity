import React from "react";
import { motion } from "framer-motion";
import { 
  Bell, 
  Calendar, 
  ChevronRight, 
  Tag,
  Rocket,
  AlertTriangle
} from "lucide-react";
import { format } from "date-fns";
import { Announcement } from "@/models/Announcement";
import { useIsMobile } from "@/hooks/use-mobile";
import BentoCard from "@/components/ui/BentoCard";

interface FeaturedAnnouncementProps {
  announcement: Announcement;
  onClick: () => void;
}

// Enhanced animation variants for featured announcement
const featuredVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { 
      type: "spring", 
      stiffness: 100, 
      damping: 15, 
      mass: 1,
      delay: 0.2
    }
  }
};

export const FeaturedAnnouncement: React.FC<FeaturedAnnouncementProps> = ({ 
  announcement,
  onClick
}) => {
  const isMobile = useIsMobile();
  
  // Check if this is the Gerakan 27 April event
  const isGerakan27April = announcement.title.includes('Gerakan 27 April') || announcement.content.includes('Gerakan 27 April');

  return (
    <motion.div 
      className="mb-6 sm:mb-8"
      variants={featuredVariants}
      initial="hidden"
      animate="visible"
    >
      <BentoCard
        colSpan="col-span-1 md:col-span-full"
        className={`p-4 sm:p-8 relative overflow-hidden ${isGerakan27April ? 'bg-black/80 border-red-800/30' : ''}`}
        glowColor={isGerakan27April ? "rgba(234, 56, 76, 0.3)" : "rgba(229, 222, 255, 0.4)"}
        interactive={true}
        onClick={onClick}
      >
        {/* Enhanced decorative elements */}
        {isGerakan27April ? (
          <>
            <div className="absolute -top-20 -right-20 w-40 sm:w-56 h-40 sm:h-56 rounded-full bg-red-900/20 blur-3xl"></div>
            <div className="absolute -bottom-32 -left-20 w-48 sm:w-64 h-48 sm:h-64 rounded-full bg-red-800/15 blur-3xl"></div>
            <div className="absolute top-1/4 left-1/2 w-16 h-16 bg-red-700/10 rounded-full blur-2xl"></div>
          </>
        ) : (
          <>
            <div className="absolute -top-20 -right-20 w-40 sm:w-56 h-40 sm:h-56 rounded-full bg-amethyst/10 blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-32 -left-20 w-48 sm:w-64 h-48 sm:h-64 rounded-full bg-turquoise/10 blur-3xl"></div>
            <div className="absolute top-1/4 left-1/2 w-16 h-16 bg-coral/5 rounded-full blur-2xl"></div>
          </>
        )}
        
        <div className="relative z-10 flex flex-col md:flex-row gap-6 sm:gap-8 items-start md:items-center">
          <div className="flex-1 text-left">
            <motion.div 
              className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4
                ${isGerakan27April 
                  ? 'bg-gradient-to-r from-red-800/60 to-red-600/50 text-red-100' 
                  : 'bg-gradient-to-r from-amethyst/40 to-turquoise/30 text-amethyst'}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              {isGerakan27April ? (
                <>
                  <AlertTriangle className="mr-1.5 h-3.5 w-3.5" />
                  <span>Gerakan 27 April</span>
                </>
              ) : (
                <>
                  <Rocket className="mr-1.5 h-3.5 w-3.5" />
                  <span>Pengumuman Versi 4.0</span>
                </>
              )}
            </motion.div>
            <motion.h3 
              className={`text-lg sm:text-2xl md:text-3xl font-serif font-semibold mb-2 sm:mb-3 ${isGerakan27April ? 'text-red-200' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              {announcement.title}
            </motion.h3>
            <motion.p 
              className={`text-xs sm:text-sm md:text-base mb-3 sm:mb-4 line-clamp-2 md:line-clamp-3 
                ${isGerakan27April ? 'text-red-200/80' : 'text-foreground/70'}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              {announcement.content.substring(0, isMobile ? 100 : 200)}...
            </motion.p>
            <motion.div 
              className={`flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm 
                ${isGerakan27April ? 'text-red-200/70' : 'text-foreground/60'}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.4 }}
            >
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                {announcement.date ? 
                  format(new Date(announcement.date), "dd MMM yyyy") : 
                  format(new Date(announcement.created_at), "dd MMM yyyy")}
              </span>
              <span className="flex items-center gap-1.5">
                <Tag className="w-3 h-3 sm:w-4 sm:h-4" />
                {announcement.category === "event" ? "Acara" : 
                 announcement.category === "recruitment" ? "Rekrutmen" : "Update"}
              </span>
            </motion.div>
          </div>
          
          <motion.div 
            className="flex-shrink-0 mt-2 md:mt-0"
            whileHover={{ scale: 1.1, rotate: 10 }}
            whileTap={{ scale: 0.9 }}
          >
            <div className={`w-10 h-10 sm:w-16 sm:h-16 rounded-full flex items-center justify-center shadow-lg
              ${isGerakan27April 
                ? 'bg-gradient-to-br from-red-800/50 to-red-600/70 shadow-red-800/30' 
                : 'bg-gradient-to-br from-amethyst/30 to-amethyst/60 shadow-amethyst/20'}`}>
              <ChevronRight className="w-5 h-5 sm:w-8 sm:h-8 text-white" />
            </div>
          </motion.div>
        </div>
      </BentoCard>
    </motion.div>
  );
};

export const EmptyFeaturedAnnouncement: React.FC = () => {
  return (
    <motion.div 
      className="mb-6 sm:mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <BentoCard
        colSpan="col-span-1 md:col-span-full"
        className="p-6 sm:p-8 relative overflow-hidden text-center"
        interactive={false}
      >
        <Bell className="w-8 h-8 sm:w-12 sm:h-12 text-foreground/30 mx-auto mb-3 sm:mb-4" />
        <p className="text-foreground/60 text-sm sm:text-lg">Belum ada pengumuman penting saat ini</p>
      </BentoCard>
    </motion.div>
  );
};
