
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Calendar, Users, Megaphone, BookOpen, Info, FileText } from "lucide-react";
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
  path: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const tileVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeInOut",
    },
  },
};

const Index = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [selectedTile, setSelectedTile] = useState<BentoTile | null>(null);

  const handleTileClick = (tile: BentoTile) => {
    setSelectedTile(tile);
  };

  const handleDialogClose = () => {
    setSelectedTile(null);
  };

  const bentoTiles: BentoTile[] = [
    {
      id: "announcements",
      title: "Pengumuman",
      description: "Informasi terbaru dan penting dari komunitas OUR CREATIVITY",
      icon: Megaphone,
      color: "bg-amethyst",
      path: "/pengumuman",
    },
    {
      id: "events",
      title: "Acara",
      description: "Jadwal dan detail acara komunitas yang akan datang",
      icon: Calendar,
      color: "bg-coral",
      path: "/acara",
    },
    {
      id: "recruitment",
      title: "Rekrutmen",
      description: "Peluang untuk bergabung dengan tim dan proyek OC",
      icon: Users,
      color: "bg-turquoise",
      path: "/rekrutmen",
    },
    {
      id: "panduan",
      title: "Panduan",
      description: "Informasi dan tutorial untuk membantu Anda berkontribusi",
      icon: BookOpen,
      color: "bg-lavender",
      path: "/panduan",
    },
    {
      id: "tentang",
      title: "Tentang",
      description: "Visi, misi, dan nilai-nilai yang mendasari komunitas OC",
      icon: Info,
      color: "bg-softPink",
      path: "/tentang",
    },
    {
      id: "dokumen",
      title: "Dokumen",
      description: "Arsip dokumen penting dan catatan komunitas",
      icon: FileText,
      color: "bg-peach",
      path: "/dokumen",
    },
  ];

  return (
    <PageLayout 
      title="Beranda"
      subtitle="Platform kolaborasi dan informasi untuk komunitas kreatif"
      showBackButton={false}
    >
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-8"
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold leading-tight mb-4">
          Selamat Datang di <span className="home-title">OUR CREATIVITY</span>
        </h1>
        <p className="text-lg sm:text-xl text-foreground/80 leading-relaxed">
          Platform kolaborasi dan informasi untuk komunitas kreatif.
        </p>
      </motion.div>

      {/* Main Navigation Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 gap-4 sm:gap-6"
      >
        {bentoTiles.map((tile) => (
          <motion.div
            key={tile.id}
            variants={tileVariants}
            className={`relative rounded-2xl overflow-hidden shadow-lg cursor-pointer group ${tile.color}/20 hover:${tile.color}/30 transition-colors duration-300`}
            onClick={() => handleTileClick(tile)}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/5 group-hover:from-white/10 group-hover:via-transparent transition-opacity duration-300 pointer-events-none" />
            <div className="p-4 sm:p-5 flex flex-col h-full">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center ${tile.color} text-background shadow-md`}>
                  <tile.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
              </div>
              <h3 className="text-lg sm:text-xl font-serif font-semibold mb-2 leading-tight">{tile.title}</h3>
              <p className="text-sm sm:text-base text-foreground/70 leading-relaxed flex-grow">{tile.description}</p>
              <div className="mt-auto flex justify-end">
                <motion.button
                  className="text-sm font-medium flex items-center gap-2 text-foreground/80 group-hover:text-foreground group-hover:gap-3 transition-all duration-200"
                  whileHover={{ x: 3 }}
                >
                  Jelajahi
                  <ArrowRight className="w-3 h-3 group-hover:rotate-12 transition-transform duration-200" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Dialog Components */}
      <Dialog open={!!selectedTile} onOpenChange={handleDialogClose}>
        <DialogContent className="max-w-md p-6 rounded-2xl bg-secondary/95 backdrop-blur-md border-0">
          <AnimatePresence>
            {selectedTile && (
              <motion.div
                key={selectedTile.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="text-2xl font-serif font-bold mb-4">{selectedTile.title}</h3>
                <p className="text-foreground/80 leading-relaxed mb-6">{selectedTile.description}</p>
                <div className="flex justify-end">
                  <motion.button
                    className="px-4 py-2 bg-primary/10 text-primary font-medium rounded-full hover:bg-primary/20 transition-colors duration-200"
                    onClick={() => {
                      navigate(selectedTile.path);
                      handleDialogClose();
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Lanjutkan
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </PageLayout>
  );
};

export default Index;
