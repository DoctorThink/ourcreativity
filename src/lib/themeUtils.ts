export interface CategoryTheme {
  bgClass: string;
  textClass: string;
  borderClass: string;
  accentClass: string; // For things like text color for titles or specific accents
  badgeTextClass: string; // For text on a themed background badge
}

export const getCategoryTheme = (category: string | null | undefined): CategoryTheme => {
  switch (category?.toLowerCase()) {
    case 'event':
      return {
        bgClass: 'bg-coral/10', // Light background for content areas
        textClass: 'text-coral', // For general text if needed
        borderClass: 'border-coral', // For borders
        accentClass: 'text-coral', // For titles or strong accents
        badgeTextClass: 'text-white', // Text on solid coral bg
      };
    case 'recruitment':
      return {
        bgClass: 'bg-turquoise/10',
        textClass: 'text-turquoise',
        borderClass: 'border-turquoise',
        accentClass: 'text-turquoise',
        badgeTextClass: 'text-background', // Turquoise is lighter, dark text might be better
      };
    case 'update':
      return {
        bgClass: 'bg-amethyst/10',
        textClass: 'text-amethyst',
        borderClass: 'border-amethyst',
        accentClass: 'text-amethyst',
        badgeTextClass: 'text-white',
      };
    default:
      return {
        bgClass: 'bg-secondary/20', // Default subtle background
        textClass: 'text-foreground/80',
        borderClass: 'border-grayMid',
        accentClass: 'text-primary', // Use primary theme color for default accents
        badgeTextClass: 'text-primary-foreground', // Text on primary bg
      };
  }
};

// Example of how to use accent colors from tailwind.config.ts directly if needed for solid backgrounds
// For example, a solid badge background:
export const getSolidCategoryBgClass = (category: string | null | undefined): string => {
  switch (category?.toLowerCase()) {
    case 'event': return 'bg-coral';
    case 'recruitment': return 'bg-turquoise';
    case 'update': return 'bg-amethyst';
    default: return 'bg-primary'; // Default to primary color
  }
};
