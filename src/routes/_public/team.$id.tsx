import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_public/team/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_public/team/$id"!</div>
}
