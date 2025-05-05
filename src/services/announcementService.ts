
import { supabase } from "@/integrations/supabase/client";
import { Announcement, AnnouncementFormData } from "@/models/Announcement";
import { toast } from "sonner";

export const fetchAnnouncements = async (
  filterCategory: string = 'all',
  publishedOnly: boolean = true
): Promise<Announcement[]> => {
  try {
    let query = supabase
      .from('announcements')
      .select('*')
      .order('created_at', { ascending: false });

    if (publishedOnly) {
      query = query.eq('published', true);
    }

    if (filterCategory !== 'all') {
      query = query.eq('category', filterCategory);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching announcements:', error);
      throw new Error(error.message);
    }

    return data as Announcement[];
  } catch (error: any) {
    console.error('Error in fetchAnnouncements:', error);
    throw error;
  }
};

export const fetchAnnouncementById = async (id: string): Promise<Announcement | null> => {
  try {
    const { data, error } = await supabase
      .from('announcements')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching announcement by ID:', error);
      throw new Error(error.message);
    }

    return data as Announcement;
  } catch (error: any) {
    console.error('Error in fetchAnnouncementById:', error);
    throw error;
  }
};

export const createAnnouncement = async (formData: AnnouncementFormData): Promise<Announcement> => {
  try {
    const { data, error } = await supabase
      .from('announcements')
      .insert([{
        title: formData.title,
        content: formData.content,
        category: formData.category,
        published: formData.published,
        important: formData.important,
        image_url: formData.image_url || null,
        link_url: formData.link_url || null,
        date: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) {
      console.error('Error creating announcement:', error);
      throw new Error(error.message);
    }

    toast.success("Pengumuman berhasil dibuat");
    return data as Announcement;
  } catch (error: any) {
    console.error('Error in createAnnouncement:', error);
    toast.error("Gagal membuat pengumuman");
    throw error;
  }
};

export const updateAnnouncement = async (id: string, formData: AnnouncementFormData): Promise<Announcement> => {
  try {
    const { data, error } = await supabase
      .from('announcements')
      .update({
        title: formData.title,
        content: formData.content,
        category: formData.category,
        published: formData.published,
        important: formData.important,
        image_url: formData.image_url || null,
        link_url: formData.link_url || null,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating announcement:', error);
      throw new Error(error.message);
    }

    toast.success("Pengumuman berhasil diperbarui");
    return data as Announcement;
  } catch (error: any) {
    console.error('Error in updateAnnouncement:', error);
    toast.error("Gagal memperbarui pengumuman");
    throw error;
  }
};

export const deleteAnnouncement = async (id: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('announcements')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting announcement:', error);
      throw new Error(error.message);
    }

    toast.success("Pengumuman berhasil dihapus");
  } catch (error: any) {
    console.error('Error in deleteAnnouncement:', error);
    toast.error("Gagal menghapus pengumuman");
    throw error;
  }
};

export const toggleAnnouncementPublishStatus = async (id: string, currentStatus: boolean): Promise<Announcement> => {
  try {
    const { data, error } = await supabase
      .from('announcements')
      .update({ published: !currentStatus, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error toggling announcement status:', error);
      throw new Error(error.message);
    }

    toast.success(
      !currentStatus 
        ? "Pengumuman berhasil dipublikasikan"
        : "Pengumuman berhasil disembunyikan"
    );
    
    return data as Announcement;
  } catch (error: any) {
    console.error('Error in toggleAnnouncementPublishStatus:', error);
    toast.error("Gagal mengubah status pengumuman");
    throw error;
  }
};

export const toggleAnnouncementImportantStatus = async (id: string, currentStatus: boolean): Promise<Announcement> => {
  try {
    const { data, error } = await supabase
      .from('announcements')
      .update({ important: !currentStatus, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error toggling announcement important status:', error);
      throw new Error(error.message);
    }

    toast.success(
      !currentStatus 
        ? "Pengumuman ditandai sebagai penting"
        : "Pengumuman tidak lagi ditandai penting"
    );
    
    return data as Announcement;
  } catch (error: any) {
    console.error('Error in toggleAnnouncementImportantStatus:', error);
    toast.error("Gagal mengubah status penting pengumuman");
    throw error;
  }
};

export const fetchFeaturedAnnouncement = async (): Promise<Announcement | null> => {
  try {
    const { data, error } = await supabase
      .from('announcements')
      .select('*')
      .eq('published', true)
      .eq('important', true)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 is "no rows returned" error
      console.error('Error fetching featured announcement:', error);
      throw new Error(error.message);
    }

    return data as Announcement || null;
  } catch (error: any) {
    console.error('Error in fetchFeaturedAnnouncement:', error);
    // Don't throw here, just return null to handle gracefully
    return null;
  }
};
