import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`bg-gray-800 rounded-xl border border-gray-700 p-6 ${className}`}>
      {children}
    </div>
  )
}
