
-- Update foreign keys to CASCADE on delete to allow deleting songs
ALTER TABLE public.service_items 
DROP CONSTRAINT IF EXISTS service_items_song_id_fkey,
ADD CONSTRAINT service_items_song_id_fkey 
    FOREIGN KEY (song_id) REFERENCES public.songs(id) 
    ON DELETE CASCADE;

ALTER TABLE public.media_items 
DROP CONSTRAINT IF EXISTS media_items_related_song_id_fkey,
ADD CONSTRAINT media_items_related_song_id_fkey 
    FOREIGN KEY (related_song_id) REFERENCES public.songs(id) 
    ON DELETE CASCADE;

-- Ensure song_versions is also CASCADE
ALTER TABLE public.song_versions
DROP CONSTRAINT IF EXISTS song_versions_song_id_fkey,
ADD CONSTRAINT song_versions_song_id_fkey 
    FOREIGN KEY (song_id) REFERENCES public.songs(id) 
    ON DELETE CASCADE;

-- Add DELETE policy for song_versions for authenticated users
-- Attempting plain creation first; if it exists the user can ignore the error
CREATE POLICY "Admins can delete song versions" 
ON public.song_versions 
FOR DELETE 
TO authenticated 
USING (true);

-- Grant DELETE to authenticated role
GRANT DELETE ON public.songs TO authenticated;
GRANT DELETE ON public.song_versions TO authenticated;
GRANT DELETE ON public.service_items TO authenticated;
GRANT DELETE ON public.media_items TO authenticated;
