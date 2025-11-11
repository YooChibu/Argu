/**
 * 인증 서비스 (Authentication Service)
 * 
 * 사용자 인증 관련 API 호출을 담당하는 서비스입니다.
 * 
 * 주요 기능:
 * - 로그인
 * - 회원가입
 * - 현재 사용자 정보 조회
 */

import api from './api'

export const authService = {
  /**
   * 로그인
   * 
   * 이메일 또는 아이디와 비밀번호로 로그인합니다.
   * 
   * @param {string} emailOrUsername - 이메일 또는 아이디
   * @param {string} password - 비밀번호
   * @returns {Promise<Object>} ApiResponse 구조의 응답 데이터
   * @returns {Object} response - ApiResponse { success: boolean, message: string, data: AuthResponse }
   * @returns {Object} response.data - AuthResponse { token: string, type: string, user: UserResponse }
   */
  async login(emailOrUsername, password) {
    // 인터셉터가 이미 ApiResponse 구조를 반환하므로 그대로 사용
    const response = await api.post('/auth/login', {
      emailOrUsername,
      password,
    })
    // ApiResponse 구조: { success: boolean, message: string, data: AuthResponse }
    // 인터셉터에서 이미 ApiResponse를 반환하므로 response가 ApiResponse입니다
    return response
  },

  /**
   * 회원가입
   * 
   * 새로운 사용자를 등록합니다.
   * 
   * @param {Object} registerData - 회원가입 데이터
   * @param {string} registerData.email - 이메일
   * @param {string} registerData.username - 아이디
   * @param {string} registerData.password - 비밀번호
   * @param {string} registerData.nickname - 닉네임
   * @returns {Promise<Object>} ApiResponse 구조의 응답 데이터
   * @returns {Object} response - ApiResponse { success: boolean, message: string, data: AuthResponse }
   * @returns {Object} response.data - AuthResponse { token: string, type: string, user: UserResponse }
   */
  async register(registerData) {
    // 인터셉터가 이미 ApiResponse 구조를 반환하므로 그대로 사용
    const response = await api.post('/auth/register', registerData)
    // ApiResponse 구조: { success: boolean, message: string, data: AuthResponse }
    // 인터셉터에서 이미 ApiResponse를 반환하므로 response가 ApiResponse입니다
    return response
  },

  /**
   * 현재 로그인한 사용자 정보 조회
   * 
   * JWT 토큰을 기반으로 현재 사용자의 정보를 가져옵니다.
   * 
   * @returns {Promise<Object>} ApiResponse 구조의 응답 데이터
   * @returns {Object} response - ApiResponse { success: boolean, message: string, data: UserResponse }
   * @returns {Object} response.data - UserResponse (사용자 정보)
   */
  async getCurrentUser() {
    // 인터셉터가 이미 ApiResponse 구조를 반환하므로 그대로 사용
    const response = await api.get('/users/me')
    // ApiResponse 구조: { success: boolean, message: string, data: UserResponse }
    // 인터셉터에서 이미 ApiResponse를 반환하므로 response가 ApiResponse입니다
    return response
  },
}

