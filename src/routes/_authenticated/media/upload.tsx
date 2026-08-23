import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/media/upload')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated/media/upload"!</div>
}
