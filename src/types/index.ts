export interface Product {
  id: string
  name: string
  slug: string
  category: string
  description: string
  variants: ProductVariant[]
  images: string[]
  is_active: boolean
  created_at: Date
  updated_at: Date
}

export interface ProductVariant {
  weight_g: number
  price: number
  sku: string
  stock: number
}

export interface Category {
  id: string
  name: string
  slug: string
}

export interface Order {
  id: string
  user_id?: string
  email?: string
  phone: string
  shipping_address: ShippingAddress
  items: OrderItem[]
  totals: OrderTotals
  status: OrderStatus
  created_at: Date
}

export interface ShippingAddress {
  name: string
  phone: string
  address: string
  city: string
  state: string
  pincode: string
}

export interface OrderItem {
  product_id: string
  sku: string
  qty: number
  unit_price: number
}

export interface OrderTotals {
  subtotal: number
  shipping: number
  grand_total: number
}

export type OrderStatus = 'created' | 'processing' | 'shipped' | 'delivered' | 'cancelled'

export interface CartItem {
  product_id: string
  sku: string
  name: string
  price: number
  qty: number
  image?: string
}