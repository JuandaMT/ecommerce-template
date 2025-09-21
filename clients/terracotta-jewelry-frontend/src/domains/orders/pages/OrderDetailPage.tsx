import React from 'react'
import { useParams } from 'react-router-dom'
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  Button,
  Alert
} from '@mui/material'
import { ArrowBack, LocalShipping, Receipt, CreditCard } from '@mui/icons-material'

export const OrderDetailPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>()

  // Mock order data (in a real app, this would come from an API)
  const order = {
    id: orderId || 'ORD-001',
    orderNumber: `ORD-${orderId || '001'}`,
    date: '2023-12-15',
    status: 'delivered',
    items: [
      {
        id: 1,
        name: 'Collar Artesanal Terracota',
        price: 85000,
        quantity: 1,
        image: '/images/collar1.jpg'
      },
      {
        id: 2,
        name: 'Aretes Colgantes Étnicos',
        price: 45000,
        quantity: 2,
        image: '/images/aretes1.jpg'
      }
    ],
    subtotal: 175000,
    shipping: 15000,
    total: 190000,
    shippingAddress: {
      name: 'María García',
      address: 'Calle 123 #45-67',
      city: 'Bogotá',
      postalCode: '110111',
      country: 'Colombia'
    },
    paymentMethod: 'Tarjeta de Crédito ****1234',
    trackingNumber: 'TRK123456789'
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'warning'
      case 'processing':
        return 'info'
      case 'shipped':
        return 'primary'
      case 'delivered':
        return 'success'
      case 'cancelled':
        return 'error'
      default:
        return 'default'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Pendiente'
      case 'processing':
        return 'Procesando'
      case 'shipped':
        return 'Enviado'
      case 'delivered':
        return 'Entregado'
      case 'cancelled':
        return 'Cancelado'
      default:
        return status
    }
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 3 }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => window.history.back()}
          sx={{ mb: 2 }}
        >
          Volver a Pedidos
        </Button>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h4">
            Pedido {order.orderNumber}
          </Typography>
          <Chip
            label={getStatusText(order.status)}
            color={getStatusColor(order.status) as any}
            variant="filled"
          />
        </Box>

        <Typography variant="body2" color="text.secondary">
          Pedido realizado el {new Date(order.date).toLocaleDateString('es-CO')}
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Order Details */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              <Receipt sx={{ mr: 1, verticalAlign: 'middle' }} />
              Productos
            </Typography>

            <List>
              {order.items.map((item) => (
                <ListItem key={item.id} sx={{ px: 0 }}>
                  <Box sx={{ display: 'flex', width: '100%', alignItems: 'center' }}>
                    <Box sx={{ flexGrow: 1 }}>
                      <ListItemText
                        primary={item.name}
                        secondary={`Cantidad: ${item.quantity}`}
                      />
                    </Box>
                    <Typography variant="body1" fontWeight="medium">
                      ${(item.price * item.quantity).toLocaleString()}
                    </Typography>
                  </Box>
                </ListItem>
              ))}
            </List>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography>Subtotal:</Typography>
              <Typography>${order.subtotal.toLocaleString()}</Typography>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography>Envío:</Typography>
              <Typography>${order.shipping.toLocaleString()}</Typography>
            </Box>

            <Divider sx={{ my: 1 }} />

            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h6">Total:</Typography>
              <Typography variant="h6">${order.total.toLocaleString()}</Typography>
            </Box>
          </Paper>

          {/* Shipping Status */}
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              <LocalShipping sx={{ mr: 1, verticalAlign: 'middle' }} />
              Estado del Envío
            </Typography>

            {order.status === 'delivered' ? (
              <Alert severity="success" sx={{ mb: 2 }}>
                ¡Tu pedido ha sido entregado exitosamente!
              </Alert>
            ) : order.status === 'shipped' ? (
              <Alert severity="info" sx={{ mb: 2 }}>
                Tu pedido está en camino
              </Alert>
            ) : (
              <Alert severity="warning" sx={{ mb: 2 }}>
                Tu pedido está siendo procesado
              </Alert>
            )}

            {order.trackingNumber && (
              <Typography variant="body2" color="text.secondary">
                Número de seguimiento: <strong>{order.trackingNumber}</strong>
              </Typography>
            )}
          </Paper>
        </Grid>

        {/* Order Summary */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Dirección de Envío
            </Typography>

            <Typography variant="body1" fontWeight="medium" gutterBottom>
              {order.shippingAddress.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {order.shippingAddress.address}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {order.shippingAddress.city}, {order.shippingAddress.postalCode}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {order.shippingAddress.country}
            </Typography>
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              <CreditCard sx={{ mr: 1, verticalAlign: 'middle' }} />
              Método de Pago
            </Typography>

            <Typography variant="body2" color="text.secondary">
              {order.paymentMethod}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}