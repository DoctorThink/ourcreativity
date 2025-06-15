
-- Revoke permission for the old view count function
REVOKE EXECUTE ON FUNCTION public.increment_view_count(uuid) FROM anon;

-- Drop the old view count function as it will be replaced by an Edge Function
DROP FUNCTION IF EXISTS public.increment_view_count(uuid);
