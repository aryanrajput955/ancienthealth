import React, { useState, useEffect, useCallback, useRef } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ReactQuill from 'react-quill-new'
import 'react-quill-new/dist/quill.snow.css'

const ManageProducts = () => {
	const [products, setProducts] = useState([])
	const [categories, setCategories] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [editModal, setEditModal] = useState({ isOpen: false, product: null })
	const [editForm, setEditForm] = useState({
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
	const [editImages, setEditImages] = useState([])
	const [editImagePreviews, setEditImagePreviews] = useState([])
	const [editFaqs, setEditFaqs] = useState([])
	const [isSaving, setIsSaving] = useState(false)
	const [isDragging, setIsDragging] = useState(false)

	// Variant State for Edit
	const [hasVariants, setHasVariants] = useState(false)
	const [variants, setVariants] = useState([])
	const [variantOptions, setVariantOptions] = useState([{ name: '', values: '' }])

	// Search state
	const [searchText, setSearchText] = useState('')
	const [searchBrand, setSearchBrand] = useState('')
	const [selectedCategory, setSelectedCategory] = useState('')
	const [stockFilter, setStockFilter] = useState('')
	const [showCategoryDropdown, setShowCategoryDropdown] = useState(false)
	const [showStockDropdown, setShowStockDropdown] = useState(false)

	// Refs for dependencies to avoid unnecessary re-renders/fetches
	const searchRef = useRef(searchText)
	const brandRef = useRef(searchBrand)
	const categoryRef = useRef(selectedCategory)
	const stockRef = useRef(stockFilter)

	useEffect(() => {
		searchRef.current = searchText
	}, [searchText])

	useEffect(() => {
		brandRef.current = searchBrand
	}, [searchBrand])

	useEffect(() => {
		categoryRef.current = selectedCategory
	}, [selectedCategory])

	useEffect(() => {
		stockRef.current = stockFilter
	}, [stockFilter])

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (!event.target.closest('.category-dropdown-container')) {
				setShowCategoryDropdown(false)
			}
			if (!event.target.closest('.stock-dropdown-container')) {
				setShowStockDropdown(false)
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [])

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
	const calculateEditFinalPrice = () => {
		const price = parseFloat(editForm.price) || 0
		const offer = parseFloat(editForm.offer) || 0
		return price - (price * offer) / 100
	}

	const fetchCategories = useCallback(async () => {
		try {
			const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/categories`)
			if (response.data.success) {
				setCategories(response.data.data)
			}
		} catch (error) {
			console.error('Error fetching categories:', error)
		}
	}, [])

	const fetchProducts = useCallback(async () => {
		try {
			// Build query parameters
			let url = `${process.env.REACT_APP_API_URL}/api/products?`
			const params = []

			const currentSearch = searchRef.current
			const currentBrand = brandRef.current
			const currentCategory = categoryRef.current
			const currentStock = stockRef.current

			if (currentSearch.trim()) {
				params.push(`search=${encodeURIComponent(currentSearch.trim())}`)
			}

			if (currentBrand.trim()) {
				params.push(`brand=${encodeURIComponent(currentBrand.trim())}`)
			}

			if (currentCategory) {
				params.push(`category=${currentCategory}`)
			}

			if (currentStock) {
				params.push(`stockStatus=${currentStock}`)
			}

			if (params.length > 0) {
				url += params.join('&')
			}

			const response = await axios.get(url)
			if (response.data.success) {
				setProducts(response.data.data)
			}
		} catch (error) {
			console.error('Error fetching products:', error)
			toast.error('Failed to load products')
		} finally {
			setIsLoading(false)
		}
	}, [])

	useEffect(() => {
		fetchProducts()
		fetchCategories()
	}, [fetchProducts, fetchCategories])

	const getCategoryColor = (categoryId) => {
		const category = categories.find((cat) => cat._id === categoryId)
		return category?.color || '#64748B'
	}

	const getCategoryName = (categoryId) => {
		const category = categories.find((cat) => cat._id === categoryId)
		return category?.name || 'Unknown'
	}

	const handleEdit = (product) => {
		setEditModal({ isOpen: true, product })
		setEditForm({
			title: product.title,
			brand: product.brand || '',
			sku: product.sku || '',
			category: product.category._id || product.category,
			description: product.description,
			price: product.price,
			offer: product.offer || '',
			ratings: product.ratings || '',
			stock: product.stock || '',
		})
		setEditImagePreviews(product.images.map((img) => img.url))
		setEditImages([]) // New images to upload
		setEditFaqs(product.faqs || [])

		// Variant linking
		setHasVariants(product.hasVariants || false)
		// Ensure variants have necessary fields and migrate legacy single image to images array
		const loadedVariants = (product.variants || []).map((v) => ({
			...v,
			images: v.images || (v.image ? [{ url: v.image, key: v.image }] : []),
		}))
		setVariants(loadedVariants)
		setVariantOptions([{ name: '', values: '' }]) // Clean slate for generator
	}

	const handleCloseModal = () => {
		setEditModal({ isOpen: false, product: null })
		setEditForm({
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
		setEditImages([])
		setEditImagePreviews([])
		setEditFaqs([])
		setHasVariants(false)
		setVariants([])
		setVariantOptions([{ name: '', values: '' }])
	}

	const handleImageSelect = (e) => {
		const files = Array.from(e.target.files)
		processImages(files)
	}

	const processImages = (files) => {
		files.forEach((file) => {
			if (file.type.startsWith('image/')) {
				const reader = new FileReader()
				reader.onload = (e) => {
					const base64 = e.target.result
					setEditImages((prev) => [...prev, base64])
					setEditImagePreviews((prev) => [...prev, base64])
				}
				reader.readAsDataURL(file)
			}
		})
	}

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

	const removeImage = (index) => {
		setEditImages((prev) => prev.filter((_, i) => i !== index))
		setEditImagePreviews((prev) => prev.filter((_, i) => i !== index))
	}

	const addFaq = () => {
		setEditFaqs((prev) => [...prev, { question: '', answer: '' }])
	}

	const removeFaq = (index) => {
		setEditFaqs((prev) => prev.filter((_, i) => i !== index))
	}

	const handleFaqChange = (index, field, value) => {
		setEditFaqs((prev) => {
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

		let generated = [[]]
		variantOptions.forEach((option) => {
			const values = option.values.split(',').map((v) => v.trim())
			const next = []
			generated.forEach((prev) => {
				values.forEach((value) => {
					next.push([...prev, { key: option.name, value }])
				})
			})
			generated = next
		})

		const newVariants = generated.map((attrs) => ({
			attributes: attrs,
			price: editForm.price || '',
			stock: '',
			sku: '',
			image: '',
		}))

		setVariants(newVariants)
	}

	const handleVariantChange = (index, field, value) => {
		const newVariants = [...variants]
		newVariants[index][field] = value
		setVariants(newVariants)
	}

	const handleVariantImageUpload = (e, variantIndex) => {
		const files = Array.from(e.target.files)
		files.forEach((file) => {
			if (file && file.type.startsWith('image/')) {
				const reader = new FileReader()
				reader.onload = (ev) => {
					const base64 = ev.target.result
					// Link to this variant
					setVariants((prev) => {
						const newVariants = [...prev]
						// Ensure images array exists
						if (!newVariants[variantIndex].images) {
							newVariants[variantIndex].images = []
						}
						newVariants[variantIndex].images.push(base64)
						return newVariants
					})
				}
				reader.readAsDataURL(file)
			}
		})
	}

	const handleUpdateProduct = async (e) => {
		e.preventDefault()
		setIsSaving(true)

		try {
			const token = localStorage.getItem('token')

			// Use new images if uploaded, otherwise keep existing
			const imagesToSend = editImages.length > 0 ? editImages : []

			const validFaqs = editFaqs.filter(
				(faq) => faq.question.trim() && faq.answer.trim()
			)

			const productData = {
				title: editForm.title.trim(),
				brand: editForm.brand.trim(),
				sku: editForm.sku ? editForm.sku.trim() : undefined,
				category: editForm.category,
				description: editForm.description.trim(),
				price: hasVariants ? 0 : parseFloat(editForm.price),
				offer: editForm.offer ? parseFloat(editForm.offer) : 0,
				ratings: editForm.ratings ? parseFloat(editForm.ratings) : 0,
				stock: hasVariants ? 0 : editForm.stock ? parseInt(editForm.stock) : 0,
				faqs: validFaqs,
				hasVariants,
				variants: hasVariants ? variants : [],
			}

			// Only include images if new ones were uploaded
			if (imagesToSend.length > 0) {
				productData.images = imagesToSend
			}

			const response = await axios.put(
				`${process.env.REACT_APP_API_URL}/api/products/${editModal.product._id}`,
				productData,
				{
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json',
					},
				}
			)

			if (response.data.success) {
				toast.success('Product updated successfully!')
				handleCloseModal()
				fetchProducts()
			}
		} catch (error) {
			console.error('Error updating product:', error)
			const errorMessage =
				error.response?.data?.message || 'Failed to update product'
			toast.error(errorMessage)
		} finally {
			setIsSaving(false)
		}
	}

	const handleDelete = async (product) => {
		const confirmed = window.confirm(
			`Are you sure you want to delete "${product.title}"?`
		)

		if (!confirmed) return

		try {
			const token = localStorage.getItem('token')
			const response = await axios.delete(
				`${process.env.REACT_APP_API_URL}/api/products/${product._id}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)

			if (response.data.success) {
				toast.success('Product deleted successfully!')
				fetchProducts()
			}
		} catch (error) {
			console.error('Error deleting product:', error)
			const errorMessage =
				error.response?.data?.message || 'Failed to delete product'
			toast.error(errorMessage)
		}
	}

	// Handle search
	const handleSearch = (e) => {
		e.preventDefault()
		setIsLoading(true)
		fetchProducts()
	}

	// Handle search on Enter key
	const handleSearchKeyPress = (e) => {
		if (e.key === 'Enter') {
			handleSearch(e)
		}
	}

	// Handle reset/clear search
	const handleResetSearch = () => {
		const isAlreadyCleared =
			searchText === '' &&
			searchBrand === '' &&
			selectedCategory === '' &&
			stockFilter === ''

		setSearchText('')
		setSearchBrand('')
		setSelectedCategory('')
		setStockFilter('')
		setShowCategoryDropdown(false)
		setShowStockDropdown(false)

		if (isAlreadyCleared) {
			setIsLoading(true)
			fetchProducts()
		} else {
			setIsLoading(true)
			// Fetch products after clearing will be handled by useEffect
		}
	}

	// Re-fetch products when search criteria changes (only if cleared)
	useEffect(() => {
		if (
			searchText === '' &&
			searchBrand === '' &&
			selectedCategory === '' &&
			stockFilter === ''
		) {
			fetchProducts()
		}
	}, [searchText, searchBrand, selectedCategory, stockFilter, fetchProducts])

	return (
		<div className='max-w-6xl'>

			<div className='mb-8'>
				<h1 className='text-3xl font-bold text-slate-800 mb-2'>
					Manage Products
				</h1>
				<p className='text-slate-600'>View and edit your existing products</p>
			</div>

			{/* Search Bar */}
			<div className='bg-white rounded-2xl shadow-lg border border-slate-200 p-6 mb-6'>
				<form
					onSubmit={handleSearch}
					className='space-y-6'>
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
						{/* Text Search */}
						<div className='relative group col-span-1 md:col-span-2 lg:col-span-1'>
							<label className='block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 ml-1'>
								Search Products
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
									placeholder='Search by title, brand or SKU...'
									className='w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all duration-200 text-slate-700 placeholder-slate-400 text-sm'
								/>
							</div>
						</div>

						{/* Brand Search */}
						<div className='relative group'>
							<label className='block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 ml-1'>
								Brand
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
										d='M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z'
									/>
								</svg>
								<input
									type='text'
									value={searchBrand}
									onChange={(e) => setSearchBrand(e.target.value)}
									onKeyPress={handleSearchKeyPress}
									placeholder='Filter by brand...'
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

						{/* Stock Filter Dropdown */}
						<div className='relative group stock-dropdown-container'>
							<label className='block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 ml-1'>
								Stock Status
							</label>
							<div className='relative'>
								<button
									type='button'
									onClick={() => setShowStockDropdown(!showStockDropdown)}
									className='w-full pl-3 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-xl text-left text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all duration-200 text-sm'>
									<span
										className={`block truncate ${!stockFilter ? 'text-slate-400' : ''
											}`}>
										{stockFilter === 'in_stock'
											? 'In Stock'
											: stockFilter === 'low_stock'
												? 'Low Stock'
												: stockFilter === 'no_stock'
													? 'No Stock'
													: 'All Stock Status'}
									</span>
									<span className='absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none'>
										<svg
											className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${showStockDropdown ? 'rotate-180' : ''
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

								{showStockDropdown && (
									<div className='absolute z-10 mt-2 w-full bg-white rounded-xl shadow-xl border border-slate-100 animate-in fade-in zoom-in-95 duration-100 overflow-hidden'>
										<div className='p-1'>
											<button
												type='button'
												className={`w-full text-left px-4 py-2.5 rounded-lg text-sm transition-colors ${!stockFilter
													? 'bg-blue-50 text-blue-700 font-medium'
													: 'text-slate-700 hover:bg-slate-50'
													}`}
												onClick={() => {
													setStockFilter('')
													setShowStockDropdown(false)
												}}>
												All Stock Status
											</button>
											<button
												type='button'
												className={`w-full text-left px-4 py-2.5 rounded-lg text-sm transition-colors ${stockFilter === 'in_stock'
													? 'bg-blue-50 text-blue-700 font-medium'
													: 'text-slate-700 hover:bg-slate-50'
													}`}
												onClick={() => {
													setStockFilter('in_stock')
													setShowStockDropdown(false)
												}}>
												In Stock
											</button>
											<button
												type='button'
												className={`w-full text-left px-4 py-2.5 rounded-lg text-sm transition-colors ${stockFilter === 'low_stock'
													? 'bg-blue-50 text-blue-700 font-medium'
													: 'text-slate-700 hover:bg-slate-50'
													}`}
												onClick={() => {
													setStockFilter('low_stock')
													setShowStockDropdown(false)
												}}>
												Low Stock
											</button>
											<button
												type='button'
												className={`w-full text-left px-4 py-2.5 rounded-lg text-sm transition-colors ${stockFilter === 'no_stock'
													? 'bg-blue-50 text-blue-700 font-medium'
													: 'text-slate-700 hover:bg-slate-50'
													}`}
												onClick={() => {
													setStockFilter('no_stock')
													setShowStockDropdown(false)
												}}>
												No Stock
											</button>
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
							Search Products
						</button>
					</div>
				</form>
			</div>

			<div className='bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden'>
				{isLoading ? (
					<div className='flex justify-center items-center py-12'>
						<div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600'></div>
					</div>
				) : products.length === 0 ? (
					<div className='text-center py-12'>
						<p className='text-slate-500'>No products found</p>
					</div>
				) : (
					<div className='overflow-x-auto'>
						<table className='min-w-full divide-y divide-slate-200'>
							<thead className='bg-slate-50'>
								<tr>
									<th className='px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider'>
										S No
									</th>
									<th className='px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider'>
										Title
									</th>
									<th className='px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider'>
										Category
									</th>
									<th className='px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider'>
										Brand
									</th>
									<th className='px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider'>
										Stock
									</th>
									<th className='px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider'>
										Actions
									</th>
								</tr>
							</thead>
							<tbody className='bg-white divide-y divide-slate-200'>
								{products
									.filter((product) => product !== null)
									.map((product, index) => (
										<tr
											key={product._id}
											className='hover:bg-slate-50 transition'>
											<td className='px-6 py-4 whitespace-nowrap text-sm text-slate-700'>
												{index + 1}
											</td>
											<td className='px-6 py-4 text-sm font-medium text-slate-900'>
												<div className='max-w-xs truncate'>{product.title}</div>
											</td>
											<td className='px-6 py-4 whitespace-nowrap text-sm'>
												<span
													className='font-semibold'
													style={{
														color: getCategoryColor(
															product.category._id || product.category
														),
													}}>
													{getCategoryName(
														product.category._id || product.category
													)}
												</span>
											</td>
											<td className='px-6 py-4 text-sm text-slate-600'>
												<div className='max-w-xs truncate'>
													{product.brand ? (
														product.brand
													) : (
														<span className='italic text-slate-400'>
															No brand
														</span>
													)}
												</div>
											</td>
											<td className='px-6 py-4 whitespace-nowrap text-sm'>
												<div className='flex items-center gap-2'>
													<span className='text-slate-700 font-medium'>
														{product.stock || 0}
													</span>
													{(() => {
														const stock = product.stock || 0
														if (stock > 10) {
															return (
																<span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800'>
																	In Stock
																</span>
															)
														} else if (stock > 0) {
															return (
																<span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-amber-100 text-amber-800'>
																	Low Stock
																</span>
															)
														} else {
															return (
																<span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800'>
																	No Stock
																</span>
															)
														}
													})()}
												</div>
											</td>
											<td className='px-6 py-4 whitespace-nowrap text-sm'>
												<div className='flex items-center gap-3'>
													<button
														onClick={() => handleEdit(product)}
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
														onClick={() => handleDelete(product)}
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
					</div>
				)}
			</div>

			{/* Edit Product Modal */}
			{editModal.isOpen && (
				<div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity'>
					{/* Modal Content - Fixed Height with Scroll */}
					<div className='bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200'>
						{/* Header - Fixed */}
						<div className='flex items-center justify-between p-6 border-b border-slate-100 bg-white'>
							<div>
								<h2 className='text-xl font-bold text-slate-800'>
									Edit Product
								</h2>
								<p className='text-sm text-slate-500'>
									Update product details and inventory
								</p>
							</div>
							<button
								onClick={handleCloseModal}
								className='p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-50 transition-colors'>
								<svg
									className='w-6 h-6'
									fill='none'
									viewBox='0 0 24 24'
									stroke='currentColor'>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M6 18L18 6M6 6l12 12'
									/>
								</svg>
							</button>
						</div>

						{/* Body - Scrollable */}
						<div className='flex-1 overflow-y-auto p-6 bg-slate-50/50'>
							<form
								id='edit-product-form'
								onSubmit={handleUpdateProduct}
								className='space-y-6'>
								{/* Basic Info */}
								<div className='bg-white p-4 rounded-xl border border-slate-200 shadow-sm'>
									<h3 className='text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2'>
										<span className='w-1 h-4 bg-blue-600 rounded-full'></span>
										Basic Info
									</h3>
									<div className='space-y-4'>
										{/* Title and Brand Row */}
										<div className='grid grid-cols-2 gap-4'>
											<div className='col-span-2 md:col-span-1'>
												<label className='block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider'>
													Product Title
												</label>
												<input
													type='text'
													value={editForm.title}
													onChange={(e) =>
														setEditForm({
															...editForm,
															title: e.target.value,
															slug: e.target.value
																.toLowerCase()
																.replace(/ /g, '-'),
														})
													}
													className='w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-slate-50 hover:bg-white'
													required
													placeholder='e.g. Headphones'
												/>
											</div>
											<div className='col-span-2 md:col-span-1'>
												<label className='block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider'>
													Brand
												</label>
												<input
													type='text'
													value={editForm.brand}
													onChange={(e) =>
														setEditForm({
															...editForm,
															brand: e.target.value,
														})
													}
													className='w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-slate-50 hover:bg-white'
													required
													placeholder='e.g. Sony'
												/>
											</div>
										</div>

										{/* Category and SKU Row */}
										<div className='grid grid-cols-2 gap-4'>
											<div>
												<label className='block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider'>
													Category
												</label>
												<select
													value={editForm.category}
													onChange={(e) =>
														setEditForm({
															...editForm,
															category: e.target.value,
														})
													}
													className='w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-slate-50 hover:bg-white'
													required>
													<option value=''>Select Category</option>
													{categories.map((cat) => (
														<option
															key={cat._id}
															value={cat._id}>
															{cat.name}
														</option>
													))}
												</select>
											</div>
											<div>
												<label className='block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider'>
													SKU
												</label>
												<input
													type='text'
													value={editForm.sku}
													onChange={(e) =>
														setEditForm({ ...editForm, sku: e.target.value })
													}
													className='w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-slate-50 hover:bg-white'
													placeholder='SKU-001'
												/>
											</div>
										</div>
									</div>
								</div>

								{/* Media & Description */}
								<div className='bg-white p-4 rounded-xl border border-slate-200 shadow-sm'>
									<h3 className='text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2'>
										<span className='w-1 h-4 bg-purple-600 rounded-full'></span>
										Media & Description
									</h3>

									{/* Description */}
									<div className='mb-2'>
										<label className='block text-xs font-semibold text-slate-600 mb-2 uppercase tracking-wider'>
											Description
										</label>
										<div className='h-60 mb-2'>
											<ReactQuill
												theme='snow'
												value={editForm.description}
												onChange={(value) =>
													setEditForm({ ...editForm, description: value })
												}
												modules={quillModules}
												formats={quillFormats}
												className='bg-white rounded-lg h-full'
												placeholder='Product description...'
											/>
										</div>
										{/* Spacer to prevent overlap */}
										<div className='h-12'></div>
									</div>

									{/* Images */}
									<div>
										<label className='block text-xs font-semibold text-slate-600 mb-2 uppercase tracking-wider'>
											Images
										</label>
										<div
											className={`border-2 border-dashed rounded-lg p-4 text-center transition-all duration-200 ${isDragging
												? 'border-blue-500 bg-blue-50/50 scale-[1.02]'
												: 'border-slate-200 hover:border-blue-400 hover:bg-slate-50'
												}`}
											onDragEnter={handleDragEnter}
											onDragOver={handleDragOver}
											onDragLeave={handleDragLeave}
											onDrop={handleDrop}>
											<input
												type='file'
												accept='image/*'
												multiple
												onChange={handleImageSelect}
												className='hidden'
												id='edit-image-upload'
											/>
											<label
												htmlFor='edit-image-upload'
												className='cursor-pointer flex flex-col items-center gap-2 py-2'>
												<div className='p-2 bg-blue-50 text-blue-600 rounded-full'>
													<svg
														className='w-5 h-5'
														fill='none'
														viewBox='0 0 24 24'
														stroke='currentColor'>
														<path
															strokeLinecap='round'
															strokeLinejoin='round'
															strokeWidth={2}
															d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
														/>
													</svg>
												</div>
												<span className='text-xs text-slate-500 font-medium'>
													Click to upload or drag images
												</span>
											</label>
										</div>

										{/* Image Previews */}
										{editImagePreviews.length > 0 && (
											<div className='mt-4 flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-200'>
												{editImagePreviews.map((preview, index) => (
													<div
														key={index}
														className='relative group flex-shrink-0 w-16 h-16'>
														<img
															src={preview}
															alt={`Preview ${index + 1}`}
															className='w-full h-full object-cover rounded-lg border border-slate-200'
														/>
														<button
															type='button'
															onClick={() => removeImage(index)}
															className='absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition shadow-sm'>
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
												))}
											</div>
										)}
									</div>
								</div>

								<div className='bg-white p-4 rounded-xl border border-slate-200 shadow-sm'>
									<h3 className='text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2'>
										<span className='w-1 h-4 bg-purple-600 rounded-full'></span>
										Variants
									</h3>
									<label className='flex items-center gap-3 cursor-pointer'>
										<div className='relative'>
											<input
												type='checkbox'
												className='sr-only'
												checked={hasVariants}
												onChange={(e) => {
													setHasVariants(e.target.checked)
													if (!e.target.checked) {
														setVariants([])
													}
												}}
											/>
											<div
												className={`block w-12 h-7 rounded-full transition ${hasVariants ? 'bg-blue-600' : 'bg-slate-300'
													}`}></div>
											<div
												className={`absolute left-1 top-1 bg-white w-5 h-5 rounded-full transition transform ${hasVariants ? 'translate-x-5' : ''
													}`}></div>
										</div>
										<span className='text-sm font-medium text-slate-700'>
											Has Variants?
										</span>
									</label>
								</div>

								{/* Variant Generator */}
								{hasVariants && (
									<div className='bg-white p-4 rounded-xl border border-slate-200 shadow-sm'>
										<h3 className='text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2'>
											<span className='w-1 h-4 bg-indigo-600 rounded-full'></span>
											Variant Options Generator
										</h3>
										{variantOptions.map((opt, index) => (
											<div
												key={index}
												className='flex gap-3 mb-3 items-end'>
												<div className='flex-1'>
													<label className='block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider'>
														Option Name
													</label>
													<input
														type='text'
														placeholder='e.g. Color'
														value={opt.name}
														onChange={(e) =>
															handleVariantOptionChange(
																index,
																'name',
																e.target.value
															)
														}
														className='w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all'
													/>
												</div>
												<div className='flex-[2]'>
													<label className='block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider'>
														Values (comma separated)
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
														className='w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all'
													/>
												</div>
												<button
													type='button'
													onClick={() => removeVariantOption(index)}
													className='p-2 text-red-500 hover:bg-red-50 rounded-lg transition'>
													<svg
														className='w-4 h-4'
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
										<div className='flex gap-2 mt-4'>
											<button
												type='button'
												onClick={addVariantOption}
												className='px-3 py-2 text-xs text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg font-medium transition'>
												+ Add Option
											</button>
											<button
												type='button'
												onClick={generateVariants}
												className='px-3 py-2 text-xs text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg font-medium shadow-sm transition'>
												Generate Variants
											</button>
										</div>
									</div>
								)}

								{/* Variants Table */}
								{hasVariants && variants.length > 0 && (
									<div className='bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden'>
										<div className='p-4 bg-slate-50 border-b border-slate-200'>
											<h3 className='text-sm font-semibold text-slate-900 flex items-center gap-2'>
												<span className='w-1 h-4 bg-emerald-600 rounded-full'></span>
												Edit Variants ({variants.length})
											</h3>
										</div>
										<div className='overflow-x-auto'>
											<table className='w-full text-sm'>
												<thead className='bg-slate-50 text-slate-600 font-semibold uppercase text-xs'>
													<tr>
														<th className='px-3 py-2 text-left'>Variant</th>
														<th className='px-3 py-2 text-left'>Price</th>
														<th className='px-3 py-2 text-left'>Stock</th>
														<th className='px-3 py-2 text-left'>SKU</th>
														<th className='px-3 py-2 text-left'>Image</th>
													</tr>
												</thead>
												<tbody className='divide-y divide-slate-100'>
													{variants.map((variant, index) => (
														<tr
															key={index}
															className='hover:bg-slate-50'>
															<td className='px-3 py-2 font-medium text-slate-800'>
																{variant.attributes
																	.map((a) => a.value)
																	.join(' / ')}
															</td>
															<td className='px-3 py-2'>
																<input
																	type='number'
																	value={variant.price}
																	onChange={(e) =>
																		handleVariantChange(
																			index,
																			'price',
																			e.target.value
																		)
																	}
																	className='w-20 px-2 py-1 text-sm border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500'
																	placeholder='0.00'
																/>
															</td>
															<td className='px-3 py-2'>
																<input
																	type='number'
																	value={variant.stock}
																	onChange={(e) =>
																		handleVariantChange(
																			index,
																			'stock',
																			e.target.value
																		)
																	}
																	className='w-16 px-2 py-1 text-sm border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500'
																	placeholder='0'
																/>
															</td>
															<td className='px-3 py-2'>
																<input
																	type='text'
																	value={variant.sku}
																	onChange={(e) =>
																		handleVariantChange(
																			index,
																			'sku',
																			e.target.value
																		)
																	}
																	className='w-24 px-2 py-1 text-sm border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500'
																	placeholder='SKU'
																/>
															</td>
															<td className='px-3 py-2'>
																<div className='flex flex-col gap-2'>
																	<div className='flex flex-wrap gap-1'>
																		{variant.images &&
																			variant.images.length > 0 ? (
																			variant.images.map((img, i) => (
																				<img
																					key={i}
																					src={
																						typeof img === 'string'
																							? img
																							: img.url
																					}
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
																		+ Add
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
									</div>
								)}

								{/* Pricing & Inventory (Show only if no variants) */}
								{!hasVariants && (
									<div className='bg-white p-4 rounded-xl border border-slate-200 shadow-sm'>
										<h3 className='text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2'>
											<span className='w-1 h-4 bg-green-600 rounded-full'></span>
											Pricing & Inventory
										</h3>
										<div className='grid grid-cols-2 gap-4'>
											<div>
												<label className='block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider'>
													Original Price
												</label>
												<div className='relative'>
													<span className='absolute left-3 top-2.5 text-slate-400 text-sm'>
														₹
													</span>
													<input
														type='number'
														value={editForm.price}
														onChange={(e) =>
															setEditForm({
																...editForm,
																price: e.target.value,
															})
														}
														className='w-full pl-7 pr-3 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all'
														step='0.01'
														min='0'
														required={!hasVariants}
													/>
												</div>
											</div>
											<div>
												<label className='block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider'>
													Offer %
												</label>
												<div className='relative'>
													<input
														type='number'
														value={editForm.offer}
														onChange={(e) =>
															setEditForm({
																...editForm,
																offer: e.target.value,
															})
														}
														className='w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all'
														min='0'
														max='100'
														placeholder='0'
													/>
													<span className='absolute right-3 top-2.5 text-slate-400 text-sm'>
														%
													</span>
												</div>
											</div>
											<div>
												<label className='block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider'>
													Final Price
												</label>
												<div className='relative'>
													<span className='absolute left-3 top-2.5 text-green-600 text-sm font-medium'>
														₹
													</span>
													<input
														type='text'
														value={calculateEditFinalPrice().toFixed(2)}
														readOnly
														className='w-full pl-7 pr-3 py-2.5 text-sm border border-slate-200 rounded-lg bg-green-50 text-green-700 font-semibold cursor-not-allowed'
													/>
												</div>
											</div>
											<div>
												<label className='block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider'>
													Stock Units
												</label>
												<input
													type='number'
													value={editForm.stock}
													onChange={(e) =>
														setEditForm({
															...editForm,
															stock: e.target.value,
														})
													}
													className='w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all'
													min='0'
													required={!hasVariants}
												/>
											</div>
										</div>
									</div>
								)}

								{/* FAQ Section */}
								<div className='bg-white p-4 rounded-xl border border-slate-200 shadow-sm'>
									<div className='flex justify-between items-center mb-4'>
										<h3 className='text-sm font-semibold text-slate-900 flex items-center gap-2'>
											<span className='w-1 h-4 bg-amber-500 rounded-full'></span>
											Frequently Asked Questions
										</h3>
										<button
											type='button'
											onClick={addFaq}
											className='px-3 py-1.5 bg-amber-50 text-amber-700 text-xs font-semibold rounded-lg hover:bg-amber-100 transition-colors border border-amber-200'>
											+ Add Question
										</button>
									</div>

									<div className='space-y-3'>
										{editFaqs.map((faq, index) => (
											<div
												key={index}
												className='p-3 border border-slate-100 rounded-lg bg-slate-50 hover:bg-white hover:shadow-sm transition-all group'>
												<div className='flex justify-between items-start gap-4 mb-2'>
													<input
														type='text'
														placeholder='Question...'
														value={faq.question}
														onChange={(e) =>
															handleFaqChange(index, 'question', e.target.value)
														}
														className='flex-1 px-3 py-1.5 text-sm bg-transparent border-b border-transparent focus:border-amber-400 focus:outline-none font-medium placeholder-slate-400'
													/>
													<button
														type='button'
														onClick={() => removeFaq(index)}
														className='text-slate-300 hover:text-red-500 transition-colors'>
														<svg
															className='w-4 h-4'
															fill='none'
															viewBox='0 0 24 24'
															stroke='currentColor'>
															<path
																strokeLinecap='round'
																strokeLinejoin='round'
																strokeWidth={2}
																d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
															/>
														</svg>
													</button>
												</div>
												<textarea
													placeholder='Enter the answer here...'
													value={faq.answer}
													onChange={(e) =>
														handleFaqChange(index, 'answer', e.target.value)
													}
													rows='2'
													className='w-full px-3 py-2 text-sm text-slate-600 bg-white border border-slate-200 rounded-md focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/20 resize-none'
												/>
											</div>
										))}
										{editFaqs.length === 0 && (
											<div className='text-center py-6 text-slate-400 text-sm border-2 border-dashed border-slate-100 rounded-lg'>
												No FAQs added yet
											</div>
										)}
									</div>
								</div>
							</form>
						</div>

						{/* Footer - Fixed */}
						<div className='p-4 border-t border-slate-100 bg-white flex justify-end gap-3 rounded-b-xl'>
							<button
								type='button'
								onClick={handleCloseModal}
								className='px-5 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-200 transition-all shadow-sm'>
								Cancel
							</button>
							<button
								type='submit'
								form='edit-product-form'
								disabled={isSaving}
								className={`px-5 py-2.5 text-sm font-medium text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all flex items-center gap-2 ${isSaving
									? 'bg-slate-400 cursor-not-allowed'
									: 'bg-blue-600 hover:bg-blue-700 hover:shadow-md'
									}`}>
								{isSaving ? (
									<>
										<div className='w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin'></div>
										Saving...
									</>
								) : (
									<>
										<span>Update Product</span>
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
					</div>
				</div>
			)}
		</div>
	)
}

export default ManageProducts
