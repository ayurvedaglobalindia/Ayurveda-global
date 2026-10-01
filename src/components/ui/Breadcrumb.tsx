'use client'

import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'
import { classNames } from '@/lib/utils/formatters'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav className={classNames('flex items-center gap-2 text-sm', className)} aria-label="Breadcrumb">
      <ol className="flex items-center gap-2 flex-wrap">
        <li>
          <Link href="/" className="flex items-center gap-1 text-[#8A9B8F] hover:text-[#D4AF37] transition-colors" aria-label="Home">
            <Home className="w-4 h-4" />
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            <ChevronRight className="w-3.5 h-3.5 text-[#D4AF37]/40 flex-shrink-0" aria-hidden="true" />
            {item.href ? (
              <Link href={item.href} className="text-[#8A9B8F] hover:text-[#D4AF37] transition-colors font-medium">
                {item.label}
              </Link>
            ) : (
              <span className="text-[#FAF7EE] font-medium" aria-current="page">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}