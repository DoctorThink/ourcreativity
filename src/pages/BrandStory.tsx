
import { motion } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Users, Quote, Clock, ArrowRight } from "lucide-react";

const BrandStory = () => {
  const navigate = useNavigate();

  // Enhanced animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.15,
        delayChildren: 0.3
      } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  // Content data with refined metadata
  const milestones = [
    {
      year: "2018",
      title: "Awal Mula",
      description: "Komunitas Our Creativity dimulai dari sebuah grup kecil mahasiswa seni yang ingin berbagi karya.",
      highlight: "5 anggota awal"
    },
    {
      year: "2019",
      title: "Pertumbuhan",
      description: "Ekspansi ke berbagai bidang kreatif termasuk desain grafis, video editing, dan pengembangan game.",
      highlight: "50+ anggota"
    },
    {
      year: "2020",
      title: "Era Digital",
      description: "Adaptasi penuh ke platform digital dan pengembangan komunitas online selama pandemi.",
      highlight: "Workshop virtual pertama"
    },
    {
      year: "2021",
      title: "Kolaborasi",
      description: "Memulai kerjasama dengan berbagai komunitas kreatif dan industri lokal.",
      highlight: "10 proyek kolaborasi"
    },
    {
      year: "2022",
      title: "Ekspansi",
      description: "Membuka sub-komunitas baru dalam bidang AI dan teknologi kreatif terkini.",
      highlight: "200+ anggota"
    },
    {
      year: "2023",
      title: "Inovasi Berkelanjutan",
      description: "Fokus pada pengembangan keterampilan dan ekosistem kreatif yang berkelanjutan.",
      highlight: "Platform OC Bot diluncurkan"
    }
  ];

  const testimonials = [
    {
      name: "Budi Santoso",
      role: "Desainer Grafis",
      quote: "Our Creativity memberi saya ruang untuk bereksperimen dengan ide-ide yang tidak konvensional dan mendapat umpan balik yang konstruktif.",
      image: "/lovable-uploads/f8326a6b-e1d4-4ae9-9786-448a5e0d8688.png"
    },
    {
      name: "Anisa Wijaya",
      role: "Video Editor",
      quote: "Bergabung dengan komunitas ini membuka banyak peluang kolaborasi yang tidak pernah saya bayangkan sebelumnya.",
      image: "/lovable-uploads/f8326a6b-e1d4-4ae9-9786-448a5e0d8688.png"
    },
    {
      name: "Rama Putra",
      role: "Pengembang Game",
      quote: "Saya belajar lebih banyak dalam setahun bersama OC daripada selama masa kuliah saya. Komunitas ini mendorong pembelajaran yang digerakkan oleh passion.",
      image: "/lovable-uploads/f8326a6b-e1d4-4ae9-9786-448a5e0d8688.png"
    }
  ];

  const communityHighlights = [
    {
      title: "Desain Grafis",
      count: 256,
      color: "from-lavender/20 to-transparent"
    },
    {
      title: "Video Editing",
      count: 189,
      color: "from-mint/20 to-transparent"
    },
    {
      title: "Pengembangan Game",
      count: 324,
      color: "from-peach/20 to-transparent"
    },
    {
      title: "AI & Teknologi",
      count: 145,
      color: "from-softPink/20 to-transparent"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen overflow-hidden relative"
    >
      {/* Dynamic Background with geometric elements */}
      <div className="fixed inset-0 bg-black -z-10">
        {/* Geometric decorative elements */}
        <div className="absolute w-[70vw] h-[70vh] rounded-full blur-[120px] bg-zinc-900/50 -top-[20%] -right-[20%]" />
        <div className="absolute w-[50vw] h-[50vh] rounded-full blur-[100px] bg-zinc-800/30 -bottom-[10%] -left-[10%]" />
        
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(30,30,30,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(30,30,30,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        
        {/* Subtle lines */}
        <div className="absolute left-[5%] top-[10%] w-[1px] h-[30vh] bg-gradient-to-b from-transparent via-white/10 to-transparent" />
        <div className="absolute right-[10%] top-[20%] w-[1px] h-[40vh] bg-gradient-to-b from-transparent via-white/5 to-transparent" />
        <div className="absolute left-[20%] bottom-[10%] w-[40vw] h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-black/40 p-4 border-b border-white/5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.button 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => navigate("/")}
            className="flex items-center space-x-2 text-white/60 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Kembali</span>
          </motion.button>
          
          <div className="flex items-center gap-2 ml-auto">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.4 }}
              className="w-8 h-8 rounded-full bg-white/5 p-1 flex items-center justify-center backdrop-blur-md border border-white/10"
            >
              <img
                src="/lovable-uploads/c861a7c0-5ec9-4bac-83ea-319c40fcb001.png"
                alt="Logo"
                className="w-6 h-6 object-contain"
                loading="eager"
              />
            </motion.div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="w-8 h-8 rounded-full bg-white/5 p-1 flex items-center justify-center backdrop-blur-md border border-white/10"
            >
              <img
                src="/lovable-uploads/0bec5fdf-43d7-47af-b1cd-ba7fd2b949ec.png"
                alt="Text Logo"
                className="w-6 h-6 object-contain"
                loading="eager"
              />
            </motion.div>
          </div>
        </div>
      </header>

      <ScrollArea className="h-[calc(100vh-64px)]">
        <div className="max-w-6xl mx-auto px-4 py-16">
          {/* Hero Section with enhanced design */}
          <motion.div 
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="text-center mb-20"
          >
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="text-5xl md:text-7xl font-serif font-bold mb-6"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/70">
                Perjalanan Kami
              </span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto font-serif"
            >
              Dari ide sederhana hingga komunitas kreatif yang berkembang. Inilah cerita bagaimana Our Creativity tumbuh dan berevolusi.
            </motion.p>
            
            {/* Decorative line */}
            <motion.div 
              className="w-16 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent mx-auto mt-8"
              initial={{ width: 0 }}
              animate={{ width: "4rem" }}
              transition={{ delay: 0.6, duration: 0.8 }}
            />
          </motion.div>

          {/* Timeline Section with enhanced visual design */}
          <motion.section
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mb-24"
          >
            <div className="flex items-center mb-12">
              <div className="w-10 h-10 rounded-full backdrop-blur-xl bg-white/5 border border-white/10 flex items-center justify-center mr-4">
                <Clock className="w-5 h-5" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/70">
                  Lini Masa
                </span>
              </h2>
            </div>

            <div className="relative pl-8 border-l border-white/20">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="mb-12 relative"
                >
                  <div className="absolute -left-[41px] w-6 h-6 rounded-full bg-white/20 border-4 border-black"></div>
                  <div className="backdrop-blur-xl bg-black/30 border border-white/10 p-6 rounded-xl relative overflow-hidden">
                    {/* Dynamic geometric background */}
                    <div className="absolute -bottom-6 -right-6 w-20 h-20 rounded-full border border-white/10" style={{ opacity: 0.1 }} />
                    <div className="absolute top-0 left-0 w-40 h-40 rounded-br-3xl border-r border-b border-white/5" style={{ opacity: 0.1 }} />
                    
                    <div className="flex justify-between items-start mb-4 relative z-10">
                      <h3 className="text-2xl font-serif font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/70">
                        {milestone.title}
                      </h3>
                      <Badge variant="secondary" className="backdrop-blur-xl bg-white/5 border border-white/10">
                        {milestone.year}
                      </Badge>
                    </div>
                    <p className="text-white/70 mb-4">{milestone.description}</p>
                    <Badge variant="outline" className="backdrop-blur-xl bg-white/5 border border-white/10">
                      {milestone.highlight}
                    </Badge>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Testimonials Section with enhanced card design */}
          <motion.section
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mb-24"
          >
            <div className="flex items-center mb-12">
              <div className="w-10 h-10 rounded-full backdrop-blur-xl bg-white/5 border border-white/10 flex items-center justify-center mr-4">
                <Quote className="w-5 h-5" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/70">
                  Suara Komunitas
                </span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                  className="backdrop-blur-xl bg-black/30 border border-white/10 p-6 rounded-xl relative overflow-hidden h-full"
                >
                  {/* Dynamic geometric elements */}
                  <div className="absolute top-0 right-0 w-20 h-20 rounded-bl-3xl border-l border-b border-white/10" style={{ opacity: 0.1 }} />
                  <div className="absolute -bottom-8 -left-8 w-16 h-16 rounded-full border border-white/10" style={{ opacity: 0.2 }} />
                  
                  <div className="absolute top-6 right-6 text-6xl opacity-20 font-serif">"</div>
                  <div className="flex items-center mb-4 relative z-10">
                    <Avatar className="h-12 w-12 mr-4 border border-white/10">
                      <img src={testimonial.image} alt={testimonial.name} />
                    </Avatar>
                    <div>
                      <h4 className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/70">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-white/50">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-white/70 italic relative z-10">"{testimonial.quote}"</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Community Stats Section with enhanced cards */}
          <motion.section
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mb-24"
          >
            <div className="flex items-center mb-12">
              <div className="w-10 h-10 rounded-full backdrop-blur-xl bg-white/5 border border-white/10 flex items-center justify-center mr-4">
                <Users className="w-5 h-5" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/70">
                  Komunitas Kami
                </span>
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {communityHighlights.map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  className="backdrop-blur-xl bg-black/30 border border-white/10 p-6 rounded-xl text-center relative overflow-hidden"
                >
                  {/* Dynamic background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-50`}></div>
                  <div className="absolute -bottom-4 -right-4 w-12 h-12 rounded-full border border-white/10" style={{ opacity: 0.2 }} />
                  
                  <h3 className="text-xl font-bold mb-2 relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/70">
                    {item.title}
                  </h3>
                  <p className="text-3xl font-bold mb-1 relative z-10">{item.count}</p>
                  <p className="text-sm text-white/50 relative z-10">anggota aktif</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* CTA Section with enhanced design */}
          <motion.section
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="text-center"
          >
            <Card className="backdrop-blur-xl bg-black/20 border border-white/10 p-8 rounded-xl relative overflow-hidden">
              {/* Dynamic geometric background */}
              <div className="absolute inset-0 bg-gradient-to-r from-lavender/10 via-mint/10 to-peach/10 opacity-50"></div>
              <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-white/5 to-transparent"></div>
              <div className="absolute bottom-0 right-0 w-60 h-60 rounded-tl-[100px] border-l border-t border-white/5" style={{ opacity: 0.05 }} />
              <div className="absolute bottom-0 left-0 w-60 h-60 rounded-tr-[100px] border-r border-t border-white/5" style={{ opacity: 0.05 }} />
              
              <h2 className="text-3xl font-serif font-bold mb-6 relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/70">
                Bergabunglah dengan Perjalanan Kreatif Kami
              </h2>
              <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8 relative z-10">
                Menjadi bagian dari komunitas yang terus bertumbuh dan berkarya bersama
              </p>
              <Button
                onClick={() => window.open("https://t.me/ourcreativity", "_blank")}
                className="backdrop-blur-xl bg-white/10 hover:bg-white/20 text-white px-8 py-6 rounded-full text-lg font-semibold relative z-10 group border border-white/10"
              >
                <span>Hubungi Kami</span>
                <ArrowRight className="ml-2 w-5 h-5 inline transition-transform group-hover:translate-x-1" />
              </Button>
            </Card>
          </motion.section>

          {/* Credits Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-24 mb-8 text-center"
          >
            <div className="backdrop-blur-xl bg-black/20 border border-white/10 rounded-full px-6 py-3 inline-block">
              <p className="text-xs text-white/50">
                &copy; 2024 OUR CREATIVITY • Designed by Ardellio S. A.
              </p>
            </div>
          </motion.div>
        </div>
      </ScrollArea>
    </motion.div>
  );
};

export default BrandStory;
