'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useCart } from '../hooks/useCart'

export default function Header() {
  const { getItemCount } = useCart()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <header className="glass sticky top-0 z-50 border-b border-white/20 shadow-modern">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-slate-900 gradient-text" aria-label="ZamZoom Home">
            ZamZoom
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-slate-900 hover:text-vibrant-blue transition-colors font-medium" aria-label="Home">
              Home
            </Link>
            <Link href="/search" className="text-slate-900 hover:text-vibrant-blue transition-colors font-medium" aria-label="Shop All Products">
              Shop All
            </Link>
            <Link href="/categories/honey" className="text-slate-900 hover:text-vibrant-blue transition-colors font-medium" aria-label="Honey Products">
              Honey
            </Link>
            <Link href="/categories/nuts" className="text-slate-900 hover:text-vibrant-blue transition-colors font-medium" aria-label="Nut Products">
              Nuts
            </Link>
          </nav>

          {/* Search and Cart */}
          <div className="flex items-center space-x-4">
            {/* Search Button */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-slate-900 hover:text-vibrant-blue transition-colors"
              aria-label="Toggle search"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Cart */}
            <Link href="/cart" className="relative p-2" aria-label={`Cart with ${getItemCount()} items`}>
              <svg className="w-6 h-6 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.1 5H19M7 13l-1.1 5M7 13h10m0 0v8a2 2 0 01-2 2H9a2 2 0 01-2-2v-8" />
              </svg>
              {getItemCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-vibrant-blue to-vibrant-purple text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                  {getItemCount()}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-slate-900 hover:text-vibrant-blue transition-colors"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="mt-4 md:mt-2">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                const formData = new FormData(e.target as HTMLFormElement)
                const query = formData.get('search') as string
                if (query.trim() && typeof window !== 'undefined') {
                  window.location.href = `/search?q=${encodeURIComponent(query.trim())}`
                }
              }}
              className="relative"
            >
              <input
                name="search"
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange focus:border-transparent"
                aria-label="Search products"
                autoFocus
              />
              <button
                type="submit"
                className="absolute right-2 top-2 text-gray-500 hover:text-orange p-1"
                aria-label="Submit search"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </form>
          </div>
        )}

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-white/20 animate-fade-in-up">
            <nav className="flex flex-col space-y-4 pt-4">
              <Link
                href="/"
                className="text-slate-900 hover:text-vibrant-blue transition-colors py-2 font-medium"
                onClick={() => setIsMenuOpen(false)}
                aria-label="Home"
              >
                Home
              </Link>
              <Link
                href="/search"
                className="text-slate-900 hover:text-vibrant-blue transition-colors py-2 font-medium"
                onClick={() => setIsMenuOpen(false)}
                aria-label="Shop All Products"
              >
                Shop All
              </Link>
              <Link
                href="/categories/honey"
                className="text-slate-900 hover:text-vibrant-blue transition-colors py-2 font-medium"
                onClick={() => setIsMenuOpen(false)}
                aria-label="Honey Products"
              >
                Honey
              </Link>
              <Link
                href="/categories/nuts"
                className="text-slate-900 hover:text-vibrant-blue transition-colors py-2 font-medium"
                onClick={() => setIsMenuOpen(false)}
                aria-label="Nut Products"
              >
                Nuts
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}