import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import Masonry from 'react-masonry-css';
import { Database } from '@/integrations/supabase/types';
import KaryaCard from './KaryaCard';
import KaryaDetailDialog from './KaryaDetailDialog';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { ChevronDown } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
      {/* Responsive Category Selector */}
      <div className="mb-8">
        {isMobile ? (
          <div className="px-4">
            <Select value={activeCategory} onValueChange={setActiveCategory}>
              <SelectTrigger className="w-full bg-gradient-to-b from-grayMid/10 to-grayDark/20 border-grayLight/10 backdrop-blur-md text-white hover:bg-grayMid/20 transition-colors">
                <SelectValue>
                  {categories.find(cat => cat.value === activeCategory)?.label || 'Pilih Kategori'}
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="bg-secondary border-grayLight/10 backdrop-blur-md">
                {categories.map(category => (
                  <SelectItem
                    key={category.value}
                    value={category.value}
                    className="text-foreground hover:bg-grayMid/20 focus:bg-grayMid/20"
                  >
                    <div className="flex items-center gap-2">
                      <img src={category.icon} alt="" className="w-4 h-4 object-contain" />
                      <span>{category.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="inline-flex bg-gradient-to-b from-grayMid/10 to-grayDark/20 border border-grayLight/10 backdrop-blur-md rounded-full p-1.5 shadow-inner shadow-black/20">
              {categories.map((category) => (
                <motion.button
                  key={category.value}
                  onClick={() => setActiveCategory(category.value)}
                  className={cn(
                    "relative px-5 py-2 rounded-full transition-all duration-300 font-medium text-sm",
                    "hover:text-white focus:outline-none focus:ring-2 focus:ring-grayLight/50 focus:ring-offset-1 focus:ring-offset-transparent"
                  )}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeCategory === category.value ? 'active' : 'inactive'}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className={cn(
                        "absolute inset-0 rounded-full",
                        activeCategory === category.value 
                          ? "bg-gradient-to-b from-white/15 to-white/5 border border-white/20 shadow-lg"
                          : "bg-transparent"
                      )}
                    />
                  </AnimatePresence>
                  
                  <span className={cn(
                    "relative z-10 transition-colors duration-200",
                    activeCategory === category.value 
                      ? "text-white font-semibold"
                      : "text-gray-400 hover:text-gray-300"
                  )}>
                    {category.label}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
        )}
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
