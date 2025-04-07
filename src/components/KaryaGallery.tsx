
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
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

  const { data: karya, isLoading, error, refetch } = useQuery({
    queryKey: ['karya'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('karya')
        .select('*')
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

  // Loading skeletons
  const SkeletonCards = () => (
    <>
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="h-full">
          <div className="rounded-3xl overflow-hidden h-full flex flex-col bg-secondary/50 border border-border/40">
            <Skeleton className="aspect-square w-full" />
            <div className="p-6 pb-3">
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2" />
            </div>
            <div className="px-6 py-3">
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-2/3" />
            </div>
            <div className="px-6 pb-6 pt-3 flex justify-between">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-12" />
            </div>
          </div>
        </div>
      ))}
    </>
  );

  return (
    <div className="container py-12">
      <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory} className="w-full">
        <div className="flex justify-center mb-8">
          <TabsList className="bg-muted/80 backdrop-blur-sm rounded-full p-1">
            <TabsTrigger value="all" className="rounded-full px-4">Semua</TabsTrigger>
            <TabsTrigger value="design" className="rounded-full px-4">Design</TabsTrigger>
            <TabsTrigger value="video" className="rounded-full px-4">Video</TabsTrigger>
            <TabsTrigger value="writing" className="rounded-full px-4">Karya Tulis</TabsTrigger>
            <TabsTrigger value="meme" className="rounded-full px-4">Meme</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value={activeCategory} className="mt-0">
          {error ? (
            <div className="text-center py-12 text-rose-500">
              <p>Terjadi kesalahan saat memuat karya. Silakan coba lagi nanti.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
            </div>
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
