import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_public/setlists')({
  component: () => (
    <div className="container mx-auto px-6 py-20">
      <h1 className="font-serif text-5xl">Setlists</h1>
      <p className="mt-4 text-muted-foreground">Placeholder for Worship Setlists.</p>
    </div>
  ),
})
