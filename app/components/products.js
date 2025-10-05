'use client';
import { useEffect, useRef, useState } from 'react';
import { ShoppingCart, Eye, Star } from 'lucide-react';

const AyurvedaProductsSection = () => {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hoveredProduct, setHoveredProduct] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = rect.height;
      const viewportHeight = window.innerHeight;
      const progress = Math.max(0, Math.min(1, (viewportHeight - rect.top) / (sectionHeight + viewportHeight)));
      setScrollProgress(progress);
    };

    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('fade-in');
          }, parseInt(entry.target.dataset.delay) || 0);
        }
      });
    }, observerOptions);

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const addToRefs = (el, delay = 0) => {
    if (el && !cardRefs.current.includes(el)) {
      el.dataset.delay = delay;
      cardRefs.current.push(el);
    }
  };

  const products = [
    {
      id: 1,
      name: "Ashwagandha Root Extract",
      sanskrit: "अश्वगंधा",
      description: "Premium root extract for stress relief and enhanced vitality. Sourced from organic farms in the Himalayas, this potent formula helps restore balance to mind and body.",
      price: "$29.99",
      rating: 4.8,
      reviews: 324,
      image1: "/Gemini_Generated_Image_1s4p3o1s4p3o1s4p.png",
      image2: "Gemini_Generated_Image_q407ccq407ccq407.png"
    },
    {
      id: 2,
      name: "Brahmi Memory Blend",
      sanskrit: "ब्राह्मी",
      description: "Ancient formula for cognitive enhancement and mental clarity. This time-tested blend supports memory, focus, and overall brain health using traditional Ayurvedic principles.",
      price: "$34.99",
      rating: 4.9,
      reviews: 256,
      image1: "Gemini_Generated_Image_5bbf4k5bbf4k5bbf.png",
      image2: "Gemini_Generated_Image_7fyj6a7fyj6a7fyj.png"
    },
    {
      id: 3,
      name: "Tulsi Holy Basil Tea",
      sanskrit: "तुलसी",
      description: "Sacred tea blend for immunity boost and inner peace. Revered as the Queen of Herbs, this pure Tulsi blend promotes wellness, reduces stress, and supports natural immunity.",
      price: "$19.99",
      rating: 4.7,
      reviews: 189,
      image1: "/Gemini_Generated_Image_uwwxe8uwwxe8uwwx.png",
      image2: "AH_Diwali Basket.png"
    }
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-32 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-100 overflow-hidden"
    >
      {/* Gentle Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-1/4 right-1/4 w-1 h-1 bg-yellow-400 rounded-full opacity-40"
          style={{ 
            transform: `translateY(${Math.sin(scrollProgress * Math.PI) * 20}px)`,
            transition: 'transform 0.1s ease-out'
          }}
        ></div>
        <div 
          className="absolute bottom-1/3 left-1/5 w-1.5 h-1.5 bg-amber-400 rounded-full opacity-30"
          style={{ 
            transform: `translateY(${Math.cos(scrollProgress * Math.PI) * 15}px)`,
            transition: 'transform 0.1s ease-out'
          }}
        ></div>
        <div 
          className="absolute top-1/2 left-3/4 w-1 h-1 bg-orange-400 rounded-full opacity-35"
          style={{ 
            transform: `translateX(${Math.sin(scrollProgress * Math.PI * 1.5) * 25}px)`,
            transition: 'transform 0.1s ease-out'
          }}
        ></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div 
            ref={(el) => addToRefs(el, 0)}
            className="inline-block mb-8 opacity-0 translate-y-4 transition-all duration-1000"
          >
            <div className="w-16 h-px bg-yellow-600 mx-auto mb-4"></div>
            <span className="text-yellow-700 font-medium text-sm uppercase tracking-wider">Premium Collection</span>
          </div>
          
          <h2
            ref={(el) => addToRefs(el, 200)}
            className="text-4xl md:text-5xl lg:text-6xl font-serif text-gray-900 mb-6 leading-tight opacity-0 translate-y-4 transition-all duration-1000"
          >
            Our{' '}
            <span className="font-semibold text-yellow-700">Ancient Remedies</span>
          </h2>
          
          <p
            ref={(el) => addToRefs(el, 400)}
            className="text-lg md:text-xl text-gray-600 font-sans max-w-3xl mx-auto leading-relaxed opacity-0 translate-y-4 transition-all duration-1000"
          >
            Timeless formulations crafted with sacred herbs from the Himalayas, designed to restore balance and vitality.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {products.map((product, index) => (
            <div
              key={product.id}
              ref={(el) => addToRefs(el, 600 + index * 200)}
              className="opacity-0 translate-y-6 transition-all duration-1000 group"
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <div className="bg-white rounded-xl p-8 border border-yellow-100/30 shadow-md hover:shadow-xl transition-all duration-500 group-hover:-translate-y-2">
                {/* Product Image */}
                <div className="relative mb-6 overflow-hidden rounded-lg bg-gradient-to-br from-yellow-50 to-amber-50">
                  <div className="aspect-[4/3] relative">
                    <img
                      src={product.image1}
                      alt={product.name}
                      className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out ${
                        hoveredProduct === product.id ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
                      }`}
                    />
                    <img
                      src={product.image2}
                      alt={`${product.name} alternate`}
                      className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out ${
                        hoveredProduct === product.id ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                      }`}
                    />
                    
                    {/* Sanskrit Badge */}
                    <div className="absolute top-4 left-4">
                      <div className="bg-white/95 px-3 py-1.5 rounded-full shadow-md border border-yellow-200/50">
                        <span className="text-yellow-700 font-serif text-sm font-medium">{product.sanskrit}</span>
                      </div>
                    </div>

                    {/* Hover Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-t from-yellow-900/20 via-transparent to-transparent transition-opacity duration-700 ease-in-out ${
                      hoveredProduct === product.id ? 'opacity-100' : 'opacity-0'
                    }`} />
                  </div>
                </div>

                {/* Product Info */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-serif text-gray-900 mb-2 group-hover:text-yellow-700 transition-colors duration-300">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed font-sans line-clamp-3">
                      {product.description}
                    </p>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating)
                              ? 'text-yellow-500 fill-current'
                              : 'text-gray-200'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500 font-medium">
                      {product.rating} ({product.reviews} reviews)
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-semibold text-gray-900">{product.price}</span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-3">
                    <button className="flex-1 bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-white py-3 px-4 rounded-none font-medium text-sm transition-all duration-300 flex items-center justify-center gap-2 group-hover:shadow-lg border-0">
                      <ShoppingCart className="w-4 h-4" />
                      Add to Cart
                    </button>
                    <button className="flex-1 bg-amber-100 hover:bg-amber-200 text-amber-800 py-3 px-4 rounded-none transition-all duration-300 flex items-center justify-center gap-2 font-medium text-sm border border-amber-200 hover:border-amber-300">
                      <Eye className="w-4 h-4" />
                      View Product
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Products CTA */}
        <div className="text-center mt-20">
          <div
            ref={(el) => addToRefs(el, 1400)}
            className="opacity-0 translate-y-4 transition-all duration-1000"
          >
            <button className="bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-700 hover:to-amber-700 text-white px-8 py-4 rounded-none font-medium text-base transition-all duration-300 shadow-lg hover:shadow-xl border-0">
              Explore All Remedies
            </button>
            <p className="text-gray-600 text-sm mt-4 font-sans">
              Free shipping on orders over $50 • 30-day money back guarantee
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .fade-in {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default AyurvedaProductsSection;