import { Link } from 'react-router-dom'
import { UserButton, SignedIn, SignedOut } from '@neondatabase/neon-js/auth/react/ui'
import { Button } from '../ui'

export function Header() {
  return (
    <header className="bg-batman-dark border-b-4 border-batman-yellow">
      <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <span className="text-3xl font-headline text-batman-yellow text-shadow-comic tracking-wider">
            BATMAN
          </span>
          <span className="text-batman-cream text-sm font-subheading uppercase tracking-wide opacity-80 group-hover:opacity-100 transition-opacity">
            30-Day Challenge
          </span>
        </Link>

        <nav className="flex items-center gap-4">
          <SignedIn>
            <Link to="/dashboard">
              <Button variant="ghost" size="sm">
                Dashboard
              </Button>
            </Link>
            <UserButton />
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
