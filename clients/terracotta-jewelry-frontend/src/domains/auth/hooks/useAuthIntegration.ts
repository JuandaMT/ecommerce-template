import { useAuth } from '@ecommerce/shared-services'
import { authService } from '../../../config/api.config.js'

export const useAuthIntegration = () => {
  return useAuth(authService)
}