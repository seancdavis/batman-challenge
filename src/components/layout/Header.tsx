import { Link } from 'react-router-dom'
import { SignedIn, SignedOut } from '@neondatabase/neon-js/auth/react/ui'
import { Button } from '../ui'
import { UserMenu } from '../ui/UserMenu'

export function Header() {
  return (
    <header className="bg-batman-dark border-b-4 border-batman-yellow relative">
      {/* Subtle glow effect */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-batman-yellow/50 to-transparent" />

      <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          {/* Bat icon */}
          <img
            src="/bat-light.svg"
            alt=""
            className="w-8 h-auto opacity-90 group-hover:opacity-100 transition-opacity"
          />
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-2">
            <span className="text-2xl sm:text-3xl font-headline text-batman-yellow text-shadow-comic tracking-wider">
              BATMAN
            </span>
            <span className="text-batman-cream text-xs sm:text-sm font-subheading uppercase tracking-wide opacity-70 group-hover:opacity-100 transition-opacity">
              Challenge
            </span>
          </div>
        </Link>

        <nav className="flex items-center gap-3">
          <SignedIn>
            <Link to="/dashboard">
              <Button variant="ghost" size="sm">
                Dashboard
              </Button>
            </Link>
            <UserMenu />
          </SignedIn>

          <SignedOut>
            <Link to="/sign-in">
              <Button size="sm">Sign In</Button>
            </Link>
          </SignedOut>
        </nav>
      </div>
    </header>
  )
}
