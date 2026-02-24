import React, { useEffect, useRef, useState } from 'react'

const StoryJourney = () => {
    const [activeStep, setActiveStep] = useState(0)
    const sectionRef = useRef(null)
    const lineRef = useRef(null)
    const rafRef = useRef(null)

    const steps = [
        {
            year: '1985',
            title: 'The Beginning',
            description: 'In the remote valleys of the Himalayas, our founder discovered the healing power of Shilajit.',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            )
        },
        {
            year: '1998',
            title: 'Ancient Wisdom',
            description: 'Collaborating with local tribes to learn sustainable harvesting techniques passed down for generations.',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
            )
        },
        {
            year: '2010',
            title: 'Modern Science',
            description: 'Bridging tradition with technology. Lab-testing every batch to ensure purity while retaining potency.',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
            )
        },
        {
            year: 'Today',
            title: 'Global Wellness',
            description: 'Sharing the gift of Himalayan health with over 50 countries worldwide.',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            )
        }
    ]

    useEffect(() => {
        const handleScroll = () => {
            if (sectionRef.current && lineRef.current) {
                const rect = sectionRef.current.getBoundingClientRect()
                const windowHeight = window.innerHeight

                // Calculate progress: 0 when top of section hits center of viewport
                // This ensures the element is "a bit visible" before starting
                const startOffset = windowHeight * 0.5

                // Total distance to scroll through: equivalent to the section height
                // This makes the progress map 1:1 with scrolling through the section
                const totalScrollableDistance = rect.height

                // Current scroll position relative to start trigger
                const scrolledDistance = -rect.top + startOffset

                const progress = Math.max(0, Math.min(1, scrolledDistance / totalScrollableDistance))

                // Directly update usage style for performance (bypass React render cycle)
                lineRef.current.style.height = `${progress * 100}%`

                // Only update state if step changes to avoid excessive re-renders
                const step = Math.floor(progress * steps.length)
                setActiveStep(prev => prev !== step && step < steps.length ? step : prev)
            }
        }

        const onScroll = () => {
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current)
            }
            rafRef.current = requestAnimationFrame(handleScroll)
        }

        window.addEventListener('scroll', onScroll, { passive: true })
        handleScroll() // Initial calculation

        return () => {
            window.removeEventListener('scroll', onScroll)
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current)
            }
        }
    }, [steps.length])

    return (
        <section ref={sectionRef} className='relative py-16 md:py-24 bg-[#f8faf9] overflow-hidden'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='text-center mb-16 md:mb-24'>
                    <span className='text-xs md:text-sm font-semibold tracking-widest text-[#2d5f4f] uppercase'>
                        From Origins to You
                    </span>
                    <h2 className='text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mt-2 mb-4'>
                        Our Journey
                    </h2>
                    <p className='text-gray-600 max-w-2xl mx-auto text-base md:text-lg'>
                        A timeline of passion, purity, and perseverance.
                    </p>
                </div>

                <div className='relative'>
                    {/* Vertical Line Container */}
                    <div className='absolute left-4 md:left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-[#2d5f4f]/20 via-[#d4a574]/50 to-[#2d5f4f]/20 block'>
                        {/* Active Progress Line */}
                        <div
                            ref={lineRef}
                            className='absolute top-0 left-0 w-full bg-[#d4a574] shadow-[0_0_15px_rgba(212,165,116,0.6)]'
                            style={{
                                height: '0%',
                                // IMPORTANT: No transition to prevent lag with direct updates
                                transition: 'none'
                            }}
                        >
                            {/* Leading Point */}
                            <div className='absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-3 h-3 bg-[#d4a574] rounded-full shadow-[0_0_15px_6px_rgba(212,165,116,0.9)] border-2 border-white'></div>
                        </div>
                    </div>

                    <div className='space-y-20 md:space-y-32'>
                        {steps.map((step, index) => (
                            <div key={index} className={`relative flex items-start md:items-center justify-between flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                                {/* Content Box */}
                                <div className={`w-full md:w-5/12 pl-16 md:pl-0 ${index % 2 === 0 ? 'text-left md:text-right md:pr-12' : 'text-left md:pl-12'}`}>
                                    <div className={`transition-all duration-700 transform ${activeStep >= index ? 'opacity-100 translate-y-0' : 'opacity-30 translate-y-4 blur-sm'}`}>
                                        <span className={`text-5xl md:text-6xl font-bold text-[#d4a574]/10 absolute -top-10 left-16 md:left-auto transform md:translate-x-0 block mb-2 ${index % 2 === 0 ? 'md:right-12' : 'md:left-12'}`}>
                                            {step.year}
                                        </span>
                                        <h3 className={`text-2xl md:text-3xl font-bold mb-3 md:mb-4 relative z-10 transition-colors duration-500 ${activeStep >= index ? 'text-[#2d5f4f]' : 'text-gray-400'}`}>
                                            {step.title}
                                        </h3>
                                        <p className={`text-base md:text-lg leading-relaxed relative z-10 transition-colors duration-500 ${activeStep >= index ? 'text-gray-600' : 'text-gray-400'}`}>
                                            {step.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Center Icon */}
                                <div className={`absolute left-4 md:left-1/2 transform -translate-x-1/2 w-8 h-8 md:w-12 md:h-12 border-2 rounded-full flex items-center justify-center z-10 shadow-lg transition-all duration-500 ${activeStep >= index ? 'bg-[#d4a574] border-[#d4a574] text-white scale-110' : 'bg-white border-[#2d5f4f] text-[#2d5f4f] scale-100'}`}>
                                    <div className="transform scale-75 md:scale-100">
                                        {step.icon}
                                    </div>
                                </div>

                                {/* Empty Space for alternate side */}
                                <div className='hidden md:block w-5/12'></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default StoryJourney
