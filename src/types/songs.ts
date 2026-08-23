export type SongStatus = 'Active' | 'Learning' | 'Archived';
export type SongType = 'Opening' | 'Praise' | 'Worship' | 'Response' | 'Communion' | 'Offering' | 'Closing';
export type SongLanguage = 'English' | 'Filipino/Tagalog' | 'Cebuano/Bisaya' | 'Other';

export interface ChordLine {
  type: 'chords' | 'lyrics' | 'both';
  content: string;
}

export interface SongSection {
  type: 'Intro' | 'Verse' | 'Pre-Chorus' | 'Chorus' | 'Bridge' | 'Instrumental' | 'Outro';
  label?: string;
  lines: ChordLine[];
}

export interface ScriptureReference {
  reference: string;
  notes?: string;
}

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
  scriptureReferences: ScriptureReference[];
  songType: SongType;
  status: SongStatus;
  artworkUrl?: string;
  sections?: SongSection[];
  flow?: string[];
  worshipLeaderNotes?: string[];
  isFavorite?: boolean;
  lastUsed?: string;
  usageCount?: number;
  copyrightOwner?: string;
  copyrightYear?: number;
  ccliNumber?: string;
  publicDomain?: boolean;
  createdAt: string;
  updatedAt: string;
}

