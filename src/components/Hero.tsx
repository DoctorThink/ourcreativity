import { motion } from "framer-motion";

export const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden px-4">
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-background z-0" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container relative z-10 text-center"
      >
        <motion.img
          src="/lovable-uploads/f8326a6b-e1d4-4ae9-9786-448a5e0d8688.png"
          alt="Logo"
          className="w-24 h-24 mx-auto mb-8 animate-float"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />
        
        <h1 className="text-4xl md:text-7xl lg:text-8xl font-serif font-bold mb-6 animate-glow tracking-wider">
          OUR CREATIVITY
        </h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
        >
          Where imagination meets innovation. Join our creative community and bring your ideas to life.
        </motion.p>
      </motion.div>
    </section>
  );
};