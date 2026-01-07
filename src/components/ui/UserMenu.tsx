import { useState, useRef, useEffect } from 'react'
import { useAuth } from '../../hooks/useAuth'

export function UserMenu() {
  const { user, signOut } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSignOut = async () => {
    setIsOpen(false)
    await signOut()
    // Use hard redirect instead of React Router navigation
    // This ensures cookies and session state are fully cleared
    window.location.href = '/'
  }

  if (!user) return null

  const displayName = user.name || user.email?.split('@')[0] || 'User'
  const initials = displayName.charAt(0).toUpperCase()

  return (
    <div className="relative" ref={menuRef}>
      {/* Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 hover:opacity-80 transition-opacity"
      >
        {user.image ? (
          <img
            src={user.image}
            alt={displayName}
            referrerPolicy="no-referrer"
            className="w-7 h-7 rounded-full border-2 border-batman-yellow"
          />
        ) : (
          <div className="w-7 h-7 rounded-full bg-batman-yellow text-batman-black flex items-center justify-center text-sm font-bold">
            {initials}
          </div>
        )}
        <span className="text-batman-cream text-sm font-subheading hidden sm:block">
          {displayName}
        </span>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 bg-batman-dark border-3 border-batman-steel shadow-[4px_4px_0_rgba(0,0,0,0.8)]">
          <button
            onClick={handleSignOut}
            className="w-full px-3 py-2 text-left text-sm font-subheading uppercase tracking-wide text-batman-cream hover:bg-batman-gray hover:text-batman-yellow transition-colors"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  )
}
