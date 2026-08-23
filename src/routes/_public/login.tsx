import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Shield } from 'lucide-react';

export const Route = createFileRoute('/_public/login')({
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login
    navigate({ to: '/dashboard' });
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
          <h1 className="font-serif text-5xl text-foreground">Personnel Portal</h1>
          <p className="text-muted-foreground text-sm uppercase tracking-widest font-bold">
            Enter your credentials to manage worship services
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
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-[9px] font-bold tracking-[0.2em] text-accent uppercase block">Password</label>
                <button type="button" className="text-[9px] font-bold text-accent uppercase tracking-widest hover:underline">Forgot?</button>
              </div>
              <Input 
                type="password" 
                className="h-14 bg-muted/20 border-accent/10 rounded-none focus-visible:ring-accent"
                required
              />
            </div>
          </div>

          <Button type="submit" className="w-full h-14 rounded-none bg-accent hover:bg-accent/90 text-primary font-bold tracking-[0.2em] uppercase transition-all">
            Sign In to Dashboard
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
