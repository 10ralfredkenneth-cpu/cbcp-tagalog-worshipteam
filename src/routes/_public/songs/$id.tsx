import { useState, useMemo, useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getSongsPublic } from '@/lib/db-public.functions';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Music, FileText, Star, Printer, Layout, 
  Minus, Plus, ChevronUp, ChevronDown, Share2, 
  Split, Maximize2, Hash, ArrowLeft,
  Volume2, Play, Pause, Settings, RefreshCw
} from 'lucide-react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { KEYS, transposeChord, getSemitoneDifference, chordToNumber } from '@/utils/transposition';
import { WorshipSong } from '@/types/songs';

export const Route = createFileRoute('/_public/songs/$id')({
  head: () => ({
    meta: [
      { title: `Worship Song | Radiant Worship` },
      { name: "description", content: "View chords, lyrics, and biblical foundation." },
    ],
  }),
  component: SongDetailPage,
});

function SongDetailPage() {
  const { data: songs = [] } = useQuery({
    queryKey: ['songs-public'],
    queryFn: getSongsPublic,
  });

  const { id } = Route.useParams();
  const rawSong = (songs || []).find((s: any) => s.id === (id as string));
  const song = useMemo(() => rawSong as unknown as WorshipSong, [rawSong]);
  
  const [currentKey, setCurrentKey] = useState(song?.defaultKey || 'C');
  const [showChords, setShowChords] = useState(true);
  const [showLyrics, setShowLyrics] = useState(true);
  const [numberNotation, setNumberNotation] = useState(false);
  const [isSplit, setIsSplit] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [chordColor, setChordColor] = useState('text-accent');
  
  // Metronome state
  const [metronomePlaying, setMetronomePlaying] = useState(false);
  const [bpm, setBpm] = useState(song?.bpm || 72);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    if (song?.bpm) setBpm(song.bpm);
  }, [song?.bpm]);

  const playClick = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    const osc = audioCtxRef.current.createOscillator();
    const envelope = audioCtxRef.current.createGain();

    osc.frequency.value = 880;
    envelope.gain.value = 1;
    envelope.gain.exponentialRampToValueAtTime(1, audioCtxRef.current.currentTime + 0.001);
    envelope.gain.exponentialRampToValueAtTime(0.001, audioCtxRef.current.currentTime + 0.02);

    osc.connect(envelope);
    envelope.connect(audioCtxRef.current.destination);

    osc.start(audioCtxRef.current.currentTime);
    osc.stop(audioCtxRef.current.currentTime + 0.03);
  };

  useEffect(() => {
    if (metronomePlaying) {
      const interval = (60 / bpm) * 1000;
      playClick(); // Initial click
      timerRef.current = setInterval(playClick, interval);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [metronomePlaying, bpm]);

  if (!song) {
    return (
      <div className="container mx-auto px-6 py-20 text-center">
        <h2 className="font-serif text-3xl">Song not found</h2>
        <Button asChild className="mt-8 rounded-none tracking-widest uppercase bg-accent text-primary">
          <Link to="/songs">Back to Library</Link>
        </Button>
      </div>
    );
  }

  const semitones = getSemitoneDifference(song.defaultKey || 'C', currentKey);

  const handleKeyChange = (direction: number) => {
    const isMinor = currentKey.endsWith('m');
    const noteOnly = currentKey.replace('m', '');
    const idx = KEYS.indexOf(noteOnly);
    if (idx === -1) return;
    
    let newIdx = (idx + direction) % 12;
    if (newIdx < 0) newIdx += 12;
    setCurrentKey(KEYS[newIdx] + (isMinor ? 'm' : ''));
  };

  const processLine = (content: string) => {
    if (!content) return '';
    
    // If it's a chord line (contains [Chord])
    if (content.includes('[') && content.includes(']')) {
      return content.replace(/\[([^\]]+)\]/g, (_, chord) => {
        const transposed = transposeChord(chord, semitones);
        const finalChord = numberNotation ? chordToNumber(transposed, currentKey) : transposed;
        return showChords ? `<span class="${chordColor} font-bold">${finalChord}</span>` : '';
      });
    }
    
    return showLyrics ? content : '';
  };

  const sections = song.lyrics?.split('\n\n') || [];

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-[#1A1A1A] pb-20">
      {/* Top Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50 print:hidden">
        <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild className="p-0 h-auto hover:bg-transparent">
              <Link to="/songs" className="flex items-center text-xs font-bold tracking-widest text-muted-foreground uppercase">
                <ArrowLeft className="mr-2 w-3 h-3" /> Library
              </Link>
            </Button>
            <h1 className="font-serif text-2xl md:text-3xl text-primary font-bold">{song.title}</h1>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => window.print()} className="rounded-none border-gray-200 h-9">
              <Printer className="w-4 h-4 mr-2" /> Print
            </Button>
            <Button variant="outline" size="sm" onClick={() => setIsSplit(!isSplit)} className={`rounded-none border-gray-200 h-9 ${isSplit ? 'bg-accent/10 text-accent border-accent/20' : ''}`}>
              <Split className="w-4 h-4 mr-2" /> Split
            </Button>
            <Button variant="default" size="sm" className="rounded-none bg-primary text-white h-9">
              <Share2 className="w-4 h-4 mr-2" /> Share
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar: Controls (Reference Style) */}
          <div className="lg:col-span-1 space-y-6 print:hidden">
            <div className="bg-white p-6 shadow-sm border border-gray-100 rounded-sm space-y-8">
              {/* Transpose Tool */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 border-b pb-2">Transpose:</h3>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleKeyChange(1)} className="flex-1 rounded-none h-10">
                    <ChevronUp className="w-4 h-4 mr-1" /> Higher
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleKeyChange(-1)} className="flex-1 rounded-none h-10">
                    <ChevronDown className="w-4 h-4 mr-1" /> Lower
                  </Button>
                </div>
                <div className="grid grid-cols-6 gap-1">
                  {KEYS.map(k => (
                    <button
                      key={k}
                      onClick={() => setCurrentKey(k)}
                      className={`h-8 text-[10px] font-bold border transition-all ${
                        currentKey.replace('m', '') === k 
                        ? 'bg-accent text-primary border-accent' 
                        : 'bg-white text-gray-400 border-gray-100 hover:border-accent'
                      }`}
                    >
                      {k}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chord Visibility Choices */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 border-b pb-2">Visibility Options:</h3>
                
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3 cursor-pointer select-none" onClick={() => setShowChords(!showChords)}>
                    <div className={`w-5 h-5 border flex items-center justify-center transition-colors ${showChords ? 'bg-accent border-accent' : 'bg-white border-gray-200'}`}>
                      {showChords && <div className="w-2 h-2 bg-primary rotate-45" />}
                    </div>
                    <span className="text-sm font-medium">Show chords</span>
                  </div>

                  {showChords && (
                    <div className="ml-8 space-y-3 pt-1 border-l border-accent/10 pl-4">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Chord Colour:</p>
                      <div className="flex flex-wrap gap-2">
                        {[
                          { name: 'Gold', class: 'text-accent', bg: 'bg-accent' },
                          { name: 'Navy', class: 'text-primary', bg: 'bg-primary' },
                          { name: 'Red', class: 'text-red-600', bg: 'bg-red-600' },
                          { name: 'Blue', class: 'text-blue-600', bg: 'bg-blue-600' },
                          { name: 'Black', class: 'text-black', bg: 'bg-black' }
                        ].map((c) => (
                          <button
                            key={c.name}
                            onClick={() => setChordColor(c.class)}
                            className={`w-6 h-6 rounded-full border-2 transition-transform hover:scale-110 ${c.bg} ${chordColor === c.class ? 'border-primary scale-110 shadow-sm' : 'border-transparent'}`}
                            title={c.name}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-3 cursor-pointer select-none" onClick={() => setShowLyrics(!showLyrics)}>
                    <div className={`w-5 h-5 border flex items-center justify-center transition-colors ${showLyrics ? 'bg-accent border-accent' : 'bg-white border-gray-200'}`}>
                      {showLyrics && <div className="w-2 h-2 bg-primary rotate-45" />}
                    </div>
                    <span className="text-sm font-medium">Show lyrics</span>
                  </div>
                  
                  <div className="flex items-center gap-3 cursor-pointer select-none" onClick={() => setNumberNotation(!numberNotation)}>
                    <div className={`w-5 h-5 border flex items-center justify-center transition-colors ${numberNotation ? 'bg-accent border-accent' : 'bg-white border-gray-200'}`}>
                      {numberNotation && <div className="w-2 h-2 bg-primary rotate-45" />}
                    </div>
                    <span className="text-sm font-medium">Number notation</span>
                  </div>
                </div>
              </div>

              {/* Metronome Tool */}
              <div className="space-y-4 pt-2">
                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 border-b pb-2">Metronome:</h3>
                <div className="bg-gray-50 p-4 border border-gray-100 rounded-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">BPM</span>
                      <span className="text-2xl font-serif font-bold text-primary">{bpm}</span>
                    </div>
                    <Button 
                      onClick={() => setMetronomePlaying(!metronomePlaying)}
                      className={`h-12 w-12 rounded-full ${metronomePlaying ? 'bg-red-500 hover:bg-red-600' : 'bg-accent hover:bg-accent/90'} text-primary p-0 flex items-center justify-center shadow-lg transition-all`}
                    >
                      {metronomePlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
                    </Button>
                  </div>
                  <div className="flex items-center gap-4">
                    <button onClick={() => setBpm(Math.max(40, bpm - 1))} className="text-gray-400 hover:text-accent p-1"><Minus className="w-4 h-4" /></button>
                    <input 
                      type="range" 
                      min="40" 
                      max="220" 
                      value={bpm} 
                      onChange={(e) => setBpm(parseInt(e.target.value))}
                      className="flex-1 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-accent"
                    />
                    <button onClick={() => setBpm(Math.min(220, bpm + 1))} className="text-gray-400 hover:text-accent p-1"><Plus className="w-4 h-4" /></button>
                  </div>
                </div>
              </div>

              {/* Text Size */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 border-b pb-2">Font Size:</h3>
                <div className="flex items-center justify-between px-2">
                  <button onClick={() => setFontSize(Math.max(12, fontSize - 2))} className="text-gray-400 hover:text-accent"><Minus className="w-4 h-4" /></button>
                  <span className="text-sm font-bold">{fontSize}px</span>
                  <button onClick={() => setFontSize(Math.min(32, fontSize + 2))} className="text-gray-400 hover:text-accent"><Plus className="w-4 h-4" /></button>
                </div>
              </div>
            </div>

            {/* Song Meta Card */}
            <div className="bg-white p-6 shadow-sm border border-gray-100 rounded-sm space-y-4">
               <div className="aspect-square bg-gray-50 flex items-center justify-center border border-gray-100">
                 <Music className="w-12 h-12 text-gray-200" />
               </div>
               <div>
                 <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Artist</p>
                 <p className="text-sm font-serif">{song.artist}</p>
               </div>
               <div>
                 <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Key</p>
                 <p className="text-sm font-serif">{song.defaultKey}</p>
               </div>
               <Button variant="ghost" size="sm" className="w-full text-[10px] font-bold uppercase tracking-widest text-accent border border-accent/10 rounded-none">
                 + more details
               </Button>
            </div>
          </div>

          {/* Main Song Content */}
          <div className={`lg:col-span-3 bg-white p-8 md:p-12 shadow-sm border border-gray-100 min-h-[800px] ${isSplit ? 'columns-1 md:columns-2 gap-12' : ''}`}>
            {/* Song Header (Internal) */}
            <div className="mb-12 border-b-2 border-primary/5 pb-8 break-inside-avoid">
              <h2 className="font-serif text-4xl text-primary font-bold mb-2">{song.title}</h2>
              <p className="text-accent font-medium tracking-widest uppercase text-xs">{song.artist}</p>
              <div className="mt-6 flex gap-6 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                <span>Key: <span className="text-primary">{currentKey}</span></span>
                {song.bpm && <span>BPM: <span className="text-primary">{song.bpm}</span></span>}
              </div>
            </div>

            {/* Song Body */}
            <div className="space-y-12" style={{ fontSize: `${fontSize}px` }}>
              {sections.map((section, sIdx) => {
                const lines = section.split('\n');
                const header = lines[0]?.match(/^\[(.*)\]$/);
                const displayLines = header ? lines.slice(1) : lines;

                return (
                  <div key={sIdx} className="break-inside-avoid-column space-y-2">
                    {header && (
                      <div className="inline-block bg-accent text-primary px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.2em] rounded-sm mb-2">
                        {header[1]}
                      </div>
                    )}
                    <div className="space-y-2">
                      {displayLines.map((line, lIdx) => (
                        <div 
                          key={lIdx} 
                          className="font-mono leading-tight whitespace-pre-wrap"
                          dangerouslySetInnerHTML={{ __html: processLine(line) }}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer / Copyright */}
            <div className="mt-20 pt-12 border-t border-gray-100 text-[10px] text-gray-400 uppercase tracking-widest break-inside-avoid">
              <p>© {song.copyrightYear || new Date().getFullYear()} {song.copyrightOwner || 'Radiant Worship'}</p>
              {song.ccliNumber && <p>CCLI: {song.ccliNumber}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
