import { createFileRoute } from '@tanstack/react-router';
import { UploadInterface } from '@/components/media/UploadInterface';
import { Badge } from '@/components/ui/badge';

export const Route = createFileRoute('/_authenticated/media/upload')({
  component: MediaUploadPage,
});

function MediaUploadPage() {
  return (
    <div className="container mx-auto px-6 py-20">
      <div className="max-w-4xl mx-auto space-y-12">
        <header className="space-y-4">
          <Badge variant="outline" className="rounded-none uppercase text-[10px] tracking-widest border-accent/20 text-accent">
            Media Management
          </Badge>
          <h1 className="font-serif text-5xl text-foreground">
            Upload Media
          </h1>
          <p className="text-muted-foreground uppercase tracking-widest text-[10px] font-bold">
            Add new photos, videos, or ministry documents to the library.
          </p>
        </header>

        <div className="bg-background border border-accent/10 p-8 md:p-12">
          <UploadInterface />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
          <div className="p-8 bg-primary text-primary-foreground space-y-4">
            <h3 className="font-serif text-2xl text-accent">Upload Guidelines</h3>
            <ul className="space-y-3 text-xs text-white/60 leading-relaxed list-disc pl-4">
              <li>Use high-resolution images (min 1920px width).</li>
              <li>Ensure videos are compressed for web (MP4/H.264).</li>
              <li>Include descriptive titles and event dates.</li>
              <li>Set appropriate visibility levels (Public vs Team).</li>
            </ul>
          </div>
          
          <div className="p-8 border border-accent/10 space-y-4">
            <h3 className="font-serif text-2xl">Visibility Levels</h3>
            <div className="space-y-4">
              <div>
                <span className="text-[9px] font-bold text-accent uppercase tracking-widest block mb-1">Public</span>
                <p className="text-[10px] text-muted-foreground leading-relaxed">Visible to all website visitors.</p>
              </div>
              <div>
                <span className="text-[9px] font-bold text-accent uppercase tracking-widest block mb-1">Worship Team</span>
                <p className="text-[10px] text-muted-foreground leading-relaxed">Visible only to logged-in team members.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
