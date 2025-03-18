
import { ReactNode, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface DynamicColorSchemeProps {
  children: ReactNode;
  colorStops?: Array<{
    position: number; // 0-1 representing scroll progress
    background: string;
    textColor: string;
  }>;
}

const defaultColorStops = [
  { position: 0, background: "linear-gradient(to bottom, #1C1C1E 0%, #1C1C1E 100%)", textColor: "#FFFFFF" },
  { position: 0.3, background: "linear-gradient(to bottom, #1C1C1E 0%, #28282c 100%)", textColor: "#FFFFFF" },
  { position: 0.6, background: "linear-gradient(to bottom, #28282c 0%, #2d2a36 100%)", textColor: "#FFFFFF" },
  { position: 1, background: "linear-gradient(to bottom, #2d2a36 0%, #322d3c 100%)", textColor: "#FFFFFF" },
];

const DynamicColorScheme = ({ 
  children, 
  colorStops = defaultColorStops 
}: DynamicColorSchemeProps) => {
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll();
  
  // Get positions and colors for interpolation
  const positions = colorStops.map(stop => stop.position);
  const backgrounds = colorStops.map(stop => stop.background);
  const textColors = colorStops.map(stop => stop.textColor);
  
  // Transform scroll progress to background and text color
  const background = useTransform(scrollYProgress, positions, backgrounds);
  const color = useTransform(scrollYProgress, positions, textColors);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <>{children}</>;

  return (
    <motion.div 
      style={{ background, color }}
      className="transition-colors duration-500 min-h-screen"
    >
      {children}
    </motion.div>
  );
};

export default DynamicColorScheme;
