import React from 'react'
import { motion } from 'framer-motion'

const PuritySection = () => {
    return (
        <section className='relative py-20 lg:py-24 overflow-hidden bg-[#fdfbf7] text-[#1f2937]'>
            {/* Grain Overlay */}
            <div className='absolute inset-0 pointer-events-none opacity-[0.05] bg-[url("https://grainy-gradients.vercel.app/noise.svg")]'></div>

            {/* Decorative elements - Adjusted for Light Theme */}
            <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className='absolute top-20 right-0 w-[500px] h-[500px] bg-[#d4a574]/10 rounded-full blur-[100px]'
            ></motion.div>
            <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className='absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#2d5f4f]/10 rounded-full blur-[100px]'
            ></motion.div>

            <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                {/* Quote Section - Minimalist Design */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className='max-w-4xl mx-auto text-center mb-24'
                >
                    <div className='mb-8'>
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: 64 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className='inline-block w-16 h-1 bg-gradient-to-r from-[#2d5f4f] to-[#d4a574] rounded-full'
                        ></motion.div>
                    </div>
                    <blockquote className='mb-8'>
                        <p className='text-3xl sm:text-4xl lg:text-5xl font-serif text-[#0f1c18] leading-relaxed italic mb-6'>
                            "Nature does not hurry, yet everything is accomplished"
                        </p>
                        <footer className='text-[#d4a574] text-lg font-serif tracking-widest uppercase text-xs font-medium'>
                            — Ancient Wisdom
                        </footer>
                    </blockquote>
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: 64 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className='inline-block w-16 h-1 bg-gradient-to-r from-[#d4a574] to-[#2d5f4f] rounded-full'
                    ></motion.div>
                </motion.div>

                {/* Main Content */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className='text-center mb-20'
                >
                    <span className='inline-block text-xs font-serif tracking-[0.2em] text-[#d4a574] uppercase mb-4 font-bold'>
                        Pure • Natural • Timeless
                    </span>
                    <h2 className='text-4xl sm:text-5xl lg:text-6xl font-serif text-[#0f1c18] mb-6'>
                        Forged by Earth,
                        <span className='block mt-2 text-[#d4a574] italic'>Perfected by Time</span>
                    </h2>
                    <p className='text-xl text-[#0f1c18]/70 max-w-3xl mx-auto leading-relaxed font-light'>
                        Every elixir is a testament to the purity of the Himalayas and the wisdom of ancient healing practices.
                    </p>
                </motion.div>

                {/* Feature Flow - Unique Design */}
                <div className='relative max-w-6xl mx-auto mb-20'>
                    {/* Connecting Line */}
                    <div className='absolute top-0 left-1/2 transform -translate-x-1/2 w-px h-full bg-gradient-to-b from-[#d4a574]/0 via-[#d4a574]/30 to-[#d4a574]/0 hidden lg:block'></div>

                    <div className='space-y-12'>
                        {[
                            {
                                icon: (
                                    <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z' />
                                    </svg>
                                ),
                                title: '100% Pure',
                                description: 'No synthetic additives, preservatives, or fillers',
                                number: 'I'
                            },
                            {
                                icon: (
                                    <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' />
                                    </svg>
                                ),
                                title: 'Ancient Wisdom',
                                description: 'Time-tested remedies passed through generations',
                                number: 'II'
                            },
                            {
                                icon: (
                                    <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
                                    </svg>
                                ),
                                title: 'Sustainably Sourced',
                                description: 'Ethically harvested from pristine mountain regions',
                                number: 'III'
                            },
                            {
                                icon: (
                                    <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' />
                                    </svg>
                                ),
                                title: 'Lab Verified',
                                description: 'Rigorously tested for purity and potency',
                                number: 'IV'
                            },
                        ].map((feature, index) => (
                            <div key={index} className='relative'>
                                <motion.div
                                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.6, delay: 0.1 * index }}
                                    className='grid lg:grid-cols-2 gap-8 items-center'
                                >
                                    {/* Desktop: Alternating Layout */}
                                    {index % 2 === 0 ? (
                                        <>
                                            {/* Left Content */}
                                            <div className='hidden lg:flex flex-col items-end text-right pr-12'>
                                                <h3 className='text-3xl font-serif text-[#0f1c18] mb-2 flex items-center justify-end space-x-3'>
                                                    <span>{feature.title}</span>
                                                    <div className='w-12 h-12 bg-[#2d5f4f]/10 border border-[#2d5f4f]/20 rounded-full flex items-center justify-center text-[#2d5f4f]'>
                                                        {feature.icon}
                                                    </div>
                                                </h3>
                                                <p className='text-lg text-[#0f1c18]/70 max-w-sm font-light'>{feature.description}</p>
                                            </div>

                                            {/* Right Number Badge */}
                                            <div className='hidden lg:block pl-12 opacity-15'>
                                                <span className='text-8xl font-serif text-[#d4a574]'>{feature.number}</span>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            {/* Left Number Badge */}
                                            <div className='hidden lg:block text-right pr-12 opacity-15'>
                                                <span className='text-8xl font-serif text-[#d4a574]'>{feature.number}</span>
                                            </div>

                                            {/* Right Content */}
                                            <div className='hidden lg:flex flex-col items-start pl-12'>
                                                <h3 className='text-3xl font-serif text-[#0f1c18] mb-2 flex items-center space-x-3'>
                                                    <div className='w-12 h-12 bg-[#2d5f4f]/10 border border-[#2d5f4f]/20 rounded-full flex items-center justify-center text-[#2d5f4f]'>
                                                        {feature.icon}
                                                    </div>
                                                    <span>{feature.title}</span>
                                                </h3>
                                                <p className='text-lg text-[#0f1c18]/70 max-w-sm font-light'>{feature.description}</p>
                                            </div>
                                        </>
                                    )}

                                    {/* Mobile: Simple Stacked Layout */}
                                    <div className='lg:hidden col-span-2 flex items-start space-x-4 p-6 rounded-2xl bg-white border border-[#0f1c18]/5 shadow-sm'>
                                        <div className='w-12 h-12 bg-[#2d5f4f]/10 border border-[#2d5f4f]/20 rounded-full flex items-center justify-center text-[#2d5f4f] flex-shrink-0'>
                                            {feature.icon}
                                        </div>
                                        <div className='flex-1'>
                                            <h3 className='text-xl font-serif text-[#0f1c18] mb-1'>{feature.title}</h3>
                                            <p className='text-sm text-[#0f1c18]/70 font-light'>{feature.description}</p>
                                        </div>
                                        <div className='text-4xl font-serif text-[#d4a574]/30'>{feature.number}</div>
                                    </div>
                                </motion.div>

                                {/* Center Dot Connector */}
                                <div className='hidden lg:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10'>
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        whileInView={{ scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: 0.2 + (0.1 * index) }}
                                        className='w-3 h-3 bg-[#fdfbf7] rounded-full border border-[#d4a574] ring-4 ring-[#fdfbf7]'
                                    ></motion.div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default PuritySection
