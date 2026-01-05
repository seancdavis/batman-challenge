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
        <div className="text-center">
          <div className="inline-block w-10 h-10 border-4 border-batman-yellow/30 border-t-batman-yellow rounded-full animate-spin mb-4" />
          <div className="text-batman-cream font-subheading uppercase tracking-wide">Loading...</div>
        </div>
      </div>
    )
  }

  if (!challenge) {
    return (
      <div className="text-center py-16">
        <h1 className="text-3xl font-headline mb-6 tracking-wide">No Active Challenge</h1>
        <p className="text-batman-cream mb-8">Start a challenge to track your workouts.</p>
        <Link to="/dashboard">
          <Button>Go to Dashboard</Button>
        </Link>
      </div>
    )
  }

  if (!dayGoals) {
    return (
      <div className="text-center py-16">
        <h1 className="text-3xl font-headline mb-6 tracking-wide">Invalid Day</h1>
        <Link to="/dashboard">
          <Button>Go to Dashboard</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/dashboard">
            <Button variant="ghost" size="sm">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            <h1 className="text-5xl font-headline tracking-wide">
              Day <span className="text-batman-yellow">{dayNumber}</span>
            </h1>
            {isToday && (
              <span className="inline-block mt-1 px-2 py-0.5 bg-batman-yellow/20 text-xs font-subheading uppercase tracking-wider text-batman-yellow">
                Today
              </span>
            )}
            {isFuture && (
              <span className="inline-block mt-1 px-2 py-0.5 bg-batman-steel text-xs font-subheading uppercase tracking-wider text-batman-muted">
                Upcoming
              </span>
            )}
          </div>
        </div>

        {isComplete && (
          <div className="flex items-center gap-3 px-4 py-2 bg-batman-success/10 border-2 border-batman-success">
            <div className="w-8 h-8 bg-batman-success flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <span className="font-headline text-lg text-batman-success tracking-wide">Complete</span>
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
          <h3 className="font-headline text-xl tracking-wide mb-4 text-batman-cream flex items-center gap-3">
            <span className="w-6 h-1 bg-batman-yellow" />
            Activity Log
          </h3>
          <div className="space-y-0">
            {entries.map((entry, index) => (
              <div
                key={entry.id}
                className={`flex items-center justify-between py-4 ${
                  index !== entries.length - 1 ? 'border-b-2 border-batman-steel' : ''
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className="text-batman-yellow font-headline text-3xl min-w-[3ch] text-right">
                    {entry.reps}
                  </span>
                  <span className="text-batman-cream font-subheading uppercase tracking-wide">
                    {getExerciseLabel(entry.exerciseType)}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-batman-muted text-sm font-body">
                    {new Date(entry.recordedAt).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                  <button
                    onClick={() => deleteEntry(entry.id)}
                    className="text-batman-muted hover:text-batman-red transition-colors p-2 hover:bg-batman-red/10"
                    title="Delete entry"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
      <div className="flex justify-between pt-4">
        {dayNumber > 1 ? (
          <Link to={`/day/${dayNumber - 1}`}>
            <Button variant="secondary">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
