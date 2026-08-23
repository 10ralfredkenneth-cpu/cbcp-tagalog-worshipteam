import { Link } from "@tanstack/react-router";
import { MOCK_SETLISTS } from "@/lib/mock-setlists";
import { MOCK_SONGS } from "@/lib/mock-songs";

export function WorshipSetlist() {
  // Get the most recent "Ready" setlist
  const upcomingSetlist = MOCK_SETLISTS.find(s => s.status === 'Ready') || MOCK_SETLISTS[0];

  if (!upcomingSetlist) return null;

  const getSongTitle = (songId: string) => MOCK_SONGS.find(s => s.id === songId)?.title || "Unknown Song";

  return (
    <section className="py-24 px-6 bg-background">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-col items-center mb-16">
          <span className="text-[10px] font-bold tracking-[0.3em] text-accent uppercase">Current Focus</span>
          <h2 className="text-4xl font-serif text-foreground mt-4">This Week's Worship Set</h2>
          <p className="text-muted-foreground text-sm mt-2 uppercase tracking-widest">{upcomingSetlist.title}</p>
        </div>

        <div className="divide-y divide-accent/10">
          {upcomingSetlist.songs?.map((item) => (
            <div key={item.id} className="flex justify-between items-center py-8">
              <div>
                <h4 className="text-xl font-serif text-foreground">{getSongTitle(item.songId)}</h4>
                <p className="text-[10px] font-bold tracking-[0.2em] text-muted-foreground uppercase mt-1">{item.category}</p>
              </div>
              <div className="text-[10px] font-bold tracking-[0.2em] text-accent uppercase">
                Key: {item.selectedKey}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
           <Link 
            to="/setlists/$id" 
            params={{ id: upcomingSetlist.id }}
            className="inline-flex h-12 items-center justify-center border border-accent text-accent px-8 text-[10px] font-bold tracking-[0.2em] uppercase transition-all hover:bg-accent hover:text-accent-foreground"
          >
            View Full Setlist
          </Link>
        </div>
      </div>
    </section>
  );
}
