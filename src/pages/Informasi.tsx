
import { motion } from "framer-motion";
import PageLayout from "@/components/layouts/PageLayout";
import { Separator } from "@/components/ui/separator";
import { Info, Sparkles, Users, BookOpen, Lightbulb } from "lucide-react";

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
      title: "Tentang Kreativitas",
      icon: <Lightbulb className="w-5 h-5" />,
      content: "Kreativitas adalah kemampuan untuk menghasilkan ide-ide baru, solusi inovatif, dan cara-cara unik dalam menyelesaikan masalah. Ini adalah kekuatan yang memungkinkan kita untuk melihat dunia dari perspektif berbeda dan membuat sesuatu yang sebelumnya tidak ada. Kreativitas tidak terbatas pada seni dan desain; itu bisa ditemukan dalam berbagai bidang seperti sains, teknologi, bisnis, dan kehidupan sehari-hari.",
      decoration: (
        <>
          <div className="absolute top-0 right-0 w-32 h-32 rounded-full border border-white/10" style={{ opacity: 0.1 }} />
          <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full border border-white/5" style={{ opacity: 0.1 }} />
        </>
      )
    },
    {
      id: "vision",
      title: "Visi Komunitas",
      icon: <Users className="w-5 h-5" />,
      content: "Dalam komunitas ini, kita akan berbagi inspirasi, bertukar ide, dan mendukung satu sama lain dalam mengembangkan potensi kreatif kita. Melalui diskusi, proyek kolaboratif, dan berbagai kegiatan, kita akan bersama-sama mengeksplorasi dan memperluas batasan-batasan kreativitas kita untuk mencapai hal-hal yang lebih besar dari yang dapat kita capai sendiri.",
      decoration: (
        <>
          <div className="absolute top-10 left-10 w-16 h-16 rotate-45 border border-white/10" style={{ opacity: 0.1 }} />
          <div className="absolute -bottom-5 right-0 w-32 h-32 rounded-tl-3xl border-l border-t border-white/10" style={{ opacity: 0.1 }} />
        </>
      )
    },
    {
      id: "principles",
      title: "Prinsip Dasar",
      icon: <BookOpen className="w-5 h-5" />,
      content: "Our Creativity berpegang pada prinsip bahwa setiap individu memiliki sudut pandang dan pendekatan unik terhadap kreativitas. Kami percaya pada kekuatan kolaborasi, umpan balik konstruktif, dan pembelajaran berkelanjutan. Dengan mendorong eksperimen dan berani mengambil risiko kreatif, kami menciptakan lingkungan yang mendukung pertumbuhan dan inovasi.",
      decoration: (
        <>
          <div className="absolute bottom-10 right-10 w-20 h-20 rounded-md border border-white/10" style={{ opacity: 0.1 }} />
          <div className="absolute top-0 left-0 w-40 h-40 rounded-br-3xl border-r border-b border-white/5" style={{ opacity: 0.1 }} />
        </>
      )
    }
  ];

  return (
    <PageLayout 
      title="WELCOME TO OUR CREATIVITY"
      subtitle="Selamat datang para anggota baru di komunitas 'OUR CREATIVITY'! Kami sangat senang dan bersemangat menyambut kehadiran Anda semua."
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
              className="backdrop-blur-xl bg-black/30 border border-white/10 rounded-3xl p-8 relative overflow-hidden"
            >
              {/* Decorative geometric elements */}
              {section.decoration}
              
              <div className="relative z-10 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl backdrop-blur-md bg-white/5 border border-white/10 flex items-center justify-center">
                    {section.icon}
                  </div>
                  <h2 className="text-2xl font-serif font-semibold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                    {section.title}
                  </h2>
                </div>
                
                <Separator className="bg-white/10" />
                
                <p className="text-white/70 leading-relaxed">
                  {section.content}
                </p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Quote Section with enhanced geometric design */}
        <motion.div 
          variants={itemVariants}
          className="py-10 px-8 relative backdrop-blur-xl bg-black/20 border border-white/10 rounded-3xl overflow-hidden"
        >
          {/* Geometric background elements */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBzdHJva2U9IiNmZmZmZmYwNSIgc3Ryb2tlLXdpZHRoPSIxIiBkPSJNMjkuNS45OGwxOS4wOCAxMS4wM3YyMi4wNUwyOS41IDQ1LjA5IDEwLjQyIDM0LjA2VjEyLjAxTDI5LjUuOTh6Ii8+PC9nPjwvc3ZnPg==')] bg-repeat opacity-5" />
          <div className="absolute w-60 h-60 rounded-full bg-white/5 blur-[60px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          
          <div className="absolute left-8 top-8 text-6xl opacity-10 font-serif">"</div>
          <div className="absolute right-8 bottom-8 text-6xl opacity-10 font-serif">"</div>
          
          <blockquote className="text-center space-y-6 relative z-10">
            <p className="text-2xl font-serif italic text-white">
              "Creativity is intelligence having fun."
            </p>
            <footer className="text-white/50">— Albert Einstein</footer>
            
            <motion.div 
              className="w-16 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent mx-auto mt-4"
              initial={{ width: 0 }}
              animate={{ width: "4rem" }}
              transition={{ delay: 0.6, duration: 0.8 }}
            />
          </blockquote>
        </motion.div>

        <motion.div variants={itemVariants} className="backdrop-blur-xl bg-black/30 border border-white/10 rounded-3xl p-8 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] bg-gradient-to-br from-white/5 to-transparent opacity-10 rounded-full blur-[100px]" />
          
          {/* Geometric accent */}
          <div className="absolute -right-10 -bottom-10 w-40 h-40 rounded-tl-3xl border-l border-t border-white/5" style={{ opacity: 0.1 }} />
          
          <div className="relative z-10 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                <Info className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-serif font-semibold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                Mengenai Kutipan
              </h2>
            </div>
            
            <Separator className="bg-white/10" />
            
            <p className="text-white/70 leading-relaxed">
              Kutipan ini mengingatkan kita bahwa kreativitas adalah proses yang menyenangkan dan penuh dengan kegembiraan. Dengan menggabungkan kecerdasan dan imajinasi, kita dapat menciptakan sesuatu yang luar biasa dan bermanfaat bagi diri kita sendiri dan orang lain.
            </p>
          </div>
        </motion.div>

        {/* Closing Section with interactive elements and geometric accents */}
        <motion.div 
          variants={itemVariants}
          className="text-center space-y-6 pt-8 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent -z-10 rounded-3xl" />
          
          {/* Geometric decorations */}
          <div className="absolute bottom-12 left-12 w-8 h-8 rotate-45 border border-white/10" style={{ opacity: 0.2 }} />
          <div className="absolute bottom-20 right-20 w-12 h-12 rounded-full border border-white/10" style={{ opacity: 0.2 }} />
          
          <div className="backdrop-blur-xl bg-black/20 border border-white/10 rounded-3xl p-8 relative overflow-hidden">
            <div className="flex items-center justify-center mb-6">
              <div className="w-10 h-10 rounded-full backdrop-blur-md bg-white/5 border border-white/10 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white/80" />
              </div>
            </div>
            
            <p className="text-lg text-white/80 relative z-10 mb-6">
              Sekali lagi, selamat bergabung di "OUR CREATIVITY". Mari kita mulai perjalanan ini bersama-sama dan jadikan komunitas ini tempat di mana ide-ide brilian tumbuh dan berkembang. 
            </p>
            
            <motion.p 
              className="text-xl font-serif font-semibold"
              animate={{ 
                textShadow: ["0 0 8px rgba(255,255,255,0.5)", "0 0 16px rgba(255,255,255,0.5)", "0 0 8px rgba(255,255,255,0.5)"]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/70">
                "Your creativity has no limits"
              </span>
            </motion.p>
            
            <p className="text-white/50 italic mt-4">- Admin</p>
          </div>
        </motion.div>
      </motion.div>
    </PageLayout>
  );
};

export default Informasi;
