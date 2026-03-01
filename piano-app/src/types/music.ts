// Core music theory types

export interface Note {
  name: string;
  octave: number;
  midi: number;
}

export interface Interval {
  name: IntervalName;
  semitones: number;
  displayName: string;
  shortName: string;
}

export type IntervalName =
  | 'unison'
  | 'minor2nd'
  | 'major2nd'
  | 'minor3rd'
  | 'major3rd'
  | 'perfect4th'
  | 'tritone'
  | 'perfect5th'
  | 'minor6th'
  | 'major6th'
  | 'minor7th'
  | 'major7th'
  | 'octave';

export const INTERVALS: Record<IntervalName, Interval> = {
  unison: { name: 'unison', semitones: 0, displayName: 'Unison', shortName: 'P1' },
  minor2nd: { name: 'minor2nd', semitones: 1, displayName: 'Minor 2nd', shortName: 'm2' },
  major2nd: { name: 'major2nd', semitones: 2, displayName: 'Major 2nd', shortName: 'M2' },
  minor3rd: { name: 'minor3rd', semitones: 3, displayName: 'Minor 3rd', shortName: 'm3' },
  major3rd: { name: 'major3rd', semitones: 4, displayName: 'Major 3rd', shortName: 'M3' },
  perfect4th: { name: 'perfect4th', semitones: 5, displayName: 'Perfect 4th', shortName: 'P4' },
  tritone: { name: 'tritone', semitones: 6, displayName: 'Tritone', shortName: 'TT' },
  perfect5th: { name: 'perfect5th', semitones: 7, displayName: 'Perfect 5th', shortName: 'P5' },
  minor6th: { name: 'minor6th', semitones: 8, displayName: 'Minor 6th', shortName: 'm6' },
  major6th: { name: 'major6th', semitones: 9, displayName: 'Major 6th', shortName: 'M6' },
  minor7th: { name: 'minor7th', semitones: 10, displayName: 'Minor 7th', shortName: 'm7' },
  major7th: { name: 'major7th', semitones: 11, displayName: 'Major 7th', shortName: 'M7' },
  octave: { name: 'octave', semitones: 12, displayName: 'Octave', shortName: 'P8' },
};

export type Difficulty = 'beginner' | 'easy' | 'medium' | 'hard';

export const DIFFICULTY_LEVELS: Record<Difficulty, IntervalName[]> = {
  beginner: ['perfect5th', 'octave', 'major3rd', 'perfect4th'],
  easy: ['major2nd', 'major3rd', 'perfect4th', 'perfect5th', 'octave'],
  medium: ['minor2nd', 'major2nd', 'minor3rd', 'major3rd', 'perfect4th', 'perfect5th', 'minor6th', 'major6th', 'octave'],
  hard: ['minor2nd', 'major2nd', 'minor3rd', 'major3rd', 'perfect4th', 'tritone', 'perfect5th', 'minor6th', 'major6th', 'minor7th', 'major7th', 'octave'],
};

export interface IntervalQuestion {
  rootNote: Note;
  targetNote: Note;
  interval: Interval;
}

export interface SessionStats {
  totalQuestions: number;
  correctAnswers: number;
  accuracy: number;
}

export interface AnswerResult {
  correct: boolean;
  question: IntervalQuestion;
  userAnswer: IntervalName;
}
