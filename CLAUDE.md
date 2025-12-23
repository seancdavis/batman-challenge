# Claude Code Context

This is a 30-day fitness challenge tracker called "Batman Challenge."

## Architecture

- **Frontend**: Vite + React + TypeScript with Tailwind CSS
- **Backend**: Netlify Functions (serverless)
- **Database**: Neon Postgres via `@netlify/neon` + Drizzle ORM
- **Auth**: Neon Auth (wraps BetterAuth) with Google OAuth

## Key Files

- `db/schema.ts` - Database schema (challenges, rep_entries tables)
- `src/lib/challengeData.ts` - Static 30-day workout goals
- `src/lib/auth.ts` - Neon Auth client
- `src/lib/api.ts` - API client for frontend
- `netlify/functions/challenges.ts` - Challenge CRUD endpoints
- `netlify/functions/reps.ts` - Rep entry CRUD endpoints

## Database Schema

Two main tables:
- `challenges` - User's 30-day challenge instance (userId, startDate, isActive)
- `rep_entries` - Individual rep logs (challengeId, dayNumber, exerciseType, reps)

User data is managed by Neon Auth in the `neon_auth` schema.

## Commands

```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run db:push      # Push schema to database
npm run db:generate  # Generate migrations
npm run db:studio    # Open Drizzle Studio
```

## Conventions

- UI components in `src/components/ui/` are reusable primitives
- Page components in `src/pages/` correspond to routes
- Custom hooks in `src/hooks/` handle data fetching and state
- API endpoints use `x-user-id` header for auth (set by frontend from Neon Auth session)
- Exercise types: `squats`, `pushups`, `situps`
- Days are numbered 1-30, odd days have squats+pushups, even days have situps
