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
          <label htmlFor={textareaId} className="block text-sm font-medium text-[#FAF7EE] mb-1.5">
            {label}
            {props.required && <span className="text-[#D4AF37] ml-1" aria-hidden="true">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={classNames(
            'w-full px-4 py-3 bg-[#0D1017] border rounded-xl text-[#FAF7EE] placeholder-[#8A8478] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent resize-y min-h-[100px]',
            error && 'border-red-500 focus:ring-red-500',
            !error && 'border-[#D4AF37]/30 hover:border-[#D4AF37]/60',
            className
          )}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${textareaId}-error` : hint ? `${textareaId}-hint` : undefined}
          {...props}
        />
        {error && (
          <p id={`${textareaId}-error`} className="mt-1.5 text-sm text-red-400" role="alert">
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={`${textareaId}-hint`} className="mt-1.5 text-sm text-[#A7B3A9]">
            {hint}
          </p>
        )}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'