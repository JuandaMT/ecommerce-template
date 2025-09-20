import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { Order, OrderSummary, CreateOrderData, OrderStatus } from '../types/order.types'

interface OrderState {
  orders: OrderSummary[]
  currentOrder: Order | null
  loading: boolean
  error: string | null
  isCreatingOrder: boolean

  setOrders: (orders: OrderSummary[]) => void
  setCurrentOrder: (order: Order | null) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  setCreatingOrder: (creating: boolean) => void
  fetchOrders: () => Promise<void>
  fetchOrder: (id: string) => Promise<void>
  createOrder: (data: CreateOrderData) => Promise<void>
  updateOrderStatus: (id: string, status: OrderStatus) => Promise<void>
  cancelOrder: (id: string) => Promise<void>
  clearError: () => void
}

export const useOrderStore = create<OrderState>()(
  devtools(
    (set, get) => ({
      orders: [],
      currentOrder: null,
      loading: false,
      error: null,
      isCreatingOrder: false,

      setOrders: (orders) => set({ orders, loading: false, error: null }),

      setCurrentOrder: (order) => set({ currentOrder: order }),

      setLoading: (loading) => set({ loading }),

      setError: (error) => set({ error, loading: false }),

      setCreatingOrder: (creating) => set({ isCreatingOrder: creating }),

      clearError: () => set({ error: null }),

      fetchOrders: async () => {
        set({ loading: true, error: null })
        try {
          // This will be implemented by the consuming application
          throw new Error('Orders fetch implementation required in consuming app')
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Failed to fetch orders',
            loading: false
          })
        }
      },

      fetchOrder: async (id) => {
        set({ loading: true, error: null })
        try {
          // This will be implemented by the consuming application
          throw new Error('Single order fetch implementation required in consuming app')
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Failed to fetch order',
            loading: false
          })
        }
      },

      createOrder: async (data) => {
        set({ isCreatingOrder: true, error: null })
        try {
          // This will be implemented by the consuming application
          throw new Error('Order creation implementation required in consuming app')
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Failed to create order',
            isCreatingOrder: false
          })
          throw error
        }
      },

      updateOrderStatus: async (id, status) => {
        set({ loading: true, error: null })
        try {
          // This will be implemented by the consuming application
          throw new Error('Order status update implementation required in consuming app')
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Failed to update order status',
            loading: false
          })
          throw error
        }
      },

      cancelOrder: async (id) => {
        set({ loading: true, error: null })
        try {
          // This will be implemented by the consuming application
          throw new Error('Order cancellation implementation required in consuming app')
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Failed to cancel order',
            loading: false
          })
          throw error
        }
      }
    }),
    { name: 'OrderStore' }
  )
)