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

export interface LoginData {
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

export interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
}

export interface AuthContextType {
  authState: AuthState
  login: (data: LoginData) => Promise<void>
  register: (data: RegisterData) => Promise<void>
  logout: () => void
  updateProfile: (data: Partial<User>) => Promise<void>
  checkAuthStatus: () => void
}