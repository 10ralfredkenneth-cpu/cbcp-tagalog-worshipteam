import { Link } from "@tanstack/react-router";

export function HeroSection({
  title,
  subtitle,
  tagline,
  primaryCtaText,
  primaryCtaTo,
  secondaryCtaText,
  secondaryCtaTo,
  imageSrc,
}: {
  title: React.ReactNode;
  subtitle?: string;
  tagline?: string;
  primaryCtaText?: string;
  primaryCtaTo?: string;
  secondaryCtaText?: string;
  secondaryCtaTo?: string;
  imageSrc?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-background px-6 pt-24 pb-32 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div className="relative z-10 flex flex-col items-start">
            {tagline && (
              <span className="mb-6 inline-block text-[10px] font-bold tracking-[0.3em] text-accent uppercase">
                {tagline}
              </span>
            )}
            <h1 className="font-serif text-5xl font-normal leading-[1.1] tracking-tight text-foreground md:text-6xl lg:text-7xl">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-8 max-w-lg text-lg leading-relaxed text-muted-foreground">
                {subtitle}
              </p>
            )}
            <div className="mt-12 flex flex-wrap gap-4">
              {primaryCtaText && (
                <Link
                  to={primaryCtaTo as any}
                  className="inline-flex h-12 items-center justify-center bg-primary px-8 text-[10px] font-bold tracking-[0.2em] text-primary-foreground uppercase transition-colors hover:bg-primary/90"
                >
                  {primaryCtaText}
                </Link>
              )}
              {secondaryCtaText && (
                <Link
                  to={secondaryCtaTo as any}
                  className="inline-flex h-12 items-center justify-center border border-foreground bg-transparent px-8 text-[10px] font-bold tracking-[0.2em] text-foreground uppercase transition-colors hover:bg-foreground hover:text-background"
                >
                  {secondaryCtaText}
                </Link>
              )}
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] w-full overflow-hidden bg-muted lg:aspect-[3/4]">
              {imageSrc ? (
                <img
                  src={imageSrc}
                  alt="Worship focus"
                  className="h-full w-full object-cover grayscale transition-all duration-700 hover:grayscale-0"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-muted/50">
                   <span className="font-serif italic text-muted-foreground/30">Radiant Worship</span>
                </div>
              )}
            </div>
            {/* Aesthetic decorative element */}
            <div className="absolute -bottom-6 -left-6 hidden h-32 w-32 border border-accent/20 lg:block" />
          </div>
        </div>
      </div>
    </section>
  );
}
