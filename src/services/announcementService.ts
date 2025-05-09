
import { supabase } from "@/integrations/supabase/client";
import { Announcement, AnnouncementFormData } from "@/models/Announcement";
import { toast } from "sonner";

/**
 * Fetches announcements from Supabase based on category
 * 
 * @param category - The category to filter by, or "all" for all categories
 * @param publishedOnly - Whether to only fetch published announcements (default: true)
 * @returns A Promise that resolves to an array of Announcement objects
 */
export const fetchAnnouncements = async (
  category: string = "all", 
  publishedOnly: boolean = true
): Promise<Announcement[]> => {
  try {
    // Start building query
    let query = supabase.from("announcements").select("*");
    
    // Only fetch published announcements if needed
    if (publishedOnly) {
      query = query.eq("published", true);
    }
    
    // Filter by category if specified
    if (category !== "all") {
      query = query.eq("category", category);
    }
    
    // Order by date (newest first), then by created_at, then by importance
    query = query.order("important", { ascending: false })
                .order("date", { ascending: false, nullsFirst: false })
                .order("created_at", { ascending: false });
    
    const { data, error } = await query;
    
    if (error) {
      console.error("Error fetching announcements:", error);
      throw new Error(error.message);
    }
    
    return data as Announcement[] || [];
  } catch (error) {
    console.error("Exception in fetchAnnouncements:", error);
    toast.error("Gagal memuat data pengumuman");
    // Return empty array instead of throwing when showing an error toast
    return [];
  }
};

/**
 * Fetches the single most important announcement marked as featured
 * 
 * @returns A Promise that resolves to an Announcement object or null if no featured announcement
 */
export const fetchFeaturedAnnouncement = async (): Promise<Announcement | null> => {
  try {
    // Get the most important, most recent, published announcement
    const { data, error } = await supabase
      .from("announcements")
      .select("*")
      .eq("published", true)
      .eq("important", true)
      .order("date", { ascending: false, nullsFirst: false })
      .order("created_at", { ascending: false })
      .limit(1)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') {
        // No featured announcement found (PGRST116 = no rows returned from the query)
        return null;
      }
      
      console.error("Error fetching featured announcement:", error);
      throw new Error(error.message);
    }
    
    return data as Announcement;
  } catch (error) {
    // If error is not PGRST116, rethrow for handling upstream
    if (error instanceof Error && error.message.includes('PGRST116')) {
      return null;
    }
    
    console.error("Exception in fetchFeaturedAnnouncement:", error);
    return null;
  }
};

/**
 * Creates a new announcement
 * 
 * @param announcementData - The data for the new announcement
 * @returns A Promise that resolves to the created Announcement
 */
export const createAnnouncement = async (
  announcementData: AnnouncementFormData
): Promise<Announcement> => {
  try {
    const { data, error } = await supabase
      .from("announcements")
      .insert(announcementData)
      .select()
      .single();
    
    if (error) {
      console.error("Error creating announcement:", error);
      toast.error(`Gagal membuat pengumuman: ${error.message}`);
      throw new Error(error.message);
    }
    
    toast.success("Pengumuman berhasil dibuat");
    return data as Announcement;
  } catch (error) {
    console.error("Exception in createAnnouncement:", error);
    toast.error("Gagal membuat pengumuman");
    throw error;
  }
};

/**
 * Updates an existing announcement
 * 
 * @param id - The ID of the announcement to update
 * @param announcementData - The updated data for the announcement
 * @returns A Promise that resolves to the updated Announcement
 */
export const updateAnnouncement = async (
  id: string, 
  announcementData: AnnouncementFormData
): Promise<Announcement> => {
  try {
    const { data, error } = await supabase
      .from("announcements")
      .update({
        ...announcementData,
        updated_at: new Date().toISOString()
      })
      .eq("id", id)
      .select()
      .single();
    
    if (error) {
      console.error("Error updating announcement:", error);
      toast.error(`Gagal memperbarui pengumuman: ${error.message}`);
      throw new Error(error.message);
    }
    
    toast.success("Pengumuman berhasil diperbarui");
    return data as Announcement;
  } catch (error) {
    console.error("Exception in updateAnnouncement:", error);
    toast.error("Gagal memperbarui pengumuman");
    throw error;
  }
};

/**
 * Deletes an announcement
 * 
 * @param id - The ID of the announcement to delete
 * @returns A Promise that resolves to a boolean indicating success
 */
export const deleteAnnouncement = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from("announcements")
      .delete()
      .eq("id", id);
    
    if (error) {
      console.error("Error deleting announcement:", error);
      toast.error(`Gagal menghapus pengumuman: ${error.message}`);
      return false;
    }
    
    toast.success("Pengumuman berhasil dihapus");
    return true;
  } catch (error) {
    console.error("Exception in deleteAnnouncement:", error);
    toast.error("Gagal menghapus pengumuman");
    return false;
  }
};

/**
 * Toggles the published status of an announcement
 * 
 * @param id - The ID of the announcement to toggle
 * @param currentStatus - The current published status
 * @returns A Promise that resolves to the updated Announcement
 */
export const toggleAnnouncementPublishStatus = async (
  id: string, 
  currentStatus: boolean = true
): Promise<Announcement> => {
  try {
    const { data, error } = await supabase
      .from("announcements")
      .update({ 
        published: !currentStatus,
        updated_at: new Date().toISOString()
      })
      .eq("id", id)
      .select()
      .single();
    
    if (error) {
      console.error("Error toggling announcement publish status:", error);
      toast.error(`Gagal mengubah status publikasi: ${error.message}`);
      throw new Error(error.message);
    }
    
    toast.success(currentStatus ? 
      "Pengumuman disembunyikan" : 
      "Pengumuman dipublikasikan");
    return data as Announcement;
  } catch (error) {
    console.error("Exception in toggleAnnouncementPublishStatus:", error);
    toast.error("Gagal mengubah status publikasi");
    throw error;
  }
};

/**
 * Toggles the important status of an announcement
 * 
 * @param id - The ID of the announcement to toggle
 * @param currentStatus - The current important status
 * @returns A Promise that resolves to the updated Announcement
 */
export const toggleAnnouncementImportantStatus = async (
  id: string, 
  currentStatus: boolean = false
): Promise<Announcement> => {
  try {
    const { data, error } = await supabase
      .from("announcements")
      .update({ 
        important: !currentStatus,
        updated_at: new Date().toISOString()
      })
      .eq("id", id)
      .select()
      .single();
    
    if (error) {
      console.error("Error toggling announcement important status:", error);
      toast.error(`Gagal mengubah status prioritas: ${error.message}`);
      throw new Error(error.message);
    }
    
    toast.success(currentStatus ? 
      "Status penting dihapus" : 
      "Ditandai sebagai pengumuman penting");
    return data as Announcement;
  } catch (error) {
    console.error("Exception in toggleAnnouncementImportantStatus:", error);
    toast.error("Gagal mengubah status prioritas");
    throw error;
  }
};

/**
 * Adds predefined announcements to the database
 * These include version updates and important community announcements
 * 
 * @returns A Promise that resolves to a boolean indicating success
 */
export const addPredefinedAnnouncements = async (): Promise<boolean> => {
  try {
    // Current date
    const now = new Date().toISOString();
    
    // Predefined announcements
    const announcements = [
      // Version 4.0 (Newest)
      {
        title: "OurCreativity Web Versi 4.0 - Peningkatan Terbaru",
        content: "Selamat datang di OurCreativity Web versi 4.0!\n\n" +
                "Versi terbaru ini hadir dengan berbagai peningkatan dan penyempurnaan untuk pengalaman yang lebih baik. " +
                "UI/UX telah dirancang ulang untuk responsivitas yang lebih baik di semua perangkat, dengan fokus pada estetika dan animasi yang halus.\n\n" +
                "Fitur-fitur utama termasuk:\n\n" +
                "• Desain responsif yang sepenuhnya berfungsi pada mobile dan desktop\n" +
                "• Peningkatan kinerja dan kecepatan loading\n" +
                "• Sistem pengumuman yang lebih interaktif\n" +
                "• Integrasi dengan Supabase untuk manajemen data yang lebih efisien\n\n" +
                "Terima kasih telah menggunakan OurCreativity Web. Kami terus berkomitmen untuk menyediakan platform terbaik untuk komunitas kreatif Indonesia.",
        category: "update",
        published: true,
        important: true,
        date: now,
        image_url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1740&auto=format&fit=crop"
      },
      // Ardelyo's announcement about Unix Series
      {
        title: "Projek Rahasia: Unix Series — Fase Kedua OurCreativity",
        content: "Dari Web Developer Ardelyo:\n\n" +
                "Saya ingin mengklarifikasi bahwa projek OurCreativity Web BUKAN merupakan jalan buntu. Saat ini, kami sedang mengerjakan sebuah projek secara senyap yang akan diumumkan pada waktu yang tepat di masa depan.\n\n" +
                "Ini adalah Projek Ardelyo fase kedua untuk Komunitas OurCreativity, yang akan menjadi bagian dari visi dan misi seri projek-projek saya ke depan — bernama \"Unix Series\".\n\n" +
                "Unix Series akan membawa inovasi dan kreasi yang belum pernah ada sebelumnya. Projek ini akan saya kerjakan sendiri, memanfaatkan teknologi terkini yang tersedia. Kami berkomitmen untuk terus mengembangkan ekosistem yang mendukung kreativitas Indonesia dan memajukan komunitas digital kita.\n\n" +
                "Tetap pantau pengumuman kami untuk informasi lebih lanjut tentang inisiatif menarik ini.\n\n" +
                "— Ardelyo",
        category: "update",
        published: true,
        important: true,
        date: now,
        image_url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1742&auto=format&fit=crop"
      },
      // Version 3.7 (Previous update)
      {
        title: "OurCreativity Web Versi 3.7",
        content: "Versi 3.7 OurCreativity Web telah dirilis dengan sejumlah peningkatan stabilitas dan perbaikan bug. Update fokus pada penyempurnaan fitur yang sudah ada dan memastikan pengalaman pengguna yang lebih lancar.",
        category: "update",
        published: true,
        important: false,
        date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString()
      },
      // Version 3.5 (Earlier update)
      {
        title: "OurCreativity Web Versi 3.5",
        content: "Versi 3.5 membawa pembaruan tampilan dan beberapa fitur baru untuk mendukung kreativitas komunitas. Interface dibuat lebih modern dan mendukung lebih banyak format kreasi.",
        category: "update",
        published: true,
        important: false,
        date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
      },
      // Version 3.0 (Official launch)
      {
        title: "Peluncuran Resmi OurCreativity Web Versi 3.0",
        content: "Dengan bangga kami mengumumkan peluncuran resmi OurCreativity Web versi 3.0! Ini menandai tonggak penting dalam perjalanan komunitas kita, menyediakan platform yang komprehensif untuk berkolaborasi, berbagi, dan menumbuhkan kreativitas Indonesia.",
        category: "update",
        published: true,
        important: false,
        date: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString()
      }
    ];
    
    // Insert all predefined announcements
    const { error } = await supabase
      .from("announcements")
      .upsert(announcements, { onConflict: 'title' });
    
    if (error) {
      console.error("Error adding predefined announcements:", error);
      toast.error("Gagal menambahkan pengumuman predefinisi");
      return false;
    }
    
    toast.success("Pengumuman predefinisi berhasil ditambahkan");
    return true;
  } catch (error) {
    console.error("Exception in addPredefinedAnnouncements:", error);
    toast.error("Gagal menambahkan pengumuman predefinisi");
    return false;
  }
};
