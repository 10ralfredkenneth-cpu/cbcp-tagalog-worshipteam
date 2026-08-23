
-- Storage policies for the bucket
DO $$
BEGIN
    -- Public Select
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public Access' AND tablename = 'objects' AND schemaname = 'storage') THEN
        CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'personnel-avatars');
    END IF;

    -- Authenticated Insert
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Authenticated Upload' AND tablename = 'objects' AND schemaname = 'storage') THEN
        CREATE POLICY "Authenticated Upload" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'personnel-avatars');
    END IF;

    -- Authenticated Update/Delete
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Authenticated Update' AND tablename = 'objects' AND schemaname = 'storage') THEN
        CREATE POLICY "Authenticated Update" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'personnel-avatars');
    END IF;
END
$$;

-- Ensure authenticated users have general access to storage.objects
GRANT ALL ON storage.objects TO authenticated;
GRANT SELECT ON storage.objects TO anon;
