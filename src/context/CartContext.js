
import React, { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const CartContext = createContext()

export const useCart = () => useContext(CartContext)

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState({ items: [], totalItems: 0, totalPrice: 0 })
    const [loading, setLoading] = useState(false)
    const [token, setToken] = useState(localStorage.getItem('token'))

    const [user, setUser] = useState(null)

    // Load initial cart state
    useEffect(() => {
        if (token) {
            fetchCart()
            fetchUser()
        } else {
            // Load from local storage for guest
            const savedCart = localStorage.getItem('guestCart')
            if (savedCart) {
                try {
                    const parsedCart = JSON.parse(savedCart)
                    setCart(parsedCart)
                } catch (e) {
                    console.error('Failed to parse guest cart', e)
                    localStorage.removeItem('guestCart')
                }
            } else {
                setCart({ items: [], totalItems: 0, totalPrice: 0 })
            }
            setUser(null)
        }
        // eslint-disable-next-line
    }, [token])

    // Save guest cart to local storage whenever it changes (if no token)
    useEffect(() => {
        if (!token) {
            localStorage.setItem('guestCart', JSON.stringify(cart))
        }
    }, [cart, token])

    const login = (newToken) => {
        localStorage.setItem('token', newToken)
        setToken(newToken)
    }

    const logout = () => {
        localStorage.removeItem('token')
        setToken(null)
        setCart({ items: [], totalItems: 0, totalPrice: 0 })
        setUser(null)
        // Clear guest cart on logout to start fresh? Or keep it? 
        // A fresh start seems safer to avoid confusion.
        localStorage.removeItem('guestCart')
        toast.info('Logged out')
    }

    const fetchUser = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/auth/me`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            if (response.data.success) {
                setUser(response.data.data.user)
            }
        } catch (err) {
            console.error('Fetch user error:', err)
            if (err.response?.status === 401) {
                logout()
            }
        }
    }

    const fetchCart = async () => {
        try {
            setLoading(true)
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/cart`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            if (response.data.success) {
                setCart(response.data.data)
            }
        } catch (err) {
            console.error('Fetch cart error:', err)
            if (err.response?.status === 401) {
                logout() // Auto logout on invalid token
            }
        } finally {
            setLoading(false)
        }
    }

    const calculateCartTotals = (items) => {
        const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
        const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
        return { items, totalItems, totalPrice }
    }

    const addToCart = async (productId, quantity = 1, productDetails = null) => {
        if (!token) {
            // Guest Logic
            setLoading(true)
            try {
                const currentItems = [...cart.items]
                const existingItemIndex = currentItems.findIndex(item => item.productId === productId)

                let newItems
                if (existingItemIndex > -1) {
                    // Check stock if productDetails provided
                    if (productDetails && currentItems[existingItemIndex].quantity + quantity > productDetails.stock) {
                        toast.error(`Only ${productDetails.stock} items available`)
                        return false
                    }

                    currentItems[existingItemIndex].quantity += quantity
                    newItems = currentItems
                } else {
                    if (!productDetails) {
                        // Should fetch product details if not provided, but for now fallback or efficient approach
                        // In a real app we might need to fetch price/image here if not passed.
                        // For this refactor, we assume Shop passes necessary details or we fetch.
                        // To keep it simple, we expect basic details if possible, or we fetch.
                        // Since the existing Shop.js passes ID, we might need to fetch or use what we have.
                        // Let's try to fetch if we don't have details, OR trust the caller to update context/logic
                        // But `addToCart` signature in `Shop.js` only passes `product._id`.
                        // We need to fetch product info for guest cart display.

                        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/products/${productId}`)
                        if (res.data.success) {
                            productDetails = res.data.data
                        }
                    }

                    if (productDetails) {
                        newItems = [...currentItems, {
                            productId: productDetails._id,
                            title: productDetails.title,
                            price: productDetails.finalPrice || productDetails.price,
                            image: productDetails.images?.[0]?.url || '',
                            quantity,
                            stock: productDetails.stock
                        }]
                    } else {
                        return false
                    }
                }

                setCart(calculateCartTotals(newItems))
                return true
            } catch (err) {
                console.error("Guest add cart error", err)
                toast.error("Failed to add to cart")
                return false
            } finally {
                setLoading(false)
            }
        }

        // Logged In Logic
        try {
            setLoading(true)
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/cart/add`,
                { productId, quantity },
                { headers: { Authorization: `Bearer ${token}` } }
            )
            if (response.data.success) {
                setCart(response.data.data)
                return true
            }
        } catch (err) {
            console.error('Add to cart error:', err)
            const msg = err.response?.data?.message || 'Failed to add to cart'
            toast.error(msg)
            return false
        } finally {
            setLoading(false)
        }
    }

    const updateQuantity = async (productId, quantity) => {
        if (!token) {
            // Guest Logic
            const currentItems = [...cart.items]
            const itemIndex = currentItems.findIndex(item => item.productId === productId)
            if (itemIndex > -1) {
                if (quantity > currentItems[itemIndex].stock) {
                    toast.error("Insufficient stock")
                    return
                }
                currentItems[itemIndex].quantity = quantity
                setCart(calculateCartTotals(currentItems))
            }
            return
        }

        try {
            setLoading(true)

            // Check if quantity is increasing
            const currentItem = cart.items.find(item => item.productId === productId)
            const isIncreasing = currentItem && quantity > currentItem.quantity

            const response = await axios.put(
                `${process.env.REACT_APP_API_URL}/api/cart/update`,
                { productId, quantity },
                { headers: { Authorization: `Bearer ${token}` } }
            )
            if (response.data.success) {
                setCart(response.data.data)
                if (isIncreasing) {
                    toast.success('Product quantity updated')
                }
            }
        } catch (err) {
            console.error('Update quantity error:', err)
            toast.error(err.response?.data?.message || 'Failed to update quantity')
        } finally {
            setLoading(false)
        }
    }

    const removeFromCart = async (productId) => {
        if (!token) {
            // Guest Logic
            const newItems = cart.items.filter(item => item.productId !== productId)
            setCart(calculateCartTotals(newItems))
            toast.success('Item removed from cart')
            return
        }

        try {
            setLoading(true)
            const response = await axios.delete(
                `${process.env.REACT_APP_API_URL}/api/cart/remove/${productId}`,
                { headers: { Authorization: `Bearer ${token}` } }
            )
            if (response.data.success) {
                setCart(response.data.data)
                toast.success('Item removed from cart')
            }
        } catch (err) {
            console.error('Remove from cart error:', err)
            toast.error('Failed to remove item')
        } finally {
            setLoading(false)
        }
    }

    const clearCart = async () => {
        if (!token) {
            setCart({ items: [], totalItems: 0, totalPrice: 0 })
            localStorage.removeItem('guestCart')
            toast.success('Cart cleared successfully')
            return
        }

        try {
            setLoading(true)
            const response = await axios.delete(
                `${process.env.REACT_APP_API_URL}/api/cart/clear`,
                { headers: { Authorization: `Bearer ${token}` } }
            )
            if (response.data.success) {
                setCart(response.data.data)
                toast.success('Cart cleared successfully')
            }
        } catch (err) {
            console.error('Clear cart error:', err)
            toast.error('Failed to clear cart')
        } finally {
            setLoading(false)
        }
    }

    const mergeLocalCart = async (currentToken) => {
        const savedCart = localStorage.getItem('guestCart')
        if (savedCart) {
            try {
                const parsedCart = JSON.parse(savedCart)
                if (parsedCart.items && parsedCart.items.length > 0) {
                    // Send items to backend to merge
                    const response = await axios.post(
                        `${process.env.REACT_APP_API_URL}/api/cart/merge`,
                        { items: parsedCart.items },
                        { headers: { Authorization: `Bearer ${currentToken}` } }
                    )

                    if (response.data.success) {
                        setCart(response.data.data)
                        toast.success("Cart merged successfully")
                    }
                }
                // Clear local guest cart after merge
                localStorage.removeItem('guestCart')
            } catch (error) {
                console.error("Cart merge error", error)
            }
        }
        // Always fetch latest cart after login to be sure
        // We can just rely on the merge response if successful, but fetchCart is safe too.
        // If merge wasn't called (no guest cart), we still need to fetch user cart.
        if (!savedCart) {
            // If we didn't merge, we still need to load the user's cart
            // This corresponds to the fetchCart call in the useEffect when token changes,
            // but calling it explicitly ensures immediate update if needed.
            // accurate state update will happen via useEffect [token] anyway.
        }
    }

    const value = {
        cart,
        user,
        loading,
        token, // Expose token if needed
        login,
        logout,
        fetchCart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        fetchUser,
        mergeLocalCart
    }

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export default CartContext
