
import { motion } from "framer-motion";
import PageLayout from "@/components/layouts/PageLayout";

const Informasi = () => {
  // Animation variants
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const blockVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
  };

  return (
    <PageLayout 
      title="WELCOME TO OUR CREATIVITY"
      subtitle="Selamat datang para anggota baru di komunitas 'OUR CREATIVITY'! Kami sangat senang dan bersemangat menyambut kehadiran Anda semua."
    >
      {/* Main Content with enhanced animations */}
      <motion.div 
        className="space-y-8 glass rounded-3xl p-8 border border-white/10 backdrop-blur-md relative overflow-hidden"
        variants={blockVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Decorative elements */}
        <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-lavender/5 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full bg-mint/5 blur-3xl" />
        
        <motion.div 
          className="space-y-6 relative z-10"
          variants={textVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="space-y-4">
            <h2 className="text-2xl font-serif font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Tentang Kreativitas</h2>
            <p className="text-gray-300 leading-relaxed">
              Kreativitas adalah kemampuan untuk menghasilkan ide-ide baru, solusi inovatif, dan cara-cara unik dalam menyelesaikan masalah. Ini adalah kekuatan yang memungkinkan kita untuk melihat dunia dari perspektif berbeda dan membuat sesuatu yang sebelumnya tidak ada. Kreativitas tidak terbatas pada seni dan desain; itu bisa ditemukan dalam berbagai bidang seperti sains, teknologi, bisnis, dan kehidupan sehari-hari.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-serif font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Visi Komunitas</h2>
            <p className="text-gray-300 leading-relaxed">
              Dalam komunitas ini, kita akan berbagi inspirasi, bertukar ide, dan mendukung satu sama lain dalam mengembangkan potensi kreatif kita. Melalui diskusi, proyek kolaboratif, dan berbagai kegiatan, kita akan bersama-sama mengeksplorasi dan memperluas batasan-batasan kreativitas kita.
            </p>
          </div>

          {/* Quote Section with enhanced design */}
          <motion.div 
            className="py-8 relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <div className="absolute left-0 top-0 text-6xl opacity-10">"</div>
            <div className="absolute right-0 bottom-0 text-6xl opacity-10">"</div>
            <blockquote className="text-center space-y-4 px-8">
              <p className="text-2xl font-serif italic glow-text">
                "Creativity is intelligence having fun."
              </p>
              <footer className="text-gray-400">— Albert Einstein</footer>
            </blockquote>
          </motion.div>

          <motion.div 
            className="space-y-4"
            variants={textVariants}
          >
            <p className="text-gray-300 leading-relaxed">
              Kutipan ini mengingatkan kita bahwa kreativitas adalah proses yang menyenangkan dan penuh dengan kegembiraan. Dengan menggabungkan kecerdasan dan imajinasi, kita dapat menciptakan sesuatu yang luar biasa dan bermanfaat bagi diri kita sendiri dan orang lain.
            </p>
          </motion.div>

          {/* Closing Section with interactive elements */}
          <motion.div 
            className="text-center space-y-4 pt-8 relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent -z-10 rounded-b-xl" />
            <p className="text-lg text-gray-300">
              Sekali lagi, selamat bergabung di "OUR CREATIVITY". Mari kita mulai perjalanan ini bersama-sama dan jadikan komunitas ini tempat di mana ide-ide brilian tumbuh dan berkembang. Selamat berkarya!
            </p>
            <motion.p 
              className="text-xl font-serif font-semibold glow-text"
              animate={{ 
                textShadow: ["0 0 8px rgba(255,255,255,0.5)", "0 0 16px rgba(255,255,255,0.5)", "0 0 8px rgba(255,255,255,0.5)"]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              "Your creativity has no limits"
            </motion.p>
            <p className="text-gray-400 italic">-From admin</p>
          </motion.div>
        </motion.div>
      </motion.div>
    </PageLayout>
  );
};

export default Informasi;
