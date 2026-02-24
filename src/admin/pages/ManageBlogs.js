import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ReactQuill from 'react-quill-new'
import 'react-quill-new/dist/quill.snow.css'

const ManageBlogs = () => {
	const [blogs, setBlogs] = useState([])
	const [categories, setCategories] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [editModal, setEditModal] = useState({ isOpen: false, blog: null })
	const [editForm, setEditForm] = useState({
		metaTitle: '',
		metaDescription: '',
		title: '',
		content: '',
		category: '',
		author: '',
		date: '',
	})
	const [editImage, setEditImage] = useState(null)
	const [editImagePreview, setEditImagePreview] = useState('')
	const [isSaving, setIsSaving] = useState(false)

	// Search state
	const [searchText, setSearchText] = useState('')
	const [selectedCategory, setSelectedCategory] = useState('')
	const [showCategoryDropdown, setShowCategoryDropdown] = useState(false)

	// Rich text editor modules configuration
	const quillModules = {
		toolbar: [
			[{ header: [1, 2, 3, false] }],
			['bold', 'italic', 'underline', 'strike'],
			[{ list: 'ordered' }, { list: 'bullet' }],
			[{ indent: '-1' }, { indent: '+1' }],
			[{ align: [] }],
			['link'],
			['clean'],
		],
	}

	const quillFormats = [
		'header',
		'bold',
		'italic',
		'underline',
		'strike',
		'list',
		'indent',
		'align',
		'link',
	]

	useEffect(() => {
		fetchBlogs()
		fetchCategories()
		// eslint-disable-next-line
	}, [])

	const fetchBlogs = async () => {
		try {
			// Build query parameters
			let url = `${process.env.REACT_APP_API_URL}/api/blogs?`
			const params = []

			if (searchText.trim()) {
				params.push(`search=${encodeURIComponent(searchText.trim())}`)
			}

			if (selectedCategory) {
				params.push(`category=${selectedCategory}`)
			}

			if (params.length > 0) {
				url += params.join('&')
			}

			const response = await axios.get(url)
			if (response.data.success) {
				setBlogs(response.data.data)
			}
		} catch (error) {
			console.error('Error fetching blogs:', error)
			toast.error('Failed to load blogs')
		} finally {
			setIsLoading(false)
		}
	}

	const fetchCategories = async () => {
		try {
			const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/categories`)
			if (response.data.success) {
				setCategories(response.data.data)
			}
		} catch (error) {
			console.error('Error fetching categories:', error)
			toast.error('Failed to load categories')
		}
	}

	const handleEdit = (blog) => {
		setEditForm({
			metaTitle: blog.metaTitle,
			metaDescription: blog.metaDescription,
			title: blog.title,
			content: blog.content,
			category: blog.category?._id || blog.category,
			author: blog.author,
			date: new Date(blog.date).toISOString().split('T')[0],
		})
		setEditImage(blog.image)
		setEditImagePreview(blog.image)
		setEditModal({ isOpen: true, blog })
	}

	const closeEditModal = () => {
		setEditModal({ isOpen: false, blog: null })
		setEditForm({
			metaTitle: '',
			metaDescription: '',
			title: '',
			content: '',
			category: '',
			author: '',
			date: '',
		})
		setEditImage(null)
		setEditImagePreview('')
	}

	const handleImageChange = (e) => {
		const file = e.target.files[0]
		if (file) {
			if (file.size > 5 * 1024 * 1024) {
				toast.error('Image size should be less than 5MB')
				return
			}

			const reader = new FileReader()
			reader.onloadend = () => {
				setEditImage(reader.result)
				setEditImagePreview(reader.result)
			}
			reader.readAsDataURL(file)
		}
	}

	const handleUpdate = async (e) => {
		e.preventDefault()
		setIsSaving(true)

		try {
			const blogData = {
				metaTitle: editForm.metaTitle.trim(),
				metaDescription: editForm.metaDescription.trim(),
				image: editImage,
				title: editForm.title.trim(),
				content: editForm.content.trim(),
				category: editForm.category,
				author: editForm.author.trim(),
				date: editForm.date,
			}

			const response = await axios.put(
				`${process.env.REACT_APP_API_URL}/api/blogs/${editModal.blog._id}`,
				blogData
			)

			if (response.data.success) {
				toast.success('Blog updated successfully!')
				fetchBlogs()
				closeEditModal()
			}
		} catch (error) {
			console.error('Error updating blog:', error)
			const errorMessage =
				error.response?.data?.message || 'Failed to update blog'
			toast.error(errorMessage)
		} finally {
			setIsSaving(false)
		}
	}

	const handleDelete = async (id) => {
		if (!window.confirm('Are you sure you want to delete this blog?')) {
			return
		}

		try {
			const response = await axios.delete(
				`${process.env.REACT_APP_API_URL}/api/blogs/${id}`
			)

			if (response.data.success) {
				toast.success('Blog deleted successfully!')
				fetchBlogs()
			}
		} catch (error) {
			console.error('Error deleting blog:', error)
			const errorMessage =
				error.response?.data?.message || 'Failed to delete blog'
			toast.error(errorMessage)
		}
	}

	const formatDate = (date) => {
		return new Date(date).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
		})
	}

	// Handle search
	const handleSearch = (e) => {
		e.preventDefault()
		setIsLoading(true)
		fetchBlogs()
	}

	// Handle search on Enter key
	const handleSearchKeyPress = (e) => {
		if (e.key === 'Enter') {
			handleSearch(e)
		}
	}

	// Handle reset/clear search
	const handleResetSearch = () => {
		const isAlreadyCleared = searchText === '' && selectedCategory === ''

		setSearchText('')
		setSelectedCategory('')
		setShowCategoryDropdown(false)

		if (isAlreadyCleared) {
			setIsLoading(true)
			fetchBlogs()
		} else {
			setIsLoading(true)
			// Fetch blogs after clearing will be handled by useEffect
		}
	}

	// Re-fetch blogs when search criteria changes
	useEffect(() => {
		if (searchText === '' && selectedCategory === '') {
			fetchBlogs()
		}
		// eslint-disable-next-line
	}, [searchText, selectedCategory])

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (!event.target.closest('.category-dropdown-container')) {
				setShowCategoryDropdown(false)
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [])

	return (
		<div className='max-w-6xl'>

			<div className='mb-8'>
				<h1 className='text-3xl font-bold text-slate-800 mb-2'>Manage Blogs</h1>
				<p className='text-slate-600'>View and edit your blog posts</p>
			</div>

			{/* Search Bar */}
			<div className='bg-white rounded-2xl shadow-lg border border-slate-200 p-6 mb-6'>
				<form
					onSubmit={handleSearch}
					className='space-y-6'>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
						{/* Text Search */}
						<div className='relative group'>
							<label className='block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 ml-1'>
								Meta Title
							</label>
							<div className='relative'>
								<svg
									className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth='2'
										d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
									/>
								</svg>
								<input
									type='text'
									value={searchText}
									onChange={(e) => setSearchText(e.target.value)}
									onKeyPress={handleSearchKeyPress}
									placeholder='Search by meta title...'
									className='w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all duration-200 text-slate-700 placeholder-slate-400 text-sm'
								/>
							</div>
						</div>

						{/* Category Dropdown */}
						<div className='relative group category-dropdown-container'>
							<label className='block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 ml-1'>
								Category
							</label>
							<div className='relative'>
								<button
									type='button'
									onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
									className='w-full pl-3 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-xl text-left text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all duration-200 text-sm'>
									<span
										className={`block truncate ${!selectedCategory ? 'text-slate-400' : ''
											}`}>
										{selectedCategory
											? categories.find((c) => c._id === selectedCategory)?.name
											: 'All Categories'}
									</span>
									<span className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'>
										<svg
											className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${showCategoryDropdown ? 'rotate-180' : ''
												}`}
											fill='none'
											stroke='currentColor'
											viewBox='0 0 24 24'>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth='2'
												d='M19 9l-7 7-7-7'
											/>
										</svg>
									</span>
								</button>

								{showCategoryDropdown && (
									<div className='absolute z-10 mt-2 w-full bg-white rounded-xl shadow-xl border border-slate-100 animate-in fade-in zoom-in-95 duration-100 overflow-hidden'>
										<div className='max-h-60 overflow-auto p-1'>
											<button
												type='button'
												className={`w-full text-left px-4 py-2.5 rounded-lg text-sm transition-colors ${!selectedCategory
													? 'bg-blue-50 text-blue-700 font-medium'
													: 'text-slate-700 hover:bg-slate-50'
													}`}
												onClick={() => {
													setSelectedCategory('')
													setShowCategoryDropdown(false)
												}}>
												All Categories
											</button>
											{categories.map((cat) => (
												<button
													key={cat._id}
													type='button'
													className={`w-full text-left px-4 py-2.5 rounded-lg text-sm transition-colors ${selectedCategory === cat._id
														? 'bg-blue-50 text-blue-700 font-medium'
														: 'text-slate-700 hover:bg-slate-50'
														}`}
													onClick={() => {
														setSelectedCategory(cat._id)
														setShowCategoryDropdown(false)
													}}>
													{cat.name}
												</button>
											))}
										</div>
									</div>
								)}
							</div>
						</div>
					</div>

					{/* Action Buttons */}
					<div className='flex items-center justify-end gap-3 pt-2 border-t border-slate-100 mt-6'>
						<button
							type='button'
							onClick={handleResetSearch}
							className='flex items-center gap-2 px-4 py-2 bg-white text-slate-600 font-semibold rounded-lg border border-slate-200 hover:bg-slate-50 hover:text-slate-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-200 text-sm'>
							<svg
								className='w-4 h-4'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth='2'
									d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'
								/>
							</svg>
							Reset Filters
						</button>
						<button
							type='submit'
							className='flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm'>
							<svg
								className='w-4 h-4'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth='2'
									d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
								/>
							</svg>
							Search Blogs
						</button>
					</div>
				</form>
			</div>

			<div className='bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden'>
				{isLoading ? (
					<div className='flex justify-center items-center py-12'>
						<div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600'></div>
					</div>
				) : blogs.length === 0 ? (
					<div className='text-center py-12'>
						<p className='text-slate-500'>No blogs found</p>
					</div>
				) : (
					<table className='w-full divide-y divide-slate-200'>
						<thead className='bg-slate-50'>
							<tr>
								<th className='px-4 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider w-16'>
									S No
								</th>
								<th className='px-4 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider w-20'>
									Image
								</th>
								<th className='px-4 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider max-w-48'>
									Meta Title
								</th>
								<th className='px-4 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider w-24'>
									Category
								</th>

								<th className='px-4 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider max-w-64'>
									Meta Desc
								</th>
								<th className='px-4 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider w-24'>
									Author
								</th>
								<th className='px-4 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider w-24'>
									Date
								</th>
								<th className='px-4 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider w-32'>
									Actions
								</th>
							</tr>
						</thead>
						<tbody className='bg-white divide-y divide-slate-200'>
							{blogs
								.filter((blog) => blog !== null)
								.map((blog, index) => (
									<tr
										key={blog._id}
										className='hover:bg-slate-50 transition'>
										<td className='px-4 py-4 whitespace-nowrap text-sm text-slate-700'>
											{index + 1}
										</td>
										<td className='px-4 py-4 whitespace-nowrap'>
											<img
												src={blog.image}
												alt={blog.metaTitle}
												className='w-16 h-16 object-cover rounded-lg border-2 border-slate-200'
											/>
										</td>
										<td className='px-4 py-4 text-sm font-medium text-slate-900'>
											<div
												className='max-w-48 truncate'
												title={blog.metaTitle}>
												{blog.metaTitle}
											</div>
										</td>
										<td className='px-4 py-4 whitespace-nowrap text-sm text-slate-700'>
											<span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800'>
												{blog.category?.name || 'Uncategorized'}
											</span>
										</td>

										<td className='px-4 py-4 text-sm text-slate-600'>
											<div
												className='max-w-64 truncate'
												title={blog.metaDescription}>
												{blog.metaDescription}
											</div>
										</td>
										<td className='px-4 py-4 whitespace-nowrap text-sm text-slate-700'>
											{blog.author}
										</td>
										<td className='px-4 py-4 whitespace-nowrap text-sm text-slate-700'>
											{formatDate(blog.date)}
										</td>
										<td className='px-4 py-4 whitespace-nowrap text-sm'>
											<div className='flex items-center gap-3'>
												<button
													onClick={() => handleEdit(blog)}
													className='text-blue-600 hover:text-blue-800 transition'
													title='Edit'>
													<svg
														className='w-5 h-5'
														fill='none'
														stroke='currentColor'
														viewBox='0 0 24 24'>
														<path
															strokeLinecap='round'
															strokeLinejoin='round'
															strokeWidth={2}
															d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
														/>
													</svg>
												</button>
												<button
													onClick={() => handleDelete(blog._id)}
													className='text-red-600 hover:text-red-800 transition'
													title='Delete'>
													<svg
														className='w-5 h-5'
														fill='none'
														stroke='currentColor'
														viewBox='0 0 24 24'>
														<path
															strokeLinecap='round'
															strokeLinejoin='round'
															strokeWidth={2}
															d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
														/>
													</svg>
												</button>
											</div>
										</td>
									</tr>
								))}
						</tbody>
					</table>
				)}
			</div>

			{/* Edit Modal */}
			{editModal.isOpen && (
				<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
					<div className='bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto'>
						<div className='sticky top-0 bg-white border-b border-slate-200 px-8 py-6 flex justify-between items-center'>
							<h2 className='text-2xl font-bold text-slate-800'>Edit Blog</h2>
							<button
								onClick={closeEditModal}
								className='text-slate-400 hover:text-slate-600 transition'>
								<svg
									className='w-6 h-6'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M6 18L18 6M6 6l12 12'
									/>
								</svg>
							</button>
						</div>

						<form
							onSubmit={handleUpdate}
							className='p-6 space-y-6 bg-slate-50/50'>
							{/* Basic Info Card */}
							<div className='bg-white p-4 rounded-xl border border-slate-200 shadow-sm'>
								<h3 className='text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2'>
									<span className='w-1 h-4 bg-blue-600 rounded-full'></span>
									Basic Info
								</h3>
								<div className='space-y-4'>
									{/* Title */}
									<div>
										<label className='block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider'>
											Title
										</label>
										<input
											type='text'
											value={editForm.title}
											onChange={(e) =>
												setEditForm({ ...editForm, title: e.target.value })
											}
											className='w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-slate-50 hover:bg-white'
											required
										/>
									</div>

									{/* Category, Author, Date Row */}
									<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
										<div>
											<label className='block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider'>
												Category
											</label>
											<select
												value={editForm.category}
												onChange={(e) =>
													setEditForm({ ...editForm, category: e.target.value })
												}
												className='w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-slate-50 hover:bg-white'
												required>
												<option value=''>Select Category</option>
												{categories.map((category) => (
													<option
														key={category._id}
														value={category._id}>
														{category.name}
													</option>
												))}
											</select>
										</div>
										<div>
											<label className='block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider'>
												Author
											</label>
											<input
												type='text'
												value={editForm.author}
												onChange={(e) =>
													setEditForm({ ...editForm, author: e.target.value })
												}
												className='w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-slate-50 hover:bg-white'
												required
											/>
										</div>
										<div>
											<label className='block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider'>
												Date
											</label>
											<input
												type='date'
												value={editForm.date}
												onChange={(e) =>
													setEditForm({ ...editForm, date: e.target.value })
												}
												className='w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-slate-50 hover:bg-white'
												required
											/>
										</div>
									</div>
								</div>
							</div>

							{/* Content & SEO Card */}
							<div className='bg-white p-4 rounded-xl border border-slate-200 shadow-sm'>
								<h3 className='text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2'>
									<span className='w-1 h-4 bg-purple-600 rounded-full'></span>
									Content & SEO
								</h3>
								<div className='space-y-4'>
									{/* Meta Title */}
									<div>
										<label className='block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider'>
											Meta Title
										</label>
										<input
											type='text'
											value={editForm.metaTitle}
											onChange={(e) =>
												setEditForm({ ...editForm, metaTitle: e.target.value })
											}
											className='w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-slate-50 hover:bg-white'
											required
										/>
									</div>

									{/* Meta Description */}
									<div>
										<label className='block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider'>
											Meta Description
										</label>
										<textarea
											value={editForm.metaDescription}
											onChange={(e) =>
												setEditForm({
													...editForm,
													metaDescription: e.target.value,
												})
											}
											rows='3'
											className='w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-slate-50 hover:bg-white resize-none'
											required
										/>
									</div>

									{/* Content */}
									<div>
										<label className='block text-xs font-semibold text-slate-600 mb-2 uppercase tracking-wider'>
											Blog Content
										</label>
										<div className='h-80'>
											<ReactQuill
												theme='snow'
												value={editForm.content}
												onChange={(value) =>
													setEditForm({ ...editForm, content: value })
												}
												modules={quillModules}
												formats={quillFormats}
												className='bg-white rounded-lg h-full'
												placeholder='Write your blog content here...'
											/>
										</div>
										<div className='h-12'></div>{' '}
										{/* Spacer for Quill toolbar */}
									</div>
								</div>
							</div>

							{/* Media Card */}
							<div className='bg-white p-4 rounded-xl border border-slate-200 shadow-sm'>
								<h3 className='text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2'>
									<span className='w-1 h-4 bg-indigo-600 rounded-full'></span>
									Media
								</h3>
								<div>
									<label className='block text-xs font-semibold text-slate-600 mb-2 uppercase tracking-wider'>
										Featured Image
									</label>
									<div className='flex items-start gap-6'>
										<div className='flex-1'>
											<input
												type='file'
												accept='image/*'
												onChange={handleImageChange}
												className='block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-all'
											/>
											<p className='text-xs text-slate-500 mt-2'>
												Leave empty to keep existing image (Max 5MB)
											</p>
										</div>
										{editImagePreview && (
											<div className='w-32 h-32 flex-shrink-0'>
												<img
													src={editImagePreview}
													alt='Preview'
													className='w-full h-full object-cover rounded-lg border-2 border-slate-200 shadow-sm'
												/>
											</div>
										)}
									</div>
								</div>
							</div>

							{/* Buttons - Sticky Bottom (Optional, but kept inline here per structure) */}
							<div className='flex justify-end gap-3 pt-4 border-t border-slate-200'>
								<button
									type='button'
									onClick={closeEditModal}
									className='px-5 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-200 transition-all shadow-sm'>
									Cancel
								</button>
								<button
									type='submit'
									disabled={isSaving}
									className={`px-5 py-2.5 text-sm font-medium text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all flex items-center gap-2 ${isSaving
										? 'bg-slate-400 cursor-not-allowed'
										: 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'
										}`}>
									{isSaving ? (
										<>
											<div className='w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin'></div>
											Saving...
										</>
									) : (
										<>
											<span>Save Changes</span>
											<svg
												className='w-4 h-4'
												fill='none'
												viewBox='0 0 24 24'
												stroke='currentColor'>
												<path
													strokeLinecap='round'
													strokeLinejoin='round'
													strokeWidth={2}
													d='M5 13l4 4L19 7'
												/>
											</svg>
										</>
									)}
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</div>
	)
}

export default ManageBlogs
