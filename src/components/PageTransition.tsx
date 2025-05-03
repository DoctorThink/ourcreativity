
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
  isAdmin?: boolean;
}

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.98
  },
  in: {
    opacity: 1,
    y: 0,
    scale: 1
  },
  out: {
    opacity: 0,
    y: -20,
    scale: 0.98
  }
};

const adminPageVariants = {
  initial: {
    opacity: 0,
    x: 20,
  },
  in: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 240,
      damping: 25,
      mass: 0.9
    }
  },
  out: {
    opacity: 0,
    x: -20,
  }
};

const pageTransition = {
  type: "spring",
  stiffness: 300,
  damping: 30,
  mass: 1
};

export const PageTransition = ({ children, isAdmin = false }: PageTransitionProps) => {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={isAdmin ? adminPageVariants : pageVariants}
      transition={pageTransition}
      className="page-transition will-change-transform"
    >
      {children}
    </motion.div>
  );
};
