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
  Sparkles, // For v3.5, v4.0
  Zap, // For v3.0
  Paintbrush // For v3.7
} from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale"; // For Indonesian date formatting
import { Announcement } from "@/models/Announcement";
import BentoCard from "@/components/ui/BentoCard";
import { getCategoryTheme, getSolidCategoryBgClass } from "@/lib/themeUtils";

interface AnnouncementCardProps {
  announcement: Announcement;
  onClick: () => void;
}

export const AnnouncementCard: React.FC<AnnouncementCardProps> = ({ 
  announcement, 
  onClick 
}) => {
  const defaultTheme = getCategoryTheme(announcement.category);
  
  const categoryIconsMap: Record<string, React.ElementType> = {
    event: Calendar,
    recruitment: Users,
    update: Megaphone,
  };
  
  const getDisplayDate = () => {
    try {
      const dateToFormat = announcement.date ? new Date(announcement.date) : new Date(announcement.created_at);
      return format(dateToFormat, "dd MMM yyyy", { locale: id });
    } catch (error) {
      console.error("Date formatting error:", error);
      return "Tanggal tidak valid";
    }
  };
  const displayDate = getDisplayDate();

  // Specific Announcement Checks
  const isGerakan27April = announcement.title.includes('Gerakan 27 April');
  const isArdelyoMentioned = announcement.content.includes('Ardelyo') || announcement.content.includes('Unix Series');
  const isV3Launch = announcement.title.includes("Peluncuran Resmi Website OurCreativity v3.0");
  const isV35Constellation = announcement.title.includes("v3.5") && announcement.title.includes("Creative Constellation");
  const isV37Karya = announcement.title.includes("v3.7") && announcement.title.includes("Karya Kami");
  const isV4Symphony = announcement.title.includes("v4.0") && announcement.title.includes("Symphony Design");

  let cardBgClass = defaultTheme.bgClass;
  let cardBorderClass = defaultTheme.borderClass;
  let cardAccentClass = defaultTheme.accentClass;
  let cardTitleColor = defaultTheme.accentClass; // Use accent for title by default
  let cardTextColor = 'text-foreground/80';
  let glowColor: string | undefined = undefined;
  let CategorySpecificIcon = categoryIconsMap[announcement.category] || Megaphone;
  let categoryBadgeBg = getSolidCategoryBgClass(announcement.category);
  let categoryBadgeText = defaultTheme.badgeTextClass;
  let decorativeEffects: React.ReactNode = null;

  if (isGerakan27April) {
    cardBgClass = 'bg-black/70 backdrop-blur-sm';
    cardBorderClass = '!border-red-700';
    cardTitleColor = 'text-red-300';
    cardTextColor = 'text-red-100/80';
    glowColor = "rgba(220, 38, 38, 0.2)"; // Red glow
    categoryBadgeBg = 'bg-gradient-to-r from-red-900/80 to-red-600/70';
    categoryBadgeText = 'text-white';
    CategorySpecificIcon = AlertTriangle;
    decorativeEffects = (
      <>
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-red-900/20 rounded-full blur-3xl opacity-50 animate-pulse-soft"></div>
      </>
    );
  } else if (isV3Launch) {
    cardBgClass = 'bg-amber-500/10 backdrop-blur-sm';
    cardBorderClass = 'border-amber-500';
    cardTitleColor = 'text-amber-400';
    cardTextColor = 'text-amber-100/80';
    glowColor = "rgba(245, 158, 11, 0.2)"; // Amber glow
    categoryBadgeBg = 'bg-gradient-to-r from-amber-500 to-amber-700';
    categoryBadgeText = 'text-background';
    CategorySpecificIcon = Zap;
     decorativeEffects = <div className="absolute top-0 right-0 w-20 h-20 bg-peach/5 rounded-full blur-xl opacity-60 animate-float"></div>;
  } else if (isV35Constellation) {
    cardBgClass = 'bg-amethyst/10 backdrop-blur-sm';
    cardBorderClass = 'border-amethyst';
    cardTitleColor = 'text-mint';
    cardTextColor = 'text-lavender/80';
    glowColor = "rgba(155, 109, 255, 0.2)"; // Amethyst glow
    categoryBadgeBg = 'bg-gradient-to-r from-amethyst to-turquoise';
    categoryBadgeText = 'text-white';
    CategorySpecificIcon = Sparkles;
    decorativeEffects = <div className="absolute -bottom-8 -left-8 w-28 h-28 bg-turquoise/5 rounded-full blur-2xl opacity-50 animate-morph"></div>;
  } else if (isV37Karya) {
    cardBgClass = 'bg-coral/10 backdrop-blur-sm';
    cardBorderClass = 'border-coral';
    cardTitleColor = 'text-coral';
    cardTextColor = 'text-softPink/80';
    glowColor = "rgba(255, 127, 80, 0.25)"; // Coral glow
    categoryBadgeBg = 'bg-gradient-to-r from-coral to-peach';
    categoryBadgeText = 'text-white';
    CategorySpecificIcon = Paintbrush;
    decorativeEffects = <div className="absolute top-2 left-2 w-16 h-16 bg-mint/5 rounded-full blur-lg opacity-70 animate-pulse-soft"></div>;
  } else if (isV4Symphony) {
    cardBgClass = 'bg-purpleLight/10 backdrop-blur-sm';
    cardBorderClass = 'border-purpleDark';
    cardTitleColor = 'text-purpleLight';
    cardTextColor = 'text-primary/80'; // Using primary defined in tailwind.config
    glowColor = "rgba(177, 151, 252, 0.2)"; // purpleLight glow
    categoryBadgeBg = 'bg-gradient-to-r from-purpleLight to-blueLight';
    categoryBadgeText = 'text-background';
    CategorySpecificIcon = Sparkles;
    decorativeEffects = (
        <>
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-amethyst/5 rounded-full blur-2xl opacity-50 animate-gradient-cycle" style={{backgroundSize: '200% 200%'}}></div>
        </>
    );
  }
  
  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="h-full">
      <BentoCard
        className={`p-0 h-full relative overflow-hidden flex flex-col border-t-4 ${cardBorderClass} ${cardBgClass}`}
        interactive={true}
        onClick={onClick}
        glowColor={glowColor}
      >
        {decorativeEffects}
        {announcement.image_url && (
          <div className={`w-full h-32 sm:h-40 overflow-hidden ${isGerakan27April ? 'filter grayscale contrast-150' : ''}`}>
            <img 
              src={announcement.image_url} 
              alt={announcement.title} 
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" // BentoCard might need a group class
            />
          </div>
        )}
        
        <div className="p-4 sm:p-5 flex flex-col flex-grow relative z-10"> {/* Ensure content is above decorative effects */}
          <div className="flex items-start justify-between mb-3">
            <div className={`px-2.5 py-1 rounded-full ${categoryBadgeBg} ${categoryBadgeText} text-xs font-sans font-medium flex items-center gap-1.5`}>
              <CategorySpecificIcon className="w-3 h-3" />
              <span className="capitalize">
                {announcement.category === "event" ? "Acara" : 
                 announcement.category === "recruitment" ? "Rekrutmen" : 
                 announcement.category || "Info"}
              </span>
            </div>
            
            <div className="flex flex-col items-end gap-1.5">
              {isV3Launch && <span className="bg-amber-400/20 text-amber-500 text-xs px-1.5 py-0.5 rounded-full font-sans">v3.0</span>}
              {isV35Constellation && <span className="bg-amethyst/20 text-mint text-xs px-1.5 py-0.5 rounded-full font-sans">v3.5</span>}
              {isV37Karya && <span className="bg-coral/20 text-coral text-xs px-1.5 py-0.5 rounded-full font-sans">v3.7</span>}
              {isV4Symphony && (
                <motion.span 
                  className="bg-gradient-to-r from-amethyst/80 to-turquoise/70 text-white text-xs px-1.5 py-0.5 rounded-full font-sans"
                  animate={{ y: [0, -2, 0] }}
                  transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                >
                  v4.0
                </motion.span>
              )}
              {isGerakan27April && (
                <motion.span 
                  className="bg-gradient-to-r from-red-800 to-red-600 text-white text-xs px-1.5 py-0.5 rounded-full flex items-center font-sans"
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                >
                  <AlertTriangle className="w-2.5 h-2.5 mr-1" /> Penting
                </motion.span>
              )}
              {announcement.important && !isGerakan27April && !isV3Launch && !isV35Constellation && !isV37Karya && !isV4Symphony && (
                <span className="bg-red-500/80 text-white text-xs px-1.5 py-0.5 rounded-full font-sans">Penting</span>
              )}
              {isArdelyoMentioned && (
                <span className="bg-blueLight/20 text-blueDark text-xs px-1.5 py-0.5 rounded-full flex items-center font-sans">
                  <Code className="w-2.5 h-2.5 mr-1" /> Ardelyo
                </span>
              )}
            </div>
          </div>
        
          <div className="mt-1 flex-grow">
            <h3 className={`text-base sm:text-lg font-serif mb-2 ${cardTitleColor}`}>
              {announcement.title}
            </h3>
            <p className={`line-clamp-3 text-xs sm:text-sm font-sans mb-3 ${cardTextColor}`}>
              {announcement.content.substring(0, 120).replace(/\*|#/g, '')}...
            </p>
          </div>
          
          <div className="flex items-center justify-between text-xs mt-auto font-sans">
            <span className={`flex items-center gap-1.5 ${isGerakan27April ? 'text-red-200/70' : cardTextColor === 'text-foreground/80' ? 'text-foreground/70' : cardTextColor.replace('/80', '/70')}`}>
              <Clock className="w-3 h-3" />
              {displayDate}
            </span>
            <span className={`font-medium hover:underline flex items-center ${isGerakan27April ? 'text-red-300 hover:text-red-200' : `${cardAccentClass} hover:${cardTitleColor}`}`}>
              Selengkapnya
              <ArrowUpRight className="w-3 h-3 ml-0.5" />
            </span>
          </div>
        </div>
      </BentoCard>
    </motion.div>
  );
};
