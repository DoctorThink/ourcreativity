
import React, { useRef } from "react";
import PageLayout from "../components/layouts/PageLayout";
import { motion, useScroll, useTransform } from "framer-motion";
import BentoCard from "@/components/ui/BentoCard";
import { 
  Info, 
  Target, 
  TrendingUp, 
  CheckSquare, 
  Users, 
  Star, 
  Heart, 
  MessageCircle 
} from "lucide-react";

const Informasi = () => {
  // Setup for scroll effects
  const mainRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: mainRef,
    offset: ["start start", "end start"]
  });
  
  // Parallax scrolling effects
  const titleParallax = useTransform(scrollYProgress, [0, 1], [0, -50]);
  
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
        style={{ y: titleParallax }}
        className="space-y-8"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {/* About Community */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <BentoCard 
              className="p-6 md:p-8 h-full"
              icon={Info}
              iconColor="bg-amethyst text-background"
              glowColor="rgba(229, 222, 255, 0.3)"
            >
              <div className="pt-12">
                <h2 className="text-xl md:text-2xl font-semibold mb-4 font-serif">Tentang Komunitas Kami</h2>
                <p className="text-foreground/80 text-base leading-relaxed mb-4">
                  OUR CREATIVITY adalah komunitas yang didedikasikan untuk mendukung dan mempromosikan kreativitas di kalangan generasi muda. Kami menyediakan platform bagi para kreator untuk berbagi karya, berkolaborasi, dan belajar bersama.
                </p>
                <p className="text-foreground/80 text-base leading-relaxed mb-6">
                  Dibentuk pada tahun 2022, komunitas ini telah berkembang menjadi rumah bagi ratusan kreator muda berbakat dari berbagai latar belakang dan disiplin kreatif.
                </p>
                
                <motion.div 
                  className="grid grid-cols-2 md:grid-cols-4 gap-4"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <StatBadge value="1000+" label="Anggota" />
                  <StatBadge value="4" label="Kategori" />
                  <StatBadge value="50+" label="Proyek" />
                  <StatBadge value="12+" label="Kota" />
                </motion.div>
              </div>
            </BentoCard>
          </motion.div>
          
          {/* Vision section */}
          <motion.div variants={itemVariants}>
            <BentoCard 
              className="p-6 md:p-8 h-full"
              icon={Target}
              iconColor="bg-turquoise text-background"
              glowColor="rgba(152, 245, 225, 0.3)"
            >
              <div className="pt-12">
                <h2 className="text-xl md:text-2xl font-semibold mb-4 font-serif">Visi Kami</h2>
                <p className="text-foreground/80 text-base leading-relaxed">
                  Menjadi wadah utama bagi kreator muda Indonesia untuk mengembangkan potensi dan mewujudkan ide-ide kreatif mereka dalam lingkungan yang kolaboratif dan mendukung.
                </p>
                
                <motion.div 
                  className="w-12 h-1 bg-gradient-to-r from-transparent via-turquoise/40 to-transparent mt-6"
                  initial={{ width: 0 }}
                  whileInView={{ width: "3rem" }}
                  transition={{ delay: 0.8, duration: 1 }}
                  viewport={{ once: true }}
                />
              </div>
            </BentoCard>
          </motion.div>
          
          {/* Values */}
          <motion.div variants={itemVariants}>
            <BentoCard 
              className="p-6 md:p-8 h-full"
              icon={Heart}
              iconColor="bg-softPink text-background"
              glowColor="rgba(255, 209, 220, 0.3)"
            >
              <div className="pt-12">
                <h2 className="text-xl font-semibold mb-4 font-serif">Nilai-nilai Kami</h2>
                <ul className="space-y-3">
                  <ValueItem>Kolaborasi dan Sinergi</ValueItem>
                  <ValueItem>Kreativitas Tanpa Batas</ValueItem>
                  <ValueItem>Inklusivitas dan Keberagaman</ValueItem>
                  <ValueItem>Etika dan Integritas</ValueItem>
                </ul>
              </div>
            </BentoCard>
          </motion.div>
          
          {/* Mission section */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <BentoCard 
              className="p-6 md:p-8 h-full"
              icon={CheckSquare}
              iconColor="bg-coral text-background"
              glowColor="rgba(254, 198, 161, 0.3)"
            >
              <div className="pt-12">
                <h2 className="text-xl md:text-2xl font-semibold mb-4 font-serif">Misi Kami</h2>
                <ul className="space-y-3 text-foreground/80 text-base">
                  {[
                    "Menyediakan platform yang inklusif dan mendukung bagi semua kreator.",
                    "Memfasilitasi kolaborasi dan pertukaran ide antar anggota.",
                    "Mengadakan acara dan workshop untuk meningkatkan keterampilan kreatif.",
                    "Mempromosikan karya anggota kepada khalayak yang lebih luas."
                  ].map((item, index) => (
                    <motion.li 
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-3"
                    >
                      <span className="inline-block w-2 h-2 rounded-full bg-coral flex-shrink-0 mt-3"></span>
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </BentoCard>
          </motion.div>
          
          {/* Programs */}
          <motion.div variants={itemVariants}>
            <BentoCard 
              className="p-6 md:p-8 h-full"
              icon={Star}
              iconColor="bg-mint text-background"
              glowColor="rgba(152, 245, 225, 0.3)"
            >
              <div className="pt-12">
                <h2 className="text-xl font-semibold mb-4 font-serif">Program Unggulan</h2>
                <ul className="space-y-4">
                  <ProgramItem title="Workshop Bulanan">
                    Pelatihan keterampilan kreatif oleh praktisi berpengalaman
                  </ProgramItem>
                  <ProgramItem title="Showcase Triwulan">
                    Pameran karya terbaik anggota setiap 3 bulan
                  </ProgramItem>
                  <ProgramItem title="Mentoring">
                    Program bimbingan personal untuk mengembangkan potensi
                  </ProgramItem>
                </ul>
              </div>
            </BentoCard>
          </motion.div>
          
          {/* Testimonials */}
          <motion.div variants={itemVariants} className="lg:col-span-3">
            <BentoCard 
              className="p-6 md:p-8"
              icon={MessageCircle}
              iconColor="bg-amethyst text-background"
              glowColor="rgba(229, 222, 255, 0.3)"
            >
              <div className="pt-12">
                <h2 className="text-xl md:text-2xl font-semibold mb-6 font-serif text-center">Apa Kata Mereka</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Testimonial 
                    quote="OUR CREATIVITY membuka banyak peluang untuk saya berkolaborasi dengan kreator berbakat lainnya."
                    author="Rina S."
                    role="Graphic Designer"
                  />
                  <Testimonial 
                    quote="Workshop yang diadakan sangat bermanfaat dan membantu meningkatkan keterampilan saya."
                    author="Budi P."
                    role="Video Editor"
                  />
                  <Testimonial 
                    quote="Bergabung dengan komunitas ini adalah salah satu keputusan terbaik dalam karir kreatif saya."
                    author="Anita D."
                    role="Content Creator"
                  />
                </div>
              </div>
            </BentoCard>
          </motion.div>
          
          {/* Call to Action */}
          <motion.div variants={itemVariants} className="lg:col-span-3">
            <BentoCard 
              className="p-6 md:p-8 text-center"
              icon={Users}
              iconColor="bg-turquoise text-background"
              glowColor="rgba(152, 245, 225, 0.3)"
            >
              <div className="pt-12">
                <h2 className="text-xl md:text-2xl font-semibold mb-4 font-serif">Bergabunglah Dengan Kami</h2>
                <p className="text-foreground/80 text-base max-w-2xl mx-auto mb-6">
                  Menjadi bagian dari komunitas kreatif yang terus berkembang dan menginspirasi.
                </p>
                <motion.button
                  className="px-8 py-3 rounded-full bg-gradient-to-r from-turquoise to-amethyst text-background font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => window.location.href = '/'}
                >
                  Kunjungi Beranda
                </motion.button>
              </div>
            </BentoCard>
          </motion.div>
        </motion.div>
      </motion.div>
    </PageLayout>
  );
};

// Helper components
const StatBadge = ({ value, label }: { value: string, label: string }) => (
  <div className="flex flex-col items-center bg-white/5 rounded-xl p-3">
    <span className="text-xl font-medium text-amethyst">{value}</span>
    <span className="text-xs text-foreground/70">{label}</span>
  </div>
);

const ValueItem = ({ children }: { children: React.ReactNode }) => (
  <motion.li 
    className="flex items-center gap-3"
    initial={{ opacity: 0, x: -10 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
  >
    <span className="w-2 h-2 rounded-full bg-softPink"></span>
    <span className="text-foreground/80 text-sm">{children}</span>
  </motion.li>
);

const ProgramItem = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <div className="space-y-1.5">
    <h3 className="font-medium text-mint text-sm">{title}</h3>
    <p className="text-foreground/70 text-xs">{children}</p>
  </div>
);

const Testimonial = ({ quote, author, role }: { quote: string, author: string, role: string }) => (
  <motion.div 
    className="relative bg-white/5 rounded-2xl p-4"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7 }}
    viewport={{ once: true }}
  >
    <div className="text-2xl text-amethyst/30 absolute top-2 left-2">"</div>
    <div className="relative px-2">
      <p className="text-foreground/90 italic mb-3 text-sm">{quote}</p>
      <div className="mt-3 pt-3 border-t border-white/10">
        <p className="font-medium text-sm">{author}</p>
        <p className="text-xs text-foreground/60">{role}</p>
      </div>
    </div>
    <div className="text-2xl text-amethyst/30 absolute bottom-2 right-2">"</div>
  </motion.div>
);

export default Informasi;
