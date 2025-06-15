
-- Add the new column to store the type of submission.
ALTER TABLE public.karya
ADD COLUMN submission_type TEXT;

-- Add a CHECK constraint to ensure data integrity for new and updated rows.
ALTER TABLE public.karya
ADD CONSTRAINT submission_type_check CHECK (submission_type IN ('image', 'video', 'text'));

COMMENT ON COLUMN public.karya.submission_type IS 'Type of submission, for example: ''image'', ''video'', or ''text''.';
