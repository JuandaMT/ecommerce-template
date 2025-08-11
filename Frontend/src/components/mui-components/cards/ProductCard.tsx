import { Card, CardMedia, CardContent, Typography, CardActions, Button } from '@mui/material';
import { AddShoppingCart } from '@mui/icons-material';
import { Product } from '../../../types/Product';

interface Props {
  product: Product;
}

export const ProductCard = ({ product }: Props) => {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="200"
        image={product.imageUrl}
        alt={product.name}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="h2">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>
        <Typography variant="h6" component="p" sx={{ mt: 2 }}>
          ${product.price.toFixed(2)}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" startIcon={<AddShoppingCart />}>
          Añadir al carrito
        </Button>
      </CardActions>
    </Card>
  );
};