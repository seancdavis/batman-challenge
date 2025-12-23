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
        <div className="flex justify-between items-center mb-1 text-sm">
          {label && <span className="text-gray-300">{label}</span>}
          {showPercentage && (
            <span className={isComplete ? 'text-green-400' : 'text-gray-400'}>
              {Math.round(clampedProgress)}%
            </span>
          )}
        </div>
      )}
      <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-300 ${
            isComplete ? 'bg-green-500' : 'bg-yellow-500'
          }`}
          style={{ width: `${clampedProgress}%` }}
        />
      </div>
    </div>
  )
}
