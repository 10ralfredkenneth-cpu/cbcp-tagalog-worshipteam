import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Search, SlidersHorizontal, List, Grid3X3 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { SongCard } from '@/components/ui/songs/SongCard'
import { MOCK_SONGS } from '@/lib/mock-songs'

export const Route = createFileRoute('/_public/songs/')({
  component: SongLibraryPage,
})

function SongLibraryPage() {
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [search, setSearch] = useState('')

  const filteredSongs = MOCK_SONGS.filter(s => 
    s.title.toLowerCase().includes(search.toLowerCase()) || 
    s.artist.toLowerCase().includes(search.toLowerCase()) ||
    s.themes.some(t => t.toLowerCase().includes(search.toLowerCase()))
  )

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
            <Button 
              variant={view === 'grid' ? 'secondary' : 'ghost'} 
              size="icon" 
              onClick={() => setView('grid')}
              className={view === 'grid' ? 'bg-background shadow-sm' : ''}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button 
              variant={view === 'list' ? 'secondary' : 'ghost'} 
              size="icon" 
              onClick={() => setView('list')}
              className={view === 'list' ? 'bg-background shadow-sm' : ''}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Results */}
      {filteredSongs.length > 0 ? (
        view === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredSongs.map((song) => (
              <SongCard key={song.id} song={song} />
            ))}
          </div>
        ) : (
          <div className="border border-accent/20 rounded-lg overflow-hidden divide-y divide-accent/20">
              {filteredSongs.map((song) => (
                  <SongCard key={song.id} song={song} viewMode="list" />
              ))}
          </div>
        )
      ) : (
        <div className="text-center py-32 bg-muted/10 border border-dashed border-accent/20 rounded-lg">
          <Music className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
          <h3 className="font-serif text-2xl text-foreground">No songs found</h3>
          <p className="text-muted-foreground mt-2">Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  )
}

import { Music } from 'lucide-react'
