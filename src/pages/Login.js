import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { motion } from 'framer-motion'
import { useCart } from '../context/CartContext'

const Login = () => {
	const navigate = useNavigate()
	const { login, mergeLocalCart } = useCart()
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	})
	const [isLoading, setIsLoading] = useState(false)

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		})
	}
	const handleSubmit = async (e) => {
		e.preventDefault()
		setIsLoading(true)
		try {
			const response = await axios.post(
				`${process.env.REACT_APP_API_URL}/api/auth/login`,
				formData
			)

			if (response.data.success) {
				const { token, user } = response.data.data

				// Store token using context
				login(token)

				// Merge guest cart if exists
				await mergeLocalCart(token)

				toast.success(`Welcome back, ${user.name}!`, {
					autoClose: 2000,
				})

				// Redirect based on returnUrl or role
				setTimeout(() => {
					const returnUrl = localStorage.getItem('returnUrl')
					if (returnUrl) {
						localStorage.removeItem('returnUrl')
						navigate(returnUrl)
					} else if (user.role === 'admin') {
						navigate('/admin')
					} else {
						navigate('/')
					}
				}, 1000)
			}
		} catch (error) {
			console.error('Login error:', error)
			const errorMessage =
				error.response?.data?.message || 'Login failed. Please try again.'
			toast.error(errorMessage, {
				autoClose: 4000,
			})
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<section className='relative min-h-screen flex items-center overflow-hidden bg-[#0f1c18] text-[#e8e6e3]'>
			<Navbar />

			{/* Grain Overlay - Exactly from Hero */}
			<div className='absolute inset-0 pointer-events-none opacity-[0.03] z-50 bg-[url("https://grainy-gradients.vercel.app/noise.svg")]'></div>

			{/* Parallax Background - Optimization Applied */}
			<div className='absolute inset-0 z-0 overflow-hidden'>
				<div className='absolute inset-0 bg-gradient-to-b from-[#0f1c18]/30 via-[#0f1c18]/60 to-[#0f1c18] z-10'></div>
				<div className='absolute inset-0'>
					<img
						src="https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=60&w=1920&auto=format&fit=crop"
						alt="Ancient Mystical Forest"
						className="w-full h-full object-cover opacity-50 scale-105"
						style={{ willChange: 'transform' }}
						loading="eager"
						fetchPriority="high"
					/>
				</div>

				{/* Ambient Golden Glow - Optimized */}
				<motion.div
					animate={{ opacity: [0.3, 0.5, 0.3] }}
					transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
					className='absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#d4a574]/10 rounded-full blur-[80px]'
					style={{ willChange: 'opacity' }}
				/>
			</div>

			{/* Content */}
			<div className='relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full'>
				<div className='max-w-md mx-auto'>
					<motion.div
						initial={{ opacity: 0, y: 15 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, ease: "easeOut" }}
						style={{ willChange: 'transform, opacity' }}
					>
						{/* Card */}
						<div className='bg-[#0f1c18]/60 backdrop-blur-xl border border-white/10 rounded-3xl sm:rounded-[2rem] p-6 sm:p-12 overflow-hidden shadow-2xl transform-gpu'>
							{/* Glass Glints */}
							<div className='absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent'></div>
							<div className='absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#d4a574]/20 to-transparent'></div>

							{/* Header */}
							<div className='text-center mb-8 sm:mb-10'>
								<h1 className='text-3xl sm:text-5xl font-serif font-light text-white mb-2 sm:mb-3'>
									Welcome Back
								</h1>
								<p className='text-white/60 font-light'>Sign in to continue your wellness journey</p>
							</div>

							{/* Form */}
							<form onSubmit={handleSubmit} className='space-y-6'>
								{/* Email Field */}
								<div>
									<label className='block text-xs sm:text-sm text-white/60 mb-2 uppercase tracking-widest'>
										Email Address
									</label>
									<input
										type='email'
										name='email'
										value={formData.email}
										onChange={handleChange}
										className='w-full px-4 py-3 sm:px-6 sm:py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-[#d4a574]/50 focus:bg-white/10 transition-all duration-300 placeholder:text-white/30 text-white text-sm sm:text-base'
										placeholder='your@email.com'
										required
									/>
								</div>

								{/* Password Field */}
								<div>
									<label className='block text-xs sm:text-sm text-white/60 mb-2 uppercase tracking-widest'>
										Password
									</label>
									<input
										type='password'
										name='password'
										value={formData.password}
										onChange={handleChange}
										className='w-full px-4 py-3 sm:px-6 sm:py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-[#d4a574]/50 focus:bg-white/10 transition-all duration-300 placeholder:text-white/30 text-white text-sm sm:text-base'
										placeholder='••••••••'
										required
									/>
								</div>

								{/* Submit Button - Exact Hero Style */}
								<button
									type='submit'
									disabled={isLoading}
									className='group relative w-full px-6 py-3 sm:px-10 sm:py-4 bg-transparent overflow-hidden rounded-full transition-all duration-300 transform hover:scale-105 border border-[#d4a574]/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100'>
									<div className='absolute inset-0 w-0 bg-[#d4a574] transition-all duration-[700ms] ease-out group-hover:w-full opacity-90'></div>
									<span className='relative z-10 flex items-center justify-center space-x-3'>
										<span className='uppercase tracking-[0.2em] text-xs font-serif text-[#d4a574] group-hover:text-[#0f1c18] transition-colors duration-500'>
											{isLoading ? 'Signing in...' : 'Sign In'}
										</span>
										{!isLoading && (
											<svg className="w-4 h-4 text-[#d4a574] group-hover:text-[#0f1c18] transition-all duration-500 transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
											</svg>
										)}
									</span>
								</button>
							</form>

							{/* Footer */}
							<div className='mt-8 text-center border-t border-white/5 pt-6'>
								<p className='text-sm text-white/60'>
									Don't have an account?{' '}
									<a
										href='/signup'
										className='text-[#d4a574] hover:text-[#d4a574]/80 font-serif transition-colors border-b border-[#d4a574]/30 hover:border-[#d4a574]'>
										Sign up
									</a>
								</p>
							</div>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	)
}

export default Login
