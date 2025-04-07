
import React from 'react';
import { motion } from 'framer-motion';
import PageLayout from '@/components/layouts/PageLayout';
import KaryaGallery from '@/components/KaryaGallery';

const KaryaKami = () => {
  // Animation variants
  const containerVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };

  const childVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <PageLayout title="Karya Kami" subtitle="Koleksi kreativitas dari komunitas kami. Jelajahi beragam karya kreatif yang telah dibuat oleh anggota OUR CREATIVITY.">
      <motion.div 
        initial="initial"
        animate="animate"
        variants={containerVariants}
        className="min-h-screen"
      >
        {/* Gallery Section */}
        <motion.section 
          variants={childVariants}
          className="py-8"
        >
          <KaryaGallery />
        </motion.section>
      </motion.div>
    </PageLayout>
  );
};

export default KaryaKami;
