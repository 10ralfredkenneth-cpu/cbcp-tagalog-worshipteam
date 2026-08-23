import { createFileRoute } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export const Route = createFileRoute('/_authenticated/dashboard/activity/index')({
  component: ActivityLogPage,
});

function ActivityLogPage() {
  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="font-serif text-5xl">Activity Log</h1>
      <div className="mt-8 p-12 border border-accent/10 border-dashed text-center text-muted-foreground italic">
        Full Activity Log Table Placeholder
      </div>
    </div>
  );
}
