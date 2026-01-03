import { Link } from 'react-router-dom'
import { CHALLENGE_GOALS } from '../../lib/challengeData'

interface ChallengeCalendarProps {
  currentDay: number
  completedDays: number[]
}

export function ChallengeCalendar({ currentDay, completedDays }: ChallengeCalendarProps) {
  return (
    <div className="comic-card p-6">
      <h3 className="text-xl font-headline tracking-wide mb-6 text-batman-cream">
        30-Day Calendar
      </h3>

      <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-10 gap-2">
        {CHALLENGE_GOALS.map((day) => {
          const isCompleted = completedDays.includes(day.day)
          const isCurrent = day.day === currentDay
          const isPast = day.day < currentDay

          let dayClass = 'comic-day comic-day-future'
          if (isCompleted) {
            dayClass = 'comic-day comic-day-complete'
          } else if (isCurrent) {
            dayClass = 'comic-day comic-day-current'
          } else if (isPast) {
            dayClass = 'comic-day comic-day-past'
          }

          return (
            <Link
              key={day.day}
              to={`/day/${day.day}`}
              className={`${dayClass} aspect-square flex items-center justify-center text-sm`}
            >
              {day.day}
            </Link>
          )
        })}
      </div>

      <div className="flex flex-wrap items-center gap-6 mt-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 comic-day comic-day-complete" />
          <span className="text-batman-cream font-body">Complete</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 comic-day comic-day-current" />
          <span className="text-batman-cream font-body">Today</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 comic-day comic-day-past" />
          <span className="text-batman-cream font-body">Incomplete</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 comic-day comic-day-future" />
          <span className="text-batman-cream font-body">Upcoming</span>
        </div>
      </div>
    </div>
  )
}
