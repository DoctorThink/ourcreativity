
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

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  // Content data
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
      className="min-h-screen bg-background text-foreground"
    >
      {/* Fixed Background */}
      <div className="fixed inset-0 bg-gradient-to-b from-black to-zinc-900 -z-10" />

      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg p-4 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button 
            onClick={() => navigate("/")}
            className="flex items-center space-x-2 text-foreground/60 hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Kembali</span>
          </button>
          
          <div className="flex items-center gap-2">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-8 h-8 rounded-full bg-white/5 p-1 flex items-center justify-center backdrop-blur-md border border-white/10"
            >
              <img
                src="/lovable-uploads/c861a7c0-5ec9-4bac-83ea-319c40fcb001.png"
                alt="Logo"
                className="w-6 h-6 object-contain"
              />
            </motion.div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-8 h-8 rounded-full bg-white/5 p-1 flex items-center justify-center backdrop-blur-md border border-white/10"
            >
              <img
                src="/lovable-uploads/0bec5fdf-43d7-47af-b1cd-ba7fd2b949ec.png"
                alt="Text Logo"
                className="w-6 h-6 object-contain"
              />
            </motion.div>
          </div>
        </div>
      </header>

      <ScrollArea className="h-[calc(100vh-64px)]">
        <div className="max-w-6xl mx-auto px-4 py-16">
          {/* Hero Section */}
          <motion.div 
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="text-center mb-20"
          >
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 glow-text">Perjalanan Kami</h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto font-serif">
              Dari ide sederhana hingga komunitas kreatif yang berkembang. Inilah cerita bagaimana Our Creativity tumbuh dan berevolusi.
            </p>
          </motion.div>

          {/* Timeline Section */}
          <motion.section
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="mb-24"
          >
            <div className="flex items-center mb-12">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mr-4">
                <Clock className="w-5 h-5" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold">Lini Masa</h2>
            </div>

            <div className="relative pl-8 border-l border-white/20">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  variants={fadeIn}
                  className="mb-12 relative"
                >
                  <div className="absolute -left-[41px] w-6 h-6 rounded-full bg-white/20 border-4 border-background"></div>
                  <div className="glass p-6 rounded-xl">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-2xl font-serif font-bold">{milestone.title}</h3>
                      <Badge variant="secondary" className="bg-white/10">
                        {milestone.year}
                      </Badge>
                    </div>
                    <p className="text-gray-300 mb-4">{milestone.description}</p>
                    <Badge variant="outline" className="bg-white/5">
                      {milestone.highlight}
                    </Badge>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Testimonials Section */}
          <motion.section
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="mb-24"
          >
            <div className="flex items-center mb-12">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mr-4">
                <Quote className="w-5 h-5" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold">Suara Komunitas</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  variants={fadeIn}
                  className="glass p-6 rounded-xl relative"
                >
                  <div className="absolute top-6 right-6 text-6xl opacity-20">"</div>
                  <div className="flex items-center mb-4">
                    <Avatar className="h-12 w-12 mr-4">
                      <img src={testimonial.image} alt={testimonial.name} />
                    </Avatar>
                    <div>
                      <h4 className="font-bold">{testimonial.name}</h4>
                      <p className="text-sm text-gray-400">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-300 italic relative z-10">"{testimonial.quote}"</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Community Stats Section */}
          <motion.section
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="mb-20"
          >
            <div className="flex items-center mb-12">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mr-4">
                <Users className="w-5 h-5" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold">Komunitas Kami</h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {communityHighlights.map((item, index) => (
                <motion.div
                  key={index}
                  variants={fadeIn}
                  whileHover={{ scale: 1.05 }}
                  className="glass p-6 rounded-xl text-center relative overflow-hidden"
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-50`}></div>
                  <h3 className="text-xl font-bold mb-2 relative z-10">{item.title}</h3>
                  <p className="text-3xl font-bold mb-1 relative z-10">{item.count}</p>
                  <p className="text-sm text-gray-400 relative z-10">anggota aktif</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* CTA Section */}
          <motion.section
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="text-center"
          >
            <Card className="glass p-8 rounded-xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-lavender/10 via-mint/10 to-peach/10 opacity-50"></div>
              <h2 className="text-3xl font-serif font-bold mb-6 relative z-10">Bergabunglah dengan Perjalanan Kreatif Kami</h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8 relative z-10">
                Menjadi bagian dari komunitas yang terus bertumbuh dan berkarya bersama
              </p>
              <Button
                onClick={() => window.open("https://t.me/ourcreativity", "_blank")}
                className="bg-white/10 hover:bg-white/20 text-white px-8 py-6 rounded-full text-lg font-semibold relative z-10 group"
              >
                <span>Hubungi Kami</span>
                <ArrowRight className="ml-2 w-5 h-5 inline transition-transform group-hover:translate-x-1" />
              </Button>
            </Card>
          </motion.section>
        </div>
      </ScrollArea>
    </motion.div>
  );
};

export default BrandStory;
