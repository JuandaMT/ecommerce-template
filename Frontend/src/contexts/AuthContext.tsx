import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react'
import { AuthState, AuthContextType, User, LoginData, RegisterData } from '../types/Auth'
import { authService } from '../services/authService'

interface ApiError {
  response?: {
    data?: {
      message?: string
    }
  }
}

type AuthAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'LOGIN_SUCCESS'; payload: { user: User; token: string } }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_USER'; payload: User }
  | { type: 'AUTH_ERROR'; payload: string }

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
}

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      }

    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
      }

    case 'UPDATE_USER':
      return {
        ...state,
        user: action.payload,
      }

    case 'LOGOUT':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      }

    case 'AUTH_ERROR':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      }

    default:
      return state
  }
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authState, dispatch] = useReducer(authReducer, initialState)

  // Verificar estado de autenticación al cargar la app
  const checkAuthStatus = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })

      const token = authService.storage.getToken()
      const savedUser = authService.storage.getUser()

      if (token && savedUser) {
        // Verificar que el token siga siendo válido
        try {
          const { user } = await authService.getProfile()
          dispatch({
            type: 'LOGIN_SUCCESS',
            payload: { user, token },
          })
        } catch {
          // Token inválido, limpiar storage
          authService.storage.clear()
          dispatch({ type: 'AUTH_ERROR', payload: 'Token expired' })
        }
      } else {
        dispatch({ type: 'SET_LOADING', payload: false })
      }
    } catch (error) {
      console.error('Error checking auth status:', error)
      dispatch({ type: 'AUTH_ERROR', payload: 'Auth check failed' })
    }
  }

  // Login
  const login = async (data: LoginData) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })

      const response = await authService.login(data)
      const { user, token } = response

      // Guardar en localStorage
      authService.storage.setToken(token)
      authService.storage.setUser(user)

      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: { user, token },
      })
    } catch (error) {
      console.error('Login error:', error)
      dispatch({ type: 'AUTH_ERROR', payload: (error as ApiError)?.response?.data?.message || 'Login failed' })
      throw new Error((error as ApiError)?.response?.data?.message || 'Login failed')
    }
  }

  // Registro
  const register = async (data: RegisterData) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })

      const response = await authService.register(data)
      const { user, token } = response

      // Guardar en localStorage
      authService.storage.setToken(token)
      authService.storage.setUser(user)

      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: { user, token },
      })
    } catch (error) {
      console.error('Register error:', error)
      dispatch({ type: 'AUTH_ERROR', payload: (error as ApiError)?.response?.data?.message || 'Register failed' })
      throw new Error((error as ApiError)?.response?.data?.message || 'Register failed')
    }
  }

  // Logout
  const logout = () => {
    authService.storage.clear()
    dispatch({ type: 'LOGOUT' })
  }

  // Actualizar perfil
  const updateProfile = async (data: Partial<User>) => {
    try {
      const response = await authService.updateProfile(data)
      const { user } = response

      // Actualizar localStorage
      authService.storage.setUser(user)

      dispatch({ type: 'UPDATE_USER', payload: user })
    } catch (error) {
      console.error('Update profile error:', error)
      throw new Error((error as ApiError)?.response?.data?.message || 'Update failed')
    }
  }

  // Verificar autenticación al montar el componente
  useEffect(() => {
    checkAuthStatus()
  }, [])

  const value: AuthContextType = {
    authState,
    login,
    register,
    logout,
    updateProfile,
    checkAuthStatus,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}