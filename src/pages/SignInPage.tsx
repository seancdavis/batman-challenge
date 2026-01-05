import { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
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
    <div className="min-h-screen bg-batman-black relative overflow-hidden">
      {/* Dramatic background with spotlight effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,215,0,0.15)_0%,_transparent_50%)]" />
      <div className="absolute inset-0 bg-halftone" />

      {/* Animated searchlight beams */}
      <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-batman-yellow/20 via-transparent to-transparent animate-pulse" />
      <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-batman-yellow/10 via-transparent to-transparent animate-pulse delay-500" />

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
        <div className="w-full max-w-sm">
          <div className="neon-auth-wrapper animate-slide-up">
            <AuthView pathname="sign-in" />
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
        .delay-500 {
          animation-delay: 0.5s;
        }

        /* Neon Auth Wrapper Styles */
        .neon-auth-wrapper {
          color: white;
          font-size: 1rem;
        }
        .neon-auth-wrapper > div {
          background: linear-gradient(180deg, #1a1a1a 0%, #0f0f0f 100%);
          border: 3px solid #2a2a2a;
          box-shadow:
            4px 4px 0 rgba(0, 0, 0, 0.8),
            0 0 40px rgba(255, 215, 0, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.05);
          padding: 2rem;
        }
        .neon-auth-wrapper h1,
        .neon-auth-wrapper h2,
        .neon-auth-wrapper h3 {
          font-family: 'Bebas Neue', sans-serif;
          color: white;
          font-weight: 400;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          font-size: 1.75rem;
        }
        .neon-auth-wrapper p,
        .neon-auth-wrapper span,
        .neon-auth-wrapper label {
          font-family: 'Raleway', sans-serif;
          color: #F5F5DC;
          font-size: 0.95rem;
        }
        /* Fix two-column layout - force single column */
        .neon-auth-wrapper > div > div {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .neon-auth-wrapper input {
          font-family: 'Raleway', sans-serif;
          font-size: 1rem;
          background: #0a0a0a;
          border: 2px solid #3a3a3a;
          color: white;
          padding: 0.875rem 1rem;
          width: 100%;
          transition: all 0.2s ease;
        }
        .neon-auth-wrapper input:focus {
          outline: none;
          border-color: #FFD700;
          box-shadow:
            0 0 0 3px rgba(255, 215, 0, 0.15),
            0 0 20px rgba(255, 215, 0, 0.1);
        }
        .neon-auth-wrapper input::placeholder {
          color: rgba(255, 255, 255, 0.3);
        }
        .neon-auth-wrapper button {
          font-family: 'Oswald', sans-serif;
          font-weight: 600;
          font-size: 1rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          border: 3px solid #0a0a0a;
          box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.8);
          background: linear-gradient(180deg, #FFD700 0%, #E5C100 100%);
          color: #0a0a0a;
          padding: 0.875rem 1.5rem;
          width: 100%;
          transition: all 0.15s ease;
          position: relative;
          overflow: hidden;
        }
        .neon-auth-wrapper button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          transition: left 0.4s ease;
        }
        .neon-auth-wrapper button:hover::before {
          left: 100%;
        }
        .neon-auth-wrapper button:hover {
          transform: translate(-2px, -2px);
          box-shadow: 6px 6px 0 rgba(0, 0, 0, 0.8);
          background: linear-gradient(180deg, #FFEA00 0%, #FFD700 100%);
        }
        .neon-auth-wrapper button:active {
          transform: translate(2px, 2px);
          box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.8);
        }
        .neon-auth-wrapper a {
          color: #FFD700;
          text-decoration: none;
          transition: all 0.2s ease;
          position: relative;
          font-size: 0.95rem;
        }
        .neon-auth-wrapper a::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1px;
          background: #FFD700;
          transition: width 0.2s ease;
        }
        .neon-auth-wrapper a:hover {
          color: #FFEA00;
          text-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
        }
        .neon-auth-wrapper a:hover::after {
          width: 100%;
        }

        /* Google/OAuth button styling */
        .neon-auth-wrapper button[type="button"],
        .neon-auth-wrapper form > div > button {
          background: #1a1a1a;
          color: #F5F5DC;
          border-color: #3a3a3a;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.625rem;
          white-space: nowrap;
        }
        .neon-auth-wrapper button[type="button"]:hover,
        .neon-auth-wrapper form > div > button:hover {
          background: #2a2a2a;
          border-color: #FFD700;
        }
        /* Google icon - make smaller and black */
        .neon-auth-wrapper button svg,
        .neon-auth-wrapper button img {
          width: 18px !important;
          height: 18px !important;
          min-width: 18px !important;
          flex-shrink: 0;
          filter: brightness(0);
        }

        /* Divider styling */
        .neon-auth-wrapper hr {
          border-color: #3a3a3a;
          margin: 1.5rem 0;
        }
      `}</style>
    </div>
  )
}
