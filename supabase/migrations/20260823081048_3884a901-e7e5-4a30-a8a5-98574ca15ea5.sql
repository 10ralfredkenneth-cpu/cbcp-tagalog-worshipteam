ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS auth_provider TEXT;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
DECLARE
    is_initial_admin BOOLEAN;
    new_profile_id UUID;
    provider TEXT;
BEGIN
    -- Get auth provider
    provider := NEW.raw_app_meta_data->>'provider';
    IF provider IS NULL THEN
        -- Fallback to checking identities if available
        SELECT provider_id INTO provider 
        FROM auth.identities 
        WHERE user_id = NEW.id 
        LIMIT 1;
    END IF;

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
        auth_provider,
        created_at,
        updated_at
    )
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', 'New Member'),
        NEW.email,
        NEW.raw_user_meta_data->>'avatar_url',
        CASE WHEN is_initial_admin THEN 'Active'::public.member_status ELSE 'Pending'::public.member_status END,
        provider,
        NOW(),
        NOW()
    )
    ON CONFLICT (id) DO UPDATE
    SET 
        full_name = EXCLUDED.full_name,
        avatar_url = EXCLUDED.avatar_url,
        auth_provider = COALESCE(profiles.auth_provider, EXCLUDED.auth_provider),
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
