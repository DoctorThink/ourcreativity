import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { CategorySelector } from "./CategorySelector";
// import { MasonryGrid } from "./MasonryGrid"; // Will be replaced
import KaryaCard from "../KaryaCard"; // Assuming this is the correct path
import KaryaDetailDialog from "../KaryaDetailDialog";
import { Database } from "@/integrations/supabase/types";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
  createMasonryCellPositioner,
  Masonry as RVMasonry, // Aliased to avoid naming conflicts
  WindowScroller,
} from 'react-virtualized';
import 'react-virtualized/styles.css'; // Import default styles

type KaryaType = Database['public']['Tables']['karya']['Row'];

// Mock data (remains for fallback if initialKaryaList is empty and isLoading is true initially)
const mockKarya = [
  { id: "1", title: "Digital Art Exploration", description: "#digitalart #creative #design", image_url: "/placeholder.svg", media_urls: ["/placeholder.svg"], category: "design", created_at: "2023-04-15", updated_at: "2023-04-15", creator_name: "Andi Susanto", status: "approved", is_spotlight: true, media_width: 800, media_height: 600, link_url: "https://example.com/design", content_url: null, likes_count: 10 },
  { id: "2", title: "Motion Graphics Demo", description: "#animation #motiongraphics", image_url: "/placeholder.svg", media_urls: ["/placeholder.svg"], category: "video", created_at: "2023-05-22", updated_at: "2023-05-22", creator_name: "Dina Pratiwi", status: "approved", is_spotlight: false, media_width: 1280, media_height: 720, link_url: "https://example.com/video", content_url: null, likes_count: 25 },
  { id: "3", title: "UI Design Collection", description: "#ui #mobile #design", image_url: "/placeholder.svg", media_urls: ["/placeholder.svg"], category: "design", created_at: "2023-03-10", updated_at: "2023-03-10", creator_name: "Rama Wijaya", status: "approved", is_spotlight: true, media_width: 1200, media_height: 800, link_url: "https://example.com/uidesign", content_url: null, likes_count: 5 },
  { id: "5", title: "Essay on Modern Art", description: "#senimodern #essay #writing", image_url: null, media_urls: [], category: "writing", created_at: "2023-05-18", updated_at: "2023-05-18", creator_name: "Nina Amelia", status: "approved", is_spotlight: true, media_width: null, media_height: null, link_url: "https://example.com/essay", content_url: "https://example.com/essay/content", likes_count: 15 },
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

const GUTTER_SIZE = 16; // 1rem equivalent for gutter

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
  const [columnCount, setColumnCount] = useState(3); // Default column count

  // CellMeasurerCache
  const cellMeasurerCache = useMemo(() => new CellMeasurerCache({
    defaultHeight: 450, // Adjusted default height estimate
    defaultWidth: 300,  // Adjusted default width estimate
    fixedWidth: true,
  }), []);

  // Masonry ref for recompute
  const masonryRef = useRef<RVMasonry | null>(null);

  // Helper function to extract tags from a string
  const extractTagsFromString = (text: string | null | undefined): string[] => {
    if (!text) return [];
    const hashtags = text.match(/#[\w\u0080-\uFFFF]+/g);
    if (hashtags && hashtags.length > 0) {
      return hashtags.map(tag => tag.slice(1).toLowerCase());
    }
    return [];
  };
  
  // Apply filtering and sorting using initialKaryaList prop
  const processedKarya = useMemo(() => {
    if (!initialKaryaList) return [];
    let result: KaryaType[] = [...initialKaryaList];
    if (selectedCategory !== "all") {
      result = result.filter(item => item.category === selectedCategory);
    }
    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      result = result.filter(item => 
        item.title?.toLowerCase().includes(lowerSearchTerm) ||
        item.description?.toLowerCase().includes(lowerSearchTerm) ||
        item.creator_name?.toLowerCase().includes(lowerSearchTerm)
      );
    }
    if (selectedTags.length > 0) {
      const lowerSelectedTags = selectedTags.map(tag => tag.toLowerCase());
      result = result.filter(item => {
        const itemTags = extractTagsFromString(item.description);
        return lowerSelectedTags.some(selectedTag => itemTags.includes(selectedTag));
      });
    }
    if (sortBy === 'recency') {
      result = result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    } else if (sortBy === 'popularity') {
      result = result.sort((a, b) => (b.likes_count || 0) - (a.likes_count || 0));
    }
    return result;
  }, [initialKaryaList, selectedCategory, searchTerm, sortBy, selectedTags]);

  // Reset cache and recompute positions when items or column count change
  useEffect(() => {
    cellMeasurerCache.clearAll();
    if (masonryRef.current) {
      masonryRef.current.recomputeCellPositions();
    }
  }, [processedKarya, columnCount, cellMeasurerCache]);


  const handleKaryaClick = useCallback((karya: KaryaType) => {
    setSelectedKarya(karya);
    setIsDialogOpen(true);
  }, []);

  // CellPositioner: This needs to be stable or memoized correctly with width.
  // We will manage its update inside AutoSizer's render prop.
  const cellPositionerRef = useRef<ReturnType<typeof createMasonryCellPositioner> | null>(null);


  const cellRenderer = useCallback(({ index, key, parent, style }: any) => {
    const item = processedKarya[index];
    if (!item) return null;

    // Add padding to the style to create gutters
    const styleWithGutter = {
      ...style,
      // The Masonry component itself handles positioning, we ensure items don't touch
      // by setting a padding on each cell content that acts as half a gutter.
      // The actual column width calculation needs to account for this.
      // For simplicity, if gutter is 16px, use 8px padding on each side of content.
      paddingLeft: GUTTER_SIZE / 2,
      paddingRight: GUTTER_SIZE / 2,
      paddingBottom: GUTTER_SIZE, // Vertical gutter
    };

    return (
      <CellMeasurer cache={cellMeasurerCache} index={index} key={key} parent={parent}>
        <div style={styleWithGutter}>
          <KaryaCard karya={item} onClick={() => handleKaryaClick(item)} />
        </div>
      </CellMeasurer>
    );
  }, [processedKarya, handleKaryaClick, cellMeasurerCache]);

  if (isLoading && (!initialKaryaList || initialKaryaList.length === 0)) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
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
    );
  }
  
  if (!processedKarya || processedKarya.length === 0) {
    return (
      <div className="text-center py-12 bg-secondary/30 backdrop-blur-sm rounded-3xl border border-border/30 shadow-md mt-8">
        <p className="text-foreground/70">Tidak ada karya dalam kategori ini.</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full" // Ensure motion div takes full width
    >
      <CategorySelector 
        selectedCategory={selectedCategory} 
        onSelectCategory={onSelectCategory}
      />
      
      <div className="mt-8" style={{ height: 'auto', width: '100%' }}>
        <WindowScroller scrollElement={typeof window !== 'undefined' ? window : undefined}>
          {({ height, isScrolling, onChildScroll, scrollTop, registerChild }) => (
            <div ref={registerChild} style={{ outline: 'none' }}>
              <AutoSizer 
                disableHeight 
                onResize={(params) => {
                  // Recalculate column count based on new width
                  const newColumnCount = Math.max(1, Math.floor(params.width / (cellMeasurerCache.defaultWidth + GUTTER_SIZE)));
                  if (newColumnCount !== columnCount) {
                    setColumnCount(newColumnCount);
                  }
                  // Force recompute of cell positions if width changed
                  if (masonryRef.current) {
                     cellMeasurerCache.clearAll(); // Clear cache on resize
                     masonryRef.current.recomputeCellPositions();
                  }
                }}
              >
                {({ width }) => {
                  if (width === 0) return null;

                  const currentColumnCount = Math.max(1, Math.floor(width / (cellMeasurerCache.defaultWidth + GUTTER_SIZE)));
                  // Ensure columnCount state is up-to-date if AutoSizer provides a new calculation
                  // This might cause a quick re-render if columnCount wasn't already optimal for this width
                  if (currentColumnCount !== columnCount) {
                     setColumnCount(currentColumnCount); // This will trigger re-render and useEffect
                  }


                  // Calculate column width based on current column count
                  // The padding for gutters is applied *inside* the cellRenderer's div,
                  // so the columnWidth for cellPositioner is the full width of the column.
                  const calculatedColumnWidth = Math.floor(
                    (width - (currentColumnCount - 1) * GUTTER_SIZE) / currentColumnCount
                  );

                  // Update or create cellPositioner
                  // This needs to be stable for RVMasonry unless dependencies change.
                  // We use a ref and update it, or useMemo if preferred.
                  // For simplicity, re-creating here if it changed, but useMemo is better.
                  cellPositionerRef.current = createMasonryCellPositioner({
                    cellMeasurerCache: cellMeasurerCache,
                    columnCount: currentColumnCount,
                    columnWidth: calculatedColumnWidth,
                    spacer: GUTTER_SIZE,
                  });
                  
                  return (
                    <RVMasonry
                      ref={masonryRef}
                      autoHeight={true} // Allows WindowScroller to manage height
                      cellCount={processedKarya.length}
                      cellMeasurerCache={cellMeasurerCache}
                      cellPositioner={cellPositionerRef.current}
                      cellRenderer={cellRenderer}
                      height={height} // Provided by WindowScroller
                      isScrolling={isScrolling} // Provided by WindowScroller
                      onScroll={onChildScroll} // Provided by WindowScroller
                      scrollTop={scrollTop} // Provided by WindowScroller
                      width={width} // Provided by AutoSizer
                      overscanByPixels={height > 0 ? height : 600} // Overscan by one viewport height or a default
                      className="outline-none" // Remove default outline
                      style={{ outline: 'none' }} // Ensure no outline
                    />
                  );
                }}
              </AutoSizer>
            </div>
          )}
        </WindowScroller>
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

// Export mockKarya if it's intended to be used by KaryaKami.tsx directly
// For now, assuming KaryaKami.tsx defines its own or imports from a dedicated mock file.
// export { mockKarya };
