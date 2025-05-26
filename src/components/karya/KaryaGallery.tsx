import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CategorySelector } from "./CategorySelector";
import { MasonryGrid } from "./MasonryGrid";
import KaryaDetailDialog from "../KaryaDetailDialog";
import { Database } from "@/integrations/supabase/types";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

type KaryaType = Database['public']['Tables']['karya']['Row'];

// Mock data for demonstration when not connected to Supabase
const mockKarya = [
  {
    id: "1",
    title: "Digital Art Exploration",
    description: "A creative experiment with digital brushes and textures #digitalart #creative #design",
    image_url: "/placeholder.svg",
    media_urls: ["/placeholder.svg"],
    category: "design",
    created_at: "2023-04-15",
    updated_at: "2023-04-15",
    creator_name: "Andi Susanto",
    status: "approved",
    is_spotlight: true,
    media_width: 800,
    media_height: 600,
    link_url: "https://example.com/design",
    content_url: null,
    likes_count: 0
  },
  {
    id: "2",
    title: "Motion Graphics Demo",
    description: "Animation showcase using After Effects #animation #motiongraphics #aftereffects",
    image_url: "/placeholder.svg",
    media_urls: ["/placeholder.svg"],
    category: "video",
    created_at: "2023-05-22",
    updated_at: "2023-05-22",
    creator_name: "Dina Pratiwi",
    status: "approved",
    is_spotlight: false,
    media_width: 1280,
    media_height: 720,
    link_url: "https://example.com/video",
    content_url: null,
    likes_count: 0
  },
  {
    id: "3",
    title: "UI Design Collection",
    description: "Mobile app interface concepts #ui #mobile #design",
    image_url: "/placeholder.svg",
    media_urls: ["/placeholder.svg"],
    category: "design",
    created_at: "2023-03-10",
    updated_at: "2023-03-10",
    creator_name: "Rama Wijaya",
    status: "approved",
    is_spotlight: true,
    media_width: 1200,
    media_height: 800,
    link_url: "https://example.com/uidesign",
    content_url: null,
    likes_count: 0
  },
  {
    id: "4",
    title: "Meme of the Week",
    description: "Humor content about creativity #meme #funny #creative",
    image_url: "/placeholder.svg",
    media_urls: ["/placeholder.svg"],
    category: "meme",
    created_at: "2023-06-05",
    updated_at: "2023-06-05",
    creator_name: "Satria Budi",
    status: "approved",
    is_spotlight: false,
    media_width: 600,
    media_height: 600,
    link_url: null,
    content_url: null,
    likes_count: 0
  },
  {
    id: "5",
    title: "Essay on Modern Art",
    description: "Seni modern, atau sering disebut sebagai seni kontemporer, adalah ekspresi artistik yang berkembang pada akhir abad ke-19 hingga masa kini. Berbeda dengan seni tradisional yang menekankan keindahan dan representasi realistis, seni modern lebih menekankan eksperimen, kebebasan berekspresi, dan eksplorasi ide-ide baru. \n\nBeberapa gerakan penting dalam seni modern termasuk impresionisme, ekspresionisme, kubisme, surealisme, dan abstrakisme. Setiap gerakan membawa perspektif unik dan teknik baru dalam dunia seni.\n\n#senimodern #essay #writing #kritik #seni",
    image_url: null,
    media_urls: [],
    category: "writing",
    created_at: "2023-05-18",
    updated_at: "2023-05-18",
    creator_name: "Nina Amelia",
    status: "approved",
    is_spotlight: true,
    media_width: null,
    media_height: null,
    link_url: "https://example.com/essay",
    content_url: "https://example.com/essay/content",
    likes_count: 0
  },
  {
    id: "6",
    title: "Indie Game Concept",
    description: "Early development of a 2D platformer #game #indie #platformer",
    image_url: "/placeholder.svg",
    media_urls: ["/placeholder.svg"],
    category: "game",
    created_at: "2023-04-30",
    updated_at: "2023-04-30",
    creator_name: "Budi Santoso",
    status: "approved",
    is_spotlight: false,
    media_width: 1600,
    media_height: 900,
    link_url: "https://example.com/game",
    content_url: null,
    likes_count: 0
  }
];

export const KaryaGallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedKarya, setSelectedKarya] = useState<KaryaType | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Query for fetching karya data from Supabase
  const { data: karyaData, isLoading } = useQuery({
    queryKey: ['karya'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('karya')
          .select('*')
          .eq('status', 'approved')
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        return data as KaryaType[];
      } catch (error) {
        console.error("Error fetching karya:", error);
        // Fall back to mock data if there's an error
        return mockKarya as unknown as KaryaType[];
      }
    },
    retry: 1,
    // If Supabase isn't connected, use mock data
    initialData: mockKarya as unknown as KaryaType[],
  });
  
  const filteredKarya = selectedCategory === "all" 
    ? karyaData 
    : karyaData?.filter(item => item.category === selectedCategory);

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
        onSelectCategory={setSelectedCategory}
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
        ) : filteredKarya && filteredKarya.length > 0 ? (
          <MasonryGrid 
            items={filteredKarya} 
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
