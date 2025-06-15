import React, { useRef, useLayoutEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import PageLayout from "../components/layouts/PageLayout";
import BentoCard from "../components/ui/BentoCard";
import { IconTitleRow } from "@/components/ui/IconTitleRow";
import { BookOpen, Quote, History, BarChart, Target, Users, Award, Calendar, TrendingUp, Heart } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const CeritaKami = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mainContentRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.9, 0.8]);
  
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Animate single elements
      gsap.utils.toArray<HTMLElement>('.fade-up').forEach(elem => {
        gsap.from(elem, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: elem,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });
      });
      
      // Animate grid items with stagger
      gsap.utils.toArray<HTMLElement>('.grid-container').forEach(grid => {
        gsap.from(grid.children, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.2,
          scrollTrigger: {
            trigger: grid,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });
      });

    }, mainContentRef);
    return () => ctx.revert();
  }, [mainContentRef]);

  return (
    <PageLayout 
      title="Cerita Kami" 
      subtitle="Perjalanan kreativitas dan inspirasi di balik komunitas kami"
    >
      <div ref={containerRef} className="relative z-10 px-4 sm:px-6 md:px-8">
        <div ref={mainContentRef}>
          {/* Main Content with Bento Grid - Mobile Responsive */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 sm:gap-6 mb-8 sm:mb-12 grid-container">
            {/* Main Story Card */}
            <BentoCard 
              className="md:col-span-3 p-4 sm:p-6 md:p-8"
              glowColor="rgba(229, 222, 255, 0.3)"
            >
              <div className="h-full flex flex-col justify-between">
                <div>
                  <IconTitleRow 
                    icon={BookOpen}
                    iconColor="bg-amethyst text-background"
                    title="Bagaimana Semua Dimulai"
                    className="mb-4 sm:mb-6"
                  />
                  <p className="text-foreground/80 text-sm sm:text-base leading-relaxed mb-4 sm:mb-6 font-sans">
                    Perjalanan OurCreativity berawal dari sebuah pengamatan sederhana: internet dipenuhi oleh percakapan dan komentar dari ribuan anak muda yang memiliki hasrat besar untuk mempelajari suatu hal, mulai dari desain grafis, video editing, hingga penulisan kreatif. Namun, semangat itu seringkali terhenti karena satu hal—mereka tidak memiliki tempat yang aman dan terarah untuk bertanya dan bertumbuh.
                  </p>
                  
                  <motion.div 
                    className="my-6 w-full h-px bg-gradient-to-r from-transparent via-amethyst/30 to-transparent"
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    viewport={{ once: true }}
                  />

                  <p className="text-foreground/80 text-sm sm:text-base leading-relaxed font-sans">
                    Melihat kekosongan ini, kami tergerak untuk membangun sebuah jembatan. OurCreativity lahir dari sebuah harapan sederhana: untuk menciptakan sebuah komunitas di mana pertanyaan tidak hanya dijawab, tetapi juga dirayakan sebagai awal dari sebuah karya.
                  </p>
                </div>
              </div>
            </BentoCard>

            {/* Quote */}
            <BentoCard 
              className="md:col-span-2 p-4 sm:p-6 md:p-8 flex items-center justify-center"
              glowColor="rgba(152, 245, 225, 0.3)"
            >
              <div className="text-center">
                <blockquote className="text-sm sm:text-base md:text-lg font-serif italic text-foreground/90 relative">
                  <span className="absolute -left-2 sm:-left-4 -top-2 sm:-top-6 text-xl sm:text-2xl opacity-30">"</span>
                  Tanpa keberanian seseorang tidak akan pernah berkarya.
                  <span className="absolute -right-2 sm:-right-4 -bottom-2 sm:-bottom-6 text-xl sm:text-2xl opacity-30">"</span>
                </blockquote>
                <p className="mt-4 text-xs sm:text-sm text-foreground/70 font-sans">- Pendiri OUR CREATIVITY</p>
              </div>
            </BentoCard>

            {/* How We Attract Interest */}
            <BentoCard 
              className="md:col-span-3 p-4 sm:p-6 md:p-8"
              glowColor="rgba(254, 198, 161, 0.3)"
            >
              <div>
                <IconTitleRow 
                  icon={TrendingUp}
                  iconColor="bg-coral text-background"
                  title="Bagaimana Kami Menarik Minat?"
                  titleClassName="text-base sm:text-lg"
                  className="mb-3 sm:mb-4"
                  gap="sm"
                />
                <p className="text-foreground/80 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 font-sans">
                  Di zaman modern ini, kekuatan media sosial tidak dapat dipungkiri. Kami memanfaatkannya sebagai pemicu utama. Dengan menyajikan konten-konten inspiratif yang dapat "menarik perhatian" secara konsisten setiap hari, kami membangun pengaruh dan menjangkau calon-calon kreator di seluruh penjuru digital.
                </p>
                <p className="text-foreground/80 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 font-sans">
                  Setelah minat mereka didapatkan, tugas kami selanjutnya adalah mengarahkan mereka ke dalam komunitas—sebuah ruang untuk mulai berkarya, berdiskusi, dan berkolaborasi. Kami percaya, konsistensi dalam berkarya adalah kunci.
                </p>
              </div>
            </BentoCard>

            {/* Dedication */}
            <BentoCard 
              className="md:col-span-2 p-4 sm:p-6 md:p-8"
              glowColor="rgba(152, 245, 225, 0.3)"
            >
              <div>
                <IconTitleRow 
                  icon={Heart}
                  iconColor="bg-mint text-background"
                  title="Dedikasi Kami"
                  titleClassName="text-base sm:text-lg"
                  className="mb-3 sm:mb-4"
                  gap="sm"
                />
                <p className="text-foreground/80 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 font-sans">
                  Belum genap setahun, kami telah mengumpulkan lebih dari <strong>3000+ anggota</strong> dari seluruh Indonesia. Ini adalah bukti nyata semangat belajar dan berkarya di kalangan anak muda.
                </p>
                <p className="text-foreground/80 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 font-sans">
                  Kami percaya jika hasrat itu diarahkan pada hal positif, Indonesia akan semakin dipenuhi oleh jiwa-jiwa kreatif.
                </p>
              </div>
            </BentoCard>
          </div>
          
          {/* Additional Sections */}
          <div className="mb-8 sm:mb-12 fade-up">
            <BentoCard 
              className="p-4 sm:p-6 md:p-8"
              glowColor="rgba(155, 109, 255, 0.3)"
            >
              <div>
                <IconTitleRow 
                  icon={Target}
                  iconColor="bg-amethyst text-background"
                  title="Visi Ke Depan"
                  titleClassName="text-base sm:text-lg"
                  className="mb-3 sm:mb-4"
                  gap="sm"
                />
                <p className="text-foreground/80 text-sm sm:text-base leading-relaxed font-sans mb-4">
                  OUR CREATIVITY memiliki visi untuk terus mengembangkan ekosistem kreator muda Indonesia. Kami berencana memperluas jangkauan ke lebih banyak kota, menyelenggarakan festival tahunan, dan membangun platform digital yang lebih komprehensif untuk karya-karya anggota.
                </p>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  <VisionTag>Ekspansi Nasional</VisionTag>
                  <VisionTag>Festival Kreativitas Tahunan</VisionTag>
                  <VisionTag>Platform Digital Terintegrasi</VisionTag>
                  <VisionTag>Kolaborasi Internasional</VisionTag>
                </div>
              </div>
            </BentoCard>
          </div>
          
          {/* Key Values Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12 grid-container">
              <BentoCard 
                className="p-4 sm:p-6 flex flex-col items-center justify-center text-center"
                glowColor="rgba(254, 198, 161, 0.2)"
              >
                <div>
                  <IconTitleRow 
                    icon={Users}
                    iconColor="bg-coral text-background"
                    title="Komunitas"
                    titleClassName="text-sm sm:text-base"
                    className="mb-2 justify-center"
                    gap="sm"
                  />
                  <p className="text-xs sm:text-sm text-foreground/70 font-sans">Membangun hubungan yang kuat dan saling mendukung antar kreator</p>
                </div>
              </BentoCard>
            
              <BentoCard 
                className="p-4 sm:p-6 flex flex-col items-center justify-center text-center"
                glowColor="rgba(152, 245, 225, 0.2)"
              >
                <div>
                  <IconTitleRow 
                    icon={Award}
                    iconColor="bg-turquoise text-background"
                    title="Kualitas"
                    titleClassName="text-sm sm:text-base"
                    className="mb-2 justify-center"
                    gap="sm"
                  />
                  <p className="text-xs sm:text-sm text-foreground/70 font-sans">Mendorong standar tertinggi dalam setiap karya yang dihasilkan</p>
                </div>
              </BentoCard>
            
              <BentoCard 
                className="p-4 sm:p-6 flex flex-col items-center justify-center text-center"
                glowColor="rgba(229, 222, 255, 0.2)"
              >
                <div>
                  <IconTitleRow 
                    icon={Calendar}
                    iconColor="bg-amethyst text-background"
                    title="Konsistensi"
                    titleClassName="text-sm sm:text-base"
                    className="mb-2 justify-center"
                    gap="sm"
                  />
                  <p className="text-xs sm:text-sm text-foreground/70 font-sans">Berkomitmen untuk terus berkarya dan berkontribusi secara berkelanjutan</p>
                </div>
              </BentoCard>
          </div>
          
          {/* Final CTA Section */}
          <div className="mt-8 sm:mt-12 md:mt-16 mb-6 sm:mb-8 fade-up">
            <div className="text-center max-w-3xl mx-auto px-4">
              <h2 className="text-lg sm:text-xl md:text-2xl font-serif mb-3 sm:mb-4">Menjadi Bagian dari Perjalanan Kami</h2>
              <p className="text-foreground/80 text-xs sm:text-sm mb-4 sm:mb-6 md:mb-8 font-sans">
                Kami mengundang para kreator muda Indonesia untuk bergabung dan menjadi bagian dari komunitas kami. 
                Bersama, kita akan menciptakan, menginspirasi, dan mengembangkan ekosistem kreativitas yang berkelanjutan.
              </p>
              <motion.div
                className="inline-block"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.button 
                  className="px-4 sm:px-6 md:px-8 py-2 sm:py-3 bg-amethyst rounded-full text-background font-medium text-xs sm:text-sm font-sans"
                  whileHover={{ boxShadow: "0 0 15px rgba(155, 109, 255, 0.5)" }}
                >
                  Bergabung Sekarang
                </motion.button>
              </motion.div>
            </div>
          </div>
        </div>
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
    <span className="text-lg sm:text-xl font-medium text-mint font-sans">{value}</span>
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
