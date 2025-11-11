'use client'

import { notFound } from 'next/navigation'
import { useState, useEffect, use } from 'react'
import { collection, getDocs, query, where, limit } from 'firebase/firestore'
import { db } from '../../../lib/firebase'
import { Product, ProductVariant } from '../../../types'
import { useCart } from '../../../hooks/useCart'
import Breadcrumb from '../../../components/Breadcrumb'
import ProductCard from '../../../components/ProductCard'

interface ProductPageProps {
  params: Promise<{
    slug: string
  }>
}

export default function ProductPage({ params }: ProductPageProps) {
  const { slug } = use(params)
  const { addToCart } = useCart()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [recommendations, setRecommendations] = useState<Product[]>([])

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        console.log('Fetching product with slug:', slug)
        const q = query(collection(db, 'products'), where('slug', '==', slug))
        const querySnapshot = await getDocs(q)
        console.log('Query snapshot:', querySnapshot)
        console.log('Query snapshot empty?', querySnapshot.empty)
        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0]
          const data = doc.data()
          console.log('Raw document data:', data)
          console.log('Document data types:', {
            created_at: data.created_at?.constructor?.name,
            updated_at: data.updated_at?.constructor?.name,
            variants: Array.isArray(data.variants) ? 'array' : typeof data.variants
          })

          // Convert Firestore Timestamps to Date objects
          const processedData = {
            ...data,
            created_at: data.created_at?.toDate?.() || data.created_at,
            updated_at: data.updated_at?.toDate?.() || data.updated_at,
          }

          setProduct({
            id: doc.id,
            ...processedData
          } as Product)
          console.log('Product set successfully')
        } else {
          console.log('No product found with slug:', slug)
        }
      } catch (error) {
        console.error('Error fetching product:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [slug])

  useEffect(() => {
    if (product) {
      const fetchRecommendations = async () => {
        try {
          const q = query(
            collection(db, 'products'),
            where('category', '==', product.category),
            limit(4)
          )
          const querySnapshot = await getDocs(q)
          const recs = querySnapshot.docs
            .map(doc => ({
              id: doc.id,
              ...doc.data(),
              created_at: doc.data().created_at?.toDate?.() || doc.data().created_at,
              updated_at: doc.data().updated_at?.toDate?.() || doc.data().updated_at,
            }) as Product)
            .filter(p => p.id !== product.id) // Exclude current product
            .slice(0, 3) // Limit to 3
          setRecommendations(recs)
        } catch (error) {
          console.error('Error fetching recommendations:', error)
        }
      }
      fetchRecommendations()
    }
  }, [product])

  if (loading) {
    return (
      <div className="min-h-screen bg-cream py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="aspect-square bg-gray-200 rounded-lg animate-pulse"></div>
            <div className="space-y-6">
              <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-20 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
  
          {/* Recommendations */}
          {recommendations.length > 0 && (
            <section className="mt-12 md:mt-16">
              <h2 className="text-xl md:text-2xl font-bold text-black mb-6 md:mb-8">You might also like</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {recommendations.map((rec) => (
                  <ProductCard key={rec.id} product={rec} />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    )
  }

  if (!product) {
    notFound()
  }

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(product.variants[0])

  const handleAddToCart = () => {
    addToCart({
      product_id: product.id,
      sku: selectedVariant.sku,
      name: product.name,
      price: selectedVariant.price,
      image: product.images[0],
    })
  }

  const categoryName = product.category === 'honey' ? 'Honey' : product.category === 'nuts' ? 'Nuts' : 'Products'

  return (
    <div className="min-h-screen bg-cream py-12 md:py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <Breadcrumb items={[
          { label: categoryName, href: `/categories/${product.category}` },
          { label: product.name }
        ]} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* Product Image */}
          <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center order-1 md:order-1">
            {product.images.length > 0 ? (
              <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover rounded-lg" loading="lazy" />
            ) : (
              <span className="text-gray-500 text-base md:text-lg">Product Image</span>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-4 md:space-y-6 order-2 md:order-2">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-black mb-2">{product.name}</h1>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">{product.description}</p>
            </div>

            {/* Variant Selector */}
            <div>
              <h3 className="text-base md:text-lg font-semibold text-black mb-3">Select Weight</h3>
              <div className="flex gap-2 flex-wrap">
                {product.variants.map((variant) => (
                  <button
                    key={variant.sku}
                    onClick={() => setSelectedVariant(variant)}
                    className={`px-3 md:px-4 py-2 rounded border text-sm md:text-base font-medium transition-all duration-200 ${
                      selectedVariant.sku === variant.sku
                        ? 'border-orange bg-orange text-white shadow-md'
                        : 'border-gray-300 bg-white text-black hover:border-orange hover:shadow-sm'
                    }`}
                    aria-pressed={selectedVariant.sku === variant.sku}
                  >
                    {variant.weight_g}g - ₹{variant.price}
                  </button>
                ))}
              </div>
            </div>

            {/* Price and Stock */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div className="text-xl md:text-2xl font-bold text-orange">₹{selectedVariant.price}</div>
              <div className="text-sm text-gray-600">
                {selectedVariant.stock > 0 ? `${selectedVariant.stock} in stock` : 'Out of stock'}
              </div>
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              className="w-full bg-orange hover:bg-orange/90 active:bg-orange/80 text-white py-3 md:py-4 rounded-lg font-semibold text-base md:text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={selectedVariant.stock === 0}
              aria-label={`Add ${product.name} ${selectedVariant.weight_g}g to cart`}
            >
              {selectedVariant.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}