import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { KaryaGallery } from "../components/karya/KaryaGallery";
import PageLayout from "../components/layouts/PageLayout";
import { SpotlightCarousel } from "../components/karya/SpotlightCarousel";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";
import {
  filterKaryaBySearchTerm,
  filterKaryaByTags,
  sortKaryaByRecency,
  sortKaryaByPopularity
} from "@/lib/karyaUtils";
import UploadButton from "../components/karya/UploadButton";

type KaryaType = Database['public']['Tables']['karya']['Row'];

const KaryaKami: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  
  const mainRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");
  
  // Simplified loading effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Centralized Karya data fetching
  const { data: karyaData, isLoading: isKaryaLoading, refetch } = useQuery({
    queryKey: ['karya'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('karya')
        .select('*')
        .eq('status', 'approved')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as KaryaType[];
    },
  });

  // Memoized filtered karya data for better performance
  const filteredKarya = useMemo(() => {
    if (!karyaData) return [];
    
    let result = [...karyaData];
    
    // Filter by category
    if (selectedCategory !== "all") {
      result = result.filter(item => item.category === selectedCategory);
    }
    
    // Sort by recency (default)
    result = sortKaryaByRecency(result, false);
    
    return result;
  }, [karyaData, selectedCategory]);

  // Memoized spotlight items
  const spotlightItems = useMemo(() => {
    if (!karyaData) return [];
    
    let spotlightCandidates = karyaData.filter(item => item.is_spotlight);
    
    // Filter by category if not "all"
    if (selectedCategory !== "all") {
      spotlightCandidates = spotlightCandidates.filter(item => item.category === selectedCategory);
    }
    
    // If no spotlight items, use first few items
    if (spotlightCandidates.length === 0 && filteredKarya.length > 0) {
      spotlightCandidates = filteredKarya.slice(0, 3);
    }
    
    return spotlightCandidates;
  }, [karyaData, selectedCategory, filteredKarya]);
  
  // Category selection handler
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  // Upload success handler
  const handleUploadSuccess = () => {
    refetch(); // Refresh the karya data
  };

  return (
    <PageLayout title="">
      <div
        ref={mainRef}
        className="relative min-h-screen w-full"
      >
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mb-12 pt-20 md:pt-28"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white font-serif">KARYA KAMI</h1>
          <p className="text-lg md:text-xl text-gray-300 mt-4 font-sans">
            Koleksi karya kreatif dari komunitas Our Creativity
          </p>
          
          {/* Upload Button */}
          <div className="mt-8">
            <UploadButton onSuccess={handleUploadSuccess} />
          </div>
        </motion.div>

        {/* Simplified Loading animation with standardized design */}
        <AnimatePresence>
          {isLoading && (
            <motion.div 
              className="fixed inset-0 bg-background z-50 flex items-center justify-center"
              initial={{ opacity: 1 }}
              exit={{ 
                opacity: 0,
                transition: { duration: 0.4, ease: "easeInOut" }
              }}
            >
              <motion.div
                className="relative w-16 h-16"
                animate={{ 
                  rotate: 360,
                }}
                transition={{
                  rotate: { duration: 1.2, repeat: Infinity, ease: "linear" }
                }}
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amethyst via-turquoise to-coral opacity-80 blur-sm" />
                <img 
                  src="/lovable-uploads/c861a7c0-5ec9-4bac-83ea-319c40fcb001.png"
                  alt="Loading..." 
                  className="absolute inset-0 w-full h-full object-contain"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Spotlight Carousel Section */}
        {spotlightItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-50px" }}
            className="mb-16"
          >
            <SpotlightCarousel spotlightItems={spotlightItems} />
          </motion.div>
        )}
        
        {/* Gallery Section with standardized components */}
        <section className="mt-6 mb-16 relative z-10">
          <KaryaGallery 
            karyaData={filteredKarya}
            isLoading={isKaryaLoading}
            selectedCategory={selectedCategory}
            onSelectCategory={handleCategorySelect}
          />
        </section>
      </div>
    </PageLayout>
  );
};

export default KaryaKami;
