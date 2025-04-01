// src/pages/Index.tsx
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { BookOpen, Info, Bell, ScrollText, Users, Palette, Feather, Clock, Code } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  // --- Animation Variants (Keep simplified) ---
  const gridContainerVariants = { /* ... as before ... */ };
  const gridItemVariants = { /* ... as before ... */ };

  // --- Simplified Hover Animation ---
  const interactiveHover = {
    y: -4,
    scale: 1.03,
    boxShadow: "0 8px 20px -4px rgba(0, 0, 0, 0.35)", // Slightly adjusted shadow
    transition: { type: "spring", stiffness: 350, damping: 20 }
  };

  const interactiveTap = { /* ... as before ... */ };


  // --- Bento Grid Tile Configuration (Dark Theme Focus, Accent Icon BG) ---
  const bentoTiles = [
    // Row 1
    {
      id: "title",
      colSpan: "col-span-2 sm:col-span-2",
      rowSpan: "row-span-2",
      mdColSpan: "md:col-span-2",
      mdRowSpan: "md:row-span-2",
      content: ( /* ... Title content as before ... */ ),
      bgColor: "bg-secondary", // Consistent dark background
      isInteractive: false,
    },
    { // Widget 1: Cerita Kami (Amethyst Accent)
      id: "cerita",
      icon: BookOpen,
      text: "Cerita Kami",
      href: "/brand-story",
      colSpan: "col-span-1", rowSpan: "row-span-1", mdColSpan: "md:col-span-1", mdRowSpan: "md:row-span-1",
      bgColor: "bg-secondary", // Dark background
      accentColorClass: "bg-amethyst", // Accent for icon background
      iconColorClass: "text-background", // Contrast on accent bg
      isInteractive: true, isWidget: true,
    },
    { // Widget 2: Tim Kami (Turquoise Accent)
      id: "tim",
      icon: Users,
      text: "Tim Kami",
      href: "/tim-kami",
      colSpan: "col-span-1", rowSpan: "row-span-1", mdColSpan: "md:col-span-1", mdRowSpan: "md:row-span-1",
      bgColor: "bg-secondary",
      accentColorClass: "bg-turquoise",
      iconColorClass: "text-background",
      isInteractive: true, isWidget: true,
    },
    // Row 2
    { // Widget 3: Syarat (Coral Accent)
      id: "syarat",
      icon: ScrollText,
      text: "Syarat & Ketentuan",
      href: "/terms",
      colSpan: "col-span-1", rowSpan: "row-span-1", mdColSpan: "md:col-span-1", mdRowSpan: "md:row-span-1",
      bgColor: "bg-secondary",
      accentColorClass: "bg-coral",
      iconColorClass: "text-background",
      isInteractive: true, isWidget: true,
    },
    { // Widget 4: Informasi (SoftPink Accent)
      id: "informasi",
      icon: Info,
      text: "Informasi",
      href: "/informasi",
      colSpan: "col-span-1", rowSpan: "row-span-1", mdColSpan: "md:col-span-1", mdRowSpan: "md:row-span-1",
      bgColor: "bg-secondary",
      accentColorClass: "bg-softPink",
      iconColorClass: "text-gray-800", // Darker icon on light pink
      isInteractive: true, isWidget: true,
    },
    // Row 3
    { // Karya (Coming Soon)
      id: "karya",
      icon: Feather,
      text: "Karya",
      colSpan: "col-span-2 sm:col-span-2", rowSpan: "row-span-1", mdColSpan: "md:col-span-2", mdRowSpan: "md:row-span-1",
      bgColor: "bg-secondary",
      textColor: "text-foreground/60", // Muted text remains
      isInteractive: false, comingSoon: true,
    },
     { // Widget 5: Pengumuman (Turquoise Accent)
      id: "pengumuman",
      icon: Bell,
      text: "Pengumuman",
      href: "/pengumuman",
      colSpan: "col-span-1", rowSpan: "row-span-1", mdColSpan: "md:col-span-1", mdRowSpan: "md:row-span-1",
      bgColor: "bg-secondary",
      accentColorClass: "bg-turquoise",
      iconColorClass: "text-background",
      isInteractive: true, isWidget: true,
    },
    { // Logo Visual Accent
      id: "logo-visual",
      colSpan: "col-span-1", rowSpan: "row-span-1", mdColSpan: "md:col-span-1", mdRowSpan: "md:row-span-1",
      content: ( /* ... Logo visual content as before ... */ ),
      bgColor: "bg-foreground/5", // Keep slightly different dark bg
      isInteractive: false,
    },
    // Row 4 - Designer Credit
     {
      id: "designer-credit",
      colSpan: "col-span-2 sm:col-span-2", rowSpan: "row-span-1", mdColSpan: "md:col-span-4", mdRowSpan: "md:row-span-1",
      content: ( /* ... Designer credit content as before ... */ ),
      bgColor: "bg-secondary", // Consistent dark bg
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
      {/* --- Simplified Static Background (Keep as is) --- */}
      <div className="fixed inset-0 -z-10 opacity-90">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary to-background"></div>
        <div className="absolute w-[50vw] h-[50vh] rounded-full blur-[100px] bg-amethyst/5 -top-[10%] -right-[10%] opacity-60"></div>
        <div className="absolute w-[40vw] h-[40vh] rounded-full blur-[90px] bg-turquoise/5 -bottom-[10%] -left-[10%] opacity-50"></div>
        <div className="absolute inset-0 noise-pattern opacity-5"></div>
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
            // Destructure new props
            const { id, colSpan, rowSpan, mdColSpan, mdRowSpan, content, bgColor, textColor, accentColorClass, iconColorClass, icon: Icon, text, href, isInteractive, comingSoon, isWidget } = tile;

            const MotionComponent = motion.div;

            return (
              <MotionComponent
                key={id}
                layout
                variants={gridItemVariants}
                className={`relative group overflow-hidden rounded-xl md:rounded-2xl shadow-lg border border-white/5 
                           ${colSpan} ${rowSpan} ${mdColSpan || colSpan} ${mdRowSpan || rowSpan} 
                           ${bgColor} ${textColor || 'text-foreground'} 
                           ${comingSoon ? 'opacity-75 filter grayscale-[60%]' : ''}`}
                whileHover={isInteractive && !comingSoon ? interactiveHover : {}}
                whileTap={isInteractive && !comingSoon ? interactiveTap : {}}
                onClick={isInteractive && !comingSoon && href ? () => navigate(href) : undefined}
                style={isInteractive && !comingSoon ? { cursor: 'pointer' } : { cursor: 'default' }}
              >
                 {/* Content Area */}
                 <div className="relative z-10 h-full w-full p-3 md:p-4 flex flex-col justify-center items-center text-center">
                    {comingSoon ? (
                      // Coming Soon Layout
                      <>
                        <Icon className={`w-7 h-7 md:w-8 md:h-8 mb-1 opacity-60 ${textColor || 'text-amber-500'}`} />
                        <span className={`text-sm md:text-base font-serif font-medium opacity-80 ${textColor || 'text-foreground/60'}`}>{text}</span>
                        <span className="flex items-center gap-1 text-xs font-sans text-amber-500/80 mt-1">
                          <Clock size={12} />
                          Coming Soon
                        </span>
                      </>
                    ) : isWidget ? (
                       // Widget Layout with Accent Icon Background
                       <>
                         {/* Accent Background for Icon */}
                         <div className={`mb-2 md:mb-3 p-2.5 md:p-3 ${accentColorClass} rounded-lg shadow-md transition-transform duration-300 group-hover:scale-110`}>
                           <Icon className={`w-5 h-5 md:w-6 md:h-6 ${iconColorClass || 'text-background'}`} />
                         </div>
                         <span className={`text-xs md:text-sm font-serif font-medium ${textColor || 'text-foreground'}`}>{text}</span>
                       </>
                    ) : content ? ( // Handle custom content (Title, Logo Visual, Designer Credit)
                       <div className="h-full w-full flex"> {content} </div>
                     ) : null /* Fallback for tiles without content defined */
                    }
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
