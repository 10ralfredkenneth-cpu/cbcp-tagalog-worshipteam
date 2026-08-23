-- 1. Create a view that excludes sensitive data for general consumption
CREATE OR REPLACE VIEW public.profile_directory AS
SELECT id, full_name, email, avatar_url, primary_role, status, instrument, vocal_range, date_joined, skills, groups
FROM public.profiles;

GRANT SELECT ON public.profile_directory TO authenticated;
GRANT SELECT ON public.profile_directory TO anon;

-- 2. Update profiles RLS to restrict sensitive records
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;

CREATE POLICY "Full profile viewable only by owner or admins"
ON public.profiles FOR SELECT
TO authenticated
USING (
  auth.uid() = id OR 
  public.has_role(auth.uid(), 'super_admin') OR 
  public.has_role(auth.uid(), 'ministry_admin') OR 
  public.has_role(auth.uid(), 'worship_pastor')
);

-- Note: To prevent anon from seeing private columns, we revoke select on the table
-- and ensure they use the view instead.
REVOKE SELECT ON public.profiles FROM anon;
GRANT SELECT ON public.profile_directory TO anon;
