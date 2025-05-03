
// src/pages/Informasi.tsx
import React, { useRef } from "react";
import PageLayout from "../components/layouts/PageLayout";
import { motion, useScroll, useTransform } from "framer-motion";

const Informasi = () => {
  // Setup for scroll effects
  const mainRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: mainRef,
    offset: ["start start", "end start"]
  });
  
  // Parallax scrolling effects
  const titleParallax = useTransform(scrollYProgress, [0, 1], [0, -100]);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <PageLayout title="Informasi" subtitle="Ketentuan dan informasi penting untuk komunitas">
      <motion.div
        ref={mainRef}
        className="space-y-12"
        style={{ y: titleParallax }}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-12"
        >
          {/* Vision section with enhanced styling */}
          <motion.section variants={itemVariants} className="glass-card rounded-3xl p-8 md:p-10 backdrop-blur-md relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-radial from-amethyst/20 via-amethyst/5 to-transparent rounded-full filter blur-3xl"></div>
            
            <h2 className="text-2xl md:text-3xl font-semibold mb-6 font-serif">Tentang Komunitas Kami</h2>
            <p className="text-foreground/80 text-lg leading-relaxed">
              OUR CREATIVITY adalah komunitas yang didedikasikan untuk mendukung dan mempromosikan kreativitas di kalangan generasi muda. Kami menyediakan platform bagi para kreator untuk berbagi karya, berkolaborasi, dan belajar bersama.
            </p>
          </motion.section>
          
          {/* Vision section with glow effect */}
          <motion.section variants={itemVariants} className="glass-card rounded-3xl p-8 md:p-10 backdrop-blur-md relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute -bottom-20 -left-20 w-56 h-56 bg-gradient-radial from-turquoise/20 via-turquoise/5 to-transparent rounded-full filter blur-3xl"></div>
            
            <h2 className="text-2xl md:text-3xl font-semibold mb-6 font-serif">Visi Kami</h2>
            <p className="text-foreground/80 text-lg leading-relaxed">
              Menjadi wadah utama bagi kreator muda Indonesia untuk mengembangkan potensi dan mewujudkan ide-ide kreatif mereka.
            </p>
          </motion.section>

          {/* Mission section with interactive elements */}
          <motion.section variants={itemVariants} className="glass-card rounded-3xl p-8 md:p-10 backdrop-blur-md relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute -top-20 -left-20 w-56 h-56 bg-gradient-radial from-coral/20 via-coral/5 to-transparent rounded-full filter blur-3xl"></div>
            
            <h2 className="text-2xl md:text-3xl font-semibold mb-6 font-serif">Misi Kami</h2>
            <ul className="space-y-4 text-foreground/80 text-lg">
              {[
                "Menyediakan platform yang inklusif dan mendukung bagi semua kreator.",
                "Memfasilitasi kolaborasi dan pertukaran ide antar anggota.",
                "Mengadakan acara dan workshop untuk meningkatkan keterampilan kreatif.",
                "Mempromosikan karya anggota kepada khalayak yang lebih luas."
              ].map((item, index) => (
                <motion.li 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
                  className="flex items-start gap-3"
                >
                  <span className="inline-block w-6 h-6 rounded-full bg-gradient-to-r from-amethyst to-turquoise flex-shrink-0 mt-1"></span>
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.section>
        </motion.div>
      </motion.div>
    </PageLayout>
  );
};

export default Informasi;
