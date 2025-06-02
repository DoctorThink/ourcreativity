
import { Announcement } from "@/models/Announcement";

// Local announcements data
const localAnnouncements: Announcement[] = [
  {
    id: "1",
    title: "Pengumuman Penting: Update Sistem v4.0",
    content: "Tim OUR CREATIVITY dengan bangga mengumumkan peluncuran sistem versi 4.0 yang membawa berbagai peningkatan signifikan untuk pengalaman komunitas yang lebih baik.\n\n**Fitur Baru:**\n- Interface yang lebih modern dan responsif\n- Sistem notifikasi real-time\n- Dashboard anggota yang diperbaharui\n- Integrasi media sosial yang lebih baik\n\n**Peningkatan Performa:**\n- Loading time yang 50% lebih cepat\n- Optimalisasi database\n- Caching yang ditingkatkan\n\nTerima kasih atas dukungan dan feedback yang telah diberikan. Mari bersama-sama menjadikan komunitas ini semakin berkembang!",
    category: "update",
    date: "2024-01-15T00:00:00.000Z",
    created_at: "2024-01-15T08:00:00.000Z",
    updated_at: "2024-01-15T08:00:00.000Z",
    important: true,
    published: true,
    image_url: undefined,
    link_url: undefined
  },
  {
    id: "2",
    title: "Rekrutmen Tim Kreatif Batch 2024",
    content: "OUR CREATIVITY membuka kesempatan bagi talenta-talenta kreatif untuk bergabung dengan tim kami!\n\n**Posisi yang Tersedia:**\n- Graphic Designer (2 posisi)\n- Video Editor (2 posisi)\n- Content Writer (1 posisi)\n- Social Media Specialist (1 posisi)\n\n**Persyaratan:**\n- Mahasiswa aktif atau fresh graduate\n- Memiliki passion di bidang kreatif\n- Mampu bekerja dalam tim\n- Memiliki portofolio yang relevan\n\n**Timeline:**\n- Pendaftaran: 10-25 Januari 2024\n- Seleksi berkas: 26-30 Januari 2024\n- Interview: 1-5 Februari 2024\n- Pengumuman: 8 Februari 2024\n\nDaftar sekarang melalui link yang tersedia!",
    category: "recruitment",
    date: "2024-01-10T00:00:00.000Z",
    created_at: "2024-01-10T09:00:00.000Z",
    updated_at: "2024-01-10T09:00:00.000Z",
    important: true,
    published: true,
    image_url: undefined,
    link_url: "https://forms.gle/recruitment2024"
  },
  {
    id: "3",
    title: "Workshop \"Creative Thinking & Innovation\"",
    content: "Join us untuk workshop eksklusif tentang Creative Thinking & Innovation yang akan diselenggarakan pada:\n\n**Detail Acara:**\n- Tanggal: 20 Januari 2024\n- Waktu: 09:00 - 16:00 WIB\n- Tempat: Auditorium Kampus\n- Kapasitas: 100 peserta\n\n**Materi Workshop:**\n- Fundamental Creative Thinking\n- Innovation Methodology\n- Design Thinking Process\n- Case Study & Practice\n\n**Pembicara:**\n- John Doe - Creative Director at ABC Agency\n- Jane Smith - Innovation Consultant\n- Alex Johnson - Design Thinking Expert\n\nDaftarkan diri Anda segera karena tempat terbatas!",
    category: "event",
    date: "2024-01-20T00:00:00.000Z",
    created_at: "2024-01-08T10:00:00.000Z",
    updated_at: "2024-01-08T10:00:00.000Z",
    important: false,
    published: true,
    image_url: undefined,
    link_url: "https://forms.gle/workshop2024"
  },
  {
    id: "4",
    title: "Pengumuman Libur Semester",
    content: "Mengikuti kalender akademik, kegiatan komunitas OUR CREATIVITY akan mengalami penyesuaian jadwal selama periode libur semester.\n\n**Jadwal Libur:**\n- Mulai: 15 Januari 2024\n- Berakhir: 25 Februari 2024\n\n**Kegiatan yang Tetap Berjalan:**\n- Forum online discussion\n- Project collaboration (remote)\n- Social media updates\n\n**Kegiatan yang Ditunda:**\n- Workshop offline\n- Team meeting regular\n- Event gathering\n\nKami akan kembali dengan semangat baru setelah libur semester. Stay connected!",
    category: "update",
    date: "2024-01-05T00:00:00.000Z",
    created_at: "2024-01-05T14:00:00.000Z",
    updated_at: "2024-01-05T14:00:00.000Z",
    important: false,
    published: true,
    image_url: undefined,
    link_url: undefined
  },
  {
    id: "5",
    title: "Kompetisi Design Poster Earth Day",
    content: "Dalam rangka memperingati Hari Bumi, OUR CREATIVITY mengadakan kompetisi design poster dengan tema \"Save Our Planet\".\n\n**Detail Kompetisi:**\n- Tema: Save Our Planet\n- Format: Digital poster (A3)\n- Deadline: 20 April 2024\n- Pengumuman: 22 April 2024\n\n**Hadiah:**\n- Juara 1: Rp 1.000.000 + Sertifikat\n- Juara 2: Rp 750.000 + Sertifikat\n- Juara 3: Rp 500.000 + Sertifikat\n- 10 Peserta Terbaik: Merchandise exclusive\n\n**Syarat & Ketentuan:**\n- Karya original dan belum pernah dipublikasikan\n- Resolusi minimum 300 DPI\n- Format file: PNG/JPG/PDF\n\nTunjukkan kreativitasmu untuk bumi yang lebih hijau!",
    category: "event",
    date: "2024-03-15T00:00:00.000Z",
    created_at: "2024-03-15T11:00:00.000Z",
    updated_at: "2024-03-15T11:00:00.000Z",
    important: false,
    published: true,
    image_url: undefined,
    link_url: "https://forms.gle/earthday2024"
  },
  {
    id: "6",
    title: "Update Kebijakan Komunitas",
    content: "Demi menjaga kenyamanan dan profesionalitas komunitas, kami melakukan update pada beberapa kebijakan komunitas.\n\n**Kebijakan Baru:**\n- Penggunaan bahasa yang sopan dan professional\n- Larangan spam atau promotional content berlebihan\n- Respect terhadap karya dan pendapat anggota lain\n- Wajib mencantumkan credit untuk karya kolaborasi\n\n**Konsekuensi Pelanggaran:**\n- Peringatan pertama: Warning tertulis\n- Pelanggaran kedua: Temporary suspension (7 hari)\n- Pelanggaran ketiga: Permanent ban\n\n**Berlaku Efektif:** 1 Februari 2024\n\nKebijakan lengkap dapat dibaca di website resmi komunitas.",
    category: "update",
    date: "2024-01-25T00:00:00.000Z",
    created_at: "2024-01-25T16:00:00.000Z",
    updated_at: "2024-01-25T16:00:00.000Z",
    important: true,
    published: true,
    image_url: undefined,
    link_url: "https://ourcreativity.com/policies"
  }
];

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchLocalAnnouncements = async (filter: string = 'all'): Promise<Announcement[]> => {
  console.log(`Fetching local announcements with filter: ${filter}`);
  await delay(300); // Simulate network delay
  
  let filteredAnnouncements = localAnnouncements.filter(announcement => announcement.published);
  
  if (filter !== 'all') {
    filteredAnnouncements = filteredAnnouncements.filter(announcement => announcement.category === filter);
  }
  
  // Sort by important first, then by date
  filteredAnnouncements.sort((a, b) => {
    if (a.important && !b.important) return -1;
    if (!a.important && b.important) return 1;
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });
  
  console.log(`Fetched ${filteredAnnouncements.length} local announcements`);
  return filteredAnnouncements;
};

export const fetchLocalFeaturedAnnouncement = async (): Promise<Announcement | null> => {
  console.log('Fetching local featured announcement...');
  await delay(200);
  
  const featured = localAnnouncements.find(announcement => announcement.published && announcement.important);
  console.log('Local featured announcement result:', featured);
  return featured || null;
};
