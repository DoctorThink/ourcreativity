
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Users, Megaphone, BookOpen, Info, FileText, Palette, Trophy, Sparkles, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PageLayout from "../components/layouts/PageLayout";
import BentoCard from "../components/ui/BentoCard";
import LiquidBackground from "../components/ui/LiquidBackground";
import FloatingParticles from "../components/ui/FloatingParticles";
import GlassCard from "../components/ui/GlassCard";
import FlowingTypography from "../components/ui/FlowingTypography";
import LiquidButton from "../components/ui/LiquidButton";
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
      className="relative min-h-screen"
    >
      {/* Enhanced Liquid Glass Background */}
      <LiquidBackground />
      <FloatingParticles />
      
      {/* Hero Section with Enhanced Glass Morphism */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mb-8 md:mb-12 relative z-10"
      >
        <div className="text-center space-y-6 md:space-y-8">
          <motion.div 
            className="flex flex-col items-center leading-tight"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <GlassCard className="mb-4 p-4" size="sm" glowColor="rgba(155, 109, 255, 0.4)">
              <FlowingTypography variant="subtitle" animated={false}>
                Selamat Datang di
              </FlowingTypography>
            </GlassCard>
            
            <div className="relative">
              <FlowingTypography 
                variant="hero" 
                glowEffect={true}
                className="mb-4"
              >
                OUR CREATIVITY
              </FlowingTypography>
              
              {/* Enhanced glow effect */}
              <div className="absolute inset-0 text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-serif font-bold animated-gradient-text blur-xl opacity-40 -z-10">
                OUR CREATIVITY
              </div>
            </div>
          </motion.div>

          <motion.div
            className="flex items-center justify-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <GlassCard className="px-6 py-3" size="sm">
              <div className="flex items-center gap-2 text-sm md:text-base text-white/80">
                <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-amethyst animate-pulse" />
                <FlowingTypography variant="body" animated={false}>
                  Dunia kreativitas tanpa batas menanti
                </FlowingTypography>
                <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-coral animate-pulse" />
              </div>
            </GlassCard>
          </motion.div>

          {/* Enhanced Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <LiquidButton
              variant="primary"
              size="lg"
              onClick={() => window.open('https://linktr.ee/ourcreativity', '_blank')}
            >
              <Users className="w-5 h-5 mr-2" />
              Bergabung Sekarang
            </LiquidButton>
            
            <LiquidButton
              variant="secondary"
              size="lg"
              onClick={() => navigate('/karya-kami')}
            >
              <Palette className="w-5 h-5 mr-2" />
              Lihat Karya
            </LiquidButton>
          </motion.div>
        </div>
      </motion.div>

      {/* Enhanced Bento Grid with Liquid Glass */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 auto-rows-fr max-w-6xl mx-auto">
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
                className={`relative group h-full min-h-[160px] md:min-h-[180px] lg:min-h-[200px] ${tile.color} ${tile.id === 'ayo-gabung' ? 'ring-2 ring-emerald-400/50' : ''} transition-all duration-500`}
                onClick={() => handleTileClick(tile)}
                interactive={true}
                hoverScale={1.02}
                glowColor={
                  tile.id === 'ayo-gabung' ? 'rgba(34, 197, 94, 0.4)' :
                  tile.id === 'pengumuman' ? 'rgba(255, 127, 80, 0.4)' :
                  tile.id === 'tim-kami' ? 'rgba(64, 224, 208, 0.4)' :
                  tile.id === 'karya-kami' ? 'rgba(155, 109, 255, 0.4)' :
                  'rgba(152, 245, 225, 0.3)'
                }
              >
                {/* Enhanced pattern backgrounds */}
                <div className="absolute inset-0 pointer-events-none opacity-20">
                  {getPatternSvg(tile.pattern, tile.id, tile.textColor || "text-foreground")}
                </div>
                
                {/* Liquid gradient overlay */}
                <motion.div 
                  className={`absolute inset-0 bg-gradient-to-br ${tile.gradientFrom} ${tile.gradientTo} opacity-60`}
                  animate={{
                    opacity: [0.6, 0.8, 0.6],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.5
                  }}
                />

                <div className="relative z-10 p-4 md:p-6 lg:p-7 h-full flex flex-col justify-center text-center">
                  <div className="space-y-4 md:space-y-5">
                    <motion.div className="flex items-center justify-center">
                      <GlassCard 
                        className={`w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 flex items-center justify-center`}
                        size="sm"
                        glowColor={tile.id === 'ayo-gabung' ? 'rgba(34, 197, 94, 0.6)' : 'rgba(255, 255, 255, 0.3)'}
                      >
                        <tile.icon className={`w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 ${tile.textColor === "text-white" ? "text-white" : "text-primary-light"} drop-shadow-lg`} />
                      </GlassCard>
                      
                      {index < 2 && (
                        <motion.div 
                          className={`absolute top-3 right-3 px-2 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-semibold text-white border border-white/30 shadow-lg`}
                          animate={{
                            scale: [1, 1.05, 1],
                            opacity: [0.8, 1, 0.8]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        >
                          <Trophy className="w-3 h-3 inline mr-1" />
                          Populer
                        </motion.div>
                      )}
                    </motion.div>

                    <div className="space-y-2 md:space-y-3">
                      <FlowingTypography 
                        variant="title" 
                        className={`text-lg md:text-xl lg:text-2xl ${tile.textColor || "text-foreground"} leading-tight drop-shadow-lg`}
                        animated={false}
                      >
                        {tile.title}
                      </FlowingTypography>
                      
                      <FlowingTypography 
                        variant="body" 
                        className={`${tile.textColor === "text-white" ? "text-white/85" : (tile.textColor || "text-foreground") + "/85"} leading-relaxed drop-shadow-sm text-sm md:text-base lg:text-lg max-w-md mx-auto transition-colors duration-300`}
                        animated={false}
                      >
                        {tile.description}
                      </FlowingTypography>
                    </div>
                  </div>

                  <motion.div 
                    className="flex items-center justify-between mt-6 md:mt-8 pt-3 md:pt-4 border-t border-white/25"
                    initial={{ opacity: 0.8 }}
                    whileHover={{ opacity: 1 }}
                  >
                    <div className={`flex items-center gap-1 ${tile.textColor || "text-foreground"}/70 text-xs font-sans`}>
                      <Calendar className="w-3 h-3" />
                      <span>Update</span>
                    </div>
                    <motion.div 
                      className={`flex items-center gap-1 ${tile.textColor || "text-foreground"} font-semibold font-sans`}
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2 }}
                    >
                      <span className="text-sm md:text-base">
                        {tile.id === 'ayo-gabung' ? 'Gabung' : 'Jelajahi'}
                      </span>
                      <ArrowRight className="w-4 h-4 md:w-5 md:h-5 drop-shadow-sm" />
                    </motion.div>
                  </motion.div>
                </div>
              </BentoCard>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </PageLayout>
  );
};

export default Index;
