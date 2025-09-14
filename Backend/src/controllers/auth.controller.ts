import { Request, Response } from 'express'
import User, { IUser } from '../models/User.js'
import { generateToken } from '../middleware/auth.js'

// Registro de usuario
export const register = async (req: Request, res: Response) => {
	try {
		const { name, email, password, phone } = req.body

		// Validar campos requeridos
		if (!name || !email || !password) {
			return res.status(400).json({
				message: 'Nombre, email y contraseña son obligatorios',
				error: 'MISSING_FIELDS',
			})
		}

		// Verificar si el usuario ya existe
		const existingUser = await User.findOne({ email: email.toLowerCase() })
		if (existingUser) {
			return res.status(400).json({
				message: 'Ya existe un usuario con este email',
				error: 'USER_EXISTS',
			})
		}

		// Crear nuevo usuario
		const user = new User({
			name: name.trim(),
			email: email.toLowerCase().trim(),
			password,
			phone: phone?.trim(),
		})

		await user.save()

		// Generar token
		const token = generateToken(user)

		// Respuesta sin password
		const userResponse = {
			_id: user._id,
			name: user.name,
			email: user.email,
			phone: user.phone,
			addresses: user.addresses,
			role: user.role,
			isEmailVerified: user.isEmailVerified,
			createdAt: user.createdAt,
		}

		res.status(201).json({
			message: 'Usuario registrado exitosamente',
			user: userResponse,
			token,
		})
	} catch (error) {
		console.error('Error en registro:', error)

		// Manejar errores de validación de Mongoose
		if (error instanceof Error && error.name === 'ValidationError') {
			return res.status(400).json({
				message: 'Datos de usuario inválidos',
				error: 'VALIDATION_ERROR',
				details: error.message,
			})
		}

		res.status(500).json({
			message: 'Error interno del servidor',
			error: 'INTERNAL_ERROR',
		})
	}
}

// Login de usuario
export const login = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body

		// Validar campos requeridos
		if (!email || !password) {
			return res.status(400).json({
				message: 'Email y contraseña son obligatorios',
				error: 'MISSING_CREDENTIALS',
			})
		}

		// Buscar usuario (incluir password para comparación)
		const user = await User.findOne({ email: email.toLowerCase() }).select('+password')
		if (!user) {
			return res.status(401).json({
				message: 'Credenciales inválidas',
				error: 'INVALID_CREDENTIALS',
			})
		}

		// Verificar contraseña
		const isPasswordValid = await user.comparePassword(password)
		if (!isPasswordValid) {
			return res.status(401).json({
				message: 'Credenciales inválidas',
				error: 'INVALID_CREDENTIALS',
			})
		}

		// Generar token
		const token = generateToken(user)

		// Respuesta sin password
		const userResponse = {
			_id: user._id,
			name: user.name,
			email: user.email,
			phone: user.phone,
			addresses: user.addresses,
			role: user.role,
			isEmailVerified: user.isEmailVerified,
			createdAt: user.createdAt,
		}

		res.json({
			message: 'Login exitoso',
			user: userResponse,
			token,
		})
	} catch (error) {
		console.error('Error en login:', error)
		res.status(500).json({
			message: 'Error interno del servidor',
			error: 'INTERNAL_ERROR',
		})
	}
}

// Obtener perfil del usuario autenticado
export const getProfile = async (req: Request, res: Response) => {
	try {
		const user = req.user
		if (!user) {
			return res.status(401).json({
				message: 'Usuario no autenticado',
				error: 'NOT_AUTHENTICATED',
			})
		}

		// Respuesta sin password
		const userResponse = {
			_id: user._id,
			name: user.name,
			email: user.email,
			phone: user.phone,
			addresses: user.addresses,
			role: user.role,
			isEmailVerified: user.isEmailVerified,
			createdAt: user.createdAt,
			updatedAt: user.updatedAt,
		}

		res.json({
			message: 'Perfil obtenido exitosamente',
			user: userResponse,
		})
	} catch (error) {
		console.error('Error al obtener perfil:', error)
		res.status(500).json({
			message: 'Error interno del servidor',
			error: 'INTERNAL_ERROR',
		})
	}
}

// Actualizar perfil del usuario
export const updateProfile = async (req: Request, res: Response) => {
	try {
		const user = req.user
		if (!user) {
			return res.status(401).json({
				message: 'Usuario no autenticado',
				error: 'NOT_AUTHENTICATED',
			})
		}

		const { name, phone } = req.body

		// Actualizar solo campos permitidos
		if (name !== undefined) user.name = name.trim()
		if (phone !== undefined) user.phone = phone?.trim()

		await user.save()

		// Respuesta sin password
		const userResponse = {
			_id: user._id,
			name: user.name,
			email: user.email,
			phone: user.phone,
			addresses: user.addresses,
			role: user.role,
			isEmailVerified: user.isEmailVerified,
			createdAt: user.createdAt,
			updatedAt: user.updatedAt,
		}

		res.json({
			message: 'Perfil actualizado exitosamente',
			user: userResponse,
		})
	} catch (error) {
		console.error('Error al actualizar perfil:', error)

		if (error instanceof Error && error.name === 'ValidationError') {
			return res.status(400).json({
				message: 'Datos inválidos',
				error: 'VALIDATION_ERROR',
				details: error.message,
			})
		}

		res.status(500).json({
			message: 'Error interno del servidor',
			error: 'INTERNAL_ERROR',
		})
	}
}

// Agregar dirección
export const addAddress = async (req: Request, res: Response) => {
	try {
		const user = req.user
		if (!user) {
			return res.status(401).json({
				message: 'Usuario no autenticado',
				error: 'NOT_AUTHENTICATED',
			})
		}

		const { street, city, state, zipCode, country, isDefault } = req.body

		// Validar campos requeridos
		if (!street || !city || !state || !zipCode) {
			return res.status(400).json({
				message: 'Calle, ciudad, estado y código postal son obligatorios',
				error: 'MISSING_ADDRESS_FIELDS',
			})
		}

		// Si es dirección por defecto, desmarcar otras
		if (isDefault) {
			user.addresses.forEach(address => {
				address.isDefault = false
			})
		}

		// Agregar nueva dirección
		user.addresses.push({
			street: street.trim(),
			city: city.trim(),
			state: state.trim(),
			zipCode: zipCode.trim(),
			country: country?.trim() || 'Colombia',
			isDefault: isDefault || false,
		})

		await user.save()

		res.json({
			message: 'Dirección agregada exitosamente',
			addresses: user.addresses,
		})
	} catch (error) {
		console.error('Error al agregar dirección:', error)
		res.status(500).json({
			message: 'Error interno del servidor',
			error: 'INTERNAL_ERROR',
		})
	}
}

// Cambiar contraseña
export const changePassword = async (req: Request, res: Response) => {
	try {
		const user = req.user
		if (!user) {
			return res.status(401).json({
				message: 'Usuario no autenticado',
				error: 'NOT_AUTHENTICATED',
			})
		}

		const { currentPassword, newPassword } = req.body

		// Validar campos requeridos
		if (!currentPassword || !newPassword) {
			return res.status(400).json({
				message: 'Contraseña actual y nueva contraseña son obligatorias',
				error: 'MISSING_PASSWORDS',
			})
		}

		// Obtener usuario con password
		const userWithPassword = await User.findById(user._id).select('+password')
		if (!userWithPassword) {
			return res.status(404).json({
				message: 'Usuario no encontrado',
				error: 'USER_NOT_FOUND',
			})
		}

		// Verificar contraseña actual
		const isCurrentPasswordValid = await userWithPassword.comparePassword(currentPassword)
		if (!isCurrentPasswordValid) {
			return res.status(400).json({
				message: 'Contraseña actual incorrecta',
				error: 'INVALID_CURRENT_PASSWORD',
			})
		}

		// Actualizar contraseña
		userWithPassword.password = newPassword
		await userWithPassword.save()

		res.json({
			message: 'Contraseña cambiada exitosamente',
		})
	} catch (error) {
		console.error('Error al cambiar contraseña:', error)

		if (error instanceof Error && error.name === 'ValidationError') {
			return res.status(400).json({
				message: 'Nueva contraseña no válida',
				error: 'VALIDATION_ERROR',
				details: error.message,
			})
		}

		res.status(500).json({
			message: 'Error interno del servidor',
			error: 'INTERNAL_ERROR',
		})
	}
}