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
    <div className="bg-gray-800 rounded-xl border border-gray-700 p-5">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold">{getExerciseLabel(exerciseType)}</h3>
        <span className={`text-lg font-mono ${isComplete ? 'text-green-400' : 'text-gray-300'}`}>
          {currentTotal} / {targetReps}
        </span>
      </div>

      <ProgressBar progress={progress} showPercentage={false} className="mb-4" />

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
        <div className="flex items-center justify-center gap-2 py-2 text-green-400">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          <span className="font-medium">Complete!</span>
        </div>
      )}
    </div>
  )
}
