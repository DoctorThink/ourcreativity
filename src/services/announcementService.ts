
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';
import { toast } from "sonner";

type AnnouncementType = Database['public']['Tables']['announcements']['Row'];
type AnnouncementInsert = Database['public']['Tables']['announcements']['Insert'];
type AnnouncementUpdate = Database['public']['Tables']['announcements']['Update'];

export const fetchAnnouncements = async (filter: string = 'all', publishedOnly: boolean = true): Promise<AnnouncementType[]> => {
  try {
    let query = supabase.from('announcements').select('*');
    
    if (publishedOnly) {
      query = query.eq('published', true);
    }
    
    if (filter !== 'all') {
      query = query.eq('category', filter);
    }
    
    query = query.order('important', { ascending: false })
             .order('created_at', { ascending: false });

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching announcements:', error);
      toast.error('Gagal memuat pengumuman');
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Service error:', error);
    toast.error('Gagal memuat pengumuman');
    throw error;
  }
};

export const fetchFeaturedAnnouncement = async (): Promise<AnnouncementType | null> => {
  try {
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

    return data;
  } catch (error) {
    console.error('Service error:', error);
    return null;
  }
};

export const fetchAllAnnouncements = async (): Promise<AnnouncementType[]> => {
  try {
    const { data, error } = await supabase
      .from('announcements')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching all announcements:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Service error:', error);
    throw error;
  }
};

export const createAnnouncement = async (announcement: AnnouncementInsert): Promise<AnnouncementType> => {
  try {
    const { data, error } = await supabase
      .from('announcements')
      .insert(announcement)
      .select()
      .single();

    if (error) {
      console.error('Error creating announcement:', error);
      toast.error('Gagal membuat pengumuman');
      throw error;
    }

    toast.success('Pengumuman berhasil dibuat');
    return data;
  } catch (error) {
    console.error('Service error:', error);
    toast.error('Gagal membuat pengumuman');
    throw error;
  }
};

export const updateAnnouncement = async (id: string, updates: AnnouncementUpdate): Promise<AnnouncementType> => {
  try {
    const { data, error } = await supabase
      .from('announcements')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating announcement:', error);
      toast.error('Gagal memperbarui pengumuman');
      throw error;
    }

    toast.success('Pengumuman berhasil diperbarui');
    return data;
  } catch (error) {
    console.error('Service error:', error);
    toast.error('Gagal memperbarui pengumuman');
    throw error;
  }
};

export const deleteAnnouncement = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('announcements')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting announcement:', error);
      toast.error('Gagal menghapus pengumuman');
      throw error;
    }

    toast.success('Pengumuman berhasil dihapus');
    return true;
  } catch (error) {
    console.error('Service error:', error);
    toast.error('Gagal menghapus pengumuman');
    throw error;
  }
};

export const toggleAnnouncementPublishStatus = async (id: string, currentStatus: boolean): Promise<AnnouncementType> => {
  try {
    const { data, error } = await supabase
      .from('announcements')
      .update({ published: !currentStatus })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error toggling publish status:', error);
      toast.error('Gagal mengubah status publikasi');
      throw error;
    }

    toast.success(`Pengumuman ${!currentStatus ? 'dipublikasikan' : 'disembunyikan'}`);
    return data;
  } catch (error) {
    console.error('Service error:', error);
    toast.error('Gagal mengubah status publikasi');
    throw error;
  }
};

export const toggleAnnouncementImportantStatus = async (id: string, currentStatus: boolean): Promise<AnnouncementType> => {
  try {
    const { data, error } = await supabase
      .from('announcements')
      .update({ important: !currentStatus })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error toggling important status:', error);
      toast.error('Gagal mengubah status penting');
      throw error;
    }

    toast.success(`Pengumuman ${!currentStatus ? 'ditandai sebagai penting' : 'tidak lagi penting'}`);
    return data;
  } catch (error) {
    console.error('Service error:', error);
    toast.error('Gagal mengubah status penting');
    throw error;
  }
};

export const addPredefinedAnnouncements = async (): Promise<boolean> => {
  const predefinedAnnouncements = [
    {
      title: "Gerakan 27 April - Tragedi Pembantaian Terbesar",
      content: "Mengenang tragedi yang terjadi pada 27 April, pembantaian terbesar dalam sejarah komunitas kami. Lebih dari 300 member menjadi korban dalam peristiwa kelam ini.\n\nKorban terdiri dari:\n- Member sideR atau nonaktif\n- Beberapa member aktif yang juga terkena dampak\n\nTragedi ini terjadi di edisi desain dan meme, meninggalkan luka mendalam bagi seluruh komunitas.\n\nMari kita kenang mereka yang telah tiada dan berkomitmen untuk tidak mengulangi kesalahan serupa.",
      category: "memorial",
      important: true,
      published: true,
      image_url: null
    }
  ];

  try {
    for (const announcement of predefinedAnnouncements) {
      await createAnnouncement(announcement);
    }
    toast.success('Pengumuman predefinisi berhasil ditambahkan');
    return true;
  } catch (error) {
    console.error('Error adding predefined announcements:', error);
    toast.error('Gagal menambahkan pengumuman predefinisi');
    throw error;
  }
};
