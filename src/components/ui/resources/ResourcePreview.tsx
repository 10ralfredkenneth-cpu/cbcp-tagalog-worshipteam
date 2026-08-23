import { Link } from "@tanstack/react-router";

export function ResourcePreview() {
  const resources = [
    { title: "Worship Devotionals", desc: "Biblical reflections that prepare the heart for worship." },
    { title: "Worship Team Training", desc: "Resources for musicians, singers, leaders, and technical teams." },
    { title: "Biblical Worship", desc: "Teaching about worship according to Scripture." },
  ];

  return (
    <section className="py-24 px-6 bg-background">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center mb-16">
          <span className="text-[10px] font-bold tracking-[0.3em] text-accent uppercase">Equipping</span>
          <h2 className="text-4xl font-serif text-foreground mt-4">Grow as a Worshipper</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {resources.map((r) => (
            <div key={r.title} className="p-8 border border-accent/10 hover:border-accent/30 transition-all group">
              <h4 className="font-serif text-2xl mb-4 group-hover:text-accent transition-colors">{r.title}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed mb-8">{r.desc}</p>
              <Link to="/resources" className="text-[10px] font-bold tracking-[0.2em] uppercase text-accent border-b border-accent/30 pb-0.5">Explore</Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
