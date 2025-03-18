
import { ReactNode, useState } from "react";
import { motion } from "framer-motion";

interface MicroInteractionProps {
  children: ReactNode;
  type: "button" | "input" | "link" | "card" | "icon";
  className?: string;
  onClick?: () => void;
}

const MicroInteraction = ({ 
  children, 
  type, 
  className = "", 
  onClick 
}: MicroInteractionProps) => {
  const [isActive, setIsActive] = useState(false);
  
  const getInteractionProps = () => {
    switch (type) {
      case "button":
        return {
          whileHover: { scale: 1.05, backgroundColor: "rgba(229, 222, 255, 0.15)" },
          whileTap: { scale: 0.95 },
          transition: { type: "spring", stiffness: 400, damping: 17 },
          className: `transform-gpu ${className}`
        };
      case "input":
        return {
          initial: { borderColor: "rgba(255, 255, 255, 0.1)" },
          animate: isActive 
            ? { borderColor: "rgba(229, 222, 255, 0.5)", boxShadow: "0 0 0 2px rgba(229, 222, 255, 0.2)" } 
            : { borderColor: "rgba(255, 255, 255, 0.1)", boxShadow: "none" },
          transition: { duration: 0.2 },
          className: `focus-within:ring-0 ${className}`
        };
      case "link":
        return {
          whileHover: { x: 5, color: "rgba(229, 222, 255, 1)" },
          transition: { type: "spring", stiffness: 400, damping: 17 },
          className: `transform-gpu ${className}`
        };
      case "card":
        return {
          whileHover: { 
            y: -5, 
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            backgroundColor: "rgba(255, 255, 255, 0.05)" 
          },
          transition: { type: "spring", stiffness: 300, damping: 20 },
          className: `transform-gpu ${className}`
        };
      case "icon":
        return {
          whileHover: { rotate: [0, -10, 10, -5, 5, 0], scale: 1.1, color: "rgba(229, 222, 255, 1)" },
          transition: { duration: 0.5 },
          className: `transform-gpu ${className}`
        };
      default:
        return { className };
    }
  };
  
  const interactionProps = getInteractionProps();
  
  return (
    <motion.div
      onFocus={() => type === "input" && setIsActive(true)}
      onBlur={() => type === "input" && setIsActive(false)}
      onClick={onClick}
      {...interactionProps}
      className={interactionProps.className}
    >
      {children}
    </motion.div>
  );
};

export default MicroInteraction;
