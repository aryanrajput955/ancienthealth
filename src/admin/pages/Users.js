import React, { useState, useEffect } from 'react'

const Users = () => {
	const [users, setUsers] = useState([])
	const [filteredUsers, setFilteredUsers] = useState([])
	const [currentUser, setCurrentUser] = useState(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	const [searchTerm, setSearchTerm] = useState('')
	const [roleFilter, setRoleFilter] = useState('all')
	const [openRoleDropdown, setOpenRoleDropdown] = useState(null)
	const [showFilterDropdown, setShowFilterDropdown] = useState(false)

	useEffect(() => {
		const initData = async () => {
			setLoading(true)
			await Promise.all([fetchCurrentUser(), fetchUsers()])
			setLoading(false)
		}
		initData()

		// Close dropdowns when clicking outside
		const handleClickOutside = (event) => {
			if (!event.target.closest('.role-dropdown-container')) {
				setOpenRoleDropdown(null)
			}
			if (!event.target.closest('.filter-dropdown-container')) {
				setShowFilterDropdown(false)
			}
		}
		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, []) // eslint-disable-line react-hooks/exhaustive-deps

	const fetchCurrentUser = async () => {
		try {
			const token = localStorage.getItem('token')
			const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/me`, {
				headers: { Authorization: `Bearer ${token}` },
			})
			const data = await response.json()
			if (data.success) {
				setCurrentUser(data.data.user)
			}
		} catch (err) {
			console.error('Error fetching current user:', err)
		}
	}

	const fetchUsers = async () => {
		try {
			const token = localStorage.getItem('token')
			const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/users`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})

			const data = await response.json()

			if (data.success) {
				setUsers(data.data.users)
				// Initial filter will happen in useEffect or we can trigger it here,
				// but since currentUser might not be set yet, we'll handle filtering in a dedicated effect or render time.
				// For simplicity, let's just set the data here.
				setFilteredUsers(data.data.users)
			} else {
				setError(data.message || 'Failed to fetch users')
			}
		} catch (err) {
			setError('Error fetching users: ' + err.message)
		}
	}

	// Filter out current user effectively whenever users, currentUser, search, or role filter changes
	useEffect(() => {
		let result = users

		// 1. Filter out current user
		if (currentUser) {
			result = result.filter((u) => u.id !== currentUser.id)
		}

		// 2. Apply search
		const term = searchTerm.toLowerCase().trim()
		if (term) {
			result = result.filter(
				(user) =>
					user.name.toLowerCase().includes(term) ||
					user.email.toLowerCase().includes(term)
			)
		}

		// 3. Apply role filter
		if (roleFilter !== 'all') {
			result = result.filter((user) => user.role === roleFilter)
		}

		setFilteredUsers(result)
	}, [users, currentUser, searchTerm, roleFilter])

	const formatDate = (dateString) => {
		if (!dateString) return 'N/A'
		const date = new Date(dateString)
		return date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
		})
	}

	const handleRoleChange = async (userId, newRole) => {
		try {
			const token = localStorage.getItem('token')
			const response = await fetch(
				`${process.env.REACT_APP_API_URL}/api/auth/users/${userId}/role`,
				{
					method: 'PATCH',
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ role: newRole }),
				}
			)

			const data = await response.json()

			if (data.success) {
				// Update local state
				const updatedUsers = users.map((user) =>
					user.id === userId ? { ...user, role: newRole } : user
				)
				setUsers(updatedUsers)
				setOpenRoleDropdown(null)
			} else {
				alert(data.message || 'Failed to update role')
			}
		} catch (err) {
			alert('Error updating role: ' + err.message)
		}
	}

	if (loading) {
		return (
			<div className='max-w-6xl'>
				<div className='mb-8'>
					<h1 className='text-3xl font-bold text-slate-800 mb-2'>Users</h1>
					<p className='text-slate-600'>
						Manage your user accounts and permissions
					</p>
				</div>
				<div className='bg-white rounded-2xl shadow-lg p-8 border border-slate-200'>
					<p className='text-slate-500 text-center py-8'>Loading users...</p>
				</div>
			</div>
		)
	}

	if (error) {
		return (
			<div className='max-w-6xl'>
				<div className='mb-8'>
					<h1 className='text-3xl font-bold text-slate-800 mb-2'>Users</h1>
					<p className='text-slate-600'>
						Manage your user accounts and permissions
					</p>
				</div>
				<div className='bg-white rounded-2xl shadow-lg p-8 border border-slate-200'>
					<p className='text-red-500 text-center py-8'>{error}</p>
				</div>
			</div>
		)
	}

	return (
		<div className='max-w-6xl pb-20'>
			<div className='mb-8'>
				<h1 className='text-3xl font-bold text-slate-800 mb-2'>Users</h1>
				<p className='text-slate-600'>
					Manage your user accounts and permissions
				</p>
			</div>

			{/* Search and Filter Bar */}
			<div className='mb-6 bg-white rounded-2xl shadow-lg border border-slate-200 p-6'>
				<div className='flex flex-col md:flex-row gap-6'>
					<div className='relative flex-1 group'>
						<label className='block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1'>
							Search Users
						</label>
						<div className='relative'>
							<svg
								className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-purple-500 transition-colors'
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
								placeholder='Search by name or email...'
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className='w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 focus:bg-white transition-all duration-200 text-slate-700 placeholder-slate-400 text-sm'
							/>
						</div>
					</div>
					{/* Role Filter Dropdown */}
					<div className='relative filter-dropdown-container min-w-[200px] group'>
						<label className='block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 ml-1'>
							Filter by Role
						</label>
						<button
							onClick={() => setShowFilterDropdown(!showFilterDropdown)}
							className='w-full flex items-center justify-between px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-medium hover:bg-white hover:border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 focus:bg-white transition-all duration-200 text-sm'>
							<span className='flex items-center gap-2'>
								<svg
									className='w-4 h-4 text-slate-400'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth='2'
										d='M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z'
									/>
								</svg>
								{roleFilter === 'all'
									? 'All Roles'
									: roleFilter === 'admin'
										? 'Admins Only'
										: 'Users Only'}
							</span>
							<svg
								className={`w-4 h-4 text-slate-400 transition-transform ${showFilterDropdown ? 'rotate-180' : ''
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
						</button>

						{showFilterDropdown && (
							<div className='absolute right-0 mt-2 w-full bg-white rounded-xl shadow-xl border border-slate-100 z-50 animate-in fade-in zoom-in-95 duration-100 overflow-hidden'>
								<div className='p-1'>
									<button
										onClick={() => {
											setRoleFilter('all')
											setShowFilterDropdown(false)
										}}
										className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors ${roleFilter === 'all'
												? 'bg-purple-50 text-purple-700 font-medium'
												: 'text-slate-600 hover:bg-slate-50'
											}`}>
										All Roles
									</button>
									<button
										onClick={() => {
											setRoleFilter('admin')
											setShowFilterDropdown(false)
										}}
										className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors ${roleFilter === 'admin'
												? 'bg-purple-50 text-purple-700 font-medium'
												: 'text-slate-600 hover:bg-slate-50'
											}`}>
										Admins Only
									</button>
									<button
										onClick={() => {
											setRoleFilter('user')
											setShowFilterDropdown(false)
										}}
										className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors ${roleFilter === 'user'
												? 'bg-purple-50 text-purple-700 font-medium'
												: 'text-slate-600 hover:bg-slate-50'
											}`}>
										Users Only
									</button>
								</div>
							</div>
						)}
					</div>
					<div className='flex items-end'>
						<button
							onClick={() => {
								setSearchTerm('')
								setRoleFilter('all')
							}}
							className='mb-[1px] h-[38px] px-4 bg-slate-100 text-slate-600 font-semibold rounded-xl hover:bg-slate-200 transition-colors whitespace-nowrap flex items-center gap-2 text-sm'>
							<svg
								className='w-4 h-4'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth='2'
									d='M6 18L18 6M6 6l12 12'
								/>
							</svg>
							Clear
						</button>
					</div>
				</div>
			</div>

			{/* Current User Card */}
			{currentUser && (
				<div className='mb-8 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl shadow-lg p-6 text-white overflow-hidden relative'>
					<div className='absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl'></div>
					<div className='absolute bottom-0 left-0 -ml-8 -mb-8 w-32 h-32 bg-purple-400 opacity-20 rounded-full blur-2xl'></div>

					<div className='relative z-10 flex items-center justify-between'>
						<div>
							<h2 className='text-xs font-bold uppercase tracking-wider text-purple-200 mb-1'>
								Current User
							</h2>
							<div className='flex items-center gap-4'>
								<div className='h-12 w-12 rounded-full bg-white/20 flex items-center justify-center text-xl font-bold border-2 border-white/30'>
									{currentUser.name.charAt(0).toUpperCase()}
								</div>
								<div>
									<h3 className='text-xl font-bold'>{currentUser.name}</h3>
									<p className='text-purple-100 text-sm'>{currentUser.email}</p>
								</div>
							</div>
						</div>
						<div className='flex gap-8 text-right'>
							<div>
								<p className='text-xs text-purple-200 uppercase tracking-wider mb-1'>
									Role
								</p>
								<span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/20 border border-white/30'>
									{currentUser.role === 'admin' ? '👑 Admin' : '👤 User'}
								</span>
							</div>
							<div>
								<p className='text-xs text-purple-200 uppercase tracking-wider mb-1'>
									Joined
								</p>
								<p className='font-medium'>
									{formatDate(currentUser.createdAt)}
								</p>
							</div>
						</div>
					</div>
				</div>
			)}

			<div className='bg-white rounded-2xl shadow-lg border border-slate-200 overflow-visible'>
				<div className='overflow-visible'>
					<table className='w-full'>
						<thead className='bg-slate-50 border-b border-slate-200'>
							<tr>
								<th className='px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider'>
									S No.
								</th>
								<th className='px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider'>
									User Details
								</th>
								<th className='px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider'>
									Email
								</th>
								<th className='px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider'>
									Role
								</th>
								<th className='px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider'>
									Date Created
								</th>
							</tr>
						</thead>
						<tbody className='divide-y divide-slate-200'>
							{filteredUsers.length === 0 ? (
								<tr>
									<td
										colSpan='5'
										className='px-6 py-12 text-center text-slate-500'>
										<div className='flex flex-col items-center justify-center'>
											<svg
												className='w-12 h-12 text-slate-300 mb-3'
												fill='none'
												stroke='currentColor'
												viewBox='0 0 24 24'>
												<path
													strokeLinecap='round'
													strokeLinejoin='round'
													strokeWidth='2'
													d='M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z'
												/>
											</svg>
											<p className='font-medium text-slate-600'>
												{searchTerm
													? 'No users found matching your search'
													: 'No other users found'}
											</p>
										</div>
									</td>
								</tr>
							) : (
								filteredUsers.map((user, index) => (
									<tr
										key={user.id}
										className='hover:bg-slate-50 transition-colors group'>
										<td className='px-6 py-4 text-sm text-slate-500 font-medium'>
											{index + 1}
										</td>
										<td className='px-6 py-4'>
											<div className='flex items-center gap-3'>
												<div className='h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-xs border border-slate-200 group-hover:border-purple-200 group-hover:bg-purple-50 group-hover:text-purple-600 transition-colors'>
													{user.name.charAt(0).toUpperCase()}
												</div>
												<span className='text-sm font-semibold text-slate-900'>
													{user.name}
												</span>
											</div>
										</td>
										<td className='px-6 py-4 text-sm text-slate-600'>
											{user.email}
										</td>
										<td className='px-6 py-4 relative role-dropdown-container'>
											<div className='relative'>
												<button
													onClick={() =>
														setOpenRoleDropdown(
															openRoleDropdown === user.id ? null : user.id
														)
													}
													className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-purple-500
														${user.role === 'admin'
															? 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100'
															: 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100'
														}`}>
													{user.role === 'admin' ? '👑 Admin' : '👤 User'}
													<svg
														className={`w-3 h-3 transition-transform ${openRoleDropdown === user.id ? 'rotate-180' : ''
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
												</button>

												{/* Dropdown Menu */}
												{openRoleDropdown === user.id && (
													<div className='absolute left-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-100 origin-top-left'>
														<div className='p-1'>
															<button
																onClick={() =>
																	handleRoleChange(user.id, 'user')
																}
																className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors ${user.role === 'user'
																		? 'bg-blue-50 text-blue-700'
																		: 'text-slate-600 hover:bg-slate-50'
																	}`}>
																<span className='text-base'>👤</span>
																<div className='text-left'>
																	<p className='font-medium'>User</p>
																	<p className='text-[10px] opacity-70'>
																		Regular access
																	</p>
																</div>
																{user.role === 'user' && (
																	<svg
																		className='w-4 h-4 ml-auto'
																		fill='none'
																		stroke='currentColor'
																		viewBox='0 0 24 24'>
																		<path
																			strokeLinecap='round'
																			strokeLinejoin='round'
																			strokeWidth='2'
																			d='M5 13l4 4L19 7'
																		/>
																	</svg>
																)}
															</button>
															<button
																onClick={() =>
																	handleRoleChange(user.id, 'admin')
																}
																className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors ${user.role === 'admin'
																		? 'bg-purple-50 text-purple-700'
																		: 'text-slate-600 hover:bg-slate-50'
																	}`}>
																<span className='text-base'>👑</span>
																<div className='text-left'>
																	<p className='font-medium'>Admin</p>
																	<p className='text-[10px] opacity-70'>
																		Full access control
																	</p>
																</div>
																{user.role === 'admin' && (
																	<svg
																		className='w-4 h-4 ml-auto'
																		fill='none'
																		stroke='currentColor'
																		viewBox='0 0 24 24'>
																		<path
																			strokeLinecap='round'
																			strokeLinejoin='round'
																			strokeWidth='2'
																			d='M5 13l4 4L19 7'
																		/>
																	</svg>
																)}
															</button>
														</div>
													</div>
												)}
											</div>
										</td>
										<td className='px-6 py-4 text-sm text-slate-600'>
											{formatDate(user.createdAt)}
										</td>
									</tr>
								))
							)}
						</tbody>
					</table>
				</div>
				{filteredUsers.length > 0 && (
					<div className='px-6 py-4 bg-slate-50 border-t border-slate-200'>
						<p className='text-sm text-slate-600'>
							Showing:{' '}
							<span className='font-semibold'>{filteredUsers.length}</span>{' '}
							other user{filteredUsers.length !== 1 ? 's' : ''}
						</p>
					</div>
				)}
			</div>
		</div>
	)
}

export default Users
