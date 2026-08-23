interface SongProps {
  title: string;
  artist: string;
  theme: string;
  key: string;
  scriptureTag: string;
  imageUrl?: string;
}

export function SongCard({ song }: { song: SongProps }) {
  return (
    <div className="group animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="aspect-square w-full mb-6 overflow-hidden bg-muted relative">
        {song.imageUrl ? (
          <img 
            src={song.imageUrl} 
            alt={song.title} 
            className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105" 
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center font-serif italic text-muted-foreground/30 text-xl">
            {song.title}
          </div>
        )}
        <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm px-3 py-1 text-[8px] font-bold tracking-[0.2em] text-foreground uppercase border border-accent/20">
          Key: {song.key}
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between items-start">
          <div>
            <h4 className="text-xl font-serif text-foreground leading-tight">{song.title}</h4>
            <p className="text-xs text-muted-foreground tracking-wide mt-1">{song.artist}</p>
          </div>
          <span className="text-[9px] font-bold tracking-wider text-accent uppercase border-b border-accent/30 pb-0.5">
            {song.theme}
          </span>
        </div>
        <p className="text-[10px] text-muted-foreground italic border-l border-accent/20 pl-3">
          Ref: {song.scriptureTag}
        </p>
      </div>
    </div>
  );
}
