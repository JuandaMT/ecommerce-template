import { CartItem, ShippingAddress, PaymentMethod } from './cart.types'
import { User } from './auth.types'

export interface Order {
  _id: string
  userId: string
  items: CartItem[]
  shippingAddress: ShippingAddress
  paymentMethod: PaymentMethod
  status: OrderStatus
  totalAmount: number
  subtotal: number
  tax: number
  shipping: number
  discount?: number
  createdAt: string
  updatedAt?: string
  trackingNumber?: string
  estimatedDelivery?: string
}

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refunded'

export interface OrderSummary {
  _id: string
  status: OrderStatus
  totalAmount: number
  itemCount: number
  createdAt: string
}

export interface CreateOrderData {
  items: CartItem[]
  shippingAddress: ShippingAddress
  paymentMethod: PaymentMethod
}