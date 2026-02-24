
import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import confetti from 'canvas-confetti'

const OrderSuccess = () => {
    const { orderId } = useParams()
    const { fetchCart } = useCart()

    useEffect(() => {
        // Refresh cart to ensure it's empty in UI
        fetchCart()

        // Fire confetti
        const duration = 3000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min, max) => Math.random() * (max - min) + min;

        const interval = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
        }, 250);

        // eslint-disable-next-line
    }, [])

    return (
        <div className='min-h-screen bg-white'>
            <Navbar />

            <div className='min-h-[80vh] flex flex-col items-center justify-center px-4 pt-20'>
                <div className='w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-bounce'>
                    <svg className='w-12 h-12 text-green-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={3} d='M5 13l4 4L19 7' />
                    </svg>
                </div>

                <h1 className='text-4xl font-bold text-gray-900 mb-4 text-center'>Order Placed Successfully!</h1>
                <p className='text-gray-500 text-lg mb-8 text-center max-w-md'>
                    Thank you for your purchase. Your order <span className='font-mono font-bold text-gray-800'>#{orderId}</span> has been confirmed.
                </p>

                <div className='flex flex-col sm:flex-row gap-4'>
                    <Link
                        to='/my-orders'
                        className='px-8 py-3 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition-colors text-center shadow-lg'
                    >
                        View Order
                    </Link>
                    <Link
                        to='/shop'
                        className='px-8 py-3 bg-white text-gray-900 border-2 border-gray-200 font-semibold rounded-xl hover:border-gray-900 transition-colors text-center'
                    >
                        Continue Shopping
                    </Link>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default OrderSuccess
