import React, { useState, useEffect, useCallback } from 'react'
import { useCart } from '../context/CartContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ProfileEditForm from '../components/ProfileEditForm'
import AddressForm from '../components/AddressForm'
import { formatPrice } from '../utils/formatPrice'



const Profile = () => {
    const { user, logout, fetchUser, token } = useCart()
    const [view, setView] = useState('default') // 'default' or 'editProfile'
    const [orders, setOrders] = useState([])
    const [loadingOrders, setLoadingOrders] = useState(false)
    // AddressForm logic extracted to component
    const [addressForm, setAddressForm] = useState(false)
    const [editingAddressId, setEditingAddressId] = useState(null)
    const [loadingUpdate, setLoadingUpdate] = useState(false)
    const [newAddress, setNewAddress] = useState({
        name: '',
        phone: '',
        address: '',
        landmark: '',
        city: '',
        state: '',
        pincode: ''
    })

    const fetchOrders = useCallback(async () => {
        try {
            setLoadingOrders(true)
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/orders`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            // Backend returns { success: true, data: [...orders] }
            setOrders(response.data.data || [])
        } catch (error) {
            console.error('Error fetching orders:', error)
            setOrders([])
        } finally {
            setLoadingOrders(false)
        }
    }, [token])

    useEffect(() => {
        if (user) {
            fetchOrders()
        }
    }, [user, fetchOrders])

    const handleAddAddress = async (formData) => {
        setLoadingUpdate(true)

        try {
            if (editingAddressId) {
                await axios.put(
                    `${process.env.REACT_APP_API_URL}/api/auth/profile/addresses/${editingAddressId}`,
                    formData,
                    { headers: { Authorization: `Bearer ${token}` } }
                )
                toast.success('Address updated successfully!')
            } else {
                await axios.post(
                    `${process.env.REACT_APP_API_URL}/api/auth/profile/addresses`,
                    formData,
                    { headers: { Authorization: `Bearer ${token}` } }
                )
                toast.success('Address added successfully!')
            }

            fetchUser()
            resetForm()
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to save address')
        } finally {
            setLoadingUpdate(false)
        }
    }

    const handleEditAddress = (addr) => {
        setEditingAddressId(addr._id)
        setNewAddress({
            name: addr.name,
            phone: addr.phone,
            address: addr.address,
            landmark: addr.landmark || '',
            city: addr.city,
            state: addr.state,
            pincode: addr.pincode
        })
        setAddressForm(true)
    }

    const handleDeleteAddress = async (addressId) => {
        if (!window.confirm('Are you sure you want to delete this address?')) return

        try {
            await axios.delete(
                `${process.env.REACT_APP_API_URL}/api/auth/profile/addresses/${addressId}`,
                { headers: { Authorization: `Bearer ${token}` } }
            )

            toast.success('Address deleted successfully!')
            fetchUser()
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to delete address')
        }
    }

    const handleSetDefault = async (addressId) => {
        try {
            await axios.patch(
                `${process.env.REACT_APP_API_URL}/api/auth/profile/addresses/${addressId}/default`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            )

            toast.success('Default address updated!')
            fetchUser()
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to set default address')
        }
    }

    const resetForm = () => {
        setAddressForm(false)
        setEditingAddressId(null)
        setNewAddress({
            name: '',
            phone: '',
            address: '',
            landmark: '',
            city: '',
            state: '',
            pincode: ''
        })
    }

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2d5f4f]"></div>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-green-50/30 to-gray-100">
            <Navbar />
            <div className="flex-grow min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">

                    {/* Premium Header Card */}
                    <div className="relative mt-10 mb-12 overflow-hidden rounded-3xl shadow-2xl">
                        {/* Gradient Background with Pattern */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#1B2B26] via-[#2d5f4f] to-[#1e4035]"></div>
                        <div className="absolute inset-0 opacity-10" style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                        }}></div>

                        <div className="relative px-8 py-10 sm:px-12 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                            <div className="flex items-center gap-6">
                                {/* Premium Avatar */}
                                <div className="relative group">
                                    <div className="absolute -inset-1 bg-gradient-to-r from-[#d4a574] to-[#f4d4a4] rounded-full blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                                    <div className="relative h-24 w-24 rounded-full bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-xl flex items-center justify-center text-white font-bold text-4xl border-4 border-white/40 shadow-2xl">
                                        {user.name?.charAt(0).toUpperCase() || 'U'}
                                    </div>
                                </div>

                                {/* User Info */}
                                <div className="space-y-2">
                                    <h1 className="text-4xl font-bold text-white tracking-tight">
                                        {user.name}
                                    </h1>
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                                        <div className="flex items-center gap-2 text-white/90">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                            <span className="text-sm font-medium">{user.email}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-white/90">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                            <span className="text-sm font-medium">{user.phone || 'No phone added'}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Logout Button */}
                            <button
                                onClick={logout}
                                className="group relative px-8 py-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold rounded-xl transition-all duration-300 border border-white/20 hover:border-white/40 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                            >
                                <span className="flex items-center gap-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                    </svg>
                                    Logout
                                </span>
                            </button>
                        </div>
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                        {/* Left Column - Edit Profile & Quick Stats */}
                        <div className="lg:col-span-1 space-y-6">

                            {/* Edit Profile Card */}
                            <div className="group bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl overflow-hidden border border-gray-200/50 hover:shadow-2xl transition-all duration-300">
                                <button
                                    onClick={() => setView(view === 'editProfile' ? 'default' : 'editProfile')}
                                    className="w-full px-6 py-5 flex justify-between items-center hover:bg-gradient-to-r hover:from-[#2d5f4f]/5 hover:to-transparent transition-all duration-300"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[#2d5f4f] to-[#1e4035] flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                        </div>
                                        <div className="text-left">
                                            <h2 className="text-lg font-bold text-gray-900">Edit Profile</h2>
                                            <p className="text-xs text-gray-500">Update your information</p>
                                        </div>
                                    </div>
                                    <svg
                                        className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${view === 'editProfile' ? 'rotate-180' : ''}`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                {view === 'editProfile' && (
                                    <div className="px-6 pb-6 border-t border-gray-100 pt-6 bg-gradient-to-b from-gray-50/50 to-white">
                                        <ProfileEditForm user={user} onUpdate={() => {
                                            fetchUser()
                                            setView('default')
                                        }} />
                                    </div>
                                )}
                            </div>

                            {/* Quick Stats Card */}
                            <div className="bg-gradient-to-br from-white via-white to-green-50/30 backdrop-blur-sm shadow-xl rounded-2xl p-6 border border-gray-200/50">
                                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <svg className="w-5 h-5 text-[#2d5f4f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                    Quick Stats
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-100">
                                        <span className="text-sm text-gray-600">Total Orders</span>
                                        <span className="text-xl font-bold text-[#2d5f4f]">{orders.length}</span>
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-100">
                                        <span className="text-sm text-gray-600">Saved Addresses</span>
                                        <span className="text-xl font-bold text-[#2d5f4f]">{user.addresses?.length || 0}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Addresses & Orders */}
                        <div className="lg:col-span-2 space-y-8">

                            {/* Saved Addresses Section */}
                            <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl p-8 border border-gray-200/50 hover:shadow-2xl transition-shadow duration-300">
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0 mb-6 sm:mb-8">
                                    <div className="flex items-center gap-3 sm:gap-4">
                                        <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-gradient-to-br from-[#2d5f4f] to-[#1e4035] flex items-center justify-center shadow-lg shrink-0">
                                            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">Saved Addresses</h2>
                                            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">Manage your delivery locations</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => {
                                            if (addressForm) {
                                                resetForm()
                                            } else {
                                                setAddressForm(true)
                                            }
                                        }}
                                        className="w-full sm:w-auto group relative px-6 py-2.5 sm:py-3 bg-gradient-to-r from-[#2d5f4f] to-[#1e4035] hover:from-[#1e4035] hover:to-[#2d5f4f] text-white font-semibold rounded-xl transition-all duration-300 shadow-md hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center"
                                    >
                                        <span className="flex items-center gap-2">
                                            {addressForm ? (
                                                <>
                                                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                    Cancel
                                                </>
                                            ) : (
                                                <>
                                                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                                    </svg>
                                                    Add New
                                                </>
                                            )}
                                        </span>
                                    </button>
                                </div>

                                {addressForm && (
                                    <AddressForm
                                        initialData={editingAddressId ? newAddress : undefined}
                                        onSubmit={(data) => {
                                            // Adapt the data structure if needed, or just pass it
                                            // The component passes {name, phone, address, ...}
                                            // which matches existing newAddress structure
                                            setNewAddress(data)
                                            // We need to trigger the actual API call. 
                                            // Since handleAddAddress uses the 'newAddress' state which might not be updated yet due to closure,
                                            // we should update handleAddAddress to accept data as argument or use a useEffect.
                                            // EXCEPT: The component's onSubmit is called *after* validation.
                                            // Let's modify handleAddAddress to accept 'data' and use that instead of state.
                                            handleAddAddress(data)
                                        }}
                                        onCancel={resetForm}
                                        submitLabel={editingAddressId ? 'Update Address' : 'Save Address'}
                                        title={editingAddressId ? 'Edit Address' : 'Add New Address'}
                                        loading={loadingUpdate}
                                    />
                                )}

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {user.addresses && user.addresses.length > 0 ? (
                                        user.addresses.map((addr) => (
                                            <div
                                                key={addr._id}
                                                className={`group relative p-6 rounded-2xl border-2 transition-all duration-300 hover:shadow-xl ${addr.isDefault
                                                    ? 'border-[#2d5f4f] bg-gradient-to-br from-[#2d5f4f]/5 to-green-50/30 shadow-md'
                                                    : 'border-gray-200 bg-white hover:border-[#2d5f4f]/30'
                                                    }`}
                                            >
                                                {addr.isDefault && (
                                                    <div className="absolute -top-3 -right-3">
                                                        <span className="inline-flex items-center gap-1 bg-gradient-to-r from-[#2d5f4f] to-[#1e4035] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                                                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                            </svg>
                                                            Default
                                                        </span>
                                                    </div>
                                                )}

                                                <div className="space-y-2 mb-4">
                                                    <p className="font-bold text-lg text-gray-900">{addr.name}</p>
                                                    <p className="text-gray-600 text-sm leading-relaxed">{addr.address}</p>
                                                    {addr.landmark && (
                                                        <p className="text-gray-500 text-sm flex items-center gap-1">
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                            </svg>
                                                            Near {addr.landmark}
                                                        </p>
                                                    )}
                                                    <p className="text-gray-600 text-sm font-medium">{addr.city}, {addr.state} - {addr.pincode}</p>
                                                    <p className="text-gray-500 text-sm flex items-center gap-1">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                        </svg>
                                                        {addr.phone}
                                                    </p>
                                                </div>

                                                <div className="flex gap-3 pt-4 border-t border-gray-200">
                                                    {!addr.isDefault && (
                                                        <button
                                                            onClick={() => handleSetDefault(addr._id)}
                                                            className="flex-1 text-[#2d5f4f] hover:bg-[#2d5f4f]/10 font-semibold text-sm py-2 px-3 rounded-lg transition-all"
                                                        >
                                                            Set Default
                                                        </button>
                                                    )}
                                                    <button
                                                        onClick={() => handleEditAddress(addr)}
                                                        className="flex-1 text-blue-600 hover:bg-blue-50 font-semibold text-sm py-2 px-3 rounded-lg transition-all"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteAddress(addr._id)}
                                                        className="flex-1 text-red-600 hover:bg-red-50 font-semibold text-sm py-2 px-3 rounded-lg transition-all"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="col-span-2 text-center py-12 bg-gradient-to-br from-gray-50 to-green-50/20 rounded-2xl border-2 border-dashed border-gray-300">
                                            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            </svg>
                                            <p className="text-gray-500 font-medium">No saved addresses yet</p>
                                            <p className="text-gray-400 text-sm mt-1">Add your first address to get started</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* My Orders Section */}
                            <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl p-8 border border-gray-200/50 hover:shadow-2xl transition-shadow duration-300">
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0 mb-6 sm:mb-8">
                                    <div className="flex items-center gap-3 sm:gap-4">
                                        <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-gradient-to-br from-[#2d5f4f] to-[#1e4035] flex items-center justify-center shadow-lg shrink-0">
                                            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">My Recent Orders</h2>
                                            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">Track your order history</p>
                                        </div>
                                    </div>
                                </div>

                                {loadingOrders ? (
                                    <div className="flex flex-col items-center justify-center py-16">
                                        <div className="relative">
                                            <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200"></div>
                                            <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#2d5f4f] border-t-transparent absolute top-0"></div>
                                        </div>
                                        <p className="text-gray-500 mt-4 font-medium">Loading orders...</p>
                                    </div>
                                ) : orders.length > 0 ? (
                                    <div className="space-y-4">
                                        {orders.slice(0, 3).map(order => (
                                            <div
                                                key={order._id}
                                                className="group bg-gradient-to-br from-white to-gray-50/50 border-2 border-gray-200 rounded-2xl p-6 hover:border-[#2d5f4f]/30 hover:shadow-lg transition-all duration-300"
                                            >
                                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-[#2d5f4f]/10 to-green-50 flex items-center justify-center">
                                                            <svg className="w-5 h-5 text-[#2d5f4f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                                            </svg>
                                                        </div>
                                                        <div>
                                                            <p className="font-bold text-[#2d5f4f] text-lg">#{order.orderNumber || order._id.slice(-6).toUpperCase()}</p>
                                                            <p className="text-xs text-gray-500 flex items-center gap-1">
                                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                                </svg>
                                                                {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <span className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wide shadow-sm ${order.orderStatus === 'delivered' ? 'bg-gradient-to-r from-green-500 to-green-600 text-white' :
                                                        order.orderStatus === 'cancelled' ? 'bg-gradient-to-r from-red-500 to-red-600 text-white' :
                                                            'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                                                        }`}>
                                                        {order.orderStatus}
                                                    </span>
                                                </div>

                                                <div className="space-y-2 mb-4 bg-white/50 rounded-xl p-4 border border-gray-100">
                                                    {order.items.map((item, idx) => (
                                                        <div key={idx} className="flex justify-between items-center text-sm">
                                                            <span className="text-gray-700 font-medium">{item.title} <span className="text-gray-400">× {item.quantity}</span></span>
                                                            <span className="font-bold text-gray-900">₹{formatPrice(item.price * item.quantity)}</span>
                                                        </div>
                                                    ))}
                                                </div>

                                                <div className="flex justify-between items-center pt-4 border-t-2 border-gray-200">
                                                    <span className="text-sm font-semibold text-gray-600">Total Amount</span>
                                                    <span className="text-2xl font-bold text-[#2d5f4f]">₹{formatPrice(order.totalAmount)}</span>
                                                </div>
                                            </div>
                                        ))}

                                        {orders.length > 3 && (
                                            <div className="mt-8 text-center border-t border-gray-100 pt-6">
                                                <a
                                                    href="/my-orders"
                                                    className="inline-flex items-center justify-center gap-2 group px-8 py-3 bg-white border-2 border-gray-200 text-gray-600 font-semibold rounded-xl hover:text-[#2d5f4f] hover:border-[#2d5f4f] hover:bg-[#2d5f4f]/5 transition-all duration-300 shadow-sm hover:shadow-md"
                                                >
                                                    View All Orders
                                                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                    </svg>
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="text-center py-16 bg-gradient-to-br from-gray-50 to-green-50/20 rounded-2xl border-2 border-dashed border-gray-300">
                                        <div className="relative inline-block">
                                            <div className="absolute inset-0 bg-[#2d5f4f]/10 rounded-full blur-xl"></div>
                                            <svg className="relative w-20 h-20 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                            </svg>
                                        </div>
                                        <p className="text-gray-600 font-bold text-lg">No orders yet</p>
                                        <p className="text-gray-400 text-sm mt-2">Start shopping to see your orders here</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Profile
