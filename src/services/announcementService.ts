
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
        title: "Simfoni Pembaharuan: OUR CREATIVITY v4.0 - Desain Total & Visi Masa Depan!",
        content: "Dengan bangga dan penuh suka cita, kami mempersembahkan OUR CREATIVITY Versi 4.0 – sebuah simfoni pembaharuan yang menandai evolusi terbesar platform kita hingga saat ini! Versi 4.0 adalah hasil dari kerja keras, dedikasi, dan aspirasi kita bersama untuk menciptakan ekosistem kreatif yang sesungguhnya.\n\n**Apa yang Baru di OUR CREATIVITY v4.0: Konsep \"Symphony\"**\n\nKonsep \"Symphony\" mencerminkan harmoni antara desain, fungsionalitas, dan pengalaman pengguna. Kami telah merombak total setiap aspek platform:\n\n<ul><li><strong>Desain Menyeluruh Baru:</strong> Setiap halaman, setiap tombol, setiap interaksi kini mengalun dalam harmoni visual yang baru. Desain yang lebih elegan, modern, dan kohesif di semua lini.</li><li><strong>Performa Lebih Cepat:</strong> Kami telah melakukan optimasi mendalam di sisi backend dan frontend, menghasilkan waktu muat yang lebih cepat dan responsivitas yang lebih baik.</li><li><strong>Navigasi Intuitif:</strong> Alur kerja (workflow) dan navigasi telah didesain ulang dari dasar untuk memastikan Anda dapat menemukan apa yang Anda butuhkan dan mengakses fitur dengan lebih mudah dan efisien.</li><li><strong>Peningkatan Fitur yang Ada:</strong> Berbagai fitur yang sudah Anda kenal kini hadir dengan peningkatan fungsionalitas dan kemudahan penggunaan.</li></ul>\n\n**Visi Masa Depan: Evolusi Berikutnya**\n\nOUR CREATIVITY v4.0 akan menjadi Pembaruan Mayor Terakhir untuk versi website ini. Mengapa? Karena ini adalah fondasi kokoh bagi langkah besar kita selanjutnya. Web Developer utama kita, Ardelyo, saat ini sedang dalam tahap pembelajaran intensif untuk pengembangan Aplikasi Mobile OUR CREATIVITY. Ini adalah impian kita untuk membawa platform ini ke puncak global, memungkinkan Anda berkarya dan berkolaborasi tanpa batas, langsung dari genggaman Anda.\n\nPerjalanan ini membutuhkan dukungan luar biasa. Untuk mendukung pengembangan berkelanjutan, riset aplikasi mobile, dan biaya operasional server, kami dengan rendah hati mengajak Anda untuk memberikan donasi melalui:\n**[https://saweria.co/ardelyo](https://saweria.co/ardelyo)**\n\nSetiap kontribusi Anda, sekecil apapun, akan sangat berarti bagi masa depan OUR CREATIVITY.\n\nTerima kasih telah menjadi bagian dari perjalanan luar biasa ini. Mari bersama-sama wujudkan Simfoni Kreativitas tanpa batas!",
        category: 'update',
        important: true,
        published: true,
        date: new Date('2025-05-20T09:00:00').toISOString(),
        image_url: null // As specified, or remove if no image for this version
      },
      {
        title: "Wajah Baru OurCreativity: Memperkenalkan Desain 'Creative Constellations'!",
        content: "Salam Kreator! Kami sangat bersemangat mempersembahkan Wajah Baru OurCreativity melalui pembaruan versi 3.5! Terinspirasi oleh keindahan dan keteraturan kosmos, kami memperkenalkan konsep desain \"Creative Constellations\".\n\nPembaruan ini menghadirkan antarmuka yang lebih modern, bersih, dan intuitif, dengan referensi kuat pada estetika desain iOS yang elegan dan fungsional. Navigasi telah disederhanakan, palet warna diperbarui untuk kenyamanan visual, dan interaksi mikro dirancang untuk membuat pengalaman Anda menjelajahi dan berkarya menjadi lebih mulus dan menyenangkan.\n\nTemukan harmoni baru dalam setiap klik dan biarkan kreativitas Anda bersinar di antara konstelasi karya lainnya! Kami harap Anda menikmati Wajah Baru OurCreativity!",
        category: 'update',
        important: false,
        published: true,
        date: new Date('2025-04-02T09:00:00').toISOString(),
        image_url: null
      },
      {
        title: "Update v3.7: Memperkenalkan 'Karya Kami' - Unggah Karya Kini Lebih Mudah & Gratis!",
        content: "Halo Komunitas OurCreativity! Pembaruan versi 3.7 hadir membawa kabar gembira, terutama bagi Anda yang aktif berkarya. Kami dengan bangga meluncurkan fitur \"Karya Kami\"!\n\nFitur \"Karya Kami\" dirancang untuk mempermudah Anda mengunggah, mengelola, dan memamerkan semua hasil kreativitas Anda kepada komunitas – dan semuanya gratis! Proses unggah kini lebih ringkas, mendukung berbagai format file, dan dilengkapi dengan opsi pengaturan privasi yang lebih baik untuk setiap karya.\n\nKami percaya bahwa setiap karya berhak mendapatkan panggungnya. Mulai sekarang, bagikan mahakarya Anda dengan lebih mudah dan jangkau audiens yang lebih luas di OurCreativity!",
        category: 'update',
        important: false,
        published: true,
        date: new Date('2025-04-11T09:00:00').toISOString(),
        image_url: null
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

    const announcementsToInsert: AnnouncementFormData[] = [];
    let newAnnouncementsCount = 0;

    for (const predefinedItem of predefinedAnnouncements) {
      // Check if an announcement with the same title already exists
      const { data: existing, error: checkError } = await supabase
        .from('announcements')
        .select('id, title') // Select title for logging if needed
        .eq('title', predefinedItem.title)
        .maybeSingle(); // Use maybeSingle to not error if no row found

      if (checkError && checkError.code !== 'PGRST116') { // PGRST116 is "No rows found"
        console.error(`Error checking for existing announcement with title "${predefinedItem.title}":`, checkError);
        // Optionally, decide to throw an error or continue to the next item
        // For this implementation, we'll log and skip this item to be robust.
        continue; 
      }

      if (!existing) {
        // Type assertion needed as predefinedItem matches AnnouncementFormData structure
        announcementsToInsert.push(predefinedItem as AnnouncementFormData);
      } else {
        console.log(`Announcement with title "${predefinedItem.title}" already exists. Skipping.`);
      }
    }

    if (announcementsToInsert.length > 0) {
      const { data, error: insertError } = await supabase
        .from('announcements')
        .insert(announcementsToInsert)
        .select();

      if (insertError) {
        console.error('Error inserting new predefined announcements:', insertError);
        throw new Error(`Failed to insert new predefined announcements: ${insertError.message}`);
      }
      
      newAnnouncementsCount = data?.length || 0;
      console.log(`Successfully added ${newAnnouncementsCount} new predefined announcements.`);
    } else {
      console.log('No new predefined announcements to add. All predefined items already exist or encountered check errors.');
    }

    return newAnnouncementsCount > 0; // Return true if any new announcements were added
  } catch (error) {
    // Log the error, but don't re-throw if it's a known "no rows" or similar non-critical issue from checks
    // The specific error handling strategy might depend on how critical a partial failure is.
    // For now, if an error occurs during the insert itself, it will be thrown from the insert block.
    // Errors during checks are logged and skipped.
    console.error('Error in addPredefinedAnnouncements process:', error);
    throw error;
  }
};
