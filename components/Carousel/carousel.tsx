'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import styles from './carousel.module.scss'

interface CarouselImage {
  src: string
  alt: string
}

interface CarouselProps {
  images: CarouselImage[]
  autoPlayInterval?: number
}

const VISIBLE = 5 // Show 5 cards at a time

export const Carousel = ({ images, autoPlayInterval = 4000 }: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [step, setStep] = useState(0)
  const [cardWidth, setCardWidth] = useState(0)
  const trackRef = useRef<HTMLDivElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)

  const measureStep = useCallback(() => {
    const el = carouselRef.current
    const track = trackRef.current
    if (!el || !track) return

    // Calculate based on center card width (largest card)
    // Center card: 450px on desktop, 320px on mobile
    const centerCardWidth = el.clientWidth > 1024 ? 450 : 320
    const gap = 0 // No gap in our design
    const calculatedStep = Math.round(centerCardWidth + gap)
    
    setCardWidth(centerCardWidth)
    setStep(calculatedStep)
    
    const maxStart = Math.max(0, images.length - VISIBLE)
    setCurrentIndex((prev) => Math.min(prev, maxStart))
  }, [images.length])

  useEffect(() => {
    measureStep()
    window.addEventListener('resize', measureStep)
    return () => window.removeEventListener('resize', measureStep)
  }, [measureStep])

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => Math.min(prev + 1, Math.max(0, images.length - VISIBLE)))
  }, [images.length])

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0))
  }, [])

  const goToSlide = (index: number) => {
    const maxStart = Math.max(0, images.length - VISIBLE)
    setCurrentIndex(Math.min(index, maxStart))
  }

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || images.length === 0) return

    const interval = setInterval(() => {
      goToNext()
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [isAutoPlaying, autoPlayInterval, goToNext, images.length])

  // Pause auto-play on hover
  const handleMouseEnter = () => setIsAutoPlaying(false)
  const handleMouseLeave = () => setIsAutoPlaying(true)

  if (images.length === 0) {
    return null
  }

  const translateX = -(currentIndex * step)
  const showArrows = images.length > VISIBLE

  return (
    <div
      className={styles.carousel}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.carouselContainer} ref={carouselRef}>
        <div
          ref={trackRef}
          className={styles.carouselTrack}
          style={{ transform: `translateX(${translateX}px)` }}
        >
          {images.map((image, index) => {
            // Calculate position relative to center (which is at currentIndex + 2)
            const relativePosition = index - (currentIndex + 2)
            
            // Determine card type based on position relative to center
            const isCenter = relativePosition === 0
            const distanceFromCenter = Math.abs(relativePosition)
            
            return (
              <div
                key={index}
                className={`${styles.carouselSlide} ${
                  isCenter ? styles.slideCenter : ''
                } ${distanceFromCenter === 2 ? styles.slideEdge : distanceFromCenter === 1 ? styles.slideSide : ''}`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className={styles.carouselImage}
                  loading={isCenter && index < 3 ? 'eager' : 'lazy'}
                />
              </div>
            )
          })}
        </div>
      </div>

      {showArrows && (
        <button
          className={styles.carouselButton}
          onClick={goToPrevious}
          disabled={currentIndex === 0}
          aria-label="Previous image"
          type="button"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 18L9 12L15 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}

      {showArrows && (
        <button
          className={`${styles.carouselButton} ${styles.carouselButtonRight}`}
          onClick={goToNext}
          disabled={currentIndex >= images.length - VISIBLE}
          aria-label="Next image"
          type="button"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 18L15 12L9 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}

      <div className={styles.carouselIndicators}>
        {images.map((_, index) => (
          <button
            key={index}
            className={`${styles.indicator} ${
              index === currentIndex ? styles.indicatorActive : ''
            }`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            type="button"
          />
        ))}
      </div>
    </div>
  )
}

