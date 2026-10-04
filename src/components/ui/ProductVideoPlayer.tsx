'use client'

import { useState, useRef } from 'react'
import { Play, Pause, Volume2, VolumeX, Maximize, Sparkles, ShoppingBag } from 'lucide-react'
import { Button } from './Button'
import { useWhatsAppStore, buildWhatsAppUrl, buildProductEnquiryMessage } from '@/store/whatsappStore'
import { useUserStore } from '@/store/userStore'

interface ProductVideoPlayerProps {
  videoSrc?: string
  posterSrc?: string
  title?: string
  subtitle?: string
  className?: string
  showCta?: boolean
  hideHeader?: boolean
}

export function ProductVideoPlayer({
  videoSrc = '/videos/ayurvedic-wellness.mp4',
  posterSrc = '/images/products/body-essential-nutrition-card.jpg',
  title = 'Watch BODY Essential Nutrition & StayMax In Action',
  subtitle = 'Official Authentic Product Visual Showcase — Experience the Pure Formulations',
  className = '',
  showCta = true,
  hideHeader = false,
}: ProductVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const { trackLead } = useWhatsAppStore()
  const { user } = useUserStore()

  const togglePlay = () => {
    if (!videoRef.current) return
    if (videoRef.current.paused) {
      videoRef.current.play()
      setIsPlaying(true)
    } else {
      videoRef.current.pause()
      setIsPlaying(false)
    }
  }

  const toggleMute = () => {
    if (!videoRef.current) return
    videoRef.current.muted = !videoRef.current.muted
    setIsMuted(videoRef.current.muted)
  }

  const toggleFullscreen = () => {
    if (!videoRef.current) return
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen()
    }
  }

  const handleWhatsAppOrder = () => {
    const primaryAddr = user?.addresses?.[0]
    const userCity = primaryAddr ? [primaryAddr.city, primaryAddr.state].filter(Boolean).join(', ') : ''
    const message = buildProductEnquiryMessage({
      customerName: user?.name || '',
      customerPhone: user?.phone || '',
      customerCity: userCity,
      productName: 'BODY Essential Nutrition & Power Combo',
      quantity: 1,
      enquiry: 'Hi Ayur Veda Global! I watched the official product video and would like to place an order with Cash on Delivery.',
      source: 'video-player',
    })
    trackLead({
      source: 'video-player',
      productName: 'BODY Essential Nutrition',
      customerName: user?.name,
      customerPhone: user?.phone,
      quantity: 1,
      pageUrl: typeof window !== 'undefined' ? window.location.href : '',
      userAgent: '',
      referrer: '',
    })
    window.open(buildWhatsAppUrl(message), '_blank')
  }

  return (
    <div className={`relative rounded-3xl overflow-hidden bg-[#07170E] border-2 border-ayur-gold/30 shadow-2xl ${className}`}>
      {/* Header Bar */}
      {!hideHeader && (
        <div className="p-4 sm:p-6 bg-gradient-to-r from-[#0b2416] to-[#08180e] border-b border-ayur-gold/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-ayur-gold/20 text-ayur-gold text-xs font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-3 h-3 text-ayur-gold" />
              Official Video Showcase
            </div>
            <h3 className="font-heading text-lg sm:text-xl font-medium text-ayur-cream">{title}</h3>
            <p className="text-xs text-ayur-sand/80">{subtitle}</p>
          </div>

          {showCta && (
            <div className="flex items-center gap-2">
              <Button
                variant="gold"
                size="sm"
                onClick={handleWhatsAppOrder}
                className="text-xs font-bold shadow-md whitespace-nowrap"
              >
                Order on WhatsApp
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Video Container */}
      <div className="relative aspect-video w-full bg-black group">
        <video
          ref={videoRef}
          src={videoSrc}
          poster={posterSrc}
          autoPlay
          muted={isMuted}
          loop
          playsInline
          className="w-full h-full object-contain cursor-pointer"
          onClick={togglePlay}
        />

        {/* Video Overlay Controls */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex flex-col justify-between p-4">
          <div />

          <div className="pointer-events-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={togglePlay}
                className="w-10 h-10 rounded-full bg-white/20 hover:bg-ayur-gold hover:text-black text-white backdrop-blur-md flex items-center justify-center transition-colors"
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
              </button>

              <button
                onClick={toggleMute}
                className="w-10 h-10 rounded-full bg-white/20 hover:bg-ayur-gold hover:text-black text-white backdrop-blur-md flex items-center justify-center transition-colors"
                aria-label={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
            </div>

            <button
              onClick={toggleFullscreen}
              className="w-10 h-10 rounded-full bg-white/20 hover:bg-ayur-gold hover:text-black text-white backdrop-blur-md flex items-center justify-center transition-colors"
              aria-label="Fullscreen"
            >
              <Maximize className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Big Play Button when paused */}
        {!isPlaying && (
          <button
            onClick={togglePlay}
            className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-ayur-gold/90 text-black flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"
            aria-label="Play video"
          >
            <Play className="w-8 h-8 ml-1" />
          </button>
        )}
      </div>

      {/* Footer Info */}
      <div className="p-4 bg-[#06140c] text-xs text-ayur-sand/80 flex flex-wrap items-center justify-between gap-2 border-t border-ayur-forest/40">
        <span className="flex items-center gap-1.5 text-ayur-cream font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          100% Genuine Herbal Authentic Packaging & Sealing
        </span>
        <span className="text-ayur-gold font-semibold">
          Tap video to Play / Pause • Available with Cash on Delivery (COD)
        </span>
      </div>
    </div>
  )
}
