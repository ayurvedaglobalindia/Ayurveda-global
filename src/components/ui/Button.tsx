'use client'

import { ButtonHTMLAttributes, forwardRef } from 'react'
import { classNames } from '@/lib/utils/formatters'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'whatsapp' | 'gold'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  loading?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', fullWidth = false, loading = false, disabled, children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed rounded-full'

    const variantStyles = {
      primary: 'bg-ayur-forest text-ayur-cream hover:bg-ayur-leaf focus-visible:ring-ayur-forest',
      secondary: 'bg-ayur-gold text-ayur-black hover:bg-ayur-gold-light focus-visible:ring-ayur-gold',
      outline: 'border-2 border-ayur-forest text-ayur-forest hover:bg-ayur-forest hover:text-ayur-cream focus-visible:ring-ayur-forest',
      ghost: 'text-ayur-forest hover:bg-ayur-beige focus-visible:ring-ayur-forest',
      whatsapp: 'bg-green-600 text-white hover:bg-green-700 focus-visible:ring-green-500',
      gold: 'bg-gradient-to-r from-ayur-gold to-ayur-copper text-ayur-black hover:from-ayur-gold-light hover:to-ayur-gold focus-visible:ring-ayur-gold shadow-lg shadow-ayur-gold/30',
    }

    const sizeStyles = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-sm',
      lg: 'px-8 py-4 text-base',
    }

    return (
      <button
        ref={ref}
        className={classNames(baseStyles, variantStyles[variant], sizeStyles[size], fullWidth && 'w-full', className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'