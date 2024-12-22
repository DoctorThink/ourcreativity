import { motion } from "framer-motion";

export const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 py-12 md:py-20">
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-background z-0" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container max-w-7xl mx-auto relative z-10"
      >
        <div className="flex flex-col items-center justify-center space-y-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-24 h-24 rounded-ios bg-lavender p-4 flex items-center justify-center animate-float"
          >
            <img
              src="/lovable-uploads/f8326a6b-e1d4-4ae9-9786-448a5e0d8688.png"
              alt="Logo"
              className="w-16 h-16"
            />
          </motion.div>
          
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-7xl lg:text-8xl font-serif font-bold animate-glow tracking-tight">
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
          </div>
        </div>
      </motion.div>
    </section>
  );
};