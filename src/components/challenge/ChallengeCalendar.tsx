import { Link } from 'react-router-dom'
import { CHALLENGE_GOALS } from '../../lib/challengeData'

interface ChallengeCalendarProps {
  currentDay: number
  completedDays: number[]
}

export function ChallengeCalendar({ currentDay, completedDays }: ChallengeCalendarProps) {
  return (
    <div className="comic-card p-6">
      <h3 className="text-xl font-headline tracking-wide mb-6 text-batman-cream flex items-center gap-3">
        <span className="w-6 h-1 bg-batman-yellow" />
        30-Day Calendar
      </h3>

      {/* Week day headers */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
          <div
            key={i}
            className="text-center text-xs font-subheading uppercase tracking-wider text-batman-muted"
          >
            {day}
          </div>
        ))}
      </div>

      {/* 7-column grid for weekly view */}
      <div className="grid grid-cols-7 gap-2">
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
              className={`${dayClass} aspect-square flex items-center justify-center text-sm relative group`}
            >
              {day.day}
              {isCompleted && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-batman-success border border-batman-black flex items-center justify-center">
                  <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </span>
              )}
            </Link>
          )
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-6 pt-4 border-t border-batman-steel">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 comic-day comic-day-complete text-[8px] flex items-center justify-center">
            <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
          <span className="text-batman-cream font-body text-xs">Complete</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 comic-day comic-day-current" />
          <span className="text-batman-cream font-body text-xs">Today</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 comic-day comic-day-past" />
          <span className="text-batman-cream font-body text-xs">Missed</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 comic-day comic-day-future" />
          <span className="text-batman-cream font-body text-xs">Upcoming</span>
        </div>
      </div>
    </div>
  )
}
