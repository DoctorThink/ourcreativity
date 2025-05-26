
import React from "react";
import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AnnouncementErrorStateProps {
  error: string;
  onRetry: () => void;
}

export const AnnouncementErrorState: React.FC<AnnouncementErrorStateProps> = ({ 
  error, 
  onRetry 
}) => (
  <motion.div 
    className="mb-8 rounded-xl bg-red-500/10 backdrop-blur-sm border border-red-500/20 p-6 text-center"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
    <p className="text-foreground/90 text-base sm:text-lg mb-4 font-medium">{error}</p>
    <Button onClick={onRetry} variant="default" className="bg-red-500 hover:bg-red-600 text-sm">
      Coba Lagi
    </Button>
  </motion.div>
);
