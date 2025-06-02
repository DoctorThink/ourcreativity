
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';
import { AnnouncementFormData } from '@/models/Announcement';
import { toast } from 'sonner';

type AnnouncementType = Database['public']['Tables']['announcements']['Row'];

export const fetchAnnouncements = async (filter: string = 'all'): Promise<AnnouncementType[]> => {
  try {
    console.log(`Fetching announcements with filter: ${filter}`);
    
    let query = supabase
      .from('announcements')
      .select('*')
      .eq('published', true);
    
    if (filter !== 'all') {
      query = query.eq('category', filter);
    }
    
    query = query
      .order('important', { ascending: false })
      .order('created_at', { ascending: false });

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching announcements:', error);
      throw error;
    }

    console.log(`Fetched ${data?.length || 0} announcements`);
    return data || [];
  } catch (error) {
    console.error('Service error:', error);
    throw error;
  }
};

export const fetchFeaturedAnnouncement = async (): Promise<AnnouncementType | null> => {
  try {
    console.log('Fetching featured announcement...');
    
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
      return null;
    }

    console.log('Featured announcement result:', data);
    return data;
  } catch (error) {
    console.error('Service error:', error);
    return null;
  }
};

export const createAnnouncement = async (formData: AnnouncementFormData): Promise<AnnouncementType> => {
  try {
    console.log('Creating announcement:', formData);
    
    const { data, error } = await supabase
      .from('announcements')
      .insert([{
        title: formData.title,
        content: formData.content,
        category: formData.category,
        published: formData.published,
        important: formData.important,
        image_url: formData.image_url,
        link_url: formData.link_url,
      }])
      .select()
      .single();

    if (error) {
      console.error('Error creating announcement:', error);
      toast.error('Gagal membuat pengumuman');
      throw error;
    }

    console.log('Created announcement:', data);
    toast.success('Pengumuman berhasil dibuat');
    return data;
  } catch (error) {
    console.error('Service error:', error);
    throw error;
  }
};

export const updateAnnouncement = async (id: string, formData: AnnouncementFormData): Promise<AnnouncementType> => {
  try {
    console.log('Updating announcement:', id, formData);
    
    const { data, error } = await supabase
      .from('announcements')
      .update({
        title: formData.title,
        content: formData.content,
        category: formData.category,
        published: formData.published,
        important: formData.important,
        image_url: formData.image_url,
        link_url: formData.link_url,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating announcement:', error);
      toast.error('Gagal memperbarui pengumuman');
      throw error;
    }

    console.log('Updated announcement:', data);
    toast.success('Pengumuman berhasil diperbarui');
    return data;
  } catch (error) {
    console.error('Service error:', error);
    throw error;
  }
};

export const deleteAnnouncement = async (id: string): Promise<boolean> => {
  try {
    console.log('Deleting announcement:', id);
    
    const { error } = await supabase
      .from('announcements')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting announcement:', error);
      toast.error('Gagal menghapus pengumuman');
      throw error;
    }

    console.log('Deleted announcement:', id);
    toast.success('Pengumuman berhasil dihapus');
    return true;
  } catch (error) {
    console.error('Service error:', error);
    return false;
  }
};

export const toggleAnnouncementPublishStatus = async (id: string, currentStatus: boolean): Promise<AnnouncementType> => {
  try {
    const newStatus = !currentStatus;
    console.log('Toggling publish status:', id, currentStatus, '->', newStatus);
    
    const { data, error } = await supabase
      .from('announcements')
      .update({ 
        published: newStatus,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error toggling publish status:', error);
      toast.error('Gagal mengubah status publikasi');
      throw error;
    }

    console.log('Toggled publish status:', data);
    toast.success(newStatus ? 'Pengumuman dipublikasikan' : 'Pengumuman disembunyikan');
    return data;
  } catch (error) {
    console.error('Service error:', error);
    throw error;
  }
};

export const toggleAnnouncementImportantStatus = async (id: string, currentStatus: boolean): Promise<AnnouncementType> => {
  try {
    const newStatus = !currentStatus;
    console.log('Toggling important status:', id, currentStatus, '->', newStatus);
    
    const { data, error } = await supabase
      .from('announcements')
      .update({ 
        important: newStatus,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error toggling important status:', error);
      toast.error('Gagal mengubah status penting');
      throw error;
    }

    console.log('Toggled important status:', data);
    toast.success(newStatus ? 'Ditandai sebagai penting' : 'Tanda penting dihapus');
    return data;
  } catch (error) {
    console.error('Service error:', error);
    throw error;
  }
};
