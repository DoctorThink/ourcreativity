
import React, { useState } from "react";
import { motion } from "framer-motion";
import { CategorySelector } from "./CategorySelector";
import { MasonryGrid } from "./MasonryGrid";
import KaryaDetailDialog from "../KaryaDetailDialog";
import { Database } from "@/integrations/supabase/types";
import { Skeleton } from "@/components/ui/skeleton";
import { StandardCard } from "@/components/ui/StandardCard";

type KaryaType = Database['public']['Tables']['karya']['Row'];

interface KaryaGalleryProps {
  karyaData: KaryaType[];
  isLoading: boolean;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export const KaryaGallery: React.FC<KaryaGalleryProps> = ({ 
  karyaData, 
  isLoading, 
  selectedCategory, 
  onSelectCategory 
}) => {
  const [selectedKarya, setSelectedKarya] = useState<KaryaType | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleKaryaClick = (karya: KaryaType) => {
    setSelectedKarya(karya);
    setIsDialogOpen(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <CategorySelector 
        selectedCategory={selectedCategory} 
        onSelectCategory={onSelectCategory}
      />
      
      <div className="mt-12">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <StandardCard key={index}>
                <Skeleton className="w-full h-64 mb-4" />
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </StandardCard>
            ))}
          </div>
        ) : karyaData && karyaData.length > 0 ? (
          <MasonryGrid 
            items={karyaData} 
            onKaryaClick={handleKaryaClick}
          />
        ) : (
          <StandardCard className="text-center py-12">
            <p className="text-foreground/70 font-sans text-lg">Tidak ada karya dalam kategori ini.</p>
          </StandardCard>
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
