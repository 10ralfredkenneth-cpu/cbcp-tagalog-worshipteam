import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { Music, Calendar, Users, Mail, Heart, Instagram, Youtube, Music2 } from "lucide-react";
import heroImage from "@/assets/hero.jpg";
import aboutImage from "@/assets/about.jpg";
import teamImage from "@/assets/team.jpg";
import albumImage from "@/assets/album.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Radiant Worship | Praise & Worship Team" },
      { name: "description", content: "Radiant Worship is a passionate praise and worship team creating space for authentic encounter through music and community." },
      { property: "og:title", content: "Radiant Worship | Praise & Worship Team" },
      { property: "og:description", content: "Join us in creating space for authentic worship and community." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link to="/" className="font-serif text-2xl font-semibold tracking-tight text-foreground">
            Radiant Worship
          </Link>
          <div className="hidden items-center gap-8 text-sm font-medium md:flex">
            <a href="#about" className="text-muted-foreground transition-colors hover:text-foreground">
              About
            </a>
            <a href="#team" className="text-muted-foreground transition-colors hover:text-foreground">
              Team
            </a>
            <a href="#events" className="text-muted-foreground transition-colors hover:text-foreground">
              Events
            </a>
            <a href="#music" className="text-muted-foreground transition-colors hover:text-foreground">
              Music
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Join Us
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 py-24 md:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="order-2 lg:order-1">
              <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-secondary-foreground">
                <Heart className="h-3.5 w-3.5" />
                Worship • Community • Faith
              </span>
              <h1 className="mt-6 text-5xl font-normal leading-[1.1] tracking-tight md:text-6xl lg:text-7xl">
                Creating space for <span className="italic text-primary">authentic encounter</span>
              </h1>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
                We are a passionate team of worshippers dedicated to leading hearts toward the presence of God through music, prayer, and community.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#events"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  <Calendar className="h-4 w-4" />
                  Upcoming Events
                </a>
                <a
                  href="#music"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-input bg-background px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  <Music className="h-4 w-4" />
                  Listen Now
                </a>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <img
                  src={heroImage}
                  alt="Worship team gathered on stage with warm golden light"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="bg-muted/30 px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <img
                src={aboutImage}
                alt="Worship community gathered together in prayer"
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-primary">Our Mission</span>
              <h2 className="mt-4 text-4xl font-normal tracking-tight md:text-5xl">
                More than music. A movement of <span className="italic">worship</span>.
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                Radiant Worship began with a simple desire: to create a place where people can experience God without distraction. Our team serves the local church through songs, prayers, and a culture of love.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                Whether you are a musician, vocalist, or someone who simply wants to grow in faith, there is a place for you here.
              </p>
              <div className="mt-8 grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-normal text-primary">12+</div>
                  <div className="mt-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">Members</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-normal text-primary">8</div>
                  <div className="mt-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">Years</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-normal text-primary">52</div>
                  <div className="mt-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">Sundays/yr</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">The Team</span>
            <h2 className="mt-4 text-4xl font-normal tracking-tight md:text-5xl">
              Hearts that worship, hands that serve
            </h2>
            <p className="mt-4 text-muted-foreground">
              A diverse family of musicians and worshippers using their gifts to glorify God and serve the church.
            </p>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="group rounded-2xl bg-card p-6 shadow-sm ring-1 ring-border transition-all hover:shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-normal">Worship Leaders</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Vocals and pastors who guide the room into prayerful, Spirit-led moments.
              </p>
            </div>
            <div className="group rounded-2xl bg-card p-6 shadow-sm ring-1 ring-border transition-all hover:shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Music className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-normal">Musicians</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Guitarists, keyboardists, drummers, and bassists creating the soundscape for worship.
              </p>
            </div>
            <div className="group rounded-2xl bg-card p-6 shadow-sm ring-1 ring-border transition-all hover:shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Music2 className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-normal">Production Team</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Sound, lighting, and media volunteers ensuring every gathering is distraction-free.
              </p>
            </div>
          </div>
          <div className="mt-12 overflow-hidden rounded-2xl">
            <img
              src={teamImage}
              alt="Radiant Worship team members together"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="bg-foreground px-6 py-24 text-background">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-primary">Join Us</span>
              <h2 className="mt-4 text-4xl font-normal tracking-tight md:text-5xl">Upcoming Gatherings</h2>
            </div>
            <p className="max-w-md text-background/70">
              All are welcome to worship with us. Bring your heart, your voice, and your expectation.
            </p>
          </div>
          <div className="divide-y divide-background/10">
            <div className="flex flex-col justify-between gap-4 py-8 sm:flex-row sm:items-center">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-primary">Every Sunday • 9:00 AM</span>
                <h3 className="mt-2 text-2xl font-normal">Morning Worship Service</h3>
                <p className="mt-1 text-sm text-background/60">Main Sanctuary</p>
              </div>
              <a
                href="#contact"
                className="inline-flex w-fit items-center justify-center rounded-full border border-background/20 bg-transparent px-5 py-2 text-sm font-medium text-background transition-colors hover:bg-background/10"
              >
                Plan a Visit
              </a>
            </div>
            <div className="flex flex-col justify-between gap-4 py-8 sm:flex-row sm:items-center">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-primary">Every Sunday • 11:00 AM</span>
                <h3 className="mt-2 text-2xl font-normal">Second Service</h3>
                <p className="mt-1 text-sm text-background/60">Main Sanctuary</p>
              </div>
              <a
                href="#contact"
                className="inline-flex w-fit items-center justify-center rounded-full border border-background/20 bg-transparent px-5 py-2 text-sm font-medium text-background transition-colors hover:bg-background/10"
              >
                Plan a Visit
              </a>
            </div>
            <div className="flex flex-col justify-between gap-4 py-8 sm:flex-row sm:items-center">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-primary">First Friday • 7:00 PM</span>
                <h3 className="mt-2 text-2xl font-normal">Night of Worship</h3>
                <p className="mt-1 text-sm text-background/60">Worship Center</p>
              </div>
              <a
                href="#contact"
                className="inline-flex w-fit items-center justify-center rounded-full border border-background/20 bg-transparent px-5 py-2 text-sm font-medium text-background transition-colors hover:bg-background/10"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Music Section */}
      <section id="music" className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-primary">Listen</span>
              <h2 className="mt-4 text-4xl font-normal tracking-tight md:text-5xl">
                Songs that point to <span className="italic">Him</span>
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                Our latest release is a collection of songs written during seasons of prayer, celebration, and longing. We hope these melodies help you encounter God's presence wherever you are.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  <Music2 className="h-4 w-4" />
                  Stream on Spotify
                </a>
                <a
                  href="#"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-input bg-background px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  <Youtube className="h-4 w-4" />
                  Watch on YouTube
                </a>
              </div>
            </div>
            <div className="relative aspect-square overflow-hidden rounded-2xl sm:aspect-[4/3]">
              <img
                src={albumImage}
                alt="Album artwork for Radiant Worship latest release"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/60 p-6 text-center opacity-0 transition-opacity hover:opacity-100">
                <h3 className="text-3xl font-normal">Radiant</h3>
                <p className="mt-2 text-sm font-medium uppercase tracking-widest text-muted-foreground">Live EP • 2024</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact / CTA Section */}
      <section id="contact" className="bg-muted/30 px-6 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">Get Involved</span>
          <h2 className="mt-4 text-4xl font-normal tracking-tight md:text-5xl">
            Join the worship family
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Whether you want to serve on the team, attend a gathering, or just say hello, we would love to hear from you. Fill out the form or send us an email.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="mailto:hello@radiantworship.example"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <Mail className="h-4 w-4" />
              Email Us
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-input bg-background px-8 py-3 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <Instagram className="h-4 w-4" />
              Follow on Instagram
            </a>
          </div>
          <form className="mt-12 grid gap-4 text-left sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-foreground">
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Your name"
                className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground outline-none ring-offset-background transition-colors focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-foreground">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground outline-none ring-offset-background transition-colors focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <label htmlFor="message" className="text-sm font-medium text-foreground">
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                placeholder="Tell us a little about yourself and how you'd like to get involved..."
                className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground outline-none ring-offset-background transition-colors focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
            <div className="sm:col-span-2">
              <button
                type="submit"
                className="w-full rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-6 py-12">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-8 md:flex-row">
          <span className="font-serif text-xl font-semibold tracking-tight text-foreground">
            Radiant Worship
          </span>
          <div className="flex gap-8 text-sm text-muted-foreground">
            <a href="#about" className="transition-colors hover:text-foreground">
              About
            </a>
            <a href="#team" className="transition-colors hover:text-foreground">
              Team
            </a>
            <a href="#events" className="transition-colors hover:text-foreground">
              Events
            </a>
            <a href="#music" className="transition-colors hover:text-foreground">
              Music
            </a>
          </div>
          <div className="flex items-center gap-6 text-muted-foreground">
            <a href="#" className="transition-colors hover:text-foreground" aria-label="Instagram">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="#" className="transition-colors hover:text-foreground" aria-label="YouTube">
              <Youtube className="h-5 w-5" />
            </a>
            <a href="#" className="transition-colors hover:text-foreground" aria-label="Spotify">
              <Music2 className="h-5 w-5" />
            </a>
          </div>
        </div>
        <p className="mt-8 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Radiant Worship. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
