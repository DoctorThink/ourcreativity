import { motion } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Informasi = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header with Logo */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg p-4 border-b border-white/10">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-foreground/60 hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Kembali</span>
          </button>
          
          <div className="flex items-center gap-2">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-8 h-8 rounded-full bg-white/5 p-1 flex items-center justify-center backdrop-blur-md border border-white/10"
            >
              <img
                src="/lovable-uploads/c861a7c0-5ec9-4bac-83ea-319c40fcb001.png"
                alt="Logo"
                className="w-6 h-6 object-contain"
              />
            </motion.div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-8 h-8 rounded-full bg-white/5 p-1 flex items-center justify-center backdrop-blur-md border border-white/10"
            >
              <img
                src="/lovable-uploads/0bec5fdf-43d7-47af-b1cd-ba7fd2b949ec.png"
                alt="Text Logo"
                className="w-6 h-6 object-contain"
              />
            </motion.div>
          </div>
        </div>
      </div>

      <ScrollArea className="h-[calc(100vh-80px)]">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-12"
          >
            {/* Welcome Section */}
            <div className="text-center space-y-6">
              <motion.h1 
                className="text-4xl md:text-6xl font-serif font-bold tracking-tight animate-glow"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                WELCOME TO OUR CREATIVITY
              </motion.h1>
              <motion.p 
                className="text-lg md:text-xl text-gray-300 leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Selamat datang para anggota baru di komunitas "OUR CREATIVITY"! Kami sangat senang dan bersemangat menyambut kehadiran Anda semua. Komunitas ini dibentuk dengan tujuan untuk bersama-sama mengembangkan dan merayakan jiwa kreativitas yang ada dalam diri kita.
              </motion.p>
            </div>

            {/* Main Content */}
            <motion.div 
              className="space-y-8 glass rounded-3xl p-8"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
            >
              <div className="space-y-4">
                <h2 className="text-2xl font-serif font-semibold">Tentang Kreativitas</h2>
                <p className="text-gray-300 leading-relaxed">
                  Kreativitas adalah kemampuan untuk menghasilkan ide-ide baru, solusi inovatif, dan cara-cara unik dalam menyelesaikan masalah. Ini adalah kekuatan yang memungkinkan kita untuk melihat dunia dari perspektif berbeda dan membuat sesuatu yang sebelumnya tidak ada. Kreativitas tidak terbatas pada seni dan desain; itu bisa ditemukan dalam berbagai bidang seperti sains, teknologi, bisnis, dan kehidupan sehari-hari.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-serif font-semibold">Visi Komunitas</h2>
                <p className="text-gray-300 leading-relaxed">
                  Dalam komunitas ini, kita akan berbagi inspirasi, bertukar ide, dan mendukung satu sama lain dalam mengembangkan potensi kreatif kita. Melalui diskusi, proyek kolaboratif, dan berbagai kegiatan, kita akan bersama-sama mengeksplorasi dan memperluas batasan-batasan kreativitas kita.
                </p>
              </div>

              {/* Quote Section */}
              <div className="py-8">
                <blockquote className="text-center space-y-4">
                  <p className="text-2xl font-serif italic animate-glow">
                    "Creativity is intelligence having fun."
                  </p>
                  <footer className="text-gray-400">— Albert Einstein</footer>
                </blockquote>
              </div>

              <div className="space-y-4">
                <p className="text-gray-300 leading-relaxed">
                  Kutipan ini mengingatkan kita bahwa kreativitas adalah proses yang menyenangkan dan penuh dengan kegembiraan. Dengan menggabungkan kecerdasan dan imajinasi, kita dapat menciptakan sesuatu yang luar biasa dan bermanfaat bagi diri kita sendiri dan orang lain.
                </p>
              </div>

              {/* Closing Section */}
              <motion.div 
                className="text-center space-y-4 pt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <p className="text-lg text-gray-300">
                  Sekali lagi, selamat bergabung di "OUR CREATIVITY". Mari kita mulai perjalanan ini bersama-sama dan jadikan komunitas ini tempat di mana ide-ide brilian tumbuh dan berkembang. Selamat berkarya!
                </p>
                <p className="text-xl font-serif font-semibold animate-glow">
                  "Your creativity has no limits"
                </p>
                <p className="text-gray-400 italic">-From admin</p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default Informasi;