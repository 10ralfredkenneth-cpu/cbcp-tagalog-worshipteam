import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getSongsPublic } from '@/lib/db-public.functions';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  Music, FileText, BookOpen, StickyNote, Info, 
  Minus, Plus, Star, Printer, Layout, User, 
  Monitor, ArrowLeft, MoreHorizontal, Check
} from 'lucide-react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { KEYS, transposeChord, getSemitoneDifference } from '@/utils/transposition';
import { WorshipSong, SongSection } from '@/types/songs';

export const Route = createFileRoute('/_public/songs/$id')({
  head: ({ params }) => {
    // In a real app we'd fetch the song title here, but we'll use a generic placeholder for now
    // or we could potentially pass data if TanStack Router supported it easily in head() without loaders.
    return {
      meta: [
        { title: `Worship Song | Radiant Worship` },
        { name: "description", content: "View chords, lyrics, and biblical foundation for this worship song." },
      ],
    };
  },
  component: SongDetailPage,
});


type ViewMode = 'Standard' | 'Musician' | 'Vocalist' | 'Presentation';

function SongDetailPage() {
  const { data: songs = [], isLoading } = useQuery({
    queryKey: ['songs-public'],
    queryFn: getSongsPublic,
  });

  const { id } = Route.useParams();
  const rawSong = (songs || []).find((s: any) => s.id === (id as string));
  const initialSong = useMemo(() => {
    if (!rawSong) return null;
    return {
      ...rawSong,
      defaultKey: rawSong.default_key || rawSong.defaultKey,
      timeSignature: rawSong.time_signature || rawSong.timeSignature,
      createdAt: rawSong.created_at || rawSong.createdAt,
      updatedAt: rawSong.updated_at || rawSong.updatedAt,
      scriptureReferences: rawSong.scripture_references || rawSong.scriptureReferences || [],
      sections: rawSong.sections || [],
      flow: rawSong.flow || []
    };
  }, [rawSong]);
  
  const [currentKey, setCurrentKey] = useState(initialSong?.defaultKey || 'C');
  const [viewMode, setViewMode] = useState<ViewMode>('Standard');
  const [showChords, setShowChords] = useState(true);
  const [isFavorite, setIsFavorite] = useState(initialSong?.isFavorite || false);

  if (!initialSong) {
    return (
      <div className="container mx-auto px-6 py-20 text-center">
        <h2 className="font-serif text-3xl">Song not found</h2>
        <Button asChild className="mt-8 rounded-none tracking-widest uppercase">
          <Link to="/songs">Back to Library</Link>
        </Button>
      </div>
    );
  }

  const semitones = getSemitoneDifference(initialSong.defaultKey || 'C', currentKey);

  const handleKeyChange = (direction: number) => {
    const isMinor = currentKey.endsWith('m');
    const noteOnly = currentKey.replace('m', '');
    const idx = KEYS.indexOf(noteOnly);
    if (idx === -1) return;
    
    let newIdx = (idx + direction) % 12;
    if (newIdx < 0) newIdx += 12;
    setCurrentKey(KEYS[newIdx] + (isMinor ? 'm' : ''));
  };

  const renderChords = (content: string) => {
    if (!showChords) return null;
    return content.split(/\s+/).map(chord => transposeChord(chord, semitones)).join(' ');
  };

  // Helper to render sections for different views
  const SectionDisplay = ({ section, mode }: { section: SongSection, mode: ViewMode }) => (
    <div className={`mb-12 last:mb-0 ${mode === 'Musician' ? 'bg-muted/10 p-6 border-l border-accent/20' : ''}`}>
      <h4 className="text-[10px] font-bold tracking-[0.2em] text-accent uppercase mb-6 flex items-center gap-4">
        <span className="w-8 h-px bg-accent/30" />
        {section.type} {section.label}
      </h4>
      <div className={`space-y-4 ${mode === 'Musician' ? 'font-mono' : 'font-serif'} leading-relaxed`}>
        {section.lines.map((line, idx) => {
          if (line.type === 'chords' && mode !== 'Vocalist' && showChords) {
            return (
              <div key={idx} className="text-accent font-bold tracking-widest text-lg sm:text-xl lg:text-2xl mb-2">
                {renderChords(line.content)}
              </div>
            );
          }
          if (line.type === 'lyrics' && mode !== 'Musician') {
            return (
              <div key={idx} className={`${mode === 'Standard' ? 'text-lg text-foreground/80' : 'text-2xl sm:text-3xl lg:text-4xl text-foreground'} mb-6 whitespace-pre-wrap leading-tight`}>
                {line.content}
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );


  if (viewMode === 'Presentation') {
    return (
      <div className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center p-12 overflow-y-auto">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setViewMode('Standard')}
          className="absolute top-8 right-8 text-accent font-bold tracking-widest uppercase"
        >
          Close <ArrowLeft className="ml-2 w-4 h-4 rotate-180" />
        </Button>
        <div className="max-w-4xl w-full text-center space-y-16 py-20">
          <h1 className="font-serif text-6xl text-foreground mb-12 opacity-50">{initialSong.title}</h1>
          {initialSong.sections?.map((section: any, idx: number) => (
            <div key={idx} className="space-y-8 animate-in fade-in duration-1000">
              {section.lines.filter((l: any) => l.type === 'lyrics').map((line: any, lIdx: number) => (
                <p key={lIdx} className="text-4xl lg:text-5xl font-serif text-foreground leading-tight">
                  {line.content}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`container mx-auto px-6 py-20 animate-in fade-in duration-700 ${viewMode !== 'Standard' ? 'max-w-4xl' : ''}`}>
      {/* Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-6 mb-12 border-b border-accent/10 pb-6">
        <Link to="/songs" className="flex items-center text-[10px] font-bold tracking-widest text-muted-foreground hover:text-foreground uppercase transition-colors">
          <ArrowLeft className="mr-2 w-3 h-3" /> Back to Library
        </Link>
        
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-1 bg-muted/50 p-1 rounded-sm border border-accent/10">
            <Button variant="ghost" size="icon" onClick={() => handleKeyChange(-1)} className="h-8 w-8 text-accent">
              <Minus className="w-3 h-3" />
            </Button>
            <div className="px-3 text-xs font-bold tracking-widest uppercase min-w-[60px] text-center">
              Key: {currentKey}
            </div>
            <Button variant="ghost" size="icon" onClick={() => handleKeyChange(1)} className="h-8 w-8 text-accent">
              <Plus className="w-3 h-3" />
            </Button>
          </div>

          <div className="flex items-center gap-2 border-l border-accent/20 pl-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setIsFavorite(!isFavorite)}
              className={`rounded-none tracking-widest uppercase text-[10px] font-bold ${isFavorite ? 'text-accent bg-accent/10' : 'text-muted-foreground'}`}
            >
              <Star className={`w-3 h-3 mr-2 ${isFavorite ? 'fill-accent' : ''}`} /> {isFavorite ? 'Favorited' : 'Favorite'}
            </Button>
            
            <div className="relative group">
              <Button variant="outline" size="sm" className="rounded-none tracking-widest uppercase text-[10px] font-bold border-accent/20">
                <Layout className="w-3 h-3 mr-2" /> View: {viewMode}
              </Button>
              <div className="absolute right-0 top-full mt-2 w-48 bg-background border border-accent/10 shadow-2xl z-50 hidden group-hover:block animate-in fade-in slide-in-from-top-2">
                {[
                  { label: 'Standard', icon: Info },
                  { label: 'Musician', icon: Music },
                  { label: 'Vocalist', icon: User },
                  { label: 'Presentation', icon: Monitor },
                ].map((mode) => (
                  <button
                    key={mode.label}
                    onClick={() => setViewMode(mode.label as ViewMode)}
                    className={`w-full text-left px-4 py-3 text-[10px] font-bold tracking-widest uppercase transition-colors hover:bg-muted/50 flex items-center gap-3 ${viewMode === mode.label ? 'text-accent' : 'text-muted-foreground'}`}
                  >
                    <mode.icon className="w-3 h-3" /> {mode.label}
                  </button>
                ))}
              </div>
            </div>

            <Button variant="ghost" size="icon" onClick={() => window.print()} className="h-8 w-8 text-muted-foreground hover:text-accent">
              <Printer className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className={`flex flex-col ${viewMode === 'Standard' ? 'lg:flex-row' : ''} gap-12 print:block`}>
        {/* Left Column: Artwork & Core Info (Hidden in Musician/Vocalist Views) */}
        {viewMode === 'Standard' && (
          <div className="w-full lg:w-1/3 space-y-8 print:hidden">
            <div className="aspect-square w-full overflow-hidden bg-muted border border-accent/10 relative group">
              {(initialSong as any).artworkUrl || (initialSong as any).cover_image || (initialSong as any).coverImage ? (
                <img src={(initialSong as any).artworkUrl || (initialSong as any).cover_image || (initialSong as any).coverImage} alt={initialSong.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-primary/5">
                  <span className="font-serif italic text-muted-foreground/20 text-6xl">
                    {initialSong.title.charAt(0)}
                  </span>
                </div>
              )}
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Badge className="rounded-none bg-background text-foreground tracking-widest">CHANGE PHOTO</Badge>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-muted/30 border border-accent/5 rounded-sm">
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">BPM</p>
                <p className="font-serif text-xl">{initialSong.bpm || '--'}</p>
              </div>
              <div className="p-4 bg-muted/30 border border-accent/5 rounded-sm">
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">Time Sig</p>
                <p className="font-serif text-xl">{initialSong.timeSignature || '--'}</p>
              </div>
              <div className="p-4 bg-muted/30 border border-accent/5 rounded-sm">
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">Original Key</p>
                <p className="font-serif text-xl">{initialSong.defaultKey}</p>
              </div>
              <div className="p-4 bg-muted/30 border border-accent/5 rounded-sm">
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">Status</p>
                <Badge variant="outline" className="text-[9px] uppercase tracking-tighter border-accent/30 text-accent">
                  {initialSong.status}
                </Badge>
              </div>
            </div>
            
            {initialSong.flow && (
              <div className="p-6 bg-primary text-background rounded-sm">
                <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase mb-4 text-accent">Song Flow</h3>
                <div className="flex flex-wrap gap-2">
                  {initialSong.flow.map((step: any, idx: number) => (
                    <span key={idx} className="text-[10px] font-medium px-2 py-1 bg-background/10 rounded-sm">
                      {step}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            <div className="text-[10px] text-muted-foreground uppercase tracking-widest space-y-2 border-t border-accent/10 pt-6">
              <p>© {(initialSong as any).copyrightYear || new Date().getFullYear()} {(initialSong as any).copyrightOwner || 'Radiant Worship'}</p>
              {(initialSong as any).ccliNumber && <p>CCLI: {(initialSong as any).ccliNumber}</p>}
              {(initialSong as any).publicDomain && <p>Public Domain</p>}
            </div>
          </div>
        )}

        {/* Right Column: Content */}
        <div className="flex-1 space-y-8">
          <div className={viewMode !== 'Standard' ? 'text-center border-b border-accent/10 pb-8' : ''}>
            <h1 className="font-serif text-5xl lg:text-6xl text-foreground mb-4">{initialSong.title}</h1>
            <p className="text-xl text-muted-foreground font-light">{initialSong.artist}</p>
            {(initialSong as any).songwriter && viewMode === 'Standard' && (
              <p className="text-xs text-muted-foreground mt-2 italic">Written by {(initialSong as any).songwriter}</p>
            )}
            
            {viewMode !== 'Standard' && (
              <div className="flex justify-center gap-8 mt-6 font-serif text-lg">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold tracking-[0.2em] text-accent uppercase">Current Key</span>
                  <span>{currentKey}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold tracking-[0.2em] text-accent uppercase">BPM</span>
                  <span>{initialSong.bpm}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold tracking-[0.2em] text-accent uppercase">Time Sig</span>
                  <span>{initialSong.timeSignature}</span>
                </div>
              </div>
            )}
          </div>

          {viewMode === 'Standard' && (
            <div className="flex flex-wrap gap-2 print:hidden">
              {(initialSong.themes || []).map((theme: any) => (
                <Badge key={theme} variant="secondary" className="bg-accent/10 text-accent hover:bg-accent/20 border-none px-3 py-1 text-[10px] uppercase tracking-widest">
                  {theme}
                </Badge>
              ))}
            </div>
          )}

          <Tabs defaultValue={viewMode === 'Musician' ? 'chords' : viewMode === 'Vocalist' ? 'lyrics' : 'overview'} className="w-full">
            <TabsList className={`w-full justify-start bg-transparent border-b border-accent/20 rounded-none h-auto p-0 mb-8 space-x-8 print:hidden ${viewMode !== 'Standard' ? 'hidden' : ''}`}>
              <TabsTrigger value="overview" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-accent rounded-none bg-transparent px-0 py-4 text-xs font-bold tracking-widest uppercase text-muted-foreground data-[state=active]:text-foreground transition-all">
                <Info className="w-3 h-3 mr-2" /> Overview
              </TabsTrigger>
              <TabsTrigger value="lyrics" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-accent rounded-none bg-transparent px-0 py-4 text-xs font-bold tracking-widest uppercase text-muted-foreground data-[state=active]:text-foreground transition-all">
                <FileText className="w-3 h-3 mr-2" /> Lyrics
              </TabsTrigger>
              <TabsTrigger value="chords" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-accent rounded-none bg-transparent px-0 py-4 text-xs font-bold tracking-widest uppercase text-muted-foreground data-[state=active]:text-foreground transition-all">
                <Music className="w-3 h-3 mr-2" /> Chords
              </TabsTrigger>
              <TabsTrigger value="scripture" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-accent rounded-none bg-transparent px-0 py-4 text-xs font-bold tracking-widest uppercase text-muted-foreground data-[state=active]:text-foreground transition-all">
                <BookOpen className="w-3 h-3 mr-2" /> Scripture
              </TabsTrigger>
              <TabsTrigger value="notes" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-accent rounded-none bg-transparent px-0 py-4 text-xs font-bold tracking-widest uppercase text-muted-foreground data-[state=active]:text-foreground transition-all">
                <StickyNote className="w-3 h-3 mr-2" /> Notes
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-8 animate-in fade-in slide-in-from-top-4 duration-500">
              <div className="bg-muted/30 p-8 border-l-4 border-accent">
                <h3 className="text-lg font-serif mb-4 flex items-center">
                  <BookOpen className="w-4 h-4 mr-2 text-accent" /> Biblical Foundation
                </h3>
                <div className="space-y-4">
                  {(initialSong.scriptureReferences || []).map((ref: any, idx: number) => (
                    <div key={idx}>
                      <p className="font-serif italic text-foreground text-xl">
                        "{typeof ref === 'string' ? ref : ref.reference}"
                      </p>
                      {typeof ref !== 'string' && ref.notes && (
                        <p className="text-sm text-muted-foreground mt-2">{ref.notes}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              {(initialSong as any).worshipLeaderNotes && (
                <div className="bg-accent/5 p-8 border-l-4 border-accent/20">
                  <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase mb-4 text-accent">Worship Leader Notes</h3>
                  <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                    {initialSong.worshipLeaderNotes.map((note: any, idx: number) => (
                      <li key={idx} className="italic">{note}</li>
                    ))}
                  </ul>
                </div>
              )}
            </TabsContent>

            <TabsContent value="lyrics" className="animate-in fade-in slide-in-from-top-4 duration-500">
              <div className="max-w-2xl mx-auto space-y-12 py-8">
                {initialSong.sections?.map((section: any, idx: number) => (
                  <SectionDisplay key={idx} section={section} mode={viewMode === 'Vocalist' ? 'Vocalist' : 'Standard'} />
                ))}
                {!initialSong.sections && (
                  <p className="text-muted-foreground italic text-center py-12">
                    Lyrics for this song are currently unavailable.
                  </p>
                )}
              </div>
            </TabsContent>

            <TabsContent value="chords" className="animate-in fade-in slide-in-from-top-4 duration-500">
              <div className="max-w-2xl mx-auto py-8">
                <div className="flex justify-between items-center mb-8 border-b border-accent/10 pb-4 print:hidden">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setShowChords(!showChords)}
                    className="text-[10px] font-bold tracking-widest uppercase text-accent"
                  >
                    {showChords ? 'Hide Chords' : 'Show Chords'}
                  </Button>
                </div>
                
                <div className="space-y-12">
                  {initialSong.sections?.map((section, idx) => (
                    <SectionDisplay key={idx} section={section} mode={viewMode === 'Musician' ? 'Musician' : 'Standard'} />
                  ))}
                  {!initialSong.sections && (
                    <p className="text-muted-foreground italic text-center py-12">
                      Chord charts for this song are reserved for Worship Team members.
                    </p>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="scripture" className="animate-in fade-in slide-in-from-top-4 duration-500">
              <div className="space-y-6">
                 {initialSong.scriptureReferences.map((ref, idx) => (
                   <div key={idx} className="p-8 bg-muted/20 border border-accent/10">
                     <h4 className="font-serif text-2xl text-accent mb-4">
                       {typeof ref === 'string' ? ref : ref.reference}
                     </h4>
                     <p className="text-foreground/80 leading-relaxed italic mb-4">
                       "Detailed scriptural text from the ESV or NKJV translation will be loaded here to assist in worship preparation."
                     </p>
                     {typeof ref !== 'string' && ref.notes && (
                       <p className="text-muted-foreground text-sm border-t border-accent/10 pt-4 mt-4">
                         {ref.notes}
                       </p>
                     )}
                   </div>
                 ))}
              </div>
            </TabsContent>

            <TabsContent value="notes" className="animate-in fade-in slide-in-from-top-4 duration-500">
              <div className="space-y-6">
                <div className="p-8 bg-accent/5 border border-accent/10">
                  <h4 className="text-[10px] font-bold tracking-[0.2em] text-accent uppercase mb-6 flex items-center gap-2">
                    <StickyNote className="w-3 h-3" /> Ministry Specific Notes
                  </h4>
                  <div className="space-y-4 text-foreground/80 leading-relaxed">
                    <p>Sample internal note: "During the second bridge, let the drums drop out for a four-bar build."</p>
                    <p>Sample internal note: "Transition to 'King of Kings' in the same key (G)."</p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
