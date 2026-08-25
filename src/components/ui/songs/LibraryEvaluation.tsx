interface LibraryEvaluationProps {
  songs: any[];
}

const pct = (n: number, total: number) => (total === 0 ? 0 : Math.round((n / total) * 100));

export function LibraryEvaluation({ songs }: LibraryEvaluationProps) {
  const total = songs.length;
  const withChords = songs.filter((s) => (s.chords || '').trim().length > 0).length;
  const withLyrics = songs.filter((s) => (s.lyrics || '').trim().length > 0).length;
  const withThemes = songs.filter((s) => (s.themes || []).length > 0).length;
  const withArtwork = songs.filter((s) => Boolean(s.artworkUrl)).length;
  const withKey = songs.filter((s) => Boolean(s.defaultKey)).length;

  const metrics = [
    { label: 'Lyrics', value: withLyrics },
    { label: 'Chord charts', value: withChords },
    { label: 'Themes tagged', value: withThemes },
    { label: 'Cover art', value: withArtwork },
    { label: 'Key set', value: withKey },
  ];

  const score = total === 0 ? 0 : Math.round(metrics.reduce((sum, m) => sum + pct(m.value, total), 0) / metrics.length);

  const gaps = metrics.filter((m) => m.value < total);

  return (
    <section aria-labelledby="library-evaluation-heading" className="mb-10 border border-accent/15 bg-muted/20 p-5 sm:p-7">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6">
        <div>
          <h2 id="library-evaluation-heading" className="font-serif text-2xl sm:text-3xl text-foreground">
            Evaluate my worship song library
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            A quick health check of {total} published song{total === 1 ? '' : 's'} in the repertoire.
          </p>
        </div>
        <div className="text-left sm:text-right">
          <div className="font-serif text-4xl text-accent leading-none">{score}%</div>
          <div className="text-[11px] uppercase tracking-widest text-muted-foreground mt-1">Completeness</div>
        </div>
      </div>

      <dl className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {metrics.map((m) => (
          <div key={m.label} className="border-t border-accent/20 pt-3">
            <dt className="text-[11px] uppercase tracking-widest text-muted-foreground">{m.label}</dt>
            <dd className="mt-1 text-foreground">
              <span className="font-serif text-2xl">{m.value}</span>
              <span className="text-muted-foreground text-sm">/{total}</span>
              <div className="mt-2 h-1 w-full bg-accent/10">
                <div className="h-1 bg-accent" style={{ width: `${pct(m.value, total)}%` }} />
              </div>
            </dd>
          </div>
        ))}
      </dl>

      {gaps.length > 0 && (
        <p className="mt-6 text-sm text-muted-foreground">
          Next to improve:{' '}
          <span className="text-foreground">
            {gaps.map((g) => `${g.label.toLowerCase()} (${total - g.value} missing)`).join(', ')}
          </span>
          .
        </p>
      )}
    </section>
  );
}
