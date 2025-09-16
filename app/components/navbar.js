'use client'
import { useState, useEffect } from 'react'

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      isScrolled ? 'bg-white/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-yellow-600 to-yellow-800 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">ॐ</span>
            </div>
            <span className="font-semibold text-xl text-gray-800">AncientHealth</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#story" className="text-gray-700 hover:text-yellow-700 transition-colors">Our Story</a>
            <a href="#sources" className="text-gray-700 hover:text-yellow-700 transition-colors">Sources</a>
            <a href="#herbs" className="text-gray-700 hover:text-yellow-700 transition-colors">Pure Herbs</a>
            <a href="#wellness" className="text-gray-700 hover:text-yellow-700 transition-colors">Wellness</a>
            <button className="bg-yellow-700 text-white px-6 py-2 rounded-full hover:bg-yellow-800 transition-colors">
              Shop Now
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}