import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const ManageCategories = () => {
	const [categories, setCategories] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [editModal, setEditModal] = useState({ isOpen: false, category: null })
	const [editForm, setEditForm] = useState({ name: '', color: '' })
	const [isSaving, setIsSaving] = useState(false)

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
		} finally {
			setIsLoading(false)
		}
	}

	const handleEdit = (category) => {
		setEditModal({ isOpen: true, category })
		setEditForm({ name: category.name, color: category.color })
	}

	const handleCloseModal = () => {
		setEditModal({ isOpen: false, category: null })
		setEditForm({ name: '', color: '' })
	}

	const handleUpdateCategory = async (e) => {
		e.preventDefault()
		setIsSaving(true)

		try {
			const token = localStorage.getItem('token')
			const response = await axios.put(
				`${process.env.REACT_APP_API_URL}/api/categories/${editModal.category._id}`,
				editForm,
				{
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json',
					},
				}
			)

			if (response.data.success) {
				toast.success('Category updated successfully!')
				handleCloseModal()
				fetchCategories()
			}
		} catch (error) {
			console.error('Error updating category:', error)
			const errorMessage =
				error.response?.data?.message || 'Failed to update category'
			toast.error(errorMessage)
		} finally {
			setIsSaving(false)
		}
	}

	const handleDelete = async (category) => {
		const confirmed = window.confirm(
			`Are you sure you want to delete the category "${category.name}"?`
		)

		if (!confirmed) return

		try {
			const token = localStorage.getItem('token')
			const response = await axios.delete(
				`${process.env.REACT_APP_API_URL}/api/categories/${category._id}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)

			if (response.data.success) {
				toast.success('Category deleted successfully!')
				fetchCategories()
			}
		} catch (error) {
			console.error('Error deleting category:', error)
			const errorMessage =
				error.response?.data?.message || 'Failed to delete category'
			toast.error(errorMessage)
		}
	}

	return (
		<div className='max-w-6xl'>

			<div className='mb-8'>
				<h1 className='text-3xl font-bold text-slate-800 mb-2'>
					Manage Categories
				</h1>
				<p className='text-slate-600'>View and edit your product categories</p>
			</div>

			<div className='bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden'>
				{isLoading ? (
					<div className='flex justify-center items-center py-12'>
						<div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600'></div>
					</div>
				) : categories.length === 0 ? (
					<div className='text-center py-12'>
						<p className='text-slate-500'>No categories found</p>
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
										Category
									</th>
									<th className='px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider'>
										Colour
									</th>
									<th className='px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider'>
										Actions
									</th>
								</tr>
							</thead>
							<tbody className='bg-white divide-y divide-slate-200'>
								{categories.map((category, index) => (
									<tr
										key={category._id}
										className='hover:bg-slate-50 transition'>
										<td className='px-6 py-4 whitespace-nowrap text-sm text-slate-700'>
											{index + 1}
										</td>
										<td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900'>
											{category.name}
										</td>
										<td className='px-6 py-4 whitespace-nowrap'>
											<div className='flex items-center gap-2'>
												<div
													className='w-8 h-8 rounded-full border-2 border-slate-200'
													style={{ backgroundColor: category.color }}></div>
												<span className='text-sm text-slate-600'>
													{category.color}
												</span>
											</div>
										</td>
										<td className='px-6 py-4 whitespace-nowrap text-sm'>
											<div className='flex items-center gap-3'>
												<button
													onClick={() => handleEdit(category)}
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
													onClick={() => handleDelete(category)}
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

			{/* Edit Category Modal */}
			{editModal.isOpen && (
				<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
					<div className='bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4'>
						<h2 className='text-2xl font-bold text-slate-800 mb-6'>
							Edit Category
						</h2>
						<form onSubmit={handleUpdateCategory}>
							<div className='mb-6'>
								<label className='block text-sm font-semibold text-slate-700 mb-2'>
									Category Name
								</label>
								<input
									type='text'
									value={editForm.name}
									onChange={(e) =>
										setEditForm({ ...editForm, name: e.target.value })
									}
									className='w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
									required
								/>
							</div>

							<div className='mb-6'>
								<label className='block text-sm font-semibold text-slate-700 mb-2'>
									Color
								</label>
								<div className='flex gap-3'>
									<input
										type='color'
										value={editForm.color}
										onChange={(e) =>
											setEditForm({ ...editForm, color: e.target.value })
										}
										className='w-16 h-12 border border-slate-300 rounded-lg cursor-pointer'
									/>
									<input
										type='text'
										value={editForm.color}
										onChange={(e) =>
											setEditForm({ ...editForm, color: e.target.value })
										}
										className='flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
										placeholder='#000000'
									/>
								</div>
							</div>

							<div className='flex justify-end gap-3'>
								<button
									type='button'
									onClick={handleCloseModal}
									className='px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition'>
									Cancel
								</button>
								<button
									type='submit'
									disabled={isSaving}
									className={`px-6 py-3 rounded-lg font-semibold transition ${isSaving
										? 'bg-slate-400 cursor-not-allowed'
										: 'bg-blue-600 hover:bg-blue-700 text-white'
										}`}>
									{isSaving ? 'Updating...' : 'Update Category'}
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</div>
	)
}

export default ManageCategories
