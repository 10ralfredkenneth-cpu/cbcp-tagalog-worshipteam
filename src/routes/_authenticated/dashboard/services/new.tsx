import { createFileRoute } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Save, Calendar, Clock, MapPin, Info } from 'lucide-react';

export const Route = createFileRoute('/_authenticated/dashboard/services/new')({
  component: CreateServicePage,
});

function CreateServicePage() {
  return (
    <div className="container mx-auto px-6 py-12 space-y-12 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-4">
          <Badge variant="outline" className="rounded-none uppercase text-[10px] tracking-widest border-accent/20 text-accent">
            Planning Center
          </Badge>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="h-10 w-10 text-accent rounded-none" onClick={() => window.history.back()}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="font-serif text-5xl text-foreground">Plan New Service</h1>
          </div>
          <p className="text-muted-foreground text-sm max-w-2xl ml-14">
            Initialize a new worship gathering. You can add songs and schedule the team after creation.
          </p>
        </div>
        <Button className="rounded-none bg-accent text-primary hover:bg-accent/90 px-8 py-6 font-bold text-[10px] uppercase tracking-widest shadow-xl">
          <Save className="w-4 h-4 mr-2" /> Save Service
        </Button>
      </header>

      <div className="max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-12 ml-14">
        <div className="space-y-8">
          <div className="space-y-4">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent border-b border-accent/10 pb-2">Gathering Details</h3>
            
            <div className="space-y-2">
              <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Service Title</Label>
              <Input placeholder="e.g. Sunday Morning Worship" className="rounded-none border-accent/10 bg-background" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Date</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input type="date" className="pl-10 rounded-none border-accent/10 bg-background" />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Time</Label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input type="time" className="pl-10 rounded-none border-accent/10 bg-background" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Location</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Main Sanctuary" className="pl-10 rounded-none border-accent/10 bg-background" />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="space-y-4">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent border-b border-accent/10 pb-2">Vision & Notes</h3>
            
            <div className="space-y-2">
              <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Service Theme</Label>
              <Input placeholder="e.g. The Grace of God" className="rounded-none border-accent/10 bg-background" />
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Internal Planning Notes</Label>
              <Textarea placeholder="Specific instructions for the worship team..." className="rounded-none border-accent/10 bg-background min-h-[150px]" />
            </div>

            <div className="p-6 bg-muted/20 border border-accent/5 space-y-3">
              <div className="flex items-center gap-2 text-accent">
                <Info className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Next Steps</span>
              </div>
              <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                After saving, you will be redirected to the Setlist Builder where you can select songs and assign team members to their roles.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

