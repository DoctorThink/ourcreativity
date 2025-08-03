import React from 'react';

export const LazyPageLoader: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-8 h-8 border-2 border-foreground/20 border-t-foreground rounded-full animate-spin" />
        <p className="text-foreground/70 text-sm">Memuat halaman...</p>
      </div>
    </div>
  );
};