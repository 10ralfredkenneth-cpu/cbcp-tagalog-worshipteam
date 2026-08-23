ALTER TABLE public.service_assignments RENAME COLUMN member_id TO user_id;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.songs TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.services TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.service_assignments TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.worship_resources TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.media_items TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.profiles TO authenticated;

GRANT ALL ON public.songs TO service_role;
GRANT ALL ON public.services TO service_role;
GRANT ALL ON public.service_assignments TO service_role;
GRANT ALL ON public.worship_resources TO service_role;
GRANT ALL ON public.media_items TO service_role;
GRANT ALL ON public.profiles TO service_role;
