import { useProducts } from '@ecommerce/shared-services'
import { productService } from '../../../config/api.config'

export const useProductsIntegration = () => {
  return useProducts(productService)
}