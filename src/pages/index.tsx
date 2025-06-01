
// src/pages/Index.tsx
import React, { useState } from 'react';
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { BookOpen, Info, Bell, ScrollText, Users, Palette, Code, ExternalLink, LinkIcon, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { CustomCursor } from "../components/karya/CustomCursor";

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
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
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
    hidden: { opacity: 0, scale: 0.92, y: 25 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.23, 1, 0.32, 1]
      }
    }
  };

  // Enhanced hover with better spring physics
  const interactiveHover = {
    y: -6,
    scale: 1.03,
    boxShadow: "0 12px 30px -6px rgba(0, 0, 0, 0.45)",
    transition: { type: "spring", stiffness: 400, damping: 25 }
  };

  const interactiveTap = {
    scale: 0.96,
    transition: { type: "spring", stiffness: 500, damping: 30 }
  };

  // --- Enhanced Bento Grid Configuration ---
  const bentoTiles: BentoTile[] = [
    // Title card - Enhanced typography
    {
      id: "title",
      colSpan: "col-span-2 sm:col-span-2",
      rowSpan: "row-span-2",
      mdColSpan: "md:col-span-2",
      mdRowSpan: "md:row-span-2",
      content: (
        <div className="flex flex-col justify-center h-full p-5 md:p-7 text-left">
          <motion.h1
            className="text-3xl sm:text-4xl lg:text-5xl font-sans font-bold mb-3 md:mb-4 text-foreground leading-[1.1] tracking-tight home-title"
          >
            OUR CREATIVITY
          </motion.h1>
          <p className="text-sm sm:text-base lg:text-lg text-foreground/80 font-sans font-medium max-w-md leading-relaxed tracking-wide"> 
            Dimana imajinasi bertemu dengan inovasi. Bergabunglah dengan komunitas kreatif kami.
          </p>
        </div>
      ),
      bgColor: "bg-secondary/85",
      backdropBlur: true,
      isInteractive: false,
    },
    
    // Navigation widgets with improved proportions
    { 
      id: "cerita",
      icon: BookOpen,
      text: "Cerita Kami",
      href: "/brand-story",
      colSpan: "col-span-1", 
      rowSpan: "row-span-1", 
      mdColSpan: "md:col-span-1", 
      mdRowSpan: "md:row-span-1",
      bgColor: "bg-secondary/85",
      accentColorClass: "bg-amethyst",
      iconColorClass: "text-background",
      glowColorVar: "--color-amethyst-glow",
      isInteractive: true, 
      isWidget: true, 
      backdropBlur: true,
    },
    { 
      id: "tim",
      icon: Users,
      text: "Tim Kami",
      href: "/tim-kami",
      colSpan: "col-span-1", 
      rowSpan: "row-span-1", 
      mdColSpan: "md:col-span-1", 
      mdRowSpan: "md:row-span-1",
      bgColor: "bg-secondary/85",
      accentColorClass: "bg-turquoise",
      iconColorClass: "text-background",
      glowColorVar: "--color-turquoise-glow",
      isInteractive: true, 
      isWidget: true, 
      backdropBlur: true,
    },
    
    // Second row
    { 
      id: "syarat",
      icon: ScrollText,
      text: "Syarat & Ketentuan",
      href: "/terms",
      colSpan: "col-span-1", 
      rowSpan: "row-span-1", 
      mdColSpan: "md:col-span-1", 
      mdRowSpan: "md:row-span-1",
      bgColor: "bg-secondary/85",
      accentColorClass: "bg-coral",
      iconColorClass: "text-background",
      glowColorVar: "--color-coral-glow",
      isInteractive: true, 
      isWidget: true, 
      backdropBlur: true,
    },
    { 
      id: "informasi",
      icon: Info,
      text: "Informasi",
      href: "/informasi",
      colSpan: "col-span-1", 
      rowSpan: "row-span-1", 
      mdColSpan: "md:col-span-1", 
      mdRowSpan: "md:row-span-1",
      bgColor: "bg-secondary/85",
      accentColorClass: "bg-softPink",
      iconColorClass: "text-gray-900",
      glowColorVar: "--color-softPink-glow",
      isInteractive: true, 
      isWidget: true, 
      backdropBlur: true,
    },
    
    // Third row - consistent 2-column layout as suggested
    { 
      id: "pengumuman",
      icon: Bell,
      text: "Pengumuman",
      href: "/pengumuman",
      colSpan: "col-span-1", 
      rowSpan: "row-span-1", 
      mdColSpan: "md:col-span-1", 
      mdRowSpan: "md:row-span-1",
      bgColor: "bg-secondary/85",
      accentColorClass: "bg-mint",
      iconColorClass: "text-background",
      glowColorVar: "--color-mint-glow",
      isInteractive: true, 
      isWidget: true, 
      backdropBlur: true,
    },
    
    { 
      id: "karya",
      icon: Palette,
      text: "Karya Kami",
      href: "/karya-kami",
      colSpan: "col-span-1", 
      rowSpan: "row-span-1", 
      mdColSpan: "md:col-span-1", 
      mdRowSpan: "md:row-span-1",
      bgColor: "bg-secondary/85",
      accentColorClass: "bg-lavender",
      iconColorClass: "text-background",
      glowColorVar: "--color-lavender-glow",
      isInteractive: true, 
      isWidget: true, 
      backdropBlur: true,
      content: (
        <div className="relative w-full h-full group">
          {/* Enhanced shimmer with better animation */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/12 to-transparent opacity-0 group-hover:opacity-100 animate-shimmer-fast transition-opacity duration-600" />
          <div className="absolute inset-0 bg-gradient-to-b from-lavender/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-800" />
          
          {/* Improved BARU tag */}
          <div className="absolute top-3 left-3 z-20">
            <div className="bg-gradient-to-r from-coral via-peach to-coral text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg border border-white/25 animate-pulse-subtle backdrop-blur-sm">
              BARU
            </div>
          </div>
          
          <div className="relative z-10 h-full w-full p-4 md:p-5 flex flex-col justify-center items-center text-center">
            <div className={cn(
              `mb-3 md:mb-4 p-3 md:p-4 rounded-xl shadow-md icon-glow`,
              "bg-lavender"
            )}>
              <Palette className="w-6 h-6 md:w-7 md:h-7 text-background" />
            </div>
            <span className="text-sm md:text-base font-sans font-semibold tracking-wide text-foreground">Karya Kami</span>
          </div>
        </div>
      )
    },
    
    // Fourth row
    { 
      id: "join",
      icon: Users,
      text: "AYO GABUNG!",
      colSpan: "col-span-1", 
      rowSpan: "row-span-1", 
      mdColSpan: "md:col-span-1", 
      mdRowSpan: "md:row-span-1",
      bgColor: "bg-secondary/85",
      accentColorClass: "bg-emerald",
      iconColorClass: "text-background",
      glowColorVar: "--color-emerald-glow",
      isInteractive: true,
      isWidget: true,
      backdropBlur: true,
      onClick: () => setShowJoinDialog(true)
    },
    
    // Designer credit - spanning full width
    {
      id: "designer-credit",
      colSpan: "col-span-1", 
      rowSpan: "row-span-1", 
      mdColSpan: "md:col-span-1", 
      mdRowSpan: "md:row-span-1",
      content: (
         <div className="flex items-center justify-center h-full text-center p-4 md:p-5">
           <p className="text-xs sm:text-sm text-foreground/65 font-sans font-medium flex items-center gap-2 leading-relaxed">
             <Code size={15} className="opacity-75"/>
             <span>© 2024 OUR CREATIVITY</span>
             <span className="hidden sm:inline">•</span>
             <span className="hidden sm:inline">Designed by</span>
             <a
                href="https://bit.ly/Ardelyo"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-foreground/85 hover:text-foreground hover:underline transition-colors duration-250 group font-semibold"
             >
                 @ardel.yo
                 <ExternalLink size={13} className="opacity-70 group-hover:opacity-100 transition-opacity"/>
             </a>
           </p>
         </div>
      ),
      bgColor: "bg-secondary/85",
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
        {/* Enhanced background with better gradients */}
        <div className="fixed inset-0 -z-20 overflow-hidden bg-background">
          <div className="absolute inset-0 opacity-65">
            {/* Refined gradient animations */}
            <div className="absolute w-[85vw] h-[85vh] rounded-full bg-gradient-radial from-amethyst/18 via-amethyst/6 to-transparent -top-[20%] -right-[20%] filter blur-[140px] animate-float"></div>
            <div className="absolute w-[75vw] h-[75vh] rounded-full bg-gradient-radial from-turquoise/18 via-turquoise/6 to-transparent -bottom-[20%] -left-[20%] filter blur-[160px] animate-float-slow"></div>
            <div className="absolute w-[65vw] h-[65vh] rounded-full bg-gradient-radial from-coral/12 via-coral/4 to-transparent -bottom-[10%] -right-[10%] filter blur-[145px] opacity-80 animate-float-reverse"></div>
            
            {/* Additional subtle layers */}
            <div className="absolute w-[45vw] h-[45vh] rounded-full bg-gradient-radial from-softPink/8 via-softPink/2 to-transparent top-[15%] left-[20%] filter blur-[110px] opacity-60 animate-float-slow-reverse"></div>
            <div className="absolute w-[40vw] h-[40vh] rounded-full bg-gradient-radial from-mint/12 via-mint/3 to-transparent bottom-[25%] right-[25%] filter blur-[100px] opacity-70 animate-pulse-slow"></div>
          </div>

          {/* Refined texture overlays */}
          <div className="absolute inset-0 noise-pattern opacity-[0.035] z-10"></div>
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.025] z-0"></div>
        </div>

        {/* Main Content with improved spacing */}
        <div className="relative z-10 container mx-auto p-4 sm:p-5 md:p-7 flex-grow flex items-center justify-center h-full">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-2 gap-4 sm:gap-5 w-full h-full max-h-[calc(100vh-8rem)] md:max-h-[calc(100vh-10rem)]"
            style={{ gridAutoRows: 'minmax(0, 1fr)' }}
            variants={gridContainerVariants}
            initial="hidden"
            animate="visible"
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
                      `relative group overflow-hidden rounded-3xl md:rounded-[2rem] border shadow-xl transition-all duration-400 ease-out`,
                      `border-white/12 hover:border-white/25`,
                      colSpan, rowSpan, mdColSpan || colSpan, mdRowSpan || rowSpan,
                      bgColor, 'text-foreground',
                      comingSoon ? 'opacity-75 filter grayscale-[40%]' : '',
                      isInteractive && !comingSoon ? 'cursor-pointer interactive-tile glow-card' : 'cursor-default',
                      backdropBlur ? 'backdrop-blur-xl' : ''
                  )}
                  whileHover={isInteractive && !comingSoon ? interactiveHover : {}}
                  whileTap={isInteractive && !comingSoon ? interactiveTap : {}}
                  onClick={onClick || (isInteractive && !comingSoon && href ? () => navigate(href) : undefined)}
                  style={isInteractive && !comingSoon && glowColorVar ? { '--tile-glow-color': `var(${glowColorVar})` } as React.CSSProperties : {}}
                >
                  {/* Enhanced glow effects */}
                  <div className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-600 rounded-3xl md:rounded-[2rem] outer-glow"></div>

                  {/* Content with improved proportions */}
                  <div className="relative z-10 h-full w-full p-4 md:p-5 flex flex-col justify-center items-center text-center">
                      {comingSoon ? (
                        <>
                          <Icon className="w-8 h-8 md:w-9 md:h-9 mb-2 opacity-60 text-amber-600" />
                          <span className="text-sm md:text-base font-sans font-semibold opacity-85 text-foreground/70 tracking-wide">{text}</span>
                          <span className="flex items-center gap-2 text-xs font-sans text-amber-600/85 mt-2">
                            <Clock size={13} />
                            Segera Hadir
                          </span>
                        </>
                      ) : isWidget ? (
                         <>
                           {/* Enhanced icon container with better proportions */}
                           <motion.div
                               className={cn(
                                  `mb-3 md:mb-4 p-3 md:p-4 rounded-xl shadow-md icon-glow`,
                                  accentColorClass
                                )}
                                whileHover={{ scale: 1.08 }}
                                transition={{ type: "spring", stiffness: 400 }}
                           >
                             <Icon className={cn(`w-6 h-6 md:w-7 md:h-7`, iconColorClass || 'text-background')} />
                           </motion.div>
                           
                           {/* Improved text with better typography */}
                           <motion.span
                              className={cn(`text-sm md:text-base font-sans font-semibold tracking-wide`, 'text-foreground')}
                              whileHover={{ y: -1 }}
                            >
                              {text}
                           </motion.span>
                         </>
                      ) : content ? (
                         <div className="h-full w-full flex">{content}</div>
                       ) : null
                      }
                  </div>

                  {/* Enhanced interaction effects */}
                  {isInteractive && !comingSoon && (
                    <div className="absolute inset-0 bg-shimmer-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-600 group-hover:animate-shimmer"></div>
                  )}

                  {/* Subtle depth enhancement */}
                  <div className="absolute inset-0 rounded-3xl md:rounded-[2rem] shadow-inner-subtle pointer-events-none"></div>
                </MotionComponent>
              );
            })}
          </motion.div>
        </div>
      </motion.div>

      {/* Enhanced Join Community Dialog */}
      <Dialog open={showJoinDialog} onOpenChange={setShowJoinDialog}>
        <DialogContent className="max-w-3xl p-0 overflow-hidden border-border/40 shadow-2xl bg-gradient-to-tr from-secondary/75 to-secondary/85 backdrop-blur-2xl rounded-3xl">
          <div className="p-7 md:p-9 space-y-7">
            {/* Dialog header with better typography */}
            <div className="flex items-center justify-center gap-4 mb-5 text-center">
              <div className="w-12 h-12 rounded-xl bg-emerald/15 border border-emerald/40 flex items-center justify-center">
                <Users className="w-6 h-6 text-emerald" />
              </div>
              <h3 className="text-xl md:text-2xl font-sans font-bold text-foreground tracking-tight">
                Bergabung dengan Komunitas Kami
              </h3>
            </div>

            {/* Enhanced introduction */}
            <p className="text-sm md:text-base text-neutral-300 text-center max-w-xl mx-auto leading-relaxed font-sans font-medium">
              Terhubung dengan 1000+ kreator muda! Pilih cara bergabung yang paling cocok untukmu di bawah ini.
            </p>

            {/* Linktree section with better styling */}
            <div className="text-center border-t border-neutral-700/60 pt-7">
              <p className="text-sm text-neutral-400 mb-4 font-sans">Lihat semua platform & media sosial kami:</p>
              <motion.button
                onClick={() => window.open("https://linktr.ee/ourcreativity.ofc", "_blank")}
                className="inline-flex items-center justify-center px-7 py-4 rounded-full text-sm font-sans font-semibold transition-all duration-350 bg-neutral-200 text-neutral-900 hover:bg-white shadow-lg hover:shadow-xl group"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                <LinkIcon className="mr-3 w-4 h-4"/>
                Kunjungi Linktree Kami
              </motion.button>
            </div>

            {/* WhatsApp groups with improved layout */}
            <div className="border-t border-neutral-700/60 pt-7">
              <p className="text-sm text-neutral-400 mb-5 text-center font-sans">Atau gabung langsung ke grup diskusi spesifik:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 max-w-lg mx-auto">
                <motion.a
                  href="https://chat.whatsapp.com/CHTz0dzUQq9K3XGfRknYim"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 rounded-xl border bg-secondary/60 border-neutral-700/70 hover:bg-secondary/90 hover:border-neutral-600 transition-all duration-300"
                  whileHover={{ y: -3, scale: 1.02 }}
                >
                  <MessageCircle className="w-5 h-5 text-gray-400" />
                  <span className="text-sm font-sans font-semibold text-neutral-200">O.C Kartul</span>
                  <ExternalLink className="ml-auto w-4 h-4 text-neutral-500" />
                </motion.a>
                <motion.a
                  href="https://chat.whatsapp.com/KAp4AjCxmVYCGF504eykaG"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 rounded-xl border bg-secondary/60 border-neutral-700/70 hover:bg-secondary/90 hover:border-neutral-600 transition-all duration-300"
                  whileHover={{ y: -3, scale: 1.02 }}
                >
                  <MessageCircle className="w-5 h-5 text-emerald" />
                  <span className="text-sm font-sans font-semibold text-neutral-200">O.C Community</span>
                  <ExternalLink className="ml-auto w-4 h-4 text-neutral-500" />
                </motion.a>
                <motion.a
                  href="https://chat.whatsapp.com/BVTsqKqYa9UL2CykAsMmJZ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 rounded-xl border bg-secondary/60 border-neutral-700/70 hover:bg-secondary/90 hover:border-neutral-600 transition-all duration-300 sm:col-span-2"
                  whileHover={{ y: -3, scale: 1.02 }}
                >
                  <MessageCircle className="w-5 h-5 text-coral" />
                  <span className="text-sm font-sans font-semibold text-neutral-200">O.C Meme</span>
                  <ExternalLink className="ml-auto w-4 h-4 text-neutral-500" />
                </motion.a>
              </div>
              <p className="text-xs text-neutral-500 mt-5 text-center px-4 font-sans leading-relaxed">
                <Info size={13} className="inline mr-1.5 align-middle"/>
                Beberapa grup butuh pengisian form untuk menyaring anggota, silakan isi form untuk di accept.
              </p>
            </div>
          </div>

          {/* Enhanced decorative elements */}
          <div className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full bg-emerald/8 opacity-60 blur-3xl pointer-events-none"></div>
          <div className="absolute -top-16 -left-16 w-40 h-40 rounded-full bg-emerald/6 opacity-50 blur-3xl pointer-events-none"></div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Index;
