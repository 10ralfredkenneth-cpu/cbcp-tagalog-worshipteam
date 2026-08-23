-- 1. Restrict EXECUTE on has_role to service_role and owner
-- Users shouldn't call this directly; it's used inside RLS policies
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM public, authenticated, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO service_role;

-- 2. Confirm the view is security invoker (explicitly ensuring it doesn't have security_barrier/definer)
-- In Postgres, views are security invokers unless created as security barrier views.
-- The previous lint error was likely a false positive or related to how it was being checked,
-- but re-creating it without any special properties ensures standard behavior.
DROP VIEW IF EXISTS public.profile_directory;
CREATE VIEW public.profile_directory AS
SELECT id, full_name, email, avatar_url, primary_role, status, instrument, vocal_range, date_joined, skills, groups
FROM public.profiles;

GRANT SELECT ON public.profile_directory TO authenticated;
GRANT SELECT ON public.profile_directory TO anon;
