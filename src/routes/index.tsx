import { createFileRoute } from "@tanstack/react-router";
import { HeroSection } from "@/components/layout/HeroSection";
import { ScriptureBlock } from "@/components/ui/ScriptureBlock";
import heroImage from "@/assets/hero.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Radiant Worship | Excellence in Service • Devotion in Worship" },
      { name: "description", content: "Creating space for authentic encounters with God through music, prayer, and community." },
      { property: "og:title", content: "Radiant Worship" },
      { property: "og:description", content: "Excellence in Service • Devotion in Worship" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="animate-in fade-in duration-1000">
      <HeroSection
        tagline="Praise • Worship • Ministry"
        title={
          <>
            Creating space for <br />
            <span className="italic text-accent">authentic encounter</span>
          </>
        }
        subtitle="A passionate community of worshippers dedicated to leading hearts toward the presence of God through music, prayer, and excellence."
        primaryCtaText="Upcoming Gatherings"
        primaryCtaTo="/worship"
        secondaryCtaText="Listen Now"
        secondaryCtaTo="/songs"
        imageSrc={heroImage}
      />

      <section className="bg-muted/30 py-24 px-6">
        <div className="mx-auto max-w-7xl">
           <ScriptureBlock 
              verse="Let everything that has breath praise the LORD."
              reference="Psalm 150:6"
           />
        </div>
      </section>

      {/* Basic Home Structure Placeholders */}
      <section className="py-24 px-6 bg-background">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center text-center">
            <span className="text-[10px] font-bold tracking-[0.3em] text-accent uppercase">Our Heart</span>
            <h2 className="mt-4 font-serif text-4xl text-foreground">Excellence in Devotion</h2>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-12 w-full text-left">
              <div className="space-y-4">
                <h3 className="font-serif text-2xl">Worship</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Leading the congregation into a deep and meaningful connection with the Father through Spirit-led worship.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="font-serif text-2xl">Service</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Serving the local church with humility, technical excellence, and a heart for God's people.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="font-serif text-2xl">Community</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Building a family of musicians and vocalists who support, pray, and grow together in faith.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

