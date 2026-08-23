GRANT SELECT ON public.songs TO anon;
GRANT SELECT ON public.services TO anon;
GRANT SELECT ON public.service_items TO anon;
GRANT SELECT ON public.service_assignments TO anon;
GRANT SELECT ON public.worship_resources TO anon;
GRANT SELECT ON public.media_items TO anon;
GRANT SELECT ON public.profiles TO anon;

DO $$
BEGIN
    -- Songs: public read for public active songs
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public read for public songs' AND tablename = 'songs') THEN
        CREATE POLICY "Public read for public songs" ON public.songs FOR SELECT TO anon USING (is_public = true AND status = 'Active');
    END IF;

    -- Services: public read for ready services
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public read for ready services' AND tablename = 'services') THEN
        CREATE POLICY "Public read for ready services" ON public.services FOR SELECT TO anon USING (is_public = true AND status = 'Ready');
    END IF;

    -- Resources: public read for published resources
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public read for published resources' AND tablename = 'worship_resources') THEN
        CREATE POLICY "Public read for published resources" ON public.worship_resources FOR SELECT TO anon USING (is_public = true AND status = 'Published');
    END IF;

    -- Media: public read for public items
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public read for public media' AND tablename = 'media_items') THEN
        CREATE POLICY "Public read for public media" ON public.media_items FOR SELECT TO anon USING (visibility = 'Public');
    END IF;

    -- Profiles: public read for active public profiles
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public read for public profiles' AND tablename = 'profiles') THEN
        CREATE POLICY "Public read for public profiles" ON public.profiles FOR SELECT TO anon USING (is_public = true AND status = 'Active');
    END IF;
END
$$;
