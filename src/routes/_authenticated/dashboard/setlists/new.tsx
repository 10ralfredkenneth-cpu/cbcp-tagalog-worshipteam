import { createFileRoute } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export const Route = createFileRoute('/_authenticated/dashboard/setlists/new')({
  component: CreateSetlistPage,
});

function CreateSetlistPage() {
  return (
    <div className="container mx-auto px-6 py-12">
      <Button variant="ghost" className="mb-8 text-[10px] uppercase tracking-widest font-bold" onClick={() => window.history.back()}>
        <ArrowLeft className="w-3 h-3 mr-2" /> Back to Setlists
      </Button>
      <h1 className="font-serif text-5xl">Create New Setlist</h1>
      <div className="mt-8 p-12 border border-accent/10 border-dashed text-center text-muted-foreground italic">
        Create Setlist Form Placeholder
      </div>
    </div>
  );
}
