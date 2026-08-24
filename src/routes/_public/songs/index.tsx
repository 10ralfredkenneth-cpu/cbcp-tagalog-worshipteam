import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getSongsPublic } from '@/lib/db-public.functions';
import { SongCard } from '@/components/ui/songs/SongCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, LayoutGrid, List, Filter, Music, ChevronDown } from 'lucide-react';
import { createFileRoute } from '@tanstack/react-router';

type SortOption = 'title-asc' | 'title-desc' | 'recent' | 'most-used';
type ViewMode = 'grid' | 'list';
type GroupMode = 'none' | 'language' | 'alphabetical';
const languages = ['All', 'Tagalog', 'English', 'Taglish', 'Other'] as const;
const displayLanguage = (value?: string) => value === 'Filipino/Tagalog' ? 'Tagalog' : value === 'Cebuano/Bisaya' ? 'Other' : value || 'Unclassified';

export const Route = createFileRoute('/_public/songs/')({
  head: () => ({ meta: [
    { title: 'Worship Song Library | CBCP Tagalog Worship Team' },
    { name: 'description', content: 'Browse the CBCP Tagalog Worship Team worship song library by language, theme, key, and title.' },
    { property: 'og:title', content: 'Worship Song Library | CBCP Tagalog Worship Team' },
    { property: 'og:description', content: 'Browse worship songs, lyrics, and chord charts from CBCP Tagalog Worship Team.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ]}),
  component: SongLibraryPage,
});

function SongLibraryPage() {
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortBy, setSortBy] = useState<SortOption>('title-asc');
  const [groupBy, setGroupBy] = useState<GroupMode>('none');
  const [languageFilter, setLanguageFilter] = useState('All');
  const [themeFilter, setThemeFilter] = useState('All');
  const [keyFilter, setKeyFilter] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const { data: songs = [], isLoading } = useQuery({ queryKey: ['songs-public'], queryFn: getSongsPublic });
  const allThemes = useMemo(() => ['All', ...Array.from(new Set(songs.flatMap((s: any) => s.themes || []))).sort()], [songs]);
  const allKeys = useMemo(() => ['All', ...Array.from(new Set(songs.map((s: any) => s.defaultKey).filter(Boolean))).sort()], [songs]);
  const counts = useMemo(() => Object.fromEntries(languages.map((lang) => [lang, lang === 'All' ? songs.length : songs.filter((s: any) => displayLanguage(s.language) === lang).length])), [songs]);
  const filteredSongs = useMemo(() => songs.filter((song: any) => {
    const haystack = [song.title, song.artist, song.songwriter, song.language, displayLanguage(song.language), ...(song.themes || []), song.lyrics, ...(song.scriptureReferences || []).map((r: any) => typeof r === 'string' ? r : r.reference)].filter(Boolean).join(' ').toLowerCase(); 
    return haystack.includes(search.toLowerCase()) && (languageFilter === 'All' || displayLanguage(song.language) === languageFilter) && (themeFilter === 'All' || (song.themes || []).includes(themeFilter)) && (keyFilter === 'All' || song.defaultKey === keyFilter);
  }).sort((a: any, b: any) => sortBy === 'title-desc' ? b.title.localeCompare(a.title) : sortBy === 'recent' ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime() : sortBy === 'most-used' ? (b.usageCount || 0) - (a.usageCount || 0) : a.title.localeCompare(b.title)), [songs, search, languageFilter, themeFilter, keyFilter, sortBy]);
  const groups = useMemo(() => {
    if (groupBy === 'none') return [{ label: '', songs: filteredSongs }];
    const map = new Map<string, any[]>();
    filteredSongs.forEach((song: any) => { const label = groupBy === 'language' ? displayLanguage(song.language) : (song.title?.charAt(0) || '#').toUpperCase(); map.set(label, [...(map.get(label) || []), song]); });
    return Array.from(map, ([label, items]) => ({ label, songs: items })).sort((a, b) => a.label.localeCompare(b.label));
  }, [filteredSongs, groupBy]);
  const letters = Array.from(new Set(songs.map((s: any) => (s.title?.charAt(0) || '#').toUpperCase()))).sort();
  const reset = () => { setSearch(''); setLanguageFilter('All'); setThemeFilter('All'); setKeyFilter('All'); setSortBy('title-asc'); };
  return <main className="container mx-auto px-4 sm:px-6 py-14 md:py-20">
    <header className="max-w-4xl mx-auto mb-12 text-center"><h1 className="font-serif text-5xl lg:text-6xl text-foreground mb-5">Worship Song Library</h1><p className="text-lg text-muted-foreground">Songs we use to lead the Church in biblical, Christ-centered worship.</p></header>
    <section className="sticky top-[80px] z-30 bg-background/95 backdrop-blur-md py-5 border-b border-accent/10 mb-10" aria-label="Song library controls">
      <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center"><div className="relative flex-1"><Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" /><Input aria-label="Search songs" placeholder="Search title, artist, songwriter, theme, or Scripture" className="pl-11 h-11 rounded-none" value={search} onChange={(e) => setSearch(e.target.value)} /></div><div className="flex gap-2"><Button variant="outline" className="rounded-none h-11" onClick={() => setShowFilters(!showFilters)}><Filter className="w-4 h-4 mr-2" /> Filters</Button><div className="flex border border-accent/10"><Button variant={viewMode === 'grid' ? 'secondary' : 'ghost'} size="icon" className="rounded-none" aria-label="Grid view" onClick={() => setViewMode('grid')}><LayoutGrid className="w-4 h-4" /></Button><Button variant={viewMode === 'list' ? 'secondary' : 'ghost'} size="icon" className="rounded-none" aria-label="List view" onClick={() => setViewMode('list')}><List className="w-4 h-4" /></Button></div></div></div>
      <div className="flex gap-2 overflow-x-auto py-4 -mb-2">{languages.map((lang) => counts[lang] > 0 && <Button key={lang} variant={languageFilter === lang ? 'secondary' : 'ghost'} className="rounded-none shrink-0 text-xs" onClick={() => setLanguageFilter(lang)}>{lang} <span className="ml-2 text-muted-foreground">{counts[lang]}</span></Button>)}</div>
      {groupBy === 'alphabetical' && <nav className="flex flex-wrap gap-2 border-t border-accent/10 pt-4" aria-label="Alphabetical navigation">{letters.map((letter) => <a key={letter} href={`#song-group-${letter}`} className="text-xs font-bold text-accent hover:underline">{letter}</a>)}</nav>}
      {showFilters && <div className="flex flex-wrap gap-4 border-t border-accent/10 pt-5 mt-2"><label className="text-xs text-muted-foreground">Group by <select value={groupBy} onChange={(e) => setGroupBy(e.target.value as GroupMode)} className="ml-2 bg-muted/50 p-2 text-foreground"><option value="none">None</option><option value="language">Language</option><option value="alphabetical">Alphabetical</option></select></label><label className="text-xs text-muted-foreground">Sort <select value={sortBy} onChange={(e) => setSortBy(e.target.value as SortOption)} className="ml-2 bg-muted/50 p-2 text-foreground"><option value="title-asc">Title A–Z</option><option value="title-desc">Title Z–A</option><option value="recent">Recently Added</option><option value="most-used">Most Used</option></select></label><label className="text-xs text-muted-foreground">Theme <select value={themeFilter} onChange={(e) => setThemeFilter(e.target.value)} className="ml-2 bg-muted/50 p-2 text-foreground">{allThemes.map((v) => <option key={v}>{v}</option>)}</select></label><label className="text-xs text-muted-foreground">Key <select value={keyFilter} onChange={(e) => setKeyFilter(e.target.value)} className="ml-2 bg-muted/50 p-2 text-foreground">{allKeys.map((v) => <option key={v}>{v}</option>)}</select></label><Button variant="ghost" className="rounded-none text-accent" onClick={reset}>Reset</Button></div>}
    </section>
    {isLoading ? <div className="py-20 text-center text-muted-foreground">Loading repertoire…</div> : groups.map(({ label, songs: groupSongs }) => <section key={label || 'all'} id={label ? `song-group-${label}` : undefined} className="mb-12"><div className="flex items-center justify-between mb-5">{label && <h2 className="font-serif text-2xl text-foreground">{label}</h2>}<span className="text-xs text-muted-foreground">{groupSongs.length} song{groupSongs.length === 1 ? '' : 's'}</span></div><div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'space-y-1'}>{groupSongs.map((song: any) => <SongCard key={song.id} song={song} viewMode={viewMode} />)}</div></section>)}
    {!isLoading && filteredSongs.length === 0 && <div className="py-20 text-center"><Music className="w-10 h-10 text-muted-foreground/40 mx-auto mb-4" /><h2 className="font-serif text-2xl">No songs found</h2><Button variant="outline" className="rounded-none mt-6" onClick={reset}>Clear filters</Button></div>}
  </main>;
}
