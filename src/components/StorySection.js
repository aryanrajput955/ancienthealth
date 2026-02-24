import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import storyHarvest from '../assets/story-harvest.png'
import storyProcess from '../assets/story-craft.png'
import { ArrowRight } from 'lucide-react'

const StorySection = () => {
    return (
        <section className='relative py-12 md:py-20 lg:py-24 bg-[#fdfbf7] overflow-hidden text-[#1f2937]'>
            {/* Grain Overlay - optimized */}
            <div className='absolute inset-0 pointer-events-none opacity-[0.05] bg-[url("https://grainy-gradients.vercel.app/noise.svg")]'></div>

            {/* Decorative pattern overlay */}
            <div className='absolute inset-0 opacity-[0.03] bg-[url("https://www.transparenttextures.com/patterns/cubes.png")]'></div>

            <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className='text-center mb-16 md:mb-24 will-change-transform'
                >
                    <div className='inline-block mb-4'>
                        <span className='text-xs font-serif tracking-[0.2em] text-[#2d5f4f] uppercase border-b border-[#2d5f4f]/30 pb-1'>
                            The Odyssey
                        </span>
                    </div>
                    <h2 className='text-3xl sm:text-5xl lg:text-6xl font-serif text-[#0f1c18] mb-6'>
                        From The Heavens
                        <span className='block mt-2 italic text-[#d4a574]'>To Your Wellness</span>
                    </h2>
                    <p className='text-base sm:text-lg text-[#0f1c18]/70 max-w-2xl mx-auto leading-relaxed font-light'>
                        Trace the sacred journey of our alchemical creations, from the highest peaks of the Himalayas to your daily ritual.
                    </p>
                </motion.div>

                {/* Timeline Container */}
                <div className='relative'>
                    {/* Vertical Line */}
                    <div className='absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-gradient-to-b from-[#2d5f4f]/0 via-[#2d5f4f]/20 to-[#2d5f4f]/0 hidden lg:block'></div>

                    {/* Timeline Item 1 */}
                    <div className='relative grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-24 items-center mb-16 md:mb-24'>
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-10%" }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className='order-2 lg:order-1 relative group perspective will-change-transform'
                        >
                            <div className='absolute -inset-1 bg-gradient-to-r from-[#d4a574]/30 to-[#2d5f4f]/30 rounded-[2rem] blur opacity-20 group-hover:opacity-40 transition duration-700'></div>
                            <div className='relative rounded-[2rem] overflow-hidden border border-[#0f1c18]/5 shadow-2xl transform-gpu aspect-[4/3] lg:aspect-auto h-full'>
                                <img
                                    src={storyHarvest}
                                    alt='Sacred Harvest'
                                    className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out will-change-transform'
                                />
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-10%" }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className='order-1 lg:order-2 text-left will-change-transform'
                        >
                            <div className='inline-block mb-4 p-2 px-4 rounded-full bg-[#2d5f4f]/5 border border-[#2d5f4f]/10'>
                                <span className='text-[#2d5f4f] font-serif text-sm'>I. Genesis</span>
                            </div>
                            <h3 className='text-3xl sm:text-4xl font-serif text-[#0f1c18] mb-4 md:mb-6'>
                                The Sacred Harvest
                            </h3>
                            <p className='text-[#0f1c18]/80 text-base sm:text-lg leading-relaxed font-light mb-6 md:mb-8'>
                                At 16,000 feet, where the air is thin and pure, our journey begins. We partner with indigenous tribes who collect herbs and resin using time-honored techniques that respect the earth's rhythms.
                            </p>
                            <ul className='space-y-3 sm:space-y-4 text-left block'>
                                {[
                                    'Ethically Sourced',
                                    'Lunar Cycle Harvesting',
                                    'Indigenous Partnerships'
                                ].map((item, i) => (
                                    <li key={i} className='flex items-center space-x-3 text-[#0f1c18]/70 font-light text-sm sm:text-base'>
                                        <div className='w-1.5 h-1.5 rounded-full bg-[#d4a574] flex-shrink-0'></div>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>

                    {/* Timeline Item 2 */}
                    <div className='relative grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-24 items-center mb-16 md:mb-24'>
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-10%" }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className='order-1 text-left lg:text-right flex flex-col items-start lg:items-end will-change-transform'
                        >
                            <div className='inline-block mb-4 p-2 px-4 rounded-full bg-[#2d5f4f]/5 border border-[#2d5f4f]/10'>
                                <span className='text-[#2d5f4f] font-serif text-sm'>II. Alchemy</span>
                            </div>
                            <h3 className='text-3xl sm:text-4xl font-serif text-[#0f1c18] mb-4 md:mb-6'>
                                Ancient Purification
                            </h3>
                            <p className='text-[#0f1c18]/80 text-base sm:text-lg leading-relaxed font-light mb-6 md:mb-8'>
                                We do not manufacture; we preserve. Our purification process follows ancient Ayurvedic texts—using only natural elements, mantra chanting, and solar energy to purify the raw materials without losing potency.
                            </p>
                            <ul className='space-y-3 sm:space-y-4 text-left lg:text-right block w-full'>
                                {[
                                    'Zero Chemical Processing',
                                    'Traditional Surya Tapi (Sun Drying)',
                                    'Mantra Infused'
                                ].map((item, i) => (
                                    <li key={i} className='flex items-center space-x-3 text-[#0f1c18]/70 font-light justify-start lg:justify-end text-sm sm:text-base'>
                                        <div className='w-1.5 h-1.5 rounded-full bg-[#d4a574] flex-shrink-0 lg:order-2 lg:ml-3 lg:mr-0'></div>
                                        <span className='lg:order-1'>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-10%" }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className='order-2 relative group perspective will-change-transform'
                        >
                            <div className='absolute -inset-1 bg-gradient-to-r from-[#2d5f4f]/30 to-[#d4a574]/30 rounded-[2rem] blur opacity-20 group-hover:opacity-40 transition duration-700'></div>
                            <div className='relative rounded-[2rem] overflow-hidden border border-[#0f1c18]/5 shadow-2xl transform-gpu aspect-[4/3] lg:aspect-auto h-full'>
                                <img
                                    src={storyProcess}
                                    alt='Ancient Purification'
                                    className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-90 will-change-transform'
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Our Promise Section - Dark floating card */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className='relative mt-16 md:mt-32 will-change-transform'
                >
                    <div className='relative bg-[#0f1c18] border border-[#d4a574]/20 rounded-3xl overflow-hidden p-6 md:p-8 lg:p-16 text-center shadow-2xl'>
                        {/* Decorative Background */}
                        <div className='absolute inset-0 bg-gradient-to-br from-[#d4a574]/10 to-transparent'></div>
                        <div className='absolute top-0 right-0 w-64 h-64 bg-[#2d5f4f]/30 rounded-full blur-3xl transform-gpu'></div>

                        <div className='relative z-10 max-w-3xl mx-auto'>
                            <span className='inline-block text-xs font-serif tracking-[0.2em] text-[#d4a574] uppercase mb-4 md:mb-6'>
                                The Covenant
                            </span>
                            <h3 className='text-3xl sm:text-4xl lg:text-5xl font-serif text-white mb-6 md:mb-8 leading-tight'>
                                Purity You Can Trust
                            </h3>
                            <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 mb-8 md:mb-12'>
                                {[
                                    { value: '100%', label: 'Traceable Source' },
                                    { value: '3rd Party', label: 'Lab Tested' },
                                    { value: 'Zero', label: 'Additives' },
                                ].map((stat, i) => (
                                    <div key={i} className='p-6 rounded-2xl bg-white/5 border border-white/10'>
                                        <div className='text-3xl font-serif text-[#d4a574] mb-2'>{stat.value}</div>
                                        <div className='text-sm text-white/50 uppercase tracking-wider'>{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                            <Link
                                to='/about'
                                className='group relative px-8 sm:px-10 py-3 sm:py-4 bg-transparent overflow-hidden rounded-full transition-all duration-300 transform hover:scale-105 border border-[#d4a574]/30 inline-flex will-change-transform'
                            >
                                <div className='absolute inset-0 w-0 bg-[#d4a574] transition-all duration-[700ms] ease-out group-hover:w-full opacity-90'></div>
                                <span className='relative z-10 flex items-center space-x-3'>
                                    <span className='uppercase tracking-[0.2em] text-xs font-serif text-[#d4a574] group-hover:text-[#0f1c18] transition-colors duration-500'>
                                        Read The Full Story
                                    </span>
                                    <ArrowRight className="w-4 h-4 text-[#d4a574] group-hover:text-[#0f1c18] transition-all duration-500 transform group-hover:translate-x-1" />
                                </span>
                            </Link>
                        </div>
                    </div>

                    {/* Pulsing Center Dot for Promise */}
                    <div className='absolute -top-3 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                        <div className='w-6 h-6 bg-[#fdfbf7] rounded-full border border-[#d4a574] flex items-center justify-center'>
                            <div className='w-2 h-2 bg-[#d4a574] rounded-full animate-pulse'></div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

export default StorySection
