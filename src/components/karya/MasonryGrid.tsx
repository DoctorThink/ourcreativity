
import React from 'react';
import { motion } from 'framer-motion';
import Masonry from 'react-masonry-css';
import { Database } from '@/integrations/supabase/types';
import KaryaCard from '@/components/KaryaCard';
import { Skeleton } from '@/components/ui/skeleton';
import { FolderOpen, AlertCircle } from 'lucide-react';

type KaryaType = Database['public']['Tables']['karya']['Row'];

interface MasonryGridProps {
  isLoading: boolean;
  error: Error | null;
  filteredKarya: KaryaType[] | undefined;
  onKaryaClick: (karya: KaryaType) => void;
}

const MasonryGrid: React.FC<MasonryGridProps> = ({
  isLoading,
  error,
  filteredKarya,
  onKaryaClick
}) => {
  // Responsive breakpoint columns for masonry layout
  const breakpointColumnsObj = {
    default: 4,
    1536: 3,
    1280: 3,
    1024: 2,
    768: 2,
    640: 1
  };

  // Skeleton loader cards with better aspect ratio handling
  const SkeletonCards = () => (
    <>
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="mb-6">
          <div className="rounded-3xl overflow-hidden h-fit flex flex-col bg-secondary/80 backdrop-blur-md border border-border/40 shadow-lg">
            <Skeleton className="w-full" style={{ aspectRatio: i % 2 === 0 ? '4/3' : '1/1' }} />
            <div className="p-4 pb-2">
              <Skeleton className="h-5 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </div>
        </div>
      ))}
    </>
  );

  // Animation variants
  const containerVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      {error ? (
        <div className="text-center py-12 text-rose-500 bg-secondary/30 backdrop-blur-sm rounded-3xl border border-border/30 shadow-md p-8">
          <div className="flex flex-col items-center gap-4">
            <AlertCircle className="h-12 w-12 text-rose-400" />
            <p className="text-readable">Terjadi kesalahan saat memuat karya. Silakan coba lagi nanti.</p>
          </div>
        </div>
      ) : (
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {isLoading ? (
            <SkeletonCards />
          ) : filteredKarya && filteredKarya.length > 0 ? (
            filteredKarya.map((item) => (
              <KaryaCard
                key={item.id}
                karya={item}
                onClick={() => onKaryaClick(item)}
              />
            ))
          ) : (
            <div className="text-center py-16 w-full col-span-full bg-secondary/30 backdrop-blur-sm rounded-3xl border border-border/30 shadow-md">
              <div className="flex flex-col items-center gap-4">
                <div className="bg-foreground/5 p-4 rounded-full">
                  <FolderOpen className="h-12 w-12 text-foreground/30" />
                </div>
                <p className="text-muted-foreground text-readable max-w-md mx-auto">
                  Belum ada karya dalam kategori ini. Silakan pilih kategori lain atau unggah karya baru.
                </p>
              </div>
            </div>
          )}
        </Masonry>
      )}
    </motion.div>
  );
};

export default MasonryGrid;
