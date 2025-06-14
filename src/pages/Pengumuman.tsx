
import React from "react";
import { motion } from "framer-motion";
import PageLayout from "../components/layouts/PageLayout";
import { useLocalAnnouncements } from "@/hooks/useLocalAnnouncements";
import { AnnouncementGrid } from "@/components/announcement/AnnouncementGrid";
import { AnnouncementFilters } from "@/components/announcement/AnnouncementFilters";
import { FeaturedAnnouncementCard } from "@/components/announcement/FeaturedAnnouncementCard";
import { AnnouncementDetailModal } from "@/components/announcement/AnnouncementDetailModal";
import { AnnouncementLoadingState } from "@/components/announcement/AnnouncementLoadingState";
import { AnnouncementErrorState } from "@/components/announcement/AnnouncementErrorState";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { 
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const Pengumuman = () => {
  const {
    selectedAnnouncement,
    setSelectedAnnouncement,
    filter,
    setFilter,
    announcements,
    featuredAnnouncement,
    isLoading,
    error,
    handleRetry
  } = useLocalAnnouncements();

  return (
    <PageLayout 
      title="Pengumuman" 
      subtitle="Informasi terbaru dan penting dari komunitas OUR CREATIVITY"
      className="bg-gradient-to-br from-background via-background to-secondary/20"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        {/* Enhanced Filters */}
        <motion.div 
          variants={{ hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0 } }}
          className="glass-card p-6 rounded-3xl"
        >
          <AnnouncementFilters 
            currentFilter={filter} 
            onFilterChange={setFilter} 
          />
        </motion.div>

        {/* Error State */}
        {error && (
          <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
            <AnnouncementErrorState error={error} onRetry={handleRetry} />
          </motion.div>
        )}

        {/* Loading State */}
        {isLoading && (
          <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
            <AnnouncementLoadingState />
          </motion.div>
        )}

        {/* Content */}
        {!isLoading && !error && (
          <>
            {/* Featured Announcement */}
            {featuredAnnouncement && (
              <motion.div 
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                className="relative"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-amethyst/20 via-coral/20 to-mint/20 rounded-3xl blur-lg opacity-60" />
                <div className="relative">
                  <FeaturedAnnouncementCard 
                    announcement={featuredAnnouncement}
                    onClick={() => setSelectedAnnouncement(featuredAnnouncement)}
                  />
                </div>
              </motion.div>
            )}

            {/* Announcements Grid */}
            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
              <AnnouncementGrid 
                announcements={announcements}
                onAnnouncementClick={setSelectedAnnouncement}
              />
            </motion.div>
          </>
        )}

        {/* Enhanced Detail Modal */}
        <AnnouncementDetailModal
          announcement={selectedAnnouncement}
          isOpen={!!selectedAnnouncement}
          onClose={() => setSelectedAnnouncement(null)}
        />
      </motion.div>
    </PageLayout>
  );
};

export default Pengumuman;
