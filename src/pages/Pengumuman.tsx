
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageLayout from "../components/layouts/PageLayout";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { RefreshCw, Loader2, Calendar, Users, Megaphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAnnouncements } from "@/hooks/useAnnouncements";

// Import refactored components
import { AnnouncementCard } from "@/components/announcement/AnnouncementCard";
import { AnnouncementDetail } from "@/components/announcement/AnnouncementDetail";
import { AnnouncementErrorState } from "@/components/announcement/AnnouncementErrorState";
import { AnnouncementLoading } from "@/components/announcement/AnnouncementLoading";
import { EmptyAnnouncementState } from "@/components/announcement/EmptyAnnouncementState";
import { FeaturedAnnouncement, EmptyFeaturedAnnouncement } from "@/components/announcement/FeaturedAnnouncement";
import { FilterButton } from "@/components/announcement/FilterButton";
import { VersionBadge } from "@/components/announcement/VersionBadge";

// Animation variants
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
  const isMobile = useIsMobile();
  const {
    selectedAnnouncement,
    setSelectedAnnouncement,
    filter,
    setFilter,
    announcements,
    featuredAnnouncement,
    isLoading,
    error,
    isAddingPredefined,
    handleRetry,
    handleAddPredefinedAnnouncements
  } = useAnnouncements();

  return (
    <PageLayout 
      title="Pengumuman" 
      subtitle="Informasi terbaru dan penting dari komunitas OUR CREATIVITY"
    >
      {/* Version badge */}
      <VersionBadge />

      {/* "OurCreativity Mobile, Coming Soon" Text */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-sm text-foreground/70 mt-2 mb-6 text-center p-3 bg-secondary/40 backdrop-blur-sm rounded-xl border border-white/10 shadow-md"
      >
        🚀 OurCreativity Mobile - Segera Hadir untuk Pengalaman Kreatif Tanpa Batas di Genggaman Anda! 📱
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
        <AnnouncementErrorState error={error} onRetry={handleRetry} />
      )}

      {/* Featured Announcement */}
      {!error && featuredAnnouncement ? (
        <FeaturedAnnouncement 
          announcement={featuredAnnouncement} 
          onClick={() => setSelectedAnnouncement(featuredAnnouncement)} 
        />
      ) : !isLoading && !error ? (
        <EmptyFeaturedAnnouncement />
      ) : null}

      {/* Loading state */}
      {isLoading ? (
        <AnnouncementLoading />
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
                <EmptyAnnouncementState onShowAll={() => setFilter('all')} />
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

export default Pengumuman;
