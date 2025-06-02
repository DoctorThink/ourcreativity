
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

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
