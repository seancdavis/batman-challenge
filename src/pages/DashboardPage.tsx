import { useState } from 'react'
import { Button, Card, ProgressBar } from '../components/ui'
import { ExerciseInput } from '../components/challenge/ExerciseInput'
import { ChallengeCalendar } from '../components/challenge/ChallengeCalendar'
import { useChallenge } from '../hooks/useChallenge'
import { useDailyReps } from '../hooks/useDailyReps'
import { getDayGoals } from '../lib/challengeData'

export function DashboardPage() {
  const { challenge, isLoading, currentDay, startChallenge } = useChallenge()
  const {
    progress,
    isComplete: dayComplete,
    isAdding,
    addReps,
  } = useDailyReps(challenge?.id, currentDay)

  const [completedDays] = useState<number[]>([])
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

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-gray-400">Loading your challenge...</div>
      </div>
    )
  }

  // No challenge yet - show start button
  if (!challenge) {
    return (
      <div className="text-center py-16">
        <h1 className="text-4xl font-bold mb-4">
          Ready to Begin Your
          <br />
          <span className="text-yellow-500">Batman Challenge?</span>
        </h1>

        <p className="text-gray-400 mb-8 max-w-md mx-auto">
          Start your 30-day fitness journey today. Track your squats, push-ups, and sit-ups as you
          work through progressively harder daily goals.
        </p>

        <Button size="lg" onClick={handleStartChallenge} disabled={isStarting}>
          {isStarting ? 'Starting...' : 'Start Challenge'}
        </Button>
      </div>
    )
  }

  // Calculate overall progress
  const overallProgress = Math.round(((currentDay - 1 + (dayComplete ? 1 : 0)) / 30) * 100)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">
            Day <span className="text-yellow-500">{currentDay}</span>
          </h1>
          <p className="text-gray-400">
            Started {new Date(challenge.startDate).toLocaleDateString()}
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-yellow-500">{overallProgress}%</div>
          <div className="text-gray-400 text-sm">Overall Progress</div>
        </div>
      </div>

      {/* Overall Progress Bar */}
      <Card>
        <ProgressBar progress={overallProgress} label="Challenge Progress" />
      </Card>

      {/* Today's Workout */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Today's Workout</h2>

        {dayGoals ? (
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
        ) : (
          <Card>
            <p className="text-gray-400">No workout data for this day.</p>
          </Card>
        )}

        {dayComplete && (
          <Card className="mt-4 bg-green-900/30 border-green-700">
            <div className="flex items-center gap-3">
              <svg
                className="w-8 h-8 text-green-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <div className="font-semibold text-green-400">Day {currentDay} Complete!</div>
                <div className="text-sm text-gray-400">Great work! Come back tomorrow for more.</div>
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
