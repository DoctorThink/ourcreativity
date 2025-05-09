
import { useState, useEffect } from "react";
import { Announcement } from "@/models/Announcement";
import { 
  fetchAnnouncements, 
  fetchFeaturedAnnouncement,
  addPredefinedAnnouncements 
} from "@/services/announcementService";
import { toast } from "sonner";

export const useAnnouncements = () => {
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);
  const [filter, setFilter] = useState<string>("all");
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [featuredAnnouncement, setFeaturedAnnouncement] = useState<Announcement | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAddingPredefined, setIsAddingPredefined] = useState(false);

  // Load featured announcement and all announcements on initial load
  useEffect(() => {
    const loadInitialData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        console.log('Initial data load started...');
        
        try {
          // Parallel fetching of both featured and all announcements
          const [featured, allAnnouncements] = await Promise.all([
            fetchFeaturedAnnouncement(),
            fetchAnnouncements(filter)
          ]);
          
          console.log('Featured announcement result:', featured);
          console.log('All announcements result:', allAnnouncements);
          
          setFeaturedAnnouncement(featured);
          setAnnouncements(allAnnouncements);
          
          // If no announcements found, check if we have permission issues
          if (allAnnouncements.length === 0) {
            console.log('No announcements found, checking for permission issues');
          }
        } catch (err) {
          console.error("Error loading initial announcements data:", err);
          
          // Check if this is a Supabase permission error
          const errorMessage = err instanceof Error ? err.message : String(err);
          if (errorMessage.includes('permission denied') || errorMessage.includes('42501')) {
            setError("Gagal memuat data pengumuman: Izin database tidak sesuai. Mohon hubungi administrator.");
            toast.error("Gagal akses database pengumuman");
          } else {
            setError("Gagal memuat data pengumuman. Silakan coba lagi nanti.");
            toast.error("Gagal memuat data pengumuman");
          }
        }
      } finally {
        setIsLoading(false);
      }
    };
    
    loadInitialData();
  }, []);

  // Load filtered announcements when filter changes
  useEffect(() => {
    // Skip if this is the initial load or if we're already loading
    if (isLoading && announcements.length === 0) return;
    
    const loadFilteredAnnouncements = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        console.log(`Loading filtered announcements for category: ${filter}`);
        const data = await fetchAnnouncements(filter);
        console.log('Filtered announcements result:', data);
        setAnnouncements(data);
      } catch (err) {
        console.error("Error loading filtered announcements:", err);
        const errorMessage = err instanceof Error ? err.message : String(err);
        if (errorMessage.includes('permission denied') || errorMessage.includes('42501')) {
          setError("Gagal memuat data pengumuman: Izin database tidak sesuai. Mohon hubungi administrator.");
          toast.error("Gagal akses database pengumuman");
        } else {
          setError("Gagal memuat data pengumuman. Silakan coba lagi nanti.");
          toast.error("Gagal memuat data pengumuman");
        }
      } finally {
        setIsLoading(false);
      }
    };
    
    loadFilteredAnnouncements();
  }, [filter]);

  // Handle retry loading data
  const handleRetry = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log('Retrying data load...');
      
      // Try to add predefined announcements first, which might help create the table structure
      await handleAddPredefinedAnnouncements();
      
      // Now try to fetch the announcements again
      const [featured, allAnnouncements] = await Promise.all([
        fetchFeaturedAnnouncement(),
        fetchAnnouncements(filter)
      ]);
      
      setFeaturedAnnouncement(featured);
      setAnnouncements(allAnnouncements);
      
      if (allAnnouncements.length > 0) {
        toast.success("Data pengumuman berhasil dimuat");
      } else {
        toast.info("Tidak ada pengumuman ditemukan");
      }
    } catch (err) {
      console.error("Error retrying data load:", err);
      const errorMessage = err instanceof Error ? err.message : String(err);
      if (errorMessage.includes('permission denied') || errorMessage.includes('42501')) {
        setError("Gagal memuat data pengumuman: Izin database tidak sesuai. Mohon hubungi administrator.");
        toast.error("Gagal akses database pengumuman");
      } else {
        setError("Gagal memuat data pengumuman. Silakan coba lagi nanti.");
        toast.error("Gagal memuat data pengumuman");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Handle adding predefined announcements
  const handleAddPredefinedAnnouncements = async () => {
    setIsAddingPredefined(true);
    
    try {
      console.log("Adding predefined announcements...");
      const result = await addPredefinedAnnouncements();
      console.log("Result of adding predefined announcements:", result);
      
      if (result) {
        // Reload announcements after adding predefined ones
        const [featured, allAnnouncements] = await Promise.all([
          fetchFeaturedAnnouncement(),
          fetchAnnouncements(filter)
        ]);
        
        setFeaturedAnnouncement(featured);
        setAnnouncements(allAnnouncements);
        toast.success("Pengumuman predefinisi berhasil ditambahkan");
      } else {
        toast.error("Gagal menambahkan pengumuman predefinisi");
      }
    } catch (err) {
      console.error("Error adding predefined announcements:", err);
      const errorMessage = err instanceof Error ? err.message : String(err);
      if (errorMessage.includes('permission denied') || errorMessage.includes('42501')) {
        setError("Gagal menambahkan pengumuman: Izin database tidak sesuai. Mohon hubungi administrator.");
        toast.error("Gagal akses database pengumuman");
      } else {
        toast.error("Gagal menambahkan pengumuman predefinisi");
      }
    } finally {
      setIsAddingPredefined(false);
    }
  };

  return {
    selectedAnnouncement,
    setSelectedAnnouncement,
    filter,
    setFilter,
    announcements,
    featuredAnnouncement,
    isLoading,
    error,
    isAddingPredefined,
    handleRetry,
    handleAddPredefinedAnnouncements
  };
};
