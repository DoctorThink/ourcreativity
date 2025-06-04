
import { useState, useEffect } from "react";
import { Announcement } from "@/models/Announcement";
import { fetchLocalAnnouncements, fetchLocalFeaturedAnnouncement } from "@/services/localAnnouncementService";
import { toast } from "sonner";

export const useAnnouncements = () => {
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);
  const [filter, setFilter] = useState<string>("all");
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [featuredAnnouncement, setFeaturedAnnouncement] = useState<Announcement | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load data function
  const loadData = async (filterType: string = "all") => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log(`Loading announcements with filter: ${filterType}`);
      
      const [featured, allAnnouncements] = await Promise.all([
        fetchLocalFeaturedAnnouncement(),
        fetchLocalAnnouncements(filterType)
      ]);
      
      console.log('Featured announcement:', featured);
      console.log('All announcements:', allAnnouncements);
      
      setFeaturedAnnouncement(featured);
      setAnnouncements(allAnnouncements);
      
    } catch (err) {
      console.error("Error loading announcements:", err);
      setError("Gagal memuat data pengumuman. Silakan coba lagi nanti.");
      toast.error("Gagal memuat data pengumuman");
    } finally {
      setIsLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    loadData(filter);
  }, [filter]);

  // Handle retry
  const handleRetry = () => {
    loadData(filter);
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
    handleRetry
  };
};
