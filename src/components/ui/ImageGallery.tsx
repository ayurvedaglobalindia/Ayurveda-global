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

  const primaryImage = images.find(img => img.isPrimary) || images[0]

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

  return (
    <div className={classNames('relative', className)}>
      <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-ayur-beige shadow-lg border border-ayur-sand/40" role="region" aria-label="Product image gallery">
        <Image
          src={images[selectedIndex].src}
          alt={images[selectedIndex].alt || alt}
          fill
          className="object-cover transition-opacity duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={selectedIndex === 0}
        />
        {images.length > 1 && !isFullscreen && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 backdrop-blur-sm text-ayur-forest hover:bg-white shadow-medium transition-all focus-visible-ring"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 backdrop-blur-sm text-ayur-forest hover:bg-white shadow-medium transition-all focus-visible-ring"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
        {images.length > 1 && (
          <button
            onClick={() => setIsFullscreen(true)}
            className="absolute bottom-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-sm text-ayur-forest hover:bg-white shadow-medium transition-all focus-visible-ring"
            aria-label="View fullscreen"
          >
            <Expand className="w-5 h-5" />
          </button>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex gap-2 mt-4 overflow-x-auto pb-2 scrollbar-hide" role="tablist" aria-label="Product thumbnails">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              role="tab"
              aria-selected={index === selectedIndex}
              aria-label={`View image ${index + 1}`}
              className={classNames(
                'relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 focus-visible-ring',
                index === selectedIndex
                  ? 'border-ayur-gold ring-2 ring-ayur-gold/20'
                  : 'border-transparent hover:border-ayur-sage/50'
              )}
            >
              <Image
                src={image.src}
                alt={image.alt || alt}
                fill
                className="object-cover"
                sizes="80px"
              />
              {image.isPrimary && (
                <span className="absolute bottom-1 left-1 px-1.5 py-0.5 text-xs font-medium bg-ayur-gold text-ayur-black rounded">
                  Main
                </span>
              )}
            </button>
          ))}
        </div>
      )}

      <Modal isOpen={isFullscreen} onClose={() => setIsFullscreen(false)} size="full" showCloseButton>
        <div className="relative h-[80vh] flex items-center justify-center" onKeyDown={handleKeyDown}>
          <button
            onClick={goToPrevious}
            className="absolute left-4 p-3 rounded-full bg-white/90 backdrop-blur-sm text-ayur-forest hover:bg-white shadow-medium transition-all focus-visible-ring z-10"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <motion.div
            key={selectedIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="max-h-[70vh] max-w-[90vw]"
          >
            <Image
              src={images[selectedIndex].src}
              alt={images[selectedIndex].alt || alt}
              width={1200}
              height={1200}
              className="object-contain rounded-lg shadow-strong"
            />
          </motion.div>
          <button
            onClick={goToNext}
            className="absolute right-4 p-3 rounded-full bg-white/90 backdrop-blur-sm text-ayur-forest hover:bg-white shadow-medium transition-all focus-visible-ring z-10"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedIndex(index)}
                className={classNames(
                  'w-16 h-16 rounded-lg overflow-hidden border-2 transition-all',
                  index === selectedIndex
                    ? 'border-ayur-gold'
                    : 'border-transparent hover:border-ayur-sage/50'
                )}
              >
                <Image src={image.src} alt="" fill className="object-cover" sizes="64px" />
              </button>
            ))}
          </div>
        </div>
      </Modal>
    </div>
  )
}