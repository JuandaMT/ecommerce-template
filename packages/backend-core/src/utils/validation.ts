import Joi from 'joi'

export interface ValidationResult {
  isValid: boolean
  errors?: string[]
}

const userSchema = Joi.object({
  name: Joi.string().min(2).max(50).trim().required(),
  email: Joi.string().email().lowercase().trim().required(),
  password: Joi.string().min(6).required(),
  phone: Joi.string().pattern(/^[\+]?[1-9][\d]{0,15}$/).optional().allow(''),
})

const loginSchema = Joi.object({
  email: Joi.string().email().lowercase().trim().required(),
  password: Joi.string().required(),
})

const productSchema = Joi.object({
  name: Joi.string().max(200).trim().required(),
  description: Joi.string().max(2000).required(),
  price: Joi.number().min(0).required(),
  imageUrl: Joi.string().uri().required(),
  stock: Joi.number().min(0).required(),
  category: Joi.string().max(100).trim().optional(),
  tags: Joi.array().items(Joi.string().max(50).trim()).optional(),
  isActive: Joi.boolean().optional(),
  sku: Joi.string().trim().uppercase().optional(),
  weight: Joi.number().min(0).optional(),
  dimensions: Joi.object({
    length: Joi.number().min(0).required(),
    width: Joi.number().min(0).required(),
    height: Joi.number().min(0).required(),
  }).optional(),
  seoTitle: Joi.string().max(60).trim().optional(),
  seoDescription: Joi.string().max(160).trim().optional(),
})

const orderSchema = Joi.object({
  items: Joi.array().items(
    Joi.object({
      product: Joi.string().required(),
      quantity: Joi.number().min(1).required(),
    })
  ).min(1).required(),
  shippingAddress: Joi.object({
    street: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    zipCode: Joi.string().required(),
    country: Joi.string().required(),
  }).required(),
  paymentMethod: Joi.object({
    type: Joi.string().valid('credit_card', 'paypal', 'stripe').required(),
    details: Joi.object().required(),
  }).required(),
})

export const validateUserInput = (data: any): ValidationResult => {
  const { error } = userSchema.validate(data, { abortEarly: false })

  if (error) {
    return {
      isValid: false,
      errors: error.details.map(detail => detail.message),
    }
  }

  return { isValid: true }
}

export const validateLoginInput = (data: any): ValidationResult => {
  const { error } = loginSchema.validate(data, { abortEarly: false })

  if (error) {
    return {
      isValid: false,
      errors: error.details.map(detail => detail.message),
    }
  }

  return { isValid: true }
}

export const validateProductInput = (data: any): ValidationResult => {
  const { error } = productSchema.validate(data, { abortEarly: false })

  if (error) {
    return {
      isValid: false,
      errors: error.details.map(detail => detail.message),
    }
  }

  return { isValid: true }
}

export const validateOrderInput = (data: any): ValidationResult => {
  const { error } = orderSchema.validate(data, { abortEarly: false })

  if (error) {
    return {
      isValid: false,
      errors: error.details.map(detail => detail.message),
    }
  }

  return { isValid: true }
}

export const validateObjectId = (id: string): boolean => {
  return /^[0-9a-fA-F]{24}$/.test(id)
}