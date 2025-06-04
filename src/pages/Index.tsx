
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Users, Megaphone, BookOpen, Info, FileText, Palette, Trophy, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PageLayout from "../components/layouts/PageLayout";
import BentoGrid from "../components/ui/BentoGrid";
import BentoCard from "../components/ui/BentoCard";
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
  colSpan: string;
  rowSpan: string;
  pattern: string;
  textColor?: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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

const Index = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const handleTileClick = (tile: BentoTile) => {
    navigate(tile.path);
  };

  const bentoTiles: BentoTile[] = [
    {
      id: "pengumuman",
      title: "Pengumuman",
      description: "Info terbaru & update penting komunitas.",
      icon: Megaphone,
      color: "bg-gradient-to-br from-coral/20 to-red-500/30",
      gradientFrom: "from-coral/10",
      gradientTo: "to-red-500/20",
      path: "/pengumuman",
      colSpan: "lg:col-span-2",
      rowSpan: "lg:row-span-2",
      pattern: "dots",
      textColor: "text-white"
    },
    {
      id: "tim-kami",
      title: "Tim Kami",
      description: "Kenali para kreator & kontributor.",
      icon: Users,
      color: "bg-gradient-to-br from-turquoise/20 to-emerald/30",
      gradientFrom: "from-turquoise/10",
      gradientTo: "to-emerald/20",
      path: "/tim-kami",
      colSpan: "lg:col-span-1",
      rowSpan: "lg:row-span-1",
      pattern: "circles",
      textColor: "text-white"
    },
    {
      id: "karya-kami",
      title: "Karya Kami",
      description: "Galeri karya kreatif anggota.",
      icon: Palette,
      color: "bg-gradient-to-br from-amethyst/20 to-lavender/30",
      gradientFrom: "from-amethyst/10",
      gradientTo: "to-lavender/20",
      path: "/karya-kami",
      colSpan: "lg:col-span-1",
      rowSpan: "lg:row-span-2",
      pattern: "waves",
      textColor: "text-white"
    },
    {
      id: "brand-story",
      title: "Brand Story",
      description: "Perjalanan & visi misi komunitas.",
      icon: BookOpen,
      color: "bg-gradient-to-br from-peach/20 to-amber/30",
      gradientFrom: "from-peach/10",
      gradientTo: "to-amber/20",
      path: "/brand-story",
      colSpan: "lg:col-span-1",
      rowSpan: "lg:row-span-1",
      pattern: "hexagon",
      textColor: "text-white"
    },
    {
      id: "informasi",
      title: "Informasi",
      description: "Detail komunitas & cara bergabung.",
      icon: Info,
      color: "bg-gradient-to-br from-softPink/20 to-pink-500/30",
      gradientFrom: "from-softPink/10",
      gradientTo: "to-pink-500/20",
      path: "/informasi",
      colSpan: "lg:col-span-1",
      rowSpan: "lg:row-span-1",
      pattern: "triangles",
      textColor: "text-white"
    },
    {
      id: "terms",
      title: "Syarat & Ketentuan",
      description: "Panduan & aturan komunitas.",
      icon: FileText,
      color: "bg-gradient-to-br from-mint/20 to-teal-500/30",
      gradientFrom: "from-mint/10",
      gradientTo: "to-teal-500/20",
      path: "/terms",
      colSpan: "lg:col-span-1",
      rowSpan: "lg:row-span-1",
      pattern: "grid",
      textColor: "text-white"
    }
  ];

  const getPatternSvg = (pattern: string, id: string, tileTextColor: string = "text-white") => {
    const baseOpacity = "opacity-15";
    const colorClass = tileTextColor === "text-white" ? "text-white/60" : "text-black/30";

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

  return (
    <PageLayout 
      title=""
      showBackButton={false}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mb-8 md:mb-12"
      >
        <div className="text-center space-y-3 md:space-y-5">
          <motion.h1 
            className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-serif font-bold leading-tight text-foreground dark:text-foreground-dark"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Selamat Datang di{" "}
            <span className="bg-gradient-to-r from-amethyst via-turquoise to-coral bg-clip-text text-transparent animate-gradient-cycle bg-300%">
              OUR CREATIVITY
            </span>
          </motion.h1>

          <motion.div
            className="flex items-center justify-center gap-2 text-xs md:text-sm text-foreground/60 dark:text-foreground-dark/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4 text-amethyst" />
            <span className="font-sans">Dunia kreativitas tanpa batas menanti</span>
            <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4 text-coral" />
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mb-8 md:mb-16"
      >
        {/* Custom Bento Grid with proper responsive layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 auto-rows-fr">
          {bentoTiles.map((tile, index) => (
            <motion.div
              key={tile.id}
              variants={tileVariants}
              className={`${tile.colSpan} ${tile.rowSpan} col-span-1 md:col-span-1`}
              style={{
                // Custom grid area for desktop bento layout
                gridArea: isMobile ? 'auto' : 
                  tile.id === 'pengumuman' ? '1 / 1 / 3 / 3' : // 2x2 large tile
                  tile.id === 'tim-kami' ? '1 / 3 / 2 / 4' : // top right
                  tile.id === 'karya-kami' ? '2 / 3 / 4 / 4' : // tall right tile
                  tile.id === 'brand-story' ? '3 / 1 / 4 / 2' : // bottom left
                  tile.id === 'informasi' ? '3 / 2 / 4 / 3' : // bottom middle
                  tile.id === 'terms' ? '4 / 1 / 5 / 4' : // bottom wide
                  'auto'
              }}
            >
              <BentoCard
                className={`relative group cursor-pointer h-full min-h-[200px] md:min-h-[240px] ${tile.color} border-border/50 hover:border-border/70 transition-all duration-300`}
                onClick={() => handleTileClick(tile)}
                interactive={true}
                hoverScale={1.02}
                motionProps={{
                  whileHover: { y: -6 },
                  whileTap: { scale: 0.98 }
                }}
              >
                <div className="absolute inset-0 pointer-events-none">
                  {getPatternSvg(tile.pattern, tile.id, tile.textColor)}
                </div>
                
                <div className={`absolute inset-0 bg-gradient-to-br ${tile.gradientFrom} ${tile.gradientTo} opacity-80 group-hover:opacity-70 transition-opacity duration-300`} />
                
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/5"
                  animate={{ opacity: [0.2, 0.6, 0.2] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                />

                <div className="relative z-10 p-4 md:p-6 h-full flex flex-col justify-between">
                  <div className="space-y-3 md:space-y-4">
                    <motion.div className="flex items-center justify-between">
                      <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl ${tile.textColor === "text-white" ? 'bg-white/10 group-hover:bg-white/20' : 'bg-primary-light/10 group-hover:bg-primary-light/20'} backdrop-blur-sm flex items-center justify-center transition-colors duration-300 shadow-lg`}>
                        <tile.icon className={`w-5 h-5 md:w-6 md:h-6 ${tile.textColor === "text-white" ? "text-white" : "text-primary-light"} drop-shadow-sm`} />
                      </div>
                      
                      {index < 2 && (
                        <motion.div
                          className={`px-2.5 py-1 ${tile.textColor === "text-white" ? 'bg-white/10' : 'bg-primary-light/20'} backdrop-blur-sm rounded-full text-xs font-medium ${tile.textColor === "text-white" ? 'text-white/90' : 'text-primary-foreground'} border ${tile.textColor === "text-white" ? 'border-white/20' : 'border-primary-light/30'} font-sans`}
                          animate={{ scale: [1, 1.03, 1] }}
                          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                        >
                          <Trophy className="w-2.5 h-2.5 md:w-3 md:h-3 inline mr-1" />
                          Populer
                        </motion.div>
                      )}
                    </motion.div>

                    <div className="space-y-2">
                      <motion.h3 className={`text-base md:text-lg lg:text-xl font-sans font-semibold ${tile.textColor || "text-foreground"} leading-tight drop-shadow-sm`}>
                        {tile.title}
                      </motion.h3>
                      <p className={`${tile.textColor || "text-foreground"}/70 group-hover:${tile.textColor || "text-foreground"}/80 leading-relaxed drop-shadow-sm text-xs md:text-sm font-sans`}>
                        {tile.description}
                      </p>
                    </div>
                  </div>

                  <motion.div 
                    className="flex items-center justify-between mt-auto pt-3 md:pt-4"
                    initial={{ opacity: 0.8 }}
                    whileHover={{ opacity: 1 }}
                  >
                    <div className={`flex items-center gap-1.5 ${tile.textColor || "text-foreground"}/60 text-xs font-sans`}>
                      <Calendar className="w-3 h-3 md:w-3.5 md:h-3.5" />
                      <span>Update</span>
                    </div>
                    <motion.div className={`flex items-center gap-1.5 md:gap-2 ${tile.textColor || "text-foreground"} font-medium group-hover:gap-2 md:group-hover:gap-2.5 transition-all duration-300 font-sans`}>
                      <span className="text-xs md:text-sm">Jelajahi</span>
                      <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4 drop-shadow-sm" />
                    </motion.div>
                  </motion.div>
                </div>

                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 50% 50%, ${tile.textColor === "text-white" ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.05)"} 0%, rgba(255,255,255,0.0) 70%)`
                  }}
                />
              </BentoCard>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.6 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
      >
        {[
          { label: "Anggota Aktif", value: "500+", icon: Users },
          { label: "Karya Terbit", value: "1.2K+", icon: Palette },
          { label: "Proyek Sukses", value: "250+", icon: Trophy },
          { label: "Event Seru", value: "50+", icon: Calendar }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            className="text-center p-4 md:p-5 rounded-xl md:rounded-ios bg-background dark:bg-secondary-dark backdrop-blur-sm border border-border hover:border-border/70 transition-all duration-300 group"
            whileHover={{ scale: 1.04, y: -4 }}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.7 + (index * 0.08) }}
          >
            <div className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-2 md:mb-2.5 rounded-lg md:rounded-xl bg-amethyst/10 dark:bg-amethyst/20 flex items-center justify-center group-hover:bg-amethyst/20 dark:group-hover:bg-amethyst/30 transition-colors">
              <stat.icon className="w-5 h-5 md:w-6 md:h-6 text-amethyst" />
            </div>
            <div className="text-lg md:text-xl lg:text-2xl font-bold text-foreground dark:text-foreground-dark mb-0.5 md:mb-1 font-sans">{stat.value}</div>
            <div className="text-xs md:text-sm text-foreground/70 dark:text-foreground-dark/70 font-sans">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>
    </PageLayout>
  );
};

export default Index;
