'use client'
import { useEffect, useRef } from 'react'
import { MessageCircle } from 'lucide-react'
import Image from 'next/image'

export default function DryFruitsMixPage() {
  const sectionRefs = useRef([])

  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px 0px -100px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('fade-in')
          }, parseInt(entry.target.dataset.delay) || 0)
        }
      })
    }, observerOptions)

    sectionRefs.current.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  const addToRefs = (el, delay = 0) => {
    if (el && !sectionRefs.current.includes(el)) {
      el.dataset.delay = delay
      sectionRefs.current.push(el)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-100">
      {/* Product Overview Section */}
      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div 
              ref={(el) => addToRefs(el, 200)}
              className="opacity-0 translate-y-6 transition-all duration-500 ease-in-out"
            >
              <div className="relative max-w-sm h-[27rem] rounded-none overflow-hidden bg-gradient-to-br from-yellow-50 to-amber-50 shadow-lg mx-auto hover:scale-105 transition-transform duration-300">
                <Image
                  src="/a7.jpg"
                  alt="Organic Dry Fruits Mix"
                  layout="responsive"
                  width={384}
                  height={256}
                  sizes="(max-width: 640px) 100vw, 384px"
                  placeholder="blur"
                  blurDataURL="/dry-fruits-mix-placeholder.png"
                  className="object-cover"
                />
              </div>
            </div>
            <div 
              ref={(el) => addToRefs(el, 400)}
              className="opacity-0 translate-y-6 transition-all duration-500 ease-in-out"
            >
              <div className="border-t-2 border-yellow-700 w-16 mb-6"></div>
              <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6">Organic Dry Fruits Mix</h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Our Organic Dry Fruits Mix combines premium cashews, almonds, pistachios, and walnuts, sourced from certified organic farms. Packed with natural goodness, this mix offers a wholesome, nutrient-rich snack for any time of day.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="https://wa.me/+916397723250" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-[#1d625a] text-white px-8 py-3 rounded-none hover:bg-[#174b45] transition-colors duration-300 flex items-center justify-center gap-2 font-medium shadow-md"
                  aria-label="Contact via WhatsApp to buy"
                >
                  <MessageCircle className="w-5 h-5" />
                  Contact to Buy
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 md:py-16 bg-white/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6">
          <div 
            ref={(el) => addToRefs(el, 200)}
            className="text-center mb-10 opacity-0 translate-y-4 transition-all duration-500 ease-in-out"
          >
            <div className="border-t-2 border-yellow-700 w-20 mx-auto mb-6"></div>
            <h2 className="text-2xl font-serif text-gray-900 mb-4">Benefits of Our Dry Fruits Mix</h2>
            <p className="text-gray-600 text-base max-w-xl mx-auto">
              Enjoy the natural, organic benefits of our carefully selected dry fruits mix.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Heart Health", description: "Rich in healthy fats to support cardiovascular wellness." },
              { title: "Energy Boost", description: "Natural sugars and proteins for sustained energy." },
              { title: "Antioxidant-Rich", description: "Packed with antioxidants to promote overall health." }
            ].map((benefit, index) => (
              <div 
                key={index}
                ref={(el) => addToRefs(el, 400 + index * 100)}
                className="opacity-0 translate-y-6 transition-all duration-500 ease-in-out"
              >
                <div className="p-6 bg-gradient-to-b from-white to-yellow-50 rounded-none shadow-md border border-yellow-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <div className="h-10 w-full bg-[url('/leaf-accent.png')] bg-center bg-no-repeat bg-contain mb-4"></div>
                  <h3 className="text-xl font-serif font-semibold text-gray-900 mb-3">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Qualities Section */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-amber-50 to-yellow-100/80">
        <div className="max-w-6xl mx-auto px-6">
          <div 
            ref={(el) => addToRefs(el, 200)}
            className="text-center mb-10 opacity-0 translate-y-4 transition-all duration-500 ease-in-out"
          >
            <h2 className="text-2xl font-serif text-gray-900 mb-4">Qualities of Our Dry Fruits Mix</h2>
            <p className="text-gray-600 text-base max-w-xl mx-auto">
              Discover the organic excellence of our dry fruits mix.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { 
                title: "Certified Organic", 
                description: "Sourced from organic farms, free from pesticides.", 
                icon: "/organic.png", 
                iconAlt: "Organic Icon" 
              },
              { 
                title: "Nutrient-Rich", 
                description: "High in vitamins, minerals, and healthy fats.", 
                icon: "/nutri.png", 
                iconAlt: "Nutrient Icon" 
              },
              { 
                title: "No Additives", 
                description: "Pure, natural mix with no preservatives or sugars.", 
                icon: "/no-additives.png", 
                iconAlt: "No Additives Icon" 
              }
            ].map((quality, index) => (
              <div 
                key={index}
                ref={(el) => addToRefs(el, 400 + index * 100)}
                className="opacity-0 translate-y-6 transition-all duration-500 ease-in-out"
              >
                <div className="p-6 bg-[#fef8e8] bg-[url('/nut-overlay.png')] bg-center bg-no-repeat bg-contain rounded-md shadow-md border border-yellow-200 hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                  <div className="border-t-2 border-yellow-700 w-10 mb-4"></div>
                  <div className="h-10 w-10 mx-auto mb-4 bg-yellow-100 rounded-full p-2">
                    <Image
                      src={quality.icon}
                      alt={quality.iconAlt}
                      width={24}
                      height={24}
                      className="object-contain"
                    />
                  </div>
                  <h3 className="text-lg font-serif font-semibold text-gray-900 mb-3">{quality.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{quality.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 text-center">
        <div 
          ref={(el) => addToRefs(el, 200)}
          className="opacity-0 translate-y-4 transition-all duration-500 ease-in-out"
        >
          <h2 className="text-2xl font-serif text-gray-900 mb-4">Pure Organic Goodness</h2>
          <p className="text-gray-600 text-base max-w-xl mx-auto mb-6">
            Experience the natural taste of our Organic Dry Fruits Mix today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://wa.me/+916397723250" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-[#1d625a] text-white px-8 py-3 rounded-none hover:bg-[#174b45] transition-colors duration-300 flex items-center justify-center gap-2 font-medium shadow-lg"
              aria-label="Contact via WhatsApp to buy"
            >
              <MessageCircle className="w-5 h-5" />
              Contact to Buy
            </a>
          </div>
        </div>
      </section>

      <style jsx>{`
        .fade-in {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
        @keyframes float {
          0% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0); }
        }
        .animate-float {
          animation: float 5s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}