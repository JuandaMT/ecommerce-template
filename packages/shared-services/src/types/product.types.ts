export interface Product {
  _id: string
  name: string
  description: string
  price: number
  imageUrl: string
  stock: number
  category?: string
  tags?: string[]
  isActive?: boolean
  createdAt?: string
  updatedAt?: string
}

export interface ProductFilter {
  category?: string
  minPrice?: number
  maxPrice?: number
  inStock?: boolean
  tags?: string[]
  search?: string
}

export interface ProductSort {
  field: 'name' | 'price' | 'createdAt'
  order: 'asc' | 'desc'
}

export interface ProductsResponse {
  products: Product[]
  total: number
  page: number
  totalPages: number
}