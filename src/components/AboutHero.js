import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const AboutHero = () => {
    const { scrollY } = useScroll()
    const y = useTransform(scrollY, [0, 500], [0, 150])
    const opacity = useTransform(scrollY, [0, 300], [1, 0])

    return (
        <section className='relative h-screen flex items-center justify-center overflow-hidden bg-[#0f1c18]'>
            {/* Background Image with Parallax */}
            <motion.div
                style={{ y }}
                className='absolute inset-0 z-0'
            >
                {/* Heavy gradient overlay for seamless transition */}
                <div className='absolute inset-0 bg-gradient-to-b from-[#0f1c18]/30 via-[#0f1c18]/60 to-[#0f1c18] z-10'></div>

                {/* Misty Forest Image */}
                <img
                    src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=60&w=1920&auto=format&fit=crop"
                    alt='Misty Himalayan Forest'
                    className='w-full h-full object-cover scale-110 opacity-70'
                    loading="eager"
                    fetchPriority="high"
                />
            </motion.div>

            {/* Content */}
            <motion.div
                style={{ opacity }}
                className='relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center'
            >
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className='mb-8'
                >
                    <span className='inline-block text-[#d4a574] text-sm tracking-[0.3em] uppercase border border-[#d4a574]/30 px-5 py-2 rounded-full backdrop-blur-sm'>
                        Since 1985
                    </span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                    className='text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif text-white mb-8 tracking-tight'
                >
                    Guardians of the <br />
                    <span className='italic text-[#d4a574]'>Ancient Path</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
                    className='text-lg sm:text-xl md:text-2xl text-white/70 leading-relaxed max-w-3xl mx-auto font-light'
                >
                    Bridging the gap between time-honored Himalayan traditions and modern wellness, bringing you nature's purest remedies.
                </motion.p>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                className='absolute bottom-10 left-[50vw] -translate-x-1/2 z-20 flex flex-col items-center justify-center'
            >
                <div className='hidden sm:block text-white/30 text-xs tracking-widest uppercase mb-2 pl-1'>Scroll</div>
                <div className='hidden sm:block w-[1px] h-12 bg-gradient-to-b from-[#d4a574] to-transparent'></div>
            </motion.div>
        </section>
    )
}

export default AboutHero
