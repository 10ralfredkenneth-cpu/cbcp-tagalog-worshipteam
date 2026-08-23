import { createFileRoute } from '@tanstack/react-router';
import { 
  Building, 
  MapPin, 
  Mail, 
  Phone, 
  Globe,
  Settings,
  Music,
  Video,
  Layout,
  Save,
  ShieldCheck,
  Bell
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { toast } from 'sonner';

export const Route = createFileRoute('/_authenticated/dashboard/settings')({
  component: MinistrySettingsPage,
});

function MinistrySettingsPage() {
  const handleSave = () => {
    toast.success('Settings updated successfully', {
      className: "rounded-none bg-primary text-primary-foreground border-accent/20",
      description: "All changes have been saved and applied ministry-wide."
    });
  };

  return (
    <div className="container mx-auto px-6 py-12 space-y-12 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-4">
          <Badge variant="outline" className="rounded-none uppercase text-[10px] tracking-widest border-accent/20 text-accent">
            System Administration
          </Badge>
          <h1 className="font-serif text-5xl text-foreground">Ministry Settings</h1>
          <p className="text-muted-foreground text-sm max-w-2xl">
            Configure global defaults, ministry identity, and system preferences.
          </p>
        </div>
        <Button onClick={handleSave} className="rounded-none bg-accent text-primary hover:bg-accent/90 px-8 py-6 font-bold text-[10px] uppercase tracking-widest shadow-xl">
          <Save className="w-4 h-4 mr-2" /> Save All Changes
        </Button>
      </header>

      <Tabs defaultValue="identity" className="w-full">
        <TabsList className="bg-muted/20 p-1 rounded-none border-b border-accent/10 w-full justify-start h-auto gap-2 mb-12">
          <TabsTrigger value="identity" className="rounded-none data-[state=active]:bg-background data-[state=active]:text-accent text-[10px] font-bold uppercase tracking-widest px-8 py-4">
            <Building className="w-3 h-3 mr-2" /> Ministry Identity
          </TabsTrigger>
          <TabsTrigger value="worship" className="rounded-none data-[state=active]:bg-background data-[state=active]:text-accent text-[10px] font-bold uppercase tracking-widest px-8 py-4">
            <Music className="w-3 h-3 mr-2" /> Worship & Planning
          </TabsTrigger>
          <TabsTrigger value="branding" className="rounded-none data-[state=active]:bg-background data-[state=active]:text-accent text-[10px] font-bold uppercase tracking-widest px-8 py-4">
            <Layout className="w-3 h-3 mr-2" /> Branding
          </TabsTrigger>
          <TabsTrigger value="security" className="rounded-none data-[state=active]:bg-background data-[state=active]:text-accent text-[10px] font-bold uppercase tracking-widest px-8 py-4">
            <ShieldCheck className="w-3 h-3 mr-2" /> Access & Security
          </TabsTrigger>
          <TabsTrigger value="notifications" className="rounded-none data-[state=active]:bg-background data-[state=active]:text-accent text-[10px] font-bold uppercase tracking-widest px-8 py-4">
            <Bell className="w-3 h-3 mr-2" /> Notifications
          </TabsTrigger>
        </TabsList>

        <div className="max-w-4xl">
          <TabsContent value="identity" className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="ministry-name" className="text-[10px] font-bold uppercase tracking-widest text-accent">Ministry Name</Label>
                  <Input id="ministry-name" defaultValue="Radiant Worship" className="rounded-none border-accent/10 focus-visible:ring-accent bg-background" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="church-name" className="text-[10px] font-bold uppercase tracking-widest text-accent">Church Affiliation</Label>
                  <Input id="church-name" defaultValue="Grace Community Church" className="rounded-none border-accent/10 focus-visible:ring-accent bg-background" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-[10px] font-bold uppercase tracking-widest text-accent">Ministry Vision</Label>
                  <Textarea id="description" className="rounded-none border-accent/10 focus-visible:ring-accent bg-background min-h-[120px]" 
                    defaultValue="Raising a generation of worshippers who serve in spirit and truth." 
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-accent">Contact Details</Label>
                  <div className="space-y-3">
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input placeholder="Email Address" defaultValue="worship@gracecommunity.org" className="pl-10 rounded-none border-accent/10 bg-background" />
                    </div>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input placeholder="Phone Number" defaultValue="+1 (555) 0123" className="pl-10 rounded-none border-accent/10 bg-background" />
                    </div>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input placeholder="Address" defaultValue="123 Faith Lane, Springfield" className="pl-10 rounded-none border-accent/10 bg-background" />
                    </div>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input placeholder="Website" defaultValue="www.gracecommunity.org" className="pl-10 rounded-none border-accent/10 bg-background" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="worship" className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div className="space-y-4">
                  <h3 className="text-[10px] font-bold uppercase tracking-widest text-accent">Default Service Planning</h3>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-bold uppercase tracking-[0.1em] text-muted-foreground">Primary Service Type</Label>
                    <Select defaultValue="sunday">
                      <SelectTrigger className="rounded-none border-accent/10 bg-background">
                        <SelectValue placeholder="Select Service" />
                      </SelectTrigger>
                      <SelectContent className="rounded-none">
                        <SelectItem value="sunday">Sunday Worship</SelectItem>
                        <SelectItem value="youth">Youth Service</SelectItem>
                        <SelectItem value="prayer">Prayer Meeting</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-bold uppercase tracking-[0.1em] text-muted-foreground">Service Start Time</Label>
                    <Input type="time" defaultValue="09:00" className="rounded-none border-accent/10 bg-background" />
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="space-y-4">
                  <h3 className="text-[10px] font-bold uppercase tracking-widest text-accent">Musical Preferences</h3>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-bold uppercase tracking-[0.1em] text-muted-foreground">Key Notation</Label>
                    <Select defaultValue="standard">
                      <SelectTrigger className="rounded-none border-accent/10 bg-background">
                        <SelectValue placeholder="Select Notation" />
                      </SelectTrigger>
                      <SelectContent className="rounded-none">
                        <SelectItem value="standard">Standard (C, D, E...)</SelectItem>
                        <SelectItem value="nashville">Nashville Numbers</SelectItem>
                        <SelectItem value="roman">Roman Numerals</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-accent/5">
                    <div className="space-y-0.5">
                      <Label className="text-[10px] font-bold uppercase tracking-[0.1em] text-foreground">Auto-transpose PDFs</Label>
                      <p className="text-[10px] text-muted-foreground italic">Automatically generate chord sheets in selected keys.</p>
                    </div>
                    <Switch className="data-[state=checked]:bg-accent" defaultChecked />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="security" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="space-y-6">
                <div className="flex items-center justify-between p-6 bg-muted/20 border border-accent/5">
                  <div className="space-y-0.5">
                    <Label className="text-[10px] font-bold uppercase tracking-[0.1em] text-foreground">Multi-Factor Authentication</Label>
                    <p className="text-[10px] text-muted-foreground italic">Require extra verification for admin accounts.</p>
                  </div>
                  <Switch className="data-[state=checked]:bg-accent" />
                </div>
                <div className="flex items-center justify-between p-6 bg-muted/20 border border-accent/5">
                  <div className="space-y-0.5">
                    <Label className="text-[10px] font-bold uppercase tracking-[0.1em] text-foreground">Public Directory Access</Label>
                    <p className="text-[10px] text-muted-foreground italic">Allow non-logged in users to view the team directory.</p>
                  </div>
                  <Switch className="data-[state=checked]:bg-accent" defaultChecked />
                </div>
             </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
