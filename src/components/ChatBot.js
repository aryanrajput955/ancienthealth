import React, { useState, useRef, useEffect } from 'react'
import { X, Send, Leaf } from 'lucide-react'

/* ─── conversation steps ───────────────────────── */
const STEPS = {
  GREETING: 'greeting',
  AWAIT_NAME: 'await_name',
  AWAIT_EMAIL: 'await_email',
  DONE: 'done',
}

const BOT_DELAYS = { TYPING_MS: 900 }

function isValidEmail(val) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim())
}

/* ─── sub-components ───────────────────────────── */
function TypingIndicator() {
  return (
    <div className="flex items-end gap-2 mb-3">
      <div className="w-7 h-7 rounded-full bg-[#2d5f4f] flex items-center justify-center flex-shrink-0">
        <Leaf className="w-3.5 h-3.5 text-[#d4a574]" />
      </div>
      <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl rounded-bl-none px-4 py-3">
        <div className="flex gap-1 items-center h-4">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-[#d4a574]/70 animate-bounce"
              style={{ animationDelay: `${i * 0.18}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function BotMessage({ text }) {
  return (
    <div className="flex items-end gap-2 mb-3 animate-[fadeSlideIn_0.3s_ease-out]">
      <div className="w-7 h-7 rounded-full bg-[#2d5f4f] flex items-center justify-center flex-shrink-0 shadow-md">
        <Leaf className="w-3.5 h-3.5 text-[#d4a574]" />
      </div>
      <div className="max-w-[78%] bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl rounded-bl-none px-4 py-2.5">
        <p className="text-sm text-white/90 leading-relaxed">{text}</p>
      </div>
    </div>
  )
}

function UserMessage({ text }) {
  return (
    <div className="flex justify-end mb-3 animate-[fadeSlideIn_0.3s_ease-out]">
      <div className="max-w-[78%] bg-[#2d5f4f] rounded-2xl rounded-br-none px-4 py-2.5 shadow-md">
        <p className="text-sm text-white/95 leading-relaxed">{text}</p>
      </div>
    </div>
  )
}

/* ─── main component ───────────────────────────── */
export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [step, setStep] = useState(STEPS.GREETING)
  const [isTyping, setIsTyping] = useState(false)
  const [emailError, setEmailError] = useState('')
  const [hasGreeted, setHasGreeted] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  /* auto-scroll */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  /* focus input when open */
  useEffect(() => {
    if (isOpen && step !== STEPS.DONE) {
      setTimeout(() => inputRef.current?.focus(), 350)
    }
  }, [isOpen, step])

  /* greeting on first open */
  useEffect(() => {
    if (isOpen && !hasGreeted) {
      setHasGreeted(true)
      setIsTyping(true)
      setTimeout(() => {
        setIsTyping(false)
        setMessages([
          {
            id: Date.now(),
            type: 'bot',
            text: "Hey! 👋 Need help with something? I'm here... What's your name?",
          },
        ])
        setStep(STEPS.AWAIT_NAME)
      }, BOT_DELAYS.TYPING_MS)
    }
  }, [isOpen, hasGreeted])

  function addBotMessage(text) {
    setIsTyping(true)
    return new Promise((resolve) => {
      setTimeout(() => {
        setIsTyping(false)
        setMessages((prev) => [
          ...prev,
          { id: Date.now() + Math.random(), type: 'bot', text },
        ])
        resolve()
      }, BOT_DELAYS.TYPING_MS)
    })
  }

  async function handleSend() {
    const value = inputValue.trim()
    if (!value) return
    if (step === STEPS.DONE) return

    /* email validation */
    if (step === STEPS.AWAIT_EMAIL && !isValidEmail(value)) {
      setEmailError('Please enter a valid email address.')
      return
    }
    setEmailError('')

    const userMsg = { id: Date.now(), type: 'user', text: value }
    setMessages((prev) => [...prev, userMsg])
    setInputValue('')

    if (step === STEPS.AWAIT_NAME) {
      setStep(STEPS.AWAIT_EMAIL)
      await addBotMessage(
        `Nice to meet you, ${value}! 🌿 What's your email address?`
      )
    } else if (step === STEPS.AWAIT_EMAIL) {
      setStep(STEPS.DONE)
      await addBotMessage(
        "Thank you! ✨ We'll connect with you soon. Have a wonderful day!"
      )
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  function handleToggle() {
    setIsOpen((prev) => !prev)
  }

  const placeholder =
    step === STEPS.AWAIT_NAME
      ? 'Your name…'
      : step === STEPS.AWAIT_EMAIL
      ? 'your@email.com'
      : ''

  return (
    <>
      {/* ── keyframe styles injected once ── */}
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes chatBoxOpen {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes pulseRing {
          0%, 100% { box-shadow: 0 0 0 0 rgba(212,165,116,0.4); }
          50%       { box-shadow: 0 0 0 10px rgba(212,165,116,0); }
        }
      `}</style>

      {/* ── chat window ── */}
      {isOpen && (
        <div
          className="fixed bottom-24 right-5 z-50 w-80 sm:w-96 flex flex-col"
          style={{
            animation: 'chatBoxOpen 0.35s cubic-bezier(0.34,1.56,0.64,1) both',
          }}
        >
          {/* header */}
          <div
            className="flex items-center justify-between px-4 py-3 rounded-t-2xl"
            style={{
              background:
                'linear-gradient(135deg, #1e4035 0%, #2d5f4f 60%, #3e7a70 100%)',
              borderBottom: '1px solid rgba(212,165,116,0.25)',
            }}
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#d4a574]/20 border border-[#d4a574]/40 flex items-center justify-center">
                <Leaf className="w-4 h-4 text-[#d4a574]" />
              </div>
              <div>
                <p
                  className="text-white font-semibold text-sm leading-none"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  Ancient Health
                </p>
                <p className="text-[#d4a574]/80 text-xs mt-0.5">
                  Support Assistant
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-7 h-7 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all duration-200"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* messages */}
          <div
            className="flex-1 overflow-y-auto px-4 py-4 min-h-[260px] max-h-[340px] scrollbar-hide"
            style={{
              background: 'rgba(15, 28, 24, 0.97)',
              backdropFilter: 'blur(12px)',
            }}
          >
            {messages.map((msg) =>
              msg.type === 'bot' ? (
                <BotMessage key={msg.id} text={msg.text} />
              ) : (
                <UserMessage key={msg.id} text={msg.text} />
              )
            )}
            {isTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>

          {/* input */}
          <div
            className="px-3 py-3 rounded-b-2xl"
            style={{
              background: 'rgba(15, 28, 24, 0.97)',
              borderTop: '1px solid rgba(255,255,255,0.07)',
            }}
          >
            {emailError && (
              <p className="text-red-400 text-xs mb-2 px-1">{emailError}</p>
            )}
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type={step === STEPS.AWAIT_EMAIL ? 'email' : 'text'}
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value)
                  if (emailError) setEmailError('')
                }}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                disabled={step === STEPS.DONE || step === STEPS.GREETING || isTyping}
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none focus:border-[#d4a574]/50 focus:bg-white/8 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
              />
              <button
                onClick={handleSend}
                disabled={!inputValue.trim() || step === STEPS.DONE || isTyping}
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
                style={{
                  background: inputValue.trim()
                    ? 'linear-gradient(135deg, #2d5f4f, #3e7a70)'
                    : 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(212,165,116,0.3)',
                }}
              >
                <Send className="w-4 h-4 text-[#d4a574]" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── floating button ── */}
      <button
        onClick={handleToggle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300"
        style={{
          background:
            'linear-gradient(135deg, #1e4035 0%, #2d5f4f 60%, #3e7a70 100%)',
          border: '1.5px solid rgba(212,165,116,0.5)',
          transform: isHovered
            ? 'scale(1.12) translateY(-2px)'
            : isOpen
            ? 'scale(1.05)'
            : 'scale(1)',
          boxShadow: isHovered
            ? '0 12px 40px rgba(45,95,79,0.55), 0 0 0 4px rgba(212,165,116,0.15)'
            : '0 8px 24px rgba(45,95,79,0.4)',
          animation: !isOpen && !isHovered ? 'pulseRing 2.4s ease-in-out infinite' : 'none',
        }}
        aria-label="Open chat"
      >
        {isOpen ? (
          <X className="w-5 h-5 text-[#d4a574]" />
        ) : (
          <Leaf className="w-5 h-5 text-[#d4a574]" />
        )}

        {/* tooltip */}
        {isHovered && !isOpen && (
          <span
            className="absolute right-16 whitespace-nowrap bg-[#0f1c18] border border-[#d4a574]/20 text-white/80 text-xs px-3 py-1.5 rounded-lg shadow-lg"
            style={{ animation: 'fadeSlideIn 0.2s ease-out' }}
          >
            Need help?
          </span>
        )}
      </button>
    </>
  )
}
