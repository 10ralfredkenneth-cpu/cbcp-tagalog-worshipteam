import { SongLanguage, SongType, SongStatus, ScriptureReference, SongSection } from './songs';

export type SetlistStatus = 'Draft' | 'Preparing' | 'Ready' | 'Completed' | 'Archived';

export type ServiceType = 
  | 'Sunday Worship' 
  | 'Prayer Meeting' 
  | 'Youth Worship' 
  | 'Midweek Service' 
  | 'Communion' 
  | 'Special Event' 
  | 'Conference' 
  | 'Fellowship';

export type WorshipFlowCategory = 
  | 'Call to Worship'
  | 'Opening Praise'
  | 'Celebration'
  | 'Thanksgiving'
  | 'Worship'
  | 'Prayer'
  | 'Offering'
  | 'Communion'
  | 'Response'
  | 'Preparation for the Word'
  | 'Closing';

export type ServiceItemType = 'Song' | 'Custom';

export interface SetlistSong {
  id: string;
  songId: string;
  order: number;
  selectedKey: string;
  category: WorshipFlowCategory;
  duration?: number; // in minutes
  transitionNote?: string;
  leaderNote?: string;
  musicianNotes?: string;
}

export interface ServiceItem {
  id: string;
  order: number;
  type: ServiceItemType;
  title: string;
  assignedPerson?: string;
  duration?: number;
  notes?: string;
  songId?: string; // Only if type is 'Song'
}

export interface WorshipSetlist {
  id: string;
  title: string;
  serviceDate: string;
  serviceTime: string;
  serviceType: ServiceType;
  worshipLeader: string;
  theme?: string;
  scriptureReference?: string;
  notes?: string;
  status: SetlistStatus;
  songs: SetlistSong[];
  estimatedDuration?: number; // Calculated field
  createdAt: string;
  updatedAt: string;
}
