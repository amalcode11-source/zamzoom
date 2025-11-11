'use client'

import Link from 'next/link'
import { use } from 'react'

interface OrderPageProps {
  params: Promise<{
    id: string
  }>
}

export default function OrderPage({ params }: OrderPageProps) {
  // In real app, fetch order from Firebase
  const { id } = use(params)
  const orderId = id

  return (
    <div className="min-h-screen bg-cream py-16 px-4">
      <div className="container mx-auto max-w-2xl text-center">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-3xl font-bold text-black mb-4">Order Confirmed!</h1>
          <p className="text-gray-600 mb-6">
            Thank you for your order. Your order has been successfully placed.
          </p>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600">Order ID</p>
            <p className="font-mono text-lg font-semibold text-black">{orderId}</p>
          </div>

          <p className="text-sm text-gray-600 mb-8">
            You will receive an email confirmation shortly with your order details.
          </p>

          <div className="space-y-3">
            <Link
              href="/"
              className="block w-full bg-orange hover:bg-orange/90 text-white py-3 rounded-lg font-semibold transition-colors"
            >
              Continue Shopping
            </Link>
            <Link
              href="/"
              className="block w-full bg-white border border-gray-300 text-black py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              View Order Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}