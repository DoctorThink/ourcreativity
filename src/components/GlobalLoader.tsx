import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface GlobalLoaderProps {
  onLoadComplete: () => void;
}

export const GlobalLoader: React.FC<GlobalLoaderProps> = ({ onLoadComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [loadingStage, setLoadingStage] = useState('Memuat aplikasi...');

  useEffect(() => {
    // Simulate realistic loading stages
    const loadingStages = [
      { text: 'Memuat aplikasi...', duration: 500, progress: 20 },
      { text: 'Menghubungkan ke server...', duration: 300, progress: 40 },
      { text: 'Memuat komponen...', duration: 400, progress: 70 },
      { text: 'Menyiapkan konten...', duration: 300, progress: 90 },
      { text: 'Hampir selesai...', duration: 200, progress: 100 }
    ];

    let currentStage = 0;
    let currentProgress = 0;

    const advanceStage = () => {
      if (currentStage < loadingStages.length) {
        const stage = loadingStages[currentStage];
        setLoadingStage(stage.text);
        
        // Smooth progress animation
        const progressInterval = setInterval(() => {
          currentProgress += Math.random() * 8 + 2;
          if (currentProgress >= stage.progress) {
            currentProgress = stage.progress;
            clearInterval(progressInterval);
            
            if (currentStage === loadingStages.length - 1) {
              // Loading complete
              setTimeout(() => {
                setIsComplete(true);
                setTimeout(onLoadComplete, 500);
              }, 300);
            } else {
              currentStage++;
              setTimeout(advanceStage, 100);
            }
          }
          setProgress(currentProgress);
        }, 50);
      }
    };

    // Start loading simulation
    const timer = setTimeout(advanceStage, 200);
    return () => clearTimeout(timer);
  }, [onLoadComplete]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col items-center space-y-8 max-w-sm w-full px-6">
            {/* Animated Logo */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <motion.div
                className="w-24 h-24 rounded-full bg-gradient-to-r from-amethyst via-turquoise to-coral p-1"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                  <img 
                    src="/lovable-uploads/c861a7c0-5ec9-4bac-83ea-319c40fcb001.png" 
                    alt="OurCreativity Logo" 
                    className="w-14 h-14 object-contain"
                  />
                </div>
              </motion.div>
            </motion.div>

            {/* Brand and Loading Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <h2 className="text-3xl font-serif font-bold text-foreground mb-2">
                OurCreativity
              </h2>
              <motion.p 
                className="text-foreground/70 font-sans"
                key={loadingStage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {loadingStage}
              </motion.p>
            </motion.div>

            {/* Enhanced Progress Bar */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="w-full"
            >
              <div className="w-full h-3 bg-secondary rounded-full overflow-hidden relative">
                <motion.div
                  className="h-full bg-gradient-to-r from-amethyst via-turquoise to-coral rounded-full relative"
                  initial={{ width: '0%' }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                >
                  {/* Shimmer effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    initial={{ x: '-100%' }}
                    animate={{ x: '100%' }}
                    transition={{ 
                      duration: 1.5, 
                      repeat: Infinity, 
                      ease: 'easeInOut' 
                    }}
                  />
                </motion.div>
              </div>
              
              {/* Progress Percentage */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-center mt-3 text-foreground/60 font-mono text-sm"
              >
                {Math.round(progress)}%
              </motion.div>
            </motion.div>

            {/* Loading tips */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-center text-xs text-foreground/50"
            >
              Platform kreativitas untuk komunitas Indonesia
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};