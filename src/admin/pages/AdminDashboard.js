import React from 'react'
import {Outlet} from 'react-router-dom'
import Sidebar from '../components/Sidebar'

const AdminDashboard = () => {
	return (
		<div className='flex min-h-screen bg-gradient-to-br from-slate-50 to-slate-100'>
			<Sidebar />
			<div className='ml-64 flex-1 p-8'>
				<Outlet />
			</div>
		</div>
	)
}

export default AdminDashboard
