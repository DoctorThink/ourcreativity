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
  RefreshCw,
  Sparkles,
  Code,
  ArrowUpRight,
  Rocket
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
import { Badge } from "@/components/ui/badge";

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

// Badge floating animation
const floatAnimation = {
  initial: { y: 0 },
  animate: {
    y: [-5, 5, -5],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
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
        
        try {
          // Parallel fetching of both featured and all announcements
          const [featured, allAnnouncements] = await Promise.all([
            fetchFeaturedAnnouncement(),
            fetchAnnouncements(filter)
          ]);
          
          console.log('Featured announcement result:', featured);
          console.log('All announcements result:', allAnnouncements);
          
          setFeaturedAnnouncement(featured);
          setAnnouncements(allAnnouncements);
          
          // If no announcements found, check if we have permission issues
          if (allAnnouncements.length === 0) {
            console.log('No announcements found, checking for permission issues');
          }
        } catch (err) {
          console.error("Error loading initial announcements data:", err);
          
          // Check if this is a Supabase permission error
          const errorMessage = err instanceof Error ? err.message : String(err);
          if (errorMessage.includes('permission denied') || errorMessage.includes('42501')) {
            setError("Gagal memuat data pengumuman: Izin database tidak sesuai. Mohon hubungi administrator.");
            toast.error("Gagal akses database pengumuman");
          } else {
            setError("Gagal memuat data pengumuman. Silakan coba lagi nanti.");
            toast.error("Gagal memuat data pengumuman");
          }
        }
      } finally {
        setIsLoading(false);
      }
    };
    
    loadInitialData();
  }, []);

  // Load filtered announcements when filter changes
  useEffect(() => {
    // Skip if this is the initial load or if we're already loading
    if (isLoading && announcements.length === 0) return;
    
    const loadFilteredAnnouncements = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        console.log(`Loading filtered announcements for category: ${filter}`);
        const data = await fetchAnnouncements(filter);
        console.log('Filtered announcements result:', data);
        setAnnouncements(data);
      } catch (err) {
        console.error("Error loading filtered announcements:", err);
        const errorMessage = err instanceof Error ? err.message : String(err);
        if (errorMessage.includes('permission denied') || errorMessage.includes('42501')) {
          setError("Gagal memuat data pengumuman: Izin database tidak sesuai. Mohon hubungi administrator.");
          toast.error("Gagal akses database pengumuman");
        } else {
          setError("Gagal memuat data pengumuman. Silakan coba lagi nanti.");
          toast.error("Gagal memuat data pengumuman");
        }
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
      
      // Try to add predefined announcements first, which might help create the table structure
      await handleAddPredefinedAnnouncements();
      
      // Now try to fetch the announcements again
      const [featured, allAnnouncements] = await Promise.all([
        fetchFeaturedAnnouncement(),
        fetchAnnouncements(filter)
      ]);
      
      setFeaturedAnnouncement(featured);
      setAnnouncements(allAnnouncements);
      
      if (allAnnouncements.length > 0) {
        toast.success("Data pengumuman berhasil dimuat");
      } else {
        toast.info("Tidak ada pengumuman ditemukan");
      }
    } catch (err) {
      console.error("Error retrying data load:", err);
      const errorMessage = err instanceof Error ? err.message : String(err);
      if (errorMessage.includes('permission denied') || errorMessage.includes('42501')) {
        setError("Gagal memuat data pengumuman: Izin database tidak sesuai. Mohon hubungi administrator.");
        toast.error("Gagal akses database pengumuman");
      } else {
        setError("Gagal memuat data pengumuman. Silakan coba lagi nanti.");
        toast.error("Gagal memuat data pengumuman");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Handle adding predefined announcements
  const handleAddPredefinedAnnouncements = async () => {
    setIsAddingPredefined(true);
    
    try {
      console.log("Adding predefined announcements...");
      const result = await addPredefinedAnnouncements();
      console.log("Result of adding predefined announcements:", result);
      
      if (result) {
        // Reload announcements after adding predefined ones
        const [featured, allAnnouncements] = await Promise.all([
          fetchFeaturedAnnouncement(),
          fetchAnnouncements(filter)
        ]);
        
        setFeaturedAnnouncement(featured);
        setAnnouncements(allAnnouncements);
        toast.success("Pengumuman predefinisi berhasil ditambahkan");
      } else {
        toast.error("Gagal menambahkan pengumuman predefinisi");
      }
    } catch (err) {
      console.error("Error adding predefined announcements:", err);
      const errorMessage = err instanceof Error ? err.message : String(err);
      if (errorMessage.includes('permission denied') || errorMessage.includes('42501')) {
        setError("Gagal menambahkan pengumuman: Izin database tidak sesuai. Mohon hubungi administrator.");
        toast.error("Gagal akses database pengumuman");
      } else {
        toast.error("Gagal menambahkan pengumuman predefinisi");
      }
    } finally {
      setIsAddingPredefined(false);
    }
  };

  return (
    <PageLayout 
      title="Pengumuman" 
      subtitle="Informasi terbaru dan penting dari komunitas OUR CREATIVITY"
    >
      {/* Version badge */}
      <motion.div 
        className="w-full flex justify-center mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.6,
          delay: 0.1,
          ease: "easeOut"
        }}
      >
        <motion.div 
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full
                     bg-gradient-to-r from-amethyst/30 via-amethyst/50 to-coral/30 
                     backdrop-blur-md border border-white/10"
          variants={floatAnimation}
          initial="initial"
          animate="animate"
        >
          <Sparkles className="w-4 h-4 text-amethyst" />
          <span className="text-sm font-medium">OurCreativity Web v4.0</span>
        </motion.div>
      </motion.div>

      {/* Filter tabs */}
      <motion.div 
        className="mb-6 sm:mb-10 overflow-x-auto scrollbar-hide"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
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
          variants={featuredVariants}
          initial="hidden"
          animate="visible"
        >
          <BentoCard
            colSpan="col-span-1 md:col-span-full"
            className="p-4 sm:p-8 relative overflow-hidden"
            iconColor="bg-amethyst text-background"
            icon={Bell}
            glowColor="rgba(229, 222, 255, 0.4)"
            interactive={true}
            onClick={() => setSelectedAnnouncement(featuredAnnouncement)}
          >
            {/* Enhanced decorative elements */}
            <div className="absolute -top-20 -right-20 w-40 sm:w-56 h-40 sm:h-56 rounded-full bg-amethyst/10 blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-32 -left-20 w-48 sm:w-64 h-48 sm:h-64 rounded-full bg-turquoise/10 blur-3xl"></div>
            <div className="absolute top-1/4 left-1/2 w-16 h-16 bg-coral/5 rounded-full blur-2xl"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row gap-6 sm:gap-8 items-start md:items-center">
              <div className="flex-1 text-left">
                <motion.div 
                  className="inline-flex items-center px-3 py-1.5 rounded-full bg-gradient-to-r from-amethyst/40 to-turquoise/30 text-amethyst text-xs sm:text-sm font-medium mb-3 sm:mb-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                >
                  <Rocket className="mr-1.5 h-3.5 w-3.5" />
                  <span>Pengumuman Versi 4.0</span>
                </motion.div>
                <motion.h3 
                  className="text-lg sm:text-2xl md:text-3xl font-serif font-semibold mb-2 sm:mb-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  {featuredAnnouncement.title}
                </motion.h3>
                <motion.p 
                  className="text-foreground/70 text-xs sm:text-sm md:text-base mb-3 sm:mb-4 line-clamp-2 md:line-clamp-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  {featuredAnnouncement.content.substring(0, isMobile ? 100 : 200)}...
                </motion.p>
                <motion.div 
                  className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-foreground/60"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.4 }}
                >
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
                </motion.div>
              </div>
              
              <motion.div 
                className="flex-shrink-0 mt-2 md:mt-0"
                whileHover={{ scale: 1.1, rotate: 10 }}
                whileTap={{ scale: 0.9 }}
              >
                <div className="w-10 h-10 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-amethyst/30 to-amethyst/60 flex items-center justify-center shadow-lg shadow-amethyst/20">
                  <ChevronRight className="w-5 h-5 sm:w-8 sm:h-8 text-white" />
                </div>
              </motion.div>
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
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.1, 1],
             }}
            transition={{ 
              repeat: Infinity, 
              duration: 2,
              ease: "linear" 
            }}
          >
            <Loader2 className="w-8 h-8 sm:w-12 sm:h-12 text-amethyst" />
          </motion.div>
          <motion.p 
            className="text-foreground/60 text-sm sm:text-lg mt-4"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            Memuat pengumuman...
          </motion.p>
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
      active ? 'bg-gradient-to-r from-foreground to-foreground/90 text-background' : 'text-foreground/70 hover:text-foreground hover:bg-foreground/10'
    }`}
    onClick={onClick}
    whileHover={{ scale: 1.05 }}
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
      icon: Calendar,
      gradientColor: "from-coral/20 to-coral/40",
    },
    recruitment: {
      bgColor: "bg-turquoise/20",
      textColor: "text-turquoise",
      icon: Users,
      gradientColor: "from-turquoise/20 to-turquoise/40",
    },
    update: {
      bgColor: "bg-amethyst/20",
      textColor: "text-amethyst",
      icon: Megaphone,
      gradientColor: "from-amethyst/20 to-amethyst/40",
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

  // Check if this is the Version 4.0 announcement
  const isVersionFour = announcement.title.includes('4.0') || announcement.title.includes('Versi 4');
  const isArdelyo = announcement.content.includes('Ardelyo') || announcement.content.includes('Unix Series');
  
  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
      <BentoCard
        className="p-4 sm:p-6 h-full relative overflow-hidden"
        interactive={true}
        onClick={onClick}
        glowColor={isVersionFour ? "rgba(155, 109, 255, 0.2)" : undefined}
      >
        {/* Decorative background elements */}
        {isVersionFour && (
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-amethyst/5 rounded-full blur-2xl"></div>
        )}
        {isArdelyo && (
          <div className="absolute top-5 -left-10 w-24 h-24 bg-turquoise/5 rounded-full blur-xl"></div>
        )}
        
        <div className="flex items-start justify-between z-10 relative">
          <div className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-gradient-to-r ${categoryStyle.gradientColor} ${categoryStyle.textColor} text-xs font-medium flex items-center gap-1.5`}>
            <CategoryIcon className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
            <span>
              {announcement.category === "event" ? "Acara" : 
               announcement.category === "recruitment" ? "Rekrutmen" : "Update"}
            </span>
          </div>
          
          <div className="flex gap-1.5">
            {isVersionFour && (
              <motion.span 
                className="bg-gradient-to-r from-amethyst/80 to-turquoise/70 text-white text-xs px-1.5 sm:px-2 py-0.5 rounded-full"
                animate={{ y: [0, -3, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              >
                v4.0
              </motion.span>
            )}
            
            {announcement.important && (
              <span className="bg-red-500/80 text-white text-xs px-1.5 sm:px-2 py-0.5 rounded-full">
                Penting
              </span>
            )}
            
            {isArdelyo && (
              <motion.span 
                className="bg-gradient-to-r from-turquoise/70 to-coral/70 text-white text-xs px-1.5 sm:px-2 py-0.5 rounded-full flex items-center"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              >
                <Code className="w-2.5 h-2.5 mr-1" />
                Unix Series
              </motion.span>
            )}
          </div>
        </div>
        
        <div className="mt-3 sm:mt-4">
          <h3 className="text-base sm:text-xl font-serif mb-1.5 sm:mb-2">
            {announcement.title}
          </h3>
          <p className="text-foreground/70 line-clamp-3 text-xs sm:text-sm mb-3 sm:mb-4">
            {announcement.content.substring(0, 120)}...
          </p>
        </div>
        
        <div className="flex items-center justify-between text-xs text-foreground/60 mt-auto">
          <span className="flex items-center gap-1.5">
            <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            {displayDate}
          </span>
          <span className="text-foreground/80 text-xs sm:text-sm font-medium hover:underline flex items-center">
            Selengkapnya
            <ArrowUpRight className="w-3 h-3 ml-1" />
          </span>
        </div>
      </BentoCard>
    </motion.div>
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

export default Pengumuman;
