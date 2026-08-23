-- Rename member_id to user_id in service_assignments
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'service_assignments' AND column_name = 'member_id') THEN
        ALTER TABLE public.service_assignments RENAME COLUMN member_id TO user_id;
    END IF;
END
$$;

-- Ensure all core tables have RLS enabled
ALTER TABLE public.songs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.worship_resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Grant permissions to authenticated users
GRANT SELECT, INSERT, UPDATE, DELETE ON public.songs TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.services TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.service_items TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.service_assignments TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.worship_resources TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.media_items TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.profiles TO authenticated;

-- Grant permissions to service_role (admin functions)
GRANT ALL ON public.songs TO service_role;
GRANT ALL ON public.services TO service_role;
GRANT ALL ON public.service_items TO service_role;
GRANT ALL ON public.service_assignments TO service_role;
GRANT ALL ON public.worship_resources TO service_role;
GRANT ALL ON public.media_items TO service_role;
GRANT ALL ON public.profiles TO service_role;

-- Public read access (anon)
GRANT SELECT ON public.songs TO anon;
GRANT SELECT ON public.services TO anon;
GRANT SELECT ON public.service_items TO anon;
GRANT SELECT ON public.service_assignments TO anon;
GRANT SELECT ON public.worship_resources TO anon;
GRANT SELECT ON public.media_items TO anon;
GRANT SELECT ON public.profiles TO anon;

-- Define RLS Policies for Admin/Authenticated Write Access
DO $$
BEGIN
    -- Songs
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admins can manage songs' AND tablename = 'songs') THEN
        CREATE POLICY "Admins can manage songs" ON public.songs FOR ALL TO authenticated USING (true);
    END IF;

    -- Services
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admins can manage services' AND tablename = 'services') THEN
        CREATE POLICY "Admins can manage services" ON public.services FOR ALL TO authenticated USING (true);
    END IF;

    -- Service Items
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admins can manage service items' AND tablename = 'service_items') THEN
        CREATE POLICY "Admins can manage service items" ON public.service_items FOR ALL TO authenticated USING (true);
    END IF;

    -- Service Assignments
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admins can manage assignments' AND tablename = 'service_assignments') THEN
        CREATE POLICY "Admins can manage assignments" ON public.service_assignments FOR ALL TO authenticated USING (true);
    END IF;

    -- Media Items
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admins can manage media items' AND tablename = 'media_items') THEN
        CREATE POLICY "Admins can manage media items" ON public.media_items FOR ALL TO authenticated USING (true);
    END IF;

    -- Resources
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admins can manage resources' AND tablename = 'worship_resources') THEN
        CREATE POLICY "Admins can manage resources" ON public.worship_resources FOR ALL TO authenticated USING (true);
    END IF;
END
$$;
