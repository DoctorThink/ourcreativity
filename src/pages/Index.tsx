import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-background text-foreground p-4 flex flex-col items-center justify-center"
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center max-w-md"
      >
        <h1 className="text-4xl font-bold mb-4">Komunitas Kreatif Kita</h1>
        <p className="text-lg text-foreground/60 mb-8">
          Bergabunglah dengan komunitas kreatif kami dan ekspresikan bakatmu bersama!
        </p>
        <Button
          onClick={() => navigate('/groups')}
          className="w-full flex items-center justify-center gap-2"
        >
          <Users className="w-5 h-5" />
          Jelajahi Grup
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default Index;