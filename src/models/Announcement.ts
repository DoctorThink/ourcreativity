
// Type definitions for announcements

export interface Announcement {
  id: string;
  title: string;
  content: string;
  category: 'event' | 'recruitment' | 'update' | string;
  date: string; 
  created_at: string;
  updated_at: string;
  published: boolean;
  important: boolean;
  user_id?: string;
  image_url?: string;
  link_url?: string;
}

export interface AnnouncementFormData {
  title: string;
  content: string;
  category: string;
  published: boolean;
  important: boolean;
  image_url?: string;
  link_url?: string;
}
