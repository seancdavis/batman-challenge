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
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          <span className="text-yellow-500">BATMAN</span>
          <br />
          <span className="text-3xl md:text-4xl text-gray-300">30-Day Challenge</span>
        </h1>

        <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
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

      {/* Stats Section */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-3 gap-4">
          <Card className="text-center">
            <div className="text-3xl font-bold text-yellow-500">{totalSquats.toLocaleString()}</div>
            <div className="text-gray-400">Total Squats</div>
          </Card>
          <Card className="text-center">
            <div className="text-3xl font-bold text-yellow-500">{totalPushups.toLocaleString()}</div>
            <div className="text-gray-400">Total Push-ups</div>
          </Card>
          <Card className="text-center">
            <div className="text-3xl font-bold text-yellow-500">{totalSitups.toLocaleString()}</div>
            <div className="text-gray-400">Total Sit-ups</div>
          </Card>
        </div>
      </div>

      {/* How It Works */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-6 text-center">How It Works</h2>

        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <div className="text-yellow-500 text-4xl mb-3">1</div>
            <h3 className="font-semibold mb-2">Start Your Challenge</h3>
            <p className="text-gray-400 text-sm">
              Sign in and begin your 30-day journey. Each day has specific rep goals for squats,
              push-ups, or sit-ups.
            </p>
          </Card>

          <Card>
            <div className="text-yellow-500 text-4xl mb-3">2</div>
            <h3 className="font-semibold mb-2">Log Throughout the Day</h3>
            <p className="text-gray-400 text-sm">
              Split your reps into manageable sets. Log each set as you complete it - morning,
              lunch, evening, whenever works for you.
            </p>
          </Card>

          <Card>
            <div className="text-yellow-500 text-4xl mb-3">3</div>
            <h3 className="font-semibold mb-2">Track Your Progress</h3>
            <p className="text-gray-400 text-sm">
              Watch your progress grow with visual progress bars. Complete all 30 days to finish the
              challenge!
            </p>
          </Card>
        </div>
      </div>

      {/* Sample Days */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-6 text-center">Challenge Preview</h2>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {CHALLENGE_GOALS.slice(0, 5).map((day) => (
            <Card key={day.day} className="p-4">
              <div className="text-yellow-500 font-bold mb-2">Day {day.day}</div>
              {day.exercises.map((ex) => (
                <div key={ex.type} className="text-sm text-gray-400">
                  {ex.reps} {ex.type}
                </div>
              ))}
            </Card>
          ))}
        </div>

        <p className="text-center text-gray-500 mt-4">...and 25 more progressively harder days!</p>
      </div>
    </div>
  )
}
