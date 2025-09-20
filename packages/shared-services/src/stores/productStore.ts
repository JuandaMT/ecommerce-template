import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { Product, ProductFilter, ProductSort, ProductsResponse } from '../types/product.types'

interface ProductState {
  products: Product[]
  loading: boolean
  error: string | null
  currentProduct: Product | null
  filters: ProductFilter
  sort: ProductSort
  pagination: {
    page: number
    totalPages: number
    total: number
  }

  setProducts: (response: ProductsResponse) => void
  setCurrentProduct: (product: Product | null) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  setFilters: (filters: Partial<ProductFilter>) => void
  setSort: (sort: ProductSort) => void
  setPage: (page: number) => void
  clearFilters: () => void
  fetchProducts: () => Promise<void>
  fetchProduct: (id: string) => Promise<void>
}

const initialFilters: ProductFilter = {}
const initialSort: ProductSort = { field: 'createdAt', order: 'desc' }

export const useProductStore = create<ProductState>()(
  devtools(
    (set, get) => ({
      products: [],
      loading: false,
      error: null,
      currentProduct: null,
      filters: initialFilters,
      sort: initialSort,
      pagination: {
        page: 1,
        totalPages: 1,
        total: 0
      },

      setProducts: (response) => {
        set({
          products: response.products,
          pagination: {
            page: response.page,
            totalPages: response.totalPages,
            total: response.total
          },
          loading: false,
          error: null
        })
      },

      setCurrentProduct: (product) => set({ currentProduct: product }),

      setLoading: (loading) => set({ loading }),

      setError: (error) => set({ error, loading: false }),

      setFilters: (newFilters) => {
        set((state) => ({
          filters: { ...state.filters, ...newFilters },
          pagination: { ...state.pagination, page: 1 }
        }))
      },

      setSort: (sort) => {
        set((state) => ({
          sort,
          pagination: { ...state.pagination, page: 1 }
        }))
      },

      setPage: (page) => {
        set((state) => ({
          pagination: { ...state.pagination, page }
        }))
      },

      clearFilters: () => {
        set({
          filters: initialFilters,
          sort: initialSort,
          pagination: {
            page: 1,
            totalPages: 1,
            total: 0
          }
        })
      },

      fetchProducts: async () => {
        set({ loading: true, error: null })
        try {
          // This will be implemented by the consuming application
          throw new Error('Product fetch implementation required in consuming app')
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Failed to fetch products',
            loading: false
          })
        }
      },

      fetchProduct: async (id) => {
        set({ loading: true, error: null })
        try {
          // This will be implemented by the consuming application
          throw new Error('Single product fetch implementation required in consuming app')
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Failed to fetch product',
            loading: false
          })
        }
      }
    }),
    { name: 'ProductStore' }
  )
)