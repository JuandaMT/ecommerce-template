import { useProducts } from '@ecommerce/shared-services'
import { productService } from '../../../config/api.config.js'

export const useProductsIntegration = () => {
  return useProducts(productService)
}