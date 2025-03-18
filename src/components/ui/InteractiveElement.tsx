
import { ReactNode, useState } from "react";
import { motion } from "framer-motion";

interface InteractiveElementProps {
  children: ReactNode;
  effect?: "tilt" | "float" | "glow" | "bounce" | "pulse" | "ripple";
  className?: string;
  onClick?: () => void;
}

const InteractiveElement = ({ 
  children, 
  effect = "tilt", 
  className = "",
  onClick 
}: InteractiveElementProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Calculate rotation for tilt effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const element = e.currentTarget;
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate normalized position within element
    const normalizedX = (x / rect.width) * 2 - 1; // -1 to 1
    const normalizedY = (y / rect.height) * 2 - 1; // -1 to 1
    
    setMousePosition({ x: normalizedX, y: normalizedY });
  };
  
  const getEffectProps = () => {
    switch (effect) {
      case "tilt":
        return {
          animate: isHovered 
            ? { 
                rotateX: -mousePosition.y * 10, 
                rotateY: mousePosition.x * 10,
                z: 10
              } 
            : { rotateX: 0, rotateY: 0, z: 0 },
          transition: { type: "spring", stiffness: 300, damping: 20 },
          className: `transform-gpu perspective-[1000px] ${className}`
        };
      case "float":
        return {
          animate: isHovered 
            ? { y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" } 
            : { y: 0, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)" },
          transition: { type: "spring", stiffness: 300, damping: 20 },
          className: `transform-gpu ${className}`
        };
      case "glow":
        return {
          animate: isHovered 
            ? { boxShadow: "0 0 20px 5px rgba(229, 222, 255, 0.3)" } 
            : { boxShadow: "0 0 0px 0px rgba(229, 222, 255, 0)" },
          transition: { duration: 0.3 },
          className: `${className}`
        };
      case "bounce":
        return {
          animate: isHovered ? { scale: [1, 1.05, 0.95, 1.02, 1] } : { scale: 1 },
          transition: { duration: 0.6 },
          className: `transform-gpu ${className}`
        };
      case "pulse":
        return {
          animate: isHovered 
            ? { 
                scale: [1, 1.03, 1], 
                transition: { 
                  repeat: Infinity, 
                  repeatType: "loop", 
                  duration: 1.5 
                } 
              } 
            : { scale: 1 },
          className: `transform-gpu ${className}`
        };
      case "ripple":
        return {
          className: `relative overflow-hidden transform-gpu ${className}`,
          custom: isHovered 
            ? <span className="absolute inset-0 bg-foreground/5 animate-ripple rounded-full" /> 
            : null
        };
      default:
        return { className };
    }
  };
  
  const effectProps = getEffectProps();
  
  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={effect === "tilt" ? handleMouseMove : undefined}
      onClick={onClick}
      {...effectProps}
      className={effectProps.className}
    >
      {children}
      {effectProps.custom}
    </motion.div>
  );
};

export default InteractiveElement;
