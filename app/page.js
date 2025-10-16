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
import BannerSection from './components/banenr'

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

      <Hero />
      <AyoudeyaHeritageSection />
      <StorySection />
      <BannerSection  />
      <AyurvedaProductsSection />
      <VideoSection />
      <SourcesSection />
      <HerbsSection />
      <MoodSections />

    </div>
  )
}