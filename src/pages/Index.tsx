
import React from 'react';
import { motion } from 'framer-motion';
import { Users, Target, Calendar, Trophy, ExternalLink, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BentoGrid from '@/components/ui/BentoGrid';
import BentoCard from '@/components/ui/BentoCard';
import PageLayout from '@/components/layouts/PageLayout';

const Index = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <PageLayout>
      <div className="min-h-screen bg-background relative overflow-hidden">
        {/* Hero Section */}
        <motion.section 
          className="relative pt-20 pb-16 px-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-6xl mx-auto text-center">
            <motion.h1 
              className="text-6xl md:text-8xl font-serif font-bold mb-6 home-title text-readable-heading"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              OUR CREATIVITY
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-foreground/80 max-w-3xl mx-auto text-readable"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              Dimana imajinasi bertemu dengan inovasi. Bergabunglah dengan komunitas kreatif kami dan wujudkan karya terbaikmu.
            </motion.p>
          </div>
        </motion.section>

        {/* Bento Grid Section */}
        <motion.section 
          className="px-6 pb-20"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="max-w-7xl mx-auto">
            <BentoGrid cols={4} mdCols={3} smCols={1} gap="lg" animate={false}>
              {/* About Card */}
              <motion.div variants={cardVariants} className="col-span-2 row-span-2">
                <BentoCard className="h-full p-8 flex flex-col justify-center">
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <Users className="w-8 h-8 text-[#9B6DFF]" />
                      <h2 className="text-3xl font-serif font-bold text-readable-heading">Tentang Kami</h2>
                    </div>
                    <p className="text-lg text-foreground/80 leading-relaxed text-readable">
                      OUR CREATIVITY adalah komunitas kreatif yang menghubungkan para kreator muda Indonesia. 
                      Kami menyediakan platform untuk belajar, berbagi, dan berkolaborasi dalam menciptakan karya-karya luar biasa.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <div className="bg-[#9B6DFF]/20 px-4 py-2 rounded-full">
                        <span className="text-sm font-medium text-[#9B6DFF]">Komunitas</span>
                      </div>
                      <div className="bg-[#40E0D0]/20 px-4 py-2 rounded-full">
                        <span className="text-sm font-medium text-[#40E0D0]">Kreativitas</span>
                      </div>
                      <div className="bg-[#FF7F50]/20 px-4 py-2 rounded-full">
                        <span className="text-sm font-medium text-[#FF7F50]">Inovasi</span>
                      </div>
                    </div>
                  </div>
                </BentoCard>
              </motion.div>

              {/* Stats Card */}
              <motion.div variants={cardVariants}>
                <BentoCard className="h-full p-6 flex flex-col justify-center text-center">
                  <Trophy className="w-12 h-12 text-[#FFBF00] mx-auto mb-4" />
                  <h3 className="text-4xl font-bold text-[#FFBF00] mb-2">3000+</h3>
                  <p className="text-foreground/70 text-readable">Anggota Aktif</p>
                </BentoCard>
              </motion.div>

              {/* Mission Card */}
              <motion.div variants={cardVariants}>
                <BentoCard className="h-full p-6 flex flex-col justify-center">
                  <Target className="w-8 h-8 text-[#98F5E1] mb-4" />
                  <h3 className="text-xl font-serif font-bold mb-3 text-readable-heading">Misi Kami</h3>
                  <p className="text-sm text-foreground/80 text-readable">
                    Membangun ekosistem kreatif yang mendukung pertumbuhan dan pengembangan talenta digital Indonesia.
                  </p>
                </BentoCard>
              </motion.div>

              {/* Ayo Gabung Card */}
              <motion.div variants={cardVariants} className="col-span-2 row-span-1">
                <BentoCard className="h-full p-8 flex flex-col justify-center relative overflow-hidden bg-gradient-to-br from-[#9B6DFF]/20 to-[#40E0D0]/20 border-[#9B6DFF]/30">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <ExternalLink className="w-8 h-8 text-[#9B6DFF]" />
                      <h2 className="text-3xl font-serif font-bold text-readable-heading">Ayo Gabung!</h2>
                    </div>
                    <p className="text-lg text-foreground/80 text-readable">
                      Bergabunglah dengan komunitas kami melalui Linktree. Beberapa grup menggunakan Google Form untuk pendaftaran.
                    </p>
                    <div className="flex items-center gap-4">
                      <Button 
                        asChild 
                        className="bg-[#9B6DFF] hover:bg-[#9B6DFF]/80 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105"
                      >
                        <a href="https://linktr.ee/ourcreativity" target="_blank" rel="noopener noreferrer">
                          Kunjungi Linktree
                        </a>
                      </Button>
                      <div className="flex items-center gap-2 bg-[#50C878]/20 px-4 py-2 rounded-full">
                        <Code className="w-4 h-4 text-[#50C878]" />
                        <span className="text-sm font-medium text-[#50C878]">OC Edisi Coding - Coming Soon</span>
                      </div>
                    </div>
                  </div>
                  {/* Decorative background elements */}
                  <div className="absolute -top-4 -right-4 w-20 h-20 bg-[#9B6DFF]/10 rounded-full blur-xl" />
                  <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-[#40E0D0]/10 rounded-full blur-lg" />
                </BentoCard>
              </motion.div>

              {/* Updates Card */}
              <motion.div variants={cardVariants}>
                <BentoCard className="h-full p-6 flex flex-col justify-center">
                  <Calendar className="w-8 h-8 text-[#FEC6A1] mb-4" />
                  <h3 className="text-xl font-serif font-bold mb-3 text-readable-heading">Pembaruan</h3>
                  <p className="text-sm text-foreground/80 text-readable">
                    Ikuti perkembangan terbaru komunitas dan acara-acara menarik yang akan datang.
                  </p>
                </BentoCard>
              </motion.div>
            </BentoGrid>
          </div>
        </motion.section>
      </div>
    </PageLayout>
  );
};

export default Index;
