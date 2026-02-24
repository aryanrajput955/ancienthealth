import React from 'react'
import { Link } from 'react-router-dom'
import retreatImage from '../assets/story-harvest.png'
import { motion } from 'framer-motion'
import { Mountain, Sparkles, Heart, Anchor, ArrowRight } from 'lucide-react'

const WellnessRetreat = () => {
    const features = [
        {
            icon: <Mountain className="w-5 h-5" />,
            title: 'Himalayan Sanctuary',
            description: 'Nestled in pristine valleys with breathtaking views.'
        },
        {
            icon: <Sparkles className="w-5 h-5" />,
            title: 'Holistic Healing',
            description: 'Ancient practices combined with modern comfort.'
        },
        {
            icon: <Heart className="w-5 h-5" />,
            title: 'Personalized Journeys',
            description: 'Wellness paths designed for your unique spirit.'
        },
        {
            icon: <Anchor className="w-5 h-5" />,
            title: 'Expert Guidance',
            description: 'Led by masters of yoga, meditation, and Ayurveda.'
        }
    ]

    return (
        <section className='relative py-20 lg:py-24 bg-gradient-to-b from-[#0f1c18] via-[#162923] to-[#0f1c18] overflow-hidden text-[#e8e6e3]'>
            {/* Grain Overlay */}
            <div className='absolute inset-0 pointer-events-none opacity-[0.03] bg-[url("https://grainy-gradients.vercel.app/noise.svg")]'></div>

            {/* Background Elements - Optimization: Removed massive generic blur animation */}
            <div className='absolute inset-0 pointer-events-none'>
                <div className='absolute top-0 right-0 w-[600px] h-[600px] bg-[#d4a574]/5 rounded-full blur-[100px] opacity-20'></div>
                <div className='absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#2d5f4f]/10 rounded-full blur-[100px] opacity-20'></div>
            </div>

            <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 0.8 }}
                    className='text-center mb-16 will-change-transform'
                >
                    <div className='inline-block mb-4'>
                        <span className='text-xs font-serif tracking-[0.2em] text-[#d4a574] uppercase border-b border-[#d4a574]/30 pb-1'>
                            Escape • Rejuvenate • Transform
                        </span>
                    </div>
                    <h2 className='text-4xl sm:text-5xl lg:text-6xl font-serif text-white mb-6'>
                        Sacred
                        <span className='block mt-2 italic text-[#d4a574]'>Pilgrimages</span>
                    </h2>
                    <p className='text-lg text-white/60 max-w-2xl mx-auto leading-relaxed font-light'>
                        Leave the chaos behind. Immerse yourself in transformative experiences designed to restore balance and reconnect you with your inner vitality.
                    </p>
                </motion.div>

                {/* Main Content Grid */}
                <div className='grid lg:grid-cols-2 gap-16 lg:gap-20 items-center mb-16'>
                    {/* Left - Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className='relative group perspective will-change-transform'
                    >
                        <div className='absolute -inset-1 bg-gradient-to-r from-[#d4a574]/30 to-[#2d5f4f]/30 rounded-[2rem] blur opacity-30 group-hover:opacity-60 transition duration-700'></div>
                        <div className='relative rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl transform-gpu'>
                            <img
                                src={retreatImage}
                                alt='Himalayan Sacred Retreat'
                                className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 will-change-transform'
                            />
                            <div className='absolute inset-0 bg-[#0f1c18]/20 group-hover:bg-transparent transition-colors duration-500'></div>
                        </div>
                    </motion.div>

                    {/* Right - Content */}
                    <div className='space-y-10'>
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-10%" }}
                            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                            className='will-change-transform'
                        >
                            <h3 className='text-3xl font-serif text-white mb-4'>
                                Find Your Sanctuary
                            </h3>
                            <p className='text-white/60 leading-relaxed font-light'>
                                Our retreats offer a haven for those seeking deeper connection. Experience the healing power of silence and nature, guided by ancient wisdom—perfect for deep restoration.
                            </p>
                        </motion.div>

                        {/* Features List */}
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.1 * index }}
                                    className='flex items-start space-x-4 group will-change-transform'
                                >
                                    <div className='p-3 bg-white/5 border border-white/5 rounded-full text-[#d4a574] group-hover:bg-[#d4a574]/10 transition-colors duration-300'>
                                        {feature.icon}
                                    </div>
                                    <div>
                                        <h4 className='font-serif text-white mb-1'>{feature.title}</h4>
                                        <p className='text-sm text-white/50'>{feature.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* CTA Button */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className='pt-6 will-change-transform'
                        >
                            <Link
                                to='/shop'
                                className='group relative px-10 py-4 bg-transparent overflow-hidden rounded-full transition-all duration-300 transform hover:scale-105 border border-[#d4a574]/30 w-80 justify-center flex'
                            >
                                <div className='absolute inset-0 w-0 bg-[#d4a574] transition-all duration-[700ms] ease-out group-hover:w-full opacity-90'></div>
                                <span className='relative z-10 flex items-center space-x-3'>
                                    <span className='uppercase tracking-[0.2em] text-xs font-serif text-[#d4a574] group-hover:text-[#0f1c18] transition-colors duration-500'>
                                        Acquire Elixirs
                                    </span>
                                    <ArrowRight className="w-4 h-4 text-[#d4a574] group-hover:text-[#0f1c18] transition-all duration-500 transform group-hover:translate-x-1" />
                                </span>
                            </Link>
                        </motion.div>
                    </div>
                </div>

                {/* Bottom Stats - Minimalist */}
                <div className='grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-white/5'>
                    {[
                        { value: '500+', label: 'Souls Restored' },
                        { value: '7-21', label: 'Day Journeys' },
                        { value: '100%', label: 'Sattvic Meals' },
                        { value: '4.9★', label: 'Guest Harmony' },
                    ].map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 + (0.1 * index) }}
                            className='text-center will-change-transform'
                        >
                            <div className='text-3xl font-serif text-[#d4a574] mb-1'>{stat.value}</div>
                            <div className='text-white/40 text-xs tracking-widest uppercase'>{stat.label}</div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default WellnessRetreat
