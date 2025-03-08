
import { motion } from "framer-motion";
import PageLayout from "@/components/layouts/PageLayout";
import { Separator } from "@/components/ui/separator";

const Informasi = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.15,
        delayChildren: 0.2
      } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <PageLayout 
      title="WELCOME TO OUR CREATIVITY"
      subtitle="Selamat datang para anggota baru di komunitas 'OUR CREATIVITY'! Kami sangat senang dan bersemangat menyambut kehadiran Anda semua."
    >
      {/* Main Content with enhanced animations */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-12"
      >
        <motion.div 
          variants={itemVariants}
          className="glass rounded-3xl p-8 border border-white/10 backdrop-blur-md relative overflow-hidden"
        >
          {/* Geometric decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 rounded-full border border-white/10" style={{ opacity: 0.1 }} />
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full border border-white/5" style={{ opacity: 0.1 }} />
          
          <div className="relative z-10 space-y-8">
            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-2xl font-serif font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Tentang Kreativitas
                </h2>
                <Separator className="bg-white/10" />
                <p className="text-gray-300 leading-relaxed">
                  Kreativitas adalah kemampuan untuk menghasilkan ide-ide baru, solusi inovatif, dan cara-cara unik dalam menyelesaikan masalah. Ini adalah kekuatan yang memungkinkan kita untuk melihat dunia dari perspektif berbeda dan membuat sesuatu yang sebelumnya tidak ada. Kreativitas tidak terbatas pada seni dan desain; itu bisa ditemukan dalam berbagai bidang seperti sains, teknologi, bisnis, dan kehidupan sehari-hari.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-serif font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Visi Komunitas
                </h2>
                <Separator className="bg-white/10" />
                <p className="text-gray-300 leading-relaxed">
                  Dalam komunitas ini, kita akan berbagi inspirasi, bertukar ide, dan mendukung satu sama lain dalam mengembangkan potensi kreatif kita. Melalui diskusi, proyek kolaboratif, dan berbagai kegiatan, kita akan bersama-sama mengeksplorasi dan memperluas batasan-batasan kreativitas kita.
                </p>
              </div>
            </div>

            {/* Quote Section with enhanced geometric design */}
            <motion.div 
              variants={itemVariants}
              className="py-8 px-6 relative glass rounded-2xl border border-white/5"
            >
              <div className="absolute left-3 top-3 text-6xl opacity-10">"</div>
              <div className="absolute right-3 bottom-3 text-6xl opacity-10">"</div>
              <blockquote className="text-center space-y-4">
                <p className="text-2xl font-serif italic glow-text">
                  "Creativity is intelligence having fun."
                </p>
                <footer className="text-gray-400">— Albert Einstein</footer>
              </blockquote>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Kutipan ini mengingatkan kita bahwa kreativitas adalah proses yang menyenangkan dan penuh dengan kegembiraan. Dengan menggabungkan kecerdasan dan imajinasi, kita dapat menciptakan sesuatu yang luar biasa dan bermanfaat bagi diri kita sendiri dan orang lain.
              </p>
            </motion.div>

            {/* Closing Section with interactive elements and geometric accents */}
            <motion.div 
              variants={itemVariants}
              className="text-center space-y-4 pt-8 relative"
            >
              <div className="absolute -left-4 -right-4 bottom-0 h-40 rounded-b-3xl bg-gradient-to-t from-white/5 to-transparent -z-10" />
              
              {/* Geometric decorations */}
              <div className="absolute bottom-12 left-12 w-8 h-8 rotate-45 border border-white/10" style={{ opacity: 0.2 }} />
              <div className="absolute bottom-20 right-20 w-12 h-12 rounded-full border border-white/10" style={{ opacity: 0.2 }} />
              
              <p className="text-lg text-gray-300 relative z-10">
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
              <p className="text-gray-400 italic">- Admin</p>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </PageLayout>
  );
};

export default Informasi;
