'use client'

import { Fragment, useEffect, useState } from 'react'
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { classNames } from '@/lib/utils/formatters'
import { useUIStore } from '@/store/uiStore'

interface Toast {
  id: string
  type: 'success' | 'error' | 'info' | 'warning'
  title: string
  message?: string
  duration?: number
}

export function Toaster() {
  const { toasts, dismissToast } = useUIStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const toastIcons = {
    success: <CheckCircle className="w-5 h-5 text-ayur-gold" />,
    error: <AlertCircle className="w-5 h-5 text-ayur-crimson-light" />,
    info: <Info className="w-5 h-5 text-ayur-gold" />,
    warning: <AlertTriangle className="w-5 h-5 text-ayur-copper" />,
  }

  const toastStyles = {
    success: 'bg-ayur-charcoal/95 border-ayur-gold/50 shadow-[0_8px_30px_rgba(201,168,76,0.15)]',
    error: 'bg-ayur-charcoal/95 border-ayur-crimson/50 shadow-[0_8px_30px_rgba(139,0,0,0.15)]',
    info: 'bg-ayur-charcoal/95 border-ayur-gold/35 shadow-[0_8px_30px_rgba(201,168,76,0.1)]',
    warning: 'bg-ayur-charcoal/95 border-ayur-copper/50 shadow-[0_8px_30px_rgba(184,115,51,0.15)]',
  }

  const toastContent = (
    <AnimatePresence>
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 w-full max-w-sm sm:max-w-md">
        {toasts.map(toast => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 100, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: 100, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={classNames(
              'flex items-start gap-3 p-4 rounded-xl border backdrop-blur-md',
              toastStyles[toast.type]
            )}
            role="alert"
            aria-live="polite"
          >
            <div className="flex-shrink-0 mt-0.5">{toastIcons[toast.type]}</div>
            <div className="flex-1 min-w-0">
              <p className="font-heading font-normal text-ayur-ivory text-sm">{toast.title}</p>
              {toast.message && (
                <p className="mt-0.5 text-xs text-ayur-stone">{toast.message}</p>
              )}
            </div>
            <button
              onClick={() => dismissToast(toast.id)}
              className="flex-shrink-0 p-1 rounded-lg text-ayur-stone hover:text-ayur-ivory hover:bg-ayur-ivory/10 transition-colors"
              aria-label="Dismiss"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </div>
    </AnimatePresence>
  )

  if (typeof window === 'undefined') return null

  return createPortal(toastContent, document.body)
}