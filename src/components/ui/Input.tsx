'use client'

import { InputHTMLAttributes, forwardRef } from 'react'
import { classNames } from '@/lib/utils/formatters'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
  icon?: React.ReactNode
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, icon, leftIcon, rightIcon, id, ...props }, ref) => {
    const inputId = id || props.name
    const effectiveLeftIcon = leftIcon || (rightIcon ? icon : undefined)
    const effectiveRightIcon = rightIcon || (!leftIcon ? icon : undefined)

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="label">
            {label}
            {props.required && <span className="text-ayur-gold ml-1" aria-hidden="true">*</span>}
          </label>
        )}
        <div className="relative">
          {effectiveLeftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-ayur-gold pointer-events-none">
              {effectiveLeftIcon}
            </div>
          )}
          {effectiveRightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-ayur-gold flex items-center z-10">
              {effectiveRightIcon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={classNames(
              'input',
              effectiveLeftIcon ? 'pl-10' : undefined,
              effectiveRightIcon ? 'pr-10' : undefined,
              error && 'input-error',
              className
            )}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
            {...props}
          />
        </div>
        {error && (
          <p id={`${inputId}-error`} className="mt-1.5 text-sm text-ayur-crimson-light" role="alert">
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