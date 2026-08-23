import { createFileRoute } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Save, ListMusic, Calendar, Search, Plus } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getServices } from '@/lib/db-services';

export const Route = createFileRoute('/_authenticated/dashboard/setlists/new')({
  component: CreateSetlistPage,
});

function CreateSetlistPage() {
  const { data: services = [] } = useQuery({
    queryKey: ['services-upcoming'],
    queryFn: getServices
  });

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
            <h1 className="font-serif text-5xl text-foreground">Create Setlist</h1>
          </div>
          <p className="text-muted-foreground text-sm max-w-2xl ml-14">
            Construct the musical flow for a service. You can select songs from the library and arrange them in order.
          </p>
        </div>
        <Button className="rounded-none bg-accent text-primary hover:bg-accent/90 px-8 py-6 font-bold text-[10px] uppercase tracking-widest shadow-xl">
          <Save className="w-4 h-4 mr-2" /> Save Setlist
        </Button>
      </header>

      <div className="max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-12 ml-14">
        <div className="space-y-8">
          <section className="space-y-6">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent border-b border-accent/10 pb-2">Service Assignment</h3>
            
            <div className="space-y-2">
              <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Select Service</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
                <Select>
                  <SelectTrigger className="pl-10 rounded-none border-accent/10 bg-background">
                    <SelectValue placeholder="Link to upcoming service..." />
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
              <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Setlist Title</Label>
              <div className="relative">
                <ListMusic className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="e.g. Sunday Morning Main Set" className="pl-10 rounded-none border-accent/10 bg-background" />
              </div>
            </div>
          </section>
        </div>

        <div className="space-y-8">
          <section className="space-y-6">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent border-b border-accent/10 pb-2">Song Selection Preview</h3>
            
            <div className="p-12 border border-accent/5 border-dashed bg-muted/5 flex flex-col items-center justify-center text-center space-y-4">
              <Search className="w-8 h-8 text-accent/20" />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">No songs added yet</p>
                <p className="text-[9px] text-muted-foreground/60 mt-1 italic uppercase tracking-widest">Search and add songs after initializing the setlist</p>
              </div>
              <Button variant="outline" size="sm" className="rounded-none border-accent/20 text-[9px] uppercase font-bold tracking-widest">
                <Plus className="w-3 h-3 mr-2" /> Add First Song
              </Button>
            </div>

            <div className="p-6 bg-muted/20 border border-accent/5 space-y-3">
               <h3 className="text-[10px] font-bold uppercase tracking-widest text-accent italic">Pro Tip</h3>
               <p className="text-[9px] text-muted-foreground leading-relaxed italic">
                 You can duplicate existing setlists from previous services to save time on recurring arrangements.
               </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

