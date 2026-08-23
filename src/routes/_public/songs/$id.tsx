import { createFileRoute } from '@tanstack/react-router'
import { MOCK_SONGS } from '@/lib/mock-songs'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Music, FileText, BookOpen, StickyNote, Info } from 'lucide-react'

export const Route = createFileRoute('/_public/songs/$id')({
  component: SongDetailPage,
})

function SongDetailPage() {
  const { id } = Route.useParams()
  const song = MOCK_SONGS.find(s => s.id === id)

  if (!song) {
    return (
      <div className="container mx-auto px-6 py-20 text-center">
        <h2 className="font-serif text-3xl">Song not found</h2>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-6 py-20 animate-in fade-in duration-700">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Left Column: Artwork & Core Info */}
        <div className="w-full lg:w-1/3 space-y-8">
          <div className="aspect-square w-full overflow-hidden bg-muted border border-accent/10 relative">
            {song.artworkUrl ? (
              <img src={song.artworkUrl} alt={song.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-primary/5">
                <span className="font-serif italic text-muted-foreground/20 text-6xl">
                  {song.title.charAt(0)}
                </span>
              </div>
            )}
            <div className="absolute top-6 left-6 bg-background/95 backdrop-blur-sm px-4 py-2 text-xs font-bold tracking-[0.2em] text-foreground uppercase border border-accent/20">
              Key: {song.defaultKey}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-muted/30 border border-accent/5 rounded-sm">
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">BPM</p>
              <p className="font-serif text-xl">{song.bpm || '--'}</p>
            </div>
            <div className="p-4 bg-muted/30 border border-accent/5 rounded-sm">
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">Time Sig</p>
              <p className="font-serif text-xl">{song.timeSignature || '--'}</p>
            </div>
            <div className="p-4 bg-muted/30 border border-accent/5 rounded-sm">
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">Type</p>
              <p className="font-sans text-sm font-medium">{song.songType}</p>
            </div>
            <div className="p-4 bg-muted/30 border border-accent/5 rounded-sm">
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">Status</p>
              <Badge variant="outline" className="text-[9px] uppercase tracking-tighter border-accent/30 text-accent">
                {song.status}
              </Badge>
            </div>
          </div>
        </div>

        {/* Right Column: Content */}
        <div className="flex-1 space-y-8">
          <div>
            <h1 className="font-serif text-5xl lg:text-6xl text-foreground mb-4">{song.title}</h1>
            <p className="text-xl text-muted-foreground font-light">{song.artist}</p>
            {song.songwriter && (
              <p className="text-xs text-muted-foreground mt-2 italic">Written by {song.songwriter}</p>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {song.themes.map(theme => (
              <Badge key={theme} variant="secondary" className="bg-accent/10 text-accent hover:bg-accent/20 border-none px-3 py-1 text-[10px] uppercase tracking-widest">
                {theme}
              </Badge>
            ))}
          </div>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="w-full justify-start bg-transparent border-b border-accent/20 rounded-none h-auto p-0 mb-8 space-x-8">
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
              <div className="prose prose-stone max-w-none">
                <div className="bg-muted/30 p-8 border-l-4 border-accent">
                  <h3 className="text-lg font-serif mb-4 flex items-center">
                    <BookOpen className="w-4 h-4 mr-2 text-accent" /> Biblical Foundation
                  </h3>
                  <div className="space-y-4">
                    {song.scriptureReferences.map(ref => (
                      <div key={ref}>
                        <p className="font-serif italic text-foreground text-xl">"{ref}"</p>
                        <p className="text-xs text-muted-foreground mt-1">— Scripture Reference</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="lyrics" className="animate-in fade-in slide-in-from-top-4 duration-500">
              <div className="bg-muted/10 p-8 rounded-sm border border-accent/5">
                <p className="text-muted-foreground italic text-center py-12">
                  Lyrics for this song are currently unavailable or require authorization to display.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="chords" className="animate-in fade-in slide-in-from-top-4 duration-500">
              <div className="bg-muted/10 p-8 rounded-sm border border-accent/5">
                <p className="text-muted-foreground italic text-center py-12">
                  Chord charts for this song are reserved for Worship Team members.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="scripture" className="animate-in fade-in slide-in-from-top-4 duration-500">
              <div className="space-y-6">
                 {song.scriptureReferences.map(ref => (
                   <div key={ref} className="p-6 bg-muted/20 border border-accent/10">
                     <h4 className="font-serif text-lg text-accent mb-2">{ref}</h4>
                     <p className="text-muted-foreground">Detailed scriptural commentary and connection to the song's themes will be added here.</p>
                   </div>
                 ))}
              </div>
            </TabsContent>

            <TabsContent value="notes" className="animate-in fade-in slide-in-from-top-4 duration-500">
              <div className="bg-muted/10 p-8 rounded-sm border border-accent/5">
                <p className="text-muted-foreground italic text-center py-12">
                  No ministry-specific notes have been added for this song yet.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
