/**
 * 마이페이지 서비스 (MyPage Service)
 * 
 * 마이페이지 관련 API 호출을 담당하는 서비스입니다.
 * 
 * 주요 기능:
 * - 내 논쟁 목록 조회
 * - 내 댓글 목록 조회
 * - 참여한 논쟁 목록 조회 (내 의견 목록)
 */

import api from './api'

export const myPageService = {
  /**
   * 내 논쟁 목록 조회
   * 
   * 현재 로그인한 사용자가 작성한 논쟁 목록을 페이징하여 가져옵니다.
   * 인증이 필요합니다.
   * 
   * @param {number} page - 페이지 번호 (0부터 시작)
   * @param {number} size - 페이지당 항목 수
   * @returns {Promise<Object>} ApiResponse 구조의 응답 데이터
   * @returns {Object} response.data - Page<ArguResponse> (페이징된 논쟁 목록)
   */
  async getMyArgus(page = 0, size = 20) {
    const response = await api.get('/my/argu', {
      params: { page, size },
    })
    return response.data
  },

  /**
   * 내 댓글 목록 조회
   * 
   * 현재 로그인한 사용자가 작성한 댓글 목록을 페이징하여 가져옵니다.
   * 인증이 필요합니다.
   * 
   * @param {number} page - 페이지 번호 (0부터 시작)
   * @param {number} size - 페이지당 항목 수
   * @returns {Promise<Object>} ApiResponse 구조의 응답 데이터
   * @returns {Object} response.data - Page<CommentResponse> (페이징된 댓글 목록)
   */
  async getMyComments(page = 0, size = 20) {
    const response = await api.get('/my/comments', {
      params: { page, size },
    })
    return response.data
  },

  /**
   * 참여한 논쟁 목록 조회 (내 의견 목록)
   * 
   * 현재 로그인한 사용자가 입장을 선택한 논쟁 목록을 가져옵니다.
   * 인증이 필요합니다.
   * 
   * @returns {Promise<Object>} ApiResponse 구조의 응답 데이터
   * @returns {Array} response.data - OpinionResponse[] (의견 목록)
   */
  async getMyOpinions() {
    const response = await api.get('/my/opinions')
    return response.data
  },

  /**
   * 받은 좋아요 목록 조회
   * 
   * 현재 로그인한 사용자가 작성한 논쟁 중 좋아요를 받은 논쟁 목록을 좋아요 수가 많은 순으로 가져옵니다.
   * 인증이 필요합니다.
   * 
   * @param {number} page - 페이지 번호 (0부터 시작)
   * @param {number} size - 페이지당 항목 수
   * @returns {Promise<Object>} ApiResponse 구조의 응답 데이터
   * @returns {Object} response.data - Page<ArguResponse> (페이징된 논쟁 목록)
   */
  async getMyLikedArgus(page = 0, size = 20) {
    const response = await api.get('/my/likes', {
      params: { page, size },
    })
    return response.data
  },
}

