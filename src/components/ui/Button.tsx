'use client'

import { ButtonHTMLAttributes, forwardRef } from 'react'
import { classNames } from '@/lib/utils/formatters'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'whatsapp' | 'gold' | 'emerald' | 'emerald-outline' | 'gold-outline'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  loading?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', fullWidth = false, loading = false, disabled, children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed rounded-full'

    const variantStyles = {
      primary: 'bg-[#1C1D1F] text-[#FAF7F2] hover:bg-[#333333] focus-visible:ring-[#1C1D1F] shadow-xs',
      secondary: 'bg-[#FAF7F2] text-[#1C1D1F] border border-[#999999]/40 hover:bg-[#EAE4DC] focus-visible:ring-[#1C1D1F]',
      outline: 'border border-[#999999]/40 text-[#1C1D1F] hover:bg-[#FAF7F2] focus-visible:ring-[#1C1D1F]',
      ghost: 'text-[#1C1D1F] hover:bg-[#FAF7F2] focus-visible:ring-[#1C1D1F]',
      whatsapp: 'bg-[#25D366] text-white hover:bg-[#20BD5A] focus-visible:ring-[#25D366]',
      gold: 'bg-[#1C1D1F] text-[#FAF7F2] hover:bg-[#2D2E30] focus-visible:ring-[#1C1D1F] shadow-sm',
      emerald: 'bg-[#4E5F52] text-[#FAF7F2] font-semibold hover:bg-[#435246] focus-visible:ring-[#4E5F52] shadow-sm',
      'emerald-outline': 'border border-[#4E5F52]/40 text-[#4E5F52] hover:bg-[#EFF4F0] focus-visible:ring-[#4E5F52]',
      'gold-outline': 'border border-[#9E8047]/50 text-[#9E8047] hover:bg-[#FAF7F2] focus-visible:ring-[#9E8047]',
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