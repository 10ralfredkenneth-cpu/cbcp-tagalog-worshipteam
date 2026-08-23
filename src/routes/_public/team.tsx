import { createFileRoute, Link, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_public/team')({
  component: () => (
    <div className="w-full">
      <Outlet />
    </div>
  ),
})
