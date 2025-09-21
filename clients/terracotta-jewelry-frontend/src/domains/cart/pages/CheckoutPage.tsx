import React, { useState } from 'react'
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  TextField,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Alert
} from '@mui/material'
import { useCartStore } from '@ecommerce/shared-services'
import { CreditCard, LocalShipping } from '@mui/icons-material'

export const CheckoutPage: React.FC = () => {
  const { items, totalPrice, clearCart } = useCartStore()
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'Colombia',
    paymentMethod: 'credit_card'
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simular proceso de pago
    alert('¡Pedido realizado con éxito! (Simulación)')
    clearCart()
    window.location.href = '/pedidos'
  }

  if (items.length === 0) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="info">
          Tu carrito está vacío. <a href="/productos">Ver productos</a>
        </Alert>
      </Container>
    )
  }

  const shippingCost = 15000 // $15.000 COP
  const totalWithShipping = totalPrice + shippingCost

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Finalizar Compra
      </Typography>

      <Grid container spacing={4}>
        {/* Formulario de checkout */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <form onSubmit={handleSubmit}>
              <Typography variant="h6" gutterBottom>
                Información de Contacto
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Nombre"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Apellido"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </Grid>
              </Grid>

              <Box sx={{ mt: 3 }}>
                <Typography variant="h6" gutterBottom>
                  <LocalShipping sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Dirección de Envío
                </Typography>

                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Dirección"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Ciudad"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Código Postal"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      required
                    />
                  </Grid>
                </Grid>
              </Box>

              <Box sx={{ mt: 3 }}>
                <Typography variant="h6" gutterBottom>
                  <CreditCard sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Método de Pago
                </Typography>

                <FormControl component="fieldset">
                  <RadioGroup
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleInputChange}
                  >
                    <FormControlLabel
                      value="credit_card"
                      control={<Radio />}
                      label="Tarjeta de Crédito"
                    />
                    <FormControlLabel
                      value="pse"
                      control={<Radio />}
                      label="PSE"
                    />
                    <FormControlLabel
                      value="cash_on_delivery"
                      control={<Radio />}
                      label="Contra Entrega"
                    />
                  </RadioGroup>
                </FormControl>
              </Box>

              <Box sx={{ mt: 4 }}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  fullWidth
                  sx={{ py: 1.5 }}
                >
                  Realizar Pedido - ${totalWithShipping.toLocaleString()}
                </Button>
              </Box>
            </form>
          </Paper>
        </Grid>

        {/* Resumen del pedido */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, position: 'sticky', top: 20 }}>
            <Typography variant="h6" gutterBottom>
              Resumen del Pedido
            </Typography>

            <List dense>
              {items.map((item) => (
                <ListItem key={item.id} sx={{ px: 0 }}>
                  <ListItemText
                    primary={item.name}
                    secondary={`Cantidad: ${item.quantity}`}
                  />
                  <Typography variant="body2">
                    ${(item.price * item.quantity).toLocaleString()}
                  </Typography>
                </ListItem>
              ))}
            </List>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography>Subtotal:</Typography>
              <Typography>${totalPrice.toLocaleString()}</Typography>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography>Envío:</Typography>
              <Typography>${shippingCost.toLocaleString()}</Typography>
            </Box>

            <Divider sx={{ my: 1 }} />

            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h6">Total:</Typography>
              <Typography variant="h6">
                ${totalWithShipping.toLocaleString()}
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}