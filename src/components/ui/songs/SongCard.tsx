import { WorshipSong } from '@/types/songs';
import { Link } from '@tanstack/react-router';

interface SongProps {
  song: WorshipSong;
  viewMode?: 'grid' | 'list';
}

export function SongCard({ song, viewMode = 'grid' }: SongProps) {
  if (viewMode === 'list') {
    return (
      <div className="group flex items-center justify-between p-4 bg-background hover:bg-muted/30 transition-colors duration-300 border-b border-accent/10">
        <div className="flex-1 min-w-0 pr-4">
          <div className="flex items-center gap-3 mb-1">
            <h4 className="text-lg font-serif text-foreground truncate">{song.title}</h4>
            <span className="text-[10px] font-bold tracking-widest text-accent uppercase px-2 py-0.5 border border-accent/20 rounded">
              {song.defaultKey}
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span>{song.artist}</span>
            <span className="h-1 w-1 rounded-full bg-accent/30" />
            <span>{song.bpm} BPM</span>
            <span className="hidden sm:inline-flex h-1 w-1 rounded-full bg-accent/30" />
            <span className="hidden sm:inline text-[10px] uppercase tracking-wider">{song.themes[0]}</span>
          </div>
        </div>
        <Link 
          to="/songs/$id"
          params={{ id: song.id }}
          className="text-[10px] font-bold tracking-[0.2em] text-accent hover:text-accent/80 uppercase transition-colors whitespace-nowrap"
        >
          View Song
        </Link>
      </div>
    );
  }

  return (
    <div className="group animate-in fade-in slide-in-from-bottom-6 duration-700">
      <Link to="/songs/$id" params={{ id: song.id }}>
        <div className="aspect-square w-full mb-6 overflow-hidden bg-muted relative border border-accent/5 group-hover:border-accent/30 transition-all duration-500">
          {song.artworkUrl ? (
            <img 
              src={song.artworkUrl} 
              alt={song.title} 
              className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105" 
              loading="lazy"
              decoding="async"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-primary/5 group-hover:bg-primary/10 transition-colors duration-700">
              <span className="font-serif italic text-muted-foreground/30 text-2xl group-hover:text-muted-foreground/50 transition-colors">
                {song.title.charAt(0)}
              </span>
            </div>
          )}
          <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm px-3 py-1 text-[8px] font-bold tracking-[0.2em] text-foreground uppercase border border-accent/20">
            Key: {song.defaultKey}
          </div>
          <div className="absolute bottom-4 right-4 bg-primary/90 backdrop-blur-sm px-2 py-1 text-[8px] font-bold tracking-[0.1em] text-background uppercase">
            {song.bpm} BPM
          </div>
        </div>
      </Link>
      
      <div className="space-y-3">
        <div className="flex justify-between items-start">
          <div className="min-w-0 pr-2">
            <Link to="/songs/$id" params={{ id: song.id }}>
              <h4 className="text-xl font-serif text-foreground leading-tight group-hover:text-accent transition-colors truncate">
                {song.title}
              </h4>
            </Link>
            <p className="text-xs text-muted-foreground tracking-wide mt-1 truncate">{song.artist}</p>
          </div>
          <span className="shrink-0 text-[9px] font-bold tracking-wider text-accent uppercase border-b border-accent/30 pb-0.5">
            {song.themes[0]}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {song.scriptureReferences.length > 0 && song.scriptureReferences[0] && (
            <p className="text-[10px] text-muted-foreground italic border-l border-accent/20 pl-3">
              {typeof song.scriptureReferences[0] === 'string' 
                ? song.scriptureReferences[0] 
                : song.scriptureReferences[0].reference}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
