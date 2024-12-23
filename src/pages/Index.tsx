import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Users, Play, Info, Bell } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-background text-foreground overflow-hidden"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black to-zinc-900" />

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-8 min-h-screen flex flex-col items-center justify-center">
        {/* Logo Container with Animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ 
            type: "spring",
            stiffness: 260,
            damping: 20,
            duration: 1.5 
          }}
          className="flex gap-6 mb-12"
        >
          <div className="w-24 h-24 rounded-full bg-white/5 p-4 flex items-center justify-center animate-float backdrop-blur-md border border-white/10">
            <img
              src="/lovable-uploads/c861a7c0-5ec9-4bac-83ea-319c40fcb001.png"
              alt="Fish Logo"
              className="w-16 h-16 object-contain"
            />
          </div>
          <div className="w-32 h-32 rounded-full bg-white/5 p-4 flex items-center justify-center animate-float backdrop-blur-md border border-white/10">
            <img
              src="/lovable-uploads/0bec5fdf-43d7-47af-b1cd-ba7fd2b949ec.png"
              alt="Text Logo"
              className="w-24 h-24 object-contain"
            />
          </div>
        </motion.div>

        {/* Title with Glow Effect */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-5xl md:text-7xl font-serif font-bold mb-6 text-center animate-glow"
        >
          OUR CREATIVITY
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="text-lg md:text-xl text-gray-300 max-w-2xl text-center mb-12 font-serif"
        >
          Dimana imajinasi bertemu dengan inovasi. Bergabunglah dengan komunitas kreatif kami.
        </motion.p>

        {/* Navigation Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-3xl mx-auto"
        >
          {[
            { icon: Users, text: "Jelajahi Grup", href: "/groups" },
            { icon: Play, text: "Mulai", href: "#" },
            { icon: Info, text: "Informasi", href: "#" },
            { icon: Bell, text: "Pengumuman", href: "#" }
          ].map(({ icon: Icon, text, href }) => (
            <motion.div
              key={text}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={() => navigate(href)}
                variant="secondary"
                className="w-full h-full min-h-[80px] rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 flex flex-col items-center justify-center gap-2 hover:bg-white/10 transition-all duration-300"
              >
                <Icon className="w-6 h-6" />
                <span className="text-sm font-serif">{text}</span>
              </Button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Index;