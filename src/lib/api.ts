// API client for Batman Challenge

async function apiFetch<T>(
  path: string,
  options: RequestInit & { userId?: string } = {}
): Promise<T> {
  const { userId, ...fetchOptions } = options

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(fetchOptions.headers as Record<string, string>),
  }

  if (userId) {
    headers['x-user-id'] = userId
  }

  const response = await fetch(path, {
    ...fetchOptions,
    headers,
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Request failed' }))
    throw new Error(error.error || 'Request failed')
  }

  return response.json()
}

// Challenge APIs
export async function getActiveChallenge(userId: string) {
  return apiFetch<{ challenge: Challenge | null }>('/api/challenges', { userId })
}

export async function startChallenge(userId: string, startDate?: string) {
  return apiFetch<{ challenge: Challenge }>('/api/challenges', {
    method: 'POST',
    body: JSON.stringify({ startDate }),
    userId,
  })
}

// Reps APIs
export async function getDayReps(userId: string, challengeId: string, dayNumber: number) {
  const params = new URLSearchParams({
    challengeId,
    dayNumber: dayNumber.toString(),
  })
  return apiFetch<DayRepsResponse>(`/api/reps?${params}`, { userId })
}

export async function addReps(
  userId: string,
  challengeId: string,
  dayNumber: number,
  exerciseType: string,
  reps: number
) {
  return apiFetch<{ entry: RepEntry }>('/api/reps', {
    method: 'POST',
    body: JSON.stringify({ challengeId, dayNumber, exerciseType, reps }),
    userId,
  })
}

export async function deleteReps(userId: string, entryId: string) {
  return apiFetch<{ success: boolean }>(`/api/reps?id=${entryId}`, {
    method: 'DELETE',
    userId,
  })
}

// Types
export interface Challenge {
  id: string
  userId: string
  startDate: string
  isActive: boolean
  completedAt: string | null
  createdAt: string
}

export interface RepEntry {
  id: string
  challengeId: string
  dayNumber: number
  exerciseType: string
  reps: number
  recordedAt: string
}

export interface ExerciseProgress {
  exerciseType: string
  target: number
  completed: number
  percentage: number
  isComplete: boolean
}

export interface DayRepsResponse {
  dayNumber: number
  entries: RepEntry[]
  goals: { type: string; reps: number }[]
  totals: Record<string, number>
  progress: ExerciseProgress[]
  isComplete: boolean
}
