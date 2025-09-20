import { useCartStore } from '../stores/cartStore'
import { Product } from '../types/product.types'
import { useUIStore } from '../stores/uiStore'
import { SUCCESS_MESSAGES } from '../utils/constants'

export const useCart = () => {
  const store = useCartStore()
  const uiStore = useUIStore()

  const addToCart = (product: Product, quantity: number = 1) => {
    store.addItem(product, quantity)

    uiStore.addNotification({
      type: 'success',
      title: SUCCESS_MESSAGES.ITEM_ADDED_TO_CART,
      message: `${product.name} (${quantity}) added to cart`
    })
  }

  const removeFromCart = (productId: string) => {
    const item = store.items.find(item => item.product._id === productId)
    store.removeItem(productId)

    if (item) {
      uiStore.addNotification({
        type: 'success',
        title: SUCCESS_MESSAGES.ITEM_REMOVED_FROM_CART,
        message: `${item.product.name} removed from cart`
      })
    }
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }

    store.updateQuantity(productId, quantity)
  }

  const clearCart = () => {
    store.clearCart()
    uiStore.addNotification({
      type: 'info',
      title: 'Cart cleared',
      message: 'All items removed from cart'
    })
  }

  const getItemQuantity = (productId: string): number => {
    return store.getItemQuantity(productId)
  }

  const isInCart = (productId: string): boolean => {
    return store.items.some(item => item.product._id === productId)
  }

  const getTotalItems = (): number => {
    return store.getItemCount()
  }

  const canAddToCart = (product: Product, quantity: number = 1): boolean => {
    const currentQuantity = getItemQuantity(product._id)
    return currentQuantity + quantity <= product.stock
  }

  const getCartTotal = (): number => {
    return store.summary.total
  }

  const getCartSubtotal = (): number => {
    return store.summary.subtotal
  }

  const getCartTax = (): number => {
    return store.summary.tax
  }

  const getCartShipping = (): number => {
    return store.summary.shipping
  }

  const hasItems = (): boolean => {
    return store.items.length > 0
  }

  const toggleCart = () => {
    store.toggleCart()
  }

  return {
    // State
    items: store.items,
    summary: store.summary,
    isOpen: store.isOpen,

    // Actions
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleCart,

    // Utilities
    getItemQuantity,
    isInCart,
    getTotalItems,
    canAddToCart,
    getCartTotal,
    getCartSubtotal,
    getCartTax,
    getCartShipping,
    hasItems
  }
}