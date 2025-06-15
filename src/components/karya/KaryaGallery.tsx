
import React, { useState } from "react";
import { MasonryGrid } from "./MasonryGrid";
import { Database } from "@/integrations/supabase/types";
import { Skeleton } from "@/components/ui/skeleton";
import { StandardCard } from "@/components/ui/StandardCard";

type KaryaType = Database['public']['Tables']['karya']['Row'];

interface KaryaGalleryProps {
  karyaData: KaryaType[];
  isLoading: boolean;
  onKaryaSelect: (karya: KaryaType) => void;
  onDialogOpen: (isOpen: boolean) => void;
}

export const KaryaGallery: React.FC<KaryaGalleryProps> = ({ 
  karyaData, 
  isLoading, 
  onKaryaSelect,
  onDialogOpen
}) => {
  const handleKaryaClick = (karya: KaryaType) => {
    onKaryaSelect(karya);
    onDialogOpen(true);
  };

  return (
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
          <p className="text-foreground/70 font-sans text-lg">Tidak ada karya yang ditemukan.</p>
        </StandardCard>
      )}
    </div>
  );
};
