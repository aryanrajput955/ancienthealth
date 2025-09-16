'use client'
import { useEffect, useRef } from 'react'

export default function useScrollAnimation(animationType = 'fadeInUp', options = {}) {
  const elementRef = useRef()

  useEffect(() => {
    if (typeof window !== 'undefined' && window.gsap && elementRef.current) {
      const { gsap } = window
      
      const animations = {
        fadeInUp: () => gsap.fromTo(elementRef.current, 
          { y: 60, opacity: 0 },
          { 
            y: 0, 
            opacity: 1, 
            duration: 1, 
            ease: "power3.out",
            scrollTrigger: {
              trigger: elementRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        ),
        scaleIn: () => gsap.fromTo(elementRef.current,
          { scale: 0.8, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.8,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: elementRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        )
      }

      if (animations[animationType]) {
        animations[animationType]()
      }
    }
  }, [animationType])

  return elementRef
}