import { Link } from 'react-router-dom'
import { Check, Target } from 'lucide-react'
import { CHALLENGE_GOALS } from '../../lib/challengeData'

interface ChallengeCalendarProps {
  currentDay: number
  completedDays: number[]
  startDate: string
}

export function ChallengeCalendar({ currentDay, completedDays, startDate }: ChallengeCalendarProps) {
  // Calculate the actual date for a given day number
  const getDateForDay = (dayNumber: number): Date => {
    const start = new Date(startDate)
    const date = new Date(start)
    date.setDate(start.getDate() + dayNumber - 1)
    return date
  }

  // Format date as "Jan 7" style
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  return (
    <div className="comic-card p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-headline tracking-wide text-batman-cream flex items-center gap-3">
          <span className="w-6 h-1 bg-batman-yellow" />
          Training Log
        </h3>
        <div className="flex items-center gap-2 text-batman-muted text-xs font-subheading uppercase tracking-wider">
          <Target className="w-3.5 h-3.5" />
          <span>{completedDays.length}/30 Complete</span>
        </div>
      </div>

      {/* 6x5 Training Grid */}
      <div className="grid grid-cols-6 gap-2">
        {CHALLENGE_GOALS.map((day) => {
          const isCompleted = completedDays.includes(day.day)
          const isCurrent = day.day === currentDay
          const isPast = day.day < currentDay
          const dayDate = getDateForDay(day.day)

          return (
            <Link
              key={day.day}
              to={`/day/${day.day}`}
              className={`
                group relative aspect-square flex flex-col items-center justify-center
                border-2 transition-all duration-200
                ${isCompleted
                  ? 'bg-gradient-to-br from-batman-success to-batman-success-dark border-batman-success text-white shadow-[0_0_20px_rgba(50,205,50,0.3)]'
                  : isCurrent
                    ? 'bg-gradient-to-br from-batman-yellow to-batman-yellow-dark border-batman-yellow-bright text-batman-black shadow-[0_0_25px_rgba(255,215,0,0.5)] animate-pulse-current'
                    : isPast
                      ? 'bg-batman-dark border-batman-dark text-batman-muted hover:border-batman-red hover:text-batman-red'
                      : 'bg-batman-dark border-batman-steel text-batman-muted hover:border-batman-yellow hover:text-batman-cream'
                }
                hover:scale-105 hover:z-10
              `}
            >
              {/* Day number or check icon - always centered */}
              <span className="font-headline text-lg md:text-xl leading-none flex items-center justify-center">
                {isCompleted ? (
                  <Check className="w-5 h-5 md:w-6 md:h-6 stroke-[3]" />
                ) : (
                  day.day
                )}
              </span>

              {/* Date label - always in same position */}
              <span className={`
                text-[9px] md:text-[10px] font-body mt-0.5 leading-none
                ${isCompleted
                  ? 'text-white/70'
                  : isCurrent
                    ? 'text-batman-black/60'
                    : 'opacity-50'
                }
              `}>
                {formatDate(dayDate)}
              </span>
            </Link>
          )
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-6 pt-4 border-t border-batman-steel">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-gradient-to-br from-batman-success to-batman-success-dark border-2 border-batman-success flex items-center justify-center">
            <Check className="w-3 h-3 text-white stroke-[3]" />
          </div>
          <span className="text-batman-cream font-body text-xs">Complete</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-gradient-to-br from-batman-yellow to-batman-yellow-dark border-2 border-batman-yellow" />
          <span className="text-batman-cream font-body text-xs">Today</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-batman-dark border-2 border-batman-dark" />
          <span className="text-batman-cream font-body text-xs">Missed</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-batman-dark border-2 border-batman-steel" />
          <span className="text-batman-cream font-body text-xs">Upcoming</span>
        </div>
      </div>
    </div>
  )
}
