import { useAuth } from '@ecommerce/shared-services'
import { authService } from '../../../config/api.config'

export const useAuthIntegration = () => {
  return useAuth(authService)
}