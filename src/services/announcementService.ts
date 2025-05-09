
import { supabase } from "@/integrations/supabase/client";
import { Announcement, AnnouncementFormData } from "@/models/Announcement";
import { toast } from "sonner";

// Fetch announcements with simplified error handling
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

// Fetch announcement by ID
export const fetchAnnouncementById = async (id: string): Promise<Announcement | null> => {
  try {
    console.log(`Fetching announcement with ID: ${id}`);
    
    const { data, error } = await supabase
      .from('announcements')
      .select('*')
      .eq('id', id)
      .maybeSingle();

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

// Fetch featured announcement
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

// Create announcement
export const createAnnouncement = async (formData: AnnouncementFormData): Promise<Announcement | null> => {
  try {
    console.log('Creating new announcement:', formData);
    
    const announcementData = {
      title: formData.title,
      content: formData.content,
      category: formData.category,
      published: formData.published,
      important: formData.important,
      image_url: formData.image_url || null,
      link_url: formData.link_url || null,
      date: new Date().toISOString()
    };
    
    const { data, error } = await supabase
      .from('announcements')
      .insert([announcementData])
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

// Update announcement
export const updateAnnouncement = async (
  id: string, 
  formData: AnnouncementFormData
): Promise<Announcement | null> => {
  try {
    console.log(`Updating announcement with ID: ${id}`, formData);
    
    const announcementData = {
      title: formData.title,
      content: formData.content,
      category: formData.category,
      published: formData.published,
      important: formData.important,
      image_url: formData.image_url || null,
      link_url: formData.link_url || null,
      updated_at: new Date().toISOString()
    };
    
    const { data, error } = await supabase
      .from('announcements')
      .update(announcementData)
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

// Delete announcement
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

// Add predefined announcements
export const addPredefinedAnnouncements = async (): Promise<boolean> => {
  try {
    const announcements = [
      {
        title: "OUR CREATIVITY 4.0 - Official Launch",
        content: "Dengan bangga kami mengumumkan peluncuran resmi OUR CREATIVITY versi 4.0! Versi terbaru ini membawa banyak peningkatan pada platform komunitas kita, termasuk antarmuka yang lebih responsif, sistem pengumuman yang lebih baik, dan integrasi dengan Supabase yang memberikan pengalaman yang lebih mulus.\n\nBeberapa fitur unggulan dari versi 4.0 ini meliputi:\n- Desain yang sepenuhnya responsif untuk semua perangkat\n- Sistem manajemen pengumuman yang disederhanakan\n- Integrasi backend yang lebih kuat dengan Supabase\n- Peningkatan kecepatan dan keamanan\n\nKami mengundang seluruh komunitas untuk menjelajahi fitur-fitur baru dan memberikan masukan untuk perbaikan lebih lanjut.",
        category: "update",
        published: true,
        important: true,
        date: new Date().toISOString()
      },
      {
        title: "OUR CREATIVITY 3.7 - Update Sebelumnya",
        content: "Pada update versi 3.7, kami telah melakukan beberapa perbaikan dan penambahan fitur pada platform OUR CREATIVITY. Update ini berfokus pada peningkatan pengalaman pengguna dan stabilitas sistem.\n\nBeberapa perubahan yang kami lakukan:\n- Perbaikan bug pada fitur upload karya\n- Optimasi kecepatan loading halaman\n- Penambahan kategori baru untuk karya kreatif\n- Peningkatan tampilan profil anggota\n\nUpdate 3.7 merupakan langkah penting menuju platform yang lebih stabil dan user-friendly.",
        category: "update",
        published: true,
        important: false,
        date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days ago
      },
      {
        title: "OUR CREATIVITY 3.5 - Major Update",
        content: "OUR CREATIVITY versi 3.5 membawa perubahan signifikan pada arsitektur platform kami. Update ini meningkatkan fondasi teknis dari platform untuk mendukung pertumbuhan komunitas yang semakin pesat.\n\nHighlight dari update 3.5:\n- Migrasi ke framework modern untuk frontend\n- Peningkatan sistem keamanan\n- Fitur notifikasi real-time\n- Sistem komentar yang ditingkatkan untuk interaksi antar anggota\n\nUpgrade ini memungkinkan kami untuk mengembangkan fitur-fitur baru dengan lebih cepat dan efisien di masa mendatang.",
        category: "update",
        published: true,
        important: false,
        date: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString() // 90 days ago
      },
      {
        title: "OUR CREATIVITY 3.0 - Official Launch",
        content: "Selamat datang di era baru OUR CREATIVITY! Versi 3.0 menandai tonggak penting dalam perjalanan kami sebagai komunitas kreator.\n\nVersi 3.0 menghadirkan:\n- Desain ulang total pada seluruh antarmuka\n- Sistem manajemen karya yang lebih intuitif\n- Kategorisasi yang lebih baik untuk berbagai jenis karya kreatif\n- Dukungan untuk kolaborasi antar kreator\n\nKami sangat antusias melihat bagaimana komunitas akan berkembang dengan platform baru ini. Terima kasih atas dukungan yang terus-menerus dari semua anggota OUR CREATIVITY.",
        category: "update",
        published: true,
        important: false,
        date: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString() // 180 days ago
      }
    ];

    // Check if announcements already exist
    const { data: existingAnnouncements } = await supabase
      .from('announcements')
      .select('title')
      .in('title', announcements.map(a => a.title));

    // Filter out announcements that already exist
    const newAnnouncements = announcements.filter(
      announcement => !existingAnnouncements?.some(
        existing => existing.title === announcement.title
      )
    );

    if (newAnnouncements.length === 0) {
      console.log('All predefined announcements already exist');
      return true;
    }

    const { error } = await supabase
      .from('announcements')
      .insert(newAnnouncements);

    if (error) {
      console.error('Error adding predefined announcements:', error);
      toast.error(`Gagal menambahkan pengumuman predefinisi: ${error.message}`);
      return false;
    }

    console.log(`Successfully added ${newAnnouncements.length} predefined announcements`);
    toast.success(`${newAnnouncements.length} pengumuman predefinisi berhasil ditambahkan`);
    return true;
  } catch (error: any) {
    console.error('Unexpected error in addPredefinedAnnouncements:', error);
    toast.error('Gagal menambahkan pengumuman predefinisi');
    return false;
  }
};

// Toggle announcement publish status
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

// Toggle announcement important status
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
