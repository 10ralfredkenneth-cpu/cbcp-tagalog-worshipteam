-- Postgres 15+ supports security_invoker = true for views
-- If the runtime is older, we ensure no security_barrier is present.
DROP VIEW IF EXISTS public.profile_directory;
CREATE VIEW public.profile_directory 
WITH (security_invoker = true)
AS
SELECT id, full_name, email, avatar_url, primary_role, status, instrument, vocal_range, date_joined, skills, groups
FROM public.profiles;

GRANT SELECT ON public.profile_directory TO authenticated;
GRANT SELECT ON public.profile_directory TO anon;
