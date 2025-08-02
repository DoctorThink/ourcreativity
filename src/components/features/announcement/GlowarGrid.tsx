
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Announcement } from "@/models/Announcement";
import { GlowarCard } from "./GlowarCard";
import { EmptyAnnouncementState } from "./EmptyAnnouncementState";

interface GlowarGridProps {
  announcements: Announcement[];
  onAnnouncementClick: (announcement: Announcement) => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { 
      staggerChildren: 0.08,
      delayChildren: 0.2
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: { 
      type: "spring",
      stiffness: 300,
      damping: 25
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.9,
    transition: { duration: 0.2 }
  }
};

export const GlowarGrid: React.FC<GlowarGridProps> = ({
  announcements,
  onAnnouncementClick,
}) => {
  if (announcements.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <EmptyAnnouncementState onShowAll={() => {}} />
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      <AnimatePresence mode="popLayout">
        {announcements.map((announcement) => (
          <motion.div 
            key={announcement.id}
            variants={cardVariants}
            layout
            layoutId={`card-${announcement.id}`}
            exit="exit"
          >
            <GlowarCard 
              announcement={announcement}
              onClick={() => onAnnouncementClick(announcement)}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};
