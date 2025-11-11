'use client'

import Link from 'next/link'
import { Product } from '../types'
import { useCart } from '../hooks/useCart'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()
  const firstVariant = product.variants[0]

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart({
      product_id: product.id,
      sku: firstVariant.sku,
      name: product.name,
      price: firstVariant.price,
      image: product.images[0],
    })
  }

  return (
    <Link href={`/products/${product.id}`} className="group block">
      <article className="glass rounded-xl shadow-modern overflow-hidden hover:shadow-modern-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-95 border border-white/20" role="article">
        <div className="aspect-square bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center relative overflow-hidden">
          {product.images.length > 0 ? (
            <img
              src={product.images[0]}
              alt={`Image of ${product.name}`}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              loading="lazy"
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-gray-400">
              <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-sm">No Image</span>
            </div>
          )}

          {/* Quick Actions Overlay */}
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={handleAddToCart}
              className="bg-gradient-to-r from-vibrant-blue to-vibrant-purple hover:from-vibrant-purple hover:to-vibrant-pink text-white p-2 rounded-full shadow-modern transform hover:scale-110 transition-all duration-200"
              aria-label={`Quick add ${product.name} to cart`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </button>
          </div>

          {/* Badge */}
          <div className="absolute top-3 left-3">
            <span className="bg-gradient-to-r from-green-400 to-green-600 text-white text-xs px-2 py-1 rounded-full font-medium shadow-modern">
              Organic
            </span>
          </div>
        </div>

        <div className="p-5">
          <h3 className="font-semibold text-slate-900 mb-2 text-base line-clamp-2 group-hover:text-vibrant-blue transition-colors">{product.name}</h3>
          <p className="text-sm text-slate-600 mb-3 line-clamp-2">{product.description}</p>

          <div className="flex items-center justify-between mb-4">
            <p className="text-vibrant-purple font-bold text-xl" aria-label={`Price: ${firstVariant.price} rupees`}>₹{firstVariant.price}</p>
            <div className="flex items-center">
              <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-sm text-slate-600 ml-1">4.5</span>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full bg-gradient-to-r from-vibrant-blue to-vibrant-purple hover:from-vibrant-purple hover:to-vibrant-pink text-white py-3 rounded-lg transition-all duration-200 font-medium shadow-modern hover:shadow-modern-lg transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-vibrant-blue focus:ring-offset-2"
            aria-label={`Add ${product.name} to cart for ₹${firstVariant.price}`}
          >
            Add to Cart
          </button>
        </div>
      </article>
    </Link>
  )
}