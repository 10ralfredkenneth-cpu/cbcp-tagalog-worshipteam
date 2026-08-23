import { Link } from "@tanstack/react-router";

export function JoinCTA() {
  return (
    <section className="py-32 px-6 bg-background">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-8">Use Your Gifts to Serve</h2>
        <p className="text-muted-foreground text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
          Whether you sing, play an instrument, serve in sound, multimedia, or simply have a heart for worship, there may be a place for you to serve.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <Link to="/contact" className="h-14 flex items-center justify-center bg-primary text-primary-foreground px-10 text-[10px] font-bold tracking-[0.2em] uppercase transition-all hover:bg-primary/90">Join the Worship Team</Link>
          <Link to="/about" className="h-14 flex items-center justify-center border border-foreground px-10 text-[10px] font-bold tracking-[0.2em] uppercase transition-all hover:bg-foreground hover:text-background">Learn More</Link>
        </div>
      </div>
    </section>
  );
}
