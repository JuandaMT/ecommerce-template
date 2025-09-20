import { Schema, Document, Connection, Types } from 'mongoose'

export interface IOrderItem {
  product: Types.ObjectId
  name: string
  price: number
  quantity: number
  imageUrl: string
}

export interface IShippingAddress {
  street: string
  city: string
  state: string
  zipCode: string
  country: string
}

export interface IPaymentMethod {
  type: 'credit_card' | 'paypal' | 'stripe'
  details: Record<string, any>
}

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refunded'

export interface IOrder extends Document {
  userId: Types.ObjectId
  items: IOrderItem[]
  shippingAddress: IShippingAddress
  paymentMethod: IPaymentMethod
  status: OrderStatus
  subtotal: number
  tax: number
  shipping: number
  discount?: number
  totalAmount: number
  trackingNumber?: string
  estimatedDelivery?: Date
  notes?: string
  createdAt: Date
  updatedAt: Date
}

const OrderItemSchema = new Schema<IOrderItem>(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    imageUrl: {
      type: String,
      required: true,
    },
  },
  { _id: false }
)

const ShippingAddressSchema = new Schema<IShippingAddress>(
  {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    country: { type: String, required: true },
  },
  { _id: false }
)

const PaymentMethodSchema = new Schema<IPaymentMethod>(
  {
    type: {
      type: String,
      enum: ['credit_card', 'paypal', 'stripe'],
      required: true,
    },
    details: {
      type: Schema.Types.Mixed,
      required: true,
    },
  },
  { _id: false }
)

const OrderSchema = new Schema<IOrder>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    items: {
      type: [OrderItemSchema],
      required: true,
      validate: {
        validator: (items: IOrderItem[]) => items.length > 0,
        message: 'Order must have at least one item',
      },
    },
    shippingAddress: {
      type: ShippingAddressSchema,
      required: true,
    },
    paymentMethod: {
      type: PaymentMethodSchema,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'],
      default: 'pending',
    },
    subtotal: {
      type: Number,
      required: true,
      min: 0,
    },
    tax: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    shipping: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    discount: {
      type: Number,
      min: 0,
      default: 0,
    },
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    trackingNumber: {
      type: String,
      trim: true,
    },
    estimatedDelivery: {
      type: Date,
    },
    notes: {
      type: String,
      maxlength: [500, 'Notes cannot exceed 500 characters'],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

// Indexes for better performance
OrderSchema.index({ userId: 1 })
OrderSchema.index({ status: 1 })
OrderSchema.index({ createdAt: -1 })
OrderSchema.index({ trackingNumber: 1 })
OrderSchema.index({ 'items.product': 1 })

// Pre-save middleware to calculate total amount
OrderSchema.pre('save', function(next) {
  this.totalAmount = this.subtotal + this.tax + this.shipping - (this.discount || 0)
  next()
})

// Factory function to create Order model for specific database connection
export const createOrderModel = (connection: Connection) => {
  return connection.model<IOrder>('Order', OrderSchema)
}

export default OrderSchema