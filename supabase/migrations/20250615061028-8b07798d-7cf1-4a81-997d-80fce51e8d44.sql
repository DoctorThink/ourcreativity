
-- Allow the anon (public) role to UPDATE the likes_count column on karya
GRANT UPDATE (likes_count) ON public.karya TO anon;
