'use client'
import { useEffect, useRef } from 'react'
import { MessageCircle } from 'lucide-react'
import Image from 'next/image'

export default function ManduaBitesPage() {
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
                  src="/a6.jpg"
                  alt="Mandua Bites"
                  layout="responsive"
                  width={448}
                  height={320}
                  sizes="(max-width: 640px) 100vw, 448px"
                  placeholder="blur"
                  blurDataURL="/mandua-bites-placeholder.png"
                  className="object-cover"
                />
              </div>
            </div>
            <div 
              ref={(el) => addToRefs(el, 400)}
              className="opacity-0 translate-y-6 transition-all duration-500 ease-in-out"
            >
              <div className="border-t-2 border-yellow-700 w-16 mb-6"></div>
              <h2 className="text-4xl font-serif font-bold text-gray-900 mb-6">About Our Mandua Bites</h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Crafted from organic finger millet grown in the Himalayan foothills, our Mandua Bites are wholesome, gluten-free biscuits. Naturally rich in calcium and nutrients, these delicious bites offer sustained energy and digestive support, rooted in Ayurvedic traditions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="https://wa.me/+916397723250" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-[#1d625a] text-white px-8 py-4 rounded-none hover:bg-[#174b45] transition-colors duration-300 flex items-center justify-center gap-2 font-medium shadow-md"
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
      <section className="py-16 md:py-24 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div 
            ref={(el) => addToRefs(el, 200)}
            className="text-center mb-12 opacity-0 translate-y-4 transition-all duration-500 ease-in-out"
          >
            <div className="border-t-2 border-yellow-700 w-24 mx-auto mb-6"></div>
            <h2 className="text-3xl font-serif text-gray-900 mb-4">Benefits of Mandua Bites</h2>
            <p className="text-gray-600 text-base max-w-2xl mx-auto">
              Experience the wholesome and nourishing properties of Mandua Bites, inspired by Ayurveda.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Sustained Energy", description: "Provides long-lasting energy from nutrient-rich finger millet." },
              { title: "Gluten-Free Nutrition", description: "Naturally gluten-free, ideal for dietary sensitivities." },
              { title: "Supports Bone Health", description: "Rich in calcium to promote strong bones and overall wellness." }
            ].map((benefit, index) => (
              <div 
                key={index}
                ref={(el) => addToRefs(el, 400 + index * 100)}
                className="opacity-0 translate-y-6 transition-all duration-500 ease-in-out"
              >
                <div className="p-8 bg-gradient-to-b from-white to-yellow-50 rounded-none shadow-md border border-yellow-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <div className="h-12 w-full bg-[url('/leaf-accent.png')] bg-center bg-no-repeat bg-contain mb-4"></div>
                  <h3 className="text-2xl font-serif font-semibold text-gray-900 mb-3">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{benefit.description}</p>
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
            <h2 className="text-4xl font-serif text-gray-900 mb-4">Ayurvedic Properties</h2>
            <div className="h-8 w-32 bg-[url('/flourish.png')] bg-center bg-no-repeat bg-contain mx-auto mb-4"></div>
            <p className="text-gray-600 text-base max-w-2xl mx-auto">
              Mandua Bites balance the body and mind, inspired by Ayurvedic wisdom.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                title: "Rasa (Taste)", 
                sanskrit: "मधुर, कषाय", 
                description: "Sweet (Madhura) and astringent (Kashaya) tastes, nourishing and grounding." 
              },
              { 
                title: "Guna (Qualities)", 
                sanskrit: "गुरु, स्निग्ध", 
                description: "Heavy (Guru) and unctuous (Snigdha), promoting strength and stability." 
              },
              { 
                title: "Dosha Effect", 
                sanskrit: "वातपित्तहर", 
                description: "Balances Vata and Pitta doshas, grounding and nourishing." 
              }
            ].map((property, index) => (
              <div 
                key={index}
                ref={(el) => addToRefs(el, 400 + index * 100)}
                className="opacity-0 translate-y-6 transition-all duration-500 ease-in-out"
              >
                <div className="p-8 bg-[url('/parchment-texture.png')] bg-cover rounded-sm shadow-xl border border-gray-200 hover:scale-105 transition-transform duration-300 text-center">
                  <p className="text-yellow-800 font-serif text-lg font-semibold mb-3">{property.sanskrit}</p>
                  <div className="border-b-2 border-yellow-700 w-16 mx-auto mb-4"></div>
                  <h3 className="text-xl font-serif font-semibold text-gray-900 mb-3">{property.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{property.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Qualities of Mandua Bites Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-amber-50 to-yellow-100/80">
        <div className="max-w-7xl mx-auto px-6">
          <div 
            ref={(el) => addToRefs(el, 200)}
            className="text-center mb-12 opacity-0 translate-y-4 transition-all duration-500 ease-in-out"
          >
            <h2 className="text-3xl font-serif text-gray-900 mb-4">Qualities of Mandua Bites</h2>
            <p className="text-gray-600 text-base max-w-2xl mx-auto">
              Explore the natural health benefits of our Mandua Bites, crafted for nourishment.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                title: "Rich in Calcium", 
                description: "High calcium content supports bone and muscle health.",
                icon: "/bone.png",
                iconAlt: "Calcium Icon"
              },
              { 
                title: "Gluten-Free", 
                description: "Safe for gluten-sensitive diets, made from pure finger millet.",
                icon: "/gluten-free.png",
                iconAlt: "Gluten-Free Icon"
              },
              { 
                title: "Sugar-Free", 
                description: "No added sugars, perfect for a healthy, balanced diet.",
                icon: "/sugar.png",
                iconAlt: "Sugar-Free Icon"
              }
            ].map((quality, index) => (
              <div 
                key={index}
                ref={(el) => addToRefs(el, 400 + index * 100)}
                className="opacity-0 translate-y-6 transition-all duration-500 ease-in-out"
              >
                <div className="p-8 bg-[#fef8e8] bg-[url('/millet-overlay.png')] bg-center bg-no-repeat bg-contain rounded-md shadow-md border border-yellow-200 hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                  <div className="border-t-2 border-yellow-700 w-12 mb-4"></div>
                  <div className="h-12 w-12 mx-auto mb-4 bg-yellow-100 rounded-full p-2">
                    <Image
                      src={quality.icon}
                      alt={quality.iconAlt}
                      width={32}
                      height={32}
                      className="object-contain"
                    />
                  </div>
                  <h3 className="text-xl font-serif font-semibold text-gray-900 mb-3">{quality.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{quality.description}</p>
                </div>
              </div>
            ))}
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
            <h2 className="text-3xl font-serif text-gray-900 mb-4">How to Enjoy Mandua Bites</h2>
            <p className="text-gray-600 text-base max-w-2xl mx-auto">
              Enjoy these wholesome bites with these simple, nutritious methods.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                tip: "Morning Snack", 
                description: "Pair with milk or tea for a nutritious start to your day.", 
                image: "/breakfast.png" 
              },
              { 
                tip: "On-the-Go Energy", 
                description: "Pack as a wholesome snack for sustained energy during travel.", 
                image: "/energy.png" 
              },
              { 
                tip: "Post-Meal Treat", 
                description: "Enjoy after meals to support digestion and satisfy cravings.", 
                image: "/postmeal.png" 
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
          <h2 className="text-3xl font-serif text-gray-900 mb-4">Embrace Ayurvedic Nutrition</h2>
          <p className="text-gray-600 text-base max-w-2xl mx-auto mb-8">
            Discover the wholesome goodness of our Mandua Bites today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://wa.me/+916397723250" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-[#1d625a] text-white px-8 py-4 rounded-none hover:bg-[#174b45] transition-colors duration-300 flex items-center justify-center gap-2 font-medium shadow-lg"
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