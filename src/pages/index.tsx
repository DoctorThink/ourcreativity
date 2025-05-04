
import React, { useState, useEffect } from 'react';
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { BookOpen, Info, Bell, ScrollText, Users, Palette, Feather, Clock, MessageCircle, ExternalLink, LinkIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { CustomCursor } from "../components/karya/CustomCursor";
import { useIsMobile } from "@/hooks/use-mobile";
import useElementInView from "../hooks/useElementInView";

// Define the type for Bento Grid tiles
interface BentoTile {
  id: string;
  colSpan: string;
  rowSpan: string;
  mdColSpan?: string;
  mdRowSpan?: string;
  content?: React.ReactNode;
  bgColor: string;
  accentColorClass?: string;
  iconColorClass?: string;
  icon?: React.ElementType;
  text?: string;
  href?: string;
  isInteractive: boolean;
  comingSoon?: boolean;
  isWidget?: boolean;
  backdropBlur?: boolean;
  glowColorVar?: string;
  onClick?: () => void;
}

const Index = () => {
  const navigate = useNavigate();
  const [showJoinDialog, setShowJoinDialog] = useState(false);
  const isMobile = useIsMobile();
  
  // Element-in-view detection for scroll animations
  const { ref: gridRef, isInView: gridIsInView } = useElementInView({ threshold: 0.1 });
  const gridControls = useAnimation();

  useEffect(() => {
    if (gridIsInView) {
      gridControls.start("visible");
    }
  }, [gridIsInView, gridControls]);

  // --- Enhanced Animation Variants ---
  const gridContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.12,
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
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    }
  };

  // --- Enhanced Hover Animation with Glow ---
  const interactiveHover = {
    y: -5,
    scale: 1.04,
    transition: { type: "spring", stiffness: 300, damping: 18 }
  };

  const interactiveTap = {
    scale: 0.97,
    transition: { type: "spring", stiffness: 400, damping: 20 }
  };

  // --- Optimized Bento Grid Layout ---
  const bentoTiles: BentoTile[] = [
    // Row 1 - Modified for better responsiveness
    {
      id: "title",
      colSpan: "col-span-6 sm:col-span-4",
      rowSpan: "row-span-2",
      mdColSpan: "md:col-span-4",
      mdRowSpan: "md:row-span-2",
      content: (
        <div className="flex flex-col justify-center h-full p-4 md:p-6 text-left">
          <motion.h1
            className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-serif font-bold mb-2 md:mb-3 text-foreground leading-tight home-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            OUR CREATIVITY
          </motion.h1>
          <motion.p 
            className="text-sm sm:text-base text-foreground/75 font-sans max-w-md text-readable"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Dimana imajinasi bertemu dengan inovasi. Bergabunglah dengan komunitas kreatif kami.
          </motion.p>
        </div>
      ),
      bgColor: "bg-secondary/80",
      backdropBlur: true,
      isInteractive: false,
    },
    { // Widget 1: Cerita Kami
      id: "cerita",
      icon: BookOpen,
      text: "Cerita Kami",
      href: "/brand-story",
      colSpan: "col-span-3 sm:col-span-2", 
      rowSpan: "row-span-1", 
      mdColSpan: "md:col-span-2", 
      mdRowSpan: "md:row-span-1",
      bgColor: "bg-secondary/80",
      accentColorClass: "bg-amethyst",
      iconColorClass: "text-background",
      glowColorVar: "--color-amethyst-glow",
      isInteractive: true, 
      isWidget: true, 
      backdropBlur: true,
    },
    { // Widget 2: Tim Kami
      id: "tim",
      icon: Users,
      text: "Tim Kami",
      href: "/tim-kami",
      colSpan: "col-span-3 sm:col-span-2", 
      rowSpan: "row-span-1", 
      mdColSpan: "md:col-span-2", 
      mdRowSpan: "md:row-span-1",
      bgColor: "bg-secondary/80",
      accentColorClass: "bg-turquoise",
      iconColorClass: "text-background",
      glowColorVar: "--color-turquoise-glow",
      isInteractive: true, 
      isWidget: true, 
      backdropBlur: true,
    },
    
    // Row 2
    { // Widget 3: Syarat & Ketentuan
      id: "syarat",
      icon: ScrollText,
      text: "Syarat & Ketentuan",
      href: "/terms",
      colSpan: "col-span-3 sm:col-span-2", 
      rowSpan: "row-span-1", 
      mdColSpan: "md:col-span-2", 
      mdRowSpan: "md:row-span-1",
      bgColor: "bg-secondary/80",
      accentColorClass: "bg-coral",
      iconColorClass: "text-background",
      glowColorVar: "--color-coral-glow",
      isInteractive: true, 
      isWidget: true, 
      backdropBlur: true,
    },
    { // Widget 4: Informasi
      id: "informasi",
      icon: Info,
      text: "Informasi",
      href: "/informasi",
      colSpan: "col-span-3 sm:col-span-2", 
      rowSpan: "row-span-1", 
      mdColSpan: "md:col-span-2", 
      mdRowSpan: "md:row-span-1",
      bgColor: "bg-secondary/80",
      accentColorClass: "bg-softPink",
      iconColorClass: "text-gray-900",
      glowColorVar: "--color-softPink-glow",
      isInteractive: true, 
      isWidget: true, 
      backdropBlur: true,
    },
    
    // Row 3 (Rearranged for better responsiveness)
    { // Widget 5: Pengumuman
      id: "pengumuman",
      icon: Bell,
      text: "Pengumuman",
      href: "/pengumuman",
      colSpan: "col-span-3 sm:col-span-3", 
      rowSpan: "row-span-1", 
      mdColSpan: "md:col-span-3", 
      mdRowSpan: "md:row-span-1",
      bgColor: "bg-secondary/80",
      accentColorClass: "bg-mint",
      iconColorClass: "text-background",
      glowColorVar: "--color-mint-glow",
      isInteractive: true, 
      isWidget: true, 
      backdropBlur: true,
    },
    { // Karya Kami
      id: "karya",
      icon: Palette,
      text: "Karya Kami",
      href: "/karya-kami",
      colSpan: "col-span-3 sm:col-span-3", 
      rowSpan: "row-span-1", 
      mdColSpan: "md:col-span-3", 
      mdRowSpan: "md:row-span-1",
      bgColor: "bg-secondary/80",
      accentColorClass: "bg-lavender",
      iconColorClass: "text-background",
      glowColorVar: "--color-lavender-glow",
      isInteractive: true, 
      isWidget: true, 
      backdropBlur: true,
      content: (
        <div className="relative w-full h-full group">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 animate-shimmer-fast transition-opacity duration-500" />
          <div className="absolute inset-0 bg-gradient-to-b from-lavender/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          
          <div className="absolute top-3 left-3 z-20">
            <div className="bg-gradient-to-r from-coral via-peach to-coral text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg border border-white/20 animate-pulse-subtle backdrop-blur-sm">
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
    
    // Row 4
    { // Join Community Card
      id: "join",
      icon: Users,
      text: "AYO GABUNG!",
      colSpan: "col-span-6 sm:col-span-3", 
      rowSpan: "row-span-1", 
      mdColSpan: "md:col-span-3", 
      mdRowSpan: "md:row-span-1",
      bgColor: "bg-secondary/80",
      accentColorClass: "bg-emerald",
      iconColorClass: "text-background",
      glowColorVar: "--color-emerald-glow",
      isInteractive: true,
      isWidget: true,
      backdropBlur: true,
      onClick: () => setShowJoinDialog(true)
    },
    
    // Designer credit with optimized placement
    {
      id: "designer-credit",
      colSpan: "col-span-6 sm:col-span-3", 
      rowSpan: "row-span-1", 
      mdColSpan: "md:col-span-3", 
      mdRowSpan: "md:row-span-1",
      content: (
         <div className="flex items-center justify-center h-full text-center p-3 md:p-4">
           <p className="text-xs sm:text-sm text-foreground/60 font-sans flex flex-wrap items-center gap-2">
             <LinkIcon size={14} className="opacity-80"/>
             <span>© 2024 OUR CREATIVITY • Designed by</span>
             <a
                href="https://bit.ly/Ardelyo"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-foreground/80 hover:text-foreground hover:underline transition-colors duration-200 group"
             >
                 @ardel.yo
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
      <CustomCursor />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen h-screen overflow-hidden relative bg-background flex flex-col"
      >
        {/* Enhanced Animated Background */}
        <div className="fixed inset-0 -z-20 overflow-hidden bg-background">
          <div className="absolute inset-0 opacity-60">
            {/* Primary moving gradients handled by GlobalAnimations component */}
          </div>
        </div>

        {/* Main Content Area: Enhanced Bento Grid with better responsiveness */}
        <div 
          ref={gridRef}
          className="relative z-10 container mx-auto p-3 sm:p-4 md:p-6 flex-grow flex items-center justify-center h-full"
        >
          <motion.div
            className="grid grid-cols-6 md:grid-cols-8 gap-2 sm:gap-3 md:gap-4 w-full h-full max-h-[calc(100vh-4rem)] md:max-h-[calc(100vh-6rem)]"
            style={{ gridAutoRows: 'minmax(0, 1fr)' }}
            variants={gridContainerVariants}
            initial="hidden"
            animate={gridControls}
          >
            {bentoTiles.map((tile) => {
              const {
                id, colSpan, rowSpan, mdColSpan, mdRowSpan, content, bgColor,
                accentColorClass, iconColorClass, icon: Icon, text, href, isInteractive,
                comingSoon, isWidget, backdropBlur, glowColorVar, onClick
              } = tile;

              const MotionComponent = motion.div;

              return (
                <MotionComponent
                  key={id}
                  layout
                  variants={gridItemVariants}
                  className={cn(
                    `relative group overflow-hidden rounded-xl sm:rounded-2xl md:rounded-3xl border shadow-md transition-all duration-300 ease-in-out`, 
                    `border-white/10 hover:border-white/20`, 
                    colSpan, rowSpan, mdColSpan || colSpan, mdRowSpan || rowSpan,
                    bgColor, 'text-foreground',
                    comingSoon ? 'opacity-70 filter grayscale-[50%]' : '', 
                    isInteractive && !comingSoon ? 'cursor-pointer interactive-tile glow-card' : 'cursor-default',
                    backdropBlur ? 'backdrop-blur-lg' : '',
                    'transform-gpu hover:translate-y-[-.15rem] hover:shadow-lg'
                  )}
                  whileHover={isInteractive && !comingSoon ? interactiveHover : {}}
                  whileTap={isInteractive && !comingSoon ? interactiveTap : {}}
                  onClick={onClick || (isInteractive && !comingSoon && href ? () => navigate(href) : undefined)}
                  style={isInteractive && !comingSoon && glowColorVar ? { '--tile-glow-color': `var(${glowColorVar})` } as React.CSSProperties : {}}
                >
                  {/* Outer glow effect */}
                  <div className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl sm:rounded-2xl md:rounded-3xl outer-glow"></div>

                  {/* Inner Content Container */}
                  <div className="relative z-10 h-full w-full p-2 sm:p-3 md:p-4 flex flex-col justify-center items-center text-center">
                    {comingSoon ? (
                      // Coming Soon Layout
                      <>
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 mb-1.5 opacity-50 text-amber-600" />
                        <span className="text-xs sm:text-sm md:text-base font-serif font-medium opacity-80 text-foreground/60">{text}</span>
                        <span className="flex items-center gap-1.5 text-xs font-sans text-amber-600/80 mt-1.5">
                          <Clock size={12} />
                          Segera Hadir
                        </span>
                      </>
                    ) : isWidget ? (
                      // Widget Layout with Enhanced Icon
                      <>
                        <motion.div
                          className={cn(
                            `mb-1 sm:mb-2 md:mb-3 p-2 sm:p-2.5 md:p-3 rounded-lg sm:rounded-xl shadow-md icon-glow`,
                            accentColorClass
                          )}
                          whileHover={{ scale: 1.1 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <Icon className={cn(`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6`, iconColorClass || 'text-background')} />
                        </motion.div>
                        <motion.span
                          className={cn(`text-xs sm:text-sm font-serif font-medium`, 'text-foreground')}
                          whileHover={{ y: -2 }}
                        >
                          {text}
                        </motion.span>
                      </>
                    ) : content ? (
                      // Custom content
                      <div className="h-full w-full flex">{content}</div>
                    ) : null
                    }
                  </div>

                  {/* Enhanced shimmer on hover */}
                  {isInteractive && !comingSoon && (
                    <div className="absolute inset-0 bg-shimmer-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-500 group-hover:animate-shimmer"></div>
                  )}

                  {/* Subtle inner shadow for depth */}
                  <div className="absolute inset-0 rounded-xl sm:rounded-2xl md:rounded-3xl shadow-inner-subtle pointer-events-none"></div>
                </MotionComponent>
              );
            })}
          </motion.div>
        </div>
      </motion.div>

      {/* Enhanced Join Community Dialog */}
      <AnimatePresence>
        {showJoinDialog && (
          <Dialog open={showJoinDialog} onOpenChange={setShowJoinDialog}>
            <DialogContent className="max-w-3xl p-0 overflow-hidden border-border/30 shadow-xl bg-gradient-to-tr from-secondary/70 to-secondary/80 backdrop-blur-xl">
              <motion.div 
                className="p-6 md:p-8 space-y-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.4 }}
              >
                {/* Card Title with enhanced animation */}
                <div className="flex items-center justify-center gap-3 mb-4 text-center">
                  <motion.div 
                    className="w-10 h-10 rounded-xl bg-emerald/10 border border-emerald/30 flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 400, 
                      damping: 10,
                      delay: 0.2 
                    }}
                  >
                    <Users className="w-5 h-5 text-emerald" />
                  </motion.div>
                  <motion.h3 
                    className="text-xl md:text-2xl font-semibold font-serif text-foreground"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    Bergabung dengan Komunitas Kami
                  </motion.h3>
                </div>

                {/* Introduction Text */}
                <motion.p 
                  className="text-sm md:text-base text-neutral-300 text-center max-w-xl mx-auto leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  Terhubung dengan 1000+ kreator muda! Pilih cara bergabung yang paling cocok untukmu di bawah ini.
                </motion.p>

                {/* Linktree Button with enhanced animation */}
                <motion.div 
                  className="text-center border-t border-neutral-700/50 pt-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <p className="text-sm text-neutral-400 mb-3">Lihat semua platform & media sosial kami:</p>
                  <motion.button
                    onClick={() => window.open("https://linktr.ee/ourcreativity.ofc", "_blank")}
                    className="inline-flex items-center justify-center px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 bg-neutral-200 text-neutral-900 hover:bg-white shadow-md hover:shadow-lg group overflow-hidden relative"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-emerald/30 to-lavender/30 opacity-0 group-hover:opacity-100"
                      transition={{ duration: 0.3 }}
                    />
                    <LinkIcon className="mr-2 w-4 h-4 relative z-10"/>
                    <span className="relative z-10">Kunjungi Linktree Kami</span>
                  </motion.button>
                </motion.div>

                {/* WhatsApp Groups with staggered animation */}
                <motion.div 
                  className="border-t border-neutral-700/50 pt-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <p className="text-sm text-neutral-400 mb-4 text-center">Atau gabung langsung ke grup diskusi spesifik:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 max-w-lg mx-auto">
                    {[
                      { 
                        name: "O.C Kartul", 
                        url: "https://chat.whatsapp.com/CHTz0dzUQq9K3XGfRknYim",
                        color: "text-gray-400" 
                      },
                      { 
                        name: "O.C Community", 
                        url: "https://chat.whatsapp.com/KAp4AjCxmVYCGF504eykaG",
                        color: "text-emerald" 
                      },
                      { 
                        name: "O.C Meme", 
                        url: "https://chat.whatsapp.com/BVTsqKqYa9UL2CykAsMmJZ",
                        color: "text-coral" 
                      }
                    ].map((group, i) => (
                      <motion.a
                        key={group.name}
                        href={group.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 rounded-lg border bg-secondary/50 border-neutral-700/60 hover:bg-secondary/80 hover:border-neutral-600 relative overflow-hidden group"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 + (i * 0.1), duration: 0.4 }}
                        whileHover={{ y: -2, scale: 1.02 }}
                      >
                        <motion.div 
                          className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100"
                          transition={{ duration: 0.3 }}
                        />
                        <MessageCircle className={`w-5 h-5 ${group.color}`} />
                        <span className="text-sm font-medium text-neutral-200">{group.name}</span>
                        <ExternalLink className="ml-auto w-4 h-4 text-neutral-500" />
                      </motion.a>
                    ))}
                  </div>
                  <motion.p 
                    className="text-xs text-neutral-500 mt-4 text-center px-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 0.5 }}
                  >
                    <Info size={12} className="inline mr-1 align-middle"/>
                    Beberapa grup butuh pengisian form untuk menyaring anggota, silakan isi form untuk di accept.
                  </motion.p>
                </motion.div>
              </motion.div>

              {/* Enhanced decorative background elements */}
              <motion.div 
                className="absolute -bottom-12 -right-12 w-40 h-40 rounded-full bg-emerald/5 opacity-50 blur-xl pointer-events-none"
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.4, 0.6, 0.4]
                }}
                transition={{ duration: 8, repeat: Infinity }}
              />
              <motion.div 
                className="absolute -top-12 -left-12 w-32 h-32 rounded-full bg-emerald/5 opacity-40 blur-xl pointer-events-none"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ duration: 10, repeat: Infinity, delay: 2 }}
              />
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </>
  );
};

export default Index;
