import { createServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import { WorshipSong, SongLanguage, SongType, SongStatus, SongVisibility } from '@/types/songs';

export const getSongs = createServerFn({ method: "GET" })
  .handler(async () => {
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
    visibility: song.visibility as SongVisibility,
    scriptureReferences: song.scripture_references as any,
    defaultKey: song.default_key,
    isPublic: song.is_public,
    featured: song.featured,
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
    songwriter: song.songwriter || null,
    default_key: song.defaultKey || null,
    bpm: song.bpm || null,
    time_signature: song.timeSignature || null,
    language: song.language || 'English',
    song_type: song.songType || 'Worship',
    status: song.status || 'Active',
    visibility: song.visibility || 'Public',
    is_public: song.visibility === 'Public',
    featured: song.featured || false,
    themes: song.themes || null,
    scripture_references: song.scriptureReferences || null,
    sections: (song as any).sections || null,
    flow: (song as any).flow || null,
    lyrics: (song as any).lyrics || null,
    chords: (song as any).chords || null,
    copyright_notes: (song as any).copyrightNotes || null,
    ccli_number: song.ccliNumber || null,
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
  if (song.songwriter !== undefined) updateData.songwriter = song.songwriter || null;
  if (song.defaultKey !== undefined) updateData.default_key = song.defaultKey || null;
  if (song.bpm !== undefined) updateData.bpm = song.bpm || null;
  if (song.timeSignature !== undefined) updateData.time_signature = song.timeSignature || null;
  if (song.language !== undefined) updateData.language = song.language;
  if (song.songType !== undefined) updateData.song_type = song.songType;
  if (song.status !== undefined) updateData.status = song.status;
  if (song.visibility !== undefined) {
    updateData.visibility = song.visibility;
    updateData.is_public = song.visibility === 'Public';
  }
  if (song.featured !== undefined) updateData.featured = song.featured;
  if (song.themes !== undefined) updateData.themes = song.themes || null;
  if (song.scriptureReferences !== undefined) updateData.scripture_references = song.scriptureReferences || null;
  if ((song as any).sections !== undefined) updateData.sections = (song as any).sections || null;
  if ((song as any).flow !== undefined) updateData.flow = (song as any).flow || null;
  if ((song as any).lyrics !== undefined) updateData.lyrics = (song as any).lyrics || null;
  if ((song as any).chords !== undefined) updateData.chords = (song as any).chords || null;
  if ((song as any).copyrightNotes !== undefined) updateData.copyright_notes = (song as any).copyrightNotes || null;
  if (song.ccliNumber !== undefined) updateData.ccli_number = song.ccliNumber || null;

  const { data, error } = await supabase
    .from('songs')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};
