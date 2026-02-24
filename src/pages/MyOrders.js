
import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import axios from 'axios'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../utils/formatPrice'

const MyOrders = () => {
    const { token } = useCart()
    const navigate = useNavigate()
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!token) {
            navigate('/login')
            return
        }
        fetchOrders()
        // eslint-disable-next-line
    }, [token])

    const fetchOrders = async () => {
        try {
            setLoading(true)
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/orders`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            if (response.data.success) {
                setOrders(response.data.data)
            } else {
                setError('Failed to fetch orders')
            }
        } catch (err) {
            console.error('Fetch orders error:', err)
            setError(err.response?.data?.message || 'Failed to load orders')
        } finally {
            setLoading(false)
        }
    }
    
    // eslint-disable-next-line
    const getStatusColor = (status) => {
        switch (status) {
            case 'delivered': return 'bg-green-100 text-green-800 border-green-200'
            case 'shipped': return 'bg-blue-100 text-blue-800 border-blue-200'
            case 'processing': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
            case 'cancelled': return 'bg-red-100 text-red-800 border-red-200'
            default: return 'bg-gray-100 text-gray-800 border-gray-200'
        }
    }

    return (
        <div className='min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-green-50/30 to-gray-100'>
            <Navbar />

            <div className='flex-grow pt-24 pb-16 px-4 sm:px-6 lg:px-8'>
                <div className='max-w-5xl mx-auto'>

                    {/* Header Section */}
                    <div className='mb-8 mt-8'>
                        <div className='flex items-center gap-4 mb-2'>
                            <div className='h-16 w-16 rounded-2xl bg-gradient-to-br from-[#2d5f4f] to-[#1e4035] flex items-center justify-center shadow-lg'>
                                <svg className='w-8 h-8 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' />
                                </svg>
                            </div>
                            <div>
                                <h1 className='text-3xl font-bold text-gray-900'>My Orders</h1>
                                <p className='text-gray-600 mt-0.5'>Track and manage your recent purchases</p>
                            </div>
                        </div>
                    </div>

                    {loading ? (
                        <div className='flex flex-col items-center justify-center py-24'>
                            <div className='animate-spin rounded-full h-12 w-12 border-4 border-[#2d5f4f] border-t-transparent mb-4'></div>
                            <p className='text-gray-500 font-medium'>Loading your orders...</p>
                        </div>
                    ) : error ? (
                        <div className='bg-red-50 border border-red-100 rounded-2xl p-8 text-center'>
                            <p className='text-red-500 mb-4 font-medium'>{error}</p>
                            <button
                                onClick={fetchOrders}
                                className='px-6 py-2 bg-white border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors font-semibold shadow-sm'
                            >
                                Try Again
                            </button>
                        </div>
                    ) : orders.length === 0 ? (
                        <div className='text-center py-20 bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-gray-200/50'>
                            <div className='w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6'>
                                <svg className='w-12 h-12 text-gray-300' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' />
                                </svg>
                            </div>
                            <h2 className='text-2xl font-bold text-gray-900 mb-2'>No orders yet</h2>
                            <p className='text-gray-500 mb-8 max-w-md mx-auto'>Looks like you haven't placed any orders yet. Start your wellness journey today.</p>
                            <Link
                                to='/shop'
                                className='inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-[#2d5f4f] to-[#1e4035] text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300'
                            >
                                Start Shopping
                                <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 8l4 4m0 0l-4 4m4-4H3' />
                                </svg>
                            </Link>
                        </div>
                    ) : (
                        <div className='space-y-8'>
                            {orders.map((order) => {
                                const steps = [
                                    { status: 'processing', label: 'Processing', date: order.createdAt },
                                    { status: 'shipped', label: 'Shipped', date: null },
                                    { status: 'delivered', label: 'Delivered', date: null }
                                ]

                                const getCurrentStepIndex = (status) => {
                                    if (status === 'delivered') return 3
                                    if (status === 'shipped') return 2
                                    if (status === 'processing') return 1
                                    return 0
                                }

                                const currentStep = getCurrentStepIndex(order.orderStatus)
                                const isCancelled = order.orderStatus === 'cancelled'

                                return (
                                    <div key={order._id} className='bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg overflow-hidden border border-gray-200/50 hover:shadow-xl transition-all duration-300'>
                                        {/* Order Header */}
                                        <div className='p-6 border-b border-gray-100 bg-gray-50/50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
                                            <div className='flex items-center gap-4'>
                                                <div className='p-3 bg-white rounded-xl shadow-sm border border-gray-100'>
                                                    <svg className='w-6 h-6 text-[#2d5f4f]' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <div className='flex items-center gap-3'>
                                                        <p className='text-lg font-bold text-gray-900'>Order #{order.orderNumber}</p>
                                                        {isCancelled && (
                                                            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border bg-red-100 text-red-800 border-red-200">
                                                                Cancelled
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className='text-sm text-gray-500 mt-1 flex items-center gap-2'>
                                                        <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' />
                                                        </svg>
                                                        {new Date(order.createdAt).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className='flex items-center gap-6'>
                                                <div className='text-right hidden md:block'>
                                                    <p className='text-sm text-gray-500'>Total Amount</p>
                                                    <p className='text-xl font-bold text-[#2d5f4f]'>₹{formatPrice(order.totalAmount)}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='p-6'>
                                            {/* Status Stepper */}
                                            {!isCancelled && (
                                                <div className="mb-12 mt-4 relative px-4">
                                                    {/* Progress Bar Background */}
                                                    <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 rounded-full -translate-y-1/2 z-0"></div>

                                                    {/* Active Progress Bar */}
                                                    <div
                                                        className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-[#2d5f4f] to-[#3e7a70] rounded-full -translate-y-1/2 z-0 transition-all duration-1000 ease-out"
                                                        style={{ width: `${Math.max(0, ((currentStep - 1) / (steps.length - 1)) * 100)}%` }}
                                                    ></div>

                                                    <div className="relative z-10 flex justify-between w-full">
                                                        {steps.map((step, index) => {
                                                            const completed = index + 1 <= currentStep
                                                            const active = index + 1 === currentStep

                                                            return (
                                                                <div key={index} className="flex flex-col items-center group">
                                                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center border-4 transition-all duration-500 relative ${completed || active
                                                                        ? 'bg-[#2d5f4f] border-[#e8f5f1] shadow-lg scale-110'
                                                                        : 'bg-white border-gray-200 text-gray-300'
                                                                        } ${active ? 'ring-4 ring-[#2d5f4f]/20' : ''}`}>

                                                                        {/* Icons */}
                                                                        {step.status === 'processing' && (
                                                                            <svg className={`w-5 h-5 ${completed || active ? 'text-white' : 'text-gray-300'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                                                            </svg>
                                                                        )}
                                                                        {step.status === 'shipped' && (
                                                                            <svg className={`w-5 h-5 ${completed || active ? 'text-white' : 'text-gray-300'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                                                                            </svg>
                                                                        )}
                                                                        {step.status === 'delivered' && (
                                                                            <svg className={`w-5 h-5 ${completed || active ? 'text-white' : 'text-gray-300'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                                            </svg>
                                                                        )}

                                                                        {/* Active Pulse Animation */}
                                                                        {active && (
                                                                            <span className="absolute inset-0 rounded-full bg-[#2d5f4f] opacity-20 animate-ping"></span>
                                                                        )}
                                                                    </div>

                                                                    {/* Label & Date */}
                                                                    <div className="absolute top-16 flex flex-col items-center w-32">
                                                                        <span className={`text-xs font-bold uppercase tracking-wider mb-1 transition-colors duration-300 ${completed || active ? 'text-[#2d5f4f]' : 'text-gray-400'
                                                                            }`}>
                                                                            {step.label}
                                                                        </span>
                                                                        {step.date && (active || completed) && (
                                                                            <span className="text-[10px] text-gray-500 font-medium bg-gray-100 px-2 py-0.5 rounded-full">
                                                                                {new Date(step.date).toLocaleDateString()}
                                                                            </span>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            )
                                                        })}
                                                    </div>
                                                </div>
                                            )}

                                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                                {/* Items List */}
                                                <div className="lg:col-span-2 space-y-4">
                                                    {order.items.map((item, idx) => (
                                                        <div key={idx} className='flex items-center gap-4 p-4 bg-gray-50/30 rounded-2xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100 group'>
                                                            <div className='w-20 h-20 bg-white rounded-xl overflow-hidden flex-shrink-0 shadow-sm border border-gray-100'>
                                                                {item.image ? (
                                                                    <img src={item.image} alt={item.title} className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500' />
                                                                ) : (
                                                                    <div className='w-full h-full bg-gray-100 flex items-center justify-center text-gray-300'>
                                                                        <svg className='w-8 h-8' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' />
                                                                        </svg>
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <div className='flex-1 min-w-0'>
                                                                <h4 className='text-base font-bold text-gray-900 truncate group-hover:text-[#2d5f4f] transition-colors'>{item.title}</h4>
                                                                <p className='text-sm text-gray-500 mt-1'>Quantity: <span className='font-semibold text-gray-800'>{item.quantity}</span></p>
                                                            </div>
                                                            <div className='text-right'>
                                                                <p className='text-lg font-bold text-[#2d5f4f]'>
                                                                    ₹{formatPrice(item.price)}
                                                                    <span className="text-xs text-gray-500 font-medium ml-1">/ unit</span>
                                                                </p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>

                                                {/* Shipping Address */}
                                                <div className="lg:col-span-1">
                                                    <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 h-full">
                                                        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                                                            <svg className="w-4 h-4 text-[#2d5f4f]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                                            Shipping Address
                                                        </h3>
                                                        <div className="space-y-1 text-sm text-gray-600">
                                                            {order.shippingAddress ? (
                                                                <>
                                                                    <p className="font-bold text-gray-900 text-base mb-1">{order.shippingAddress.name}</p>
                                                                    <p className="leading-relaxed">{order.shippingAddress.address}</p>
                                                                    {order.shippingAddress.landmark && <p className="text-xs text-gray-500 mt-1">📍 {order.shippingAddress.landmark}</p>}
                                                                    <p className="mt-1">{order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}</p>
                                                                    <p className="font-medium mt-2 flex items-center gap-2">
                                                                        <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                                                        {order.shippingAddress.phone}
                                                                    </p>
                                                                </>
                                                            ) : (
                                                                <p className="italic text-gray-400">Address details unavailable</p>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Order Summary Calculation */}
                                            <div className="mt-6 bg-gray-50/50 rounded-xl p-6 border border-gray-100">
                                                <div className="space-y-3">
                                                    {order.items.map((item, idx) => (
                                                        <div key={idx} className="flex justify-between items-center text-sm">
                                                            <span className="text-gray-600 font-medium">
                                                                {item.title} <span className="text-gray-400">× {item.quantity}</span>
                                                            </span>
                                                            <span className="font-bold text-gray-900">₹{formatPrice(item.price * item.quantity)}</span>
                                                        </div>
                                                    ))}
                                                    <div className="flex justify-between items-center text-sm pt-3 border-t border-dashed border-gray-200">
                                                        <span className="text-gray-600 font-medium">Shipping</span>
                                                        <span className="font-bold text-green-600">FREE</span>
                                                    </div>
                                                    <div className="flex justify-between items-center pt-4 border-t border-gray-200 mt-2">
                                                        <span className="text-lg font-bold text-gray-900">Total Amount</span>
                                                        <span className="text-2xl font-bold text-[#2d5f4f]">₹{formatPrice(order.totalAmount)}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Mobile Total (visible only on small screens) */}
                                            <div className='mt-6 pt-4 border-t border-gray-100 flex justify-between items-center md:hidden'>
                                                <span className='font-bold text-gray-900'>Total Amount</span>
                                                <span className='text-xl font-bold text-[#2d5f4f]'>₹{formatPrice(order.totalAmount)}</span>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default MyOrders
