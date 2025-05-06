
import { supabase } from "@/integrations/supabase/client";
import { Announcement, AnnouncementFormData } from "@/models/Announcement";
import { toast } from "sonner";

// Simplified fetch function with better error handling
export const fetchAnnouncements = async (
  filterCategory: string = 'all',
  publishedOnly: boolean = true
): Promise<Announcement[]> => {
  try {
    console.log(`Fetching announcements with filter: ${filterCategory}, publishedOnly: ${publishedOnly}`);
    
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
      toast.error(`Gagal memuat pengumuman: ${error.message}`);
      return [];
    }

    console.log(`Successfully fetched ${data?.length || 0} announcements`);
    return data as Announcement[] || [];
  } catch (error: any) {
    console.error('Unexpected error in fetchAnnouncements:', error);
    toast.error('Gagal memuat pengumuman');
    return [];
  }
};

// Simplified fetch by ID with better error handling
export const fetchAnnouncementById = async (id: string): Promise<Announcement | null> => {
  try {
    console.log(`Fetching announcement with ID: ${id}`);
    
    const { data, error } = await supabase
      .from('announcements')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching announcement by ID:', error);
      toast.error(`Gagal memuat detail pengumuman: ${error.message}`);
      return null;
    }

    console.log('Successfully fetched announcement by ID:', data);
    return data as Announcement;
  } catch (error: any) {
    console.error('Unexpected error in fetchAnnouncementById:', error);
    toast.error('Gagal memuat detail pengumuman');
    return null;
  }
};

// Improved featured announcement fetch with better error handling
export const fetchFeaturedAnnouncement = async (): Promise<Announcement | null> => {
  try {
    console.log('Fetching featured announcement');
    
    const { data, error } = await supabase
      .from('announcements')
      .select('*')
      .eq('published', true)
      .eq('important', true)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error('Error fetching featured announcement:', error);
      toast.error(`Gagal memuat pengumuman unggulan: ${error.message}`);
      return null;
    }

    console.log('Successfully fetched featured announcement:', data);
    return data as Announcement || null;
  } catch (error: any) {
    console.error('Unexpected error in fetchFeaturedAnnouncement:', error);
    toast.error('Gagal memuat pengumuman unggulan');
    return null;
  }
};

// Simplified create function with better error handling
export const createAnnouncement = async (formData: AnnouncementFormData): Promise<Announcement | null> => {
  try {
    console.log('Creating new announcement:', formData);
    
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
      toast.error(`Gagal membuat pengumuman: ${error.message}`);
      return null;
    }

    toast.success("Pengumuman berhasil dibuat");
    return data as Announcement;
  } catch (error: any) {
    console.error('Unexpected error in createAnnouncement:', error);
    toast.error("Gagal membuat pengumuman");
    return null;
  }
};

// Simplified update function with better error handling
export const updateAnnouncement = async (
  id: string, 
  formData: AnnouncementFormData
): Promise<Announcement | null> => {
  try {
    console.log(`Updating announcement with ID: ${id}`, formData);
    
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
      toast.error(`Gagal memperbarui pengumuman: ${error.message}`);
      return null;
    }

    toast.success("Pengumuman berhasil diperbarui");
    return data as Announcement;
  } catch (error: any) {
    console.error('Unexpected error in updateAnnouncement:', error);
    toast.error("Gagal memperbarui pengumuman");
    return null;
  }
};

// Simplified delete function with better error handling
export const deleteAnnouncement = async (id: string): Promise<boolean> => {
  try {
    console.log(`Deleting announcement with ID: ${id}`);
    
    const { error } = await supabase
      .from('announcements')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting announcement:', error);
      toast.error(`Gagal menghapus pengumuman: ${error.message}`);
      return false;
    }

    toast.success("Pengumuman berhasil dihapus");
    return true;
  } catch (error: any) {
    console.error('Unexpected error in deleteAnnouncement:', error);
    toast.error("Gagal menghapus pengumuman");
    return false;
  }
};

// Simplified toggle publish function with better error handling
export const toggleAnnouncementPublishStatus = async (
  id: string, 
  currentStatus: boolean
): Promise<Announcement | null> => {
  try {
    console.log(`Toggling publish status for announcement ID: ${id}, current status: ${currentStatus}`);
    
    const { data, error } = await supabase
      .from('announcements')
      .update({ 
        published: !currentStatus, 
        updated_at: new Date().toISOString() 
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error toggling announcement status:', error);
      toast.error(`Gagal mengubah status pengumuman: ${error.message}`);
      return null;
    }

    toast.success(
      !currentStatus 
        ? "Pengumuman berhasil dipublikasikan"
        : "Pengumuman berhasil disembunyikan"
    );
    
    return data as Announcement;
  } catch (error: any) {
    console.error('Unexpected error in toggleAnnouncementPublishStatus:', error);
    toast.error("Gagal mengubah status pengumuman");
    return null;
  }
};

// Simplified toggle important function with better error handling
export const toggleAnnouncementImportantStatus = async (
  id: string, 
  currentStatus: boolean
): Promise<Announcement | null> => {
  try {
    console.log(`Toggling important status for announcement ID: ${id}, current status: ${currentStatus}`);
    
    const { data, error } = await supabase
      .from('announcements')
      .update({ 
        important: !currentStatus, 
        updated_at: new Date().toISOString() 
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error toggling announcement important status:', error);
      toast.error(`Gagal mengubah status penting pengumuman: ${error.message}`);
      return null;
    }

    toast.success(
      !currentStatus 
        ? "Pengumuman ditandai sebagai penting"
        : "Pengumuman tidak lagi ditandai penting"
    );
    
    return data as Announcement;
  } catch (error: any) {
    console.error('Unexpected error in toggleAnnouncementImportantStatus:', error);
    toast.error("Gagal mengubah status penting pengumuman");
    return null;
  }
};
