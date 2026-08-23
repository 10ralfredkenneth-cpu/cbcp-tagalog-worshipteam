ALTER TABLE public.initial_super_admin_setup ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.songs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_albums ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.worship_resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ministry_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Re-grant just to be sure
GRANT SELECT ON public.songs TO anon;
GRANT SELECT ON public.services TO anon;
GRANT SELECT ON public.worship_resources TO anon;
GRANT SELECT ON public.media_items TO anon;
GRANT SELECT ON public.profiles TO anon;

GRANT ALL ON public.songs TO authenticated;
GRANT ALL ON public.services TO authenticated;
GRANT ALL ON public.service_items TO authenticated;
GRANT ALL ON public.service_assignments TO authenticated;
GRANT ALL ON public.media_albums TO authenticated;
GRANT ALL ON public.worship_resources TO authenticated;
GRANT ALL ON public.media_items TO authenticated;
GRANT ALL ON public.audit_logs TO authenticated;
GRANT ALL ON public.ministry_settings TO authenticated;
GRANT ALL ON public.profiles TO authenticated;

GRANT ALL ON ALL TABLES IN SCHEMA public TO service_role;
