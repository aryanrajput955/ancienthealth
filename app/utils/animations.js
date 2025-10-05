'use client';
export const fadeInUp = (elements, options = {}) => {
  if (typeof window !== 'undefined' && window.gsap) {
    const { gsap } = window
    return gsap.fromTo(elements,
      { 
        y: 60, 
        opacity: 0 
      },
      {
        y: 0,
        opacity: 1,
        duration: options.duration || 1,
        ease: options.ease || "power3.out",
        stagger: options.stagger || 0.2,
        scrollTrigger: options.scrollTrigger || {
          trigger: elements,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    )
  }
}

export const scaleIn = (elements, options = {}) => {
  if (typeof window !== 'undefined' && window.gsap) {
    const { gsap } = window
    return gsap.fromTo(elements,
      { 
        scale: 0.8, 
        opacity: 0 
      },
      {
        scale: 1,
        opacity: 1,
        duration: options.duration || 0.8,
        ease: options.ease || "back.out(1.7)",
        stagger: options.stagger || 0.1,
        scrollTrigger: options.scrollTrigger
      }
    )
  }
}

export const slideIn = (elements, direction = 'left', options = {}) => {
  if (typeof window !== 'undefined' && window.gsap) {
    const { gsap } = window
    const startValue = direction === 'left' ? -100 : direction === 'right' ? 100 : 0
    const property = direction === 'up' || direction === 'down' ? 'y' : 'x'
    
    return gsap.fromTo(elements,
      { 
        [property]: startValue, 
        opacity: 0 
      },
      {
        [property]: 0,
        opacity: 1,
        duration: options.duration || 1.2,
        ease: options.ease || "power3.out",
        stagger: options.stagger || 0.15,
        scrollTrigger: options.scrollTrigger
      }
    )
  }
}
