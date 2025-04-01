// src/pages/Index.tsx
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
// Button component is not directly used for tiles anymore
import { BookOpen, Info, Bell, ScrollText, Users, Palette, Feather, Image } from "lucide-react"; // Ensure Image icon is imported

const Index = () => {
  const navigate = useNavigate();

  // --- Animation Variants ---
  // Stagger animation for the grid container
  const gridContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08, // Time between each child animation starts
        delayChildren: 0.2,   // Wait before starting the first child
      }
    }
  };

  // Animation for individual grid items appearing
  const gridItemVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 }, // Start slightly smaller, lower, and invisible
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring", // Use spring physics for entrance
        stiffness: 100, // How stiff the spring is
        damping: 12,    // How much opposition/drag
        mass: 0.5,      // Mass of the object (affects overshoot)
      }
    }
  };

  // --- Bento Grid Tile Content & Configuration ---
  // Defines the structure, content, and appearance of each tile
  const bentoTiles = [
    {
      id: "title",
      colSpan: "col-span-2 md:col-span-2", // Adjusted span for 4-col layout
      rowSpan: "row-span-2 md:row-span-2",
      content: (
        // Content for the main title tile
        <div className="flex flex-col justify-center h-full p-4 md:p-6 text-left">
           <motion.h1
             className="text-4xl lg:text-5xl xl:text-6xl font-serif font-bold mb-2 md:mb-3 text-foreground leading-tight home-title" // Apply CSS class for gradient text
           >
             OUR CREATIVITY
           </motion.h1>
           <p className="text-sm md:text-base lg:text-lg text-foreground/80 font-sans max-w-md">
             Dimana imajinasi bertemu dengan inovasi. Bergabunglah dengan komunitas kreatif kami.
           </p>
        </div>
      ),
      bgColor: "bg-foreground/5", // Subtle background tint
      hasAnimatedBorder: true,     // Enable the animated border effect
    },
    {
      id: "logo-fish", // Tile for the icon logo
      colSpan: "col-span-1",
      rowSpan: "row-span-1",
      content: (
         <div className="flex items-center justify-center h-full p-2">
            <img
              src="/lovable-uploads/c861a7c0-5ec9-4bac-83ea-319c40fcb001.png" // Ensure this path is correct
              alt="OurCreativity Fish Logo"
              className="w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 object-contain transition-transform duration-300 group-hover:scale-110"
              loading="eager" // Load important images quickly
            />
         </div>
      ),
      bgColor: "bg-gradient-to-br from-lavender/10 to-amethyst/10", // Use accent gradient
      hasAnimatedBorder: true,
    },
     {
      id: "cerita", // Navigation tile
      icon: BookOpen,
      text: "Cerita Kami",
      href: "/brand-story", // Link destination
      colSpan: "col-span-1",
      rowSpan: "row-span-1",
      bgColor: "bg-gradient-to-br from-lavender/5 to-amethyst/5", // Subtle accent gradient
      hasAnimatedBorder: true,
    },
    {
      id: "tim", // Navigation tile
      icon: Users,
      text: "Tim Kami",
      href: "/tim-kami",
      colSpan: "col-span-1",
      rowSpan: "row-span-1",
      bgColor: "bg-gradient-to-br from-mint/5 to-turquoise/5",
      hasAnimatedBorder: true,
    },
    {
      id: "syarat", // Navigation tile
      icon: ScrollText,
      text: "Syarat & Ketentuan",
      href: "/terms",
      colSpan: "col-span-1",
      rowSpan: "row-span-1",
      bgColor: "bg-gradient-to-br from-peach/5 to-coral/5",
      hasAnimatedBorder: true,
    },
    {
      id: "informasi", // Navigation tile
      icon: Info,
      text: "Informasi",
      href: "/informasi",
      colSpan: "col-span-1",
      rowSpan: "row-span-1",
      bgColor: "bg-gradient-to-br from-softPink/5 to-amber/5",
      hasAnimatedBorder: true,
    },
    {
      id: "pengumuman", // Navigation tile
      icon: Bell,
      text: "Pengumuman",
      href: "/pengumuman",
      colSpan: "col-span-1",
      rowSpan: "row-span-1",
      bgColor: "bg-gradient-to-br from-turquoise/5 to-mint/5",
      hasAnimatedBorder: true,
    },
    { // NEW KARYA TILE - Placeholder
      id: "karya",
      icon: Image, // Icon for 'Works' or 'Gallery'
      text: "Karya", // Text label
      colSpan: "col-span-1",
      rowSpan: "row-span-1",
      content: ( // Custom content to display 'Coming Soon'
         <div className="flex flex-col items-center justify-center h-full gap-2 p-4 text-center relative opacity-60 group-hover:opacity-80 transition-opacity duration-300"> {/* Dimmed appearance */}
           {/* "Soon" badge */}
           <div className="absolute top-2 right-2 bg-amber/90 text-background text-[9px] md:text-[10px] font-sans font-semibold px-1.5 py-0.5 rounded-full shadow-sm">
             Soon
           </div>
           {/* Icon container */}
           <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center bg-foreground/5 backdrop-blur-sm">
             <Image className="w-5 h-5 md:w-6 md:h-6 text-foreground/80" /> {/* Slightly less dimmed icon */}
           </div>
           {/* Text label */}
           <span className="text-xs md:text-sm font-serif text-foreground/80">
             Karya
           </span>
         </div>
       ),
      bgColor: "bg-foreground/3", // Different background for visual distinction
      hasAnimatedBorder: true,
      isClickable: false, // Explicitly non-clickable
    },
  ];

  return (
    // Main container div
    <motion.div
      initial={{ opacity: 0 }} // Start invisible
      animate={{ opacity: 1 }} // Fade in
      exit={{ opacity: 0 }}    // Fade out on page exit
      className="min-h-screen overflow-hidden relative perspective-1000" // Prevent scrollbars from content overflow, enable 3D perspective if needed
    >
      {/* Animated Gradient Background */}
      <motion.div
        className="absolute inset-0 -z-10 bg-animated-gradient" // CSS class handles the gradient and animation
        aria-hidden="true" // Hide from screen readers
      />

      {/* Main Content Area: Centered Bento Grid */}
      <div className="relative z-10 container mx-auto px-4 py-16 md:py-24 min-h-screen flex items-center justify-center"> {/* Centers the grid */}
        {/* The Bento Grid */}
        <motion.div
          // Defines the grid layout: 3 columns default, 4 on medium screens+
          // Gap between grid items
          // Max width to control overall size
          // Base height for rows (content can expand them)
          className="grid grid-cols-3 md:grid-cols-4 gap-4 md:gap-6 w-full max-w-4xl auto-rows-[120px] md:auto-rows-[150px]"
          variants={gridContainerVariants} // Apply container animation variants
          initial="hidden"                 // Start in hidden state
          animate="visible"                // Animate to visible state
        >
          {/* Map over the tile definitions to render each tile */}
          {bentoTiles.map((tile) => {
            // Destructure properties for easier access
            const { id, colSpan, rowSpan, content, bgColor, icon: Icon, text, href, hasAnimatedBorder, isClickable: tileIsClickable } = tile;

            // Determine clickability based on href presence and explicit flag
            const finalIsClickable = tileIsClickable !== false && !!href;
            // Choose component type based on clickability (button or div)
            const MotionComponent = finalIsClickable ? motion.button : motion.div;

            return (
              // Render the individual tile component
              <MotionComponent
                key={id} // Unique key for React list rendering
                variants={gridItemVariants} // Apply item animation variants
                className={`relative group overflow-hidden rounded-2xl backdrop-blur-xl border border-transparent ${colSpan} ${rowSpan} ${bgColor} ${finalIsClickable ? 'cursor-pointer' : 'cursor-default'}`} // Base tile styling
                onClick={finalIsClickable ? () => navigate(href) : undefined} // Navigate on click if clickable
                // Framer Motion hover and tap animations
                whileHover={{ scale: 1.04 }} // Scale up slightly on hover
                whileTap={finalIsClickable ? { scale: 0.98 } : {}} // Scale down slightly on tap if clickable
                layout // Enables smooth animation if grid position/size changes
              >
                {/* Animated Glowing Border Element (Conditionally Rendered) */}
                {hasAnimatedBorder && (
                   <motion.div
                      className="absolute inset-0 border rounded-2xl border-gradient-animated transition-glow" // CSS class handles border animation + add base transition class
                      aria-hidden="true"
                    />
                 )}

                {/* Inner content wrapper */}
                <div className="relative z-10 h-full w-full p-1">
                  {/* Render standard Icon/Text content OR custom content */}
                  {Icon && text ? (
                    // Standard layout for navigation tiles
                    <div className="flex flex-col items-center justify-center h-full gap-2 text-center p-2">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center bg-foreground/10 backdrop-blur-sm transition-colors duration-300 group-hover:bg-foreground/15">
                        <Icon className="w-5 h-5 md:w-6 md:h-6 transition-transform duration-300 group-hover:scale-110 text-foreground" />
                      </div>
                      <span className="text-xs md:text-sm font-serif transition-colors duration-300 text-foreground group-hover:text-foreground/90">{text}</span>
                    </div>
                  ) : (
                    // Render the custom JSX content passed in the tile definition
                    content
                  )}
                </div>

                 {/* Subtle Shimmer Effect on hover for clickable items */}
                 {finalIsClickable && (
                   <span
                     className="absolute inset-0 bg-shimmer-gradient bg-[length:200%_100%] opacity-0 group-hover:opacity-[0.07] transition-opacity duration-500 group-hover:animate-shimmer" // Low opacity shimmer
                     aria-hidden="true"
                   />
                  )}
              </MotionComponent>
            );
          })}
        </motion.div>
      </div>

      {/* Footer Section */}
      <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.8 }} // Animate footer after grid settles
          className="absolute bottom-0 left-0 right-0 z-10 pt-8 pb-6 text-center" // Position at bottom
        >
         {/* Styled footer container */}
         <div className="backdrop-blur-xl bg-foreground/5 border border-foreground/10 rounded-full px-6 py-3 inline-block relative overflow-hidden group hover:border-foreground/20 transition-colors duration-300 shadow-lg shadow-black/20">
            {/* Subtle gradient effect on hover */}
            <span className="absolute inset-0 bg-gradient-to-r from-amethyst/0 via-amethyst/5 to-amethyst/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" aria-hidden="true"></span>
             {/* Copyright text */}
             <p className="text-xs text-foreground/50 group-hover:text-foreground/60 transition-colors duration-300 relative z-10"> {/* Ensure text is above gradient */}
              © 2024 OUR CREATIVITY • Designed by Ardellio S. A.
             </p>
          </div>
       </motion.div>

    </motion.div> // End of main container div
  );
};

export default Index; // Export the component
