import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import AboutHero from '../components/AboutHero'
import PhilosophySection from '../components/PhilosophySection'
import StoryJourney from '../components/StoryJourney'
import ValuesSection from '../components/ValuesSection'
import CTASection from '../components/CTASection'

const About = () => {
    return (
        <div className='min-h-screen bg-[#0f1c18]'>
            <Navbar />
            <AboutHero />
            <PhilosophySection />
            <StoryJourney />
            <ValuesSection />
            <CTASection />
            <Footer />
        </div>
    )
}

export default About
