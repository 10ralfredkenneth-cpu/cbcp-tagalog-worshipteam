-- Add media columns to songs table
ALTER TABLE public.songs ADD COLUMN IF NOT EXISTS audio_url TEXT;
ALTER TABLE public.songs ADD COLUMN IF NOT EXISTS sheet_music_url TEXT;
ALTER TABLE public.songs ADD COLUMN IF NOT EXISTS external_resources JSONB DEFAULT '[]';

-- Grant delete permission
GRANT DELETE ON public.songs TO authenticated;
GRANT ALL ON public.songs TO service_role;

-- Storage policies for song-resources
-- Note: we assume the bucket 'song-resources' exists (created via tool)
CREATE POLICY "Public Access" ON storage.objects FOR SELECT TO public USING (bucket_id = 'song-resources');
CREATE POLICY "Authenticated Upload" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'song-resources');
CREATE POLICY "Authenticated Update" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'song-resources');
CREATE POLICY "Authenticated Delete" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'song-resources');
