import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const AddCategory = () => {
	const [categoryName, setCategoryName] = useState('')
	const [isSubmitting, setIsSubmitting] = useState(false)

	// Generate a random color
	const generateRandomColor = () => {
		const colors = [
			'#EF4444', // Red
			'#F59E0B', // Amber
			'#10B981', // Green
			'#3B82F6', // Blue
			'#8B5CF6', // Violet
			'#EC4899', // Pink
			'#14B8A6', // Teal
			'#F97316', // Orange
			'#6366F1', // Indigo
			'#84CC16', // Lime
			'#06B6D4', // Cyan
			'#A855F7', // Purple
			'#F43F5E', // Rose
			'#64748B', // Slate
			'#0EA5E9', // Sky
		]
		return colors[Math.floor(Math.random() * colors.length)]
	}

	const handleSubmit = async (e) => {
		e.preventDefault()

		if (!categoryName.trim()) {
			toast.error('Please enter a category name')
			return
		}

		setIsSubmitting(true)

		try {
			const token = localStorage.getItem('token')
			const color = generateRandomColor()

			const response = await axios.post(
				`${process.env.REACT_APP_API_URL}/api/categories`,
				{
					name: categoryName.trim(),
					color: color,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json',
					},
				}
			)

			if (response.data.success) {
				toast.success('Category added successfully!', {
					autoClose: 3000,
				})
				setCategoryName('')
			}
		} catch (error) {
			console.error('Error adding category:', error)
			const errorMessage =
				error.response?.data?.message || 'Failed to add category'
			toast.error(errorMessage, {
				autoClose: 4000,
			})
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<div className='max-w-6xl'>

			<div className='mb-8'>
				<h1 className='text-3xl font-bold text-slate-800 mb-2'>Add Category</h1>
				<p className='text-slate-600'>
					Create a new category for your products
				</p>
			</div>

			<div className='max-w-2xl'>
				<form
					onSubmit={handleSubmit}
					className='space-y-6'>
					<div className='bg-white p-4 rounded-xl border border-slate-200 shadow-sm'>
						<h3 className='text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2'>
							<span className='w-1 h-4 bg-blue-600 rounded-full'></span>
							Basic Info
						</h3>
						<div className='space-y-4'>
							<div>
								<label className='block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider'>
									Category Name <span className='text-red-500'>*</span>
								</label>
								<input
									type='text'
									value={categoryName}
									onChange={(e) => setCategoryName(e.target.value)}
									className='w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-slate-50 hover:bg-white'
									placeholder='Enter category name'
									required
								/>
								<p className='mt-2 text-xs text-slate-500'>
									A random color will be automatically assigned to this category
								</p>
							</div>
						</div>
					</div>

					<div className='flex justify-end gap-3'>
						<button
							type='button'
							onClick={() => setCategoryName('')}
							className='px-5 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-all'>
							Reset
						</button>
						<button
							type='submit'
							disabled={isSubmitting}
							className={`px-5 py-2.5 text-sm font-medium text-white rounded-lg shadow-sm transition-all flex items-center gap-2 ${isSubmitting
								? 'bg-slate-400 cursor-not-allowed'
								: 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'
								}`}>
							{isSubmitting ? (
								<>
									<div className='w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin'></div>
									Adding...
								</>
							) : (
								'Add Category'
							)}
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default AddCategory
