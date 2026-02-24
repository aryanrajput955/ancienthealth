import React from 'react'
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom'
import Home from './pages/Home'
import Shop from './pages/Shop'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Cart from './pages/Cart'
import Profile from './pages/Profile'
import ProtectedRoute from './components/ProtectedRoute'
import ProtectedAdminRoute from './components/ProtectedAdminRoute'
import AdminDashboard from './admin/pages/AdminDashboard'
import AdminHome from './admin/pages/AdminHome'
import AddProduct from './admin/pages/AddProduct'
import ManageProducts from './admin/pages/ManageProducts'
import AddCategory from './admin/pages/AddCategory'
import ManageCategories from './admin/pages/ManageCategories'
import AddBlog from './admin/pages/AddBlog'
import ManageBlogs from './admin/pages/ManageBlogs'
import Users from './admin/pages/Users'
import AllOrders from './admin/pages/AllOrders'
import CompletedOrders from './admin/pages/CompletedOrders'
import Checkout from './pages/Checkout'
import OrderSuccess from './pages/OrderSuccess'
import MyOrders from './pages/MyOrders'
import Blog from './pages/Blog'
import BlogDetail from './pages/BlogDetail'

import { CartProvider } from './context/CartContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { ReactLenis } from 'lenis/react'

import ScrollToTop from './components/ScrollToTop'
import GlobalLoader from './components/GlobalLoader'
import ChatBot from './components/ChatBot'
import { CheckCircle2, AlertCircle, XCircle, Info, X } from 'lucide-react'

const App = () => {
	return (
		<ReactLenis root>
			<GlobalLoader />
			<ToastContainer
				position='bottom-right'
				autoClose={4000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme='dark'
				icon={({ type }) => {
					switch (type) {
						case 'success': return <CheckCircle2 className="w-5 h-5 text-[#d4a574]" />
						case 'error': return <XCircle className="w-5 h-5 text-red-400" />
						case 'warning': return <AlertCircle className="w-5 h-5 text-amber-400" />
						default: return <Info className="w-5 h-5 text-[#d4a574]" />
					}
				}}
				closeButton={({ closeToast }) => (
					<button onClick={closeToast} className="p-1 opacity-50 hover:opacity-100 transition-opacity">
						<X className="w-4 h-4 text-white/60" />
					</button>
				)}
				toastClassName={() =>
					'relative flex items-center justify-between p-4 min-w-[320px] rounded-lg overflow-hidden cursor-pointer bg-[#0f1c18] border border-[#d4a574]/20 shadow-2xl mb-4 mr-4 group hover:border-[#d4a574]/40 transition-all duration-300'
				}
				bodyClassName={() =>
					'text-sm font-sans font-medium text-[#e8e6e3] flex-1 flex items-center gap-3 px-2'
				}
				progressClassName="!bg-[#d4a574]"
			/>


			<Router>
				<CartProvider>
					<ScrollToTop />
					<ChatBot />
					<Routes>
						{/* Homepage */}
						<Route
							path='/'
							element={<Home />}
						/>

						{/* Shop Page */}
						<Route
							path='/shop'
							element={<Shop />}
						/>

						{/* About Page */}
						<Route
							path='/about'
							element={<About />}
						/>

						{/* Contact Page */}
						<Route
							path='/contact'
							element={<Contact />}
						/>

						{/* Cart Page */}
						<Route
							path='/cart'
							element={<Cart />}
						/>

						{/* Profile Page */}
						<Route
							path='/profile'
							element={
								<ProtectedRoute>
									<Profile />
								</ProtectedRoute>
							}
						/>

						{/* Checkout Page */}
						<Route
							path='/checkout'
							element={<Checkout />}
						/>

						{/* Order Success Page */}
						<Route
							path='/order-success/:orderId'
							element={<OrderSuccess />}
						/>

						{/* My Orders Page */}
						<Route
							path='/my-orders'
							element={<MyOrders />}
						/>

						{/* Blog Pages */}
						<Route
							path='/blog'
							element={<Blog />}
						/>
						<Route
							path='/blog/:id'
							element={<BlogDetail />}
						/>

						{/* Login Page */}
						<Route
							path='/login'
							element={<Login />}
						/>

						{/* Signup Page */}
						<Route
							path='/signup'
							element={<Signup />}
						/>

						{/* Protected Admin Dashboard with nested routes */}
						<Route
							path='/admin'
							element={
								<ProtectedAdminRoute>
									<AdminDashboard />
								</ProtectedAdminRoute>
							}>
							<Route
								index
								element={<AdminHome />}
							/>
							<Route
								path='products/add'
								element={<AddProduct />}
							/>
							<Route
								path='products/manage'
								element={<ManageProducts />}
							/>
							<Route
								path='products/add-category'
								element={<AddCategory />}
							/>
							<Route
								path='products/manage-categories'
								element={<ManageCategories />}
							/>
							<Route
								path='blogs/add'
								element={<AddBlog />}
							/>
							<Route
								path='blogs/manage'
								element={<ManageBlogs />}
							/>
							<Route
								path='users'
								element={<Users />}
							/>
							<Route
								path='orders/all'
								element={<AllOrders />}
							/>
							<Route
								path='orders/completed'
								element={<CompletedOrders />}
							/>
						</Route>

						{/* Catch all - redirect to home */}
						<Route
							path='*'
							element={
								<Navigate
									to='/'
									replace
								/>
							}
						/>
					</Routes>
				</CartProvider>
			</Router>
		</ReactLenis>
	)
}

export default App
