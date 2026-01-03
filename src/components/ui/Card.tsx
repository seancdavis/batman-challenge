import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  variant?: 'default' | 'yellow' | 'red' | 'success'
}

export function Card({ children, className = '', variant = 'default' }: CardProps) {
  const variantStyles = {
    default: '',
    yellow: 'comic-card-yellow',
    red: 'comic-card-red',
    success: 'border-t-4 border-t-batman-success',
  }

  return (
    <div className={`comic-card p-6 ${variantStyles[variant]} ${className}`}>
      <div className="relative z-10">{children}</div>
    </div>
  )
}
