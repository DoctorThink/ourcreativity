import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Users, Megaphone, BookOpen, Info, FileText, Palette, Trophy, Sparkles, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PageLayout from "../components/layouts/PageLayout";
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
      staggerChildren: 0.08,
      delayChildren: 0.15
    },
  },
};

const tileVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.25, 0, 0.2, 1],
    },
  },
};

const Index = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const handleTileClick = (tile: BentoTile) => {
    if (tile.id === 'ayo-gabung') {
      // Open Linktree in a new tab
      window.open('https://linktr.ee/ourcreativity', '_blank');
    } else {
      navigate(tile.path);
    }
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
      id: "cerita-kami",
      title: "Cerita Kami",
      description: "Perjalanan & visi misi komunitas.",
      icon: BookOpen,
      color: "bg-gradient-to-br from-peach/20 to-amber/30",
      gradientFrom: "from-peach/10",
      gradientTo: "to-amber/20",
      path: "/cerita-kami",
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
      id: "ayo-gabung",
      title: "Ayo Gabung",
      description: "Bergabung via Linktree atau Google Form.",
      icon: UserPlus,
      color: "bg-gradient-to-br from-emerald/40 to-green-600/50",
      gradientFrom: "from-emerald/20",
      gradientTo: "to-green-500/30",
      path: "#",
      colSpan: "lg:col-span-1",
      rowSpan: "lg:row-span-1",
      pattern: "circles",
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
    const baseOpacity = "opacity-20";
    const colorClass = tileTextColor === "text-white" ? "text-white/50" : "text-black/25";

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
          <svg className={`absolute inset-0 w-full h-full opacity-15 ${colorClass}`} viewBox="0 0 100 100">
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
          <svg className={`absolute inset-0 w-full h-full opacity-15 ${colorClass}`} viewBox="0 0 100 100">
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
      className="relative min-h-screen backdrop-blur-sm"
    >
      {/* Blurred Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-background/60 to-secondary/40 backdrop-blur-md -z-10" />
      
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-6 md:mb-8 relative z-10"
      >
        <div className="text-center space-y-2 md:space-y-4">
          <motion.div 
            className="flex flex-col items-center leading-tight"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="text-base md:text-lg lg:text-xl font-sans font-medium text-foreground/80 dark:text-foreground-dark/80 mb-1">
              Selamat Datang di
            </span>
            <div className="relative">
              <h1 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold animated-gradient-text glow-text">
                OUR CREATIVITY
              </h1>
              {/* Glow effect */}
              <div className="absolute inset-0 text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold animated-gradient-text blur-lg opacity-30 -z-10">
                OUR CREATIVITY
              </div>
            </div>
          </motion.div>

          <motion.div
            className="flex items-center justify-center gap-2 text-xs md:text-sm text-foreground/60 dark:text-foreground-dark/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4 text-amethyst animate-pulse" />
            <span className="font-sans">Dunia kreativitas tanpa batas menanti</span>
            <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4 text-coral animate-pulse" />
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10"
      >
        {/* Smaller Bento Grid - reduced from 6xl to 4xl and smaller min heights */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 auto-rows-fr max-w-4xl mx-auto">
          {bentoTiles.map((tile, index) => (
            <motion.div
              key={tile.id}
              variants={tileVariants}
              className={`${tile.colSpan} ${tile.rowSpan} col-span-1 md:col-span-1`}
              style={{
                gridArea: isMobile ? 'auto' : 
                  tile.id === 'pengumuman' ? '1 / 1 / 3 / 3' :
                  tile.id === 'tim-kami' ? '1 / 3 / 2 / 4' :
                  tile.id === 'karya-kami' ? '2 / 3 / 4 / 4' :
                  tile.id === 'cerita-kami' ? '3 / 1 / 4 / 2' :
                  tile.id === 'informasi' ? '3 / 2 / 4 / 3' :
                  tile.id === 'ayo-gabung' ? '4 / 1 / 5 / 2' :
                  tile.id === 'terms' ? '4 / 2 / 5 / 4' :
                  'auto'
              }}
            >
              <BentoCard
                className={`relative group cursor-pointer h-full min-h-[140px] md:min-h-[150px] lg:min-h-[160px] ${tile.color} ${tile.id === 'ayo-gabung' ? 'border-emerald-400 shadow-lg shadow-emerald-400/20' : 'border-border/50'} hover:border-border/70 transition-all duration-300 backdrop-blur-sm`}
                onClick={() => handleTileClick(tile)}
                interactive={true}
                hoverScale={1.015}
                motionProps={{
                  whileHover: { y: -4 },
                  whileTap: { scale: 0.98 }
                }}
              >
                <div className="absolute inset-0 pointer-events-none">
                  {getPatternSvg(tile.pattern, tile.id, tile.textColor || "text-foreground")}
                </div>
                
                <div className={`absolute inset-0 bg-gradient-to-br ${tile.gradientFrom} ${tile.gradientTo} opacity-80 group-hover:opacity-70 transition-opacity duration-300`} />

                <div className="relative z-10 p-3 md:p-4 lg:p-5 h-full flex flex-col justify-center text-center">
                  <div className="space-y-3 md:space-y-4">
                    <motion.div className="flex items-center justify-center">
                      <div className={`w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-xl md:rounded-2xl ${tile.textColor === "text-white" ? 'bg-white/15 group-hover:bg-white/20' : 'bg-primary-light/15 group-hover:bg-primary-light/20'} backdrop-blur-md flex items-center justify-center transition-all duration-300 shadow-lg border ${tile.textColor === "text-white" ? 'border-white/25' : 'border-primary-light/25'}`}>
                        <tile.icon className={`w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 ${tile.textColor === "text-white" ? "text-white" : "text-primary-light"} drop-shadow-lg`} />
                      </div>
                      
                      {index < 2 && (
                        <div className={`absolute top-2 right-2 px-1.5 py-0.5 ${tile.textColor === "text-white" ? 'bg-white/20' : 'bg-primary-light/30'} backdrop-blur-md rounded-full text-xs font-semibold ${tile.textColor === "text-white" ? 'text-white/95' : 'text-primary-foreground'} border ${tile.textColor === "text-white" ? 'border-white/30' : 'border-primary-light/40'} font-sans shadow-md`}>
                          <Trophy className="w-2 h-2 inline mr-1" />
                          Populer
                        </div>
                      )}
                    </motion.div>

                    <div className="space-y-1.5 md:space-y-2">
                      <h3 className={`text-base md:text-lg lg:text-xl font-serif font-bold ${tile.textColor || "text-foreground"} leading-tight drop-shadow-lg`}>
                        {tile.title}
                      </h3>
                      <p className={`${tile.textColor === "text-white" ? "text-white/80" : (tile.textColor || "text-foreground") + "/80"} group-hover:${tile.textColor === "text-white" ? "text-white/95" : (tile.textColor || "text-foreground") + "/95"} leading-relaxed drop-shadow-sm text-xs md:text-sm lg:text-base font-sans font-medium max-w-md mx-auto transition-colors duration-300`}>
                        {tile.description}
                      </p>
                    </div>
                  </div>

                  <motion.div 
                    className="flex items-center justify-between mt-4 md:mt-6 pt-2 md:pt-3 border-t border-white/20"
                    initial={{ opacity: 0.8 }}
                    whileHover={{ opacity: 1 }}
                  >
                    <div className={`flex items-center gap-1 ${tile.textColor || "text-foreground"}/70 text-xs font-sans`}>
                      <Calendar className="w-3 h-3" />
                      <span>Update</span>
                    </div>
                    <div className={`flex items-center gap-1 ${tile.textColor || "text-foreground"} font-semibold transition-all duration-300 font-sans`}>
                      <span className="text-xs md:text-sm">
                        {tile.id === 'ayo-gabung' ? 'Gabung' : 'Jelajahi'}
                      </span>
                      <ArrowRight className="w-3 h-3 md:w-4 md:h-4 drop-shadow-sm transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </motion.div>
                </div>

                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-gradient-radial from-white/5 via-transparent to-transparent" />
              </BentoCard>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </PageLayout>
  );
};

export default Index;
