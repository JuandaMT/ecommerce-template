import { useState, useEffect, useCallback } from 'react'
import { Product } from '@ecommerce/shared-services'
import { MockProductService } from '../../../shared/services/mockProductService'

const mockProductService = new MockProductService()

export const useProductsMock = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Cargar todos los productos
  const fetchProducts = useCallback(async (filters?: any) => {
    setLoading(true)
    setError(null)

    try {
      const data = await mockProductService.getProducts(filters)
      setProducts(data)
    } catch (err) {
      setError('Error al cargar productos')
      console.error('Error fetching products:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  // Cargar un producto específico
  const fetchProduct = useCallback(async (id: string) => {
    setLoading(true)
    setError(null)

    try {
      const product = await mockProductService.getProductById(id)
      setCurrentProduct(product)
    } catch (err) {
      setError('Error al cargar el producto')
      console.error('Error fetching product:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  // Buscar productos
  const searchProducts = useCallback(async (query: string) => {
    setLoading(true)
    setError(null)

    try {
      const data = await mockProductService.searchProducts(query)
      setProducts(data)
    } catch (err) {
      setError('Error en la búsqueda')
      console.error('Error searching products:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  // Obtener productos destacados
  const getFeaturedProducts = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const data = await mockProductService.getFeaturedProducts()
      setProducts(data)
    } catch (err) {
      setError('Error al cargar productos destacados')
      console.error('Error fetching featured products:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  // Cargar productos al montar el componente
  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  return {
    products,
    currentProduct,
    loading,
    error,
    fetchProducts,
    fetchProduct,
    searchProducts,
    getFeaturedProducts,
    // Métodos adicionales para compatibilidad
    setFilters: (filters: any) => fetchProducts(filters),
    clearFilters: () => fetchProducts(),
    getFilteredProducts: () => products,
    getCurrentProduct: () => currentProduct,
    isLoading: () => loading,
    getError: () => error
  }
}