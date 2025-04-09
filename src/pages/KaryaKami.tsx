
import React from 'react';
import { motion } from 'framer-motion';
import PageLayout from '@/components/layouts/PageLayout';
import KaryaGallery from '@/components/karya/KaryaGallery';
import { KaryaUploadForm } from '@/components/KaryaUploadForm';

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
    <PageLayout 
      title="Karya Kami" 
      subtitle="Koleksi kreativitas dari komunitas kami. Jelajahi beragam karya kreatif yang telah dibuat oleh anggota OUR CREATIVITY."
    >
      <motion.div 
        initial="initial"
        animate="animate"
        variants={containerVariants}
        className="min-h-screen relative"
      >
        {/* Background elements for visual interest */}
        <div className="absolute top-0 left-0 right-0 h-[60vh] overflow-hidden -z-10 opacity-50 pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[40%] h-[40%] bg-gradient-to-br from-lavender/10 to-mint/5 rounded-full filter blur-[100px] animate-float-slow"></div>
          <div className="absolute bottom-[-30%] right-[-10%] w-[50%] h-[60%] bg-gradient-to-br from-peach/10 to-softPink/5 rounded-full filter blur-[120px] animate-float-slow-reverse"></div>
        </div>

        {/* Upload Form Section */}
        <motion.div 
          variants={childVariants}
          className="container flex justify-center py-8"
        >
          <KaryaUploadForm />
        </motion.div>

        {/* Gallery Section with improved masonry grid */}
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
