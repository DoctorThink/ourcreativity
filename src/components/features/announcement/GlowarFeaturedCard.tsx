
import React from "react";
import { motion } from "framer-motion";
import { Calendar, ArrowRight, Star, AlertTriangle, Megaphone, Users } from "lucide-react";
import { format } from "date-fns";
import { Announcement } from "@/models/Announcement";

interface GlowarFeaturedCardProps {
  announcement: Announcement;
  onClick: () => void;
}

export const GlowarFeaturedCard: React.FC<GlowarFeaturedCardProps> = ({
  announcement,
  onClick,
}) => {
  const getDisplayDate = () => {
    try {
      const date = announcement.date ? new Date(announcement.date) : new Date(announcement.created_at);
      return format(date, "dd MMMM yyyy");
    } catch (error) {
      return "Tanggal tidak valid";
    }
  };

  const getCategoryInfo = () => {
    switch (announcement.category) {
      case "event":
        return { label: "Acara", icon: Calendar };
      case "recruitment":
        return { label: "Rekrutmen", icon: Users };
      case "update":
        return { label: "Update", icon: Megaphone };
      default:
        return { label: "Update", icon: Megaphone };
    }
  };

  const categoryInfo = getCategoryInfo();
  const CategoryIcon = categoryInfo.icon;

  return (
    <motion.div
      whileHover={{ scale: 1.01, y: -4 }}
      whileTap={{ scale: 0.99 }}
      className="cursor-pointer group"
      onClick={onClick}
    >
      {/* Dynamic Aurora Background Container */}
      <div className="relative overflow-hidden rounded-3xl">
        {/* Moving Aurora Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-amethyst/30 via-turquoise/20 to-coral/25 animate-gradient-cycle" 
             style={{ backgroundSize: '300% 300%' }} />
        
        {/* Glowing Border Effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-amethyst/40 via-turquoise/30 to-coral/40 rounded-3xl opacity-60 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
        
        {/* Main Content Container */}
        <div className="relative bg-secondary/60 backdrop-blur-xl border border-white/20 rounded-3xl p-8">
          
          {/* Featured Badge */}
          <div className="absolute top-6 left-6 z-10">
            <div className="flex items-center gap-1.5 px-4 py-2 bg-amethyst/90 text-white rounded-full text-sm font-bold shadow-lg backdrop-blur-sm">
              <Star className="w-4 h-4 fill-current" />
              Unggulan
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="flex flex-col lg:flex-row gap-8 items-start mt-16 lg:mt-8">
            
            {/* Left Column: Main Content */}
            <div className="flex-1 space-y-6">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-foreground leading-tight">
                {announcement.title}
              </h1>
              
              <p className="text-lg text-foreground/80 leading-relaxed line-clamp-3">
                {announcement.content.substring(0, 250)}...
              </p>
            </div>

            {/* Right Column: Metadata & Action */}
            <div className="lg:w-80 space-y-6">
              
              {/* Grouped Tags */}
              <div className="flex flex-wrap gap-3">
                <div className="px-4 py-2 bg-white/10 backdrop-blur-sm text-foreground rounded-full text-sm font-semibold border border-white/20 flex items-center gap-2">
                  <CategoryIcon className="w-4 h-4" />
                  {categoryInfo.label}
                </div>
                
                {announcement.important && (
                  <div className="px-4 py-2 bg-red-500/20 text-red-300 rounded-full text-sm font-semibold border border-red-500/30 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    Penting
                  </div>
                )}
              </div>

              {/* Date */}
              <div className="flex items-center gap-3 text-foreground/70">
                <Calendar className="w-5 h-5" />
                <span className="text-lg font-medium">{getDisplayDate()}</span>
              </div>

              {/* Call to Action */}
              <motion.div 
                className="flex items-center gap-3 text-amethyst font-bold text-lg group-hover:gap-4 transition-all duration-300"
                whileHover={{ x: 5 }}
              >
                <span>Baca Selengkapnya</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
              </motion.div>
            </div>
          </div>

          {/* Image Section (if exists) */}
          {announcement.image_url && (
            <div className="mt-8">
              <div className="aspect-[16/9] rounded-2xl overflow-hidden border border-white/10">
                <img 
                  src={announcement.image_url} 
                  alt={announcement.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
