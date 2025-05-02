
import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { KaryaGallery } from "../components/karya/KaryaGallery";
import PageLayout from "../components/layouts/PageLayout";
import { SpotlightSection } from "../components/karya/SpotlightSection";
import FloatingNav from "../components/karya/FloatingNav";
import AdvancedFilters from "../components/karya/AdvancedFilters";
import CategoryExplorer from "../components/karya/CategoryExplorer";
import { CustomCursor } from "../components/karya/CustomCursor";
import { ParticleBackground } from "../components/karya/ParticleBackground";
import { ScrollProgressIndicator } from "../components/karya/ScrollProgressIndicator";
import { useMediaQuery } from "@/hooks/use-media-query";

const KaryaKami: React.FC = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const mainRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");
  
  // Scroll-triggered animations
  const { scrollYProgress } = useScroll({
    target: mainRef,
    offset: ["start start", "end start"]
  });
  
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const headerScale = useTransform(scrollYProgress, [0, 0.1], [1, 0.95]);
  const headerY = useTransform(scrollYProgress, [0, 0.1], [0, -20]);
  
  // Loading effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Parallax scrolling effect
  const titleParallax = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const galleryParallax = useTransform(scrollYProgress, [0, 0.5], [50, 0]);
  
  // Filter toggle handler
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };
  
  // Category selection handler
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <>
      <CustomCursor />
      <PageLayout title="">
        <ParticleBackground />
        <motion.div
          ref={mainRef}
          className="relative min-h-screen w-full overflow-hidden"
        >
          {/* Loading animation */}
          <AnimatePresence>
            {isLoading && (
              <motion.div 
                className="fixed inset-0 bg-background z-50 flex items-center justify-center"
                initial={{ opacity: 1 }}
                exit={{ 
                  opacity: 0,
                  transition: { duration: 0.8, ease: "easeInOut" }
                }}
              >
                <motion.div
                  className="relative w-24 h-24"
                  animate={{ 
                    rotate: 360,
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                    scale: { duration: 1, repeat: Infinity, ease: "easeInOut" }
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
          <FloatingNav toggleFilters={toggleFilters} showFilters={showFilters} />
          
          {/* Header Section with motion effects */}
          <motion.div 
            style={{ y: titleParallax, opacity: headerOpacity, scale: headerScale }}
            className="pt-10 pb-16 px-4 text-center relative z-10"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="relative inline-block"
            >
              <h1 className="text-5xl md:text-7xl font-serif font-bold bg-clip-text text-transparent bg-gradient-to-r from-amethyst via-white to-turquoise tracking-tight">
                Karya Kami
              </h1>
              <motion.div
                className="h-1 w-0 bg-gradient-to-r from-amethyst to-turquoise mt-2 rounded-full mx-auto"
                initial={{ width: 0 }}
                animate={{ width: "80%" }}
                transition={{ delay: 0.8, duration: 1.2, ease: "easeOut" }}
              />
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="text-foreground/70 mt-6 max-w-xl mx-auto text-lg"
            >
              Temukan kreativitas tanpa batas dari komunitas kami
            </motion.p>
          </motion.div>
          
          {/* Advanced Filters - expandable section */}
          <AnimatePresence>
            {showFilters && (
              <AdvancedFilters onSelectCategory={handleCategorySelect} selectedCategory={selectedCategory} />
            )}
          </AnimatePresence>
          
          {/* Category Explorer - 3D hover effects */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mb-12"
          >
            <CategoryExplorer onSelectCategory={handleCategorySelect} selectedCategory={selectedCategory} />
          </motion.div>
          
          {/* Spotlight Section with enhanced animations */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mb-16"
          >
            <SpotlightSection />
          </motion.div>
          
          {/* Gallery Section with motion effects */}
          <motion.section 
            style={{ y: galleryParallax }}
            className="mt-8 mb-20 relative z-10"
          >
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "-100px" }}
              className="container mx-auto px-4 mb-8"
            >
              <h2 className="text-2xl md:text-3xl font-semibold relative inline-block">
                Gallery Karya
                <motion.div
                  className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-amethyst to-transparent rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  viewport={{ once: true }}
                />
              </h2>
            </motion.div>
            
            <KaryaGallery />
          </motion.section>
          
          {/* Scroll progress indicator */}
          <ScrollProgressIndicator />
        </motion.div>
      </PageLayout>
    </>
  );
};

export default KaryaKami;
