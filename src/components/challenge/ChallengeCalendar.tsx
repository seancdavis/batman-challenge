import { Link } from 'react-router-dom'
import { CHALLENGE_GOALS } from '../../lib/challengeData'

interface ChallengeCalendarProps {
  currentDay: number
  completedDays: number[]
}

export function ChallengeCalendar({ currentDay, completedDays }: ChallengeCalendarProps) {
  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 p-5">
      <h3 className="text-lg font-semibold mb-4">30-Day Calendar</h3>

      <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-10 gap-2">
        {CHALLENGE_GOALS.map((day) => {
          const isCompleted = completedDays.includes(day.day)
          const isCurrent = day.day === currentDay
          const isPast = day.day < currentDay

          return (
            <Link
              key={day.day}
              to={`/day/${day.day}`}
              className={`
                aspect-square flex items-center justify-center rounded-lg text-sm font-medium transition-all
                ${
                  isCompleted
                    ? 'bg-green-600 text-white'
                    : isCurrent
                      ? 'bg-yellow-500 text-gray-900 ring-2 ring-yellow-400 ring-offset-2 ring-offset-gray-800'
                      : isPast
                        ? 'bg-gray-700 text-gray-400'
                        : 'bg-gray-700/50 text-gray-500'
                }
                hover:scale-105 hover:ring-2 hover:ring-gray-500
              `}
            >
              {day.day}
            </Link>
          )
        })}
      </div>

      <div className="flex items-center gap-4 mt-4 text-sm text-gray-400">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-green-600" />
          <span>Complete</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-yellow-500" />
          <span>Today</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-gray-700" />
          <span>Incomplete</span>
        </div>
      </div>
    </div>
  )
}
