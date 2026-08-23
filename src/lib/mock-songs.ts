import { WorshipSong } from '@/types/songs';

export const MOCK_SONGS: WorshipSong[] = [
  {
    id: '1',
    title: 'Holy Forever',
    artist: 'Chris Tomlin',
    songwriter: 'Chris Tomlin, Phil Wickham, Brian Johnson, Jenn Johnson, Jason Ingram',
    defaultKey: 'G',
    bpm: 72,
    timeSignature: '4/4',
    language: 'English',
    themes: ['Grace', 'Holiness', 'God\'s Faithfulness'],
    scriptureReferences: [
      { reference: 'Revelation 4:8', notes: 'The song echoes the eternal cry of "Holy, Holy, Holy".' },
      { reference: 'Isaiah 6:3' }
    ],
    songType: 'Worship',
    status: 'Active',
    copyrightOwner: 'Capitol CMG Publishing',
    copyrightYear: 2022,
    ccliNumber: '7201044',
    flow: ['Intro', 'Verse 1', 'Chorus', 'Verse 2', 'Chorus', 'Bridge', 'Chorus', 'Outro'],
    sections: [
      {
        type: 'Intro',
        lines: [{ type: 'chords', content: 'G / / / | C / / / | Em / / / | D / / /' }]
      },
      {
        type: 'Verse 1',
        lines: [
          { type: 'chords', content: 'G           C' },
          { type: 'lyrics', content: 'A thousand generations falling down in worship' },
          { type: 'chords', content: 'Em          D           C' },
          { type: 'lyrics', content: 'To sing the song of ages to the Lamb' }
        ]
      },
      {
        type: 'Chorus',
        lines: [
          { type: 'chords', content: 'C               G' },
          { type: 'lyrics', content: 'And the angels cry, Holy' },
          { type: 'chords', content: 'Em              D' },
          { type: 'lyrics', content: 'All creation sings, Holy' },
          { type: 'chords', content: 'C               Em' },
          { type: 'lyrics', content: 'You are lifted high, Holy' },
          { type: 'chords', content: 'D               G' },
          { type: 'lyrics', content: 'Holy forever' }
        ]
      }
    ],
    worshipLeaderNotes: ['Start softly with keys only', 'Build gradually into the first chorus'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'King of Kings',
    artist: 'Hillsong Worship',
    songwriter: 'Brooke Ligertwood, Jason Ingram, Scott Ligertwood',
    defaultKey: 'D',
    bpm: 68,
    timeSignature: '4/4',
    language: 'English',
    themes: ['Resurrection', 'Gospel', 'Salvation'],
    scriptureReferences: [{ reference: '1 Corinthians 15:57' }, { reference: 'Revelation 19:16' }],
    songType: 'Praise',
    status: 'Active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Great Are You Lord',
    artist: 'All Sons & Daughters',
    songwriter: 'David Leonard, Jason Ingram, Leslie Jordan',
    defaultKey: 'A',
    bpm: 72,
    timeSignature: '6/8',
    language: 'English',
    themes: ['Praise', 'Faith', 'Surrender'],
    scriptureReferences: [{ reference: 'Psalm 145:3' }, { reference: 'Ezekiel 37:9' }],
    songType: 'Worship',
    status: 'Active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'Purihin ang Panginoon',
    artist: 'Traditional',
    defaultKey: 'C',
    bpm: 100,
    timeSignature: '4/4',
    language: 'Filipino/Tagalog',
    themes: ['Praise', 'Thanksgiving'],
    scriptureReferences: [{ reference: 'Psalm 100' }],
    songType: 'Opening',
    status: 'Active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];
