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

  // Updated breakpoints for better responsiveness, reducing max columns
  const breakpointColumnsObj = {
    default: 3, // Max 3 columns for very large screens
    1280: 3,   // lg breakpoint (3 columns)
    1024: 2,   // md breakpoint (2 columns)
    768: 2,    // sm breakpoint (2 columns)
    640: 1     // xs breakpoint (1 column)
  };

  const { data: karya, isLoading, error, refetch } = useQuery({
    queryKey: ['karya'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('karya')
        .select('*')
        .eq('status', 'approved') // Only show approved karya
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

  // Loading skeletons - adjusted for masonry item structure
  const SkeletonCards = () => (
    <>
      {Array.from({ length: 6 }).map((_, i) => (
        // Each skeleton is now a direct child for Masonry
        <div key={i} className="rounded-3xl overflow-hidden h-fit flex flex-col bg-secondary-dark border border-grayMid/30 mb-6"> {/* Use updated colors and add bottom margin */}
          <Skeleton className="aspect-[4/3] w-full" /> {/* Adjust aspect ratio if needed */}
          <div className="p-4 pb-2"> {/* Adjusted padding */}
            <Skeleton className="h-5 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2" />
          </div>
          <div className="px-4 py-2"> {/* Adjusted padding */}
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-2/3" />
          </div>
          <div className="px-4 pb-4 pt-2 flex justify-between"> {/* Adjusted padding */}
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-12" />
          </div>
        </div>
      ))}
    </>
  );

  return (
    <div className="py-12 px-6"> {/* Removed 'container', added px-6 */}
      <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory} className="w-full">
        <div className="flex justify-center mb-8">
          {/* Updated TabsList styling */}
          <TabsList className="bg-gradient-to-b from-grayMid/10 to-grayDark/20 border border-grayLight/10 backdrop-blur-md rounded-full p-1.5 shadow-inner shadow-black/20">
            <TabsTrigger value="all" className="rounded-full px-5 py-1.5 text-sm data-[state=active]:bg-white/10 data-[state=active]:text-white hover:bg-grayMid/10 transition-colors">Semua</TabsTrigger>
            <TabsTrigger value="design" className="rounded-full px-5 py-1.5 text-sm data-[state=active]:bg-white/10 data-[state=active]:text-white hover:bg-grayMid/10 transition-colors">Design</TabsTrigger>
            <TabsTrigger value="video" className="rounded-full px-5 py-1.5 text-sm data-[state=active]:bg-white/10 data-[state=active]:text-white hover:bg-grayMid/10 transition-colors">Video</TabsTrigger>
            <TabsTrigger value="writing" className="rounded-full px-5 py-1.5 text-sm data-[state=active]:bg-white/10 data-[state=active]:text-white hover:bg-grayMid/10 transition-colors">Karya Tulis</TabsTrigger>
            <TabsTrigger value="meme" className="rounded-full px-5 py-1.5 text-sm data-[state=active]:bg-white/10 data-[state=active]:text-white hover:bg-grayMid/10 transition-colors">Meme</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value={activeCategory} className="mt-0">
          {error ? (
            <div className="text-center py-12 text-rose-500">
              <p>Terjadi kesalahan saat memuat karya. Silakan coba lagi nanti.</p>
            </div>
          ) : (
            /* Masonry layout replaces the previous grid */
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="my-masonry-grid" /* Add styles for this class in index.css */
              columnClassName="my-masonry-grid_column" /* Add styles for this class in index.css */
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
                /* Display message when no karya found in the category */
                /* Note: This will render inside the Masonry container. Consider moving it outside if needed. */
                <div className="text-center py-12 w-full col-span-full"> {/* Ensure it spans columns if needed, though Masonry handles placement */}
                  <p className="text-muted-foreground">Belum ada karya dalam kategori ini.</p>
                </div>
              )}
            </Masonry>
          )}
        </TabsContent>
      </Tabs>

      {/* Conditional rendering for the detail dialog */}
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
