# Piano Ear Training Application - Architecture Document

> **Version:** 1.0.0
> **Last Updated:** 2026-01-21
> **Status:** Living Document - Guide for Development

---

## Table of Contents

1. [System Overview](#1-system-overview)
2. [Module Breakdown](#2-module-breakdown)
3. [Technical Architecture](#3-technical-architecture)
4. [Data Models](#4-data-models)
5. [Audio System Design](#5-audio-system-design)
6. [UI/UX Architecture](#6-uiux-architecture)
7. [Implementation Phases](#7-implementation-phases)
8. [Future Considerations](#8-future-considerations)

---

## 1. System Overview

### 1.1 Vision Statement

A piano training application that teaches **musical freedom** through systematic ear training and harmony understanding. Unlike traditional apps that focus on note-reading or isolated skill drills, this app emphasizes the *relationship* between sounds—helping musicians internalize harmony so deeply that improvisation and composition become intuitive.

### 1.2 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              USER INTERFACE                                  │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────────────────┐│
│  │   Practice  │ │   Exercise  │ │  Progress   │ │     Settings/Profile    ││
│  │   Dashboard │ │   Player    │ │   Tracker   │ │                         ││
│  └─────────────┘ └─────────────┘ └─────────────┘ └─────────────────────────┘│
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                    ┌─────────────────┼─────────────────┐
                    │                 │                 │
                    ▼                 ▼                 ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                           APPLICATION LAYER                                  │
│  ┌─────────────────────┐ ┌─────────────────────┐ ┌─────────────────────────┐│
│  │   ExerciseEngine    │ │   ProgressEngine    │ │    GamificationEngine   ││
│  │   - Module Router   │ │   - Score Tracking  │ │    - Achievements       ││
│  │   - Question Gen    │ │   - Analytics       │ │    - Streaks            ││
│  │   - Answer Eval     │ │   - Recommendations │ │    - Rewards            ││
│  └─────────────────────┘ └─────────────────────┘ └─────────────────────────┘│
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                    ┌─────────────────┼─────────────────┐
                    │                 │                 │
                    ▼                 ▼                 ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                             CORE SERVICES                                    │
│  ┌─────────────────────┐ ┌─────────────────────┐ ┌─────────────────────────┐│
│  │    AudioEngine      │ │  MusicTheoryEngine  │ │    StorageService       ││
│  │    (Tone.js)        │ │    (Tonal.js)       │ │    (localStorage)       ││
│  │   - Playback        │ │   - Intervals       │ │   - User Progress       ││
│  │   - Sampling        │ │   - Chords          │ │   - Settings            ││
│  │   - Effects         │ │   - Progressions    │ │   - Session Data        ││
│  │   - Scheduling      │ │   - Scale Analysis  │ │   - Exercise History    ││
│  └─────────────────────┘ └─────────────────────┘ └─────────────────────────┘│
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                          TRAINING MODULES                                    │
│  ┌───────────┐ ┌───────────┐ ┌───────────┐ ┌───────────┐ ┌───────────────┐ │
│  │ Intervals │ │  Chords   │ │Progressions│ │  Harmony  │ │ Improvisation │ │
│  └───────────┘ └───────────┘ └───────────┘ └───────────┘ └───────────────┘ │
│  ┌───────────┐ ┌───────────┐ ┌───────────────────────────────────────────┐ │
│  │Functional │ │Kinesthetic│ │              Song Learning                │ │
│  │  Harmony  │ │   Coord   │ │                                           │ │
│  └───────────┘ └───────────┘ └───────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 1.3 Core Design Principles

| Principle | Description |
|-----------|-------------|
| **Contextual Learning** | Skills are always practiced in musical context, not isolation |
| **Progressive Complexity** | Each module builds systematically from simple to complex |
| **Active Recall** | Emphasis on recognition and production, not passive listening |
| **Immediate Feedback** | Users know instantly if they're correct, with educational explanations |
| **Spaced Repetition** | Weak areas surface more frequently for reinforcement |
| **Musical Authenticity** | Exercises use real musical patterns, not contrived examples |
| **Gamified Motivation** | Achievements, streaks, and progress visualization drive engagement |

### 1.4 Technology Stack

```
Frontend Framework:    React 18+ with TypeScript 5+
Styling:              Tailwind CSS 3+
Audio Engine:         Tone.js 14+
Music Theory:         Tonal.js 4+
State Management:     Zustand (lightweight, TypeScript-friendly)
Build Tool:           Vite
Testing:              Vitest + React Testing Library
Data Persistence:     localStorage (Phase 1), IndexedDB (Phase 2)
```

---

## 2. Module Breakdown

### 2.1 Module Dependency Graph

```
                    ┌─────────────────────┐
                    │  Interval           │ ◄─── Foundation
                    │  Recognition        │
                    └──────────┬──────────┘
                               │
              ┌────────────────┼────────────────┐
              │                │                │
              ▼                ▼                ▼
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│     Chord       │ │   Progression   │ │   Functional    │
│   Recognition   │ │   Recognition   │ │   Harmony       │
└────────┬────────┘ └────────┬────────┘ └────────┬────────┘
         │                   │                    │
         └───────────────────┼────────────────────┘
                             │
                             ▼
                    ┌─────────────────────┐
                    │  Harmony Training   │ ◄─── Core Innovation
                    │  (3 Stages)         │
                    └──────────┬──────────┘
                               │
              ┌────────────────┼────────────────┐
              │                │                │
              ▼                ▼                ▼
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│   Kinesthetic   │ │ Improvisation   │ │     Song        │
│   Coordination  │ │  Frameworks     │ │    Learning     │
└─────────────────┘ └─────────────────┘ └─────────────────┘
```

---

### 2.2 Module: Interval Recognition

#### Purpose & Learning Goals
Train the ear to instantly identify the distance between any two notes, the fundamental building block of all musical perception.

**Learning Progression:**
1. Major/Minor 2nds and 3rds (most common melodic intervals)
2. Perfect 4ths and 5ths (harmonic anchors)
3. Major/Minor 6ths and 7ths
4. Tritone (augmented 4th / diminished 5th)
5. Compound intervals (9ths, 10ths, etc.)

#### Key Components

```typescript
// Component Structure
IntervalModule/
├── IntervalExercise.tsx        // Main exercise container
├── IntervalPlayer.tsx          // Audio playback controls
├── IntervalSelector.tsx        // Answer selection UI
├── IntervalVisualizer.tsx      // Optional: keyboard/staff visualization
├── IntervalSettings.tsx        // Exercise configuration
└── hooks/
    └── useIntervalExercise.ts  // Exercise state management
```

#### Data Structures

```typescript
interface IntervalExercise {
  id: string;
  type: 'ascending' | 'descending' | 'harmonic' | 'melodic';
  rootNote: Note;
  targetNote: Note;
  interval: IntervalName;
  difficulty: DifficultyLevel;
}

interface IntervalSettings {
  enabledIntervals: IntervalName[];
  playbackMode: 'ascending' | 'descending' | 'both' | 'harmonic';
  rootNoteRange: NoteRange;
  showKeyboardHint: boolean;
  autoAdvance: boolean;
}
```

#### Dependencies
- **AudioEngine**: Play interval sounds
- **MusicTheoryEngine**: Generate and validate intervals

---

### 2.3 Module: Chord Recognition

#### Purpose & Learning Goals
Identify chord qualities (major, minor, diminished, etc.) and eventually voicings/inversions.

**Learning Progression:**
1. Major vs Minor triads
2. Diminished and Augmented triads
3. Dominant 7th chords
4. Major 7th and Minor 7th chords
5. Extended chords (9ths, 11ths, 13ths)
6. Altered chords and suspensions
7. Inversions and voicings

#### Key Components

```typescript
ChordModule/
├── ChordExercise.tsx
├── ChordPlayer.tsx
├── ChordSelector.tsx
├── ChordDiagram.tsx            // Visual chord representation
├── VoicingExplorer.tsx         // Interactive voicing comparison
├── ChordSettings.tsx
└── hooks/
    └── useChordExercise.ts
```

#### Data Structures

```typescript
interface ChordExercise {
  id: string;
  chord: Chord;
  voicing: ChordVoicing;
  inversion: 0 | 1 | 2 | 3;
  playbackStyle: 'blocked' | 'arpeggiated' | 'both';
  difficulty: DifficultyLevel;
}

interface ChordSettings {
  enabledQualities: ChordQuality[];
  enabledExtensions: ChordExtension[];
  includeInversions: boolean;
  voicingStyle: 'close' | 'open' | 'drop2' | 'any';
  octaveRange: [number, number];
}
```

#### Dependencies
- **AudioEngine**: Play chord voicings
- **MusicTheoryEngine**: Generate chords, validate answers
- **Interval Recognition**: Prerequisite skills unlocked

---

### 2.4 Module: Progression Recognition

#### Purpose & Learning Goals
Understand how chords relate to each other in sequence—the foundation of harmonic hearing.

**Learning Progression:**
1. Two-chord progressions (I-V, I-IV, etc.)
2. Basic three-chord songs (I-IV-V)
3. Diatonic progressions in major keys
4. Minor key progressions
5. Secondary dominants and borrowed chords
6. Jazz progressions (ii-V-I, turnarounds)
7. Modal interchange

#### Key Components

```typescript
ProgressionModule/
├── ProgressionExercise.tsx
├── ProgressionPlayer.tsx
├── RomanNumeralSelector.tsx    // I, ii, IV, V7, etc.
├── ProgressionVisualizer.tsx   // Timeline/flow view
├── ProgressionBuilder.tsx      // Interactive progression creation
├── ProgressionSettings.tsx
└── hooks/
    └── useProgressionExercise.ts
```

#### Data Structures

```typescript
interface ProgressionExercise {
  id: string;
  key: Key;
  chords: ChordInKey[];
  romanNumerals: RomanNumeral[];
  style: 'pop' | 'jazz' | 'classical' | 'blues';
  tempo: number;
  difficulty: DifficultyLevel;
}

interface ChordInKey {
  chord: Chord;
  romanNumeral: RomanNumeral;
  function: HarmonicFunction; // 'tonic' | 'subdominant' | 'dominant' | 'predominant'
  beat: number;
  duration: number;
}
```

#### Dependencies
- **Chord Recognition**: Must identify individual chords first
- **MusicTheoryEngine**: Key analysis, Roman numeral mapping

---

### 2.5 Module: Harmony Training (Core Innovation)

This is the **heart of the application**—teaching users to hear melody *in context* of harmony.

#### Stage 1: Melody-Over-Harmony Listening

**Purpose:** Develop awareness of how melody notes relate to underlying chords.

```typescript
interface HarmonyStage1Exercise {
  id: string;
  melody: MelodyLine;
  chordProgression: ChordProgression;
  question: 'identify_chord_tone' | 'identify_tension' | 'describe_color';
  highlightedNote: Note;
  highlightedBeat: number;
}

// User listens to melody over chords, identifies:
// - Is highlighted note a chord tone or tension?
// - What scale degree is the melody on?
// - How does this note "feel" over the chord?
```

#### Stage 2: Chord Identification from Melody Context

**Purpose:** Given a melody, identify what chord would make sense underneath.

```typescript
interface HarmonyStage2Exercise {
  id: string;
  melody: MelodyLine;
  targetBeat: number;
  correctChord: Chord;
  options: Chord[];
  context: 'which_chord_fits' | 'continue_progression';
}

// User hears melody and chooses which chord belongs
// Develops harmonic intuition in context
```

#### Stage 3: Active Harmonization

**Purpose:** User plays melody over given chords OR harmonizes a given melody.

```typescript
interface HarmonyStage3Exercise {
  id: string;
  mode: 'play_melody_over_chords' | 'harmonize_melody';
  melody?: MelodyLine;
  chordProgression?: ChordProgression;
  targetScale: Scale;
  evaluationCriteria: HarmonizationCriteria;
}

interface HarmonizationCriteria {
  requireChordTones: boolean;
  allowPassingTones: boolean;
  rhythmicGuidelines: RhythmPattern;
}
```

#### Key Components

```typescript
HarmonyModule/
├── Stage1/
│   ├── MelodyOverHarmony.tsx
│   ├── ChordToneIdentifier.tsx
│   └── ColorDescriptor.tsx
├── Stage2/
│   ├── ChordFromContext.tsx
│   ├── HarmonicOptions.tsx
│   └── ProgressionContinue.tsx
├── Stage3/
│   ├── ActiveHarmonization.tsx
│   ├── MelodyPlayer.tsx
│   ├── ChordBackingTrack.tsx
│   └── HarmonizationFeedback.tsx
├── shared/
│   ├── MelodyVisualizer.tsx
│   ├── HarmonyTimeline.tsx
│   └── ScaleDegreeIndicator.tsx
└── hooks/
    ├── useHarmonyExercise.ts
    └── useMelodyChordRelation.ts
```

#### Dependencies
- **Interval Recognition**: Identify melodic movements
- **Chord Recognition**: Understand chord sounds
- **Progression Recognition**: Understand harmonic context

---

### 2.6 Module: Functional Harmony Deep Dives

#### Purpose & Learning Goals
Master specific harmonic patterns used across genres.

**Sub-Modules:**

##### ii-V-I Training
```typescript
interface IIVIExercise {
  key: Key;
  variation: 'basic' | 'tritone_sub' | 'backdoor' | 'chromatic_approach';
  voicings: VoicingStyle;
  tempo: number;
}
```

##### Blues Harmony
```typescript
interface BluesExercise {
  form: '12bar' | '8bar' | 'minor_blues' | 'jazz_blues';
  key: Key;
  additions: ('quick_iv' | 'turnaround' | 'tritone_subs')[];
}
```

##### Diatonic Progressions
```typescript
interface DiatonicExercise {
  key: Key;
  mode: Mode;
  commonProgressions: RomanNumeral[][];
  targetConcept: 'circle_of_fifths' | 'stepwise' | 'function';
}
```

#### Components
```typescript
FunctionalHarmonyModule/
├── IIVITraining/
├── BluesHarmony/
├── DiatonicProgressions/
├── ModalInterchange/
└── shared/
    ├── FunctionAnalyzer.tsx
    └── VoiceLeadingVisualizer.tsx
```

---

### 2.7 Module: Kinesthetic Coordination

#### Purpose & Learning Goals
Train smooth physical transitions between voicings—the "muscle memory" of harmony.

**Exercises:**
1. Voice leading drills (minimal finger movement)
2. Shell voicing transitions
3. Walking bass with chords
4. Comping patterns

#### Key Components

```typescript
KinestheticModule/
├── VoiceLeadingDrill.tsx
├── VoicingTransition.tsx
├── CompingPatterns.tsx
├── WalkingBassTrainer.tsx
├── KeyboardDisplay.tsx         // Visual hand position guide
└── hooks/
    └── useVoicingTransitions.ts
```

#### Data Structures

```typescript
interface VoiceLeadingExercise {
  fromChord: ChordVoicing;
  toChord: ChordVoicing;
  maxFingerMovement: number; // semitones
  targetVoices: ('soprano' | 'alto' | 'tenor' | 'bass')[];
  commonToneRule: boolean;
}

interface CompingPattern {
  name: string;
  style: 'charleston' | 'bossa' | 'swing' | 'ballad';
  rhythmPattern: RhythmPattern;
  voicingChanges: VoicingTransition[];
}
```

---

### 2.8 Module: Improvisation Frameworks

#### Purpose & Learning Goals
Provide structured approaches to improvisation that build confidence.

**Frameworks:**
1. Chord tone improvisation
2. Scale-based improvisation
3. Motif development
4. Call and response
5. Guide tone lines
6. Approach patterns

#### Key Components

```typescript
ImprovisationModule/
├── ChordToneImprov.tsx
├── ScalePatterns.tsx
├── MotifDevelopment.tsx
├── CallResponse.tsx
├── GuideToneLines.tsx
├── ApproachPatterns.tsx
├── BackingTrackPlayer.tsx
└── hooks/
    ├── useImprovisationExercise.ts
    └── useBackingTrack.ts
```

#### Data Structures

```typescript
interface ImprovisationExercise {
  framework: ImprovisationFramework;
  backingTrack: BackingTrack;
  constraints: ImprovisationConstraints;
  targetConcept: string;
  exampleLicks?: MelodyLine[];
}

interface ImprovisationConstraints {
  allowedNotes?: Note[];
  requiredNotes?: Note[];
  rhythmicDensity: 'sparse' | 'moderate' | 'dense';
  range: NoteRange;
  mustResolve: boolean;
}
```

---

### 2.9 Module: Song Learning

#### Purpose & Learning Goals
Apply all skills to real music—the ultimate integration.

**Approach:**
1. Analyze song harmony (chord chart mode)
2. Practice chord changes in isolation
3. Play along with backing track
4. Harmonize melody
5. Improvise over form

#### Key Components

```typescript
SongLearningModule/
├── SongBrowser.tsx
├── SongAnalysis.tsx
├── ChordChartView.tsx
├── SectionPractice.tsx
├── FullPlaythrough.tsx
├── ImprovisationMode.tsx
└── hooks/
    ├── useSongData.ts
    └── useSongProgress.ts
```

#### Data Structures

```typescript
interface Song {
  id: string;
  title: string;
  artist?: string;
  genre: Genre;
  key: Key;
  tempo: number;
  timeSignature: TimeSignature;
  sections: SongSection[];
  difficulty: DifficultyLevel;
  tags: string[];
}

interface SongSection {
  name: string; // 'verse', 'chorus', 'bridge', etc.
  chordProgression: ChordInKey[];
  melody?: MelodyLine;
  duration: number; // bars
  repeats: number;
}
```

---

## 3. Technical Architecture

### 3.1 Folder Structure

```
piano-app/
├── public/
│   ├── samples/                 # Piano samples (WAV/MP3)
│   │   ├── piano/
│   │   │   ├── A0.mp3
│   │   │   ├── C1.mp3
│   │   │   └── ... (full 88-key sampling)
│   │   └── metronome/
│   └── assets/
│       ├── icons/
│       └── images/
│
├── src/
│   ├── main.tsx                 # Entry point
│   ├── App.tsx                  # Root component
│   ├── routes.tsx               # Route definitions
│   │
│   ├── components/              # Shared UI components
│   │   ├── common/
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── ProgressBar.tsx
│   │   │   └── index.ts
│   │   ├── audio/
│   │   │   ├── PlayButton.tsx
│   │   │   ├── TransportControls.tsx
│   │   │   ├── TempoControl.tsx
│   │   │   └── VolumeSlider.tsx
│   │   ├── music/
│   │   │   ├── Keyboard.tsx
│   │   │   ├── Staff.tsx
│   │   │   ├── ChordDiagram.tsx
│   │   │   ├── ProgressionTimeline.tsx
│   │   │   └── ScaleDegreeDisplay.tsx
│   │   ├── exercise/
│   │   │   ├── ExerciseContainer.tsx
│   │   │   ├── QuestionDisplay.tsx
│   │   │   ├── AnswerOptions.tsx
│   │   │   ├── FeedbackDisplay.tsx
│   │   │   └── ExerciseControls.tsx
│   │   └── gamification/
│   │       ├── StreakCounter.tsx
│   │       ├── AchievementBadge.tsx
│   │       ├── XPBar.tsx
│   │       └── LevelIndicator.tsx
│   │
│   ├── modules/                 # Training module implementations
│   │   ├── intervals/
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   ├── utils/
│   │   │   └── index.ts
│   │   ├── chords/
│   │   ├── progressions/
│   │   ├── harmony/
│   │   │   ├── stage1/
│   │   │   ├── stage2/
│   │   │   ├── stage3/
│   │   │   └── shared/
│   │   ├── functional-harmony/
│   │   │   ├── ii-v-i/
│   │   │   ├── blues/
│   │   │   └── diatonic/
│   │   ├── kinesthetic/
│   │   ├── improvisation/
│   │   └── songs/
│   │
│   ├── services/                # Core services
│   │   ├── audio/
│   │   │   ├── AudioEngine.ts
│   │   │   ├── Sampler.ts
│   │   │   ├── Scheduler.ts
│   │   │   ├── MetronomeService.ts
│   │   │   └── index.ts
│   │   ├── theory/
│   │   │   ├── MusicTheoryEngine.ts
│   │   │   ├── IntervalService.ts
│   │   │   ├── ChordService.ts
│   │   │   ├── ProgressionService.ts
│   │   │   ├── ScaleService.ts
│   │   │   └── index.ts
│   │   ├── exercise/
│   │   │   ├── ExerciseEngine.ts
│   │   │   ├── QuestionGenerator.ts
│   │   │   ├── AnswerEvaluator.ts
│   │   │   ├── DifficultyManager.ts
│   │   │   └── index.ts
│   │   ├── progress/
│   │   │   ├── ProgressTracker.ts
│   │   │   ├── SpacedRepetition.ts
│   │   │   ├── AnalyticsService.ts
│   │   │   └── index.ts
│   │   ├── gamification/
│   │   │   ├── AchievementService.ts
│   │   │   ├── StreakService.ts
│   │   │   ├── XPService.ts
│   │   │   └── index.ts
│   │   └── storage/
│   │       ├── StorageService.ts
│   │       ├── LocalStorageAdapter.ts
│   │       ├── IndexedDBAdapter.ts  # Future
│   │       └── index.ts
│   │
│   ├── store/                   # Global state (Zustand)
│   │   ├── useAudioStore.ts
│   │   ├── useExerciseStore.ts
│   │   ├── useProgressStore.ts
│   │   ├── useSettingsStore.ts
│   │   └── index.ts
│   │
│   ├── hooks/                   # Shared custom hooks
│   │   ├── useAudio.ts
│   │   ├── useKeyboardInput.ts
│   │   ├── useExercise.ts
│   │   ├── useProgress.ts
│   │   └── useLocalStorage.ts
│   │
│   ├── types/                   # TypeScript definitions
│   │   ├── music.ts             # Note, Interval, Chord, etc.
│   │   ├── exercise.ts          # Exercise, Question, Answer
│   │   ├── progress.ts          # UserProgress, Stats
│   │   ├── gamification.ts      # Achievement, Streak
│   │   └── index.ts
│   │
│   ├── utils/                   # Utility functions
│   │   ├── music/
│   │   │   ├── noteUtils.ts
│   │   │   ├── intervalUtils.ts
│   │   │   ├── chordUtils.ts
│   │   │   └── rhythmUtils.ts
│   │   ├── formatters.ts
│   │   ├── validators.ts
│   │   └── random.ts
│   │
│   ├── constants/               # App constants
│   │   ├── music.ts             # INTERVALS, CHORD_TYPES, etc.
│   │   ├── exercises.ts         # Default configs
│   │   ├── achievements.ts      # Achievement definitions
│   │   └── routes.ts            # Route paths
│   │
│   ├── pages/                   # Page components
│   │   ├── Home.tsx
│   │   ├── Dashboard.tsx
│   │   ├── ModuleSelect.tsx
│   │   ├── ExercisePage.tsx
│   │   ├── Progress.tsx
│   │   ├── Settings.tsx
│   │   └── Profile.tsx
│   │
│   └── styles/                  # Global styles
│       ├── index.css
│       └── tailwind.config.js
│
├── tests/                       # Test files
│   ├── unit/
│   │   ├── services/
│   │   └── utils/
│   ├── integration/
│   └── e2e/
│
├── docs/                        # Documentation
│   └── api/
│
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
└── README.md
```

### 3.2 Key Services

#### 3.2.1 AudioEngine

```typescript
// services/audio/AudioEngine.ts

import * as Tone from 'tone';

class AudioEngine {
  private sampler: Tone.Sampler | null = null;
  private isInitialized: boolean = false;
  private masterVolume: Tone.Volume;

  async initialize(): Promise<void> {
    await Tone.start();

    this.sampler = new Tone.Sampler({
      urls: {
        'A0': 'A0.mp3',
        'C1': 'C1.mp3',
        // ... sample mapping
      },
      baseUrl: '/samples/piano/',
      onload: () => {
        this.isInitialized = true;
      }
    }).toDestination();

    this.masterVolume = new Tone.Volume(0).toDestination();
    this.sampler.connect(this.masterVolume);
  }

  // Play a single note
  playNote(note: Note, duration?: Time, velocity?: number): void;

  // Play multiple notes simultaneously (chord)
  playChord(notes: Note[], duration?: Time, velocity?: number): void;

  // Play notes in sequence (melody/arpeggio)
  playSequence(notes: Note[], durations: Time[], startTime?: Time): void;

  // Play a full exercise (melody over chords, etc.)
  playExercise(exercise: PlayableExercise): void;

  // Schedule events on timeline
  scheduleEvent(callback: () => void, time: Time): number;

  // Transport controls
  start(): void;
  stop(): void;
  pause(): void;
  setTempo(bpm: number): void;

  // Volume control
  setVolume(db: number): void;
  mute(): void;
  unmute(): void;

  // Cleanup
  dispose(): void;
}

export const audioEngine = new AudioEngine();
```

#### 3.2.2 MusicTheoryEngine

```typescript
// services/theory/MusicTheoryEngine.ts

import * as Tonal from 'tonal';

class MusicTheoryEngine {
  // Interval operations
  getInterval(note1: Note, note2: Note): Interval;
  transposeNote(note: Note, interval: Interval): Note;
  getAllIntervals(): IntervalName[];

  // Chord operations
  getChord(root: Note, quality: ChordQuality): Chord;
  getChordNotes(chord: Chord): Note[];
  identifyChord(notes: Note[]): Chord | null;
  getChordInversions(chord: Chord): ChordVoicing[];
  getVoicings(chord: Chord, style: VoicingStyle): ChordVoicing[];

  // Scale operations
  getScale(root: Note, type: ScaleType): Scale;
  getScaleNotes(scale: Scale): Note[];
  getScaleDegree(note: Note, scale: Scale): number | null;

  // Progression operations
  analyzeProgression(chords: Chord[], key: Key): RomanNumeral[];
  generateProgression(key: Key, pattern: RomanNumeral[]): Chord[];
  suggestNextChord(currentChords: Chord[], key: Key): Chord[];

  // Key detection
  detectKey(notes: Note[]): Key[];
  getKeySignature(key: Key): KeySignature;

  // Harmonic analysis
  getChordFunction(chord: Chord, key: Key): HarmonicFunction;
  isChordTone(note: Note, chord: Chord): boolean;
  getTension(note: Note, chord: Chord): Tension | null;

  // Voice leading
  findOptimalVoiceLeading(from: ChordVoicing, to: Chord): ChordVoicing;
  calculateVoiceLeadingDistance(from: ChordVoicing, to: ChordVoicing): number;
}

export const musicTheoryEngine = new MusicTheoryEngine();
```

#### 3.2.3 ExerciseEngine

```typescript
// services/exercise/ExerciseEngine.ts

class ExerciseEngine {
  private currentModule: ModuleType;
  private currentExercise: Exercise | null = null;
  private questionGenerator: QuestionGenerator;
  private answerEvaluator: AnswerEvaluator;
  private difficultyManager: DifficultyManager;

  // Initialize module
  setModule(module: ModuleType, settings?: ModuleSettings): void;

  // Generate exercises
  generateExercise(): Exercise;
  generateBatch(count: number): Exercise[];

  // Question handling
  getCurrentQuestion(): Question;
  submitAnswer(answer: Answer): AnswerResult;
  skipQuestion(): void;
  repeatQuestion(): void;

  // Hint system
  getHint(level: 1 | 2 | 3): Hint;

  // Progress integration
  recordAttempt(exerciseId: string, result: AnswerResult): void;

  // Adaptive difficulty
  adjustDifficulty(result: AnswerResult): void;
  getDifficultyLevel(): DifficultyLevel;

  // Session management
  startSession(): Session;
  endSession(): SessionSummary;
  pauseSession(): void;
  resumeSession(): void;
}

interface AnswerResult {
  correct: boolean;
  userAnswer: Answer;
  correctAnswer: Answer;
  feedback: string;
  explanation?: string;
  pointsEarned: number;
  timeToAnswer: number;
}
```

#### 3.2.4 ProgressTracker

```typescript
// services/progress/ProgressTracker.ts

class ProgressTracker {
  private storage: StorageService;
  private spacedRepetition: SpacedRepetition;
  private analytics: AnalyticsService;

  // Core tracking
  recordExerciseResult(moduleId: string, exerciseId: string, result: ExerciseResult): void;
  getModuleProgress(moduleId: string): ModuleProgress;
  getOverallProgress(): OverallProgress;

  // Statistics
  getAccuracyByCategory(moduleId: string): CategoryAccuracy[];
  getTimeSpentByModule(): ModuleTimeStats[];
  getHistoricalTrend(moduleId: string, days: number): TrendData[];

  // Weak area identification
  identifyWeakAreas(moduleId: string): WeakArea[];
  getPracticeRecommendations(): Recommendation[];

  // Spaced repetition
  getNextDueItems(moduleId: string, count: number): Exercise[];
  scheduleReview(exerciseId: string, result: ExerciseResult): void;

  // Streaks
  getCurrentStreak(): Streak;
  updateStreak(): void;

  // Achievements
  checkAchievements(event: GameEvent): Achievement[];
  getUnlockedAchievements(): Achievement[];

  // Export/Import
  exportProgress(): ProgressExport;
  importProgress(data: ProgressExport): void;
}

interface ModuleProgress {
  moduleId: string;
  totalExercises: number;
  completedExercises: number;
  accuracy: number;
  averageTime: number;
  currentLevel: number;
  xp: number;
  lastPracticed: Date;
  masteredConcepts: string[];
  struggleConcepts: string[];
}
```

### 3.3 State Management

Using **Zustand** for lightweight, TypeScript-friendly state management.

```typescript
// store/useAudioStore.ts
interface AudioState {
  isInitialized: boolean;
  isPlaying: boolean;
  volume: number;
  tempo: number;
  metronomeEnabled: boolean;

  // Actions
  initialize: () => Promise<void>;
  setVolume: (volume: number) => void;
  setTempo: (tempo: number) => void;
  toggleMetronome: () => void;
}

export const useAudioStore = create<AudioState>((set, get) => ({
  isInitialized: false,
  isPlaying: false,
  volume: 0.8,
  tempo: 120,
  metronomeEnabled: false,

  initialize: async () => {
    await audioEngine.initialize();
    set({ isInitialized: true });
  },

  setVolume: (volume) => {
    audioEngine.setVolume(volume);
    set({ volume });
  },

  setTempo: (tempo) => {
    audioEngine.setTempo(tempo);
    set({ tempo });
  },

  toggleMetronome: () => {
    set((state) => ({ metronomeEnabled: !state.metronomeEnabled }));
  },
}));
```

```typescript
// store/useExerciseStore.ts
interface ExerciseState {
  currentModule: ModuleType | null;
  currentExercise: Exercise | null;
  sessionStats: SessionStats;
  settings: ExerciseSettings;

  // Actions
  setModule: (module: ModuleType) => void;
  startExercise: () => void;
  submitAnswer: (answer: Answer) => AnswerResult;
  nextQuestion: () => void;
  updateSettings: (settings: Partial<ExerciseSettings>) => void;
}
```

```typescript
// store/useProgressStore.ts
interface ProgressState {
  userProgress: UserProgress;
  currentStreak: Streak;
  achievements: Achievement[];

  // Actions
  recordResult: (result: ExerciseResult) => void;
  updateStreak: () => void;
  unlockAchievement: (achievement: Achievement) => void;
  getModuleStats: (moduleId: string) => ModuleStats;
}
```

### 3.4 Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           USER INTERACTION                                   │
│                                                                             │
│  [Clicks Answer]  [Presses Key]  [Adjusts Setting]  [Clicks Play]          │
└───────┬─────────────────┬─────────────────┬─────────────────┬───────────────┘
        │                 │                 │                 │
        ▼                 ▼                 ▼                 ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                              REACT COMPONENTS                                │
│                                                                             │
│  ExerciseContainer  │  KeyboardInput  │  SettingsPanel  │  AudioControls   │
└───────┬─────────────────┬─────────────────┬─────────────────┬───────────────┘
        │                 │                 │                 │
        │                 │                 │                 │
        ▼                 ▼                 ▼                 ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                             ZUSTAND STORES                                   │
│                                                                             │
│  useExerciseStore   │  useInputStore   │  useSettingsStore │  useAudioStore │
│  - submitAnswer()   │  - handleKey()   │  - update()       │  - play()      │
└───────┬─────────────────┬─────────────────┬─────────────────┬───────────────┘
        │                 │                 │                 │
        ▼                 ▼                 ▼                 ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                             CORE SERVICES                                    │
│                                                                             │
│  ExerciseEngine     │ MusicTheoryEngine │  StorageService  │  AudioEngine   │
│  - evaluate()       │ - validate()      │  - persist()     │  - schedule()  │
└───────┬─────────────────┬─────────────────┬─────────────────┬───────────────┘
        │                 │                 │                 │
        ▼                 ▼                 │                 ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                        PROGRESS & GAMIFICATION                               │
│                                                                             │
│  ProgressTracker.recordResult()  │  AchievementService.check()              │
│  SpacedRepetition.schedule()     │  StreakService.update()                  │
└───────┬─────────────────┬─────────────────┬─────────────────────────────────┘
        │                 │                 │
        ▼                 ▼                 ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                           PERSISTENCE LAYER                                  │
│                                                                             │
│                         localStorage / IndexedDB                            │
│                                                                             │
│  { userProgress, settings, exerciseHistory, achievements, streaks }        │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Data Models

### 4.1 Music Theory Types

```typescript
// types/music.ts

// ============ Primitives ============

/** Scientific pitch notation (e.g., "C4", "F#5", "Bb3") */
type NoteName = string;

/** MIDI note number (0-127) */
type MidiNote = number;

interface Note {
  name: NoteName;
  midi: MidiNote;
  octave: number;
  pitchClass: string; // "C", "C#", "D", etc.
  frequency: number;  // Hz
}

interface NoteRange {
  low: Note;
  high: Note;
}

// ============ Intervals ============

type IntervalQuality = 'perfect' | 'major' | 'minor' | 'augmented' | 'diminished';
type IntervalNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13;

interface Interval {
  name: string;         // "M3", "P5", "m7", etc.
  semitones: number;
  quality: IntervalQuality;
  number: IntervalNumber;
  direction: 'ascending' | 'descending';
}

type IntervalName =
  | 'P1' | 'm2' | 'M2' | 'm3' | 'M3' | 'P4' | 'TT' | 'P5'
  | 'm6' | 'M6' | 'm7' | 'M7' | 'P8'
  | 'm9' | 'M9' | 'm10' | 'M10' | 'P11' | 'A11' | 'P12' | 'm13' | 'M13';

// ============ Chords ============

type ChordQuality =
  | 'major' | 'minor' | 'diminished' | 'augmented'
  | 'dominant7' | 'major7' | 'minor7' | 'minorMajor7' | 'diminished7' | 'halfDiminished7'
  | 'sus2' | 'sus4' | 'add9' | 'add11'
  | '6' | 'minor6'
  | '9' | 'major9' | 'minor9'
  | '11' | 'major11' | 'minor11'
  | '13' | 'major13' | 'minor13';

interface Chord {
  root: Note;
  quality: ChordQuality;
  symbol: string;       // "Cmaj7", "F#m", "Bb7", etc.
  notes: Note[];
  intervals: Interval[];
}

interface ChordVoicing {
  chord: Chord;
  notes: Note[];        // Specific pitches in specific octaves
  inversion: 0 | 1 | 2 | 3;
  style: VoicingStyle;
  hand: 'left' | 'right' | 'both';
}

type VoicingStyle =
  | 'close'      // Notes stacked tightly
  | 'open'       // Notes spread across octaves
  | 'drop2'      // Second voice from top dropped an octave
  | 'drop3'      // Third voice from top dropped an octave
  | 'drop24'     // Second and fourth voices dropped
  | 'shell'      // Root, 3rd, 7th (no 5th)
  | 'rootless';  // No root (for jazz comping)

// ============ Scales & Keys ============

type ScaleType =
  | 'major' | 'minor' | 'harmonicMinor' | 'melodicMinor'
  | 'dorian' | 'phrygian' | 'lydian' | 'mixolydian' | 'aeolian' | 'locrian'
  | 'pentatonicMajor' | 'pentatonicMinor' | 'blues'
  | 'wholeTone' | 'diminished' | 'augmented'
  | 'bebopDominant' | 'bebopMajor' | 'bebopMinor';

interface Scale {
  root: Note;
  type: ScaleType;
  notes: Note[];
  intervals: Interval[];
}

interface Key {
  tonic: NoteName;
  mode: 'major' | 'minor';
  signature: KeySignature;
}

interface KeySignature {
  sharps: NoteName[];
  flats: NoteName[];
}

// ============ Progressions ============

type RomanNumeral =
  | 'I' | 'i' | 'bII' | 'II' | 'ii' | '#ii°'
  | 'bIII' | 'III' | 'iii' | 'IV' | 'iv' | '#IV' | '#iv°'
  | 'V' | 'v' | 'bVI' | 'VI' | 'vi' | 'bVII' | 'VII' | 'vii°';

type HarmonicFunction = 'tonic' | 'subdominant' | 'dominant' | 'predominant';

interface ChordInKey {
  chord: Chord;
  romanNumeral: RomanNumeral;
  function: HarmonicFunction;
  position: number;     // Beat position
  duration: number;     // In beats
}

interface ChordProgression {
  key: Key;
  chords: ChordInKey[];
  tempo: number;
  timeSignature: TimeSignature;
}

// ============ Melody ============

interface MelodyNote {
  note: Note;
  startBeat: number;
  duration: number;     // In beats
  velocity: number;     // 0-1
  articulation?: 'legato' | 'staccato' | 'accent';
}

interface MelodyLine {
  notes: MelodyNote[];
  key: Key;
  timeSignature: TimeSignature;
}

// ============ Rhythm ============

interface TimeSignature {
  numerator: number;    // Beats per bar
  denominator: number;  // Note value per beat
}

interface RhythmPattern {
  beats: RhythmBeat[];
  timeSignature: TimeSignature;
}

interface RhythmBeat {
  position: number;     // Beat position
  duration: number;
  emphasis: 'strong' | 'weak' | 'off';
}

// ============ Tensions ============

type Tension = '9' | 'b9' | '#9' | '11' | '#11' | '13' | 'b13';

interface TensionAnalysis {
  note: Note;
  chord: Chord;
  isChordTone: boolean;
  tension: Tension | null;
  scaleDegree: number;
  colorDescription: string;  // "bright", "dark", "tense", etc.
}
```

### 4.2 Exercise Types

```typescript
// types/exercise.ts

type ModuleType =
  | 'intervals'
  | 'chords'
  | 'progressions'
  | 'harmony-stage1'
  | 'harmony-stage2'
  | 'harmony-stage3'
  | 'functional-ii-v-i'
  | 'functional-blues'
  | 'functional-diatonic'
  | 'kinesthetic'
  | 'improvisation'
  | 'songs';

type DifficultyLevel = 1 | 2 | 3 | 4 | 5;

interface Exercise {
  id: string;
  module: ModuleType;
  type: string;         // Module-specific type
  difficulty: DifficultyLevel;
  createdAt: Date;
  data: ExerciseData;   // Module-specific data
}

type ExerciseData =
  | IntervalExerciseData
  | ChordExerciseData
  | ProgressionExerciseData
  | HarmonyExerciseData
  | KinestheticExerciseData
  | ImprovisationExerciseData;

interface Question {
  id: string;
  exerciseId: string;
  prompt: string;
  audioSequence?: AudioSequence;
  visualHint?: VisualHint;
  options?: AnswerOption[];
  correctAnswer: Answer;
  hints: Hint[];
}

interface AnswerOption {
  id: string;
  label: string;
  value: any;
}

interface Answer {
  type: 'selection' | 'keyboard' | 'sequence' | 'freeform';
  value: any;
  timestamp: Date;
}

interface Hint {
  level: 1 | 2 | 3;
  text: string;
  visualAid?: VisualHint;
  audioAid?: AudioSequence;
}

interface VisualHint {
  type: 'keyboard' | 'staff' | 'diagram' | 'text';
  data: any;
}

interface AudioSequence {
  events: AudioEvent[];
  tempo: number;
  loop: boolean;
}

interface AudioEvent {
  type: 'note' | 'chord' | 'rest';
  notes?: Note[];
  startTime: number;    // In seconds
  duration: number;
  velocity: number;
}

interface AnswerResult {
  exerciseId: string;
  questionId: string;
  correct: boolean;
  userAnswer: Answer;
  correctAnswer: Answer;
  feedback: string;
  explanation?: string;
  timeToAnswer: number;  // Milliseconds
  hintsUsed: number;
  pointsEarned: number;
}

interface Session {
  id: string;
  module: ModuleType;
  startTime: Date;
  endTime?: Date;
  exercises: Exercise[];
  results: AnswerResult[];
  settings: ExerciseSettings;
}

interface SessionSummary {
  sessionId: string;
  duration: number;
  totalQuestions: number;
  correctAnswers: number;
  accuracy: number;
  averageTime: number;
  pointsEarned: number;
  xpEarned: number;
  newAchievements: Achievement[];
  weakAreas: string[];
  improvements: string[];
}

interface ExerciseSettings {
  tempo: number;
  showKeyboard: boolean;
  showStaff: boolean;
  autoAdvance: boolean;
  autoAdvanceDelay: number;
  repeatOnIncorrect: boolean;
  hintMode: 'never' | 'on_request' | 'on_incorrect';
  soundFeedback: boolean;
}
```

### 4.3 Progress & Gamification Types

```typescript
// types/progress.ts

interface UserProgress {
  userId: string;
  modules: ModuleProgress[];
  overall: OverallStats;
  createdAt: Date;
  lastActiveAt: Date;
}

interface ModuleProgress {
  moduleId: ModuleType;
  level: number;
  xp: number;
  xpToNextLevel: number;
  totalExercises: number;
  correctExercises: number;
  accuracy: number;
  averageResponseTime: number;
  timeSpent: number;     // Total milliseconds
  lastPracticed: Date;
  masteredConcepts: string[];
  struggleConcepts: string[];
  history: ExerciseHistory[];
}

interface ExerciseHistory {
  exerciseId: string;
  completedAt: Date;
  correct: boolean;
  timeToAnswer: number;
  difficulty: DifficultyLevel;
  hintsUsed: number;
}

interface OverallStats {
  totalXp: number;
  level: number;
  totalTimeSpent: number;
  totalExercises: number;
  overallAccuracy: number;
  currentStreak: Streak;
  longestStreak: number;
  achievementsUnlocked: number;
  totalAchievements: number;
}

// ============ Spaced Repetition ============

interface SpacedRepetitionItem {
  exerciseId: string;
  moduleId: ModuleType;
  concept: string;
  easeFactor: number;    // SM-2 algorithm
  interval: number;      // Days until next review
  repetitions: number;
  nextReviewDate: Date;
  lastReviewDate: Date;
}

interface WeakArea {
  moduleId: ModuleType;
  concept: string;
  accuracy: number;
  sampleCount: number;
  lastPracticed: Date;
  recommendedPractice: Exercise[];
}

interface Recommendation {
  type: 'review' | 'new_concept' | 'weak_area' | 'daily_goal';
  moduleId: ModuleType;
  title: string;
  description: string;
  exercises: Exercise[];
  priority: number;
}
```

```typescript
// types/gamification.ts

interface Streak {
  current: number;
  startDate: Date;
  lastActivityDate: Date;
  isActive: boolean;
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: AchievementCategory;
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
  requirement: AchievementRequirement;
  progress: number;      // 0-1
  unlockedAt?: Date;
  xpReward: number;
}

type AchievementCategory =
  | 'accuracy'
  | 'streak'
  | 'volume'
  | 'speed'
  | 'mastery'
  | 'exploration'
  | 'special';

interface AchievementRequirement {
  type: 'count' | 'streak' | 'accuracy' | 'time' | 'custom';
  target: number;
  moduleId?: ModuleType;
  condition?: string;
}

interface XPEvent {
  type: 'exercise_complete' | 'perfect_score' | 'streak_bonus' | 'achievement';
  amount: number;
  moduleId: ModuleType;
  timestamp: Date;
}

interface Level {
  level: number;
  name: string;
  minXp: number;
  maxXp: number;
  perks: string[];
}

interface DailyGoal {
  type: 'exercises' | 'time' | 'accuracy';
  target: number;
  current: number;
  completed: boolean;
  xpReward: number;
}

interface LeaderboardEntry {
  rank: number;
  userId: string;
  username: string;
  xp: number;
  level: number;
  achievements: number;
}
```

---

## 5. Audio System Design

### 5.1 Playback Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         TONE.JS AUDIO GRAPH                                  │
│                                                                             │
│  ┌──────────────┐     ┌──────────────┐     ┌──────────────┐                │
│  │   Sampler    │────►│   Effects    │────►│    Master    │────► Output    │
│  │   (Piano)    │     │   Chain      │     │    Volume    │                │
│  └──────────────┘     └──────────────┘     └──────────────┘                │
│         │                    │                                              │
│         │              ┌─────┴─────┐                                       │
│         │              │           │                                       │
│         │         ┌────┴───┐ ┌─────┴────┐                                 │
│         │         │ Reverb │ │ Limiter  │                                 │
│         │         └────────┘ └──────────┘                                 │
│         │                                                                  │
│  ┌──────┴───────┐                                                         │
│  │  Transport   │◄──── Tempo, Time Signature, Start/Stop                  │
│  │  (Scheduler) │                                                         │
│  └──────────────┘                                                         │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 5.2 Sample Loading Strategy

```typescript
interface SampleLoaderConfig {
  // Minimal samples for quick startup
  essential: Note[];     // C1, C2, C3, C4, C5, C6

  // Full samples loaded progressively
  full: Note[];          // All 88 keys

  // Load priority based on usage
  priority: {
    immediate: NoteRange;   // C3-C5 (most used range)
    deferred: NoteRange[];  // Bass and treble extremes
  };
}

class SampleLoader {
  async loadEssential(): Promise<void>;   // ~500KB, <1s
  async loadFull(): Promise<void>;        // ~5MB, background
  getLoadProgress(): number;
  isNoteLoaded(note: Note): boolean;

  // Fallback: synthesize unloaded notes
  synthesizeNote(note: Note): void;
}
```

### 5.3 Latency Requirements

| Context | Target Latency | Notes |
|---------|----------------|-------|
| Key press feedback | < 10ms | User perception threshold |
| Exercise playback | < 50ms | Acceptable for passive listening |
| Metronome sync | < 20ms | Critical for rhythm training |
| Real-time MIDI input | < 15ms | Future pitch detection |

### 5.4 AudioEngine API

```typescript
class AudioEngine {
  // Initialization
  async initialize(config?: AudioConfig): Promise<void>;
  getStatus(): AudioStatus;

  // Playback - Single Events
  playNote(note: Note, options?: PlayOptions): void;
  playChord(chord: Chord | ChordVoicing, options?: PlayOptions): void;
  playInterval(interval: Interval, root: Note, options?: PlayOptions): void;

  // Playback - Sequences
  playMelody(melody: MelodyLine, options?: SequenceOptions): void;
  playProgression(progression: ChordProgression, options?: SequenceOptions): void;
  playExercise(exercise: PlayableExercise): void;

  // Transport
  start(): void;
  stop(): void;
  pause(): void;
  resume(): void;
  seek(time: number): void;

  // Scheduling
  scheduleNote(note: Note, time: number, options?: PlayOptions): void;
  scheduleChord(chord: Chord, time: number, options?: PlayOptions): void;
  scheduleCallback(callback: () => void, time: number): number;
  clearSchedule(): void;

  // Settings
  setTempo(bpm: number): void;
  setVolume(level: number): void;  // 0-1
  setTimeSignature(sig: TimeSignature): void;
  enableMetronome(enabled: boolean): void;

  // Events
  on(event: AudioEvent, callback: () => void): void;
  off(event: AudioEvent, callback: () => void): void;

  // Cleanup
  dispose(): void;
}

interface PlayOptions {
  duration?: number;      // Seconds (default: 1)
  velocity?: number;      // 0-1 (default: 0.8)
  delay?: number;         // Seconds (default: 0)
  articulation?: 'normal' | 'staccato' | 'legato';
}

interface SequenceOptions extends PlayOptions {
  tempo?: number;
  loop?: boolean;
  loopCount?: number;
  onBeat?: (beat: number) => void;
  onComplete?: () => void;
}

type AudioStatus = {
  initialized: boolean;
  samplesLoaded: number;
  totalSamples: number;
  latency: number;
  context: AudioContextState;
};
```

### 5.5 Future: Pitch Detection Integration

```typescript
// Future pitch detection interface (placeholder)
interface PitchDetectionService {
  // Initialization
  requestMicrophoneAccess(): Promise<boolean>;
  initialize(config: PitchDetectionConfig): Promise<void>;

  // Real-time detection
  startListening(): void;
  stopListening(): void;

  // Callbacks
  onPitchDetected: (pitch: DetectedPitch) => void;
  onNoteOn: (note: Note) => void;
  onNoteOff: (note: Note) => void;

  // Configuration
  setConfidenceThreshold(threshold: number): void;
  setNoiseGate(level: number): void;
}

interface DetectedPitch {
  frequency: number;
  confidence: number;
  note: Note;
  centsOff: number;
  timestamp: number;
}

// Integration points in existing modules
interface ActiveHarmonizationExercise {
  // Existing fields...

  // Pitch detection integration
  inputMode: 'click' | 'keyboard' | 'midi' | 'microphone';
  pitchDetection?: {
    enabled: boolean;
    confidenceThreshold: number;
    allowedLatency: number;
  };
}
```

---

## 6. UI/UX Architecture

### 6.1 Screen Flow

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              LANDING PAGE                                    │
│                        [Start Training] [Continue]                          │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                    ┌─────────────────┼─────────────────┐
                    │                 │                 │
                    ▼                 ▼                 ▼
┌─────────────────────┐ ┌─────────────────────┐ ┌─────────────────────┐
│     DASHBOARD       │ │      MODULES        │ │      PROFILE        │
│  - Daily Goals      │ │  - All modules      │ │  - Stats            │
│  - Streak           │ │  - Progress bars    │ │  - Achievements     │
│  - Recommendations  │ │  - Locked/unlocked  │ │  - Settings         │
│  - Quick Practice   │ │  - Continue button  │ │  - Export/Import    │
└─────────┬───────────┘ └─────────┬───────────┘ └─────────────────────┘
          │                       │
          │                       ▼
          │       ┌─────────────────────────────────────────┐
          │       │           MODULE OVERVIEW                │
          │       │  - Module description                   │
          │       │  - Sub-modules / stages                 │
          │       │  - Progress & mastery                   │
          │       │  - Settings                             │
          │       │  [Start Practice]                       │
          └──────►└────────────────┬────────────────────────┘
                                   │
                                   ▼
          ┌─────────────────────────────────────────────────┐
          │              EXERCISE SESSION                    │
          │                                                  │
          │  ┌─────────────────────────────────────────┐    │
          │  │           QUESTION DISPLAY               │    │
          │  │  "What interval is this?"               │    │
          │  └─────────────────────────────────────────┘    │
          │                                                  │
          │  ┌─────────────────────────────────────────┐    │
          │  │            AUDIO CONTROLS                │    │
          │  │     [◄◄]  [▶ Play]  [►►]  [🔁]          │    │
          │  └─────────────────────────────────────────┘    │
          │                                                  │
          │  ┌─────────────────────────────────────────┐    │
          │  │          ANSWER OPTIONS                  │    │
          │  │   [m2]  [M2]  [m3]  [M3]  [P4]  [TT]   │    │
          │  │   [P5]  [m6]  [M6]  [m7]  [M7]  [P8]   │    │
          │  └─────────────────────────────────────────┘    │
          │                                                  │
          │  ┌─────────────────────────────────────────┐    │
          │  │          VISUAL AIDS (optional)          │    │
          │  │        [Keyboard] [Staff] [Off]         │    │
          │  └─────────────────────────────────────────┘    │
          │                                                  │
          │  Progress: ████████░░░░░░░░  8/20               │
          │  [💡 Hint]  [⏭ Skip]  [⚙ Settings]  [✕ End]    │
          └─────────────────────────────────────────────────┘
                                   │
                    ┌──────────────┼──────────────┐
                    │              │              │
                    ▼              ▼              ▼
          ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
          │   CORRECT    │ │  INCORRECT   │ │   SESSION    │
          │   FEEDBACK   │ │   FEEDBACK   │ │   COMPLETE   │
          │   +10 XP     │ │  Explanation │ │   Summary    │
          │   [Next]     │ │  [Try Again] │ │   Stats      │
          └──────────────┘ └──────────────┘ └──────────────┘
```

### 6.2 Component Hierarchy

```
App
├── Layout
│   ├── Header
│   │   ├── Logo
│   │   ├── Navigation
│   │   │   ├── NavItem (Dashboard)
│   │   │   ├── NavItem (Modules)
│   │   │   └── NavItem (Profile)
│   │   └── UserMenu
│   │       ├── XPIndicator
│   │       ├── StreakBadge
│   │       └── SettingsLink
│   ├── Main (Router Outlet)
│   └── Footer
│
├── Pages
│   ├── Dashboard
│   │   ├── WelcomeCard
│   │   ├── DailyGoals
│   │   │   └── GoalProgress
│   │   ├── StreakWidget
│   │   ├── RecommendationList
│   │   │   └── RecommendationCard
│   │   └── QuickPracticeGrid
│   │       └── QuickPracticeCard
│   │
│   ├── ModuleList
│   │   ├── ModuleCard
│   │   │   ├── ModuleIcon
│   │   │   ├── ProgressRing
│   │   │   └── LockOverlay
│   │   └── ModuleFilter
│   │
│   ├── ModuleOverview
│   │   ├── ModuleHeader
│   │   ├── SubModuleList
│   │   │   └── SubModuleCard
│   │   ├── ModuleStats
│   │   ├── MasteryIndicator
│   │   └── ModuleSettings
│   │
│   ├── ExerciseSession
│   │   ├── SessionHeader
│   │   │   ├── ProgressBar
│   │   │   ├── TimerDisplay
│   │   │   └── SessionControls
│   │   ├── ExerciseContainer
│   │   │   ├── QuestionDisplay
│   │   │   ├── AudioControls
│   │   │   │   ├── PlayButton
│   │   │   │   ├── RepeatButton
│   │   │   │   ├── TempoControl
│   │   │   │   └── VolumeSlider
│   │   │   ├── AnswerInput
│   │   │   │   ├── OptionGrid (for selection)
│   │   │   │   ├── Keyboard (for keyboard input)
│   │   │   │   └── SequenceBuilder (for sequences)
│   │   │   ├── VisualAids
│   │   │   │   ├── KeyboardDisplay
│   │   │   │   ├── StaffDisplay
│   │   │   │   └── ChordDiagram
│   │   │   └── HintPanel
│   │   └── FeedbackModal
│   │       ├── ResultIcon
│   │       ├── Explanation
│   │       ├── XPAnimation
│   │       └── NextButton
│   │
│   ├── SessionComplete
│   │   ├── SummaryStats
│   │   ├── AccuracyChart
│   │   ├── XPGained
│   │   ├── AchievementsUnlocked
│   │   ├── WeakAreasHighlight
│   │   └── ActionButtons
│   │
│   ├── Profile
│   │   ├── ProfileHeader
│   │   │   ├── LevelDisplay
│   │   │   └── XPProgress
│   │   ├── StatsOverview
│   │   │   ├── StatCard
│   │   │   └── TrendChart
│   │   ├── AchievementShowcase
│   │   │   └── AchievementBadge
│   │   └── SettingsPanel
│   │
│   └── Settings
│       ├── AudioSettings
│       ├── DisplaySettings
│       ├── ExerciseDefaults
│       └── DataManagement
│
└── Shared Components
    ├── Common
    │   ├── Button
    │   ├── Card
    │   ├── Modal
    │   ├── Tooltip
    │   ├── ProgressBar
    │   ├── Badge
    │   └── Spinner
    ├── Music
    │   ├── Keyboard
    │   ├── Staff
    │   ├── ChordDiagram
    │   ├── NoteDisplay
    │   └── IntervalDisplay
    └── Gamification
        ├── XPBar
        ├── LevelBadge
        ├── StreakCounter
        ├── AchievementPopup
        └── Confetti
```

### 6.3 Gamification Systems

#### XP & Leveling

```typescript
const XP_CONFIG = {
  // Base XP rewards
  exerciseComplete: 10,
  perfectAnswer: 5,      // Bonus
  firstTry: 3,           // Bonus for no hints
  speedBonus: 2,         // Under target time

  // Multipliers
  streakMultiplier: (streak: number) => 1 + (streak * 0.1), // Max 2x at 10-day streak
  difficultyMultiplier: (level: DifficultyLevel) => 0.8 + (level * 0.2),

  // Level thresholds (exponential curve)
  levelThreshold: (level: number) => Math.floor(100 * Math.pow(1.5, level - 1)),
};

const LEVEL_NAMES = [
  'Beginner',           // 1-5
  'Novice',             // 6-10
  'Apprentice',         // 11-15
  'Intermediate',       // 16-20
  'Skilled',            // 21-25
  'Advanced',           // 26-30
  'Expert',             // 31-35
  'Master',             // 36-40
  'Virtuoso',           // 41-45
  'Maestro',            // 46-50
];
```

#### Achievement Categories

```typescript
const ACHIEVEMENTS: Achievement[] = [
  // Accuracy
  { id: 'perfect_10', name: 'Perfect 10', description: '10 correct answers in a row', tier: 'bronze' },
  { id: 'perfect_25', name: 'Sharpshooter', description: '25 correct answers in a row', tier: 'silver' },
  { id: 'perfect_100', name: 'Flawless', description: '100 correct answers in a row', tier: 'gold' },

  // Streaks
  { id: 'streak_7', name: 'Week Warrior', description: '7-day practice streak', tier: 'bronze' },
  { id: 'streak_30', name: 'Monthly Master', description: '30-day practice streak', tier: 'silver' },
  { id: 'streak_365', name: 'Year of Music', description: '365-day practice streak', tier: 'platinum' },

  // Volume
  { id: 'exercises_100', name: 'Century', description: 'Complete 100 exercises', tier: 'bronze' },
  { id: 'exercises_1000', name: 'Millennium', description: 'Complete 1000 exercises', tier: 'silver' },

  // Mastery
  { id: 'master_intervals', name: 'Interval Master', description: 'Master all intervals', tier: 'gold' },
  { id: 'master_chords', name: 'Chord Connoisseur', description: 'Master all chord types', tier: 'gold' },

  // Exploration
  { id: 'try_all_modules', name: 'Explorer', description: 'Try every module', tier: 'bronze' },
  { id: 'complete_all_modules', name: 'Completionist', description: 'Complete every module', tier: 'platinum' },

  // Special
  { id: 'night_owl', name: 'Night Owl', description: 'Practice after midnight', tier: 'bronze' },
  { id: 'early_bird', name: 'Early Bird', description: 'Practice before 6 AM', tier: 'bronze' },
];
```

### 6.4 Responsive Design Breakpoints

```css
/* Tailwind breakpoints */
screens: {
  'sm': '640px',   /* Mobile landscape */
  'md': '768px',   /* Tablet portrait */
  'lg': '1024px',  /* Tablet landscape / small desktop */
  'xl': '1280px',  /* Desktop */
  '2xl': '1536px', /* Large desktop */
}
```

| Breakpoint | Layout | Keyboard | Controls |
|------------|--------|----------|----------|
| Mobile (<640px) | Single column | 1 octave | Stacked |
| Tablet (768-1024px) | Two column | 2 octaves | Side-by-side |
| Desktop (>1024px) | Three column | Full 88-key | Floating |

---

## 7. Implementation Phases

### Phase 1: Foundation (Weeks 1-3)

**Goal:** Core infrastructure and first playable module

```
Week 1: Project Setup
├── Initialize React + TypeScript + Vite
├── Configure Tailwind CSS
├── Set up folder structure
├── Implement AudioEngine with Tone.js
├── Create basic sample loader
└── Build core UI components (Button, Card, Modal)

Week 2: Music Theory Foundation
├── Implement MusicTheoryEngine with Tonal.js
├── Create Note, Interval, Chord types
├── Build IntervalService
├── Build ChordService
├── Create Keyboard component
└── Build basic playback functionality

Week 3: First Module - Intervals
├── Implement ExerciseEngine
├── Create IntervalExercise component
├── Build question generator
├── Implement answer evaluation
├── Create feedback system
├── Add session management
└── Basic localStorage persistence
```

**Deliverable:** Functional interval recognition trainer

### Phase 2: Core Modules (Weeks 4-6)

**Goal:** Complete foundational ear training modules

```
Week 4: Chord Recognition Module
├── Implement ChordExercise
├── Create chord voicing generator
├── Build ChordSelector UI
├── Add inversion training
└── Create ChordDiagram component

Week 5: Progression Recognition Module
├── Implement ProgressionExercise
├── Create progression generator
├── Build RomanNumeralSelector
├── Implement key detection
└── Create ProgressionTimeline component

Week 6: Progress System
├── Implement ProgressTracker
├── Create spaced repetition algorithm
├── Build analytics calculations
├── Create progress visualization
├── Implement weak area identification
└── Add recommendation engine
```

**Deliverable:** Three functional modules with progress tracking

### Phase 3: Harmony Training (Weeks 7-9)

**Goal:** Implement the core innovation - contextual harmony training

```
Week 7: Harmony Stage 1
├── Build MelodyOverHarmony component
├── Implement chord-tone identification
├── Create color description exercises
├── Build HarmonyTimeline visualization
└── Add scale degree indicator

Week 8: Harmony Stage 2
├── Build ChordFromContext component
├── Implement harmonic option generator
├── Create context-aware chord selection
└── Add progression continuation exercises

Week 9: Harmony Stage 3
├── Build ActiveHarmonization component
├── Create backing track player
├── Implement melody evaluation
├── Add harmonization feedback
└── Create practice mode with metronome
```

**Deliverable:** Complete 3-stage harmony training system

### Phase 4: Advanced Modules (Weeks 10-12)

**Goal:** Specialized training and gamification

```
Week 10: Functional Harmony Deep Dives
├── Implement ii-V-I training
├── Create Blues harmony module
├── Build diatonic progression trainer
└── Add modal interchange exercises

Week 11: Kinesthetic & Improvisation
├── Build voice leading drills
├── Create comping pattern trainer
├── Implement chord tone improvisation
├── Add guide tone line exercises
└── Create backing track system

Week 12: Gamification System
├── Implement achievement system
├── Create streak tracking
├── Build XP and leveling
├── Add daily goals
├── Create achievement UI/notifications
└── Implement leaderboard (local)
```

**Deliverable:** Full suite of modules with gamification

### Phase 5: Song Learning & Polish (Weeks 13-14)

**Goal:** Song integration and production quality

```
Week 13: Song Learning Module
├── Create song data structure
├── Build song browser
├── Implement chord chart view
├── Create section practice mode
├── Add full playthrough mode
└── Build improvisation over form

Week 14: Polish & Testing
├── Comprehensive testing
├── Performance optimization
├── Accessibility audit
├── Mobile responsiveness
├── User testing feedback
├── Bug fixes
└── Documentation
```

**Deliverable:** Production-ready application

### Dependency Graph

```
                        ┌───────────────────┐
                        │  Phase 1: Core    │
                        │  (AudioEngine,    │
                        │  MusicTheory,     │
                        │  Intervals)       │
                        └─────────┬─────────┘
                                  │
                    ┌─────────────┼─────────────┐
                    │             │             │
                    ▼             ▼             ▼
          ┌─────────────┐ ┌─────────────┐ ┌─────────────┐
          │   Phase 2   │ │   Phase 2   │ │   Phase 2   │
          │   Chords    │ │ Progressions│ │  Progress   │
          └──────┬──────┘ └──────┬──────┘ └──────┬──────┘
                 │               │               │
                 └───────────────┼───────────────┘
                                 │
                                 ▼
                        ┌─────────────────┐
                        │    Phase 3      │
                        │    Harmony      │
                        │    Training     │
                        └────────┬────────┘
                                 │
                    ┌────────────┼────────────┐
                    │            │            │
                    ▼            ▼            ▼
          ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
          │   Phase 4    │ │   Phase 4    │ │   Phase 4    │
          │  Functional  │ │  Kinesthetic │ │ Gamification │
          │   Harmony    │ │  Improvise   │ │              │
          └──────────────┘ └──────────────┘ └──────────────┘
                                 │
                                 ▼
                        ┌─────────────────┐
                        │    Phase 5      │
                        │  Song Learning  │
                        │  & Polish       │
                        └─────────────────┘
```

---

## 8. Future Considerations

### 8.1 Backend Integration

```typescript
// Future API structure
interface APIEndpoints {
  // Authentication
  'POST /auth/register': { email, password } => User;
  'POST /auth/login': { email, password } => { user, token };
  'POST /auth/logout': void => void;

  // User data
  'GET /users/me': void => User;
  'PUT /users/me': Partial<User> => User;

  // Progress sync
  'GET /progress': void => UserProgress;
  'PUT /progress': UserProgress => UserProgress;
  'POST /progress/sync': LocalChanges => MergedProgress;

  // Content
  'GET /songs': { genre?, difficulty? } => Song[];
  'GET /songs/:id': void => Song;

  // Social
  'GET /leaderboard': { period, moduleId? } => LeaderboardEntry[];
  'GET /achievements/:userId': void => Achievement[];
}
```

### 8.2 Authentication System

```typescript
// OAuth providers to support
type AuthProvider = 'email' | 'google' | 'apple' | 'github';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  // Actions
  login: (provider: AuthProvider) => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
}
```

### 8.3 Pitch Detection Roadmap

```
Phase A: Browser Audio Input
├── Request microphone permission
├── Audio stream capture
└── Basic volume/presence detection

Phase B: Pitch Detection
├── Integrate pitch detection library (pitchfinder, ML5.js)
├── Frequency to note mapping
├── Confidence thresholding
└── Latency optimization

Phase C: Integration
├── Real-time feedback during exercises
├── Play-along mode with scoring
├── Recording and playback
└── Practice analytics from recordings

Considerations:
- Browser compatibility (Web Audio API)
- Noise cancellation
- Polyphonic detection (advanced)
- Mobile microphone handling
```

### 8.4 Mobile Applications

```
React Native Migration Path:
├── Shared business logic (services/, types/, utils/)
├── Platform-specific audio (expo-av or react-native-audio-api)
├── Native keyboard visualization
├── Offline-first with sync
└── Push notifications for streaks

Alternatively:
├── PWA with service workers
├── Capacitor wrapper
└── Native audio bridges
```

### 8.5 Content Expansion

```
Future Content Additions:
├── More instrument samples (Rhodes, Organ, Strings)
├── Expanded song library with licensing
├── Genre-specific modules (Jazz, Classical, Pop)
├── Sight-reading integration
├── Real-time MIDI keyboard support
├── Teacher/student accounts
├── Custom curriculum builder
└── Community-created exercises
```

### 8.6 Analytics & Machine Learning

```typescript
// Future analytics capabilities
interface AdvancedAnalytics {
  // Learning patterns
  optimalPracticeTime(): TimeOfDay;
  learningVelocityCurve(): TrendData[];
  predictMasteryDate(concept: string): Date;

  // Adaptive difficulty
  personalizedDifficulty(exercise: Exercise): DifficultyLevel;
  dynamicExerciseGeneration(): Exercise;

  // Insights
  compareToSimilarUsers(): PeerComparison;
  identifyBlockingConcepts(): Concept[];
  suggestBreakthrough(): Recommendation;
}
```

---

## Appendix A: Key Libraries Reference

| Library | Version | Purpose | Documentation |
|---------|---------|---------|---------------|
| React | 18.x | UI Framework | [react.dev](https://react.dev) |
| TypeScript | 5.x | Type Safety | [typescriptlang.org](https://typescriptlang.org) |
| Tone.js | 14.x | Audio Engine | [tonejs.github.io](https://tonejs.github.io) |
| Tonal.js | 4.x | Music Theory | [github.com/tonaljs](https://github.com/tonaljs/tonal) |
| Zustand | 4.x | State Management | [zustand-demo.pmnd.rs](https://zustand-demo.pmnd.rs) |
| Tailwind CSS | 3.x | Styling | [tailwindcss.com](https://tailwindcss.com) |
| Vite | 5.x | Build Tool | [vitejs.dev](https://vitejs.dev) |
| Vitest | 1.x | Testing | [vitest.dev](https://vitest.dev) |
| React Router | 6.x | Routing | [reactrouter.com](https://reactrouter.com) |

---

## Appendix B: Glossary

| Term | Definition |
|------|------------|
| **Chord Tone** | A note that is part of the current chord (root, 3rd, 5th, 7th) |
| **Tension** | A note that adds color to a chord (9th, 11th, 13th) |
| **Voice Leading** | The movement of individual notes between chords |
| **Roman Numeral** | Chord notation relative to key (I, ii, V7, etc.) |
| **Harmonic Function** | A chord's role in progression (tonic, dominant, etc.) |
| **Shell Voicing** | Minimal chord voicing (root, 3rd, 7th) |
| **Drop Voicing** | Open voicing created by dropping a voice an octave |
| **Comping** | Accompanying a soloist with chordal playing |
| **Guide Tones** | The 3rd and 7th of a chord, defining its quality |

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | 2026-01-21 | Architect | Initial architecture document |

---

*This is a living document. Update as the project evolves.*
