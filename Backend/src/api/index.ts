import { Router } from 'express';
import { getProducts } from '../controllers/Product.controller.js';
import {
	register,
	login,
	getProfile,
	updateProfile,
	addAddress,
	changePassword
} from '../controllers/auth.controller.js';
import { authenticateToken } from '../middleware/auth.js';

export const apiRoutes = Router();

// Rutas de productos (públicas)
apiRoutes.get('/products', getProducts);

// Rutas de autenticación (públicas)
apiRoutes.post('/auth/register', register);
apiRoutes.post('/auth/login', login);

// Rutas de usuario (protegidas)
apiRoutes.get('/auth/profile', authenticateToken, getProfile);
apiRoutes.put('/auth/profile', authenticateToken, updateProfile);
apiRoutes.post('/auth/addresses', authenticateToken, addAddress);
apiRoutes.put('/auth/change-password', authenticateToken, changePassword);

// Aquí añadirás más rutas: /products/:id, /orders, /checkout, etc.
