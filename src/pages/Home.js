import React from 'react'
import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import PuritySection from '../components/PuritySection'
import WellnessRetreat from '../components/WellnessRetreat'
import FeaturedProducts from '../components/FeaturedProducts'
import StorySection from '../components/StorySection'
import CTASection from '../components/CTASection'
import Footer from '../components/Footer'

const Home = () => {
	return (
		<div className='min-h-screen bg-white'>
			<Navbar />
			<HeroSection />
			<PuritySection />
			<FeaturedProducts />
			<StorySection />
			<WellnessRetreat />
			<CTASection />
			<Footer />
		</div>
	)
}

export default Home

