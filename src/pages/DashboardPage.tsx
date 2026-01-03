import { useState } from 'react'
import { Button, Card, ProgressBar } from '../components/ui'
import { ExerciseInput } from '../components/challenge/ExerciseInput'
import { ChallengeCalendar } from '../components/challenge/ChallengeCalendar'
import { useChallenge } from '../hooks/useChallenge'
import { useDailyReps } from '../hooks/useDailyReps'
import { getDayGoals } from '../lib/challengeData'

export function DashboardPage() {
  const { challenge, completedDays, isLoading, currentDay, startChallenge, refetch } = useChallenge()
  const {
    progress,
    isComplete: dayComplete,
    isAdding,
    addReps,
  } = useDailyReps(challenge?.id, currentDay)

  const [isStarting, setIsStarting] = useState(false)

  const dayGoals = getDayGoals(currentDay)

  const handleStartChallenge = async () => {
    setIsStarting(true)
    try {
      await startChallenge()
    } finally {
      setIsStarting(false)
    }
  }

  // Refetch challenge data when day is completed to update completedDays
  const handleAddReps = async (exerciseType: string, reps: number) => {
    await addReps(exerciseType, reps)
    // Refetch to update completed days in calendar
    refetch()
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-batman-cream font-subheading uppercase tracking-wide">
          Loading your challenge...
        </div>
      </div>
    )
  }

  // No challenge yet - show start button
  if (!challenge) {
    return (
      <div className="text-center py-16">
        <h1 className="text-4xl md:text-5xl font-headline mb-6 tracking-wide">
          Ready to Begin Your
          <br />
          <span className="text-batman-yellow text-shadow-comic">Batman Challenge?</span>
        </h1>

        <p className="text-batman-cream mb-10 max-w-md mx-auto leading-relaxed">
          Start your 30-day fitness journey today. Track your squats, push-ups, and sit-ups as you
          work through progressively harder daily goals.
        </p>

        <Button size="lg" onClick={handleStartChallenge} disabled={isStarting}>
          {isStarting ? 'Starting...' : 'Start Challenge'}
        </Button>
      </div>
    )
  }

  // Calculate overall progress based on completed days (not current day)
  const overallProgress = Math.round((completedDays.length / 30) * 100)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-headline tracking-wide">
            Day <span className="text-batman-yellow">{currentDay}</span>
          </h1>
          <p className="text-batman-muted font-body">
            Started {new Date(challenge.startDate).toLocaleDateString()}
          </p>
        </div>
        <div className="text-right">
          <div className="text-4xl font-headline text-batman-yellow">{completedDays.length}/30</div>
          <div className="text-batman-muted text-sm font-subheading uppercase tracking-wide">
            Days Complete
          </div>
        </div>
      </div>

      {/* Overall Progress Bar */}
      <Card variant="yellow">
        <ProgressBar progress={overallProgress} label="Challenge Progress" />
      </Card>

      {/* Today's Workout */}
      <div>
        <h2 className="text-2xl font-headline tracking-wide mb-6 text-batman-cream">
          Today's Workout
        </h2>

        {dayGoals ? (
          <div className="space-y-4">
            {progress.length > 0
              ? progress.map((exercise) => (
                  <ExerciseInput
                    key={exercise.exerciseType}
                    exerciseType={exercise.exerciseType}
                    currentTotal={exercise.completed}
                    targetReps={exercise.target}
                    onAddReps={(reps) => handleAddReps(exercise.exerciseType, reps)}
                    isLoading={isAdding}
                  />
                ))
              : dayGoals.exercises.map((exercise) => (
                  <ExerciseInput
                    key={exercise.type}
                    exerciseType={exercise.type}
                    currentTotal={0}
                    targetReps={exercise.reps}
                    onAddReps={(reps) => handleAddReps(exercise.type, reps)}
                    isLoading={isAdding}
                  />
                ))}
          </div>
        ) : (
          <Card>
            <p className="text-batman-muted">No workout data for this day.</p>
          </Card>
        )}

        {dayComplete && (
          <Card variant="success" className="mt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-batman-success rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <div className="font-headline text-xl text-batman-success tracking-wide">
                  Day {currentDay} Complete!
                </div>
                <div className="text-batman-cream text-sm">
                  Great work! Come back tomorrow for more.
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>

      {/* Calendar */}
      <ChallengeCalendar currentDay={currentDay} completedDays={completedDays} />
    </div>
  )
}
