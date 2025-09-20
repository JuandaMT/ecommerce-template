import { useOrderStore } from '../stores/orderStore'
import { OrderService } from '../services/api/orderService'
import { CreateOrderData, OrderStatus } from '../types/order.types'
import { useCartStore } from '../stores/cartStore'
import { useUIStore } from '../stores/uiStore'
import { SUCCESS_MESSAGES } from '../utils/constants'

export const useOrders = (orderService?: OrderService) => {
  const store = useOrderStore()
  const cartStore = useCartStore()
  const uiStore = useUIStore()

  const fetchOrders = async (page: number = 1) => {
    if (!orderService) {
      throw new Error('OrderService is required for fetching orders')
    }

    try {
      store.setLoading(true)
      store.setError(null)

      const response = await orderService.getOrders(page)
      store.setOrders(response.orders)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to fetch orders'
      store.setError(message)
    }
  }

  const fetchOrder = async (id: string) => {
    if (!orderService) {
      throw new Error('OrderService is required for fetching order')
    }

    try {
      store.setLoading(true)
      store.setError(null)

      const order = await orderService.getOrder(id)
      store.setCurrentOrder(order)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to fetch order'
      store.setError(message)
    }
  }

  const createOrder = async (data: CreateOrderData) => {
    if (!orderService) {
      throw new Error('OrderService is required for creating order')
    }

    try {
      store.setCreatingOrder(true)
      store.setError(null)

      const order = await orderService.createOrder(data)

      // Clear cart after successful order
      cartStore.clearCart()

      // Show success notification
      uiStore.addNotification({
        type: 'success',
        title: SUCCESS_MESSAGES.ORDER_CREATED,
        message: `Order #${order._id} has been placed successfully`
      })

      store.setCurrentOrder(order)
      return order
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to create order'
      store.setError(message)
      throw error
    } finally {
      store.setCreatingOrder(false)
    }
  }

  const updateOrderStatus = async (id: string, status: OrderStatus) => {
    if (!orderService) {
      throw new Error('OrderService is required for updating order status')
    }

    try {
      store.setLoading(true)
      store.setError(null)

      const updatedOrder = await orderService.updateOrderStatus(id, status)
      store.setCurrentOrder(updatedOrder)

      uiStore.addNotification({
        type: 'success',
        title: 'Order Updated',
        message: `Order status updated to ${status}`
      })
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to update order status'
      store.setError(message)
      throw error
    }
  }

  const cancelOrder = async (id: string, reason?: string) => {
    if (!orderService) {
      throw new Error('OrderService is required for cancelling order')
    }

    try {
      store.setLoading(true)
      store.setError(null)

      const cancelledOrder = await orderService.cancelOrder(id, reason)
      store.setCurrentOrder(cancelledOrder)

      uiStore.addNotification({
        type: 'success',
        title: SUCCESS_MESSAGES.ORDER_CANCELLED,
        message: `Order #${id} has been cancelled`
      })
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to cancel order'
      store.setError(message)
      throw error
    }
  }

  const trackOrder = async (id: string) => {
    if (!orderService) {
      throw new Error('OrderService is required for tracking order')
    }

    try {
      store.setLoading(true)
      store.setError(null)

      const trackingInfo = await orderService.trackOrder(id)
      return trackingInfo
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to track order'
      store.setError(message)
      throw error
    } finally {
      store.setLoading(false)
    }
  }

  const requestReturn = async (id: string, reason: string, items?: string[]) => {
    if (!orderService) {
      throw new Error('OrderService is required for requesting return')
    }

    try {
      store.setLoading(true)
      store.setError(null)

      const returnInfo = await orderService.requestReturn(id, reason, items)

      uiStore.addNotification({
        type: 'success',
        title: 'Return Requested',
        message: `Return request submitted for order #${id}`
      })

      return returnInfo
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to request return'
      store.setError(message)
      throw error
    } finally {
      store.setLoading(false)
    }
  }

  const downloadInvoice = async (id: string) => {
    if (!orderService) {
      throw new Error('OrderService is required for downloading invoice')
    }

    try {
      const blob = await orderService.getOrderInvoice(id)
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `invoice-${id}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)

      uiStore.addNotification({
        type: 'success',
        title: 'Invoice Downloaded',
        message: `Invoice for order #${id} has been downloaded`
      })
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to download invoice'
      store.setError(message)
      throw error
    }
  }

  const canCancelOrder = (status: OrderStatus): boolean => {
    return ['pending', 'confirmed'].includes(status)
  }

  const canReturnOrder = (status: OrderStatus): boolean => {
    return ['delivered'].includes(status)
  }

  const canTrackOrder = (status: OrderStatus): boolean => {
    return ['confirmed', 'processing', 'shipped'].includes(status)
  }

  return {
    // State
    orders: store.orders,
    currentOrder: store.currentOrder,
    loading: store.loading,
    error: store.error,
    isCreatingOrder: store.isCreatingOrder,

    // Actions
    fetchOrders,
    fetchOrder,
    createOrder,
    updateOrderStatus,
    cancelOrder,
    trackOrder,
    requestReturn,
    downloadInvoice,
    clearError: store.clearError,

    // Utilities
    canCancelOrder,
    canReturnOrder,
    canTrackOrder
  }
}