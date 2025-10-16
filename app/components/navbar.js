'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [touchStartX, setTouchStartX] = useState(null)
  const [touchEndX, setTouchEndX] = useState(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    const handleTouchStart = (e) => {
      setTouchStartX(e.changedTouches[0].screenX)
    }
    const handleTouchEnd = (e) => {
      setTouchEndX(e.changedTouches[0].screenX)
    }
    
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('touchstart', handleTouchStart)
    window.addEventListener('touchend', handleTouchEnd)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [])

  useEffect(() => {
    if (touchStartX !== null && touchEndX !== null) {
      const swipeDistance = touchEndX - touchStartX
      const minSwipeDistance = 100
      
      if (swipeDistance > minSwipeDistance) {
        setIsMobileMenuOpen(true)
      } else if (swipeDistance < -minSwipeDistance) {
        setIsMobileMenuOpen(false)
      }
      
      setTouchStartX(null)
      setTouchEndX(null)
    }
  }, [touchStartX, touchEndX])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <div>
      <Link href="#">
        <div className="fixed top-0 w-full bg-[#1d625a] text-white text-center py-2 overflow-hidden z-50">
          <div className="inline-block animate-marquee whitespace-nowrap text-sm md:text-base">
            Celebrate Diwali with Exclusive Wellness Hampers – Limited-Time Offer! &nbsp;&nbsp; | &nbsp;&nbsp; 
            Discover Premium Herbal Collections for a Healthier Festive Season &nbsp;&nbsp; | &nbsp;&nbsp; 
            Early Diwali Gift Hamper Offer – Shop Now and Save! &nbsp;&nbsp; | &nbsp;&nbsp; 
            Elevate Your Festivities with AncientHealth’s Finest Products
          </div>
        </div>
      </Link>
      <nav className={`fixed top-10 w-full z-40 transition-all duration-500 ${
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <div className="flex items-center space-x-2">
                <img 
                  src="/logo.png" 
                  alt="AncientHealth Logo" 
                  className="w-10 h-10 object-contain rounded-full"
                />
                <span className="font-semibold text-xl text-gray-800">AncientHealth</span>
              </div>
            </Link>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#story" className="text-gray-700 hover:text-yellow-700 transition-colors">Our Story</a>
              <a href="#sources" className="text-gray-700 hover:text-yellow-700 transition-colors">Sources</a>
              <a href="#herbs" className="text-gray-700 hover:text-yellow-700 transition-colors">Pure Herbs</a>
              <a href="#wellness" className="text-gray-700 hover:text-yellow-700 transition-colors">Wellness</a>
              <button className="bg-[#1d625a] cursor-pointer text-white px-6 py-2 rounded-full hover:bg-[#174b45] transition-colors">
                Shop Now
              </button>
            </div>

            <div className="md:hidden">
              <button 
                onClick={toggleMobileMenu}
                className="focus:outline-none"
                aria-label="Toggle mobile menu"
              >
                <div className="relative w-6 h-5">
                  <span className={`absolute left-0 w-full h-0.5 bg-gray-800 transition-all duration-300 ease-in-out ${
                    isMobileMenuOpen ? 'rotate-45 top-2.5' : 'top-0'
                  }`}></span>
                  <span className={`absolute left-0 w-full h-0.5 bg-gray-800 top-2.5 transition-opacity duration-300 ease-in-out ${
                    isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                  }`}></span>
                  <span className={`absolute left-0 w-full h-0.5 bg-gray-800 transition-all duration-300 ease-in-out ${
                    isMobileMenuOpen ? '-rotate-45 top-2.5' : 'top-5'
                  }`}></span>
                </div>
              </button>
            </div>
          </div>
        </div>

        <div className={`md:hidden fixed top-10 left-0 w-full h-[calc(100vh-2.5rem)] bg-gradient-to-b from-[#f5f6f5]/95 to-[#e0e7e5]/95 backdrop-blur-md border-l border-[#1d625a]/20 shadow-lg transition-all duration-300 ease-in-out transform ${
          isMobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        } z-30`}>
          <button 
            onClick={toggleMobileMenu}
            className="absolute top-4 right-4 focus:outline-none"
            aria-label="Close mobile menu"
          >
            <div className="relative w-8 h-8 bg-[#1d625a]/10 rounded-full flex items-center justify-center hover:bg-[#1d625a]/20 transition-colors duration-200">
              <span className="absolute w-5 h-0.5 bg-[#1d625a] rotate-45"></span>
              <span className="absolute w-5 h-0.5 bg-[#1d625a] -rotate-45"></span>
            </div>
          </button>
          <div className="flex flex-col items-center justify-center h-full space-y-8">
            <a 
              href="#story" 
              className="text-gray-800 text-xl font-semibold hover:text-yellow-700 transition-colors duration-200"
              onClick={toggleMobileMenu}
            >
              Our Story
            </a>
            <a 
              href="#sources" 
              className="text-gray-800 text-xl font-semibold hover:text-yellow-700 transition-colors duration-200"
              onClick={toggleMobileMenu}
            >
              Sources
            </a>
            <a 
              href="#herbs" 
              className="text-gray-800 text-xl font-semibold hover:text-yellow-700 transition-colors duration-200"
              onClick={toggleMobileMenu}
            >
              Pure Herbs
            </a>
            <a 
              href="#wellness" 
              className="text-gray-800 text-xl font-semibold hover:text-yellow-700 transition-colors duration-200"
              onClick={toggleMobileMenu}
            >
              Wellness
            </a>
            <button 
              className="bg-[#1d625a] text-white px-10 py-3 rounded-full hover:bg-[#174b45] transition-colors duration-200 text-xl font-semibold shadow-md"
              onClick={toggleMobileMenu}
            >
              Shop Now
            </button>
          </div>
        </div>
      </nav>
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(100vw); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </div>
  )
}