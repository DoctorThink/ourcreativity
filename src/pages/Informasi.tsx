// src/pages/Informasi.tsx
import React from "react";
import PageLayout from "../components/layouts/PageLayout";
import { motion } from "framer-motion";

const Informasi = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <PageLayout title="Informasi" subtitle="Ketentuan dan informasi penting untuk komunitas">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-12"
      >
        {/* Information sections with animations */}
        <motion.section variants={itemVariants} className="glass-card rounded-3xl p-6 md:p-8 backdrop-blur-md">
          <h2 className="text-2xl font-semibold mb-4">Tentang Komunitas Kami</h2>
          <p className="text-foreground/70">
            OUR CREATIVITY adalah komunitas yang didedikasikan untuk mendukung dan mempromosikan kreativitas di kalangan generasi muda. Kami menyediakan platform bagi para kreator untuk berbagi karya, berkolaborasi, dan belajar bersama.
          </p>
        </motion.section>
        
        {/* Add similar motion.section wrappers for other sections */}
        <motion.section variants={itemVariants} className="glass-card rounded-3xl p-6 md:p-8 backdrop-blur-md">
          <h2 className="text-2xl font-semibold mb-4">Visi Kami</h2>
          <p className="text-foreground/70">
            Menjadi wadah utama bagi kreator muda Indonesia untuk mengembangkan potensi dan mewujudkan ide-ide kreatif mereka.
          </p>
        </motion.section>

        <motion.section variants={itemVariants} className="glass-card rounded-3xl p-6 md:p-8 backdrop-blur-md">
          <h2 className="text-2xl font-semibold mb-4">Misi Kami</h2>
          <ul className="list-disc list-inside text-foreground/70">
            <li>Menyediakan platform yang inklusif dan mendukung bagi semua kreator.</li>
            <li>Memfasilitasi kolaborasi dan pertukaran ide antar anggota.</li>
            <li>Mengadakan acara dan workshop untuk meningkatkan keterampilan kreatif.</li>
            <li>Mempromosikan karya anggota kepada khalayak yang lebih luas.</li>
          </ul>
        </motion.section>
      </motion.div>
    </PageLayout>
  );
};

export default Informasi;
