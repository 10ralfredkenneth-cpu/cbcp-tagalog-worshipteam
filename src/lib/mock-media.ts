import { MediaItem, MediaAlbum } from '@/types/media';

export const MOCK_ALBUMS: MediaAlbum[] = [
  {
    id: 'a1',
    title: 'Sunday Worship Highlights',
    description: 'Moments from our recent Sunday morning services.',
    coverImageUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80',
    date: '2024-03-10',
    mediaCount: 24,
    category: 'Worship Service',
    featured: true
  },
  {
    id: 'a2',
    title: 'Worship Night 2024',
    description: 'An evening of deep prayer and adoration.',
    coverImageUrl: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&q=80',
    date: '2024-02-15',
    mediaCount: 18,
    category: 'Worship Night',
    featured: true
  },
  {
    id: 'a3',
    title: 'Team Retreat',
    description: 'Building fellowship and vision for the new season.',
    coverImageUrl: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80',
    date: '2024-01-20',
    mediaCount: 42,
    category: 'Team Activity',
    featured: false
  }
];

export const MOCK_MEDIA: MediaItem[] = [
  {
    id: 'm1',
    title: 'Opening Prayer - Mar 10',
    description: 'Pastor Sarah leading the congregation in opening prayer.',
    mediaType: 'Photo',
    fileUrl: 'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?auto=format&fit=crop&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?auto=format&fit=crop&q=80',
    category: 'Worship Service',
    albumId: 'a1',
    eventDate: '2024-03-10',
    tags: ['prayer', 'worship', 'sarah'],
    visibility: 'Public',
    featured: true,
    createdAt: '2024-03-10T10:00:00Z'
  },
  {
    id: 'm2',
    title: 'Way Maker - Special Arrangement',
    description: 'Full video recording of the Sunday morning anthem.',
    mediaType: 'Video',
    fileUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80',
    category: 'Worship Service',
    albumId: 'a1',
    eventDate: '2024-03-10',
    tags: ['video', 'song', 'way-maker'],
    duration: '6:45',
    visibility: 'Public',
    featured: true,
    relatedSongId: '1',
    createdAt: '2024-03-10T11:00:00Z'
  },
  {
    id: 'm3',
    title: 'Acoustic Guitar Rehearsal',
    description: 'Practice track for the upcoming Sunday service.',
    mediaType: 'Audio',
    fileUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    category: 'Rehearsal',
    eventDate: '2024-03-07',
    tags: ['audio', 'guitar', 'practice'],
    duration: '4:20',
    visibility: 'Worship Team',
    featured: false,
    relatedSongId: '2',
    createdAt: '2024-03-07T18:00:00Z'
  },
  {
    id: 'm4',
    title: 'Worship Leader Guide - Spring 2024',
    description: 'Essential guidelines for leading worship this season.',
    mediaType: 'Document',
    fileUrl: '#',
    category: 'Ministry File',
    eventDate: '2024-03-01',
    tags: ['pdf', 'guide', 'leadership'],
    fileType: 'pdf',
    fileSize: '2.4 MB',
    author: 'David Chen',
    visibility: 'Worship Team',
    featured: false,
    createdAt: '2024-03-01T09:00:00Z'
  },
  {
    id: 'm5',
    title: 'Drum Soundcheck',
    description: 'High quality audio from the drum booth.',
    mediaType: 'Audio',
    fileUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    category: 'Training',
    eventDate: '2024-03-05',
    tags: ['audio', 'drums', 'tech'],
    duration: '3:15',
    visibility: 'Worship Team',
    featured: false,
    createdAt: '2024-03-05T15:30:00Z'
  },
  {
    id: 'm6',
    title: 'Tech Booth Setup',
    description: 'View of the FOH console during soundcheck.',
    mediaType: 'Photo',
    fileUrl: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80',
    category: 'Training',
    eventDate: '2024-03-05',
    tags: ['tech', 'mixing', 'console'],
    visibility: 'Public',
    featured: false,
    createdAt: '2024-03-05T16:00:00Z'
  }
];
