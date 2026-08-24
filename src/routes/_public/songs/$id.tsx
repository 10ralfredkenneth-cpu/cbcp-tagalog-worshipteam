import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getSongsPublic } from '@/lib/db-public.functions';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Music, FileText, Star, Printer, Layout, 
  Minus, Plus, ChevronUp, ChevronDown, Share2, 
  Split, Maximize2, Hash, ArrowLeft,
  Volume2, Play, Pause, Settings, RefreshCw,
  Clock, Repeat
} from 'lucide-react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { KEYS, transposeChord, getSemitoneDifference, chordToNumber } from '@/utils/transposition';
import { WorshipSong } from '@/types/songs';
import { toast } from 'sonner';

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
  
  const searchParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
  
  const [currentKey, setCurrentKey] = useState(searchParams.get('key') || song?.defaultKey || 'C');
  const [showChords, setShowChords] = useState(() => {
    const fromUrl = searchParams.get('chords');
    if (fromUrl !== null) return fromUrl === 'true';
    const saved = localStorage.getItem(`song-pref-showChords-${id}`);
    return saved !== null ? JSON.parse(saved) : true;
  });
  const [showLyrics, setShowLyrics] = useState(() => {
    const fromUrl = searchParams.get('lyrics');
    if (fromUrl !== null) return fromUrl === 'true';
    const saved = localStorage.getItem(`song-pref-showLyrics-${id}`);
    return saved !== null ? JSON.parse(saved) : true;
  });
  const [numberNotation, setNumberNotation] = useState(false);
  const [isSplit, setIsSplit] = useState(() => {
    const fromUrl = searchParams.get('split');
    if (fromUrl !== null) return fromUrl === 'true';
    const saved = localStorage.getItem(`song-pref-isSplit-${id}`);
    return saved !== null ? JSON.parse(saved) : false;
  });
  const [fontSize, setFontSize] = useState(16);
  const [chordColor, setChordColor] = useState(() => {
    const fromUrl = searchParams.get('color');
    if (fromUrl !== null) return `text-${fromUrl}`;
    return localStorage.getItem(`song-pref-chordColor-${id}`) || 'text-accent';
  });
  
  // Metronome state
  const [metronomePlaying, setMetronomePlaying] = useState(false);
  const [isCountingIn, setIsCountingIn] = useState(false);
  const [countInBeats, setCountInBeats] = useState(4);
  const [currentCount, setCurrentCount] = useState(0);
  const [bpm, setBpm] = useState(() => {
    const fromUrl = searchParams.get('bpm');
    return fromUrl ? parseInt(fromUrl) : (song?.bpm || 72);
  });
  const [metronomeVolume, setMetronomeVolume] = useState(() => {
    return song?.externalResources?.metronomeDefaultVolume ?? 0.5;
  });
  const [metronomeSound, setMetronomeSound] = useState<'beep' | 'woodblock' | 'click'>(() => {
    const fromUrl = searchParams.get('sound');
    if (fromUrl === 'beep' || fromUrl === 'woodblock' || fromUrl === 'click') return fromUrl;
    return song?.externalResources?.metronomeDefaultSound ?? 'beep';
  });
  const [autoScroll, setAutoScroll] = useState(false);
  const [latency, setLatency] = useState(0); // in ms
  const [loopMode, setLoopMode] = useState(false);
  const [loopStart, setLoopStart] = useState<number | null>(null);
  const [loopEnd, setLoopEnd] = useState<number | null>(null);
  const [toolsOpen, setToolsOpen] = useState(false);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const nextTickTimeRef = useRef<number>(0);
  const beatCountRef = useRef<number>(0);


  // Persistence effects
  useEffect(() => {
    localStorage.setItem(`song-pref-showChords-${id}`, JSON.stringify(showChords));
  }, [showChords, id]);

  useEffect(() => {
    localStorage.setItem(`song-pref-showLyrics-${id}`, JSON.stringify(showLyrics));
  }, [showLyrics, id]);

  useEffect(() => {
    localStorage.setItem(`song-pref-isSplit-${id}`, JSON.stringify(isSplit));
  }, [isSplit, id]);

  useEffect(() => {
    localStorage.setItem(`song-pref-chordColor-${id}`, chordColor);
  }, [chordColor, id]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      
      switch (e.key.toLowerCase()) {
        case 'c': setShowChords((prev: boolean) => !prev); break;
        case 'l': setShowLyrics((prev: boolean) => !prev); break;
        case 's': setIsSplit((prev: boolean) => !prev); break;
        case ' ': 
          e.preventDefault();
          setMetronomePlaying((prev: boolean) => !prev); 
          break;
        case 'r': setBpm(song?.bpm || 72); break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [song?.bpm]);

  useEffect(() => {
    if (song?.bpm) setBpm(song.bpm);
  }, [song?.bpm]);

  const playClick = useCallback((time: number, isAccent: boolean = false) => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    const osc = audioCtxRef.current.createOscillator();
    const envelope = audioCtxRef.current.createGain();

    if (metronomeSound === 'beep') {
      osc.frequency.value = isAccent ? 880 : 440;
    } else if (metronomeSound === 'woodblock') {
      osc.frequency.value = isAccent ? 600 : 300;
    } else {
      osc.frequency.value = isAccent ? 1200 : 600;
    }
    
    envelope.gain.value = metronomeVolume;
    envelope.gain.exponentialRampToValueAtTime(metronomeVolume || 0.001, time + 0.001);
    envelope.gain.exponentialRampToValueAtTime(0.001, time + 0.02);

    osc.connect(envelope);
    envelope.connect(audioCtxRef.current.destination);

    osc.start(time);
    osc.stop(time + 0.03);
  }, [metronomeSound, metronomeVolume]);

  const scheduler = useCallback(() => {
    if (!audioCtxRef.current) return;
    
    while (nextTickTimeRef.current < audioCtxRef.current.currentTime + 0.1) {
      const time = nextTickTimeRef.current;
      
      if (isCountingIn) {
        if (beatCountRef.current < countInBeats) {
          playClick(time, beatCountRef.current === 0);
          const nextBeat = beatCountRef.current + 1;
          setCurrentCount(nextBeat);
          beatCountRef.current = nextBeat;
        } else {
          setIsCountingIn(false);
          beatCountRef.current = 0;
          setCurrentCount(0);
          playClick(time, true);
          beatCountRef.current = 1;
        }
      } else {
        playClick(time, beatCountRef.current === 0);
        beatCountRef.current = (beatCountRef.current + 1) % 4;
      }
      
      nextTickTimeRef.current += 60.0 / bpm;
    }
  }, [bpm, isCountingIn, countInBeats, playClick]);

  useEffect(() => {
    if (metronomePlaying) {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      
      nextTickTimeRef.current = audioCtxRef.current.currentTime;
      beatCountRef.current = 0;
      
      if (countInBeats > 0) {
        setIsCountingIn(true);
        setCurrentCount(0);
      }
      
      timerRef.current = setInterval(scheduler, 25);
    } else {
      setIsCountingIn(false);
      setCurrentCount(0);
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [metronomePlaying, scheduler, countInBeats]);

  const handleShare = () => {
    const params = new URLSearchParams();
    params.set('bpm', bpm.toString());
    params.set('key', currentKey);
    params.set('chords', showChords.toString());
    params.set('lyrics', showLyrics.toString());
    params.set('split', isSplit.toString());
    params.set('sound', metronomeSound);
    params.set('color', chordColor.replace('text-', ''));
    
    const url = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    navigator.clipboard.writeText(url);
    toast.success('Practice link copied to clipboard!');
  };


  // Auto-scroll logic
  useEffect(() => {
    let scrollInterval: NodeJS.Timeout;
    if (autoScroll && metronomePlaying && !isCountingIn) {
      scrollInterval = setInterval(() => {
        window.scrollBy({ top: 1, behavior: 'auto' });
      }, 50 + latency);
    }
    return () => clearInterval(scrollInterval);
  }, [autoScroll, metronomePlaying, isCountingIn, latency]);

  const sections = useMemo(() => song.lyrics?.split('\n\n') || [], [song.lyrics]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (loopMode && loopStart !== null && metronomePlaying && !isCountingIn) {
      const loopStartEl = document.getElementById(`section-${loopStart}`);
      const loopEndEl = document.getElementById(`section-${loopEnd !== null ? loopEnd : loopStart}`);
      
      if (loopStartEl && loopEndEl) {
        const checkScroll = () => {
          const rect = loopEndEl.getBoundingClientRect();
          if (rect.bottom < 100) {
            loopStartEl.scrollIntoView({ behavior: 'smooth' });
          }
        };
        interval = setInterval(checkScroll, 100);
      }
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [loopMode, loopStart, loopEnd, metronomePlaying, isCountingIn]);


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

  

  return (
    <div className="min-h-screen bg-background text-foreground pb-16">
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
            <Button variant="default" size="sm" onClick={handleShare} className="rounded-none bg-primary text-white h-9 group relative overflow-hidden">
              <span className="relative z-10 flex items-center">
                <Share2 className="w-4 h-4 mr-2" /> Share Practice Link
              </span>
            </Button>
          </div>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 backdrop-blur px-3 py-2 print:hidden lg:hidden">
        <div className="mx-auto flex max-w-2xl items-center justify-between gap-2">
          <Button variant="ghost" size="sm" onClick={() => handleKeyChange(-1)} className="h-9 px-2" aria-label="Lower key"><Minus className="w-4 h-4" /></Button>
          <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Key <span className="text-primary">{currentKey}</span></span>
          <Button variant="ghost" size="sm" onClick={() => handleKeyChange(1)} className="h-9 px-2" aria-label="Raise key"><Plus className="w-4 h-4" /></Button>
          <Button variant={autoScroll ? 'secondary' : 'ghost'} size="sm" onClick={() => setAutoScroll(!autoScroll)} className="h-9 px-2 text-xs"><RefreshCw className="mr-1.5 h-3.5 w-3.5" /> Auto Scroll</Button>
          <Button variant="outline" size="sm" onClick={() => setToolsOpen(!toolsOpen)} className="h-9 rounded-none px-3"><Settings className="mr-1.5 h-3.5 w-3.5" /> Tools</Button>
        </div>
      </div>

      <div className="container mx-auto px-3 sm:px-6 py-5 sm:py-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
          {/* Left Sidebar: Controls (Reference Style) */}
          <div className={`lg:col-span-1 space-y-6 print:hidden ${toolsOpen ? 'fixed inset-x-3 bottom-16 z-50 max-h-[75vh] overflow-y-auto block lg:static lg:max-h-none lg:overflow-visible lg:z-auto' : 'hidden lg:block'}`}>
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
                <div className="flex items-center justify-between border-b pb-2">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500">Metronome:</h3>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setBpm(song?.bpm || 72)}
                    className="h-6 text-[9px] uppercase tracking-tighter text-accent font-bold px-2"
                  >
                    <RefreshCw className="w-3 h-3 mr-1" /> Reset BPM
                  </Button>
                </div>
                
                <div className="bg-gray-50 p-4 border border-gray-100 rounded-sm space-y-4">
                  <div className="flex items-center justify-between">
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

                  {/* Volume and Sound */}
                  <div className="pt-2 space-y-3">
                    <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-gray-400">
                      <span>Volume</span>
                      <Volume2 className="w-3 h-3" />
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="1" 
                      step="0.05"
                      value={metronomeVolume} 
                      onChange={(e) => setMetronomeVolume(parseFloat(e.target.value))}
                      className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-accent"
                    />
                    
                    <div className="grid grid-cols-3 gap-1 pt-2">
                      {['beep', 'woodblock', 'click'].map((sound) => (
                        <button
                          key={sound}
                          onClick={() => setMetronomeSound(sound as any)}
                          className={`text-[9px] uppercase font-bold py-1 border transition-all ${metronomeSound === sound ? 'bg-accent text-primary border-accent' : 'bg-white text-gray-400 border-gray-100'}`}
                        >
                          {sound}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Auto-scroll Toggle */}
                  <div className="flex items-center gap-3 pt-2 cursor-pointer select-none" onClick={() => setAutoScroll(!autoScroll)}>
                    <div className={`w-4 h-4 border flex items-center justify-center transition-colors ${autoScroll ? 'bg-accent border-accent' : 'bg-white border-gray-200'}`}>
                      {autoScroll && <div className="w-1.5 h-1.5 bg-primary rotate-45" />}
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Auto-Scroll</span>
                  </div>
                  {/* Count-in */}
                  <div className="pt-2 border-t border-gray-100 mt-2 space-y-2">
                    <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-gray-400">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Count-in</span>
                      <div className="flex items-center gap-2">
                        {[0, 4, 8].map(c => (
                          <button 
                            key={c}
                            onClick={() => setCountInBeats(c)}
                            className={`px-2 py-0.5 border ${countInBeats === c ? 'bg-accent text-primary border-accent' : 'bg-white text-gray-400 border-gray-100'}`}
                          >
                            {c || 'Off'}
                          </button>
                        ))}
                      </div>
                    </div>
                    {isCountingIn && (
                      <div className="text-center font-serif text-2xl text-accent animate-pulse">
                        {currentCount}
                      </div>
                    )}
                  </div>

                  {/* Latency Calibration */}
                  <div className="pt-2 border-t border-gray-100 mt-2 space-y-2">
                    <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-gray-400">
                      <span>Latency ({latency}ms)</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="200" 
                      step="5"
                      value={latency} 
                      onChange={(e) => setLatency(parseInt(e.target.value))}
                      className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-accent"
                    />
                  </div>

                  {/* A-B Loop */}
                  <div className="pt-2 border-t border-gray-100 mt-2 space-y-2">
                    <div className="flex items-center gap-3 cursor-pointer select-none" onClick={() => setLoopMode(!loopMode)}>
                      <div className={`w-4 h-4 border flex items-center justify-center transition-colors ${loopMode ? 'bg-accent border-accent' : 'bg-white border-gray-200'}`}>
                        {loopMode && <div className="w-1.5 h-1.5 bg-primary rotate-45" />}
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 flex items-center gap-1">
                        <Repeat className="w-3 h-3" /> A-B Loop Mode
                      </span>
                    </div>
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
          <div className={`lg:col-span-4 bg-card px-4 py-6 sm:px-8 md:px-12 shadow-sm border border-border min-h-[700px] ${isSplit ? 'columns-1 md:columns-2 gap-10' : ''}`}>
             <div className="mb-7 border-b border-border pb-5 break-inside-avoid">
               <h2 className="font-serif text-3xl sm:text-4xl text-primary font-bold mb-1">{song.title}</h2>
               <p className="text-accent font-medium tracking-widest uppercase text-xs">{song.artist}</p>
               <div className="mt-3 flex gap-5 text-[11px] font-bold text-muted-foreground uppercase tracking-widest"><span>Key: <span className="text-primary">{currentKey}</span></span>{song.bpm && <span>BPM: <span className="text-primary">{song.bpm}</span></span>}</div>
             </div>
             <div className="space-y-7 sm:space-y-8" style={{ fontSize: `${fontSize}px` }}>
              {sections.map((section, sIdx) => {
                const lines = section.split('\n');
                const header = lines[0]?.match(/^\[(.*)\]$/);
                const displayLines = header ? lines.slice(1) : lines;
                const isLooped = loopMode && (loopStart === sIdx || (loopStart !== null && loopEnd !== null && sIdx >= loopStart && sIdx <= loopEnd));

                return (
                  <div 
                    key={sIdx} 
                    id={`section-${sIdx}`}
                    onClick={() => {
                      if (loopMode) {
                        if (loopStart === null || (loopStart !== null && loopEnd !== null)) {
                          setLoopStart(sIdx);
                          setLoopEnd(null);
                        } else {
                          if (sIdx < loopStart) {
                            setLoopEnd(loopStart);
                            setLoopStart(sIdx);
                          } else {
                            setLoopEnd(sIdx);
                          }
                        }
                      }
                    }}
                    className={`break-inside-avoid-column space-y-2 p-2 transition-all cursor-pointer ${isLooped ? 'bg-accent/10 border-l-4 border-accent shadow-sm' : 'hover:bg-gray-50/50'}`}
                  >
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
