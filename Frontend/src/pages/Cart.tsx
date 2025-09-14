import {
  Box,
  Typography,
  Container,
  Grid2,
  Card,
  CardMedia,
  IconButton,
  Button,
  Divider,
  Chip,
  Paper,
  Alert
} from '@mui/material'
import { Add, Remove, Delete, ShoppingCart, ArrowBack } from '@mui/icons-material'
import { useCart } from '../contexts/CartContext'
import { Link } from 'react-router-dom'

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart()

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId)
    } else {
      updateQuantity(productId, newQuantity)
    }
  }

  if (cart.items.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '60vh',
            textAlign: 'center',
          }}
        >
          <ShoppingCart sx={{ fontSize: 120, color: 'text.secondary', mb: 3 }} />
          <Typography variant="h4" gutterBottom>
            Tu carrito está vacío
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 400 }}>
            Parece que no has agregado ningún producto a tu carrito. ¡Explora nuestra colección de terracota artesanal!
          </Typography>
          <Button
            variant="contained"
            size="large"
            component={Link}
            to="/productos"
            startIcon={<ArrowBack />}
            sx={{ borderRadius: 2, px: 4 }}
          >
            Continuar Comprando
          </Button>
        </Box>
      </Container>
    )
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" gutterBottom sx={{ mb: 1 }}>
          Tu Carrito de Compras
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {cart.totalItems} producto{cart.totalItems !== 1 ? 's' : ''} en tu carrito
        </Typography>
      </Box>

      <Grid2 container spacing={4}>
        {/* Cart Items */}
        <Grid2 size={{ xs: 12, lg: 8 }}>
          <Box sx={{ mb: 3 }}>
            {cart.items.map((item, index) => (
              <Card key={item.product._id} sx={{ mb: 2, p: 2 }}>
                <Grid2 container spacing={2} alignItems="center">
                  {/* Product Image */}
                  <Grid2 size={{ xs: 12, sm: 3, md: 2 }}>
                    <CardMedia
                      component="img"
                      height="120"
                      image={item.product.imageUrl}
                      alt={item.product.name}
                      sx={{ borderRadius: 2, objectFit: 'cover' }}
                    />
                  </Grid2>

                  {/* Product Info */}
                  <Grid2 size={{ xs: 12, sm: 6, md: 7 }}>
                    <Typography variant="h6" gutterBottom>
                      {item.product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {item.product.description}
                    </Typography>
                    <Typography variant="h6" color="primary.main" sx={{ fontWeight: 'bold' }}>
                      ${item.product.price.toFixed(2)}
                    </Typography>
                  </Grid2>

                  {/* Quantity Controls & Remove */}
                  <Grid2 size={{ xs: 12, sm: 3, md: 3 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                      {/* Quantity Controls */}
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <IconButton
                          onClick={() => handleQuantityChange(item.product._id, item.quantity - 1)}
                          color="primary"
                          sx={{ border: '1px solid', borderColor: 'primary.main' }}
                        >
                          <Remove />
                        </IconButton>
                        <Chip
                          label={item.quantity}
                          sx={{
                            minWidth: 50,
                            fontWeight: 'bold',
                            fontSize: '1rem',
                            backgroundColor: 'primary.main',
                            color: 'primary.contrastText'
                          }}
                        />
                        <IconButton
                          onClick={() => handleQuantityChange(item.product._id, item.quantity + 1)}
                          color="primary"
                          sx={{ border: '1px solid', borderColor: 'primary.main' }}
                        >
                          <Add />
                        </IconButton>
                      </Box>

                      {/* Subtotal */}
                      <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </Typography>

                      {/* Remove Button */}
                      <Button
                        variant="text"
                        color="error"
                        startIcon={<Delete />}
                        onClick={() => removeFromCart(item.product._id)}
                        size="small"
                      >
                        Eliminar
                      </Button>
                    </Box>
                  </Grid2>
                </Grid2>
              </Card>
            ))}

            {/* Clear Cart Button */}
            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant="outlined"
                color="error"
                onClick={clearCart}
                startIcon={<Delete />}
              >
                Vaciar Carrito
              </Button>
            </Box>
          </Box>
        </Grid2>

        {/* Order Summary */}
        <Grid2 size={{ xs: 12, lg: 4 }}>
          <Paper sx={{ p: 3, position: 'sticky', top: 100 }}>
            <Typography variant="h5" gutterBottom>
              Resumen del Pedido
            </Typography>

            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body1">
                  Subtotal ({cart.totalItems} productos)
                </Typography>
                <Typography variant="body1">
                  ${cart.totalPrice.toFixed(2)}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body1">Envío</Typography>
                <Typography variant="body1" color="success.main">
                  Gratis
                </Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6">Total</Typography>
                <Typography variant="h6" color="primary.main" sx={{ fontWeight: 'bold' }}>
                  ${cart.totalPrice.toFixed(2)}
                </Typography>
              </Box>
            </Box>

            <Alert severity="info" sx={{ mb: 3 }}>
              ¡Envío gratis en todos los pedidos de terracota artesanal!
            </Alert>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Button
                variant="contained"
                size="large"
                fullWidth
                sx={{ borderRadius: 2, py: 1.5 }}
                onClick={() => {
                  // TODO: Implementar checkout
                  console.log('Proceder al checkout')
                }}
              >
                Proceder al Checkout
              </Button>

              <Button
                variant="outlined"
                size="large"
                fullWidth
                component={Link}
                to="/productos"
                sx={{ borderRadius: 2 }}
              >
                Continuar Comprando
              </Button>
            </Box>

            {/* Trust Badges */}
            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Typography variant="caption" color="text.secondary">
                ✓ Pago seguro  ✓ Envío gratuito  ✓ Garantía de calidad
              </Typography>
            </Box>
          </Paper>
        </Grid2>
      </Grid2>
    </Container>
  )
}

export default Cart