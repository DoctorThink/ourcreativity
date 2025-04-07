import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import Masonry from 'react-masonry-css';
import { Database } from '@/integrations/supabase/types';
import KaryaCard from './KaryaCard';
import KaryaDetailDialog from './KaryaDetailDialog';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

type KaryaType = Database['public']['Tables']['karya']['Row'];

interface CategoryOption {
  value: string;
  label: string;
  icon: string;
}

const categories: CategoryOption[] = [
  { value: 'all', label: 'Semua', icon: '/lovable-uploads/design.png' },
  { value: 'design', label: 'Design', icon: '/lovable-uploads/design.png' },
  { value: 'video', label: 'Video', icon: '/lovable-uploads/video.png' },
  { value: 'writing', label: 'Karya Tulis', icon: '/lovable-uploads/karyatulis.png' },
  { value: 'meme', label: 'Meme', icon: '/lovable-uploads/meme.png' },
];

const KaryaGallery = () => {
  const [selectedKarya, setSelectedKarya] = useState<KaryaType | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Updated breakpoints for better responsiveness
  const breakpointColumnsObj = {
    default: 4,
    1536: 3,
    1280: 3,
    1024: 2,
    768: 2,
    640: 1
  };

  const { data: karya, isLoading, error } = useQuery({
    queryKey: ['karya'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('karya')
        .select('*')
        .eq('status', 'approved')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as KaryaType[];
    },
  });

  const handleKaryaClick = (item: KaryaType) => {
    setSelectedKarya(item);
    setIsDialogOpen(true);
  };

  const filteredKarya = karya?.filter(item => 
    activeCategory === 'all' || item.category === activeCategory
  );

  // Loading skeletons for the masonry layout
  const SkeletonCards = () => (
    <>
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="rounded-3xl overflow-hidden h-fit flex flex-col bg-secondary-dark border border-grayMid/30 mb-6">
          <Skeleton className="aspect-[4/3] w-full" />
          <div className="p-4 pb-2">
            <Skeleton className="h-5 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2" />
          </div>
          <div className="px-4 py-2">
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
      ))}
    </>
  );

  return (
    <div className="container py-12">
      {/* Modern Category Selector */}
      <div className="flex justify-center mb-8 relative">
        {/* Scrollable container for mobile */}
        <div className="overflow-x-auto max-w-full pb-4 px-4 -mx-4 scrollbar-hide">
          <div className="flex space-x-2 min-w-max mx-auto bg-gradient-to-b from-grayMid/10 to-grayDark/20 border border-grayLight/10 backdrop-blur-md rounded-full p-1.5 shadow-inner shadow-black/20">
            {categories.map((category) => (
              <motion.button
                key={category.value}
                onClick={() => setActiveCategory(category.value)}
                className={cn(
                  "relative px-5 py-2 rounded-full transition-all duration-200 font-medium text-sm",
                  "hover:text-white focus:outline-none focus:ring-2 focus:ring-grayLight/50 focus:ring-offset-1 focus:ring-offset-transparent",
                  activeCategory === category.value
                    ? "text-white"
                    : "text-gray-400 hover:text-gray-300"
                )}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.span
                  className="relative z-10"
                  initial={false}
                  animate={{
                    color: activeCategory === category.value ? "#FFFFFF" : "#9CA3AF"
                  }}
                >
                  {category.label}
                </motion.span>
                
                {/* Active pill background */}
                {activeCategory === category.value && (
                  <motion.div
                    layoutId="activeBackground"
                    className="absolute inset-0 bg-gradient-to-b from-white/15 to-white/5 rounded-full shadow-lg border border-white/20"
                    initial={false}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {error ? (
          <div className="text-center py-12 text-rose-500">
            <p>Terjadi kesalahan saat memuat karya. Silakan coba lagi nanti.</p>
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
                  onClick={() => handleKaryaClick(item)}
                />
              ))
            ) : (
              <div className="text-center py-12 w-full col-span-full">
                <p className="text-muted-foreground">Belum ada karya dalam kategori ini.</p>
              </div>
            )}
          </Masonry>
        )}
      </motion.div>

      {/* Detail Dialog */}
      {selectedKarya && (
        <KaryaDetailDialog
          karya={selectedKarya}
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
        />
      )}
    </div>
  );
};

export default KaryaGallery;
