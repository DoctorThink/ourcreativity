// src/pages/Index.tsx
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button"; // Keep button for potential use inside tiles if needed
import { BookOpen, Info, Bell, ScrollText, Users, Palette, Feather, Sparkles } from "lucide-react"; // Added more icons for variety
// Removed useTheme, useEffect, useState, useRef, useScroll, useTransform as scroll-based nav hiding is removed

const Index = () => {
  const navigate = useNavigate();
  // theme removed as it wasn't directly used in the render logic here, assuming handled globally or via CSS vars

  // --- Animation Variants ---
  // Stagger animation for the grid container
  const gridContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08, // Faster stagger for grid
        delayChildren: 0.2,
      }
    }
  };

  // Animation for individual grid items
  const gridItemVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 10 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  // --- Bento Grid Tile Content & Configuration ---
  // Combined static and dynamic tiles definition
  const bentoTiles = [
    {
      id: "title",
      colSpan: "col-span-2 md:col-span-3", // Spans more columns
      rowSpan: "row-span-2 md:row-span-2", // Spans more rows
      content: (
        <div className="flex flex-col justify-center h-full p-6 text-left">
           <motion.h1
            className="text-4xl lg:text-6xl font-serif font-bold mb-3 text-foreground leading-tight home-title"
             // Reuse existing title animation if desired, or simplify
             animate={{
               textShadow: ["0 0 5px rgba(155,109,255,0.3)", "0 0 10px rgba(155,109,255,0.3)", "0 0 5px rgba(155,109,255,0.3)"]
             }}
             transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
             OUR CREATIVITY
           </motion.h1>
           <p className="text-md lg:text-lg text-foreground/80 font-sans max-w-md">
             Dimana imajinasi bertemu dengan inovasi. Bergabunglah dengan komunitas kreatif kami.
           </p>
        </div>
      ),
      bgColor: "bg-foreground/5", // Standard background
      hoverEffect: "scale-102",
    },
    {
      id: "logo-fish",
      colSpan: "col-span-1",
      rowSpan: "row-span-1",
      content: (
         <div className="flex items-center justify-center h-full">
            <img
              src="/lovable-uploads/c861a7c0-5ec9-4bac-83ea-319c40fcb001.png"
              alt="Fish Logo"
              className="w-16 h-16 md:w-20 md:h-20 object-contain transition-transform duration-300 group-hover:scale-110"
              loading="eager"
            />
         </div>
      ),
      bgColor: "bg-gradient-to-br from-lavender/10 to-amethyst/10", // Accent background
      hoverEffect: "rotate-3 scale-105",
    },
     {
      id: "cerita",
      icon: BookOpen,
      text: "Cerita Kami",
      href: "/brand-story",
      colSpan: "col-span-1 md:col-span-1",
      rowSpan: "row-span-1",
      bgColor: "bg-gradient-to-br from-lavender/5 to-amethyst/5", // Subtle accent gradient
      decorColor: "border-lavender",
      hoverEffect: "scale-105 glow-lavender", // Custom glow class needed in CSS if used
    },
    {
      id: "tim",
      icon: Users,
      text: "Tim Kami",
      href: "/tim-kami",
      colSpan: "col-span-1 md:col-span-1",
      rowSpan: "row-span-1",
      bgColor: "bg-gradient-to-br from-mint/5 to-turquoise/5",
      decorColor: "border-mint",
      hoverEffect: "scale-105 glow-mint",
    },
    {
      id: "syarat",
      icon: ScrollText,
      text: "Syarat & Ketentuan",
      href: "/terms",
      colSpan: "col-span-1 md:col-span-1",
      rowSpan: "row-span-1",
      bgColor: "bg-gradient-to-br from-peach/5 to-coral/5",
      decorColor: "border-peach",
      hoverEffect: "scale-105 glow-peach",
    },
    {
      id: "informasi",
      icon: Info,
      text: "Informasi",
      href: "/informasi",
      colSpan: "col-span-1 md:col-span-1",
      rowSpan: "row-span-1",
      bgColor: "bg-gradient-to-br from-softPink/5 to-amber/5",
      decorColor: "border-softPink",
      hoverEffect: "scale-105 glow-softPink",
    },
    {
      id: "pengumuman",
      icon: Bell,
      text: "Pengumuman",
      href: "/pengumuman",
      colSpan: "col-span-1 md:col-span-1",
      rowSpan: "row-span-1",
      bgColor: "bg-gradient-to-br from-turquoise/5 to-mint/5",
      decorColor: "border-turquoise",
      hoverEffect: "scale-105 glow-turquoise",
    },
     {
      id: "visual-accent", // Example of a purely visual tile
      colSpan: "col-span-1 md:col-span-1",
      rowSpan: "row-span-1",
      content: (
        <div className="flex items-center justify-center h-full relative overflow-hidden">
           {/* Example: Animated color blobs */}
           <motion.div
             className="absolute w-1/2 h-1/2 bg-lavender/30 rounded-full blur-lg -top-1/4 -left-1/4"
             animate={{ scale: [1, 1.2, 1], opacity: [0.7, 0.5, 0.7] }}
             transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
           />
           <motion.div
             className="absolute w-1/2 h-1/2 bg-mint/30 rounded-full blur-lg -bottom-1/4 -right-1/4"
             animate={{ scale: [1, 1.2, 1], opacity: [0.6, 0.8, 0.6] }}
             transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
           />
           <Palette className="w-8 h-8 text-foreground/50 relative z-10" />
        </div>
      ),
      bgColor: "bg-foreground/5",
      hoverEffect: "scale-103",
    },
    // Add more tiles as needed (e.g., quotes, specific group links, etc.)
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen overflow-x-hidden relative perspective-1000 bg-background" // Keep bg-background
      // ref removed unless needed for other scroll effects later
    >
      {/* --- Re-usable Background Elements (Keep the cool background!) --- */}
      <div className="fixed inset-0 -z-10">
        <motion.div
          className="absolute w-[70vw] h-[70vh] rounded-full blur-[120px] bg-amethyst/5 -top-[20%] -right-[20%]"
          animate={{ y: [0, -15, 0], opacity: [0.5, 0.7, 0.5] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-[50vw] h-[50vh] rounded-full blur-[100px] bg-turquoise/5 -bottom-[10%] -left-[10%]"
          animate={{ y: [0, 15, 0], opacity: [0.5, 0.3, 0.5] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-[40vw] h-[40vh] rounded-full blur-[80px] bg-coral/5 bottom-[30%] right-[5%]"
          animate={{ x: [0, 10, 0], opacity: [0.4, 0.6, 0.4] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 topo-layer opacity-30" />
        <div className="absolute inset-0 geometric-dot-pattern opacity-30" />
        <div className="absolute inset-0 geometric-line-pattern opacity-20" />
        {/* Keep other background elements if desired (lines, floating shapes etc.) */}
         <motion.div
          className="absolute top-[15%] left-[15%] w-16 h-16 border border-lavender/20 rounded-full"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformStyle: "preserve-3d", transform: "translateZ(30px)" }}
        />
         <motion.div
          className="absolute bottom-[25%] right-[25%] w-24 h-24 border border-mint/20 rounded-full"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          style={{ transformStyle: "preserve-3d", transform: "translateZ(20px)" }}
        />
         <motion.div
          className="absolute top-[40%] right-[10%] w-12 h-12 border border-peach/20 morphing-blob" // Ensure .morphing-blob CSS exists if needed
          animate={{ y: [0, -10, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          style={{ transformStyle: "preserve-3d", transform: "translateZ(40px)" }}
        />
      </div>

      {/* --- Main Content Area: Bento Grid --- */}
      <div className="relative z-10 container mx-auto px-4 py-16 md:py-24 min-h-screen flex items-center"> {/* Center grid vertically */}
        <motion.div
          className="grid grid-cols-3 md:grid-cols-5 gap-4 md:gap-6 w-full auto-rows-[120px] md:auto-rows-[150px]" // Define grid structure
          variants={gridContainerVariants}
          initial="hidden"
          animate="visible"
        >
          {bentoTiles.map((tile) => {
            const { id, colSpan, rowSpan, content, bgColor, decorColor, icon: Icon, text, href, hoverEffect } = tile;

             // Basic hover classes from string
             const hoverClasses = hoverEffect?.split(' ').map(eff => `group-hover:${eff}`).join(' ') || '';

             // Determine if tile is clickable
             const isClickable = !!href;
             const MotionComponent = isClickable ? motion.button : motion.div;

            return (
              <MotionComponent
                key={id}
                variants={gridItemVariants}
                className={`relative group overflow-hidden rounded-2xl backdrop-blur-lg border border-foreground/10 transition-all duration-300 cursor-pointer ${colSpan} ${rowSpan} ${bgColor} ${hoverClasses} ${isClickable ? '' : 'cursor-default'}`}
                onClick={isClickable ? () => navigate(href) : undefined}
                whileHover={isClickable ? { y: -4 } : {}} // Simple lift on hover for clickable
                whileTap={isClickable ? { scale: 0.97 } : {}}
                // Apply layout prop for smooth resizing if grid structure changes dynamically
                layout 
              >
                {/* Optional: Decorative border accent */}
                {decorColor && (
                   <div className={`absolute -bottom-4 -right-4 w-12 h-12 ${decorColor} rounded-full border opacity-20 group-hover:opacity-30 transition-all duration-500 group-hover:scale-110`} />
                 )}
                 {decorColor && (
                   <div className={`absolute -top-4 -left-4 w-10 h-10 ${decorColor} rounded-full border opacity-10 group-hover:opacity-20 transition-all duration-500 group-hover:scale-110`} />
                 )}

                 {/* Shimmer effect on hover for clickable items */}
                 {isClickable && (
                    <span className="absolute inset-0 bg-shimmer-gradient bg-[length:200%_100%] opacity-0 group-hover:opacity-10 group-hover:animate-shimmer" /> // Ensure shimmer CSS exists
                  )}

                {/* Render Icon and Text for navigation tiles */}
                {Icon && text ? (
                  <div className="flex flex-col items-center justify-center h-full gap-2 p-4 text-center">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center bg-foreground/10 backdrop-blur-sm transition-all duration-300 group-hover:bg-foreground/20">
                       <Icon className="w-5 h-5 md:w-6 md:h-6 transition-transform duration-300 group-hover:scale-110 text-foreground" />
                     </div>
                     <span className="text-xs md:text-sm font-serif transition-all duration-300 text-foreground">{text}</span>
                  </div>
                ) : (
                  // Render custom content for non-standard tiles
                  content
                )}
              </MotionComponent>
            );
          })}
        </motion.div>
      </div>

      {/* --- Footer (Keep the existing footer) --- */}
      <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }} // Adjust delay based on grid animation
          className="absolute bottom-0 left-0 right-0 z-10 pt-8 pb-6 text-center" // Position footer absolutely
        >
         <div className="backdrop-blur-xl bg-foreground/5 border border-foreground/10 rounded-full px-6 py-3 inline-block relative overflow-hidden group hover:border-foreground/20 transition-colors duration-300">
            <span className="absolute inset-0 bg-gradient-to-r from-amethyst/0 via-amethyst/5 to-amethyst/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></span>
             <p className="text-xs text-foreground/50 group-hover:text-foreground/60 transition-colors duration-300">
              © 2024 OUR CREATIVITY • Designed by Ardellio S. A.
             </p>
          </div>
       </motion.div>

    </motion.div>
  );
};

export default Index;
