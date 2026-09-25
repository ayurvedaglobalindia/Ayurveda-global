'use client'

import { useState, useCallback } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { classNames } from '@/lib/utils/formatters'
import { Modal } from './Modal'
import type { ProductImage } from '@/types'

interface ImageGalleryProps {
  images: ProductImage[]
  alt: string
  className?: string
}

export function ImageGallery({ images, alt, className }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const goToPrevious = useCallback(() => {
    setSelectedIndex(prev => (prev === 0 ? images.length - 1 : prev - 1))
  }, [images.length])

  const goToNext = useCallback(() => {
    setSelectedIndex(prev => (prev === images.length - 1 ? 0 : prev + 1))
  }, [images.length])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') goToPrevious()
    if (e.key === 'ArrowRight') goToNext()
    if (e.key === 'Escape') setIsFullscreen(false)
  }

  const currentImage = images[selectedIndex] || images[0]

  return (
    <div className={classNames('relative', className)}>
      {/* Main Image Stage */}
      <div
        className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-gradient-to-b from-[#f9f8f4] to-[#ede7dc] shadow-md border border-ayur-sand/50 group"
        role="region"
        aria-label="Product image gallery"
      >
        <Image
          src={currentImage.src}
          alt={currentImage.alt || alt}
          fill
          className="object-contain p-4 sm:p-6 transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 450px"
          priority={selectedIndex === 0}
        />

        {/* Previous / Next Arrows on Hover */}
        {images.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md text-ayur-forest hover:bg-white shadow-lg flex items-center justify-center transition-all opacity-80 sm:opacity-0 group-hover:opacity-100 focus-visible-ring"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5 -ml-0.5" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md text-ayur-forest hover:bg-white shadow-lg flex items-center justify-center transition-all opacity-80 sm:opacity-0 group-hover:opacity-100 focus-visible-ring"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5 ml-0.5" />
            </button>
          </>
        )}

        {/* Fullscreen Expansion Button */}
        <button
          onClick={() => setIsFullscreen(true)}
          className="absolute bottom-3.5 right-3.5 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md text-ayur-forest hover:bg-white shadow-lg flex items-center justify-center transition-all focus-visible-ring"
          aria-label="View high-resolution image"
          title="Zoom image"
        >
          <Expand className="w-4.5 h-4.5" />
        </button>
      </div>

      {/* Thumbnails Row */}
      {images.length > 1 && (
        <div className="flex gap-2.5 mt-3.5 overflow-x-auto pb-1 scrollbar-hide" role="tablist" aria-label="Product thumbnails">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              role="tab"
              aria-selected={index === selectedIndex}
              aria-label={`View image ${index + 1}`}
              className={classNames(
                'relative flex-shrink-0 w-16 h-20 rounded-xl overflow-hidden border-2 transition-all duration-200 bg-white shadow-sm focus-visible-ring',
                index === selectedIndex
                  ? 'border-ayur-gold ring-2 ring-ayur-gold/25'
                  : 'border-ayur-sand/60 hover:border-ayur-forest/40'
              )}
            >
              <Image
                src={image.src}
                alt={image.alt || alt}
                fill
                className="object-contain p-1"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen High-Res Modal */}
      <Modal
        isOpen={isFullscreen}
        onClose={() => setIsFullscreen(false)}
        size="lg"
        title="High-Resolution Product Viewer"
        showCloseButton
      >
        <div className="flex flex-col items-center justify-center gap-4" onKeyDown={handleKeyDown}>
          <div className="relative w-full aspect-square max-h-[55vh] sm:max-h-[60vh] bg-gradient-to-b from-[#f9f8f4] to-[#ede7dc] rounded-2xl overflow-hidden border border-ayur-sand/50 shadow-inner flex items-center justify-center">
            <Image
              src={currentImage.src}
              alt={currentImage.alt || alt}
              fill
              className="object-contain p-4 sm:p-6"
              sizes="(max-width: 1024px) 90vw, 700px"
              priority
            />

            {images.length > 1 && (
              <>
                <button
                  onClick={goToPrevious}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md text-ayur-forest hover:bg-white shadow-lg flex items-center justify-center transition-all z-10"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6 -ml-0.5" />
                </button>
                <button
                  onClick={goToNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md text-ayur-forest hover:bg-white shadow-lg flex items-center justify-center transition-all z-10"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6 ml-0.5" />
                </button>
              </>
            )}
          </div>

          {/* Fullscreen Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-2 justify-center flex-wrap pt-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedIndex(index)}
                  className={classNames(
                    'relative w-14 h-16 rounded-xl overflow-hidden border-2 transition-all bg-white shadow-sm',
                    index === selectedIndex
                      ? 'border-ayur-gold ring-2 ring-ayur-gold/30'
                      : 'border-ayur-sand/60 hover:border-ayur-forest/40 opacity-70 hover:opacity-100'
                  )}
                >
                  <Image src={image.src} alt="" fill className="object-contain p-1" sizes="56px" />
                </button>
              ))}
            </div>
          )}
        </div>
      </Modal>
    </div>
  )
}