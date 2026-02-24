import React, { useState, useEffect, useCallback, useRef } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useCart } from '../../context/CartContext'

import { formatPrice } from '../../utils/formatPrice'

const STATUSES = ['processing', 'shipped', 'delivered', 'cancelled']


const STATUS_STYLES = {
    pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    processing: 'bg-blue-100 text-blue-800 border-blue-200',
    shipped: 'bg-amber-100 text-amber-800 border-amber-200',
    delivered: 'bg-green-100 text-green-800 border-green-200',
    cancelled: 'bg-red-100 text-red-800 border-red-200',
}

const STATUS_DOT = {
    pending: 'bg-yellow-500',
    processing: 'bg-blue-500',
    shipped: 'bg-amber-500',
    delivered: 'bg-green-500',
    cancelled: 'bg-red-500',
}

// Status dropdown — portal-based (escapes overflow clipping) + onMouseDown (fires before outside-click handler)
const StatusCell = ({ order, token, onUpdate }) => {
    const [open, setOpen] = useState(false)
    const [updating, setUpdating] = useState(false)
    const [pos, setPos] = useState({ top: 0, left: 0 })
    const btnRef = useRef(null)

    useEffect(() => {
        if (!open) return
        const close = () => setOpen(false)
        document.addEventListener('mousedown', close)
        return () => document.removeEventListener('mousedown', close)
    }, [open])

    const handleOpen = (e) => {
        e.stopPropagation()
        const rect = btnRef.current.getBoundingClientRect()
        setPos({ top: rect.bottom + window.scrollY + 4, left: rect.left + window.scrollX })
        setOpen(o => !o)
    }

    const handleSelect = async (e, newStatus) => {
        e.stopPropagation()
        if (newStatus === order.orderStatus) { setOpen(false); return }
        setUpdating(true)
        setOpen(false)
        try {
            await axios.patch(
                `${process.env.REACT_APP_API_URL}/api/admin/orders/${order._id}/status`,
                { orderStatus: newStatus },
                { headers: { Authorization: `Bearer ${token}` } }
            )
            onUpdate(order._id, newStatus)
            toast.success(`Status updated to "${newStatus}"`)
        } catch {
            toast.error('Failed to update status')
        } finally {
            setUpdating(false)
        }
    }

    const style = STATUS_STYLES[order.orderStatus] || 'bg-slate-100 text-slate-700 border-slate-200'
    const dot = STATUS_DOT[order.orderStatus] || 'bg-slate-400'

    return (
        <>
            <button
                ref={btnRef}
                onMouseDown={handleOpen}
                disabled={updating}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border capitalize cursor-pointer hover:opacity-80 transition-opacity select-none ${style} ${updating ? 'opacity-50 cursor-wait' : ''}`}
                title="Click to change status"
            >
                <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
                {updating ? 'Saving…' : order.orderStatus}
                <svg className={`w-3 h-3 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {open && ReactDOM.createPortal(
                <div
                    style={{ position: 'absolute', top: pos.top, left: pos.left, zIndex: 99999 }}
                    className="bg-white rounded-xl shadow-2xl border border-slate-200 py-1 min-w-[150px]"
                >
                    {STATUSES.map(s => (
                        <button
                            key={s}
                            onMouseDown={(e) => handleSelect(e, s)}
                            className={`w-full text-left px-3 py-2 text-xs font-medium capitalize flex items-center gap-2 hover:bg-slate-50 transition-colors ${s === order.orderStatus ? 'text-slate-400 cursor-default' : 'text-slate-700'}`}
                        >
                            <span className={`w-2 h-2 rounded-full flex-shrink-0 ${STATUS_DOT[s]}`} />
                            {s}
                            {s === order.orderStatus && (
                                <svg className="w-3 h-3 ml-auto text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            )}
                        </button>
                    ))}
                </div>,
                document.body
            )}
        </>
    )
}



const AllOrders = () => {
    const { token } = useCart()
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')
    const [deletingId, setDeletingId] = useState(null)
    const [confirmDelete, setConfirmDelete] = useState(null)

    const fetchOrders = useCallback(async () => {
        try {
            setLoading(true)
            const res = await axios.get(
                `${process.env.REACT_APP_API_URL}/api/admin/orders/all`,
                { headers: { Authorization: `Bearer ${token}` } }
            )
            setOrders(res.data.data || [])
        } catch {
            toast.error('Failed to fetch orders')
        } finally {
            setLoading(false)
        }
    }, [token])

    useEffect(() => { fetchOrders() }, [fetchOrders])

    // Optimistic status update
    const handleStatusUpdate = (orderId, newStatus) => {
        setOrders(prev => prev.map(o => o._id === orderId ? { ...o, orderStatus: newStatus } : o))
    }

    const handleDelete = async (orderId) => {
        setDeletingId(orderId)
        try {
            await axios.delete(
                `${process.env.REACT_APP_API_URL}/api/admin/orders/${orderId}`,
                { headers: { Authorization: `Bearer ${token}` } }
            )
            toast.success('Order deleted')
            setOrders(prev => prev.filter(o => o._id !== orderId))
        } catch {
            toast.error('Failed to delete order')
        } finally {
            setDeletingId(null)
            setConfirmDelete(null)
        }
    }

    const filtered = orders.filter(o => {
        const q = search.toLowerCase()
        return (
            (o.orderNumber || '').toLowerCase().includes(q) ||
            (o.orderStatus || '').toLowerCase().includes(q) ||
            (o.shippingAddress?.city || '').toLowerCase().includes(q) ||
            (o.shippingAddress?.state || '').toLowerCase().includes(q) ||
            (o.shippingAddress?.phone || '').includes(q)
        )
    })

    return (
        <div className="p-8 min-h-screen bg-slate-50">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-1">
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800">All Orders</h1>
                        <p className="text-sm text-slate-500">Active orders — click a status badge to update it</p>
                    </div>
                </div>
            </div>

            {/* Stats + Search */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="bg-white rounded-xl px-5 py-3 shadow-sm border border-slate-200 flex items-center gap-3">
                    <span className="text-2xl font-bold text-slate-800">{orders.length}</span>
                    <span className="text-sm text-slate-500">Total</span>
                </div>
                <div className="flex-1 relative">
                    <svg className="absolute left-3 top-3 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Search by order #, status, city, phone..."
                        className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200" style={{ overflow: 'visible' }}>
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-24 gap-3">
                        <div className="relative">
                            <div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-200" />
                            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent absolute top-0" />
                        </div>
                        <p className="text-slate-500 text-sm">Loading orders...</p>
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 gap-3">
                        <svg className="w-16 h-16 text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        <p className="text-slate-500 font-medium">No orders found</p>
                    </div>
                ) : (
                    <div style={{ overflowX: 'auto', overflowY: 'visible' }}>
                        <table className="w-full">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-200">
                                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Order #</th>
                                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Phone</th>
                                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Location</th>
                                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Amount</th>
                                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Last Changed</th>
                                    <th className="text-center px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filtered.map(order => {
                                    const lastChange = order.statusHistory && order.statusHistory.length > 0
                                        ? order.statusHistory[order.statusHistory.length - 1]
                                        : null

                                    return (
                                        <tr key={order._id} className="hover:bg-slate-50/70 transition-colors group">
                                            <td className="px-6 py-4">
                                                <span className="font-mono font-semibold text-slate-800 text-sm">
                                                    #{order.orderNumber || order._id.slice(-6).toUpperCase()}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <StatusCell order={order} token={token} onUpdate={handleStatusUpdate} />
                                            </td>
                                            <td className="px-6 py-4 text-sm text-slate-600">
                                                {order.shippingAddress?.phone || '—'}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-slate-700 font-medium">{order.shippingAddress?.city || '—'}</div>
                                                <div className="text-xs text-slate-400">{order.shippingAddress?.state || ''}</div>
                                            </td>
                                            <td className="px-6 py-4 text-sm font-semibold text-slate-800">
                                                ₹{formatPrice(order.totalAmount)}
                                            </td>
                                            <td className="px-6 py-4 text-xs text-slate-500">
                                                {lastChange ? (
                                                    <div className="flex flex-col">
                                                        <span className="font-medium text-slate-700">By <span className="font-semibold">{lastChange.changedBy}</span></span>
                                                        <span>to <span className="font-semibold">{lastChange.status}</span></span>
                                                        <span className="text-slate-400">
                                                            {new Date(lastChange.changedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })} • {new Date(lastChange.changedAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                                                        </span>
                                                    </div>
                                                ) : (
                                                    <span className="italic text-slate-400">No changes</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                {confirmDelete === order._id ? (
                                                    <div className="flex items-center justify-center gap-2">
                                                        <button
                                                            onClick={() => handleDelete(order._id)}
                                                            disabled={deletingId === order._id}
                                                            className="px-3 py-1.5 bg-red-600 text-white text-xs font-semibold rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                                                        >
                                                            {deletingId === order._id ? '...' : 'Confirm'}
                                                        </button>
                                                        <button
                                                            onClick={() => setConfirmDelete(null)}
                                                            className="px-3 py-1.5 bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-300 transition-colors"
                                                        >
                                                            Cancel
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <button
                                                        onClick={() => setConfirmDelete(order._id)}
                                                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                                        title="Delete order"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {!loading && filtered.length > 0 && (
                <p className="text-sm text-slate-400 mt-4 text-right">
                    Showing {filtered.length} of {orders.length} orders
                </p>
            )}
        </div>
    )
}

export default AllOrders
