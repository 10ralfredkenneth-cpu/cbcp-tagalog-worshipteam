import { createFileRoute, Link } from '@tanstack/react-router';
import { 
  Music, 
  Search, 
  Plus, 
  Filter, 
  MoreVertical,
  Edit,
  Archive,
  Eye,
  ArrowUpDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getSongs, archiveSong, createSong, updateSong } from '@/lib/db-songs';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const Route = createFileRoute('/_authenticated/dashboard/songs')({
  component: SongManagementPage,
});

function SongManagementPage() {
  const queryClient = useQueryClient();
  const { data: songs = [], isLoading } = useQuery({
    queryKey: ['songs'],
    queryFn: getSongs,
  });

  const archiveMutation = useMutation({
    mutationFn: archiveSong,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['songs'] });
      toast.success('Song archived');
    },
    onError: (error: any) => {
      toast.error('Failed to archive song: ' + error.message);
    }
  });

  const handleArchive = (id: string) => {
    archiveMutation.mutate(id);
  };

  return (
    <div className="container mx-auto px-6 py-12 space-y-12 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-4">
          <Badge variant="outline" className="rounded-none uppercase text-[10px] tracking-widest border-accent/20 text-accent">
            Planning & Content
          </Badge>
          <h1 className="font-serif text-5xl text-foreground">Song Library Management</h1>
          <p className="text-muted-foreground text-sm max-w-2xl">
            Maintain the ministry's musical repertoire. Update metadata, keys, and status for all songs.
          </p>
        </div>
        <Button asChild className="rounded-none bg-accent text-primary hover:bg-accent/90 px-8 py-6 font-bold text-[10px] uppercase tracking-widest shadow-xl">
          <Link to="/dashboard/songs/new">
            <Plus className="w-4 h-4 mr-2" /> Add New Song
          </Link>
        </Button>
      </header>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 bg-muted/20 p-6 border border-accent/5">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search by title, artist, or scripture..." 
            className="pl-10 rounded-none border-accent/10 focus-visible:ring-accent bg-background text-[11px] uppercase tracking-wider"
          />
        </div>
        <div className="flex gap-4">
          <Button variant="outline" className="rounded-none border-accent/10 px-6 font-bold text-[10px] uppercase tracking-widest">
            <Filter className="w-3 h-3 mr-2" /> Filters
          </Button>
          <Button variant="outline" className="rounded-none border-accent/10 px-6 font-bold text-[10px] uppercase tracking-widest">
            <ArrowUpDown className="w-3 h-3 mr-2" /> Sort
          </Button>
        </div>
      </div>

      {/* Songs Table */}
      <div className="border border-accent/5 bg-background overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-accent/5">
              <TableHead className="text-[10px] font-bold uppercase tracking-widest text-accent/50 py-6 px-6">Title & Artist</TableHead>
              <TableHead className="text-[10px] font-bold uppercase tracking-widest text-accent/50 py-6 px-6 text-center">Key / BPM</TableHead>
              <TableHead className="text-[10px] font-bold uppercase tracking-widest text-accent/50 py-6 px-6">Themes</TableHead>
              <TableHead className="text-[10px] font-bold uppercase tracking-widest text-accent/50 py-6 px-6">Usage</TableHead>
              <TableHead className="text-[10px] font-bold uppercase tracking-widest text-accent/50 py-6 px-6">Status</TableHead>
              <TableHead className="text-[10px] font-bold uppercase tracking-widest text-accent/50 py-6 px-6 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="py-12 text-center text-muted-foreground uppercase text-[10px] tracking-widest italic">
                  Loading repertoire...
                </TableCell>
              </TableRow>
            ) : (songs || []).length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="py-12 text-center text-muted-foreground uppercase text-[10px] tracking-widest italic">
                  No songs found in the library.
                </TableCell>
              </TableRow>
            ) : (songs || []).map((song: any) => (
              <TableRow key={song.id} className="group border-accent/5 hover:bg-muted/10 transition-colors">
                <TableCell className="py-6 px-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-accent/5 flex items-center justify-center border border-accent/10">
                      <Music className="w-4 h-4 text-accent/40" />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg leading-tight">{song.title}</h3>
                      <p className="text-[9px] uppercase tracking-widest text-muted-foreground">{song.artist}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-6 px-6 text-center">
                  <div className="inline-flex flex-col items-center">
                    <span className="text-[10px] font-bold text-accent">{song.defaultKey}</span>
                    <span className="text-[8px] text-muted-foreground uppercase tracking-tighter">{song.bpm} BPM</span>
                  </div>
                </TableCell>
                <TableCell className="py-6 px-6 max-w-[200px]">
                  <div className="flex flex-wrap gap-1">
                    {(song.themes || []).slice(0, 2).map((theme: any) => (
                      <Badge key={theme} variant="outline" className="rounded-none text-[7px] uppercase tracking-tighter border-accent/10 text-muted-foreground">
                        {theme}
                      </Badge>
                    ))}
                    {song.themes.length > 2 && <span className="text-[8px] text-accent">+{song.themes.length - 2}</span>}
                  </div>
                </TableCell>
                <TableCell className="py-6 px-6">
                  <div className="space-y-1">
                    <p className="text-[9px] font-bold uppercase tracking-widest">{song.usageCount || 0} times</p>
                    <p className="text-[8px] text-muted-foreground uppercase tracking-widest">Last: {song.lastUsed ? new Date(song.lastUsed).toLocaleDateString() : 'Never'}</p>
                  </div>
                </TableCell>
                <TableCell className="py-6 px-6">
                  <Badge className={cn(
                    "rounded-none border-none text-[8px] font-bold uppercase tracking-widest",
                    song.status === 'Active' ? "bg-green-500/10 text-green-500" : 
                    song.status === 'Learning' ? "bg-amber-500/10 text-amber-500" :
                    "bg-red-500/10 text-red-500"
                  )}>
                    {song.status}
                  </Badge>
                </TableCell>
                <TableCell className="py-6 px-6 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-accent/40 hover:text-accent rounded-none">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="rounded-none border-accent/10 bg-primary text-primary-foreground">
                      <DropdownMenuLabel className="text-[9px] uppercase tracking-widest text-accent/50 font-bold">Options</DropdownMenuLabel>
                      <DropdownMenuItem asChild className="text-[10px] uppercase tracking-widest font-bold focus:bg-accent focus:text-primary cursor-pointer">
                        <Link to="/songs/$id" params={{ id: song.id }}>
                          <Eye className="w-3 h-3 mr-2" /> View Public Page
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild className="text-[10px] uppercase tracking-widest font-bold focus:bg-accent focus:text-primary cursor-pointer">
                        <Link to="/dashboard/songs/new">
                          <Edit className="w-3 h-3 mr-2" /> Edit Song
                        </Link>
                      </DropdownMenuItem>

                      <DropdownMenuSeparator className="bg-accent/10" />
                      <DropdownMenuItem 
                        onClick={() => handleArchive(song.id)}
                        className="text-[10px] uppercase tracking-widest font-bold text-red-400 focus:bg-red-400/10 focus:text-red-400 cursor-pointer"
                      >
                        <Archive className="w-3 h-3 mr-2" /> Archive Song
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

// Helper function for cn if not already available in this scope or imported
import { cn } from "@/lib/utils";
