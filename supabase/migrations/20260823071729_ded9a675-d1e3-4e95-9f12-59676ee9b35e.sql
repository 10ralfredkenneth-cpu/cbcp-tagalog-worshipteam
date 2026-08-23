-- Revoke all from all functions
revoke all on function public.has_role(uuid, public.app_role) from public, anon, authenticated;
revoke all on function public.handle_new_user() from public, anon, authenticated;

-- Grant only what is absolutely necessary
grant execute on function public.has_role(uuid, public.app_role) to authenticated;
grant execute on function public.has_role(uuid, public.app_role) to service_role;

-- Grant execute to service_role for trigger functions
grant execute on function public.handle_new_user() to service_role;
