import { useState, useCallback } from 'react'
import { Product } from '@ecommerce/shared-services'
import { MockCartService, CartItem } from '../services/mockCartService'

const mockCartService = new MockCartService()

export const useCartMock = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Agregar al carrito
  const addToCart = useCallback(async (product: Product, quantity: number = 1) => {
    setLoading(true)
    setError(null)

    try {
      const updatedCart = await mockCartService.addToCart(product, quantity)
      setCartItems(updatedCart)
      return updatedCart
    } catch (err) {
      setError('Error al agregar al carrito')
      console.error('Error adding to cart:', err)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // Actualizar cantidad
  const updateQuantity = useCallback(async (productId: string, quantity: number) => {
    setLoading(true)
    setError(null)

    try {
      const updatedCart = await mockCartService.updateQuantity(productId, quantity)
      setCartItems(updatedCart)
      return updatedCart
    } catch (err) {
      setError('Error al actualizar cantidad')
      console.error('Error updating quantity:', err)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // Remover del carrito
  const removeFromCart = useCallback(async (productId: string) => {
    setLoading(true)
    setError(null)

    try {
      const updatedCart = await mockCartService.removeFromCart(productId)
      setCartItems(updatedCart)
      return updatedCart
    } catch (err) {
      setError('Error al remover del carrito')
      console.error('Error removing from cart:', err)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // Limpiar carrito
  const clearCart = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      await mockCartService.clearCart()
      setCartItems([])
    } catch (err) {
      setError('Error al limpiar carrito')
      console.error('Error clearing cart:', err)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // Obtener total del carrito
  const getCartTotal = useCallback(async () => {
    try {
      return await mockCartService.getCartTotal()
    } catch (err) {
      console.error('Error getting cart total:', err)
      return { subtotal: 0, tax: 0, total: 0, itemCount: 0 }
    }
  }, [])

  // Verificar si está en carrito
  const isInCart = useCallback(async (productId: string) => {
    try {
      return await mockCartService.isInCart(productId)
    } catch (err) {
      console.error('Error checking if in cart:', err)
      return false
    }
  }, [])

  // Obtener cantidad de producto
  const getProductQuantity = useCallback(async (productId: string) => {
    try {
      return await mockCartService.getProductQuantity(productId)
    } catch (err) {
      console.error('Error getting product quantity:', err)
      return 0
    }
  }, [])

  // Calcular totales de forma sincronizada para la UI
  const cartSummary = {
    subtotal: cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0),
    itemCount: cartItems.reduce((sum, item) => sum + item.quantity, 0),
    get tax() { return this.subtotal * 0.1 },
    get total() { return this.subtotal + this.tax }
  }

  return {
    cartItems,
    loading,
    error,
    cartSummary,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getCartTotal,
    isInCart,
    getProductQuantity
  }
}