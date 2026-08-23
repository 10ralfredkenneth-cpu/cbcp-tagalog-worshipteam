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
