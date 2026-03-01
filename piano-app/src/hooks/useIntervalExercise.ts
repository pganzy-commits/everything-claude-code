import { useState, useCallback } from 'react';
import type { IntervalQuestion, Difficulty, SessionStats, AnswerResult, IntervalName } from '../types/music';
import { generateIntervalQuestion } from '../services/exerciseGenerator';
import { audioEngine } from '../services/audioEngine';

interface UseIntervalExerciseReturn {
  currentQuestion: IntervalQuestion | null;
  sessionStats: SessionStats;
  difficulty: Difficulty;
  isPlaying: boolean;
  hasStarted: boolean;
  lastResult: AnswerResult | null;
  startExercise: () => void;
  playCurrentInterval: () => Promise<void>;
  submitAnswer: (answer: IntervalName) => void;
  nextQuestion: () => void;
  setDifficulty: (difficulty: Difficulty) => void;
  resetSession: () => void;
}

export function useIntervalExercise(): UseIntervalExerciseReturn {
  const [currentQuestion, setCurrentQuestion] = useState<IntervalQuestion | null>(null);
  const [difficulty, setDifficulty] = useState<Difficulty>('beginner');
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [lastResult, setLastResult] = useState<AnswerResult | null>(null);
  const [sessionStats, setSessionStats] = useState<SessionStats>({
    totalQuestions: 0,
    correctAnswers: 0,
    accuracy: 0,
  });

  const generateNewQuestion = useCallback(() => {
    const question = generateIntervalQuestion(difficulty);
    setCurrentQuestion(question);
    setLastResult(null);
    return question;
  }, [difficulty]);

  const playCurrentInterval = useCallback(async () => {
    if (!currentQuestion || isPlaying) return;

    setIsPlaying(true);
    try {
      await audioEngine.playInterval(currentQuestion.rootNote, currentQuestion.targetNote);
    } finally {
      setTimeout(() => setIsPlaying(false), 1500);
    }
  }, [currentQuestion, isPlaying]);

  const startExercise = useCallback(() => {
    setHasStarted(true);
    setSessionStats({ totalQuestions: 0, correctAnswers: 0, accuracy: 0 });
    const question = generateNewQuestion();

    // Auto-play the first interval
    setTimeout(async () => {
      setIsPlaying(true);
      try {
        await audioEngine.playInterval(question.rootNote, question.targetNote);
      } finally {
        setTimeout(() => setIsPlaying(false), 1500);
      }
    }, 500);
  }, [generateNewQuestion]);

  const submitAnswer = useCallback((answer: IntervalName) => {
    if (!currentQuestion || lastResult) return;

    const correct = answer === currentQuestion.interval.name;

    const newStats = {
      totalQuestions: sessionStats.totalQuestions + 1,
      correctAnswers: sessionStats.correctAnswers + (correct ? 1 : 0),
      accuracy: 0,
    };
    newStats.accuracy = (newStats.correctAnswers / newStats.totalQuestions) * 100;

    setSessionStats(newStats);
    setLastResult({
      correct,
      question: currentQuestion,
      userAnswer: answer,
    });
  }, [currentQuestion, lastResult, sessionStats]);

  const nextQuestion = useCallback(() => {
    const question = generateNewQuestion();

    // Auto-play the next interval
    setTimeout(async () => {
      setIsPlaying(true);
      try {
        await audioEngine.playInterval(question.rootNote, question.targetNote);
      } finally {
        setTimeout(() => setIsPlaying(false), 1500);
      }
    }, 300);
  }, [generateNewQuestion]);

  const resetSession = useCallback(() => {
    setHasStarted(false);
    setCurrentQuestion(null);
    setLastResult(null);
    setSessionStats({ totalQuestions: 0, correctAnswers: 0, accuracy: 0 });
  }, []);

  return {
    currentQuestion,
    sessionStats,
    difficulty,
    isPlaying,
    hasStarted,
    lastResult,
    startExercise,
    playCurrentInterval,
    submitAnswer,
    nextQuestion,
    setDifficulty,
    resetSession,
  };
}
