/**
 * 관리자 인증 서비스
 * 
 * 관리자 로그인 등 인증 관련 API를 호출하는 서비스입니다.
 */

import api from './api'

/**
 * 관리자 로그인
 * 
 * @param {string} adminId - 관리자 아이디
 * @param {string} password - 비밀번호
 * @returns {Promise<Object>} ApiResponse<AdminAuthResponse>
 */
export const login = async (adminId, password) => {
  const response = await api.post('/admin/auth/login', {
    adminId,
    password
  })
  return response
}

export const adminAuthService = {
  login
}

