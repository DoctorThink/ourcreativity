
import { Announcement } from "@/models/Announcement";

// DEPRECATED: This service is being replaced by localAnnouncementService
// These are placeholder implementations for backward compatibility

export const fetchAnnouncements = async (): Promise<Announcement[]> => {
  console.warn("fetchAnnouncements is deprecated, use localAnnouncementService instead");
  return [];
};

export const fetchFeaturedAnnouncement = async (): Promise<Announcement | null> => {
  console.warn("fetchFeaturedAnnouncement is deprecated, use localAnnouncementService instead");
  return null;
};

// Add other placeholder functions if needed
export const createAnnouncement = async (data: any): Promise<Announcement> => {
  console.warn("createAnnouncement is deprecated, use adminAnnouncementService instead");
  throw new Error("This service is deprecated");
};

export const updateAnnouncement = async (id: string, data: any): Promise<Announcement> => {
  console.warn("updateAnnouncement is deprecated, use adminAnnouncementService instead");
  throw new Error("This service is deprecated");
};

export const deleteAnnouncement = async (id: string): Promise<void> => {
  console.warn("deleteAnnouncement is deprecated, use adminAnnouncementService instead");
  throw new Error("This service is deprecated");
};
