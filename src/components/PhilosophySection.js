import React, { useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

const philosophyContent = [
    {
        title: "Origins",
        heading: "Born from the Earth",
        text: "Our journey begins where the air is thin and the earth is pure. High in the Himalayas, nature has preserved its most potent secrets for millennia. We don't just source ingredients; we honor the ancient soil that births them.",
        image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=60&w=1920&auto=format&fit=crop"
    },
    {
        title: "Ritual",
        heading: "The Art of Preparation",
        text: "True wellness is a slow process. We reject industrial shortcuts in favor of traditional methods—sun-drying, stone-grinding, and hand-blending. Every jar is a testament to patience, ensuring that the vital energy (Prana) of the herb remains intact.",
        image: "https://images.pexels.com/photos/5480239/pexels-photo-5480239.jpeg?auto=compress&cs=tinysrgb&h=1080&w=1920&fit=crop"
    },
    {
        title: "Harmony",
        heading: "Balance Within",
        text: "We believe the body is a microcosm of the universe. Our formulations are designed not just to treat symptoms, but to restore elemental balance. It is a dialogue between nature and your inner self, guiding you back to a state of wholeness.",
        image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=60&w=1920&auto=format&fit=crop"
    }
]

const PhilosophySection = () => {
    const containerRef = useRef(null)
    const sectionsRef = useRef([])

    // Implement GSAP Scroll Snapping
    useGSAP(() => {
        const sections = sectionsRef.current

        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: () => `+=${(sections.length - 1) * 100}%`,
                pin: true,
                scrub: 1, // Adds gentle smoothing to the scroll link
                snap: {
                    snapTo: 1 / (sections.length - 1),
                    duration: { min: 0.2, max: 0.5 },
                    delay: 0,
                    ease: "power1.inOut"
                }
            }
        });

        // Add each section slide-up animation sequentially to the master timeline
        sections.forEach((panel, i) => {
            if (i === 0) return; // First panel is already in position

            tl.fromTo(panel,
                { yPercent: 100 },
                {
                    yPercent: 0,
                    ease: "none"
                }
            );
        });

    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="relative bg-[#0f1c18] overflow-hidden h-screen w-full">
            {philosophyContent.map((item, index) => (
                <div
                    key={index}
                    ref={(el) => (sectionsRef.current[index] = el)}
                    className="absolute top-0 left-0 w-full h-screen flex items-center justify-center overflow-hidden philosophy-panel shadow-2xl bg-[#0f1c18]"
                    style={{ zIndex: index }}
                >
                    {/* Background Image */}
                    <div className="absolute inset-0 z-0">
                        <div className="absolute inset-0 bg-[#0f1c18]/40 z-10"></div>
                        <div className="absolute inset-0 bg-gradient-to-b from-[#0f1c18] via-transparent to-[#0f1c18] z-20"></div>
                        <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover opacity-60"
                            loading={index === 0 ? "eager" : "lazy"}
                            fetchPriority={index === 0 ? "high" : "auto"}
                        />
                    </div>

                    {/* Content Container */}
                    <div className="relative z-30 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full">
                        {/* Text Content - Alternating sides */}
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false, margin: "-20%" }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className={`space-y-8 ${index % 2 === 1 ? 'lg:col-start-2 lg:row-start-1' : ''}`}
                        >
                            <div className="flex items-center gap-4">
                                <span className="text-[#d4a574] font-serif text-lg italic">0{index + 1}</span>
                                <div className="h-[1px] w-12 bg-[#d4a574]/50"></div>
                                <span className="text-white/60 uppercase tracking-[0.3em] text-xs font-medium">{item.title}</span>
                            </div>

                            <h2 className="text-5xl md:text-7xl font-serif text-[#e8e6e3] leading-tight">
                                {item.heading}
                            </h2>

                            <p className="text-lg md:text-xl text-white/70 font-light leading-relaxed max-w-lg">
                                {item.text}
                            </p>
                        </motion.div>
                        <div className="hidden lg:block"></div>
                    </div>
                </div>
            ))}
        </section>
    )
}

export default PhilosophySection
