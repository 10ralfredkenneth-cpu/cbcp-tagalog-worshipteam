import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Save, User, Mail, Shield, Music, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createMember } from '@/lib/db-team.functions';
import { toast } from 'sonner';

export const Route = createFileRoute('/_authenticated/dashboard/team/new')({
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
    is_public: true // Default to true so it syncs to public page
  });

  const mutation = useMutation({
    mutationFn: createMember,
    onSuccess: () => {
      toast.success('Personnel profile created successfully and synced to public team page.');
      queryClient.invalidateQueries({ queryKey: ['team-members'] });
      queryClient.invalidateQueries({ queryKey: ['team-public'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] });
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
          <p className="text-muted-foreground text-sm max-w-2xl ml-14">
            Create a ministry personnel profile (vocalist, musician, tech). This profile represents a team member's role and skills, independent of their system login account.
          </p>
        </div>
        <Button 
          onClick={handleSubmit}
          disabled={mutation.isPending}
          className="rounded-none bg-accent text-primary hover:bg-accent/90 px-8 py-6 font-bold text-[10px] uppercase tracking-widest shadow-xl"
        >
          {mutation.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
          Create Profile
        </Button>
      </header>

      <div className="max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-12 ml-14">
        <div className="space-y-8">
          <section className="space-y-6">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent border-b border-accent/10 pb-2">Personal Information</h3>
            
            <div className="space-y-2">
              <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  value={formData.full_name}
                  onChange={(e) => setFormData(prev => ({ ...prev, full_name: e.target.value }))}
                  placeholder="John Doe" 
                  className="pl-10 rounded-none border-accent/10 bg-background" 
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="john@example.com" 
                  className="pl-10 rounded-none border-accent/10 bg-background" 
                />
              </div>
            </div>
          </section>
        </div>

        <div className="space-y-8">
          <section className="space-y-6">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent border-b border-accent/10 pb-2">Ministry Assignment</h3>
            
            <div className="space-y-2">
              <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Primary Role</Label>
              <div className="relative">
                <Shield className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
                <Select value={formData.primary_role} onValueChange={(v) => setFormData(prev => ({ ...prev, primary_role: v }))}>
                  <SelectTrigger className="pl-10 rounded-none border-accent/10 bg-background">
                    <SelectValue placeholder="Select Role" />
                  </SelectTrigger>
                  <SelectContent className="rounded-none">
                    <SelectItem value="vocalist">Vocalist</SelectItem>
                    <SelectItem value="musician">Musician (Instrumentalist)</SelectItem>
                    <SelectItem value="production">Production / Technical Team</SelectItem>
                    <SelectItem value="leader">Worship Leader</SelectItem>
                    <SelectItem value="multimedia">Multimedia / Livestream</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Primary Instrument / Skill</Label>
              <div className="relative">
                <Music className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  value={formData.instruments}
                  onChange={(e) => setFormData(prev => ({ ...prev, instruments: e.target.value }))}
                  placeholder="e.g. Acoustic Guitar, Soprano, ProPresenter" 
                  className="pl-10 rounded-none border-accent/10 bg-background" 
                />
              </div>
            </div>

            <div className="p-6 bg-muted/20 border border-accent/5 space-y-3">
               <h3 className="text-[10px] font-bold uppercase tracking-widest text-accent">Personnel Profile vs. System Account</h3>
               <p className="text-[9px] text-muted-foreground leading-relaxed italic">
                 This record is a **Personnel Profile** for ministry management and public visibility. It is **not** a system login account. To allow this member to log in, you must later link this profile to a registered user in the "User Accounts" section.
               </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}


