import { Product } from '@ecommerce/shared-services'
import { mockProducts, mockDelay } from '../data/mockData'

export class MockProductService {
  private products: Product[] = [...mockProducts]

  // Simular obtener todos los productos
  async getAllProducts(): Promise<Product[]> {
    await mockDelay(600) // Simular latencia de red
    return [...this.products]
  }

  // Simular obtener productos con filtros
  async getProducts(filters?: {
    category?: string
    minPrice?: number
    maxPrice?: number
    search?: string
    tags?: string[]
  }): Promise<Product[]> {
    await mockDelay(400)

    let filteredProducts = [...this.products]

    if (filters?.category) {
      filteredProducts = filteredProducts.filter(p => p.category === filters.category)
    }

    if (filters?.minPrice !== undefined) {
      filteredProducts = filteredProducts.filter(p => p.price >= filters.minPrice!)
    }

    if (filters?.maxPrice !== undefined) {
      filteredProducts = filteredProducts.filter(p => p.price <= filters.maxPrice!)
    }

    if (filters?.search) {
      const searchLower = filters.search.toLowerCase()
      filteredProducts = filteredProducts.filter(p =>
        p.name.toLowerCase().includes(searchLower) ||
        p.description.toLowerCase().includes(searchLower) ||
        p.tags?.some(tag => tag.toLowerCase().includes(searchLower))
      )
    }

    if (filters?.tags && filters.tags.length > 0) {
      filteredProducts = filteredProducts.filter(p =>
        p.tags?.some(tag => filters.tags!.includes(tag))
      )
    }

    return filteredProducts
  }

  // Simular obtener un producto por ID
  async getProductById(id: string): Promise<Product | null> {
    await mockDelay(300)
    return this.products.find(p => p._id === id) || null
  }

  // Simular productos destacados
  async getFeaturedProducts(): Promise<Product[]> {
    await mockDelay(500)
    // Retornar los productos más caros como "destacados"
    return this.products
      .sort((a, b) => b.price - a.price)
      .slice(0, 4)
  }

  // Simular productos por categoría
  async getProductsByCategory(category: string): Promise<Product[]> {
    await mockDelay(400)
    return this.products.filter(p => p.category === category)
  }

  // Simular búsqueda de productos
  async searchProducts(query: string): Promise<Product[]> {
    await mockDelay(600)
    const searchLower = query.toLowerCase()
    return this.products.filter(p =>
      p.name.toLowerCase().includes(searchLower) ||
      p.description.toLowerCase().includes(searchLower) ||
      p.tags?.some(tag => tag.toLowerCase().includes(searchLower))
    )
  }

  // Simular productos relacionados
  async getRelatedProducts(productId: string): Promise<Product[]> {
    await mockDelay(350)
    const product = this.products.find(p => p._id === productId)
    if (!product) return []

    // Buscar productos de la misma categoría (excluyendo el actual)
    return this.products
      .filter(p => p._id !== productId && p.category === product.category)
      .slice(0, 3)
  }

  // Simular actualizar stock (para el carrito)
  async updateStock(productId: string, newStock: number): Promise<Product | null> {
    await mockDelay(200)
    const productIndex = this.products.findIndex(p => p._id === productId)
    if (productIndex === -1) return null

    this.products[productIndex] = {
      ...this.products[productIndex],
      stock: newStock,
      updatedAt: new Date().toISOString()
    }

    return this.products[productIndex]
  }

  // Simular verificar disponibilidad
  async checkAvailability(productId: string, quantity: number): Promise<boolean> {
    await mockDelay(200)
    const product = this.products.find(p => p._id === productId)
    return product ? product.stock >= quantity : false
  }
}