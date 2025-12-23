import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthView } from '@neondatabase/neon-js/auth/react/ui'
import { useAuth } from '../hooks/useAuth'

export function SignInPage() {
  const { session } = useAuth()
  const navigate = useNavigate()

  // Redirect to dashboard if already signed in
  useEffect(() => {
    if (session) {
      navigate('/dashboard')
    }
  }, [session, navigate])

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-yellow-500 mb-2">BATMAN</h1>
          <p className="text-gray-400">Sign in to start your challenge</p>
        </div>

        <AuthView pathname="sign-in" />
      </div>
    </div>
  )
}
