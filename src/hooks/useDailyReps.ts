import { useState, useEffect, useCallback } from 'react'
import { useAuth } from './useAuth'
import { getDayReps, addReps, deleteReps } from '../lib/api'
import type { DayRepsResponse } from '../lib/api'

export function useDailyReps(challengeId: string | undefined, dayNumber: number) {
  const { user } = useAuth()
  const [data, setData] = useState<DayRepsResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAdding, setIsAdding] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchReps = useCallback(async () => {
    if (!user?.id || !challengeId || !dayNumber) {
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const result = await getDayReps(user.id, challengeId, dayNumber)
      setData(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load reps')
    } finally {
      setIsLoading(false)
    }
  }, [user?.id, challengeId, dayNumber])

  useEffect(() => {
    fetchReps()
  }, [fetchReps])

  const add = useCallback(
    async (exerciseType: string, reps: number) => {
      if (!user?.id || !challengeId) return

      setIsAdding(true)
      setError(null)

      try {
        await addReps(user.id, challengeId, dayNumber, exerciseType, reps)
        // Refetch to get updated totals
        await fetchReps()
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to add reps')
        throw err
      } finally {
        setIsAdding(false)
      }
    },
    [user?.id, challengeId, dayNumber, fetchReps]
  )

  const remove = useCallback(
    async (entryId: string) => {
      if (!user?.id) return

      try {
        await deleteReps(user.id, entryId)
        await fetchReps()
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to delete entry')
        throw err
      }
    },
    [user?.id, fetchReps]
  )

  return {
    entries: data?.entries || [],
    progress: data?.progress || [],
    totals: data?.totals || {},
    isComplete: data?.isComplete || false,
    isLoading,
    isAdding,
    error,
    addReps: add,
    deleteEntry: remove,
    refetch: fetchReps,
  }
}
