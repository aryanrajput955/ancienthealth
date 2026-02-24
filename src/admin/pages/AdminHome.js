import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const AdminHome = () => {
	const [latestProducts, setLatestProducts] = useState([])
	const [latestBlogs, setLatestBlogs] = useState([])
	const [latestUsers, setLatestUsers] = useState([])
	const [categories, setCategories] = useState([])

	useEffect(() => {
		fetchLatestData()
	}, [])

	const fetchLatestData = async () => {
		try {
			// Fetch categories first
			const categoriesRes = await axios.get(
				`${process.env.REACT_APP_API_URL}/api/categories`
			)
			setCategories(categoriesRes.data.data)

			// Fetch latest products
			const productsRes = await axios.get(
				`${process.env.REACT_APP_API_URL}/api/products?limit=5`
			)
			setLatestProducts(productsRes.data.data)

			// Fetch latest blogs
			const blogsRes = await axios.get(`${process.env.REACT_APP_API_URL}/api/blogs`)
			setLatestBlogs(blogsRes.data.data.slice(0, 3))

			// Fetch latest users
			const token = localStorage.getItem('token')
			if (token) {
				const usersRes = await axios.get(
					`${process.env.REACT_APP_API_URL}/api/auth/users`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				)
				setLatestUsers(usersRes.data.data.users.slice(0, 5))
			}
		} catch (error) {
			console.error('Error fetching latest data:', error)
		}
	}

	const getCategoryColor = (categoryId) => {
		const category = categories.find((cat) => cat._id === categoryId)
		return category?.color || '#64748B'
	}

	const getCategoryName = (categoryId) => {
		const category = categories.find((cat) => cat._id === categoryId)
		return category?.name || 'Unknown'
	}

	return (
		<div className='max-w-6xl mx-auto p-6'>
			<div className='bg-white rounded-2xl shadow-lg p-8 border border-slate-200 mb-8'>
				<div className='mb-6'>
					<h1 className='text-4xl font-bold text-slate-800 mb-3'>
						Welcome to Admin Dashboard
					</h1>
					<div className='h-1 w-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full'></div>
				</div>
				<p className='text-slate-600 text-lg leading-relaxed'>
					Select a menu item from the sidebar to get started with managing your
					products, categories, blogs, and users.
				</p>

				<div className='grid grid-cols-3 gap-4 mt-8'>
					<Link
						to='/admin/products/manage'
						className='bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200 hover:shadow-lg transition-shadow cursor-pointer'>
						<div className='flex items-center gap-3 mb-2'>
							<svg
								className='w-6 h-6 text-blue-600'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4'
								/>
							</svg>
							<h3 className='font-semibold text-slate-800'>Products</h3>
						</div>
						<p className='text-sm text-slate-600'>
							Manage your product catalog
						</p>
					</Link>

					<Link
						to='/admin/users'
						className='bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200 hover:shadow-lg transition-shadow cursor-pointer'>
						<div className='flex items-center gap-3 mb-2'>
							<svg
								className='w-6 h-6 text-purple-600'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z'
								/>
							</svg>
							<h3 className='font-semibold text-slate-800'>Users</h3>
						</div>
						<p className='text-sm text-slate-600'>Manage user accounts</p>
					</Link>

					<Link
						to='/admin/blogs/manage'
						className='bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200 hover:shadow-lg transition-shadow cursor-pointer'>
						<div className='flex items-center gap-3 mb-2'>
							<svg
								className='w-6 h-6 text-green-600'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'
								/>
							</svg>
							<h3 className='font-semibold text-slate-800'>Blogs</h3>
						</div>
						<p className='text-sm text-slate-600'>Manage blog posts</p>
					</Link>
				</div>
			</div>

			{/* Latest Products Section */}
			<div className='bg-white rounded-2xl shadow-lg p-6 border border-slate-200 mb-6'>
				<div className='flex items-center justify-between mb-6'>
					<h2 className='text-2xl font-bold text-slate-800'>Latest Products</h2>
					<Link
						to='/admin/products/manage'
						className='text-blue-600 hover:text-blue-800 font-medium transition-colors'>
						View All →
					</Link>
				</div>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
					{latestProducts.map((product) => (
						<div
							key={product._id}
							className='group bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-lg hover:border-blue-200 transition-all duration-200 cursor-pointer'>
							{/* Product Image */}
							<div className='relative h-48 bg-slate-100 overflow-hidden'>
								{product.images && product.images.length > 0 ? (
									<img
										src={product.images[0].url}
										alt={product.title}
										className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-200'
									/>
								) : (
									<div className='w-full h-full flex items-center justify-center'>
										<svg
											className='w-16 h-16 text-slate-300'
											fill='none'
											stroke='currentColor'
											viewBox='0 0 24 24'>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth={1}
												d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
											/>
										</svg>
									</div>
								)}
								{/* Category Badge */}
								<div className='absolute top-3 left-3'>
									<span
										className='px-2 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold rounded-full border'
										style={{
											color: getCategoryColor(
												product.category._id || product.category
											),
											borderColor: getCategoryColor(
												product.category._id || product.category
											),
										}}>
										{getCategoryName(product.category._id || product.category)}
									</span>
								</div>
								{/* Stock Status */}
								<div className='absolute top-3 right-3'>
									<span
										className={`px-2 py-1 text-xs font-semibold rounded-full ${product.stock > 10
												? 'bg-green-100 text-green-800'
												: product.stock > 0
													? 'bg-yellow-100 text-yellow-800'
													: 'bg-red-100 text-red-800'
											}`}>
										{product.stock > 10
											? 'In Stock'
											: product.stock > 0
												? 'Low Stock'
												: 'Out of Stock'}
									</span>
								</div>
							</div>

							{/* Product Details */}
							<div className='p-4'>
								<h3 className='font-bold text-slate-900 text-lg mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors'>
									{product.title}
								</h3>
								<p className='text-sm text-slate-600 mb-3 line-clamp-2'>
									{product.description}
								</p>

								{/* Price and Rating */}
								<div className='flex items-center justify-between'>
									<div className='flex flex-col'>
										<span className='text-xl font-bold text-slate-900'>
											₹{product.price}
										</span>
										{product.offer > 0 && (
											<span className='text-sm text-green-600 font-medium'>
												{product.offer}% off
											</span>
										)}
									</div>
									<div className='flex items-center gap-1'>
										<svg
											className='w-4 h-4 text-yellow-400 fill-current'
											viewBox='0 0 24 24'>
											<path d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' />
										</svg>
										<span className='text-sm font-medium text-slate-700'>
											{product.ratings || 0}
										</span>
									</div>
								</div>

								{/* Date */}
								<p className='text-xs text-slate-500 mt-3'>
									Added{' '}
									{new Date(product.createdAt).toLocaleDateString('en-US', {
										month: 'short',
										day: 'numeric',
										year: 'numeric',
									})}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Latest Blogs Section */}
			<div className='bg-white rounded-2xl shadow-lg p-6 border border-slate-200 mb-6'>
				<div className='flex items-center justify-between mb-6'>
					<h2 className='text-2xl font-bold text-slate-800'>Latest Blogs</h2>
					<Link
						to='/admin/blogs/manage'
						className='text-green-600 hover:text-green-800 font-medium transition-colors'>
						View All →
					</Link>
				</div>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
					{latestBlogs.map((blog) => (
						<div
							key={blog._id}
							className='bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg hover:border-slate-300 transition-all duration-200 group'>
							{/* Image Container */}
							<div className='relative h-48 bg-slate-100'>
								{blog.metaImage ? (
									<img
										src={blog.metaImage}
										alt={blog.metaTitle}
										className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-200'
									/>
								) : (
									<div className='w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200'>
										<svg
											className='w-12 h-12 text-slate-400'
											fill='none'
											stroke='currentColor'
											viewBox='0 0 24 24'>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth={1.5}
												d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
											/>
										</svg>
									</div>
								)}
								{/* Category Badge */}
								<div className='absolute top-3 left-3'>
									<span className='inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-white/90 backdrop-blur-sm text-slate-700 border border-slate-200'>
										{blog.category?.name || 'Uncategorized'}
									</span>
								</div>
							</div>

							{/* Content */}
							<div className='p-5'>
								<h3 className='font-semibold text-slate-800 mb-2 line-clamp-2 leading-tight'>
									{blog.title}
								</h3>
								<p className='text-sm text-slate-600 mb-4 line-clamp-2 leading-relaxed'>
									{blog.metaDescription}
								</p>

								{/* Footer */}
								<div className='flex items-center justify-between pt-3 border-t border-slate-100'>
									<div className='flex items-center gap-2'>
										<div className='w-6 h-6 bg-slate-200 rounded-full flex items-center justify-center'>
											<span className='text-xs font-medium text-slate-600'>
												{blog.author.charAt(0).toUpperCase()}
											</span>
										</div>
										<span className='text-xs text-slate-600 font-medium'>
											{blog.author}
										</span>
									</div>
									<span className='text-xs text-slate-500'>
										{new Date(blog.date).toLocaleDateString('en-US', {
											month: 'short',
											day: 'numeric',
											year: 'numeric',
										})}
									</span>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Latest Users Section */}
			<div className='bg-white rounded-2xl shadow-lg p-6 border border-slate-200'>
				<div className='flex items-center justify-between mb-6'>
					<h2 className='text-2xl font-bold text-slate-800'>Latest Users</h2>
					<Link
						to='/admin/users'
						className='text-purple-600 hover:text-purple-800 font-medium transition-colors'>
						View All →
					</Link>
				</div>
				<div className='grid gap-4'>
					{latestUsers.map((user) => (
						<div
							key={user.id}
							className='group bg-gradient-to-r from-slate-50 to-white border border-slate-200 rounded-xl p-4 hover:shadow-md hover:border-purple-200 transition-all duration-200 cursor-pointer'>
							<div className='flex items-center justify-between gap-4'>
								<div className='flex items-center gap-4 flex-1 min-w-0'>
									<div className='relative'>
										<div className='w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center shadow-sm'>
											<span className='text-white font-bold text-lg'>
												{user.name.charAt(0).toUpperCase()}
											</span>
										</div>
										<div
											className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${user.role === 'admin' ? 'bg-red-500' : 'bg-green-500'
												}`}></div>
									</div>
									<div className='flex-1 min-w-0'>
										<h3 className='font-bold text-slate-900 text-lg truncate'>
											{user.name}
										</h3>
										<p className='text-base text-slate-700 font-medium truncate'>
											{user.email}
										</p>
									</div>
								</div>
								<div className='flex flex-col items-end gap-2'>
									<span
										className={`px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap ${user.role === 'admin'
												? 'bg-red-100 text-red-800 border-2 border-red-300'
												: 'bg-emerald-100 text-emerald-800 border-2 border-emerald-300'
											}`}>
										{user.role}
									</span>
									<p className='text-sm text-slate-600 font-medium whitespace-nowrap'>
										Joined{' '}
										{new Date(user.createdAt).toLocaleDateString('en-US', {
											month: 'short',
											day: 'numeric',
											year: 'numeric',
										})}
									</p>
								</div>
								<div className='opacity-0 group-hover:opacity-100 transition-opacity'>
									<svg
										className='w-5 h-5 text-slate-400'
										fill='none'
										stroke='currentColor'
										viewBox='0 0 24 24'>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M9 5l7 7-7 7'
										/>
									</svg>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default AdminHome
