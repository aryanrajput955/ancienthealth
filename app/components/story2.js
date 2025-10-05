'use client';
import { useEffect, useRef, useState } from 'react';

const AyurvedaHeritageSection = () => {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);
  const canvasRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // Scroll handling for existing fade-in animations
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = rect.height;
      const viewportHeight = window.innerHeight;
      const progress = Math.max(0, Math.min(1, (viewportHeight - rect.top) / (sectionHeight + viewportHeight)));
      setScrollProgress(progress);
    };

    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('fade-in');
          }, parseInt(entry.target.dataset.delay) || 0);
        }
      });
    }, observerOptions);

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    // Ancient mystical symbols animation
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (canvas && ctx) {
      // Set canvas size
      const resizeCanvas = () => {
        canvas.width = sectionRef.current.offsetWidth;
        canvas.height = sectionRef.current.offsetHeight;
      };
      resizeCanvas();
      window.addEventListener('resize', resizeCanvas);

      // Ancient symbol properties
      const symbols = [];
      const numSymbols = 12;
      
      // Sanskrit and ancient symbols
      const ancientSymbols = ['ॐ', '🕉', '☸', '✧', '◊', '⬟', '⬢', '△', '▽', '◯', '✦', '✶'];
      const colors = [
        'rgba(245, 158, 11, 0.3)', // amber
        'rgba(249, 115, 22, 0.25)', // orange  
        'rgba(234, 179, 8, 0.35)',  // yellow
        'rgba(180, 83, 9, 0.2)',    // amber-800
        'rgba(146, 64, 14, 0.25)'   // orange-900
      ];

      // Initialize symbols
      for (let i = 0; i < numSymbols; i++) {
        symbols.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          symbol: ancientSymbols[Math.floor(Math.random() * ancientSymbols.length)],
          color: colors[Math.floor(Math.random() * colors.length)],
          speed: 0.2 + Math.random() * 0.5,
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 0.3,
          size: 20 + Math.random() * 25,
          opacity: 0.2 + Math.random() * 0.3,
          phase: Math.random() * Math.PI * 2,
          amplitude: 20 + Math.random() * 30,
          frequency: 0.005 + Math.random() * 0.01,
          pulsePhase: Math.random() * Math.PI * 2,
          pulseSpeed: 0.02 + Math.random() * 0.02
        });
      }

      let time = 0;
      let animationFrameId;
      
      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        time += 0.016; // ~60fps
        
        symbols.forEach((symbol, index) => {
          // Slow vertical drift with horizontal wave motion
          symbol.y += symbol.speed * 0.3; // Very slow downward movement
          symbol.x += Math.sin(time * symbol.frequency + symbol.phase) * 0.5; // Gentle horizontal sway
          
          // Gentle rotation
          symbol.rotation += symbol.rotationSpeed;
          
          // Pulsing opacity effect
          const pulsingOpacity = symbol.opacity + Math.sin(time * symbol.pulseSpeed + symbol.pulsePhase) * 0.1;
          
          // Reset symbol position when it drifts off screen
          if (symbol.y > canvas.height + symbol.size) {
            symbol.y = -symbol.size;
            symbol.x = Math.random() * canvas.width;
          }
          if (symbol.x < -symbol.size) symbol.x = canvas.width + symbol.size;
          if (symbol.x > canvas.width + symbol.size) symbol.x = -symbol.size;

          // Draw the symbol with ancient styling
          ctx.save();
          ctx.globalAlpha = Math.max(0.1, Math.min(0.6, pulsingOpacity));
          ctx.translate(symbol.x, symbol.y);
          ctx.rotate((symbol.rotation * Math.PI) / 180);
          
          // Set font and color based on symbol type
          if (symbol.symbol === 'ॐ') {
            ctx.font = `${symbol.size}px serif`;
            ctx.fillStyle = colors[0]; // Special color for Om
          } else if (['☸', '🕉'].includes(symbol.symbol)) {
            ctx.font = `${symbol.size}px Arial`;
            ctx.fillStyle = colors[1];
          } else {
            ctx.font = `${symbol.size * 0.8}px Arial`;
            ctx.fillStyle = symbol.color;
          }
          
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          
          // Add subtle shadow for depth
          ctx.shadowColor = 'rgba(245, 158, 11, 0.2)';
          ctx.shadowBlur = 3;
          ctx.shadowOffsetX = 1;
          ctx.shadowOffsetY = 1;
          
          ctx.fillText(symbol.symbol, 0, 0);
          ctx.restore();
        });

        animationFrameId = requestAnimationFrame(animate);
      };

      // Add mystical aura effects
      const drawAura = () => {
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = Math.min(canvas.width, canvas.height) * 0.4;
        
        // Create radial gradient for mystical aura
        const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
        gradient.addColorStop(0, 'rgba(245, 158, 11, 0.02)');
        gradient.addColorStop(0.5, 'rgba(249, 115, 22, 0.01)');
        gradient.addColorStop(1, 'rgba(245, 158, 11, 0)');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      };

      // Enhanced animation with aura
      const animateWithAura = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw mystical aura first (behind symbols)
        if (time % 3 < 0.1) { // Subtle aura pulse every 3 seconds
          drawAura();
        }
        
        // Then animate symbols
        animate();
      };

      animateWithAura();

      // Cleanup
      return () => {
        observer.disconnect();
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', resizeCanvas);
        cancelAnimationFrame(animationFrameId);
      };
    }

    // Cleanup for cases where canvas or context is not available
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const addToRefs = (el, delay = 0) => {
    if (el && !cardRefs.current.includes(el)) {
      el.dataset.delay = delay;
      cardRefs.current.push(el);
    }
  };

  const principles = [
    {
      number: "5000",
      unit: "Years",
      title: "Ancient Wisdom",
      description: "Timeless knowledge passed through generations"
    },
    {
      number: "3",
      unit: "Doshas",
      title: "Natural Balance",
      description: "Harmony of mind, body, and spirit"
    },
    {
      number: "∞",
      unit: "Healing",
      title: "Pure Nature",
      description: "Endless potential through natural wellness"
    }
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-gradient-to-br from-amber-25 via-orange-25 via-yellow-25 to-amber-50 overflow-hidden"
    >
      {/* Canvas for ancient mystical symbols */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-0"
      ></canvas>

      {/* Enhanced Floating Elements with Ancient Feel */}
      <div className="absolute inset-0 pointer-events-none z-5">
        {/* Sacred geometry dots */}
        <div 
          className="absolute top-1/4 right-1/4 w-1 h-1 bg-amber-400 rounded-full opacity-40"
          style={{ 
            transform: `translateY(${Math.sin(scrollProgress * Math.PI) * 20}px)`,
            transition: 'transform 0.1s ease-out'
          }}
        ></div>
        <div 
          className="absolute bottom-1/3 left-1/5 w-1.5 h-1.5 bg-yellow-400 rounded-full opacity-30"
          style={{ 
            transform: `translateY(${Math.cos(scrollProgress * Math.PI) * 15}px)`,
            transition: 'transform 0.1s ease-out'
          }}
        ></div>
        <div 
          className="absolute top-1/2 left-3/4 w-1 h-1 bg-orange-400 rounded-full opacity-35"
          style={{ 
            transform: `translateX(${Math.sin(scrollProgress * Math.PI * 1.5) * 25}px)`,
            transition: 'transform 0.1s ease-out'
          }}
        ></div>
        
        {/* Ancient pattern overlay */}
        <div className="absolute top-10 right-10 opacity-5 text-6xl text-amber-600 animate-pulse-slow">
          ॐ
        </div>
        <div className="absolute bottom-20 left-10 opacity-5 text-4xl text-orange-600 animate-pulse-slower">
          ☸
        </div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        {/* Enhanced Header with Ancient Touch */}
        <div className="text-center mb-20">
          <div 
            ref={(el) => addToRefs(el, 0)}
            className="inline-block mb-8 opacity-0 translate-y-4 transition-all duration-1000"
          >
            <div className="flex items-center justify-center space-x-4 mb-4">
              <div className="w-8 h-px bg-amber-400"></div>
              <span className="text-amber-600 text-lg">✦</span>
              <div className="w-8 h-px bg-amber-400"></div>
            </div>
            <span className="text-amber-600 font-light text-sm uppercase tracking-wide">Ancient Wisdom</span>
          </div>
          
          <h2
            ref={(el) => addToRefs(el, 200)}
            className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-700 mb-6 leading-relaxed opacity-0 translate-y-4 transition-all duration-1000"
          >
            Rooted in{' '}
            <span className="font-normal text-yellow-700 relative">
              5000 Years
              <div className="absolute -bottom-2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-50"></div>
            </span>
            <br />
            of Sacred Heritage
          </h2>
          
          <p
            ref={(el) => addToRefs(el, 400)}
            className="text-lg md:text-xl text-gray-500 font-light max-w-2xl mx-auto leading-relaxed opacity-0 translate-y-4 transition-all duration-1000"
          >
            Where ancient wisdom meets modern wellness in perfect harmony
          </p>
        </div>

        {/* Enhanced Principles Grid */}
        <div className="grid md:grid-cols-3 gap-12 mb-24">
          {principles.map((principle, index) => (
            <div
              key={index}
              ref={(el) => addToRefs(el, 600 + index * 200)}
              className="text-center opacity-0 translate-y-6 transition-all duration-1000 group"
            >
              <div className="mb-6 relative">
                <span className="text-4xl md:text-5xl font-light text-yellow-700 block relative">
                  {principle.number}
                  {/* Subtle glow effect */}
                  <span className="absolute inset-0 text-yellow-400 opacity-20 blur-sm">
                    {principle.number}
                  </span>
                </span>
                <span className="text-sm text-yellow-600 font-light uppercase tracking-wide">
                  {principle.unit}
                </span>
              </div>
              <h3 className="text-xl font-light text-gray-700 mb-4 group-hover:text-amber-600 transition-colors duration-500">
                {principle.title}
              </h3>
              <p className="text-gray-500 font-light leading-relaxed">
                {principle.description}
              </p>
            </div>
          ))}
        </div>

        {/* Enhanced Quote Section with Ancient Styling */}
        <div
          ref={(el) => addToRefs(el, 1200)}
          className="text-center mb-24 opacity-0 translate-y-6 transition-all duration-1000"
        >
          <div className="max-w-3xl mx-auto bg-yellow-100/40 backdrop-blur-sm rounded-3xl p-12 md:p-16 border border-amber-100/50 relative overflow-hidden">
            {/* Ancient pattern overlay */}
            <div className="absolute top-4 right-4 text-amber-300/20 text-2xl">ॐ</div>
            <div className="absolute bottom-4 left-4 text-orange-300/20 text-xl">☸</div>
            
            <div className="text-amber-400 text-4xl mb-8 opacity-60">✧</div>
            <blockquote className="text-2xl md:text-3xl font-light text-gray-600 italic leading-relaxed mb-8">
              "In the harmony of mind, body, and spirit lies the secret to true wellness"
            </blockquote>
            <div className="text-amber-500 font-light text-sm uppercase tracking-wide">
              Ancient Ayurvedic Wisdom
            </div>
          </div>
        </div>

        {/* Enhanced Heritage Flow */}
        <div
          ref={(el) => addToRefs(el, 1400)}
          className="opacity-0 translate-y-6 transition-all duration-1000"
        >
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-4 group">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-all duration-700 relative overflow-hidden">
                <span className="text-2xl relative z-10">🌱</span>
                <div className="absolute inset-0 bg-gradient-to-br from-amber-200/50 to-orange-200/50 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              </div>
              <h4 className="font-light text-gray-700">Sacred Origins</h4>
              <p className="text-sm text-gray-500 font-light leading-relaxed">
                Ancient texts preserved through millennia
              </p>
            </div>
            
            <div className="space-y-4 group">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-100 to-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-all duration-700 relative overflow-hidden">
                <span className="text-2xl relative z-10">⚖️</span>
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-200/50 to-amber-200/50 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              </div>
              <h4 className="font-light text-gray-700">Modern Validation</h4>
              <p className="text-sm text-gray-500 font-light leading-relaxed">
                Science confirms ancient wisdom
              </p>
            </div>
            
            <div className="space-y-4 group">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-all duration-700 relative overflow-hidden">
                <span className="text-2xl relative z-10">🌿</span>
                <div className="absolute inset-0 bg-gradient-to-br from-orange-200/50 to-yellow-200/50 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              </div>
              <h4 className="font-light text-gray-700">Timeless Healing</h4>
              <p className="text-sm text-gray-500 font-light leading-relaxed">
                Natural wellness for every generation
              </p>
            </div>
          </div>
        </div>

        {/* Enhanced Closing */}
        <div className="text-center mt-20">
          <div
            ref={(el) => addToRefs(el, 1600)}
            className="inline-block opacity-0 translate-y-4 transition-all duration-1000"
          >
            <div className="flex items-center justify-center space-x-3 mb-3">
              <div className="w-6 h-px bg-amber-300"></div>
              <span className="text-amber-400 text-sm">✧</span>
              <div className="w-6 h-px bg-amber-300"></div>
            </div>
            <span className="text-amber-500 font-light text-xs uppercase tracking-widest">
              Heritage Continues
            </span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .fade-in {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
        
        /* Custom ultra-light background colors */
        .bg-amber-25 { background-color: rgb(254, 252, 246); }
        .bg-orange-25 { background-color: rgb(255, 253, 249); }
        .bg-yellow-25 { background-color: rgb(254, 253, 246); }
        
        /* Ancient animation effects */
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.05; transform: scale(1); }
          50% { opacity: 0.15; transform: scale(1.05); }
        }
        
        @keyframes pulse-slower {
          0%, 100% { opacity: 0.03; transform: rotate(0deg); }
          50% { opacity: 0.1; transform: rotate(5deg); }
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }
        
        .animate-pulse-slower {
          animation: pulse-slower 12s ease-in-out infinite;
        }
        
        /* Smooth hover transitions */
        .group:hover .group-hover\\:scale-105 {
          transform: scale(1.05);
        }

        /* Ensure canvas is behind content but above background */
        canvas {
          z-index: 0;
        }
      `}</style>
    </section>
  );
};

export default AyurvedaHeritageSection;