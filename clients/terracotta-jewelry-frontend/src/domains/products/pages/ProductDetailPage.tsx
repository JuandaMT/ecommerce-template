import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  Container,
  Typography,
  Box,
  Grid2,
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
import { useCartStore } from '../../../shared/stores/cartStore'

export const ProductDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>()
  const { addItem } = useCartStore()
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)

  // Mock product data (in a real app, this would come from an API)
  const product = {
    id: productId || '1',
    name: 'Collar Artesanal Terracota �tnico',
    price: 85000,
    originalPrice: 120000,
    description: 'Hermoso collar artesanal elaborado en terracota con dise�os �tnicos �nicos. Cada pieza es creada a mano por artesanos locales, garantizando la autenticidad y calidad de nuestros productos.',
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
      'Dise�o �tnico �nico',
      'Hecho a mano',
      'Acabado artesanal',
      'Longitud ajustable'
    ],
    specifications: {
      'Material': 'Terracota',
      'Longitud': '45-50 cm ajustable',
      'Peso': '25g',
      'Origen': 'Colombia',
      'Cuidado': 'Limpiar con pa�o seco'
    }
  }

  const handleAddToCart = () => {
    const productToAdd = {
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.images[0],
      description: product.description,
      category: product.category,
      stock: product.stockQuantity
    }

    for (let i = 0; i < quantity; i++) {
      addItem(productToAdd)
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
    <Box component="main" sx={{ backgroundColor: '#FEFEFE', minHeight: '100vh' }}>
      <Container maxWidth="lg" sx={{ py: { xs: 3, md: 6 } }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => window.history.back()}
          sx={{
            mb: 4,
            color: '#332E29',
            fontWeight: 500,
            '&:hover': {
              backgroundColor: '#F8F6F3',
            }
          }}
        >
          Volver a Productos
        </Button>

        <Grid2 container spacing={{ xs: 3, md: 6 }}>
          {/* Product Images */}
          <Grid2 size={{ xs: 12, md: 6 }}>
            <Box>
              <Card
                sx={{
                  borderRadius: '16px',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                  border: '1px solid #F0F0F0',
                }}
              >
                <CardMedia
                  component="img"
                  height="500"
                  image={product.images[selectedImage]}
                  alt={product.name}
                  sx={{
                    objectFit: 'cover',
                    backgroundColor: '#F8F6F3'
                  }}
                />
              </Card>

              <Box sx={{ display: 'flex', gap: 2, mt: 3, justifyContent: 'center' }}>
                {product.images.map((image, index) => (
                  <Card
                    key={index}
                    sx={{
                      cursor: 'pointer',
                      border: selectedImage === index ? '2px solid #968679' : '1px solid #E8DDD4',
                      borderRadius: '12px',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 8px 20px rgba(150, 134, 121, 0.2)',
                      }
                    }}
                    onClick={() => setSelectedImage(index)}
                  >
                    <CardMedia
                      component="img"
                      height="80"
                      width="80"
                      image={image}
                      alt={`${product.name} ${index + 1}`}
                      sx={{
                        objectFit: 'cover',
                        backgroundColor: '#F8F6F3'
                      }}
                    />
                  </Card>
                ))}
              </Box>
            </Box>
          </Grid2>

          {/* Product Information */}
          <Grid2 size={{ xs: 12, md: 6 }}>
            <Box sx={{ pl: { xs: 0, md: 2 } }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
                <Box>
                  <Chip
                    label={product.category}
                    size="small"
                    sx={{
                      mb: 2,
                      backgroundColor: '#F8F6F3',
                      color: '#968679',
                      border: '1px solid #E8DDD4',
                      fontWeight: 500,
                      fontSize: '12px'
                    }}
                  />
                  <Typography
                    variant="h3"
                    gutterBottom
                    sx={{
                      fontSize: { xs: '28px', md: '36px' },
                      fontWeight: 300,
                      color: '#1A1A1A',
                      letterSpacing: '0.02em',
                      fontFamily: '"Playfair Display", serif',
                      lineHeight: 1.2
                    }}
                  >
                    {product.name}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <IconButton
                    onClick={() => setIsFavorite(!isFavorite)}
                    sx={{
                      color: isFavorite ? '#968679' : '#888888',
                      '&:hover': {
                        backgroundColor: '#F8F6F3'
                      }
                    }}
                  >
                    {isFavorite ? <Favorite /> : <FavoriteBorder />}
                  </IconButton>
                  <IconButton
                    sx={{
                      color: '#888888',
                      '&:hover': {
                        backgroundColor: '#F8F6F3'
                      }
                    }}
                  >
                    <Share />
                  </IconButton>
                </Box>
              </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Rating
                  value={product.rating}
                  precision={0.1}
                  readOnly
                  size="small"
                  sx={{
                    color: '#968679',
                    '& .MuiRating-iconEmpty': {
                      color: '#E8DDD4'
                    }
                  }}
                />
                <Typography variant="body2" sx={{ ml: 1, color: '#666666', fontSize: '14px' }}>
                ({product.reviews} rese�as)
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Typography
                  variant="h4"
                  sx={{
                    color: '#332E29',
                    fontWeight: 600,
                    fontSize: { xs: '28px', md: '32px' }
                  }}
                >
                ${product.price.toLocaleString()}
              </Typography>
              {discount > 0 && (
                <>
                  <Typography
                    variant="body1"
                    sx={{
                        textDecoration: 'line-through',
                        color: '#888888',
                        fontSize: '18px'
                      }}
                  >
                    ${product.originalPrice.toLocaleString()}
                  </Typography>
                  <Chip
                    label={`-${discount}%`}
                    sx={{
                      backgroundColor: '#968679',
                      color: '#FFF',
                      fontWeight: 500,
                      fontSize: '12px'
                    }}
                    size="small"
                  />
                </>
              )}
            </Box>

              <Typography
                variant="body1"
                sx={{
                  color: '#666666',
                  fontSize: '16px',
                  lineHeight: 1.7,
                  mb: 4
                }}
              >
              {product.description}
            </Typography>

            <Box sx={{ mb: 3 }}>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    color: '#332E29',
                    fontSize: '18px',
                    fontWeight: 600,
                    mb: 2
                  }}
                >
                Caracter�sticas:
              </Typography>
              <Box component="ul" sx={{ pl: 2 }}>
                {product.features.map((feature, index) => (
                  <Typography
                    component="li"
                    variant="body2"
                    key={index}
                    sx={{
                      mb: 1,
                      color: '#666666',
                      fontSize: '14px'
                    }}
                  >
                    {feature}
                  </Typography>
                ))}
              </Box>
            </Box>

            {product.inStock ? (
              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="body2"
                  gutterBottom
                  sx={{
                    color: '#4CAF50',
                    fontSize: '14px',
                    fontWeight: 500,
                    mb: 3
                  }}
                >
                   En stock ({product.stockQuantity} disponibles)
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Typography
                    variant="body1"
                    sx={{
                      color: '#332E29',
                      fontSize: '16px',
                      fontWeight: 500
                    }}
                  >
                    Cantidad:
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      border: '1px solid #E8DDD4',
                      borderRadius: '8px',
                      backgroundColor: '#FEFEFE'
                    }}
                  >
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
                  sx={{
                    mb: 3,
                    mt: 3,
                    backgroundColor: '#332E29',
                    color: '#FFF',
                    py: 2,
                    fontSize: '16px',
                    fontWeight: 600,
                    borderRadius: '12px',
                    textTransform: 'none',
                    boxShadow: '0 4px 16px rgba(51, 46, 41, 0.2)',
                    '&:hover': {
                      backgroundColor: '#4A453E',
                      boxShadow: '0 6px 20px rgba(51, 46, 41, 0.3)',
                    }
                  }}
                >
                  Agregar al Carrito - ${(product.price * quantity).toLocaleString()}
                </Button>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LocalShipping sx={{ color: '#968679' }} />
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#666666',
                      fontSize: '14px'
                    }}
                  >
                    Env�o gratis en compras superiores a $150.000
                  </Typography>
                </Box>
              </Box>
            ) : (
              <Alert severity="error" sx={{ mb: 3 }}>
                Producto agotado
              </Alert>
            )}
          </Box>
          </Grid2>
        </Grid2>

      {/* Product Specifications */}
        <Paper
          sx={{
            p: 4,
            mt: 6,
            borderRadius: '16px',
            backgroundColor: '#FEFEFE',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            border: '1px solid #F0F0F0'
          }}
        >
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              color: '#332E29',
              fontSize: { xs: '20px', md: '24px' },
              fontWeight: 600,
              mb: 3
            }}
          >
          Especificaciones T�cnicas
        </Typography>
          <Divider sx={{ mb: 3, borderColor: '#E8DDD4' }} />
        <Grid2 container spacing={2}>
          {Object.entries(product.specifications).map(([key, value]) => (
            <Grid2 size={{ xs: 12, sm: 6 }} key={key}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 500,
                    color: '#332E29',
                    fontSize: '14px'
                  }}
                >
                  {key}:
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: '#666666',
                    fontSize: '14px'
                  }}
                >
                  {value}
                </Typography>
              </Box>
            </Grid2>
          ))}
        </Grid2>
        </Paper>
      </Container>
    </Box>
  )
}