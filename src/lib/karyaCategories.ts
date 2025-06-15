
import { Image, Video, Smile, FileText, LucideProps } from 'lucide-react';
import React from 'react';

export type Category = {
  value: 'design' | 'video' | 'meme' | 'writing';
  label: string;
  icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
  acceptedTypes: string;
  maxSize: number;
  description: string;
  recommended: 'file' | 'editor' | null;
};

export const categories: Category[] = [
  { 
    value: 'design', 
    label: 'Graphic Design', 
    icon: Image, 
    acceptedTypes: 'image/*', 
    maxSize: 5 * 1024 * 1024, // 5MB
    description: 'Unggah karya desain grafis Anda',
    recommended: 'file'
  },
  { 
    value: 'video', 
    label: 'Video Editing', 
    icon: Video, 
    acceptedTypes: 'video/*', 
    maxSize: 50 * 1024 * 1024, // 50MB
    description: 'Bagikan proyek video editing Anda',
    recommended: 'file'
  },
  { 
    value: 'meme', 
    label: 'Meme', 
    icon: Smile, 
    acceptedTypes: 'image/*', 
    maxSize: 5 * 1024 * 1024, // 5MB
    description: 'Buat dan bagikan meme',
    recommended: 'file'
  },
  { 
    value: 'writing', 
    label: 'Karya Tulis', 
    icon: FileText, 
    acceptedTypes: '.pdf,.doc,.docx,.txt',
    maxSize: 10 * 1024 * 1024, // 10MB
    description: 'Tulis atau unggah dokumen Anda',
    recommended: 'editor'
  },
];
