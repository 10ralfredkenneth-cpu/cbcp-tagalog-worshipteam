-- Revoke all default privileges from public for the functions
revoke execute on function public.has_role(uuid, public.app_role) from public;
revoke execute on function public.handle_new_user() from public;

-- Grant execute to authenticated users for has_role (required for RLS)
grant execute on function public.has_role(uuid, public.app_role) to authenticated;
grant execute on function public.has_role(uuid, public.app_role) to service_role;

-- Grant execute to service_role only for handle_new_user (it's a trigger function)
grant execute on function public.handle_new_user() to service_role;
