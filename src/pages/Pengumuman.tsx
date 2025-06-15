
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
      setIsFilterSticky(scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isLoading) {
    return (
      <PageLayout 
        title="Pengumuman" 
        subtitle="Informasi terbaru dan penting dari komunitas OUR CREATIVITY"
        className="bg-gradient-to-br from-background via-background to-secondary/20 min-h-screen"
      >
        <AnnouncementLoadingState />
      </PageLayout>
    );
  }

  if (error) {
    return (
      <PageLayout 
        title="Pengumuman" 
        subtitle="Informasi terbaru dan penting dari komunitas OUR CREATIVITY"
        className="bg-gradient-to-br from-background via-background to-secondary/20 min-h-screen"
      >
        <AnnouncementErrorState error={error} onRetry={handleRetry} />
      </PageLayout>
    );
  }

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
        className="space-y-12 pb-20"
      >
        {/* Filter Bar */}
        <motion.div 
          variants={{ hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0 } }}
          className="w-full"
        >
          <GlowarFilterBar 
            currentFilter={filter} 
            onFilterChange={setFilter}
            isSticky={isFilterSticky}
          />
        </motion.div>

        {/* Featured Announcement */}
        {featuredAnnouncement && (
          <motion.div 
            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
            className="relative w-full max-w-6xl mx-auto"
          >
            <GlowarFeaturedCard 
              announcement={featuredAnnouncement}
              onClick={() => setSelectedAnnouncement(featuredAnnouncement)}
            />
          </motion.div>
        )}

        {/* Announcements Grid */}
        <motion.div 
          variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
          className="w-full max-w-6xl mx-auto"
        >
          <GlowarGrid 
            announcements={announcements}
            onAnnouncementClick={setSelectedAnnouncement}
          />
        </motion.div>

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
