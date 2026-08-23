import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_public/team')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_public/team"!</div>
}
