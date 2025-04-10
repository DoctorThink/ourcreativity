// src/pages/Index.tsx
import React from 'react';
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { BookOpen, Info, Bell, ScrollText, Users, Palette, Feather, Clock, Code, Instagram, ExternalLink } from "lucide-react"; // Added ExternalLink
import { cn } from "@/lib/utils"; // Assuming utils.ts is in src/lib


// Define the type for Bento Grid tiles
interface BentoTile {
  id: string;
  colSpan: string;
  rowSpan: string;
  mdColSpan?: string;
  mdRowSpan?: string;
  content?: React.ReactNode; // Content can be any renderable React node
  bgColor: string;
  accentColorClass?: string;
  iconColorClass?: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>; // Type for icon components like Lucide
  text?: string;
  href?: string;
  isInteractive: boolean;
  comingSoon?: boolean; // Optional: Indicates if the tile feature is coming soon
  isWidget?: boolean; // Optional: Indicates if the tile is a widget style
  backdropBlur?: boolean; // Optional: Apply backdrop blur effect
  glowColorVar?: string; // Optional: CSS variable name for glow color
}

const Index = () => {
  const navigate = useNavigate();

  // --- Animation Variants ---
  const gridContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.15, // Slightly later start
      }
    }
  };

  const gridItemVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    }
  };

  // --- Enhanced Hover Animation with Glow ---
  const interactiveHover = {
    y: -5, // Slightly more lift
    scale: 1.04, // Slightly more scale
    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.4)", // Enhanced shadow
    transition: { type: "spring", stiffness: 300, damping: 18 }
  };

  const interactiveTap = {
    scale: 0.97, // Slightly more pronounced tap
    transition: { type: "spring", stiffness: 400, damping: 20 }
  };


  // --- Bento Grid Tile Configuration (Updated Positions, Styles) ---
  const bentoTiles: BentoTile[] = [
    // Row 1
    {
      id: "title",
      colSpan: "col-span-2 sm:col-span-2",
      rowSpan: "row-span-2",
      mdColSpan: "md:col-span-2",
      mdRowSpan: "md:row-span-2",
      content: (
        <div className="flex flex-col justify-center h-full p-4 md:p-6 text-left">
          <motion.h1
            className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold mb-2 md:mb-3 text-foreground leading-tight home-title"
          >
            OUR CREATIVITY
          </motion.h1>
          <p className="text-sm sm:text-base lg:text-lg text-foreground/75 font-sans max-w-md text-readable"> {/* Increased readability */}
            Dimana imajinasi bertemu dengan inovasi. Bergabunglah dengan komunitas kreatif kami.
          </p>
        </div>
      ),
      bgColor: "bg-secondary/80", // Slightly transparent
      backdropBlur: true,
      isInteractive: false,
    },
    { // Widget 1: Cerita Kami
      id: "cerita",
      icon: BookOpen,
      text: "Cerita Kami",
      href: "/brand-story",
      colSpan: "col-span-1", rowSpan: "row-span-1", mdColSpan: "md:col-span-1", mdRowSpan: "md:row-span-1",
      bgColor: "bg-secondary/80",
      accentColorClass: "bg-amethyst", // Amethyst (Purple)
      iconColorClass: "text-background",
      glowColorVar: "--color-amethyst-glow", // CSS variable for glow
      isInteractive: true, isWidget: true, backdropBlur: true,
    },
    { // Widget 2: Tim Kami
      id: "tim",
      icon: Users,
      text: "Tim Kami",
      href: "/tim-kami",
      colSpan: "col-span-1", rowSpan: "row-span-1", mdColSpan: "md:col-span-1", mdRowSpan: "md:row-span-1",
      bgColor: "bg-secondary/80",
      accentColorClass: "bg-turquoise", // Turquoise
      iconColorClass: "text-background",
      glowColorVar: "--color-turquoise-glow",
      isInteractive: true, isWidget: true, backdropBlur: true,
    },
    // Row 2
    { // Widget 3: Syarat & Ketentuan
      id: "syarat",
      icon: ScrollText,
      text: "Syarat & Ketentuan",
      href: "/terms",
      colSpan: "col-span-1", rowSpan: "row-span-1", mdColSpan: "md:col-span-1", mdRowSpan: "md:row-span-1",
      bgColor: "bg-secondary/80",
      accentColorClass: "bg-coral", // Coral
      iconColorClass: "text-background",
      glowColorVar: "--color-coral-glow",
      isInteractive: true, isWidget: true, backdropBlur: true,
    },
    { // Widget 4: Informasi
      id: "informasi",
      icon: Info,
      text: "Informasi",
      href: "/informasi",
      colSpan: "col-span-1", rowSpan: "row-span-1", mdColSpan: "md:col-span-1", mdRowSpan: "md:row-span-1",
      bgColor: "bg-secondary/80",
      accentColorClass: "bg-softPink", // Soft Pink
      iconColorClass: "text-gray-900", // Darker text on light pink
      glowColorVar: "--color-softPink-glow",
      isInteractive: true, isWidget: true, backdropBlur: true,
    },
    // Row 3 *** SWAPPED POSITIONS ***
     { // Widget 5: Pengumuman (Now takes the first 2 columns)
      id: "pengumuman",
      icon: Bell,
      text: "Pengumuman",
      href: "/pengumuman",
      colSpan: "col-span-2 sm:col-span-2", rowSpan: "row-span-1", mdColSpan: "md:col-span-2", mdRowSpan: "md:row-span-1", // Changed Span
      bgColor: "bg-secondary/80",
      accentColorClass: "bg-mint", // Mint
      iconColorClass: "text-background",
      glowColorVar: "--color-mint-glow", // Using mint glow
      isInteractive: true, isWidget: true, backdropBlur: true,
    },
    { // Karya (Now Interactive - Takes the 3rd column)
      id: "karya",
      icon: Palette,
      text: "Karya Kami",
      href: "/karya-kami",
      colSpan: "col-span-1", 
      rowSpan: "row-span-1", 
      mdColSpan: "md:col-span-1", 
      mdRowSpan: "md:row-span-1",
      bgColor: "bg-secondary/80",
      accentColorClass: "bg-lavender", // Using lavender for creative theme
      iconColorClass: "text-background",
      glowColorVar: "--color-lavender-glow",
      isInteractive: true, 
      isWidget: true, 
      backdropBlur: true,
      comingSoon: false,
      content: (
        <div className="relative w-full h-full group">
          {/* Enhanced Shimmer Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 animate-shimmer-fast transition-opacity duration-500" />
          
          {/* BARU Tag */}
          <div className="absolute top-3 left-3 z-20">
            <div className="bg-gradient-to-r from-coral to-peach text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-lg border border-white/20 animate-pulse-subtle backdrop-blur-sm">
              BARU
            </div>
          </div>
          
          <div className="relative z-10 h-full w-full p-3 md:p-4 flex flex-col justify-center items-center text-center">
            <Palette className="w-7 h-7 md:w-8 md:h-8 mb-1.5" />
            <span className="text-sm md:text-base font-serif font-medium">Karya Kami</span>
          </div>
        </div>
      )
    },
    { // Logo Visual Accent
      id: "logo-visual",
      colSpan: "col-span-1", rowSpan: "row-span-1", mdColSpan: "md:col-span-1", mdRowSpan: "md:row-span-1",
      content: (
         <div className="flex items-center justify-center h-full relative overflow-hidden group">
            {/* Subtle Inner Glow */}
            <div className="absolute inset-0 bg-gradient-radial from-amethyst/15 via-transparent to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-300 blur-md"></div>
            <motion.img
              src="/lovable-uploads/c861a7c0-5ec9-4bac-83ea-319c40fcb001.png" // Fish logo
              alt="Logo Icon"
              className="w-12 h-12 md:w-16 md:h-16 object-contain relative z-10 transition-transform duration-300 group-hover:scale-110"
              loading="eager"
            />
         </div>
      ),
      bgColor: "bg-secondary/50", // More transparent
      backdropBlur: true,
      isInteractive: false, // Not clickable, but has hover effect
    },
    // Row 4 - Designer Credit (Updated with Link)
     {
      id: "designer-credit",
      colSpan: "col-span-2 sm:col-span-2", rowSpan: "row-span-1", mdColSpan: "md:col-span-4", mdRowSpan: "md:row-span-1",
      content: (
         <div className="flex items-center justify-center h-full text-center p-3 md:p-4">
           <p className="text-xs sm:text-sm text-foreground/60 font-sans flex items-center gap-2"> {/* Slightly brighter text */}
             <Code size={14} className="opacity-80"/>
             <span>© 2024 OUR CREATIVITY • Designed by</span>
             <a
                href="https://bit.ly/Ardelyo" // <<<<<<<<<<<< CHANGED LINK HERE
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-foreground/80 hover:text-foreground hover:underline transition-colors duration-200 group"
             >
                 @ardel.yo
                 {/* Replaced Instagram icon with generic ExternalLink icon */}
                 <ExternalLink size={12} className="opacity-70 group-hover:opacity-100 transition-opacity"/>
             </a>
           </p>
         </div>
      ),
      bgColor: "bg-secondary/80",
      backdropBlur: true,
      isInteractive: false,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen h-screen overflow-hidden relative bg-background flex flex-col"
    >
      {/* --- Enhanced Animated Background --- */}
      <div className="fixed inset-0 -z-20 overflow-hidden bg-background">
        {/* Animated Gradient Backgrounds */}
        <div className="absolute inset-0 opacity-60">
          {/* Primary moving gradients */}
          <div className="absolute w-[80vw] h-[80vh] rounded-full bg-gradient-radial from-amethyst/20 via-amethyst/5 to-transparent -top-[15%] -right-[15%] filter blur-[120px] animate-float"></div>
          <div className="absolute w-[70vw] h-[70vh] rounded-full bg-gradient-radial from-turquoise/20 via-turquoise/5 to-transparent -bottom-[15%] -left-[15%] filter blur-[150px] animate-float-slow"></div>
          <div className="absolute w-[60vw] h-[60vh] rounded-full bg-gradient-radial from-coral/15 via-coral/5 to-transparent -bottom-[5%] -right-[5%] filter blur-[130px] opacity-70 animate-float-reverse"></div>

          {/* Secondary subtle gradients */}
          <div className="absolute w-[40vw] h-[40vh] rounded-full bg-gradient-radial from-softPink/10 via-softPink/3 to-transparent top-[10%] left-[15%] filter blur-[100px] opacity-50 animate-float-slow-reverse"></div>
          <div className="absolute w-[35vw] h-[35vh] rounded-full bg-gradient-radial from-mint/15 via-mint/3 to-transparent bottom-[20%] right-[20%] filter blur-[90px] opacity-60 animate-pulse-slow"></div>
        </div>

        {/* Noise Overlay */}
        <div className="absolute inset-0 noise-pattern opacity-[0.04] z-10"></div>

        {/* Subtle grid overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] z-0"></div>
      </div>

      {/* --- Main Content Area: Bento Grid --- */}
      <div className="relative z-10 container mx-auto p-3 sm:p-4 md:p-6 flex-grow flex items-center justify-center h-full">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 w-full h-full max-h-[calc(100vh-6rem)] md:max-h-[calc(100vh-8rem)]"
          style={{ gridAutoRows: 'minmax(0, 1fr)' }}
          variants={gridContainerVariants}
          initial="hidden"
          animate="visible"
        >
          {bentoTiles.map((tile) => {
            const {
                id, colSpan, rowSpan, mdColSpan, mdRowSpan, content, bgColor,
                accentColorClass, iconColorClass, icon: Icon, text, href, isInteractive,
                comingSoon, isWidget, backdropBlur, glowColorVar // Removed textColor
            } = tile;

            const MotionComponent = motion.div;

            return (
              <MotionComponent
                key={id}
                layout // Enable smooth layout transitions if grid changes
                variants={gridItemVariants}
                className={cn(
                    `relative group overflow-hidden rounded-2xl md:rounded-3xl border shadow-lg transition-all duration-300 ease-in-out`, // Smoother corners, transition
                    `border-white/10 hover:border-white/20`, // Slightly more visible border on hover
                    colSpan, rowSpan, mdColSpan || colSpan, mdRowSpan || rowSpan,
                    bgColor, 'text-foreground',
                    comingSoon ? 'opacity-70 filter grayscale-[50%]' : '', // Slightly less grayscale
                    isInteractive && !comingSoon ? 'cursor-pointer interactive-tile glow-card' : 'cursor-default',
                    backdropBlur ? 'backdrop-blur-lg' : '' // Apply backdrop blur if specified
                )}
                whileHover={isInteractive && !comingSoon ? interactiveHover : {}}
                whileTap={isInteractive && !comingSoon ? interactiveTap : {}}
                onClick={isInteractive && !comingSoon && href ? () => navigate(href) : undefined}
                // Apply glow effect using CSS variable defined inline
                style={isInteractive && !comingSoon && glowColorVar ? { '--tile-glow-color': `var(${glowColorVar})` } as React.CSSProperties : {}}
              >
                {/* Outer glow effect that appears on hover for all cards */}
                <div className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl md:rounded-3xl outer-glow"></div>

                {/* Inner Content Container */}
                <div className="relative z-10 h-full w-full p-3 md:p-4 flex flex-col justify-center items-center text-center">
                    {comingSoon ? (
                      // Coming Soon Layout
                      <>
                        <Icon className="w-7 h-7 md:w-8 md:h-8 mb-1.5 opacity-50 text-amber-600" /> {/* Adjusted style */}
                        <span className="text-sm md:text-base font-serif font-medium opacity-80 text-foreground/60">{text}</span>
                        <span className="flex items-center gap-1.5 text-xs font-sans text-amber-600/80 mt-1.5"> {/* Adjusted style */}
                          <Clock size={12} />
                          Segera Hadir
                        </span>
                      </>
                    ) : isWidget ? (
                       // Widget Layout with Enhanced Icon
                       <>
                         {/* Icon Container with glow effect */}
                         <motion.div
                             className={cn(
                                `mb-2 md:mb-3 p-2.5 md:p-3 rounded-xl shadow-md icon-glow`, // Added icon-glow class
                                accentColorClass
                              )}
                              whileHover={{ scale: 1.1 }}
                              transition={{ type: "spring", stiffness: 300 }}
                         >
                           <Icon className={cn(`w-5 h-5 md:w-6 md:h-6`, iconColorClass || 'text-background')} />
                         </motion.div>
                         {/* Text with slight lift on hover */}
                         <motion.span
                            className={cn(`text-xs md:text-sm font-serif font-medium`, 'text-foreground')}
                            whileHover={{ y: -2 }}
                          >
                            {text}
                         </motion.span>
                       </>
                    ) : content ? ( // Custom content
                       <div className="h-full w-full flex"> {content} </div>
                     ) : null // Fallback
                    }
                </div>

                {/* Enhanced shimmer on hover for interactive tiles */}
                {isInteractive && !comingSoon && (
                  <div className="absolute inset-0 bg-shimmer-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-500 group-hover:animate-shimmer"></div>
                )}

                {/* Subtle inner shadow for depth */}
                <div className="absolute inset-0 rounded-2xl md:rounded-3xl shadow-inner-subtle pointer-events-none"></div>
              </MotionComponent>
            );
          })}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Index;
