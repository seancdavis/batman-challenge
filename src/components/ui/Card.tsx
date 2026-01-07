import type { ReactNode, HTMLAttributes } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  variant?: 'default' | 'yellow' | 'red' | 'success'
}

export function Card({ children, className = '', variant = 'default', ...props }: CardProps) {
  const variantStyles = {
    default: '',
    yellow: 'comic-card-yellow',
    red: 'comic-card-red',
    success: 'border-t-4 border-t-batman-success',
  }

  return (
    <div className={`comic-card p-6 ${variantStyles[variant]} ${className}`} {...props}>
      <div className="relative z-10">{children}</div>
    </div>
  )
}
