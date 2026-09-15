'use client'

import { Fragment, ReactNode, useEffect } from 'react'
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
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const sizeClasses = {
    sm: position === 'bottom' ? 'h-[30vh] max-h-[30vh]' : 'w-64',
    md: position === 'bottom' ? 'h-[50vh] max-h-[50vh]' : 'w-80',
    lg: position === 'bottom' ? 'h-[70vh] max-h-[70vh]' : 'w-[32rem]',
    full: position === 'bottom' ? 'h-[90vh] max-h-[90vh]' : 'w-[90vw] max-w-[400px]',
  }

  const positionClasses = {
    left: 'left-0',
    right: 'right-0',
    bottom: 'bottom-0 left-0 right-0',
  }

  const enterAnimation = {
    left: { x: -300 },
    right: { x: 300 },
    bottom: { y: 300 },
  }

  const modalContent = (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-ayur-black/40 backdrop-blur-sm"
        onClick={closeOnOverlayClick ? onClose : undefined}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'drawer-title' : undefined}
      >
        <motion.div
          initial={{ opacity: 0, ...enterAnimation[position] }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, ...enterAnimation[position] }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className={classNames(
            'fixed top-0 z-50 bg-white shadow-strong flex flex-col',
            'overflow-hidden',
            sizeClasses[size],
            positionClasses[position]
          )}
          onClick={e => e.stopPropagation()}
        >
          {(title || position !== 'bottom') && (
            <div className="flex items-center justify-between p-4 border-b border-ayur-beige">
              {title && (
                <h2 id="drawer-title" className="text-lg font-medium text-ayur-black font-heading">
                  {title}
                </h2>
              )}
              <button
                onClick={onClose}
                className="p-1 rounded-lg text-ayur-stone hover:text-ayur-black hover:bg-ayur-beige transition-colors focus-visible-ring"
                aria-label="Close drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          )}
          <div className="flex-1 overflow-y-auto p-4">
            {children}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )

  if (typeof window === 'undefined') return null

  return createPortal(modalContent, document.body)
}