import { createFileRoute } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Save, Music, Hash, Type, Link2 } from 'lucide-react';

export const Route = createFileRoute('/_authenticated/dashboard/songs/new')({
  component: AddSongPage,
});

function AddSongPage() {
  return (
    <div className="container mx-auto px-6 py-12 space-y-12 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-4">
          <Badge variant="outline" className="rounded-none uppercase text-[10px] tracking-widest border-accent/20 text-accent">
            Asset Management
          </Badge>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="h-10 w-10 text-accent rounded-none" onClick={() => window.history.back()}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="font-serif text-5xl text-foreground">Add New Song</h1>
          </div>
          <p className="text-muted-foreground text-sm max-w-2xl ml-14">
            Expand the ministry library. Provide metadata to help leaders plan services and vocalists prepare.
          </p>
        </div>
        <Button className="rounded-none bg-accent text-primary hover:bg-accent/90 px-8 py-6 font-bold text-[10px] uppercase tracking-widest shadow-xl">
          <Save className="w-4 h-4 mr-2" /> Save to Library
        </Button>
      </header>

      <div className="max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-12 ml-14">
        <div className="md:col-span-2 space-y-12">
          <section className="space-y-6">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent border-b border-accent/10 pb-2">Song Metadata</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Song Title</Label>
                <div className="relative">
                  <Music className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Title of the song" className="pl-10 rounded-none border-accent/10 bg-background" />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Artist / Author</Label>
                <div className="relative">
                  <Type className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Original artist or writer" className="pl-10 rounded-none border-accent/10 bg-background" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Original Key</Label>
                <Select>
                  <SelectTrigger className="rounded-none border-accent/10 bg-background">
                    <SelectValue placeholder="Key" />
                  </SelectTrigger>
                  <SelectContent className="rounded-none">
                    {['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'].map(k => (
                      <SelectItem key={k} value={k}>{k}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Tempo (BPM)</Label>
                <div className="relative">
                  <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input type="number" placeholder="72" className="pl-10 rounded-none border-accent/10 bg-background" />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Time Signature</Label>
                <Select defaultValue="4/4">
                  <SelectTrigger className="rounded-none border-accent/10 bg-background">
                    <SelectValue placeholder="Meter" />
                  </SelectTrigger>
                  <SelectContent className="rounded-none">
                    <SelectItem value="4/4">4/4</SelectItem>
                    <SelectItem value="3/4">3/4</SelectItem>
                    <SelectItem value="6/8">6/8</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent border-b border-accent/10 pb-2">Content & Lyrics</h3>
            <div className="space-y-2">
              <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Lyrics Body</Label>
              <Textarea placeholder="Paste lyrics here for reference..." className="rounded-none border-accent/10 bg-background min-h-[300px] font-mono text-[12px]" />
            </div>
          </section>
        </div>

        <div className="space-y-12">
          <section className="space-y-6">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent border-b border-accent/10 pb-2">Resources & Media</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">YouTube Link</Label>
                <div className="relative">
                  <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="https://youtube.com/..." className="pl-10 rounded-none border-accent/10 bg-background" />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Chord Sheet (PDF)</Label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-accent/10 border-dashed rounded-none hover:border-accent/30 transition-colors cursor-pointer">
                  <div className="space-y-1 text-center">
                    <Music className="mx-auto h-12 w-12 text-accent/20" />
                    <div className="flex text-[10px] text-muted-foreground">
                      <span className="relative cursor-pointer bg-transparent font-bold text-accent hover:text-accent/80">Upload a file</span>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="p-6 bg-muted/20 border border-accent/5 space-y-3">
             <h3 className="text-[10px] font-bold uppercase tracking-widest text-accent">Visibility</h3>
             <div className="flex items-center justify-between">
               <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Publicly Visible</span>
               <div className="w-8 h-4 bg-accent/20 rounded-full relative">
                 <div className="absolute left-1 top-1 w-2 h-2 bg-accent rounded-full" />
               </div>
             </div>
             <p className="text-[9px] text-muted-foreground leading-relaxed italic">
               Archived songs will not appear in the planning picker but will remain in the database history.
             </p>
          </section>
        </div>
      </div>
    </div>
  );
}

