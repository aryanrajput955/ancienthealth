import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, User, ArrowRight, Search, BookOpen } from 'lucide-react'

const Blog = () => {
    const [blogs, setBlogs] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [search, setSearch] = useState('')
    const [searchInput, setSearchInput] = useState('')
    const [activeCategory, setActiveCategory] = useState('All')
    const [categories, setCategories] = useState(['All'])

    useEffect(() => {
        fetchBlogs()
        // eslint-disable-next-line
    }, [search])

    const fetchBlogs = async () => {
        try {
            setLoading(true)
            const params = new URLSearchParams()
            if (search) params.append('search', search)
            const res = await fetch(`${process.env.REACT_APP_API_URL}/api/blogs?${params.toString()}`)
            const data = await res.json()
            if (data.success) {
                setBlogs(data.data)
                // Extract unique categories
                const cats = ['All', ...new Set(data.data.map(b => b.category?.name).filter(Boolean))]
                setCategories(cats)
            } else {
                setError('Failed to fetch blogs')
            }
        } catch (err) {
            setError('Failed to load blog posts.')
        } finally {
            setLoading(false)
        }
    }

    const handleSearch = (e) => {
        e.preventDefault()
        setSearch(searchInput)
        setActiveCategory('All')
    }

    const filteredBlogs = activeCategory === 'All'
        ? blogs
        : blogs.filter(b => b.category?.name === activeCategory)

    const formatDate = (dateStr) => {
        if (!dateStr) return ''
        return new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
    }

    const featuredBlog = filteredBlogs[0]
    const restBlogs = filteredBlogs.slice(1)

    return (
        <div className="min-h-screen bg-[#0f1c18]">
            <Navbar />

            {/* ── Hero ── */}
            <div className="relative pt-28 pb-20 overflow-hidden">
                {/* Background decoration */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyMTIsMTY1LDExNiwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-60" />
                    <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-[#d4a574]/5 rounded-full blur-[120px]" />
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#2d5f4f]/10 rounded-full blur-[100px]" />
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                    >
                        <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#d4a574]/30 bg-[#d4a574]/10 text-[#d4a574] text-xs font-bold tracking-[0.2em] uppercase mb-6">
                            <BookOpen className="w-3 h-3" />
                            Ancient Wisdom
                        </span>
                        <h1 className="text-5xl md:text-7xl font-serif text-white mb-5 leading-tight">
                            The Wellness
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#d4a574] to-[#e8c49a]">
                                Chronicle
                            </span>
                        </h1>
                        <p className="text-white/60 text-lg max-w-2xl mx-auto leading-relaxed mb-10">
                            Timeless insights on Ayurveda, holistic living, and the ancient science of well-being — curated for the modern seeker.
                        </p>

                        {/* Search Bar */}
                        <motion.form
                            onSubmit={handleSearch}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="relative max-w-xl mx-auto"
                        >
                            <div className="relative flex items-center">
                                <Search className="absolute left-5 w-4 h-4 text-white/30" />
                                <input
                                    type="text"
                                    value={searchInput}
                                    onChange={e => setSearchInput(e.target.value)}
                                    placeholder="Search articles..."
                                    className="w-full pl-12 pr-5 py-4 bg-white/5 border border-white/10 rounded-full text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#d4a574]/50 focus:bg-white/8 transition-all"
                                />
                                <button
                                    type="submit"
                                    className="absolute right-2 px-5 py-2.5 bg-[#d4a574] text-[#0f1c18] text-xs font-bold rounded-full hover:bg-[#e8c49a] transition-colors"
                                >
                                    Search
                                </button>
                            </div>
                        </motion.form>
                    </motion.div>
                </div>
            </div>

            {/* ── Light Section ── */}
            <div className="bg-[#f7f3ee] relative">
                {/* Jagged edge top */}
                <div className="absolute top-0 left-0 right-0 overflow-hidden leading-[0]" style={{ transform: 'translateY(-1px)' }}>
                    <svg viewBox="0 0 1200 60" preserveAspectRatio="none" className="w-full h-16">
                        <path d="M0,60 L0,30 Q100,60 200,30 Q300,0 400,30 Q500,60 600,30 Q700,0 800,30 Q900,60 1000,30 Q1100,0 1200,30 L1200,60 Z" fill="#f7f3ee" />
                    </svg>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">

                    {/* Category Pills */}
                    {categories.length > 1 && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="flex flex-wrap gap-3 justify-center mb-14"
                        >
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${activeCategory === cat
                                        ? 'bg-[#1B2B26] text-white shadow-lg'
                                        : 'bg-white border border-[#d4a574]/30 text-[#1B2B26] hover:border-[#d4a574] hover:bg-[#d4a574]/5'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </motion.div>
                    )}

                    {/* Loading */}
                    {loading && (
                        <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                            <div className="relative w-16 h-16">
                                <div className="absolute inset-0 border-4 border-[#d4a574]/20 rounded-full" />
                                <div className="absolute inset-0 border-4 border-[#d4a574] border-t-transparent rounded-full animate-spin" />
                            </div>
                            <p className="text-[#1B2B26]/60 font-medium">Gathering wisdom...</p>
                        </div>
                    )}

                    {/* Error */}
                    {!loading && error && (
                        <div className="text-center py-20">
                            <p className="text-red-500">{error}</p>
                        </div>
                    )}

                    {/* Empty */}
                    {!loading && !error && filteredBlogs.length === 0 && (
                        <div className="text-center py-24">
                            <div className="w-16 h-16 rounded-full bg-[#d4a574]/15 flex items-center justify-center mx-auto mb-6">
                                <BookOpen className="w-7 h-7 text-[#d4a574]" />
                            </div>
                            <p className="text-[#1B2B26]/60 text-lg font-medium mb-2">No articles found</p>
                            <button onClick={() => { setSearch(''); setSearchInput(''); setActiveCategory('All') }} className="text-[#d4a574] text-sm font-semibold hover:underline mt-1">
                                Clear filters
                            </button>
                        </div>
                    )}

                    {/* Featured Article */}
                    {!loading && !error && featuredBlog && (
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={featuredBlog._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                className="mb-16"
                            >
                                <p className="text-[#d4a574] text-xs font-bold tracking-[0.2em] uppercase mb-6">✦ Featured Article</p>
                                <Link
                                    to={`/blog/${featuredBlog._id}`}
                                    className="group grid lg:grid-cols-2 gap-0 bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl border border-[#d4a574]/10 hover:border-[#d4a574]/30 transition-all duration-500"
                                >
                                    {/* Image */}
                                    <div className="relative h-72 lg:h-auto overflow-hidden bg-[#1B2B26]">
                                        {featuredBlog.image ? (
                                            <img
                                                src={featuredBlog.image}
                                                alt={featuredBlog.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <BookOpen className="w-16 h-16 text-[#d4a574]/40" />
                                            </div>
                                        )}
                                        {/* Dark overlay gradient */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#1B2B26]/30 lg:group-hover:opacity-0 transition-opacity duration-500" />
                                        {featuredBlog.category?.name && (
                                            <span className="absolute top-5 left-5 px-3 py-1 rounded-full bg-[#d4a574] text-[#0f1c18] text-xs font-bold">
                                                {featuredBlog.category.name}
                                            </span>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="p-8 lg:p-12 flex flex-col justify-center bg-gradient-to-br from-white to-[#f7f3ee]">
                                        <div className="flex items-center gap-4 text-xs text-[#1B2B26]/50 mb-5">
                                            <span className="flex items-center gap-1.5">
                                                <Calendar className="w-3.5 h-3.5" />
                                                {formatDate(featuredBlog.date)}
                                            </span>
                                            <span className="flex items-center gap-1.5">
                                                <User className="w-3.5 h-3.5" />
                                                {featuredBlog.author}
                                            </span>
                                        </div>
                                        <h2 className="text-2xl lg:text-3xl font-serif text-[#1B2B26] mb-4 leading-snug group-hover:text-[#2d5f4f] transition-colors duration-300">
                                            {featuredBlog.title}
                                        </h2>
                                        <p className="text-[#1B2B26]/60 text-sm leading-relaxed mb-8 line-clamp-3">
                                            {featuredBlog.metaDescription}
                                        </p>
                                        <div className="flex items-center gap-2 text-[#2d5f4f] font-bold text-sm">
                                            Read Article
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        </AnimatePresence>
                    )}

                    {/* Blog Grid */}
                    {!loading && !error && restBlogs.length > 0 && (
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
                            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {restBlogs.map(blog => (
                                <motion.div
                                    key={blog._id}
                                    variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
                                >
                                    <Link
                                        to={`/blog/${blog._id}`}
                                        className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-[#d4a574]/10 hover:border-[#d4a574]/40 hover:shadow-xl transition-all duration-400 h-full"
                                    >
                                        {/* Card Image */}
                                        <div className="relative h-52 overflow-hidden bg-[#1B2B26]">
                                            {blog.image ? (
                                                <img
                                                    src={blog.image}
                                                    alt={blog.title}
                                                    className="w-full h-full object-cover group-hover:scale-107 transition-transform duration-600"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center">
                                                    <BookOpen className="w-12 h-12 text-[#d4a574]/30" />
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                            {blog.category?.name && (
                                                <span className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-[#d4a574]/90 text-[#0f1c18] text-[11px] font-bold">
                                                    {blog.category.name}
                                                </span>
                                            )}
                                        </div>

                                        {/* Card Body */}
                                        <div className="p-6 flex flex-col flex-1">
                                            <div className="flex items-center gap-3 text-[11px] text-[#1B2B26]/40 mb-3">
                                                <span className="flex items-center gap-1">
                                                    <Calendar className="w-3 h-3" />
                                                    {formatDate(blog.date)}
                                                </span>
                                                <span>·</span>
                                                <span className="flex items-center gap-1">
                                                    <User className="w-3 h-3" />
                                                    {blog.author}
                                                </span>
                                            </div>
                                            <h3 className="text-base font-serif font-bold text-[#1B2B26] mb-2 leading-snug group-hover:text-[#2d5f4f] transition-colors line-clamp-2">
                                                {blog.title}
                                            </h3>
                                            <p className="text-[#1B2B26]/55 text-sm leading-relaxed line-clamp-2 flex-1 mb-4">
                                                {blog.metaDescription}
                                            </p>
                                            <div className="flex items-center gap-1.5 text-[#2d5f4f] text-xs font-bold pt-3 border-t border-[#d4a574]/10 mt-auto">
                                                Read More
                                                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </div>
            </div>

            {/* ── Dark closing CTA ── */}
            <div className="bg-[#0f1c18] py-24 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-[#d4a574]/5 rounded-full blur-[80px]" />
                </div>
                <div className="relative text-center max-w-2xl mx-auto px-4">
                    <p className="text-[#d4a574] text-xs font-bold tracking-[0.2em] uppercase mb-4">Stay rooted in wisdom</p>
                    <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">Every Herb Has a Story</h2>
                    <p className="text-white/50 mb-8 leading-relaxed">Ancient knowledge distilled into every article — written with reverence for tradition and science.</p>
                    <Link to="/shop" className="inline-block px-8 py-3.5 bg-[#d4a574] text-[#0f1c18] font-bold text-sm rounded-full hover:bg-[#e8c49a] transition-colors">
                        Explore Our Remedies
                    </Link>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default Blog
