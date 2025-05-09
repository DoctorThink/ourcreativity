
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
    className="col-span-full text-center py-12 sm:py-16"
  >
    <Bell className="w-8 h-8 sm:w-12 sm:h-12 text-foreground/30 mx-auto mb-4" />
    <p className="text-foreground/60 text-sm sm:text-lg">Belum ada pengumuman untuk kategori ini</p>
    <Button 
      variant="outline" 
      className="mt-4 bg-foreground/5 border-foreground/10 text-xs sm:text-sm"
      onClick={onShowAll}
    >
      Lihat semua pengumuman
    </Button>
  </motion.div>
);
