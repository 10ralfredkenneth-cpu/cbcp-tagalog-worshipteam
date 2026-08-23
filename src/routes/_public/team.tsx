import { createFileRoute, Link, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_public/team')({
  component: () => <Outlet />,
})
