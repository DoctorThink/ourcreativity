import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import Masonry from 'react-masonry-css'; // Import Masonry
import { Database } from '@/integrations/supabase/types';
import KaryaCard from './KaryaCard';
import KaryaDetailDialog from './KaryaDetailDialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';

type KaryaType = Database['public']['Tables']['karya']['Row'];

const KaryaGallery = () => {
  const [selectedKarya, setSelectedKarya] = useState<KaryaType | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Optimized breakpoints for better layout across all screen sizes
  const breakpointColumnsObj = {
    default: 4,    // >= 1536px: 4 columns
    1536: 3,       // 1280px - 1535px: 3 columns
    1280: 3,       // 1024px - 1279px: 3 columns
    1024: 2,       // 768px - 1023px: 2 columns
    768: 2,        // 640px - 767px: 2 columns
    640: 1         // < 640px: 1 column
  };

  // Query with error boundary and loading state
  const { data: karya, isLoading, error, refetch } = useQuery({
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

  // Loading skeletons optimized for masonry layout
  const SkeletonCards = () => (
    <>
      {Array.from({ length: 8 }).map((_, i) => (
        <div 
          key={i} 
          className="mb-6 rounded-3xl overflow-hidden bg-secondary-dark border border-grayMid/30"
        >
          <div className="relative">
            <div className="w-full" style={{ paddingBottom: `${Math.random() * 30 + 70}%` }}>
              <Skeleton className="absolute inset-0" />
            </div>
          </div>
          <div className="p-4">
            <Skeleton className="h-5 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
      ))}
    </>
  );

  return (
    <div className="container max-w-[1920px] py-12">
      <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory}>
        <div className="flex justify-center mb-8">
          <TabsList className="bg-gradient-to-b from-grayMid/10 to-grayDark/20 border border-grayLight/10 backdrop-blur-md rounded-full p-1.5 shadow-inner shadow-black/20">
            <TabsTrigger value="all" className="rounded-full px-5 py-1.5 text-sm data-[state=active]:bg-white/10 data-[state=active]:text-white hover:bg-grayMid/10 transition-colors">Semua</TabsTrigger>
            <TabsTrigger value="design" className="rounded-full px-5 py-1.5 text-sm data-[state=active]:bg-white/10 data-[state=active]:text-white hover:bg-grayMid/10 transition-colors">Design</TabsTrigger>
            <TabsTrigger value="video" className="rounded-full px-5 py-1.5 text-sm data-[state=active]:bg-white/10 data-[state=active]:text-white hover:bg-grayMid/10 transition-colors">Video</TabsTrigger>
            <TabsTrigger value="writing" className="rounded-full px-5 py-1.5 text-sm data-[state=active]:bg-white/10 data-[state=active]:text-white hover:bg-grayMid/10 transition-colors">Karya Tulis</TabsTrigger>
            <TabsTrigger value="meme" className="rounded-full px-5 py-1.5 text-sm data-[state=active]:bg-white/10 data-[state=active]:text-white hover:bg-grayMid/10 transition-colors">Meme</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value={activeCategory} className="mt-0 focus-visible:outline-none">
          {error ? (
            <div className="text-center py-12">
              <div className="max-w-md mx-auto p-4 rounded-lg bg-rose-500/10 border border-rose-500/20">
                <p className="text-rose-500">Terjadi kesalahan saat memuat karya. Silakan coba lagi nanti.</p>
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
                    onClick={() => handleKaryaClick(item)}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-muted-foreground">Belum ada karya dalam kategori ini.</p>
                </div>
              )}
            </Masonry>
          )}
        </TabsContent>
      </Tabs>

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
