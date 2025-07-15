
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import JoinCommunityDialog from "../JoinCommunityDialog";

export const CTASection: React.FC = () => {
  const [isJoinDialogOpen, setIsJoinDialogOpen] = useState(false);

  const handleJoinClick = () => {
    setIsJoinDialogOpen(true);
  };

  return (
    <section className="py-20 px-4 sm:px-6 md:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
            Siap Menjadi Bagian dari Perjalanan Kami?
          </h2>
          
          <p className="text-lg text-foreground/70 font-sans mb-12 max-w-2xl mx-auto">
            Bergabunglah dengan komunitas kreator yang terus berkembang dan mulai wujudkan potensi kreatif Anda bersama kami.
          </p>

          <motion.button
            onClick={handleJoinClick}
            className="group relative px-12 py-4 bg-gradient-to-r from-amethyst via-turquoise to-coral rounded-full text-background font-semibold font-sans text-lg transition-all duration-300"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 0 30px rgba(155, 109, 255, 0.5)"
            }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="flex items-center gap-3">
              Ayo Gabung
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
            
            {/* Shimmer effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-300" />
          </motion.button>
        </motion.div>
      </div>
      
      <JoinCommunityDialog 
        open={isJoinDialogOpen} 
        onOpenChange={setIsJoinDialogOpen} 
      />
    </section>
  );
};
