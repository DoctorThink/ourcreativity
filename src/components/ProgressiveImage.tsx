import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ProgressiveImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number | string;
  height?: number | string;
  placeholder?: string;
  lowQualitySrc?: string;
  loading?: 'lazy' | 'eager';
  onLoad?: () => void;
  onError?: () => void;
}

export const ProgressiveImage: React.FC<ProgressiveImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  placeholder,
  lowQualitySrc,
  loading = 'lazy',
  onLoad,
  onError
}) => {
  const [imageState, setImageState] = useState<'loading' | 'low-quality' | 'loaded' | 'error'>('loading');
  const [isInView, setIsInView] = useState(loading === 'eager');
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (loading === 'eager' || !containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [loading]);

  // Load low quality image first, then high quality
  useEffect(() => {
    if (!isInView) return;

    const loadImage = (source: string, isLowQuality = false) => {
      const img = new Image();
      img.onload = () => {
        if (isLowQuality) {
          setImageState('low-quality');
          // Immediately start loading high quality
          loadImage(src, false);
        } else {
          setImageState('loaded');
          onLoad?.();
        }
      };
      img.onerror = () => {
        setImageState('error');
        onError?.();
      };
      img.src = source;
    };

    if (lowQualitySrc) {
      loadImage(lowQualitySrc, true);
    } else {
      loadImage(src, false);
    }
  }, [isInView, src, lowQualitySrc, onLoad, onError]);

  const containerClasses = cn(
    'relative overflow-hidden bg-secondary/20',
    className
  );

  const imageStyle = {
    width: width || '100%',
    height: height || '100%',
  };

  return (
    <div 
      ref={containerRef} 
      className={containerClasses}
      style={imageStyle}
    >
      <AnimatePresence mode="wait">
        {/* Loading skeleton */}
        {imageState === 'loading' && (
          <motion.div
            key="skeleton"
            className="absolute inset-0 bg-secondary/30 animate-pulse"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {placeholder && (
              <div className="absolute inset-0 flex items-center justify-center text-secondary-foreground/50">
                {placeholder}
              </div>
            )}
          </motion.div>
        )}

        {/* Low quality image (blurred) */}
        {imageState === 'low-quality' && lowQualitySrc && (
          <motion.img
            key="low-quality"
            ref={imgRef}
            src={lowQualitySrc}
            alt={alt}
            className="absolute inset-0 w-full h-full object-cover filter blur-sm scale-105"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            decoding="async"
          />
        )}

        {/* High quality image */}
        {imageState === 'loaded' && (
          <motion.img
            key="high-quality"
            src={src}
            alt={alt}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            decoding="async"
          />
        )}

        {/* Error state */}
        {imageState === 'error' && (
          <motion.div
            key="error"
            className="absolute inset-0 bg-secondary/20 flex items-center justify-center text-secondary-foreground/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center">
              <div className="text-xl mb-2">📷</div>
              <div className="text-sm">Gagal memuat gambar</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};