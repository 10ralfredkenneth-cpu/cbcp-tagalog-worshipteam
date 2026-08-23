import { createFileRoute, useNavigate, useParams } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, Save, Music, Type, Languages, Tags, Star, Info, Loader2, Upload, FileText, Trash2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { updateSong, getSongs } from '@/lib/db-songs.functions';
import { toast } from 'sonner';
import { WorshipSong, SongLanguage, SongType, SongStatus, SongVisibility } from '@/types/songs';
import { useAuth } from '@/hooks/use-auth';
import { supabase } from '@/integrations/supabase/client';

export const Route = createFileRoute('/_authenticated/dashboard/songs/$id')({
  component: EditSongPage,
});

function EditSongPage() {
  const { id } = useParams({ from: '/_authenticated/dashboard/songs/$id' });
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { loading, isPending: authPending } = useAuth();
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState<string | null>(null);
  
  const { data: song, isLoading: songLoading } = useQuery({
    queryKey: ['song', id],
    queryFn: async () => {
      const { data, error } = await supabase.from('songs').select('*').eq('id', id).single();
      if (error) throw error;
      return {
        ...data,
        defaultKey: data.default_key,
        songType: data.song_type,
        ccliNumber: data.ccli_number,
        visibility: data.is_public ? 'Public' : 'Team Only',
        audioUrl: data.audio_url,
        sheetMusicUrl: data.sheet_music_url,
        externalResources: data.external_resources,
        scriptureReferences: data.scripture_references || [],
        lyrics: data.lyrics,
        chords: data.chords,
        isPublic: data.is_public,
        createdAt: data.created_at,
        updatedAt: data.updated_at
      } as unknown as WorshipSong;
    },
  });

  const [formData, setFormData] = useState<Partial<WorshipSong>>({});

  useEffect(() => {
    if (song) {
      setFormData(song);
    }
  }, [song]);

  const mutation = useMutation({
    mutationFn: (data: Partial<WorshipSong>) => updateSong({ id, song: data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['songs'] });
      queryClient.invalidateQueries({ queryKey: ['song', id] });
      toast.success('Song updated successfully');
      navigate({ to: '/dashboard/songs' });
    },
    onError: (error: any) => {
      toast.error('Failed to update song: ' + error.message);
      setIsSaving(false);
    }
  });

  const handleSave = () => {
    if (!formData.title) {
      toast.error('Song title is required');
      return;
    }
    setIsSaving(true);
    mutation.mutate(formData);
  };

  const updateField = (field: keyof WorshipSong, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>, type: 'audio' | 'sheet') => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(type);
    const fileExt = file.name.split('.').pop();
    const fileName = `${id}-${type}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `${fileName}`;

    try {
      const { data, error } = await supabase.storage
        .from('song-resources')
        .upload(filePath, file);

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from('song-resources')
        .getPublicUrl(filePath);

      if (type === 'audio') {
        updateField('audioUrl' as any, publicUrl);
      } else {
        updateField('sheetMusicUrl' as any, publicUrl);
      }
      toast.success(`${type === 'audio' ? 'Audio' : 'Sheet music'} uploaded`);
    } catch (error: any) {
      toast.error('Upload failed: ' + error.message);
    } finally {
      setIsUploading(null);
    }
  };

  if (loading || authPending || songLoading) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-8 h-8 text-accent animate-spin" />
        <p className="text-[10px] uppercase tracking-[0.2em] text-accent font-bold">Loading Repertoire...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12 space-y-12 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-4">
          <Badge variant="outline" className="rounded-none uppercase text-[10px] tracking-widest border-accent/20 text-accent">
            Edit Repertoire
          </Badge>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="h-10 w-10 text-accent rounded-none" onClick={() => navigate({ to: '/dashboard/songs' })}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="font-serif text-5xl text-foreground">Edit: {song?.title}</h1>
          </div>
        </div>
        <Button 
          disabled={isSaving}
          onClick={handleSave}
          className="rounded-none bg-accent text-primary hover:bg-accent/90 px-8 py-6 font-bold text-[10px] uppercase tracking-widest shadow-xl"
        >
          <Save className="w-4 h-4 mr-2" /> {isSaving ? 'Updating...' : 'Save Changes'}
        </Button>
      </header>

      <div className="max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-12 ml-14">
        <div className="md:col-span-2 space-y-12">
          {/* Metadata Section - same as new.tsx but using formData */}
          <section className="space-y-6">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent border-b border-accent/10 pb-2">Song Metadata</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Song Title *</Label>
                <div className="relative">
                  <Music className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input 
                    placeholder="Title of the song" 
                    className="pl-10 rounded-none border-accent/10 bg-background" 
                    value={formData.title || ''}
                    onChange={(e) => updateField('title', e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Artist / Composer</Label>
                <div className="relative">
                  <Type className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input 
                    placeholder="Original artist or writer" 
                    className="pl-10 rounded-none border-accent/10 bg-background" 
                    value={formData.artist || ''}
                    onChange={(e) => updateField('artist', e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Songwriter(s)</Label>
                <Input 
                  placeholder="Additional contributors" 
                  className="rounded-none border-accent/10 bg-background" 
                  value={formData.songwriter || ''}
                  onChange={(e) => updateField('songwriter', e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Language</Label>
                  <Select value={formData.language || 'English'} onValueChange={(v) => updateField('language', v)}>
                    <SelectTrigger className="rounded-none border-accent/10 bg-background">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-none">
                      <SelectItem value="English">English</SelectItem>
                      <SelectItem value="Filipino/Tagalog">Filipino/Tagalog</SelectItem>
                      <SelectItem value="Cebuano/Bisaya">Cebuano/Bisaya</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Song Type</Label>
                  <Select value={formData.songType || 'Worship'} onValueChange={(v) => updateField('songType', v)}>
                    <SelectTrigger className="rounded-none border-accent/10 bg-background">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-none">
                      {['Opening', 'Praise', 'Worship', 'Response', 'Communion', 'Offering', 'Closing', 'Special Number'].map(t => (
                        <SelectItem key={t} value={t}>{t}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Original Key</Label>
                <Select value={formData.defaultKey || 'C'} onValueChange={(v) => updateField('defaultKey', v)}>
                  <SelectTrigger className="rounded-none border-accent/10 bg-background">
                    <SelectValue placeholder="Key" />
                  </SelectTrigger>
                  <SelectContent className="rounded-none">
                    {['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'].map(k => (
                      <SelectItem key={k} value={k}>{k}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Tempo (BPM)</Label>
                <Input 
                  type="number" 
                  className="rounded-none border-accent/10 bg-background" 
                  value={formData.bpm || ''}
                  onChange={(e) => updateField('bpm', parseInt(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Time Signature</Label>
                <Select value={formData.timeSignature || '4/4'} onValueChange={(v) => updateField('timeSignature', v)}>
                  <SelectTrigger className="rounded-none border-accent/10 bg-background">
                    <SelectValue placeholder="Meter" />
                  </SelectTrigger>
                  <SelectContent className="rounded-none">
                    <SelectItem value="4/4">4/4</SelectItem>
                    <SelectItem value="3/4">3/4</SelectItem>
                    <SelectItem value="6/8">6/8</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent border-b border-accent/10 pb-2">Content & Lyrics</h3>
            <div className="space-y-2">
              <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Lyrics & Chords</Label>
              <Textarea 
                placeholder="Paste lyrics or chords here..." 
                className="rounded-none border-accent/10 bg-background min-h-[300px] font-mono text-[12px]" 
                value={formData.lyrics || ''}
                onChange={(e) => updateField('lyrics', e.target.value)}
              />
            </div>
          </section>
        </div>

        <div className="space-y-12">
          {/* Status & Visibility Section */}
          <section className="space-y-6">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent border-b border-accent/10 pb-2">Status & Visibility</h3>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Status</Label>
                <Select value={formData.status || 'Active'} onValueChange={(v) => updateField('status', v)}>
                  <SelectTrigger className="rounded-none border-accent/10 bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-none">
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Learning">Learning</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                    <SelectItem value="Archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between p-4 bg-muted/20 border border-accent/5">
                <div className="space-y-0.5">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-accent flex items-center gap-2">
                    <Star className="w-3 h-3" /> Featured Song
                  </Label>
                </div>
                <Switch 
                  checked={formData.featured || false}
                  onCheckedChange={(v) => updateField('featured', v)}
                />
              </div>
            </div>
          </section>

          {/* Media Section */}
          <section className="space-y-6">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent border-b border-accent/10 pb-2">Resources & Media</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Audio Recording</Label>
                <div className="flex items-center gap-2">
                  <Input 
                    type="file" 
                    accept="audio/*"
                    className="hidden" 
                    id="audio-upload"
                    onChange={(e) => handleFileUpload(e, 'audio')}
                  />
                  <Button 
                    asChild 
                    variant="outline" 
                    className="flex-1 rounded-none border-accent/10 text-[10px] uppercase tracking-widest font-bold"
                  >
                    <label htmlFor="audio-upload" className="cursor-pointer">
                      {isUploading === 'audio' ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Upload className="w-4 h-4 mr-2" />}
                      Upload Audio
                    </label>
                  </Button>
                  {(formData as any).audioUrl && (
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="rounded-none text-red-400" 
                      onClick={() => updateField('audioUrl' as any, null)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                {(formData as any).audioUrl && (
                  <p className="text-[9px] text-accent flex items-center gap-1">
                    <Music className="w-3 h-3" /> Audio attached
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Sheet Music (PDF)</Label>
                <div className="flex items-center gap-2">
                  <Input 
                    type="file" 
                    accept=".pdf"
                    className="hidden" 
                    id="sheet-upload"
                    onChange={(e) => handleFileUpload(e, 'sheet')}
                  />
                  <Button 
                    asChild 
                    variant="outline" 
                    className="flex-1 rounded-none border-accent/10 text-[10px] uppercase tracking-widest font-bold"
                  >
                    <label htmlFor="sheet-upload" className="cursor-pointer">
                      {isUploading === 'sheet' ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Upload className="w-4 h-4 mr-2" />}
                      Upload PDF
                    </label>
                  </Button>
                  {(formData as any).sheetMusicUrl && (
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="rounded-none text-red-400" 
                      onClick={() => updateField('sheetMusicUrl' as any, null)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                {(formData as any).sheetMusicUrl && (
                  <p className="text-[9px] text-accent flex items-center gap-1">
                    <FileText className="w-3 h-3" /> PDF attached
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">CCLI Number</Label>
                <Input 
                  placeholder="CCLI #" 
                  className="rounded-none border-accent/10 bg-background" 
                  value={formData.ccliNumber || ''}
                  onChange={(e) => updateField('ccliNumber', e.target.value)}
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
