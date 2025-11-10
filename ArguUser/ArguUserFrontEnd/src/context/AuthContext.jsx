import { createContext, useContext, useState, useEffect } from 'react'
import { authService } from '../services/authService'

const AuthContext = createContext(null)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token)
      // 토큰이 있으면 사용자 정보 가져오기
      fetchCurrentUser()
    } else {
      localStorage.removeItem('token')
      setLoading(false)
    }
  }, [token])

  const fetchCurrentUser = async () => {
    try {
      const response = await authService.getCurrentUser()
      // ApiResponse 구조: { success: boolean, message: string, data: UserResponse }
      const userData = response.data || response
      setUser(userData)
    } catch (error) {
      console.error('사용자 정보 가져오기 실패:', error)
      logout()
    } finally {
      setLoading(false)
    }
  }

  const login = async (emailOrUsername, password) => {
    const response = await authService.login(emailOrUsername, password)
    // ApiResponse 구조: { success: boolean, message: string, data: AuthResponse }
    // AuthResponse: { token: string, type: string, user: UserResponse }
    const authData = response.data || response
    setToken(authData.token)
    setUser(authData.user)
    return authData
  }

  const register = async (registerData) => {
    const response = await authService.register(registerData)
    // ApiResponse 구조: { success: boolean, message: string, data: AuthResponse }
    // AuthResponse: { token: string, type: string, user: UserResponse }
    const authData = response.data || response
    setToken(authData.token)
    setUser(authData.user)
    return authData
  }

  const logout = () => {
    setToken(null)
    setUser(null)
    localStorage.removeItem('token')
  }

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!token
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

