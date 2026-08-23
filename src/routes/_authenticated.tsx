import { createFileRoute, Outlet, redirect, useNavigate, useLocation } from '@tanstack/react-router';
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { AdminSidebar } from '@/components/layout/AdminSidebar';
import { useAuth } from '@/hooks/use-auth';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

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
    return { session };
  },
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  const { loading, isPending } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading && isPending && location.pathname !== '/awaiting-approval') {
      navigate({ to: '/awaiting-approval' });
    }
  }, [loading, isPending, location.pathname, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary">
        <Loader2 className="w-8 h-8 text-accent animate-spin" />
      </div>
    );
  }

  // Show a blank state while navigating to avoid flickering the sidebar/dashboard
  if (isPending && location.pathname !== '/awaiting-approval') {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-background">
      {location.pathname !== '/awaiting-approval' && <AdminSidebar />}
      <main className={cn(
        "flex-1 transition-all duration-500",
        location.pathname !== '/awaiting-approval' ? "lg:pl-64" : ""
      )}>
        <div className={cn(
          "min-h-screen",
          location.pathname !== '/awaiting-approval' ? "pt-20 lg:pt-0" : ""
        )}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}
