'use client'

import { Plus, Minus } from 'lucide-react'
import { classNames } from '@/lib/utils/formatters'

interface QuantitySelectorProps {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function QuantitySelector({ value, onChange, min = 1, max = 99, size = 'md', className }: QuantitySelectorProps) {
  const handleDecrease = () => {
    if (value > min) onChange(value - 1)
  }

  const handleIncrease = () => {
    if (value < max) onChange(value + 1)
  }

  const sizeStyles = {
    sm: 'h-8 text-sm px-3',
    md: 'h-10 text-base px-4',
    lg: 'h-12 text-lg px-5',
  }

  const buttonSize = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  }

  return (
    <div className={classNames('inline-flex items-center bg-ayur-charcoal border border-ayur-forest-dark/50 rounded-xl overflow-hidden hover:border-ayur-gold/50 transition-colors', className)}>
      <button
        onClick={handleDecrease}
        disabled={value <= min}
        className={classNames(
          'flex items-center justify-center text-ayur-gold hover:bg-ayur-gold/10 hover:text-ayur-gold-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent',
          buttonSize[size]
        )}
        aria-label="Decrease quantity"
      >
        <Minus className={classNames('w-4 h-4', size === 'sm' && 'w-3 h-3')} />
      </button>
      <input
        type="number"
        value={value}
        onChange={e => {
          const newValue = Math.max(min, Math.min(max, parseInt(e.target.value) || min))
          onChange(newValue)
        }}
        onBlur={e => {
          const newValue = Math.max(min, Math.min(max, parseInt(e.target.value) || min))
          onChange(newValue)
        }}
        className={classNames(
          'w-16 text-center bg-transparent border-0 focus:outline-none focus:ring-0 appearance-none text-ayur-ivory',
          sizeStyles[size]
        )}
        min={min}
        max={max}
        aria-label="Quantity"
      />
      <button
        onClick={handleIncrease}
        disabled={value >= max}
        className={classNames(
          'flex items-center justify-center text-ayur-gold hover:bg-ayur-gold/10 hover:text-ayur-gold-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent',
          buttonSize[size]
        )}
        aria-label="Increase quantity"
      >
        <Plus className={classNames('w-4 h-4', size === 'sm' && 'w-3 h-3')} />
      </button>
    </div>
  )
}