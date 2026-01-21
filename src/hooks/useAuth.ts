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
      console.log('fetchSession: calling getSession...')
      const result = await authClient.getSession()
      console.log('fetchSession: result =', JSON.stringify(result, null, 2))
      if (result.data?.session && result.data?.user) {
        console.log('fetchSession: session found, setting user')
        setSession(result.data.session as unknown as Session)
        setUser(result.data.user as unknown as User)
      } else {
        console.log('fetchSession: no session found')
        setSession(null)
        setUser(null)
      }
    } catch (err) {
      console.error('fetchSession: error', err)
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
    } catch (err) {
      console.error('Sign out error:', err)
    }

    // Redirect immediately - page reload clears all state
    window.location.href = '/'
  }

  return {
    user,
    session,
    isLoading,
    signOut,
    refetch: fetchSession,
  }
}
