-- Add 'Archived' to member_status enum if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type t JOIN pg_enum e ON t.oid = e.enumtypid WHERE t.typname = 'member_status' AND e.enumlabel = 'Archived') THEN
        ALTER TYPE public.member_status ADD VALUE 'Archived';
    END IF;
END
$$;

-- Ensure media_items has visibility column if missing (some tables use different names)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='worship_resources' AND column_name='visibility') THEN
        ALTER TABLE public.worship_resources ADD COLUMN visibility visibility_level DEFAULT 'Public';
    END IF;
END
$$;

-- Ensure RLS allows public to see public resources
GRANT SELECT ON public.worship_resources TO anon;
GRANT SELECT ON public.media_items TO anon;
GRANT SELECT ON public.profiles TO anon;
GRANT SELECT ON public.services TO anon;
GRANT SELECT ON public.songs TO anon;

-- Update RLS policies for public access
DROP POLICY IF EXISTS "Public can view active public members" ON public.profiles;
CREATE POLICY "Public can view active public members" ON public.profiles
    FOR SELECT TO anon
    USING (is_public = true AND status = 'Active');

DROP POLICY IF EXISTS "Public can view published resources" ON public.worship_resources;
CREATE POLICY "Public can view published resources" ON public.worship_resources
    FOR SELECT TO anon
    USING (status = 'Published' AND visibility = 'Public');

DROP POLICY IF EXISTS "Public can view public media" ON public.media_items;
CREATE POLICY "Public can view public media" ON public.media_items
    FOR SELECT TO anon
    USING (visibility = 'Public');
