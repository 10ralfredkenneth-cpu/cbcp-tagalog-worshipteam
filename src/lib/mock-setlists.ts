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
        songId: '1',
        order: 1,
        selectedKey: 'G',
        category: 'Opening Praise',
        duration: 6,
        leaderNote: 'Build gradually'
      },
      {
        id: 'sl-2',
        songId: '2',
        order: 2,
        selectedKey: 'D',
        category: 'Thanksgiving',
        duration: 5
      },
      {
        id: 'sl-3',
        songId: '3',
        order: 3,
        selectedKey: 'A',
        category: 'Worship',
        duration: 7,
        transitionNote: 'Transition directly to prayer'
      }
    ],
    items: [
      { id: 'item-1', order: 1, type: 'Custom', title: 'Welcome & Opening Prayer', duration: 3, assignedPerson: 'Pastor John' },
      { id: 'item-2', order: 2, type: 'Custom', title: 'Call to Worship', duration: 2, assignedPerson: 'David Chen' },
      { id: 'item-3', order: 3, type: 'Song', title: 'Holy Forever', duration: 6, songId: '1' },
      { id: 'item-4', order: 4, type: 'Song', title: 'King of Kings', duration: 5, songId: '2' },
      { id: 'item-5', order: 5, type: 'Custom', title: 'Scripture Reading', duration: 3, notes: 'Isaiah 6:1-8' },
      { id: 'item-6', order: 6, type: 'Song', title: 'Great Are You Lord', duration: 7, songId: '3' },
      { id: 'item-7', order: 7, type: 'Custom', title: 'Pastoral Prayer', duration: 5 },
      { id: 'item-8', order: 8, type: 'Custom', title: 'Sermon', duration: 30, assignedPerson: 'Pastor John' },
      { id: 'item-9', order: 9, type: 'Custom', title: 'Benediction', duration: 2 }
    ],
    estimatedDuration: 63,
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
        songId: '4',
        order: 1,
        selectedKey: 'C',
        category: 'Opening Praise',
        duration: 5
      }
    ],
    items: [
      { id: 'item-10', order: 1, type: 'Custom', title: 'Opening Song', duration: 5, songId: '4' },
      { id: 'item-11', order: 2, type: 'Custom', title: 'Prayer Sharing', duration: 15 }
    ],
    estimatedDuration: 20,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

export const SETLIST_TEMPLATES = [
  {
    title: 'Sunday Worship',
    items: [
      { title: 'Welcome', duration: 3 },
      { title: 'Call to Worship', duration: 2 },
      { title: 'Song 1', duration: 5, type: 'Song' },
      { title: 'Song 2', duration: 5, type: 'Song' },
      { title: 'Scripture Reading', duration: 3 },
      { title: 'Song 3', duration: 7, type: 'Song' },
      { title: 'Pastoral Prayer', duration: 5 },
      { title: 'Sermon', duration: 30 },
      { title: 'Closing Song', duration: 5, type: 'Song' },
      { title: 'Benediction', duration: 2 }
    ]
  },
  {
    title: 'Communion Sunday',
    items: [
      { title: 'Welcome', duration: 3 },
      { title: 'Worship Set', duration: 15, type: 'Song' },
      { title: 'Sermon', duration: 25 },
      { title: 'Communion', duration: 15 },
      { title: 'Closing Hymn', duration: 5, type: 'Song' }
    ]
  }
];
