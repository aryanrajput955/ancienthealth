'use client'
import { useState, useRef, useEffect } from 'react'

export default function VideoSection() {
  const [hoveredVideo, setHoveredVideo] = useState(null)
  const [activeVideo, setActiveVideo] = useState(2)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStartX, setDragStartX] = useState(0)
  const [dragOffset, setDragOffset] = useState(0)
  const [isMounted, setIsMounted] = useState(false)
  const videoRefs = useRef([])
  const containerRef = useRef(null)

  const videos = [
    { title: "Herb Harvesting", src: "/v1.mp4" },
    { title: "Eco Packaging", src: "/v2.mp4" },
    { title: "Sacred Rituals", src: "/v3.mp4" },
    { title: "Modern Craftsmanship", src: "/v4.mp4" },
    { title: "Nature's Essence", src: "/v5.mp4" },
  ]

  // Set mounted state after component mounts
  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleMouseEnter = (index) => {
    if (!isDragging) {
      setHoveredVideo(index)
      if (videoRefs.current[index]) {
        videoRefs.current[index].play().catch(() => {})
      }
    }
  }

  const handleMouseLeave = (index) => {
    if (!isDragging) {
      setHoveredVideo(null)
      if (videoRefs.current[index]) {
        videoRefs.current[index].pause()
        videoRefs.current[index].currentTime = 0
      }
    }
  }

  const handleCardClick = (index) => {
    if (!isDragging && Math.abs(dragOffset) < 10) {
      setActiveVideo(index)
      setIsFullscreen(true)
    }
  }

  const handlePrev = () => {
    setActiveVideo(prev => prev === 0 ? videos.length - 1 : prev - 1)
  }

  const handleNext = () => {
    setActiveVideo(prev => prev === videos.length - 1 ? 0 : prev + 1)
  }

  const getCardTransform = (index) => {
    const diff = index - activeVideo
    let position = diff
    
    // Normalize position to handle circular arrangement
    if (position > 2) position -= videos.length
    if (position < -2) position += videos.length

    let transform = {
      translateX: 0,
      translateY: 0,
      rotate: 0,
      scale: 1,
      zIndex: 10,
      opacity: 1
    }

    // Use default values during SSR, actual values after mounting
    const isMobile = isMounted ? window.innerWidth < 768 : false
    const cardWidth = isMobile ? 280 : 320
    const spacing = isMobile ? 200 : 250

    switch (position) {
      case 0: // Center card
        transform = {
          translateX: 0,
          translateY: 0,
          rotate: 0,
          scale: 1,
          zIndex: 30,
          opacity: 1
        }
        break
      case -1: // Left card
        transform = {
          translateX: -spacing,
          translateY: isMobile ? 10 : 20,
          rotate: isMobile ? -3 : -6,
          scale: isMobile ? 0.85 : 0.9,
          zIndex: 20,
          opacity: 0.8
        }
        break
      case 1: // Right card
        transform = {
          translateX: spacing,
          translateY: isMobile ? 10 : 20,
          rotate: isMobile ? 3 : 6,
          scale: isMobile ? 0.85 : 0.9,
          zIndex: 20,
          opacity: 0.8
        }
        break
      case -2: // Far left
        transform = {
          translateX: -spacing * 1.5,
          translateY: isMobile ? 20 : 40,
          rotate: isMobile ? -8 : -12,
          scale: isMobile ? 0.7 : 0.8,
          zIndex: 10,
          opacity: isMobile ? 0.3 : 0.6
        }
        break
      case 2: // Far right
        transform = {
          translateX: spacing * 1.5,
          translateY: isMobile ? 20 : 40,
          rotate: isMobile ? 8 : 12,
          scale: isMobile ? 0.7 : 0.8,
          zIndex: 10,
          opacity: isMobile ? 0.3 : 0.6
        }
        break
      default: // Hidden cards
        transform = {
          translateX: position < 0 ? -spacing * 2 : spacing * 2,
          translateY: 60,
          rotate: position < 0 ? -20 : 20,
          scale: 0.6,
          zIndex: 5,
          opacity: 0
        }
    }

    // Add drag offset
    if (isDragging) {
      transform.translateX += dragOffset
    }

    return transform
  }

  // Touch and drag handlers
  const handleTouchStart = (e) => {
    setIsDragging(true)
    setDragStartX(e.touches[0].clientX)
    setDragOffset(0)
  }

  const handleMouseDown = (e) => {
    setIsDragging(true)
    setDragStartX(e.clientX)
    setDragOffset(0)
    e.preventDefault()
  }

  const handleTouchMove = (e) => {
    if (!isDragging) return
    const currentX = e.touches[0].clientX
    const offset = currentX - dragStartX
    setDragOffset(offset)
  }

  const handleMouseMove = (e) => {
    if (!isDragging) return
    const currentX = e.clientX
    const offset = currentX - dragStartX
    setDragOffset(offset)
  }

  const handleDragEnd = () => {
    if (!isDragging) return
    
    if (Math.abs(dragOffset) > 100) {
      if (dragOffset > 0) {
        handlePrev()
      } else {
        handleNext()
      }
    }
    
    setIsDragging(false)
    setDragOffset(0)
  }

  // Event listeners
  useEffect(() => {
    const handleMouseMoveGlobal = (e) => handleMouseMove(e)
    const handleMouseUpGlobal = () => handleDragEnd()
    const handleTouchMoveGlobal = (e) => handleTouchMove(e)
    const handleTouchEndGlobal = () => handleDragEnd()

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMoveGlobal)
      document.addEventListener('mouseup', handleMouseUpGlobal)
      document.addEventListener('touchmove', handleTouchMoveGlobal, { passive: false })
      document.addEventListener('touchend', handleTouchEndGlobal)
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMoveGlobal)
      document.removeEventListener('mouseup', handleMouseUpGlobal)
      document.removeEventListener('touchmove', handleTouchMoveGlobal)
      document.removeEventListener('touchend', handleTouchEndGlobal)
    }
  }, [isDragging, dragStartX, dragOffset])

  // Don't render until mounted to avoid hydration mismatch
  if (!isMounted) {
    return null
  }

  return (
    <section className="py-12 md:py-24 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-light text-gray-800 mb-4 md:mb-6">
            Where Heritage Meets <span className="italic text-yellow-700">Modern Excellence</span>
          </h2>
          <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Our production journey is a blend of ritual and precision. From sacred herbs handpicked at dawn, to eco-friendly packaging designed with modern elegance.
          </p>
        </div>

        {/* Video Carousel */}
        <div className="relative">
          <div 
            ref={containerRef}
            className={`relative flex items-center justify-center h-[300px] md:h-[420px] lg:h-[520px] select-none ${
              isDragging ? 'cursor-grabbing' : 'cursor-grab'
            }`}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
          >
            {videos.map((video, index) => {
              const transform = getCardTransform(index)
              return (
                <div 
                  key={index}
                  className="absolute transition-all duration-500 ease-out"
                  style={{
                    transform: `translateX(${transform.translateX}px) translateY(${transform.translateY}px) rotate(${transform.rotate}deg) scale(${transform.scale})`,
                    zIndex: transform.zIndex,
                    opacity: transform.opacity,
                    pointerEvents: transform.opacity > 0.1 ? 'auto' : 'none'
                  }}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={() => handleMouseLeave(index)}
                  onClick={() => handleCardClick(index)}
                >
                  <div className={`w-[280px] md:w-[320px] h-[240px] md:h-[360px] lg:h-[420px] bg-amber-50 border border-yellow-200 rounded-xl md:rounded-2xl shadow-xl overflow-hidden cursor-pointer transition-all duration-300 ${
                    hoveredVideo === index && !isDragging ? 'shadow-2xl scale-105 border-yellow-300' : ''
                  }`}>
                    <div className="h-full relative overflow-hidden">
                      <video
                        ref={el => videoRefs.current[index] = el}
                        className="w-full h-full object-cover"
                        src={video.src}
                        muted
                        loop
                        playsInline
                      />
                      <div className={`absolute inset-0 bg-gradient-to-br from-amber-900/20 to-yellow-900/20 duration-300 ${
                        hoveredVideo === index && !isDragging ? 'bg-opacity-0' : 'bg-opacity-40'
                      }`} />
                      <div className={`absolute bottom-4 md:bottom-6 left-4 md:left-6 right-4 md:right-6 transition-opacity duration-300 ${
                        hoveredVideo === index && !isDragging ? 'opacity-0' : 'opacity-100'
                      }`}>
                        <h3 className="text-lg md:text-xl font-semibold text-white drop-shadow-lg">
                          {video.title}
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}

            {/* Navigation Arrows - Hidden on mobile */}
            <button 
              onClick={handlePrev}
              className="hidden md:flex absolute left-4 top-1/2 transform -translate-y-1/2 bg-yellow-700 text-white p-3 rounded-full hover:bg-yellow-800 transition-all duration-200 z-40 shadow-lg hover:scale-110 items-center justify-center"
              aria-label="Previous video"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={handleNext}
              className="hidden md:flex absolute right-4 top-1/2 transform -translate-y-1/2 bg-yellow-700 text-white p-3 rounded-full hover:bg-yellow-800 transition-all duration-200 z-40 shadow-lg hover:scale-110 items-center justify-center"
              aria-label="Next video"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Mobile Navigation Buttons */}
          <div className="flex md:hidden justify-center mt-6 space-x-4">
            <button 
              onClick={handlePrev}
              className="bg-yellow-700 text-white p-3 rounded-full hover:bg-yellow-800 transition-all duration-200 shadow-lg active:scale-95"
              aria-label="Previous video"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={handleNext}
              className="bg-yellow-700 text-white p-3 rounded-full hover:bg-yellow-800 transition-all duration-200 shadow-lg active:scale-95"
              aria-label="Next video"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center mt-8 md:mt-12 space-x-2 md:space-x-3">
            {videos.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveVideo(index)}
                className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                  activeVideo === index 
                    ? 'bg-yellow-700 scale-125' 
                    : 'bg-amber-300 hover:bg-amber-400'
                }`}
                aria-label={`Go to video ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Fullscreen Video Modal */}
        {isFullscreen && (
          <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4">
            <div className="relative w-full max-w-4xl">
              <video
                className="w-full h-full rounded-xl md:rounded-2xl"
                src={videos[activeVideo].src}
                controls
                autoPlay
                playsInline
              />
              <button
                onClick={() => setIsFullscreen(false)}
                className="absolute top-4 right-4 bg-yellow-700 text-white p-2 md:p-3 rounded-full hover:bg-yellow-800 transition-all duration-200 z-10"
                aria-label="Close fullscreen"
              >
                <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-xl md:text-2xl font-semibold text-white drop-shadow-lg">
                  {videos[activeVideo].title}
                </h3>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}