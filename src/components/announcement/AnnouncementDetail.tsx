
import React from "react";
import { motion } from "framer-motion";
import { 
  Calendar, 
  Bookmark, 
  ExternalLink,
  Sparkles,
  Code
} from "lucide-react";
import { format } from "date-fns";
import { Announcement } from "@/models/Announcement";
import { useIsMobile } from "@/hooks/use-mobile";

interface AnnouncementDetailProps {
  announcement: Announcement;
}

export const AnnouncementDetail: React.FC<AnnouncementDetailProps> = ({ announcement }) => {
  const isMobile = useIsMobile();
  
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
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-4 sm:p-8 relative overflow-hidden"
    >
      {/* Decorative elements */}
      {isVersionFour && (
        <>
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-amethyst/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 -left-40 w-80 h-80 bg-turquoise/5 rounded-full blur-3xl"></div>
        </>
      )}
      
      <div className="flex justify-between items-start mb-4 sm:mb-6 flex-wrap gap-2 relative z-10">
        <div className="flex flex-wrap items-center gap-2">
          <span className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-medium 
            ${announcement.category === "event" ? "bg-gradient-to-r from-coral/30 to-coral/50 text-white" : 
              announcement.category === "recruitment" ? "bg-gradient-to-r from-turquoise/30 to-turquoise/50 text-white" : 
              "bg-gradient-to-r from-amethyst/30 to-amethyst/50 text-white"}`}
          >
            {announcement.category === "event" ? "Acara" : 
             announcement.category === "recruitment" ? "Rekrutmen" : "Update"}
          </span>
          
          {isVersionFour && (
            <motion.span 
              className="bg-gradient-to-r from-amethyst to-turquoise text-white text-xs px-2 sm:px-3 py-0.5 sm:py-1 rounded-full flex items-center gap-1"
              animate={{ y: [0, -3, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              <Sparkles className="w-3 h-3" />
              v4.0
            </motion.span>
          )}
          
          {isArdelyo && (
            <motion.span 
              className="bg-gradient-to-r from-turquoise to-coral text-white text-xs px-2 sm:px-3 py-0.5 sm:py-1 rounded-full flex items-center gap-1"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              <Code className="w-3 h-3" />
              Unix Series
            </motion.span>
          )}
          
          {announcement.important && (
            <span className="bg-red-500/80 text-white text-xs px-2 sm:px-3 py-0.5 sm:py-1 rounded-full">
              Penting
            </span>
          )}
        </div>
        <span className="text-xs sm:text-sm text-foreground/60 flex items-center gap-1.5">
          <Calendar className="w-3 h-3 sm:w-4 sm:h-4" /> {displayDate}
        </span>
      </div>
      
      <motion.h2 
        className="text-xl sm:text-2xl md:text-3xl font-serif font-semibold mb-4 sm:mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {announcement.title}
      </motion.h2>
      
      {announcement.image_url && (
        <motion.div 
          className="mb-4 sm:mb-6"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <img 
            src={announcement.image_url} 
            alt={announcement.title}
            className="w-full h-auto rounded-xl object-cover max-h-[200px] sm:max-h-[300px] shadow-lg"
            onError={(e) => {
              // Handle image loading error
              e.currentTarget.style.display = 'none';
              console.error('Failed to load announcement image:', announcement.image_url);
            }}
          />
        </motion.div>
      )}
      
      <motion.div 
        className="prose prose-invert max-w-none text-foreground/80 space-y-3 sm:space-y-4 text-sm sm:text-base"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {announcement.content.split('\n\n').map((paragraph, idx) => (
          <p key={idx}>{paragraph}</p>
        ))}
      </motion.div>
      
      <motion.div 
        className="mt-6 sm:mt-8 flex flex-wrap gap-3 sm:gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        {announcement.category === "event" && (
          <motion.button
            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-coral/30 to-coral/50 text-white text-xs sm:text-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
            Tambahkan ke Kalender
          </motion.button>
        )}
        
        <motion.button
          className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-foreground/10 hover:bg-foreground/20 text-foreground/90 text-xs sm:text-sm"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
        >
          <Bookmark className="w-3 h-3 sm:w-4 sm:h-4" />
          Simpan
        </motion.button>
        
        {announcement.link_url && (
          <motion.a
            href={announcement.link_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-amethyst/30 to-amethyst/50 text-white text-xs sm:text-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
            Kunjungi Link
          </motion.a>
        )}
      </motion.div>
    </motion.div>
  );
};
