import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Calendar, Users, Megaphone, BookOpen, Info, FileText, Palette, Trophy, Sparkles } from "lucide-react";
import PageLayout from "../components/layouts/PageLayout"; // Assuming this component exists
// import { Dialog, DialogContent } from "@/components/ui/dialog"; // Assuming these exist if selectedTile logic were to be used for a modal
import { useNavigate } from "react-router-dom";
// import { useIsMobile } from "@/hooks/use-mobile"; // Assuming this hook exists and works

// Mock useIsMobile hook if not available for standalone execution
const useIsMobile = () => {
  // In a real scenario, this would use window.matchMedia
  const [isMobile, setIsMobile] = useState(false);
  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768); // Example breakpoint for sm
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  return isMobile;
};


interface BentoTile {
  id: string;
  title: string;
  description: string;
  icon: React.FC<{ className?: string }>;
  color: string;
  gradientFrom: string;
  gradientTo: string;
  path: string;
  size: "normal" | "large";
  pattern: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07, // Slightly faster stagger
      delayChildren: 0.2
    },
  },
};

const tileVariants = {
  hidden: { opacity: 0, y: 25, scale: 0.98 }, // Adjusted animation
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5, // Slightly faster duration
      ease: [0.35, 0, 0.2, 1], // Adjusted easing
    },
  },
};

const Index = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile(); // Useful for conditional rendering if needed beyond CSS
  // const [selectedTile, setSelectedTile] = useState<BentoTile | null>(null); // Kept if modal feature is desired later
  const [hoveredTile, setHoveredTile] = useState<string | null>(null);

  const handleTileClick = (tile: BentoTile) => {
    navigate(tile.path);
  };

  const bentoTiles: BentoTile[] = [
    {
      id: "pengumuman",
      title: "Pengumuman",
      description: "Info terbaru & update penting komunitas.",
      icon: Megaphone,
      color: "bg-gradient-to-br from-red-500/20 to-pink-600/30",
      gradientFrom: "from-red-500/10",
      gradientTo: "to-pink-600/20",
      path: "/pengumuman",
      size: "large",
      pattern: "dots"
    },
    {
      id: "tim-kami",
      title: "Tim Kami",
      description: "Kenali para kreator & kontributor.",
      icon: Users,
      color: "bg-gradient-to-br from-blue-500/20 to-cyan-600/30",
      gradientFrom: "from-blue-500/10",
      gradientTo: "to-cyan-600/20",
      path: "/tim-kami",
      size: "normal",
      pattern: "circles"
    },
    {
      id: "karya-kami",
      title: "Karya Kami",
      description: "Galeri karya kreatif anggota.",
      icon: Palette,
      color: "bg-gradient-to-br from-purple-500/20 to-indigo-600/30",
      gradientFrom: "from-purple-500/10",
      gradientTo: "to-indigo-600/20",
      path: "/karya-kami",
      size: "large",
      pattern: "waves"
    },
    {
      id: "brand-story",
      title: "Brand Story",
      description: "Perjalanan & visi misi komunitas.",
      icon: BookOpen,
      color: "bg-gradient-to-br from-emerald-500/20 to-teal-600/30",
      gradientFrom: "from-emerald-500/10",
      gradientTo: "to-teal-600/20",
      path: "/brand-story",
      size: "normal",
      pattern: "hexagon"
    },
    {
      id: "informasi",
      title: "Informasi",
      description: "Detail komunitas & cara bergabung.",
      icon: Info,
      color: "bg-gradient-to-br from-orange-500/20 to-amber-600/30",
      gradientFrom: "from-orange-500/10",
      gradientTo: "to-amber-600/20",
      path: "/informasi",
      size: "normal",
      pattern: "triangles"
    },
    {
      id: "terms",
      title: "Syarat & Ketentuan",
      description: "Panduan & aturan komunitas.",
      icon: FileText,
      color: "bg-gradient-to-br from-slate-500/20 to-gray-600/30",
      gradientFrom: "from-slate-500/10",
      gradientTo: "to-gray-600/20",
      path: "/terms",
      size: "normal",
      pattern: "grid"
    }
  ];

  // Function to generate tile spanning classes based on size and breakpoints
  const getTileSpanClasses = (size: "normal" | "large"): string => {
    if (size === "large") {
      // Mobile: full width (2 out of 2 cols)
      // Tablet (sm): full width (4 out of 4 cols)
      // Desktop (lg): 2/3 width (4 out of 6 cols) or 1/2 (3 out of 6 cols)
      // Let's try 3 out of 6 for desktop to allow two large tiles or other combinations
      return "col-span-2 sm:col-span-4 lg:col-span-3";
    }
    // Normal tile:
    // Mobile: half width (1 out of 2 cols)
    // Tablet (sm): half width (2 out of 4 cols)
    // Desktop (lg): 1/3 width (2 out of 6 cols)
    return "col-span-1 sm:col-span-2 lg:col-span-2";
  };


  const getPatternSvg = (pattern: string, id: string) => {
    // Opacity adjusted here for global control, or can be fine-tuned per pattern
    const baseOpacity = "opacity-15"; // Base opacity for patterns
    switch (pattern) {
      case "dots":
        return (
          <svg className={`absolute inset-0 w-full h-full ${baseOpacity} text-white/60`} viewBox="0 0 100 100">
            <defs>
              <pattern id={`dots-${id}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="10" r="1.5" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#dots-${id})`} />
          </svg>
        );
      case "circles":
        return (
          <svg className={`absolute inset-0 w-full h-full ${baseOpacity} text-white/50`} viewBox="0 0 100 100">
            <defs>
              <pattern id={`circles-${id}`} x="0" y="0" width="25" height="25" patternUnits="userSpaceOnUse">
                <circle cx="12.5" cy="12.5" r="10" fill="none" stroke="currentColor" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#circles-${id})`} />
          </svg>
        );
      // Other patterns remain similar, can adjust opacity/stroke etc. if needed
      case "waves":
        return (
          <svg className={`absolute inset-0 w-full h-full ${baseOpacity} text-white/50`} viewBox="0 0 100 100">
            <defs>
              <pattern id={`waves-${id}`} x="0" y="0" width="30" height="15" patternUnits="userSpaceOnUse">
                <path d="M0,7.5 Q7.5,0 15,7.5 T30,7.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#waves-${id})`} />
          </svg>
        );
      case "hexagon":
        return (
          <svg className={`absolute inset-0 w-full h-full opacity-10 text-white/50`} viewBox="0 0 100 100">
            <defs>
              <pattern id={`hexagon-${id}`} x="0" y="0" width="20" height="17.32" patternUnits="userSpaceOnUse">
                <polygon points="10,2 18,7 18,14 10,19 2,14 2,7" fill="none" stroke="currentColor" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#hexagon-${id})`} />
          </svg>
        );
      case "triangles":
        return (
          <svg className={`absolute inset-0 w-full h-full ${baseOpacity} text-white/60`} viewBox="0 0 100 100">
            <defs>
              <pattern id={`triangles-${id}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <polygon points="10,3 17,17 3,17" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#triangles-${id})`} />
          </svg>
        );
      case "grid":
        return (
          <svg className={`absolute inset-0 w-full h-full opacity-10 text-white/50`} viewBox="0 0 100 100">
            <defs>
              <pattern id={`grid-${id}`} x="0" y="0" width="15" height="15" patternUnits="userSpaceOnUse">
                <path d="M15,0 L0,0 L0,15" fill="none" stroke="currentColor" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#grid-${id})`} />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <PageLayout 
      title="Beranda"
      subtitle="Platform kolaborasi dan kreativitas untuk komunitas Indonesia"
      showBackButton={false}
    >
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mb-10 sm:mb-12" // Slightly reduced bottom margin
      >
        <div className="text-center space-y-4 sm:space-y-5"> {/* Reduced space-y */}
          <motion.h1 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight text-foreground dark:text-foreground-dark" // Assuming foreground colors
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Selamat Datang di{" "}
            <span className="bg-gradient-to-r from-amethyst via-turquoise to-coral bg-clip-text text-transparent animate-gradient-cycle bg-300% font-extrabold">
              OUR CREATIVITY
            </span>
          </motion.h1>
          
          <motion.p
            className="text-md sm:text-lg md:text-xl text-foreground/80 dark:text-foreground-dark/80 leading-relaxed max-w-3xl mx-auto" // Reduced max-width slightly
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Jelajahi, berkolaborasi, dan ciptakan karya luar biasa bersama kami.
          </motion.p>

          <motion.div
            className="flex items-center justify-center gap-2 text-xs sm:text-sm text-foreground/60 dark:text-foreground-dark/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amethyst" />
            <span>Dunia kreativitas tanpa batas menanti</span>
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-coral" />
          </motion.div>
        </div>
      </motion.div>

      {/* Main Navigation Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 auto-rows-fr" // Updated grid layout
      >
        {bentoTiles.map((tile, index) => (
          <motion.div
            key={tile.id}
            variants={tileVariants}
            className={`relative group cursor-pointer rounded-2xl sm:rounded-3xl overflow-hidden backdrop-blur-md border border-neutral-200/20 dark:border-neutral-700/30 hover:border-neutral-300/30 dark:hover:border-neutral-600/40 transition-all duration-300
                        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-500 dark:focus-visible:ring-sky-400 focus-visible:ring-offset-background dark:focus-visible:ring-offset-background-dark
                        ${getTileSpanClasses(tile.size)} ${tile.color}`}
            onClick={() => handleTileClick(tile)}
            onMouseEnter={() => setHoveredTile(tile.id)}
            onMouseLeave={() => setHoveredTile(null)}
            whileHover={{ 
              scale: 1.02, 
              y: -6, // Slightly less lift
              transition: { duration: 0.25, ease: "easeOut" }
            }}
            whileTap={{ scale: 0.98 }}
            tabIndex={0} // Make it focusable
            role="button" // ARIA role
            aria-label={tile.title}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 text-white/20 dark:text-black/20 pointer-events-none">
              {getPatternSvg(tile.pattern, tile.id)}
            </div>
            
            {/* Gradient Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-br ${tile.gradientFrom} ${tile.gradientTo} opacity-80 group-hover:opacity-70 transition-opacity duration-300`} />
            
            {/* Animated Background Glow - subtle */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/5"
              animate={{
                opacity: hoveredTile === tile.id ? [0.3, 0.6, 0.3] : 0.2,
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            <div className={`relative z-10 p-4 sm:p-5 h-full flex flex-col justify-between ${ // Adjusted padding
              tile.size === "large" ? "min-h-[170px] sm:min-h-[190px]" : "min-h-[140px] sm:min-h-[160px]" // Adjusted min-height
            }`}>
              {/* Header */}
              <div className="space-y-3 sm:space-y-3.5"> {/* Adjusted spacing */}
                <motion.div
                  className="flex items-center justify-between"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/20 transition-colors duration-300 shadow-lg">
                    <tile.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white drop-shadow-sm" /> {/* Adjusted icon size */}
                  </div>
                  
                  {index < 2 && ( // Show "Populer" for first two tiles
                    <motion.div
                      className="px-2.5 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs font-medium text-white/90 border border-white/20"
                      animate={{ scale: [1, 1.03, 1] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <Trophy className="w-2.5 h-2.5 sm:w-3 sm:h-3 inline mr-1" />
                      Populer
                    </motion.div>
                  )}
                </motion.div>

                <div className="space-y-1.5 sm:space-y-2">
                  <motion.h3 
                    className="text-md sm:text-lg font-serif font-semibold text-white leading-tight drop-shadow-sm group-hover:text-white" // Adjusted font size & weight
                    // whileHover={{ x: 3 }} // Subtle hover effect on text
                    // transition={{ duration: 0.2 }}
                  >
                    {tile.title}
                  </motion.h3>
                  
                  <p className={`text-white/70 group-hover:text-white/80 leading-snug drop-shadow-sm ${ // Adjusted opacity and leading
                    tile.size === "large" ? "text-xs sm:text-sm" : "text-xs" // Adjusted font size
                  }`}>
                    {tile.description}
                  </p>
                </div>
              </div>

              {/* Footer */}
              <motion.div 
                className="flex items-center justify-between mt-auto pt-3 sm:pt-4" // Adjusted padding
                initial={{ opacity: 0.8 }}
                whileHover={{ opacity: 1 }}
              >
                <div className="flex items-center gap-1.5 text-white/60 text-xs">
                  <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> {/* Adjusted icon size */}
                  <span>Update</span>
                </div>
                
                <motion.div 
                  className="flex items-center gap-1.5 sm:gap-2 text-white font-medium group-hover:gap-2 sm:group-hover:gap-2.5 transition-all duration-300"
                  // whileHover={{ x: 3 }}
                >
                  <span className="text-xs sm:text-sm">Jelajahi</span>
                  <motion.div
                    // whileHover={{ rotate: 45, scale: 1.1 }} // Can keep or remove for simplicity
                    // transition={{ duration: 0.2 }}
                  >
                    <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 drop-shadow-sm" /> {/* Adjusted icon size */}
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>

            {/* Hover Effect Overlay - subtle radial */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
              style={{
                background: hoveredTile === tile.id 
                  ? `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.0) 70%)`
                  : `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.0) 0%, rgba(255,255,255,0.0) 70%)`
              }}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Additional Stats Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }} // Adjusted y
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.6 }} // Adjusted delay and duration
        className="mt-12 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4" // Adjusted gap and margin
      >
        {[
          { label: "Anggota Aktif", value: "500+", icon: Users },
          { label: "Karya Terbit", value: "1.2K+", icon: Palette },
          { label: "Proyek Sukses", value: "250+", icon: Trophy },
          { label: "Event Seru", value: "50+", icon: Calendar }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            className="text-center p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-neutral-100/50 dark:bg-neutral-800/50 backdrop-blur-sm border border-neutral-200/30 dark:border-neutral-700/40 hover:border-neutral-300/40 dark:hover:border-neutral-600/50 transition-all duration-300 group"
            whileHover={{ scale: 1.04, y: -4 }}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.7 + (index * 0.08) }} // Adjusted delay and duration
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-2.5 rounded-lg sm:rounded-xl bg-amethyst/10 dark:bg-amethyst/20 flex items-center justify-center group-hover:bg-amethyst/20 dark:group-hover:bg-amethyst/30 transition-colors">
              <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-amethyst" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-foreground dark:text-foreground-dark mb-0.5 sm:mb-1">{stat.value}</div>
            <div className="text-xs sm:text-sm text-foreground/70 dark:text-foreground-dark/70">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>
    </PageLayout>
  );
};

export default Index;

// Dummy PageLayout for testing if not available
// const PageLayout: React.FC<{ title: string; subtitle: string; showBackButton: boolean; children: React.ReactNode }> = ({ title, subtitle, children }) => {
//   return (
//     <div className="p-4 bg-background dark:bg-background-dark min-h-screen text-foreground dark:text-foreground-dark">
//       <header className="mb-4">
//         <h1 className="text-2xl font-bold">{title}</h1>
//         <p className="text-sm text-neutral-600 dark:text-neutral-400">{subtitle}</p>
//       </header>
//       <main>{children}</main>
//     </div>
//   );
// };


// Add this to your tailwind.config.js if you don't have these colors and animations:
/**
module.exports = {
  // ...
  theme: {
    extend: {
      colors: {
        amethyst: '#9966CC', // Example
        turquoise: '#40E0D0', // Example
        coral: '#FF7F50',     // Example
        // Define your foreground/background for light/dark modes if PageLayout uses them
        // e.g. background: '#FFFFFF', background-dark: '#121212', foreground: '#111827', foreground-dark: '#E5E7EB'
      },
      animation: {
        'gradient-cycle': 'gradient-cycle 8s ease infinite',
      },
      keyframes: {
        'gradient-cycle': {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
      },
      backgroundSize: {
        '300%': '300% 300%',
      },
    },
  },
  // ...
};
*/
