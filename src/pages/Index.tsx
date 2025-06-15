import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Megaphone, Users, BookOpen, Info, FileText, Palette, UserPlus, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PageLayout from "../components/layouts/PageLayout";
import BentoCard from "../components/ui/BentoCard";

interface HomeCardProps {
  id: string;
  title: string;
  description: string;
  icon: React.FC<{ className?: string }>;
  color: string;
  path: string;
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

  const handleTileClick = (path: string, id: string) => {
    if (id === 'ayo-gabung') {
      window.open('https://linktr.ee/ourcreativity', '_blank');
    } else {
      navigate(path);
    }
  };

  const homeTiles: HomeCardProps[] = [
    {
      id: "pengumuman",
      title: "Pengumuman",
      description: "Info terbaru & update penting dari komunitas.",
      icon: Megaphone,
      color: "amethyst",
      path: "/pengumuman",
    },
    {
      id: "tim-kami",
      title: "Tim Kami",
      description: "Kenali para kreator & kontributor di balik layar.",
      icon: Users,
      color: "turquoise",
      path: "/tim-kami",
    },
    {
      id: "karya-kami",
      title: "Karya Kami",
      description: "Jelajahi galeri karya kreatif dari anggota.",
      icon: Palette,
      color: "coral",
      path: "/karya-kami",
    },
    {
      id: "cerita-kami",
      title: "Cerita Kami",
      description: "Baca perjalanan, visi, dan misi komunitas kami.",
      icon: BookOpen,
      color: "mint",
      path: "/cerita-kami",
    },
    {
      id: "informasi",
      title: "Informasi",
      description: "Temukan detail lengkap tentang komunitas kami.",
      icon: Info,
      color: "softPink",
      path: "/informasi",
    },
    {
      id: "terms",
      title: "Syarat & Ketentuan",
      description: "Pahami panduan dan aturan main di komunitas.",
      icon: FileText,
      color: "peach",
      path: "/terms",
    },
  ];

  const ayoGabungTile: HomeCardProps = {
    id: "ayo-gabung",
    title: "Ayo Gabung!",
    description: "Siap berkontribusi? Jadilah bagian dari kami.",
    icon: UserPlus,
    color: "emerald-500",
    path: "#",
  };

  const cardColorClasses: { [key: string]: { bg: string, text: string, border: string, iconBg: string } } = {
    amethyst: { bg: 'bg-amethyst/10', text: 'text-amethyst', border: 'border-amethyst/30', iconBg: 'bg-amethyst/20' },
    turquoise: { bg: 'bg-turquoise/10', text: 'text-turquoise', border: 'border-turquoise/30', iconBg: 'bg-turquoise/20' },
    coral: { bg: 'bg-coral/10', text: 'text-coral', border: 'border-coral/30', iconBg: 'bg-coral/20' },
    mint: { bg: 'bg-mint/10', text: 'text-mint', border: 'border-mint/30', iconBg: 'bg-mint/20' },
    softPink: { bg: 'bg-softPink/10', text: 'text-softPink', border: 'border-softPink/30', iconBg: 'bg-softPink/20' },
    peach: { bg: 'bg-peach/10', text: 'text-peach', border: 'border-peach/30', iconBg: 'bg-peach/20' },
    'emerald-500': { bg: 'bg-emerald-500/20', text: 'text-emerald-300', border: 'border-emerald-400/50', iconBg: 'bg-emerald-500/30' },
  };

  const HomeCard = ({ tile }: { tile: HomeCardProps }) => {
    const colors = cardColorClasses[tile.color] || cardColorClasses.amethyst;
    const isJoinCard = tile.id === 'ayo-gabung';

    return (
      <motion.div
        variants={tileVariants}
        className="h-full"
      >
        <BentoCard
          className={`group cursor-pointer h-full transition-all duration-300 backdrop-blur-sm p-5 flex flex-col text-left ${colors.bg} ${colors.border} hover:border-border/70`}
          onClick={() => handleTileClick(tile.path, tile.id)}
          interactive={true}
          motionProps={{
            whileHover: { y: -5, scale: 1.02 },
            whileTap: { scale: 0.98 }
          }}
        >
          {/* Top Area */}
          <div className={`w-12 h-12 rounded-xl ${colors.iconBg} flex items-center justify-center mb-4`}>
            <tile.icon className={`w-6 h-6 ${colors.text}`} />
          </div>

          {/* Middle Area */}
          <div className="flex-grow">
            <h3 className={`text-xl font-serif font-bold text-foreground leading-tight`}>
              {tile.title}
            </h3>
            <p className="text-foreground/80 leading-relaxed text-sm font-sans font-medium mt-2">
              {tile.description}
            </p>
          </div>

          {/* Bottom Area */}
          <div className="flex justify-between items-center mt-6 pt-4 border-t border-white/10">
            <div className={`flex items-center gap-1.5 text-xs font-sans ${colors.text}`}>
              <Calendar className="w-3.5 h-3.5" />
              <span>Info Komunitas</span>
            </div>
            <div className={`flex items-center gap-1 font-semibold transition-all duration-300 font-sans text-sm ${colors.text}`}>
              <span>{isJoinCard ? 'Gabung' : 'Jelajahi'}</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </div>
          </div>
        </BentoCard>
      </motion.div>
    );
  };

  return (
    <PageLayout
      title=""
      className="relative min-h-screen"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-background/60 to-secondary/40 backdrop-blur-md -z-10" />
      
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-12 md:mb-16 relative z-10"
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
          {homeTiles.map((tile) => (
            <HomeCard key={tile.id} tile={tile} />
          ))}
          <div className="lg:col-span-3">
             <HomeCard tile={ayoGabungTile} />
          </div>
        </div>
      </motion.div>
    </PageLayout>
  );
};

export default Index;
