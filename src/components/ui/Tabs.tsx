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

  const tabStyles = {
    line: (isActive: boolean) =>
      classNames(
        'px-4 py-3 text-sm font-medium transition-all relative',
        isActive
          ? 'text-ayur-gold-light'
          : 'text-ayur-stone hover:text-ayur-gold-light'
      ),
    pills: (isActive: boolean) =>
      classNames(
        'px-5 py-2.5 text-sm font-medium rounded-full transition-all',
        isActive
          ? 'bg-gradient-to-r from-ayur-gold-light to-ayur-gold text-ayur-void shadow-lg shadow-ayur-gold/30'
          : 'text-ayur-stone hover:bg-ayur-forest-dark hover:text-ayur-gold-light'
      ),
    underline: (isActive: boolean) =>
      classNames(
        'px-4 py-3 text-sm font-medium transition-all relative',
        isActive
          ? 'text-ayur-gold-light'
          : 'text-ayur-stone hover:text-ayur-gold-light'
      ),
  }

  const indicatorStyles = {
    line: 'absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-ayur-gold-light to-ayur-gold transition-all duration-300',
    underline: 'absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-ayur-gold-light to-ayur-gold transition-all duration-300',
    pills: 'hidden',
  }

  return (
    <div className={classNames('space-y-4', className)}>
      <div className="relative flex gap-1 overflow-x-auto" role="tablist">
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
              item.disabled && 'opacity-50 cursor-not-allowed'
            )}
          >
            {item.label}
          </button>
        ))}
        {variant !== 'pills' && (
          <motion.div
            className={indicatorStyles[variant]}
            animate={{
              width: items[activeIndex] ? items[activeIndex].label.length * 8 + 40 : 0,
              left: items.slice(0, activeIndex).reduce((acc, item) => acc + item.label.length * 8 + 40, 0),
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          />
        )}
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