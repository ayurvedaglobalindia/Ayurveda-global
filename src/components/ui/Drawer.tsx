'use client'

import { ReactNode, useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { classNames } from '@/lib/utils/formatters'

interface DrawerProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: ReactNode
  position?: 'left' | 'right' | 'bottom'
  size?: 'sm' | 'md' | 'lg' | 'full'
  closeOnOverlayClick?: boolean
}

export function Drawer({
  isOpen,
  onClose,
  title,
  children,
  position = 'right',
  size = 'md',
  closeOnOverlayClick = true,
}: DrawerProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!isOpen) return

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleEscape)

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    const originalOverflow = document.body.style.overflow
    const originalPaddingRight = document.body.style.paddingRight

    document.body.style.overflow = 'hidden'
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = originalOverflow
      document.body.style.paddingRight = originalPaddingRight
    }
  }, [isOpen, onClose])

  if (!mounted) return null

  const sizeClasses = {
    sm: position === 'bottom' ? 'h-[35vh] max-h-[35vh]' : 'w-72',
    md: position === 'bottom' ? 'h-[55vh] max-h-[55vh]' : 'w-80 sm:w-96',
    lg: position === 'bottom' ? 'h-[75vh] max-h-[75vh]' : 'w-[28rem] sm:w-[32rem]',
    full: position === 'bottom' ? 'h-[92vh] max-h-[92vh]' : 'w-[90vw] max-w-[420px]',
  }

  const positionClasses = {
    left: 'left-0 top-0 bottom-0',
    right: 'right-0 top-0 bottom-0',
    bottom: 'bottom-0 left-0 right-0',
  }

  const enterAnimation = {
    left: { x: '-100%' },
    right: { x: '100%' },
    bottom: { y: '100%' },
  }

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
          onClick={closeOnOverlayClick ? onClose : undefined}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? 'drawer-title' : undefined}
        >
          <motion.div
            initial={enterAnimation[position]}
            animate={{ x: 0, y: 0 }}
            exit={enterAnimation[position]}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className={classNames(
              'fixed z-[65] bg-white shadow-2xl flex flex-col overflow-hidden',
              sizeClasses[size],
              positionClasses[position]
            )}
            onClick={e => e.stopPropagation()}
          >
            {(title || position !== 'bottom') && (
              <div className="flex items-center justify-between p-4 sm:p-5 border-b border-[#999999]/30 bg-[#FAF7F2] flex-shrink-0">
                {title && (
                  <h2 id="drawer-title" className="text-base sm:text-lg font-medium text-[#1C1D1F] font-heading truncate">
                    {title}
                  </h2>
                )}
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-full text-[#737373] hover:text-[#1C1D1F] hover:bg-[#EAE4DC] transition-colors focus-visible-ring ml-auto"
                  aria-label="Close drawer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 overscroll-contain">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )

  return createPortal(modalContent, document.body)
}