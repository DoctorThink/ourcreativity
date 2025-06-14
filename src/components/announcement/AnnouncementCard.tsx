import React from "react";
import { motion } from "framer-motion";
import { 
  Calendar, 
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
import GlassCard from "@/components/ui/GlassCard";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

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
      glowColor: "rgba(255, 127, 80, 0.4)",
    },
    recruitment: {
      bgColor: "bg-turquoise/20", 
      textColor: "text-turquoise",
      icon: Users,
      gradientColor: "from-turquoise/20 to-turquoise/40",
      glowColor: "rgba(80, 200, 120, 0.4)",
    },
    update: {
      bgColor: "bg-amethyst/20",
      textColor: "text-amethyst",
      icon: Megaphone,
      gradientColor: "from-amethyst/20 to-amethyst/40",
      glowColor: "rgba(155, 109, 255, 0.4)",
    }
  };
  
  const categoryStyle = categoryStyles[announcement.category as keyof typeof categoryStyles] || categoryStyles.update;
  const CategoryIcon = categoryStyle.icon;
  
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

  const cleanTextForPreview = (text: string, maxLength: number = 140) => {
    const cleanText = text
      .replace(/[#*_>`]/g, '')
      .replace(/\n/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    
    if (cleanText.length <= maxLength) {
      return cleanText;
    }
    return cleanText.slice(0, maxLength).trim() + '...';
  };
  
  const displayDate = getDisplayDate();
  const timeAgo = getTimeAgo();
  const cleanContent = cleanTextForPreview(announcement.content, isMobile ? 100 : 140);

  // Special announcement detection
  const isGerakan27April = announcement.title.includes('Gerakan 27 April') || announcement.content.includes('Gerakan 27 April');
  const isVersionFour = announcement.title.includes('4.0') || announcement.title.includes('Versi 4');
  const isArdelyo = announcement.content.includes('Ardelyo') || announcement.content.includes('Unix Series');
  const isPriority = announcement.important || isGerakan27April;
  
  // Dynamic glow color based on announcement type
  const glowColor = isGerakan27April 
    ? "rgba(234, 56, 76, 0.5)" 
    : isVersionFour 
    ? "rgba(155, 109, 255, 0.4)" 
    : categoryStyle.glowColor;

  return (
    <GlassCard
      className={cn(
        "p-5 sm:p-6 h-full group cursor-pointer transition-all duration-500",
        isPriority && "liquid-glow-pulsing",
        isGerakan27April && "border-red-900/50 bg-black/20"
      )}
      interactive={true}
      onClick={onClick}
      glowColor={glowColor}
      size="md"
    >
      {/* Priority announcement special effects */}
      {isGerakan27April && (
        <motion.div 
          className="absolute -top-10 -left-10 w-32 h-32 bg-red-900/20 rounded-full blur-3xl pointer-events-none"
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
      )}
      
      {isVersionFour && (
        <motion.div 
          className="absolute -bottom-10 -right-10 w-24 h-24 bg-amethyst/10 rounded-full blur-2xl pointer-events-none"
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
      
      {/* Header Section */}
      <div className="flex items-start justify-between mb-4 z-10 relative">
        <motion.div 
          className={cn(
            "px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2 glass-morphism-shallow",
            isGerakan27April 
              ? 'bg-gradient-to-r from-red-900/80 to-red-600/60 text-white border border-red-500/30' 
              : `bg-gradient-to-r ${categoryStyle.gradientColor} ${categoryStyle.textColor} border border-white/20`
          )}
          whileHover={{ scale: 1.05 }}
        >
          {isGerakan27April ? (
            <AlertTriangle className="w-3.5 h-3.5" />
          ) : (
            <CategoryIcon className="w-3.5 h-3.5" />
          )}
          <span className="font-bold tracking-wide">
            {announcement.category === "event" ? "Acara" : 
             announcement.category === "recruitment" ? "Rekrutmen" : "Update"}
          </span>
        </motion.div>
        
        <div className="flex flex-col items-end gap-1.5">
          {/* Special badges */}
          {(isGerakan27April || isVersionFour || isArdelyo || announcement.important) && (
            <div className="flex gap-1.5">
              {isGerakan27April && (
                <motion.span 
                  className="glass-morphism bg-gradient-to-r from-red-800 to-red-600 text-white text-xs px-2.5 py-1 rounded-full flex items-center shadow-lg font-semibold"
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                >
                  <AlertTriangle className="w-3 h-3 mr-1" />
                  Penting
                </motion.span>
              )}
              
              {isVersionFour && (
                <motion.span 
                  className="glass-morphism bg-gradient-to-r from-amethyst/90 to-turquoise/80 text-white text-xs px-2.5 py-1 rounded-full shadow-lg font-semibold"
                  animate={{ y: [0, -3, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                >
                  v4.0
                </motion.span>
              )}
              
              {isArdelyo && (
                <motion.span 
                  className="glass-morphism bg-gradient-to-r from-turquoise/80 to-coral/80 text-white text-xs px-2.5 py-1 rounded-full flex items-center shadow-lg font-semibold"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                >
                  <Code className="w-3 h-3 mr-1" />
                  Unix
                </motion.span>
              )}
              
              {announcement.important && !isGerakan27April && (
                <span className="glass-morphism bg-red-500/90 text-white text-xs px-2.5 py-1 rounded-full animate-pulse shadow-lg font-semibold">
                  Penting
                </span>
              )}
            </div>
          )}
          
          <span className={cn(
            "text-xs font-medium",
            isGerakan27April ? 'text-red-200/70' : 'text-foreground/60'
          )}>
            {timeAgo}
          </span>
        </div>
      </div>
      
      {/* Content Section */}
      <div className="flex-1 z-10 relative space-y-3">
        <motion.h3 
          className={cn(
            "text-lg sm:text-xl font-serif font-bold leading-tight group-hover:text-opacity-90 transition-all duration-200 text-readable",
            isGerakan27April ? 'text-red-200' : 'text-foreground'
          )}
          whileHover={{ x: 2 }}
        >
          {announcement.title}
        </motion.h3>
        
        <p className={cn(
          "text-sm leading-relaxed mb-4 text-readable",
          isGerakan27April ? 'text-red-100/80' : 'text-foreground/80'
        )}
          style={{ 
            lineHeight: '1.6',
            letterSpacing: '0.01em',
            fontWeight: '400',
            fontSize: isMobile ? '0.875rem' : '0.9rem'
          }}
        >
          {cleanContent}
        </p>
      </div>
      
      {/* Footer Section */}
      <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5 z-10 relative">
        <div className="flex items-center gap-4">
          <span className={cn(
            "flex items-center gap-2 text-sm font-medium",
            isGerakan27April ? 'text-red-200/70' : 'text-foreground/60'
          )}>
            <Calendar className="w-3.5 h-3.5" />
            {displayDate}
          </span>
          
          <div className="flex items-center gap-3">
            <span className={cn(
              "flex items-center gap-1.5 text-xs",
              isGerakan27April ? 'text-red-200/60' : 'text-foreground/50'
            )}>
              <Eye className="w-3 h-3" />
              {Math.floor(Math.random() * 500) + 50}
            </span>
            <span className={cn(
              "flex items-center gap-1.5 text-xs",
              isGerakan27April ? 'text-red-200/60' : 'text-foreground/50'
            )}>
              <Heart className="w-3 h-3" />
              {Math.floor(Math.random() * 30) + 5}
            </span>
          </div>
        </div>
        
        <motion.span 
          className={cn(
            "text-sm font-semibold flex items-center gap-1.5 group-hover:gap-2.5 transition-all duration-200",
            isGerakan27April 
              ? 'text-red-200 group-hover:text-red-100' 
              : 'text-foreground/80 group-hover:text-foreground'
          )}
          whileHover={{ x: 3 }}
          style={{ 
            letterSpacing: '0.02em',
            fontWeight: '600'
          }}
        >
          Baca Selengkapnya
          <ArrowUpRight className="w-4 h-4 group-hover:rotate-12 transition-transform duration-200" />
        </motion.span>
      </div>
      
      {/* Liquid hover overlay */}
      <motion.div 
        className={cn(
          "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-3xl",
          isGerakan27April 
            ? 'bg-gradient-to-br from-red-900/10 to-red-800/5' 
            : 'bg-gradient-to-br from-white/5 to-transparent'
        )}
        whileHover={{
          background: [
            'radial-gradient(circle at 0% 0%, rgba(255,255,255,0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 100% 100%, rgba(255,255,255,0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 0% 100%, rgba(255,255,255,0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 100% 0%, rgba(255,255,255,0.1) 0%, transparent 50%)',
          ]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </GlassCard>
  );
};
