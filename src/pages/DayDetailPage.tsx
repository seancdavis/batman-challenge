import { useParams, Link } from 'react-router-dom'
import { Button, Card } from '../components/ui'
import { ExerciseInput } from '../components/challenge/ExerciseInput'
import { useChallenge } from '../hooks/useChallenge'
import { useDailyReps } from '../hooks/useDailyReps'
import { getDayGoals, getExerciseLabel } from '../lib/challengeData'

export function DayDetailPage() {
  const { dayNumber: dayParam } = useParams<{ dayNumber: string }>()
  const dayNumber = parseInt(dayParam || '1')

  const { challenge, isLoading: challengeLoading, currentDay } = useChallenge()
  const {
    entries,
    progress,
    isComplete,
    isLoading: repsLoading,
    isAdding,
    addReps,
    deleteEntry,
  } = useDailyReps(challenge?.id, dayNumber)

  const dayGoals = getDayGoals(dayNumber)
  const isToday = dayNumber === currentDay
  const isFuture = dayNumber > currentDay

  if (challengeLoading || repsLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-gray-400">Loading...</div>
      </div>
    )
  }

  if (!challenge) {
    return (
      <div className="text-center py-16">
        <h1 className="text-2xl font-bold mb-4">No Active Challenge</h1>
        <p className="text-gray-400 mb-6">Start a challenge to track your workouts.</p>
        <Link to="/dashboard">
          <Button>Go to Dashboard</Button>
        </Link>
      </div>
    )
  }

  if (!dayGoals) {
    return (
      <div className="text-center py-16">
        <h1 className="text-2xl font-bold mb-4">Invalid Day</h1>
        <Link to="/dashboard">
          <Button>Go to Dashboard</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/dashboard">
            <Button variant="ghost" size="sm">
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">
              Day <span className="text-yellow-500">{dayNumber}</span>
            </h1>
            {isToday && <span className="text-sm text-yellow-500">Today</span>}
            {isFuture && <span className="text-sm text-gray-500">Upcoming</span>}
          </div>
        </div>

        {isComplete && (
          <div className="flex items-center gap-2 text-green-400">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="font-medium">Complete</span>
          </div>
        )}
      </div>

      {/* Exercise Inputs */}
      <div className="space-y-4">
        {progress.length > 0
          ? progress.map((exercise) => (
              <ExerciseInput
                key={exercise.exerciseType}
                exerciseType={exercise.exerciseType}
                currentTotal={exercise.completed}
                targetReps={exercise.target}
                onAddReps={(reps) => addReps(exercise.exerciseType, reps)}
                isLoading={isAdding}
              />
            ))
          : dayGoals.exercises.map((exercise) => (
              <ExerciseInput
                key={exercise.type}
                exerciseType={exercise.type}
                currentTotal={0}
                targetReps={exercise.reps}
                onAddReps={(reps) => addReps(exercise.type, reps)}
                isLoading={isAdding}
              />
            ))}
      </div>

      {/* Recent Entries */}
      {entries.length > 0 && (
        <Card>
          <h3 className="font-semibold mb-4">Today's Log</h3>
          <div className="space-y-2">
            {entries.map((entry) => (
              <div
                key={entry.id}
                className="flex items-center justify-between py-2 border-b border-gray-700 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <span className="text-yellow-500 font-mono">{entry.reps}</span>
                  <span className="text-gray-300">{getExerciseLabel(entry.exerciseType)}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-gray-500 text-sm">
                    {new Date(entry.recordedAt).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                  <button
                    onClick={() => deleteEntry(entry.id)}
                    className="text-gray-500 hover:text-red-400 transition-colors"
                    title="Delete entry"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Navigation */}
      <div className="flex justify-between">
        {dayNumber > 1 ? (
          <Link to={`/day/${dayNumber - 1}`}>
            <Button variant="secondary">
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Day {dayNumber - 1}
            </Button>
          </Link>
        ) : (
          <div />
        )}

        {dayNumber < 30 && (
          <Link to={`/day/${dayNumber + 1}`}>
            <Button variant="secondary">
              Day {dayNumber + 1}
              <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Button>
          </Link>
        )}
      </div>
    </div>
  )
}
