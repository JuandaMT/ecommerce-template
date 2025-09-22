import { ApiClient, AuthService, ProductService, OrderService } from '@ecommerce/shared-services'
import { clientConfig } from './client.config'

// Create API client with client-specific configuration
export const apiClient = new ApiClient({
  baseURL: clientConfig.apiBaseUrl,
  timeout: 10000,
  headers: {
    'X-Client-ID': clientConfig.clientId
  }
})

// Create service instances
export const authService = new AuthService(apiClient)
export const productService = new ProductService(apiClient)
export const orderService = new OrderService(apiClient)