import { createAuthClient } from '@neondatabase/neon-js/auth'

// Create the auth client for Neon Auth
// The VITE_NEON_AUTH_URL comes from your Neon dashboard after enabling Auth
export const authClient = createAuthClient(import.meta.env.VITE_NEON_AUTH_URL || '')
