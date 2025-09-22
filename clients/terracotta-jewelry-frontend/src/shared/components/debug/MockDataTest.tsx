import React from 'react'
import { Box, Typography, Card, CardContent } from '@mui/material'
import { useProductsIntegration } from '../../../domains/products/hooks/useProductsIntegration'
import { useCartMock } from '../../hooks/useCartMock'

export const MockDataTest = () => {
  const { products, loading } = useProductsIntegration()
  const { cartSummary } = useCartMock()

  return (
    <Box sx={{ p: 2, mb: 2, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
      <Typography variant="h6" gutterBottom>
        🧪 Estado de Datos Mock
      </Typography>

      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="subtitle1" color="primary">
            📦 Productos
          </Typography>
          <Typography variant="body2">
            {loading ? 'Cargando...' : `${products.length} productos cargados`}
          </Typography>
          {products.length > 0 && (
            <Typography variant="caption" color="text.secondary">
              Primeros productos: {products.slice(0, 3).map(p => p.name).join(', ')}
            </Typography>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="subtitle1" color="primary">
            🛒 Carrito
          </Typography>
          <Typography variant="body2">
            {cartSummary.itemCount} items - ${cartSummary.total.toFixed(2)}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  )
}