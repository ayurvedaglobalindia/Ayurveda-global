'use client'

import { TextareaHTMLAttributes, forwardRef } from 'react'
import { classNames } from '@/lib/utils/formatters'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  hint?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, hint, id, ...props }, ref) => {
    const textareaId = id || props.name

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={textareaId} className="block text-sm font-medium text-ayur-forest mb-1.5">
            {label}
            {props.required && <span className="text-ayur-copper ml-1" aria-hidden="true">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={classNames(
            'w-full px-4 py-3 bg-white border rounded-lg text-ayur-black placeholder-ayur-stone transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ayur-gold focus:border-transparent resize-y min-h-[100px]',
            error && 'border-ayur-copper focus:ring-ayur-copper',
            !error && 'border-ayur-sand',
            className
          )}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${textareaId}-error` : hint ? `${textareaId}-hint` : undefined}
          {...props}
        />
        {error && (
          <p id={`${textareaId}-error`} className="mt-1.5 text-sm text-ayur-copper" role="alert">
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={`${textareaId}-hint`} className="mt-1.5 text-sm text-ayur-stone">
            {hint}
          </p>
        )}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'