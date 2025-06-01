// src/pages/Index.tsx
import React, { useState } from 'react';
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { BookOpen, Info, Bell, ScrollText, Users, Palette, Feather, Clock, Code, ExternalLink, LinkIcon, MessageCircle } from "lucide-react"; // Added ExternalLink, LinkIcon, MessageCircle
import { cn } from "@/lib/utils"; // Assuming utils.ts is in src/lib
import { Dialog, DialogContent } from "@/components/ui/dialog"; // Assuming dialog components are available
import { CustomCursor } from "../components/karya/CustomCursor"; // Added CustomCursor import

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
  onClick?: () => void; // Add onClick handler
}

const Index = () => {
  const navigate = useNavigate();
  const [showJoinDialog, setShowJoinDialog] = useState(false);

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
          {/* Enhanced Shimmer Effect with double-layer animation */}
          {/* <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 animate-shimmer-fast transition-opacity duration-500" /> */} {/* Removed for now, shimmer below is primary */}
          <div className="absolute inset-0 bg-gradient-to-b from-lavender/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          
          {/* BARU Tag */}
          <div className="absolute top-3 left-3 z-20">
            <div className="bg-gradient-to-r from-coral via-peach to-coral text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg border border-white/20 animate-pulse-subtle backdrop-blur-sm">
              BARU
            </div>
          </div>
          
          <div className="relative z-10 h-full w-full p-3 md:p-4 flex flex-col justify-center items-center text-center">
            <Palette className="w-7 h-7 md:w-8 md:h-8 mb-1.5" />
            <span className="text-sm md:text-base font-sans font-semibold">Karya Kami</span> {/* Changed font */}
          </div>
        </div>
      )
    },
    { // Join Community Card (replacing logo-visual)
      id: "join",
      icon: Users,
      text: "AYO GABUNG!",
      colSpan: "col-span-1", 
      rowSpan: "row-span-1", 
      mdColSpan: "md:col-span-1", 
      mdRowSpan: "md:row-span-1",
      bgColor: "bg-secondary/80",
      accentColorClass: "bg-emerald", // Using emerald for join action
      iconColorClass: "text-background",
      glowColorVar: "--color-emerald-glow",
      isInteractive: true,
      isWidget: true,
      backdropBlur: true,
      onClick: () => setShowJoinDialog(true)
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
    <>
      {/* Add CustomCursor */}
      <CustomCursor />
      
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
                  comingSoon, isWidget, backdropBlur, glowColorVar, onClick // Removed textColor
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
                  onClick={onClick || (isInteractive && !comingSoon && href ? () => navigate(href) : undefined)}
                  // Apply glow effect using CSS variable defined inline
                  style={isInteractive && !comingSoon && glowColorVar ? { '--tile-glow-color': `var(${glowColorVar})` } as React.CSSProperties : {}}
                >
                  {/* Outer glow effect that appears on hover for all cards */}
                  <div className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl md:rounded-3xl outer-glow"></div>

                  {/* Inner Content Container */}
                  <div className="relative z-10 h-full w-full p-3 md:p-4 flex flex-col justify-center items-center text-center">
                      {comingSoon && Icon && text ? ( // Ensure Icon and text are defined for Coming Soon
                        // Coming Soon Layout
                        <>
                          <Icon className="w-7 h-7 md:w-8 md:h-8 mb-1.5 opacity-50 text-amber-500" /> {/* Adjusted icon size & color */}
                          <span className="text-sm font-sans font-medium opacity-80 text-foreground/60">{text}</span> {/* Changed font */}
                          <span className="flex items-center gap-1.5 text-xs font-sans text-amber-500/80 mt-1.5"> {/* Adjusted style */}
                            <Clock size={12} />
                            Segera Hadir
                          </span>
                        </>
                      ) : isWidget && Icon && text ? ( // Ensure Icon and text are defined for Widget
                         // Widget Layout with Enhanced Icon
                         <>
                           {/* Icon Container with glow effect */}
                           <motion.div
                              className={cn(
                                `mb-1.5 md:mb-2 p-2.5 md:p-3 rounded-xl shadow-md icon-glow`, // Reduced bottom margin
                                accentColorClass
                              )}
                              whileHover={{ scale: 1.1 }}
                              transition={{ type: "spring", stiffness: 300 }}
                           >
                             <Icon className={cn(`w-7 h-7 md:w-8 md:h-8`, iconColorClass || 'text-background')} /> {/* Increased icon size */}
                           </motion.div>
                           {/* Text with slight lift on hover */}
                           <motion.span
                              className={cn(`text-sm font-sans font-semibold`, 'text-foreground')} // Changed font, weight, and base size
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

      {/* Join Community Dialog */}
      <Dialog open={showJoinDialog} onOpenChange={setShowJoinDialog}>
        <DialogContent className="max-w-3xl p-0 overflow-hidden border-border/30 shadow-xl bg-gradient-to-tr from-secondary/70 to-secondary/80 backdrop-blur-xl">
          <div className="p-6 md:p-8 space-y-6">
            {/* Card Title */}
            <div className="flex items-center justify-center gap-3 mb-4 text-center">
              <div className="w-10 h-10 rounded-xl bg-emerald/10 border border-emerald/30 flex items-center justify-center">
                <Users className="w-5 h-5 text-emerald" />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold font-serif text-foreground">
                Bergabung dengan Komunitas Kami
              </h3>
            </div>

            {/* Introduction Text */}
            <p className="text-sm md:text-base text-neutral-300 text-center max-w-xl mx-auto leading-relaxed">
              Terhubung dengan 1000+ kreator muda! Pilih cara bergabung yang paling cocok untukmu di bawah ini.
            </p>

            {/* Linktree Button */}
            <div className="text-center border-t border-neutral-700/50 pt-6">
              <p className="text-sm text-neutral-400 mb-3">Lihat semua platform & media sosial kami:</p>
              <motion.button
                onClick={() => window.open("https://linktr.ee/ourcreativity.ofc", "_blank")}
                className="inline-flex items-center justify-center px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 bg-neutral-200 text-neutral-900 hover:bg-white shadow-md hover:shadow-lg group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <LinkIcon className="mr-2 w-4 h-4"/>
                Kunjungi Linktree Kami
              </motion.button>
            </div>

            {/* WhatsApp Groups */}
            <div className="border-t border-neutral-700/50 pt-6">
              <p className="text-sm text-neutral-400 mb-4 text-center">Atau gabung langsung ke grup diskusi spesifik:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 max-w-lg mx-auto">
                <motion.a
                  href="https://chat.whatsapp.com/CHTz0dzUQq9K3XGfRknYim"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg border bg-secondary/50 border-neutral-700/60 hover:bg-secondary/80 hover:border-neutral-600"
                  whileHover={{ y: -2, scale: 1.02 }}
                >
                  <MessageCircle className="w-5 h-5 text-gray-400" />
                  <span className="text-sm font-medium text-neutral-200">O.C Kartul</span>
                  <ExternalLink className="ml-auto w-4 h-4 text-neutral-500" />
                </motion.a>
                <motion.a
                  href="https://chat.whatsapp.com/KAp4AjCxmVYCGF504eykaG"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg border bg-secondary/50 border-neutral-700/60 hover:bg-secondary/80 hover:border-neutral-600"
                  whileHover={{ y: -2, scale: 1.02 }}
                >
                  <MessageCircle className="w-5 h-5 text-emerald" />
                  <span className="text-sm font-medium text-neutral-200">O.C Community</span>
                  <ExternalLink className="ml-auto w-4 h-4 text-neutral-500" />
                </motion.a>
                <motion.a
                  href="https://chat.whatsapp.com/BVTsqKqYa9UL2CykAsMmJZ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg border bg-secondary/50 border-neutral-700/60 hover:bg-secondary/80 hover:border-neutral-600"
                  whileHover={{ y: -2, scale: 1.02 }}
                >
                  <MessageCircle className="w-5 h-5 text-coral" />
                  <span className="text-sm font-medium text-neutral-200">O.C Meme</span>
                  <ExternalLink className="ml-auto w-4 h-4 text-neutral-500" />
                </motion.a>
              </div>
              <p className="text-xs text-neutral-500 mt-4 text-center px-4">
                <Info size={12} className="inline mr-1 align-middle"/>
                Beberapa grup butuh pengisian form untuk menyaring anggota, silakan isi form untuk di accept.
              </p>
            </div>
          </div>

          {/* Decorative background elements */}
          <div className="absolute -bottom-12 -right-12 w-40 h-40 rounded-full bg-emerald/5 opacity-50 blur-xl pointer-events-none"></div>
          <div className="absolute -top-12 -left-12 w-32 h-32 rounded-full bg-emerald/5 opacity-40 blur-xl pointer-events-none"></div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Index;
