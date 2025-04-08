
import React from 'react';
import { motion } from 'framer-motion';

interface FlowingBackgroundProps {
  className?: string;
}

const FlowingBackground: React.FC<FlowingBackgroundProps> = ({ className }) => {
  return (
    <div className={`fixed inset-0 -z-20 overflow-hidden pointer-events-none ${className}`}>
      {/* Large, subtle gradient blobs */}
      <motion.div 
        className="absolute w-[120vw] h-[120vh] rounded-full opacity-20 blur-[150px]"
        style={{
          background: 'radial-gradient(circle at center, #2c2c2c 0%, transparent 70%)',
          top: '-10vh',
          left: '-10vw',
        }}
        animate={{
          x: [20, -20, 20],
          y: [20, -20, 20],
        }}
        transition={{
          repeat: Infinity,
          repeatType: 'reverse',
          duration: 40,
          ease: 'easeInOut',
        }}
      />
      
      <motion.div 
        className="absolute w-[80vw] h-[80vh] rounded-full opacity-10 blur-[100px]"
        style={{
          background: 'radial-gradient(circle at center, #3f3f3f 0%, transparent 70%)',
          bottom: '-10vh',
          right: '-10vw',
        }}
        animate={{
          x: [-30, 30, -30],
          y: [-20, 20, -20],
        }}
        transition={{
          repeat: Infinity,
          repeatType: 'reverse',
          duration: 50,
          ease: 'easeInOut',
        }}
      />
      
      {/* Subtle line accents */}
      <motion.div 
        className="absolute h-[1px] w-[40vw] bg-gradient-to-r from-transparent via-gray-700 to-transparent opacity-20"
        style={{ top: '30%', left: '10%' }}
        animate={{
          x: [0, 50, 0],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          repeat: Infinity,
          repeatType: 'reverse',
          duration: 25,
          ease: 'easeInOut',
        }}
      />
      
      <motion.div 
        className="absolute w-[1px] h-[40vh] bg-gradient-to-b from-transparent via-gray-700 to-transparent opacity-20"
        style={{ top: '20%', right: '30%' }}
        animate={{
          y: [0, 40, 0],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          repeat: Infinity,
          repeatType: 'reverse',
          duration: 30,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
};

export default FlowingBackground;
