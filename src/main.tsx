import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, useNavigate, Link as RouterLink } from 'react-router-dom'
import { NeonAuthUIProvider } from '@neondatabase/neon-js/auth/react'
import type { ReactNode } from 'react'
import { authClient } from './lib/auth'
import App from './App'
import './index.css'

// Adapter for React Router Link to work with Neon Auth's expected Link interface
function NeonLink({ href, className, children }: { href: string; className?: string; children: ReactNode }) {
  return (
    <RouterLink to={href} className={className}>
      {children}
    </RouterLink>
  )
}

function AppWithProviders() {
  const navigate = useNavigate()

  return (
    <NeonAuthUIProvider
      authClient={authClient}
      social={{ providers: ['google'] }}
      navigate={navigate}
      Link={NeonLink}
    >
      <App />
    </NeonAuthUIProvider>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AppWithProviders />
    </BrowserRouter>
  </StrictMode>
)
