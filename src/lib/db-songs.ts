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
  const { data, error } = await supabase
    .from('songs')
    .insert([{
      title: song.title,
      artist: song.artist,
      default_key: song.defaultKey,
      bpm: song.bpm,
      time_signature: song.timeSignature,
      language: song.language,
      song_type: song.songType,
      status: song.status,
      themes: song.themes,
      scripture_references: song.scriptureReferences,
      sections: (song as any).sections,
      flow: (song as any).flow
    }])
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const updateSong = async (id: string, song: Partial<WorshipSong>) => {
  const { data, error } = await supabase
    .from('songs')
    .update({
      title: song.title,
      artist: song.artist,
      default_key: song.defaultKey,
      bpm: song.bpm,
      time_signature: song.timeSignature,
      language: song.language,
      song_type: song.songType,
      status: song.status,
      themes: song.themes,
      scripture_references: song.scriptureReferences,
      sections: (song as any).sections,
      flow: (song as any).flow
    })
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};
