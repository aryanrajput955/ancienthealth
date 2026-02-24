import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useCart } from '../context/CartContext'

const ProfileEditForm = ({ user, onUpdate }) => {
    const { token } = useCart()
    const [formData, setFormData] = useState({
        name: user.name || '',
        phone: user.phone || '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    })
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()

        // Validate passwords if user is trying to change password
        if (formData.newPassword || formData.confirmPassword || formData.currentPassword) {
            if (!formData.currentPassword) {
                toast.error('Please enter your current password')
                return
            }
            if (formData.newPassword !== formData.confirmPassword) {
                toast.error('New passwords do not match')
                return
            }
            if (formData.newPassword.length < 6) {
                toast.error('New password must be at least 6 characters')
                return
            }
        }

        setLoading(true)
        try {
            const updateData = {
                name: formData.name,
                phone: formData.phone
            }

            // Add password fields if user is changing password - use backend's expected parameter names
            if (formData.currentPassword && formData.newPassword) {
                updateData.oldPassword = formData.currentPassword
                updateData.newPassword = formData.newPassword
            }

            await axios.put(
                `${process.env.REACT_APP_API_URL}/api/auth/profile`,
                updateData,
                { headers: { Authorization: `Bearer ${token}` } }
            )

            toast.success('Profile updated successfully!')

            // Reset password fields
            setFormData({
                ...formData,
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            })

            if (onUpdate) {
                onUpdate()
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update profile')
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Info Section */}
            <div className="space-y-4">
                <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wide">Basic Information</h4>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                    <input
                        type="text"
                        required
                        className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2d5f4f] focus:border-[#2d5f4f] outline-none transition-all hover:border-gray-300"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email (Read-only)</label>
                    <input
                        type="email"
                        disabled
                        className="w-full px-4 py-3 bg-gray-100 border-2 border-gray-200 rounded-xl text-gray-500 cursor-not-allowed"
                        value={user.email}
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                    <div className="relative">
                        <span className="absolute left-4 top-3.5 text-gray-500 font-medium">+91</span>
                        <input
                            type="tel"
                            placeholder="9876543210"
                            maxLength="10"
                            className="w-full pl-14 pr-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2d5f4f] focus:border-[#2d5f4f] outline-none transition-all hover:border-gray-300"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') })}
                        />
                    </div>
                </div>
            </div>

            {/* Password Change Section */}
            <div className="space-y-4 pt-6 border-t-2 border-gray-200">
                <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wide">Change Password (Optional)</h4>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Current Password</label>
                    <input
                        type="password"
                        placeholder="Enter current password"
                        className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2d5f4f] focus:border-[#2d5f4f] outline-none transition-all hover:border-gray-300"
                        value={formData.currentPassword}
                        onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">New Password</label>
                    <input
                        type="password"
                        placeholder="Enter new password (min 6 characters)"
                        className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2d5f4f] focus:border-[#2d5f4f] outline-none transition-all hover:border-gray-300"
                        value={formData.newPassword}
                        onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm New Password</label>
                    <input
                        type="password"
                        placeholder="Confirm new password"
                        className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2d5f4f] focus:border-[#2d5f4f] outline-none transition-all hover:border-gray-300"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    />
                </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6 border-t-2 border-gray-200">
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full px-8 py-3 bg-gradient-to-r from-[#2d5f4f] to-[#1e4035] text-white font-semibold rounded-xl hover:from-[#1e4035] hover:to-[#2d5f4f] shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                    {loading ? (
                        <span className="flex items-center justify-center gap-2">
                            <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Updating...
                        </span>
                    ) : 'Update Profile'}
                </button>
            </div>
        </form>
    )
}

export default ProfileEditForm
