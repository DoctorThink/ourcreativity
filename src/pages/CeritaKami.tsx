
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import PageLayout from "../components/layouts/PageLayout";
import BentoCard from "../components/ui/BentoCard";
import { AnimateInView } from "@/hooks/useElementInView";
import { BookOpen, Quote, History, BarChart, Target, Users, Award, Calendar } from "lucide-react";

const CeritaKami = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.9, 0.8]);

  return (
    <PageLayout 
      title="Cerita Kami" 
      subtitle="Perjalanan kreativitas dan inspirasi di balik komunitas kami"
    >
      <div ref={containerRef} className="relative z-10 px-4 sm:px-6 md:px-8">
        {/* Main Content with Bento Grid - Mobile Responsive */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {/* Main Story Card */}
          <BentoCard 
            className="md:col-span-2 md:row-span-2 p-4 sm:p-6 md:p-8"
            glowColor="rgba(229, 222, 255, 0.3)"
            icon={BookOpen}
            iconColor="bg-amethyst text-background"
          >
            <div className="h-full flex flex-col justify-between">
              <div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-semibold mb-4 sm:mb-6 pt-8">Bagaimana Semua Dimulai</h2>
                <p className="text-foreground/80 text-sm sm:text-base md:text-lg leading-relaxed mb-4 sm:mb-6 font-sans">
                  OUR CREATIVITY berawal dari sekelompok mahasiswa yang berbagi hasrat yang sama untuk menciptakan ruang kolaboratif bagi para kreator muda. Kami melihat betapa banyaknya bakat yang tersebar namun tidak memiliki wadah untuk dieksplorasi dan dikembangkan bersama.
                </p>
                <p className="text-foreground/80 text-sm sm:text-base md:text-lg leading-relaxed font-sans">
                  Pada awal 2022, dimulai dengan kelompok kecil beranggotakan 5 orang, kami mulai membangun komunitas yang berfokus pada pengembangan ide kreatif dan kolaborasi antar disiplin ilmu. Dari sini, komunitas kami mulai berkembang secara organik menjadi jaringan kreator yang lebih luas.
                </p>
              </div>
              
              <motion.div 
                className="mt-6 sm:mt-8 w-full h-1 bg-gradient-to-r from-transparent via-amethyst/30 to-transparent"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 2, ease: "easeOut" }}
                viewport={{ once: true }}
              />
            </div>
          </BentoCard>

          {/* Quote */}
          <BentoCard 
            className="p-4 sm:p-6 md:p-8 flex items-center justify-center min-h-[200px] md:min-h-[240px]"
            glowColor="rgba(152, 245, 225, 0.3)"
            icon={Quote}
            iconColor="bg-turquoise text-background"
          >
            <div className="text-center">
              <blockquote className="text-sm sm:text-lg md:text-xl font-serif italic text-foreground/90 relative">
                <span className="absolute -left-2 sm:-left-4 -top-2 sm:-top-6 text-2xl sm:text-4xl opacity-30">"</span>
                Tanpa keberanian seseorang tidak akan pernah berkarya.
                <span className="absolute -right-2 sm:-right-4 -bottom-2 sm:-bottom-6 text-2xl sm:text-4xl opacity-30">"</span>
              </blockquote>
              <p className="mt-4 text-xs sm:text-sm text-foreground/70 font-sans">- Pendiri OUR CREATIVITY</p>
            </div>
          </BentoCard>

          {/* Timeline */}
          <BentoCard 
            className="p-4 sm:p-6 md:p-8 min-h-[280px]"
            glowColor="rgba(254, 198, 161, 0.3)"
            icon={History}
            iconColor="bg-coral text-background"
          >
            <h3 className="text-lg sm:text-xl font-serif font-semibold mb-3 sm:mb-4 pt-8">Timeline Perjalanan</h3>
            <ul className="space-y-3 sm:space-y-4">
              <TimelineItem date="Jan 2022" event="Pertemuan pertama tim inti" />
              <TimelineItem date="Apr 2022" event="Peluncuran media sosial resmi" />
              <TimelineItem date="Jul 2022" event="Workshop kolaborasi pertama" />
              <TimelineItem date="Jan 2023" event="Mencapai 500+ anggota" />
              <TimelineItem date="Jul 2023" event="Showcase karya pertama" />
            </ul>
          </BentoCard>

          {/* Growth */}
          <BentoCard 
            className="p-4 sm:p-6 md:p-8 md:col-span-2 min-h-[280px]"
            glowColor="rgba(152, 245, 225, 0.3)"
            icon={BarChart}
            iconColor="bg-mint text-background"
          >
            <h3 className="text-lg sm:text-xl font-serif font-semibold mb-3 sm:mb-4 pt-8">Pertumbuhan Komunitas</h3>
            <p className="text-foreground/80 text-xs sm:text-sm md:text-base leading-relaxed mb-3 sm:mb-4 font-sans">
              Dari 5 anggota awal, kini OUR CREATIVITY telah berkembang menjadi komunitas dengan lebih dari:
            </p>
            <div className="grid grid-cols-2 gap-4">
              <StatItem value="1,000+" label="Anggota Aktif" />
              <StatItem value="50+" label="Kolaborasi Project" />
              <StatItem value="12+" label="Kota di Indonesia" />
              <StatItem value="4" label="Kategori Kreatif" />
            </div>
          </BentoCard>
        </div>
        
        {/* Additional Sections */}
        <AnimateInView className="mb-8 sm:mb-12">
          <BentoCard 
            className="p-4 sm:p-6 md:p-8"
            glowColor="rgba(155, 109, 255, 0.3)"
            icon={Target}
            iconColor="bg-amethyst text-background"
          >
            <h3 className="text-lg sm:text-xl font-serif font-semibold mb-3 sm:mb-4 pt-8">Visi Ke Depan</h3>
            <p className="text-foreground/80 text-sm sm:text-base md:text-lg leading-relaxed font-sans">
              OUR CREATIVITY memiliki visi untuk terus mengembangkan ekosistem kreator muda Indonesia. Kami berencana memperluas jangkauan ke lebih banyak kota, menyelenggarakan festival tahunan, dan membangun platform digital yang lebih komprehensif untuk karya-karya anggota.
            </p>
            <div className="mt-4 sm:mt-6 flex flex-wrap gap-2 sm:gap-3">
              <VisionTag>Ekspansi Nasional</VisionTag>
              <VisionTag>Festival Kreativitas Tahunan</VisionTag>
              <VisionTag>Platform Digital Terintegrasi</VisionTag>
              <VisionTag>Kolaborasi Internasional</VisionTag>
            </div>
          </BentoCard>
        </AnimateInView>
        
        {/* Key Values Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
          <AnimateInView>
            <BentoCard 
              className="p-4 sm:p-6 min-h-[140px] sm:min-h-[180px] md:min-h-[200px] flex flex-col items-center justify-center text-center"
              glowColor="rgba(254, 198, 161, 0.2)"
              icon={Users}
              iconColor="bg-coral text-background"
            >
              <h3 className="text-sm sm:text-base md:text-lg font-medium mt-8 mb-2">Komunitas</h3>
              <p className="text-xs sm:text-sm md:text-base text-foreground/70 font-sans">Membangun hubungan yang kuat dan saling mendukung antar kreator</p>
            </BentoCard>
          </AnimateInView>
          
          <AnimateInView>
            <BentoCard 
              className="p-4 sm:p-6 min-h-[140px] sm:min-h-[180px] md:min-h-[200px] flex flex-col items-center justify-center text-center"
              glowColor="rgba(152, 245, 225, 0.2)"
              icon={Award}
              iconColor="bg-turquoise text-background"
            >
              <h3 className="text-sm sm:text-base md:text-lg font-medium mt-8 mb-2">Kualitas</h3>
              <p className="text-xs sm:text-sm md:text-base text-foreground/70 font-sans">Mendorong standar tertinggi dalam setiap karya yang dihasilkan</p>
            </BentoCard>
          </AnimateInView>
          
          <AnimateInView>
            <BentoCard 
              className="p-4 sm:p-6 min-h-[140px] sm:min-h-[180px] md:min-h-[200px] flex flex-col items-center justify-center text-center"
              glowColor="rgba(229, 222, 255, 0.2)"
              icon={Calendar}
              iconColor="bg-amethyst text-background"
            >
              <h3 className="text-sm sm:text-base md:text-lg font-medium mt-8 mb-2">Konsistensi</h3>
              <p className="text-xs sm:text-sm md:text-base text-foreground/70 font-sans">Berkomitmen untuk terus berkarya dan berkontribusi secara berkelanjutan</p>
            </BentoCard>
          </AnimateInView>
        </div>
        
        {/* Final CTA Section */}
        <AnimateInView className="mt-8 sm:mt-12 md:mt-16 mb-6 sm:mb-8">
          <div className="text-center max-w-3xl mx-auto px-4">
            <h2 className="text-lg sm:text-xl md:text-3xl font-serif mb-3 sm:mb-4">Menjadi Bagian dari Perjalanan Kami</h2>
            <p className="text-foreground/80 text-xs sm:text-sm md:text-base mb-4 sm:mb-6 md:mb-8 font-sans">
              Kami mengundang para kreator muda Indonesia untuk bergabung dan menjadi bagian dari komunitas kami. 
              Bersama, kita akan menciptakan, menginspirasi, dan mengembangkan ekosistem kreativitas yang berkelanjutan.
            </p>
            <motion.div
              className="inline-block"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.button 
                className="px-4 sm:px-6 md:px-8 py-2 sm:py-3 bg-amethyst rounded-full text-background font-medium text-xs sm:text-sm md:text-base font-sans"
                whileHover={{ boxShadow: "0 0 15px rgba(155, 109, 255, 0.5)" }}
              >
                Bergabung Sekarang
              </motion.button>
            </motion.div>
          </div>
        </AnimateInView>
      </div>
    </PageLayout>
  );
};

// Helper components
const TimelineItem = ({ date, event }: { date: string; event: string }) => (
  <motion.li 
    className="flex items-start gap-2 sm:gap-4"
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
  >
    <span className="text-xs sm:text-sm font-medium text-coral whitespace-nowrap font-sans">{date}</span>
    <div className="flex gap-1 sm:gap-2 items-center flex-1">
      <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-coral mt-1.5"></span>
      <span className="text-xs sm:text-sm text-foreground/80 flex-1 font-sans">{event}</span>
    </div>
  </motion.li>
);

const StatItem = ({ value, label }: { value: string; label: string }) => (
  <motion.div 
    className="flex items-baseline justify-between"
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
  >
    <span className="text-lg sm:text-xl md:text-2xl font-medium text-mint font-sans">{value}</span>
    <span className="text-xs sm:text-sm text-foreground/70 font-sans">{label}</span>
  </motion.div>
);

const VisionTag = ({ children }: { children: React.ReactNode }) => (
  <motion.span 
    className="py-1 sm:py-1.5 px-2 sm:px-3 bg-amethyst/10 rounded-full text-xs sm:text-sm text-foreground/90 font-sans"
    whileHover={{ scale: 1.05, backgroundColor: "rgba(155, 109, 255, 0.2)" }}
    transition={{ duration: 0.2 }}
  >
    {children}
  </motion.span>
);

export default CeritaKami;
