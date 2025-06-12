
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Database } from "@/integrations/supabase/types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import KaryaCard from "../KaryaCard";
import KaryaDetailDialog from "../KaryaDetailDialog";

type KaryaType = Database['public']['Tables']['karya']['Row'];

interface SpotlightCarouselProps {
  spotlightItems: KaryaType[];
}

export const SpotlightCarousel: React.FC<SpotlightCarouselProps> = ({ spotlightItems }) => {
  const [selectedKarya, setSelectedKarya] = useState<KaryaType | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleKaryaClick = (karya: KaryaType) => {
    setSelectedKarya(karya);
    setIsDialogOpen(true);
  };

  if (!spotlightItems || spotlightItems.length === 0) {
    return null;
  }

  return (
    <section className="mb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-sans">
          Spotlight Karya
        </h2>
        <p className="text-foreground/70 text-lg font-medium">
          Karya pilihan terbaik dari komunitas kami
        </p>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="relative px-4 md:px-8"
      >
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-7xl mx-auto"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {spotlightItems.map((item, index) => (
              <CarouselItem 
                key={item.id} 
                className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    duration: 0.4, 
                    delay: index * 0.1,
                    ease: "easeOut" 
                  }}
                  className="spotlight-item transform-gpu"
                  style={{
                    '--tile-glow-color': item.category === 'design' 
                      ? 'rgba(152, 245, 225, 0.3)' 
                      : item.category === 'video' 
                      ? 'rgba(155, 109, 255, 0.3)' 
                      : item.category === 'meme' 
                      ? 'rgba(254, 198, 161, 0.3)' 
                      : 'rgba(255, 209, 220, 0.3)'
                  } as React.CSSProperties}
                >
                  <KaryaCard 
                    karya={item} 
                    onClick={() => handleKaryaClick(item)}
                  />
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          <CarouselPrevious className="hidden md:flex -left-12 bg-secondary/80 backdrop-blur-md border-border/40 hover:bg-secondary/90 text-foreground" />
          <CarouselNext className="hidden md:flex -right-12 bg-secondary/80 backdrop-blur-md border-border/40 hover:bg-secondary/90 text-foreground" />
        </Carousel>
      </motion.div>

      {/* Detail Dialog */}
      {selectedKarya && (
        <KaryaDetailDialog
          karya={selectedKarya}
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
        />
      )}
    </section>
  );
};
