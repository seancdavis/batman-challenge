import { forwardRef } from 'react'
import type { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`comic-input w-full px-4 py-3 text-white placeholder:text-white/40 ${className}`}
        {...props}
      />
    )
  }
)

Input.displayName = 'Input'
