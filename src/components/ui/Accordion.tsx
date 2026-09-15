'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { classNames } from '@/lib/utils/formatters'

interface AccordionItem {
  title: string
  content: React.ReactNode
  defaultOpen?: boolean
}

interface AccordionProps {
  items: AccordionItem[]
  allowMultiple?: boolean
  className?: string
}

export function Accordion({ items, allowMultiple = false, className }: AccordionProps) {
  const [openIndices, setOpenIndices] = useState<number[]>(
    items.map((item, index) => item.defaultOpen ? index : -1).filter(i => i !== -1)
  )

  const toggleItem = (index: number) => {
    setOpenIndices(prev => {
      if (allowMultiple) {
        return prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
      }
      return prev.includes(index) ? [] : [index]
    })
  }

  return (
    <div className={classNames('space-y-3', className)}>
      {items.map((item, index) => {
        const isOpen = openIndices.includes(index)
        return (
          <div key={index} className="border border-ayur-beige rounded-xl overflow-hidden bg-white">
            <button
              onClick={() => toggleItem(index)}
              className={classNames(
                'w-full px-6 py-4 flex items-center justify-between text-left transition-colors focus-visible-ring',
                isOpen ? 'bg-ayur-cream' : 'hover:bg-ayur-cream/50'
              )}
              aria-expanded={isOpen}
              aria-controls={`accordion-content-${index}`}
            >
              <span className="font-medium text-ayur-black pr-4">{item.title}</span>
              <ChevronDown
                className={classNames(
                  'w-5 h-5 text-ayur-sage flex-shrink-0 transition-transform duration-200',
                  isOpen && 'rotate-180'
                )}
                aria-hidden="true"
              />
            </button>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  id={`accordion-content-${index}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 text-ayur-stone">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}