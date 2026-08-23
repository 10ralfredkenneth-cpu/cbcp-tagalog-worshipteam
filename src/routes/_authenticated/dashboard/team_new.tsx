import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Save, User, Mail, Shield, Music, Loader2 } from 'lucide-react';
import { ImageUpload } from '@/components/ui/ImageUpload';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createMember } from '@/lib/db-team.functions';
import { toast } from 'sonner';

export const Route = createFileRoute('/_authenticated/dashboard/team_new')({
  component: AddTeamMemberPage,
});

function AddTeamMemberPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    primary_role: '',
    instruments: '',
    status: 'Active',
    is_public: true,
    avatar_url: ''
  });

  const mutation = useMutation({
    mutationFn: createMember,
    onSuccess: () => {
      toast.success('Personnel profile created successfully.');
      queryClient.invalidateQueries({ queryKey: ['team-members'] });
      queryClient.invalidateQueries({ queryKey: ['team-public'] });
      navigate({ to: '/dashboard/team' });
    },
    onError: (error) => {
      toast.error('Failed to add member: ' + (error as Error).message);
    }
  });

  const handleSubmit = () => {
    if (!formData.full_name || !formData.email) {
      toast.error('Name and email are required');
      return;
    }
    mutation.mutate({ data: formData });
  };

  return (
    <div className="container mx-auto px-6 py-12 space-y-12 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-4">
          <Badge variant="outline" className="rounded-none uppercase text-[10px] tracking-widest border-accent/20 text-accent">
            Worship Team Personnel Profile
          </Badge>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="h-10 w-10 text-accent rounded-none" onClick={() => window.history.back()}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="font-serif text-5xl text-foreground">Add Team Profile</h1>
          </div>
        </div>
        <Button 
          onClick={handleSubmit}
          disabled={mutation.isPending}
          className="rounded-none bg-accent text-primary hover:bg-accent/90 px-8 py-6 font-bold text-[10px] uppercase tracking-widest"
        >
          {mutation.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
          Create Profile
        </Button>
      </header>

      <div className="max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-12 ml-14">
        <div className="space-y-8">
          <div className="space-y-2">
            <Label>Full Name</Label>
            <Input 
              value={formData.full_name}
              onChange={(e) => setFormData(prev => ({ ...prev, full_name: e.target.value }))}
              placeholder="John Doe" 
            />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input 
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              placeholder="john@example.com" 
            />
          </div>
        </div>
      </div>
    </div>
  );
}
