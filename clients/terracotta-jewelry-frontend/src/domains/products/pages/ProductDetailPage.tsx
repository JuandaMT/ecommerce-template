import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  Container,
  Typography,
  Box,
  Grid,
  Button,
  Paper,
  Chip,
  IconButton,
  Alert,
  Divider,
  Card,
  CardMedia,
  Rating
} from '@mui/material'
import {
  Add,
  Remove,
  ShoppingCart,
  ArrowBack,
  Favorite,
  FavoriteBorder,
  Share,
  LocalShipping
} from '@mui/icons-material'
import { useCartStore } from '@ecommerce/shared-services'

export const ProductDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>()
  const { addToCart } = useCartStore()
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)

  // Mock product data (in a real app, this would come from an API)
  const product = {
    id: productId || '1',
    name: 'Collar Artesanal Terracota Étnico',
    price: 85000,
    originalPrice: 120000,
    description: 'Hermoso collar artesanal elaborado en terracota con diseños étnicos únicos. Cada pieza es creada a mano por artesanos locales, garantizando la autenticidad y calidad de nuestros productos.',
    category: 'Collares',
    inStock: true,
    stockQuantity: 15,
    rating: 4.8,
    reviews: 24,
    images: [
      '/images/collar1.jpg',
      '/images/collar1-2.jpg',
      '/images/collar1-3.jpg',
      '/images/collar1-4.jpg'
    ],
    features: [
      'Material: Terracota natural',
      'Diseño étnico único',
      'Hecho a mano',
      'Acabado artesanal',
      'Longitud ajustable'
    ],
    specifications: {
      'Material': 'Terracota',
      'Longitud': '45-50 cm ajustable',
      'Peso': '25g',
      'Origen': 'Colombia',
      'Cuidado': 'Limpiar con paño seco'
    }
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0]
      })
    }
    // Show success feedback (in a real app, you might use a toast notification)
    alert(`${quantity} ${product.name} agregado al carrito`)
  }

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change
    if (newQuantity >= 1 && newQuantity <= product.stockQuantity) {
      setQuantity(newQuantity)
    }
  }

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button
        startIcon={<ArrowBack />}
        onClick={() => window.history.back()}
        sx={{ mb: 3 }}
      >
        Volver a Productos
      </Button>

      <Grid container spacing={4}>
        {/* Product Images */}
        <Grid item xs={12} md={6}>
          <Box>
            <Card>
              <CardMedia
                component="img"
                height="400"
                image={product.images[selectedImage]}
                alt={product.name}
                sx={{ objectFit: 'cover' }}
              />
            </Card>

            <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
              {product.images.map((image, index) => (
                <Card
                  key={index}
                  sx={{
                    cursor: 'pointer',
                    border: selectedImage === index ? 2 : 1,
                    borderColor: selectedImage === index ? 'primary.main' : 'grey.300'
                  }}
                  onClick={() => setSelectedImage(index)}
                >
                  <CardMedia
                    component="img"
                    height="80"
                    width="80"
                    image={image}
                    alt={`${product.name} ${index + 1}`}
                  />
                </Card>
              ))}
            </Box>
          </Box>
        </Grid>

        {/* Product Information */}
        <Grid item xs={12} md={6}>
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
              <Box>
                <Chip label={product.category} size="small" sx={{ mb: 1 }} />
                <Typography variant="h4" gutterBottom>
                  {product.name}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <IconButton onClick={() => setIsFavorite(!isFavorite)}>
                  {isFavorite ? <Favorite color="error" /> : <FavoriteBorder />}
                </IconButton>
                <IconButton>
                  <Share />
                </IconButton>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Rating value={product.rating} precision={0.1} readOnly size="small" />
              <Typography variant="body2" sx={{ ml: 1 }}>
                ({product.reviews} reseñas)
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <Typography variant="h5" color="primary" fontWeight="bold">
                ${product.price.toLocaleString()}
              </Typography>
              {discount > 0 && (
                <>
                  <Typography
                    variant="body1"
                    sx={{ textDecoration: 'line-through', color: 'text.secondary' }}
                  >
                    ${product.originalPrice.toLocaleString()}
                  </Typography>
                  <Chip
                    label={`-${discount}%`}
                    color="error"
                    size="small"
                  />
                </>
              )}
            </Box>

            <Typography variant="body1" paragraph>
              {product.description}
            </Typography>

            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Características:
              </Typography>
              <Box component="ul" sx={{ pl: 2 }}>
                {product.features.map((feature, index) => (
                  <Typography component="li" variant="body2" key={index} sx={{ mb: 0.5 }}>
                    {feature}
                  </Typography>
                ))}
              </Box>
            </Box>

            {product.inStock ? (
              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" color="success.main" gutterBottom>
                   En stock ({product.stockQuantity} disponibles)
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Typography variant="body1">Cantidad:</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', border: 1, borderColor: 'grey.300', borderRadius: 1 }}>
                    <IconButton
                      size="small"
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                    >
                      <Remove />
                    </IconButton>
                    <Typography sx={{ px: 2, minWidth: 40, textAlign: 'center' }}>
                      {quantity}
                    </Typography>
                    <IconButton
                      size="small"
                      onClick={() => handleQuantityChange(1)}
                      disabled={quantity >= product.stockQuantity}
                    >
                      <Add />
                    </IconButton>
                  </Box>
                </Box>

                <Button
                  variant="contained"
                  size="large"
                  startIcon={<ShoppingCart />}
                  onClick={handleAddToCart}
                  fullWidth
                  sx={{ mb: 2 }}
                >
                  Agregar al Carrito - ${(product.price * quantity).toLocaleString()}
                </Button>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LocalShipping color="primary" />
                  <Typography variant="body2">
                    Envío gratis en compras superiores a $150.000
                  </Typography>
                </Box>
              </Box>
            ) : (
              <Alert severity="error" sx={{ mb: 3 }}>
                Producto agotado
              </Alert>
            )}
          </Box>
        </Grid>
      </Grid>

      {/* Product Specifications */}
      <Paper sx={{ p: 3, mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Especificaciones Técnicas
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={2}>
          {Object.entries(product.specifications).map(([key, value]) => (
            <Grid item xs={12} sm={6} key={key}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" fontWeight="medium">
                  {key}:
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {value}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Container>
  )
}