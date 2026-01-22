import { createAuthClient } from '@neondatabase/neon-js/auth'

// Create the auth client for Neon Auth
// Use a local proxy path to avoid cross-site cookie issues on mobile browsers
// The proxy is configured in netlify.toml to forward to the actual Neon Auth URL
const getAuthUrl = () => {
  // In production, use the proxy path to keep cookies first-party
  // In development, use the direct URL (same-origin issues don't apply with dev server)
  if (import.meta.env.PROD) {
    return `${window.location.origin}/neon-auth`
  }
  return import.meta.env.VITE_NEON_AUTH_URL || ''
}

export const authClient = createAuthClient(getAuthUrl())
