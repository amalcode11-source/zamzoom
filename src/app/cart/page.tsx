'use client'

import Link from 'next/link'
import { useCart } from '../../hooks/useCart'

export default function CartPage() {
  const { cart, updateQty, removeFromCart, getTotal } = useCart()

  const shipping = 50 // Flat shipping rate
  const subtotal = getTotal()
  const total = subtotal + shipping

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-cream py-12 md:py-16 px-4">
        <div className="container mx-auto text-center max-w-md">
          <h1 className="text-2xl md:text-3xl font-bold text-black mb-6 md:mb-8">Your Cart</h1>
          <div className="mb-6 md:mb-8">
            <svg className="w-16 h-16 md:w-20 md:h-20 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.1 5H19M7 13l-1.1 5M7 13h10m0 0v8a2 2 0 01-2 2H9a2 2 0 01-2-2v-8" />
            </svg>
            <p className="text-gray-600 text-base md:text-lg">Your cart is empty</p>
          </div>
          <Link href="/" className="bg-orange hover:bg-orange/90 active:bg-orange/80 text-white px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold text-base md:text-lg transition-all duration-200 inline-block shadow-lg hover:shadow-xl transform active:scale-95">
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream py-12 md:py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-2xl md:text-3xl font-bold text-black mb-6 md:mb-8">Your Cart</h1>

        <div className="bg-white rounded-lg shadow-md p-4 md:p-6 mb-6 md:mb-8">
          {cart.map((item) => (
            <div key={item.sku} className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-4 border-b last:border-b-0 gap-4">
              <div className="flex items-center space-x-4 flex-1">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-200 rounded flex items-center justify-center flex-shrink-0">
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded" loading="lazy" />
                  ) : (
                    <span className="text-xs text-gray-500">Img</span>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-black text-sm md:text-base line-clamp-2">{item.name}</h3>
                  <p className="text-orange font-bold text-sm md:text-base">₹{item.price}</p>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => updateQty(item.sku, item.qty - 1)}
                    className="w-8 h-8 md:w-10 md:h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 active:bg-gray-400 transition-colors text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="w-8 md:w-10 text-center font-medium" aria-label={`Quantity: ${item.qty}`}>{item.qty}</span>
                  <button
                    onClick={() => updateQty(item.sku, item.qty + 1)}
                    className="w-8 h-8 md:w-10 md:h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 active:bg-gray-400 transition-colors text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
                <p className="font-semibold text-black text-sm md:text-base w-16 md:w-20 text-right">₹{item.price * item.qty}</p>
                <button
                  onClick={() => removeFromCart(item.sku)}
                  className="text-red-500 hover:text-red-700 active:text-red-800 transition-colors p-2"
                  aria-label="Remove item"
                >
                  <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
          <h2 className="text-lg md:text-xl font-bold text-black mb-4">Order Summary</h2>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm md:text-base">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between text-sm md:text-base">
              <span>Shipping</span>
              <span>₹{shipping}</span>
            </div>
            <div className="flex justify-between font-bold text-base md:text-lg border-t pt-2">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
          </div>
          <Link
            href="/checkout"
            className="w-full bg-orange hover:bg-orange/90 active:bg-orange/80 text-white py-3 md:py-4 rounded-lg font-semibold text-center block transition-all duration-200 shadow-lg hover:shadow-xl transform active:scale-95"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  )
}