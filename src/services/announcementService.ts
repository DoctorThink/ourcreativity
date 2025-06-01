
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

type AnnouncementType = Database['public']['Tables']['announcements']['Row'];
type AnnouncementInsert = Database['public']['Tables']['announcements']['Insert'];
type AnnouncementUpdate = Database['public']['Tables']['announcements']['Update'];

export const fetchAnnouncements = async (): Promise<AnnouncementType[]> => {
  try {
    const { data, error } = await supabase
      .from('announcements')
      .select('*')
      .eq('published', true)
      .order('important', { ascending: false })
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching announcements:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Service error:', error);
    throw error;
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
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Service error:', error);
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
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Service error:', error);
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
      throw error;
    }
  } catch (error) {
    console.error('Service error:', error);
    throw error;
  }
};

export const toggleAnnouncementPublishStatus = async (id: string): Promise<AnnouncementType> => {
  try {
    // First get the current status
    const { data: current, error: fetchError } = await supabase
      .from('announcements')
      .select('published')
      .eq('id', id)
      .single();

    if (fetchError) {
      console.error('Error fetching current status:', fetchError);
      throw fetchError;
    }

    // Toggle the status
    const { data, error } = await supabase
      .from('announcements')
      .update({ published: !current.published })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error toggling publish status:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Service error:', error);
    throw error;
  }
};

export const toggleAnnouncementImportantStatus = async (id: string): Promise<AnnouncementType> => {
  try {
    // First get the current status
    const { data: current, error: fetchError } = await supabase
      .from('announcements')
      .select('important')
      .eq('id', id)
      .single();

    if (fetchError) {
      console.error('Error fetching current status:', fetchError);
      throw fetchError;
    }

    // Toggle the status
    const { data, error } = await supabase
      .from('announcements')
      .update({ important: !current.important })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error toggling important status:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Service error:', error);
    throw error;
  }
};

export const addPredefinedAnnouncements = async (): Promise<void> => {
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
  } catch (error) {
    console.error('Error adding predefined announcements:', error);
    throw error;
  }
};
