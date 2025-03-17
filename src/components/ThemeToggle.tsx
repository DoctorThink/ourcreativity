
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <motion.button
      onClick={toggleTheme}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="relative h-10 w-10 rounded-full flex items-center justify-center overflow-hidden bg-secondary backdrop-blur-md border border-foreground/10"
      aria-label={theme === "dark" ? "Beralih ke mode terang" : "Beralih ke mode gelap"}
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === "dark" ? 0 : 180 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="absolute inset-0 flex items-center justify-center"
      >
        {theme === "dark" ? (
          <Moon className="h-5 w-5 text-lavender" />
        ) : (
          <Sun className="h-5 w-5 text-amber" />
        )}
      </motion.div>
      
      {/* Rings effect */}
      <div className="absolute inset-0 rounded-full border border-foreground/5 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
      <div className="absolute -inset-1 rounded-full border border-foreground/5 opacity-0 hover:opacity-70 transition-opacity duration-300 animate-pulse-soft"></div>
    </motion.button>
  );
};

export default ThemeToggle;
