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
      description: "Premium root extract for stress relief and enhanced vitality",
      price: "$29.99",
      originalPrice: "$39.99",
      rating: 4.8,
      reviews: 324,
      image1: "https://images.unsplash.com/photo-1585435557343-3b092031d1df?w=400&h=400&fit=crop&crop=center",
      image2: "https://images.unsplash.com/photo-1471193945509-9ad0617afabf?w=400&h=400&fit=crop&crop=center",
      color: "from-green-100 to-emerald-100",
      textColor: "text-green-800",
      badgeColor: "bg-green-100 text-green-800"
    },
    {
      id: 2,
      name: "Brahmi Memory Blend",
      sanskrit: "ब्राह्मी",
      description: "Ancient formula for cognitive enhancement and mental clarity",
      price: "$34.99",
      originalPrice: "$44.99",
      rating: 4.9,
      reviews: 256,
      image1: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=400&h=400&fit=crop&crop=center",
      image2: "https://images.unsplash.com/photo-1573056477491-b75d5faa3b0e?w=400&h=400&fit=crop&crop=center",
      color: "from-blue-100 to-indigo-100",
      textColor: "text-blue-800",
      badgeColor: "bg-blue-100 text-blue-800"
    },
    {
      id: 3,
      name: "Tulsi Holy Basil Tea",
      sanskrit: "तुलसी",
      description: "Sacred tea blend for immunity boost and inner peace",
      price: "$19.99",
      originalPrice: "$24.99",
      rating: 4.7,
      reviews: 189,
      image1: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=400&fit=crop&crop=center",
      image2: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop&crop=center",
      color: "from-purple-100 to-violet-100",
      textColor: "text-purple-800",
      badgeColor: "bg-purple-100 text-purple-800"
    },
    {
      id: 4,
      name: "Neem Purifying Capsules",
      sanskrit: "नीम",
      description: "Natural detox and skin purification from nature's pharmacy",
      price: "$24.99",
      originalPrice: "$32.99",
      rating: 4.6,
      reviews: 143,
      image1: "https://images.unsplash.com/photo-1550572017-edd951aa8ab6?w=400&h=400&fit=crop&crop=center",
      image2: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop&crop=center",
      color: "from-emerald-100 to-teal-100",
      textColor: "text-emerald-800",
      badgeColor: "bg-emerald-100 text-emerald-800"
    }
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-gradient-to-br from-amber-25 via-orange-25 via-yellow-25 to-amber-50 overflow-hidden"
    >
      {/* Gentle Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-1/4 right-1/4 w-1 h-1 bg-amber-300 rounded-full opacity-40"
          style={{ 
            transform: `translateY(${Math.sin(scrollProgress * Math.PI) * 20}px)`,
            transition: 'transform 0.1s ease-out'
          }}
        ></div>
        <div 
          className="absolute bottom-1/3 left-1/5 w-1.5 h-1.5 bg-yellow-300 rounded-full opacity-30"
          style={{ 
            transform: `translateY(${Math.cos(scrollProgress * Math.PI) * 15}px)`,
            transition: 'transform 0.1s ease-out'
          }}
        ></div>
        <div 
          className="absolute top-1/2 left-3/4 w-1 h-1 bg-orange-300 rounded-full opacity-35"
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
            <div className="w-12 h-px bg-amber-400 mx-auto mb-4"></div>
            <span className="text-amber-600 font-light text-sm uppercase tracking-wide">Premium Collection</span>
          </div>
          
          <h2
            ref={(el) => addToRefs(el, 200)}
            className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-700 mb-6 leading-relaxed opacity-0 translate-y-4 transition-all duration-1000"
          >
            Our{' '}
            <span className="font-normal text-amber-600">Ancient Remedies</span>
          </h2>
          
          <p
            ref={(el) => addToRefs(el, 400)}
            className="text-lg md:text-xl text-gray-500 font-light max-w-2xl mx-auto leading-relaxed opacity-0 translate-y-4 transition-all duration-1000"
          >
            Timeless formulations crafted with sacred herbs from the Himalayas
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <div
              key={product.id}
              ref={(el) => addToRefs(el, 600 + index * 200)}
              className="opacity-0 translate-y-6 transition-all duration-1000 group"
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-6 border border-amber-100/50 shadow-lg hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-2">
                {/* Product Image */}
                <div className="relative mb-6 overflow-hidden rounded-2xl bg-gradient-to-br from-gray-100 to-gray-50">
                  <div className="aspect-square relative">
                    <img
                      src={product.image1}
                      alt={product.name}
                      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                        hoveredProduct === product.id ? 'opacity-0' : 'opacity-100'
                      }`}
                    />
                    <img
                      src={product.image2}
                      alt={`${product.name} alternate`}
                      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                        hoveredProduct === product.id ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                    
                    {/* Sanskrit Badge */}
                    <div className="absolute top-3 left-3">
                      <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                        <span className="text-amber-600 font-medium text-sm">{product.sanskrit}</span>
                      </div>
                    </div>

                    {/* Discount Badge */}
                    <div className="absolute top-3 right-3">
                      <div className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        SAVE 25%
                      </div>
                    </div>
                  </div>
                </div>

                {/* Product Info */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-medium text-gray-800 mb-2 group-hover:text-amber-700 transition-colors duration-300">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
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
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-semibold text-gray-800">{product.price}</span>
                    <span className="text-lg text-gray-400 line-through">{product.originalPrice}</span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4">
                    <button className="flex-1 bg-amber-500 hover:bg-amber-600 text-white py-3 px-4 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 group-hover:shadow-lg">
                      <ShoppingCart className="w-4 h-4" />
                      Add to Cart
                    </button>
                    <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center">
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Products CTA */}
        <div className="text-center mt-16">
          <div
            ref={(el) => addToRefs(el, 1400)}
            className="opacity-0 translate-y-4 transition-all duration-1000"
          >
            <button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-4 rounded-2xl font-medium text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              Explore All Remedies
            </button>
            <p className="text-gray-500 text-sm mt-4 font-light">
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
        
        /* Custom ultra-light background colors */
        .bg-amber-25 { background-color: rgb(254, 252, 246); }
        .bg-orange-25 { background-color: rgb(255, 253, 249); }
        .bg-yellow-25 { background-color: rgb(254, 253, 246); }
        .bg-green-25 { background-color: rgb(247, 254, 231); }
        
        /* Premium shadow */
        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.15);
        }
        
        /* Line clamp utility */
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default AyurvedaProductsSection;