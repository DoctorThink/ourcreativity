
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, Info, Bell, ScrollText } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2,
        duration: 0.6
      } 
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  // Navigation items with updated routing
  const navigationItems = [
    { icon: BookOpen, text: "Cerita Kami", href: "/brand-story", color: "bg-lavender/10" },
    { icon: ScrollText, text: "Syarat & Ketentuan", href: "/terms", color: "bg-mint/10" },
    { icon: Info, text: "Informasi", href: "/informasi", color: "bg-peach/10" },
    { icon: Bell, text: "Pengumuman", href: "/pengumuman", color: "bg-softPink/10" }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-background text-foreground overflow-x-hidden"
    >
      {/* Performance optimized background with geometric shapes */}
      <div className="fixed inset-0 bg-gradient-to-b from-black to-zinc-900 -z-10">
        {/* Geometric background elements */}
        <div className="absolute top-[20%] left-[10%] w-64 h-64 rounded-full border border-white/5 opacity-20" />
        <div className="absolute bottom-[30%] right-[15%] w-48 h-48 rounded-xl border border-white/5 opacity-10 rotate-12" />
        <div className="absolute top-[40%] right-[20%] w-32 h-32 rounded-md border border-white/5 opacity-10 rotate-45" />
        <div className="absolute bottom-[10%] left-[25%] w-24 h-24 border border-white/5 opacity-20 -rotate-12" />
      </div>

      {/* Main Content with optimized rendering */}
      <div className="relative z-10 container mx-auto px-4 py-8 min-h-screen flex flex-col">
        <div className="flex-grow flex flex-col items-center justify-center">
          {/* Logo Container with Animation */}
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
            <div className="w-24 h-24 rounded-full bg-white/5 p-4 flex items-center justify-center animate-float backdrop-blur-md border border-white/10">
              <img
                src="/lovable-uploads/c861a7c0-5ec9-4bac-83ea-319c40fcb001.png"
                alt="Fish Logo"
                className="w-16 h-16 object-contain"
                loading="eager"
              />
            </div>
            <div className="w-32 h-32 rounded-full bg-white/5 p-4 flex items-center justify-center animate-float backdrop-blur-md border border-white/10">
              <img
                src="/lovable-uploads/0bec5fdf-43d7-47af-b1cd-ba7fd2b949ec.png"
                alt="Text Logo"
                className="w-24 h-24 object-contain"
                loading="eager"
              />
            </div>
          </motion.div>

          {/* Title with Optimized Glow Effect */}
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-5xl md:text-7xl font-serif font-bold mb-6 text-center glow-text"
          >
            OUR CREATIVITY
          </motion.h1>

          {/* Description with better animation */}
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-lg md:text-xl text-gray-300 max-w-2xl text-center mb-12 font-serif"
          >
            Dimana imajinasi bertemu dengan inovasi. Bergabunglah dengan komunitas kreatif kami.
          </motion.p>

          {/* Interactive Navigation Buttons */}
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
                  className={`w-full h-full min-h-[120px] rounded-2xl ${color} backdrop-blur-md border border-white/10 flex flex-col items-center justify-center gap-4 hover:bg-white/20 transition-all duration-300 group overflow-hidden relative`}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-full transition-all duration-1000 ease-in-out" />
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/10 backdrop-blur-sm transition-transform duration-300 group-hover:-translate-y-1">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-serif transition-transform duration-300 group-hover:translate-y-1">{text}</span>
                </Button>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Credits Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-auto pt-12 pb-4 text-center"
        >
          <div className="glass rounded-full px-6 py-3 inline-block">
            <p className="text-xs text-gray-400">
              &copy; 2024 OUR CREATIVITY • Designed by Ardellio S. A.
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Index;
