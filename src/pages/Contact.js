import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import { Mail, MapPin, Instagram, Twitter, Linkedin, Send, CalendarDays, Clock, Phone, Sparkles, CheckCircle2 } from 'lucide-react'
import { useCart } from '../context/CartContext'
import axios from 'axios'

const Contact = () => {
    const { user } = useCart()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    })

    // Pre-fill form with user details if logged in
    React.useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                name: user.name || '',
                email: user.email || ''
            }))
        }
    }, [user])
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [openFaqIndex, setOpenFaqIndex] = useState(null)

    // --- Schedule a Meeting state ---
    const [meetingData, setMeetingData] = useState({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        topic: '',
    })
    const [meetingSubmitting, setMeetingSubmitting] = useState(false)
    const [meetingSuccess, setMeetingSuccess] = useState(false)

    React.useEffect(() => {
        if (user) {
            setMeetingData(prev => ({
                ...prev,
                name: user.name || '',
                email: user.email || '',
            }))
        }
    }, [user])

    const handleMeetingChange = (e) => {
        setMeetingData({ ...meetingData, [e.target.name]: e.target.value })
    }

    const handleMeetingSubmit = async (e) => {
        e.preventDefault()
        setMeetingSubmitting(true)
        try {
            const res = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/contact/schedule-meeting`,
                meetingData
            )
            if (res.data.success) {
                setMeetingSuccess(true)
                toast.success('Your meeting has been scheduled! We will confirm shortly.')
                setMeetingData({
                    name: user?.name || '',
                    email: user?.email || '',
                    phone: '',
                    date: '',
                    time: '',
                    topic: '',
                })
                setTimeout(() => setMeetingSuccess(false), 5000)
            }
        } catch (err) {
            console.error('Schedule meeting error:', err)
            toast.error(err.response?.data?.message || 'Failed to schedule meeting. Please try again.')
        } finally {
            setMeetingSubmitting(false)
        }
    }
    const { scrollY } = useScroll()
    const y1 = useTransform(scrollY, [0, 500], [0, 200])

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/contact/submit`, formData)

            if (res.data.success) {
                toast.success('Your message has been received.')
                setFormData({
                    name: user?.name || '',
                    email: user?.email || '',
                    message: ''
                })
            }
        } catch (error) {
            console.error('Contact form error:', error)
            toast.error(error.response?.data?.message || 'Failed to send message. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    const toggleFaq = (index) => {
        setOpenFaqIndex(openFaqIndex === index ? null : index)
    }

    const faqData = [
        { q: "Origins of Ingredients", a: "Sourced directly from the untouched valleys of the Himalayas, ensuring absolute purity. Our gathering process respects ancient traditions and sustainable practices." },
        { q: "Shipping Globally", a: "We traverse borders. Shipping is available to most nations worldwide with express delivery options. Standard shipping takes 5-7 business days, while express delivery arrives in 2-3 days." },
        { q: "Purity Guarantee", a: "100% organic, tested, and verified. Nothing artificial enters our sanctuary. Each batch undergoes rigorous testing by third-party laboratories to ensure the highest quality standards." },
        { q: "Product Certifications", a: "All our products are certified organic, non-GMO, and cruelty-free. We hold certifications from leading international organic certification bodies." },
        { q: "Return Policy", a: "We offer a 30-day satisfaction guarantee. If you're not completely satisfied with your purchase, return it for a full refund or exchange. Products must be unopened and in original condition." },
        { q: "Consultation Services", a: "Free wellness consultations are available with every purchase. Our Ayurvedic practitioners can help you choose the right products for your specific needs and goals." },
        { q: "Wholesale Opportunities", a: "We partner with select retailers and wellness centers. Contact us for wholesale pricing and partnership opportunities. Minimum order quantities apply." }
    ]

    return (
        <div className='min-h-screen bg-[#0f1c18] text-[#e8e6e3] font-sans selection:bg-[#d4a574] selection:text-[#0f1c18] overflow-hidden'>
            <Navbar />

            {/* Grain Overlay */}
            <div className='fixed inset-0 pointer-events-none opacity-[0.03] z-50 bg-[url("https://grainy-gradients.vercel.app/noise.svg")]'></div>

            {/* Immersive Hero */}
            <section className='relative h-screen flex items-center justify-center overflow-hidden'>
                <div className='absolute inset-0 z-0'>
                    <div className='absolute inset-0 bg-gradient-to-b from-[#0f1c18]/30 via-[#0f1c18]/60 to-[#0f1c18] z-10'></div>
                    <motion.div style={{ y: y1 }} className='absolute inset-0'>
                        {/* Placeholder for a high-quality, dark, moody nature image */}
                        <img
                            src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=60&w=1920&auto=format&fit=crop"
                            alt="Misty Forest"
                            className="w-full h-full object-cover opacity-60 scale-110"
                            loading="eager"
                            fetchPriority="high"
                        />
                    </motion.div>
                </div>

                <div className='relative z-20 text-center px-4 max-w-4xl mx-auto'>
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                    >
                        <div className='mb-6'>
                            <span className='inline-block text-[#d4a574] text-sm tracking-[0.3em] uppercase border border-[#d4a574]/30 px-5 py-2 rounded-full backdrop-blur-sm'>
                                The Sanctuary
                            </span>
                        </div>
                        <h1 className='text-5xl md:text-7xl lg:text-8xl font-serif font-light tracking-tight mb-8 text-white'>
                            Connection
                        </h1>
                        <p className='text-lg md:text-xl text-white/70 font-light max-w-xl mx-auto leading-relaxed'>
                            We invite you to pause, breathe, and reach out. Whether for guidance or simply to share your journey, our doors are open.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Main Content Area - Editorial Layout */}
            <div className='relative z-10 py-20 lg:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto'>

                {/* Rotating Golden Orb Halo */}
                <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-gradient-to-r from-[#d4a574]/10 via-[#8c6a46]/5 to-transparent rounded-full blur-[120px] animate-spin-slow pointer-events-none z-0'></div>

                {/* Editorial Card Component */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className='relative z-10'
                >
                    {/* Card Container */}
                    <div className='relative bg-[#0f1c18]/60 backdrop-blur-2xl border border-white/5 rounded-3xl overflow-hidden shadow-2xl'>
                        {/* Internal Grain Texture */}
                        <div className='absolute inset-0 opacity-[0.05] pointer-events-none bg-[url("https://grainy-gradients.vercel.app/noise.svg")] z-0'></div>

                        {/* Decorative Top Line */}
                        <div className='absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#d4a574]/50 to-transparent z-10'></div>

                        <div className='grid lg:grid-cols-12 min-h-[600px] relative z-10'>

                            {/* LEFT COLUMN: Context & Info (Span 5) */}
                            <div className='lg:col-span-5 p-6 lg:p-16 flex flex-col justify-between relative border-b lg:border-b-0 lg:border-r border-white/5 bg-white/[0.01]'>
                                <div>
                                    <span className='inline-block text-[#d4a574] text-[10px] lg:text-xs tracking-[0.3em] uppercase mb-4 lg:mb-6 border border-[#d4a574]/30 px-3 lg:px-4 py-1.5 lg:py-2 rounded-full'>Contact</span>
                                    <h2 className='text-3xl md:text-5xl font-serif text-white mb-4 lg:mb-6 leading-tight'>
                                        Start a <br /> Conversation
                                    </h2>
                                    <p className='text-sm lg:text-base text-white/60 font-light leading-relaxed max-w-md'>
                                        Whether you seek guidance on our elixirs or wish to share your journey, our sanctuary is open.
                                    </p>
                                </div>

                                <div className='mt-12 space-y-8'>
                                    <div className='flex items-start space-x-4 group'>
                                        <div className='p-3 rounded-full bg-white/5 border border-white/10 group-hover:border-[#d4a574]/40 transition-colors'>
                                            <MapPin className="w-5 h-5 text-white/70 group-hover:text-[#d4a574] transition-colors" />
                                        </div>
                                        <div>
                                            <h4 className='text-white text-sm font-medium uppercase tracking-widest mb-1'>Studio</h4>
                                            <p className='text-white/50 text-sm font-light'>123 Wellness Way, Himalaya City</p>
                                        </div>
                                    </div>

                                    <div className='flex items-start space-x-4 group'>
                                        <div className='p-3 rounded-full bg-white/5 border border-white/10 group-hover:border-[#d4a574]/40 transition-colors'>
                                            <Mail className="w-5 h-5 text-white/70 group-hover:text-[#d4a574] transition-colors" />
                                        </div>
                                        <div>
                                            <h4 className='text-white text-sm font-medium uppercase tracking-widest mb-1'>Digital</h4>
                                            <p className='text-white/50 text-sm font-light'>support@ancienthealth.com</p>
                                        </div>
                                    </div>
                                </div>

                                <div className='mt-8 lg:mt-12 pt-6 lg:pt-8 border-t border-white/10'>
                                    <div className='flex space-x-6'>
                                        <button className='text-white/40 hover:text-[#d4a574] transition-colors'><Instagram className="w-4 h-4 lg:w-5 lg:h-5" /></button>
                                        <button className='text-white/40 hover:text-[#d4a574] transition-colors'><Twitter className="w-4 h-4 lg:w-5 lg:h-5" /></button>
                                        <button className='text-white/40 hover:text-[#d4a574] transition-colors'><Linkedin className="w-4 h-4 lg:w-5 lg:h-5" /></button>
                                    </div>
                                </div>
                            </div>

                            {/* RIGHT COLUMN: The Form (Span 7) */}
                            <div className='lg:col-span-7 p-6 lg:p-16 flex flex-col justify-center bg-gradient-to-br from-white/[0.02] to-white/[0.05]'>
                                <form onSubmit={handleSubmit} className='space-y-4 lg:space-y-8'>
                                    {/* Name & Email Row */}
                                    <div className='grid md:grid-cols-2 gap-4 lg:gap-6'>
                                        {/* Name Field */}
                                        <div className='group relative'>
                                            <input
                                                type='text'
                                                name='name'
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                className='block w-full bg-white/[0.03] border border-white/10 rounded-2xl px-4 lg:px-5 py-3 lg:py-4 pt-5 lg:pt-6 text-sm lg:text-base text-white placeholder-transparent focus:border-[#d4a574]/50 focus:bg-white/[0.05] focus:outline-none focus:ring-2 focus:ring-[#d4a574]/20 transition-all duration-300 peer'
                                                placeholder='Full Name'
                                            />
                                            <label className='absolute left-4 lg:left-5 top-3 lg:top-4 text-white/40 text-sm lg:text-base transition-all duration-200 peer-placeholder-shown:top-3 peer-placeholder-shown:lg:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:lg:text-base peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:text-[#d4a574] peer-focus:tracking-wider peer-valid:top-1.5 peer-valid:text-[10px] peer-valid:text-[#d4a574]/70 peer-valid:tracking-wider pointer-events-none uppercase'>
                                                Full Name
                                            </label>
                                        </div>

                                        {/* Email Field */}
                                        <div className='group relative'>
                                            <input
                                                type='email'
                                                name='email'
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                className='block w-full bg-white/[0.03] border border-white/10 rounded-2xl px-4 lg:px-5 py-3 lg:py-4 pt-5 lg:pt-6 text-sm lg:text-base text-white placeholder-transparent focus:border-[#d4a574]/50 focus:bg-white/[0.05] focus:outline-none focus:ring-2 focus:ring-[#d4a574]/20 transition-all duration-300 peer'
                                                placeholder='Email Address'
                                            />
                                            <label className='absolute left-4 lg:left-5 top-3 lg:top-4 text-white/40 text-sm lg:text-base transition-all duration-200 peer-placeholder-shown:top-3 peer-placeholder-shown:lg:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:lg:text-base peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:text-[#d4a574] peer-focus:tracking-wider peer-valid:top-1.5 peer-valid:text-[10px] peer-valid:text-[#d4a574]/70 peer-valid:tracking-wider pointer-events-none uppercase'>
                                                Email Address
                                            </label>
                                        </div>
                                    </div>

                                    {/* Message Field */}
                                    <div className='group relative'>
                                        <textarea
                                            name='message'
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            rows='5'
                                            className='block w-full bg-white/[0.03] border border-white/10 rounded-2xl px-4 lg:px-5 py-3 lg:py-4 pt-5 lg:pt-6 text-sm lg:text-base text-white placeholder-transparent focus:border-[#d4a574]/50 focus:bg-white/[0.05] focus:outline-none focus:ring-2 focus:ring-[#d4a574]/20 transition-all duration-300 resize-none peer'
                                            placeholder='Type your query'
                                        ></textarea>
                                        <label className='absolute left-4 lg:left-5 top-3 lg:top-4 text-white/40 text-sm lg:text-base transition-all duration-200 peer-placeholder-shown:top-3 peer-placeholder-shown:lg:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:lg:text-base peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:text-[#d4a574] peer-focus:tracking-wider peer-valid:top-1.5 peer-valid:text-[10px] peer-valid:text-[#d4a574]/70 peer-valid:tracking-wider pointer-events-none uppercase'>
                                            Type your query
                                        </label>
                                        {/* Character hint */}
                                        <div className='mt-1.5 lg:mt-2 text-right'>
                                            <span className='text-[10px] lg:text-xs text-white/30'>{formData.message.length} characters</span>
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <div className='pt-2'>
                                        <button
                                            type='submit'
                                            disabled={isSubmitting}
                                            className='group relative w-full bg-transparent overflow-hidden rounded-full transition-all duration-300 transform hover:scale-105 border border-[#d4a574]/30 disabled:opacity-50 disabled:cursor-not-allowed'
                                        >
                                            {/* Sliding Background */}
                                            <div className='absolute inset-0 w-0 bg-[#d4a574] transition-all duration-[700ms] ease-out group-hover:w-full opacity-90'></div>

                                            {/* Content */}
                                            <span className='relative z-10 flex items-center justify-center space-x-3 px-6 lg:px-10 py-3 lg:py-4'>
                                                <span className='uppercase tracking-[0.2em] text-[10px] lg:text-xs font-serif text-[#d4a574] group-hover:text-[#0f1c18] transition-colors duration-500'>
                                                    {isSubmitting ? 'Sending...' : 'Send Message'}
                                                </span>
                                                <Send className="w-3 h-3 lg:w-4 lg:h-4 text-[#d4a574] group-hover:text-[#0f1c18] transition-all duration-500 transform group-hover:translate-x-1" />
                                            </span>
                                        </button>

                                        {/* Additional Info */}
                                        <p className='text-center text-[10px] lg:text-xs text-white/40 mt-3 lg:mt-4 font-light'>
                                            By submitting, you agree to our communication terms
                                        </p>
                                    </div>

                                    {/* Info Cards (Moved below submit for mobile UX) */}
                                    <div className='grid md:grid-cols-2 gap-3 lg:gap-4 pt-4 border-t border-white/5'>
                                        <div className='flex items-start gap-3 p-3 lg:p-4 bg-white/[0.02] border border-white/5 rounded-xl'>
                                            <div className='mt-0.5'>
                                                <svg className='w-4 h-4 lg:w-5 lg:h-5 text-[#d4a574]' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' />
                                                </svg>
                                            </div>
                                            <div>
                                                <h4 className='text-white text-xs lg:text-sm font-medium mb-0.5 lg:mb-1'>Response Time</h4>
                                                <p className='text-white/50 text-[10px] lg:text-xs font-light'>We typically respond within 24 hours</p>
                                            </div>
                                        </div>

                                        <div className='flex items-start gap-3 p-3 lg:p-4 bg-white/[0.02] border border-white/5 rounded-xl'>
                                            <div className='mt-0.5'>
                                                <svg className='w-4 h-4 lg:w-5 lg:h-5 text-[#d4a574]' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' />
                                                </svg>
                                            </div>
                                            <div>
                                                <h4 className='text-white text-xs lg:text-sm font-medium mb-0.5 lg:mb-1'>Privacy First</h4>
                                                <p className='text-white/50 text-[10px] lg:text-xs font-light'>Your data is encrypted and secure</p>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* ═══════════════════════════════════════════
                 SCHEDULE A CONSULTATION SECTION
            ═══════════════════════════════════════════ */}
            <div className='relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto'>

                {/* Section glow */}
                <div className='absolute inset-0 pointer-events-none overflow-hidden'>
                    <div className='absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#d4a574]/5 rounded-full blur-[100px]' />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className='relative z-10'
                >
                    {/* Section Label */}
                    <div className='text-center mb-14'>
                        <span className='inline-flex items-center gap-2 text-[#d4a574] text-[11px] tracking-[0.3em] uppercase border border-[#d4a574]/30 px-5 py-2 rounded-full mb-5'>
                            <Sparkles className='w-3 h-3' />
                            Book a Session
                        </span>
                        <h2 className='text-4xl md:text-5xl font-serif text-white mt-4 mb-4'>Schedule a Consultation</h2>
                        <p className='text-white/50 max-w-lg mx-auto text-sm leading-relaxed font-light'>
                            Reserve a dedicated time with our Ayurvedic practitioners. Choose a date and time that suits you — we will confirm within 24 hours.
                        </p>
                    </div>

                    {/* Card */}
                    <div className='relative bg-[#0f1c18]/60 backdrop-blur-2xl border border-white/8 rounded-3xl overflow-hidden shadow-2xl'>
                        {/* Top shimmer */}
                        <div className='absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#d4a574]/50 to-transparent' />
                        <div className='absolute inset-0 opacity-[0.03] pointer-events-none bg-[url("https://grainy-gradients.vercel.app/noise.svg")]' />

                        <div className='grid lg:grid-cols-12 relative z-10'>

                            {/* LEFT PANEL — Decorative */}
                            <div className='lg:col-span-4 p-8 lg:p-12 flex flex-col justify-between bg-gradient-to-br from-[#d4a574]/10 to-transparent border-b lg:border-b-0 lg:border-r border-white/5'>
                                <div>
                                    <div className='w-14 h-14 rounded-2xl bg-[#d4a574]/10 border border-[#d4a574]/20 flex items-center justify-center mb-6'>
                                        <CalendarDays className='w-6 h-6 text-[#d4a574]' />
                                    </div>
                                    <h3 className='text-2xl font-serif text-white mb-3'>Book Your Time</h3>
                                    <p className='text-white/50 text-sm leading-relaxed font-light'>
                                        Each consultation is a sacred dialogue — tailored to your unique wellness journey.
                                    </p>
                                </div>

                                <div className='mt-10 space-y-5'>
                                    {[
                                        { icon: Clock, label: '45-min sessions', sub: 'In-depth wellness review' },
                                        { icon: CalendarDays, label: 'Mon – Sat', sub: '9:00 AM – 6:00 PM IST' },
                                        { icon: Mail, label: 'Confirmation email', sub: 'Sent within 24 hours' },
                                    ].map(({ icon: Icon, label, sub }) => (
                                        <div key={label} className='flex items-start gap-3 group'>
                                            <div className='p-2 rounded-xl bg-white/5 border border-white/8 group-hover:border-[#d4a574]/30 transition-colors mt-0.5'>
                                                <Icon className='w-4 h-4 text-[#d4a574]' />
                                            </div>
                                            <div>
                                                <p className='text-white/80 text-sm font-medium'>{label}</p>
                                                <p className='text-white/40 text-xs'>{sub}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* RIGHT PANEL — Form */}
                            <div className='lg:col-span-8 p-8 lg:p-12'>
                                <AnimatePresence mode='wait'>
                                    {meetingSuccess ? (
                                        <motion.div
                                            key='success'
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0 }}
                                            className='flex flex-col items-center justify-center h-full min-h-[320px] text-center gap-4'
                                        >
                                            <div className='w-20 h-20 rounded-full bg-[#d4a574]/10 border border-[#d4a574]/30 flex items-center justify-center'>
                                                <CheckCircle2 className='w-9 h-9 text-[#d4a574]' />
                                            </div>
                                            <h3 className='text-2xl font-serif text-white'>Meeting Scheduled!</h3>
                                            <p className='text-white/50 text-sm max-w-sm leading-relaxed'>
                                                Thank you. We have received your request and will send a confirmation to your email within 24 hours.
                                            </p>
                                            <button
                                                onClick={() => setMeetingSuccess(false)}
                                                className='mt-2 text-[#d4a574] text-sm border border-[#d4a574]/30 px-6 py-2 rounded-full hover:bg-[#d4a574]/10 transition-colors'
                                            >
                                                Schedule Another
                                            </button>
                                        </motion.div>
                                    ) : (
                                        <motion.form
                                            key='form'
                                            onSubmit={handleMeetingSubmit}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className='space-y-5'
                                        >
                                            {/* Row 1: Name + Email */}
                                            <div className='grid md:grid-cols-2 gap-5'>
                                                <div className='group relative'>
                                                    <input
                                                        type='text'
                                                        name='name'
                                                        value={meetingData.name}
                                                        onChange={handleMeetingChange}
                                                        required
                                                        placeholder='Full Name'
                                                        className='block w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 pt-6 text-sm text-white placeholder-transparent focus:border-[#d4a574]/50 focus:bg-white/[0.05] focus:outline-none focus:ring-2 focus:ring-[#d4a574]/20 transition-all peer'
                                                    />
                                                    <label className='absolute left-5 top-4 text-white/40 text-sm transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:text-[#d4a574] peer-focus:tracking-wider peer-valid:top-1.5 peer-valid:text-[10px] peer-valid:text-[#d4a574]/70 peer-valid:tracking-wider pointer-events-none uppercase'>Full Name</label>
                                                </div>
                                                <div className='group relative'>
                                                    <input
                                                        type='email'
                                                        name='email'
                                                        value={meetingData.email}
                                                        onChange={handleMeetingChange}
                                                        required
                                                        placeholder='Email Address'
                                                        className='block w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 pt-6 text-sm text-white placeholder-transparent focus:border-[#d4a574]/50 focus:bg-white/[0.05] focus:outline-none focus:ring-2 focus:ring-[#d4a574]/20 transition-all peer'
                                                    />
                                                    <label className='absolute left-5 top-4 text-white/40 text-sm transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:text-[#d4a574] peer-focus:tracking-wider peer-valid:top-1.5 peer-valid:text-[10px] peer-valid:text-[#d4a574]/70 peer-valid:tracking-wider pointer-events-none uppercase'>Email</label>
                                                </div>
                                            </div>

                                            {/* Row 2: Phone */}
                                            <div className='group relative'>
                                                <div className='absolute left-5 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none'>
                                                    <Phone className='w-4 h-4' />
                                                </div>
                                                <input
                                                    type='tel'
                                                    name='phone'
                                                    value={meetingData.phone}
                                                    onChange={handleMeetingChange}
                                                    placeholder='Phone Number (optional)'
                                                    className='block w-full bg-white/[0.03] border border-white/10 rounded-2xl pl-11 pr-5 py-4 text-sm text-white placeholder-white/25 focus:border-[#d4a574]/50 focus:bg-white/[0.05] focus:outline-none focus:ring-2 focus:ring-[#d4a574]/20 transition-all'
                                                />
                                            </div>

                                            {/* Row 3: Date + Time */}
                                            <div className='grid md:grid-cols-2 gap-5'>
                                                {/* Date Picker */}
                                                <div className='group relative'>
                                                    <div className='absolute left-5 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none'>
                                                        <CalendarDays className='w-4 h-4' />
                                                    </div>
                                                    <input
                                                        type='date'
                                                        name='date'
                                                        value={meetingData.date}
                                                        onChange={handleMeetingChange}
                                                        required
                                                        min={new Date().toISOString().split('T')[0]}
                                                        className='block w-full bg-white/[0.03] border border-white/10 rounded-2xl pl-11 pr-5 py-4 text-sm text-white/80 focus:border-[#d4a574]/50 focus:bg-white/[0.05] focus:outline-none focus:ring-2 focus:ring-[#d4a574]/20 transition-all [color-scheme:dark] cursor-pointer'
                                                    />
                                                </div>

                                                {/* Time Slots */}
                                                <div className='group relative'>
                                                    <div className='absolute left-5 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none'>
                                                        <Clock className='w-4 h-4' />
                                                    </div>
                                                    <select
                                                        name='time'
                                                        value={meetingData.time}
                                                        onChange={handleMeetingChange}
                                                        required
                                                        className='block w-full bg-[#0f1c18] border border-white/10 rounded-2xl pl-11 pr-5 py-4 text-sm text-white/80 focus:border-[#d4a574]/50 focus:outline-none focus:ring-2 focus:ring-[#d4a574]/20 transition-all cursor-pointer appearance-none'
                                                    >
                                                        <option value='' disabled>Select a time</option>
                                                        {['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
                                                            '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
                                                            '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM', '6:00 PM'
                                                        ].map(t => (
                                                            <option key={t} value={t}>{t}</option>
                                                        ))}
                                                    </select>
                                                    <div className='absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/30'>
                                                        <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' /></svg>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Row 4: Topic / Notes */}
                                            <div className='group relative'>
                                                <textarea
                                                    name='topic'
                                                    value={meetingData.topic}
                                                    onChange={handleMeetingChange}
                                                    rows='3'
                                                    placeholder='What would you like to discuss? (optional)'
                                                    className='block w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-sm text-white placeholder-white/25 focus:border-[#d4a574]/50 focus:bg-white/[0.05] focus:outline-none focus:ring-2 focus:ring-[#d4a574]/20 transition-all resize-none'
                                                />
                                            </div>

                                            {/* Submit */}
                                            <button
                                                type='submit'
                                                disabled={meetingSubmitting}
                                                className='group relative w-full overflow-hidden rounded-full transition-all duration-300 transform hover:scale-[1.02] border border-[#d4a574]/40 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100'
                                            >
                                                <div className='absolute inset-0 w-0 bg-[#d4a574] transition-all duration-700 ease-out group-hover:w-full opacity-90' />
                                                <span className='relative z-10 flex items-center justify-center gap-3 px-10 py-4'>
                                                    {meetingSubmitting ? (
                                                        <>
                                                            <svg className='animate-spin w-4 h-4 text-[#d4a574] group-hover:text-[#0f1c18]' fill='none' viewBox='0 0 24 24'><circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' /><path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8v8z' /></svg>
                                                            <span className='uppercase tracking-[0.2em] text-xs font-serif text-[#d4a574] group-hover:text-[#0f1c18] transition-colors duration-500'>Scheduling...</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <CalendarDays className='w-4 h-4 text-[#d4a574] group-hover:text-[#0f1c18] transition-colors duration-500' />
                                                            <span className='uppercase tracking-[0.2em] text-xs font-serif text-[#d4a574] group-hover:text-[#0f1c18] transition-colors duration-500'>Confirm Consultation</span>
                                                        </>
                                                    )}
                                                </span>
                                            </button>

                                            <p className='text-center text-[10px] text-white/30 font-light'>
                                                We will confirm your booking via email within 24 hours
                                            </p>
                                        </motion.form>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Aesthetic FAQ Divider */}
            <div className='w-full h-[1px] bg-white/10 max-w-7xl mx-auto'></div>

            {/* Minimalist FAQ */}
            <section className='py-20 lg:py-32 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto'>
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className='mb-16'
                >
                    <h2 className='text-3xl md:text-4xl font-serif text-white text-center'>Common Queries</h2>
                </motion.div>

                <div className='space-y-0'>
                    {faqData.map((item, i) => (
                        <motion.div
                            key={i}
                            className='border-b border-white/10'
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                        >
                            <button
                                onClick={() => toggleFaq(i)}
                                className='w-full flex justify-between items-center py-8 cursor-pointer text-left group'
                            >
                                <span className='text-xl text-white/80 font-light group-hover:text-[#d4a574] transition-colors'>{item.q}</span>
                                <motion.span
                                    animate={{ rotate: openFaqIndex === i ? 45 : 0 }}
                                    transition={{ duration: 0.3 }}
                                    className='text-white/40 group-hover:text-[#d4a574] transition-colors text-2xl font-thin'
                                >
                                    +
                                </motion.span>
                            </button>

                            <AnimatePresence initial={false}>
                                {openFaqIndex === i && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                                        className='overflow-hidden'
                                    >
                                        <div className='pb-8 text-white/50 leading-relaxed font-light pr-8'>
                                            {item.a}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </section>

            <Footer />
        </div>
    )
}

export default Contact
