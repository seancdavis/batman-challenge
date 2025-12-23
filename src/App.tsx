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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-gray-400">Loading...</div>
      </div>
    )
  }

  if (!session) {
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
