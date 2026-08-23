import { createFileRoute } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Save, BookOpen, Tag, Link2, FileText } from 'lucide-react';

export const Route = createFileRoute('/_authenticated/dashboard/resources/new')({
  component: CreateResourcePage,
});

function CreateResourcePage() {
  return (
    <div className="container mx-auto px-6 py-12 space-y-12 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-4">
          <Badge variant="outline" className="rounded-none uppercase text-[10px] tracking-widest border-accent/20 text-accent">
            Education & Training
          </Badge>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="h-10 w-10 text-accent rounded-none" onClick={() => window.history.back()}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="font-serif text-5xl text-foreground">Create Resource</h1>
          </div>
          <p className="text-muted-foreground text-sm max-w-2xl ml-14">
            Share training materials, devotionals, and ministry standards with your team and the public.
          </p>
        </div>
        <Button className="rounded-none bg-accent text-primary hover:bg-accent/90 px-8 py-6 font-bold text-[10px] uppercase tracking-widest shadow-xl">
          <Save className="w-4 h-4 mr-2" /> Publish Resource
        </Button>
      </header>

      <div className="max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-12 ml-14">
        <div className="md:col-span-2 space-y-12">
          <section className="space-y-6">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent border-b border-accent/10 pb-2">Basic Info</h3>
            
            <div className="space-y-2">
              <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Resource Title</Label>
              <div className="relative">
                <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="e.g. Worship Leading Essentials" className="pl-10 rounded-none border-accent/10 bg-background" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Category</Label>
                <Select>
                  <SelectTrigger className="rounded-none border-accent/10 bg-background">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent className="rounded-none">
                    <SelectItem value="training">Training</SelectItem>
                    <SelectItem value="devotional">Devotional</SelectItem>
                    <SelectItem value="standards">Ministry Standards</SelectItem>
                    <SelectItem value="scripture">Scripture Focus</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Tags</Label>
                <div className="relative">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Separate with commas" className="pl-10 rounded-none border-accent/10 bg-background" />
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent border-b border-accent/10 pb-2">Description & Content</h3>
            <div className="space-y-2">
              <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Resource Summary</Label>
              <Textarea placeholder="Brief overview of the resource..." className="rounded-none border-accent/10 bg-background min-h-[100px]" />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Detailed Content</Label>
              <Textarea placeholder="Full resource content or instructions..." className="rounded-none border-accent/10 bg-background min-h-[300px]" />
            </div>
          </section>
        </div>

        <div className="space-y-12">
          <section className="space-y-6">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent border-b border-accent/10 pb-2">Attachment & Metadata</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">External Link (Optional)</Label>
                <div className="relative">
                  <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="https://..." className="pl-10 rounded-none border-accent/10 bg-background" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Document Upload</Label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-accent/10 border-dashed rounded-none hover:border-accent/30 transition-colors cursor-pointer">
                  <div className="space-y-1 text-center">
                    <FileText className="mx-auto h-12 w-12 text-accent/20" />
                    <div className="flex text-[10px] text-muted-foreground">
                      <span className="relative cursor-pointer bg-transparent font-bold text-accent hover:text-accent/80">Upload PDF/Doc</span>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="p-6 bg-muted/20 border border-accent/5 space-y-4">
             <div className="flex items-center justify-between">
               <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Publicly Accessible</span>
               <div className="w-8 h-4 bg-accent/20 rounded-full relative">
                 <div className="absolute left-1 top-1 w-2 h-2 bg-accent rounded-full" />
               </div>
             </div>
             <div className="flex items-center justify-between">
               <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Featured Resource</span>
               <div className="w-8 h-4 bg-muted/30 rounded-full relative">
                 <div className="absolute left-1 top-1 w-2 h-2 bg-muted rounded-full" />
               </div>
             </div>
          </section>
        </div>
      </div>
    </div>
  );
}

