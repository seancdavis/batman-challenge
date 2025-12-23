# Batman Challenge

A 30-day fitness challenge tracker built with React, Netlify, and Neon.

## The Challenge

The Batman Challenge is a progressive 30-day workout program alternating between:

- **Odd days**: Squats + Push-ups (starting at 100/60, building to 400/250)
- **Even days**: Sit-ups (starting at 60, building to 200)

Log your reps throughout the day and track your progress toward each day's goals.

## Tech Stack

- **Frontend**: Vite + React + TypeScript
- **Styling**: Tailwind CSS
- **Auth**: Neon Auth (BetterAuth) with Google OAuth
- **Database**: Netlify DB (Neon Postgres) + Drizzle ORM
- **API**: Netlify Functions
- **Hosting**: Netlify

## Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

The app runs at `http://localhost:5173`.

## Environment Variables

Create a `.env` file based on `.env.example`:

```
VITE_NEON_AUTH_URL=<your-neon-auth-url>
DATABASE_URL=<your-database-url>
```

## Database

This project uses Drizzle ORM with Neon Postgres.

```bash
# Push schema to database
npm run db:push

# Generate migrations
npm run db:generate

# Open Drizzle Studio
npm run db:studio
```

## Deployment

### Via Netlify Git Integration

1. Push to GitHub/GitLab/Bitbucket
2. Connect repo in Netlify dashboard
3. Enable Netlify DB extension (auto-sets `DATABASE_URL`)
4. Add `VITE_NEON_AUTH_URL` environment variable
5. Configure Google OAuth in Neon Auth dashboard

Deploys automatically on push to `main`.

## Project Structure

```
├── src/
│   ├── components/
│   │   ├── ui/           # Button, Input, Card, ProgressBar
│   │   ├── layout/       # Header, Layout
│   │   └── challenge/    # ExerciseInput, ChallengeCalendar
│   ├── pages/            # HomePage, DashboardPage, DayDetailPage
│   ├── hooks/            # useAuth, useChallenge, useDailyReps
│   ├── lib/              # auth, api, challengeData
│   └── types/
├── netlify/functions/    # API endpoints
├── db/                   # Database schema
└── drizzle/              # Migrations
```

## License

MIT
