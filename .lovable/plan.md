# Plan: LOAD 3A — Worship Song Library Foundation

Build a premium, organized worship-song library foundation for /songs and /songs/:id, following the existing reverent and Christ-centered aesthetic.

## 1. Data Model & Types
- Define `WorshipSong` interface in a new `src/types/songs.ts` to support:
  - id, title, artist, songwriter, defaultKey, bpm, timeSignature, language, themes (array), scriptureReferences (array), songType, lyrics (placeholder), chords (placeholder), notes, status, artworkUrl.
- Create sample public-domain and metadata-only songs in `src/lib/mock-songs.ts`.

## 2. Reusable UI Components
- **SongLibraryFilters**: Responsive filter panel (Search, Theme, Key, Type, Language).
- **SongCard (Updated)**: Refine existing card to support grid/list modes and additional metadata (BPM, Time Sig).
- **SongListItem**: A compact list-view representation for rapid browsing.
- **EmptyState**: "No songs found" and "Library empty" components.
- **LoadingSkeleton**: Skeleton states for the library grid and list.

## 3. Song Library Page (/songs)
- **Search & Filter Logic**: Client-side filtering/sorting based on the mock data.
- **Layout Toggle**: Grid/List view switcher with session persistence.
- **Sorting**: Dropdown for A-Z, Z-A, Recently Added, Most Used.
- **Responsive Shell**: Mobile-first design with a clean slide-out or collapsible filter menu.

## 4. Song Detail Page (/songs/:id)
- **Information Hierarchy**: Premium layout showing metadata, themes, and scripture connections.
- **Tabs/Sections**: Overview, Lyrics, Chords, Scripture, Notes (using TanStack Router params).
- **Biblical Foundation**: Dedicated section for scripture notes and references.

## 5. Technical Details
- Use `shadcn/ui` components (Input, Select, Tabs, Button, Badge, Skeleton).
- TanStack Router for navigation and URL-based filtering (optional, but good for persistence).
- Maintain OKLCH color system and serif/sans-serif typography.
- Ensure zero horizontal overflow and full accessibility.

## 6. Verification
- Test search responsiveness.
- Verify mobile filter behavior.
- Check accessibility (contrast, aria-labels).
- Visual check of grid vs list view.
