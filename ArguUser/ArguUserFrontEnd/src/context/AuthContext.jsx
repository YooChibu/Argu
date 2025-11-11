/**
 * 인증 컨텍스트 (Authentication Context)
 * 
 * 사용자 인증 상태를 전역적으로 관리하는 Context API입니다.
 * 
 * 주요 기능:
 * - 사용자 로그인/로그아웃 상태 관리
 * - JWT 토큰 관리
 * - 현재 로그인한 사용자 정보 관리
 * - 인증 상태에 따른 자동 사용자 정보 로딩
 */

import { createContext, useContext, useState, useEffect } from 'react'
import { authService } from '../services/authService'

// AuthContext 생성
const AuthContext = createContext(null)

/**
 * useAuth 훅
 * 
 * AuthContext를 사용하기 위한 커스텀 훅입니다.
 * AuthProvider 외부에서 사용하면 에러를 발생시킵니다.
 * 
 * @returns {Object} 인증 관련 상태 및 함수들
 * @throws {Error} AuthProvider 외부에서 사용 시 에러 발생
 */
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

/**
 * AuthProvider 컴포넌트
 * 
 * 인증 관련 상태와 함수를 제공하는 Provider 컴포넌트입니다.
 * 
 * @param {Object} props - 컴포넌트 props
 * @param {React.ReactNode} props.children - 자식 컴포넌트
 * @returns {JSX.Element} AuthContext.Provider
 */
export const AuthProvider = ({ children }) => {
  // 상태 관리
  const [user, setUser] = useState(null) // 현재 로그인한 사용자 정보
  const [token, setToken] = useState(localStorage.getItem('token')) // JWT 토큰
  const [loading, setLoading] = useState(true) // 로딩 상태 (초기 사용자 정보 로딩 중)

  /**
   * 토큰 변경 시 실행되는 useEffect
   * 
   * 토큰이 있으면:
   * - localStorage에 저장
   * - 사용자 정보를 서버에서 가져옴
   * 
   * 토큰이 없으면:
   * - localStorage에서 제거
   * - 로딩 상태 종료
   */
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

  /**
   * 현재 로그인한 사용자 정보 가져오기
   * 
   * 서버에서 현재 사용자의 정보를 조회합니다.
   * 실패 시 자동으로 로그아웃 처리합니다.
   */
  const fetchCurrentUser = async () => {
    try {
      const response = await authService.getCurrentUser()
      /**
       * ApiResponse 구조: { success: boolean, message: string, data: UserResponse }
       * success가 false인 경우 에러 처리
       * success가 true인 경우 data에서 사용자 정보 추출
       */
      if (!response.success) {
        throw new Error(response.message || '사용자 정보를 가져올 수 없습니다.')
      }
      
      // ApiResponse.data에서 UserResponse 추출
      const userData = response.data
      setUser(userData)
    } catch (error) {
      console.error('사용자 정보 가져오기 실패:', error)
      // 에러 발생 시 로그아웃 처리
      logout()
    } finally {
      setLoading(false)
    }
  }

  /**
   * 로그인 함수
   * 
   * 이메일 또는 아이디와 비밀번호로 로그인합니다.
   * 
   * @param {string} email - 이메일
   * @param {string} password - 비밀번호
   * @returns {Promise<Object>} 인증 응답 데이터 (token, user 포함)
   * @throws {Error} 로그인 실패 시 에러 발생
   */
  const login = async (email, password) => {
    const response = await authService.login(email, password)
    /**
     * ApiResponse 구조: { success: boolean, message: string, data: AuthResponse }
     * AuthResponse: { token: string, type: string, user: UserResponse }
     * 
     * success가 false인 경우 에러 발생
     * success가 true인 경우 data에서 토큰과 사용자 정보 추출
     */
    if (!response.success) {
      throw new Error(response.message || '로그인에 실패했습니다.')
    }
    
    // ApiResponse.data에서 AuthResponse 추출
    const authData = response.data
    if (!authData || !authData.token) {
      throw new Error('로그인 응답에 토큰이 없습니다.')
    }
    
    setToken(authData.token)
    setUser(authData.user)
    return authData
  }

  /**
   * 회원가입 함수
   * 
   * 새로운 사용자를 등록하고 자동으로 로그인합니다.
   * 
   * @param {Object} registerData - 회원가입 데이터 (email, password, nickname 등)
   * @returns {Promise<Object>} 인증 응답 데이터 (token, user 포함)
   * @throws {Error} 회원가입 실패 시 에러 발생
   */
  const register = async (registerData) => {
    const response = await authService.register(registerData)
    /**
     * ApiResponse 구조: { success: boolean, message: string, data: AuthResponse }
     * AuthResponse: { token: string, type: string, user: UserResponse }
     * 
     * success가 false인 경우 에러 발생
     * success가 true인 경우 data에서 토큰과 사용자 정보 추출
     */
    if (!response.success) {
      throw new Error(response.message || '회원가입에 실패했습니다.')
    }
    
    // ApiResponse.data에서 AuthResponse 추출
    const authData = response.data
    if (!authData || !authData.token) {
      throw new Error('회원가입 응답에 토큰이 없습니다.')
    }
    
    setToken(authData.token)
    setUser(authData.user)
    return authData
  }

  /**
   * 로그아웃 함수
   * 
   * 사용자 상태와 토큰을 초기화하고 localStorage에서 토큰을 제거합니다.
   */
  const logout = () => {
    setToken(null)
    setUser(null)
    localStorage.removeItem('token')
  }

  // Context에 제공할 값
  const value = {
    user, // 현재 사용자 정보
    token, // JWT 토큰
    loading, // 로딩 상태
    login, // 로그인 함수
    register, // 회원가입 함수
    logout, // 로그아웃 함수
    isAuthenticated: !!token // 인증 여부 (토큰 존재 여부)
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

