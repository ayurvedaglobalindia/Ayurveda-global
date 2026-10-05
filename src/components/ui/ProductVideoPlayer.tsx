'use client'

import { useState, useRef } from 'react'
import { Play, Pause, Volume2, VolumeX, Maximize, Sparkles, ShoppingBag } from 'lucide-react'
import { Button } from './Button'
import { useWhatsAppStore, buildWhatsAppUrl, buildProductEnquiryMessage } from '@/store/whatsappStore'
import { useUserStore } from '@/store/userStore'
import { useUIStore } from '@/store/uiStore'

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
  const { user, isAuthenticated } = useUserStore()
  const { openModal } = useUIStore()

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
    <div className={`relative rounded-2xl overflow-hidden bg-[#FAF7F2] border border-[#999999]/30 shadow-xs ${className}`}>
      {/* Header Bar */}
      {!hideHeader && (
        <div className="p-3.5 sm:p-4 bg-[#FFFFFF] border-b border-[#999999]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#EFF4F0] text-[#4E5F52] text-[10.5px] font-semibold uppercase tracking-wider mb-1">
              <Sparkles className="w-3 h-3 text-[#4E5F52]" />
              Official Video Showcase
            </div>
            <h3 className="font-heading text-base sm:text-lg font-normal text-[#1C1D1F]">{title}</h3>
            <p className="text-xs text-[#737373]">{subtitle}</p>
          </div>

          {showCta && (
            <div className="flex items-center gap-2">
              <Button
                variant="primary"
                size="sm"
                onClick={handleWhatsAppOrder}
                className="text-xs font-medium whitespace-nowrap"
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
                className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-md flex items-center justify-center transition-colors"
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
              </button>

              <button
                onClick={toggleMute}
                className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-md flex items-center justify-center transition-colors"
                aria-label={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>

            <button
              onClick={toggleFullscreen}
              className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-md flex items-center justify-center transition-colors"
              aria-label="Fullscreen"
            >
              <Maximize className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Big Play Button when paused */}
        {!isPlaying && (
          <button
            onClick={togglePlay}
            className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-[#1C1D1F]/80 text-[#FAF7F2] flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
            aria-label="Play video"
          >
            <Play className="w-6 h-6 ml-0.5" />
          </button>
        )}
      </div>

      {/* Footer Info */}
      <div className="p-3.5 bg-[#FFFFFF] text-xs text-[#555555] flex flex-wrap items-center justify-between gap-2 border-t border-[#999999]/30">
        <span className="flex items-center gap-1.5 text-[#1C1D1F] font-medium">
          <span className="w-2 h-2 rounded-full bg-[#4E5F52]" />
          100% Genuine Herbal Authentic Packaging &amp; Sealing
        </span>
        <span className="text-[#4E5F52] font-medium text-[11px]">
          Tap video to Play / Pause • Available with Cash on Delivery (COD)
        </span>
      </div>
    </div>
  )
}
