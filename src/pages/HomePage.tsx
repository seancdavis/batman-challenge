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
    <div className="min-h-screen bg-batman-black text-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center">
        {/* Background effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,215,0,0.08)_0%,_transparent_60%)]" />
        <div className="absolute inset-0 bg-halftone" />

        {/* Diagonal accent lines */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-batman-yellow/5 to-transparent transform skew-x-12 origin-top-right" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 py-16 text-center">
          {/* Bat Signal with glow */}
          <div className="mb-8 relative inline-block animate-hero-float">
            <div className="absolute inset-0 blur-3xl bg-batman-yellow/30 scale-150 animate-pulse-slow" />
            <img
              src="/bat-light.svg"
              alt="Batman Signal"
              className="w-40 md:w-52 h-auto relative z-10 drop-shadow-[0_0_40px_rgba(255,215,0,0.6)]"
            />
          </div>

          {/* Title */}
          <div className="mb-6 animate-hero-title">
            <h1 className="text-7xl md:text-9xl font-headline text-batman-yellow text-shadow-comic tracking-wider mb-2">
              BATMAN
            </h1>
            <h2 className="text-3xl md:text-5xl font-headline text-white tracking-wide">
              30-Day Challenge
            </h2>
          </div>

          {/* Accent line */}
          <div className="h-1 w-32 mx-auto bg-gradient-to-r from-transparent via-batman-yellow to-transparent mb-8 animate-hero-line" />

          <p className="text-xl text-batman-cream mb-10 max-w-2xl mx-auto leading-relaxed animate-hero-text">
            Transform yourself over 30 days with progressively harder workouts. Track your squats,
            push-ups, and sit-ups as you build towards becoming the best version of yourself.
          </p>

          <div className="animate-hero-button">
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
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-batman-black to-transparent" />
      </section>

      {/* Comic Divider */}
      <div className="comic-divider" />

      {/* Stats Section */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-headline text-center text-batman-cream mb-10 tracking-wide">
          The Challenge Awaits
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card variant="yellow" className="text-center group hover:scale-[1.02] transition-transform duration-300">
            <div className="text-6xl font-headline text-batman-yellow mb-2 group-hover:scale-110 transition-transform">
              {totalSquats.toLocaleString()}
            </div>
            <div className="text-batman-cream font-subheading uppercase tracking-wide">
              Total Squats
            </div>
          </Card>
          <Card variant="yellow" className="text-center group hover:scale-[1.02] transition-transform duration-300">
            <div className="text-6xl font-headline text-batman-yellow mb-2 group-hover:scale-110 transition-transform">
              {totalPushups.toLocaleString()}
            </div>
            <div className="text-batman-cream font-subheading uppercase tracking-wide">
              Total Push-ups
            </div>
          </Card>
          <Card variant="yellow" className="text-center group hover:scale-[1.02] transition-transform duration-300">
            <div className="text-6xl font-headline text-batman-yellow mb-2 group-hover:scale-110 transition-transform">
              {totalSitups.toLocaleString()}
            </div>
            <div className="text-batman-cream font-subheading uppercase tracking-wide">
              Total Sit-ups
            </div>
          </Card>
        </div>
      </section>

      {/* Comic Divider */}
      <div className="comic-divider" />

      {/* How It Works */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-headline text-center text-batman-cream mb-10 tracking-wide">
          How It Works
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="group hover:border-batman-yellow transition-colors duration-300">
            <div className="text-batman-yellow text-6xl font-headline mb-4 group-hover:scale-110 transition-transform origin-left">
              01
            </div>
            <h3 className="font-subheading text-xl uppercase tracking-wide mb-3 text-white">
              Start Your Challenge
            </h3>
            <p className="text-batman-cream text-sm leading-relaxed">
              Sign in and begin your 30-day journey. Each day has specific rep goals for squats,
              push-ups, or sit-ups.
            </p>
          </Card>

          <Card className="group hover:border-batman-yellow transition-colors duration-300">
            <div className="text-batman-yellow text-6xl font-headline mb-4 group-hover:scale-110 transition-transform origin-left">
              02
            </div>
            <h3 className="font-subheading text-xl uppercase tracking-wide mb-3 text-white">
              Log Throughout the Day
            </h3>
            <p className="text-batman-cream text-sm leading-relaxed">
              Split your reps into manageable sets. Log each set as you complete it - morning,
              lunch, evening, whenever works for you.
            </p>
          </Card>

          <Card className="group hover:border-batman-yellow transition-colors duration-300">
            <div className="text-batman-yellow text-6xl font-headline mb-4 group-hover:scale-110 transition-transform origin-left">
              03
            </div>
            <h3 className="font-subheading text-xl uppercase tracking-wide mb-3 text-white">
              Track Your Progress
            </h3>
            <p className="text-batman-cream text-sm leading-relaxed">
              Watch your progress grow with visual progress bars. Complete all 30 days to finish the
              challenge!
            </p>
          </Card>
        </div>
      </section>

      {/* Comic Divider */}
      <div className="comic-divider" />

      {/* Sample Days */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-headline text-center text-batman-cream mb-10 tracking-wide">
          Challenge Preview
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {CHALLENGE_GOALS.slice(0, 5).map((day, index) => (
            <Card
              key={day.day}
              className="p-4 text-center hover:border-batman-yellow transition-all duration-300 hover:-translate-y-1"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-batman-yellow font-headline text-2xl mb-2">Day {day.day}</div>
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
      </section>

      {/* Footer CTA */}
      <section className="relative py-20">
        {/* Background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(255,215,0,0.1)_0%,_transparent_60%)]" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <div className="comic-card p-10 md:p-14">
            {/* Small bat icon */}
            <img
              src="/bat-light.svg"
              alt=""
              className="w-16 h-auto mx-auto mb-6 opacity-80"
            />
            <h2 className="text-4xl md:text-5xl font-headline text-batman-yellow mb-4 tracking-wide">
              Ready to Begin?
            </h2>
            <p className="text-batman-cream mb-8 max-w-md mx-auto text-lg">
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
      </section>

      {/* Inline styles for hero animations */}
      <style>{`
        @keyframes hero-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes hero-title {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes hero-line {
          from { opacity: 0; width: 0; }
          to { opacity: 1; width: 8rem; }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.5; }
        }
        .animate-hero-float {
          animation: hero-float 4s ease-in-out infinite;
        }
        .animate-hero-title {
          animation: hero-title 0.8s ease-out both;
        }
        .animate-hero-line {
          animation: hero-line 0.6s ease-out 0.4s both;
        }
        .animate-hero-text {
          animation: hero-title 0.8s ease-out 0.2s both;
        }
        .animate-hero-button {
          animation: hero-title 0.8s ease-out 0.4s both;
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
