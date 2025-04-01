// src/pages/Index.tsx
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
// Removed Button import as it's not directly used for tiles
import { BookOpen, Info, Bell, ScrollText, Users, Palette, Feather, Clock } from "lucide-react"; // Added Feather for Karya, Clock for Coming Soon

const Index = () => {
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

  // --- Enhanced Hover Animation ---
  const interactiveHover = {
    y: -6, // Slightly more lift
    scale: 1.04, // Slightly more scale
    rotate: 1, // Subtle tilt
    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.4)", // Enhance shadow on hover
    transition: { type: "spring", stiffness: 300, damping: 15 } // Springy feel
  };

  const interactiveTap = {
    scale: 0.96,
    transition: { type: "spring", stiffness: 400, damping: 20 }
  };

  // --- Bento Grid Tile Content & Configuration ---
  // Order matters for visual layout in the grid
  const bentoTiles = [
    {
      id: "title",
      colSpan: "col-span-2 md:col-span-3",
      rowSpan: "row-span-2 md:row-span-2",
      content: (
        <div className="flex flex-col justify-center h-full p-6 text-left">
          <motion.h1
            className="text-4xl lg:text-6xl font-serif font-bold mb-3 text-foreground leading-tight home-title"
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
      bgColor: "bg-foreground/5",
      isInteractive: false, // Non-clickable title block
    },
    {
      id: "logo-fish",
      colSpan: "col-span-1",
      rowSpan: "row-span-1",
      content: (
        <div className="flex items-center justify-center h-full">
          <motion.img // Added motion here for potential hover on logo
            src="/lovable-uploads/c861a7c0-5ec9-4bac-83ea-319c40fcb001.png"
            alt="Fish Logo"
            className="w-16 h-16 md:w-20 md:h-20 object-contain"
            loading="eager"
            whileHover={{ scale: 1.1, rotate: -5 }} // Simple hover for logo
            transition={{ type: "spring", stiffness: 300 }}
          />
        </div>
      ),
      bgColor: "bg-gradient-to-br from-lavender/10 to-amethyst/10",
      isInteractive: false, // Make logo non-clickable, just visual
    },
    {
      id: "cerita",
      icon: BookOpen,
      text: "Cerita Kami",
      href: "/brand-story",
      colSpan: "col-span-1 md:col-span-1",
      rowSpan: "row-span-1",
      bgColor: "bg-gradient-to-br from-lavender/5 to-amethyst/5",
      glowColor: "lavender", // Define glow color reference for CSS
      isInteractive: true,
    },
    {
      id: "tim",
      icon: Users,
      text: "Tim Kami",
      href: "/tim-kami",
      colSpan: "col-span-1 md:col-span-1",
      rowSpan: "row-span-1",
      bgColor: "bg-gradient-to-br from-mint/5 to-turquoise/5",
      glowColor: "mint",
      isInteractive: true,
    },
    {
      id: "syarat",
      icon: ScrollText,
      text: "Syarat & Ketentuan",
      href: "/terms",
      colSpan: "col-span-1 md:col-span-1",
      rowSpan: "row-span-1",
      bgColor: "bg-gradient-to-br from-peach/5 to-coral/5",
      glowColor: "peach",
      isInteractive: true,
    },
    {
      id: "karya", // NEW TILE
      icon: Feather,
      text: "Karya",
      colSpan: "col-span-2", // Spans two columns
      rowSpan: "row-span-1",
      bgColor: "bg-foreground/5", // Use a standard muted background
      glowColor: "foreground", // Use foreground for a white/grey glow
      isInteractive: false, // Not clickable yet
      comingSoon: true, // Flag for special rendering
    },
     {
      id: "informasi",
      icon: Info,
      text: "Informasi",
      href: "/informasi",
      colSpan: "col-span-1 md:col-span-1",
      rowSpan: "row-span-1",
      bgColor: "bg-gradient-to-br from-softPink/5 to-amber/5",
      glowColor: "softPink",
      isInteractive: true,
    },
    {
      id: "pengumuman",
      icon: Bell,
      text: "Pengumuman",
      href: "/pengumuman",
      colSpan: "col-span-1 md:col-span-1",
      rowSpan: "row-span-1",
      bgColor: "bg-gradient-to-br from-turquoise/5 to-mint/5",
      glowColor: "turquoise",
      isInteractive: true,
    },
     {
      id: "visual-accent",
      colSpan: "col-span-1 md:col-span-1",
      rowSpan: "row-span-1",
      content: (
        <div className="flex items-center justify-center h-full relative overflow-hidden">
          <motion.div
            className="absolute w-3/4 h-3/4 bg-lavender/30 rounded-full blur-xl" // Slightly smaller, more blur
            animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0.4, 0.6] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute w-2/3 h-2/3 bg-mint/30 rounded-full blur-xl" // Slightly smaller
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.7, 0.5] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          />
          <Palette className="w-8 h-8 text-foreground/60 relative z-10" />
        </div>
      ),
      bgColor: "bg-foreground/5",
      isInteractive: false,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen overflow-x-hidden relative perspective-1000 bg-background"
    >
      {/* --- Background Elements (Unchanged from previous version) --- */}
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
          className="absolute top-[40%] right-[10%] w-12 h-12 border border-peach/20 morphing-blob"
          animate={{ y: [0, -10, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          style={{ transformStyle: "preserve-3d", transform: "translateZ(40px)" }}
        />
      </div>

      {/* --- Main Content Area: Bento Grid --- */}
      <div className="relative z-10 container mx-auto px-4 py-16 md:py-24 min-h-screen flex items-center">
        <motion.div
          // Updated grid definition for potentially more columns if needed, adjust cols-5 if layout changes
          className="grid grid-cols-3 md:grid-cols-5 gap-4 md:gap-6 w-full auto-rows-[120px] md:auto-rows-[150px]"
          variants={gridContainerVariants}
          initial="hidden"
          animate="visible"
        >
          {bentoTiles.map((tile) => {
            const { id, colSpan, rowSpan, content, bgColor, glowColor, icon: Icon, text, href, isInteractive, comingSoon } = tile;

            const MotionComponent = isInteractive ? motion.button : motion.div;
            const TagName = isInteractive ? 'button' : 'div'; // Use button tag for interactive elements

            return (
              <MotionComponent
                key={id}
                layout // Keep layout for potential grid changes
                variants={gridItemVariants}
                className={`relative group ${colSpan} ${rowSpan}`} // Base positioning classes
                // Apply hover/tap only if interactive and not coming soon
                whileHover={isInteractive && !comingSoon ? interactiveHover : {}}
                whileTap={isInteractive && !comingSoon ? interactiveTap : {}}
                // Navigation logic
                onClick={isInteractive && !comingSoon && href ? () => navigate(href) : undefined}
                // Disable button semantics if not interactive
                {...(!isInteractive && TagName === 'button' ? { disabled: true } : {})}
              >
                {/* Animated Border Wrapper - Target for CSS Animation */}
                <div className={`animated-border-wrapper h-full w-full rounded-2xl border border-foreground/10 overflow-hidden backdrop-blur-lg transition-colors duration-300 ${bgColor} ${isInteractive && !comingSoon ? 'cursor-pointer' : 'cursor-default'} ${comingSoon ? 'opacity-70' : ''}`}
                     data-glow-color={glowColor || 'foreground'} // Pass glow color to CSS via data attribute
                >
                  {/* Content Area */}
                  <div className="relative z-10 h-full w-full">
                    {/* Shimmer effect on hover for INTERACTIVE items */}
                    {isInteractive && !comingSoon && (
                      <span className="absolute inset-0 bg-shimmer-gradient bg-[length:200%_100%] opacity-0 group-hover:opacity-10 group-hover:animate-shimmer transition-opacity duration-500" />
                    )}

                    {/* Render Icon and Text OR Custom Content OR Coming Soon */}
                    {comingSoon ? (
                      // Coming Soon Layout
                      <div className="flex flex-col items-center justify-center h-full gap-1 p-4 text-center text-foreground/60">
                         <Icon className="w-8 h-8 md:w-10 md:h-10 mb-1 opacity-80" />
                         <span className="text-sm md:text-md font-serif font-semibold">{text}</span>
                         <span className="flex items-center gap-1 text-xs font-sans font-medium text-amber-400/80 mt-1">
                           <Clock size={12} />
                           Coming Soon
                         </span>
                      </div>
                    ) : Icon && text ? (
                      // Standard Icon + Text Layout
                      <div className="flex flex-col items-center justify-center h-full gap-2 p-4 text-center">
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center bg-foreground/10 backdrop-blur-sm transition-all duration-300 group-hover:bg-foreground/15">
                          <Icon className="w-5 h-5 md:w-6 md:h-6 transition-transform duration-300 group-hover:scale-110 text-foreground" />
                        </div>
                        <span className="text-xs md:text-sm font-serif transition-all duration-300 text-foreground">{text}</span>
                      </div>
                    ) : (
                      // Custom Content (like title or visual accent)
                      content
                    )}
                  </div>
                </div>
              </MotionComponent>
            );
          })}
        </motion.div>
      </div>

      {/* --- Footer (Unchanged) --- */}
      <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="absolute bottom-0 left-0 right-0 z-10 pt-8 pb-6 text-center"
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
