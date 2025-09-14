import { Card, CardMedia, CardContent, Typography, CardActions, Button, Snackbar, Alert } from '@mui/material';
import { AddShoppingCart, Check } from '@mui/icons-material';
import { useState } from 'react';
import { Product } from '../../../types/Product';
import { useCart } from '../../../contexts/CartContext';

interface Props {
  product: Product;
}

export const ProductCard = ({ product }: Props) => {
  const { addToCart } = useCart();
  const [showSuccess, setShowSuccess] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);
    try {
      addToCart(product);
      setShowSuccess(true);

      // Pequeña animación de feedback
      setTimeout(() => {
        setIsAdding(false);
      }, 300);
    } catch (error) {
      console.error('Error adding to cart:', error);
      setIsAdding(false);
    }
  };

  const handleCloseSnackbar = () => {
    setShowSuccess(false);
  };

  return (
    <>
      <Card sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
        }
      }}>
        <CardMedia
          component="img"
          height="200"
          image={product.imageUrl}
          alt={product.name}
          sx={{ objectFit: 'cover' }}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="h2" sx={{ fontSize: '1.1rem' }}>
            {product.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {product.description}
          </Typography>
          <Typography variant="h6" component="p" sx={{
            color: 'primary.main',
            fontWeight: 'bold',
            fontSize: '1.2rem'
          }}>
            ${product.price.toFixed(2)}
          </Typography>
          {product.stock <= 5 && (
            <Typography variant="caption" color="warning.main" sx={{ mt: 1, display: 'block' }}>
              ¡Solo quedan {product.stock} disponibles!
            </Typography>
          )}
        </CardContent>
        <CardActions>
          <Button
            size="small"
            startIcon={isAdding ? <Check /> : <AddShoppingCart />}
            onClick={handleAddToCart}
            disabled={isAdding || product.stock === 0}
            variant={isAdding ? "contained" : "outlined"}
            sx={{
              width: '100%',
              transition: 'all 0.3s ease',
              backgroundColor: isAdding ? 'success.main' : 'transparent',
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
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          ¡{product.name} agregado al carrito!
        </Alert>
      </Snackbar>
    </>
  );
};