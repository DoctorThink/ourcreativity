import React, { useRef } from "react";
import PageLayout from "../components/layouts/PageLayout";
import { motion, useScroll, useTransform } from "framer-motion";
import BentoCard from "@/components/ui/BentoCard";
import { IconTitleRow } from "@/components/ui/IconTitleRow";
import { 
  Info, 
  Target, 
  TrendingUp, 
  CheckSquare, 
  Users, 
  Star, 
  Heart, 
  MessageCircle,
  ChevronRight,
  BookCopy,
  PenSquare,
  Sparkles,
  Link2
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
    <PageLayout title="Informasi Komunitas" subtitle="Ketentuan dan informasi penting untuk komunitas">
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
              glowColor="rgba(229, 222, 255, 0.3)"
            >
              <div>
                <IconTitleRow 
                  icon={Info}
                  iconColor="bg-amethyst text-background"
                  title="Apa Itu OurCreativity?"
                  className="mb-4"
                />
                <p className="text-foreground/80 text-base leading-relaxed mb-4">
                  OurCreativityIDN adalah komunitas kreatif yang didirikan pada tahun 2024 atas dasar kemauan tulus untuk memberikan manfaat bagi banyak orang dan menciptakan lebih banyak anak muda kreatif di Indonesia.
                </p>
                <p className="text-foreground/80 text-base leading-relaxed mb-6">
                  Kami hadir karena melihat banyaknya calon kreator berbakat di internet yang ingin belajar dan bertanya, namun tidak memiliki wadah yang tepat. OurCreativity diciptakan sebagai rumah bagi mereka—sebuah tempat untuk bertanya, berdiskusi, berkolaborasi, dan yang terpenting, menghasilkan karya.
                </p>
                
                <motion.div 
                  className="grid grid-cols-2 md:grid-cols-4 gap-4"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <StatBadge value="3000+" label="Anggota" />
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
              glowColor="rgba(152, 245, 225, 0.3)"
            >
              <div>
                <IconTitleRow 
                  icon={Target}
                  iconColor="bg-turquoise text-background"
                  title="Visi Kami"
                  className="mb-4"
                />
                <p className="text-foreground/80 text-base leading-relaxed">
                  Visi kami adalah untuk mengembangkan dan menyalakan jiwa kreatif anak muda Indonesia dengan menciptakan wadah yang suportif untuk berdiskusi, berkolaborasi, dan menghasilkan karya yang orisinal dan berdampak.
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
              glowColor="rgba(255, 209, 220, 0.3)"
            >
              <div>
                <IconTitleRow 
                  icon={Heart}
                  iconColor="bg-softPink text-background"
                  title="Nilai-nilai Kami"
                  titleClassName="text-xl"
                  className="mb-4"
                />
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
              glowColor="rgba(254, 198, 161, 0.3)"
            >
              <div>
                <IconTitleRow 
                  icon={CheckSquare}
                  iconColor="bg-coral text-background"
                  title="Misi Kami"
                  className="mb-4"
                />
                <ul className="space-y-3 text-foreground/80 text-base">
                  {[
                    { text: "Menyaring dan Menghubungkan: Mencari dan menghubungkan anak muda berbakat melalui media sosial untuk bergabung dalam ekosistem kreatif kami.", icon: Link2 },
                    { text: "Menyediakan Platform: Membangun platform diskusi dan kolaborasi yang inklusif agar anggota dapat berbagi ilmu serta mengembangkan kreativitasnya tanpa batas.", icon: Users },
                    { text: "Mempublikasikan Karya: Menjadi panggung bagi setiap karya anggota melalui media sosial agar mendapatkan apresiasi dan pengakuan yang lebih luas.", icon: BookCopy },
                    { text: "Menyelenggarakan Program: Mengadakan berbagai program gratis seperti diskusi, event eksklusif, dan proyek kolaboratif untuk mendukung pengembangan keterampilan anggota.", icon: Star },
                    { text: "Mendorong Inovasi: Mendorong anggota untuk memahami dan menguasai berbagai bidang kreatif agar dapat menciptakan karya yang lebih inovatif dan bernilai bagi masyarakat.", icon: Sparkles }
                  ].map((item, index) => (
                    <motion.li 
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-3"
                    >
                      <item.icon className="w-4 h-4 text-foreground/50 flex-shrink-0 mt-1" />
                      <span>{item.text}</span>
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
              glowColor="rgba(152, 245, 225, 0.3)"
            >
              <div>
                <IconTitleRow 
                  icon={Star}
                  iconColor="bg-mint text-white"
                  title="Program Unggulan"
                  titleClassName="text-xl"
                  className="mb-4"
                />
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
              glowColor="rgba(229, 222, 255, 0.3)"
            >
              <div>
                <IconTitleRow 
                  icon={MessageCircle}
                  iconColor="bg-amethyst text-background"
                  title="Apa Kata Mereka"
                  className="mb-6 justify-center"
                />
                
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
              glowColor="rgba(152, 245, 225, 0.3)"
            >
              <div>
                <IconTitleRow 
                  icon={Users}
                  iconColor="bg-turquoise text-background"
                  title="Bergabunglah Dengan Kami"
                  className="mb-4 justify-center"
                />
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
    className="flex items-start gap-2"
    initial={{ opacity: 0, x: -10 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
  >
    <ChevronRight className="w-4 h-4 text-foreground/50 flex-shrink-0 mt-1" />
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
