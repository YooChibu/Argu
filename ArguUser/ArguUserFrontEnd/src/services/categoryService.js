/**
 * 카테고리 서비스 (Category Service)
 * 
 * 카테고리 관련 API 호출을 담당하는 서비스입니다.
 * 
 * 주요 기능:
 * - 전체 카테고리 목록 조회
 * - 카테고리 상세 정보 조회
 */

import api from './api'

export const categoryService = {
  /**
   * 전체 카테고리 목록 조회
   * 
   * 모든 카테고리 목록을 가져옵니다.
   * 
   * @returns {Promise<Object>} ApiResponse 구조의 응답 데이터
   * @returns {Array} response.data - Category[] (카테고리 목록)
   */
  async getAllCategories() {
    const response = await api.get('/categories')
    return response.data
  },

  /**
   * 카테고리 상세 정보 조회
   * 
   * ID로 특정 카테고리의 상세 정보를 가져옵니다.
   * 
   * @param {number} id - 카테고리 ID
   * @returns {Promise<Object>} ApiResponse 구조의 응답 데이터
   * @returns {Object} response.data - Category (카테고리 정보)
   */
  async getCategoryById(id) {
    const response = await api.get(`/categories/${id}`)
    return response.data
  },
}








