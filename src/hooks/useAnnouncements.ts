
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

  // Utility function to remove duplicates based on ID
  const removeDuplicates = (announcements: Announcement[]): Announcement[] => {
    const seen = new Set<string>();
    return announcements.filter(announcement => {
      if (seen.has(announcement.id)) {
        return false;
      }
      seen.add(announcement.id);
      return true;
    });
  };

  // Load initial data
  useEffect(() => {
    const loadInitialData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        console.log('Loading initial announcements data...');
        
        // Fetch both featured and all announcements in parallel
        const [featured, allAnnouncements] = await Promise.all([
          fetchFeaturedAnnouncement(),
          fetchAnnouncements()
        ]);
        
        console.log('Featured announcement:', featured);
        console.log('All announcements:', allAnnouncements);
        
        // Remove duplicates and set state
        const uniqueAnnouncements = removeDuplicates(allAnnouncements);
        
        setFeaturedAnnouncement(featured);
        setAnnouncements(uniqueAnnouncements);
        
        if (uniqueAnnouncements.length === 0) {
          console.log('No announcements found');
        }
      } catch (err) {
        console.error("Error loading initial announcements data:", err);
        const errorMessage = err instanceof Error ? err.message : String(err);
        setError("Gagal memuat data pengumuman. Silakan coba lagi nanti.");
        toast.error("Gagal memuat data pengumuman");
      } finally {
        setIsLoading(false);
      }
    };
    
    loadInitialData();
  }, []);

  // Load filtered announcements when filter changes
  useEffect(() => {
    // Skip if this is the initial load
    if (announcements.length === 0 && filter === "all") return;
    
    const loadFilteredAnnouncements = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        console.log(`Loading filtered announcements for category: ${filter}`);
        const data = await fetchAnnouncements(filter);
        console.log('Filtered announcements result:', data);
        
        // Remove duplicates and set state
        const uniqueAnnouncements = removeDuplicates(data);
        setAnnouncements(uniqueAnnouncements);
      } catch (err) {
        console.error("Error loading filtered announcements:", err);
        const errorMessage = err instanceof Error ? err.message : String(err);
        setError("Gagal memuat data pengumuman. Silakan coba lagi nanti.");
        toast.error("Gagal memuat data pengumuman");
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
      
      const [featured, allAnnouncements] = await Promise.all([
        fetchFeaturedAnnouncement(),
        fetchAnnouncements(filter)
      ]);
      
      // Remove duplicates
      const uniqueAnnouncements = removeDuplicates(allAnnouncements);
      
      setFeaturedAnnouncement(featured);
      setAnnouncements(uniqueAnnouncements);
      
      if (uniqueAnnouncements.length > 0) {
        toast.success("Data pengumuman berhasil dimuat");
      } else {
        toast.info("Tidak ada pengumuman ditemukan");
      }
    } catch (err) {
      console.error("Error retrying data load:", err);
      const errorMessage = err instanceof Error ? err.message : String(err);
      setError("Gagal memuat data pengumuman. Silakan coba lagi nanti.");
      toast.error("Gagal memuat data pengumuman");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle adding predefined announcements
  const handleAddPredefinedAnnouncements = async () => {
    setIsAddingPredefined(true);
    
    try {
      console.log("Adding predefined announcements...");
      await addPredefinedAnnouncements();
      
      // Reload announcements after adding predefined ones
      const [featured, allAnnouncements] = await Promise.all([
        fetchFeaturedAnnouncement(),
        fetchAnnouncements(filter)
      ]);
      
      // Remove duplicates
      const uniqueAnnouncements = removeDuplicates(allAnnouncements);
      
      setFeaturedAnnouncement(featured);
      setAnnouncements(uniqueAnnouncements);
      toast.success("Pengumuman predefinisi berhasil ditambahkan");
    } catch (err) {
      console.error("Error adding predefined announcements:", err);
      toast.error("Gagal menambahkan pengumuman predefinisi");
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
