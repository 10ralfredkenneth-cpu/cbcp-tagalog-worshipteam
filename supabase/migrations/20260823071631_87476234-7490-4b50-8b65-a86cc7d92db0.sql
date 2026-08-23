-- Create enums for roles and statuses
create type public.app_role as enum ('super_admin', 'ministry_admin', 'worship_pastor', 'worship_leader', 'team_member', 'media_tech', 'viewer');
create type public.member_status as enum ('Active', 'Available', 'Limited Availability', 'On Break', 'Inactive');

-- 1. Create profiles table (linked to auth.users)
create table public.profiles (
    id uuid primary key references auth.users(id) on delete cascade,
    full_name text not null,
    email text unique not null,
    avatar_url text,
    phone text,
    bio text,
    primary_role text, -- Mirroring TeamRole from frontend
    status public.member_status default 'Active',
    instrument text,
    vocal_range text,
    date_joined date default current_date,
    skills text[],
    groups text[],
    internal_notes text,
    emergency_contact text,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

-- 2. Create user_roles table
create table public.user_roles (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references auth.users(id) on delete cascade not null,
    role public.app_role not null,
    unique (user_id, role)
);

-- 3. Grant access to public tables
grant select, update on public.profiles to authenticated;
grant select on public.profiles to anon;
grant all on public.profiles to service_role;

grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;

-- 4. Enable RLS
alter table public.profiles enable row level security;
alter table public.user_roles enable row level security;

-- 5. Create Security Definer function to check roles
create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.user_roles
    where user_id = _user_id
      and role = _role
  )
$$;

-- 6. Implement RLS Policies

-- Profiles Policies
create policy "Public profiles are viewable by everyone"
on public.profiles for select
using (true);

create policy "Users can update their own profile"
on public.profiles for update
to authenticated
using (auth.uid() = id);

create policy "Admins can update all profiles"
on public.profiles for update
to authenticated
using (public.has_role(auth.uid(), 'super_admin') or public.has_role(auth.uid(), 'ministry_admin'));

-- User Roles Policies
create policy "Users can view their own roles"
on public.user_roles for select
to authenticated
using (auth.uid() = user_id);

create policy "Admins can view all roles"
on public.user_roles for select
to authenticated
using (public.has_role(auth.uid(), 'super_admin') or public.has_role(auth.uid(), 'ministry_admin'));

create policy "Only super admins can manage roles"
on public.user_roles for all
to authenticated
using (public.has_role(auth.uid(), 'super_admin'));

-- Trigger to handle profile creation on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, email, avatar_url)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', new.email), new.email, new.raw_user_meta_data->>'avatar_url');
  
  -- Default new users to team_member role
  insert into public.user_roles (user_id, role)
  values (new.id, 'team_member');
  
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
