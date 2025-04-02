// src/pages/Index.tsx
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { BookOpen, Info, Bell, ScrollText, Users, Palette, Feather, Clock, Code, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils"; // Assuming cn utility exists

// --- Accent Color Mapping (Tailwind Classes) ---
// For glows and specific highlights
const accentColors: Record<string, { glow: string; text: string; bg: string; iconBg: string; iconText: string; }> = {
  lavender: { glow: "shadow-[0_0_15px_2px_rgba(155,109,255,0.4)]", text: "text-lavender", bg: "bg-lavender", iconBg: "bg-lavender/80", iconText: "text-white" },
  mint: { glow: "shadow-[0_0_15px_2px_rgba(64,224,208,0.4)]", text: "text-mint", bg: "bg-mint", iconBg: "bg-mint/80", iconText: "text-black/80" },
  peach: { glow: "shadow-[0_0_15px_2px_rgba(255,127,80,0.4)]", text: "text-peach", bg: "bg-peach", iconBg: "bg-peach/80", iconText: "text-white" },
  softPink: { glow: "shadow-[0_0_15px_2px_rgba(255,182,193,0.4)]", text: "text-softPink", bg: "bg-softPink", iconBg: "bg-softPink/80", iconText: "text-black/80" },
  amethyst: { glow: "shadow-[0_0_15px_2px_rgba(155,109,255,0.4)]", text: "text-amethyst", bg: "bg-amethyst", iconBg: "bg-amethyst/80", iconText: "text-white" },
  turquoise: { glow: "shadow-[0_0_15px_2px_rgba(64,224,208,0.4)]", text: "text-turquoise", bg: "bg-turquoise", iconBg: "bg-turquoise/80", iconText: "text-black/80" },
  amber: { glow: "shadow-[0_0_15px_2px_rgba(255,191,0,0.4)]", text: "text-amber-500", bg: "bg-amber-500", iconBg: "bg-amber-500/80", iconText: "text-black/80" },
  default: { glow: "shadow-[0_0_15px_2px_rgba(255,255,255,0.15)]", text: "text-neutral-400", bg: "bg-neutral-700", iconBg: "bg-neutral-700/80", iconText: "text-white" },
};

const getAccentStyle = (accentKey: string | undefined) => {
    return accentColors[accentKey || 'default'] || accentColors.default;
};


const Index = () => {
  const navigate = useNavigate();

  // --- Animation Variants (iOS Style) ---
  const gridContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.07, // Faster stagger
        delayChildren: 0.1,
      }
    }
  };

  const gridItemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 }, // Start slightly scaled down
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    }
  };

  // --- iOS Style Hover & Tap Animations ---
  const interactiveHover = (accentKey?: string) => ({
    y: -5,
    scale: 1.03,
    boxShadow: `0px 10px 20px -5px rgba(0, 0, 0, 0.3), ${getAccentStyle(accentKey).glow}`, // Combine dark shadow + colored glow
    transition: { type: "spring", stiffness: 350, damping: 18 }
  });

  const interactiveTap = {
    scale: 0.97, // Slightly more noticeable tap
    transition: { type: "spring", stiffness: 400, damping: 20 }
  };


  // --- Bento Grid Tile Configuration (iOS Style, Swapped Karya/Pengumuman) ---
  const bentoTiles = [
    // Row 1
    { // Main Title Tile
      id: "title",
      colSpan: "col-span-2 sm:col-span-2", rowSpan: "row-span-2",
      mdColSpan: "md:col-span-2", mdRowSpan: "md:row-span-2",
      content: (
        <div className="flex flex-col justify-center h-full p-5 md:p-6 text-left">
          <motion.h1
            className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold mb-2 md:mb-3 text-foreground leading-tight home-title" // Keep gradient title
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            OUR CREATIVITY
          </motion.h1>
          <motion.p
             className="text-sm sm:text-base lg:text-lg text-foreground/70 font-sans max-w-md text-readable"
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.3, duration: 0.5 }}
          >
            Dimana imajinasi bertemu dengan inovasi. Bergabunglah dengan komunitas kreatif kami.
          </motion.p>
        </div>
      ),
      bgColor: "bg-secondary/60", // iOS style background
      isInteractive: false,
    },
    { // Widget 1: Cerita Kami (Amethyst Accent)
      id: "cerita",
      icon: BookOpen,
      text: "Cerita Kami",
      href: "/brand-story",
      accent: "amethyst",
      colSpan: "col-span-1", rowSpan: "row-span-1", mdColSpan: "md:col-span-1", mdRowSpan: "md:row-span-1",
      isInteractive: true, isWidget: true,
    },
    { // Widget 2: Tim Kami (Turquoise Accent)
      id: "tim",
      icon: Users,
      text: "Tim Kami",
      href: "/tim-kami",
      accent: "turquoise",
      colSpan: "col-span-1", rowSpan: "row-span-1", mdColSpan: "md:col-span-1", mdRowSpan: "md:row-span-1",
      isInteractive: true, isWidget: true,
    },
    // Row 2
    { // Widget 3: Syarat (Peach Accent)
      id: "syarat",
      icon: ScrollText,
      text: "Syarat", // Shortened
      href: "/terms",
      accent: "peach",
      colSpan: "col-span-1", rowSpan: "row-span-1", mdColSpan: "md:col-span-1", mdRowSpan: "md:row-span-1",
      isInteractive: true, isWidget: true,
    },
    { // Widget 4: Informasi (SoftPink Accent)
      id: "informasi",
      icon: Info,
      text: "Informasi",
      href: "/informasi",
      accent: "softPink",
      colSpan: "col-span-1", rowSpan: "row-span-1", mdColSpan: "md:col-span-1", mdRowSpan: "md:row-span-1",
      isInteractive: true, isWidget: true,
    },
    // Row 3 (Swapped Positions)
    { // Widget 5: Pengumuman (Mint Accent) - MOVED HERE
      id: "pengumuman",
      icon: Bell,
      text: "Pengumuman",
      href: "/pengumuman",
      accent: "mint", // Changed accent slightly
      colSpan: "col-span-1", rowSpan: "row-span-1", mdColSpan: "md:col-span-1", mdRowSpan: "md:row-span-1",
      isInteractive: true, isWidget: true,
    },
     { // Karya (Coming Soon) - MOVED HERE
      id: "karya",
      icon: Feather,
      text: "Karya",
      accent: "amber", // Use amber for coming soon
      colSpan: "col-span-1", rowSpan: "row-span-1", mdColSpan: "md:col-span-1", mdRowSpan: "md:row-span-1",
      isInteractive: false, comingSoon: true, isWidget: true, // Treat as widget visually
    },
    { // Logo Visual Accent
      id: "logo-visual",
      colSpan: "col-span-2 sm:col-span-2", rowSpan: "row-span-1", // Takes 2 cols now
      mdColSpan: "md:col-span-2", mdRowSpan: "md:row-span-1",
      content: (
         <div className="flex items-center justify-center h-full relative overflow-hidden p-4">
            {/* Subtle background glow */}
            <div className="absolute inset-0 bg-gradient-radial from-amethyst/10 via-transparent to-transparent opacity-40 blur-lg"></div>
             <div className="flex items-center gap-3 md:gap-4">
                <motion.img
                  src="/lovable-uploads/c861a7c0-5ec9-4bac-83ea-319c40fcb001.png" // Fish logo
                  alt="Logo Icon"
                  className="w-10 h-10 md:w-12 md:h-12 object-contain relative z-10 drop-shadow-lg"
                  loading="eager"
                  whileHover={{ scale: 1.1, rotate: 3 }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
                 <motion.img
                   src="/lovable-uploads/0bec5fdf-43d7-47af-b1cd-ba7fd2b949ec.png" // Text logo
                   alt="Logo Text"
                   className="h-5 md:h-6 object-contain relative z-10 drop-shadow-lg" // Height based text logo
                   loading="eager"
                   whileHover={{ scale: 1.05 }}
                   transition={{ type: "spring", stiffness: 300 }}
                 />
             </div>
         </div>
      ),
      bgColor: "bg-secondary/60", // Consistent iOS bg
      isInteractive: false,
    },
    // Row 4 - Designer Credit
     {
      id: "designer-credit",
      colSpan: "col-span-2 sm:col-span-2", rowSpan: "row-span-1",
      mdColSpan: "md:col-span-4", mdRowSpan: "md:row-span-1",
      content: (
         <div className="flex items-center justify-center h-full text-center p-3 md:p-4">
           <p className="text-xs sm:text-sm text-foreground/50 font-sans flex items-center gap-1.5">
             <Code size={14} className="opacity-70 flex-shrink-0"/>
             <span>© 2024 OUR CREATIVITY • Designed by Ardellio S. A.</span>
           </p>
         </div>
      ),
      bgColor: "bg-secondary/30", // Slightly different subtle bg
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
      {/* --- iOS Style Background --- */}
      <div className="fixed inset-0 -z-10 opacity-80">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary/80 to-background"></div>
        {/* Softer, less intrusive blurs */}
        <div className="absolute w-[60vw] h-[60vh] rounded-full blur-[150px] bg-amethyst/10 -top-[15%] -right-[15%] opacity-40"></div>
        <div className="absolute w-[50vw] h-[50vh] rounded-full blur-[130px] bg-turquoise/10 -bottom-[15%] -left-[15%] opacity-30"></div>
        <div className="absolute inset-0 noise-pattern opacity-[0.02]"></div>
      </div>

      {/* --- Main Content Area: Bento Grid --- */}
      <div className="relative z-10 container mx-auto p-3 sm:p-4 md:p-5 flex-grow flex items-center justify-center h-full">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 w-full h-full max-h-[calc(100vh-5rem)] md:max-h-[calc(100vh-6rem)]" // Adjusted max-h slightly
          style={{ gridAutoRows: 'minmax(0, 1fr)' }}
          variants={gridContainerVariants}
          initial="hidden"
          animate="visible"
        >
          {bentoTiles.map((tile) => {
            // Destructure props
            const { id, colSpan, rowSpan, mdColSpan, mdRowSpan, content, bgColor, accent, icon: Icon, text, href, isInteractive, comingSoon, isWidget } = tile;
            const accentStyle = getAccentStyle(accent);

            const MotionComponent = motion.div;

            return (
              <MotionComponent
                key={id}
                layout // Enable smooth layout changes if grid adapts
                variants={gridItemVariants}
                className={cn(
                    `relative group overflow-hidden rounded-2xl shadow-lg border cursor-pointer`, // Standardized rounding, explicit pointer
                    colSpan, rowSpan, mdColSpan || colSpan, mdRowSpan || rowSpan,
                    bgColor || 'bg-secondary/60', // Default iOS bg
                    'border-neutral-700/40 backdrop-blur-md', // Standard border & blur
                    comingSoon ? 'opacity-80' : '', // Slightly less opacity reduction
                    !isInteractive || comingSoon ? 'cursor-default' : '' // Adjust cursor
                )}
                whileHover={isInteractive && !comingSoon ? interactiveHover(accent) : {}}
                whileTap={isInteractive && !comingSoon ? interactiveTap : {}}
                onClick={isInteractive && !comingSoon && href ? () => navigate(href) : undefined}
              >
                 {/* Inner Content Area with Padding */}
                 <div className="relative z-10 h-full w-full p-4 flex flex-col justify-center items-center text-center">
                    {comingSoon ? (
                      // Coming Soon Layout (Using Widget Style)
                      <>
                        <div className={cn(
                            `mb-2 p-3 rounded-xl shadow-md transition-transform duration-300 group-hover:scale-110`,
                            accentStyle.iconBg // Use accent color for BG
                        )}>
                          <Icon className={cn(`w-5 h-5 md:w-6 md:h-6`, accentStyle.iconText)} /> {/* Use accent text */}
                        </div>
                        <span className={`text-sm md:text-base font-serif font-medium text-foreground/80`}>{text}</span>
                        <span className="flex items-center gap-1 text-[10px] font-sans text-amber-500/90 mt-1 uppercase tracking-wide">
                          <Clock size={10} />
                          Coming Soon
                        </span>
                      </>
                    ) : isWidget ? (
                       // Widget Layout
                       <>
                         <div className={cn(
                            `mb-2 p-3 rounded-xl shadow-md transition-transform duration-300 group-hover:scale-110`,
                            accentStyle.iconBg
                         )}>
                           <Icon className={cn(`w-5 h-5 md:w-6 md:h-6`, accentStyle.iconText)} />
                         </div>
                         <span className={`text-sm md:text-base font-serif font-medium text-foreground`}>{text}</span>
                         {/* Subtle arrow on hover for interactive widgets */}
                         <ArrowRight size={14} className="absolute bottom-3 right-3 text-neutral-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                       </>
                    ) : content ? ( // Handle custom content
                       <div className="h-full w-full flex"> {content} </div>
                     ) : null // Fallback
                    }
                 </div>
                 {/* Subtle corner glow element */}
                 <div className={cn(
                     "absolute -bottom-8 -right-8 w-20 h-20 rounded-full opacity-0 group-hover:opacity-[0.15] blur-lg transition-opacity duration-300",
                     accent ? accentStyle.bg.replace('/10','/80') : 'bg-white/30' // Fallback glow
                 )}></div>
              </MotionComponent>
            );
          })}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Index;
