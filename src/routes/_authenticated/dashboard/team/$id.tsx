import { createFileRoute, useNavigate, useParams } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Save, User, Mail, Shield, Music, Loader2 } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getTeamMembers, updateMember } from '@/lib/db-team.functions';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

export const Route = createFileRoute('/_authenticated/dashboard/team/$id')({
  component: EditTeamMemberPage,
});

function EditTeamMemberPage() {
  const { id } = useParams({ from: '/_authenticated/dashboard/team/$id' });
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  const { data: team = [], isLoading } = useQuery({
    queryKey: ['team-members'],
    queryFn: getTeamMembers
  });

  const member = team.find(m => m.id === id);

  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    primary_role: '',
    instrument: '',
    status: 'Active',
    is_public: false
  });

  useEffect(() => {
    if (member) {
      setFormData({
        full_name: member.full_name || '',
        email: member.email || '',
        primary_role: member.primary_role || '',
        instrument: member.instrument || '',
        status: member.status || 'Active',
        is_public: member.is_public || false
      });
    }
  }, [member]);

  const mutation = useMutation({
    mutationFn: updateMember,
    onSuccess: () => {
      toast.success('Member updated successfully');
      queryClient.invalidateQueries({ queryKey: ['team-members'] });
      navigate({ to: '/dashboard/team' });
    },
    onError: (error) => {
      toast.error('Failed to update member: ' + (error as Error).message);
    }
  });

  const handleSubmit = () => {
    if (!formData.full_name || !formData.email) {
      toast.error('Name and email are required');
      return;
    }
    mutation.mutate({ data: { id, updates: formData } });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
      </div>
    );
  }

  if (!member) {
    return (
      <div className="container mx-auto px-6 py-12 text-center">
        <h2 className="text-2xl font-serif">Member Not Found</h2>
        <Button onClick={() => navigate({ to: '/dashboard/team' })} className="mt-4">Back to Team</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12 space-y-12 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-4">
          <Badge variant="outline" className="rounded-none uppercase text-[10px] tracking-widest border-accent/20 text-accent">
            Personnel Management
          </Badge>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="h-10 w-10 text-accent rounded-none" onClick={() => window.history.back()}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="font-serif text-5xl text-foreground">Edit Member</h1>
          </div>
        </div>
        <Button 
          onClick={handleSubmit}
          disabled={mutation.isPending}
          className="rounded-none bg-accent text-primary hover:bg-accent/90 px-8 py-6 font-bold text-[10px] uppercase tracking-widest shadow-xl"
        >
          {mutation.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
          Save Profile
        </Button>
      </header>

      <div className="max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-12 ml-14">
        <div className="space-y-8">
          <section className="space-y-6">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent border-b border-accent/10 pb-2">Personal Information</h3>
            
            <div className="space-y-2">
              <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Full Name</Label>
              <Input 
                value={formData.full_name}
                onChange={(e) => setFormData(prev => ({ ...prev, full_name: e.target.value }))}
                placeholder="John Doe" 
                className="rounded-none border-accent/10 bg-background" 
              />
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Email Address</Label>
              <Input 
                type="email" 
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="john@example.com" 
                className="rounded-none border-accent/10 bg-background" 
              />
            </div>
          </section>
        </div>

        <div className="space-y-8">
          <section className="space-y-6">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent border-b border-accent/10 pb-2">Ministry Assignment</h3>
            
            <div className="space-y-2">
              <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Primary Role</Label>
              <Select value={formData.primary_role} onValueChange={(v) => setFormData(prev => ({ ...prev, primary_role: v }))}>
                <SelectTrigger className="rounded-none border-accent/10 bg-background">
                  <SelectValue placeholder="Select Role" />
                </SelectTrigger>
                <SelectContent className="rounded-none">
                  <SelectItem value="vocalist">Vocalist</SelectItem>
                  <SelectItem value="musician">Musician</SelectItem>
                  <SelectItem value="production">Production / Tech</SelectItem>
                  <SelectItem value="leader">Worship Leader</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Primary Instrument</Label>
              <Input 
                value={formData.instrument}
                onChange={(e) => setFormData(prev => ({ ...prev, instrument: e.target.value }))}
                placeholder="e.g. Acoustic Guitar" 
                className="rounded-none border-accent/10 bg-background" 
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
