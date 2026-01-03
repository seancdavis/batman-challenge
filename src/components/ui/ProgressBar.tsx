interface ProgressBarProps {
  progress: number // 0-100
  label?: string
  showPercentage?: boolean
  className?: string
}

export function ProgressBar({
  progress,
  label,
  showPercentage = true,
  className = '',
}: ProgressBarProps) {
  const clampedProgress = Math.min(100, Math.max(0, progress))
  const isComplete = clampedProgress >= 100

  return (
    <div className={className}>
      {(label || showPercentage) && (
        <div className="flex justify-between items-center mb-2 text-sm font-subheading uppercase tracking-wide">
          {label && <span className="text-batman-cream">{label}</span>}
          {showPercentage && (
            <span className={`font-bold ${isComplete ? 'text-batman-success' : 'text-batman-yellow'}`}>
              {Math.round(clampedProgress)}%
            </span>
          )}
        </div>
      )}
      <div className="comic-progress h-4">
        <div
          className={`h-full ${isComplete ? 'comic-progress-complete' : 'comic-progress-bar'}`}
          style={{ width: `${clampedProgress}%` }}
        />
      </div>
    </div>
  )
}
