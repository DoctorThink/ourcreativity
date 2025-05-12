
import React from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export const AnnouncementLoading: React.FC = () => (
  <div className="flex flex-col items-center justify-center py-12 sm:py-16">
    <motion.div
      animate={{ 
        rotate: 360,
      }}
      transition={{ 
        repeat: Infinity, 
        duration: 1.5,
        ease: "linear" 
      }}
    >
      <Loader2 className="w-8 h-8 sm:w-12 sm:h-12 text-amethyst" />
    </motion.div>
    <motion.p 
      className="text-foreground/70 text-sm sm:text-base mt-4 font-medium"
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
    >
      Memuat pengumuman...
    </motion.p>
  </div>
);
