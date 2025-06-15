
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import PageLayout from "../components/layouts/PageLayout";
import { useLocalAnnouncements } from "@/hooks/useLocalAnnouncements";
import { GlowarGrid } from "@/components/announcement/GlowarGrid";
import { GlowarFilterBar } from "@/components/announcement/GlowarFilterBar";
import { GlowarFeaturedCard } from "@/components/announcement/GlowarFeaturedCard";
import { AnnouncementDetailModal } from "@/components/announcement/AnnouncementDetailModal";
import { AnnouncementLoadingState } from "@/components/announcement/AnnouncementLoadingState";
import { AnnouncementErrorState } from "@/components/announcement/AnnouncementErrorState";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { 
      staggerChildren: 0.15,
      delayChildren: 0.1
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

  const [isFilterSticky, setIsFilterSticky] = useState(false);

  // Handle sticky filter bar
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsFilterSticky(scrollY > 300); // Increased threshold to avoid header overlap
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <PageLayout 
      title="Pengumuman" 
      subtitle="Informasi terbaru dan penting dari komunitas OUR CREATIVITY"
      className="bg-gradient-to-br from-background via-background to-secondary/20 min-h-screen"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-12 pt-8" // Added top padding to prevent header overlap
      >
        {/* Filter Bar with proper spacing */}
        <motion.div 
          variants={{ hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0 } }}
          className="relative z-40" // Lower z-index than header
        >
          <GlowarFilterBar 
            currentFilter={filter} 
            onFilterChange={setFilter}
            isSticky={isFilterSticky}
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
            {/* Featured Announcement with Dynamic Aurora Background */}
            {featuredAnnouncement && (
              <motion.div 
                variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
                className="relative"
              >
                <GlowarFeaturedCard 
                  announcement={featuredAnnouncement}
                  onClick={() => setSelectedAnnouncement(featuredAnnouncement)}
                />
              </motion.div>
            )}

            {/* GSAP Flip-enabled Grid */}
            <motion.div 
              variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
              className="pb-16"
            >
              <GlowarGrid 
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
