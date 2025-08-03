// Performance monitoring utilities

// Track Core Web Vitals
export const trackWebVitals = () => {
  if (typeof window === 'undefined') return;

  // Track FCP (First Contentful Paint)
  try {
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const fcpEntry = entries.find(entry => entry.name === 'first-contentful-paint');
      if (fcpEntry) {
        console.log('FCP:', fcpEntry.startTime);
        // Send to analytics if needed
      }
    }).observe({ entryTypes: ['paint'] });
  } catch (e) {
    // Fallback for browsers that don't support PerformanceObserver
  }

  // Track LCP (Largest Contentful Paint)
  try {
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      console.log('LCP:', lastEntry.startTime);
      // Send to analytics if needed
    }).observe({ entryTypes: ['largest-contentful-paint'] });
  } catch (e) {
    // Fallback for browsers that don't support PerformanceObserver
  }

  // Track CLS (Cumulative Layout Shift)
  try {
    new PerformanceObserver((list) => {
      let cls = 0;
      const entries = list.getEntries();
      entries.forEach((entry: any) => {
        if (!entry.hadRecentInput) {
          cls += entry.value;
        }
      });
      console.log('CLS:', cls);
      // Send to analytics if needed
    }).observe({ entryTypes: ['layout-shift'] });
  } catch (e) {
    // Fallback for browsers that don't support PerformanceObserver
  }
};

// Preload critical resources
export const preloadCriticalResources = () => {
  // Preload critical images
  const criticalImages = [
    '/lovable-uploads/c861a7c0-5ec9-4bac-83ea-319c40fcb001.png'
  ];

  criticalImages.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });
};

// Lazy load non-critical resources
export const lazyLoadResources = () => {
  // Implement intersection observer for images
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
          }
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }
};