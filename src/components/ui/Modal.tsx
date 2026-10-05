'use client'

import { ReactNode, useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { classNames } from '@/lib/utils/formatters'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  description?: string
  children: ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  closeOnOverlayClick?: boolean
  showCloseButton?: boolean
}

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  size = 'md',
  closeOnOverlayClick = true,
  showCloseButton = true,
}: ModalProps) {
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
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-5xl',
  }

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[70] overflow-y-auto p-4 sm:p-6 flex min-h-full items-center justify-center bg-black/40 backdrop-blur-sm"
          onClick={closeOnOverlayClick ? onClose : undefined}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? 'modal-title' : undefined}
          aria-describedby={description ? 'modal-description' : undefined}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 14 }}
            transition={{ type: 'spring', damping: 26, stiffness: 320 }}
            className={classNames(
              'relative w-full max-h-[calc(100vh-3rem)] sm:max-h-[calc(100vh-4rem)] flex flex-col bg-[#FAF7F2] rounded-2xl shadow-2xl border border-[#999999]/35 overflow-hidden my-auto text-[#1C1D1F]',
              sizeClasses[size]
            )}
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
          >
            {(title || showCloseButton) && (
              <div className="flex items-center justify-between px-5 sm:px-6 py-3.5 sm:py-4 border-b border-[#999999]/30 bg-[#FFFFFF] flex-shrink-0">
                <div className="min-w-0 pr-4">
                  {title && (
                    <h2 id="modal-title" className="font-heading text-lg sm:text-xl font-normal text-[#1C1D1F] truncate">
                      {title}
                    </h2>
                  )}
                  {description && (
                    <p id="modal-description" className="mt-0.5 text-xs sm:text-sm text-[#737373] truncate">
                      {description}
                    </p>
                  )}
                </div>
                {showCloseButton && (
                  <button
                    onClick={onClose}
                    className="p-1.5 rounded-full text-[#737373] hover:text-[#1C1D1F] hover:bg-[#FAF7F2] transition-colors focus-visible-ring flex-shrink-0"
                    aria-label="Close modal"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            )}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 overscroll-contain">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )

  return createPortal(modalContent, document.body)
}