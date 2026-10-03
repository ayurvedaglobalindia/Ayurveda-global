import Link from 'next/link'
import { Sparkles, ArrowLeft, ShoppingBag } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-ayur-obsidian text-ayur-cream flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-ayur-emerald-card border border-ayur-gold/30 shadow-luxury">
          <Sparkles className="w-10 h-10 text-ayur-gold" />
        </div>

        <div className="space-y-2">
          <p className="text-xs uppercase tracking-widest text-ayur-gold font-bold">404 Error</p>
          <h1 className="text-3xl sm:text-4xl font-serif text-ayur-cream">Sacred Path Not Found</h1>
          <p className="text-sm text-ayur-sand/80">
            The page or wellness formulation you are searching for has moved or does not exist.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs uppercase tracking-wider font-bold bg-ayur-gold text-ayur-void hover:bg-ayur-gold-bright transition shadow-lg"
          >
            <ArrowLeft className="w-4 h-4" /> Return Home
          </Link>
          <Link
            href="/shop"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs uppercase tracking-wider font-semibold border border-ayur-gold/30 text-ayur-gold hover:bg-ayur-gold/10 transition"
          >
            <ShoppingBag className="w-4 h-4" /> Explore Shop
          </Link>
        </div>
      </div>
    </div>
  )
}
