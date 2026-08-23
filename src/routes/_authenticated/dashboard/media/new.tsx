import { createFileRoute } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Save, Upload, Film, FileVideo, Music, Image as ImageIcon, Plus } from 'lucide-react';

export const Route = createFileRoute('/_authenticated/dashboard/media/new')({
  component: UploadMediaPage,
});

function UploadMediaPage() {
  return (
    <div className="container mx-auto px-6 py-12 space-y-12 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-4">
          <Badge variant="outline" className="rounded-none uppercase text-[10px] tracking-widest border-accent/20 text-accent">
            Media Archive
          </Badge>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="h-10 w-10 text-accent rounded-none" onClick={() => window.history.back()}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="font-serif text-5xl text-foreground">Upload Media</h1>
          </div>
          <p className="text-muted-foreground text-sm max-w-2xl ml-14">
            Add videos, photos, and recordings to the ministry archives. Media items can be organized into albums later.
          </p>
        </div>
        <Button className="rounded-none bg-accent text-primary hover:bg-accent/90 px-8 py-6 font-bold text-[10px] uppercase tracking-widest shadow-xl">
          <Save className="w-4 h-4 mr-2" /> Start Upload
        </Button>
      </header>

      <div className="max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-12 ml-14">
        <div className="md:col-span-2 space-y-12">
          <section className="space-y-8">
            <div className="flex justify-center px-6 pt-10 pb-12 border-2 border-accent/10 border-dashed rounded-none hover:border-accent/30 transition-colors cursor-pointer bg-muted/5">
              <div className="space-y-4 text-center">
                <div className="flex justify-center gap-4 text-accent/20">
                  <FileVideo className="h-10 w-10" />
                  <ImageIcon className="h-10 w-10" />
                  <Music className="h-10 w-10" />
                </div>
                <div className="flex flex-col items-center">
                  <Button variant="outline" className="rounded-none border-accent/20 text-[10px] uppercase font-bold tracking-[0.2em] mb-4">
                    <Upload className="w-3 h-3 mr-2" /> Select Files
                  </Button>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest">or drag and drop files here</p>
                  <p className="text-[8px] text-muted-foreground/60 mt-2 uppercase tracking-widest">Supports MP4, MOV, JPG, PNG, MP3 (Max 500MB)</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent border-b border-accent/10 pb-2">Media Metadata</h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Title</Label>
                  <Input placeholder="Descriptive name for this media" className="rounded-none border-accent/10 bg-background" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Media Type</Label>
                    <Select>
                      <SelectTrigger className="rounded-none border-accent/10 bg-background">
                        <SelectValue placeholder="Select Type" />
                      </SelectTrigger>
                      <SelectContent className="rounded-none">
                        <SelectItem value="video">Video (Service / Sermon)</SelectItem>
                        <SelectItem value="photo">Photography</SelectItem>
                        <SelectItem value="audio">Audio Recording</SelectItem>
                        <SelectItem value="graphic">Graphic / Slide</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Album (Optional)</Label>
                    <Select>
                      <SelectTrigger className="rounded-none border-accent/10 bg-background">
                        <SelectValue placeholder="General Collection" />
                      </SelectTrigger>
                      <SelectContent className="rounded-none">
                        <SelectItem value="services">Sunday Services 2024</SelectItem>
                        <SelectItem value="worship">Worship Nights</SelectItem>
                        <SelectItem value="outreach">Outreach Events</SelectItem>
                        <SelectItem value="new"><Plus className="w-3 h-3 mr-2" /> Create New Album</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Description</Label>
                  <Textarea placeholder="Details about this media..." className="rounded-none border-accent/10 bg-background min-h-[100px]" />
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="space-y-12">
          <section className="p-8 bg-primary text-primary-foreground rounded-none shadow-2xl space-y-6">
             <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase text-accent">Upload Guidelines</h3>
             <ul className="space-y-4 text-[10px] text-white/60 uppercase tracking-widest leading-relaxed">
               <li className="flex gap-3">
                 <span className="text-accent font-bold">01.</span>
                 <span>Ensure you have the rights to all uploaded content.</span>
               </li>
               <li className="flex gap-3">
                 <span className="text-accent font-bold">02.</span>
                 <span>Use descriptive titles for better searchability.</span>
               </li>
               <li className="flex gap-3">
                 <span className="text-accent font-bold">03.</span>
                 <span>High-resolution video should be compressed where possible.</span>
               </li>
             </ul>
          </section>

          <section className="p-6 bg-muted/20 border border-accent/5 space-y-4">
             <div className="flex items-center justify-between">
               <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Public in Gallery</span>
               <div className="w-8 h-4 bg-accent/20 rounded-full relative">
                 <div className="absolute left-1 top-1 w-2 h-2 bg-accent rounded-full" />
               </div>
             </div>
             <p className="text-[9px] text-muted-foreground leading-relaxed italic">
               Private media is only accessible by ministry admins and leaders.
             </p>
          </section>
        </div>
      </div>
    </div>
  );
}

