'use client'

import { useEffect, useState } from 'react'
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { classNames } from '@/lib/utils/formatters'
import { useUIStore } from '@/store/uiStore'

export function Toaster() {
  const { toasts, dismissToast } = useUIStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const toastIcons = {
    success: <CheckCircle className="w-4 h-4 text-[#4E5F52]" />,
    error: <AlertCircle className="w-4 h-4 text-rose-600" />,
    info: <Info className="w-4 h-4 text-[#4E5F52]" />,
    warning: <AlertTriangle className="w-4 h-4 text-[#9E8047]" />,
  }

  const toastStyles = {
    success: 'bg-[#FFFFFF] border-[#4E5F52]/40 shadow-lg',
    error: 'bg-[#FFFFFF] border-rose-200 shadow-lg',
    info: 'bg-[#FFFFFF] border-[#999999]/30 shadow-lg',
    warning: 'bg-[#FFFFFF] border-[#9E8047]/40 shadow-lg',
  }

  const toastContent = (
    <AnimatePresence>
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 w-full max-w-sm sm:max-w-md">
        {toasts.map(toast => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 50, y: 15 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: 50, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className={classNames(
              'flex items-start gap-3 p-3.5 rounded-xl border',
              toastStyles[toast.type]
            )}
            role="alert"
            aria-live="polite"
          >
            <div className="flex-shrink-0 mt-0.5">{toastIcons[toast.type]}</div>
            <div className="flex-1 min-w-0">
              <p className="font-heading font-medium text-[#1C1D1F] text-xs sm:text-sm">{toast.title}</p>
              {toast.message && (
                <p className="mt-0.5 text-xs text-[#555555] leading-relaxed">{toast.message}</p>
              )}
            </div>
            <button
              onClick={() => dismissToast(toast.id)}
              className="flex-shrink-0 p-1 rounded-lg text-[#999999] hover:text-[#1C1D1F] hover:bg-[#FAF7F2] transition-colors"
              aria-label="Dismiss"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        ))}
      </div>
    </AnimatePresence>
  )

  if (typeof window === 'undefined') return null

  return createPortal(toastContent, document.body)
}