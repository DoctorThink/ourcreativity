import { motion } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";

export const Hero = () => {
  return (
    <ScrollArea className="h-screen w-full">
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 py-12 md:py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-background z-0 backdrop-blur-lg" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container max-w-7xl mx-auto relative z-10"
        >
          <div className="flex flex-col items-center justify-center space-y-12">
            {/* Logo Container */}
            <div className="flex items-center justify-center gap-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="w-24 h-24 rounded-full bg-white/5 p-4 flex items-center justify-center animate-float backdrop-blur-md border border-white/10"
              >
                <img
                  src="/lovable-uploads/c861a7c0-5ec9-4bac-83ea-319c40fcb001.png"
                  alt="Fish Logo"
                  className="w-16 h-16 object-contain"
                />
              </motion.div>
              
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="w-32 h-32 rounded-full bg-white/5 p-4 flex items-center justify-center animate-float backdrop-blur-md border border-white/10"
              >
                <img
                  src="/lovable-uploads/0bec5fdf-43d7-47af-b1cd-ba7fd2b949ec.png"
                  alt="Text Logo"
                  className="w-24 h-24 object-contain"
                />
              </motion.div>
            </div>
            
            <div className="text-center space-y-8">
              <motion.h1 
                className="text-4xl md:text-7xl lg:text-8xl font-serif font-bold tracking-tight animate-glow"
                style={{
                  textShadow: "0 0 10px rgba(255,255,255,0.5), 0 0 20px rgba(255,255,255,0.3)"
                }}
              >
                OUR CREATIVITY
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed font-serif"
              >
                Dimana imajinasi bertemu dengan inovasi. Bergabunglah dengan komunitas kreatif kami dan wujudkan ide-ide Anda.
              </motion.p>
            </div>

            {/* Navigation Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-3xl mx-auto mt-8"
            >
              {[
                { text: "Jelajahi Grup", href: "/groups" },
                { text: "Mulai", href: "#" },
                { text: "Informasi", href: "#" },
                { text: "Pengumuman", href: "#" }
              ].map((button, index) => (
                <motion.a
                  key={button.text}
                  href={button.href}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="rounded-full px-6 py-3 bg-white/5 backdrop-blur-md border border-white/10 text-white font-serif text-center transition-all hover:bg-white/10 hover:shadow-lg"
                >
                  {button.text}
                </motion.a>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </section>
    </ScrollArea>
  );
};