import { createFileRoute, Outlet, redirect, useNavigate, useLocation } from '@tanstack/react-router';
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { AdminSidebar } from '@/components/layout/AdminSidebar';
import { useAuth } from '@/hooks/use-auth';
import { Loader2 } from 'lucide-react';

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async ({ location }) => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  const { loading, isPending } = useAuth();
  const location = window.location.pathname;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary">
        <Loader2 className="w-8 h-8 text-accent animate-spin" />
      </div>
    );
  }

  // Redirect pending users to awaiting-approval if they are not already there
  if (isPending && location !== '/awaiting-approval') {
    return redirect({ to: '/awaiting-approval' }) as any;
  }

  // If active user is on awaiting-approval, let them through (the component handles its own redirect)


  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      <main className="flex-1 lg:pl-64 transition-all duration-500">
        <div className="min-h-screen pt-20 lg:pt-0">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
