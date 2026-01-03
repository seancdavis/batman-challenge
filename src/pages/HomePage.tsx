import { Link } from 'react-router-dom'
import { SignedIn, SignedOut } from '@neondatabase/neon-js/auth/react/ui'
import { Button, Card } from '../components/ui'
import { CHALLENGE_GOALS } from '../lib/challengeData'

export function HomePage() {
  // Calculate total reps in the challenge
  const totalSquats = CHALLENGE_GOALS.reduce(
    (sum, day) => sum + (day.exercises.find((e) => e.type === 'squats')?.reps || 0),
    0
  )
  const totalPushups = CHALLENGE_GOALS.reduce(
    (sum, day) => sum + (day.exercises.find((e) => e.type === 'pushups')?.reps || 0),
    0
  )
  const totalSitups = CHALLENGE_GOALS.reduce(
    (sum, day) => sum + (day.exercises.find((e) => e.type === 'situps')?.reps || 0),
    0
  )

  return (
    <div className="min-h-screen bg-batman-black bg-halftone text-white">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="mb-6">
          <h1 className="text-6xl md:text-8xl font-headline text-batman-yellow text-shadow-comic tracking-wider mb-2">
            BATMAN
          </h1>
          <h2 className="text-3xl md:text-4xl font-headline text-white tracking-wide">
            30-Day Challenge
          </h2>
        </div>

        <p className="text-xl text-batman-cream mb-10 max-w-2xl mx-auto leading-relaxed">
          Transform yourself over 30 days with progressively harder workouts. Track your squats,
          push-ups, and sit-ups as you build towards becoming the best version of yourself.
        </p>

        <SignedIn>
          <Link to="/dashboard">
            <Button size="lg">Go to Dashboard</Button>
          </Link>
        </SignedIn>

        <SignedOut>
          <Link to="/sign-in">
            <Button size="lg">Start Your Challenge</Button>
          </Link>
        </SignedOut>
      </div>

      {/* Comic Divider */}
      <div className="comic-divider" />

      {/* Stats Section */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-headline text-center text-batman-cream mb-8 tracking-wide">
          The Challenge Awaits
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card variant="yellow" className="text-center">
            <div className="text-5xl font-headline text-batman-yellow mb-2">
              {totalSquats.toLocaleString()}
            </div>
            <div className="text-batman-cream font-subheading uppercase tracking-wide">
              Total Squats
            </div>
          </Card>
          <Card variant="yellow" className="text-center">
            <div className="text-5xl font-headline text-batman-yellow mb-2">
              {totalPushups.toLocaleString()}
            </div>
            <div className="text-batman-cream font-subheading uppercase tracking-wide">
              Total Push-ups
            </div>
          </Card>
          <Card variant="yellow" className="text-center">
            <div className="text-5xl font-headline text-batman-yellow mb-2">
              {totalSitups.toLocaleString()}
            </div>
            <div className="text-batman-cream font-subheading uppercase tracking-wide">
              Total Sit-ups
            </div>
          </Card>
        </div>
      </div>

      {/* Comic Divider */}
      <div className="comic-divider" />

      {/* How It Works */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-headline text-center text-batman-cream mb-10 tracking-wide">
          How It Works
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <div className="text-batman-yellow text-5xl font-headline mb-4">01</div>
            <h3 className="font-subheading text-xl uppercase tracking-wide mb-3 text-white">
              Start Your Challenge
            </h3>
            <p className="text-batman-cream text-sm leading-relaxed">
              Sign in and begin your 30-day journey. Each day has specific rep goals for squats,
              push-ups, or sit-ups.
            </p>
          </Card>

          <Card>
            <div className="text-batman-yellow text-5xl font-headline mb-4">02</div>
            <h3 className="font-subheading text-xl uppercase tracking-wide mb-3 text-white">
              Log Throughout the Day
            </h3>
            <p className="text-batman-cream text-sm leading-relaxed">
              Split your reps into manageable sets. Log each set as you complete it - morning,
              lunch, evening, whenever works for you.
            </p>
          </Card>

          <Card>
            <div className="text-batman-yellow text-5xl font-headline mb-4">03</div>
            <h3 className="font-subheading text-xl uppercase tracking-wide mb-3 text-white">
              Track Your Progress
            </h3>
            <p className="text-batman-cream text-sm leading-relaxed">
              Watch your progress grow with visual progress bars. Complete all 30 days to finish the
              challenge!
            </p>
          </Card>
        </div>
      </div>

      {/* Comic Divider */}
      <div className="comic-divider" />

      {/* Sample Days */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-headline text-center text-batman-cream mb-10 tracking-wide">
          Challenge Preview
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {CHALLENGE_GOALS.slice(0, 5).map((day) => (
            <Card key={day.day} className="p-4 text-center">
              <div className="text-batman-yellow font-headline text-2xl mb-2">
                Day {day.day}
              </div>
              {day.exercises.map((ex) => (
                <div key={ex.type} className="text-sm text-batman-cream font-body">
                  <span className="text-white font-semibold">{ex.reps}</span> {ex.type}
                </div>
              ))}
            </Card>
          ))}
        </div>

        <p className="text-center text-batman-muted mt-6 font-subheading uppercase tracking-wide">
          ...and 25 more progressively harder days!
        </p>
      </div>

      {/* Footer CTA */}
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="comic-card p-10">
          <h2 className="text-4xl font-headline text-batman-yellow mb-4 tracking-wide">
            Ready to Begin?
          </h2>
          <p className="text-batman-cream mb-8 max-w-md mx-auto">
            Join the challenge and push yourself to new limits. Every rep counts.
          </p>
          <SignedIn>
            <Link to="/dashboard">
              <Button size="lg">Go to Dashboard</Button>
            </Link>
          </SignedIn>
          <SignedOut>
            <Link to="/sign-in">
              <Button size="lg">Accept the Challenge</Button>
            </Link>
          </SignedOut>
        </div>
      </div>
    </div>
  )
}
