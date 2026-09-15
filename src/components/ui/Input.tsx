'use client'

import { InputHTMLAttributes, forwardRef } from 'react'
import { classNames } from '@/lib/utils/formatters'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
  icon?: React.ReactNode
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, icon, id, ...props }, ref) => {
    const inputId = id || props.name

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-ayur-forest mb-1.5">
            {label}
            {props.required && <span className="text-ayur-copper ml-1" aria-hidden="true">*</span>}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-ayur-stone pointer-events-none">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={classNames(
              'w-full px-4 py-3 bg-white border rounded-lg text-ayur-black placeholder-ayur-stone transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ayur-gold focus:border-transparent',
              icon && 'pl-10',
              error && 'border-ayur-copper focus:ring-ayur-copper',
              !error && 'border-ayur-sand',
              className
            )}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
            {...props}
          />
        </div>
        {error && (
          <p id={`${inputId}-error`} className="mt-1.5 text-sm text-ayur-copper" role="alert">
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={`${inputId}-hint`} className="mt-1.5 text-sm text-ayur-stone">
            {hint}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'