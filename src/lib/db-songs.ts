import { WorshipSong, SongLanguage, SongType, SongStatus } from '@/types/songs';
import { supabase } from '@/integrations/supabase/client';

export const getSongs = async () => {
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
    scriptureReferences: song.scripture_references as any,
    defaultKey: song.default_key,
    createdAt: song.created_at,
    updatedAt: song.updated_at,
  })) as WorshipSong[];
};

export const archiveSong = async (id: string) => {
  const { error } = await supabase
    .from('songs')
    .update({ status: 'Archived' })
    .eq('id', id);
  
  if (error) throw error;
};

export const createSong = async (song: Partial<WorshipSong>) => {
  const insertData: any = {
    title: song.title || '',
    artist: song.artist || '',
    default_key: song.defaultKey || null,
    bpm: song.bpm || null,
    time_signature: song.timeSignature || null,
    language: song.language || 'English',
    song_type: song.songType || 'Worship',
    status: song.status || 'Active',
    themes: song.themes || null,
    scripture_references: song.scriptureReferences || null,
    sections: (song as any).sections || null,
    flow: (song as any).flow || null
  };

  const { data, error } = await supabase
    .from('songs')
    .insert([insertData])
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const updateSong = async (id: string, song: Partial<WorshipSong>) => {
  const updateData: any = {};
  if (song.title !== undefined) updateData.title = song.title;
  if (song.artist !== undefined) updateData.artist = song.artist || null;
  if (song.defaultKey !== undefined) updateData.default_key = song.defaultKey || null;
  if (song.bpm !== undefined) updateData.bpm = song.bpm || null;
  if (song.timeSignature !== undefined) updateData.time_signature = song.timeSignature || null;
  if (song.language !== undefined) updateData.language = song.language;
  if (song.songType !== undefined) updateData.song_type = song.songType;
  if (song.status !== undefined) updateData.status = song.status;
  if (song.themes !== undefined) updateData.themes = song.themes || null;
  if (song.scriptureReferences !== undefined) updateData.scripture_references = song.scriptureReferences || null;
  if ((song as any).sections !== undefined) updateData.sections = (song as any).sections || null;
  if ((song as any).flow !== undefined) updateData.flow = (song as any).flow || null;

  const { data, error } = await supabase
    .from('songs')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};
