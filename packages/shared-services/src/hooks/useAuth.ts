import { useAuthStore } from '../stores/authStore'
import { LoginCredentials, RegisterData, AuthUser } from '../types/auth.types'
import { AuthService } from '../services/api/authService'
import { LocalStorageService } from '../services/storage/localStorage'

export const useAuth = (authService?: AuthService) => {
  const store = useAuthStore()
  const storage = new LocalStorageService()

  const login = async (credentials: LoginCredentials) => {
    if (!authService) {
      throw new Error('AuthService is required for login')
    }

    try {
      store.setLoading(true)
      store.clearError()

      const response = await authService.login(credentials)

      storage.setAuthToken(response.token)
      storage.setUser(response.user)

      store.setToken(response.token)
      store.updateUser(response.user)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Login failed'
      store.setError(message)
      throw error
    } finally {
      store.setLoading(false)
    }
  }

  const register = async (data: RegisterData) => {
    if (!authService) {
      throw new Error('AuthService is required for registration')
    }

    try {
      store.setLoading(true)
      store.clearError()

      const response = await authService.register(data)

      storage.setAuthToken(response.token)
      storage.setUser(response.user)

      store.setToken(response.token)
      store.updateUser(response.user)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Registration failed'
      store.setError(message)
      throw error
    } finally {
      store.setLoading(false)
    }
  }

  const logout = async () => {
    try {
      if (authService) {
        await authService.logout()
      }
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      storage.clearAuthToken()
      storage.clearUser()
      store.logout()
    }
  }

  const updateProfile = async (data: Partial<AuthUser>) => {
    if (!authService) {
      throw new Error('AuthService is required for profile update')
    }

    try {
      store.setLoading(true)
      store.clearError()

      const response = await authService.updateProfile(data)

      storage.setUser(response.user)
      store.updateUser(response.user)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Profile update failed'
      store.setError(message)
      throw error
    } finally {
      store.setLoading(false)
    }
  }

  const checkAuthStatus = async () => {
    if (!authService) {
      const token = storage.getAuthToken()
      const user = storage.getUser()

      if (token && user) {
        store.setToken(token)
        store.updateUser(user)
      }
      store.setLoading(false)
      return
    }

    try {
      store.setLoading(true)

      const token = storage.getAuthToken()
      if (!token) {
        store.setLoading(false)
        return
      }

      const response = await authService.getProfile()

      storage.setUser(response.user)
      store.updateUser(response.user)
      store.setToken(token)
    } catch (error) {
      storage.clearAuthToken()
      storage.clearUser()
      store.logout()
    } finally {
      store.setLoading(false)
    }
  }

  return {
    // State
    user: store.user,
    token: store.token,
    isAuthenticated: store.isAuthenticated,
    isLoading: store.isLoading,
    error: store.error,

    // Actions
    login,
    register,
    logout,
    updateProfile,
    checkAuthStatus,
    clearError: store.clearError,

    // Utilities
    hasRole: (role: string) => store.user?.role === role,
    isAdmin: () => store.user?.role === 'admin',
    isEmailVerified: () => store.user?.isEmailVerified || false
  }
}