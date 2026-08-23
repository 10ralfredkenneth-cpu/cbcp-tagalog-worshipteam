-- 1. Update Enums
ALTER TYPE public.member_status ADD VALUE IF NOT EXISTS 'Pending';
ALTER TYPE public.member_status ADD VALUE IF NOT EXISTS 'Suspended';
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'worship_director';

-- 2. Initial Admin Config Table
CREATE TABLE IF NOT EXISTS public.initial_super_admin_setup (
    email TEXT PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Grant access to service_role only for security
GRANT ALL ON public.initial_super_admin_setup TO service_role;
REVOKE ALL ON public.initial_super_admin_setup FROM authenticated, anon;

-- 3. Trigger Function for Profile & Role Bootstrap
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
DECLARE
    is_initial_admin BOOLEAN;
    new_profile_id UUID;
BEGIN
    -- Check if this user is the initial super admin
    SELECT EXISTS (
        SELECT 1 FROM public.initial_super_admin_setup 
        WHERE email = NEW.email
    ) INTO is_initial_admin;

    -- Create or Link Profile
    INSERT INTO public.profiles (
        id,
        full_name,
        email,
        avatar_url,
        status,
        created_at,
        updated_at
    )
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', 'New Member'),
        NEW.email,
        NEW.raw_user_meta_data->>'avatar_url',
        CASE WHEN is_initial_admin THEN 'Active'::public.member_status ELSE 'Pending'::public.member_status END,
        NOW(),
        NOW()
    )
    ON CONFLICT (id) DO UPDATE
    SET 
        full_name = EXCLUDED.full_name,
        avatar_url = EXCLUDED.avatar_url,
        updated_at = NOW()
    RETURNING id INTO new_profile_id;

    -- Assign Role
    IF is_initial_admin THEN
        -- Assign Super Admin role if not already assigned
        INSERT INTO public.user_roles (user_id, role)
        VALUES (NEW.id, 'super_admin'::public.app_role)
        ON CONFLICT (user_id, role) DO NOTHING;
    ELSE
        -- Default role for others (safest)
        INSERT INTO public.user_roles (user_id, role)
        VALUES (NEW.id, 'viewer'::public.app_role)
        ON CONFLICT (user_id, role) DO NOTHING;
    END IF;

    RETURN NEW;
END;
$$;

-- 4. Create Trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Also handle updates for Google users who might sign in again
DROP TRIGGER IF EXISTS on_auth_user_updated ON auth.users;
CREATE TRIGGER on_auth_user_updated
  AFTER UPDATE ON auth.users
  FOR EACH ROW 
  WHEN (OLD.raw_user_meta_data IS DISTINCT FROM NEW.raw_user_meta_data)
  EXECUTE FUNCTION public.handle_new_user();
