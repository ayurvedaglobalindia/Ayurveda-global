'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { classNames } from '@/lib/utils/formatters'

interface TabItem {
  label: string
  content: React.ReactNode
  disabled?: boolean
}

interface TabsProps {
  items: TabItem[]
  defaultIndex?: number
  onChange?: (index: number) => void
  className?: string
  variant?: 'line' | 'pills' | 'underline'
}

export function Tabs({ items, defaultIndex = 0, onChange, className, variant = 'line' }: TabsProps) {
  const [activeIndex, setActiveIndex] = useState(defaultIndex)

  const handleTabClick = (index: number) => {
    if (!items[index].disabled) {
      setActiveIndex(index)
      onChange?.(index)
    }
  }

  const variantStyles = {
    line: 'border-b border-ayur-beige',
    pills: '',
    underline: 'border-b border-ayur-beige',
  }

  const tabStyles = {
    line: (isActive: boolean) =>
      classNames(
        'px-4 py-3 text-sm font-medium transition-all relative',
        isActive
          ? 'text-ayur-forest'
          : 'text-ayur-stone hover:text-ayur-forest'
      ),
    pills: (isActive: boolean) =>
      classNames(
        'px-6 py-2.5 text-sm font-medium rounded-full transition-all',
        isActive
          ? 'bg-ayur-forest text-ayur-cream shadow-soft'
          : 'text-ayur-stone hover:bg-ayur-beige hover:text-ayur-forest'
      ),
    underline: (isActive: boolean) =>
      classNames(
        'px-4 py-3 text-sm font-medium transition-all relative',
        isActive
          ? 'text-ayur-forest'
          : 'text-ayur-stone hover:text-ayur-forest'
      ),
  }

  return (
    <div className={classNames('space-y-4', className)}>
      <div className={classNames('flex gap-1 overflow-x-auto', variantStyles[variant])} role="tablist">
        {items.map((item, index) => (
          <button
            key={index}
            role="tab"
            aria-selected={index === activeIndex}
            aria-controls={`tabpanel-${index}`}
            id={`tab-${index}`}
            onClick={() => handleTabClick(index)}
            disabled={item.disabled}
            className={classNames(
              tabStyles[variant](index === activeIndex),
              item.disabled && 'opacity-50 cursor-not-allowed',
              variant === 'line' && index === activeIndex && 'after:absolute after:bottom-[-1px] after:left-0 after:right-0 after:h-0.5 after:bg-ayur-forest'
            )}
          >
            {item.label}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          role="tabpanel"
          id={`tabpanel-${activeIndex}`}
          aria-labelledby={`tab-${activeIndex}`}
        >
          {items[activeIndex].content}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}