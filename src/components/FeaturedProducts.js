import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Star } from 'lucide-react'
import { stripHtml } from '../utils/textUtils'
import { formatPrice } from '../utils/formatPrice'
import { useCart } from '../context/CartContext'
import { toast } from 'react-toastify'
const FeaturedProducts = () => {
    const navigate = useNavigate()
    const { addToCart } = useCart()
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const handleAddToCart = async (product) => {
        const success = await addToCart(product._id, 1)
        if (success) {
            toast.success(
                <div
                    onClick={() => navigate('/cart')}
                    className="flex items-center justify-between gap-4 cursor-pointer group"
                >
                    <div className="flex flex-col">
                        <span className="font-serif text-[#1e4035] font-bold text-sm">{product.title}</span>
                        <span className="text-xs text-[#2d5f4f]/80">Added to your cart</span>
                    </div>

                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#2d5f4f]/10 group-hover:bg-[#2d5f4f] transition-colors duration-300">
                        <svg className="w-4 h-4 text-[#2d5f4f] group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </div>
                </div>,
                {
                    icon: "🌿",
                    style: {
                        background: '#ffffff',
                        border: '1px solid rgba(45, 95, 79, 0.15)',
                        borderRadius: '12px',
                        boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
                        padding: '16px',
                        cursor: 'pointer'
                    },
                    progressStyle: {
                        background: 'linear-gradient(to right, #2d5f4f, #1e4035)',
                        height: '3px'
                    },
                    onClick: () => navigate('/cart')
                }
            )
        }
    }

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Fetch latest 4 products
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/products?limit=4&sort=-createdAt`)
                const data = await response.json()

                if (data.success) {
                    setProducts(data.data)
                } else {
                    setError('Failed to load featured products')
                }
            } catch (err) {
                console.error('Error fetching featured products:', err)
                setError('Failed to load products')
            } finally {
                setLoading(false)
            }
        }

        fetchProducts()
    }, [])

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1 // Stagger faster for better perceived performance
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 30 }, // Reduced travel distance
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    }

    return (
        <section className='relative py-20 lg:py-32 bg-[#0f1c18] text-[#e8e6e3] overflow-hidden'>
            {/* Grain Overlay */}
            <div className='absolute inset-0 pointer-events-none opacity-[0.03] z-50 bg-[url("https://grainy-gradients.vercel.app/noise.svg")]'></div>

            {/* Decorative background elements - Static */}
            <div className='absolute top-0 left-0 w-[500px] h-[500px] bg-[#d4a574]/10 rounded-full blur-[100px] pointer-events-none'></div>
            <div className='absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#2d5f4f]/10 rounded-full blur-[100px] pointer-events-none'></div>

            <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 0.6 }}
                    className='text-center mb-20 will-change-transform'
                >
                    <div className='inline-block mb-4'>
                        <span className='text-sm font-serif tracking-[0.2em] text-[#d4a574] uppercase border border-[#d4a574]/30 px-4 py-2 rounded-full'>
                            Treasury
                        </span>
                    </div>
                    <h2 className='text-4xl sm:text-5xl lg:text-7xl font-serif font-light text-white mb-6'>
                        Curated <span className='italic text-[#d4a574]'>Elixirs</span>
                    </h2>
                    <p className='text-lg text-white/60 max-w-2xl mx-auto leading-relaxed font-light'>
                        Discover our most revered wellness essentials, harvested with reverence from the pristine Himalayas.
                    </p>
                </motion.div>

                {/* Products Grid */}
                {loading ? (
                    <div className='flex justify-center items-center h-64'>
                        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#d4a574]'></div>
                    </div>
                ) : error ? (
                    <div className='text-center text-red-400 py-10'>
                        <p>{error}</p>
                    </div>
                ) : (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-10%" }}
                        className='grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-10 mb-20'
                    >
                        {products.map((product) => (
                            <motion.div
                                variants={itemVariants}
                                key={product._id}
                                className='group relative bg-[#162923]/40 backdrop-blur-md rounded-2xl lg:rounded-[2rem] overflow-hidden border border-white/5 md:hover:border-[#d4a574]/30 transition-all duration-300 will-change-transform md:hover:transform md:hover:-translate-y-2'
                            >
                                {/* Badge */}
                                {product.offer > 0 && (
                                    <div className='absolute top-2 right-2 lg:top-4 lg:right-4 z-20'>
                                        <span className='inline-flex items-center space-x-1 px-2 py-0.5 lg:px-3 lg:py-1 bg-[#d4a574] text-[#0f1c18] text-[8px] lg:text-[10px] font-bold uppercase tracking-wider rounded-full shadow-sm lg:shadow-lg'>
                                            <Star className="w-2 h-2 lg:w-3 lg:h-3 fill-current" />
                                            <span>{product.offer}% OFF</span>
                                        </span>
                                    </div>
                                )}

                                {/* Product Image Area */}
                                <div className='relative aspect-[4/5] p-3 lg:p-8 overflow-hidden bg-gradient-to-b from-white/5 to-transparent'>
                                    <div className='absolute inset-0 bg-gradient-to-b from-[#0f1c18]/0 via-[#0f1c18]/0 to-[#0f1c18]/80 z-10'></div>

                                    {product.images && product.images.length > 0 ? (
                                        <img
                                            src={product.images[0].url}
                                            alt={product.title}
                                            className='relative w-full h-full object-contain filter drop-shadow-2xl md:group-hover:scale-105 transition-transform duration-500 will-change-transform z-0'
                                        />
                                    ) : (
                                        <div className='w-full h-full flex items-center justify-center bg-white/5 rounded-2xl'>
                                            <span className='text-white/20'>No Image</span>
                                        </div>
                                    )}

                                    {/* Quick Add Button Overlay */}
                                    <div className='absolute bottom-3 lg:bottom-6 left-1/2 -translate-x-1/2 z-20 translate-y-20 opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-all duration-300'>
                                        <Link to={`/products/${product._id}`} className='px-4 py-2 lg:px-6 lg:py-3 bg-[#d4a574] text-[#0f1c18] text-[10px] lg:text-xs font-bold uppercase tracking-widest rounded-full hover:bg-white transition-colors shadow-lg whitespace-nowrap inline-block'>
                                            View Details
                                        </Link>
                                    </div>
                                </div>

                                {/* Product Info */}
                                <div className='p-3 pt-0 lg:p-6 lg:pt-0 relative z-20'>
                                    <h3 className='text-sm lg:text-lg font-serif text-white mb-1 lg:mb-2 md:group-hover:text-[#d4a574] transition-colors line-clamp-1'>
                                        {product.title}
                                    </h3>
                                    <p className='hidden lg:block text-white/40 text-xs mb-4 leading-relaxed line-clamp-2 h-8'>
                                        {stripHtml(product.description) || 'Premium Himalayan wellness product.'}
                                    </p>
                                    <div className='flex items-center justify-between border-t border-white/5 pt-2 lg:pt-4'>
                                        <div className="flex gap-1 lg:gap-2 items-baseline flex-wrap">
                                            <span className="text-sm lg:text-xl font-bold text-[#d4a574]">₹{formatPrice(product.price)}</span>
                                            {product.originalPrice && (
                                                <span className="text-[10px] lg:text-sm text-gray-400 line-through">₹{formatPrice(product.originalPrice)}</span>
                                            )}
                                        </div>
                                        <div className='flex items-center gap-2'>
                                            <Link to={`/products/${product._id}`} className='hidden lg:block text-[10px] lg:text-xs text-white/60 hover:text-white uppercase tracking-wider transition-colors'>
                                                Details
                                            </Link>
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    handleAddToCart(product)
                                                }}
                                                disabled={product.stock <= 0}
                                                className={`lg:hidden p-2 rounded-full transition-all duration-300 shadow-sm ${product.stock <= 0
                                                    ? 'bg-gray-800 text-gray-400 cursor-not-allowed'
                                                    : 'bg-[#d4a574]/20 text-[#d4a574] md:hover:bg-[#d4a574] md:hover:text-[#0f1c18]'
                                                    }`}
                                            >
                                                <svg
                                                    className='w-4 h-4'
                                                    fill='none'
                                                    stroke='currentColor'
                                                    viewBox='0 0 24 24'>
                                                    <path
                                                        strokeLinecap='round'
                                                        strokeLinejoin='round'
                                                        strokeWidth={2}
                                                        d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z'
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}

                {/* View All CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ delay: 0.2 }}
                    className='text-center will-change-transform'
                >
                    <Link
                        to='/shop'
                        className='group relative px-10 py-4 bg-transparent overflow-hidden rounded-full transition-all duration-300 transform hover:scale-105 border border-[#d4a574]/30 inline-flex'
                    >
                        <div className='absolute inset-0 w-0 bg-[#d4a574] transition-all duration-[700ms] ease-out group-hover:w-full opacity-90'></div>
                        <span className='relative z-10 flex items-center space-x-3'>
                            <span className='uppercase tracking-[0.2em] text-xs font-serif text-[#d4a574] group-hover:text-[#0f1c18] transition-colors duration-500'>
                                Explore Treasury
                            </span>
                            <ArrowRight className="w-4 h-4 text-[#d4a574] group-hover:text-[#0f1c18] transition-all duration-500 transform group-hover:translate-x-1" />
                        </span>
                    </Link>
                </motion.div>
            </div>
        </section>
    )
}

export default FeaturedProducts
