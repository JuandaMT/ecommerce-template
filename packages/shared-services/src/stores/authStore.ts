import { create } from 'zustand'
import { persist, devtools } from 'zustand/middleware'
import { AuthUser, LoginCredentials, RegisterData } from '../types/auth.types'

interface AuthState {
  user: AuthUser | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null

  login: (credentials: LoginCredentials) => Promise<void>
  register: (data: RegisterData) => Promise<void>
  logout: () => void
  clearError: () => void
  updateUser: (user: Partial<AuthUser>) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  setToken: (token: string) => void
  checkAuthStatus: () => Promise<void>
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set, get) => ({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,

        login: async (credentials) => {
          set({ isLoading: true, error: null })
          try {
            // This will be implemented by the consuming application
            // using the authService from services
            throw new Error('Login implementation required in consuming app')
          } catch (error) {
            set({
              error: error instanceof Error ? error.message : 'Login failed',
              isLoading: false
            })
            throw error
          }
        },

        register: async (data) => {
          set({ isLoading: true, error: null })
          try {
            // This will be implemented by the consuming application
            throw new Error('Register implementation required in consuming app')
          } catch (error) {
            set({
              error: error instanceof Error ? error.message : 'Registration failed',
              isLoading: false
            })
            throw error
          }
        },

        logout: () => {
          set({ user: null, token: null, isAuthenticated: false, error: null })
        },

        clearError: () => set({ error: null }),

        updateUser: (userData) => set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null
        })),

        setLoading: (loading) => set({ isLoading: loading }),

        setError: (error) => set({ error }),

        setToken: (token) => set({ token, isAuthenticated: !!token }),

        checkAuthStatus: async () => {
          const { token } = get()
          if (!token) {
            set({ isLoading: false })
            return
          }

          set({ isLoading: true })
          try {
            // This will be implemented by the consuming application
            throw new Error('Auth check implementation required in consuming app')
          } catch (error) {
            set({
              user: null,
              token: null,
              isAuthenticated: false,
              isLoading: false
            })
          }
        }
      }),
      {
        name: 'auth-storage',
        partialize: (state) => ({
          user: state.user,
          token: state.token,
          isAuthenticated: state.isAuthenticated
        })
      }
    ),
    { name: 'AuthStore' }
  )
)