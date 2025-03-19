
import { motion } from "framer-motion";
import PageLayout from "@/components/layouts/PageLayout";
import { Bookmark, BookOpen, Target, ExternalLink, Sparkles, Star } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const BrandStory = () => {
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

  // Timeline events with enhanced design
  const timelineEvents = [
    {
      date: "Januari 2024",
      title: "Awal Mula",
      description: "Berawal dari visi untuk menciptakan wadah bagi anak muda kreatif Indonesia untuk berkarya dan berkembang bersama.",
      highlight: true,
      color: "from-lavender/20 to-transparent"
    },
    {
      date: "Februari 2024",
      title: "Pembentukan Komunitas",
      description: "Dimulainya pengembangan struktur komunitas dan pembuatan platform untuk berkomunikasi.",
      highlight: false,
      color: "from-mint/20 to-transparent"
    },
    {
      date: "Maret 2024",
      title: "Peluncuran Media Sosial",
      description: "Peluncuran akun media sosial sebagai sarana untuk menjangkau lebih banyak anak muda kreatif.",
      highlight: true,
      color: "from-peach/20 to-transparent"
    },
    {
      date: "April 2024",
      title: "Pengembangan Grup",
      description: "Pembentukan 4 jenis grup untuk memfasilitasi berbagai minat kreatif: Desain Grafis, Video Editing, Meme Creator, dan Karya Tulis.",
      highlight: false,
      color: "from-softPink/20 to-transparent"
    },
    {
      date: "Mei 2024",
      title: "Fase Pertumbuhan",
      description: "Menjangkau 3000+ anggota komunitas dan meluncurkan inisiatif kolaborasi antar grup.",
      highlight: true,
      color: "from-amethyst/20 to-transparent"
    }
  ];

  // Core values with enhanced design
  const coreValues = [
    {
      title: "Kreativitas Tanpa Batas",
      description: "Mendorong eksplorasi ide dan inovasi tanpa dibatasi oleh konvensi.",
      icon: <Sparkles className="w-5 h-5" />,
      color: "border-lavender"
    },
    {
      title: "Kolaborasi & Komunitas",
      description: "Membangun hubungan yang kuat melalui kerja sama dan dukungan sesama.",
      icon: <BookOpen className="w-5 h-5" />,
      color: "border-mint"
    },
    {
      title: "Konsistensi",
      description: "Berkomitmen untuk terus berkarya dan berkembang secara berkelanjutan.",
      icon: <Target className="w-5 h-5" />,
      color: "border-peach"
    },
    {
      title: "Keunggulan",
      description: "Selalu berusaha memberikan yang terbaik dalam setiap karya dan kontribusi.",
      icon: <Star className="w-5 h-5" />,
      color: "border-softPink"
    }
  ];

  return (
    <PageLayout
      title="CERITA KAMI"
      subtitle="Perjalanan OurCreativity dalam menciptakan ruang bagi kreativitas anak muda Indonesia"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-12"
      >
        {/* Origin Story with enhanced design */}
        <motion.section 
          variants={itemVariants}
          className="backdrop-blur-xl bg-foreground/5 border border-foreground/10 rounded-3xl p-8 relative overflow-hidden"
        >
          {/* Geometric decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 rounded-bl-[100px] border-l border-b border-foreground/10" style={{ opacity: 0.1 }} />
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-tr-[100px] border-t border-r border-foreground/5" style={{ opacity: 0.1 }} />
          <div className="absolute inset-0 geometric-dot-pattern opacity-20" />
          
          <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl backdrop-blur-md bg-foreground/5 border border-foreground/10 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-foreground/80" />
              </div>
              <h2 className="text-2xl font-serif font-semibold text-foreground">
                Asal Mula
              </h2>
            </div>
            
            <Separator className="bg-foreground/10" />
            
            <p className="text-foreground/70 leading-relaxed">
              OurCreativityIDN lahir dari keinginan untuk memberikan dampak positif bagi perkembangan anak muda kreatif di Indonesia. Berawal dari pengamatan terhadap banyaknya komentar di internet tentang keinginan untuk mempelajari sesuatu namun tidak memiliki tempat untuk bertanya, kami memutuskan untuk membuat komunitas ini.
            </p>
            
            <p className="text-foreground/70 leading-relaxed">
              Komunitas ini bukan hanya menjadi tempat untuk belajar dan bertanya, tetapi juga menjadi wadah untuk menampung karya-karya kreatif dari para anggota. Kami percaya bahwa setiap orang memiliki potensi kreatif yang perlu diasah dan diberi ruang untuk berkembang.
            </p>
          </div>
        </motion.section>
        
        {/* Timeline section with enhanced design */}
        <motion.section 
          variants={itemVariants}
          className="space-y-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl backdrop-blur-md bg-foreground/5 border border-foreground/10 flex items-center justify-center">
              <ExternalLink className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-serif font-semibold text-foreground">
              Perjalanan Kami
            </h2>
          </div>
          
          <div className="relative">
            {/* Vertical timeline line */}
            <div className="absolute h-full w-[1px] bg-gradient-to-b from-foreground/5 via-foreground/20 to-foreground/5 left-6 top-0 z-0 ml-3"></div>
            
            {/* Timeline events with enhanced design */}
            <div className="space-y-8">
              {timelineEvents.map((event, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="flex items-start gap-4 ml-1"
                >
                  <div className="relative">
                    <div className={`w-8 h-8 rounded-full backdrop-blur-md bg-foreground/5 border ${event.highlight ? 'border-foreground/30' : 'border-foreground/10'} flex items-center justify-center z-10`}>
                      {event.highlight ? (
                        <div className="w-3 h-3 rounded-full bg-foreground/50 animate-pulse-soft" />
                      ) : (
                        <div className="w-2 h-2 rounded-full bg-foreground/30" />
                      )}
                    </div>
                  </div>
                  
                  <div className={`backdrop-blur-xl bg-foreground/5 border border-foreground/10 rounded-xl p-5 flex-1 hover:bg-foreground/5 transition-colors duration-300 relative overflow-hidden group`}>
                    {/* Dynamic background gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${event.color} opacity-30`}></div>
                    <div className="absolute right-0 bottom-0 w-24 h-24 rounded-tl-[50px] border-l border-t border-foreground/10" style={{ opacity: 0.1 }} />
                    
                    {/* Interactive hover effect */}
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-foreground/0 via-foreground/5 to-foreground/0 opacity-0 group-hover:opacity-100 transform -translate-x-full group-hover:translate-x-full transition-all duration-1000 ease-in-out" 
                    />
                    
                    <div className="relative z-10">
                      <span className="inline-block px-3 py-1 rounded-full bg-foreground/10 text-xs text-foreground/70 mb-2">
                        {event.date}
                      </span>
                      <h3 className="text-lg font-serif font-semibold text-foreground mb-2">
                        {event.title}
                      </h3>
                      <p className="text-foreground/70 text-sm">
                        {event.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Core values section with enhanced design */}
        <motion.section 
          variants={itemVariants}
          className="space-y-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl backdrop-blur-md bg-foreground/5 border border-foreground/10 flex items-center justify-center">
              <Bookmark className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-serif font-semibold text-foreground">
              Nilai-Nilai Kami
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {coreValues.map((value, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                className="backdrop-blur-xl bg-foreground/5 border border-foreground/10 p-6 rounded-xl relative overflow-hidden"
              >
                {/* Geometric decoration */}
                <div className="absolute top-0 right-0 w-20 h-20 rounded-bl-3xl border-l border-b border-foreground/10" style={{ opacity: 0.1 }} />
                <div className="absolute inset-0 geometric-line-pattern opacity-10" />
                
                <div className="flex items-start gap-4 relative z-10">
                  <div className={`w-12 h-12 rounded-xl backdrop-blur-md bg-foreground/5 ${value.color} flex items-center justify-center flex-shrink-0 animate-pulse-soft`}>
                    {value.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-serif font-semibold text-foreground mb-2">
                      {value.title}
                    </h3>
                    <p className="text-foreground/70">{value.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Quote with enhanced design */}
        <motion.div 
          variants={itemVariants}
          className="py-10 px-8 backdrop-blur-xl bg-foreground/5 border border-foreground/10 rounded-3xl text-center relative overflow-hidden"
        >
          {/* Geometric background elements */}
          <div className="absolute inset-0 geometric-hexagon-pattern opacity-5" />
          <div className="absolute w-60 h-60 rounded-full bg-foreground/5 blur-[60px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          
          <blockquote className="relative z-10">
            <div className="absolute left-2 top-0 text-6xl opacity-10 font-serif">"</div>
            <div className="absolute right-2 bottom-0 text-6xl opacity-10 font-serif">"</div>
            
            <p className="text-2xl font-serif italic text-foreground">
              "Kreativitas adalah menemukan cara untuk menyampaikan apa yang tidak bisa dikatakan."
            </p>
            <footer className="text-foreground/50 mt-4">— Team OurCreativity</footer>
          </blockquote>
        </motion.div>
        
        {/* Future Vision with enhanced design */}
        <motion.section 
          variants={itemVariants}
          className="backdrop-blur-xl bg-foreground/5 border border-foreground/10 rounded-3xl p-8 relative overflow-hidden"
        >
          {/* Geometric decorative elements */}
          <div className="absolute bottom-0 right-0 w-48 h-48 rounded-tl-[100px] border-l border-t border-foreground/5" style={{ opacity: 0.1 }} />
          <div className="absolute top-0 left-0 w-32 h-32 rounded-br-[100px] border-r border-b border-foreground/10" style={{ opacity: 0.1 }} />
          <div className="absolute inset-0 geometric-dot-pattern opacity-20" />
          
          <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl backdrop-blur-md bg-foreground/5 border border-foreground/10 flex items-center justify-center">
                <Target className="w-5 h-5 text-foreground/80" />
              </div>
              <h2 className="text-2xl font-serif font-semibold text-foreground">
                Visi Ke Depan
              </h2>
            </div>
            
            <Separator className="bg-foreground/10" />
            
            <p className="text-foreground/70 leading-relaxed">
              Ke depannya, OurCreativityIDN berkomitmen untuk terus berkembang dan memberikan manfaat lebih banyak bagi komunitas kreatif di Indonesia. Kami berencana untuk memperluas jangkauan dengan membuka lebih banyak grup fokus, mengadakan workshop dan pelatihan, serta memfasilitasi kolaborasi antar anggota yang lebih intensif.
            </p>
            
            <p className="text-foreground/70 leading-relaxed">
              Kami percaya bahwa dengan membangun platform dan komunitas yang solid, kami dapat mendorong lebih banyak anak muda Indonesia untuk mengembangkan kreativitas mereka dan berkontribusi positif bagi perkembangan industri kreatif di tanah air.
            </p>
            
            <div className="mt-4 backdrop-blur-xl bg-foreground/5 border border-foreground/10 rounded-xl p-4 flex flex-col items-center text-center morphing-blob">
              <p className="text-foreground/80 font-medium relative z-10">
                <span className="glow-text font-serif">Berkarya tanpa batas dengan OurCreativity</span>
              </p>
            </div>
          </div>
        </motion.section>
      </motion.div>
    </PageLayout>
  );
};

export default BrandStory;
