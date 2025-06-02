import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Users, Megaphone, BookOpen, Info, FileText, Palette, Trophy, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Assuming PageLayout is a component you have defined elsewhere
import PageLayout from "src/components/layouts/PageLayout";

// Mock PageLayout for standalone demonstration if needed
const PageLayout: React.FC<{ title: string; subtitle?: string; showBackButton?: boolean; children: React.ReactNode }> = ({ title, subtitle, children }) => {
  return (
    <div className="p-4 sm:p-6 md:p-8 bg-background dark:bg-background-dark min-h-screen text-foreground dark:text-foreground-dark">
      <header className="mb-6 sm:mb-8">
        {title && <h1 className="text-3xl sm:text-4xl font-bold font-serif text-foreground dark:text-foreground-dark mb-2">{title}</h1>}
        {subtitle && <p className="text-md sm:text-lg text-foreground/70 dark:text-foreground-dark/70">{subtitle}</p>}
      </header>
      <main>{children}</main>
    </div>
  );
};


// Mock useIsMobile hook if not available globally in your project
// import { useIsMobile } from "@/hooks/use-mobile";
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
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
  color: string; // Base tile background (can be a gradient class)
  gradientFrom: string; // For the semi-transparent overlay
  gradientTo: string;   // For the semi-transparent overlay
  path: string;
  size: "normal" | "large";
  pattern: string;
  textColor?: string; // Optional specific text color for a tile
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.2
    },
  },
};

const tileVariants = {
  hidden: { opacity: 0, y: 25, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.35, 0, 0.2, 1],
    },
  },
};

const IndexPage = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
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
      color: "bg-gradient-to-br from-red-500/20 to-pink-600/30", // Example, adjust with your config colors if needed
      gradientFrom: "from-red-500/10",
      gradientTo: "to-pink-600/20",
      path: "/pengumuman",
      size: "large",
      pattern: "dots",
      textColor: "text-white"
    },
    {
      id: "tim-kami",
      title: "Tim Kami",
      description: "Kenali para kreator & kontributor.",
      icon: Users,
      color: "bg-gradient-to-br from-blueLight/20 to-blueDark/30",
      gradientFrom: "from-blueLight/10",
      gradientTo: "to-blueDark/20",
      path: "/tim-kami",
      size: "normal",
      pattern: "circles",
      textColor: "text-white"
    },
    {
      id: "karya-kami",
      title: "Karya Kami",
      description: "Galeri karya kreatif anggota.",
      icon: Palette,
      color: "bg-gradient-to-br from-purpleLight/20 to-purpleDark/30",
      gradientFrom: "from-purpleLight/10",
      gradientTo: "to-purpleDark/20",
      path: "/karya-kami",
      size: "large",
      pattern: "waves",
      textColor: "text-white"
    },
    {
      id: "brand-story",
      title: "Brand Story",
      description: "Perjalanan & visi misi komunitas.",
      icon: BookOpen,
      color: "bg-gradient-to-br from-emerald/20 to-teal-600/30", // Assuming teal-600 is a default tailwind color
      gradientFrom: "from-emerald/10",
      gradientTo: "to-teal-600/20",
      path: "/brand-story",
      size: "normal",
      pattern: "hexagon",
      textColor: "text-white"
    },
    {
      id: "informasi",
      title: "Informasi",
      description: "Detail komunitas & cara bergabung.",
      icon: Info,
      color: "bg-gradient-to-br from-orangeLight/20 to-orangeDark/30",
      gradientFrom: "from-orangeLight/10",
      gradientTo: "to-orangeDark/20",
      path: "/informasi",
      size: "normal",
      pattern: "triangles",
      textColor: "text-white"
    },
    {
      id: "terms",
      title: "Syarat & Ketentuan",
      description: "Panduan & aturan komunitas.",
      icon: FileText,
      color: "bg-gradient-to-br from-grayLight/20 to-grayMid/30",
      gradientFrom: "from-grayLight/10",
      gradientTo: "to-grayMid/20",
      path: "/terms",
      size: "normal",
      pattern: "grid",
      textColor: "text-white"
    }
  ];

  const getTileSpanClasses = (size: "normal" | "large"): string => {
    if (size === "large") {
      return "col-span-2 sm:col-span-4 lg:col-span-3";
    }
    return "col-span-1 sm:col-span-2 lg:col-span-2";
  };

  const getPatternSvg = (pattern: string, id: string, tileTextColor: string = "text-white") => {
    const baseOpacity = "opacity-15";
    const colorClass = tileTextColor === "text-white" ? "text-white/60" : "text-black/30"; // Adjust pattern color based on text for contrast

    switch (pattern) {
      case "dots":
        return (
          <svg className={`absolute inset-0 w-full h-full ${baseOpacity} ${colorClass}`} viewBox="0 0 100 100">
            <defs><pattern id={`dots-${id}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="10" cy="10" r="1.5" fill="currentColor" /></pattern></defs>
            <rect width="100%" height="100%" fill={`url(#dots-${id})`} />
          </svg>
        );
      case "circles":
        return (
          <svg className={`absolute inset-0 w-full h-full ${baseOpacity} ${colorClass}`} viewBox="0 0 100 100">
            <defs><pattern id={`circles-${id}`} x="0" y="0" width="25" height="25" patternUnits="userSpaceOnUse"><circle cx="12.5" cy="12.5" r="10" fill="none" stroke="currentColor" strokeWidth="1" /></pattern></defs>
            <rect width="100%" height="100%" fill={`url(#circles-${id})`} />
          </svg>
        );
      case "waves":
        return (
          <svg className={`absolute inset-0 w-full h-full ${baseOpacity} ${colorClass}`} viewBox="0 0 100 100">
            <defs><pattern id={`waves-${id}`} x="0" y="0" width="30" height="15" patternUnits="userSpaceOnUse"><path d="M0,7.5 Q7.5,0 15,7.5 T30,7.5" fill="none" stroke="currentColor" strokeWidth="1.5" /></pattern></defs>
            <rect width="100%" height="100%" fill={`url(#waves-${id})`} />
          </svg>
        );
      case "hexagon":
        return (
          <svg className={`absolute inset-0 w-full h-full opacity-10 ${colorClass}`} viewBox="0 0 100 100">
            <defs><pattern id={`hexagon-${id}`} x="0" y="0" width="20" height="17.32" patternUnits="userSpaceOnUse"><polygon points="10,2 18,7 18,14 10,19 2,14 2,7" fill="none" stroke="currentColor" strokeWidth="1" /></pattern></defs>
            <rect width="100%" height="100%" fill={`url(#hexagon-${id})`} />
          </svg>
        );
      case "triangles":
        return (
          <svg className={`absolute inset-0 w-full h-full ${baseOpacity} ${colorClass}`} viewBox="0 0 100 100">
            <defs><pattern id={`triangles-${id}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse"><polygon points="10,3 17,17 3,17" fill="currentColor" /></pattern></defs>
            <rect width="100%" height="100%" fill={`url(#triangles-${id})`} />
          </svg>
        );
      case "grid":
        return (
          <svg className={`absolute inset-0 w-full h-full opacity-10 ${colorClass}`} viewBox="0 0 100 100">
            <defs><pattern id={`grid-${id}`} x="0" y="0" width="15" height="15" patternUnits="userSpaceOnUse"><path d="M15,0 L0,0 L0,15" fill="none" stroke="currentColor" strokeWidth="1" /></pattern></defs>
            <rect width="100%" height="100%" fill={`url(#grid-${id})`} />
          </svg>
        );
      default: return null;
    }
  };

  const currentTextColor = (tile: BentoTile) => tile.textColor || "text-foreground dark:text-foreground-dark";
  const iconTextColor = (tile: BentoTile) => tile.textColor === "text-white" ? "text-white" : "text-primary-light"; // Example icon color for non-white text tiles
  const popularBadgeTextColor = (tile: BentoTile) => tile.textColor === "text-white" ? "text-white/90" : "text-primary-foreground";
  const popularBadgeBgColor = (tile: BentoTile) => tile.textColor === "text-white" ? "bg-white/10" : "bg-primary-light/20";


  return (
    <PageLayout 
      title="Beranda"
      subtitle="Platform kolaborasi dan kreativitas untuk komunitas Indonesia"
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mb-10 sm:mb-12"
      >
        <div className="text-center space-y-4 sm:space-y-5">
          <motion.h1 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight text-foreground dark:text-foreground-dark"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Selamat Datang di{" "}
            <span className="bg-gradient-to-r from-amethyst via-turquoise to-coral bg-clip-text text-transparent animate-gradient-cycle bg-300%">
              OUR CREATIVITY
            </span>
          </motion.h1>
          
          <motion.p
            className="text-md sm:text-lg md:text-xl text-foreground/80 dark:text-foreground-dark/80 leading-relaxed max-w-3xl mx-auto"
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

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 auto-rows-fr"
      >
        {bentoTiles.map((tile, index) => (
          <motion.div
            key={tile.id}
            variants={tileVariants}
            className={`relative group cursor-pointer rounded-2xl sm:rounded-ios overflow-hidden backdrop-blur-md border border-border hover:border-border/70
                        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ring focus-visible:ring-offset-background dark:focus-visible:ring-offset-background-dark
                        transition-all duration-300
                        ${getTileSpanClasses(tile.size)} ${tile.color}`}
            onClick={() => handleTileClick(tile)}
            onMouseEnter={() => setHoveredTile(tile.id)}
            onMouseLeave={() => setHoveredTile(null)}
            whileHover={{ scale: 1.02, y: -6, transition: { duration: 0.25, ease: "easeOut" }}}
            whileTap={{ scale: 0.98 }}
            tabIndex={0}
            role="button"
            aria-label={tile.title}
          >
            <div className="absolute inset-0 pointer-events-none">
              {getPatternSvg(tile.pattern, tile.id, tile.textColor)}
            </div>
            
            <div className={`absolute inset-0 bg-gradient-to-br ${tile.gradientFrom} ${tile.gradientTo} opacity-80 group-hover:opacity-70 transition-opacity duration-300`} />
            
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/5"
              animate={{ opacity: hoveredTile === tile.id ? [0.3, 0.6, 0.3] : 0.2 }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className={`relative z-10 p-4 sm:p-5 h-full flex flex-col justify-between 
              ${tile.size === "large" ? "min-h-[170px] sm:min-h-[190px]" : "min-h-[140px] sm:min-h-[160px]"}`}>
              <div className="space-y-3 sm:space-y-3.5">
                <motion.div className="flex items-center justify-between">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl ${tile.textColor === "text-white" ? 'bg-white/10 group-hover:bg-white/20' : 'bg-primary-light/10 group-hover:bg-primary-light/20'} backdrop-blur-sm flex items-center justify-center transition-colors duration-300 shadow-lg`}>
                    <tile.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${iconTextColor(tile)} drop-shadow-sm`} />
                  </div>
                  
                  {index < 2 && (
                    <motion.div
                      className={`px-2.5 py-1 ${popularBadgeBgColor(tile)} backdrop-blur-sm rounded-full text-xs font-medium ${popularBadgeTextColor(tile)} border ${tile.textColor === "text-white" ? 'border-white/20' : 'border-primary-light/30' }`}
                      animate={{ scale: [1, 1.03, 1] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <Trophy className="w-2.5 h-2.5 sm:w-3 sm:h-3 inline mr-1" />
                      Populer
                    </motion.div>
                  )}
                </motion.div>

                <div className="space-y-1.5 sm:space-y-2">
                  <motion.h3 className={`text-md sm:text-lg font-serif font-semibold ${currentTextColor(tile)} leading-tight drop-shadow-sm`}>
                    {tile.title}
                  </motion.h3>
                  <p className={`${currentTextColor(tile)}/70 group-hover:${currentTextColor(tile)}/80 leading-snug drop-shadow-sm ${tile.size === "large" ? "text-xs sm:text-sm" : "text-xs"}`}>
                    {tile.description}
                  </p>
                </div>
              </div>

              <motion.div 
                className="flex items-center justify-between mt-auto pt-3 sm:pt-4"
                initial={{ opacity: 0.8 }}
                whileHover={{ opacity: 1 }}
              >
                <div className={`flex items-center gap-1.5 ${currentTextColor(tile)}/60 text-xs`}>
                  <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  <span>Update</span>
                </div>
                <motion.div className={`flex items-center gap-1.5 sm:gap-2 ${currentTextColor(tile)} font-medium group-hover:gap-2 sm:group-hover:gap-2.5 transition-all duration-300`}>
                  <span className="text-xs sm:text-sm">Jelajahi</span>
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 drop-shadow-sm" />
                </motion.div>
              </motion.div>
            </div>

            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
              style={{
                background: hoveredTile === tile.id 
                  ? `radial-gradient(circle at 50% 50%, ${tile.textColor === "text-white" ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.05)"} 0%, rgba(255,255,255,0.0) 70%)`
                  : `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.0) 0%, rgba(255,255,255,0.0) 70%)`
              }}
            />
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.6 }}
        className="mt-12 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4"
      >
        {[
          { label: "Anggota Aktif", value: "500+", icon: Users },
          { label: "Karya Terbit", value: "1.2K+", icon: Palette },
          { label: "Proyek Sukses", value: "250+", icon: Trophy },
          { label: "Event Seru", value: "50+", icon: Calendar }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            className="text-center p-4 sm:p-5 rounded-xl sm:rounded-ios bg-background dark:bg-secondary-dark backdrop-blur-sm border border-border hover:border-border/70 transition-all duration-300 group"
            whileHover={{ scale: 1.04, y: -4 }}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.7 + (index * 0.08) }}
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

export default IndexPage;
