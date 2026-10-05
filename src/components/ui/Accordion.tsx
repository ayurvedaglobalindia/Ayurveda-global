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
            transition={{ delay: index * 0.04 }}
            className="bg-[#FFFFFF] border border-[#999999]/30 rounded-xl overflow-hidden shadow-xs"
          >
            <button
              onClick={() => toggleItem(index)}
              className={classNames(
                'w-full px-4 sm:px-5 py-3.5 sm:py-4 flex items-center justify-between text-left transition-colors focus-visible-ring',
                isOpen ? 'bg-[#FAF7F2]' : 'hover:bg-[#FAF7F2]/60'
              )}
              aria-expanded={isOpen}
              aria-controls={`accordion-content-${index}`}
            >
              <span className="font-heading sm:font-sans font-medium text-xs sm:text-sm text-[#1C1D1F] pr-4">{item.title}</span>
              <ChevronDown
                className={classNames(
                  'w-4 h-4 text-[#4E5F52] flex-shrink-0 transition-transform duration-200',
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
                  className="overflow-hidden border-t border-[#999999]/15"
                >
                  <div className="px-4 sm:px-5 py-3 sm:py-4 text-xs sm:text-sm text-[#555555] leading-relaxed">
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