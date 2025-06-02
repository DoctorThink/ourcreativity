
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Calendar, Users, Megaphone, BookOpen, Info, FileText, Palette, Trophy, Sparkles } from "lucide-react";
import PageLayout from "../components/layouts/PageLayout";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

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
      staggerChildren: 0.08,
      delayChildren: 0.2
    },
  },
};

const tileVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

const Index = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [selectedTile, setSelectedTile] = useState<BentoTile | null>(null);
  const [hoveredTile, setHoveredTile] = useState<string | null>(null);

  const handleTileClick = (tile: BentoTile) => {
    navigate(tile.path);
  };

  const bentoTiles: BentoTile[] = [
    {
      id: "pengumuman",
      title: "Pengumuman",
      description: "Informasi terbaru dan update penting dari komunitas kreatif",
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
      description: "Kenali para kreator dan kontributor di balik komunitas",
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
      description: "Galeri karya kreatif dari seluruh anggota komunitas",
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
      description: "Cerita perjalanan dan visi misi komunitas kreatif",
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
      description: "Detail lengkap tentang komunitas dan cara bergabung",
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
      description: "Panduan dan aturan dalam komunitas kreatif",
      icon: FileText,
      color: "bg-gradient-to-br from-slate-500/20 to-gray-600/30",
      gradientFrom: "from-slate-500/10",
      gradientTo: "to-gray-600/20",
      path: "/terms",
      size: "normal",
      pattern: "grid"
    }
  ];

  const getPatternSvg = (pattern: string, id: string) => {
    switch (pattern) {
      case "dots":
        return (
          <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 100">
            <defs>
              <pattern id={`dots-${id}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="10" r="2" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#dots-${id})`} />
          </svg>
        );
      case "circles":
        return (
          <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 100 100">
            <defs>
              <pattern id={`circles-${id}`} x="0" y="0" width="25" height="25" patternUnits="userSpaceOnUse">
                <circle cx="12.5" cy="12.5" r="8" fill="none" stroke="currentColor" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#circles-${id})`} />
          </svg>
        );
      case "waves":
        return (
          <svg className="absolute inset-0 w-full h-full opacity-15" viewBox="0 0 100 100">
            <defs>
              <pattern id={`waves-${id}`} x="0" y="0" width="30" height="15" patternUnits="userSpaceOnUse">
                <path d="M0,7.5 Q7.5,0 15,7.5 T30,7.5" fill="none" stroke="currentColor" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#waves-${id})`} />
          </svg>
        );
      case "hexagon":
        return (
          <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 100 100">
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
          <svg className="absolute inset-0 w-full h-full opacity-15" viewBox="0 0 100 100">
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
          <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 100 100">
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
        className="mb-12"
      >
        <div className="text-center space-y-6">
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold leading-tight"
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
            className="text-lg sm:text-xl md:text-2xl text-foreground/80 leading-relaxed max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Platform kolaborasi dan kreativitas untuk komunitas Indonesia
          </motion.p>

          <motion.div
            className="flex items-center justify-center gap-2 text-sm text-foreground/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Sparkles className="w-4 h-4 text-amethyst" />
            <span>Jelajahi dunia kreativitas tanpa batas</span>
            <Sparkles className="w-4 h-4 text-coral" />
          </motion.div>
        </div>
      </motion.div>

      {/* Main Navigation Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 auto-rows-fr"
      >
        {bentoTiles.map((tile, index) => (
          <motion.div
            key={tile.id}
            variants={tileVariants}
            className={`relative group cursor-pointer rounded-3xl overflow-hidden backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-500 ${
              tile.size === "large" ? "sm:col-span-2 lg:col-span-2" : ""
            } ${tile.color}`}
            onClick={() => handleTileClick(tile)}
            onMouseEnter={() => setHoveredTile(tile.id)}
            onMouseLeave={() => setHoveredTile(null)}
            whileHover={{ 
              scale: 1.02, 
              y: -8,
              transition: { duration: 0.3, ease: "easeOut" }
            }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 text-white/30">
              {getPatternSvg(tile.pattern, tile.id)}
            </div>
            
            {/* Gradient Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-br ${tile.gradientFrom} ${tile.gradientTo} group-hover:opacity-80 transition-opacity duration-300`} />
            
            {/* Animated Background Glow */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/5"
              animate={{
                opacity: hoveredTile === tile.id ? [0.5, 0.8, 0.5] : 0.3,
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            <div className={`relative z-10 p-6 sm:p-8 h-full flex flex-col justify-between ${
              tile.size === "large" ? "min-h-[200px] sm:min-h-[240px]" : "min-h-[180px] sm:min-h-[200px]"
            }`}>
              {/* Header */}
              <div className="space-y-4">
                <motion.div
                  className="flex items-center justify-between"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/20 transition-colors duration-300 shadow-lg">
                    <tile.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white drop-shadow-sm" />
                  </div>
                  
                  {index < 2 && (
                    <motion.div
                      className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs font-medium text-white/90 border border-white/20"
                      animate={{
                        scale: [1, 1.05, 1],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <Trophy className="w-3 h-3 inline mr-1" />
                      Populer
                    </motion.div>
                  )}
                </motion.div>

                <div className="space-y-3">
                  <motion.h3 
                    className="text-xl sm:text-2xl font-serif font-bold text-white leading-tight drop-shadow-sm"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {tile.title}
                  </motion.h3>
                  
                  <p className={`text-white/80 leading-relaxed drop-shadow-sm ${
                    tile.size === "large" ? "text-base sm:text-lg" : "text-sm sm:text-base"
                  }`}>
                    {tile.description}
                  </p>
                </div>
              </div>

              {/* Footer */}
              <motion.div 
                className="flex items-center justify-between mt-auto pt-4"
                initial={{ opacity: 0.8 }}
                whileHover={{ opacity: 1 }}
              >
                <div className="flex items-center gap-2 text-white/70 text-sm">
                  <Calendar className="w-4 h-4" />
                  <span>Update terbaru</span>
                </div>
                
                <motion.div 
                  className="flex items-center gap-2 text-white font-medium group-hover:gap-3 transition-all duration-300"
                  whileHover={{ x: 5 }}
                >
                  <span className="text-sm sm:text-base">Jelajahi</span>
                  <motion.div
                    whileHover={{ rotate: 45, scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowRight className="w-5 h-5 drop-shadow-sm" />
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>

            {/* Hover Effect Overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              animate={{
                background: hoveredTile === tile.id 
                  ? ["linear-gradient(to bottom right, rgba(255,255,255,0.05), transparent)", 
                     "linear-gradient(to bottom right, rgba(255,255,255,0.1), transparent)",
                     "linear-gradient(to bottom right, rgba(255,255,255,0.05), transparent)"]
                  : "linear-gradient(to bottom right, rgba(255,255,255,0.05), transparent)"
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Additional Stats Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
      >
        {[
          { label: "Anggota Aktif", value: "500+", icon: Users },
          { label: "Karya Dipublikasi", value: "1.2K+", icon: Palette },
          { label: "Proyek Selesai", value: "250+", icon: Trophy },
          { label: "Event Digelar", value: "50+", icon: Calendar }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            className="text-center p-6 rounded-2xl bg-secondary/30 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 group"
            whileHover={{ scale: 1.05, y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 + (index * 0.1) }}
          >
            <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-amethyst/20 flex items-center justify-center group-hover:bg-amethyst/30 transition-colors">
              <stat.icon className="w-6 h-6 text-amethyst" />
            </div>
            <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
            <div className="text-sm text-foreground/70">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>
    </PageLayout>
  );
};

export default Index;
