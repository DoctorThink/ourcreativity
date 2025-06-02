
import { Announcement, AnnouncementFormData } from "@/models/Announcement";

// Local storage for announcements (in a real app, this would be a proper backend)
let localAnnouncements: Announcement[] = [
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
  }
];

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const createAnnouncement = async (data: AnnouncementFormData): Promise<Announcement> => {
  await delay(500);
  
  const newAnnouncement: Announcement = {
    id: Date.now().toString(),
    ...data,
    date: new Date().toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  
  localAnnouncements.unshift(newAnnouncement);
  console.log('Created announcement:', newAnnouncement);
  return newAnnouncement;
};

export const updateAnnouncement = async (id: string, data: Partial<AnnouncementFormData>): Promise<Announcement> => {
  await delay(500);
  
  const index = localAnnouncements.findIndex(a => a.id === id);
  if (index === -1) {
    throw new Error('Announcement not found');
  }
  
  localAnnouncements[index] = {
    ...localAnnouncements[index],
    ...data,
    updated_at: new Date().toISOString(),
  };
  
  console.log('Updated announcement:', localAnnouncements[index]);
  return localAnnouncements[index];
};

export const deleteAnnouncement = async (id: string): Promise<void> => {
  await delay(300);
  
  const index = localAnnouncements.findIndex(a => a.id === id);
  if (index === -1) {
    throw new Error('Announcement not found');
  }
  
  localAnnouncements.splice(index, 1);
  console.log('Deleted announcement with id:', id);
};

export const toggleAnnouncementPublishStatus = async (id: string): Promise<Announcement> => {
  await delay(300);
  
  const index = localAnnouncements.findIndex(a => a.id === id);
  if (index === -1) {
    throw new Error('Announcement not found');
  }
  
  localAnnouncements[index].published = !localAnnouncements[index].published;
  localAnnouncements[index].updated_at = new Date().toISOString();
  
  console.log('Toggled publish status for announcement:', localAnnouncements[index]);
  return localAnnouncements[index];
};

export const toggleAnnouncementImportantStatus = async (id: string): Promise<Announcement> => {
  await delay(300);
  
  const index = localAnnouncements.findIndex(a => a.id === id);
  if (index === -1) {
    throw new Error('Announcement not found');
  }
  
  localAnnouncements[index].important = !localAnnouncements[index].important;
  localAnnouncements[index].updated_at = new Date().toISOString();
  
  console.log('Toggled important status for announcement:', localAnnouncements[index]);
  return localAnnouncements[index];
};

export const fetchAnnouncements = async (filter: string = 'all'): Promise<Announcement[]> => {
  await delay(300);
  
  let filteredAnnouncements = [...localAnnouncements];
  
  if (filter !== 'all') {
    filteredAnnouncements = filteredAnnouncements.filter(announcement => announcement.category === filter);
  }
  
  // Sort by important first, then by date
  filteredAnnouncements.sort((a, b) => {
    if (a.important && !b.important) return -1;
    if (!a.important && b.important) return 1;
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });
  
  console.log(`Fetched ${filteredAnnouncements.length} announcements`);
  return filteredAnnouncements;
};

export const fetchFeaturedAnnouncement = async (): Promise<Announcement | null> => {
  await delay(200);
  
  const featured = localAnnouncements.find(announcement => announcement.published && announcement.important);
  console.log('Featured announcement result:', featured);
  return featured || null;
};
