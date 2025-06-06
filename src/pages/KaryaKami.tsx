
import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { KaryaGallery } from "../components/karya/KaryaGallery";
import PageLayout from "../components/layouts/PageLayout";
import { SpotlightSection } from "../components/karya/SpotlightSection";
import FloatingNav from "../components/karya/FloatingNav";
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

type KaryaType = Database['public']['Tables']['karya']['Row'];

const KaryaKami: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  
  const mainRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");
  
  // Optimized scroll-triggered animations with reduced calculations
  const { scrollYProgress } = useScroll({
    target: mainRef,
    offset: ["start start", "end start"]
  });
  
  // Reduced transform calculations for better performance
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const headerY = useTransform(scrollYProgress, [0, 0.1], [0, -20]);
  
  // Optimized loading effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Centralized Karya data fetching
  const { data: karyaData, isLoading: isKaryaLoading } = useQuery({
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

  // Dummy handlers for FloatingNav props (no longer used)
  const toggleFilters = () => {};

  return (
    <PageLayout title="">
      <motion.div
        ref={mainRef}
        className="relative min-h-screen w-full overflow-hidden"
        style={{
          willChange: 'transform',
          transform: 'translateZ(0)', // Force GPU acceleration
        }}
      >
        {/* Optimized Loading animation */}
        <AnimatePresence>
          {isLoading && (
            <motion.div 
              className="fixed inset-0 bg-background z-50 flex items-center justify-center"
              initial={{ opacity: 1 }}
              exit={{ 
                opacity: 0,
                transition: { duration: 0.6, ease: "easeInOut" }
              }}
              style={{
                willChange: 'opacity',
                transform: 'translateZ(0)',
              }}
            >
              <motion.div
                className="relative w-20 h-20"
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  rotate: { duration: 1.5, repeat: Infinity, ease: "linear" },
                  scale: { duration: 0.8, repeat: Infinity, ease: "easeInOut" }
                }}
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amethyst via-turquoise to-coral opacity-80 blur-md" />
                <img 
                  src="/lovable-uploads/c861a7c0-5ec9-4bac-83ea-319c40fcb001.png"
                  alt="Loading..." 
                  className="absolute inset-0 w-full h-full object-contain"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Floating Navigation */}
        <FloatingNav toggleFilters={toggleFilters} showFilters={false} />
        
        {/* Header Section with optimized motion effects */}
        <motion.div 
          style={{ y: headerY, opacity: headerOpacity }}
          className="pt-16 pb-12 px-4 text-center relative z-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="relative inline-block"
          >
            <h1 className="text-4xl md:text-6xl font-serif font-bold bg-clip-text text-transparent bg-gradient-to-r from-amethyst via-white to-turquoise tracking-tight">
              Karya Kami
            </h1>
            <motion.div
              className="h-1 w-0 bg-gradient-to-r from-amethyst to-turquoise mt-2 rounded-full mx-auto"
              initial={{ width: 0 }}
              animate={{ width: "80%" }}
              transition={{ delay: 0.6, duration: 1, ease: "easeOut" }}
            />
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-foreground/70 mt-4 max-w-lg mx-auto text-base font-sans"
          >
            Temukan kreativitas tanpa batas dari komunitas kami
          </motion.p>
        </motion.div>
        
        {/* Spotlight Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-50px" }}
          className="mb-12"
        >
          <SpotlightSection spotlightItems={spotlightItems} />
        </motion.div>
        
        {/* Gallery Section */}
        <motion.section 
          className="mt-6 mb-16 relative z-10"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-50px" }}
            className="container mx-auto px-4 mb-6"
          >
            <h2 className="text-xl md:text-2xl font-semibold relative inline-block font-serif">
              Gallery Karya
              <motion.div
                className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-amethyst to-transparent rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ delay: 0.2, duration: 0.6 }}
                viewport={{ once: true }}
              />
            </h2>
          </motion.div>
          
          <KaryaGallery 
            karyaData={filteredKarya}
            isLoading={isKaryaLoading}
            selectedCategory={selectedCategory}
            onSelectCategory={handleCategorySelect}
          />
        </motion.section>
      </motion.div>
    </PageLayout>
  );
};

export default KaryaKami;
