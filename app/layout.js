// app/layout.js
import Footer from './components/footer'
import Navigation from './components/navbar'
import './globals.css'
import { Inter, Crimson_Text } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], weight: ['300','400','500','600'] })
const crimson = Crimson_Text({ subsets: ['latin'], weight: ['400','600'] })

export const metadata = {
  title: 'Ancient Health | 100% Organic Ayurvedic Products for Natural Wellness',
  description:
    'Discover the power of Ayurveda with Ancient Health. We bring you authentic, 100% organic Ayurvedic products inspired by ancient wisdom—crafted to restore balance, boost immunity, and promote natural healing. Experience wellness the traditional way.',
  icons: {
    icon: '/logo2.png',
    shortcut: '/logo2.png',
    apple: '/logo2.png',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${crimson.className}`}>
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  )
}
