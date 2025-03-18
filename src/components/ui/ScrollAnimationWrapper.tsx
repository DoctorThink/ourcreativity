
import { useRef, ReactNode } from "react";
import { motion, useInView } from "framer-motion";

interface ScrollAnimationWrapperProps {
  children: ReactNode;
  animation?: "fadeIn" | "slideUp" | "scaleIn" | "staggerChildren" | "zoom" | "bounce";
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
  once?: boolean;
}

const animations = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  },
  slideUp: {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 }
  },
  staggerChildren: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  },
  zoom: {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1 }
  },
  bounce: {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 10 
      } 
    }
  }
};

export const ScrollAnimationItem = ({ children, delay = 0 }: { children: ReactNode; delay?: number }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 }
    }}
    transition={{ duration: 0.5, delay }}
  >
    {children}
  </motion.div>
);

const ScrollAnimationWrapper = ({ 
  children, 
  animation = "fadeIn", 
  delay = 0, 
  duration = 0.5,
  threshold = 0.1,
  className = "",
  once = true
}: ScrollAnimationWrapperProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: threshold, once });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={animations[animation]}
      transition={{ duration, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollAnimationWrapper;
