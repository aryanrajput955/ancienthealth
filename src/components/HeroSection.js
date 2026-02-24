import React from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Leaf, ShieldCheck, Star, Zap } from 'lucide-react'

const HeroSection = () => {
    const { scrollY } = useScroll()
    const y1 = useTransform(scrollY, [0, 500], [0, 200])
    const y2 = useTransform(scrollY, [0, 500], [0, -150])

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.3, delayChildren: 0.2 }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 1, ease: 'easeOut' }
        }
    }

    return (
        <section className='relative min-h-screen flex items-center overflow-hidden bg-[#0f1c18] text-[#e8e6e3] selection:bg-[#d4a574] selection:text-[#0f1c18]'>

            {/* Grain Overlay */}
            <div className='absolute inset-0 pointer-events-none opacity-[0.03] z-50 bg-[url("https://grainy-gradients.vercel.app/noise.svg")]'></div>

            {/* Parallax Background */}
            <div className='absolute inset-0 z-0 overflow-hidden'>
                <div className='absolute inset-0 bg-gradient-to-b from-[#0f1c18]/30 via-[#0f1c18]/60 to-[#0f1c18] z-10'></div>
                <motion.div style={{ y: y1 }} className='absolute inset-0'>
                    <img
                        src="https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=60&w=1920&auto=format&fit=crop"
                        alt="Ancient Mystical Forest"
                        className="w-full h-full object-cover opacity-50 scale-110"
                        loading="eager"
                        fetchPriority="high"
                    />
                </motion.div>

                {/* Ambient Golden Glows */}
                <motion.div
                    animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.2, 1] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className='absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#d4a574]/10 rounded-full blur-[120px]'
                />
            </div>

            <div className='relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-20'>
                <div className='grid lg:grid-cols-2 gap-16 lg:gap-24 items-center'>

                    {/* Left Column: Narrative */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className='space-y-10'
                    >
                        {/* Tagline */}
                        <motion.div variants={itemVariants}>
                            <span className='inline-block text-[#d4a574] text-sm tracking-[0.3em] uppercase border border-[#d4a574]/30 px-5 py-2 rounded-full backdrop-blur-sm'>
                                The Sanctuary
                            </span>
                        </motion.div>

                        {/* Main Heading */}
                        <motion.h1 variants={itemVariants} className='text-6xl sm:text-7xl lg:text-8xl font-serif font-light leading-[0.95] tracking-tight'>
                            <span className='block text-white'>Ancient</span>
                            <span className='block text-[#d4a574] italic'>Wisdom</span>
                            <span className='block text-white'>Reborn</span>
                        </motion.h1>

                        {/* Description */}
                        <motion.p variants={itemVariants} className='text-lg md:text-xl text-white/60 font-light leading-relaxed max-w-lg border-l border-[#d4a574]/30 pl-6'>
                            Experience the purest wellness traditions of the Himalayas. Ethically sourced, spiritually grounded, and crafted for standard of living.
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div variants={itemVariants} className='flex flex-wrap gap-6 pt-4'>
                            <Link to='/shop' className='group relative px-10 py-4 bg-transparent overflow-hidden rounded-full transition-all duration-300 transform hover:scale-105 border border-[#d4a574]/30'>
                                <div className='absolute inset-0 w-0 bg-[#d4a574] transition-all duration-[700ms] ease-out group-hover:w-full opacity-90'></div>
                                <span className='relative z-10 flex items-center space-x-3'>
                                    <span className='uppercase tracking-[0.2em] text-xs font-serif text-[#d4a574] group-hover:text-[#0f1c18] transition-colors duration-500'>
                                        Explore Elixirs
                                    </span>
                                    <ArrowRight className="w-4 h-4 text-[#d4a574] group-hover:text-[#0f1c18] transition-all duration-500 transform group-hover:translate-x-1" />
                                </span>
                            </Link>

                            <Link to='/about' className='group flex items-center space-x-3 px-6 py-4 text-white/60 hover:text-white transition-colors duration-300'>
                                <span className='uppercase tracking-widest text-xs font-serif border-b border-transparent group-hover:border-[#d4a574] pb-1 transition-all duration-300'>Our Philosophy</span>
                            </Link>
                        </motion.div>
                    </motion.div>

                    {/* Right Column: Wisdom Tablet */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
                        className='relative hidden lg:block'
                    >
                        {/* Floating Effect Wrapper */}
                        <motion.div style={{ y: y2 }}>
                            <div className='relative bg-[#0f1c18]/40 backdrop-blur-xl border border-white/10 rounded-[2rem] p-10 overflow-hidden shadow-2xl'>
                                {/* Glass Glint */}
                                <div className='absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent'></div>
                                <div className='absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#d4a574]/20 to-transparent'></div>

                                <div className='space-y-12'>
                                    <div>
                                        <h3 className='text-3xl font-serif text-white mb-2'>The Four Pillars</h3>
                                        <p className='text-white/40 font-light text-sm'>Foundations of our craft</p>
                                    </div>

                                    <div className='space-y-8'>
                                        {[
                                            { icon: Leaf, title: "Purity", desc: "100% Organic, from soil to soul." },
                                            { icon: ShieldCheck, title: "Integrity", desc: "Lab-tested for absolute safety." },
                                            { icon: Star, title: "Tradition", desc: "Recipes passed down for eons." },
                                            { icon: Zap, title: "Vitality", desc: "Potent formulas for modern life." }
                                        ].map((item, idx) => (
                                            <div key={idx} className='group flex items-start space-x-5'>
                                                <div className='p-3 rounded-full bg-white/5 border border-white/5 group-hover:border-[#d4a574]/30 group-hover:bg-[#d4a574]/10 transition-colors duration-300'>
                                                    <item.icon className="w-5 h-5 text-white/50 group-hover:text-[#d4a574] transition-colors duration-300" />
                                                </div>
                                                <div>
                                                    <h4 className='text-lg font-serif text-white/90 group-hover:text-white transition-colors'>{item.title}</h4>
                                                    <p className='text-white/50 text-sm font-light'>{item.desc}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className='pt-8 border-t border-white/5 flex items-center justify-between text-white/30 text-xs tracking-widest uppercase'>
                                        <span>Est. 2024</span>
                                        <span>Himalaya • Earth</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 2 }}
                className='absolute bottom-10 left-1/2 -translate-x-1/2 z-30'
            >
                <div className='h-12 w-[1px] bg-gradient-to-b from-transparent via-[#d4a574] to-transparent'></div>
            </motion.div>
        </section>
    )
}

export default HeroSection
