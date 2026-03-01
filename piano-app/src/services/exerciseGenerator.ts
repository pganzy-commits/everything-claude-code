import type { Note, IntervalName, IntervalQuestion, Difficulty } from '../types/music';
import { INTERVALS, DIFFICULTY_LEVELS } from '../types/music';

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function midiToNote(midi: number): Note {
  const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const octave = Math.floor(midi / 12) - 1;
  const name = noteNames[midi % 12];
  return { name, octave, midi };
}

export function generateIntervalQuestion(difficulty: Difficulty): IntervalQuestion {
  const allowedIntervals = DIFFICULTY_LEVELS[difficulty];
  const intervalName = allowedIntervals[randomInt(0, allowedIntervals.length - 1)];
  const interval = INTERVALS[intervalName];

  // Generate root note in piano range (C3 to C5, MIDI 48-72)
  const maxRoot = 72 - interval.semitones;
  const rootMidi = randomInt(48, Math.min(maxRoot, 72));

  const rootNote = midiToNote(rootMidi);
  const targetNote = midiToNote(rootMidi + interval.semitones);

  return {
    rootNote,
    targetNote,
    interval,
  };
}

export function getIntervalsForDifficulty(difficulty: Difficulty): IntervalName[] {
  return DIFFICULTY_LEVELS[difficulty];
}
