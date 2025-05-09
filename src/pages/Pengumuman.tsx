
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
  Loader2,
  AlertCircle,
  RefreshCw
} from "lucide-react";
import { Announcement } from "@/models/Announcement";
import { 
  fetchAnnouncements, 
  fetchFeaturedAnnouncement,
  addPredefinedAnnouncements 
} from "@/services/announcementService";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";

// Animation variants for container elements
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

// Animation variants for card elements
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
};

const Pengumuman = () => {
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);
  const [filter, setFilter] = useState<string>("all");
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [featuredAnnouncement, setFeaturedAnnouncement] = useState<Announcement | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAddingPredefined, setIsAddingPredefined] = useState(false);
  const isMobile = useIsMobile();

  // Load featured announcement and all announcements on initial load
  useEffect(() => {
    const loadInitialData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        console.log('Initial data load started...');
        
        // Parallel fetching of both featured and all announcements
        const [featured, allAnnouncements] = await Promise.all([
          fetchFeaturedAnnouncement(),
          fetchAnnouncements(filter)
        ]);
        
        console.log('Featured announcement result:', featured);
        console.log('All announcements result:', allAnnouncements);
        
        setFeaturedAnnouncement(featured);
        setAnnouncements(allAnnouncements);

        // If no announcements found, try adding predefined announcements
        if (allAnnouncements.length === 0) {
          console.log('No announcements found, adding predefined announcements');
          await handleAddPredefinedAnnouncements();
        }
      } catch (err) {
        console.error("Error loading initial announcements data:", err);
        setError("Gagal memuat data pengumuman. Silakan coba lagi nanti.");
        toast.error("Gagal memuat data pengumuman");
      } finally {
        setIsLoading(false);
      }
    };
    
    loadInitialData();
  }, []);

  // Load filtered announcements when filter changes
  useEffect(() => {
    const loadFilteredAnnouncements = async () => {
      // Skip fetching on initial load, as it's handled by the first useEffect
      if (isLoading && announcements.length === 0) return;

      setIsLoading(true);
      setError(null);
      
      try {
        console.log(`Loading filtered announcements for category: ${filter}`);
        const data = await fetchAnnouncements(filter);
        console.log('Filtered announcements result:', data);
        setAnnouncements(data);
      } catch (err) {
        console.error("Error loading filtered announcements:", err);
        setError("Gagal memuat data pengumuman. Silakan coba lagi nanti.");
        toast.error("Gagal memuat data pengumuman");
      } finally {
        setIsLoading(false);
      }
    };
    
    loadFilteredAnnouncements();
  }, [filter]);

  // Handle retry loading data
  const handleRetry = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log('Retrying data load...');
      
      // Parallel fetching of both featured and all announcements
      const [featured, allAnnouncements] = await Promise.all([
        fetchFeaturedAnnouncement(),
        fetchAnnouncements(filter)
      ]);
      
      setFeaturedAnnouncement(featured);
      setAnnouncements(allAnnouncements);
      toast.success("Data pengumuman berhasil dimuat");
    } catch (err) {
      console.error("Error retrying data load:", err);
      setError("Gagal memuat data pengumuman. Silakan coba lagi nanti.");
      toast.error("Gagal memuat data pengumuman");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle adding predefined announcements
  const handleAddPredefinedAnnouncements = async () => {
    setIsAddingPredefined(true);
    
    try {
      await addPredefinedAnnouncements();
      
      // Reload announcements after adding predefined ones
      const [featured, allAnnouncements] = await Promise.all([
        fetchFeaturedAnnouncement(),
        fetchAnnouncements(filter)
      ]);
      
      setFeaturedAnnouncement(featured);
      setAnnouncements(allAnnouncements);
    } catch (err) {
      console.error("Error adding predefined announcements:", err);
      toast.error("Gagal menambahkan pengumuman predefinisi");
    } finally {
      setIsAddingPredefined(false);
    }
  };

  return (
    <PageLayout 
      title="Pengumuman" 
      subtitle="Informasi terbaru dan penting dari komunitas OUR CREATIVITY"
    >
      {/* Filter tabs */}
      <motion.div 
        className="mb-6 sm:mb-10 overflow-x-auto scrollbar-hide"
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

      {/* Admin Action - Add Predefined Announcements */}
      <motion.div 
        className="mb-4 flex justify-end"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Button
          size="sm"
          variant="outline"
          onClick={handleAddPredefinedAnnouncements}
          disabled={isAddingPredefined}
          className="flex items-center gap-2 text-xs bg-background/20"
        >
          {isAddingPredefined ? (
            <Loader2 className="h-3 w-3 animate-spin" />
          ) : (
            <RefreshCw className="h-3 w-3" />
          )}
          Tambah Pengumuman Update
        </Button>
      </motion.div>

      {/* Error State */}
      {error && !isLoading && (
        <motion.div 
          className="mb-8 text-center py-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-foreground/80 text-base sm:text-lg mb-4">{error}</p>
          <Button onClick={handleRetry} variant="default" className="text-sm">
            Coba Lagi
          </Button>
        </motion.div>
      )}

      {/* Featured Announcement */}
      {!error && featuredAnnouncement ? (
        <motion.div 
          className="mb-6 sm:mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <BentoCard
            colSpan="col-span-1 md:col-span-full"
            className="p-4 sm:p-8 relative overflow-hidden"
            iconColor="bg-amethyst text-background"
            icon={Bell}
            glowColor="rgba(229, 222, 255, 0.3)"
            interactive={true}
            onClick={() => setSelectedAnnouncement(featuredAnnouncement)}
          >
            {/* Decorative elements */}
            <div className="absolute -top-20 -right-20 w-40 sm:w-56 h-40 sm:h-56 rounded-full bg-amethyst/10 blur-3xl"></div>
            <div className="absolute -bottom-32 -left-20 w-48 sm:w-64 h-48 sm:h-64 rounded-full bg-turquoise/10 blur-3xl"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row gap-6 sm:gap-8 items-start md:items-center">
              <div className="flex-1 text-left">
                <div className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full bg-amethyst/20 text-amethyst text-xs sm:text-sm font-medium mb-3 sm:mb-4">
                  <span>Pengumuman Penting</span>
                </div>
                <h3 className="text-lg sm:text-2xl md:text-3xl font-serif font-semibold mb-2 sm:mb-3">{featuredAnnouncement.title}</h3>
                <p className="text-foreground/70 text-xs sm:text-sm md:text-base mb-3 sm:mb-4 line-clamp-2 md:line-clamp-3">
                  {featuredAnnouncement.content.substring(0, isMobile ? 100 : 200)}...
                </p>
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-foreground/60">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                    {featuredAnnouncement.date ? 
                      format(new Date(featuredAnnouncement.date), "dd MMM yyyy") : 
                      format(new Date(featuredAnnouncement.created_at), "dd MMM yyyy")}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Tag className="w-3 h-3 sm:w-4 sm:h-4" />
                    {featuredAnnouncement.category === "event" ? "Acara" : 
                     featuredAnnouncement.category === "recruitment" ? "Rekrutmen" : "Update"}
                  </span>
                </div>
              </div>
              
              <div className="flex-shrink-0 mt-2 md:mt-0">
                <motion.div 
                  className="w-10 h-10 sm:w-16 sm:h-16 rounded-full bg-amethyst/20 flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ChevronRight className="w-5 h-5 sm:w-8 sm:h-8 text-amethyst" />
                </motion.div>
              </div>
            </div>
          </BentoCard>
        </motion.div>
      ) : !isLoading && !error ? (
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
      ) : null}

      {/* Loading state */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-12 sm:py-16">
          <Loader2 className="w-8 h-8 sm:w-12 sm:h-12 text-primary animate-spin mb-4" />
          <p className="text-foreground/60 text-sm sm:text-lg">Memuat pengumuman...</p>
        </div>
      ) : (
        <>
          {/* Announcement grid */}
          {!error && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
            >
              {announcements.length > 0 ? (
                announcements.map((announcement) => (
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
                  className="col-span-full text-center py-12 sm:py-16"
                >
                  <Bell className="w-8 h-8 sm:w-12 sm:h-12 text-foreground/30 mx-auto mb-4" />
                  <p className="text-foreground/60 text-sm sm:text-lg">Belum ada pengumuman untuk kategori ini</p>
                  <Button 
                    variant="outline" 
                    className="mt-4 bg-foreground/5 border-foreground/10 text-xs sm:text-sm"
                    onClick={() => setFilter('all')}
                  >
                    Lihat semua pengumuman
                  </Button>
                </motion.div>
              )}
            </motion.div>
          )}
        </>
      )}

      {/* Detailed announcement dialog */}
      <Dialog 
        open={!!selectedAnnouncement} 
        onOpenChange={(open) => !open && setSelectedAnnouncement(null)}
      >
        <DialogContent className="max-w-3xl p-0 bg-secondary/90 backdrop-blur-xl border border-white/10 max-h-[90vh] overflow-y-auto">
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

// Filter Button Component
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
    className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium flex items-center gap-1.5 sm:gap-2 transition-all ${
      active ? 'bg-foreground text-background' : 'text-foreground/70 hover:text-foreground'
    }`}
    onClick={onClick}
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.97 }}
    transition={{ duration: 0.2 }}
  >
    {Icon && (
      <span className={`w-4 sm:w-5 h-4 sm:h-5 rounded-full flex items-center justify-center ${active ? '' : color}`}>
        <Icon className={`w-2.5 h-2.5 sm:w-3 sm:h-3 ${active ? 'text-background' : 'text-background'}`} />
      </span>
    )}
    {children}
  </motion.button>
);

// Announcement Card Component
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
  
  // Handle unknown category gracefully
  const categoryStyle = categoryStyles[announcement.category as keyof typeof categoryStyles] || categoryStyles.update;
  const CategoryIcon = categoryStyle.icon;
  
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
  
  return (
    <BentoCard
      className="p-4 sm:p-6 h-full"
      interactive={true}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-full ${categoryStyle.bgColor} ${categoryStyle.textColor} text-xs font-medium flex items-center gap-1.5`}>
          <CategoryIcon className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
          <span>
            {announcement.category === "event" ? "Acara" : 
             announcement.category === "recruitment" ? "Rekrutmen" : "Update"}
          </span>
        </div>
        
        {announcement.important && (
          <span className="bg-red-500/80 text-white text-xs px-1.5 sm:px-2 py-0.5 rounded-full">
            Penting
          </span>
        )}
      </div>
      
      <div className="mt-3 sm:mt-4">
        <h3 className="text-base sm:text-xl font-serif mb-1.5 sm:mb-2">{announcement.title}</h3>
        <p className="text-foreground/70 line-clamp-3 text-xs sm:text-sm mb-3 sm:mb-4">
          {announcement.content.substring(0, 120)}...
        </p>
      </div>
      
      <div className="flex items-center justify-between text-xs text-foreground/60 mt-auto">
        <span className="flex items-center gap-1.5">
          <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          {displayDate}
        </span>
        <span className="text-foreground/80 text-xs sm:text-sm font-medium hover:underline">Selengkapnya →</span>
      </div>
    </BentoCard>
  );
};

// Announcement Detail Component
const AnnouncementDetail = ({ announcement }: { announcement: Announcement }) => {
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

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-4 sm:p-8"
    >
      <div className="flex justify-between items-start mb-4 sm:mb-6 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-medium 
            ${announcement.category === "event" ? "bg-coral/20 text-coral" : 
              announcement.category === "recruitment" ? "bg-turquoise/20 text-turquoise" : 
              "bg-amethyst/20 text-amethyst"}`}
          >
            {announcement.category === "event" ? "Acara" : 
             announcement.category === "recruitment" ? "Rekrutmen" : "Update"}
          </span>
          {announcement.important && (
            <span className="bg-red-500/80 text-white text-xs px-1.5 sm:px-2 py-0.5 rounded-full">
              Penting
            </span>
          )}
        </div>
        <span className="text-xs sm:text-sm text-foreground/60 flex items-center gap-1.5">
          <Calendar className="w-3 h-3 sm:w-4 sm:h-4" /> {displayDate}
        </span>
      </div>
      
      <h2 className="text-xl sm:text-2xl font-serif font-semibold mb-4 sm:mb-6">{announcement.title}</h2>
      
      {announcement.image_url && (
        <div className="mb-4 sm:mb-6">
          <img 
            src={announcement.image_url} 
            alt={announcement.title}
            className="w-full h-auto rounded-xl object-cover max-h-[200px] sm:max-h-[300px]"
            onError={(e) => {
              // Handle image loading error
              e.currentTarget.style.display = 'none';
              console.error('Failed to load announcement image:', announcement.image_url);
            }}
          />
        </div>
      )}
      
      <div className="prose prose-invert max-w-none text-foreground/80 space-y-3 sm:space-y-4 text-sm sm:text-base">
        {announcement.content.split('\n\n').map((paragraph, idx) => (
          <p key={idx}>{paragraph}</p>
        ))}
      </div>
      
      <div className="mt-6 sm:mt-8 flex flex-wrap gap-3 sm:gap-4">
        {announcement.category === "event" && (
          <motion.button
            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-coral/20 text-coral text-xs sm:text-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
            Tambahkan ke Kalender
          </motion.button>
        )}
        
        <motion.button
          className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-foreground/10 text-foreground/90 text-xs sm:text-sm"
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
            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-foreground/10 text-foreground/90 text-xs sm:text-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
            Kunjungi Link
          </motion.a>
        )}
      </div>
    </motion.div>
  );
};

export default Pengumuman;
