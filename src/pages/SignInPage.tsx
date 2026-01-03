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
    <div className="min-h-screen bg-batman-black bg-halftone flex items-center justify-center">
      <div className="w-full max-w-md p-8">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-headline text-batman-yellow text-shadow-comic tracking-wider mb-3">
            BATMAN
          </h1>
          <p className="text-batman-cream font-subheading uppercase tracking-wide">
            Sign in to start your challenge
          </p>
        </div>

        <div className="neon-auth-wrapper">
          <AuthView pathname="sign-in" />
        </div>
      </div>
      <style>{`
        .neon-auth-wrapper {
          --radius: 0;
          color: white;
        }
        .neon-auth-wrapper > div {
          background: #1a1a1a;
          border: 3px solid #3a3a3a;
          box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.8);
          border-radius: 0;
          padding: 2rem;
        }
        .neon-auth-wrapper h1,
        .neon-auth-wrapper h2,
        .neon-auth-wrapper h3 {
          font-family: 'Bebas Neue', sans-serif;
          color: white;
          font-weight: 400;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }
        .neon-auth-wrapper p,
        .neon-auth-wrapper label {
          font-family: 'Raleway', sans-serif;
          color: #F5F5DC;
        }
        .neon-auth-wrapper input {
          font-family: 'Raleway', sans-serif;
          background: #1a1a1a;
          border: 3px solid #3a3a3a;
          color: white;
          padding: 0.75rem 1rem;
          transition: border-color 0.2s;
        }
        .neon-auth-wrapper input:focus {
          outline: none;
          border-color: #FFD700;
          box-shadow: 0 0 0 2px rgba(255, 215, 0, 0.2);
        }
        .neon-auth-wrapper input::placeholder {
          color: rgba(255, 255, 255, 0.4);
        }
        .neon-auth-wrapper button {
          font-family: 'Oswald', sans-serif;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          border: 3px solid #0a0a0a;
          box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.8);
          background: #FFD700;
          color: #0a0a0a;
          padding: 0.75rem 1.5rem;
          transition: transform 0.1s, box-shadow 0.1s;
        }
        .neon-auth-wrapper button:hover {
          transform: translate(-2px, -2px);
          box-shadow: 6px 6px 0 rgba(0, 0, 0, 0.8);
          background: #FFEA00;
        }
        .neon-auth-wrapper button:active {
          transform: translate(2px, 2px);
          box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.8);
        }
        .neon-auth-wrapper a {
          color: #FFD700;
          text-decoration: none;
          transition: color 0.2s;
        }
        .neon-auth-wrapper a:hover {
          color: #FFEA00;
        }
      `}</style>
    </div>
  )
}
