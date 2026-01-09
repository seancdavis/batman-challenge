import { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { authClient } from '../lib/auth'

export function SignInPage() {
  const { session } = useAuth()
  const navigate = useNavigate()

  // Redirect to dashboard if already signed in
  useEffect(() => {
    if (session) {
      navigate('/dashboard')
    }
  }, [session, navigate])

  const handleGoogleSignIn = () => {
    authClient.signIn.social({
      provider: 'google',
      callbackURL: '/dashboard',
    })
  }

  return (
    <div className="min-h-screen bg-batman-black relative overflow-hidden">
      {/* Dramatic background with spotlight effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,215,0,0.15)_0%,_transparent_50%)]" />
      <div className="absolute inset-0 bg-halftone" />


      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12">
        {/* Back to Home Link */}
        <Link
          to="/"
          className="absolute top-6 left-6 flex items-center gap-2 text-batman-cream hover:text-batman-yellow transition-colors font-subheading uppercase tracking-wide text-sm"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Home
        </Link>

        {/* Bat Signal Logo */}
        <div className="mb-8 relative">
          <div className="absolute inset-0 blur-3xl bg-batman-yellow/20 scale-150" />
          <img
            src="/bat-light.svg"
            alt="Batman Signal"
            className="w-32 h-auto relative z-10 drop-shadow-[0_0_30px_rgba(255,215,0,0.5)]"
          />
        </div>

        {/* Title */}
        <div className="text-center mb-10">
          <h1 className="text-6xl md:text-7xl font-headline text-batman-yellow text-shadow-comic tracking-wider mb-2 animate-fade-in">
            BATMAN
          </h1>
          <div className="h-1 w-24 mx-auto bg-gradient-to-r from-transparent via-batman-yellow to-transparent mb-4" />
          <p className="text-batman-cream font-subheading uppercase tracking-[0.2em] text-sm">
            The Challenge Awaits
          </p>
        </div>

        {/* Auth Card */}
        <div className="w-full max-w-sm animate-slide-up">
          <div className="bg-gradient-to-b from-batman-dark to-[#0f0f0f] border-3 border-batman-gray p-8 shadow-[4px_4px_0_rgba(0,0,0,0.8),0_0_40px_rgba(255,215,0,0.1)]">
            <h2 className="font-headline text-white text-2xl tracking-wide uppercase text-center mb-6">
              Sign In
            </h2>
            <button
              onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center gap-3 bg-batman-dark text-batman-cream border-3 border-batman-steel px-6 py-3 font-subheading uppercase tracking-wide text-sm shadow-[4px_4px_0_rgba(0,0,0,0.8)] hover:bg-batman-gray hover:border-batman-yellow hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0_rgba(0,0,0,0.8)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_rgba(0,0,0,0.8)] transition-all"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </button>
          </div>
        </div>

        {/* Bottom accent */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-batman-yellow/50 to-transparent" />
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        .animate-slide-up {
          animation: slide-up 0.6s ease-out 0.2s both;
        }
      `}</style>
    </div>
  )
}
