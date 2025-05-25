import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageLayout from "../components/layouts/PageLayout";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { RefreshCw, Loader2, Calendar, Users, Megaphone, Wand2 } from "lucide-react"; // Added Wand2 for Add Predefined
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
    transition: { staggerChildren: 0.07, delayChildren: 0.2 } // Added delayChildren
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 }, // Slightly more pronounced entry
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" } // Smoother ease
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
    handleAddPredefinedAnnouncements // This function would need to be updated in useAnnouncements to add the new specific announcements
  } = useAnnouncements();

  return (
    <PageLayout 
      title="Pengumuman Komunitas" 
      subtitle="Ikuti informasi terbaru, acara, dan pembaruan penting dari OurCreativity."
    >
      {/* Version badge (assumed for current site version) */}
      <VersionBadge />

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-sm text-center text-foreground/70 mt-2 mb-6 p-3 bg-gradient-to-r from-amethyst/10 via-background to-turquoise/10 backdrop-blur-sm rounded-xl border border-white/10 shadow-lg"
      >
        📱 <span className="font-semibold text-amethyst">OurCreativity Mobile:</span> Segera hadir untuk pengalaman kreatif tanpa batas di genggaman Anda! Nantikan update selanjutnya. 🚀
      </motion.div>

      <motion.div 
        className="mb-6 sm:mb-10 overflow-x-auto scrollbar-hide flex justify-center sm:justify-start" // Centered on mobile
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex gap-2 p-1.5 bg-secondary/60 backdrop-blur-md rounded-full border border-white/10 inline-flex shadow-md">
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
            color="bg-coral" // Pass color for icon background
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

      {/* This button's functionality (handleAddPredefinedAnnouncements) is assumed to be updated in useAnnouncements.ts */}
      {/* to add the new v3.0, v3.5, v3.7, v4.0 announcements with their unique content. */}
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
          className="flex items-center gap-2 text-xs bg-background/30 backdrop-blur-sm border-foreground/20 hover:bg-foreground/10 hover:text-foreground font-sans"
        >
          {isAddingPredefined ? (
            <Loader2 className="h-3 w-3 animate-spin" />
          ) : (
            <Wand2 className="h-3 w-3 text-amethyst" /> // More thematic icon
          )}
          Tambah Contoh Pengumuman Update
        </Button>
      </motion.div>

      {error && !isLoading && (
        <AnnouncementErrorState error={error} onRetry={handleRetry} />
      )}

      {!error && featuredAnnouncement ? (
        <FeaturedAnnouncement 
          announcement={featuredAnnouncement} 
          onClick={() => setSelectedAnnouncement(featuredAnnouncement)} 
        />
      ) : !isLoading && !error ? (
        <EmptyFeaturedAnnouncement />
      ) : null}

      {isLoading ? (
        <AnnouncementLoading />
      ) : (
        <>
          {!error && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-6" // Added mt-6
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
                <div className="col-span-1 sm:col-span-2 lg:col-span-3"> {/* Ensure EmptyState spans all columns */}
                  <EmptyAnnouncementState onShowAll={() => setFilter('all')} />
                </div>
              )}
            </motion.div>
          )}
        </>
      )}

      <Dialog 
        open={!!selectedAnnouncement} 
        onOpenChange={(open) => !open && setSelectedAnnouncement(null)}
      >
        <DialogContent className="max-w-3xl p-0 bg-background/80 backdrop-blur-xl border border-white/10 rounded-ios max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-foreground/30 scrollbar-track-transparent">
          <AnimatePresence mode="wait"> {/* Added mode="wait" for smoother transitions */}
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
