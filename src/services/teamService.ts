
import teamData from '@/data/team.json';
import { Video, Palette, Smile, FileText, Code } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

// A map to convert string icon names from JSON into actual Lucide components
const iconMap: { [key: string]: LucideIcon } = {
  Video,
  Palette,
  Smile,
  FileText,
  Code,
};

// Type definitions for strong type-checking
type AccentColor = "coral" | "emerald" | "amethyst" | "turquoise" | "amber" | "softPink" | "grayMid" | "orangeLight" | "mint";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  category: string;
  categoryId: string;
  avatar: string;
  accentColor: AccentColor;
  bio: string;
  isFeatured: boolean;
  achievements?: string[];
}

export interface TeamCategory {
  id: string;
  name: string;
  icon: string;
  color: "coral" | "turquoise" | "softPink" | "mint" | "orangeLight" | "amethyst";
  description: string;
}

export interface ProcessedCategory extends Omit<TeamCategory, 'icon'> {
  icon: LucideIcon;
  memberCount: number;
  memberAvatars: string[];
}

/**
 * Fetches and processes team data from the central JSON file.
 * @returns An object containing processed categories, all members, and featured members.
 */
export function getTeamPageData() {
  const { categories, members }: { categories: TeamCategory[], members: TeamMember[] } = teamData;

  const allMembers: TeamMember[] = members;
  const featuredMembers: TeamMember[] = members.filter(member => member.isFeatured);

  const categoriesForShowcase: ProcessedCategory[] = categories.map(category => {
    const categoryMembers = members.filter(member => member.categoryId === category.id);
    return {
      ...category,
      icon: iconMap[category.icon] || Code, // Fallback to a default icon
      memberCount: categoryMembers.length,
      memberAvatars: categoryMembers.slice(0, 4).map(m => m.avatar),
    };
  });

  return {
    categories: categoriesForShowcase,
    allMembers,
    featuredMembers,
  };
}
