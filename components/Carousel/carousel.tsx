'use client'

import { useState, useEffect, useCallback } from 'react'
import styles from './carousel.module.scss'

interface CarouselImage {
  src: string
  alt: string
}

interface CarouselProps {
  images: CarouselImage[]
  autoPlayInterval?: number
}

export const Carousel = ({ images, autoPlayInterval = 4000 }: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }, [images.length])

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }, [images.length])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
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

  // Calculate which 5 cards to show (2 before, current, 2 after)
  const getVisibleCards = () => {
    const visible: number[] = []
    for (let i = -2; i <= 2; i++) {
      let index = currentIndex + i
      // Wrap around for circular carousel
      if (index < 0) {
        index = images.length + index
      } else if (index >= images.length) {
        index = index - images.length
      }
      visible.push(index)
    }
    return visible
  }

  const visibleCards = getVisibleCards()

  // Calculate offset to center the current card
  const offset = 2 // Show 2 cards before center

  return (
    <div
      className={styles.carousel}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.carouselContainer}>
        <div className={styles.carouselTrack}>
          {visibleCards.map((imageIndex, position) => {
            const isCenter = position === 2 // 5th card (index 2) is center
            const distanceFromCenter = Math.abs(position - 2)
            
            return (
              <div
                key={`${imageIndex}-${position}`}
                className={`${styles.carouselSlide} ${
                  isCenter ? styles.slideCenter : ''
                } ${distanceFromCenter === 2 ? styles.slideEdge : styles.slideSide}`}
              >
                <img
                  src={images[imageIndex].src}
                  alt={images[imageIndex].alt}
                  className={styles.carouselImage}
                  loading={isCenter ? 'eager' : 'lazy'}
                />
              </div>
            )
          })}
        </div>
      </div>

      <button
        className={styles.carouselButton}
        onClick={goToPrevious}
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

      <button
        className={`${styles.carouselButton} ${styles.carouselButtonRight}`}
        onClick={goToNext}
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

