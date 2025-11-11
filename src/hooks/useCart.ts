import { useState, useEffect } from 'react'
import { CartItem } from '../types'

const CART_KEY = 'zamzoom-cart'

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([])

  useEffect(() => {
    const stored = localStorage.getItem(CART_KEY)
    if (stored) {
      setCart(JSON.parse(stored))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart))
  }, [cart])

  const addToCart = (item: Omit<CartItem, 'qty'>) => {
    setCart(prev => {
      const existing = prev.find(i => i.sku === item.sku)
      if (existing) {
        return prev.map(i => i.sku === item.sku ? { ...i, qty: i.qty + 1 } : i)
      }
      return [...prev, { ...item, qty: 1 }]
    })
  }

  const updateQty = (sku: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(sku)
      return
    }
    setCart(prev => prev.map(i => i.sku === sku ? { ...i, qty } : i))
  }

  const removeFromCart = (sku: string) => {
    setCart(prev => prev.filter(i => i.sku !== sku))
  }

  const clearCart = () => {
    setCart([])
  }

  const getTotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.qty, 0)
  }

  const getItemCount = () => {
    return cart.reduce((sum, item) => sum + item.qty, 0)
  }

  return {
    cart,
    addToCart,
    updateQty,
    removeFromCart,
    clearCart,
    getTotal,
    getItemCount,
  }
}