'use client'
import { useEffect, useRef, useState } from 'react'

export default function HerbsSection() {
  const sectionRef = useRef()
  const [hoveredHerb, setHoveredHerb] = useState(null)

  const herbs = [
    {
      name: "Ashwagandha",
      sanskrit: "अश्वगंधा",
      benefit: "Energy & Vitality",
      description: "The royal herb of strength, sourced from 3000m altitude",
      color: "bg-green-100 text-green-800"
    },
    {
      name: "Brahmi",
      sanskrit: "ब्राह्मी", 
      benefit: "Mental Clarity",
      description: "Sacred to Brahma, enhances cognitive function",
      color: "bg-blue-100 text-blue-800"
    },
    {
      name: "Tulsi",
      sanskrit: "तुलसी",
      benefit: "Immunity & Peace",
      description: "Holy basil, the queen of herbs for wellness",
      color: "bg-purple-100 text-purple-800"
    },
    {
      name: "Neem",
      sanskrit: "नीम",
      benefit: "Purification",
      description: "Nature's pharmacy for skin and body cleansing",
      color: "bg-emerald-100 text-emerald-800"
    }
  ]

  useEffect(() => {
    if (typeof window !== 'undefined' && window.gsap) {
      const { gsap } = window

      // Herb growing animation
      herbs.forEach((_, index) => {
        gsap.fromTo(`.herb-${index}`,
          { 
            scale: 0,
            rotation: -180,
            opacity: 0 
          },
          {
            scale: 1,
            rotation: 0,
            opacity: 1,
            duration: 1.5,
            ease: "elastic.out(1, 0.8)",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            },
            delay: index * 0.3
          }
        )
      })
    }
  }, [])

  return (
    <section id="herbs" ref={sectionRef} className="py-24 bg-gradient-to-b from-red-50 to-yellow-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-light text-gray-800 mb-6">
            Pure <span className="italic text-green-700">Himalayan Herbs</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Each herb carries the wisdom of ancient texts and the purity of mountain air. 
            Handpicked at the perfect lunar cycle, dried naturally under Himalayan sun.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {herbs.map((herb, index) => (
            <div 
              key={index}
              className={`herb-${index} group relative cursor-pointer`}
              onMouseEnter={() => setHoveredHerb(index)}
              onMouseLeave={() => setHoveredHerb(null)}
            >
              <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4">
                {/* Sanskrit Symbol */}
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-yellow-700 mb-2">{herb.sanskrit}</div>
                  <div className="w-12 h-1 bg-yellow-700 mx-auto rounded-full"></div>
                </div>

                <h3 className="text-2xl font-semibold text-gray-800 mb-2 text-center">
                  {herb.name}
                </h3>
                
                <div className={`inline-block px-4 py-2 rounded-full text-sm font-semibold mb-4 ${herb.color} w-full text-center`}>
                  {herb.benefit}
                </div>

                <p className="text-gray-600 text-center text-sm leading-relaxed">
                  {herb.description}
                </p>

                {/* Hover Effect */}
                {hoveredHerb === index && (
                  <div className="absolute inset-0 bg-gradient-to-t from-yellow-600/90 to-transparent rounded-3xl flex items-end justify-center p-6">
                    <button className="bg-white text-yellow-700 px-6 py-3 rounded-full font-semibold hover:bg-yellow-50 transition-all">
                      Learn More
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}