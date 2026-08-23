-- Songs
CREATE POLICY "Admins can do everything on songs" ON public.songs FOR ALL TO authenticated USING (true);
CREATE POLICY "Public can view public songs" ON public.songs FOR SELECT TO anon USING (is_public = true);

-- Services
CREATE POLICY "Admins can do everything on services" ON public.services FOR ALL TO authenticated USING (true);
CREATE POLICY "Public can view public services" ON public.services FOR SELECT TO anon USING (is_public = true);

-- Service Items
CREATE POLICY "Admins can do everything on service_items" ON public.service_items FOR ALL TO authenticated USING (true);

-- Service Assignments
CREATE POLICY "Admins can do everything on service_assignments" ON public.service_assignments FOR ALL TO authenticated USING (true);

-- Media Albums
CREATE POLICY "Admins can do everything on media_albums" ON public.media_albums FOR ALL TO authenticated USING (true);
CREATE POLICY "Public can view featured albums" ON public.media_albums FOR SELECT TO anon USING (featured = true);

-- User Roles
CREATE POLICY "Admins can view roles" ON public.user_roles FOR SELECT TO authenticated USING (true);

-- Audit Logs
CREATE POLICY "Admins can view audit logs" ON public.audit_logs FOR SELECT TO authenticated USING (true);

-- Ministry Settings
CREATE POLICY "Admins can update settings" ON public.ministry_settings FOR ALL TO authenticated USING (true);
CREATE POLICY "Public can view settings" ON public.ministry_settings FOR SELECT TO anon USING (true);

-- Profiles
DROP POLICY IF EXISTS "Public can view active public members" ON public.profiles;
CREATE POLICY "Public can view active public members" ON public.profiles FOR SELECT TO anon USING (is_public = true AND status = 'Active');
CREATE POLICY "Admins can do everything on profiles" ON public.profiles FOR ALL TO authenticated USING (true);
