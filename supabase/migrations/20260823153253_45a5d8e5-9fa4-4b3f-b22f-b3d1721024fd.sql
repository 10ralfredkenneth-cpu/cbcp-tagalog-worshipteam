-- Policy for SELECT access
CREATE POLICY "Public Access for Avatars"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'personnel-avatars');

-- Policy for INSERT access
CREATE POLICY "Authenticated Upload for Avatars"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'personnel-avatars');

-- Policy for UPDATE access
CREATE POLICY "Authenticated Update for Avatars"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'personnel-avatars');

-- Policy for DELETE access
CREATE POLICY "Authenticated Delete for Avatars"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'personnel-avatars');