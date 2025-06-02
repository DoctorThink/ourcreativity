
import React from "react";
import { motion } from "framer-motion";
import PageLayout from "../components/layouts/PageLayout";
import { useAnnouncements } from "@/hooks/useAnnouncements";
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
  } = useAnnouncements();

  return (
    <PageLayout 
      title="Pengumuman" 
      subtitle="Informasi terbaru dan penting dari komunitas OUR CREATIVITY"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        {/* Filters */}
        <motion.div variants={{ hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0 } }}>
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
          <AnnouncementLoadingState />
        )}

        {/* Content */}
        {!isLoading && !error && (
          <>
            {/* Featured Announcement */}
            {featuredAnnouncement && (
              <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                <FeaturedAnnouncementCard 
                  announcement={featuredAnnouncement}
                  onClick={() => setSelectedAnnouncement(featuredAnnouncement)}
                />
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

        {/* Detail Modal */}
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
