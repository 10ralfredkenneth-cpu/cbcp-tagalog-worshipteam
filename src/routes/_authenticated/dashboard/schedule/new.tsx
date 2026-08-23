import { createFileRoute } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Save, Calendar, User, Shield, Clock } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getServices } from '@/lib/db-services';
import { supabase } from '@/integrations/supabase/client';

export const Route = createFileRoute('/_authenticated/dashboard/schedule/new')({
  component: AddSchedulePage,
});

function AddSchedulePage() {
  const { data: services = [] } = useQuery({
    queryKey: ['services-upcoming-schedule'],
    queryFn: getServices
  });

  const { data: team = [] } = useQuery({
    queryKey: ['team-members-schedule'],
    queryFn: async () => {
      const { data, error } = await supabase.from('profiles').select('*').neq('status', 'Archived');
      if (error) throw error;
      return data;
    }
  });

  return (
    <div className="container mx-auto px-6 py-12 space-y-12 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-4">
          <Badge variant="outline" className="rounded-none uppercase text-[10px] tracking-widest border-accent/20 text-accent">
            Personnel Planning
          </Badge>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="h-10 w-10 text-accent rounded-none" onClick={() => window.history.back()}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="font-serif text-5xl text-foreground">Schedule Team</h1>
          </div>
          <p className="text-muted-foreground text-sm max-w-2xl ml-14">
            Assign ministry members to upcoming services. Roster updates reflect instantly on team dashboards.
          </p>
        </div>
        <Button className="rounded-none bg-accent text-primary hover:bg-accent/90 px-8 py-6 font-bold text-[10px] uppercase tracking-widest shadow-xl">
          <Save className="w-4 h-4 mr-2" /> Send Invites
        </Button>
      </header>

      <div className="max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-12 ml-14">
        <div className="space-y-8">
          <section className="space-y-6">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent border-b border-accent/10 pb-2">Service Context</h3>
            
            <div className="space-y-2">
              <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Target Service</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
                <Select>
                  <SelectTrigger className="pl-10 rounded-none border-accent/10 bg-background">
                    <SelectValue placeholder="Select Service..." />
                  </SelectTrigger>
                  <SelectContent className="rounded-none">
                    {services.map(s => (
                      <SelectItem key={s.id} value={s.id}>{s.title} ({s.serviceDate})</SelectItem>
                    ))}
                    {services.length === 0 && <SelectItem value="none" disabled>No upcoming services</SelectItem>}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Call Time</Label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input type="time" placeholder="07:30" className="pl-10 rounded-none border-accent/10 bg-background" />
              </div>
            </div>
          </section>
        </div>

        <div className="space-y-8">
          <section className="space-y-6">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent border-b border-accent/10 pb-2">Individual Assignment</h3>
            
            <div className="space-y-2">
              <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Team Member</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
                <Select>
                  <SelectTrigger className="pl-10 rounded-none border-accent/10 bg-background">
                    <SelectValue placeholder="Search Member..." />
                  </SelectTrigger>
                  <SelectContent className="rounded-none">
                    {team.map(m => (
                      <SelectItem key={m.id} value={m.id}>{m.full_name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Assignment Role</Label>
              <div className="relative">
                <Shield className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
                <Select>
                  <SelectTrigger className="pl-10 rounded-none border-accent/10 bg-background">
                    <SelectValue placeholder="Assign Role..." />
                  </SelectTrigger>
                  <SelectContent className="rounded-none">
                    <SelectItem value="worship_leader">Worship Leader</SelectItem>
                    <SelectItem value="vocalist">Vocalist</SelectItem>
                    <SelectItem value="acoustic_guitar">Acoustic Guitar</SelectItem>
                    <SelectItem value="electric_guitar">Electric Guitar</SelectItem>
                    <SelectItem value="bass">Bass Guitar</SelectItem>
                    <SelectItem value="drums">Drums</SelectItem>
                    <SelectItem value="keys">Keys / Synth</SelectItem>
                    <SelectItem value="propresenter">ProPresenter</SelectItem>
                    <SelectItem value="sound">Sound Engineer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="p-6 bg-muted/20 border border-accent/5 space-y-3">
               <h3 className="text-[10px] font-bold uppercase tracking-widest text-accent">Notification</h3>
               <p className="text-[9px] text-muted-foreground leading-relaxed italic">
                 An automated email and system notification will be sent to the member upon saving this assignment, requesting their confirmation.
               </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

