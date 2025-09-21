import React from 'react'
import {
  Container,
  Typography,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
  Alert
} from '@mui/material'
import { Receipt, Visibility } from '@mui/icons-material'

export const OrdersPage: React.FC = () => {
  // Mock orders data (in a real app, this would come from an API)
  const orders = [
    {
      id: 'ORD-001',
      date: '2023-12-15',
      status: 'delivered',
      total: 190000,
      items: 3
    },
    {
      id: 'ORD-002',
      date: '2023-12-10',
      status: 'shipped',
      total: 125000,
      items: 2
    },
    {
      id: 'ORD-003',
      date: '2023-12-05',
      status: 'processing',
      total: 85000,
      items: 1
    },
    {
      id: 'ORD-004',
      date: '2023-11-28',
      status: 'delivered',
      total: 340000,
      items: 5
    }
  ]

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

  const handleViewOrder = (orderId: string) => {
    window.location.href = `/pedidos/${orderId}`
  }

  if (orders.length === 0) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>
          Mis Pedidos
        </Typography>
        <Alert severity="info">
          No tienes pedidos aún. <a href="/productos">¡Explora nuestros productos!</a>
        </Alert>
      </Container>
    )
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <Receipt sx={{ mr: 2, fontSize: 32, color: 'primary.main' }} />
        <Typography variant="h4">
          Mis Pedidos
        </Typography>
      </Box>

      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight="bold">
                    Número de Pedido
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight="bold">
                    Fecha
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight="bold">
                    Estado
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight="bold">
                    Productos
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight="bold">
                    Total
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight="bold">
                    Acciones
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id} hover>
                  <TableCell>
                    <Typography variant="body2" fontWeight="medium">
                      {order.id}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {new Date(order.date).toLocaleDateString('es-CO')}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={getStatusText(order.status)}
                      color={getStatusColor(order.status) as any}
                      size="small"
                      variant="filled"
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {order.items} {order.items === 1 ? 'producto' : 'productos'}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" fontWeight="medium">
                      ${order.total.toLocaleString()}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Button
                      size="small"
                      variant="outlined"
                      startIcon={<Visibility />}
                      onClick={() => handleViewOrder(order.id)}
                    >
                      Ver Detalles
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Box sx={{ mt: 3, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          ¿Necesitas ayuda con tu pedido?{' '}
          <Button variant="text" size="small">
            Contacta Soporte
          </Button>
        </Typography>
      </Box>
    </Container>
  )
}