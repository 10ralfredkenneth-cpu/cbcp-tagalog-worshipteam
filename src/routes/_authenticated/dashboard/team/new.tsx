import { createFileRoute } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Save, User, Mail, Shield, Music } from 'lucide-react';

export const Route = createFileRoute('/_authenticated/dashboard/team/new')({
  component: AddTeamMemberPage,
});

function AddTeamMemberPage() {
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
            <h1 className="font-serif text-5xl text-foreground">Add Team Member</h1>
          </div>
          <p className="text-muted-foreground text-sm max-w-2xl ml-14">
            Onboard new ministry members. Assign roles and instruments to start scheduling them for services.
          </p>
        </div>
        <Button className="rounded-none bg-accent text-primary hover:bg-accent/90 px-8 py-6 font-bold text-[10px] uppercase tracking-widest shadow-xl">
          <Save className="w-4 h-4 mr-2" /> Create Profile
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
                <Input placeholder="John Doe" className="pl-10 rounded-none border-accent/10 bg-background" />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input type="email" placeholder="john@example.com" className="pl-10 rounded-none border-accent/10 bg-background" />
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
                <Select>
                  <SelectTrigger className="pl-10 rounded-none border-accent/10 bg-background">
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
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Primary Instrument / Skill</Label>
              <div className="relative">
                <Music className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="e.g. Acoustic Guitar, Soprano, ProPresenter" className="pl-10 rounded-none border-accent/10 bg-background" />
              </div>
            </div>

            <div className="p-6 bg-muted/20 border border-accent/5 space-y-3">
               <h3 className="text-[10px] font-bold uppercase tracking-widest text-accent">Account Connection</h3>
               <p className="text-[9px] text-muted-foreground leading-relaxed italic">
                 Once created, this member can be linked to a system user account in the User Management section to allow them to log in and manage their own availability.
               </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

