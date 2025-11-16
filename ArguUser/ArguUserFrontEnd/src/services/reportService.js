/**
 * 신고 서비스 (Report Service)
 * 
 * 콘텐츠 신고 관련 API 호출을 담당하는 서비스입니다.
 * 
 * 주요 기능:
 * - 논쟁, 댓글 등 콘텐츠 신고
 */

import api from './api'

export const reportService = {
  /**
   * 신고 생성
   * 
   * 부적절한 콘텐츠(논쟁, 댓글 등)를 신고합니다. 인증이 필요합니다.
   * 
   * @param {Object} reportData - 신고 데이터
   * @param {string} reportData.type - 신고 대상 타입 ('ARGU', 'COMMENT' 등)
   * @param {number} reportData.targetId - 신고 대상 ID (논쟁 ID 또는 댓글 ID)
   * @param {string} reportData.reason - 신고 사유
   * @param {string} [reportData.description] - 신고 상세 설명 (선택사항)
   * @returns {Promise<Object>} ApiResponse 구조의 응답 데이터
   * @returns {Object} response.data - ReportResponse (생성된 신고 정보)
   */
  async createReport(reportData) {
    const response = await api.post('/reports', reportData)
    return response.data
  },
}








