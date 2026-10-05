import Link from 'next/link'
import { ArrowLeft, ShoppingBag } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1C1D1F] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center space-y-5">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#FFFFFF] border border-[#999999]/30 shadow-xs">
          <ShoppingBag className="w-8 h-8 text-[#9E8047]" />
        </div>

        <div className="space-y-2">
          <p className="text-xs uppercase tracking-widest text-[#4E5F52] font-semibold">404 Error</p>
          <h1 className="text-2xl sm:text-3xl font-heading font-normal text-[#1C1D1F]">Page Not Found</h1>
          <p className="text-xs sm:text-sm text-[#737373] leading-relaxed">
            The formulation or page you are looking for has moved or does not exist.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs font-medium bg-[#1C1D1F] text-[#FAF7F2] hover:bg-[#333333] transition-colors shadow-xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Return Home
          </Link>
          <Link
            href="/shop"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs font-medium border border-[#999999]/40 text-[#1C1D1F] hover:bg-[#FAF7F2] transition-colors"
          >
            <ShoppingBag className="w-3.5 h-3.5" /> Explore Formulations
          </Link>
        </div>
      </div>
    </div>
  )
}
