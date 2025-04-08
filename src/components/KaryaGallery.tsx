
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronDown } from 'lucide-react';

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
  const [spotlightItems, setSpotlightItems] = useState<KaryaType[]>([]);

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

  const SkeletonCards = () => (
    <>
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="rounded-3xl overflow-hidden h-fit flex flex-col bg-secondary/80 backdrop-blur-md border border-border/40 shadow-lg mb-6">
          <Skeleton className="aspect-[4/3] w-full" />
          <div className="p-4 pb-2">
            <Skeleton className="h-5 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
      ))}
    </>
  );

  return (
    <div className="container py-8">
      {/* Spotlight Section */}
      {spotlightItems.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold font-serif tracking-tight text-foreground">
              {activeCategory === 'all' ? 'Karya Spotlight' : `Spotlight ${categories.find(c => c.value === activeCategory)?.label}`}
            </h2>
            <div className="flex items-center gap-2 text-sm text-foreground/60">
              <span>Featured works</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {spotlightItems.map((item, index) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="spotlight-item"
                style={{
                  '--tile-glow-color': item.category === 'design' 
                    ? 'rgba(152, 245, 225, 0.2)' 
                    : item.category === 'video' 
                    ? 'rgba(155, 109, 255, 0.2)' 
                    : item.category === 'meme' 
                    ? 'rgba(254, 198, 161, 0.2)' 
                    : 'rgba(255, 209, 220, 0.2)'
                } as React.CSSProperties}
              >
                <KaryaCard 
                  karya={item} 
                  onClick={() => handleKaryaClick(item)}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
      
      {/* Improved Category Selector */}
      <div className="mb-10">
        {isMobile ? (
          <div className="px-4">
            <Select 
              value={activeCategory} 
              onValueChange={setActiveCategory}
            >
              <SelectTrigger className="w-full bg-secondary/80 border border-border/40 backdrop-blur-md rounded-2xl text-foreground hover:bg-secondary/90 transition-colors shadow-md">
                <SelectValue>
                  <div className="flex items-center gap-2">
                    <div className="bg-white/90 p-1 rounded-full">
                      <img 
                        src={categories.find(cat => cat.value === activeCategory)?.icon || categories[0].icon} 
                        alt="" 
                        className="w-4 h-4 object-contain"
                      />
                    </div>
                    <span>{categories.find(cat => cat.value === activeCategory)?.label || 'Pilih Kategori'}</span>
                  </div>
                </SelectValue>
              </SelectTrigger>
              <SelectContent 
                className="bg-secondary/90 border-border/40 backdrop-blur-md rounded-2xl shadow-lg overflow-hidden"
                position="popper"
                sideOffset={5}
              >
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="py-1"
                >
                  {categories.map(category => (
                    <SelectItem
                      key={category.value}
                      value={category.value}
                      className="text-foreground hover:bg-foreground/10 focus:bg-foreground/10 rounded-xl my-1"
                    >
                      <div className="flex items-center gap-2">
                        <div className="bg-white/90 p-1 rounded-full">
                          <img src={category.icon} alt="" className="w-4 h-4 object-contain" />
                        </div>
                        <span>{category.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </motion.div>
              </SelectContent>
            </Select>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="inline-flex bg-secondary/70 border border-border/40 backdrop-blur-md rounded-2xl p-1.5 shadow-lg">
              {categories.map((category) => (
                <motion.button
                  key={category.value}
                  onClick={() => setActiveCategory(category.value)}
                  className={cn(
                    "relative px-5 py-2.5 rounded-xl transition-all duration-300 font-medium text-sm",
                    "hover:text-foreground focus:outline-none focus:ring-2 focus:ring-foreground/50 focus:ring-offset-1 focus:ring-offset-transparent"
                  )}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <AnimatePresence mode="wait">
                    {activeCategory === category.value && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/15 to-white/5 border border-white/20 shadow-lg"
                      />
                    )}
                  </AnimatePresence>
                  
                  <span className={cn(
                    "relative z-10 transition-colors duration-200 flex items-center gap-2",
                    activeCategory === category.value 
                      ? "text-foreground font-semibold"
                      : "text-foreground/60 hover:text-foreground/80"
                  )}>
                    <div className="bg-white/90 p-1 rounded-full">
                      <img src={category.icon} alt="" className="w-4 h-4 object-contain" />
                    </div>
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
          <div className="text-center py-12 text-rose-500 bg-secondary/30 backdrop-blur-sm rounded-3xl border border-border/30 shadow-md p-8">
            <p className="text-readable">Terjadi kesalahan saat memuat karya. Silakan coba lagi nanti.</p>
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
              <div className="text-center py-12 w-full col-span-full bg-secondary/30 backdrop-blur-sm rounded-3xl border border-border/30 shadow-md">
                <p className="text-muted-foreground text-readable">Belum ada karya dalam kategori ini.</p>
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
