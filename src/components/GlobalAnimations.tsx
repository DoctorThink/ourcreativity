
import React from 'react';
import { motion } from 'framer-motion';

export const GlobalAnimations: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none -z-10">
      {/* Background Gradient Orbs */}
      <div className="absolute w-[80vw] h-[80vh] rounded-full bg-gradient-radial from-amethyst/20 via-amethyst/5 to-transparent -top-[15%] -right-[15%] filter blur-[120px] animate-float"></div>
      <div className="absolute w-[70vw] h-[70vh] rounded-full bg-gradient-radial from-turquoise/20 via-turquoise/5 to-transparent -bottom-[15%] -left-[15%] filter blur-[150px] animate-float-slow"></div>
      <div className="absolute w-[60vw] h-[60vh] rounded-full bg-gradient-radial from-coral/15 via-coral/5 to-transparent -bottom-[5%] -right-[5%] filter blur-[130px] opacity-70 animate-float-reverse"></div>
      
      {/* Secondary subtle gradients */}
      <div className="absolute w-[40vw] h-[40vh] rounded-full bg-gradient-radial from-softPink/10 via-softPink/3 to-transparent top-[10%] left-[15%] filter blur-[100px] opacity-50 animate-float-slow-reverse"></div>
      <div className="absolute w-[35vw] h-[35vh] rounded-full bg-gradient-radial from-mint/15 via-mint/3 to-transparent bottom-[20%] right-[20%] filter blur-[90px] opacity-60 animate-pulse-slow"></div>

      {/* Noise Overlay */}
      <div className="absolute inset-0 noise-pattern opacity-[0.04] z-10"></div>
      
      {/* Subtle grid overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] z-0"></div>
    </div>
  );
};

export default GlobalAnimations;
