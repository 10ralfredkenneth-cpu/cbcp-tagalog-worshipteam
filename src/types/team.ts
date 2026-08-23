export type TeamMemberStatus = 'Active' | 'Available' | 'Limited Availability' | 'On Break' | 'Inactive';

export type TeamRole = 
  | 'Worship Leader'
  | 'Assistant Worship Leader'
  | 'Vocalist'
  | 'Acoustic Guitar'
  | 'Electric Guitar'
  | 'Bass'
  | 'Keyboard'
  | 'Piano'
  | 'Drums'
  | 'Percussion'
  | 'Sound Engineer'
  | 'Multimedia'
  | 'Livestream'
  | 'Stage Manager'
  | 'Technical Team';

export type TeamSkill = 
  | 'Lead Vocal'
  | 'Backing Vocal'
  | 'Soprano'
  | 'Alto'
  | 'Tenor'
  | 'Acoustic Guitar'
  | 'Electric Guitar'
  | 'Bass'
  | 'Keyboard'
  | 'Drums'
  | 'Sound'
  | 'Multimedia';

export interface TeamMember {
  id: string;
  fullName: string;
  photoUrl: string;
  primaryRole: TeamRole;
  secondaryRoles: TeamRole[];
  instrument?: string;
  vocalRange?: string;
  status: TeamMemberStatus;
  bio?: string;
  email?: string; // Private
  phone?: string; // Private
  internalNotes?: string; // Private
  emergencyContact?: string; // Private
  dateJoined: string;
  skills: TeamSkill[];
  groups: string[];
  createdAt: string;
  updatedAt: string;
}
