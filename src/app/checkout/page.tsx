'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '../../hooks/useCart'
import { ShippingAddress } from '../../types'
import ProgressIndicator from '../../components/ProgressIndicator'
import TrustSignals from '../../components/TrustSignals'

export default function CheckoutPage() {
  const { cart, getTotal, clearCart } = useCart()
  const router = useRouter()

  const [address, setAddress] = useState<ShippingAddress>({
    name: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  })

  const [email, setEmail] = useState('')

  const subtotal = getTotal()
  const shipping = 50
  const total = subtotal + shipping

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      // Create order in Firebase
      const orderId = 'ORD-' + Date.now()

      const orderData = {
        id: orderId,
        email,
        shipping_address: address,
        items: cart.map(item => ({
          product_id: item.product_id,
          sku: item.sku,
          qty: item.qty,
          unit_price: item.price,
        })),
        totals: {
          subtotal,
          shipping,
          grand_total: total
        },
        status: 'created' as const,
        created_at: new Date()
      }

      // Import Firestore functions
      const { collection, addDoc } = await import('firebase/firestore')
      const { db } = await import('../../lib/firebase')

      await addDoc(collection(db, 'orders'), orderData)

      console.log('Order created:', orderData)

      clearCart()
      router.push(`/order/${orderId}`)
    } catch (error) {
      console.error('Error creating order:', error)
      alert('Failed to create order. Please try again.')
    }
  }

  if (cart.length === 0) {
    router.push('/cart')
    return null
  }

  return (
    <div className="min-h-screen bg-cream py-12 md:py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <ProgressIndicator steps={['Cart', 'Checkout', 'Payment']} currentStep={1} />
        <h1 className="text-2xl md:text-3xl font-bold text-black mb-6 md:mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* Address Form */}
          <div className="bg-white rounded-lg shadow-md p-4 md:p-6 order-2 lg:order-1">
            <h2 className="text-lg md:text-xl font-bold text-black mb-4 md:mb-6">Shipping Address</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">Email Address</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-3 md:py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange focus:border-transparent text-base"
                  required
                  aria-describedby="email-error"
                  aria-required="true"
                  autoComplete="email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">Full Name</label>
                <input
                  id="name"
                  type="text"
                  value={address.name}
                  onChange={(e) => setAddress({ ...address, name: e.target.value })}
                  className="w-full px-3 py-3 md:py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange focus:border-transparent text-base"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="phone">Phone</label>
                <input
                  id="phone"
                  type="tel"
                  value={address.phone}
                  onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                  className="w-full px-3 py-3 md:py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange focus:border-transparent text-base"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="address">Address</label>
                <textarea
                  id="address"
                  value={address.address}
                  onChange={(e) => setAddress({ ...address, address: e.target.value })}
                  className="w-full px-3 py-3 md:py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange focus:border-transparent text-base"
                  rows={3}
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="city">City</label>
                  <input
                    id="city"
                    type="text"
                    value={address.city}
                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                    className="w-full px-3 py-3 md:py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange focus:border-transparent text-base"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="state">State</label>
                  <input
                    id="state"
                    type="text"
                    value={address.state}
                    onChange={(e) => setAddress({ ...address, state: e.target.value })}
                    className="w-full px-3 py-3 md:py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange focus:border-transparent text-base"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="pincode">Pincode</label>
                <input
                  id="pincode"
                  type="text"
                  value={address.pincode}
                  onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                  className="w-full px-3 py-3 md:py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange focus:border-transparent text-base"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-orange hover:bg-orange/90 active:bg-orange/80 text-white py-3 md:py-4 rounded-lg font-semibold text-base md:text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform active:scale-95"
              >
                Place Order
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow-md p-4 md:p-6 order-1 lg:order-2">
            <h2 className="text-lg md:text-xl font-bold text-black mb-4 md:mb-6">Order Summary</h2>

            <div className="space-y-3 md:space-y-4 mb-4 md:mb-6">
              {cart.map((item) => (
                <div key={item.sku} className="flex justify-between items-center gap-3">
                  <div className="flex items-center space-x-3 flex-1 min-w-0">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-200 rounded flex items-center justify-center flex-shrink-0">
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded" loading="lazy" />
                      ) : (
                        <span className="text-xs text-gray-500">Img</span>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-black text-sm md:text-base line-clamp-2">{item.name}</p>
                      <p className="text-xs md:text-sm text-gray-600">Qty: {item.qty}</p>
                    </div>
                  </div>
                  <p className="font-semibold text-black text-sm md:text-base flex-shrink-0">₹{item.price * item.qty}</p>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 space-y-2">
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
          </div>
        </div>

        <TrustSignals />
      </div>
    </div>
  )
}