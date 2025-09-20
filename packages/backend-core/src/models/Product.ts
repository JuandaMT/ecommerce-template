import { Schema, Document, Connection } from 'mongoose'

export interface IProduct extends Document {
  name: string
  description: string
  price: number
  imageUrl: string
  stock: number
  category?: string
  tags?: string[]
  isActive: boolean
  sku?: string
  weight?: number
  dimensions?: {
    length: number
    width: number
    height: number
  }
  seoTitle?: string
  seoDescription?: string
  createdAt: Date
  updatedAt: Date
}

const ProductSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
      maxlength: [200, 'Product name cannot exceed 200 characters'],
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
      maxlength: [2000, 'Product description cannot exceed 2000 characters'],
    },
    price: {
      type: Number,
      required: [true, 'Product price is required'],
      min: [0, 'Price cannot be negative'],
    },
    imageUrl: {
      type: String,
      required: [true, 'Product image is required'],
    },
    stock: {
      type: Number,
      required: [true, 'Product stock is required'],
      min: [0, 'Stock cannot be negative'],
      default: 0,
    },
    category: {
      type: String,
      trim: true,
      maxlength: [100, 'Category cannot exceed 100 characters'],
    },
    tags: [{
      type: String,
      trim: true,
      maxlength: [50, 'Tag cannot exceed 50 characters'],
    }],
    isActive: {
      type: Boolean,
      default: true,
    },
    sku: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
      uppercase: true,
    },
    weight: {
      type: Number,
      min: [0, 'Weight cannot be negative'],
    },
    dimensions: {
      length: {
        type: Number,
        min: [0, 'Length cannot be negative'],
      },
      width: {
        type: Number,
        min: [0, 'Width cannot be negative'],
      },
      height: {
        type: Number,
        min: [0, 'Height cannot be negative'],
      },
    },
    seoTitle: {
      type: String,
      trim: true,
      maxlength: [60, 'SEO title cannot exceed 60 characters'],
    },
    seoDescription: {
      type: String,
      trim: true,
      maxlength: [160, 'SEO description cannot exceed 160 characters'],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

// Indexes for better performance
ProductSchema.index({ name: 'text', description: 'text' })
ProductSchema.index({ category: 1 })
ProductSchema.index({ tags: 1 })
ProductSchema.index({ price: 1 })
ProductSchema.index({ stock: 1 })
ProductSchema.index({ isActive: 1 })
ProductSchema.index({ createdAt: -1 })
ProductSchema.index({ sku: 1 })

// Virtual for calculating availability
ProductSchema.virtual('isAvailable').get(function() {
  return this.isActive && this.stock > 0
})

// Ensure virtual fields are serialized
ProductSchema.set('toJSON', { virtuals: true })
ProductSchema.set('toObject', { virtuals: true })

// Factory function to create Product model for specific database connection
export const createProductModel = (connection: Connection) => {
  return connection.model<IProduct>('Product', ProductSchema)
}

export default ProductSchema