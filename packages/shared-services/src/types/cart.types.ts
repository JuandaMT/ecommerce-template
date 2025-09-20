import { Product } from './product.types'

export interface CartItem {
  product: Product
  quantity: number
  addedAt?: string
}

export interface CartSummary {
  subtotal: number
  tax: number
  shipping: number
  total: number
  discount?: number
}

export interface Cart {
  items: CartItem[]
  summary: CartSummary
  isOpen: boolean
}

export interface ShippingAddress {
  street: string
  city: string
  state: string
  zipCode: string
  country: string
}

export interface PaymentMethod {
  type: 'credit_card' | 'paypal' | 'stripe'
  details: Record<string, any>
}