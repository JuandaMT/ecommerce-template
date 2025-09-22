import { Product } from '@ecommerce/shared-services'
import { mockDelay } from '../data/mockData'

export interface CartItem {
  product: Product
  quantity: number
  addedAt: string
}

export class MockCartService {
  private cartItems: CartItem[] = []

  // Agregar producto al carrito
  async addToCart(product: Product, quantity: number = 1): Promise<CartItem[]> {
    await mockDelay(300)

    const existingItemIndex = this.cartItems.findIndex(item => item.product._id === product._id)

    if (existingItemIndex >= 0) {
      // Si ya existe, aumentar la cantidad
      this.cartItems[existingItemIndex].quantity += quantity
    } else {
      // Si no existe, agregar nuevo item
      this.cartItems.push({
        product,
        quantity,
        addedAt: new Date().toISOString()
      })
    }

    return [...this.cartItems]
  }

  // Obtener items del carrito
  async getCartItems(): Promise<CartItem[]> {
    await mockDelay(200)
    return [...this.cartItems]
  }

  // Actualizar cantidad de un item
  async updateQuantity(productId: string, quantity: number): Promise<CartItem[]> {
    await mockDelay(250)

    if (quantity <= 0) {
      return this.removeFromCart(productId)
    }

    const itemIndex = this.cartItems.findIndex(item => item.product._id === productId)
    if (itemIndex >= 0) {
      this.cartItems[itemIndex].quantity = quantity
    }

    return [...this.cartItems]
  }

  // Remover producto del carrito
  async removeFromCart(productId: string): Promise<CartItem[]> {
    await mockDelay(200)
    this.cartItems = this.cartItems.filter(item => item.product._id !== productId)
    return [...this.cartItems]
  }

  // Limpiar carrito
  async clearCart(): Promise<void> {
    await mockDelay(300)
    this.cartItems = []
  }

  // Obtener total del carrito
  async getCartTotal(): Promise<{ subtotal: number; tax: number; total: number; itemCount: number }> {
    await mockDelay(100)

    const subtotal = this.cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
    const tax = subtotal * 0.1 // 10% de impuestos
    const total = subtotal + tax
    const itemCount = this.cartItems.reduce((sum, item) => sum + item.quantity, 0)

    return { subtotal, tax, total, itemCount }
  }

  // Verificar si un producto está en el carrito
  async isInCart(productId: string): Promise<boolean> {
    await mockDelay(50)
    return this.cartItems.some(item => item.product._id === productId)
  }

  // Obtener cantidad de un producto en el carrito
  async getProductQuantity(productId: string): Promise<number> {
    await mockDelay(50)
    const item = this.cartItems.find(item => item.product._id === productId)
    return item ? item.quantity : 0
  }
}