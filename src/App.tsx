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
  const [isProcessingCallback, setIsProcessingCallback] = useState(() => {
    // Initialize to true if we have a verifier in URL (prevents flash redirect)
    return new URLSearchParams(window.location.search).has('neon_auth_session_verifier')
  })

  // Check if we're returning from OAuth callback (has session verifier in URL)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const hasVerifier = params.has('neon_auth_session_verifier')

    if (hasVerifier) {
      console.log('OAuth callback detected, verifier in URL, calling refetch...')
      // The SDK's getSession automatically includes the verifier from the URL
      // We just need to call refetch while the verifier is still in the URL
      refetch().then(() => {
        console.log('Refetch complete, cleaning URL')
        // Clean up the URL after the session is fetched
        window.history.replaceState({}, '', window.location.pathname)
        setIsProcessingCallback(false)
      }).catch(err => {
        console.error('Refetch failed:', err)
        window.history.replaceState({}, '', window.location.pathname)
        setIsProcessingCallback(false)
      })
    }
  }, [refetch])

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
