/**
 * 논쟁 서비스 (Argu Service)
 * 
 * 논쟁 관련 API 호출을 담당하는 서비스입니다.
 * 
 * 주요 기능:
 * - 논쟁 목록 조회 (페이징)
 * - 논쟁 상세 조회
 * - 논쟁 생성
 * - 논쟁 삭제
 * - 카테고리별 논쟁 조회
 * - 논쟁 검색
 */

import api from './api'

export const arguService = {
  /**
   * 전체 논쟁 목록 조회
   * 
   * 페이징된 논쟁 목록을 가져옵니다.
   * 
   * @param {number} page - 페이지 번호 (0부터 시작)
   * @param {number} size - 페이지당 항목 수
   * @returns {Promise<Object>} ApiResponse 구조의 응답 데이터
   * @returns {Object} response.data - Page<ArguResponse> (페이징된 논쟁 목록)
   */
  async getAllArgus(page = 0, size = 20) {
    const response = await api.get('/argu', {
      params: { page, size },
    })
    return response.data
  },

  /**
   * 논쟁 상세 정보 조회
   * 
   * ID로 특정 논쟁의 상세 정보를 가져옵니다.
   * 
   * @param {number} id - 논쟁 ID
   * @returns {Promise<Object>} ApiResponse 구조의 응답 데이터
   * @returns {Object} response.data - ArguResponse (논쟁 상세 정보)
   */
  async getArguById(id) {
    const response = await api.get(`/argu/${id}`)
    return response.data
  },

  /**
   * 논쟁 생성
   * 
   * 새로운 논쟁을 생성합니다. 인증이 필요합니다.
   * 
   * @param {Object} arguData - 논쟁 생성 데이터
   * @param {string} arguData.title - 논쟁 제목
   * @param {string} arguData.content - 논쟁 내용
   * @param {number} arguData.categoryId - 카테고리 ID
   * @param {string} arguData.startDate - 시작일시 (ISO 8601 형식)
   * @param {string} arguData.endDate - 종료일시 (ISO 8601 형식)
   * @returns {Promise<Object>} ApiResponse 구조의 응답 데이터
   * @returns {Object} response.data - ArguResponse (생성된 논쟁 정보)
   */
  async createArgu(arguData) {
    const response = await api.post('/argu', arguData)
    return response.data
  },

  /**
   * 논쟁 삭제
   * 
   * 논쟁을 삭제합니다. 작성자만 삭제 가능하며, 논쟁이 시작되기 전(SCHEDULED 상태)에만 삭제 가능합니다.
   * 
   * @param {number} id - 삭제할 논쟁 ID
   * @returns {Promise<Object>} ApiResponse 구조의 응답 데이터
   */
  async deleteArgu(id) {
    const response = await api.delete(`/argu/${id}`)
    return response.data
  },

  /**
   * 카테고리별 논쟁 목록 조회
   * 
   * 특정 카테고리의 논쟁 목록을 페이징하여 가져옵니다.
   * 
   * @param {number} categoryId - 카테고리 ID
   * @param {number} page - 페이지 번호 (0부터 시작)
   * @param {number} size - 페이지당 항목 수
   * @returns {Promise<Object>} ApiResponse 구조의 응답 데이터
   * @returns {Object} response.data - Page<ArguResponse> (페이징된 논쟁 목록)
   */
  async getArgusByCategory(categoryId, page = 0, size = 20) {
    const response = await api.get(`/argu/category/${categoryId}`, {
      params: { page, size },
    })
    return response.data
  },

  /**
   * 논쟁 검색
   * 
   * 키워드로 논쟁을 검색합니다. 제목과 내용에서 검색됩니다.
   * 
   * @param {string} keyword - 검색 키워드
   * @param {number} page - 페이지 번호 (0부터 시작)
   * @param {number} size - 페이지당 항목 수
   * @returns {Promise<Object>} ApiResponse 구조의 응답 데이터
   * @returns {Object} response.data - Page<ArguResponse> (검색된 논쟁 목록)
   */
  async searchArgus(keyword, page = 0, size = 20) {
    const response = await api.get('/argu/search', {
      params: { keyword, page, size },
    })
    return response.data
  },

  /**
   * 논쟁 수정
   * 
   * 논쟁을 수정합니다. 작성자만 수정 가능하며, 논쟁이 시작되기 전에만 수정 가능합니다.
   * 인증이 필요합니다.
   * 
   * @param {number} id - 논쟁 ID
   * @param {Object} arguData - 논쟁 수정 데이터
   * @param {string} [arguData.title] - 논쟁 제목 (선택적)
   * @param {string} [arguData.content] - 논쟁 내용 (선택적)
   * @param {number} [arguData.categoryId] - 카테고리 ID (선택적)
   * @param {string} [arguData.startDate] - 시작일시 (ISO 8601 형식, 선택적)
   * @param {string} [arguData.endDate] - 종료일시 (ISO 8601 형식, 선택적)
   * @returns {Promise<Object>} ApiResponse 구조의 응답 데이터
   * @returns {Object} response.data - ArguResponse (수정된 논쟁 정보)
   */
  async updateArgu(id, arguData) {
    const response = await api.put(`/argu/${id}`, arguData)
    return response.data
  },
}








