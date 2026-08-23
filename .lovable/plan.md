# LOAD 8A — SYSTEM AUDIT, SECURITY & PERFORMANCE

This plan covers a comprehensive audit and stabilization of the Praise & Worship Ministry website. It focuses on fixing broken links, improving performance, ensuring security (especially RLS and Permissions), and enhancing UI consistency.

## 1. Full System Audit & Route Fixes
- Fix navigation links in `AdminSidebar.tsx` (missing setlists and schedule routes).
- Create missing dashboard routes:
  - `src/routes/_authenticated/dashboard/setlists.tsx` (linked to `services.tsx` logic or a new management view).
  - `src/routes/_authenticated/dashboard/schedule.tsx` (team availability and scheduling).
- Ensure all public links work correctly.
- Add error boundaries and proper "Not Found" handling.

## 2. Authentication & Permission Stabilization
- Review `use-auth.tsx` logic for role hierarchy.
- Ensure all dashboard routes correctly check permissions.
- Implement specialized views based on roles (Director vs Team Member).
- Fix session persistence issues if any.

## 3. Database & RLS Audit
- Verify RLS policies for:
  - `profiles`: Ensure `internal_notes` and private data are protected from non-admins.
  - `user_roles`: Ensure only admins can manage roles.
  - `audit_logs`: Ensure only admins can view.
  - `ministry_settings`: Ensure only admins can modify.
- Check and fix database relationships in mock data and preparation for real data.

## 4. Performance & Optimization
- Implement image optimization (lazy loading, responsive sizing).
- Audit re-renders in heavy components (Song Library, Setlist Planner).
- Add skeleton loading states for data-heavy views.

## 5. UI/UX Consistency & Stability
- Fix responsive layout issues (tables, menus, modals) across various breakpoints.
- Standardize empty states for all lists (Songs, Services, Team, etc.).
- Add form validation and duplicate submission protection.
- Improve print views for Chord Sheets and Setlists.
- Accessibility audit: Add aria labels, improve focus states, and check color contrast.

## 6. Code Cleanup
- Remove console errors and unused code.
- Standardize utility usage.

## Technical Details
- **Tech Stack**: TanStack Start v1, React 19, Supabase, Tailwind CSS v4.
- **Security**: RLS Definer functions for role checks.
- **Routing**: TanStack Router (flat file structure).
