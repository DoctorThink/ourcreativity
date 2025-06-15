export const extractTagsFromDescription = (description: string): string[] => {
  if (!description) return [];
  
  // Extract hashtags from description
  const hashtags = description.match(/#[\w\u0080-\uFFFF]+/g);
  if (hashtags && hashtags.length > 0) {
    return hashtags.map(tag => tag.slice(1)); // Remove # symbol
  }
  
  return [];
};

export const filterKaryaBySearchTerm = (karya: any[], searchTerm: string): any[] => {
  if (!searchTerm) return karya;
  
  const term = searchTerm.toLowerCase();
  return karya.filter(item => 
    item.title?.toLowerCase().includes(term) ||
    item.description?.toLowerCase().includes(term) ||
    item.creator_name?.toLowerCase().includes(term)
  );
};

export const filterKaryaByTags = (karya: any[], selectedTags: string[]): any[] => {
  if (selectedTags.length === 0) return karya;
  
  return karya.filter(item => {
    const itemTags = extractTagsFromDescription(item.description || '');
    return selectedTags.some(tag => itemTags.includes(tag));
  });
};

export const getTransformedUrl = (baseUrl: string | null | undefined, options: { format?: 'webp' | 'avif' | 'jpeg', width?: number, quality?: number } = {}): string => {
  if (!baseUrl) {
    return '/placeholder.svg';
  }

  // If it's a local URL (starts with /) or a data URL, return it directly without trying to transform.
  if (baseUrl.startsWith('/') || baseUrl.startsWith('data:')) {
    return baseUrl;
  }

  try {
    const url = new URL(baseUrl);

    // Only apply transformations to Supabase storage URLs.
    if (!url.hostname.endsWith('supabase.co')) {
      return baseUrl;
    }

    const newWidth = options.width || 800;
    const quality = options.quality || 75;
    
    // Apply Supabase image transformation query parameters
    url.searchParams.set('width', newWidth.toString());
    url.searchParams.set('quality', quality.toString());
    if (options.format) {
      url.searchParams.set('format', options.format);
    }
    
    return url.toString();
  } catch (e) {
    console.error(`Error processing URL: '${baseUrl}'. Returning original.`, e);
    // If URL construction fails, it's not a valid absolute URL.
    // Return it as-is to prevent a crash and let the browser handle it.
    return baseUrl;
  }
};

export const sortKaryaByRecency = (karya: any[], ascending: boolean = false): any[] => {
  return [...karya].sort((a, b) => {
    const dateA = new Date(a.created_at).getTime();
    const dateB = new Date(b.created_at).getTime();
    return ascending ? dateA - dateB : dateB - dateA;
  });
};

export const sortKaryaByPopularity = (karya: any[], ascending: boolean = false): any[] => {
  return [...karya].sort((a, b) => {
    const viewsA = a.view_count || 0;
    const viewsB = b.view_count || 0;
    return ascending ? viewsA - viewsB : viewsB - viewsA;
  });
};
