import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import 'react-toastify/dist/ReactToastify.css'
import { formatPrice } from '../utils/formatPrice'

const Cart = () => {
    const { cart, loading, updateQuantity, removeFromCart, clearCart, token } = useCart()
    const navigate = useNavigate()

    const handleQuantityChange = (productId, newQuantity) => {
        if (newQuantity < 1) return
        updateQuantity(productId, newQuantity)
    }

    const handleCheckout = () => {
        if (!token) {
            // Save return URL logic if multiple entry points exist, but for now specific to checkout
            localStorage.setItem('returnUrl', '/checkout')
            navigate('/login')
            return
        }

        // Navigate to checkout
        navigate('/checkout')
    }

    if (loading && cart.items.length === 0) {
        return (
            <div className='min-h-screen bg-gradient-to-br from-gray-50 via-green-50/30 to-gray-100 flex items-center justify-center'>
                <div className='relative'>
                    <div className='animate-spin rounded-full h-16 w-16 border-4 border-gray-200'></div>
                    <div className='animate-spin rounded-full h-16 w-16 border-4 border-[#2d5f4f] border-t-transparent absolute top-0'></div>
                </div>
            </div>
        )
    }

    return (
        <div className='min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-green-50/30 to-gray-100'>
            <Navbar />

            <div className='flex-grow pt-24 pb-16 px-4 sm:px-6 lg:px-8'>
                <div className='max-w-7xl mx-auto'>
                    {/* Responsive Header */}
                    <div className='mb-6 sm:mb-8 mt-4 sm:mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6 bg-white/50 sm:bg-transparent p-4 sm:p-0 rounded-2xl sm:rounded-none border border-gray-100 sm:border-transparent'>
                        <div className='flex items-center gap-3 sm:gap-4'>
                            <div className='h-12 w-12 sm:h-16 sm:w-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#2d5f4f] to-[#1e4035] flex items-center justify-center shadow-lg shrink-0'>
                                <svg className='w-6 h-6 sm:w-8 sm:h-8 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' />
                                </svg>
                            </div>
                            <div>
                                <h1 className='text-2xl sm:text-3xl font-bold text-gray-900 leading-tight'>Shopping Cart</h1>
                                <p className='text-sm sm:text-base text-gray-600 mt-0.5'>{cart.items.length} {cart.items.length === 1 ? 'item' : 'items'} in your cart</p>
                            </div>
                        </div>

                        {/* Top Shop More Button */}
                        <button
                            onClick={() => navigate('/shop')}
                            className='group flex items-center justify-center gap-2 px-6 py-3 w-full sm:w-auto bg-white border-2 border-[#2d5f4f]/20 rounded-xl text-[#2d5f4f] font-bold hover:bg-[#2d5f4f] hover:text-white hover:border-[#2d5f4f] transition-all duration-300 shadow-sm hover:shadow-md'
                        >
                            <svg className='w-5 h-5 group-hover:-translate-x-1 transition-transform' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M10 19l-7-7m0 0l7-7m-7 7h18' />
                            </svg>
                            Shop More
                        </button>
                    </div>

                    {cart.items.length === 0 ? (
                        <div className='text-center py-20 bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200/50'>
                            <div className='relative inline-block'>
                                <div className='absolute inset-0 bg-[#2d5f4f]/10 rounded-full blur-xl'></div>
                                <svg className='relative w-32 h-32 text-gray-300 mx-auto mb-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' />
                                </svg>
                            </div>
                            <h2 className='text-3xl font-bold text-gray-900 mb-3'>Your cart is empty</h2>
                            <p className='text-gray-500 text-lg mb-8'>Discover amazing products and start shopping!</p>
                            <Link to='/shop' className='inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#2d5f4f] to-[#1e4035] text-white font-semibold rounded-xl hover:from-[#1e4035] hover:to-[#2d5f4f] shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5'>
                                <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' />
                                </svg>
                                Start Shopping
                            </Link>
                        </div>
                    ) : (
                        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                            {/* Cart Items */}
                            <div className='lg:col-span-2 space-y-4'>
                                {cart.items.map((item, index) => (
                                    <div key={item.productId}
                                        className='group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-6 flex flex-wrap sm:flex-nowrap items-center gap-4 sm:gap-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.01] border border-gray-200/50'
                                        style={{ animationDelay: `${index * 50}ms` }}
                                    >
                                        {/* Product Image */}
                                        <div className='relative w-20 h-20 sm:w-28 sm:h-28 flex-shrink-0 rounded-xl overflow-hidden shadow-md group-hover:shadow-lg transition-shadow'>
                                            <div className='absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200'></div>
                                            <img src={item.image} alt={item.title} className='relative w-full h-full object-cover group-hover:scale-110 transition-transform duration-300' />
                                        </div>

                                        {/* Product Details */}
                                        <div className='w-[calc(100%-6rem)] sm:w-auto sm:flex-1 text-left'>
                                            <h3 className='text-base sm:text-lg font-bold text-gray-900 mb-1 group-hover:text-[#2d5f4f] transition-colors line-clamp-2'>{item.title}</h3>
                                            <p className='text-xl sm:text-2xl font-bold text-[#2d5f4f]'>₹{formatPrice(item.price)}</p>
                                            {item.stock < 10 && (
                                                <p className='text-xs text-orange-600 font-medium mt-1'>Only {item.stock} left in stock!</p>
                                            )}
                                        </div>

                                        {/* Quantity Controls - Mobile: Full width bottom row, Desktop: Auto width side */}
                                        <div className='w-full sm:w-auto flex items-center justify-between sm:justify-end gap-3 sm:gap-4 mt-2 sm:mt-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-gray-100 sm:border-none'>
                                            <div className='flex items-center bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 rounded-xl shadow-inner'>
                                                <button
                                                    onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                                                    className='px-3 sm:px-4 py-1.5 sm:py-2 hover:bg-white/80 text-gray-700 font-bold transition-all rounded-l-xl disabled:opacity-40 disabled:cursor-not-allowed'
                                                    disabled={item.quantity <= 1}
                                                >
                                                    <svg className='w-3 h-3 sm:w-4 sm:h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={3} d='M20 12H4' />
                                                    </svg>
                                                </button>
                                                <span className='px-3 sm:px-5 py-1.5 sm:py-2 font-bold text-gray-900 bg-white border-x-2 border-gray-200 min-w-[3rem] sm:min-w-[4rem] text-center text-base sm:text-lg'>{item.quantity}</span>
                                                <button
                                                    onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                                                    className='px-3 sm:px-4 py-1.5 sm:py-2 hover:bg-white/80 text-gray-700 font-bold transition-all rounded-r-xl disabled:opacity-40 disabled:cursor-not-allowed'
                                                    disabled={item.quantity >= item.stock}
                                                >
                                                    <svg className='w-3 h-4 sm:w-4 sm:h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={3} d='M12 4v16m8-8H4' />
                                                    </svg>
                                                </button>
                                            </div>

                                            {/* Remove Button */}
                                            <button
                                                onClick={() => removeFromCart(item.productId)}
                                                className='group/btn p-2 sm:p-3 text-red-500 hover:bg-red-50 rounded-xl transition-all border-2 border-transparent hover:border-red-200 shadow-sm hover:shadow-md'
                                                title="Remove item"
                                            >
                                                <svg className='w-5 h-5 group-hover/btn:scale-110 transition-transform' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16' />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                ))}

                                {/* Clear Cart Button */}
                                <div className='flex justify-end pt-2'>
                                    <button
                                        onClick={clearCart}
                                        className='group flex items-center gap-2 text-red-600 font-semibold hover:text-red-700 transition-colors px-4 py-2 rounded-lg hover:bg-red-50'
                                    >
                                        <svg className='w-4 h-4 group-hover:scale-110 transition-transform' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16' />
                                        </svg>
                                        Clear Cart
                                    </button>
                                </div>
                            </div>

                            {/* Order Summary & Address */}
                            <div className='lg:col-span-1'>
                                <div className='bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 sticky top-24 border border-gray-200/50'>
                                    {/* Order Summary Header */}
                                    <div className='flex items-center gap-3 mb-6 pb-6 border-b-2 border-gray-100'>
                                        <div className='h-10 w-10 rounded-lg bg-gradient-to-br from-[#2d5f4f] to-[#1e4035] flex items-center justify-center shadow-lg'>
                                            <svg className='w-5 h-5 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z' />
                                            </svg>
                                        </div>
                                        <h2 className='text-2xl font-bold text-gray-900'>Order Summary</h2>
                                    </div>

                                    {/* Price Breakdown */}
                                    <div className='space-y-4 mb-6 pb-6 border-b-2 border-gray-100'>
                                        <div className='flex justify-between items-center text-gray-600'>
                                            <span className='font-medium'>Total Items</span>
                                            <span className='text-xl font-bold text-[#2d5f4f]'>{cart.totalItems}</span>
                                        </div>
                                        <div className='flex justify-between items-center text-gray-600'>
                                            <span className='font-medium'>Subtotal</span>
                                            <span className='font-semibold text-gray-900'>₹{formatPrice(cart.totalPrice)}</span>
                                        </div>
                                        <div className='flex justify-between items-center'>
                                            <span className='font-medium text-gray-600'>Shipping</span>
                                            <span className='inline-flex items-center gap-1 text-green-600 font-bold'>
                                                <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
                                                    <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' clipRule='evenodd' />
                                                </svg>
                                                FREE
                                            </span>
                                        </div>
                                    </div>

                                    {/* Total */}
                                    <div className='flex justify-between items-center mb-8 p-4 bg-gradient-to-br from-[#2d5f4f]/5 to-green-50/50 rounded-xl'>
                                        <span className='text-lg font-bold text-gray-900'>Total Amount</span>
                                        <span className='text-3xl font-bold text-[#2d5f4f]'>₹{formatPrice(cart.totalPrice)}</span>
                                    </div>

                                    {/* Checkout Button */}
                                    <button
                                        onClick={handleCheckout}
                                        className='group relative w-full py-4 bg-gradient-to-r from-[#2d5f4f] to-[#1e4035] text-white font-bold rounded-xl shadow-lg hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 overflow-hidden'
                                    >
                                        <div className='absolute inset-0 bg-gradient-to-r from-[#1e4035] to-[#2d5f4f] opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                                        <div className='relative flex items-center justify-center gap-2'>
                                            <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' />
                                            </svg>
                                            Proceed to Checkout
                                            <svg className='w-5 h-5 group-hover:translate-x-1 transition-transform' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M14 5l7 7m0 0l-7 7m7-7H3' />
                                            </svg>
                                        </div>
                                    </button>

                                    {/* Shop More Button */}
                                    <button
                                        onClick={() => navigate('/shop')}
                                        className='w-full mt-3 py-3 border-2 border-gray-200 text-gray-600 font-bold rounded-xl hover:border-[#2d5f4f] hover:text-[#2d5f4f] hover:bg-[#2d5f4f]/5 transition-all duration-300 flex items-center justify-center gap-2 group/shop'
                                    >
                                        <svg className='w-5 h-5 group-hover/shop:-translate-x-1 transition-transform' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M10 19l-7-7m0 0l7-7m-7 7h18' />
                                        </svg>
                                        Continue Shopping
                                    </button>

                                    {/* Security Badge */}
                                    <div className='flex items-center justify-center gap-2 mt-4 text-xs text-gray-500'>
                                        <svg className='w-4 h-4 text-green-600' fill='currentColor' viewBox='0 0 20 20'>
                                            <path fillRule='evenodd' d='M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' clipRule='evenodd' />
                                        </svg>
                                        Secure checkout powered by Razorpay
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Cart