import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { motion } from 'framer-motion'
import { Calendar, User, ArrowLeft, BookOpen, Share2, Copy, ChevronRight } from 'lucide-react'

// Simple markdown-to-JSX renderer (handles headings, bold, italic, lists, paragraphs)
const renderContent = (raw) => {
    if (!raw) return null
    const lines = raw.split('\n')
    const elements = []
    let listItems = []
    let key = 0

    const flushList = () => {
        if (listItems.length > 0) {
            elements.push(
                <ul key={key++} className="my-5 space-y-2 pl-5">
                    {listItems.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-[#e8e6e3]/80 text-base leading-relaxed">
                            <span className="mt-2 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#d4a574]" />
                            <span>{inlineFormat(item)}</span>
                        </li>
                    ))}
                </ul>
            )
            listItems = []
        }
    }

    const inlineFormat = (text) => {
        // Bold
        text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        // Italic
        text = text.replace(/\*(.*?)\*/g, '<em>$1</em>')
        return <span dangerouslySetInnerHTML={{ __html: text }} />
    }

    lines.forEach((line) => {
        if (/^### /.test(line)) {
            flushList()
            elements.push(
                <h3 key={key++} className="text-lg font-serif font-bold text-[#d4a574] mt-8 mb-3">
                    {line.replace(/^### /, '')}
                </h3>
            )
        } else if (/^## /.test(line)) {
            flushList()
            elements.push(
                <h2 key={key++} className="text-2xl font-serif font-bold text-white mt-10 mb-4 pb-2 border-b border-white/10">
                    {line.replace(/^## /, '')}
                </h2>
            )
        } else if (/^# /.test(line)) {
            flushList()
            elements.push(
                <h1 key={key++} className="text-3xl font-serif font-bold text-white mt-8 mb-5">
                    {line.replace(/^# /, '')}
                </h1>
            )
        } else if (/^[-*] /.test(line)) {
            listItems.push(line.replace(/^[-*] /, ''))
        } else if (line.trim() === '') {
            flushList()
        } else {
            flushList()
            elements.push(
                <p key={key++} className="text-[#e8e6e3]/75 text-base leading-[1.9] my-4">
                    {inlineFormat(line)}
                </p>
            )
        }
    })
    flushList()
    return elements
}

const BlogDetail = () => {
    const { id } = useParams()
    const [blog, setBlog] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [copied, setCopied] = useState(false)
    const [scrollProgress, setScrollProgress] = useState(0)

    useEffect(() => {
        fetchBlog()
        // eslint-disable-next-line
    }, [id])

    // Reading progress bar
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY
            const docHeight = document.documentElement.scrollHeight - window.innerHeight
            setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const fetchBlog = async () => {
        try {
            setLoading(true)
            const res = await fetch(`${process.env.REACT_APP_API_URL}/api/blogs/${id}`)
            const data = await res.json()
            if (data.success) {
                setBlog(data.data)
            } else {
                setError('Blog post not found.')
            }
        } catch {
            setError('Failed to load blog post.')
        } finally {
            setLoading(false)
        }
    }

    const formatDate = (dateStr) => {
        if (!dateStr) return ''
        return new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(window.location.href)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="min-h-screen bg-[#0f1c18]">
            {/* Reading Progress Bar */}
            <div className="fixed top-0 left-0 right-0 z-[100] h-0.5 bg-transparent pointer-events-none">
                <motion.div
                    className="h-full bg-gradient-to-r from-[#d4a574] to-[#e8c49a]"
                    style={{ width: `${scrollProgress}%` }}
                    transition={{ duration: 0.05 }}
                />
            </div>

            <Navbar />

            {loading && (
                <div className="flex flex-col items-center justify-center min-h-screen gap-4">
                    <div className="relative w-16 h-16">
                        <div className="absolute inset-0 border-4 border-[#d4a574]/20 rounded-full" />
                        <div className="absolute inset-0 border-4 border-[#d4a574] border-t-transparent rounded-full animate-spin" />
                    </div>
                    <p className="text-white/50">Loading article...</p>
                </div>
            )}

            {error && !loading && (
                <div className="flex flex-col items-center justify-center min-h-screen gap-4">
                    <BookOpen className="w-12 h-12 text-[#d4a574]/50" />
                    <p className="text-white/60">{error}</p>
                    <Link to="/blog" className="text-[#d4a574] text-sm hover:underline">← Back to Blog</Link>
                </div>
            )}

            {!loading && blog && (
                <>
                    {/* ── Hero ── */}
                    <div className="relative h-[65vh] min-h-[480px] flex items-end overflow-hidden">
                        {/* Background Image */}
                        <div className="absolute inset-0">
                            {blog.image ? (
                                <motion.img
                                    initial={{ scale: 1.08 }}
                                    animate={{ scale: 1 }}
                                    transition={{ duration: 1.2, ease: 'easeOut' }}
                                    src={blog.image}
                                    alt={blog.title}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-br from-[#1B2B26] to-[#0f1c18]" />
                            )}
                            {/* Gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0f1c18] via-[#0f1c18]/60 to-[#0f1c18]/20" />
                            <div className="absolute inset-0 bg-gradient-to-r from-[#0f1c18]/40 to-transparent" />
                        </div>

                        {/* Hero Content */}
                        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-14">
                            {/* Breadcrumbs */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="flex items-center gap-2 text-xs text-white/40 mb-6"
                            >
                                <Link to="/" className="hover:text-[#d4a574] transition-colors">Home</Link>
                                <ChevronRight className="w-3 h-3" />
                                <Link to="/blog" className="hover:text-[#d4a574] transition-colors">Blog</Link>
                                <ChevronRight className="w-3 h-3" />
                                <span className="text-white/60 line-clamp-1 max-w-[200px]">{blog.title}</span>
                            </motion.div>

                            {/* Category + Meta */}
                            <motion.div
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="flex flex-wrap items-center gap-3 mb-5"
                            >
                                {blog.category?.name && (
                                    <span className="px-3 py-1 rounded-full bg-[#d4a574] text-[#0f1c18] text-xs font-bold">
                                        {blog.category.name}
                                    </span>
                                )}
                                <span className="flex items-center gap-1.5 text-xs text-white/50">
                                    <Calendar className="w-3 h-3" />
                                    {formatDate(blog.date)}
                                </span>
                                <span className="flex items-center gap-1.5 text-xs text-white/50">
                                    <User className="w-3 h-3" />
                                    {blog.author}
                                </span>
                            </motion.div>

                            {/* Title */}
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.7 }}
                                className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white leading-tight max-w-3xl"
                            >
                                {blog.title}
                            </motion.h1>
                        </div>
                    </div>

                    {/* ── Article Body (Light Section) ── */}
                    <div className="relative bg-[#f7f3ee]">
                        {/* Wavy separator */}
                        <div className="absolute top-0 left-0 right-0" style={{ transform: 'translateY(-1px)' }}>
                            <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-16">
                                <path d="M0,60 L0,20 Q180,60 360,20 Q540,-20 720,20 Q900,60 1080,20 Q1260,-20 1440,20 L1440,60 Z" fill="#f7f3ee" />
                            </svg>
                        </div>

                        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-16">
                            <div className="grid lg:grid-cols-[1fr_280px] gap-12 items-start">

                                {/* Meta Description Intro */}
                                <div>
                                    {blog.metaDescription && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 15 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.3 }}
                                            className="mb-8 p-6 rounded-2xl bg-white border border-[#d4a574]/20 shadow-sm"
                                        >
                                            <p className="text-[#1B2B26]/70 text-base leading-relaxed italic font-serif">
                                                "{blog.metaDescription}"
                                            </p>
                                        </motion.div>
                                    )}

                                    {/* Author card (mobile below) */}
                                    <div className="flex items-center gap-4 mb-8 lg:hidden">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#d4a574] to-[#8b6b43] flex items-center justify-center text-white font-bold text-lg shadow-md">
                                            {blog.author?.charAt(0) || 'A'}
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-[#1B2B26]">{blog.author}</p>
                                            <p className="text-xs text-[#1B2B26]/50">{formatDate(blog.date)}</p>
                                        </div>
                                    </div>

                                    {/* Divider */}
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="flex-1 h-px bg-[#d4a574]/20" />
                                        <span className="text-[#d4a574] text-lg">⟡</span>
                                        <div className="flex-1 h-px bg-[#d4a574]/20" />
                                    </div>

                                    {/* Article Text */}
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.5 }}
                                    >
                                        {renderContent(blog.content)}
                                    </motion.div>
                                </div>

                                {/* Sidebar */}
                                <aside className="hidden lg:flex flex-col gap-6 sticky top-36">
                                    {/* Author Card */}
                                    <div className="bg-white rounded-2xl p-6 border border-[#d4a574]/15 shadow-sm">
                                        <p className="text-xs font-bold text-[#1B2B26]/40 uppercase tracking-widest mb-4">Written by</p>
                                        <div className="flex items-center gap-3">
                                            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#d4a574] to-[#8b6b43] flex items-center justify-center text-white font-bold text-base shadow-md">
                                                {blog.author?.charAt(0) || 'A'}
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-[#1B2B26]">{blog.author}</p>
                                                <p className="text-xs text-[#1B2B26]/50">{formatDate(blog.date)}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Share Card */}
                                    <div className="bg-white rounded-2xl p-6 border border-[#d4a574]/15 shadow-sm">
                                        <p className="text-xs font-bold text-[#1B2B26]/40 uppercase tracking-widest mb-4">Share Article</p>
                                        <button
                                            onClick={handleCopy}
                                            className="w-full flex items-center justify-center gap-2 py-3 bg-[#1B2B26] text-white text-sm font-semibold rounded-xl hover:bg-[#2d5f4f] transition-colors"
                                        >
                                            {copied ? (
                                                <>
                                                    <Copy className="w-4 h-4 text-[#d4a574]" />
                                                    Copied!
                                                </>
                                            ) : (
                                                <>
                                                    <Share2 className="w-4 h-4" />
                                                    Copy Link
                                                </>
                                            )}
                                        </button>
                                    </div>

                                    {/* Back */}
                                    <Link
                                        to="/blog"
                                        className="flex items-center gap-2 text-[#1B2B26]/60 hover:text-[#2d5f4f] text-sm font-semibold transition-colors group"
                                    >
                                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                                        Back to Blog
                                    </Link>
                                </aside>
                            </div>

                            {/* Mobile share / back */}
                            <div className="flex items-center justify-between gap-4 mt-12 pt-8 border-t border-[#d4a574]/20 lg:hidden">
                                <Link to="/blog" className="flex items-center gap-2 text-[#1B2B26]/60 text-sm font-semibold hover:text-[#2d5f4f] transition-colors">
                                    <ArrowLeft className="w-4 h-4" />
                                    Blog
                                </Link>
                                <button
                                    onClick={handleCopy}
                                    className="flex items-center gap-2 px-4 py-2 bg-[#1B2B26] text-white text-xs font-semibold rounded-full"
                                >
                                    {copied ? <><Copy className="w-3.5 h-3.5" />Copied!</> : <><Share2 className="w-3.5 h-3.5" />Share</>}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* ── Dark Footer Banner ── */}
                    <div className="bg-[#0f1c18] relative overflow-hidden py-24">
                        <div className="absolute inset-0 pointer-events-none">
                            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyMTIsMTY1LDExNiwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50" />
                            <div className="absolute top-0 right-1/4 w-[400px] h-[300px] bg-[#d4a574]/5 rounded-full blur-[80px]" />
                        </div>

                        <div className="relative text-center max-w-2xl mx-auto px-4">
                            <span className="inline-block w-12 h-px bg-[#d4a574]/50 mb-6" />
                            <h3 className="text-3xl md:text-4xl font-serif text-white mb-4">Explore More Wisdom</h3>
                            <p className="text-white/50 mb-8 leading-relaxed">
                                Journey deeper into ancient health traditions with our curated collection of articles.
                            </p>
                            <Link
                                to="/blog"
                                className="inline-flex items-center gap-2 px-7 py-3.5 border border-[#d4a574]/50 text-[#d4a574] font-bold text-sm rounded-full hover:bg-[#d4a574] hover:text-[#0f1c18] transition-all duration-300"
                            >
                                <BookOpen className="w-4 h-4" />
                                All Articles
                            </Link>
                        </div>
                    </div>
                </>
            )}

            <Footer />
        </div>
    )
}

export default BlogDetail
