import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import { motion } from 'framer-motion'
import { Mail, MapPin, ArrowRight, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react'

const Footer = () => {
    return (
        <footer className='relative bg-[#0f1c18] text-[#e8e6e3] overflow-hidden pt-20 pb-10'>
            {/* Grain Overlay */}
            <div className='absolute inset-0 pointer-events-none opacity-[0.03] z-0 bg-[url("https://grainy-gradients.vercel.app/noise.svg")]'></div>

            {/* Subtle Background Elements - Optimized Blur */}
            <div className='absolute inset-0 z-0 pointer-events-none overflow-hidden'>
                <div className='absolute -top-[10%] -left-[10%] w-[600px] h-[600px] bg-[#2d5f4f]/10 rounded-full blur-[100px] opacity-20'></div>
                <div className='absolute -bottom-[10%] -right-[10%] w-[500px] h-[500px] bg-[#d4a574]/5 rounded-full blur-[100px] opacity-20'></div>
            </div>

            {/* Elegant Top Border */}
            <div className='absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#d4a574]/30 to-transparent'></div>

            <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16'>
                    {/* Brand Column */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ duration: 0.6 }}
                        className='lg:col-span-4 will-change-transform'
                    >
                        <Link to='/' className='inline-block mb-4 group'>
                            <img src={logo} alt='Ancient Health' className='h-20 w-auto opacity-90 group-hover:opacity-100 transition-opacity duration-300' />
                        </Link>
                        <p className='text-white/60 text-base leading-relaxed mb-8 max-w-sm font-light'>
                            Honoring the wisdom of the Himalayas. We bridge ancient traditions with modern wellness to bring you pure, ethically sourced botanicals.
                        </p>

                        <div className='space-y-4'>
                            <p className='text-[#d4a574] text-xs uppercase tracking-[0.2em] font-serif'>Join Our Circle</p>
                            <div className='flex items-center space-x-3'>
                                <a
                                    href='https://facebook.com'
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className='group relative w-10 h-10 bg-white/5 rounded-full flex items-center justify-center border border-white/10 hover:border-[#d4a574]/50 hover:bg-[#d4a574]/10 transition-all duration-300'
                                >
                                    <span className='sr-only'>Facebook</span>
                                    <Facebook className='w-4 h-4 text-white/60 group-hover:text-[#d4a574] transition-colors' />
                                </a>
                                <a
                                    href='https://instagram.com'
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className='group relative w-10 h-10 bg-white/5 rounded-full flex items-center justify-center border border-white/10 hover:border-[#d4a574]/50 hover:bg-[#d4a574]/10 transition-all duration-300'
                                >
                                    <span className='sr-only'>Instagram</span>
                                    <Instagram className='w-4 h-4 text-white/60 group-hover:text-[#d4a574] transition-colors' />
                                </a>
                                <a
                                    href='https://twitter.com'
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className='group relative w-10 h-10 bg-white/5 rounded-full flex items-center justify-center border border-white/10 hover:border-[#d4a574]/50 hover:bg-[#d4a574]/10 transition-all duration-300'
                                >
                                    <span className='sr-only'>Twitter</span>
                                    <Twitter className='w-4 h-4 text-white/60 group-hover:text-[#d4a574] transition-colors' />
                                </a>
                                <a
                                    href='https://linkedin.com'
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className='group relative w-10 h-10 bg-white/5 rounded-full flex items-center justify-center border border-white/10 hover:border-[#d4a574]/50 hover:bg-[#d4a574]/10 transition-all duration-300'
                                >
                                    <span className='sr-only'>LinkedIn</span>
                                    <Linkedin className='w-4 h-4 text-white/60 group-hover:text-[#d4a574] transition-colors' />
                                </a>
                            </div>
                        </div>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className='lg:col-span-2 will-change-transform'
                    >
                        <h3 className='text-white font-serif text-lg mb-6'>Explore</h3>
                        <ul className='space-y-4'>
                            {[
                                { name: 'Shop All', path: '/shop' },
                                { name: 'Our Story', path: '/about' },
                                { name: 'Wellness Journal', path: '/blog' },
                                { name: 'Contact', path: '/contact' }
                            ].map((link) => (
                                <li key={link.name}>
                                    <Link to={link.path} className='text-white/60 hover:text-[#d4a574] text-sm transition-colors duration-300 flex items-center group'>
                                        <ArrowRight className="w-3 h-3 mr-2 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-[#d4a574]" />
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Support */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className='lg:col-span-3 will-change-transform'
                    >
                        <h3 className='text-white font-serif text-lg mb-6'>Support</h3>
                        <ul className='space-y-4'>
                            {[
                                { name: 'FAQ', path: '/faq' },
                                { name: 'Shipping & Returns', path: '/shipping' },
                                { name: 'Track Order', path: '/track' },
                                { name: 'Terms of Service', path: '/terms' }
                            ].map((link) => (
                                <li key={link.name}>
                                    <Link to={link.path} className='text-white/60 hover:text-[#d4a574] text-sm transition-colors duration-300 flex items-center group'>
                                        <ArrowRight className="w-3 h-3 mr-2 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-[#d4a574]" />
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className='lg:col-span-3 will-change-transform'
                    >
                        <h3 className='text-white font-serif text-lg mb-6'>Contact</h3>
                        <ul className='space-y-6'>
                            <li className='flex items-start space-x-4'>
                                <MapPin className="w-5 h-5 text-[#d4a574] mt-1 shrink-0" />
                                <div>
                                    <p className='text-white/90 text-sm font-medium mb-1'>Sanctuary</p>
                                    <p className='text-white/50 text-sm font-light'>Himalayan Region, India</p>
                                </div>
                            </li>
                            <li className='flex items-start space-x-4'>
                                <Mail className="w-5 h-5 text-[#d4a574] mt-1 shrink-0" />
                                <div>
                                    <p className='text-white/90 text-sm font-medium mb-1'>Inquiries</p>
                                    <a href='mailto:hello@ancienthealth.com' className='text-white/50 hover:text-[#d4a574] text-sm font-light transition-colors'>
                                        hello@ancienthealth.com
                                    </a>
                                </div>
                            </li>
                        </ul>
                    </motion.div>
                </div>

                {/* Bottom Bar */}
                <div className='border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-6'>
                    <p className='text-white/30 text-xs font-light tracking-wide'>
                        © {new Date().getFullYear()} Ancient Health. All rights reserved.
                    </p>
                    <div className='flex items-center space-x-6'>
                        <span className='flex items-center space-x-2 text-white/30 text-xs font-light'>
                            <div className='w-1.5 h-1.5 rounded-full bg-[#2d5f4f]'></div>
                            <span>Secure Payment</span>
                        </span>
                        <span className='flex items-center space-x-2 text-white/30 text-xs font-light'>
                            <div className='w-1.5 h-1.5 rounded-full bg-[#d4a574]'></div>
                            <span>Ethically Sourced</span>
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
