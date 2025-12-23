export type ExerciseType = 'squats' | 'pushups' | 'situps'

export interface DayGoal {
  day: number
  exercises: {
    type: ExerciseType
    reps: number
  }[]
}

export interface ExerciseProgress {
  exerciseType: ExerciseType
  target: number
  completed: number
  percentage: number
  isComplete: boolean
}

export interface DayProgress {
  dayNumber: number
  exercises: ExerciseProgress[]
  isComplete: boolean
}
