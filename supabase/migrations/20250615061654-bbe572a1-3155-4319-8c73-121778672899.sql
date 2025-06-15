
-- First, add the new view_count column to the karya table
ALTER TABLE public.karya 
ADD COLUMN IF NOT EXISTS view_count INTEGER NOT NULL DEFAULT 0;

-- Create a function to increment view count when a work is viewed
CREATE OR REPLACE FUNCTION public.increment_view_count(karya_id uuid)
RETURNS void
LANGUAGE sql
AS $$
  UPDATE public.karya
  SET view_count = view_count + 1
  WHERE id = karya_id;
$$;

-- Grant permission for anon users to call this function
GRANT EXECUTE ON FUNCTION public.increment_view_count(uuid) TO anon;

-- Remove the old likes-related permissions and columns
REVOKE UPDATE (likes_count) ON public.karya FROM anon;
ALTER TABLE public.karya DROP COLUMN IF EXISTS likes_count;

-- Drop the old increment_likes function if it exists
DROP FUNCTION IF EXISTS public.increment_likes(uuid);
