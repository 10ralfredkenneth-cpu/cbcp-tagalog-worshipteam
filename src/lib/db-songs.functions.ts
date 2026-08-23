import { supabase } from "@/integrations/supabase/client";
import { WorshipSong, SongLanguage, SongType, SongStatus, SongVisibility } from '@/types/songs';

export async function getSongs(): Promise<WorshipSong[]> {
  const { data, error } = await supabase
    .from('songs')
    .select('*')
    .order('title');

  if (error) throw error;

  return (data || []).map((song: any) => ({
    ...song,
    language: song.language as SongLanguage,
    songType: song.song_type as SongType,
    status: song.status as SongStatus,
    visibility: song.is_public ? 'Public' : 'Team Only',
    scriptureReferences: song.scripture_references as any,
    defaultKey: song.default_key,
    isPublic: song.is_public,
    featured: song.featured,
    createdAt: song.created_at,
    updatedAt: song.updated_at,
  })) as WorshipSong[];
}

export async function archiveSong(input: { data: string } | string) {
  const id = typeof input === 'string' ? input : input.data;
  const { error } = await supabase
    .from('songs')
    .update({ status: 'Archived' })
    .eq('id', id);

  if (error) throw error;
}

export async function createSong(input: { data: Partial<WorshipSong> } | Partial<WorshipSong>) {
  const song = ((input as any)?.data ?? input) as Partial<WorshipSong>;
  
  // Only include columns that exist in the database
  const insertData: any = {
    title: song.title || '',
    artist: song.artist || '',
    songwriter: song.songwriter || null,
    default_key: song.defaultKey || null,
    bpm: song.bpm || null,
    time_signature: song.timeSignature || null,
    language: song.language || 'English',
    song_type: song.songType || 'Worship',
    status: song.status || 'Active',
    is_public: song.visibility === 'Public',
    featured: song.featured || false,
    themes: song.themes || [],
    scripture_references: song.scriptureReferences || [],
    sections: (song as any).sections || [],
    flow: (song as any).flow || [],
    ccli_number: song.ccliNumber || null,
    audio_url: (song as any).audioUrl || null,
    sheet_music_url: (song as any).sheetMusicUrl || null,
    external_resources: (song as any).externalResources || [],
  };
  };

  const { data, error } = await supabase
    .from('songs')
    .insert([insertData])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateSong(input: { data: { id: string; song: Partial<WorshipSong> } } | { id: string; song: Partial<WorshipSong> }) {
  const { id, song } = ((input as any)?.data ?? input) as { id: string; song: Partial<WorshipSong> };
  const updateData: any = {};
  
  if (song.title !== undefined) updateData.title = song.title;
  if (song.artist !== undefined) updateData.artist = song.artist || null;
  if (song.songwriter !== undefined) updateData.songwriter = song.songwriter || null;
  if (song.defaultKey !== undefined) updateData.default_key = song.defaultKey || null;
  if (song.bpm !== undefined) updateData.bpm = song.bpm || null;
  if (song.timeSignature !== undefined) updateData.time_signature = song.timeSignature || null;
  if (song.language !== undefined) updateData.language = song.language;
  if (song.songType !== undefined) updateData.song_type = song.songType;
  if (song.status !== undefined) updateData.status = song.status;
  if (song.visibility !== undefined) {
    updateData.is_public = song.visibility === 'Public';
  }
  if (song.featured !== undefined) updateData.featured = song.featured;
  if (song.themes !== undefined) updateData.themes = song.themes;
  if (song.scriptureReferences !== undefined) updateData.scripture_references = song.scriptureReferences;
  if ((song as any).sections !== undefined) updateData.sections = (song as any).sections;
  if ((song as any).flow !== undefined) updateData.flow = (song as any).flow;
  if (song.ccliNumber !== undefined) updateData.ccli_number = song.ccliNumber || null;
  if ((song as any).audioUrl !== undefined) updateData.audio_url = (song as any).audioUrl || null;
  if ((song as any).sheetMusicUrl !== undefined) updateData.sheet_music_url = (song as any).sheetMusicUrl || null;
  if ((song as any).externalResources !== undefined) updateData.external_resources = (song as any).externalResources || [];

  const { data, error } = await supabase
    .from('songs')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteSong(id: string) {
  const { error } = await supabase
    .from('songs')
    .delete()
    .eq('id', id);

  if (error) throw error;
}
