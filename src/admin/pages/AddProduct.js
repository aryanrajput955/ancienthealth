import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ReactQuill from 'react-quill-new'
import 'react-quill-new/dist/quill.snow.css'

const AddProduct = () => {
	const [formData, setFormData] = useState({
		title: '',
		brand: '',
		sku: '',
		category: '',
		description: '',
		price: '',
		offer: '',
		stock: '',
		ratings: '',
	})

	const [images, setImages] = useState([])
	const [imagePreviews, setImagePreviews] = useState([])
	const [categories, setCategories] = useState([])
	const [faqs, setFaqs] = useState([])
	const [isDragging, setIsDragging] = useState(false)
	const [isSubmitting, setIsSubmitting] = useState(false)

	// Variant State
	const [hasVariants, setHasVariants] = useState(false)
	const [variants, setVariants] = useState([])
	const [variantOptions, setVariantOptions] = useState([{ name: '', values: '' }]) // e.g., [{name: 'Color', values: 'Red,Blue'}]

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

	// Calculate final price based on price and offer
	const calculateFinalPrice = () => {
		const price = parseFloat(formData.price) || 0
		const offer = parseFloat(formData.offer) || 0
		return price - (price * offer) / 100
	}

	// Fetch categories on component mount
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

	const handleInputChange = (e) => {
		const { name, value } = e.target
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}))
	}

	// Handle image file selection
	const handleImageSelect = (e) => {
		const files = Array.from(e.target.files)
		processImages(files)
	}

	// Process images and convert to base64
	const processImages = (files) => {
		files.forEach((file) => {
			if (file.type.startsWith('image/')) {
				const reader = new FileReader()
				reader.onload = (e) => {
					const base64 = e.target.result
					setImages((prev) => [...prev, base64])
					setImagePreviews((prev) => [...prev, base64])
				}
				reader.readAsDataURL(file)
			}
		})
	}

	// Handle drag and drop
	const handleDragEnter = (e) => {
		e.preventDefault()
		e.stopPropagation()
		setIsDragging(true)
	}

	const handleDragLeave = (e) => {
		e.preventDefault()
		e.stopPropagation()
		setIsDragging(false)
	}

	const handleDragOver = (e) => {
		e.preventDefault()
		e.stopPropagation()
	}

	const handleDrop = (e) => {
		e.preventDefault()
		e.stopPropagation()
		setIsDragging(false)

		const files = Array.from(e.dataTransfer.files)
		processImages(files)
	}

	// Remove image from list
	const removeImage = (index) => {
		setImages((prev) => prev.filter((_, i) => i !== index))
		setImagePreviews((prev) => prev.filter((_, i) => i !== index))
	}

	// Handle FAQ operations
	const addFaq = () => {
		setFaqs((prev) => [...prev, { question: '', answer: '' }])
	}

	const removeFaq = (index) => {
		setFaqs((prev) => prev.filter((_, i) => i !== index))
	}

	const handleFaqChange = (index, field, value) => {
		setFaqs((prev) => {
			const updated = [...prev]
			updated[index][field] = value
			return updated
		})
	}

	// Variant Helpers
	const handleVariantOptionChange = (index, field, value) => {
		const newOptions = [...variantOptions]
		newOptions[index][field] = value
		setVariantOptions(newOptions)
	}

	const addVariantOption = () => {
		setVariantOptions([...variantOptions, { name: '', values: '' }])
	}

	const removeVariantOption = (index) => {
		setVariantOptions(variantOptions.filter((_, i) => i !== index))
	}

	const generateVariants = () => {
		if (variantOptions.some((opt) => !opt.name || !opt.values)) {
			toast.error('Please fill all option names and values')
			return
		}

		// Step 1: Normalize Options (Group by name)
		const normalizedOptions = {}
		variantOptions.forEach((opt) => {
			const name = opt.name.trim()
			const lowerName = name.toLowerCase()
			if (!normalizedOptions[lowerName]) {
				normalizedOptions[lowerName] = { name: name, values: [] }
			}
			const vals = opt.values
				.split(',')
				.map((v) => v.trim())
				.filter((v) => v)
			normalizedOptions[lowerName].values.push(...vals)
		})

		const processedOptions = Object.values(normalizedOptions).map((opt) => ({
			name: opt.name,
			values: [...new Set(opt.values)], // Dedup values
		}))

		// Step 2: Cartesian Product
		let generated = [[]]
		processedOptions.forEach((option) => {
			const next = []
			generated.forEach((prev) => {
				option.values.forEach((value) => {
					next.push([...prev, { key: option.name, value }])
				})
			})
			generated = next
		})

		// Step 3: Smart Split Heuristic
		// If 1 variant generated BUT multiple input rows AND key ~= value (e.g. Red: Red, Blue: Blue)
		if (generated.length === 1 && variantOptions.length > 1) {
			const singleVariant = generated[0]
			// Check if keys match values (case-insensitive) for all attributes
			const isSuspicious = singleVariant.every(
				(attr) =>
					attr.key.trim().toLowerCase() === attr.value.trim().toLowerCase()
			)

			if (isSuspicious) {
				// Split into independent variants
				generated = singleVariant.map((attr) => [attr])
			}
		}

		// Step 4: Map to Variant Objects + Auto SKU
		const newVariants = generated.map((attrs) => {
			// Auto SKU: PRODUCT-VARIANT-VAL
			const skuBase =
				formData.sku && formData.sku.trim()
					? formData.sku.trim()
					: formData.title.substring(0, 3).toUpperCase()
			const variantSuffix = attrs
				.map((a) => a.value)
				.join('-')
				.toUpperCase()
			// Simple sanitization
			const autoSku = `${skuBase}-${variantSuffix}`.replace(/[^A-Z0-9-]/g, '')

			return {
				attributes: attrs,
				price: formData.price || '',
				stock: '',
				sku: autoSku,
				images: [], // Multiple images support
			}
		})

		setVariants(newVariants)
	}

	const handleVariantChange = (index, field, value) => {
		const newVariants = [...variants]
		newVariants[index][field] = value
		setVariants(newVariants)
	}

	// Quick Upload for Variant
	const handleVariantImageUpload = (e, variantIndex) => {
		const files = Array.from(e.target.files)
		const newRequests = []

		files.forEach((file) => {
			if (file && file.type.startsWith('image/')) {
				const reader = new FileReader()
				const promise = new Promise((resolve) => {
					reader.onload = (ev) => {
						resolve(ev.target.result)
					}
				})
				reader.readAsDataURL(file)
				newRequests.push(promise)
			}
		})

		Promise.all(newRequests).then((base64Images) => {
			// Add to global images? (Optional, maybe confusing if duplicates appear)
			// For now, keep them specific to variants as per request
			// But user might expect them in main gallery too. Original code did that.
			// Replicating original behavior:
			setImages((prev) => [...prev, ...base64Images])
			setImagePreviews((prev) => [...prev, ...base64Images])

			// Link to this variant
			const newVariants = [...variants]
			if (!newVariants[variantIndex].images) {
				newVariants[variantIndex].images = []
			}
			newVariants[variantIndex].images.push(...base64Images)
			setVariants(newVariants)
		})
	}

	// Form validation (Updated)
	const validateForm = () => {
		if (!formData.title.trim()) {
			toast.error('Please enter product title')
			return false
		}
		if (!formData.brand.trim()) {
			toast.error('Please enter brand')
			return false
		}
		if (!formData.category) {
			toast.error('Please select a category')
			return false
		}
		if (!formData.description.trim()) {
			toast.error('Please enter product description')
			return false
		}

		if (hasVariants) {
			if (variants.length === 0) {
				toast.error('Please generate at least one variant')
				return false
			}
			// Check if all variants have price
			const invalidVariant = variants.find((v) => !v.price || v.price <= 0)
			if (invalidVariant) {
				toast.error('All variants must have a valid price')
				return false
			}
		} else {
			if (!formData.price || formData.price <= 0) {
				toast.error('Please enter a valid price')
				return false
			}
			if (!formData.stock) {
				toast.error('Please enter stock quantity')
				return false
			}
		}

		if (images.length === 0) {
			toast.error('Please upload at least one image')
			return false
		}
		return true
	}

	// Handle form submission
	const handleSubmit = async (e) => {
		e.preventDefault()

		if (!validateForm()) {
			return
		}

		setIsSubmitting(true)

		try {
			// Prepare FAQ data (only include non-empty FAQs)
			const validFaqs = faqs.filter(
				(faq) => faq.question.trim() && faq.answer.trim()
			)

			const productData = {
				title: formData.title.trim(),
				brand: formData.brand.trim(),
				sku: formData.sku ? formData.sku.trim() : undefined,
				category: formData.category,
				images: images,
				description: formData.description.trim(),
				price: hasVariants ? 0 : parseFloat(formData.price), // Price calculated on backend if variants exist
				offer: formData.offer ? parseFloat(formData.offer) : 0,
				ratings: formData.ratings ? parseFloat(formData.ratings) : 0,
				stock: hasVariants ? 0 : formData.stock ? parseInt(formData.stock) : 0,
				faqs: validFaqs,
				hasVariants,
				variants: hasVariants ? variants : [],
			}

			// Get token from localStorage
			const token = localStorage.getItem('token')

			const response = await axios.post(
				`${process.env.REACT_APP_API_URL}/api/products`,
				productData,
				{
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json',
					},
				}
			)

			if (response.data.success) {
				toast.success('Product added successfully!', {
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
				})

				// Reset form
				setFormData({
					title: '',
					brand: '',
					sku: '',
					category: '',
					description: '',
					price: '',
					offer: '',
					stock: '',
					ratings: '',
				})
				setImages([])
				setImagePreviews([])
				setFaqs([])
				setHasVariants(false)
				setVariants([])
				setVariantOptions([{ name: '', values: '' }])
			}
		} catch (error) {
			console.error('Error adding product:', error)
			const errorMessage =
				error.response?.data?.message || 'Failed to add product'
			toast.error(errorMessage, {
				autoClose: 4000,
			})
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<div className='max-w-5xl mx-auto'>

			<div className='mb-8'>
				<h1 className='text-3xl font-bold text-slate-800 mb-2'>Add Product</h1>
				<p className='text-slate-600'>Create a new product in your catalog</p>
			</div>

			<form
				onSubmit={handleSubmit}
				className='space-y-6'>
				{/* Basic Info */}
				<div className='bg-white p-6 rounded-xl border border-slate-200 shadow-sm'>
					<h3 className='text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2'>
						<span className='w-1 h-4 bg-blue-600 rounded-full'></span>
						Basic Info
					</h3>
					{/* Title */}
					<div className='mb-4'>
						<label className='block text-sm font-semibold text-slate-700 mb-2'>
							Product Title <span className='text-red-500'>*</span>
						</label>
						<input
							type='text'
							name='title'
							value={formData.title}
							onChange={handleInputChange}
							className='w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm'
							placeholder='Enter product title'
							required
						/>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
						{/* Brand */}
						<div>
							<label className='block text-xs font-semibold text-slate-600 mb-1 uppercase tracking-wider'>
								Brand <span className='text-red-500'>*</span>
							</label>
							<input
								type='text'
								name='brand'
								value={formData.brand}
								onChange={handleInputChange}
								className='w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm'
								placeholder='Enter brand name'
								required
							/>
						</div>

						{/* Base SKU */}
						<div>
							<label className='block text-xs font-semibold text-slate-600 mb-1 uppercase tracking-wider'>
								SKU{' '}
								<span className='text-slate-400 font-normal'>
									(Auto-generated)
								</span>
							</label>
							<input
								type='text'
								name='sku'
								value={formData.sku}
								onChange={handleInputChange}
								className='w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm'
								placeholder='Enter SKU (Optional)'
							/>
						</div>

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
								{categories.map((cat) => (
									<option
										key={cat._id}
										value={cat._id}>
										{cat.name}
									</option>
								))}
							</select>
						</div>
					</div>
				</div>

				{/* Media & Description */}
				<div className='bg-white p-6 rounded-xl border border-slate-200 shadow-sm'>
					<h3 className='text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2'>
						<span className='w-1 h-4 bg-purple-600 rounded-full'></span>
						Media & Description
					</h3>
					{/* Image Upload - Drag and Drop */}
					<div className='mb-4'>
						<label className='block text-sm font-semibold text-slate-700 mb-2'>
							Product Images <span className='text-red-500'>*</span>
						</label>
						<div
							className={`border-2 border-dashed rounded-lg p-8 text-center transition ${isDragging
								? 'border-blue-500 bg-blue-50'
								: 'border-slate-300 hover:border-slate-400'
								}`}
							onDragEnter={handleDragEnter}
							onDragOver={handleDragOver}
							onDragLeave={handleDragLeave}
							onDrop={handleDrop}>
							<div className='mb-4'>
								<svg
									className='mx-auto h-12 w-12 text-slate-400'
									stroke='currentColor'
									fill='none'
									viewBox='0 0 48 48'>
									<path
										d='M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02'
										strokeWidth={2}
										strokeLinecap='round'
										strokeLinejoin='round'
									/>
								</svg>
							</div>
							<p className='text-sm text-slate-600 mb-2'>
								Drag and drop images here, or click to select
							</p>
							<input
								type='file'
								accept='image/*'
								multiple
								onChange={handleImageSelect}
								className='hidden'
								id='image-upload'
							/>
							<label
								htmlFor='image-upload'
								className='inline-block px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600 transition'>
								Choose Images
							</label>
						</div>

						{/* Image Previews */}
						{imagePreviews.length > 0 && (
							<div className='mt-4 grid grid-cols-2 md:grid-cols-4 gap-4'>
								{imagePreviews.map((preview, index) => (
									<div
										key={index}
										className='relative group'>
										<img
											src={preview}
											alt={`Preview ${index + 1}`}
											className='w-full h-32 object-cover rounded-lg border border-slate-200'
										/>
										<button
											type='button'
											onClick={() => removeImage(index)}
											className='absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition'>
											<svg
												className='w-4 h-4'
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
								))}
							</div>
						)}
					</div>

					{/* Description */}
					<div className='mb-4'>
						<label className='block text-sm font-semibold text-slate-700 mb-2'>
							Description <span className='text-red-500'>*</span>
						</label>
						<ReactQuill
							theme='snow'
							value={formData.description}
							onChange={(value) =>
								setFormData((prev) => ({
									...prev,
									description: value,
								}))
							}
							modules={quillModules}
							formats={quillFormats}
							className='bg-white rounded-lg'
							placeholder='Enter product description...'
						/>
					</div>
				</div>

				{/* Inventory & Variants */}
				<div className='bg-white p-6 rounded-xl border border-slate-200 shadow-sm'>
					<h3 className='text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2'>
						<span className='w-1 h-4 bg-emerald-600 rounded-full'></span>
						Inventory & Variants
					</h3>
					{/* Variant Toggle */}
					<div className='mb-6 bg-slate-50 p-4 rounded-lg border border-slate-200'>
						<label className='flex items-center gap-3 cursor-pointer'>
							<div className='relative'>
								<input
									type='checkbox'
									className='sr-only'
									checked={hasVariants}
									onChange={(e) => {
										setHasVariants(e.target.checked)
										if (!e.target.checked) {
											setVariants([]) // Clear variants if disabled? or keep? Clearing is safer for state consistency
										}
									}}
								/>
								<div
									className={`block w-14 h-8 rounded-full transition ${hasVariants ? 'bg-blue-600' : 'bg-slate-300'
										}`}></div>
								<div
									className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition transform ${hasVariants ? 'translate-x-6' : ''
										}`}></div>
							</div>
							<span className='font-semibold text-slate-700'>
								This product has options (e.g., Size, Color)
							</span>
						</label>
					</div>

					{/* Variant Generator */}
					{hasVariants && (
						<div className='mb-8 border border-slate-200 rounded-xl p-6 bg-white shadow-sm'>
							<h3 className='text-lg font-bold text-slate-800 mb-4'>
								Product Variants
							</h3>
							{variantOptions.map((opt, index) => (
								<div
									key={index}
									className='flex gap-4 mb-4 items-end'>
									<div className='flex-1'>
										<label className='block text-xs font-semibold text-slate-600 mb-1'>
											Option Name (e.g. Color, Size)
										</label>
										<input
											type='text'
											placeholder='e.g. Color'
											value={opt.name}
											onChange={(e) =>
												handleVariantOptionChange(index, 'name', e.target.value)
											}
											className='w-full px-3 py-2 border border-slate-300 rounded-lg'
										/>
									</div>
									<div className='flex-[2]'>
										<label className='block text-xs font-semibold text-slate-600 mb-1'>
											Option Values (e.g. Red, Blue, Small)
										</label>
										<input
											type='text'
											placeholder='e.g. Red, Blue, Green'
											value={opt.values}
											onChange={(e) =>
												handleVariantOptionChange(
													index,
													'values',
													e.target.value
												)
											}
											className='w-full px-3 py-2 border border-slate-300 rounded-lg'
										/>
									</div>
									<button
										type='button'
										onClick={() => removeVariantOption(index)}
										className='p-2 text-red-500 hover:bg-red-50 rounded-lg'>
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
							))}
							<div className='flex gap-2'>
								<button
									type='button'
									onClick={addVariantOption}
									className='px-4 py-2 text-sm text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg font-medium'>
									+ Add Another Option
								</button>
								<button
									type='button'
									onClick={generateVariants}
									className='px-4 py-2 text-sm text-white bg-slate-800 hover:bg-slate-900 rounded-lg font-medium shadow-sm'>
									Generate Variants
								</button>
							</div>
						</div>
					)}

					{/* Variants Table */}
					{hasVariants && variants.length > 0 && (
						<div className='mb-8 overflow-x-auto border border-slate-200 rounded-xl shadow-sm'>
							<table className='w-full text-sm text-left'>
								<thead className='bg-slate-50 text-slate-600 font-semibold uppercase text-xs'>
									<tr>
										<th className='px-4 py-3'>Variant</th>
										<th className='px-4 py-3'>Price</th>
										<th className='px-4 py-3'>Stock</th>
										<th className='px-4 py-3'>SKU</th>
										<th className='px-4 py-3'>Image</th>
									</tr>
								</thead>
								<tbody className='divide-y divide-slate-100'>
									{variants.map((variant, index) => (
										<tr
											key={index}
											className='hover:bg-slate-50'>
											<td className='px-4 py-3 font-medium text-slate-800'>
												{variant.attributes.map((a) => a.value).join(' / ')}
											</td>
											<td className='px-4 py-3'>
												<input
													type='number'
													value={variant.price}
													onChange={(e) =>
														handleVariantChange(index, 'price', e.target.value)
													}
													className='w-24 px-2 py-1 border border-slate-300 rounded'
													placeholder='0.00'
												/>
											</td>
											<td className='px-4 py-3'>
												<input
													type='number'
													value={variant.stock}
													onChange={(e) =>
														handleVariantChange(index, 'stock', e.target.value)
													}
													className='w-20 px-2 py-1 border border-slate-300 rounded'
													placeholder='0'
												/>
											</td>
											<td className='px-4 py-3'>
												<input
													type='text'
													value={variant.sku}
													onChange={(e) =>
														handleVariantChange(index, 'sku', e.target.value)
													}
													className='w-32 px-2 py-1 border border-slate-300 rounded'
													placeholder='SKU'
												/>
											</td>
											<td className='px-4 py-3'>
												<div className='flex flex-col gap-2'>
													<div className='flex flex-wrap gap-1'>
														{variant.images && variant.images.length > 0 ? (
															variant.images.map((img, i) => (
																<img
																	key={i}
																	src={img}
																	alt='Variant'
																	className='w-10 h-10 object-cover rounded border border-slate-200'
																/>
															))
														) : (
															<div className='w-10 h-10 bg-slate-100 rounded border border-slate-200 flex items-center justify-center text-xs text-slate-400'>
																None
															</div>
														)}
													</div>
													<label className='cursor-pointer text-blue-600 hover:text-blue-700 text-xs font-medium'>
														+ Add Images
														<input
															type='file'
															className='hidden'
															accept='image/*'
															multiple
															onChange={(e) =>
																handleVariantImageUpload(e, index)
															}
														/>
													</label>
												</div>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					)}

					{/* Price, Offer, and Final Price (CONDITIONAL) */}
					{/* Price, Offer, Final Price, Stock (CONDITIONAL) */}
					{!hasVariants && (
						<div className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-4'>
							<div>
								<label className='block text-xs font-semibold text-slate-600 mb-1 uppercase tracking-wider'>
									Price <span className='text-red-500'>*</span>
								</label>
								<div className='relative'>
									<span className='absolute left-4 top-3 text-slate-500'>
										₹
									</span>
									<input
										type='number'
										name='price'
										value={formData.price}
										onChange={handleInputChange}
										className='w-full pl-8 pr-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm'
										placeholder='0.00'
										step='0.01'
										min='0'
										required={!hasVariants}
									/>
								</div>
							</div>

							<div>
								<label className='block text-xs font-semibold text-slate-600 mb-1 uppercase tracking-wider'>
									Offer (%)
								</label>
								<input
									type='number'
									name='offer'
									value={formData.offer}
									onChange={handleInputChange}
									className='w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm'
									placeholder='0'
									min='0'
									max='100'
									step='0.01'
								/>
							</div>

							<div>
								<label className='block text-xs font-semibold text-slate-600 mb-1 uppercase tracking-wider'>
									Final Price
								</label>
								<div className='relative'>
									<span className='absolute left-4 top-3 text-slate-500'>
										₹
									</span>
									<input
										type='text'
										value={calculateFinalPrice().toFixed(2)}
										readOnly
										className='w-full pl-8 pr-3 py-2 border border-slate-300 rounded-lg bg-slate-50 text-slate-700 font-semibold cursor-not-allowed text-sm'
										placeholder='0.00'
									/>
								</div>
							</div>

							<div>
								<label className='block text-xs font-semibold text-slate-600 mb-1 uppercase tracking-wider'>
									Stock <span className='text-red-500'>*</span>
								</label>
								<input
									type='number'
									name='stock'
									value={formData.stock}
									onChange={handleInputChange}
									className='w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm'
									placeholder='0'
									min='0'
									step='1'
									required={!hasVariants}
								/>
							</div>
						</div>
					)}

					{/* Ratings */}
					<div className='mb-4'>
						<label className='block text-xs font-semibold text-slate-600 mb-1 uppercase tracking-wider'>
							Ratings (Optional)
						</label>
						<input
							type='number'
							name='ratings'
							value={formData.ratings}
							onChange={handleInputChange}
							className='w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm'
							placeholder='0.0'
							min='0'
							max='5'
							step='0.1'
						/>
					</div>
				</div>

				{/* FAQs */}
				<div className='bg-white p-6 rounded-xl border border-slate-200 shadow-sm'>
					<h3 className='text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2'>
						<span className='w-1 h-4 bg-orange-500 rounded-full'></span>
						FAQs
					</h3>
					{/* FAQs Section */}
					<div className='mb-4'>
						<div className='flex justify-between items-center mb-4'>
							<label className='block text-xs font-semibold text-slate-600 uppercase tracking-wider'>
								FAQs (Optional)
							</label>
							<button
								type='button'
								onClick={addFaq}
								className='px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition flex items-center gap-2'>
								<svg
									className='w-5 h-5'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M12 4v16m8-8H4'
									/>
								</svg>
								Add FAQ
							</button>
						</div>

						{faqs.map((faq, index) => (
							<div
								key={index}
								className='mb-4 p-4 border border-slate-200 rounded-lg bg-slate-50'>
								<div className='flex justify-between items-start mb-3'>
									<span className='text-sm font-semibold text-slate-600'>
										FAQ #{index + 1}
									</span>
									<button
										type='button'
										onClick={() => removeFaq(index)}
										className='text-red-500 hover:text-red-600'>
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
								<input
									type='text'
									placeholder='Question'
									value={faq.question}
									onChange={(e) =>
										handleFaqChange(index, 'question', e.target.value)
									}
									className='w-full px-3 py-2 mb-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm'
								/>
								<textarea
									placeholder='Answer'
									value={faq.answer}
									onChange={(e) =>
										handleFaqChange(index, 'answer', e.target.value)
									}
									rows='3'
									className='w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm'
								/>
							</div>
						))}
					</div>
				</div>

				{/* Submit Button */}
				<div className='flex justify-end gap-4'>
					<button
						type='button'
						onClick={() => {
							setFormData({
								title: '',
								brand: '',
								sku: '',
								category: '',
								description: '',
								price: '',
								offer: '',
								ratings: '',
								stock: '',
							})
							setImages([])
							setImagePreviews([])
							setFaqs([])
							setHasVariants(false)
							setVariants([])
							setVariantOptions([{ name: '', values: '' }])
						}}
						className='px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition'>
						Reset
					</button>
					<button
						type='submit'
						disabled={isSubmitting}
						className={`px-8 py-3 rounded-lg font-semibold transition ${isSubmitting
							? 'bg-slate-400 cursor-not-allowed'
							: 'bg-blue-600 hover:bg-blue-700 text-white'
							}`}>
						{isSubmitting ? (
							<span className='flex items-center gap-2'>
								<svg
									className='animate-spin h-5 w-5'
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 24 24'>
									<circle
										className='opacity-25'
										cx='12'
										cy='12'
										r='10'
										stroke='currentColor'
										strokeWidth='4'></circle>
									<path
										className='opacity-75'
										fill='currentColor'
										d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
								</svg>
								Adding Product...
							</span>
						) : (
							'Add Product'
						)}
					</button>
				</div>
			</form>
		</div>
	)
}

export default AddProduct
