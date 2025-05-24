// src/lib/karyaUtils.ts

/**
 * Extracts hashtags from a description string.
 * @param description The string to extract tags from.
 * @returns An array of unique, lowercase tags without the '#' symbol.
 */
export const extractTagsFromDescription = (description: string | null): string[] => {
  if (!description) return [];
  
  // Regex to find hashtags: # followed by one or more word characters (alphanumeric + underscore)
  // or any character in the Unicode range U+0080 to U+FFFF (to support non-ASCII characters in tags)
  const hashtags = description.match(/#[\w\u0080-\uFFFF]+/g);
  
  if (hashtags && hashtags.length > 0) {
    // Convert to lowercase, remove '#' and return unique tags
    const tags = hashtags.map(tag => tag.slice(1).toLowerCase());
    return [...new Set(tags)]; // Ensure uniqueness
  }
  
  return [];
};
