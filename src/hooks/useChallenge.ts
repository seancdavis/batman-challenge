import { useState, useEffect, useCallback } from 'react'
import { useAuth } from './useAuth'
import { getActiveChallenge, startChallenge } from '../lib/api'
import type { Challenge } from '../lib/api'

export function useChallenge() {
  const { user } = useAuth()
  const [challenge, setChallenge] = useState<Challenge | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchChallenge = useCallback(async () => {
    if (!user?.id) return

    setIsLoading(true)
    setError(null)

    try {
      const result = await getActiveChallenge(user.id)
      setChallenge(result.challenge)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load challenge')
    } finally {
      setIsLoading(false)
    }
  }, [user?.id])

  useEffect(() => {
    fetchChallenge()
  }, [fetchChallenge])

  const start = useCallback(
    async (startDate?: string) => {
      if (!user?.id) return

      setIsLoading(true)
      setError(null)

      try {
        const result = await startChallenge(user.id, startDate)
        setChallenge(result.challenge)
        return result.challenge
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to start challenge')
        throw err
      } finally {
        setIsLoading(false)
      }
    },
    [user?.id]
  )

  // Calculate current day based on start date
  const getCurrentDay = useCallback((): number => {
    if (!challenge?.startDate) return 1

    const start = new Date(challenge.startDate)
    const today = new Date()
    const diffTime = today.getTime() - start.getTime()
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1

    return Math.min(30, Math.max(1, diffDays))
  }, [challenge?.startDate])

  return {
    challenge,
    isLoading,
    error,
    currentDay: getCurrentDay(),
    startChallenge: start,
    refetch: fetchChallenge,
  }
}
