import { createFileRoute } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Globe, Church, Music, Camera, Loader2, Eye, EyeOff } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getSettings, updateSetting } from '@/lib/db-settings.functions';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

const homepageSections = [
  { key: 'worship', name: 'Worship' },
  { key: 'songs', name: 'Songs' },
  { key: 'setlists', name: 'Setlists' },
  { key: 'team', name: 'Team' },
  { key: 'resources', name: 'Resources' },
  { key: 'media', name: 'Media' },
  { key: 'about', name: 'About' },
  { key: 'contact', name: 'Contact' },
] as const;

export const Route = createFileRoute('/_authenticated/dashboard/settings')({
  component: SettingsPage,
});

function SettingsPage() {
  const queryClient = useQueryClient();
  const { data: settings = [], isLoading } = useQuery({
    queryKey: ['ministry-settings'],
    queryFn: getSettings
  });

  const [localSettings, setLocalSettings] = useState<Record<string, any>>({});

  useEffect(() => {
    if (settings.length > 0) {
      const initial = settings.reduce((acc, curr) => ({
        ...acc,
        [curr.key]: curr.value
      }), {});
      setLocalSettings(initial);
    }
  }, [settings]);

  const mutation = useMutation({
    mutationFn: updateSetting,
    onSuccess: () => {
      toast.success('Settings saved successfully');
      queryClient.invalidateQueries({ queryKey: ['ministry-settings'] });
    },
    onError: (error) => {
      toast.error('Failed to save settings: ' + (error as Error).message);
    }
  });

  const handleSave = (key: string, value = localSettings[key]) => {
     setLocalSettings((previous) => ({ ...previous, [key]: value }));
     mutation.mutate({ data: { key, value } });
   };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12 space-y-12 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-4">
          <Badge variant="outline" className="rounded-none uppercase text-[10px] tracking-widest border-accent/20 text-accent">
            Ministry Configuration
          </Badge>
          <h1 className="font-serif text-5xl text-foreground">Settings</h1>
          <p className="text-muted-foreground text-sm max-w-2xl">
            Manage your ministry identity, worship preferences, and system defaults.
          </p>
        </div>
      </header>

      <Tabs defaultValue="identity" className="w-full">
        <TabsList className="bg-transparent border-b border-accent/10 w-full justify-start rounded-none h-auto p-0 gap-8">
           <TabsTrigger value="identity" className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:bg-transparent text-[10px] uppercase font-bold tracking-widest px-0 py-4">Identity</TabsTrigger>
           <TabsTrigger value="worship" className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:bg-transparent text-[10px] uppercase font-bold tracking-widest px-0 py-4">Worship</TabsTrigger>
           <TabsTrigger value="homepage" className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:bg-transparent text-[10px] uppercase font-bold tracking-widest px-0 py-4">Homepage Sections</TabsTrigger>
           <TabsTrigger value="branding" className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:bg-transparent text-[10px] uppercase font-bold tracking-widest px-0 py-4">Branding</TabsTrigger>
           <TabsTrigger value="notifications" className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:bg-transparent text-[10px] uppercase font-bold tracking-widest px-0 py-4">Notifications</TabsTrigger>
         </TabsList>

        <div className="mt-12 max-w-4xl">
          <TabsContent value="identity" className="space-y-8 animate-in slide-in-from-left-4 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <section className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Ministry Name</Label>
                  <Input 
                    value={localSettings['ministry_name'] || ''} 
                    onChange={(e) => setLocalSettings(p => ({...p, ministry_name: e.target.value}))}
                    placeholder="Radiant Praise" 
                    className="rounded-none border-accent/10 bg-background" 
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Church Affiliation</Label>
                  <Input 
                    value={localSettings['church_affiliation'] || ''} 
                    onChange={(e) => setLocalSettings(p => ({...p, church_affiliation: e.target.value}))}
                    placeholder="Radiant Church" 
                    className="rounded-none border-accent/10 bg-background" 
                  />
                </div>
                <Button onClick={() => handleSave('ministry_name')} disabled={mutation.isPending} className="rounded-none bg-accent text-primary text-[10px] uppercase font-bold tracking-widest">
                  Save Identity
                </Button>
              </section>

              <section className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Ministry Vision</Label>
                  <Textarea 
                    value={localSettings['ministry_vision'] || ''} 
                    onChange={(e) => setLocalSettings(p => ({...p, ministry_vision: e.target.value}))}
                    placeholder="Our vision for worship..." 
                    className="rounded-none border-accent/10 bg-background min-h-[120px]" 
                  />
                </div>
                <Button onClick={() => handleSave('ministry_vision')} disabled={mutation.isPending} className="rounded-none bg-accent text-primary text-[10px] uppercase font-bold tracking-widest">
                  Update Vision
                </Button>
              </section>
            </div>
          </TabsContent>

          <TabsContent value="worship" className="space-y-8 animate-in slide-in-from-left-4 duration-500">
             <div className="p-8 bg-muted/20 border border-accent/5">
                <h3 className="text-xl font-serif mb-6">Worship Defaults</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Default Service Type</Label>
                    <Input 
                      value={localSettings['default_service_type'] || ''} 
                      onChange={(e) => setLocalSettings(p => ({...p, default_service_type: e.target.value}))}
                      placeholder="Sunday Worship" 
                      className="rounded-none border-accent/10 bg-background" 
                    />
                  </div>
                </div>
                <Button onClick={() => handleSave('default_service_type')} disabled={mutation.isPending} className="mt-8 rounded-none bg-accent text-primary text-[10px] uppercase font-bold tracking-widest">
                  Save Defaults
                </Button>
             </div>
           </TabsContent>

           <TabsContent value="homepage" className="space-y-6 animate-in slide-in-from-left-4 duration-500">
             <div className="space-y-2">
               <h2 className="text-2xl font-serif text-foreground">Homepage Sections</h2>
               <p className="text-sm text-muted-foreground">Control which existing sections are visible to public visitors.</p>
             </div>
             <div className="divide-y divide-border border-y border-border">
               {homepageSections.map((section) => {
                 const visible = localSettings.homepage_sections?.[section.key] !== false;
                 return (
                   <div key={section.key} className="flex items-center justify-between gap-4 py-5">
                     <div><p className="font-medium text-foreground">{section.name}</p><p className="text-xs text-muted-foreground">{visible ? 'Published · Visible publicly' : 'Hidden · Admin management remains available'}</p></div>
                     <Button variant="outline" size="sm" disabled={mutation.isPending} onClick={() => handleSave('homepage_sections', { ...localSettings.homepage_sections, [section.key]: !visible })} className="rounded-none gap-2">
                       {visible ? <Eye size={16} /> : <EyeOff size={16} />} {visible ? 'Published' : 'Hidden'}
                     </Button>
                   </div>
                 );
               })}
             </div>
           </TabsContent>
         </div>
      </Tabs>
    </div>
  );
}
