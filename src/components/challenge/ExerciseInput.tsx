import { useState } from 'react'
import { Button, Input, ProgressBar } from '../ui'
import { getExerciseLabel } from '../../lib/challengeData'

interface ExerciseInputProps {
  exerciseType: string
  currentTotal: number
  targetReps: number
  onAddReps: (reps: number) => Promise<void>
  isLoading: boolean
}

export function ExerciseInput({
  exerciseType,
  currentTotal,
  targetReps,
  onAddReps,
  isLoading,
}: ExerciseInputProps) {
  const [reps, setReps] = useState('')
  const remaining = Math.max(0, targetReps - currentTotal)
  const progress = Math.min(100, (currentTotal / targetReps) * 100)
  const isComplete = currentTotal >= targetReps

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const repsNum = parseInt(reps)
    if (repsNum > 0) {
      await onAddReps(repsNum)
      setReps('')
    }
  }

  return (
    <div className="comic-card p-6">
      <div className="relative z-10">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-subheading uppercase tracking-wide text-white">
            {getExerciseLabel(exerciseType)}
          </h3>
          <span
            className={`text-2xl font-headline ${isComplete ? 'text-batman-success' : 'text-batman-yellow'}`}
          >
            {currentTotal} / {targetReps}
          </span>
        </div>

        <ProgressBar progress={progress} showPercentage={false} className="mb-5" />

        {!isComplete ? (
          <form onSubmit={handleSubmit} className="flex gap-3">
            <Input
              type="number"
              min="1"
              max={remaining}
              value={reps}
              onChange={(e) => setReps(e.target.value)}
              placeholder={`Enter reps (${remaining} remaining)`}
              className="flex-1"
            />
            <Button type="submit" disabled={isLoading || !reps || parseInt(reps) < 1}>
              {isLoading ? 'Adding...' : 'Add'}
            </Button>
          </form>
        ) : (
          <div className="flex items-center justify-center gap-3 py-3">
            <div className="w-8 h-8 bg-batman-success rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <span className="font-headline text-xl text-batman-success tracking-wide">
              Complete!
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
