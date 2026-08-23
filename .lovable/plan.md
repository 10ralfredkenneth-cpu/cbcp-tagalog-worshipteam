# Plan - Enhance Team Member Avatar Management

Implement the requested visual text edits and functional enhancements for team member avatar management, ensuring seamless synchronization between admin and public pages.

## User Review Required

> [!IMPORTANT]
> I will relax the image upload constraints to support various sizes and formats, and I will add an explicit "Remove/Replace" flow in the admin UI.

- No critical items requiring user attention before proceeding.

## Proposed Changes

### Admin & Public Sync
- Update the public team page description with the requested literal text.

### Image Management Improvements
- **ImageUpload Component**: Enhance with multi-format support (validation) and an explicit replacement flow.
- **Database Functions**: Ensure `updateMember` correctly handles `avatar_url` nullification or replacement.
- **Team Edit Route**: (Optional/if needed) Ensure the edit form correctly handles avatar updates.

### Verification
- Test avatar upload, replacement, and removal.
- Verify instant synchronization on the public team page via query invalidation.

## Technical Details

### Frontend Components
- `src/components/ui/ImageUpload.tsx`:
    - Improve error handling for different image sizes.
    - Ensure `upsert: true` is consistent.
    - Add a `loading` state during removal.
- `src/routes/_public/team.tsx`:
    - Replace the placeholder description with the user's specific text.

### Data Layer
- `src/lib/db-team.functions.ts`:
    - Standardize `avatar_url` mapping in `updateMember`.

### RLS & Storage
- Verification of existing storage policies for `personnel-avatars` (already added in previous turns, but will ensure they cover all operations).

## Schedule
1. **Edit** `src/routes/_public/team.tsx` to add requested text.
2. **Refactor** `src/components/ui/ImageUpload.tsx` for better UX (replace/remove).
3. **Verify** functionality with a Playwright script.
