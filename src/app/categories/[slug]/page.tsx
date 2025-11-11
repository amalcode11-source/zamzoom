'use client'

import { notFound } from 'next/navigation'
import { useEffect, useState, use } from 'react'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../../lib/firebase'
import ProductCard from '../../../components/ProductCard'
import Breadcrumb from '../../../components/Breadcrumb'
import { Product } from '../../../types'

const categories = {
  honey: 'Honey',
  nuts: 'Nuts',
}

interface CategoryPageProps {
  params: Promise<{
    slug: string
  }>
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = use(params)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState<'name' | 'price-low' | 'price-high'>('name')

  const categoryName = categories[slug as keyof typeof categories]

  useEffect(() => {
    if (!categoryName) return

    const fetchProducts = async () => {
      try {
        console.log('Fetching products for category:', slug)
        const q = query(collection(db, 'products'), where('category', '==', slug))
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
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [slug, categoryName])

  if (!categoryName) {
    notFound()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-cream py-12 md:py-16 px-4">
        <div className="container mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-black mb-6 md:mb-8">{categoryName}</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-lg animate-pulse h-64 md:h-80"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream py-12 md:py-16 px-4">
      <div className="container mx-auto">
        <Breadcrumb items={[{ label: categoryName }]} />
        <h1 className="text-2xl md:text-3xl font-bold text-black mb-6 md:mb-8">{categoryName}</h1>
        {products.length > 0 ? (
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
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-base md:text-lg">No products found in this category.</p>
          </div>
        )}
      </div>
    </div>
  )
}