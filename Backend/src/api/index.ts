import { Router } from 'express';
import { getProducts } from '../controllers/Product.controller.js';

export const apiRoutes = Router();

apiRoutes.get('/products', getProducts);
// Aquí añadirás más rutas: /products/:id, /cart, /checkout, etc.
