import { Link } from "@tanstack/react-router";

export function WorshipSetlist() {
  const setlist = [
    { title: "Holy Forever", key: "D", category: "Opening Praise" },
    { title: "King of Kings", key: "D", category: "Thanksgiving" },
    { title: "Yet Not I But Through Christ In Me", key: "C", category: "Worship Response" },
    { title: "Great Are You Lord", key: "G", category: "Preparation" },
  ];

  return (
    <section className="py-24 px-6 bg-background">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-col items-center mb-16">
          <span className="text-[10px] font-bold tracking-[0.3em] text-accent uppercase">Current Focus</span>
          <h2 className="text-4xl font-serif text-foreground mt-4">This Week's Worship Set</h2>
        </div>

        <div className="divide-y divide-accent/10">
          {setlist.map((song) => (
            <div key={song.title} className="flex justify-between items-center py-8">
              <div>
                <h4 className="text-xl font-serif text-foreground">{song.title}</h4>
                <p className="text-[10px] font-bold tracking-[0.2em] text-muted-foreground uppercase mt-1">{song.category}</p>
              </div>
              <div className="text-[10px] font-bold tracking-[0.2em] text-accent uppercase">
                Key: {song.key}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
           <Link 
            to="/setlists" 
            className="inline-flex h-12 items-center justify-center border border-accent text-accent px-8 text-[10px] font-bold tracking-[0.2em] uppercase transition-all hover:bg-accent hover:text-accent-foreground"
          >
            View Full Setlist
          </Link>
        </div>
      </div>
    </section>
  );
}
