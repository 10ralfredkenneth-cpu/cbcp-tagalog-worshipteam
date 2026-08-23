import { createFileRoute, Outlet } from '@tanstack/react-router';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export const Route = createFileRoute('/_public')({
  component: () => (
    <div className="flex min-h-screen flex-col selection:bg-accent/30 selection:text-primary">
      <Navbar />
      <main className="flex-1 animate-in fade-in duration-700">
        <Outlet />
      </main>
      <Footer />
    </div>
  ),


});
