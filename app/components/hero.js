'use client';

import { useEffect, useState, useMemo, useCallback } from 'react';
import { motion, useMotionValue, useTransform, useScroll } from 'framer-motion';

// Optimized components without React.memo
const FloatingElements = () => {
  const elements = useMemo(() => [
    { emoji: '🌿', position: 'top-[15%] left-[8%]', delay: 0 },
    { emoji: '🍃', position: 'top-[25%] right-[12%]', delay: 1.5 },
    { emoji: '🌱', position: 'bottom-[25%] left-[10%]', delay: 3 },
    { emoji: '🌾', position: 'bottom-[35%] right-[15%]', delay: 4.5 },
    { emoji: '🍂', position: 'top-[45%] left-[5%]', delay: 6 },
    { emoji: '🌸', position: 'top-[60%] right-[8%]', delay: 7.5 },
  ], []);

  return (
    <div className="absolute inset-0 pointer-events-none">
      {elements.map((herb, index) => (
        <motion.div
          key={index}
          className={`absolute text-2xl md:text-3xl opacity-20 ${herb.position}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: [0.15, 0.3, 0.15], 
            scale: [0.9, 1.05, 0.9],
            y: [0, -8, 0]
          }}
          transition={{
            duration: 8,
            delay: herb.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {herb.emoji}
        </motion.div>
      ))}
    </div>
  );
};

const GeometricShapes = ({ backgroundX, backgroundY }) => (
  <motion.div 
    className="absolute inset-0 pointer-events-none"
    style={{ x: backgroundX, y: backgroundY }}
  >
    <div className="absolute top-20 left-10 w-80 h-80 bg-gradient-to-br from-amber-200/25 to-orange-200/25 rounded-full blur-3xl animate-float-slow"></div>
    <div className="absolute bottom-20 right-10 w-72 h-72 bg-gradient-to-br from-yellow-200/20 to-amber-200/20 rounded-full blur-3xl animate-float-slow-delay"></div>
    
    <div className="absolute top-1/4 right-1/4 w-2 h-2 bg- rounded-full opacity-50 animate-pulse"></div>
    <div className="absolute bottom-1/3 left-1/5 w-1 h-1 bg-orange-400 rounded-full opacity-30 animate-pulse-delay"></div>
    <div className="absolute top-1/2 left-1/4 w-1.5 h-1.5 bg-yellow-400 rounded-full opacity-40 animate-pulse-slow"></div>
  </motion.div>
);

const OptimizedMandala = ({ mouseX, mouseY }) => (
  <motion.div
    className="absolute w-[800px] h-[800px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.025] pointer-events-none"
    animate={{ rotate: 360 }}
    transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
    style={{
      x: useTransform(mouseX, [-1, 1], [-3, 3]),
      y: useTransform(mouseY, [-1, 1], [-3, 3]),
    }}
  >
    <svg viewBox="0 0 300 300" className="w-full h-full">
      <defs>
        <radialGradient id="mandalaGrad" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#f97316" stopOpacity="0.1" />
        </radialGradient>
      </defs>
      <g transform="translate(150,150)">
        {[90, 75, 60, 45, 30].map((radius, i) => (
          <circle key={i} r={radius} fill="none" stroke="url(#mandalaGrad)" strokeWidth="0.3" opacity={0.5 - i * 0.08} />
        ))}
        
        <g opacity="0.6">
          {Array.from({ length: 6 }, (_, i) => i * 60).map((rotation, i) => (
            <g key={i} transform={`rotate(${rotation})`}>
              <path d="M0,-60 L8,-45 L0,-30 L-8,-45 Z" fill="url(#mandalaGrad)" opacity="0.4" />
            </g>
          ))}
        </g>
      </g>
    </svg>
  </motion.div>
);

const TrustIndicators = () => {
  const indicators = useMemo(() => [
    { icon: "🏆", text: "ISO Certified" },
    { icon: "🌿", text: "100% Natural" },
    { icon: "🧪", text: "Lab Tested" },
    { icon: "🎯", text: "Proven Results" },
  ], []);

  return (
    <motion.div
      className="flex flex-wrap justify-center items-center gap-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2, duration: 0.8 }}
    >
      {indicators.map((item, index) => (
        <motion.div
          key={index}
          className="flex items-center space-x-2 px-4 py-2 bg-white/30 backdrop-blur-sm rounded-full border border-slate-200/40"
          whileHover={{ scale: 1.03, y: -1 }}
          transition={{ duration: 0.15 }}
        >
          <span className="text-base">{item.icon}</span>
          <span className="text-sm font-medium text-slate-600">{item.text}</span>
        </motion.div>
      ))}
    </motion.div>
  );
};

// Main component with performance optimizations
const AyurvedaHeroContent = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Reduced transform ranges for better performance
  const backgroundY = useTransform(mouseY, [-1, 1], [-15, 15]);
  const backgroundX = useTransform(mouseX, [-1, 1], [-10, 10]);

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 400], [0, -80]);
  const heroOpacity = useTransform(scrollY, [0, 250], [1, 0.9]);

  // Throttled mouse move handler
  const handleMouseMove = useCallback((e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    
    mouseX.set((clientX / innerWidth - 0.5) * 1.5);
    mouseY.set((clientY / innerHeight - 0.5) * 1.5);
  }, [mouseX, mouseY]);

  useEffect(() => {
    setIsLoaded(true);
    
    let timeoutId;
    const throttledMouseMove = (e) => {
      if (timeoutId) return;
      timeoutId = setTimeout(() => {
        handleMouseMove(e);
        timeoutId = null;
      }, 16); // ~60fps
    };

    window.addEventListener('mousemove', throttledMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', throttledMouseMove);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [handleMouseMove]);

  const handleCTAClick = useCallback(() => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  }, []);

  return (
    <section className="relative min-h-screen pt-20 flex items-center justify-center overflow-hidden">
      {/* Simplified gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-amber-25 to-orange-25">
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/15 to-white/30"></div>
      </div>

      <GeometricShapes backgroundX={backgroundX} backgroundY={backgroundY} />
      <OptimizedMandala mouseX={mouseX} mouseY={mouseY} />
      <FloatingElements />

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
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="inline-block px-6 py-2 bg-white/50 backdrop-blur-sm rounded-full border border-amber-200/40">
            <span className="text-yellow-700 font-medium text-sm tracking-wider">
              सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः
            </span>
          </div>
        </motion.div>

        {/* Enhanced Hindi headline with beautiful typography */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          {/* Attractive Hindi text with premium styling */}
          <div className="relative mb-4">
            <h1 className="font-bold font-heading text-6xl md:text-8xl lg:text-9xl leading-[1.2] text-transparent bg-clip-text bg-gradient-to-br from-amber-600 via-orange-600 to-yellow-700 drop-shadow-sm">
           एंशन्ट हेल्थ
            </h1>
            
            {/* Decorative elements around Hindi text */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-20 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-60"></div>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-32 h-0.5 bg-gradient-to-r from-transparent via-orange-400 to-transparent opacity-60"></div>
            
            {/* Subtle glow effect */}
            <div className="absolute inset-0 text-6xl md:text-8xl lg:text-9xl leading-[1.2] text-amber-500/20 blur-sm font-bold">
             एंशन्ट हेल्थ
            </div>
          </div>
          
          {/* English subtitle with elegant styling */}
          <div className="relative">
            <h2 className="font-light text-3xl md:text-4xl lg:text-5xl text-slate-700 tracking-wide">
              Ancient Health
            </h2>
            
            {/* Elegant animated underline */}
            <motion.div 
              className="absolute -bottom-3 left-1/2 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent"
              initial={{ width: 0, x: "-50%" }}
              animate={{ width: "70%" }}
              transition={{ delay: 1.2, duration: 1 }}
            />
          </div>
        </motion.div>

        {/* Premium tagline */}
        <motion.p
          className="text-xl md:text-2xl lg:text-3xl font-light text-slate-600 mb-8 max-w-4xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          Where <span className="text-yellow-700 font-medium">Himalayan Wisdom</span> meets <span className="text-yellow-700 font-medium">Modern Wellness</span>
        </motion.p>

        {/* Elegant description */}
        <motion.p
          className="text-lg md:text-xl text-slate-500 font-light mb-10 max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          Discover the sacred healing traditions of Uttarakhand, where each herb is harvested with reverence 
          and every formula carries the wisdom of centuries.
        </motion.p>

        {/* Optimized CTA Section */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.6 }}
        >
          <button
            onClick={handleCTAClick}
            className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-amber-600 to-orange-600 rounded-full overflow-hidden transition-all duration-200 hover:from-amber-500 hover:to-orange-500 hover:scale-105 hover:shadow-xl shadow-lg"
          >
            <span className="relative z-10 flex items-center space-x-2">
              <span>Begin Your Journey</span>
              <svg className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
            
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full transition-transform duration-700 group-hover:translate-x-full"></div>
          </button>
          
          <p className="text-sm text-slate-400 mt-3 font-light">
            Start your wellness transformation today
          </p>
        </motion.div>

        <TrustIndicators />
      </motion.div>

      {/* Optimized scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
      >
        <motion.div
          className="flex flex-col items-center space-y-2 text-slate-400"
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-xs font-light uppercase tracking-wider">Discover More</span>
          <div className="w-6 h-10 border border-slate-300 rounded-full flex justify-center">
            <motion.div 
              className="w-1 h-2 bg-amber-500 rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </motion.div>

      <style jsx>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(1deg); }
        }

        @keyframes float-slow-delay {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-1deg); }
        }

        @keyframes pulse-delay {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.7; }
        }

        .animate-float-slow {
          animation: float-slow 10s ease-in-out infinite;
        }

        .animate-float-slow-delay {
          animation: float-slow-delay 12s ease-in-out infinite;
          animation-delay: 1.5s;
        }

        .animate-pulse-delay {
          animation: pulse-delay 4s ease-in-out infinite;
          animation-delay: 0.8s;
        }

        .animate-pulse-slow {
          animation: pulse-slow 5s ease-in-out infinite;
          animation-delay: 0.3s;
        }

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