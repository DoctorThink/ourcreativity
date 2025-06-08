import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useNavigate } from "react-router-dom";
import { ArrowRight, Calendar, Users, Megaphone, BookOpen, Info, FileText, Palette, Trophy, Sparkles } from "lucide-react";
import BentoCard from "../ui/BentoCard";
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

const GSAPBentoGrid: React.FC = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const gridRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const cards = grid.querySelectorAll('.bento-card');
    
    // Set initial states
    gsap.set(cards, { opacity: 0, y: 50, scale: 0.9 });

    // Animate cards in with stagger
    const tl = gsap.timeline({ delay: 0.8 });
    tl.to(cards, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.1
    });

    // Add hover animations
    cards.forEach(card => {
      const handleMouseEnter = () => {
        gsap.to(card, {
          y: -8,
          scale: 1.02,
          duration: 0.3,
          ease: "power2.out"
        });
      };

      const handleMouseLeave = () => {
        gsap.to(card, {
          y: 0,
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        });
      };

      card.addEventListener('mouseenter', handleMouseEnter);
      card.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        card.removeEventListener('mouseenter', handleMouseEnter);
        card.removeEventListener('mouseleave', handleMouseLeave);
      };
    });

    return () => {
      tl.kill();
    };
  }, []);

  const handleTileClick = (tile: BentoTile) => {
    navigate(tile.path);
  };

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
    <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 auto-rows-fr max-w-6xl mx-auto">
      {bentoTiles.map((tile, index) => (
        <div
          key={tile.id}
          className={`bento-card ${tile.colSpan} ${tile.rowSpan} col-span-1 md:col-span-1`}
          style={{
            gridArea: isMobile ? 'auto' : 
              tile.id === 'pengumuman' ? '1 / 1 / 3 / 3' :
              tile.id === 'tim-kami' ? '1 / 3 / 2 / 4' :
              tile.id === 'karya-kami' ? '2 / 3 / 4 / 4' :
              tile.id === 'cerita-kami' ? '3 / 1 / 4 / 2' :
              tile.id === 'informasi' ? '3 / 2 / 4 / 3' :
              tile.id === 'terms' ? '4 / 1 / 5 / 4' :
              'auto'
          }}
        >
          <BentoCard
            className={`relative group cursor-pointer h-full min-h-[160px] md:min-h-[180px] lg:min-h-[200px] ${tile.color} border-border/50 hover:border-border/70 transition-all duration-300`}
            onClick={() => handleTileClick(tile)}
            interactive={true}
            hoverScale={1.015}
          >
            <div className="absolute inset-0 pointer-events-none">
              {getPatternSvg(tile.pattern, tile.id, tile.textColor || "text-foreground")}
            </div>
            
            <div className={`absolute inset-0 bg-gradient-to-br ${tile.gradientFrom} ${tile.gradientTo} opacity-80 group-hover:opacity-70 transition-opacity duration-300`} />

            <div className="relative z-10 p-4 md:p-5 lg:p-6 h-full flex flex-col justify-center text-center">
              <div className="space-y-4 md:space-y-5">
                <div className="flex items-center justify-center">
                  <div className={`w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-xl md:rounded-2xl ${tile.textColor === "text-white" ? 'bg-white/15 group-hover:bg-white/20' : 'bg-primary-light/15 group-hover:bg-primary-light/20'} backdrop-blur-md flex items-center justify-center transition-all duration-300 shadow-lg border ${tile.textColor === "text-white" ? 'border-white/25' : 'border-primary-light/25'}`}>
                    <tile.icon className={`w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 ${tile.textColor === "text-white" ? "text-white" : "text-primary-light"} drop-shadow-lg`} />
                  </div>
                  
                  {index < 2 && (
                    <div className={`absolute top-3 right-3 px-2 py-1 ${tile.textColor === "text-white" ? 'bg-white/20' : 'bg-primary-light/30'} backdrop-blur-md rounded-full text-xs font-semibold ${tile.textColor === "text-white" ? 'text-white/95' : 'text-primary-foreground'} border ${tile.textColor === "text-white" ? 'border-white/30' : 'border-primary-light/40'} font-sans shadow-md`}>
                      <Trophy className="w-2.5 h-2.5 inline mr-1" />
                      Populer
                    </div>
                  )}
                </div>

                <div className="space-y-2 md:space-y-3">
                  <h3 className={`text-lg md:text-xl lg:text-2xl font-serif font-bold ${tile.textColor || "text-foreground"} leading-tight drop-shadow-lg`}>
                    {tile.title}
                  </h3>
                  <p className={`${tile.textColor === "text-white" ? "text-white/80" : (tile.textColor || "text-foreground") + "/80"} group-hover:${tile.textColor === "text-white" ? "text-white/95" : (tile.textColor || "text-foreground") + "/95"} leading-relaxed drop-shadow-sm text-sm md:text-base lg:text-lg font-sans font-medium max-w-md mx-auto transition-colors duration-300`}>
                    {tile.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between mt-6 md:mt-8 pt-3 md:pt-4 border-t border-white/20">
                <div className={`flex items-center gap-1.5 ${tile.textColor || "text-foreground"}/70 text-xs md:text-sm font-sans`}>
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Update</span>
                </div>
                <div className={`flex items-center gap-1.5 md:gap-2 ${tile.textColor || "text-foreground"} font-semibold transition-all duration-300 font-sans`}>
                  <span className="text-sm md:text-base">Jelajahi</span>
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5 drop-shadow-sm transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </div>

            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-gradient-radial from-white/5 via-transparent to-transparent" />
          </BentoCard>
        </div>
      ))}
    </div>
  );
};

export default GSAPBentoGrid;
