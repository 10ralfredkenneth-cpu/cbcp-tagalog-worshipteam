import { useState } from 'react';
import { createFileRoute, useNavigate, useSearch } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Shield, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { z } from 'zod';

const loginSearchSchema = z.object({
  redirect: z.string().optional(),
});

export const Route = createFileRoute('/_public/login')({
  validateSearch: (search) => loginSearchSchema.parse(search),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const search = useSearch({ from: '/_public/login' });
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      toast.success('Welcome back');
      
      if (search.redirect) {
        window.location.href = search.redirect;
      } else {
        navigate({ to: '/dashboard' });
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      toast.error('Please enter your email address first');
      return;
    }
    
    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });
      if (error) throw error;
      toast.success('Password reset instructions sent to your email');
    } catch (error: any) {
      toast.error(error.message || 'Failed to send reset email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-6 py-20 min-h-[80vh] flex items-center justify-center animate-in fade-in duration-700">
      <div className="w-full max-w-md space-y-12">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-primary flex items-center justify-center rounded-none mb-4">
              <Shield className="w-8 h-8 text-accent" />
            </div>
          </div>
          <Badge variant="outline" className="rounded-none uppercase text-[10px] tracking-widest border-accent/20 text-accent">
            Secure Access
          </Badge>
          <h1 className="font-serif text-5xl text-foreground">Worship Team Access</h1>
          <p className="text-muted-foreground text-sm uppercase tracking-widest font-bold">
            Sign in to access worship planning, schedules, songs, resources, and ministry tools.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[9px] font-bold tracking-[0.2em] text-accent uppercase block">Email Address</label>
              <Input 
                type="email" 
                placeholder="email@radiantworship.org" 
                className="h-14 bg-muted/20 border-accent/10 rounded-none focus-visible:ring-accent"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-[9px] font-bold tracking-[0.2em] text-accent uppercase block">Password</label>
                <button 
                  type="button" 
                  onClick={handleForgotPassword}
                  className="text-[9px] font-bold text-accent uppercase tracking-widest hover:underline disabled:opacity-50"
                  disabled={loading}
                >
                  Forgot?
                </button>
              </div>
              <Input 
                type="password" 
                className="h-14 bg-muted/20 border-accent/10 rounded-none focus-visible:ring-accent"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full h-14 rounded-none bg-accent hover:bg-accent/90 text-primary font-bold tracking-[0.2em] uppercase transition-all"
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              'Sign In'
            )}
          </Button>
        </form>

        <div className="text-center border-t border-accent/10 pt-8">
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest">
            Trouble accessing? <a href="#" className="text-accent hover:underline">Contact System Admin</a>
          </p>
        </div>
      </div>
    </div>
  );
}
