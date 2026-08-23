import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_public/media')({
  component: () => (
    <div className="container mx-auto px-6 py-20">
      <h1 className="font-serif text-5xl">Media</h1>
      <p className="mt-4 text-muted-foreground">Placeholder for Media Gallery.</p>
    </div>
  ),
})
