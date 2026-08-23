import { createFileRoute, Link } from "@tanstack/react-router";
import { HeroSection } from "@/components/layout/HeroSection";
import { ScriptureBlock } from "@/components/ui/ScriptureBlock";
import { MinistryIntro } from "@/components/home/MinistryIntro";
import { CoreValues } from "@/components/home/CoreValues";
import { EventCard } from "@/components/ui/events/EventCard";
import { SongCard } from "@/components/ui/songs/SongCard";
import { WorshipSetlist } from "@/components/ui/setlists/WorshipSetlist";
import { MOCK_SONGS } from "@/lib/mock-songs";

import { TeamPreview } from "@/components/ui/team/TeamPreview";
import { ResourcePreview } from "@/components/ui/resources/ResourcePreview";
import { GalleryPreview } from "@/components/home/gallery/GalleryPreview";
import { JoinCTA } from "@/components/home/cta/JoinCTA";
import { PrepareHeart } from "@/components/home/cta/PrepareHeart";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Radiant Worship | Worship Him in Spirit and in Truth" },
      { name: "description", content: "A place for worshippers, musicians, singers, and servants who desire to glorify Christ and lead His Church in faithful, biblical worship." },
      { property: "og:title", content: "Radiant Worship" },
      { property: "og:description", content: "Worship Him in Spirit and in Truth" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const sampleEvent = {
    title: "Sunday Worship Service",
    date: "Sunday",
    time: "9:00 AM",
    location: "Main Sanctuary",
    description: "Join us as we gather as one body to worship Christ, hear His Word, pray, and encourage one another.",
    theme: "The Holiness of God"
  };


  return (
    <div className="overflow-x-hidden selection:bg-accent selection:text-primary">
      <HeroSection
        variant="full"
        tagline="John 4:23–24"
        title="Worship Him in Spirit and in Truth"
        subtitle="A place for worshippers, musicians, singers, and servants who desire to glorify Christ and lead His Church in faithful, biblical worship."
        primaryCtaText="Explore Worship"
        primaryCtaTo="/worship"
        secondaryCtaText="Meet the Team"
        secondaryCtaTo="/team"
        imageSrc="https://images.unsplash.com/photo-1459749411177-042180ce673c?q=80&w=2070&auto=format&fit=crop"
      />

      <MinistryIntro />

      <CoreValues />

      {/* Primary Scripture Feature */}
      <section className="bg-primary py-40 px-6 overflow-hidden relative group">
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center grayscale scale-110 group-hover:scale-100 transition-transform duration-10000" />
        <div className="mx-auto max-w-7xl relative z-10">
           <ScriptureBlock 
              verse="Let everything that has breath praise the LORD. Praise the LORD!"
              reference="Psalm 150:6"
              className="text-primary-foreground"
           />
        </div>
      </section>


      {/* Upcoming Worship Gathering */}
      <section className="py-24 px-6 bg-background">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16 space-y-4">
            <span className="text-[10px] font-bold tracking-[0.3em] text-accent uppercase">Join the Assembly</span>
            <h2 className="text-4xl font-serif text-foreground">Gather With Us</h2>
          </div>
          <EventCard event={sampleEvent} />
        </div>
      </section>

      {/* Featured Songs Preview */}
      <section className="py-24 px-6 bg-muted/20">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="space-y-4">
              <span className="text-[10px] font-bold tracking-[0.3em] text-accent uppercase">Our Song Library</span>
              <h2 className="text-4xl font-serif text-foreground">Songs We Worship With</h2>
            </div>
            <Link 
              to="/songs" 
              className="text-[10px] font-bold tracking-[0.2em] text-accent hover:text-accent/80 uppercase border-b border-accent/30 pb-1 transition-all"
            >
              View Song Library
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {MOCK_SONGS.slice(0, 3).map((song) => (
              <SongCard key={song.id} song={song} />
            ))}
          </div>

        </div>
      </section>

      <WorshipSetlist />

      <TeamPreview />

      <ResourcePreview />

      <GalleryPreview />

      <JoinCTA />

      <PrepareHeart />
    </div>
  );
}



