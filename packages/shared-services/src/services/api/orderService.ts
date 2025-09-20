import { ApiClient } from './apiClient'
import { Order, OrderSummary, CreateOrderData, OrderStatus } from '../../types/order.types'

export class OrderService {
  constructor(private apiClient: ApiClient) {}

  async createOrder(data: CreateOrderData): Promise<Order> {
    return this.apiClient.post<Order>('/orders', data)
  }

  async getOrders(page: number = 1, limit: number = 10): Promise<{
    orders: OrderSummary[]
    total: number
    page: number
    totalPages: number
  }> {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString()
    })

    return this.apiClient.get<{
      orders: OrderSummary[]
      total: number
      page: number
      totalPages: number
    }>(`/orders?${params.toString()}`)
  }

  async getOrder(id: string): Promise<Order> {
    return this.apiClient.get<Order>(`/orders/${id}`)
  }

  async updateOrderStatus(id: string, status: OrderStatus): Promise<Order> {
    return this.apiClient.patch<Order>(`/orders/${id}/status`, { status })
  }

  async cancelOrder(id: string, reason?: string): Promise<Order> {
    return this.apiClient.patch<Order>(`/orders/${id}/cancel`, { reason })
  }

  async trackOrder(id: string): Promise<{
    order: Order
    tracking: {
      status: OrderStatus
      updates: Array<{
        status: OrderStatus
        timestamp: string
        location?: string
        note?: string
      }>
    }
  }> {
    return this.apiClient.get(`/orders/${id}/tracking`)
  }

  async requestReturn(id: string, reason: string, items?: string[]): Promise<{
    returnId: string
    status: string
  }> {
    return this.apiClient.post(`/orders/${id}/return`, {
      reason,
      items
    })
  }

  async getOrderInvoice(id: string): Promise<Blob> {
    const response = await this.apiClient.get(`/orders/${id}/invoice`, {
      responseType: 'blob'
    })
    return response as unknown as Blob
  }

  // Admin methods
  async getAllOrders(
    page: number = 1,
    limit: number = 20,
    status?: OrderStatus
  ): Promise<{
    orders: Order[]
    total: number
    page: number
    totalPages: number
  }> {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString()
    })

    if (status) {
      params.append('status', status)
    }

    return this.apiClient.get<{
      orders: Order[]
      total: number
      page: number
      totalPages: number
    }>(`/admin/orders?${params.toString()}`)
  }

  async updateOrderTracking(
    id: string,
    trackingNumber: string,
    carrier?: string
  ): Promise<Order> {
    return this.apiClient.patch<Order>(`/admin/orders/${id}/tracking`, {
      trackingNumber,
      carrier
    })
  }
}