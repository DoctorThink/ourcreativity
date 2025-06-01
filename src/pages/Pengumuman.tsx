
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

// Enhanced animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { 
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: { 
      duration: 0.4,
      ease: "easeOut"
    }
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

  // Remove duplicates from announcements array
  const uniqueAnnouncements = React.useMemo(() => {
    const seen = new Set();
    return announcements.filter(announcement => {
      if (seen.has(announcement.id)) {
        return false;
      }
      seen.add(announcement.id);
      return true;
    });
  }, [announcements]);

  return (
    <PageLayout 
      title="Pengumuman" 
      subtitle="Informasi terbaru dan penting dari komunitas OUR CREATIVITY"
    >
      {/* Enhanced version badge */}
      <VersionBadge />

      {/* Enhanced filter tabs with better mobile responsiveness */}
      <motion.div 
        className="mb-6 sm:mb-8 overflow-x-auto scrollbar-hide"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex gap-2 p-2 bg-secondary/60 backdrop-blur-xl rounded-2xl border border-white/10 inline-flex min-w-full sm:min-w-0 justify-center sm:justify-start shadow-lg">
          <FilterButton 
            active={filter === "all"} 
            onClick={() => setFilter("all")}
            className="flex-1 sm:flex-initial"
          >
            Semua
          </FilterButton>
          <FilterButton 
            active={filter === "event"} 
            onClick={() => setFilter("event")}
            icon={Calendar}
            color="bg-coral"
            className="flex-1 sm:flex-initial"
          >
            Acara
          </FilterButton>
          <FilterButton 
            active={filter === "recruitment"} 
            onClick={() => setFilter("recruitment")}
            icon={Users}
            color="bg-turquoise"
            className="flex-1 sm:flex-initial"
          >
            Rekrutmen
          </FilterButton>
          <FilterButton 
            active={filter === "update"} 
            onClick={() => setFilter("update")}
            icon={Megaphone}
            color="bg-amethyst"
            className="flex-1 sm:flex-initial"
          >
            Update
          </FilterButton>
        </div>
      </motion.div>

      {/* Admin Action with enhanced styling */}
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
          className="flex items-center gap-2 text-xs bg-background/20 backdrop-blur-sm border-white/10 hover:bg-background/30 shadow-lg"
        >
          {isAddingPredefined ? (
            <Loader2 className="h-3 w-3 animate-spin" />
          ) : (
            <RefreshCw className="h-3 w-3" />
          )}
          Tambah Pengumuman Update
        </Button>
      </motion.div>

      {/* Error State with enhanced design */}
      {error && !isLoading && (
        <AnnouncementErrorState error={error} onRetry={handleRetry} />
      )}

      {/* Featured Announcement with enhanced animations */}
      {!error && featuredAnnouncement ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <FeaturedAnnouncement 
            announcement={featuredAnnouncement} 
            onClick={() => setSelectedAnnouncement(featuredAnnouncement)} 
          />
        </motion.div>
      ) : !isLoading && !error ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <EmptyFeaturedAnnouncement />
        </motion.div>
      ) : null}

      {/* Enhanced loading state */}
      {isLoading ? (
        <AnnouncementLoading />
      ) : (
        <>
          {/* Enhanced announcement grid with better responsiveness */}
          {!error && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
            >
              {uniqueAnnouncements.length > 0 ? (
                uniqueAnnouncements.map((announcement) => (
                  <motion.div 
                    key={announcement.id} 
                    variants={cardVariants}
                    layout
                  >
                    <AnnouncementCard 
                      announcement={announcement}
                      onClick={() => setSelectedAnnouncement(announcement)}
                    />
                  </motion.div>
                ))
              ) : (
                <motion.div
                  variants={cardVariants}
                  className="col-span-full"
                >
                  <EmptyAnnouncementState onShowAll={() => setFilter('all')} />
                </motion.div>
              )}
            </motion.div>
          )}
        </>
      )}

      {/* Enhanced detailed announcement dialog */}
      <Dialog 
        open={!!selectedAnnouncement} 
        onOpenChange={(open) => !open && setSelectedAnnouncement(null)}
      >
        <DialogContent className={`max-w-4xl p-0 border-0 max-h-[95vh] overflow-hidden
          ${selectedAnnouncement?.title.includes('Gerakan 27 April') 
            ? 'bg-black/95 backdrop-blur-xl' 
            : 'bg-secondary/95 backdrop-blur-xl'
          }`}>
          <AnimatePresence mode="wait">
            {selectedAnnouncement && (
              <motion.div
                key={selectedAnnouncement.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="overflow-y-auto max-h-[95vh] scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent"
              >
                <AnnouncementDetail announcement={selectedAnnouncement} />
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </PageLayout>
  );
};

export default Pengumuman;
