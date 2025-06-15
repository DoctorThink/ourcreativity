
import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { KaryaGallery } from "../components/karya/KaryaGallery";
import PageLayout from "../components/layouts/PageLayout";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";
import { sortKaryaByRecency, sortKaryaByPopularity } from "@/lib/karyaUtils";
import UploadButton from "../components/karya/UploadButton";
import { FeaturedWork } from "@/components/karya/FeaturedWork";
import { FilterBar } from "@/components/karya/FilterBar";
import KaryaDetailDialog from "@/components/KaryaDetailDialog";

type KaryaType = Database['public']['Tables']['karya']['Row'];

const KaryaKami: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("recency");
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedKarya, setSelectedKarya] = useState<KaryaType | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const { data: karyaData, isLoading: isKaryaLoading, refetch } = useQuery({
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

  const filteredAndSortedKarya = useMemo(() => {
    if (!karyaData) return [];
    let result = [...karyaData];
    if (selectedCategory !== "all") {
      result = result.filter(item => item.category === selectedCategory);
    }
    if (sortBy === 'popularity') {
      result = sortKaryaByPopularity(result);
    } else {
      result = sortKaryaByRecency(result);
    }
    return result;
  }, [karyaData, selectedCategory, sortBy]);

  const featuredWork = useMemo(() => {
    if (!karyaData) return null;
    return karyaData.find(item => item.is_spotlight) || karyaData[0] || null;
  }, [karyaData]);
  
  const handleUploadSuccess = () => refetch();

  const handleFeaturedWorkClick = () => {
    if (featuredWork) {
      setSelectedKarya(featuredWork);
      setIsDialogOpen(true);
    }
  };

  const initialDialogIndex = useMemo(() => {
    if (!selectedKarya || !filteredAndSortedKarya) return 0;
    const index = filteredAndSortedKarya.findIndex(item => item.id === selectedKarya.id);
    return index > -1 ? index : 0;
  }, [selectedKarya, filteredAndSortedKarya]);

  return (
    <PageLayout title="">
      <div className="relative min-h-screen w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mb-12 pt-20 md:pt-28"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white font-serif">KARYA KAMI</h1>
          <p className="text-lg md:text-xl text-gray-300 mt-4 font-sans">
            Koleksi karya kreatif dari komunitas Our Creativity
          </p>
          <div className="mt-8">
            <UploadButton onSuccess={handleUploadSuccess} />
          </div>
        </motion.div>

        <AnimatePresence>
          {isLoading && (
            <motion.div 
              className="fixed inset-0 bg-background z-50 flex items-center justify-center"
              exit={{ opacity: 0, transition: { duration: 0.4, ease: "easeInOut" } }}
            >
              <motion.div
                className="relative w-16 h-16"
                animate={{ rotate: 360 }}
                transition={{ rotate: { duration: 1.2, repeat: Infinity, ease: "linear" } }}
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amethyst via-turquoise to-coral opacity-80 blur-sm" />
                <img src="/lovable-uploads/c861a7c0-5ec9-4bac-83ea-319c40fcb001.png" alt="Loading..." className="absolute inset-0 w-full h-full object-contain" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {featuredWork && (
          <FeaturedWork item={featuredWork} onViewClick={handleFeaturedWorkClick} />
        )}
        
        <section className="mt-6 mb-16 relative z-10">
          <FilterBar 
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />
          <KaryaGallery 
            karyaData={filteredAndSortedKarya}
            isLoading={isKaryaLoading}
            onKaryaSelect={setSelectedKarya}
            onDialogOpen={setIsDialogOpen}
          />
        </section>

        {selectedKarya && (
          <KaryaDetailDialog
            karyaList={filteredAndSortedKarya}
            initialIndex={initialDialogIndex}
            isOpen={isDialogOpen}
            onClose={() => setIsDialogOpen(false)}
          />
        )}
      </div>
    </PageLayout>
  );
};

export default KaryaKami;
