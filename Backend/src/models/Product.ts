import { Schema, model } from 'mongoose'

const ProductSchema = new Schema(
	{
		name: { type: String, required: true, trim: true },
		description: { type: String, required: true },
		price: { type: Number, required: true },
		imageUrl: { type: String, required: true },
		stock: { type: Number, required: true, default: 0 },
	},
	{
		timestamps: true, // Crea campos createdAt y updatedAt automáticamente
		versionKey: false,
	}
)

export default model('Product', ProductSchema)
