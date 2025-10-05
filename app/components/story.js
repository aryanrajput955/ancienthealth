'use client';
import React, { useState, useEffect } from 'react';

const AyurvedicHero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-100">
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-32 h-32 bg-yellow-600 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-orange-600 rounded-full blur-3xl"></div>
      </div>
      
      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <div className="max-w-7xl mx-auto w-full">
          
          {/* New Heading */}
          <div className="text-center mb-12">
            <h1
              className="text-4xl md:text-5xl font-medium text-gray-800"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Rooted in Ancient India
            </h1>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Side Content */}
            <div className="lg:col-span-4 space-y-8 text-right">
              
              <div className={`transition-all duration-1000 ${isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}`}>
                <div className="space-y-6">
                  <div className="inline-flex items-center space-x-2 justify-end">
                    <span className="text-yellow-700 font-medium text-sm">Ancient Wisdom</span>
                    <div className="w-8 h-[1px] bg-yellow-700"></div>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-800" 
                      style={{ fontFamily: 'var(--font-heading)' }}>
                    Traditional
                    <br />
                    <span className="text-yellow-700">Ayurvedic</span>
                    <br />
                    Medicine
                  </h2>
                  <p className="text-gray-600 leading-relaxed"
                     style={{ fontFamily: 'var(--font-body)' }}>
                    Experience the healing power of nature with our authentic Ayurvedic formulations, crafted using time-honored recipes.
                  </p>
                </div>
              </div>

              <div className={`transition-all duration-1000 delay-300 ${isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}`}>
                <div className="flex items-center justify-end space-x-3">
                  <span className="text-sm text-gray-600">Pure & Natural</span>
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                </div>
              </div>

            </div>

            {/* Center Image */}
            <div className="lg:col-span-4 flex justify-center">
              <div className={`transition-all duration-1500 delay-500 ${isLoaded ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
                <div className="relative">
                  
                  {/* Main Circular Frame */}
                  <div className="relative w-80 h-80 md:w-96 md:h-96">
                    
                    {/* Outer Ring */}
                    <div className="absolute inset-0 rounded-full border-2 border-yellow-300 animate-pulse" style={{ animationDuration: '3s' }}></div>
                    
                    {/* Inner Ring */}
                    <div className="absolute inset-4 rounded-full border border-amber-300/50"></div>
                    
                    {/* Image Container */}
                    <div className="absolute inset-8 rounded-full overflow-hidden shadow-2xl bg-gradient-to-br from-amber-50 to-orange-50">
                      <img 
                        src="/Gemini_Generated_Image_k4f47rk4f47rk4f4 (1).png"
                        alt="Premium Ayurvedic Herbs"
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                      />
                    </div>

                    {/* Floating Elements */}
                    <div className="absolute -top-4 left-8 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center">
                      <img 
                        src="Gemini_Generated_Image_k4f47rk4f47rk4f4 (1).png"
                        alt=""
                        className="w-6 h-6 object-cover rounded-full"
                      />
                    </div>

                    <div className="absolute -bottom-2 right-8 w-16 h-16 bg-amber-50 rounded-full shadow-lg flex items-center justify-center border border-yellow-200">
                      <img 
                        src="Gemini_Generated_Image_k4f47rk4f47rk4f4 (1).png"
                        alt=""
                        className="w-8 h-8 object-cover rounded-full"
                      />
                    </div>

                    <div className="absolute top-16 -right-6 w-14 h-14 bg-white rounded-full shadow-lg flex items-center justify-center">
                      <img 
                        src="/Gemini_Generated_Image_k4f47rk4f47rk4f4 (1).png"
                        alt=""
                        className="w-7 h-7 object-cover rounded-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side Content */}
            <div className="lg:col-span-4 space-y-8">
              
              <div className={`transition-all duration-1000 delay-200 ${isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'}`}>
                <div className="space-y-6">
                  <div className="inline-flex items-center space-x-2">
                    <div className="w-8 h-[1px] bg-yellow-700"></div>
                    <span className="text-yellow-700 font-medium text-sm">Modern Science</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-800" 
                      style={{ fontFamily: 'var(--font-heading)' }}>
                    Premium
                    <br />
                    <span className="text-yellow-700">Quality</span>
                    <br />
                    Standards
                  </h2>
                  <p className="text-gray-600 leading-relaxed"
                     style={{ fontFamily: 'var(--font-body)' }}>
                    Every product undergoes rigorous quality testing to ensure purity, potency, and safety for modern wellness needs.
                  </p>
                </div>
              </div>

              <div className={`transition-all duration-1000 delay-400 ${isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'}`}>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Lab Tested</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Minimal Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
        <div className={`transition-all duration-1500 delay-1300 ${isLoaded ? 'opacity-30' : 'opacity-0'}`}>
          <div className="w-5 h-8 border-2 border-yellow-700 rounded-full flex justify-center">
            <div className="w-0.5 h-2 bg-yellow-700 rounded-full mt-1.5 animate-bounce"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AyurvedicHero;