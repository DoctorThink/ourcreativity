// src/pages/Index.tsx
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { BookOpen, Info, Bell, ScrollText, Users, Palette, Feather, Clock, Code } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  // --- Animation Variants ---
  const gridContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.1,
      }
    }
  };

  const gridItemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    }
  };

  // --- Simplified Hover Animation ---
  const interactiveHover = {
    y: -4,
    scale: 1.03,
    // boxShadow removed for cleaner look
    transition: { type: "spring", stiffness: 350, damping: 20 }
  };

  const interactiveTap = {
    scale: 0.98,
    transition: { type: "spring", stiffness: 400, damping: 25 }
  };


  // --- Bento Grid Tile Configuration (Revised Colors & Layout) ---
  const bentoTiles = [
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
            className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold mb-2 md:mb-3 text-foreground leading-tight home-title" // Using CSS class for gradient
            // Optional simple text shadow if home-title animation is removed
            // style={{ textShadow: '0 1px 3px rgba(0,0,0,0.2)' }}
          >
            OUR CREATIVITY
          </motion.h1>
          <p className="text-sm sm:text-base lg:text-lg text-foreground/70 font-sans max-w-md">
            Dimana imajinasi bertemu dengan inovasi. Bergabunglah dengan komunitas kreatif kami.
          </p>
        </div>
      ),
      bgColor: "bg-secondary", // Dark grey background
      isInteractive: false,
    },
    { // Widget 1: Cerita Kami (Purple)
      id: "cerita",
      icon: BookOpen,
      text: "Cerita Kami",
      href: "/brand-story",
      colSpan: "col-span-1",
      rowSpan: "row-span-1",
      mdColSpan: "md:col-span-1",
      mdRowSpan: "md:row-span-1",
      bgColor: "bg-amethyst", // Use the darker purple #9B6DFF
      textColor: "text-foreground", // White text
      isInteractive: true,
      isWidget: true,
    },
    { // Widget 2: Tim Kami (Teal)
      id: "tim",
      icon: Users,
      text: "Tim Kami",
      href: "/tim-kami",
      colSpan: "col-span-1",
      rowSpan: "row-span-1",
      mdColSpan: "md:col-span-1",
      mdRowSpan: "md:row-span-1",
      bgColor: "bg-turquoise", // Use the darker teal #40E0D0
      textColor: "text-foreground",
      isInteractive: true,
      isWidget: true,
    },
    // Row 2
    { // Widget 3: Syarat (Orange)
      id: "syarat",
      icon: ScrollText,
      text: "Syarat & Ketentuan",
      href: "/terms",
      colSpan: "col-span-1",
      rowSpan: "row-span-1",
      mdColSpan: "md:col-span-1",
      mdRowSpan: "md:row-span-1",
      bgColor: "bg-coral", // Use the darker orange #FF7F50
      textColor: "text-foreground",
      isInteractive: true,
      isWidget: true,
    },
    { // Widget 4: Informasi (Pink)
      id: "informasi",
      icon: Info,
      text: "Informasi",
      href: "/informasi",
      colSpan: "col-span-1",
      rowSpan: "row-span-1",
      mdColSpan: "md:col-span-1",
      mdRowSpan: "md:row-span-1",
      bgColor: "bg-softPink", // Use soft pink #FFD1DC
      // Consider a darker text for better contrast on light pink if needed
      textColor: "text-gray-800", // Darker text on light pink
      isInteractive: true,
      isWidget: true,
    },
    // Row 3
    { // Karya (Coming Soon)
      id: "karya",
      icon: Feather,
      text: "Karya",
      colSpan: "col-span-2 sm:col-span-2",
      rowSpan: "row-span-1",
      mdColSpan: "md:col-span-2",
      mdRowSpan: "md:row-span-1",
      bgColor: "bg-secondary", // Dark grey
      textColor: "text-foreground/60", // Muted text
      isInteractive: false,
      comingSoon: true,
    },
     { // Widget 5: Pengumuman (Teal)
      id: "pengumuman",
      icon: Bell,
      text: "Pengumuman",
      href: "/pengumuman",
      colSpan: "col-span-1",
      rowSpan: "row-span-1",
      mdColSpan: "md:col-span-1",
      mdRowSpan: "md:row-span-1",
      bgColor: "bg-turquoise", // Use darker teal #40E0D0
      textColor: "text-foreground",
      isInteractive: true,
      isWidget: true,
    },
    { // Logo Visual Accent
      id: "logo-visual",
      colSpan: "col-span-1",
      rowSpan: "row-span-1",
      mdColSpan: "md:col-span-1",
      mdRowSpan: "md:row-span-1",
      content: (
         <div className="flex items-center justify-center h-full relative overflow-hidden">
            {/* Simplified background elements */}
            <div className="absolute inset-0 bg-gradient-radial from-lavender/10 via-transparent to-transparent opacity-50 blur-md"></div>
            <motion.img
              src="/lovable-uploads/c861a7c0-5ec9-4bac-83ea-319c40fcb001.png" // Fish logo
              alt="Logo Icon"
              className="w-12 h-12 md:w-16 md:h-16 object-contain relative z-10"
              loading="eager"
              whileHover={{ scale: 1.1, rotate: 3 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
         </div>
      ),
      bgColor: "bg-foreground/5", // Very subtle dark bg
      isInteractive: false,
    },
    // Row 4 - Designer Credit
     {
      id: "designer-credit",
      colSpan: "col-span-2 sm:col-span-2",
      rowSpan: "row-span-1",
      mdColSpan: "md:col-span-4",
      mdRowSpan: "md:row-span-1",
      content: (
         <div className="flex items-center justify-center h-full text-center p-3 md:p-4">
           <p className="text-xs sm:text-sm text-foreground/50 font-sans flex items-center gap-2">
             <Code size={14} className="opacity-70"/> {/* Slightly smaller icon */}
             <span>© 2024 OUR CREATIVITY • Designed by Ardellio S. A.</span>
           </p>
         </div>
      ),
      bgColor: "bg-secondary", // Use secondary dark grey for contrast
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
      {/* --- Simplified Static Background --- */}
      <div className="fixed inset-0 -z-10 opacity-90">
        {/* Main Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary to-background"></div>
        {/* Subtle Accent Blurs */}
        <div className="absolute w-[50vw] h-[50vh] rounded-full blur-[100px] bg-amethyst/5 -top-[10%] -right-[10%] opacity-60"></div>
        <div className="absolute w-[40vw] h-[40vh] rounded-full blur-[90px] bg-turquoise/5 -bottom-[10%] -left-[10%] opacity-50"></div>
        {/* Subtle Noise Pattern */}
        <div className="absolute inset-0 noise-pattern opacity-5"></div>
      </div>

      {/* --- Main Content Area: Bento Grid --- */}
      <div className="relative z-10 container mx-auto p-3 sm:p-4 md:p-6 flex-grow flex items-center justify-center h-full">
        <motion.div
          // Responsive Grid: 2 cols mobile, 4 cols desktop
          // Use aspect ratio for tiles to help maintain shape
          className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 w-full h-full max-h-[calc(100vh-6rem)] md:max-h-[calc(100vh-8rem)]" // Adjust max-h as needed
          style={{ gridAutoRows: 'minmax(0, 1fr)' }} // Let rows size naturally based on content/height
          variants={gridContainerVariants}
          initial="hidden"
          animate="visible"
        >
          {bentoTiles.map((tile) => {
            const { id, colSpan, rowSpan, mdColSpan, mdRowSpan, content, bgColor, textColor, icon: Icon, text, href, isInteractive, comingSoon, isWidget } = tile;

            const MotionComponent = motion.div; // Use motion.div always, handle click internally

            return (
              <MotionComponent
                key={id}
                layout
                variants={gridItemVariants}
                className={`relative group overflow-hidden rounded-xl md:rounded-2xl shadow-lg border border-white/5 ${colSpan} ${rowSpan} ${mdColSpan || colSpan} ${mdRowSpan || rowSpan} ${bgColor} ${textColor || 'text-foreground'} ${comingSoon ? 'opacity-75 filter grayscale-[60%]' : ''}`} // Added subtle border
                whileHover={isInteractive && !comingSoon ? interactiveHover : {}}
                whileTap={isInteractive && !comingSoon ? interactiveTap : {}}
                onClick={isInteractive && !comingSoon && href ? () => navigate(href) : undefined}
                style={isInteractive && !comingSoon ? { cursor: 'pointer' } : { cursor: 'default' }}
              >
                 {/* Static Border Gradient Effect (Requires CSS) */}
                 <div className={`static-border-gradient ${isWidget ? 'widget-border' : 'default-border'} ${id}`} data-color={bgColor}></div>

                 {/* Content Area with Padding */}
                 <div className="relative z-10 h-full w-full p-3 md:p-4 flex flex-col justify-center items-center text-center">
                    {comingSoon ? (
                      // Coming Soon Layout
                      <>
                        <Icon className="w-7 h-7 md:w-8 md:h-8 mb-1 opacity-60 text-amber-500" />
                        <span className="text-sm md:text-base font-serif font-medium opacity-80">{text}</span>
                        <span className="flex items-center gap-1 text-xs font-sans text-amber-500/80 mt-1">
                          <Clock size={12} />
                          Coming Soon
                        </span>
                      </>
                    ) : isWidget ? (
                       // Widget Layout
                       <>
                         <div className={`mb-2 p-2 ${isWidget ? 'bg-black/15' : 'bg-black/10'} rounded-full backdrop-blur-sm shadow-inner`}>
                           <Icon className={`w-5 h-5 md:w-6 md:h-6 transition-transform duration-300 group-hover:scale-110 ${textColor || 'text-foreground'}`} />
                         </div>
                         <span className={`text-xs md:text-sm font-serif font-medium ${textColor || 'text-foreground'}`}>{text}</span>
                       </>
                    ) : Icon && text ? (
                       // Standard Icon/Text (If needed)
                       <>
                          <Icon className="w-6 h-6 md:w-8 md:h-8 mb-1" />
                          <span className="text-xs md:text-sm font-serif">{text}</span>
                       </>
                     ) : (
                       // Custom Content (Title, Logo Visual)
                       <div className="h-full w-full flex"> {content} </div>
                    )}
                 </div>
              </MotionComponent>
            );
          })}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Index;
