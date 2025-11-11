'use client'

import { useEffect, useState } from 'react'
import { collection, getDocs, query, limit } from 'firebase/firestore'
import { db } from '../lib/firebase'
import ProductCard from './ProductCard'
import { Product } from '../types'

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<'name' | 'price-low' | 'price-high'>('name')

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log('Fetching featured products...')
        const q = query(collection(db, 'products'), limit(12))
        const querySnapshot = await getDocs(q)
        console.log('Query snapshot:', querySnapshot)
        console.log('Query snapshot empty?', querySnapshot.empty)
        console.log('Number of documents:', querySnapshot.docs.length)
        const productsData = querySnapshot.docs.map(doc => {
          const data = doc.data()
          console.log('Raw document data for', doc.id, ':', data)
          console.log('Document data types for', doc.id, ':', {
            created_at: data.created_at?.constructor?.name,
            updated_at: data.updated_at?.constructor?.name,
            variants: Array.isArray(data.variants) ? 'array' : typeof data.variants
          })
          return {
            id: doc.id,
            ...data,
            created_at: data.created_at?.toDate?.() || data.created_at,
            updated_at: data.updated_at?.toDate?.() || data.updated_at,
          }
        }) as Product[]
        console.log('Processed products data:', productsData)
        setProducts(productsData)
        setError(null)
      } catch (error) {
        console.error('Error fetching products:', error)
        setError('Failed to load products. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.variants[0].price - b.variants[0].price
      case 'price-high':
        return b.variants[0].price - a.variants[0].price
      default:
        return a.name.localeCompare(b.name)
    }
  })

  if (loading) {
    return (
      <section className="py-12 md:py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-black text-center mb-8 md:mb-12">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-lg animate-pulse h-64 md:h-80"></div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12 md:py-16 px-4">
      <div className="container mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-black text-center mb-8 md:mb-12">
          Featured Products
        </h2>

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

        {error ? (
          <div className="text-center py-12">
            <div className="mb-4">
              <svg className="w-16 h-16 mx-auto text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Oops! Something went wrong</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-orange hover:bg-orange/90 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}