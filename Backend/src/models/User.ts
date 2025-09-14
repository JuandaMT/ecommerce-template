import { Schema, model, Document } from 'mongoose'
import bcrypt from 'bcryptjs'

export interface IAddress {
	street: string
	city: string
	state: string
	zipCode: string
	country: string
	isDefault?: boolean
}

export interface IUser extends Document {
	name: string
	email: string
	password: string
	phone?: string
	addresses: IAddress[]
	role: 'user' | 'admin'
	isEmailVerified: boolean
	createdAt: Date
	updatedAt: Date
	comparePassword(candidatePassword: string): Promise<boolean>
}

const AddressSchema = new Schema<IAddress>(
	{
		street: { type: String, required: true },
		city: { type: String, required: true },
		state: { type: String, required: true },
		zipCode: { type: String, required: true },
		country: { type: String, required: true, default: 'Colombia' },
		isDefault: { type: Boolean, default: false },
	},
	{ _id: false }
)

const UserSchema = new Schema<IUser>(
	{
		name: {
			type: String,
			required: [true, 'El nombre es obligatorio'],
			trim: true,
			minlength: [2, 'El nombre debe tener al menos 2 caracteres'],
			maxlength: [50, 'El nombre no puede exceder 50 caracteres'],
		},
		email: {
			type: String,
			required: [true, 'El email es obligatorio'],
			unique: true,
			lowercase: true,
			trim: true,
			match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'El email no es válido'],
		},
		password: {
			type: String,
			required: [true, 'La contraseña es obligatoria'],
			minlength: [6, 'La contraseña debe tener al menos 6 caracteres'],
			select: false, // No incluir password en queries por defecto
		},
		phone: {
			type: String,
			trim: true,
			match: [/^[\+]?[1-9][\d]{0,15}$/, 'El número de teléfono no es válido'],
		},
		addresses: [AddressSchema],
		role: {
			type: String,
			enum: ['user', 'admin'],
			default: 'user',
		},
		isEmailVerified: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
		versionKey: false,
	}
)

// Middleware para hashear password antes de guardar
UserSchema.pre('save', async function (next) {
	// Solo hashear si el password fue modificado
	if (!this.isModified('password')) return next()

	try {
		// Hash password con cost de 12
		const salt = await bcrypt.genSalt(12)
		this.password = await bcrypt.hash(this.password, salt)
		next()
	} catch (error) {
		next(error as Error)
	}
})

// Método para comparar passwords
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
	return await bcrypt.compare(candidatePassword, this.password)
}

// Índices para mejor rendimiento
UserSchema.index({ email: 1 })
UserSchema.index({ createdAt: -1 })

export default model<IUser>('User', UserSchema)