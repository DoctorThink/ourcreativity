
import React from 'react';
import { motion } from 'framer-motion';
import { PageLayout } from '@/components/layouts/PageLayout';
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
    <PageLayout>
      <motion.div 
        initial="initial"
        animate="animate"
        variants={containerVariants}
        className="min-h-screen"
      >
        {/* Hero Section */}
        <motion.section variants={childVariants} className="py-16 text-center">
          <div className="container px-4 mx-auto">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Karya Kami
            </motion.h1>
            <motion.p 
              className="text-xl text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Koleksi kreativitas dari komunitas kami. Jelajahi beragam karya kreatif
              yang telah dibuat oleh anggota OUR CREATIVITY.
            </motion.p>
          </div>
        </motion.section>

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
