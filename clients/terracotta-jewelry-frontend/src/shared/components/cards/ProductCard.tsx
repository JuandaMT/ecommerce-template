import { Card, CardMedia, CardContent, Typography, CardActions, Button, Snackbar, Alert, Box, Chip, IconButton } from '@mui/material';
import { AddShoppingCart, Check, FavoriteBorder, Favorite, Visibility } from '@mui/icons-material';
import { useState } from 'react';
import { Product } from '@ecommerce/shared-services';
import { useCartMock } from '../../hooks/useCartMock';
import { useNavigate } from 'react-router-dom';

interface Props {
  product: Product;
}

export const ProductCard = ({ product }: Props) => {
  const { addToCart } = useCartMock();
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAdding(true);
    try {
      addToCart(product);
      setShowSuccess(true);

      setTimeout(() => {
        setIsAdding(false);
      }, 300);
    } catch (error) {
      console.error('Error adding to cart:', error);
      setIsAdding(false);
    }
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const handleViewProduct = () => {
    navigate(`/productos/${product._id}`);
  };

  const handleCloseSnackbar = () => {
    setShowSuccess(false);
  };

  return (
    <>
      <Card
        onClick={handleViewProduct}
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          borderRadius: '16px',
          overflow: 'hidden',
          backgroundColor: '#FFF',
          boxShadow: '0 4px 20px rgba(51, 46, 41, 0.1)',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          cursor: 'pointer',
          '&:hover': {
            transform: 'translateY(-8px) scale(1.02)',
            boxShadow: '0 12px 40px rgba(51, 46, 41, 0.2)',
            '& .product-image': {
              transform: 'scale(1.05)'
            },
            '& .product-overlay': {
              opacity: 1
            }
          }
        }}
      >
        {/* Image Container */}
        <Box sx={{ position: 'relative', overflow: 'hidden' }}>
          <CardMedia
            className="product-image"
            component="img"
            height="240"
            image={product.imageUrl}
            alt={product.name}
            sx={{
              objectFit: 'cover',
              transition: 'transform 0.4s ease'
            }}
          />

          {/* Overlay with quick actions */}
          <Box
            className="product-overlay"
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(51, 46, 41, 0.4) 100%)',
              opacity: 0,
              transition: 'opacity 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <IconButton
              onClick={handleToggleFavorite}
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                color: isFavorite ? '#D4A574' : '#968679',
                backdropFilter: 'blur(10px)',
                mr: 1,
                '&:hover': {
                  backgroundColor: '#FFF',
                  transform: 'scale(1.1)'
                }
              }}
            >
              {isFavorite ? <Favorite /> : <FavoriteBorder />}
            </IconButton>
            <IconButton
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                color: '#968679',
                backdropFilter: 'blur(10px)',
                '&:hover': {
                  backgroundColor: '#FFF',
                  transform: 'scale(1.1)'
                }
              }}
            >
              <Visibility />
            </IconButton>
          </Box>

          {/* Stock Badge */}
          {product.stock <= 5 && product.stock > 0 && (
            <Chip
              label={`¡Solo ${product.stock}!`}
              size="small"
              sx={{
                position: 'absolute',
                top: 12,
                left: 12,
                backgroundColor: '#D4A574',
                color: '#332E29',
                fontWeight: 700,
                fontSize: '0.7rem'
              }}
            />
          )}

          {product.stock === 0 && (
            <Chip
              label="Sin Stock"
              size="small"
              sx={{
                position: 'absolute',
                top: 12,
                left: 12,
                backgroundColor: '#FF5252',
                color: '#FFF',
                fontWeight: 700,
                fontSize: '0.7rem'
              }}
            />
          )}

          {/* New Badge */}
          <Chip
            label="Nuevo"
            size="small"
            sx={{
              position: 'absolute',
              top: 12,
              right: 12,
              backgroundColor: '#968679',
              color: '#FFF',
              fontWeight: 700,
              fontSize: '0.7rem'
            }}
          />
        </Box>

        <CardContent sx={{
          flexGrow: 1,
          p: 3,
          backgroundColor: '#FAFAFA'
        }}>
          <Typography
            gutterBottom
            variant="h6"
            component="h3"
            sx={{
              fontSize: '1.1rem',
              fontWeight: 600,
              color: '#332E29',
              mb: 1,
              lineHeight: 1.3
            }}
          >
            {product.name}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: '#968679',
              mb: 2,
              lineHeight: 1.5,
              fontSize: '0.9rem'
            }}
          >
            {product.description}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 'auto' }}>
            <Typography
              variant="h6"
              component="p"
              sx={{
                color: '#D4A574',
                fontWeight: 900,
                fontSize: '1.3rem'
              }}
            >
              €{product.price.toFixed(2)}
            </Typography>

            <Typography
              variant="caption"
              sx={{
                color: '#968679',
                backgroundColor: 'rgba(212, 165, 116, 0.1)',
                px: 1,
                py: 0.5,
                borderRadius: '12px',
                fontSize: '0.75rem'
              }}
            >
              Artesanal
            </Typography>
          </Box>
        </CardContent>

        <CardActions sx={{ p: 3, pt: 0 }}>
          <Button
            fullWidth
            size="large"
            startIcon={isAdding ? <Check /> : <AddShoppingCart />}
            onClick={handleAddToCart}
            disabled={isAdding || product.stock === 0}
            variant={isAdding ? "contained" : "outlined"}
            sx={{
              borderRadius: '12px',
              py: 1.5,
              fontWeight: 700,
              fontSize: '0.9rem',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              border: '2px solid #D4A574',
              color: isAdding ? '#FFF' : '#D4A574',
              backgroundColor: isAdding ? '#4CAF50' : 'transparent',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                backgroundColor: isAdding ? '#4CAF50' : '#D4A574',
                color: '#FFF',
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 16px rgba(212, 165, 116, 0.4)'
              },
              '&:disabled': {
                backgroundColor: '#F5F5F5',
                color: '#BDBDBD',
                border: '2px solid #E0E0E0'
              }
            }}
          >
            {product.stock === 0
              ? 'Sin stock'
              : isAdding
                ? '¡Agregado!'
                : 'Añadir al carrito'
            }
          </Button>
        </CardActions>
      </Card>

      <Snackbar
        open={showSuccess}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{
            width: '100%',
            backgroundColor: '#D4A574',
            color: '#332E29',
            '& .MuiAlert-icon': {
              color: '#332E29'
            }
          }}
        >
          ¡{product.name} agregado al carrito!
        </Alert>
      </Snackbar>
    </>
  );
};