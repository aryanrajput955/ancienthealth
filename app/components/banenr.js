'use client';
import { useState, useEffect } from 'react';

const BannerSection = () => {
  const [currentTheme, setCurrentTheme] = useState(0);

  const themes = [
    {
      id: 1,
      leftImage: 'AH_Diwali Basket(1).png',
      rightImage: '/Gemini_Generated_Image_k4f47rk4f47rk4f4 (1).png',
      title: 'This Diwali, Choose Wellness',
      subtitle: 'Celebrate the festival of lights with gifts that nourish body and soul. Timeless Ayurvedic remedies for true vitality.',
      cta: 'Shop Diwali Collection'
    },
    {
      id: 2,
      leftImage: '/Gemini_Generated_Image_uwwxe8uwwxe8uwwx.png',
      rightImage: 'AH_Diwali Basket(1).png',
      title: 'Pure Himalayan Harmony',
      subtitle: 'Sustainably sourced herbs from the sacred mountains, restoring balance to your modern life.',
      cta: 'Discover More'
    },
    {
      id: 3,
      leftImage: '/Gemini_Generated_Image_k4f47rk4f47rk4f4 (1).png',
      rightImage: '/Gemini_Generated_Image_uwwxe8uwwxe8uwwx.png',
      title: 'Embrace Sacred Traditions',
      subtitle: 'Elevate your rituals with ancient wisdom, fostering inner peace and radiant health.',
      cta: 'Explore Rituals'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTheme((prevTheme) => (prevTheme + 1) % themes.length);
    }, 5000); // Auto-change every 5 seconds

    return () => clearInterval(interval);
  }, [themes.length]);

  const current = themes[currentTheme];

  return (
    <section className="relative h-[70vh] overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-100">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-32 h-32 bg-yellow-600 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-orange-600 rounded-full blur-3xl"></div>
      </div>

      {/* Left Image */}
      <div className="absolute left-0 top-0 w-1/3 h-full">
        <img
          src={current.leftImage}
          alt="Left banner"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Image */}
      <div className="absolute right-0 top-0 w-1/3 h-full">
        <img
          src={current.rightImage}
          alt="Right banner"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Center Text Overlay */}
      <div className="absolute inset-0 flex items-center justify-center px-6 z-10">
        <div className="w-full max-w-4xl mx-auto text-center space-y-6 bg-white/20 backdrop-blur-sm rounded-2xl p-8 border border-yellow-300/50">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-gray-800 leading-tight"
              style={{ fontFamily: 'var(--font-heading)' }}>
            {current.title}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
             style={{ fontFamily: 'var(--font-body)' }}>
            {current.subtitle}
          </p>
          <button className="bg-gradient-to-r from-yellow-700 to-amber-600 hover:from-yellow-800 hover:to-amber-700 text-white px-8 py-4 rounded-full font-medium text-lg transition-all duration-300 shadow-lg hover:shadow-xl border border-yellow-300/50">
            {current.cta}
          </button>
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {themes.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentTheme(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentTheme ? 'bg-yellow-700 scale-125' : 'bg-yellow-700/50 hover:bg-yellow-700'
            }`}
            aria-label={`Go to theme ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default BannerSection;