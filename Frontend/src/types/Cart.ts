import { Product } from './Product'

export interface CartItem {
  product: Product
  quantity: number
}

export interface CartState {
  items: CartItem[]
  totalItems: number
  totalPrice: number
  isOpen: boolean
}

export interface CartContextType {
  cart: CartState
  addToCart: (product: Product, quantity?: number) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  toggleCart: () => void
}