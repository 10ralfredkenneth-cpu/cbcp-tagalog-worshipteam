import { WorshipSetlist } from '@/types/setlists';

export const MOCK_SETLISTS: WorshipSetlist[] = [
  {
    id: '1',
    title: 'Morning Worship: The Holiness of God',
    serviceDate: '2026-08-30',
    serviceTime: '09:00 AM',
    serviceType: 'Sunday Worship',
    worshipLeader: 'David Chen',
    theme: 'The Holiness of God',
    scriptureReference: 'Isaiah 6:1-8',
    notes: 'Focus on reverence and awe. Start with a quiet piano intro.',
    status: 'Ready',
    songs: [
      {
        id: 'sl-1',
        songId: '1', // Holy Forever
        order: 1,
        selectedKey: 'G',
        category: 'Opening Praise',
        duration: 6,
        leaderNote: 'Build gradually'
      },
      {
        id: 'sl-2',
        songId: '2', // King of Kings
        order: 2,
        selectedKey: 'D',
        category: 'Thanksgiving',
        duration: 5
      },
      {
        id: 'sl-3',
        songId: '3', // Great Are You Lord
        order: 3,
        selectedKey: 'A',
        category: 'Worship',
        duration: 7,
        transitionNote: 'Transition directly to prayer'
      }
    ],
    estimatedDuration: 18,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Midweek Prayer & Praise',
    serviceDate: '2026-09-02',
    serviceTime: '07:00 PM',
    serviceType: 'Midweek Service',
    worshipLeader: 'Sarah Jenkins',
    theme: 'Faithfulness',
    status: 'Draft',
    songs: [
      {
        id: 'sl-4',
        songId: '4', // Purihin ang Panginoon
        order: 1,
        selectedKey: 'C',
        category: 'Opening Praise',
        duration: 5
      }
    ],
    estimatedDuration: 5,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];
