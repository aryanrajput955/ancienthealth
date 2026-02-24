import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ReactQuill from 'react-quill-new'
import 'react-quill-new/dist/quill.snow.css'

const AddBlog = () => {
	const [formData, setFormData] = useState({
		metaTitle: '',
		metaDescription: '',
		title: '',
		content: '',
		category: '',
		author: '',
		date: new Date().toISOString().split('T')[0],
	})

	const [categories, setCategories] = useState([])
	const [image, setImage] = useState(null)
	const [imagePreview, setImagePreview] = useState('')
	const [isSubmitting, setIsSubmitting] = useState(false)

	useEffect(() => {
		fetchCategories()
	}, [])

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

	const handleInputChange = (e) => {
		const { name, value } = e.target
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}))
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
				setImage(reader.result)
				setImagePreview(reader.result)
			}
			reader.readAsDataURL(file)
		}
	}

	const removeImage = () => {
		setImage(null)
		setImagePreview('')
	}

	const handleSubmit = async (e) => {
		e.preventDefault()

		// Validation
		if (!formData.title.trim()) {
			toast.error('Please enter blog title')
			return
		}
		if (
			!formData.content.trim() ||
			formData.content.replace(/<[^>]*>/g, '').trim() === ''
		) {
			toast.error('Please enter blog content')
			return
		}
		if (!image) {
			toast.error('Please upload image')
			return
		}
		if (!formData.category) {
			toast.error('Please select a category')
			return
		}
		if (!formData.author.trim()) {
			toast.error('Please enter author name')
			return
		}
		if (!formData.date) {
			toast.error('Please select date')
			return
		}
		if (!formData.metaTitle.trim()) {
			toast.error('Please enter meta title')
			return
		}
		if (!formData.metaDescription.trim()) {
			toast.error('Please enter meta description')
			return
		}

		setIsSubmitting(true)

		try {
			const blogData = {
				metaTitle: formData.metaTitle.trim(),
				metaDescription: formData.metaDescription.trim(),
				image: image,
				title: formData.title.trim(),
				content: formData.content.trim(),
				category: formData.category,
				author: formData.author.trim(),
				date: formData.date,
			}

			const response = await axios.post(
				`${process.env.REACT_APP_API_URL}/api/blogs`,
				blogData
			)

			if (
				response.data &&
				(response.data.success === true || response.status === 201)
			) {
				toast.success('Blog created successfully!')
				// Reset form
				setFormData({
					metaTitle: '',
					metaDescription: '',
					title: '',
					content: '',
					category: '',
					author: '',
					date: new Date().toISOString().split('T')[0],
				})
				setImage(null)
				setImagePreview('')
			} else {
				toast.error(response.data?.message || 'Failed to create blog')
			}
		} catch (error) {
			console.error('Error creating blog:', error)
			console.error('Error response:', error.response)
			const errorMessage =
				error.response?.data?.message || 'Failed to create blog'
			toast.error(errorMessage)
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<div className='max-w-5xl mx-auto'>

			<div className='mb-8'>
				<h1 className='text-3xl font-bold text-slate-800 mb-2'>Add Blog</h1>
				<p className='text-slate-600'>Create a new blog post</p>
			</div>

			<form
				onSubmit={handleSubmit}
				className='space-y-6'>
				{/* Basic Info Card */}
				<div className='bg-white p-6 rounded-xl border border-slate-200 shadow-sm'>
					<h3 className='text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2'>
						<span className='w-1 h-4 bg-blue-600 rounded-full'></span>
						Basic Info
					</h3>

					{/* Title */}
					<div className='mb-4'>
						<label className='block text-xs font-semibold text-slate-600 mb-1 uppercase tracking-wider'>
							Title <span className='text-red-500'>*</span>
						</label>
						<input
							type='text'
							name='title'
							value={formData.title}
							onChange={handleInputChange}
							className='w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm'
							placeholder='Enter blog title'
							required
						/>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
						{/* Category */}
						<div>
							<label className='block text-xs font-semibold text-slate-600 mb-1 uppercase tracking-wider'>
								Category <span className='text-red-500'>*</span>
							</label>
							<select
								name='category'
								value={formData.category}
								onChange={handleInputChange}
								className='w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm'
								required>
								<option value=''>Select a category</option>
								{categories.map((category) => (
									<option
										key={category._id}
										value={category._id}>
										{category.name}
									</option>
								))}
							</select>
						</div>

						{/* Author */}
						<div>
							<label className='block text-xs font-semibold text-slate-600 mb-1 uppercase tracking-wider'>
								Author <span className='text-red-500'>*</span>
							</label>
							<input
								type='text'
								name='author'
								value={formData.author}
								onChange={handleInputChange}
								className='w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm'
								placeholder='Enter author name'
								required
							/>
						</div>

						{/* Date */}
						<div>
							<label className='block text-xs font-semibold text-slate-600 mb-1 uppercase tracking-wider'>
								Date <span className='text-red-500'>*</span>
							</label>
							<input
								type='date'
								name='date'
								value={formData.date}
								onChange={handleInputChange}
								className='w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm'
								required
							/>
						</div>
					</div>
				</div>

				{/* Content & SEO Card */}
				<div className='bg-white p-6 rounded-xl border border-slate-200 shadow-sm'>
					<h3 className='text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2'>
						<span className='w-1 h-4 bg-purple-600 rounded-full'></span>
						Content & SEO
					</h3>

					{/* Content */}
					<div className='mb-4'>
						<label className='block text-xs font-semibold text-slate-600 mb-1 uppercase tracking-wider'>
							Content <span className='text-red-500'>*</span>
						</label>
						<ReactQuill
							theme='snow'
							value={formData.content}
							onChange={(value) =>
								setFormData((prev) => ({
									...prev,
									content: value,
								}))
							}
							modules={quillModules}
							formats={quillFormats}
							className='bg-white rounded-lg'
							placeholder='Enter blog content...'
						/>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
						{/* Meta Title */}
						<div>
							<label className='block text-xs font-semibold text-slate-600 mb-1 uppercase tracking-wider'>
								Meta Title <span className='text-red-500'>*</span>
							</label>
							<input
								type='text'
								name='metaTitle'
								value={formData.metaTitle}
								onChange={handleInputChange}
								className='w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm'
								placeholder='Enter meta title for SEO'
								required
							/>
						</div>

						{/* Meta Description */}
						<div>
							<label className='block text-xs font-semibold text-slate-600 mb-1 uppercase tracking-wider'>
								Meta Description <span className='text-red-500'>*</span>
							</label>
							<textarea
								name='metaDescription'
								value={formData.metaDescription}
								onChange={handleInputChange}
								rows='3'
								className='w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm'
								placeholder='Enter meta description for SEO'
								required
							/>
						</div>
					</div>
				</div>

				{/* Media Card */}
				<div className='bg-white p-6 rounded-xl border border-slate-200 shadow-sm'>
					<h3 className='text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2'>
						<span className='w-1 h-4 bg-emerald-600 rounded-full'></span>
						Media
					</h3>

					{/* Image */}
					<div>
						<label className='block text-xs font-semibold text-slate-600 mb-1 uppercase tracking-wider'>
							Image <span className='text-red-500'>*</span>
						</label>
						<div className='flex items-start gap-4'>
							<div className='flex-1'>
								<input
									type='file'
									accept='image/*'
									onChange={handleImageChange}
									className='w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm'
								/>
								<p className='text-xs text-slate-500 mt-2'>
									Recommended size: 1200x630px, Max size: 5MB
								</p>
							</div>
							{imagePreview && (
								<div className='relative'>
									<img
										src={imagePreview}
										alt='Preview'
										className='w-24 h-24 object-cover rounded-lg border-2 border-slate-200'
									/>
									<button
										type='button'
										onClick={removeImage}
										className='absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition'>
										<svg
											className='w-3 h-3'
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
							)}
						</div>
					</div>
				</div>

				{/* Submit Button */}
				<div className='flex justify-end'>
					<button
						type='submit'
						disabled={isSubmitting}
						className={`px-8 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl text-sm ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
							}`}>
						{isSubmitting ? 'Creating...' : 'Create Blog'}
					</button>
				</div>
			</form>
		</div>
	)
}

export default AddBlog
