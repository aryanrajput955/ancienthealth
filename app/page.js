'use client'
import { useEffect } from 'react'
import Hero from './components/hero'
import Navigation from './components/navbar'
import StorySection from './components/story'
import SourcesSection from './components/sources'
import HerbsSection from './components/herbs'
import MoodSections from './components/mood'
import Footer from './components/footer'
import AyoudeyaHeritageSection from './components/story2'
import VideoSection from './components/viedo'
import AyurvedaProductsSection from './components/products'

export default function Home() {
  useEffect(() => {
    // Initialize GSAP ScrollTrigger after component mount
    if (typeof window !== 'undefined') {
      const { gsap } = window
      if (gsap) {
        gsap.registerPlugin(window.ScrollTrigger)
      }
    }
  }, [])

  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <AyoudeyaHeritageSection />
      <StorySection />
      <AyurvedaProductsSection />
      <VideoSection />
      <SourcesSection />
      <HerbsSection />
      <MoodSections />
      <Footer />
    </div>
  )
}