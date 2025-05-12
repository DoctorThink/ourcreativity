
import { supabase } from '@/integrations/supabase/client';
import { Announcement, AnnouncementFormData } from '@/models/Announcement';

// Fetch all announcements or filtered by category
export const fetchAnnouncements = async (filter: string = 'all'): Promise<Announcement[]> => {
  try {
    console.log(`Fetching announcements with filter: ${filter}`);

    let query = supabase
      .from('announcements')
      .select('*')
      .eq('published', true)
      .order('date', { ascending: false })
      .order('created_at', { ascending: false });

    // Apply category filter if not "all"
    if (filter !== 'all') {
      query = query.eq('category', filter);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching announcements:', error);
      throw new Error(`Failed to fetch announcements: ${error.message}`);
    }

    console.log(`Fetched ${data?.length || 0} announcements`);
    return data || [];

  } catch (error) {
    console.error('Error in fetchAnnouncements:', error);
    throw error;
  }
};

// Fetch featured announcement (important one)
export const fetchFeaturedAnnouncement = async (): Promise<Announcement | null> => {
  try {
    console.log('Fetching featured announcement');
    
    const { data, error } = await supabase
      .from('announcements')
      .select('*')
      .eq('published', true)
      .eq('important', true)
      .order('date', { ascending: false })
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error) {
      // PGRST116 is "No rows returned" error code, which is expected if no featured announcement
      if (error.code === 'PGRST116') {
        console.log('No featured announcement found');
        return null;
      }
      
      console.error('Error fetching featured announcement:', error);
      throw new Error(`Failed to fetch featured announcement: ${error.message}`);
    }

    console.log('Featured announcement found:', data);
    return data;

  } catch (error) {
    console.error('Error in fetchFeaturedAnnouncement:', error);
    // If the error is "No rows returned", we return null instead of throwing
    if (error instanceof Error && error.message.includes('No rows returned')) {
      return null;
    }
    throw error;
  }
};

// Add a new announcement
export const addAnnouncement = async (announcement: AnnouncementFormData): Promise<Announcement> => {
  try {
    const { data, error } = await supabase
      .from('announcements')
      .insert([announcement])
      .select()
      .single();

    if (error) {
      console.error('Error adding announcement:', error);
      throw new Error(`Failed to add announcement: ${error.message}`);
    }

    return data;
  } catch (error) {
    console.error('Error in addAnnouncement:', error);
    throw error;
  }
};

// Update an existing announcement
export const updateAnnouncement = async (id: string, announcement: Partial<AnnouncementFormData>): Promise<Announcement> => {
  try {
    const { data, error } = await supabase
      .from('announcements')
      .update(announcement)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating announcement:', error);
      throw new Error(`Failed to update announcement: ${error.message}`);
    }

    return data;
  } catch (error) {
    console.error('Error in updateAnnouncement:', error);
    throw error;
  }
};

// Delete an announcement
export const deleteAnnouncement = async (id: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('announcements')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting announcement:', error);
      throw new Error(`Failed to delete announcement: ${error.message}`);
    }
  } catch (error) {
    console.error('Error in deleteAnnouncement:', error);
    throw error;
  }
};

// Add predefined announcements for testing/demo purposes
export const addPredefinedAnnouncements = async (): Promise<boolean> => {
  try {
    const predefinedAnnouncements = [
      {
        title: 'Gerakan 27 April - Mengenang Tragedi Pembantaian SideR',
        content: `Mengenang tragedi yang menjadi pembantaian terbesar dalam sejarah komunitas OUR CREATIVITY. 300+ member dari kalangan SideR (member non-aktif) menjadi korban. Di antara korban juga terdapat beberapa member aktif yang terkena dampak.\n\nTragedi ini terjadi terutama di edisi Desain dan Meme, mengakibatkan hilangnya banyak talent kreatif dari komunitas kita. Gerakan 27 April dibuat untuk mengenang dan memastikan bahwa peristiwa ini tidak terulang kembali.\n\nKami mengundang seluruh anggota komunitas untuk hadir dalam acara memorial virtual yang akan diadakan pada tanggal 27 April 2025. Acara ini akan mencakup:\n\n1. Penghormatan terhadap member yang terdampak\n2. Diskusi tentang kebijakan baru tentang perlindungan member\n3. Peluncuran program reintegrasi untuk mantan member SideR\n\nMari kita bersama-sama membangun komunitas yang lebih inklusif dan saling mendukung.`,
        category: 'event',
        important: true,
        published: true,
        date: new Date('2025-04-27T18:00:00').toISOString(),
        image_url: 'https://picsum.photos/id/255/800/400'
      },
      {
        title: 'Peluncuran OUR CREATIVITY Versi 4.0',
        content: 'Kami dengan bangga mengumumkan peluncuran tampilan dan fitur baru OUR CREATIVITY versi 4.0! Versi terbaru ini menampilkan desain yang lebih modern, antarmuka yang lebih mudah digunakan, dan fitur kolaborasi yang disempurnakan untuk semua anggota komunitas. Mulai hari ini, Anda dapat mengakses platform kami yang telah diperbarui dan menikmati semua fitur baru yang kami tawarkan. Terima kasih atas dukungan Anda yang terus-menerus!',
        category: 'update',
        important: true,
        published: true,
        date: new Date().toISOString()
      },
      {
        title: 'Rekrutmen Tim Moderator Konten Juli 2025',
        content: 'Kami sedang mencari anggota komunitas yang berkomitmen dan berdedikasi untuk bergabung dengan tim moderator konten kami. Sebagai moderator konten, Anda akan bertanggung jawab untuk meninjau dan menyetujui kiriman konten, memastikan kepatuhan terhadap pedoman komunitas kami, dan membantu menjaga lingkungan yang positif dan mendukung bagi semua anggota. Jika Anda tertarik untuk bergabung dengan tim kami, silakan kirimkan aplikasi Anda sebelum 30 Juni 2025.',
        category: 'recruitment',
        important: false,
        published: true,
        date: new Date('2025-06-15T09:00:00').toISOString()
      },
      {
        title: 'Workshop Ardelyo Unix Series: Desain UI Modern',
        content: 'Bergabunglah dengan kami untuk workshop interaktif yang dipimpin oleh Ardelyo, seorang desainer UI/UX berpengalaman. Dalam workshop ini, Anda akan belajar prinsip-prinsip dasar desain UI modern, teknik wireframing, dan cara membuat prototipe dengan menggunakan alat industri standar. Workshop ini cocok untuk pemula dan desainer berpengalaman yang ingin menyegarkan keterampilan mereka. Tempat terbatas, jadi daftar sekarang untuk mengamankan tempat Anda!',
        category: 'event',
        important: false,
        published: true,
        date: new Date('2025-05-20T14:00:00').toISOString()
      }
    ];

    const { data, error } = await supabase
      .from('announcements')
      .insert(predefinedAnnouncements)
      .select();

    if (error) {
      console.error('Error adding predefined announcements:', error);
      throw new Error(`Failed to add predefined announcements: ${error.message}`);
    }

    console.log(`Added ${data?.length || 0} predefined announcements`);
    return true;
  } catch (error) {
    console.error('Error in addPredefinedAnnouncements:', error);
    throw error;
  }
};
