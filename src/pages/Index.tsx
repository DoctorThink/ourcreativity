
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, Info, Bell, ScrollText } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  // Enhanced animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.15,
        delayChildren: 0.3,
        duration: 0.8
      } 
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
  };

  // Navigation items with updated routing and refined design
  const navigationItems = [
    { icon: BookOpen, text: "Cerita Kami", href: "/brand-story", color: "from-lavender/20 to-transparent" },
    { icon: ScrollText, text: "Syarat & Ketentuan", href: "/terms", color: "from-mint/20 to-transparent" },
    { icon: Info, text: "Informasi", href: "/informasi", color: "from-peach/20 to-transparent" },
    { icon: Bell, text: "Pengumuman", href: "/pengumuman", color: "from-softPink/20 to-transparent" }
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

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-8 min-h-screen flex flex-col">
        <div className="flex-grow flex flex-col items-center justify-center">
          {/* Logo Container with Enhanced Animation */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 200,
              damping: 20,
              duration: 1.2
            }}
            className="flex gap-6 mb-12"
          >
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="w-24 h-24 rounded-full backdrop-blur-xl bg-white/5 border border-white/10 p-4 flex items-center justify-center animate-float shadow-lg shadow-black/20"
            >
              <img
                src="/lovable-uploads/c861a7c0-5ec9-4bac-83ea-319c40fcb001.png"
                alt="Fish Logo"
                className="w-16 h-16 object-contain"
                loading="eager"
              />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="w-32 h-32 rounded-full backdrop-blur-xl bg-white/5 border border-white/10 p-4 flex items-center justify-center animate-float shadow-lg shadow-black/20"
            >
              <img
                src="/lovable-uploads/0bec5fdf-43d7-47af-b1cd-ba7fd2b949ec.png"
                alt="Text Logo"
                className="w-24 h-24 object-contain"
                loading="eager"
              />
            </motion.div>
          </motion.div>

          {/* Title with Enhanced Design */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="text-5xl md:text-7xl font-serif font-bold mb-6 text-center relative z-10"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/70">
              OUR CREATIVITY
            </span>
          </motion.h1>

          {/* Description with better typography */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7 }}
            className="text-lg md:text-xl text-white/70 max-w-2xl text-center mb-12 font-serif relative z-10"
          >
            Dimana imajinasi bertemu dengan inovasi. Bergabunglah dengan komunitas kreatif kami.
          </motion.p>

          {/* Interactive Navigation Buttons with improved design */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-4xl mx-auto"
          >
            {navigationItems.map(({ icon: Icon, text, href, color }) => (
              <motion.div
                key={text}
                variants={itemVariants}
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={() => navigate(href)}
                  variant="secondary"
                  className={`w-full h-full min-h-[120px] rounded-2xl backdrop-blur-xl bg-black/30 border border-white/10 flex flex-col items-center justify-center gap-4 hover:bg-white/10 transition-all duration-300 group overflow-hidden relative`}
                >
                  {/* Background gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-30`}></div>
                  
                  {/* Interactive hover effect */}
                  <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-full transition-all duration-1000 ease-in-out" />
                  
                  {/* Geometric accent */}
                  <div className="absolute -bottom-6 -right-6 w-12 h-12 rounded-full border border-white/10" style={{ opacity: 0.2 }} />
                  
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/10 backdrop-blur-sm transition-transform duration-300 group-hover:-translate-y-1 relative z-10">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-serif transition-transform duration-300 group-hover:translate-y-1 relative z-10">{text}</span>
                </Button>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Credits Footer with enhanced design */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-auto pt-16 pb-6 text-center"
        >
          <div className="backdrop-blur-xl bg-black/20 border border-white/10 rounded-full px-6 py-3 inline-block">
            <p className="text-xs text-white/50">
              &copy; 2024 OUR CREATIVITY • Designed by Ardellio S. A.
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Index;
