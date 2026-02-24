import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Star, Shield, Leaf } from 'lucide-react'

const CTASection = () => {
    return (
        <section className='relative py-20 lg:py-24 overflow-hidden bg-[#0f1c18]'>
            {/* Background Gradient & Grain */}
            <div className='absolute inset-0 bg-gradient-to-br from-[#0f1c18] via-[#162923] to-[#0f1c18]'>
                <div className='absolute inset-0 pointer-events-none opacity-[0.03] bg-[url("https://grainy-gradients.vercel.app/noise.svg")]'></div>
            </div>

            {/* Shine Effect */}
            <div className='absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[#d4a574]/50 to-transparent'></div>

            {/* Decorative Elements - Static for Performance */}
            <div className='absolute -top-[50%] -left-[20%] w-[800px] h-[800px] border border-[#d4a574]/5 rounded-full border-dashed opacity-50 pointer-events-none'></div>

            <div className='relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 0.6 }}
                    className='will-change-transform'
                >
                    <div className='inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#d4a574]/10 border border-[#d4a574]/20 mb-8'>
                        <Star className="w-3 h-3 text-[#d4a574]" />
                        <span className='text-xs font-serif text-[#d4a574] uppercase tracking-widest'>Join 10,000+ Seekers</span>
                    </div>

                    <h2 className='text-4xl sm:text-5xl lg:text-6xl font-serif text-white mb-6 leading-tight'>
                        Awaken Your
                        <span className='block mt-2 bg-gradient-to-r from-[#d4a574] via-[#e8c9a0] to-[#d4a574] bg-clip-text text-transparent italic'>
                            Inner Vitality
                        </span>
                    </h2>

                    <p className='text-xl text-white/60 mb-10 leading-relaxed font-light max-w-2xl mx-auto'>
                        Begin your journey to holistic wellness today. Experience the transformative power of ancient Himalayan wisdom.
                    </p>

                    <div className='flex flex-col sm:flex-row items-center justify-center gap-4'>
                        <Link
                            to='/shop'
                            className='group relative px-10 py-4 bg-transparent overflow-hidden rounded-full transition-all duration-300 transform hover:scale-105 border border-[#d4a574]/30 w-full sm:w-auto justify-center flex'
                        >
                            <div className='absolute inset-0 w-0 bg-[#d4a574] transition-all duration-[700ms] ease-out group-hover:w-full opacity-90'></div>
                            <span className='relative z-10 flex items-center space-x-3'>
                                <span className='uppercase tracking-[0.2em] text-xs font-serif text-[#d4a574] group-hover:text-[#0f1c18] transition-colors duration-500'>
                                    Acquire Elixirs
                                </span>
                                <ArrowRight className="w-4 h-4 text-[#d4a574] group-hover:text-[#0f1c18] transition-all duration-500 transform group-hover:translate-x-1" />
                            </span>
                        </Link>
                        <Link
                            to='/contact'
                            className='group relative px-10 py-4 bg-transparent overflow-hidden rounded-full transition-all duration-300 transform hover:scale-105 border border-white/20 w-full sm:w-auto justify-center flex'
                        >
                            <div className='absolute inset-0 w-0 bg-white transition-all duration-[700ms] ease-out group-hover:w-full opacity-90'></div>
                            <span className='relative z-10 flex items-center space-x-3'>
                                <span className='uppercase tracking-[0.2em] text-xs font-serif text-white group-hover:text-[#0f1c18] transition-colors duration-500'>
                                    Contact Us
                                </span>
                            </span>
                        </Link>
                    </div>

                    {/* Trust Indicators */}
                    <div className='mt-16 pt-8 border-t border-white/5 grid grid-cols-3 gap-8'>
                        {[
                            { icon: Shield, text: "30-Day Guarantee" },
                            { icon: Leaf, text: "100% Natural" },
                            { icon: Star, text: "Premium Quality" },
                        ].map((item, index) => (
                            <div key={index} className='flex flex-col items-center gap-2'>
                                <item.icon className="w-5 h-5 text-[#d4a574]" />
                                <span className='text-sm text-white/40 font-serif'>{item.text}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

export default CTASection
