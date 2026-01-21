# Claude Code Context

## Workflow

### For New Improvements/Fixes
1. Create a feature branch (e.g., `fix-oauth-mobile`, `improve-calendar-view`)
2. Make changes and commit with descriptive messages
3. Push branch and open a PR to trigger Netlify deploy preview
4. Test on deploy preview before merging to main

### General
- After completing tasks, commit changes with descriptive messages
- Update this file (CLAUDE.md) when making notable architectural or design system changes
- Never push to remote unless explicitly asked

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
netlify link         # Link to Netlify site (required for env vars)
npm run dev          # Start dev server
npm run build        # Build for production
npm run db:push      # Push schema to database (run via: npx netlify dev:exec npm run db:push)
npm run db:generate  # Generate migrations
npm run db:studio    # Open Drizzle Studio
```

## Local Development Notes

- Must run `netlify link` before `npm run dev` to get environment variables
- The `@netlify/vite-plugin` automatically injects Netlify env vars after linking
- Database commands need Netlify context: `npx netlify dev:exec <command>`

## Conventions

- UI components in `src/components/ui/` are reusable primitives
- Page components in `src/pages/` correspond to routes
- Custom hooks in `src/hooks/` handle data fetching and state
- API endpoints use `x-user-id` header for auth (set by frontend from Neon Auth session)
- Exercise types: `squats`, `pushups`, `situps`
- Days are numbered 1-30, odd days have squats+pushups, even days have situps

## Design System

Classic Batman comic book aesthetic with modern edge.

### Typography (Google Fonts loaded in index.html)
- **Headlines** (`font-headline`): Bebas Neue - bold, uppercase, graphic novel feel
- **Subheadings** (`font-subheading`): Oswald - structured, contemporary
- **Body** (`font-body`): Raleway - readable, stylish
- **Special** (`font-special`): Monoton - retro callouts (use sparingly)

### Color Palette (defined in `src/index.css` @theme)
- `batman-black` (#0a0a0a) - primary background
- `batman-dark` (#1a1a1a) - card backgrounds
- `batman-gray` (#2a2a2a) - secondary surfaces
- `batman-steel` (#3a3a3a) - borders
- `batman-yellow` (#FFD700) - primary accent, CTAs
- `batman-red` (#DC143C) - danger, emphasis
- `batman-cream` (#F5F5DC) - body text on dark
- `batman-success` (#32CD32) - completion states

### CSS Classes (comic book effects)
- `.comic-card` - panel-style card with halftone overlay
- `.comic-btn` / `.comic-btn-primary` / `.comic-btn-secondary` - buttons with shadow lift
- `.comic-input` - form inputs with yellow focus
- `.comic-progress` / `.comic-progress-bar` - animated progress bars
- `.comic-day` / `.comic-day-current` / `.comic-day-complete` - calendar cells
- `.comic-divider` - yellow gradient section divider
- `.bg-halftone` - subtle dot pattern background
- `.text-shadow-comic` - comic text outline effect
- `.glow-yellow` / `.glow-red` - glow effects

### Design Principles
- Sharp corners (no rounded borders) for comic panel feel
- Thick borders (3px) mimicking comic ink
- Directional box shadows (4px 4px 0) for depth
- Uppercase headlines with letter-spacing
- Yellow as primary action color, red for danger/emphasis
- Bat signal SVG (`/bat-light.svg`) used as hero branding element
- Section headers use yellow accent bars (e.g., `<span className="w-6 h-1 bg-batman-yellow" />`)
- Buttons have shimmer effect on hover
- Calendar days have gradient backgrounds and pulse animation on current day
