import { useProductStore } from '../stores/productStore'
import { ProductService } from '../services/api/productService'
import { ProductFilter, ProductSort } from '../types/product.types'
import { LocalStorageService } from '../services/storage/localStorage'

export const useProducts = (productService?: ProductService) => {
  const store = useProductStore()
  const storage = new LocalStorageService()

  const fetchProducts = async (
    filters?: ProductFilter,
    sort?: ProductSort,
    page?: number
  ) => {
    if (!productService) {
      throw new Error('ProductService is required for fetching products')
    }

    try {
      store.setLoading(true)
      store.setError(null)

      if (filters) store.setFilters(filters)
      if (sort) store.setSort(sort)
      if (page) store.setPage(page)

      const currentState = store
      const response = await productService.getProducts(
        currentState.filters,
        currentState.sort,
        currentState.pagination.page
      )

      store.setProducts(response)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to fetch products'
      store.setError(message)
    }
  }

  const fetchProduct = async (id: string) => {
    if (!productService) {
      throw new Error('ProductService is required for fetching product')
    }

    try {
      store.setLoading(true)
      store.setError(null)

      const product = await productService.getProduct(id)
      store.setCurrentProduct(product)

      // Add to recently viewed
      storage.addToRecentlyViewed(id)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to fetch product'
      store.setError(message)
    }
  }

  const searchProducts = async (query: string) => {
    if (!productService) {
      throw new Error('ProductService is required for searching products')
    }

    try {
      store.setLoading(true)
      store.setError(null)

      const products = await productService.searchProducts(query)
      store.setProducts({
        products,
        total: products.length,
        page: 1,
        totalPages: 1
      })
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to search products'
      store.setError(message)
    }
  }

  const setFilters = (filters: Partial<ProductFilter>) => {
    store.setFilters(filters)
  }

  const clearFilters = () => {
    store.clearFilters()
  }

  const setSort = (sort: ProductSort) => {
    store.setSort(sort)
  }

  const setPage = (page: number) => {
    store.setPage(page)
  }

  const getFilteredProducts = () => {
    return store.products
  }

  const getCurrentProduct = () => {
    return store.currentProduct
  }

  const isLoading = () => {
    return store.loading
  }

  const getError = () => {
    return store.error
  }

  const getPagination = () => {
    return store.pagination
  }

  const hasNextPage = (): boolean => {
    return store.pagination.page < store.pagination.totalPages
  }

  const hasPreviousPage = (): boolean => {
    return store.pagination.page > 1
  }

  const getRecentlyViewed = (): string[] => {
    return storage.getRecentlyViewed()
  }

  const getWishlist = (): string[] => {
    return storage.getWishlist()
  }

  const addToWishlist = (productId: string) => {
    storage.addToWishlist(productId)
  }

  const removeFromWishlist = (productId: string) => {
    storage.removeFromWishlist(productId)
  }

  const isInWishlist = (productId: string): boolean => {
    return storage.isInWishlist(productId)
  }

  const toggleWishlist = (productId: string) => {
    if (isInWishlist(productId)) {
      removeFromWishlist(productId)
    } else {
      addToWishlist(productId)
    }
  }

  return {
    // State
    products: store.products,
    currentProduct: store.currentProduct,
    loading: store.loading,
    error: store.error,
    filters: store.filters,
    sort: store.sort,
    pagination: store.pagination,

    // Actions
    fetchProducts,
    fetchProduct,
    searchProducts,
    setFilters,
    clearFilters,
    setSort,
    setPage,

    // Utilities
    getFilteredProducts,
    getCurrentProduct,
    isLoading,
    getError,
    getPagination,
    hasNextPage,
    hasPreviousPage,
    getRecentlyViewed,
    getWishlist,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    toggleWishlist
  }
}