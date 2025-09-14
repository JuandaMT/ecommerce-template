import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import User, { IUser } from '../models/User.js'

// Extender Request para incluir user
declare global {
	namespace Express {
		interface Request {
			user?: IUser
		}
	}
}

export interface JWTPayload {
	userId: string
	email: string
	role: string
}

const JWT_SECRET = process.env.JWT_SECRET || 'terracotta-ecommerce-secret-key-2024'
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d'

// Generar JWT token
export const generateToken = (user: IUser): string => {
	const payload: JWTPayload = {
		userId: user._id.toString(),
		email: user.email,
		role: user.role,
	}

	return jwt.sign(payload, JWT_SECRET, {
		expiresIn: JWT_EXPIRES_IN,
	})
}

// Middleware para verificar JWT token
export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const authHeader = req.headers.authorization
		const token = authHeader && authHeader.split(' ')[1] // Bearer TOKEN

		if (!token) {
			return res.status(401).json({
				message: 'Token de acceso requerido',
				error: 'NO_TOKEN',
			})
		}

		// Verificar token
		const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload

		// Buscar usuario en base de datos
		const user = await User.findById(decoded.userId)
		if (!user) {
			return res.status(401).json({
				message: 'Usuario no encontrado',
				error: 'USER_NOT_FOUND',
			})
		}

		// Agregar usuario al request
		req.user = user
		next()
	} catch (error) {
		if (error instanceof jwt.JsonWebTokenError) {
			return res.status(401).json({
				message: 'Token inválido',
				error: 'INVALID_TOKEN',
			})
		}

		if (error instanceof jwt.TokenExpiredError) {
			return res.status(401).json({
				message: 'Token expirado',
				error: 'TOKEN_EXPIRED',
			})
		}

		return res.status(500).json({
			message: 'Error de autenticación',
			error: 'AUTH_ERROR',
		})
	}
}

// Middleware para verificar rol de admin
export const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
	if (!req.user) {
		return res.status(401).json({
			message: 'Usuario no autenticado',
			error: 'NOT_AUTHENTICATED',
		})
	}

	if (req.user.role !== 'admin') {
		return res.status(403).json({
			message: 'Acceso denegado. Se requieren privilegios de administrador',
			error: 'ADMIN_REQUIRED',
		})
	}

	next()
}

// Middleware opcional de autenticación (para rutas que funcionan con o sin auth)
export const optionalAuth = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const authHeader = req.headers.authorization
		const token = authHeader && authHeader.split(' ')[1]

		if (token) {
			const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload
			const user = await User.findById(decoded.userId)
			if (user) {
				req.user = user
			}
		}
		next()
	} catch (error) {
		// Ignorar errores y continuar sin autenticación
		next()
	}
}