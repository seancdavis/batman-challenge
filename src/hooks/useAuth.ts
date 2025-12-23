import { useState, useEffect } from 'react'
import { authClient } from '../lib/auth'

interface User {
  id: string
  email: string
  name?: string
  image?: string
}

interface Session {
  id: string
  userId: string
  expiresAt: Date
}

interface AuthState {
  user: User | null
  session: Session | null
  isLoading: boolean
  signOut: () => Promise<void>
  refetch: () => Promise<void>
}

export function useAuth(): AuthState {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const fetchSession = async () => {
    try {
      const result = await authClient.getSession()
      if (result.data?.session && result.data?.user) {
        setSession(result.data.session as unknown as Session)
        setUser(result.data.user as unknown as User)
      } else {
        setSession(null)
        setUser(null)
      }
    } catch {
      setSession(null)
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchSession()
  }, [])

  const signOut = async () => {
    try {
      await authClient.signOut()
      setSession(null)
      setUser(null)
    } catch (err) {
      console.error('Sign out failed:', err)
    }
  }

  return {
    user,
    session,
    isLoading,
    signOut,
    refetch: fetchSession,
  }
}
