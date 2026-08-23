-- Fix foreign key constraint on profiles to allow non-auth users (personnel profiles)
-- Drop the existing constraint if it exists (it might not have a standard name if auto-generated)
DO $$ 
BEGIN
    IF EXISTS (
        SELECT 1 
        FROM information_schema.table_constraints 
        WHERE constraint_name = 'profiles_id_fkey' 
        AND table_name = 'profiles'
    ) THEN
        ALTER TABLE public.profiles DROP CONSTRAINT profiles_id_fkey;
    END IF;
END $$;

-- The profiles table should be able to hold users who are NOT in auth.users
-- We will keep the ID as UUID but remove the hard foreign key requirement 
-- or make it optional if we really want to keep it.
-- However, for personnel who don't log in, they won't have an auth.users entry.

-- If we want to keep a reference for those who DO log in:
ALTER TABLE public.profiles 
  ADD CONSTRAINT profiles_id_fkey 
  FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE SET NULL;

-- Make sure RLS allows authenticated users to insert these records
-- We already have grants from previous turns, but let's be explicit.
GRANT INSERT, UPDATE, DELETE ON public.profiles TO authenticated;
