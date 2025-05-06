import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageLayout from "../components/layouts/PageLayout";
import BentoCard from "@/components/ui/BentoCard";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { 
  Bell, 
  Calendar, 
  ChevronRight, 
  Clock, 
  ExternalLink, 
  Tag, 
  Bookmark, 
  Users,
  Megaphone,
  Loader2
} from "lucide-react";
import { Announcement } from "@/models/Announcement";
import { fetchAnnouncements, fetchFeaturedAnnouncement } from "@/services/announcementService";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

const Pengumuman = () => {
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);
  const [filter, setFilter] = useState<string>("all");
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [featuredAnnouncement, setFeaturedAnnouncement] = useState<Announcement | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        console.log('Loading featured announcement and all announcements...');
        
        // Fetch featured announcement
        const featured = await fetchFeaturedAnnouncement();
        console.log('Featured announcement result:', featured);
        setFeaturedAnnouncement(featured);
        
        // Fetch all announcements
        const allAnnouncements = await fetchAnnouncements();
        console.log('All announcements result:', allAnnouncements);
        setAnnouncements(allAnnouncements);
      } catch (error) {
        console.error("Error loading announcements:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, []);

  useEffect(() => {
    const loadFilteredAnnouncements = async () => {
      setIsLoading(true);
      try {
        console.log(`Loading filtered announcements for category: ${filter}`);
        const data = await fetchAnnouncements(filter === 'all' ? 'all' : filter);
        console.log('Filtered announcements result:', data);
        setAnnouncements(data);
      } catch (error) {
        console.error("Error loading filtered announcements:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadFilteredAnnouncements();
  }, [filter]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  // Filter announcements - this is now handled by the backend
  const filteredAnnouncements = announcements;

  return (
    <PageLayout 
      title="Pengumuman" 
      subtitle="Informasi terbaru dan penting dari komunitas OUR CREATIVITY"
    >
      {/* Filter tabs */}
      <motion.div 
        className="mb-10 overflow-x-auto scrollbar-hide"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex gap-2 p-1.5 bg-secondary/50 backdrop-blur-md rounded-full border border-white/10 inline-flex">
          <FilterButton 
            active={filter === "all"} 
            onClick={() => setFilter("all")}
          >
            Semua
          </FilterButton>
          <FilterButton 
            active={filter === "event"} 
            onClick={() => setFilter("event")}
            icon={Calendar}
            color="bg-coral"
          >
            Acara
          </FilterButton>
          <FilterButton 
            active={filter === "recruitment"} 
            onClick={() => setFilter("recruitment")}
            icon={Users}
            color="bg-turquoise"
          >
            Rekrutmen
          </FilterButton>
          <FilterButton 
            active={filter === "update"} 
            onClick={() => setFilter("update")}
            icon={Megaphone}
            color="bg-amethyst"
          >
            Update
          </FilterButton>
        </div>
      </motion.div>

      {/* Featured Announcement */}
      {featuredAnnouncement ? (
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <BentoCard
            colSpan="col-span-1 md:col-span-full"
            className="p-8 relative overflow-hidden"
            iconColor="bg-amethyst text-background"
            icon={Bell}
            glowColor="rgba(229, 222, 255, 0.3)"
            interactive={true}
            onClick={() => setSelectedAnnouncement(featuredAnnouncement)}
          >
            {/* Decorative elements */}
            <div className="absolute -top-20 -right-20 w-56 h-56 rounded-full bg-amethyst/10 blur-3xl"></div>
            <div className="absolute -bottom-32 -left-20 w-64 h-64 rounded-full bg-turquoise/10 blur-3xl"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1 text-left">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-amethyst/20 text-amethyst text-sm font-medium mb-4">
                  <span>Pengumuman Penting</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-serif font-semibold mb-3">{featuredAnnouncement.title}</h3>
                <p className="text-foreground/70 mb-4 line-clamp-2 md:line-clamp-3">
                  {featuredAnnouncement.content.substring(0, 200)}...
                </p>
                <div className="flex items-center gap-4 text-sm text-foreground/60">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    {featuredAnnouncement.date ? 
                      format(new Date(featuredAnnouncement.date), "dd MMM yyyy") : 
                      format(new Date(featuredAnnouncement.created_at), "dd MMM yyyy")}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Tag className="w-4 h-4" />
                    {featuredAnnouncement.category === "event" ? "Acara" : 
                     featuredAnnouncement.category === "recruitment" ? "Rekrutmen" : "Update"}
                  </span>
                </div>
              </div>
              
              <div className="flex-shrink-0">
                <motion.div 
                  className="w-16 h-16 rounded-full bg-amethyst/20 flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ChevronRight className="w-8 h-8 text-amethyst" />
                </motion.div>
              </div>
            </div>
          </BentoCard>
        </motion.div>
      ) : !isLoading && (
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <BentoCard
            colSpan="col-span-1 md:col-span-full"
            className="p-8 relative overflow-hidden text-center"
            interactive={false}
          >
            <Bell className="w-12 h-12 text-foreground/30 mx-auto mb-4" />
            <p className="text-foreground/60 text-lg">Belum ada pengumuman penting saat ini</p>
          </BentoCard>
        </motion.div>
      )}

      {/* Loading state */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-16">
          <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
          <p className="text-foreground/60 text-lg">Memuat pengumuman...</p>
        </div>
      ) : (
        <>
          {/* Announcement grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredAnnouncements.length > 0 ? (
              filteredAnnouncements.map((announcement) => (
                <motion.div key={announcement.id} variants={cardVariants}>
                  <AnnouncementCard 
                    announcement={announcement}
                    onClick={() => setSelectedAnnouncement(announcement)}
                  />
                </motion.div>
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full text-center py-16"
              >
                <Bell className="w-12 h-12 text-foreground/30 mx-auto mb-4" />
                <p className="text-foreground/60 text-lg">Belum ada pengumuman untuk kategori ini</p>
                <Button 
                  variant="outline" 
                  className="mt-4 bg-foreground/5 border-foreground/10"
                  onClick={() => setFilter('all')}
                >
                  Lihat semua pengumuman
                </Button>
              </motion.div>
            )}
          </motion.div>

          {/* Empty state when no announcements match filter */}
          {filteredAnnouncements.length === 0 && !isLoading && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <Bell className="w-12 h-12 text-foreground/30 mx-auto mb-4" />
              <p className="text-foreground/60 text-lg">Belum ada pengumuman untuk kategori ini</p>
              <Button 
                variant="outline" 
                className="mt-4 bg-foreground/5 border-foreground/10"
                onClick={() => setFilter('all')}
              >
                Lihat semua pengumuman
              </Button>
            </motion.div>
          )}
        </>
      )}

      {/* Detailed announcement dialog */}
      <Dialog 
        open={!!selectedAnnouncement} 
        onOpenChange={(open) => !open && setSelectedAnnouncement(null)}
      >
        <DialogContent className="max-w-3xl p-0 bg-secondary/90 backdrop-blur-xl border border-white/10">
          <AnimatePresence>
            {selectedAnnouncement && (
              <AnnouncementDetail announcement={selectedAnnouncement} />
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </PageLayout>
  );
};

const FilterButton = ({ 
  active, 
  onClick, 
  children,
  icon: Icon,
  color
}: { 
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color?: string;
}) => (
  <motion.button 
    className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-all ${
      active ? 'bg-foreground text-background' : 'text-foreground/70 hover:text-foreground'
    }`}
    onClick={onClick}
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.97 }}
    transition={{ duration: 0.2 }}
  >
    {Icon && (
      <span className={`w-5 h-5 rounded-full flex items-center justify-center ${active ? '' : color}`}>
        <Icon className={`w-3 h-3 ${active ? 'text-background' : 'text-background'}`} />
      </span>
    )}
    {children}
  </motion.button>
);

const AnnouncementCard = ({ 
  announcement, 
  onClick 
}: { 
  announcement: Announcement;
  onClick: () => void;
}) => {
  const categoryStyles = {
    event: {
      bgColor: "bg-coral/20",
      textColor: "text-coral",
      icon: Calendar
    },
    recruitment: {
      bgColor: "bg-turquoise/20",
      textColor: "text-turquoise",
      icon: Users
    },
    update: {
      bgColor: "bg-amethyst/20",
      textColor: "text-amethyst",
      icon: Megaphone
    }
  };
  
  const categoryStyle = categoryStyles[announcement.category as keyof typeof categoryStyles] || categoryStyles.update;
  const CategoryIcon = categoryStyle.icon;
  
  // Format date either from date field or created_at
  const displayDate = announcement.date ? 
    format(new Date(announcement.date), "dd MMM yyyy") : 
    format(new Date(announcement.created_at), "dd MMM yyyy");
  
  return (
    <BentoCard
      className="p-6 h-full"
      interactive={true}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className={`px-3 py-1 rounded-full ${categoryStyle.bgColor} ${categoryStyle.textColor} text-xs font-medium flex items-center gap-1.5`}>
          <CategoryIcon className="w-3 h-3" />
          <span>
            {announcement.category === "event" ? "Acara" : 
             announcement.category === "recruitment" ? "Rekrutmen" : "Update"}
          </span>
        </div>
        
        {announcement.important && (
          <span className="bg-red-500/80 text-white text-xs px-2 py-0.5 rounded-full">
            Penting
          </span>
        )}
      </div>
      
      <div className="mt-4">
        <h3 className="text-xl font-serif mb-2">{announcement.title}</h3>
        <p className="text-foreground/70 line-clamp-3 text-sm mb-4">
          {announcement.content.substring(0, 120)}...
        </p>
      </div>
      
      <div className="flex items-center justify-between text-xs text-foreground/60 mt-auto">
        <span className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5" />
          {displayDate}
        </span>
        <span className="text-foreground/80 font-medium hover:underline">Selengkapnya →</span>
      </div>
    </BentoCard>
  );
};

const AnnouncementDetail = ({ announcement }: { announcement: Announcement }) => {
  // Format date either from date field or created_at
  const displayDate = announcement.date ? 
    format(new Date(announcement.date), "dd MMM yyyy") : 
    format(new Date(announcement.created_at), "dd MMM yyyy");

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-8"
    >
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-medium 
            ${announcement.category === "event" ? "bg-coral/20 text-coral" : 
              announcement.category === "recruitment" ? "bg-turquoise/20 text-turquoise" : 
              "bg-amethyst/20 text-amethyst"}`}
          >
            {announcement.category === "event" ? "Acara" : 
             announcement.category === "recruitment" ? "Rekrutmen" : "Update"}
          </span>
          {announcement.important && (
            <span className="bg-red-500/80 text-white text-xs px-2 py-0.5 rounded-full">
              Penting
            </span>
          )}
        </div>
        <span className="text-sm text-foreground/60 flex items-center gap-1.5">
          <Calendar className="w-4 h-4" /> {displayDate}
        </span>
      </div>
      
      <h2 className="text-2xl font-serif font-semibold mb-6">{announcement.title}</h2>
      
      {announcement.image_url && (
        <div className="mb-6">
          <img 
            src={announcement.image_url} 
            alt={announcement.title}
            className="w-full h-auto rounded-xl object-cover max-h-[300px]"
          />
        </div>
      )}
      
      <div className="prose prose-invert max-w-none text-foreground/80 space-y-4">
        {announcement.content.split('\n\n').map((paragraph, idx) => (
          <p key={idx}>{paragraph}</p>
        ))}
      </div>
      
      <div className="mt-8 flex flex-wrap gap-4">
        {announcement.category === "event" && (
          <motion.button
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-coral/20 text-coral"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            <Calendar className="w-4 h-4" />
            Tambahkan ke Kalender
          </motion.button>
        )}
        
        <motion.button
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-foreground/10 text-foreground/90"
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
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-foreground/10 text-foreground/90"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            <ExternalLink className="w-4 h-4" />
            Kunjungi Link
          </motion.a>
        )}
      </div>
    </motion.div>
  );
};

export default Pengumuman;
