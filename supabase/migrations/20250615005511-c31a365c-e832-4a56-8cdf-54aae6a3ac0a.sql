
-- This function atomically increments the like count for a given 'karya' item.
CREATE OR REPLACE FUNCTION increment_likes(karya_id uuid)
RETURNS void AS $$
  UPDATE public.karya
  SET likes_count = COALESCE(likes_count, 0) + 1
  WHERE id = karya_id;
$$ LANGUAGE sql;
