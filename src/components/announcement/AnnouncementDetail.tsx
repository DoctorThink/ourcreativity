import React from "react";
import { motion } from "framer-motion";
import { 
  Calendar, 
  Bookmark, 
  ExternalLink,
  Sparkles,
  Code,
  AlertTriangle,
  Share2,
  Clock,
  Tag,
  Heart,
  MessageCircle,
  Eye,
  ArrowLeft,
  CheckCircle,
  Zap,
  Users,
  Globe
} from "lucide-react";
import { format } from "date-fns";
import { Announcement } from "@/models/Announcement";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface AnnouncementDetailProps {
  announcement: Announcement;
}

export const AnnouncementDetail: React.FC<AnnouncementDetailProps> = ({ announcement }) => {
  const isMobile = useIsMobile();
  
  // Format date safely
  const getDisplayDate = () => {
    try {
      if (announcement.date) {
        return format(new Date(announcement.date), "dd MMMM yyyy");
      }
      return format(new Date(announcement.created_at), "dd MMMM yyyy");
    } catch (error) {
      console.error("Date formatting error:", error);
      return "Tanggal tidak valid";
    }
  };

  const getTimeAgo = () => {
    try {
      const date = announcement.date ? new Date(announcement.date) : new Date(announcement.created_at);
      const now = new Date();
      const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
      
      if (diffInHours < 24) {
        return `${diffInHours} jam yang lalu`;
      } else {
        const diffInDays = Math.floor(diffInHours / 24);
        return `${diffInDays} hari yang lalu`;
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

  // Enhanced content parsing for better markdown formatting
  const parseContent = (content: string) => {
    // Special content for Version 4.0 based on README.md
    if (isVersionFour) {
      return (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-amethyst/10 to-turquoise/10 rounded-xl p-6 border border-amethyst/20">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amethyst" />
              Fitur Baru Version 4.0
            </h3>
            <div className="grid gap-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-turquoise mt-0.5" />
                <div>
                  <h4 className="font-medium">React 18 + Vite Integration</h4>
                  <p className="text-sm text-foreground/70">Modern build tools untuk performa optimal</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-coral mt-0.5" />
                <div>
                  <h4 className="font-medium">Tailwind CSS + Shadcn UI</h4>
                  <p className="text-sm text-foreground/70">Design system yang konsisten dan modern</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 text-amethyst mt-0.5" />
                <div>
                  <h4 className="font-medium">Supabase Integration</h4>
                  <p className="text-sm text-foreground/70">Backend real-time untuk karya dan pengumuman</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Globe className="w-5 h-5 text-turquoise mt-0.5" />
                <div>
                  <h4 className="font-medium">Responsive Design</h4>
                  <p className="text-sm text-foreground/70">Optimized untuk semua device</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-coral/10 to-amethyst/10 rounded-xl p-6 border border-coral/20">
            <h3 className="text-xl font-semibold mb-4">Changelog Version 4.0</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-amethyst mt-2 flex-shrink-0" />
                <p>Added comprehensive karya gallery with advanced filtering</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-turquoise mt-2 flex-shrink-0" />
                <p>Implemented dynamic announcement system with moderation</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-coral mt-2 flex-shrink-0" />
                <p>Enhanced team showcase with interactive profiles</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-amethyst mt-2 flex-shrink-0" />
                <p>Added admin dashboard for content management</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-turquoise mt-2 flex-shrink-0" />
                <p>Improved performance with React Query and optimized animations</p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Regular content parsing for other announcements
    return content.split('\n\n').map((paragraph, idx) => {
      // Check for list items
      if (paragraph.includes('- ') || paragraph.includes('• ')) {
        const items = paragraph.split('\n').filter(line => line.trim());
        return (
          <div key={idx} className="space-y-3">
            {items.map((item, itemIdx) => {
              if (item.includes('- ') || item.includes('• ')) {
                return (
                  <div key={itemIdx} className="flex items-start gap-3 p-3 rounded-lg bg-white/5">
                    <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${isGerakan27April ? 'bg-red-400' : 'bg-amethyst'}`} />
                    <p className="text-sm sm:text-base leading-relaxed">{item.replace(/^[•-]\s*/, '')}</p>
                  </div>
                );
              }
              return <p key={itemIdx} className="text-sm sm:text-base leading-relaxed font-medium bg-white/5 p-3 rounded-lg">{item}</p>;
            })}
          </div>
        );
      }
      
      // Check for headers (lines starting with #)
      if (paragraph.startsWith('#')) {
        const level = paragraph.match(/^#+/)?.[0].length || 1;
        const text = paragraph.replace(/^#+\s*/, '');
        const headingClass = level === 1 ? 'text-2xl' : level === 2 ? 'text-xl' : 'text-lg';
        return (
          <h3 key={idx} className={`${headingClass} font-semibold mb-3 text-amethyst`}>
            {text}
          </h3>
        );
      }
      
      // Regular paragraph with better styling
      return (
        <div key={idx} className="bg-white/3 rounded-lg p-4 border border-white/10">
          <p className="text-sm sm:text-base leading-relaxed whitespace-pre-line">
            {paragraph}
          </p>
        </div>
      );
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`relative overflow-hidden ${isGerakan27April ? 'bg-black/95 border-red-900/50' : 'bg-secondary/95'}`}
    >
      {/* Enhanced decorative elements with animation */}
      {isGerakan27April && (
        <>
          <motion.div 
            className="absolute -top-40 -right-40 w-96 h-96 bg-red-900/20 rounded-full blur-3xl"
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 4, 
              ease: "easeInOut" 
            }}
          />
          <motion.div 
            className="absolute bottom-20 -left-40 w-80 h-80 bg-red-800/15 rounded-full blur-3xl"
            animate={{ 
              scale: [1, 1.2, 1],
              x: [0, 20, 0]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 6, 
              ease: "easeInOut" 
            }}
          />
          <div className="absolute top-1/3 left-1/4 w-20 h-20 bg-red-600/10 rounded-full blur-xl" />
        </>
      )}
      
      {isVersionFour && (
        <>
          <motion.div 
            className="absolute -top-40 -right-40 w-96 h-96 bg-amethyst/10 rounded-full blur-3xl"
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 20, 
              ease: "linear" 
            }}
          />
          <motion.div 
            className="absolute bottom-20 -left-40 w-80 h-80 bg-turquoise/10 rounded-full blur-3xl"
            animate={{ 
              y: [0, -20, 0],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 3, 
              ease: "easeInOut" 
            }}
          />
        </>
      )}
      
      {/* Header Section */}
      <div className="sticky top-0 z-20 bg-inherit/80 backdrop-blur-xl border-b border-white/10 p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <motion.div 
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Button
              variant="ghost"
              size="sm"
              className="p-2 hover:bg-white/10"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="flex items-center gap-2">
              <Badge 
                variant="secondary" 
                className={`${isGerakan27April 
                  ? 'bg-gradient-to-r from-red-800 to-red-600 text-white' 
                  : announcement.category === "event" 
                    ? "bg-gradient-to-r from-coral/30 to-coral/50 text-white" 
                    : announcement.category === "recruitment" 
                      ? "bg-gradient-to-r from-turquoise/30 to-turquoise/50 text-white" 
                      : "bg-gradient-to-r from-amethyst/30 to-amethyst/50 text-white"}`}
              >
                {isGerakan27April ? (
                  <AlertTriangle className="w-3 h-3 mr-1" />
                ) : announcement.category === "event" ? (
                  <Calendar className="w-3 h-3 mr-1" />
                ) : (
                  <Tag className="w-3 h-3 mr-1" />
                )}
                {announcement.category === "event" ? "Acara" : 
                 announcement.category === "recruitment" ? "Rekrutmen" : "Update"}
              </Badge>
              
              {announcement.important && (
                <Badge variant="destructive" className="animate-pulse">
                  Penting
                </Badge>
              )}
            </div>
          </motion.div>
          
          <motion.div 
            className="flex items-center gap-2 text-xs text-foreground/60"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Clock className="w-3 h-3" />
            <span>{timeAgo}</span>
          </motion.div>
        </div>
        
        <motion.h1 
          className={`text-xl sm:text-2xl lg:text-3xl font-serif font-bold leading-tight ${isGerakan27April ? 'text-red-200' : 'text-foreground'}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {announcement.title}
        </motion.h1>
        
        <motion.div 
          className={`flex items-center gap-4 mt-3 text-sm ${isGerakan27April ? 'text-red-200/70' : 'text-foreground/70'}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            {displayDate}
          </span>
          <span className="flex items-center gap-1.5">
            <Eye className="w-4 h-4" />
            {Math.floor(Math.random() * 1000) + 100} views
          </span>
        </motion.div>
      </div>

      {/* Content Section */}
      <div className="p-4 sm:p-6 lg:p-8 space-y-6 relative z-10">
        {/* Special badges for specific announcements */}
        {(isGerakan27April || isVersionFour || isArdelyo) && (
          <motion.div 
            className="flex flex-wrap gap-2 mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {isGerakan27April && (
              <motion.div 
                className="bg-gradient-to-r from-red-700 to-red-900 text-white text-sm px-4 py-2 rounded-full flex items-center gap-2 shadow-lg"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              >
                <AlertTriangle className="w-4 h-4" />
                Memorial Event
              </motion.div>
            )}
            
            {isVersionFour && (
              <motion.div 
                className="bg-gradient-to-r from-amethyst to-turquoise text-white text-sm px-4 py-2 rounded-full flex items-center gap-2 shadow-lg"
                animate={{ y: [0, -3, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              >
                <Sparkles className="w-4 h-4" />
                Version 4.0
              </motion.div>
            )}
            
            {isArdelyo && (
              <motion.div 
                className="bg-gradient-to-r from-turquoise to-coral text-white text-sm px-4 py-2 rounded-full flex items-center gap-2 shadow-lg"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              >
                <Code className="w-4 h-4" />
                Unix Series
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Image section with enhanced styling */}
        {announcement.image_url && (
          <motion.div 
            className={`relative overflow-hidden rounded-2xl ${isGerakan27April ? 'border-2 border-red-800/50 shadow-red-900/30' : 'border border-white/10'} shadow-2xl`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
          >
            <img 
              src={announcement.image_url} 
              alt={announcement.title}
              className={`w-full h-auto object-cover max-h-[300px] sm:max-h-[400px] ${isGerakan27April ? 'filter contrast-125 saturate-110' : ''}`}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                console.error('Failed to load announcement image:', announcement.image_url);
              }}
            />
            {isGerakan27April && (
              <div className="absolute inset-0 bg-gradient-to-t from-red-900/50 to-transparent" />
            )}
          </motion.div>
        )}
        
        {/* Enhanced content with better markdown typography */}
        <motion.div 
          className={`max-w-none space-y-6 ${isGerakan27April ? 'text-red-100/90' : 'text-foreground/90'}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          {parseContent(announcement.content)}
        </motion.div>
        
        {/* Interaction buttons with enhanced design */}
        <motion.div 
          className="pt-6 border-t border-white/10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="flex flex-wrap gap-3 sm:gap-4 mb-6">
            {announcement.category === "event" && (
              <motion.button
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                  ${isGerakan27April 
                    ? 'bg-gradient-to-r from-red-800 to-red-600 text-white hover:from-red-700 hover:to-red-500 shadow-red-900/30' 
                    : 'bg-gradient-to-r from-coral/30 to-coral/50 text-white hover:from-coral/40 hover:to-coral/60'} shadow-lg`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                <Calendar className="w-4 h-4" />
                Tambahkan ke Kalender
              </motion.button>
            )}
            
            <motion.button
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                ${isGerakan27April 
                  ? 'bg-red-950/50 hover:bg-red-900/50 text-red-200 border border-red-800/30' 
                  : 'bg-foreground/10 hover:bg-foreground/20 text-foreground/90 border border-white/10'} shadow-lg`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              <Share2 className="w-4 h-4" />
              Bagikan
            </motion.button>
            
            <motion.button
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                ${isGerakan27April 
                  ? 'bg-red-950/30 hover:bg-red-900/30 text-red-200 border border-red-800/20' 
                  : 'bg-foreground/10 hover:bg-foreground/20 text-foreground/90 border border-white/10'} shadow-lg`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              <Bookmark className="w-4 h-4" />
              Simpan
            </motion.button>
            
            {announcement.link_url && (
              <motion.a
                href={announcement.link_url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                  ${isGerakan27April 
                    ? 'bg-gradient-to-r from-red-700/70 to-red-500/70 text-white hover:from-red-600/70 hover:to-red-400/70' 
                    : 'bg-gradient-to-r from-amethyst/30 to-amethyst/50 text-white hover:from-amethyst/40 hover:to-amethyst/60'} shadow-lg`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                <ExternalLink className="w-4 h-4" />
                Kunjungi Link
              </motion.a>
            )}
          </div>

          {/* Engagement section */}
          <div className="flex items-center justify-between pt-4 border-t border-white/5">
            <div className="flex items-center gap-4">
              <motion.button
                className="flex items-center gap-2 text-sm text-foreground/70 hover:text-foreground transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Heart className="w-4 h-4" />
                <span>{Math.floor(Math.random() * 50) + 10}</span>
              </motion.button>
              <motion.button
                className="flex items-center gap-2 text-sm text-foreground/70 hover:text-foreground transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <MessageCircle className="w-4 h-4" />
                <span>{Math.floor(Math.random() * 20) + 5}</span>
              </motion.button>
            </div>
            <span className="text-xs text-foreground/50">
              ID: {announcement.id.slice(-8)}
            </span>
          </div>
        </motion.div>
        
        {/* Special footer for Gerakan 27 April event */}
        {isGerakan27April && (
          <motion.div
            className="mt-8 pt-6 border-t border-red-900/30 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <div className="bg-red-950/30 rounded-xl p-4 border border-red-800/20">
              <p className="text-red-200/70 text-sm italic leading-relaxed">
                "Gerakan 27 April - Mengenang tragedi pembantaian 300+ member SideR dan member aktif. 
                Mari kita kenang mereka yang telah tiada dan berkomitmen untuk tidak mengulangi kesalahan serupa."
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
