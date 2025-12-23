import { Link } from 'react-router-dom'
import { UserButton, SignedIn, SignedOut } from '@neondatabase/neon-js/auth/react/ui'
import { Button } from '../ui'

export function Header() {
  return (
    <header className="bg-gray-900 border-b border-gray-800">
      <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-yellow-500">BATMAN</span>
          <span className="text-gray-400 text-sm">30-Day Challenge</span>
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
