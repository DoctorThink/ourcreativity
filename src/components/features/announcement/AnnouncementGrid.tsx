
import React from "react";
import { motion } from "framer-motion";
import { Announcement } from "@/models/Announcement";
import { CleanAnnouncementCard } from "./CleanAnnouncementCard";
import { EmptyAnnouncementState } from "./EmptyAnnouncementState";

interface AnnouncementGridProps {
  announcements: Announcement[];
  onAnnouncementClick: (announcement: Announcement) => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { 
      staggerChildren: 0.05,
      delayChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" }
  }
};

export const AnnouncementGrid: React.FC<AnnouncementGridProps> = ({
  announcements,
  onAnnouncementClick,
}) => {
  if (announcements.length === 0) {
    return <EmptyAnnouncementState onShowAll={() => {}} />;
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {announcements.map((announcement) => (
        <motion.div 
          key={announcement.id} 
          variants={cardVariants}
          layout
        >
          <CleanAnnouncementCard 
            announcement={announcement}
            onClick={() => onAnnouncementClick(announcement)}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};
