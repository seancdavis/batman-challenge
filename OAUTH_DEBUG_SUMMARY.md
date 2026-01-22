# Mobile OAuth Authentication Issue with Neon Auth + Vite React SPA

## The Problem

OAuth sign-in with Google works on desktop but fails on mobile Chrome (and Safari). After authenticating with Google, the user is redirected back to the app but ends up on the sign-in page instead of being authenticated.

## What We've Discovered

### 1. The OAuth flow partially works

Google authentication completes and redirects back to `/dashboard?neon_auth_session_verifier=<token>`

### 2. The session verifier is a Neon Auth-specific mechanism

When OAuth completes, Neon Auth adds a `neon_auth_session_verifier` query param that needs to be exchanged for a session.

### 3. The SDK is designed to handle this automatically

Looking at the Neon Auth SDK source (`node_modules/@neondatabase/auth/dist/adapter-core-8s6XdCco.mjs`), the `getSession` method has an `onRequest` hook that checks for the verifier in `window.location.search` and includes it in the request:

```javascript
getSession: {
  onRequest: (ctx) => {
    const neonAuthSessionVerifierParam = new URLSearchParams(globalThis.window.location.search).get(NEON_AUTH_SESSION_VERIFIER_PARAM_NAME);
    if (neonAuthSessionVerifierParam) {
      url.searchParams.set(NEON_AUTH_SESSION_VERIFIER_PARAM_NAME, neonAuthSessionVerifierParam);
      return { ...ctx, url };
    }
  },
  // ...
}
```

### 4. The exchange also requires a challenge cookie

The middleware code shows that session verification needs both the URL verifier AND a `NEON_AUTH_SESSION_CHALLENGE` cookie that was set when the OAuth flow started.

### 5. Next.js has middleware to handle this

In Next.js apps, there's middleware (`exchangeOAuthToken`) that intercepts the callback, exchanges the verifier+cookie for session cookies, then redirects. Vite SPAs don't have this middleware layer.

## What We've Tried

| Attempt | Result |
|---------|--------|
| Changed `callbackURL` from relative (`'/dashboard'`) to absolute (`${window.location.origin}/dashboard`) | ✅ Fixed the 403 error |
| Added the deploy preview domain to Neon Auth trusted domains | ✅ Fixed the 403 error |
| Waiting for session and refetching | ❌ Session still not established |
| Calling `refetch()` while verifier is in URL | ❌ Session still not established |
| Directly calling the `/get-session` endpoint | ❌ Session still not established |

## Current Code State

### `src/App.tsx`

`ProtectedRoute` component detects verifier, calls `refetch()`, then cleans URL:

```tsx
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { session, isLoading, refetch } = useAuth()
  const [isProcessingCallback, setIsProcessingCallback] = useState(() => {
    return new URLSearchParams(window.location.search).has('neon_auth_session_verifier')
  })

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const hasVerifier = params.has('neon_auth_session_verifier')

    if (hasVerifier) {
      refetch().then(() => {
        window.history.replaceState({}, '', window.location.pathname)
        setIsProcessingCallback(false)
      }).catch(err => {
        window.history.replaceState({}, '', window.location.pathname)
        setIsProcessingCallback(false)
      })
    }
  }, [refetch])

  if (isLoading || isProcessingCallback) {
    return <div>Loading...</div>
  }

  if (!session) {
    return <Navigate to="/sign-in" replace />
  }

  return <>{children}</>
}
```

### `src/hooks/useAuth.ts`

Calls `authClient.getSession()` with logging:

```tsx
const fetchSession = async () => {
  try {
    const result = await authClient.getSession()
    if (result.data?.session && result.data?.user) {
      setSession(result.data.session)
      setUser(result.data.user)
    } else {
      setSession(null)
      setUser(null)
    }
  } catch (err) {
    setSession(null)
    setUser(null)
  } finally {
    setIsLoading(false)
  }
}
```

### `src/pages/SignInPage.tsx`

Calls `authClient.signIn.social()` with absolute callbackURL:

```tsx
const handleGoogleSignIn = async () => {
  const callbackURL = `${window.location.origin}/dashboard`
  const result = await authClient.signIn.social({
    provider: 'google',
    callbackURL,
  })
}
```

### `src/lib/auth.ts`

Auth client initialization:

```tsx
import { createAuthClient } from '@neondatabase/neon-js/auth'
export const authClient = createAuthClient(import.meta.env.VITE_NEON_AUTH_URL || '')
```

### `src/main.tsx`

Wraps app in `NeonAuthUIProvider`:

```tsx
<NeonAuthUIProvider
  authClient={authClient}
  social={{ providers: ['google'] }}
  credentials={false}
  navigate={navigate}
  Link={NeonLink}
>
  <App />
</NeonAuthUIProvider>
```

## Where We're Stuck

The SDK's `getSession()` should automatically include the verifier from the URL, but calling it doesn't establish a session. Possible issues:

### 1. Cookie not being sent

The challenge cookie set during OAuth initiation may not be sent with the `getSession` request (SameSite, cross-origin issues on mobile?)

### 2. Timing/race condition

The initial `getSession()` call in `useAuth` might run and cache "no session" before we can call it with the verifier

### 3. Missing server-side component

Vite SPAs may not be fully supported for OAuth flows - the SDK might expect Next.js middleware or an API route to handle the exchange

### 4. Mobile-specific cookie behavior

Mobile browsers may handle cookies differently during OAuth redirects

## Relevant Documentation

- [Neon Auth docs](https://neon.com/docs/auth/overview)
- [Neon Auth vs Better Auth differences](https://github.com/neondatabase/neon-js/blob/main/packages/auth/neon-auth_vs_better-auth.md) - mentions the `token_verifier` is a Neon-specific feature
- The SDK source shows OAuth callback handling is designed for Next.js middleware, not pure client-side SPAs

## Environment

- **Frontend**: Vite + React + TypeScript
- **Auth**: Neon Auth (`@neondatabase/neon-js/auth`)
- **Hosting**: Netlify (testing on deploy previews)
- **Issue occurs on**: Mobile Chrome, Mobile Safari
- **Works on**: Desktop Chrome, Desktop Safari
