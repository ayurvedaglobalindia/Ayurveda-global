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
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="card-luxury rounded-xl overflow-hidden"
          >
            <button
              onClick={() => toggleItem(index)}
              className={classNames(
                'w-full px-5 py-4 flex items-center justify-between text-left transition-colors focus-visible-ring',
                isOpen ? 'bg-ayur-forest-dark/50' : 'hover:bg-ayur-forest-dark/30'
              )}
              aria-expanded={isOpen}
              aria-controls={`accordion-content-${index}`}
            >
              <span className="font-medium text-ayur-ivory pr-4">{item.title}</span>
              <ChevronDown
                className={classNames(
                  'w-5 h-5 text-ayur-gold flex-shrink-0 transition-transform duration-200',
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
                  <div className="px-5 pb-5 text-ayur-stone">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )
      })}
    </div>
  )
}