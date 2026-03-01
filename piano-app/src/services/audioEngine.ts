import * as Tone from 'tone';
import type { Note } from '../types/music';

class AudioEngine {
  private synth: Tone.PolySynth | null = null;
  private initialized = false;

  async initialize(): Promise<void> {
    if (this.initialized) return;

    await Tone.start();
    this.synth = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: 'triangle' },
      envelope: {
        attack: 0.02,
        decay: 0.3,
        sustain: 0.4,
        release: 1,
      },
    }).toDestination();

    this.initialized = true;
  }

  private midiToNoteName(midi: number): string {
    const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const octave = Math.floor(midi / 12) - 1;
    const noteName = noteNames[midi % 12];
    return `${noteName}${octave}`;
  }

  async playNote(note: Note, duration: number = 1): Promise<void> {
    if (!this.initialized) {
      await this.initialize();
    }

    const noteName = this.midiToNoteName(note.midi);
    this.synth?.triggerAttackRelease(noteName, duration);
  }

  async playInterval(rootNote: Note, targetNote: Note, delay: number = 0.6): Promise<void> {
    if (!this.initialized) {
      await this.initialize();
    }

    const rootName = this.midiToNoteName(rootNote.midi);
    const targetName = this.midiToNoteName(targetNote.midi);

    const now = Tone.now();
    this.synth?.triggerAttackRelease(rootName, 1, now);
    this.synth?.triggerAttackRelease(targetName, 1, now + delay);
  }

  dispose(): void {
    this.synth?.dispose();
    this.synth = null;
    this.initialized = false;
  }
}

export const audioEngine = new AudioEngine();
