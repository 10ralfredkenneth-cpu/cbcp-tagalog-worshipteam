import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getSongsPublic } from '@/lib/db-public.functions';
import { SongCard } from '@/components/ui/songs/SongCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Search, 
  LayoutGrid, 
  List, 
  Filter, 
  Music
} from 'lucide-react';
import { createFileRoute } from '@tanstack/react-router';

type SortOption = 'title-asc' | 'title-desc' | 'recent' | 'updated' | 'most-used';
type ViewMode = 'grid' | 'list';

export const Route = createFileRoute('/_public/songs/')({
  head: () => ({
    meta: [
      { title: "Worship Song Library | Radiant Worship" },
      { name: "description", content: "Explore our collection of worship songs, chord charts, and lyrics focused on biblical, Christ-centered worship." },
      { property: "og:title", content: "Worship Song Library" },
      { property: "og:description", content: "Prepare for worship with our curated song collection." },
    ],
  }),
  component: SongLibraryPage,
});


function SongLibraryPage() {
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortBy, setSortBy] = useState<SortOption>('title-asc');
  const [themeFilter, setThemeFilter] = useState<string>('All');
  const [keyFilter, setKeyFilter] = useState<string>('All');
  const [showFilters, setShowFilters] = useState(false);

  const { data: songs = [], isLoading } = useQuery({
    queryKey: ['songs-public'],
    queryFn: getSongsPublic,
  });

  const allThemes = useMemo(() => {
    const themes = new Set<string>();
    songs.forEach((song: any) => song.themes?.forEach((t: string) => themes.add(t)));
    return ['All', ...Array.from(themes).sort()];
  }, [songs]);

  const allKeys = useMemo(() => {
    const keys = new Set<string>();
    songs.forEach((song: any) => {
      const key = song.defaultKey;
      if (key) keys.add(key);
    });
    return ['All', ...Array.from(keys).sort()];
  }, [songs]);

  const filteredSongs = useMemo(() => {
    return songs.filter((song: any) => {
      const title = song.title || '';
      const artist = song.artist || '';
      const themes = song.themes || [];
      const scripture = Array.isArray(song.scripture_references) ? song.scripture_references : [];

      const matchesSearch = 
        title.toLowerCase().includes(search.toLowerCase()) ||
        artist.toLowerCase().includes(search.toLowerCase()) ||
        themes.some((t: string) => t.toLowerCase().includes(search.toLowerCase())) ||
        scripture.some((r: any) => (typeof r === 'string' ? r : (r.reference || '')).toLowerCase().includes(search.toLowerCase()));
      
      const matchesTheme = themeFilter === 'All' || themes.includes(themeFilter);
      const songKey = song.defaultKey;
      const matchesKey = keyFilter === 'All' || songKey === keyFilter;

      return matchesSearch && matchesTheme && matchesKey;
    }).sort((a: any, b: any) => {
      switch (sortBy) {
        case 'title-asc': return (a.title || '').localeCompare(b.title || '');
        case 'title-desc': return (b.title || '').localeCompare(a.title || '');
        case 'recent': return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'most-used': return (b.usage_count || b.usageCount || 0) - (a.usage_count || a.usageCount || 0);
        default: return 0;
      }
    });
  }, [songs, search, themeFilter, keyFilter, sortBy]);

  return (
    <div className="container mx-auto px-6 py-20 animate-in fade-in duration-700">
      <div className="max-w-4xl mx-auto mb-16 text-center">
        <h1 className="font-serif text-5xl lg:text-6xl text-foreground mb-6">Worship Song Library</h1>
        <p className="text-xl text-muted-foreground font-light">
          A collection of songs we use to lead the Church in biblical, Christ-centered worship.
        </p>
      </div>

      {/* Search & Controls */}
      <div className="sticky top-[80px] z-30 bg-background/80 backdrop-blur-md py-6 border-b border-accent/10 mb-12">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:max-w-md group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-accent transition-colors" />
            <Input 
              placeholder="Search songs, themes, Scripture, or artists..." 
              className="pl-12 h-12 rounded-none border-accent/20 bg-muted/30 focus:bg-background transition-all"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <Button 
              variant="outline" 
              className={`rounded-none h-12 px-6 tracking-widest uppercase text-[10px] font-bold border-accent/20 ${showFilters ? 'bg-accent/10 text-accent border-accent/40' : ''}`}
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="w-3 h-3 mr-2" /> Filters
            </Button>
            
            <div className="flex items-center bg-muted/50 p-1 border border-accent/10 ml-auto md:ml-0">
              <Button 
                variant={viewMode === 'grid' ? 'secondary' : 'ghost'} 
                size="icon" 
                className="h-10 w-10 rounded-none"
                onClick={() => setViewMode('grid')}
                aria-label="Grid view"
              >
                <LayoutGrid className="w-4 h-4" />
              </Button>
              <Button 
                variant={viewMode === 'list' ? 'secondary' : 'ghost'} 
                size="icon" 
                className="h-10 w-10 rounded-none"
                onClick={() => setViewMode('list')}
                aria-label="List view"
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Expanded Filters */}
        {showFilters && (
          <div className="mt-6 pt-6 border-t border-accent/10 flex flex-wrap gap-6 animate-in slide-in-from-top-4 duration-300">
            <div className="space-y-2">
              <label className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">Theme</label>
              <div className="flex flex-wrap gap-2">
                {allThemes.map(theme => (
                  <button
                    key={theme}
                    onClick={() => setThemeFilter(theme)}
                    className={`px-3 py-1 text-[10px] tracking-widest uppercase transition-all ${themeFilter === theme ? 'bg-accent text-background' : 'bg-muted/50 text-muted-foreground hover:bg-muted'}`}
                  >
                    {theme}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">Key</label>
              <div className="flex flex-wrap gap-2">
                {allKeys.map(key => (
                  <button
                    key={key}
                    onClick={() => setKeyFilter(key)}
                    className={`px-3 py-1 text-[10px] tracking-widest uppercase transition-all ${keyFilter === key ? 'bg-accent text-background' : 'bg-muted/50 text-muted-foreground hover:bg-muted'}`}
                  >
                    {key}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">Sort By</label>
              <div className="flex gap-2">
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="bg-muted/50 text-[10px] tracking-widest uppercase px-3 py-1 outline-none border border-accent/10 focus:border-accent/30"
                >
                  <option value="title-asc">Title A-Z</option>
                  <option value="title-desc">Title Z-A</option>
                  <option value="recent">Recently Added</option>
                  <option value="updated">Recently Updated</option>
                  <option value="most-used">Most Used</option>
                </select>
              </div>
            </div>
            
            <button 
              onClick={() => {
                setSearch('');
                setThemeFilter('All');
                setKeyFilter('All');
                setSortBy('title-asc');
              }}
              className="text-[10px] font-bold tracking-widest text-accent uppercase self-end mb-1 hover:underline"
            >
              Reset All
            </button>
          </div>
        )}
      </div>

      {/* Song List */}
      {filteredSongs.length > 0 ? (
        <div className={viewMode === 'grid' ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16" : "space-y-1"}>
          {(filteredSongs || []).map((song: any) => (
            <SongCard key={song.id} song={song} viewMode={viewMode} />
          ))}
        </div>
      ) : (
        <div className="py-32 text-center border border-dashed border-accent/20 bg-muted/5">
          <div className="max-w-sm mx-auto">
            <Music className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="font-serif text-2xl text-foreground mb-4">No songs found</h3>
            <p className="text-muted-foreground text-sm mb-8">
              Try adjusting your search or filters to find what you're looking for.
            </p>
            <Button 
              variant="outline" 
              className="rounded-none tracking-widest uppercase"
              onClick={() => {
                setSearch('');
                setThemeFilter('All');
                setKeyFilter('All');
              }}
            >
              Clear All Filters
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
