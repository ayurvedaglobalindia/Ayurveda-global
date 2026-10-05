'use client'

import { useState, useCallback } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Expand } from 'lucide-react'
import { motion } from 'framer-motion'
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
        className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-[#F5F1EB] border border-[#999999]/30 group shadow-sm"
        role="region"
        aria-label="Product image gallery"
      >
        <Image
          src={currentImage.src}
          alt={currentImage.alt || alt}
          fill
          className={classNames(
            'transition-transform duration-500 group-hover:scale-105',
            currentImage.src.includes('-card') || currentImage.src.includes('-detail')
              ? 'object-cover'
              : 'object-contain p-2'
          )}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 450px"
          priority={selectedIndex === 0}
        />

        {/* Previous / Next Arrows on Hover */}
        {images.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#FFFFFF]/90 backdrop-blur-sm text-[#1C1D1F] hover:bg-[#FFFFFF] border border-[#999999]/30 shadow-sm flex items-center justify-center transition-all opacity-80 sm:opacity-0 group-hover:opacity-100"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5 -ml-0.5" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#FFFFFF]/90 backdrop-blur-sm text-[#1C1D1F] hover:bg-[#FFFFFF] border border-[#999999]/30 shadow-sm flex items-center justify-center transition-all opacity-80 sm:opacity-0 group-hover:opacity-100"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5 ml-0.5" />
            </button>
          </>
        )}

        {/* Fullscreen Expansion Button */}
        <button
          onClick={() => setIsFullscreen(true)}
          className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-[#FFFFFF]/90 backdrop-blur-sm text-[#1C1D1F] hover:bg-[#FFFFFF] border border-[#999999]/30 shadow-sm flex items-center justify-center transition-all"
          aria-label="View high-resolution image"
          title="Zoom image"
        >
          <Expand className="w-4 h-4" />
        </button>
      </div>

      {/* Thumbnails Row */}
      {images.length > 1 && (
        <div className="flex gap-2.5 mt-3 overflow-x-auto pb-1" role="tablist" aria-label="Product thumbnails">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              role="tab"
              aria-selected={index === selectedIndex}
              aria-label={`View image ${index + 1}`}
              className={classNames(
                'relative flex-shrink-0 w-16 h-20 rounded-xl overflow-hidden border transition-all duration-200 bg-[#FFFFFF] shadow-xs',
                index === selectedIndex
                  ? 'border-[#1C1D1F] ring-1 ring-[#1C1D1F]'
                  : 'border-[#999999]/30 opacity-75 hover:opacity-100'
              )}
            >
              <Image
                src={image.src}
                alt={image.alt || alt}
                fill
                className="object-cover"
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
          <div className="relative w-full aspect-square max-h-[55vh] sm:max-h-[60vh] bg-[#F5F1EB] rounded-2xl overflow-hidden border border-[#999999]/30 flex items-center justify-center">
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
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#FFFFFF]/90 backdrop-blur-sm text-[#1C1D1F] border border-[#999999]/30 shadow flex items-center justify-center transition-all z-10"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6 -ml-0.5" />
                </button>
                <button
                  onClick={goToNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#FFFFFF]/90 backdrop-blur-sm text-[#1C1D1F] border border-[#999999]/30 shadow flex items-center justify-center transition-all z-10"
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
                    'relative w-14 h-16 rounded-xl overflow-hidden border transition-all bg-[#FFFFFF]',
                    index === selectedIndex
                      ? 'border-[#1C1D1F] ring-1 ring-[#1C1D1F]'
                      : 'border-[#999999]/30 opacity-70 hover:opacity-100'
                  )}
                >
                  <Image src={image.src} alt="" fill className="object-cover" sizes="56px" />
                </button>
              ))}
            </div>
          )}
        </div>
      </Modal>
    </div>
  )
}