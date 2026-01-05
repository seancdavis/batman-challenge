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
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-batman-yellow/30 border-t-batman-yellow rounded-full animate-spin mb-4" />
          <div className="text-batman-cream font-subheading uppercase tracking-wide">
            Loading your challenge...
          </div>
        </div>
      </div>
    )
  }

  // No challenge yet - show start button
  if (!challenge) {
    return (
      <div className="text-center py-16 animate-fade-in">
        {/* Bat icon */}
        <div className="mb-8 relative inline-block">
          <div className="absolute inset-0 blur-2xl bg-batman-yellow/20 scale-150" />
          <img
            src="/bat-light.svg"
            alt=""
            className="w-24 h-auto relative z-10 opacity-80"
          />
        </div>

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

        <style>{`
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fade-in 0.5s ease-out;
          }
        `}</style>
      </div>
    )
  }

  // Calculate overall progress based on completed days (not current day)
  const overallProgress = Math.round((completedDays.length / 30) * 100)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-5xl font-headline tracking-wide mb-1">
            Day <span className="text-batman-yellow">{currentDay}</span>
          </h1>
          <p className="text-batman-muted font-body text-sm">
            Started {new Date(challenge.startDate).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric'
            })}
          </p>
        </div>
        <div className="text-right">
          <div className="text-5xl font-headline text-batman-yellow leading-none">{completedDays.length}</div>
          <div className="text-batman-muted text-xs font-subheading uppercase tracking-wider mt-1">
            of 30 Days
          </div>
        </div>
      </div>

      {/* Overall Progress Bar */}
      <Card variant="yellow">
        <div className="flex items-center justify-between mb-3">
          <span className="font-subheading uppercase tracking-wide text-sm text-batman-cream">
            Challenge Progress
          </span>
          <span className="font-headline text-2xl text-batman-yellow">{overallProgress}%</span>
        </div>
        <ProgressBar progress={overallProgress} showPercentage={false} />
      </Card>

      {/* Today's Workout */}
      <div>
        <h2 className="text-2xl font-headline tracking-wide mb-6 text-batman-cream flex items-center gap-3">
          <span className="w-8 h-1 bg-batman-yellow" />
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
          <div className="mt-6 comic-card border-batman-success p-6 relative overflow-hidden">
            {/* Success glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(50,205,50,0.1)_0%,_transparent_70%)]" />

            <div className="relative z-10 flex items-center gap-4">
              <div className="w-14 h-14 bg-batman-success flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-8 h-8 text-white"
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
                <div className="font-headline text-2xl text-batman-success tracking-wide">
                  Day {currentDay} Complete!
                </div>
                <div className="text-batman-cream text-sm">
                  Great work! Come back tomorrow for more.
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Calendar */}
      <ChallengeCalendar currentDay={currentDay} completedDays={completedDays} />
    </div>
  )
}
