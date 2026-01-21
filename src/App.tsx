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
  const { session, isLoading } = useAuth()
  const [debugInfo, setDebugInfo] = useState<string[]>([])

  useEffect(() => {
    setDebugInfo(prev => [...prev, `isLoading: ${isLoading}, hasSession: ${!!session}`])
  }, [isLoading, session])

  console.log('ProtectedRoute: isLoading =', isLoading, ', session =', session)

  // Show debug info on screen for mobile testing
  const debugOverlay = (
    <div className="fixed bottom-0 left-0 right-0 bg-black/90 text-green-400 text-xs p-2 font-mono max-h-32 overflow-auto z-50">
      <div>DEBUG: {debugInfo.slice(-5).join(' → ')}</div>
      <div>URL: {window.location.pathname}</div>
    </div>
  )

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-gray-400">Loading...</div>
        {debugOverlay}
      </div>
    )
  }

  if (!session) {
    console.log('ProtectedRoute: no session, redirecting to /sign-in')
    return (
      <>
        {debugOverlay}
        <Navigate to="/sign-in" replace />
      </>
    )
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
