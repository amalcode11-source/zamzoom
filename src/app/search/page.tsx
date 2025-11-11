'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../lib/firebase'
import ProductCard from '../../components/ProductCard'
import Breadcrumb from '../../components/Breadcrumb'
import { Product } from '../../types'

function SearchContent() {
  const searchParams = useSearchParams()
  const q = searchParams.get('q') || ''
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState(q)
  const [sortBy, setSortBy] = useState<'name' | 'price-low' | 'price-high'>('name')

  useEffect(() => {
    const fetchProducts = async () => {
      if (!q.trim()) {
        setProducts([])
        setLoading(false)
        return
      }

      try {
        // For simplicity, fetch all products and filter client-side
        // In production, you'd want server-side search or Firebase search
        const querySnapshot = await getDocs(collection(db, 'products'))
        const allProducts = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          created_at: doc.data().created_at?.toDate?.() || doc.data().created_at,
          updated_at: doc.data().updated_at?.toDate?.() || doc.data().updated_at,
        })) as Product[]

        const filteredProducts = allProducts.filter(product =>
          product.name.toLowerCase().includes(q.toLowerCase()) ||
          product.description.toLowerCase().includes(q.toLowerCase())
        )

        setProducts(filteredProducts)
      } catch (error) {
        console.error('Error searching products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [q])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchTerm.trim())}`
    }
  }

  return (
    <div className="min-h-screen bg-cream py-12 md:py-16 px-4">
      <div className="container mx-auto">
        <Breadcrumb items={[{ label: 'Search' }]} />

        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-black mb-6">Search Products</h1>

          <form onSubmit={handleSearch} className="max-w-md">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for honey, nuts..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange focus:border-transparent text-base"
                aria-label="Search products"
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
            </div>
          </form>
        </div>

        {q && (
          <div className="mb-6">
            <p className="text-gray-600">
              {loading ? 'Searching...' : `Found ${products.length} result${products.length !== 1 ? 's' : ''} for "${q}"`}
            </p>
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-lg animate-pulse h-64 md:h-80"></div>
            ))}
          </div>
        ) : products.length > 0 ? (
          <>
            {/* Sorting Controls */}
            <div className="flex justify-center mb-8">
              <div className="flex items-center space-x-4">
                <label htmlFor="sort" className="text-sm font-medium text-gray-700">Sort by:</label>
                <select
                  id="sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange focus:border-transparent text-sm"
                >
                  <option value="name">Name</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {[...products].sort((a, b) => {
                switch (sortBy) {
                  case 'price-low':
                    return a.variants[0].price - b.variants[0].price
                  case 'price-high':
                    return b.variants[0].price - a.variants[0].price
                  default:
                    return a.name.localeCompare(b.name)
                }
              }).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        ) : q ? (
          <div className="text-center py-12">
            <div className="mb-4">
              <svg className="w-16 h-16 md:w-20 md:h-20 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600 text-sm md:text-base">Try adjusting your search terms or browse our categories.</p>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-50 py-12 md:py-16 px-4">
        <div className="container mx-auto">
          <div className="mb-8">
            <div className="h-8 bg-slate-200 rounded animate-pulse mb-6"></div>
            <div className="max-w-md h-12 bg-slate-200 rounded animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-slate-200 rounded-lg animate-pulse h-64 md:h-80"></div>
            ))}
          </div>
        </div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  )
}