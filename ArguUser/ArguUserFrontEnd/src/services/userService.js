/**
 * 사용자 서비스 (User Service)
 * 
 * 사용자 관련 API 호출을 담당하는 서비스입니다.
 * 
 * 주요 기능:
 * - 사용자 정보 조회 (ID 또는 아이디로)
 * - 프로필 수정
 */

import api from './api'

export const userService = {
  /**
   * 사용자 정보 조회 (ID로)
   * 
   * 사용자 ID로 사용자 정보를 가져옵니다.
   * 
   * @param {number} id - 사용자 ID
   * @returns {Promise<Object>} ApiResponse 구조의 응답 데이터
   * @returns {Object} response.data - UserResponse (사용자 정보)
   */
  async getUserById(id) {
    const response = await api.get(`/users/${id}`)
    return response.data
  },

  /**
   * 사용자 정보 조회 (아이디로)
   * 
   * 사용자 아이디로 사용자 정보를 가져옵니다.
   * 
   * @param {string} username - 사용자 아이디
   * @returns {Promise<Object>} ApiResponse 구조의 응답 데이터
   * @returns {Object} response.data - UserResponse (사용자 정보)
   */
  async getUserByUsername(username) {
    const response = await api.get(`/users/username/${username}`)
    return response.data
  },

  /**
   * 프로필 수정
   * 
   * 현재 로그인한 사용자의 프로필을 수정합니다. 인증이 필요합니다.
   * 
   * @param {string} nickname - 닉네임 (선택사항)
   * @param {string} bio - 자기소개 (선택사항)
   * @param {string} profileImage - 프로필 이미지 URL (선택사항)
   * @returns {Promise<Object>} ApiResponse 구조의 응답 데이터
   * @returns {Object} response.data - UserResponse (수정된 사용자 정보)
   */
  async updateProfile(nickname, bio, profileImage) {
    const response = await api.put('/users/me', null, {
      params: { nickname, bio, profileImage },
    })
    return response.data
  },
}








