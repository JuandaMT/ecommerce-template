import {
  Drawer,
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  Divider,
  Button,
  Avatar,
  Grid2,
  Chip
} from '@mui/material'
import { Close, Add, Remove, Delete, ShoppingCart } from '@mui/icons-material'
import { useCart } from '../../../../contexts/CartContext'
import { Link } from 'react-router-dom'

const CartDrawer = () => {
  const { cart, toggleCart, updateQuantity, removeFromCart } = useCart()

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId)
    } else {
      updateQuantity(productId, newQuantity)
    }
  }

  return (
    <Drawer
      anchor="right"
      open={cart.isOpen}
      onClose={toggleCart}
      sx={{
        '& .MuiDrawer-paper': {
          width: { xs: '100%', sm: 400 },
          maxWidth: '100vw',
        },
      }}
    >
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            p: 2,
            borderBottom: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <ShoppingCart />
            Mi Carrito ({cart.totalItems})
          </Typography>
          <IconButton onClick={toggleCart}>
            <Close />
          </IconButton>
        </Box>

        {/* Cart Items */}
        <Box sx={{ flex: 1, overflow: 'auto' }}>
          {cart.items.length === 0 ? (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                p: 3,
                textAlign: 'center',
              }}
            >
              <ShoppingCart sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Tu carrito está vacío
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Agrega algunos productos de terracota para comenzar
              </Typography>
              <Button
                variant="contained"
                component={Link}
                to="/productos"
                onClick={toggleCart}
                sx={{ borderRadius: 2 }}
              >
                Explorar Productos
              </Button>
            </Box>
          ) : (
            <List sx={{ p: 0 }}>
              {cart.items.map((item, index) => (
                <Box key={item.product._id}>
                  <ListItem sx={{ p: 2 }}>
                    <Grid2 container spacing={2} width="100%">
                      {/* Product Image */}
                      <Grid2 size={3}>
                        <Avatar
                          variant="rounded"
                          src={item.product.imageUrl}
                          alt={item.product.name}
                          sx={{ width: 60, height: 60 }}
                        />
                      </Grid2>

                      {/* Product Info */}
                      <Grid2 size={9}>
                        <Box>
                          <Typography variant="subtitle2" sx={{ mb: 0.5, fontSize: '0.9rem' }}>
                            {item.product.name}
                          </Typography>
                          <Typography variant="body2" color="primary.main" sx={{ fontWeight: 'bold' }}>
                            ${item.product.price.toFixed(2)}
                          </Typography>

                          {/* Quantity Controls */}
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              mt: 1,
                            }}
                          >
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                              <IconButton
                                size="small"
                                onClick={() => handleQuantityChange(item.product._id, item.quantity - 1)}
                                sx={{ width: 28, height: 28 }}
                              >
                                <Remove fontSize="small" />
                              </IconButton>
                              <Chip
                                label={item.quantity}
                                size="small"
                                sx={{ minWidth: 40, fontSize: '0.75rem' }}
                              />
                              <IconButton
                                size="small"
                                onClick={() => handleQuantityChange(item.product._id, item.quantity + 1)}
                                sx={{ width: 28, height: 28 }}
                              >
                                <Add fontSize="small" />
                              </IconButton>
                            </Box>

                            <IconButton
                              size="small"
                              onClick={() => removeFromCart(item.product._id)}
                              color="error"
                            >
                              <Delete fontSize="small" />
                            </IconButton>
                          </Box>

                          {/* Subtotal */}
                          <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                            Subtotal: ${(item.product.price * item.quantity).toFixed(2)}
                          </Typography>
                        </Box>
                      </Grid2>
                    </Grid2>
                  </ListItem>
                  {index < cart.items.length - 1 && <Divider />}
                </Box>
              ))}
            </List>
          )}
        </Box>

        {/* Footer */}
        {cart.items.length > 0 && (
          <Box sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider' }}>
            {/* Total */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Total:</Typography>
              <Typography variant="h6" color="primary.main" sx={{ fontWeight: 'bold' }}>
                ${cart.totalPrice.toFixed(2)}
              </Typography>
            </Box>

            {/* Action Buttons */}
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant="outlined"
                component={Link}
                to="/carrito"
                onClick={toggleCart}
                sx={{ flex: 1, borderRadius: 2 }}
              >
                Ver Carrito
              </Button>
              <Button
                variant="contained"
                sx={{ flex: 1, borderRadius: 2 }}
                onClick={() => {
                  // TODO: Implementar checkout
                  console.log('Proceder al checkout')
                }}
              >
                Checkout
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Drawer>
  )
}

export default CartDrawer