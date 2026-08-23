# Plan - Fix Personnel Avatar Upload RLS

The user is experiencing a "failed to upload image: new row violates row-level security policy" error when trying to upload a photo for a team member. The investigation revealed that the `personnel-avatars` bucket exists but lacks RLS policies for storage objects, while the `song-resources` bucket has specific policies.

## Proposed Changes

### Database & Storage
- Create RLS policies for the `personnel-avatars` bucket in the `storage.objects` table.
- Allow `public` (anon/authenticated) to `SELECT` (read) avatars.
- Allow `authenticated` users to `INSERT`, `UPDATE`, and `DELETE` avatars in the `personnel-avatars` bucket.

### Frontend Text Edit
- Apply the literal text edit requested by the user to the `TeamDirectoryLayout` component in `src/routes/_public/team.tsx` (as per previous turns pattern).

## Technical Details
- SQL Migration:
  - `policyname: "Public Access for Avatars"` for `SELECT`.
  - `policyname: "Authenticated Upload for Avatars"` for `INSERT`.
  - `policyname: "Authenticated Update for Avatars"` for `UPDATE`.
  - `policyname: "Authenticated Delete for Avatars"` for `DELETE`.
- The RLS error is happening because the existing `INSERT` policy for `storage.objects` specifically checks `WITH CHECK (bucket_id = 'song-resources'::text)`, which excludes the `personnel-avatars` bucket.

## Verification Plan
- Use `supabase--read_query` to verify policies are applied.
- The user can verify by attempting another upload in the dashboard.
