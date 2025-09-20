import { ApiClient } from './apiClient'
import { AuthResponse, LoginCredentials, RegisterData, AuthUser } from '../../types/auth.types'

export class AuthService {
  constructor(private apiClient: ApiClient) {}

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await this.apiClient.post<AuthResponse>('/auth/login', credentials)

    if (response.token) {
      this.apiClient.setAuthToken(response.token)
    }

    return response
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await this.apiClient.post<AuthResponse>('/auth/register', data)

    if (response.token) {
      this.apiClient.setAuthToken(response.token)
    }

    return response
  }

  async logout(): Promise<void> {
    try {
      await this.apiClient.post('/auth/logout')
    } finally {
      this.apiClient.clearAuthToken()
    }
  }

  async getProfile(): Promise<{ user: AuthUser }> {
    return this.apiClient.get<{ user: AuthUser }>('/auth/profile')
  }

  async updateProfile(data: Partial<AuthUser>): Promise<{ user: AuthUser }> {
    return this.apiClient.put<{ user: AuthUser }>('/auth/profile', data)
  }

  async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    await this.apiClient.post('/auth/change-password', {
      currentPassword,
      newPassword
    })
  }

  async requestPasswordReset(email: string): Promise<void> {
    await this.apiClient.post('/auth/forgot-password', { email })
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    await this.apiClient.post('/auth/reset-password', {
      token,
      newPassword
    })
  }

  async verifyEmail(token: string): Promise<void> {
    await this.apiClient.post('/auth/verify-email', { token })
  }

  async resendVerificationEmail(): Promise<void> {
    await this.apiClient.post('/auth/resend-verification')
  }
}