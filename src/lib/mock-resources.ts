import { WorshipResource } from '@/types/resources';

export const MOCK_RESOURCES: WorshipResource[] = [
  {
    id: '1',
    slug: 'heart-of-a-worshipper',
    title: 'The Heart of a Worshipper',
    description: 'A deep dive into the spiritual posture required for leading and participating in worship.',
    category: 'Spiritual Formation',
    resourceType: 'Devotional',
    author: 'Pastor David Thompson',
    coverImage: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?q=80&w=1200&auto=format&fit=crop',
    scriptureReferences: ['Psalm 51:10-12', 'John 4:23-24'],
    tags: ['Heart', 'Purity', 'Preparation'],
    ministryRoles: ['All Team Members'],
    readingTime: 8,
    featured: true,
    status: 'Published',
    publishedAt: '2026-08-01T09:00:00Z',
    content: `
      <h2>The Foundation of Worship</h2>
      <p>True worship begins not with the voice or the instrument, but with a heart that is fully surrendered to God. As worship leaders and team members, we must first be worshippers in the secret place before we can lead others in the public space.</p>
      <h3>Reflecting on Psalm 51</h3>
      <p>"Create in me a pure heart, O God, and renew a steadfast spirit within me." This prayer of David is essential for anyone serving in ministry. We cannot give what we do not have.</p>
      <blockquote>"God is spirit, and his worshipers must worship in the Spirit and in truth." — John 4:24</blockquote>
      <h3>Application</h3>
      <p>Spend 15 minutes today in silent prayer, asking God to reveal any areas of your heart that are not aligned with His will. Worship Him without music, focusing solely on His character.</p>
    `,
    createdAt: '2026-08-01T09:00:00Z',
    updatedAt: '2026-08-01T09:00:00Z',
  },
  {
    id: '2',
    slug: 'vocal-care-basics',
    title: 'Vocal Care & Longevity',
    description: 'Essential practices for singers to maintain vocal health and lead with excellence.',
    category: 'Vocal Training',
    resourceType: 'Training',
    author: 'Sarah Jenkins',
    coverImage: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=1200&auto=format&fit=crop',
    tags: ['Vocals', 'Health', 'Technique'],
    ministryRoles: ['Vocalist', 'Worship Leader'],
    readingTime: 12,
    featured: false,
    status: 'Published',
    publishedAt: '2026-08-05T10:00:00Z',
    content: `
      <h2>Preserving Your Instrument</h2>
      <p>Your voice is a gift, and like any instrument, it requires proper care and maintenance. In this guide, we explore hydration, warm-up routines, and the importance of rest.</p>
      <h3>Hydration</h3>
      <p>Drinking water isn't just about your throat; it's about your entire system. Aim for consistent hydration throughout the day, not just during rehearsal.</p>
      <h3>The Importance of Warm-ups</h3>
      <p>Never start singing at full volume. Begin with gentle humming and lip trills to wake up the vocal folds.</p>
    `,
    createdAt: '2026-08-05T10:00:00Z',
    updatedAt: '2026-08-05T10:00:00Z',
  },
  {
    id: '3',
    slug: 'sound-mixing-fundamentals',
    title: 'Sound Mixing Fundamentals',
    description: 'A guide for technical teams on creating a balanced and reverent sound environment.',
    category: 'Sound & Technical',
    resourceType: 'Guide',
    author: 'Grace Park',
    coverImage: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1200&auto=format&fit=crop',
    tags: ['Sound', 'Mixing', 'Tech'],
    ministryRoles: ['Sound Engineer', 'Technical Team'],
    readingTime: 15,
    featured: true,
    status: 'Published',
    publishedAt: '2026-08-10T14:00:00Z',
    content: `
      <h2>The Art of Invisible Service</h2>
      <p>A sound engineer's greatest success is when the congregation forgets they are there. We serve to remove distractions, not to draw attention to the technology.</p>
      <h3>Gain Structure</h3>
      <p>Proper gain setting is the foundation of a clean mix. Start with the preamp, then move to the faders.</p>
      <h3>EQ for Clarity</h3>
      <p>Subtract before you add. Use high-pass filters to clean up low-end mud from instruments that don't need it.</p>
    `,
    createdAt: '2026-08-10T14:00:00Z',
    updatedAt: '2026-08-10T14:00:00Z',
  },
  {
    id: '4',
    slug: 'biblical-leadership-worship',
    title: 'Leading Biblically',
    description: 'Understanding the pastoral weight of the worship leader role.',
    category: 'Worship Leadership',
    resourceType: 'Lesson',
    author: 'Pastor David Thompson',
    coverImage: 'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?q=80&w=1200&auto=format&fit=crop',
    scriptureReferences: ['1 Peter 5:2-3', 'Hebrews 13:15'],
    tags: ['Leadership', 'Theology', 'Service'],
    ministryRoles: ['Worship Leader', 'Assistant Worship Leader'],
    readingTime: 10,
    featured: false,
    status: 'Published',
    publishedAt: '2026-08-12T08:00:00Z',
    content: `
      <h2>More Than a Singer</h2>
      <p>A worship leader is a shepherd. You are leading the sheep into the presence of the Good Shepherd. This requires humility, preparation, and a love for the people.</p>
      <h3>Shepherding Through Song</h3>
      <p>Every song choice is a theological statement. What are you teaching the congregation through the lyrics you select?</p>
    `,
    createdAt: '2026-08-12T08:00:00Z',
    updatedAt: '2026-08-12T08:00:00Z',
  }
];
