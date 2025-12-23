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

        <div className="neon-auth-wrapper">
          <AuthView pathname="sign-in" />
        </div>
      </div>
      <style>{`
        .neon-auth-wrapper {
          --radius: 0.75rem;
          color: white;
        }
        .neon-auth-wrapper > div {
          background: rgb(31 41 55);
          border: 1px solid rgb(55 65 81);
          border-radius: var(--radius);
          padding: 1.5rem;
        }
        .neon-auth-wrapper h1,
        .neon-auth-wrapper h2,
        .neon-auth-wrapper h3 {
          color: white;
          font-weight: 600;
        }
        .neon-auth-wrapper p {
          color: rgb(156 163 175);
        }
        .neon-auth-wrapper button {
          border-radius: var(--radius);
          padding: 0.75rem 1rem;
          font-weight: 500;
          transition: all 0.2s;
        }
        .neon-auth-wrapper button:hover {
          opacity: 0.9;
        }
      `}</style>
    </div>
  )
}
