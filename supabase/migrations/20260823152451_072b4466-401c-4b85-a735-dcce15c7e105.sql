-- Completely remove the constraint. We'll rely on the app logic to manage links for real users.
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_id_fkey;

-- Ensure RLS is still correct
GRANT ALL ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;