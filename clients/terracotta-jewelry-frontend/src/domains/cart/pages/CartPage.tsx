import React from 'react'
import { Container, Typography, Box, Paper, Button, Divider } from '@mui/material'
import { useCartStore } from '@ecommerce/shared-services'
import { ShoppingCartOutlined } from '@mui/icons-material'

export const CartPage: React.FC = () => {
  const { items, totalPrice, removeFromCart, updateQuantity, clearCart } = useCartStore()

  if (items.length === 0) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <ShoppingCartOutlined sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
          <Typography variant="h4" gutterBottom>
            Tu carrito está vacío
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            Explora nuestros productos y añade algunos a tu carrito
          </Typography>
          <Button
            variant="contained"
            href="/productos"
            sx={{ mt: 2 }}
          >
            Ver Productos
          </Button>
        </Paper>
      </Container>
    )
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Mi Carrito
      </Typography>

      <Paper sx={{ p: 3 }}>
        {items.map((item) => (
          <Box key={item.id} sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography variant="h6">{item.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  ${item.price} x {item.quantity}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  size="small"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  -
                </Button>
                <Typography sx={{ px: 2 }}>{item.quantity}</Typography>
                <Button
                  size="small"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </Button>
                <Button
                  size="small"
                  color="error"
                  onClick={() => removeFromCart(item.id)}
                >
                  Eliminar
                </Button>
              </Box>
            </Box>
            <Divider sx={{ mt: 2 }} />
          </Box>
        ))}

        <Box sx={{ mt: 3, textAlign: 'right' }}>
          <Typography variant="h5" gutterBottom>
            Total: ${totalPrice.toFixed(2)}
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button variant="outlined" onClick={clearCart}>
              Vaciar Carrito
            </Button>
            <Button variant="contained" href="/checkout">
              Proceder al Pago
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  )
}