import { useIntervalExercise } from '../hooks/useIntervalExercise';
import { INTERVALS, DIFFICULTY_LEVELS, type Difficulty, type IntervalName } from '../types/music';

export function IntervalTrainer() {
  const {
    sessionStats,
    difficulty,
    isPlaying,
    hasStarted,
    startExercise,
    playCurrentInterval,
    submitAnswer,
    nextQuestion,
    setDifficulty,
    resetSession,
    lastResult,
  } = useIntervalExercise();

  const availableIntervals = DIFFICULTY_LEVELS[difficulty];

  // Before starting
  if (!hasStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white flex flex-col items-center justify-center p-8">
        <div className="max-w-md w-full">
          <h1 className="text-4xl font-bold text-center mb-2">Interval Trainer</h1>
          <p className="text-slate-400 text-center mb-8">Train your ear to recognize intervals</p>

          <div className="bg-slate-800 rounded-xl p-6 mb-6">
            <label className="block text-sm font-medium text-slate-300 mb-3">Difficulty</label>
            <div className="grid grid-cols-2 gap-2">
              {(Object.keys(DIFFICULTY_LEVELS) as Difficulty[]).map((d) => (
                <button
                  key={d}
                  onClick={() => setDifficulty(d)}
                  className={`px-4 py-3 rounded-lg font-medium capitalize transition-all ${
                    difficulty === d
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
            <p className="text-sm text-slate-400 mt-3">
              {availableIntervals.length} intervals: {availableIntervals.map((i) => INTERVALS[i].shortName).join(', ')}
            </p>
          </div>

          <button
            onClick={startExercise}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-4 px-6 rounded-xl transition-all text-lg"
          >
            Start Training
          </button>
        </div>
      </div>
    );
  }

  // Active exercise
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white flex flex-col">
      {/* Header with stats */}
      <header className="bg-slate-800/50 border-b border-slate-700 px-6 py-4">
        <div className="max-w-2xl mx-auto flex justify-between items-center">
          <div>
            <span className="text-slate-400 text-sm">Score</span>
            <p className="text-2xl font-bold">
              {sessionStats.correctAnswers}/{sessionStats.totalQuestions}
            </p>
          </div>
          <div className="text-center">
            <span className="text-slate-400 text-sm">Accuracy</span>
            <p className="text-2xl font-bold">{sessionStats.accuracy.toFixed(0)}%</p>
          </div>
          <button
            onClick={resetSession}
            className="text-slate-400 hover:text-white transition-colors text-sm"
          >
            End Session
          </button>
        </div>
      </header>

      {/* Main exercise area */}
      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="max-w-lg w-full">
          {/* Feedback from last answer */}
          {lastResult && (
            <div
              className={`mb-6 p-4 rounded-xl text-center ${
                lastResult.correct ? 'bg-green-900/50 border border-green-700' : 'bg-red-900/50 border border-red-700'
              }`}
            >
              {lastResult.correct ? (
                <p className="text-green-400 font-semibold">Correct!</p>
              ) : (
                <p className="text-red-400">
                  <span className="font-semibold">
                    It was {lastResult.question.interval.displayName}
                  </span>
                </p>
              )}
            </div>
          )}

          {/* Play button */}
          <button
            onClick={lastResult ? nextQuestion : playCurrentInterval}
            disabled={isPlaying}
            className={`w-full py-8 rounded-2xl font-semibold text-xl transition-all mb-8 ${
              isPlaying
                ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                : lastResult
                ? 'bg-indigo-600 hover:bg-indigo-500 text-white'
                : 'bg-slate-700 hover:bg-slate-600 text-white'
            }`}
          >
            {isPlaying ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-pulse">Playing...</span>
              </span>
            ) : lastResult ? (
              'Next Interval'
            ) : (
              'Play Again'
            )}
          </button>

          {/* Answer buttons */}
          {!lastResult && (
            <div className="grid grid-cols-2 gap-3">
              {availableIntervals.map((intervalName) => {
                const interval = INTERVALS[intervalName];
                return (
                  <button
                    key={intervalName}
                    onClick={() => submitAnswer(intervalName as IntervalName)}
                    disabled={isPlaying}
                    className="bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 px-4 rounded-xl transition-all font-medium"
                  >
                    <span className="block text-lg">{interval.displayName}</span>
                    <span className="text-slate-400 text-sm">{interval.shortName}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
