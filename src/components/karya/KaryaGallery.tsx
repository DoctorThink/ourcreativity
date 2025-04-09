
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';
import KaryaDetailDialog from '@/components/KaryaDetailDialog';
import CategorySelector, { CategoryOption } from './CategorySelector';
import SpotlightSection from './SpotlightSection';
import MasonryGrid from './MasonryGrid';

type KaryaType = Database['public']['Tables']['karya']['Row'];

// Define categories
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
  const [spotlightItems, setSpotlightItems] = useState<KaryaType[]>([]);

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

  // Set spotlight items based on is_spotlight flag and category
  useEffect(() => {
    if (!karya) return;
    
    let filteredItems = [...karya].filter(item => item.is_spotlight);
    if (activeCategory !== 'all') {
      filteredItems = filteredItems.filter(item => item.category === activeCategory);
    }
    
    setSpotlightItems(filteredItems);
  }, [karya, activeCategory]);

  const handleKaryaClick = (item: KaryaType) => {
    setSelectedKarya(item);
    setIsDialogOpen(true);
  };

  const filteredKarya = karya?.filter(item => 
    activeCategory === 'all' || item.category === activeCategory
  );

  return (
    <div className="container py-8">
      {/* Spotlight Section */}
      <SpotlightSection
        spotlightItems={spotlightItems}
        activeCategory={activeCategory}
        categories={categories}
        onKaryaClick={handleKaryaClick}
      />
      
      {/* Category Selector */}
      <CategorySelector 
        categories={categories}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      {/* Gallery Content - Masonry Grid */}
      <MasonryGrid
        isLoading={isLoading}
        error={error as Error | null}
        filteredKarya={filteredKarya}
        onKaryaClick={handleKaryaClick}
      />

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
