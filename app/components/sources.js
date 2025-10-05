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
      description: "Sacred Himalayan herbs with divine potency from Lord Shiva's meditation grounds",
      image: "https://images.pexels.com/photos/18068038/pexels-photo-18068038.jpeg",
      elevation: "3,583m"
    },
    {
      title: "Badrinath Region", 
      description: "Premium tulsi and brahmi flourishing in pristine mountain conditions",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop&crop=center",
      elevation: "3,133m"
    },
    {
      title: "Valley of Flowers",
      description: "UNESCO heritage site with 300+ rare medicinal plants and alpine flora",
      image: "https://images.pexels.com/photos/554609/pexels-photo-554609.jpeg",
      elevation: "3,658m"
    }
  ]

  return (
    <section id="sources" ref={sectionRef} className="py-24 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full text-sm font-semibold tracking-wide uppercase">
              Premium Sources
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-medium text-gray-800 mb-6 leading-tight">
            Our Sacred <span className="text-yellow-700 font-medium">Sources</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Sourced from the highest peaks of Devbhoomi Uttarakhand, where nature's pharmacy has been preserved 
            for millennia in pristine Himalayan conditions.
          </p>
        </div>

        <div ref={cardsRef} className="grid lg:grid-cols-3 gap-8">
          {sources.map((source, index) => (
            <div key={index} className="group relative">
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-yellow-100">
                {/* Image Container */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={source.image} 
                    alt={source.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-white/95 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                      {source.elevation}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-yellow-700 transition-colors duration-300">
                    {source.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 leading-relaxed text-sm">
                    {source.description}
                  </p>

                  {/* Source Badge */}
                  <div className="flex items-center justify-center">
                    <span className="bg-gradient-to-r from-yellow-50 to-amber-50 text-yellow-800 px-4 py-2 rounded-full text-xs font-medium border border-yellow-200">
                      Himalayan Source • {source.elevation}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Decorative element */}
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-br from-yellow-400 to-amber-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 max-w-xl mx-auto border border-yellow-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Verified Source Authentication
            </h3>
            <p className="text-gray-600 mb-4 text-sm">
              Every batch comes with harvest dates and third-party purity certificates 
              ensuring the highest quality standards.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-xs">
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">✓ GPS Verified</span>
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">✓ Lab Tested</span>
              <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full">✓ Organic Certified</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}