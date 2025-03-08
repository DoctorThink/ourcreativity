
import { motion } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Users, Quote, Calendar, ArrowRight, Infinity, Palette, Video, MessageSquare, FileText, Instagram, Gamepad2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";

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

  // Logo variants with enhanced metadata - Updated with new logos
  const logoVariants = [
    {
      title: "Edisi Design",
      description: "Varian logo untuk grup Desain Grafis",
      image: "/lovable-uploads/a82afd70-9de5-4764-9dd5-af747ae8405f.png",
      color: "from-purple-500/20 to-transparent"
    },
    {
      title: "Edisi Karya",
      description: "Varian logo untuk grup Karya Tulis",
      image: "/lovable-uploads/595d8581-6612-482f-8275-a6a2735f9d57.png",
      color: "from-gray-500/20 to-transparent"
    },
    {
      title: "Edisi Game",
      description: "Varian logo untuk grup Game Creator",
      image: "/lovable-uploads/c3ebd3bb-9f56-4e8c-af6f-a72b010941c8.png",
      color: "from-red-500/20 to-transparent"
    },
    {
      title: "Edisi Video",
      description: "Varian logo untuk grup Video Editing",
      image: "/lovable-uploads/b6d89970-6471-4763-b7de-f7b863e538da.png",
      color: "from-blue-500/20 to-transparent"
    }
  ];

  // Updated content data with refined metadata
  const milestones = [
    {
      year: "2024",
      title: "Pendirian",
      description: "OurCreativityIDN didirikan atas dasar kemauan founder untuk memberikan manfaat bagi banyak orang dan menciptakan lebih banyak anak muda kreatif di Indonesia.",
      highlight: "Founder's Vision"
    },
    {
      year: "2024",
      title: "Komunitas Terbentuk",
      description: "Komunitas ini diciptakan karena banyaknya komentar di internet yang berisi kemauan mereka untuk mempelajari suatu hal, namun tidak memiliki tempat untuk bertanya.",
      highlight: "Community Need"
    },
    {
      year: "2024",
      title: "Menarik Minat",
      description: "Dengan cara menarik anggota lewat Media Sosial dan karya-karya yang dapat menarik perhatian. Memanfaatkan konten sehari-hari untuk menarik SDM dengan minat yang sama.",
      highlight: "Social Media Strategy"
    },
    {
      year: "2024",
      title: "Pertumbuhan Pesat",
      description: "Belum setahun sejak komunitas ini dibuat, namun berhasil mengumpulkan sekitar 3000+ member dari seluruh Indonesia, yang memiliki kemauan untuk belajar.",
      highlight: "3000+ Anggota"
    }
  ];

  // Enhanced community group sections - Updated name for Meme Creator to Game Creator
  const communityGroups = [
    {
      title: "Desain Grafis",
      icon: <Palette className="w-6 h-6" />,
      description: "Fokus pada pengembangan keterampilan desain visual dan grafis.",
      color: "from-lavender/20 to-transparent"
    },
    {
      title: "Video Editing",
      icon: <Video className="w-6 h-6" />,
      description: "Belajar dan berkarya dalam pengeditan dan produksi video.",
      color: "from-mint/20 to-transparent"
    },
    {
      title: "Game Creator",
      icon: <Gamepad2 className="w-6 h-6" />,
      description: "Mengembangkan game dan konten interaktif digital.",
      color: "from-peach/20 to-transparent"
    },
    {
      title: "Karya Tulis",
      icon: <FileText className="w-6 h-6" />,
      description: "Menulis dan mengembangkan konten tertulis yang kreatif.",
      color: "from-softPink/20 to-transparent"
    }
  ];

  // Testimonials with enhanced profiles
  const testimonials = [
    {
      name: "Anggota Aktif",
      role: "Desainer Grafis",
      quote: "OurCreativity memberi saya ruang untuk bereksperimen dengan ide-ide yang tidak konvensional dan mendapat umpan balik yang konstruktif.",
      image: "/lovable-uploads/a82afd70-9de5-4764-9dd5-af747ae8405f.png"
    },
    {
      name: "Faasigma",
      role: "Video Editor",
      quote: "Bang bang tutor pissss. Bergabung dengan komunitas ini membuka banyak peluang kolaborasi yang tidak pernah saya bayangkan sebelumnya.",
      image: "/lovable-uploads/b6d89970-6471-4763-b7de-f7b863e538da.png"
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

      {/* Header - Improved mobile responsiveness */}
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
            <span className="hidden sm:inline">Kembali</span>
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
        <div className="max-w-6xl mx-auto px-4 py-8 sm:py-16">
          {/* Hero Section with enhanced design and improved mobile responsiveness */}
          <motion.div 
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="text-center mb-12 sm:mb-20"
          >
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="text-4xl sm:text-5xl md:text-7xl font-serif font-bold mb-6"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/70">
                Cerita Kami
              </span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="text-base sm:text-lg md:text-xl text-white/70 max-w-3xl mx-auto font-serif"
            >
              OurCreativityIDN adalah komunitas kreatif yang didirikan pada tahun 2024 atas dasar kemauan founder untuk memberikan manfaat bagi banyak orang dan menciptakan lebih banyak anak muda kreatif di Indonesia.
            </motion.p>
            
            {/* Decorative line */}
            <motion.div 
              className="w-16 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent mx-auto mt-8"
              initial={{ width: 0 }}
              animate={{ width: "4rem" }}
              transition={{ delay: 0.6, duration: 0.8 }}
            />
          </motion.div>

          {/* Timeline Section with enhanced visual design and improved mobile responsiveness */}
          <motion.section
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mb-16 sm:mb-24"
          >
            <div className="flex items-center mb-8 sm:mb-12">
              <div className="w-10 h-10 rounded-full backdrop-blur-xl bg-white/5 border border-white/10 flex items-center justify-center mr-4">
                <Calendar className="w-5 h-5" />
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/70">
                  Perjalanan Kami
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
                  <div className="backdrop-blur-xl bg-black/30 border border-white/10 p-4 sm:p-6 rounded-xl relative overflow-hidden">
                    {/* Dynamic geometric background */}
                    <div className="absolute -bottom-6 -right-6 w-20 h-20 rounded-full border border-white/10" style={{ opacity: 0.1 }} />
                    <div className="absolute top-0 left-0 w-40 h-40 rounded-br-3xl border-r border-b border-white/5" style={{ opacity: 0.1 }} />
                    
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-4 relative z-10">
                      <h3 className="text-xl sm:text-2xl font-serif font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/70">
                        {milestone.title}
                      </h3>
                      <Badge variant="secondary" className="self-start backdrop-blur-xl bg-white/5 border border-white/10">
                        {milestone.year}
                      </Badge>
                    </div>
                    <p className="text-white/70 mb-4 text-sm sm:text-base">{milestone.description}</p>
                    <Badge variant="outline" className="backdrop-blur-xl bg-white/5 border border-white/10">
                      {milestone.highlight}
                    </Badge>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Logo Philosophy Section - Improved mobile responsiveness */}
          <motion.section
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mb-16 sm:mb-24"
          >
            <div className="flex items-center mb-8 sm:mb-12">
              <div className="w-10 h-10 rounded-full backdrop-blur-xl bg-white/5 border border-white/10 flex items-center justify-center mr-4">
                <Infinity className="w-5 h-5" />
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/70">
                  Filosofi Logo
                </span>
              </h2>
            </div>

            <motion.div 
              variants={itemVariants}
              className="backdrop-blur-xl bg-black/30 border border-white/10 p-4 sm:p-8 rounded-3xl relative overflow-hidden mb-8 sm:mb-12"
            >
              {/* Geometric background elements */}
              <div className="absolute inset-0 bg-gradient-to-br from-zinc-900/30 to-black opacity-50" />
              <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-white/5 blur-3xl" />
              <div className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full bg-white/5 blur-3xl" />
              
              <div className="relative z-10 space-y-4 sm:space-y-6">
                <p className="text-white/80 leading-relaxed text-sm sm:text-base">
                  Secara keseluruhan logo ini mengambil bentuk "infinity" atau tidak terbatas. Kami ingin menunjukkan bahwa kreativitas manusia, bukanlah sesuatu yang seharusnya diberikan batas tertentu, karena dapat terus berkembang, dan menjadi semakin baik, juga memiliki ciri khasnya tersendiri.
                </p>
                
                <p className="text-white/80 leading-relaxed text-sm sm:text-base">
                  Kami juga membuat bentuk O dan C yang dapat disebut O.C dan juga memiliki singkatan OurCreativity. Kami juga mengambil warna merah yang memberi makna keberanian sangat dibutuhkan dalam berkarya. Karena yang kami yakini, tanpa keberanian seseorang tidak akan pernah berkarya dan tidak akan berkembang.
                </p>
                
                <Separator className="bg-white/10" />
                
                <div className="flex justify-center">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full backdrop-blur-xl bg-white/5 border border-white/10 p-4 flex items-center justify-center animate-float shadow-lg shadow-black/20">
                    <img
                      src="/lovable-uploads/c861a7c0-5ec9-4bac-83ea-319c40fcb001.png"
                      alt="Logo Philosophy"
                      className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Logo variants grid - Improved mobile responsiveness */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {logoVariants.map((logo, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                  className="backdrop-blur-xl bg-black/30 border border-white/10 p-4 sm:p-6 rounded-xl text-center relative overflow-hidden h-full"
                >
                  {/* Dynamic background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${logo.color} opacity-30`}></div>
                  <div className="absolute -bottom-4 -right-4 w-12 h-12 rounded-full border border-white/10" style={{ opacity: 0.2 }} />
                  
                  <div className="flex flex-col items-center gap-3 sm:gap-4 relative z-10">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full backdrop-blur-md bg-white/5 border border-white/10 p-2 flex items-center justify-center mb-2">
                      <img src={logo.image} alt={logo.title} className="w-10 h-10 sm:w-12 sm:h-12 object-contain" />
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/70">
                      {logo.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-white/70">{logo.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Community Growth Section - Improved mobile responsiveness */}
          <motion.section
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mb-16 sm:mb-24"
          >
            <div className="flex items-center mb-8 sm:mb-12">
              <div className="w-10 h-10 rounded-full backdrop-blur-xl bg-white/5 border border-white/10 flex items-center justify-center mr-4">
                <Users className="w-5 h-5" />
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/70">
                  Komunitas Kami
                </span>
              </h2>
            </div>

            <motion.div 
              variants={itemVariants}
              className="backdrop-blur-xl bg-black/30 border border-white/10 p-4 sm:p-8 rounded-3xl relative overflow-hidden mb-8 sm:mb-12"
            >
              {/* Geometric background elements */}
              <div className="absolute inset-0 bg-gradient-to-br from-zinc-900/30 to-black opacity-50" />
              <div className="absolute top-10 left-10 w-60 h-60 rounded-full bg-red-500/5 blur-3xl" />
              
              <div className="relative z-10 space-y-4 sm:space-y-6">
                <h3 className="text-xl sm:text-2xl font-serif font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/70">
                  Dedication
                </h3>
                
                <p className="text-white/80 leading-relaxed text-sm sm:text-base">
                  Belum setahun sejak komunitas ini dibuat, tetapi secara tak disangka kami berhasil mengumpulkan sekitar 3000+ member dari seluruh Indonesia, yang memiliki kemauan untuk belajar, dan masih berkarya setiap harinya di OurCreativity. Tentu saja karya mereka bisa dilihat secara gratis di @ourcreativity.ofc.
                </p>
                
                <p className="text-white/80 leading-relaxed text-sm sm:text-base">
                  Dari hasil ini, kami bisa menyimpulkan bahwa sebenarnya, anak muda Indonesia sebenarnya memiliki "kemauan yang tinggi" atau ketertarikan yang tinggi pada suatu hal di media sosial. Dan jika hal itu adalah sesuatu yang positif, kami yakin, Indonesia akan semakin dipenuhi dengan jiwa-jiwa kreatif dari para anak muda.
                </p>
                
                <div className="flex justify-center pt-4">
                  <div className="backdrop-blur-xl bg-white/5 border border-white/10 px-6 sm:px-8 py-3 sm:py-4 rounded-full">
                    <p className="text-2xl sm:text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/70">3000+ Member</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Community groups grid - Improved mobile responsiveness */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {communityGroups.map((group, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                  className="backdrop-blur-xl bg-black/30 border border-white/10 p-4 sm:p-6 rounded-xl relative overflow-hidden"
                >
                  {/* Dynamic background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${group.color} opacity-30`}></div>
                  <div className="absolute -bottom-4 -right-4 w-12 h-12 rounded-full border border-white/10" style={{ opacity: 0.2 }} />
                  
                  <div className="flex flex-col items-center gap-2 sm:gap-3 relative z-10">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl backdrop-blur-md bg-white/5 border border-white/10 flex items-center justify-center mb-2">
                      {group.icon}
                    </div>
                    <h3 className="text-base sm:text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/70">
                      Edisi {group.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-white/70 text-center">{group.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Testimonials Section - Improved mobile responsiveness */}
          <motion.section
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mb-16 sm:mb-24"
          >
            <div className="flex items-center mb-8 sm:mb-12">
              <div className="w-10 h-10 rounded-full backdrop-blur-xl bg-white/5 border border-white/10 flex items-center justify-center mr-4">
                <Quote className="w-5 h-5" />
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/70">
                  Suara Komunitas
                </span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                  className="backdrop-blur-xl bg-black/30 border border-white/10 p-4 sm:p-6 rounded-xl relative overflow-hidden h-full"
                >
                  {/* Dynamic geometric elements */}
                  <div className="absolute top-0 right-0 w-20 h-20 rounded-bl-3xl border-l border-b border-white/10" style={{ opacity: 0.1 }} />
                  <div className="absolute -bottom-8 -left-8 w-16 h-16 rounded-full border border-white/10" style={{ opacity: 0.2 }} />
                  
                  <div className="absolute top-6 right-6 text-4xl sm:text-6xl opacity-20 font-serif">"</div>
                  <div className="flex items-center mb-4 relative z-10">
                    <Avatar className="h-10 w-10 sm:h-12 sm:w-12 mr-4 border border-white/10">
                      <img src={testimonial.image} alt={testimonial.name} />
                    </Avatar>
                    <div>
                      <h4 className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/70">
                        {testimonial.name}
                      </h4>
                      <p className="text-xs sm:text-sm text-white/50">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-white/70 italic relative z-10 text-sm sm:text-base">"{testimonial.quote}"</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Social Media Section - Improved mobile responsiveness */}
          <motion.section
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mb-16 sm:mb-24"
          >
            <div className="flex items-center mb-8 sm:mb-12">
              <div className="w-10 h-10 rounded-full backdrop-blur-xl bg-white/5 border border-white/10 flex items-center justify-center mr-4">
                <Instagram className="w-5 h-5" />
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/70">
                  Media Sosial
                </span>
              </h2>
            </div>

            <motion.div 
              variants={itemVariants}
              className="backdrop-blur-xl bg-black/30 border border-white/10 p-4 sm:p-8 rounded-3xl relative overflow-hidden"
            >
              {/* Geometric background elements */}
              <div className="absolute inset-0 bg-gradient-to-br from-zinc-900/30 to-black opacity-50" />
              <div className="absolute top-20 right-20 w-40 h-40 rounded-full bg-red-500/5 blur-3xl" />
              
              <div className="relative z-10 text-center space-y-4 sm:space-y-6">
                <h3 className="text-lg sm:text-xl font-serif font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/70">
                  Bergabung Dengan Kami
                </h3>
                
                <p className="text-white/80 leading-relaxed max-w-3xl mx-auto text-sm sm:text-base">
                  Ikuti kami di media sosial dan bergabunglah dengan komunitas kreatif kami. Lihat karya-karya anggota kami dan dapatkan inspirasi untuk berkarya.
                </p>
                
                <div className="flex justify-center pt-4">
                  <Button
                    onClick={() => window.open("https://linktr.ee/ourcreativity.ofc", "_blank")}
                    className="backdrop-blur-xl bg-white/10 hover:bg-white/20 text-white px-4 sm:px-8 py-3 sm:py-6 rounded-full text-sm sm:text-lg font-semibold relative z-10 group border border-white/10"
                  >
                    <span className="hidden sm:inline">LINKTR.EE/</span>OURCREATIVITY.OFC
                    <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 inline transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.section>

          {/* Credits Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-16 sm:mt-24 mb-8 text-center"
          >
            <div className="backdrop-blur-xl bg-black/20 border border-white/10 rounded-full px-4 sm:px-6 py-2 sm:py-3 inline-block">
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
