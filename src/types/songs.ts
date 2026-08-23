export type SongStatus = 'Active' | 'Learning' | 'Archived';
export type SongType = 'Opening' | 'Praise' | 'Worship' | 'Response' | 'Communion' | 'Offering' | 'Closing';
export type SongLanguage = 'English' | 'Filipino/Tagalog' | 'Cebuano/Bisaya' | 'Other';

export interface WorshipSong {
  id: string;
  title: string;
  artist: string;
  songwriter?: string;
  defaultKey: string;
  bpm?: number;
  timeSignature?: string;
  language: SongLanguage;
  themes: string[];
  scriptureReferences: string[];
  songType: SongType;
  status: SongStatus;
  artworkUrl?: string;
  lyrics?: string;
  chords?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}
