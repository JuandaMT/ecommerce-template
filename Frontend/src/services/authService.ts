import axios from 'axios'
import { LoginData, RegisterData, AuthResponse, User } from '../types/Auth'

const API_BASE_URL = 'http://localhost:5001/api/auth'

// Crear instancia de axios con configuración base
const authApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor para agregar token a las requests
authApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('terracotta-token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Interceptor para manejar respuestas y errores
authApi.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expirado o inválido
      localStorage.removeItem('terracotta-token')
      localStorage.removeItem('terracotta-user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export const authService = {
  // Registro de usuario
  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await authApi.post('/register', data)
    return response.data
  },

  // Login de usuario
  login: async (data: LoginData): Promise<AuthResponse> => {
    const response = await authApi.post('/login', data)
    return response.data
  },

  // Obtener perfil del usuario
  getProfile: async (): Promise<{ user: User }> => {
    const response = await authApi.get('/profile')
    return response.data
  },

  // Actualizar perfil del usuario
  updateProfile: async (data: Partial<User>): Promise<{ user: User }> => {
    const response = await authApi.put('/profile', data)
    return response.data
  },

  // Agregar dirección
  addAddress: async (address: {
    street: string
    city: string
    state: string
    zipCode: string
    country?: string
    isDefault?: boolean
  }): Promise<{ addresses: User['addresses'] }> => {
    const response = await authApi.post('/addresses', address)
    return response.data
  },

  // Cambiar contraseña
  changePassword: async (data: {
    currentPassword: string
    newPassword: string
  }): Promise<{ message: string }> => {
    const response = await authApi.put('/change-password', data)
    return response.data
  },

  // Funciones de utilidad para localStorage
  storage: {
    setToken: (token: string) => {
      localStorage.setItem('terracotta-token', token)
    },

    getToken: (): string | null => {
      return localStorage.getItem('terracotta-token')
    },

    removeToken: () => {
      localStorage.removeItem('terracotta-token')
    },

    setUser: (user: User) => {
      localStorage.setItem('terracotta-user', JSON.stringify(user))
    },

    getUser: (): User | null => {
      const user = localStorage.getItem('terracotta-user')
      return user ? JSON.parse(user) : null
    },

    removeUser: () => {
      localStorage.removeItem('terracotta-user')
    },

    clear: () => {
      localStorage.removeItem('terracotta-token')
      localStorage.removeItem('terracotta-user')
    },
  },
}