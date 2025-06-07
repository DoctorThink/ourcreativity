
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(true);
  const [clicked, setClicked] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    // Only run on desktop
    if (window.matchMedia("(pointer: fine)").matches) {
      setHidden(false);
      
      const addEventListeners = () => {
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseenter", onMouseEnter);
        document.addEventListener("mouseleave", onMouseLeave);
        document.addEventListener("mousedown", onMouseDown);
        document.addEventListener("mouseup", onMouseUp);
        
        // Track when cursor is over clickable elements
        document.querySelectorAll("a, button, [role='button']").forEach(el => {
          el.addEventListener("mouseenter", handleHoverStart);
          el.addEventListener("mouseleave", handleHoverEnd);
        });
      };

      const removeEventListeners = () => {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseenter", onMouseEnter);
        document.removeEventListener("mouseleave", onMouseLeave);
        document.removeEventListener("mousedown", onMouseDown);
        document.removeEventListener("mouseup", onMouseUp);
        
        // Remove hover tracking
        document.querySelectorAll("a, button, [role='button']").forEach(el => {
          el.removeEventListener("mouseenter", handleHoverStart);
          el.removeEventListener("mouseleave", handleHoverEnd);
        });
      };

      const handleHoverStart = () => setHovering(true);
      const handleHoverEnd = () => setHovering(false);
      
      const onMouseMove = (e: MouseEvent) => {
        setPosition({ x: e.clientX, y: e.clientY });
      };

      const onMouseEnter = () => {
        setHidden(false);
      };

      const onMouseLeave = () => {
        setHidden(true);
      };

      const onMouseDown = () => {
        setClicked(true);
      };

      const onMouseUp = () => {
        setClicked(false);
      };

      // Add event listeners
      addEventListeners();
      
      // Hide default cursor
      document.body.style.cursor = "none";

      // Check for all clickable elements already in the DOM
      document.querySelectorAll("a, button, [role='button'], input, textarea, select").forEach(el => {
        // Fix: Cast element to HTMLElement which has style property
        (el as HTMLElement).style.cursor = "none";
      });

      // Clean up
      return () => {
        removeEventListeners();
        document.body.style.cursor = "auto";
        
        document.querySelectorAll("a, button, [role='button'], input, textarea, select").forEach(el => {
          // Fix: Cast element to HTMLElement which has style property
          (el as HTMLElement).style.cursor = "auto";
        });
      };
    }
  }, []);

  // Don't render on mobile or when hidden
  if (hidden || typeof window === "undefined") {
    return null;
  }

  return (
    <>
      {/* Main cursor dot - increased z-index to be above cards */}
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 rounded-full bg-white z-[99999] pointer-events-none mix-blend-difference"
        animate={{
          scale: clicked ? 0.5 : hovering ? 0.8 : 1,
          opacity: hidden ? 0 : 1
        }}
        style={{
          x: position.x - 8,
          y: position.y - 8,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
      />

      {/* Larger follower circle - increased z-index to be above cards */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 rounded-full border border-white z-[99999] pointer-events-none opacity-70 mix-blend-difference"
        animate={{
          scale: clicked ? 1.2 : hovering ? 1.5 : 1,
          opacity: hidden ? 0 : hovering ? 0.8 : 0.6
        }}
        style={{
          x: position.x - 20,
          y: position.y - 20,
        }}
        transition={{
          type: "spring",
          stiffness: 250,
          damping: 30,
          mass: 1,
          opacity: { duration: 0.2 },
        }}
      />
    </>
  );
};
