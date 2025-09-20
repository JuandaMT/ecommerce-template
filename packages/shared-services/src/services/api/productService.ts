import { ApiClient } from './apiClient'
import { Product, ProductFilter, ProductSort, ProductsResponse } from '../../types/product.types'

export class ProductService {
  constructor(private apiClient: ApiClient) {}

  async getProducts(
    filters?: ProductFilter,
    sort?: ProductSort,
    page: number = 1,
    limit: number = 20
  ): Promise<ProductsResponse> {
    const params = new URLSearchParams()

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            value.forEach(v => params.append(key, v.toString()))
          } else {
            params.append(key, value.toString())
          }
        }
      })
    }

    if (sort) {
      params.append('sortField', sort.field)
      params.append('sortOrder', sort.order)
    }

    params.append('page', page.toString())
    params.append('limit', limit.toString())

    return this.apiClient.get<ProductsResponse>(`/products?${params.toString()}`)
  }

  async getProduct(id: string): Promise<Product> {
    return this.apiClient.get<Product>(`/products/${id}`)
  }

  async searchProducts(query: string, limit: number = 10): Promise<Product[]> {
    const params = new URLSearchParams({
      q: query,
      limit: limit.toString()
    })

    const response = await this.apiClient.get<ProductsResponse>(`/products/search?${params.toString()}`)
    return response.products
  }

  async getProductsByCategory(category: string, page: number = 1, limit: number = 20): Promise<ProductsResponse> {
    const params = new URLSearchParams({
      category,
      page: page.toString(),
      limit: limit.toString()
    })

    return this.apiClient.get<ProductsResponse>(`/products?${params.toString()}`)
  }

  async getFeaturedProducts(limit: number = 8): Promise<Product[]> {
    const response = await this.apiClient.get<ProductsResponse>(`/products/featured?limit=${limit}`)
    return response.products
  }

  async getRelatedProducts(productId: string, limit: number = 4): Promise<Product[]> {
    const response = await this.apiClient.get<ProductsResponse>(`/products/${productId}/related?limit=${limit}`)
    return response.products
  }

  async getCategories(): Promise<string[]> {
    return this.apiClient.get<string[]>('/products/categories')
  }

  async getTags(): Promise<string[]> {
    return this.apiClient.get<string[]>('/products/tags')
  }

  // Admin methods (if user has admin role)
  async createProduct(product: Omit<Product, '_id' | 'createdAt' | 'updatedAt'>): Promise<Product> {
    return this.apiClient.post<Product>('/admin/products', product)
  }

  async updateProduct(id: string, updates: Partial<Product>): Promise<Product> {
    return this.apiClient.put<Product>(`/admin/products/${id}`, updates)
  }

  async deleteProduct(id: string): Promise<void> {
    await this.apiClient.delete(`/admin/products/${id}`)
  }

  async updateStock(id: string, stock: number): Promise<Product> {
    return this.apiClient.patch<Product>(`/admin/products/${id}/stock`, { stock })
  }
}