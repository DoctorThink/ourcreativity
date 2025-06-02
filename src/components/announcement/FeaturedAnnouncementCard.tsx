
import React from "react";
import { motion } from "framer-motion";
import { Calendar, ArrowRight, Star } from "lucide-react";
import { format } from "date-fns";
import { Announcement } from "@/models/Announcement";
import { Card, CardContent } from "@/components/ui/card";

interface FeaturedAnnouncementCardProps {
  announcement: Announcement;
  onClick: () => void;
}

export const FeaturedAnnouncementCard: React.FC<FeaturedAnnouncementCardProps> = ({
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

  const getCategoryLabel = () => {
    switch (announcement.category) {
      case "event": return "Acara";
      case "recruitment": return "Rekrutmen";
      case "update": return "Update";
      default: return "Pengumuman";
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.01, y: -2 }}
      whileTap={{ scale: 0.99 }}
      className="cursor-pointer"
      onClick={onClick}
    >
      <Card className="relative overflow-hidden bg-gradient-to-br from-amethyst/20 to-turquoise/20 border-amethyst/30 hover:border-amethyst/50 transition-all duration-300">
        {/* Featured Badge */}
        <div className="absolute top-4 left-4 z-10">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amethyst/90 text-white rounded-full text-xs font-semibold">
            <Star className="w-3 h-3 fill-current" />
            Unggulan
          </div>
        </div>

        {/* Category Badge */}
        <div className="absolute top-4 right-4 z-10">
          <div className="px-2.5 py-1 bg-background/20 backdrop-blur-sm text-foreground/80 rounded-full text-xs font-medium border border-white/20">
            {getCategoryLabel()}
          </div>
        </div>

        <CardContent className="p-6 sm:p-8">
          <div className="flex flex-col lg:flex-row gap-6 items-start">
            {/* Content */}
            <div className="flex-1 space-y-4">
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground leading-tight">
                {announcement.title}
              </h2>
              
              <p className="text-foreground/80 text-base leading-relaxed line-clamp-3">
                {announcement.content.substring(0, 200)}...
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-foreground/60">
                  <Calendar className="w-4 h-4" />
                  <span>{getDisplayDate()}</span>
                </div>

                <div className="flex items-center gap-2 text-amethyst font-medium group">
                  <span className="text-sm">Baca Selengkapnya</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

            {/* Image */}
            {announcement.image_url && (
              <div className="lg:w-80 lg:flex-shrink-0">
                <div className="aspect-[4/3] rounded-xl overflow-hidden border border-white/10">
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
        </CardContent>
      </Card>
    </motion.div>
  );
};
