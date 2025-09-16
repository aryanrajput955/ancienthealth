'use client'
import { useEffect, useRef } from 'react'

export default function MoodSections() {
  const sectionRef = useRef()

  const moods = [
    {
      title: "Energy",
      sanskrit: "शक्ति",
      description: "Awaken your inner fire with herbs that invigorate body and spirit",
      icon: "⚡",
      gradient: "from-red-400 to-orange-500",
      products: ["Ashwagandha", "Shilajit", "Ginseng"]
    },
    {
      title: "Calm", 
      sanskrit: "शांति",
      description: "Find peace in nature's gentle embrace, restore balance within",
      icon: "🕯️",
      gradient: "from-blue-400 to-purple-500",
      products: ["Brahmi", "Jatamansi", "Shankhpushpi"]
    },
    {
      title: "Immunity",
      sanskrit: "प्रतिरक्षा", 
      description: "Shield yourself with ancient wisdom, strengthen from within",
      icon: "🛡️",
      gradient: "from-green-400 to-emerald-500",
      products: ["Tulsi", "Amla", "Giloy"]
    },
    {
      title: "Glow",
      sanskrit: "तेज",
      description: "Radiate natural beauty, let your inner light shine bright",
      icon: "✨",
      gradient: "from-yellow-400 to-gold",
      products: ["Turmeric", "Neem", "Rose"]
    }
  ]

  useEffect(() => {
    if (typeof window !== 'undefined' && window.gsap) {
      const { gsap } = window

      gsap.fromTo('.mood-card',
        { 
          x: -100,
          opacity: 0,
          rotation: -5
        },
        {
          x: 0,
          opacity: 1,
          rotation: 0,
          duration: 1.2,
          stagger: 0.2,
          ease: "power3.out",
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

  return (
    <section id="wellness" ref={sectionRef} className="py-24 bg-gradient-to-b from-yellow-50 to-orange-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-light text-gray-800 mb-6">
            Your Wellness <span className="italic text-orange-700">Ritual</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect with your emotions through nature's wisdom. Each mood, each moment, 
            has its perfect herbal companion waiting to guide you home.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {moods.map((mood, index) => (
            <div key={index} className="mood-card group">
              <div className={`relative bg-gradient-to-br ${mood.gradient} rounded-3xl p-8 text-white shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105`}>
                
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-4 right-4 text-8xl">{mood.icon}</div>
                </div>

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-3xl font-semibold mb-2">{mood.title}</h3>
                      <div className="text-2xl opacity-80">{mood.sanskrit}</div>
                    </div>
                    <div className="text-4xl">{mood.icon}</div>
                  </div>

                  <p className="text-lg mb-6 opacity-90 leading-relaxed">
                    {mood.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {mood.products.map((product, idx) => (
                      <span key={idx} className="bg-white/20 px-3 py-1 rounded-full text-sm backdrop-blur-sm">
                        {product}
                      </span>
                    ))}
                  </div>

                  <button className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full font-semibold hover:bg-white/30 transition-all">
                    Explore {mood.title} Collection
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}