
import { Image, Video, Smile, FileText, LucideIcon } from 'lucide-react';

export type SubmissionType = 'image' | 'video' | 'text';

export type Category = {
  value: 'design' | 'video' | 'meme' | 'writing';
  label: string;
  icon: LucideIcon;
  description: string;
  recommendedInput: SubmissionType;
};

export const categories: Category[] = [
  {
    value: 'design',
    label: 'Graphic Design',
    icon: Image,
    description: 'Unggah karya desain grafis Anda',
    recommendedInput: 'image',
  },
  {
    value: 'video',
    label: 'Video Editing',
    icon: Video,
    description: 'Bagikan proyek video editing Anda',
    recommendedInput: 'video',
  },
  {
    value: 'meme',
    label: 'Meme',
    icon: Smile,
    description: 'Buat dan bagikan meme',
    recommendedInput: 'image',
  },
  {
    value: 'writing',
    label: 'Karya Tulis',
    icon: FileText,
    description: 'Tulis atau unggah dokumen Anda',
    recommendedInput: 'text',
  },
];

export const getInputTypeDetails = (inputType: SubmissionType) => {
  switch (inputType) {
    case 'image':
      return {
        icon: Image,
        label: 'Gambar',
        acceptedFiles: 'image/jpeg, image/png, image/webp, image/gif',
        maxSize: 5 * 1024 * 1024, // 5MB
        maxSizeLabel: '5MB',
      };
    case 'video':
      return {
        icon: Video,
        label: 'Video',
        acceptedFiles: 'video/mp4, video/webm, video/ogg',
        maxSize: 50 * 1024 * 1024, // 50MB
        maxSizeLabel: '50MB',
      };
    case 'text':
      return {
        icon: FileText,
        label: 'Tulisan',
        acceptedFiles: '.pdf,.doc,.docx,.txt',
        maxSize: 10 * 1024 * 1024, // 10MB
        maxSizeLabel: '10MB',
      };
  }
};
