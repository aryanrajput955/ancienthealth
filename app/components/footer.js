'use client';
export default function Footer() {
  return (
    <footer 
      className="bg-gray-900 text-white py-16 relative overflow-hidden bg-cover bg-center bg-no-repeat "
      style={{
        backgroundImage: 'url("/bg.png")'
      }}
    >
      {/* Full overlay for readability */}
      <div className="absolute inset-0 bg-gray-900/40"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <img 
                src="/logo.png" 
                alt="Devbhoomi Logo" 
                className="w-10 h-10 bg-white object-contain"
              />
              <span className="font-semibold text-2xl">Ancient Health</span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              From the Himalayas, with soul. Preserving ancient Ayurvedic wisdom 
              for the modern world.
            </p>
            {/* <div className="flex space-x-4">
              <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-yellow-700 cursor-pointer transition-colors">
                <span>📧</span>
              </div>
              <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-yellow-700 cursor-pointer transition-colors">
                <span>📱</span>
              </div>
              <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-yellow-700 cursor-pointer transition-colors">
                <span>🌐</span>
              </div>
            </div> */}
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Explore</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-yellow-400 transition-colors">Our Story</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition-colors">Sacred Sources</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition-colors">Pure Herbs</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition-colors">Wellness Rituals</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Collections</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-yellow-400 transition-colors">Energy ⚡</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition-colors">Calm 🕯️</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition-colors">Immunity 🛡️</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition-colors">Glow ✨</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Connect</h4>
            <ul className="space-y-2 text-gray-400">
              <li>📍 Devbhoomi Uttarakhand</li>
              <li>📞 +91 6397723250</li>
              <li>📞 +91 8433023265</li>
              <li>✉️ connect@ancienthealth.in</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">
              © 2025 Ancient Health . Ayurveda, as it was written.
            </p>
            <div className="flex space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-yellow-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-yellow-400 transition-colors">Terms</a>
              <a href="#" className="hover:text-yellow-400 transition-colors">Shipping</a>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        footer {
          position: relative;
        }
      `}</style>
    </footer>
  )
}