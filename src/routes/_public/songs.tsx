import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Search, SlidersHorizontal, List, Grid3X3 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { SongCard } from '@/components/ui/songs/SongCard'

// Mock data for demo
const SONGS = [
  { id: '1', title: 'Holy Forever', artist: 'Chris Tomlin', theme: 'Grace', key: 'G', scriptureTag: 'Rev 4:8', imageUrl: '' },
  { id: '2', title: 'King of Kings', artist: 'Hillsong Worship', theme: 'Resurrection', key: 'D', scriptureTag: '1 Cor 15:57', imageUrl: '' },
  { id: '3', title: 'Great Are You Lord', artist: 'All Sons & Daughters', theme: 'Praise', key: 'A', scriptureTag: 'Psalm 145:3', imageUrl: '' },
]

export const Route = createFileRoute('/_public/songs')({
  component: SongLibraryPage,
})

function SongLibraryPage() {
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [search, setSearch] = useState('')

  return (
    <div className="container mx-auto px-6 py-20">
      <div className="mb-12">
        <h1 className="font-serif text-5xl text-foreground">Worship Song Library</h1>
        <p className="mt-4 text-muted-foreground max-w-2xl">
          A collection of songs we use to lead the Church in biblical, Christ-centered worship.
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-between">
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search songs, themes, Scripture, or artists..." 
            className="pl-10 h-12 bg-muted/50 border-accent/20"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" className="h-12 w-12 border-accent/20">
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
          <div className="flex bg-muted/50 p-1 rounded-md border border-accent/20">
            <Button variant={view === 'grid' ? 'secondary' : 'ghost'} size="icon" onClick={() => setView('grid')}>
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button variant={view === 'list' ? 'secondary' : 'ghost'} size="icon" onClick={() => setView('list')}>
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Results */}
      {view === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {SONGS.map((song) => (
            <SongCard key={song.id} song={song} />
          ))}
        </div>
      ) : (
        <div className="border border-accent/20 rounded-lg overflow-hidden divide-y divide-accent/20">
            {SONGS.map((song) => (
                <div key={song.id} className="p-4 flex items-center justify-between hover:bg-muted/30">
                    <div>
                        <h4 className="font-serif text-lg">{song.title}</h4>
                        <p className="text-xs text-muted-foreground">{song.artist}</p>
                    </div>
                    <Button variant="ghost" className="text-accent hover:text-accent/80 font-bold tracking-widest uppercase text-xs">View Song</Button>
                </div>
            ))}
        </div>
      )}
    </div>
  )
}
