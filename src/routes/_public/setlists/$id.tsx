import { useState } from 'react';
import { MOCK_SETLISTS } from '@/lib/mock-setlists';
import { MOCK_SONGS } from '@/lib/mock-songs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  User, 
  Clock, 
  BookOpen, 
  StickyNote, 
  ArrowLeft,
  GripVertical,
  Trash2,
  ChevronUp,
  ChevronDown,
  Music,
  Plus,
  Info
} from 'lucide-react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { SetlistStatus, SetlistSong } from '@/types/setlists';

export const Route = createFileRoute('/_public/setlists/$id')({
  component: SetlistDetailPage,
});

function SetlistDetailPage() {
  const { id } = Route.useParams();
  const initialSetlist = MOCK_SETLISTS.find(s => s.id === id);
  
  const [setlist, setSetlist] = useState(initialSetlist);
  const [isEditing, setIsEditing] = useState(false);

  if (!setlist) {
    return (
      <div className="container mx-auto px-6 py-20 text-center">
        <h2 className="font-serif text-3xl">Setlist not found</h2>
        <Button asChild className="mt-8 rounded-none tracking-widest uppercase">
          <Link to="/setlists">Back to Setlists</Link>
        </Button>
      </div>
    );
  }

  const getSongById = (songId: string) => MOCK_SONGS.find(s => s.id === songId);

  const totalDuration = setlist.songs.reduce((acc, song) => acc + (song.duration || 0), 0);

  const getStatusColor = (status: SetlistStatus) => {
    switch (status) {
      case 'Ready': return 'bg-green-500/10 text-green-600 border-green-500/20';
      case 'Draft': return 'bg-slate-500/10 text-slate-600 border-slate-500/20';
      case 'Preparing': return 'bg-amber-500/10 text-amber-600 border-amber-500/20';
      case 'Completed': return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
      case 'Archived': return 'bg-muted text-muted-foreground border-transparent';
      default: return '';
    }
  };

  const moveSong = (index: number, direction: 'up' | 'down') => {
    const newSongs = [...setlist.songs];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (targetIndex < 0 || targetIndex >= newSongs.length) return;
    
    const [movedSong] = newSongs.splice(index, 1);
    newSongs.splice(targetIndex, 0, movedSong);
    
    // Update orders
    const updatedSongs = newSongs.map((s, idx) => ({ ...s, order: idx + 1 }));
    setSetlist({ ...setlist, songs: updatedSongs });
  };

  const removeSong = (id: string) => {
    const newSongs = setlist.songs.filter(s => s.id !== id).map((s, idx) => ({ ...s, order: idx + 1 }));
    setSetlist({ ...setlist, songs: newSongs });
  };

  return (
    <div className="container mx-auto px-6 py-20 animate-in fade-in duration-700">
      <div className="mb-12">
        <Link to="/setlists" className="flex items-center text-[10px] font-bold tracking-widest text-muted-foreground hover:text-foreground uppercase transition-colors mb-8">
          <ArrowLeft className="mr-2 w-3 h-3" /> Back to Setlists
        </Link>
        
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Badge variant="outline" className={`rounded-none uppercase text-[8px] tracking-widest font-bold ${getStatusColor(setlist.status)}`}>
                {setlist.status}
              </Badge>
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest">{setlist.serviceType}</span>
            </div>
            <h1 className="font-serif text-5xl lg:text-6xl text-foreground">{setlist.title}</h1>
            <div className="flex flex-wrap gap-x-8 gap-y-4 pt-2">
              <div className="flex items-center text-sm text-muted-foreground uppercase tracking-wider">
                <Calendar className="w-4 h-4 mr-2 text-accent" />
                {new Date(setlist.serviceDate).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
              </div>
              <div className="flex items-center text-sm text-muted-foreground uppercase tracking-wider">
                <Clock className="w-4 h-4 mr-2 text-accent" />
                {setlist.serviceTime}
              </div>
              <div className="flex items-center text-sm text-muted-foreground uppercase tracking-wider">
                <User className="w-4 h-4 mr-2 text-accent" />
                Leader: {setlist.worshipLeader}
              </div>
            </div>
          </div>
          
          <div className="flex flex-col items-end gap-4">
            <div className="text-right">
              <p className="text-[10px] font-bold tracking-[0.2em] text-accent uppercase mb-1">Estimated Worship Time</p>
              <p className="text-3xl font-serif text-foreground">{totalDuration} Minutes</p>
            </div>
            <Button variant="outline" className="rounded-none tracking-widest uppercase text-[10px] font-bold border-accent/20">
              Edit Service Details
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Content: Song List */}
        <div className="lg:col-span-2 space-y-8">
          <div className="flex items-center justify-between border-b border-accent/10 pb-4">
            <h2 className="text-[10px] font-bold tracking-[0.3em] text-accent uppercase">Worship Set Order</h2>
            <Button variant="ghost" className="text-[10px] font-bold tracking-widest uppercase text-accent hover:bg-accent/5">
              <Plus className="w-3 h-3 mr-2" /> Add Songs
            </Button>
          </div>

          <div className="space-y-4">
            {setlist.songs.map((setlistSong, idx) => {
              const song = getSongById(setlistSong.songId);
              if (!song) return null;

              return (
                <div 
                  key={setlistSong.id} 
                  className="group flex gap-4 p-6 bg-muted/20 border border-accent/5 hover:border-accent/20 transition-all duration-300 relative"
                >
                  <div className="flex flex-col items-center gap-2 text-muted-foreground/30">
                    <button onClick={() => moveSong(idx, 'up')} disabled={idx === 0} className="hover:text-accent transition-colors disabled:opacity-0">
                      <ChevronUp className="w-4 h-4" />
                    </button>
                    <GripVertical className="w-4 h-4" />
                    <button onClick={() => moveSong(idx, 'down')} disabled={idx === setlist.songs.length - 1} className="hover:text-accent transition-colors disabled:opacity-0">
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <span className="text-[10px] font-bold text-accent/50 w-6">0{setlistSong.order}</span>
                      <h4 className="text-xl font-serif text-foreground truncate">{song.title}</h4>
                      <Badge variant="secondary" className="bg-accent/10 text-accent text-[9px] uppercase tracking-tighter rounded-none">
                        {setlistSong.category}
                      </Badge>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-6 text-[10px] text-muted-foreground uppercase tracking-widest pl-9">
                      <div className="flex items-center gap-2">
                        <Music className="w-3 h-3 text-accent/30" />
                        Key: {setlistSong.selectedKey}
                      </div>
                      <div>BPM: {song.bpm}</div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-3 h-3 text-accent/30" />
                        {setlistSong.duration}m
                      </div>
                    </div>

                    {(setlistSong.transitionNote || setlistSong.leaderNote) && (
                      <div className="mt-4 ml-9 space-y-2 p-3 bg-accent/5 border-l-2 border-accent/20 italic text-[11px] text-muted-foreground">
                        {setlistSong.transitionNote && <p>Transition: {setlistSong.transitionNote}</p>}
                        {setlistSong.leaderNote && <p>Note: {setlistSong.leaderNote}</p>}
                      </div>
                    )}
                  </div>

                  <div className="flex items-start gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="icon" asChild className="h-8 w-8 text-muted-foreground hover:text-accent">
                      <Link to="/songs/$id" params={{ id: song.id }}>
                        <Info className="w-4 h-4" />
                      </Link>
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => removeSong(setlistSong.id)}
                      className="h-8 w-8 text-muted-foreground hover:text-red-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sidebar: Service Info & Notes */}
        <div className="space-y-8">
          <div className="p-8 bg-primary text-primary-foreground rounded-none">
            <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase mb-6 text-accent">Service Overview</h3>
            <div className="space-y-6">
              {setlist.theme && (
                <div>
                  <label className="text-[9px] font-bold tracking-[0.2em] text-accent uppercase block mb-2">Theme</label>
                  <p className="font-serif text-xl">{setlist.theme}</p>
                </div>
              )}
              {setlist.scriptureReference && (
                <div>
                  <label className="text-[9px] font-bold tracking-[0.2em] text-accent uppercase block mb-2">Scripture</label>
                  <div className="flex items-start gap-2 italic">
                    <BookOpen className="w-4 h-4 mt-1 text-accent/50 shrink-0" />
                    <span>{setlist.scriptureReference}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="p-8 bg-muted/30 border border-accent/10">
            <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase mb-6 text-accent">Ministry Notes</h3>
            <div className="space-y-6 text-sm text-foreground/80 leading-relaxed">
              <div className="space-y-2">
                <label className="text-[9px] font-bold tracking-[0.2em] text-muted-foreground uppercase block">General Notes</label>
                <p>{setlist.notes || "No general notes provided for this service."}</p>
              </div>
              
              <div className="pt-6 border-t border-accent/10 space-y-2">
                <h4 className="flex items-center gap-2 text-[9px] font-bold tracking-[0.2em] text-muted-foreground uppercase">
                  <StickyNote className="w-3 h-3" /> Rehearsal Focus
                </h4>
                <p className="italic">Remember to emphasize the bridge in the final song. Watch for the transition between the second and third items.</p>
              </div>
            </div>
          </div>

          <Button variant="outline" className="w-full rounded-none tracking-widest uppercase text-[10px] font-bold py-6 border-accent/20">
            Print Service Order
          </Button>
        </div>
      </div>
    </div>
  );
}
