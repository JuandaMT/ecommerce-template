import { create } from 'zustand'
import { persist, devtools } from 'zustand/middleware'
import { CartItem, Cart, CartSummary } from '../types/cart.types'
import { Product } from '../types/product.types'

interface CartState extends Cart {
  addItem: (product: Product, quantity?: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  toggleCart: () => void
  calculateSummary: () => void
  getItemCount: () => number
  getItemQuantity: (productId: string) => number
}

const calculateCartSummary = (items: CartItem[]): CartSummary => {
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const tax = subtotal * 0.1 // 10% tax
  const shipping = subtotal > 100 ? 0 : 10 // Free shipping over $100

  return {
    subtotal,
    tax,
    shipping,
    total: subtotal + tax + shipping
  }
}

export const useCartStore = create<CartState>()(
  devtools(
    persist(
      (set, get) => ({
        items: [],
        summary: {
          subtotal: 0,
          tax: 0,
          shipping: 0,
          total: 0
        },
        isOpen: false,

        addItem: (product, quantity = 1) => {
          const { items } = get()
          const existingItemIndex = items.findIndex(item => item.product._id === product._id)

          let updatedItems: CartItem[]
          if (existingItemIndex > -1) {
            updatedItems = items.map((item, index) =>
              index === existingItemIndex
                ? { ...item, quantity: item.quantity + quantity }
                : item
            )
          } else {
            updatedItems = [...items, { product, quantity, addedAt: new Date().toISOString() }]
          }

          const summary = calculateCartSummary(updatedItems)
          set({ items: updatedItems, summary })
        },

        removeItem: (productId) => {
          const { items } = get()
          const updatedItems = items.filter(item => item.product._id !== productId)
          const summary = calculateCartSummary(updatedItems)
          set({ items: updatedItems, summary })
        },

        updateQuantity: (productId, quantity) => {
          if (quantity <= 0) {
            get().removeItem(productId)
            return
          }

          const { items } = get()
          const updatedItems = items.map(item =>
            item.product._id === productId ? { ...item, quantity } : item
          )
          const summary = calculateCartSummary(updatedItems)
          set({ items: updatedItems, summary })
        },

        clearCart: () => {
          set({
            items: [],
            summary: {
              subtotal: 0,
              tax: 0,
              shipping: 0,
              total: 0
            }
          })
        },

        toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

        calculateSummary: () => {
          const { items } = get()
          const summary = calculateCartSummary(items)
          set({ summary })
        },

        getItemCount: () => {
          const { items } = get()
          return items.reduce((sum, item) => sum + item.quantity, 0)
        },

        getItemQuantity: (productId) => {
          const { items } = get()
          const item = items.find(item => item.product._id === productId)
          return item ? item.quantity : 0
        }
      }),
      {
        name: 'cart-storage',
        partialize: (state) => ({
          items: state.items,
          summary: state.summary
        })
      }
    ),
    { name: 'CartStore' }
  )
)