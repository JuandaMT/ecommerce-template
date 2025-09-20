export interface User {
  _id: string
  name: string
  email: string
  phone?: string
  addresses: Address[]
  role: 'user' | 'admin'
  isEmailVerified: boolean
  createdAt: string
  updatedAt?: string
}

export interface Address {
  street: string
  city: string
  state: string
  zipCode: string
  country: string
  isDefault?: boolean
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  name: string
  email: string
  password: string
  phone?: string
}

export interface AuthResponse {
  message: string
  user: User
  token: string
}

export interface AuthUser extends User {}

export interface AuthError {
  message: string
  code?: string
}