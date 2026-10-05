'use client'

import { classNames } from '@/lib/utils/formatters'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'gold' | 'emerald' | 'age' | 'sale' | 'new' | 'low-stock' | 'out-of-stock' | string
  className?: string
  customClass?: string
}

export function Badge({ children, variant = 'gold', className, customClass }: BadgeProps) {
  const variantStyles: Record<string, string> = {
    gold: 'bg-[#FAF7F2] text-[#9E8047] border border-[#9E8047]/30',
    emerald: 'bg-[#EFF4F0] text-[#4E5F52] border border-[#4E5F52]/30',
    age: 'bg-rose-50 text-rose-700 border border-rose-200',
    sale: 'bg-[#FAF7F2] text-[#9E8047] border border-[#9E8047]/30',
    new: 'bg-[#EFF4F0] text-[#4E5F52] border border-[#4E5F52]/30',
    'low-stock': 'bg-amber-50 text-amber-700 border border-amber-200',
    'out-of-stock': 'bg-gray-100 text-gray-600 border border-gray-200',
  }

  return (
    <span className={classNames('badge', variantStyles[variant] || '', className, customClass)}>
      {children}
    </span>
  )
}