import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const ProtectedRoute = ({ children }) => {
    const { token } = useCart()
    const location = useLocation()

    if (!token) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }

    return children
}

export default ProtectedRoute
