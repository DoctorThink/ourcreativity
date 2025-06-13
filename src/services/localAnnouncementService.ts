
import { Announcement } from "@/models/Announcement";

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchLocalAnnouncements = async (filter: string = 'all'): Promise<Announcement[]> => {
  console.log(`Fetching local announcements with filter: ${filter}`);
  await delay(300); // Simulate network delay

  const response = await fetch('/data/announcements.json');
  if (!response.ok) throw new Error('Failed to fetch announcements');
  const announcementsData: Announcement[] = await response.json();
  
  let filteredAnnouncements = announcementsData.filter(announcement => announcement.published);
  
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

  const response = await fetch('/data/announcements.json');
  if (!response.ok) throw new Error('Failed to fetch announcements');
  const announcementsData: Announcement[] = await response.json();
  
  const featured = announcementsData.find(announcement => announcement.published && announcement.important);
  console.log('Local featured announcement result:', featured);
  return featured || null;
};
