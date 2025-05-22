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

interface KaryaGalleryProps {
  initialKaryaList: KaryaType[];
  isLoading: boolean;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  searchTerm: string;
  sortBy: string; // 'recency' | 'popularity'
  selectedTags: string[];
}

export const KaryaGallery: React.FC<KaryaGalleryProps> = ({
  initialKaryaList,
  isLoading,
  selectedCategory,
  onSelectCategory,
  searchTerm,
  sortBy,
  selectedTags,
}) => {
  const [selectedKarya, setSelectedKarya] = useState<KaryaType | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Helper function to extract tags from a string
  const extractTagsFromString = (text: string | null | undefined): string[] => {
    if (!text) return [];
    // Matches hashtags like #tag, #Tag123, #tag_with_underscore
    // Handles Unicode characters in tags based on the previous example \u0080-\uFFFF
    const hashtags = text.match(/#[\w\u0080-\uFFFF]+/g);
    if (hashtags && hashtags.length > 0) {
      return hashtags.map(tag => tag.slice(1).toLowerCase()); // Remove # and lowercase
    }
    return [];
  };
  
  // Apply filtering and sorting using initialKaryaList prop
  const processedKarya = (() => {
    if (!initialKaryaList) return [];

    let result: KaryaType[] = [...initialKaryaList];

    // 1. Category filter
    if (selectedCategory !== "all") {
      result = result.filter(item => item.category === selectedCategory);
    }

    // 2. Search term filter
    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      result = result.filter(item => 
        item.title?.toLowerCase().includes(lowerSearchTerm) ||
        item.description?.toLowerCase().includes(lowerSearchTerm) ||
        item.creator_name?.toLowerCase().includes(lowerSearchTerm)
      );
    }

    // 3. Tag filter
    if (selectedTags.length > 0) {
      const lowerSelectedTags = selectedTags.map(tag => tag.toLowerCase());
      result = result.filter(item => {
        const itemTags = extractTagsFromString(item.description); // Assuming tags are in description
        return lowerSelectedTags.some(selectedTag => itemTags.includes(selectedTag));
      });
    }
    
    // 4. Sorting
    if (sortBy === 'recency') {
      result = result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    } else if (sortBy === 'popularity') {
      // Ensure likes_count is treated as a number, defaulting to 0 if null/undefined
      result = result.sort((a, b) => (b.likes_count || 0) - (a.likes_count || 0));
    }

    return result;
  })();

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
        ) : processedKarya && processedKarya.length > 0 ? (
          <MasonryGrid 
            items={processedKarya} 
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
