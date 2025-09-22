import { useProductsMock } from './useProductsMock'

// Usar datos mock en lugar del servicio real
export const useProductsIntegration = () => {
  return useProductsMock()
}