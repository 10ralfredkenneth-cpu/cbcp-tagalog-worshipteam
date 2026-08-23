import { createFileRoute } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export const Route = createFileRoute('/_authenticated/dashboard/users/new')({
  component: AddUserPage,
});

function AddUserPage() {
  return (
    <div className="container mx-auto px-6 py-12">
      <Button variant="ghost" className="mb-8 text-[10px] uppercase tracking-widest font-bold" onClick={() => window.history.back()}>
        <ArrowLeft className="w-3 h-3 mr-2" /> Back to Users
      </Button>
      <h1 className="font-serif text-5xl">Add New User</h1>
      <div className="mt-8 p-12 border border-accent/10 border-dashed text-center text-muted-foreground italic">
        User Registration Form Placeholder
      </div>
    </div>
  );
}
