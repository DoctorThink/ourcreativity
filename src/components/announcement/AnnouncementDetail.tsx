
import React from "react";
import { motion } from "framer-motion";
import { 
  Calendar, 
  Bookmark, 
  ExternalLink,
  Sparkles,
  Code,
  AlertTriangle,
  Share2
} from "lucide-react";
import { format } from "date-fns";
import { Announcement } from "@/models/Announcement";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";

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
  
  // Check if this is the Gerakan 27 April event
  const isGerakan27April = announcement.title.includes('Gerakan 27 April') || announcement.content.includes('Gerakan 27 April');
  
  // Check if this is the Version 4.0 announcement
  const isVersionFour = announcement.title.includes('4.0') || announcement.title.includes('Versi 4');
  
  // Check if this is Ardelyo related
  const isArdelyo = announcement.content.includes('Ardelyo') || announcement.content.includes('Unix Series');

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`p-4 sm:p-8 relative overflow-hidden ${isGerakan27April ? 'bg-black border-red-900/50' : ''}`}
    >
      {/* Decorative elements */}
      {isGerakan27April && (
        <>
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-red-900/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 -left-40 w-80 h-80 bg-red-800/15 rounded-full blur-3xl"></div>
          <div className="absolute top-1/3 left-1/4 w-20 h-20 bg-red-600/10 rounded-full blur-xl"></div>
        </>
      )}
      
      {isVersionFour && (
        <>
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-amethyst/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 -left-40 w-80 h-80 bg-turquoise/5 rounded-full blur-3xl"></div>
        </>
      )}
      
      <div className="flex justify-between items-start mb-4 sm:mb-6 flex-wrap gap-2 relative z-10">
        <div className="flex flex-wrap items-center gap-2">
          <span className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-medium 
            ${isGerakan27April 
              ? 'bg-gradient-to-r from-red-800 to-red-600 text-white' 
              : announcement.category === "event" 
                ? "bg-gradient-to-r from-coral/30 to-coral/50 text-white" 
                : announcement.category === "recruitment" 
                  ? "bg-gradient-to-r from-turquoise/30 to-turquoise/50 text-white" 
                  : "bg-gradient-to-r from-amethyst/30 to-amethyst/50 text-white"}`}
          >
            {isGerakan27April ? (
              <AlertTriangle className="w-3 h-3 mr-1" />
            ) : null}
            {announcement.category === "event" ? "Acara" : 
             announcement.category === "recruitment" ? "Rekrutmen" : "Update"}
          </span>
          
          {isGerakan27April && (
            <motion.span 
              className="bg-gradient-to-r from-red-700 to-red-900 text-white text-xs px-2 sm:px-3 py-0.5 sm:py-1 rounded-full flex items-center gap-1"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              <AlertTriangle className="w-3 h-3" />
              Memorial Event
            </motion.span>
          )}
          
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
          
          {announcement.important && !isGerakan27April && (
            <span className="bg-red-500/80 text-white text-xs px-2 sm:px-3 py-0.5 sm:py-1 rounded-full">
              Penting
            </span>
          )}
        </div>
        <span className={`text-xs sm:text-sm flex items-center gap-1.5 ${isGerakan27April ? 'text-red-200/70' : 'text-foreground/60'}`}>
          <Calendar className="w-3 h-3 sm:w-4 sm:h-4" /> {displayDate}
        </span>
      </div>
      
      <motion.h2 
        className={`text-xl sm:text-2xl md:text-3xl font-serif font-semibold mb-4 sm:mb-6 ${isGerakan27April ? 'text-red-200' : ''}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {announcement.title}
      </motion.h2>
      
      {/* Red border for Gerakan 27 April event images */}
      {announcement.image_url && (
        <motion.div 
          className={`mb-4 sm:mb-6 ${isGerakan27April ? 'border-2 border-red-800/50 p-1' : ''}`}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <img 
            src={announcement.image_url} 
            alt={announcement.title}
            className={`w-full h-auto rounded-xl object-cover max-h-[200px] sm:max-h-[300px] shadow-lg ${isGerakan27April ? 'rounded-lg filter contrast-125' : ''}`}
            onError={(e) => {
              // Handle image loading error
              e.currentTarget.style.display = 'none';
              console.error('Failed to load announcement image:', announcement.image_url);
            }}
          />
        </motion.div>
      )}
      
      <motion.div 
        className={`prose max-w-none space-y-3 sm:space-y-4 text-sm sm:text-base ${isGerakan27April ? 'text-red-100/90 prose-headings:text-red-200 prose-strong:text-red-200' : 'text-foreground/80 prose-invert'}`}
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
            className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm
              ${isGerakan27April 
                ? 'bg-gradient-to-r from-red-800 to-red-600 text-white' 
                : 'bg-gradient-to-r from-coral/30 to-coral/50 text-white'}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
            Tambahkan ke Kalender
          </motion.button>
        )}
        
        {isGerakan27April && (
          <motion.button
            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-red-950/50 hover:bg-red-900/50 text-red-200 text-xs sm:text-sm border border-red-800/30"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            <Share2 className="w-3 h-3 sm:w-4 sm:h-4" />
            Bagikan
          </motion.button>
        )}
        
        <motion.button
          className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm
            ${isGerakan27April 
              ? 'bg-red-950/30 hover:bg-red-900/30 text-red-200 border border-red-800/20' 
              : 'bg-foreground/10 hover:bg-foreground/20 text-foreground/90'}`}
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
            className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm
              ${isGerakan27April 
                ? 'bg-gradient-to-r from-red-700/70 to-red-500/70 text-white' 
                : 'bg-gradient-to-r from-amethyst/30 to-amethyst/50 text-white'}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
            Kunjungi Link
          </motion.a>
        )}
      </motion.div>
      
      {/* Special footer for Gerakan 27 April event */}
      {isGerakan27April && (
        <motion.div
          className="mt-8 pt-4 border-t border-red-900/30 text-red-200/70 text-xs sm:text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <p className="italic">Gerakan 27 April - Mengenang tragedi pembantaian 300+ member SideR dan member aktif.</p>
        </motion.div>
      )}
    </motion.div>
  );
};
