/**
 * 관리자 인증 컨텍스트 (Admin Authentication Context)
 * 
 * 관리자 인증 상태를 전역적으로 관리하는 Context API입니다.
 * 
 * 주요 기능:
 * - 관리자 로그인/로그아웃 상태 관리
 * - JWT 토큰 관리
 * - 현재 로그인한 관리자 정보 관리
 */

import { createContext, useContext, useState, useEffect } from 'react'
import { adminAuthService } from '../services/adminAuthService'

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
  const [admin, setAdmin] = useState(null) // 현재 로그인한 관리자 정보
  const [token, setToken] = useState(localStorage.getItem('adminToken')) // JWT 토큰
  const [loading, setLoading] = useState(true) // 로딩 상태

  /**
   * 토큰 변경 시 실행되는 useEffect
   */
  useEffect(() => {
    if (token) {
      localStorage.setItem('adminToken', token)
      // 토큰이 있으면 관리자 정보 가져오기
      fetchCurrentAdmin()
    } else {
      localStorage.removeItem('adminToken')
      setLoading(false)
    }
  }, [token])

  /**
   * 현재 로그인한 관리자 정보 가져오기
   */
  const fetchCurrentAdmin = async () => {
    try {
      // 토큰에서 관리자 정보 추출 (또는 별도 API 호출)
      // 현재는 토큰만으로 관리하므로, 필요시 별도 API 추가 가능
      setLoading(false)
    } catch (error) {
      console.error('관리자 정보 가져오기 실패:', error)
      logout()
    }
  }

  /**
   * 로그인 함수
   * 
   * @param {string} adminId - 관리자 아이디
   * @param {string} password - 비밀번호
   * @returns {Promise<Object>} 인증 응답 데이터
   */
  const login = async (adminId, password) => {
    const response = await adminAuthService.login(adminId, password)
    const authData = response.data || response
    setToken(authData.token)
    setAdmin(authData.admin)
    return authData
  }

  /**
   * 로그아웃 함수
   */
  const logout = () => {
    setToken(null)
    setAdmin(null)
    localStorage.removeItem('adminToken')
  }

  // Context에 제공할 값
  const value = {
    admin,
    token,
    loading,
    login,
    logout,
    isAuthenticated: !!token
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

