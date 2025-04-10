
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
          <div className="rounded-3xl overflow-hidden h-fit flex flex-col bg-secondary/80 backdrop-blur-md border border-white/10 shadow-lg">
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

  // Empty state with improved design
  const EmptyState = () => (
    <div className="text-center py-16 w-full col-span-full bg-secondary/40 backdrop-blur-lg rounded-3xl border border-white/10 shadow-md">
      <div className="flex flex-col items-center gap-4">
        <div className="bg-foreground/5 p-4 rounded-full border border-white/10 shadow-inner">
          <FolderOpen className="h-12 w-12 text-foreground/30" />
        </div>
        <div>
          <h3 className="text-lg font-medium text-foreground/90 mb-1">Belum Ada Karya</h3>
          <p className="text-muted-foreground text-readable max-w-md mx-auto">
            Belum ada karya dalam kategori ini. Silakan pilih kategori lain atau unggah karya baru.
          </p>
        </div>
      </div>
    </div>
  );

  // Error state with improved design
  const ErrorState = () => (
    <div className="text-center py-12 text-rose-500 bg-secondary/40 backdrop-blur-lg rounded-3xl border border-rose-500/20 shadow-md p-8">
      <div className="flex flex-col items-center gap-4">
        <div className="bg-rose-500/10 p-4 rounded-full border border-rose-500/20">
          <AlertCircle className="h-12 w-12 text-rose-400" />
        </div>
        <div>
          <h3 className="text-lg font-medium text-rose-400 mb-1">Gagal Memuat</h3>
          <p className="text-readable text-foreground/80">
            Terjadi kesalahan saat memuat karya. Silakan coba lagi nanti.
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="min-h-[300px]"
    >
      {error ? (
        <ErrorState />
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
            <EmptyState />
          )}
        </Masonry>
      )}
    </motion.div>
  );
};

export default MasonryGrid;
