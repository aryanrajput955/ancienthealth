'use client'
import { useEffect, useRef } from 'react'

export default function SourcesSection() {
  const sectionRef = useRef()
  const cardsRef = useRef()

  useEffect(() => {
    if (typeof window !== 'undefined' && window.gsap) {
      const { gsap } = window

      gsap.fromTo(cardsRef.current.children,
        { y: 100, opacity: 0, scale: 0.8 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          stagger: 0.2,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "bottom 30%",
            toggleActions: "play none none reverse"
          }
        }
      )
    }
  }, [])

  const sources = [
    {
      title: "Kedarnath Valley",
      description: "Where Lord Shiva meditated, herbs grow with divine energy",
      icon: "🏔️",
      elevation: "3,583m"
    },
    {
      title: "Badrinath Region", 
      description: "Sacred Vishnu land, where tulsi and brahmi flourish",
      icon: "🌿",
      elevation: "3,133m"
    },
    {
      title: "Valley of Flowers",
      description: "UNESCO heritage site with 300+ rare medicinal plants",
      icon: "🌸",
      elevation: "3,658m"
    }
  ]

  return (
    <section id="sources" ref={sectionRef} className="py-24 bg-gradient-to-b from-orange-50 to-red-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-light text-gray-800 mb-6">
            Our Sacred <span className="italic text-red-700">Sources</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From the highest peaks of Devbhoomi, where nature's pharmacy has been preserved 
            for millennia in pristine mountain air.
          </p>
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-3 gap-8">
          {sources.map((source, index) => (
            <div key={index} className="group relative">
              <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                <div className="text-6xl mb-6 text-center">{source.icon}</div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
                  {source.title}
                </h3>
                <p className="text-gray-600 text-center mb-4 leading-relaxed">
                  {source.description}
                </p>
                <div className="text-center">
                  <span className="inline-block bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-semibold">
                    {source.elevation} above sea level
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}