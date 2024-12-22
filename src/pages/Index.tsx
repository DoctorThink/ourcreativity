import { motion } from "framer-motion";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-secondary"
    >
      <Hero />
      <motion.button
        onClick={() => navigate('/groups')}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-8 right-8 bg-accent text-accent-foreground px-6 py-3 rounded-ios shadow-lg hover:shadow-xl transition-all duration-200"
      >
        Explore Groups
      </motion.button>
      <About />
      <Contact />
    </motion.div>
  );
};

export default Index;