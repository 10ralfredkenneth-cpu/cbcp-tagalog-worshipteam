export const KEYS = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

export function transposeChord(chord: string, semitones: number): string {
  if (!chord) return chord;
  
  // Regex to match the base note and the rest of the chord
  // Supports major, minor, sus, 7, etc. e.g., C#m7, Bb, Gsus4
  const match = chord.match(/^([A-G][#b]?)(.*)$/);
  if (!match) return chord;
  
  const baseNote = match[1];
  const suffix = match[2];
  
  // Normalize flats to sharps for lookup
  const normalized = normalizeNote(baseNote);
  const index = KEYS.indexOf(normalized);
  
  if (index === -1) return chord;
  
  let newIndex = (index + semitones) % 12;
  if (newIndex < 0) newIndex += 12;
  
  const newNote = KEYS[newIndex];
  
  // Heuristic: If we are transposing to a key that typically uses flats, 
  // we could improve this, but for now we stick to sharps/naturals as defined in KEYS.
  return newNote + suffix;
}

function normalizeNote(note: string): string {
  switch (note) {
    case 'Bb': return 'A#';
    case 'Db': return 'C#';
    case 'Eb': return 'D#';
    case 'Gb': return 'F#';
    case 'Ab': return 'G#';
    default: return note;
  }
}

export function getSemitoneDifference(fromKey: string, toKey: string): number {
  const from = normalizeNote(fromKey.replace('m', ''));
  const to = normalizeNote(toKey.replace('m', ''));
  
  const fromIdx = KEYS.indexOf(from);
  const toIdx = KEYS.indexOf(to);
  
  if (fromIdx === -1 || toIdx === -1) return 0;
  
  let diff = toIdx - fromIdx;
  return diff;
}
