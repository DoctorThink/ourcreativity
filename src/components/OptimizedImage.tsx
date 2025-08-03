import React from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  loading = 'lazy'
}) => {
  // For the problematic large logo, we'll use appropriate sizes
  const isLargeLogo = src.includes('c861a7c0-5ec9-4bac-83ea-319c40fcb001.png');
  
  if (isLargeLogo) {
    // Use CSS to constrain the large image properly
    return (
      <img
        src={src}
        alt={alt}
        className={`${className} object-contain`}
        width={width}
        height={height}
        loading={loading}
        style={{
          maxWidth: width ? `${width}px` : '100%',
          maxHeight: height ? `${height}px` : '100%',
          width: 'auto',
          height: 'auto',
        }}
        // Add decoding attribute for better performance
        decoding="async"
      />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      width={width}
      height={height}
      loading={loading}
      decoding="async"
    />
  );
};