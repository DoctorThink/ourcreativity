
import React from "react";
import { motion } from "framer-motion";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyAnnouncementStateProps {
  onShowAll: () => void;
}

export const EmptyAnnouncementState: React.FC<EmptyAnnouncementStateProps> = ({ onShowAll }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="col-span-full text-center py-12 sm:py-16 bg-secondary/30 rounded-2xl backdrop-blur-sm border border-white/5"
  >
    <Bell className="w-10 h-10 sm:w-12 sm:h-12 text-foreground/30 mx-auto mb-4" />
    <p className="text-foreground/70 text-sm sm:text-lg font-medium">Belum ada pengumuman untuk kategori ini</p>
    <Button 
      variant="outline" 
      className="mt-4 bg-foreground/5 border-foreground/10 hover:bg-foreground/10 text-xs sm:text-sm"
      onClick={onShowAll}
    >
      Lihat semua pengumuman
    </Button>
  </motion.div>
);
