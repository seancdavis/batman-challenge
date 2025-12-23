import type { DayGoal } from '../types'

// Batman 30-Day Challenge
// Odd days: Squats + Push-ups (progressively harder)
// Even days: Sit-ups (progressively harder)
export const CHALLENGE_GOALS: DayGoal[] = [
  { day: 1, exercises: [{ type: 'squats', reps: 100 }, { type: 'pushups', reps: 60 }] },
  { day: 2, exercises: [{ type: 'situps', reps: 60 }] },
  { day: 3, exercises: [{ type: 'squats', reps: 120 }, { type: 'pushups', reps: 80 }] },
  { day: 4, exercises: [{ type: 'situps', reps: 70 }] },
  { day: 5, exercises: [{ type: 'squats', reps: 140 }, { type: 'pushups', reps: 100 }] },
  { day: 6, exercises: [{ type: 'situps', reps: 80 }] },
  { day: 7, exercises: [{ type: 'squats', reps: 160 }, { type: 'pushups', reps: 120 }] },
  { day: 8, exercises: [{ type: 'situps', reps: 90 }] },
  { day: 9, exercises: [{ type: 'squats', reps: 180 }, { type: 'pushups', reps: 140 }] },
  { day: 10, exercises: [{ type: 'situps', reps: 100 }] },
  { day: 11, exercises: [{ type: 'squats', reps: 200 }, { type: 'pushups', reps: 150 }] },
  { day: 12, exercises: [{ type: 'situps', reps: 110 }] },
  { day: 13, exercises: [{ type: 'squats', reps: 220 }, { type: 'pushups', reps: 160 }] },
  { day: 14, exercises: [{ type: 'situps', reps: 120 }] },
  { day: 15, exercises: [{ type: 'squats', reps: 240 }, { type: 'pushups', reps: 170 }] },
  { day: 16, exercises: [{ type: 'situps', reps: 130 }] },
  { day: 17, exercises: [{ type: 'squats', reps: 260 }, { type: 'pushups', reps: 180 }] },
  { day: 18, exercises: [{ type: 'situps', reps: 140 }] },
  { day: 19, exercises: [{ type: 'squats', reps: 280 }, { type: 'pushups', reps: 190 }] },
  { day: 20, exercises: [{ type: 'situps', reps: 150 }] },
  { day: 21, exercises: [{ type: 'squats', reps: 300 }, { type: 'pushups', reps: 200 }] },
  { day: 22, exercises: [{ type: 'situps', reps: 160 }] },
  { day: 23, exercises: [{ type: 'squats', reps: 320 }, { type: 'pushups', reps: 210 }] },
  { day: 24, exercises: [{ type: 'situps', reps: 170 }] },
  { day: 25, exercises: [{ type: 'squats', reps: 340 }, { type: 'pushups', reps: 220 }] },
  { day: 26, exercises: [{ type: 'situps', reps: 180 }] },
  { day: 27, exercises: [{ type: 'squats', reps: 360 }, { type: 'pushups', reps: 240 }] },
  { day: 28, exercises: [{ type: 'situps', reps: 190 }] },
  { day: 29, exercises: [{ type: 'squats', reps: 400 }, { type: 'pushups', reps: 250 }] },
  { day: 30, exercises: [{ type: 'situps', reps: 200 }] },
]

export function getDayGoals(dayNumber: number): DayGoal | undefined {
  return CHALLENGE_GOALS.find((g) => g.day === dayNumber)
}

export function getExerciseLabel(type: string): string {
  const labels: Record<string, string> = {
    squats: 'Squats',
    pushups: 'Push-ups',
    situps: 'Sit-ups',
  }
  return labels[type] || type
}
