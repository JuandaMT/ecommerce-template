import { z } from 'zod'
import { addressSchema } from './authValidation'

export const paymentMethodSchema = z.object({
  type: z.enum(['credit_card', 'paypal', 'stripe']),
  details: z.record(z.any())
})

export const cartItemSchema = z.object({
  product: z.object({
    _id: z.string(),
    name: z.string(),
    price: z.number().positive(),
    imageUrl: z.string().url(),
    stock: z.number().min(0)
  }),
  quantity: z.number().positive().int(),
  addedAt: z.string().optional()
})

export const createOrderSchema = z.object({
  items: z
    .array(cartItemSchema)
    .min(1, 'At least one item is required'),
  shippingAddress: addressSchema,
  paymentMethod: paymentMethodSchema
}).refine((data) => {
  // Validate that all items have sufficient stock
  return data.items.every(item => item.quantity <= item.product.stock)
}, {
  message: 'Some items are out of stock',
  path: ['items']
})

export const updateOrderStatusSchema = z.object({
  status: z.enum([
    'pending',
    'confirmed',
    'processing',
    'shipped',
    'delivered',
    'cancelled',
    'refunded'
  ])
})

export const cancelOrderSchema = z.object({
  reason: z
    .string()
    .min(1, 'Cancellation reason is required')
    .max(500, 'Reason must be less than 500 characters')
    .optional()
})

export const returnOrderSchema = z.object({
  reason: z
    .string()
    .min(1, 'Return reason is required')
    .max(500, 'Reason must be less than 500 characters'),
  items: z
    .array(z.string())
    .optional()
})

export const trackingUpdateSchema = z.object({
  trackingNumber: z
    .string()
    .min(1, 'Tracking number is required'),
  carrier: z
    .string()
    .optional()
})

export const checkoutValidationSchema = z.object({
  step: z.enum(['shipping', 'payment', 'review']),
  shippingAddress: addressSchema.optional(),
  paymentMethod: paymentMethodSchema.optional(),
  terms: z.boolean().refine(val => val === true, {
    message: 'You must accept the terms and conditions'
  })
}).refine((data) => {
  if (data.step === 'payment' && !data.shippingAddress) {
    return false
  }
  if (data.step === 'review' && (!data.shippingAddress || !data.paymentMethod)) {
    return false
  }
  return true
}, {
  message: 'Required information is missing for this step'
})

export type CreateOrderFormData = z.infer<typeof createOrderSchema>
export type UpdateOrderStatusFormData = z.infer<typeof updateOrderStatusSchema>
export type CancelOrderFormData = z.infer<typeof cancelOrderSchema>
export type ReturnOrderFormData = z.infer<typeof returnOrderSchema>
export type TrackingUpdateFormData = z.infer<typeof trackingUpdateSchema>
export type CheckoutValidationFormData = z.infer<typeof checkoutValidationSchema>