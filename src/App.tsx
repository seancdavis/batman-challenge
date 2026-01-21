import { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'
import { Layout } from './components/layout/Layout'
import { HomePage } from './pages/HomePage'
import { DashboardPage } from './pages/DashboardPage'
import { DayDetailPage } from './pages/DayDetailPage'
import { SignInPage } from './pages/SignInPage'

// Protected route wrapper
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { session, isLoading, refetch } = useAuth()
  const [isProcessingCallback, setIsProcessingCallback] = useState(false)

  // Check if we're returning from OAuth callback (has session verifier in URL)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const hasSessionVerifier = params.has('neon_auth_session_verifier')

    if (hasSessionVerifier && !session && !isLoading) {
      // We have a session verifier but no session yet - wait and retry
      setIsProcessingCallback(true)
      console.log('OAuth callback detected, waiting for session...')

      // Give the auth provider time to process, then refetch
      const timer = setTimeout(async () => {
        await refetch()
        // Clean up the URL after processing
        window.history.replaceState({}, '', window.location.pathname)
        setIsProcessingCallback(false)
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [session, isLoading, refetch])

  console.log('ProtectedRoute: isLoading =', isLoading, ', session =', session, ', isProcessingCallback =', isProcessingCallback)

  if (isLoading || isProcessingCallback) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-gray-400">Loading...</div>
      </div>
    )
  }

  if (!session) {
    console.log('ProtectedRoute: no session, redirecting to /sign-in')
    return <Navigate to="/sign-in" replace />
  }

  return <>{children}</>
}

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/sign-in" element={<SignInPage />} />

      {/* Protected routes with layout */}
      <Route element={<Layout />}>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/day/:dayNumber"
          element={
            <ProtectedRoute>
              <DayDetailPage />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* Catch all - redirect to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
