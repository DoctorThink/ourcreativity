import React, { useState } from "react";
import { motion } from "framer-motion";
import { CategorySelector } from "./CategorySelector";
import { MasonryGrid } from "./MasonryGrid";
import KaryaDetailDialog from "../KaryaDetailDialog";
import { Database } from "@/integrations/supabase/types";
import { Skeleton } from "@/components/ui/skeleton";

type KaryaType = Database['public']['Tables']['karya']['Row'];

interface KaryaGalleryProps {
  karyaItems: KaryaType[];
  isLoading: boolean;
  isError: boolean;
  selectedCategory: string; // Added from KaryaKami
  onSelectCategory: (category: string) => void; // Added from KaryaKami
}

export const KaryaGallery: React.FC<KaryaGalleryProps> = ({ 
  karyaItems, 
  isLoading, 
  isError,
  selectedCategory, 
  onSelectCategory 
}) => {
  // const [selectedCategory, setSelectedCategory] = useState<string>("all"); // REMOVED - Now managed by KaryaKami.tsx
  const [selectedKarya, setSelectedKarya] = useState<KaryaType | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // const filteredKarya = selectedCategory === "all"  // REMOVED - Filtering is now done in KaryaKami.tsx
  //   ? karyaItems 
  //   : karyaItems?.filter(item => item.category === selectedCategory);
  // KaryaItems received here is already filtered as `displayedKarya` from parent

  const handleKaryaClick = (karya: KaryaType) => {
    setSelectedKarya(karya);
    setIsDialogOpen(true);
  };

  if (isError) {
    return (
      <div className="text-center py-12 bg-destructive/10 backdrop-blur-sm rounded-3xl border border-destructive/30 shadow-md">
        <p className="text-destructive-foreground">Gagal memuat karya. Silakan coba lagi nanti.</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <CategorySelector 
        selectedCategory={selectedCategory} // Pass down from props
        onSelectCategory={onSelectCategory} // Pass down from props
      />
      
      <div className="mt-8">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="rounded-3xl overflow-hidden bg-secondary/80 backdrop-blur-md border border-border/30">
                <Skeleton className="w-full h-64" />
                <div className="p-4">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : karyaItems && karyaItems.length > 0 ? ( // Use karyaItems directly
          <MasonryGrid 
            items={karyaItems} // Use karyaItems directly
            onKaryaClick={handleKaryaClick}
          />
        ) : (
          <div className="text-center py-12 bg-secondary/30 backdrop-blur-sm rounded-3xl border border-border/30 shadow-md">
            <p className="text-foreground/70">Tidak ada karya dalam kategori ini.</p>
          </div>
        )}
      </div>

      {selectedKarya && (
        <KaryaDetailDialog
          karya={selectedKarya}
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
        />
      )}
    </motion.div>
  );
};
