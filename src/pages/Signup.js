import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import axios from 'axios'
import { useCart } from '../context/CartContext'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { motion, AnimatePresence } from 'framer-motion'

const Signup = () => {
	const navigate = useNavigate()
	const { login } = useCart()
	const [formData, setFormData] = useState({
		phone: '',
		email: '',
		password: '',
		confirmPassword: '',
		otp: '',
	})
	const [step, setStep] = useState(1) // 1: Details, 2: OTP
	const [isLoading, setIsLoading] = useState(false)

	const handleChange = (e) => {
		if (e.target.name === 'phone') {
			// Only allow numbers
			const value = e.target.value.replace(/\D/g, '')
			if (value.length <= 10) {
				setFormData({
					...formData,
					phone: value,
				})
			}
		} else if (e.target.name === 'otp') {
			// Only allow numbers for OTP
			const value = e.target.value.replace(/\D/g, '')
			if (value.length <= 6) {
				setFormData({
					...formData,
					otp: value,
				})
			}
		} else {
			setFormData({
				...formData,
				[e.target.name]: e.target.value,
			})
		}
	}

	const handleSendOTP = async (e) => {
		e.preventDefault()

		// Validate passwords match
		if (formData.password !== formData.confirmPassword) {
			toast.error('Passwords do not match!')
			return
		}

		if (formData.phone.length !== 10) {
			toast.error('Please enter a valid 10-digit phone number')
			return
		}

		setIsLoading(true)

		try {
			const response = await axios.post(
				`${process.env.REACT_APP_API_URL}/api/auth/send-otp`,
				{
					email: formData.email,
				}
			)

			if (response.data.success) {
				toast.success('OTP sent to your email!', {
					autoClose: 2000,
				})
				setStep(2)
			}
		} catch (error) {
			console.error('Send OTP error:', error)
			const errorMessage =
				error.response?.data?.message || 'Failed to send OTP. Please try again.'
			toast.error(errorMessage, {
				autoClose: 4000,
			})
		} finally {
			setIsLoading(false)
		}
	}

	const handleVerifyAndSignup = async (e) => {
		e.preventDefault()

		if (formData.otp.length !== 6) {
			toast.error('Please enter a valid 6-digit OTP')
			return
		}

		setIsLoading(true)

		try {
			const response = await axios.post(
				`${process.env.REACT_APP_API_URL}/api/auth/signup`,
				{
					phone: formData.phone,
					email: formData.email,
					password: formData.password,
					otp: formData.otp,
				}
			)

			if (response.data.success) {
				const { token, user } = response.data.data

				// Store token using context login
				login(token)

				toast.success(`Account created successfully! Welcome!`, {
					autoClose: 2000,
				})

				// Redirect to home or admin based on role
				setTimeout(() => {
					if (user.role === 'admin') {
						navigate('/admin')
					} else {
						navigate('/')
					}
				}, 1000)
			}
		} catch (error) {
			console.error('Signup error:', error)
			const errorMessage =
				error.response?.data?.message || 'Signup failed. Please try again.'
			toast.error(errorMessage, {
				autoClose: 4000,
			})
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<section className='relative min-h-screen flex items-center overflow-hidden bg-[#0f1c18] text-[#e8e6e3] py-12'>
			<Navbar />

			{/* Grain Overlay - Exactly from Hero */}
			<div className='absolute inset-0 pointer-events-none opacity-[0.03] z-50 bg-[url("https://grainy-gradients.vercel.app/noise.svg")]'></div>

			{/* Parallax Background - Exactly from Hero */}
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
				<div className='max-w-3xl mx-auto'>
					<motion.div
						initial={{ opacity: 0, y: 15 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, ease: "easeOut" }}
						style={{ willChange: 'transform, opacity' }}
					>
						{/* Card */}
						<div className='relative bg-[#0f1c18]/80 backdrop-blur-md border border-white/10 rounded-3xl sm:rounded-[2rem] p-6 sm:p-12 overflow-hidden shadow-2xl'>
							{/* Glass Glints - Static */}
							<div className='absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent'></div>
							<div className='absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#d4a574]/20 to-transparent'></div>

							{/* Header */}
							<div className='text-center mb-8 sm:mb-10'>
								<h1 className='text-3xl sm:text-5xl font-serif font-light text-white mb-2 sm:mb-3'>
									{step === 1 ? 'Create Account' : 'Verify Email'}
								</h1>
								<p className='text-white/60 font-light text-sm sm:text-base'>
									{step === 1 ? 'Begin your wellness journey today' : `Enter the OTP sent to ${formData.email}`}
								</p>
							</div>

							{/* Form */}
							<form onSubmit={step === 1 ? handleSendOTP : handleVerifyAndSignup}>
								<AnimatePresence mode="wait">
									{step === 1 && (
										<motion.div
											key="step1"
											initial={{ opacity: 0 }}
											animate={{ opacity: 1 }}
											exit={{ opacity: 0 }}
											transition={{ duration: 0.2 }}
											className='space-y-6 mb-8'
										>
											<div className='grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6'>
												{/* Phone Number */}
												<div>
													<label className='block text-xs sm:text-sm text-white/60 mb-2 uppercase tracking-widest'>
														Phone Number
													</label>
													<div className="relative">
														<div className="absolute inset-y-0 left-0 flex items-center pl-4 sm:pl-5 pointer-events-none z-10">
															<img
																src="https://flagcdn.com/w20/in.png"
																alt="IN"
																className="w-4 sm:w-5 h-auto mr-1.5 sm:mr-2"
															/>
															<span className="text-white/80 font-medium text-sm sm:text-base">+91</span>
														</div>
														<input
															type='tel'
															name='phone'
															value={formData.phone}
															onChange={handleChange}
															className='w-full pl-20 sm:pl-24 pr-4 sm:pr-6 py-3 sm:py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-[#d4a574]/50 focus:bg-white/10 transition-colors duration-200 placeholder:text-white/30 text-white text-sm sm:text-base'
															placeholder='1234567890'
															required
														/>
													</div>
												</div>

												{/* Email */}
												<div>
													<label className='block text-xs sm:text-sm text-white/60 mb-2 uppercase tracking-widest'>
														Email Address
													</label>
													<input
														type='email'
														name='email'
														value={formData.email}
														onChange={handleChange}
														className='w-full px-4 sm:px-6 py-3 sm:py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-[#d4a574]/50 focus:bg-white/10 transition-colors duration-200 placeholder:text-white/30 text-white text-sm sm:text-base'
														placeholder='your@email.com'
														required
													/>
												</div>

												{/* Password */}
												<div>
													<label className='block text-xs sm:text-sm text-white/60 mb-2 uppercase tracking-widest'>
														Password
													</label>
													<input
														type='password'
														name='password'
														value={formData.password}
														onChange={handleChange}
														className='w-full px-4 sm:px-6 py-3 sm:py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-[#d4a574]/50 focus:bg-white/10 transition-colors duration-200 placeholder:text-white/30 text-white text-sm sm:text-base'
														placeholder='••••••••'
														minLength='6'
														required
													/>
												</div>

												{/* Confirm Password */}
												<div>
													<label className='block text-xs sm:text-sm text-white/60 mb-2 uppercase tracking-widest'>
														Confirm Password
													</label>
													<input
														type='password'
														name='confirmPassword'
														value={formData.confirmPassword}
														onChange={handleChange}
														className='w-full px-4 sm:px-6 py-3 sm:py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-[#d4a574]/50 focus:bg-white/10 transition-colors duration-200 placeholder:text-white/30 text-white text-sm sm:text-base'
														placeholder='••••••••'
														minLength='6'
														required
													/>
												</div>
											</div>
										</motion.div>
									)}

									{step === 2 && (
										<motion.div
											key="step2"
											initial={{ opacity: 0 }}
											animate={{ opacity: 1 }}
											exit={{ opacity: 0 }}
											transition={{ duration: 0.2 }}
											className='mb-8'
										>
											<label className='block text-xs sm:text-sm text-white/60 mb-4 uppercase tracking-widest text-center'>
												One-Time Password
											</label>
											<input
												type='text'
												name='otp'
												value={formData.otp}
												onChange={handleChange}
												className='w-full px-4 sm:px-6 py-4 sm:py-5 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-[#d4a574]/50 focus:bg-white/10 transition-colors duration-200 text-center text-3xl sm:text-4xl tracking-[0.3em] sm:tracking-[0.5em] font-bold text-white'
												placeholder='000000'
												maxLength='6'
												required
											/>
											<div className='mt-4 text-center'>
												<button
													type='button'
													onClick={() => setStep(1)}
													className='text-sm text-[#d4a574] hover:text-[#d4a574]/80 font-serif transition-colors border-b border-[#d4a574]/30 hover:border-[#d4a574]'
												>
													← Change Email
												</button>
											</div>
										</motion.div>
									)}
								</AnimatePresence>

								{/* Submit Button - Exact Hero Style */}
								<button
									type='submit'
									disabled={isLoading}
									className='group relative w-full px-6 py-3 sm:px-10 sm:py-4 bg-transparent overflow-hidden rounded-full transition-transform duration-200 hover:scale-[1.02] border border-[#d4a574]/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100'
								>
									<div className='absolute inset-0 w-0 bg-[#d4a574] transition-all duration-300 ease-out group-hover:w-full opacity-90'></div>
									<span className='relative z-10 flex items-center justify-center space-x-3'>
										<span className='uppercase tracking-[0.2em] text-xs font-serif text-[#d4a574] group-hover:text-[#0f1c18] transition-colors duration-300'>
											{isLoading ? (step === 1 ? 'Sending OTP...' : 'Verifying...') : (step === 1 ? 'Send OTP' : 'Verify & Sign Up')}
										</span>
										{!isLoading && (
											<svg className="w-4 h-4 text-[#d4a574] group-hover:text-[#0f1c18] transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
											</svg>
										)}
									</span>
								</button>
							</form>

							{/* Footer */}
							<div className='mt-8 text-center border-t border-white/5 pt-6'>
								<p className='text-sm text-white/60'>
									Already have an account?{' '}
									<a
										href='/login'
										className='text-[#d4a574] hover:text-[#d4a574]/80 font-serif transition-colors border-b border-[#d4a574]/30 hover:border-[#d4a574]'
									>
										Sign in
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

export default Signup
