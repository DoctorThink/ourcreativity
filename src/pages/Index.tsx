// src/pages/Index.tsx
import React from 'react'; // Ensure React is imported
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { BookOpen, Info, Bell, ScrollText, Users, ImageIcon } from "lucide-react";

const Index: React.FC = () => { // Explicitly type as Functional Component
  const navigate = useNavigate();

  // --- Animation Variants ---
  const gridContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      }
    }
  };

  const gridItemVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 15 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.6, 0.01, -0.05, 0.95]
      }
    }
  };

  // --- Bento Grid Tile Configuration ---
  const tileData = {
    title: {
      id: "title",
      gridPosition: "col-start-1 col-end-4 row-start-1 row-end-3",
      content: (
        <div className="flex flex-col justify-center h-full p-6 md:p-8 text-left">
           <motion.h1
            className="text-4xl lg:text-5xl font-serif font-bold mb-3 text-foreground leading-tight home-title"
             animate={{ textShadow: ["0 0 5px rgba(155,109,255,0.3)", "0 0 10px rgba(155,109,255,0.3)", "0 0 5px rgba(155,109,255,0.3)"]}}
             transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
             OUR CREATIVITY
           </motion.h1>
           <p className="text-md lg:text-lg text-foreground/80 font-sans max-w-md">
             Dimana imajinasi bertemu dengan inovasi. Bergabunglah dengan komunitas kreatif kami.
           </p>
        </div>
      ),
      bgColor: "bg-foreground/5",
      baseBorder: "border border-foreground/20", // Ensure border class is explicit
    },
    logoFish: {
      id: "logo-fish",
      gridPosition: "col-start-4 col-end-5 row-start-1 row-end-2",
      content: (
         <div className="flex items-center justify-center h-full">
            <img src="/lovable-uploads/c861a7c0-5ec9-4bac-83ea-319c40fcb001.png" alt="Fish Logo" className="w-16 h-16 object-contain transition-transform duration-300 group-hover:scale-110" loading="eager" />
         </div>
      ),
      bgColor: "bg-gradient-to-br from-lavender/10 to-amethyst/10",
      baseBorder: "border border-transparent",
    },
    cerita: {
      id: "cerita",
      gridPosition: "col-start-5 col-end-6 row-start-1 row-end-2",
      icon: BookOpen, text: "Cerita Kami", href: "/brand-story",
      bgColor: "bg-gradient-to-br from-lavender/5 to-amethyst/5",
      baseBorder: "border border-transparent",
    },
    tim: {
      id: "tim",
      gridPosition: "col-start-4 col-end-5 row-start-2 row-end-3",
      icon: Users, text: "Tim Kami", href: "/tim-kami",
      bgColor: "bg-gradient-to-br from-mint/5 to-turquoise/5",
      baseBorder: "border border-transparent",
    },
    syarat: {
      id: "syarat",
      gridPosition: "col-start-5 col-end-6 row-start-2 row-end-3",
      icon: ScrollText, text: "Syarat & Ketentuan", href: "/terms",
      bgColor: "bg-gradient-to-br from-peach/5 to-coral/5",
      baseBorder: "border border-transparent",
    },
    informasi: {
      id: "informasi",
      gridPosition: "col-start-1 col-end-2 row-start-3 row-end-4",
      icon: Info, text: "Informasi", href: "/informasi",
      bgColor: "bg-gradient-to-br from-softPink/5 to-amber/5",
      baseBorder: "border border-transparent",
    },
    pengumuman: {
      id: "pengumuman",
      gridPosition: "col-start-2 col-end-3 row-start-3 row-end-4",
      icon: Bell, text: "Pengumuman", href: "/pengumuman",
      bgColor: "bg-gradient-to-br from-turquoise/5 to-mint/5",
      baseBorder: "border border-transparent",
    },
    karya: {
      id: "karya",
      gridPosition: "col-start-3 col-end-4 row-start-3 row-end-4",
      icon: ImageIcon,
      text: "Karya",
      href: null,
      content: (
          <div className="flex flex-col items-center justify-center h-full gap-2 p-4 text-center relative">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center bg-foreground/5 backdrop-blur-sm">
                 <ImageIcon className="w-5 h-5 md:w-6 md:h-6 text-foreground/40" />
              </div>
              <span className="text-xs md:text-sm font-serif text-foreground/60">
                  Karya
              </span>
              <span className="coming-soon-label">Coming Soon</span>
          </div>
      ),
      bgColor: "bg-foreground/5",
      baseBorder: "border border-foreground/10",
      isComingSoon: true,
    }
  };

  // Order doesn't affect grid position, only DOM order if CSS grid wasn't used
  const bentoTiles = [
     tileData.title, tileData.logoFish, tileData.cerita, tileData.tim,
     tileData.syarat, tileData.informasi, tileData.pengumuman, tileData.karya
  ];

  console.log("Index component rendering..."); // DEBUG LOG

  return (
    // Main container with animated gradient background
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen overflow-hidden relative animated-gradient-background"
    >
       {/* Centering container */}
      <div className="relative z-10 container mx-auto px-4 py-12 md:py-16 min-h-screen flex items-center justify-center">
         {/* Grid definition */}
        <motion.div
          className="grid grid-cols-5 grid-rows-3 gap-4 md:gap-5 w-full max-w-4xl aspect-[4/2.5]"
          variants={gridContainerVariants}
          initial="hidden"
          animate="visible"
          style={{ perspective: '1000px' }}
        >
           {/* Map through the defined tiles */}
          {bentoTiles.map((tile) => {
            // Destructure with defaults just in case
            const {
              id,
              gridPosition = '',
              content = null,
              bgColor = 'bg-secondary', // Fallback color
              baseBorder = 'border border-border', // Fallback border
              icon: Icon = null,
              text = '',
              href = null,
              isComingSoon = false
            } = tile || {}; // Add default empty object

            // Basic check if tile data exists
            if (!id) {
              console.error("Missing tile ID in bentoTiles array");
              return null; // Skip rendering this tile if ID is missing
            }

            const isClickable = !!href;
            const MotionComponent = isClickable && !href?.startsWith('/') ? motion.a : motion.div;

            return (
              <MotionComponent
                key={id}
                variants={gridItemVariants}
                className={`relative group overflow-hidden rounded-2xl backdrop-blur-lg
                           ${baseBorder} ${bgColor} ${gridPosition}
                           glowing-border-effect transition-all duration-300
                           ${isClickable ? 'cursor-pointer' : 'cursor-default'}
                           ${isComingSoon ? 'opacity-80' : ''}
                           `}
                href={isClickable && !href?.startsWith('/') ? href : undefined}
                onClick={isClickable && href?.startsWith('/') ? (e: React.MouseEvent<HTMLDivElement>) => { e.preventDefault(); navigate(href); } : undefined} // Type the event
                target={isClickable && !href?.startsWith('/') ? '_blank' : undefined}
                rel={isClickable && !href?.startsWith('/') ? 'noopener noreferrer' : undefined}

                 // Simplified continuous animation - Subtle Y float
                 animate={{ y: [0, -1.5, 0] }}
                 transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: Math.random() * 0.5 // Reduced random delay variation
                 }}

                whileHover={{
                  scale: isClickable ? 1.04 : 1.01,
                  y: -4,
                  transition: { duration: 0.2, ease: "easeOut" }
                }}
                whileTap={isClickable ? { scale: 0.98 } : {}}
                layout
              >
                 {/* Render content: Standard Icon/Text or Custom Content */}
                {(Icon && text && !isComingSoon) ? (
                  <div className="flex flex-col items-center justify-center h-full gap-2 p-4 text-center transition-glow">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center bg-foreground/5 group-hover:bg-foreground/10 backdrop-blur-sm transition-colors duration-300">
                       {Icon && <Icon className="w-5 h-5 md:w-6 md:h-6 transition-transform duration-300 group-hover:scale-110 text-foreground" />}
                     </div>
                     <span className="text-xs md:text-sm font-serif transition-all duration-300 text-foreground">{text}</span>
                  </div>
                ) : (
                  // Render custom content
                  <div className="transition-glow h-full">
                     {content}
                  </div>
                )}
              </MotionComponent>
            );
          })}
        </motion.div>
      </div>

       {/* --- Footer --- */}
      <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.8 }}
          className="absolute bottom-0 left-0 right-0 z-20 pt-8 pb-6 text-center"
        >
         <div className="backdrop-blur-xl bg-background/40 border border-foreground/10 rounded-full px-6 py-3 inline-block relative overflow-hidden group hover:border-foreground/20 transition-colors duration-300 shadow-lg">
            <span className="absolute inset-0 bg-gradient-to-r from-amethyst/0 via-amethyst/10 to-amethyst/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></span>
             <p className="text-xs text-foreground/60 group-hover:text-foreground/70 transition-colors duration-300 font-sans">
              © 2024 OUR CREATIVITY • Designed by{' '}
               <a
                href="https://www.instagram.com/ardel.yo"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground hover:underline underline-offset-2"
              >
                @ardel.yo
              </a>
             </p>
          </div>
       </motion.div>
    </motion.div>
  );
};

export default Index; // Ensure default export
