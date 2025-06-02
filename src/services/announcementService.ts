// This file is now deprecated - all announcement functionality has been moved to localAnnouncementService.ts
// Keeping this file to prevent import errors, but it should not be used

import { Announcement } from "@/models/Announcement";

// Placeholder functions that redirect to local service
export const fetchAnnouncements = async (): Promise<Announcement[]> => {
  console.warn("announcementService.ts is deprecated. Use localAnnouncementService.ts instead");
  return [];
};

export const createAnnouncement = async (announcement: any): Promise<boolean> => {
  console.warn("announcementService.ts is deprecated. Use localAnnouncementService.ts instead");
  return false;
};

export const updateAnnouncement = async (id: string, updates: any): Promise<boolean> => {
  console.warn("announcementService.ts is deprecated. Use localAnnouncementService.ts instead");
  return false;
};

export const deleteAnnouncement = async (id: string): Promise<boolean> => {
  console.warn("announcementService.ts is deprecated. Use localAnnouncementService.ts instead");
  return false;
};

export const publishAnnouncement = async (id: string): Promise<boolean> => {
  console.warn("announcementService.ts is deprecated. Use localAnnouncementService.ts instead");
  return false;
};

export const unpublishAnnouncement = async (id: string): Promise<boolean> => {
  console.warn("announcementService.ts is deprecated. Use localAnnouncementService.ts instead");
  return false;
};

export const toggleAnnouncementImportantStatus = async (id: string): Promise<boolean> => {
  console.warn("announcementService.ts is deprecated. Use localAnnouncementService.ts instead");
  return false;
};
