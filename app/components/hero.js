'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useScroll, useTransform } from 'framer-motion';

// Separate component for hook-dependent content
const AyurvedaHeroContent = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Enhanced parallax transforms
  const backgroundY = useTransform(mouseY, [-1, 1], [-30, 30]);
  const backgroundX = useTransform(mouseX, [-1, 1], [-20, 20]);

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, -100]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.8]);

  useEffect(() => {
    setIsLoaded(true);
    
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      mouseX.set((clientX / innerWidth - 0.5) * 2);
      mouseY.set((clientY / innerHeight - 0.5) * 2);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const handleCTAClick = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };

  return (
    <section className="relative min-h-screen pt-20 flex items-center justify-center overflow-hidden">
      {/* Premium gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-amber-25 to-orange-25">
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/20 to-white/40"></div>
      </div>

      {/* Dynamic geometric shapes */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{ x: backgroundX, y: backgroundY }}
      >
        {/* Large ambient circles */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-amber-200/30 to-orange-200/30 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-br from-yellow-200/25 to-amber-200/25 rounded-full blur-3xl animate-float-slow-delay"></div>
        
        {/* Geometric accents */}
        <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-amber-400 rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute bottom-1/3 left-1/5 w-1 h-1 bg-orange-400 rounded-full opacity-40 animate-pulse-delay"></div>
        <div className="absolute top-1/2 left-1/4 w-1.5 h-1.5 bg-yellow-400 rounded-full opacity-50 animate-pulse-slow"></div>
      </motion.div>

      {/* Subtle mandala background */}
      <motion.div
        className="absolute w-[1000px] h-[1000px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none"
        animate={{ rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
        style={{
          x: useTransform(mouseX, [-1, 1], [-5, 5]),
          y: useTransform(mouseY, [-1, 1], [-5, 5]),
        }}
      >
        <svg viewBox="0 0 400 400" className="w-full h-full">
          <defs>
            <radialGradient id="mandalaGrad" cx="50%" cy="50%">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#f97316" stopOpacity="0.2" />
            </radialGradient>
          </defs>
          <g transform="translate(200,200)">
            {/* Concentric circles */}
            {[120, 100, 80, 60, 40, 20].map((radius, i) => (
              <circle key={i} r={radius} fill="none" stroke="url(#mandalaGrad)" strokeWidth="0.5" opacity={0.6 - i * 0.1} />
            ))}
            
            {/* Sacred geometry patterns */}
            <g opacity="0.8">
              {Array.from({ length: 8 }, (_, i) => i * 45).map((rotation, i) => (
                <g key={i} transform={`rotate(${rotation})`}>
                  <path d="M0,-80 L10,-60 L0,-40 L-10,-60 Z" fill="url(#mandalaGrad)" opacity="0.6" />
                  <path d="M0,-60 L8,-45 L0,-30 L-8,-45 Z" fill="url(#mandalaGrad)" opacity="0.4" />
                </g>
              ))}
            </g>
          </g>
        </svg>
      </motion.div>

      {/* Floating elements with better positioning */}
      <div className="absolute inset-0 pointer-events-none">
        {[
          { emoji: '🌿', position: 'top-[15%] left-[8%]', delay: 0 },
          { emoji: '🍃', position: 'top-[25%] right-[12%]', delay: 1 },
          { emoji: '🌱', position: 'bottom-[25%] left-[10%]', delay: 2 },
          { emoji: '🌾', position: 'bottom-[35%] right-[15%]', delay: 3 },
          { emoji: '🍂', position: 'top-[45%] left-[5%]', delay: 4 },
          { emoji: '🌸', position: 'top-[60%] right-[8%]', delay: 5 },
        ].map((herb, index) => (
          <motion.div
            key={index}
            className={`absolute text-2xl md:text-3xl opacity-20 ${herb.position}`}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ 
              opacity: [0.2, 0.4, 0.2], 
              scale: [1, 1.1, 1],
              y: [0, -10, 0]
            }}
            transition={{
              duration: 6,
              delay: herb.delay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {herb.emoji}
          </motion.div>
        ))}
      </div>

      {/* Main content container */}
      <motion.div 
        className="relative z-20 text-center max-w-6xl px-8"
        style={{ y: heroY, opacity: heroOpacity }}
      >
        {/* Sanskrit blessing */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <div className="inline-block px-6 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-amber-200/50">
            <span className="text-yellow-700 font-medium text-sm tracking-wider">
              सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः
            </span>
          </div>
        </motion.div>

        {/* Main headline with dramatic typography */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1 }}
        >
          <h1 className="font-light text-5xl md:text-7xl lg:text-8xl leading-[0.9] mb-4 text-slate-800">
            एन्शियंट हेल्थ
          </h1>
          <div className="relative">
            <h2 className="font-normal text-3xl md:text-4xl lg:text-5xl text-yellow-700 tracking-wide">
              Ancient Health
            </h2>
            {/* Elegant underline */}
            <motion.div 
              className="absolute -bottom-2 left-1/2 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent"
              initial={{ width: 0, x: "-50%" }}
              animate={{ width: "60%" }}
              transition={{ delay: 1.4, duration: 1.2 }}
            />
          </div>
        </motion.div>

        {/* Premium tagline */}
        <motion.p
          className="text-xl md:text-2xl lg:text-3xl font-light text-slate-600 mb-8 max-w-4xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          Where <span className="text-yellow-700 font-normal">Himalayan Wisdom</span> meets <span className="text-yellow-700 font-normal">Modern Wellness</span>
        </motion.p>

        {/* Elegant description */}
        <motion.p
          className="text-lg md:text-xl text-slate-500 font-light mb-12 max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.8 }}
        >
          Discover the sacred healing traditions of Uttarakhand, where each herb is harvested with reverence 
          and every formula carries the wisdom of centuries.
        </motion.p>

        {/* Premium CTA Section */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.8 }}
        >
          <button
            onClick={handleCTAClick}
            className="group relative inline-flex items-center justify-center px-10 py-4 text-lg font-medium text-white bg-gradient-to-r from-amber-600 to-orange-600 rounded-full overflow-hidden transition-all duration-300 hover:from-amber-500 hover:to-orange-500 hover:scale-105 hover:shadow-2xl shadow-lg"
          >
            <span className="relative z-10 flex items-center space-x-2">
              <span>Begin Your Journey</span>
              <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
            
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full transition-transform duration-1000 group-hover:translate-x-full"></div>
          </button>
          
          <p className="text-sm text-slate-400 mt-3 font-light">
            Start your wellness transformation today
          </p>
        </motion.div>

        {/* Premium trust indicators */}
        <motion.div
          className="flex flex-wrap justify-center items-center gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
        >
          {[
            { icon: "🏆", text: "ISO Certified", color: "amber" },
            { icon: "🌿", text: "100% Natural", color: "green" },
            { icon: "🧪", text: "Lab Tested", color: "blue" },
            { icon: "🎯", text: "Proven Results", color: "orange" },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="flex items-center space-x-2 px-4 py-2 bg-white/40 backdrop-blur-sm rounded-full border border-slate-200/50"
              whileHover={{ scale: 1.05, y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-sm font-medium text-slate-600">{item.text}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Premium scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 0.8 }}
      >
        <motion.div
          className="flex flex-col items-center space-y-2 text-slate-400"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-xs font-light uppercase tracking-wider">Discover More</span>
          <div className="w-6 h-10 border border-slate-300 rounded-full flex justify-center">
            <motion.div 
              className="w-1 h-2 bg-amber-500 rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Ambient lighting effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-amber-50/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-1/4 bg-gradient-to-t from-orange-50/30 to-transparent"></div>
      </div>

      <style jsx>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(2deg); }
        }

        @keyframes float-slow-delay {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(-2deg); }
        }

        @keyframes pulse-delay {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.9; }
        }

        .animate-float-slow {
          animation: float-slow 12s ease-in-out infinite;
        }

        .animate-float-slow-delay {
          animation: float-slow-delay 15s ease-in-out infinite;
          animation-delay: 2s;
        }

        .animate-pulse-delay {
          animation: pulse-delay 3s ease-in-out infinite;
          animation-delay: 1s;
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
          animation-delay: 0.5s;
        }

        /* Custom background colors */
        .bg-amber-25 { background-color: rgb(254, 252, 246); }
        .bg-orange-25 { background-color: rgb(255, 253, 249); }
      `}</style>
    </section>
  );
};

const AyurvedaHero = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? <AyurvedaHeroContent /> : null;
};

export default AyurvedaHero;