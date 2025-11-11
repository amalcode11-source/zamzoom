import type { Metadata } from 'next'
import './globals.css'
import Header from '../components/Header'
import Footer from '../components/Footer'

export const metadata: Metadata = {
  title: 'ZamZoom - Pure Honey & Premium Nuts | Natural Healthy Products',
  description: 'Discover pure honey and premium nuts at ZamZoom. Natural, healthy, and delicious products delivered to your door. Organic honey, almonds, cashews, walnuts & more.',
  keywords: 'honey, nuts, organic, healthy snacks, natural products, almonds, cashews, walnuts, pistachios, manuka honey, wild honey',
  authors: [{ name: 'ZamZoom' }],
  creator: 'ZamZoom',
  publisher: 'ZamZoom',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://zamzoom.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'ZamZoom - Pure Honey & Premium Nuts',
    description: 'Natural honey and nuts for a healthy lifestyle. Organic, sustainable, and delicious.',
    url: 'https://zamzoom.com',
    siteName: 'ZamZoom',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=1200&h=630&fit=crop',
        width: 1200,
        height: 630,
        alt: 'ZamZoom - Pure Honey & Premium Nuts',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ZamZoom - Pure Honey & Premium Nuts',
    description: 'Natural honey and nuts for a healthy lifestyle.',
    images: ['https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=1200&h=630&fit=crop'],
    creator: '@zamzoom',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-orange text-white px-4 py-2 rounded z-50"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main-content">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}