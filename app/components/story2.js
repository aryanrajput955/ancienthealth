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

    // Falling leaves animation
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

      // Leaf properties
      const leaves = [];
      const numLeaves = 20;
      const leafEmoji = '🍃';

      // Initialize leaves
      for (let i = 0; i < numLeaves; i++) {
        leaves.push({
          x: Math.random() * canvas.width,
          y: Math.random() * -canvas.height, // Start above the canvas
          speed: 0.5 + Math.random() * 1.5, // Random speed between 0.5 and 2
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 0.05, // Slight rotation
          size: 16 + Math.random() * 8 // Size between 16 and 24
        });
      }

      // Animation loop
      let animationFrameId;
      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = '20px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        leaves.forEach((leaf) => {
          leaf.y += leaf.speed;
          leaf.rotation += leaf.rotationSpeed;

          // Reset leaf to top when it falls off the bottom
          if (leaf.y > canvas.height + leaf.size) {
            leaf.y = -leaf.size;
            leaf.x = Math.random() * canvas.width;
          }

          // Save context, apply transformations, draw leaf, restore context
          ctx.save();
          ctx.translate(leaf.x, leaf.y);
          ctx.rotate((leaf.rotation * Math.PI) / 180);
          ctx.fillText(leafEmoji, 0, 0);
          ctx.restore();
        });

        animationFrameId = requestAnimationFrame(animate);
      };

      animate();

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
      {/* Canvas for falling leaves */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-0"
      ></canvas>

      {/* Gentle Floating Elements */}
      <div className="absolute inset-0 pointer-events-none z-5">
        <div 
          className="absolute top-1/4 right-1/4 w-1 h-1 bg-amber-300 rounded-full opacity-40"
          style={{ 
            transform: `translateY(${Math.sin(scrollProgress * Math.PI) * 20}px)`,
            transition: 'transform 0.1s ease-out'
          }}
        ></div>
        <div 
          className="absolute bottom-1/3 left-1/5 w-1.5 h-1.5 bg-yellow-300 rounded-full opacity-30"
          style={{ 
            transform: `translateY(${Math.cos(scrollProgress * Math.PI) * 15}px)`,
            transition: 'transform 0.1s ease-out'
          }}
        ></div>
        <div 
          className="absolute top-1/2 left-3/4 w-1 h-1 bg-orange-300 rounded-full opacity-35"
          style={{ 
            transform: `translateX(${Math.sin(scrollProgress * Math.PI * 1.5) * 25}px)`,
            transition: 'transform 0.1s ease-out'
          }}
        ></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        {/* Minimalist Header */}
        <div className="text-center mb-20">
          <div 
            ref={(el) => addToRefs(el, 0)}
            className="inline-block mb-8 opacity-0 translate-y-4 transition-all duration-1000"
          >
            <div className="w-12 h-px bg-amber-400 mx-auto mb-4"></div>
            <span className="text-amber-600 font-light text-sm uppercase tracking-wide">Ancient Wisdom</span>
          </div>
          
          <h2
            ref={(el) => addToRefs(el, 200)}
            className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-700 mb-6 leading-relaxed opacity-0 translate-y-4 transition-all duration-1000"
          >
            Rooted in{' '}
            <span className="font-normal text-yellow-700">5000 Years</span>
            <br />
            of Heritage
          </h2>
          
          <p
            ref={(el) => addToRefs(el, 400)}
            className="text-lg md:text-xl text-gray-500 font-light max-w-2xl mx-auto leading-relaxed opacity-0 translate-y-4 transition-all duration-1000"
          >
            Where ancient wisdom meets modern wellness in perfect harmony
          </p>
        </div>

        {/* Clean Principles Grid */}
        <div className="grid md:grid-cols-3 gap-12 mb-24">
          {principles.map((principle, index) => (
            <div
              key={index}
              ref={(el) => addToRefs(el, 600 + index * 200)}
              className="text-center opacity-0 translate-y-6 transition-all duration-1000 group"
            >
              <div className="mb-6">
                <span className="text-4xl md:text-5xl font-light text-yellow-700 block">
                  {principle.number}
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

        {/* Serene Quote Section */}
        <div
          ref={(el) => addToRefs(el, 1200)}
          className="text-center mb-24 opacity-0 translate-y-6 transition-all duration-1000"
        >
          <div className="max-w-3xl mx-auto bg-yellow-100/40 backdrop-blur-sm rounded-3xl p-12 md:p-16 border border-amber-100/50">
            <div className="text-amber-400 text-4xl mb-8 opacity-60">✦</div>
            <blockquote className="text-2xl md:text-3xl font-light text-gray-600 italic leading-relaxed mb-8">
              "In the harmony of mind, body, and spirit lies the secret to true wellness"
            </blockquote>
            <div className="text-amber-500 font-light text-sm uppercase tracking-wide">
              Ancient Ayurvedic Wisdom
            </div>
          </div>
        </div>

        {/* Gentle Heritage Flow */}
        <div
          ref={(el) => addToRefs(el, 1400)}
          className="opacity-0 translate-y-6 transition-all duration-1000"
        >
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-4 group">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform duration-700">
                <span className="text-2xl">🌱</span>
              </div>
              <h4 className="font-light text-gray-700">Sacred Origins</h4>
              <p className="text-sm text-gray-500 font-light leading-relaxed">
                Ancient texts preserved through millennia
              </p>
            </div>
            
            <div className="space-y-4 group">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-100 to-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform duration-700">
                <span className="text-2xl">⚖️</span>
              </div>
              <h4 className="font-light text-gray-700">Modern Validation</h4>
              <p className="text-sm text-gray-500 font-light leading-relaxed">
                Science confirms ancient wisdom
              </p>
            </div>
            
            <div className="space-y-4 group">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform duration-700">
                <span className="text-2xl">🌿</span>
              </div>
              <h4 className="font-light text-gray-700">Timeless Healing</h4>
              <p className="text-sm text-gray-500 font-light leading-relaxed">
                Natural wellness for every generation
              </p>
            </div>
          </div>
        </div>

        {/* Subtle Closing */}
        <div className="text-center mt-20">
          <div
            ref={(el) => addToRefs(el, 1600)}
            className="inline-block opacity-0 translate-y-4 transition-all duration-1000"
          >
            <div className="w-8 h-px bg-amber-300 mx-auto mb-3"></div>
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