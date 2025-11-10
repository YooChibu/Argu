import api from './api'

export const authService = {
  async login(emailOrUsername, password) {
    const response = await api.post('/auth/login', {
      emailOrUsername,
      password,
    })
    // ApiResponse 구조: { success: boolean, message: string, data: AuthResponse }
    return response.data || response
  },

  async register(registerData) {
    const response = await api.post('/auth/register', registerData)
    // ApiResponse 구조: { success: boolean, message: string, data: AuthResponse }
    return response.data || response
  },

  async getCurrentUser() {
    const response = await api.get('/users/me')
    // ApiResponse 구조: { success: boolean, message: string, data: UserResponse }
    return response.data || response
  },
}

