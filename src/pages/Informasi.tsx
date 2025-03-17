
import { motion } from "framer-motion";
import PageLayout from "@/components/layouts/PageLayout";
import { Separator } from "@/components/ui/separator";
import { Info, Sparkles, Users, Target, Palette, Video, FileText, MessageSquare } from "lucide-react";

const Informasi = () => {
  // Enhanced animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.15,
        delayChildren: 0.2
      } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  // Information sections with enhanced content
  const sections = [
    {
      id: "about",
      title: "OURCREATIVITY",
      icon: <Info className="w-5 h-5" />,
      content: (
        <ul className="space-y-4 list-disc list-inside text-foreground/80 leading-relaxed">
          <li>Komunitas kreatif yang didirikan pada tahun 2024 dengan tujuan memberikan manfaat bagi banyak orang.</li>
          <li>Dibuat untuk menciptakan lebih banyak anak muda kreatif di Indonesia.</li>
          <li>Menjadi tempat bertanya dan belajar bagi mereka yang ingin mengembangkan kreativitas.</li>
          <li>Memungkinkan anggota untuk bertanya sekaligus menghasilkan karya.</li>
        </ul>
      ),
      decoration: (
        <>
          <div className="absolute top-0 right-0 w-32 h-32 rounded-full border border-foreground/10" style={{ opacity: 0.1 }} />
          <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full border border-foreground/5" style={{ opacity: 0.1 }} />
        </>
      )
    },
    {
      id: "vision",
      title: "Visi Komunitas",
      icon: <Target className="w-5 h-5" />,
      content: (
        <ul className="space-y-4 list-disc list-inside text-foreground/80 leading-relaxed">
          <li>Mengembangkan jiwa kreatif anak muda Indonesia.</li>
          <li>Menciptakan wadah untuk berdiskusi, berkolaborasi, dan menghasilkan karya.</li>
          <li>Membantu generasi muda menemukan dan mengasah bakat di bidang Karya Tulis, Desain Grafis, dan Video Editing.</li>
          <li>Memberikan kesempatan untuk mempublikasikan hasil karya agar dikenal lebih luas.</li>
        </ul>
      ),
      decoration: (
        <>
          <div className="absolute top-10 left-10 w-16 h-16 rotate-45 border border-foreground/10" style={{ opacity: 0.1 }} />
          <div className="absolute -bottom-5 right-0 w-32 h-32 rounded-tl-3xl border-l border-t border-foreground/10" style={{ opacity: 0.1 }} />
        </>
      )
    },
    {
      id: "mission",
      title: "Misi Kami",
      icon: <Target className="w-5 h-5" />,
      content: (
        <ul className="space-y-4 list-disc list-inside text-foreground/80 leading-relaxed">
          <li>Menyaring dan menghubungkan anak muda berbakat melalui media sosial untuk bergabung dalam komunitas.</li>
          <li>Menyediakan platform diskusi dan kolaborasi untuk berbagi ilmu serta mengembangkan kreativitas.</li>
          <li>Mempublikasikan karya anggota melalui media sosial agar mendapatkan apresiasi lebih luas.</li>
          <li>Menyelenggarakan program gratis, seperti diskusi, event eksklusif, dan proyek kolaboratif.</li>
          <li>Mendorong anggota untuk memahami dan menguasai berbagai bidang kreatif.</li>
        </ul>
      ),
      decoration: (
        <>
          <div className="absolute bottom-10 right-10 w-20 h-20 rounded-md border border-foreground/10" style={{ opacity: 0.1 }} />
          <div className="absolute top-0 left-0 w-40 h-40 rounded-br-3xl border-r border-b border-foreground/5" style={{ opacity: 0.1 }} />
        </>
      )
    }
  ];

  // Community group sections
  const communityGroups = [
    {
      title: "Desain Grafis",
      icon: <Palette className="w-5 h-5" />,
      description: "Fokus pada pengembangan keterampilan desain grafis dan visual untuk media digital maupun cetak.",
      color: "from-lavender/20 to-transparent"
    },
    {
      title: "Video Editing",
      icon: <Video className="w-5 h-5" />,
      description: "Belajar dan berkarya dalam pengeditan dan produksi konten video kreatif.",
      color: "from-mint/20 to-transparent"
    },
    {
      title: "Meme Creator",
      icon: <MessageSquare className="w-5 h-5" />,
      description: "Mengembangkan konten kreatif dan meme untuk media sosial dan platform digital.",
      color: "from-peach/20 to-transparent"
    },
    {
      title: "Karya Tulis",
      icon: <FileText className="w-5 h-5" />,
      description: "Menulis dan mengembangkan konten tertulis yang kreatif dan bermanfaat.",
      color: "from-softPink/20 to-transparent"
    }
  ];

  return (
    <PageLayout 
      title="OURCREATIVITY"
      subtitle="Komunitas yang bertujuan mengembangkan jiwa kreatif anak muda Indonesia melalui wadah berkarya, berdiskusi, dan berkolaborasi."
    >
      {/* Main Content with enhanced design */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-12"
      >
        {/* Grid of information blocks */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 gap-8">
          {sections.map((section) => (
            <div 
              key={section.id}
              className="backdrop-blur-xl bg-foreground/5 border border-foreground/10 rounded-3xl p-8 relative overflow-hidden"
            >
              {/* Decorative geometric elements */}
              {section.decoration}
              
              <div className="relative z-10 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl backdrop-blur-md bg-foreground/5 border border-foreground/10 flex items-center justify-center">
                    {section.icon}
                  </div>
                  <h2 className="text-2xl font-serif font-semibold text-foreground">
                    {section.title}
                  </h2>
                </div>
                
                <Separator className="bg-foreground/10" />
                
                <div className="pt-2">
                  {section.content}
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Community Groups Section */}
        <motion.section 
          variants={itemVariants}
          className="space-y-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl backdrop-blur-md bg-foreground/5 border border-foreground/10 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-serif font-semibold text-foreground">
              4 Jenis Grup
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {communityGroups.map((group, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                className="backdrop-blur-xl bg-foreground/5 border border-foreground/10 p-6 rounded-xl relative overflow-hidden"
              >
                {/* Dynamic background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${group.color} opacity-30`}></div>
                <div className="absolute top-0 right-0 w-20 h-20 rounded-bl-3xl border-l border-b border-foreground/10" style={{ opacity: 0.1 }} />
                
                <div className="flex items-start gap-4 relative z-10">
                  <div className="w-12 h-12 rounded-xl backdrop-blur-md bg-foreground/5 border border-foreground/10 flex items-center justify-center flex-shrink-0">
                    {group.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-serif font-semibold text-foreground mb-2">
                      Edisi {group.title}
                    </h3>
                    <p className="text-foreground/80">{group.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Quote Section with enhanced geometric design */}
        <motion.div 
          variants={itemVariants}
          className="py-10 px-8 relative backdrop-blur-xl bg-foreground/5 border border-foreground/10 rounded-3xl overflow-hidden"
        >
          {/* Geometric background elements */}
          <div className="absolute inset-0 geometric-hexagon-pattern" />
          <div className="absolute w-60 h-60 rounded-full bg-foreground/5 blur-[60px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          
          <div className="absolute left-8 top-8 text-6xl opacity-10 font-serif">"</div>
          <div className="absolute right-8 bottom-8 text-6xl opacity-10 font-serif">"</div>
          
          <blockquote className="text-center space-y-6 relative z-10">
            <p className="text-2xl font-serif italic text-foreground">
              "Tanpa keberanian seseorang tidak akan pernah berkarya dan tidak akan berkembang."
            </p>
            <footer className="text-foreground/60">— OurCreativity</footer>
            
            <motion.div 
              className="w-16 h-[1px] bg-gradient-to-r from-transparent via-foreground/30 to-transparent mx-auto mt-4"
              initial={{ width: 0 }}
              animate={{ width: "4rem" }}
              transition={{ delay: 0.6, duration: 0.8 }}
            />
          </blockquote>
        </motion.div>

        {/* Closing Section with interactive elements and geometric accents */}
        <motion.div 
          variants={itemVariants}
          className="text-center space-y-6 pt-8 relative"
        >
          <div className="backdrop-blur-xl bg-foreground/5 border border-foreground/10 rounded-3xl p-8 relative overflow-hidden">
            <div className="flex items-center justify-center mb-6">
              <div className="w-10 h-10 rounded-full backdrop-blur-md bg-foreground/5 border border-foreground/10 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-foreground/80" />
              </div>
            </div>
            
            <p className="text-lg text-foreground/80 relative z-10 mb-6">
              Bergabunglah dengan OurCreativity dan jadilah bagian dari pergerakan kreatif anak muda Indonesia. 
            </p>
            
            <motion.p 
              className="text-xl font-serif font-semibold"
              animate={{ 
                textShadow: ["0 0 8px rgba(155,109,255,0.5)", "0 0 16px rgba(155,109,255,0.5)", "0 0 8px rgba(155,109,255,0.5)"]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-foreground">
                "Berkarya tanpa batas dengan OurCreativity"
              </span>
            </motion.p>
            
            <p className="text-foreground/60 italic mt-4">- Admin</p>
          </div>
        </motion.div>
      </motion.div>
    </PageLayout>
  );
};

export default Informasi;
