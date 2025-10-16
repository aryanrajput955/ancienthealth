
'use client'
import { useEffect, useRef } from 'react'
import { ShoppingCart, MessageCircle } from 'lucide-react'
import Image from 'next/image'

export default function HoneyProductPage() {
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
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div 
              ref={(el) => addToRefs(el, 200)}
              className="opacity-0 translate-y-6 transition-all duration-500 ease-in-out"
            >
              <div className="relative max-w-md h-[27rem] rounded-none overflow-hidden bg-gradient-to-br from-yellow-50 to-amber-50 shadow-lg mx-auto hover:scale-105 transition-transform duration-300">
                <Image
                  src="/honey.png"
                  alt="Pure Golden Honey"
                  layout="responsive"
                  width={448}
                  height={320}
                  sizes="(max-width: 640px) 100vw, 448px"
                  placeholder="blur"
                  blurDataURL="/honey-placeholder.png"
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 bg-white/95 px-3 py-1.5 rounded-none shadow-md border border-yellow-200/50">
                  <span className="text-yellow-700 font-serif text-sm font-medium">मधु</span>
                </div>
              </div>
            </div>
            <div 
              ref={(el) => addToRefs(el, 400)}
              className="opacity-0 translate-y-6 transition-all duration-500 ease-in-out"
            >
              <div className="border-t-2 border-yellow-700 w-16 mb-6"></div>
              <h2 className="text-4xl font-serif font-bold text-gray-900 mb-6">About Our Honey</h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Harvested from organic wildflower sources in the Himalayan foothills, our Pure Golden Honey is a testament to nature’s finest offerings. Unprocessed and free from additives, it retains its natural enzymes, antioxidants, and healing properties, rooted in ancient Ayurvedic traditions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                {/* <button className="bg-[#1d625a] text-white px-8 py-4 rounded-none hover:bg-[#174b45] transition-colors duration-300 flex items-center justify-center gap-2 font-medium shadow-md">
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </button> */}
                <a 
                  href="https://wa.me/+916397723250" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-[#1d625a] text-white px-8 py-4 rounded-none hover:bg-[#174b45] transition-colors duration-300 flex items-center justify-center gap-2 font-medium shadow-md"
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
      <section className="py-16 md:py-24 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div 
            ref={(el) => addToRefs(el, 200)}
            className="text-center mb-12 opacity-0 translate-y-4 transition-all duration-500 ease-in-out"
          >
            <h2 className="text-3xl font-serif text-gray-900 mb-4">Benefits of Pure Golden Honey</h2>
            <p className="text-gray-600 text-base max-w-2xl mx-auto">
              Discover the timeless wellness properties of honey, revered in Ayurveda for its nourishing and healing qualities.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Immune Support", description: "Rich in antioxidants, honey strengthens immunity and protects against seasonal ailments." },
              { title: "Digestive Health", description: "Natural enzymes aid digestion, soothe the stomach, and promote gut wellness." },
              { title: "Energy Boost", description: "A natural source of carbohydrates, providing sustained energy without artificial sugars." }
            ].map((benefit, index) => (
              <div 
                key={index}
                ref={(el) => addToRefs(el, 400 + index * 100)}
                className="opacity-0 translate-y-6 transition-all duration-500 ease-in-out"
              >
                <div className="p-6 bg-white rounded-none shadow-md border border-yellow-100/30 hover:-translate-y-2 transition-transform duration-300">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ayurvedic Properties Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-[#1d625a]/5 to-yellow-50/50">
        <div className="max-w-7xl mx-auto px-6">
          <div 
            ref={(el) => addToRefs(el, 200)}
            className="text-center mb-12 opacity-0 translate-y-4 transition-all duration-500 ease-in-out"
          >
            <h2 className="text-3xl font-serif text-gray-900 mb-4">Ayurvedic Properties</h2>
            <p className="text-gray-600 text-base max-w-2xl mx-auto">
              Rooted in Ayurvedic wisdom, Pure Golden Honey offers unique properties that balance the body and mind.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                title: "Rasa (Taste)", 
                sanskrit: "मधुर", 
                description: "Sweet (Madhura) taste, which nourishes tissues and promotes satisfaction and harmony." 
              },
              { 
                title: "Guna (Qualities)", 
                sanskrit: "गुरु, स्निग्ध", 
                description: "Heavy (Guru) and unctuous (Snigdha), providing grounding and moisturizing effects." 
              },
              { 
                title: "Dosha Effect", 
                sanskrit: "कफवातहर", 
                description: "Balances Kapha and Vata doshas while pacifying Pitta when used in moderation." 
              }
            ].map((property, index) => (
              <div 
                key={index}
                ref={(el) => addToRefs(el, 400 + index * 100)}
                className="opacity-0 translate-y-6 transition-all duration-500 ease-in-out"
              >
                <div className="p-6 bg-white rounded-none shadow-md border border-yellow-100/30 hover:-translate-y-2 transition-transform duration-300">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{property.title}</h3>
                  <p className="text-yellow-700 font-serif text-sm mb-2">{property.sanskrit}</p>
                  <p className="text-gray-600 text-sm">{property.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nutritional Facts Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div 
            ref={(el) => addToRefs(el, 200)}
            className="text-center mb-12 opacity-0 translate-y-4 transition-all duration-500 ease-in-out"
          >
            <h2 className="text-3xl font-serif text-gray-900 mb-4">Nutritional Facts</h2>
            <p className="text-gray-600 text-base max-w-2xl mx-auto">
              Understand the wholesome composition of our Pure Golden Honey, crafted to deliver natural goodness.
            </p>
          </div>
          <div 
            ref={(el) => addToRefs(el, 400)}
            className="opacity-0 translate-y-6 transition-all duration-500 ease-in-out max-w-2xl mx-auto"
          >
            <div className="bg-white rounded-none p-8 border border-yellow-100/30 shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Per 1 Tablespoon (21g)</h3>
              <div className="space-y-3 text-gray-600 text-sm">
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <span>Calories</span>
                  <span>60 kcal</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <span>Total Fat</span>
                  <span>0g</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <span>Sodium</span>
                  <span>0mg</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <span>Total Carbohydrates</span>
                  <span>17g</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <span>Sugars</span>
                  <span>16g</span>
                </div>
                <div className="flex justify-between">
                  <span>Protein</span>
                  <span>0.1g</span>
                </div>
              </div>
              <p className="text-gray-500 text-xs mt-4 italic">*Values are approximate and based on standard nutritional analysis. No added sugars or preservatives.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Usage Tips Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-[#1d625a]/5 to-yellow-50/50">
        <div className="max-w-7xl mx-auto px-6">
          <div 
            ref={(el) => addToRefs(el, 200)}
            className="text-center mb-12 opacity-0 translate-y-4 transition-all duration-500 ease-in-out"
          >
            <h2 className="text-3xl font-serif text-gray-900 mb-4">How to Use Pure Golden Honey</h2>
            <p className="text-gray-600 text-base max-w-2xl mx-auto">
              Incorporate this ancient elixir into your daily routine with these simple, effective tips.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                tip: "Morning Tonic", 
                description: "Mix a tablespoon of honey with warm water and lemon for a refreshing, detoxifying start to your day.", 
                image: "/morning-tonic.png" 
              },
              { 
                tip: "Tea Sweetener", 
                description: "Add a teaspoon to herbal teas like Tulsi or chamomile to enhance flavor and health benefits.", 
                image: "/tea-sweetener.png" 
              },
              { 
                tip: "Skincare Mask", 
                description: "Combine with turmeric or yogurt for a natural face mask to hydrate and soothe skin.", 
                image: "/skincare.png" 
              }
            ].map((tip, index) => (
              <div 
                key={index}
                ref={(el) => addToRefs(el, 400 + index * 100)}
                className="opacity-0 translate-y-6 transition-all duration-500 ease-in-out"
              >
                <div className="p-8 bg-white rounded-none shadow-md border border-yellow-100/30 hover:scale-105 transition-transform duration-300">
                  <div className="h-1 w-16 bg-yellow-700 mx-auto mb-4"></div>
                  <div className="relative w-full h-32 mb-4">
                    <Image
                      src={tip.image}
                      alt={tip.tip}
                      layout="fill"
                      objectFit="cover"
                      sizes="(max-width: 768px) 100vw, 400px"
                      placeholder="blur"
                      blurDataURL={`${tip.image}?w=10&h=10`}
                      className="rounded-none border border-yellow-200/50"
                    />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-3">{tip.tip}</h3>
                  <p className="text-gray-600 text-sm">{tip.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 text-center">
        <div 
          ref={(el) => addToRefs(el, 200)}
          className="opacity-0 translate-y-4 transition-all duration-500 ease-in-out"
        >
          <h2 className="text-3xl font-serif text-gray-900 mb-4">Experience the Essence of Ayurveda</h2>
          <p className="text-gray-600 text-base max-w-2xl mx-auto mb-8">
            Bring home the natural purity of our Pure Golden Honey and elevate your wellness journey today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* <button className="bg-[#1d625a] text-white px-8 py-4 rounded-none hover:bg-[#174b45] transition-colors duration-300 font-medium shadow-lg">
              Shop Now
            </button> */}
            <a 
              href="https://wa.me/+916397723250" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-[#1d625a] text-white px-8 py-4 rounded-none hover:bg-[#174b45] transition-colors duration-300 flex items-center justify-center gap-2 font-medium shadow-lg"
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
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delay {
          animation: float 6s ease-in-out infinite 2s;
        }
      `}</style>
    </div>
  )
}