/**
 * 관리자 대시보드 서비스
 * 
 * 대시보드 통계 및 최근 활동 조회 API를 호출하는 서비스입니다.
 */

import api from './api'

/**
 * 대시보드 통계 조회
 */
export const getStats = async () => {
  const response = await api.get('/admin/dashboard/stats')
  return response
}

/**
 * 최근 가입 회원 조회
 */
export const getRecentUsers = async (limit = 10) => {
  const response = await api.get('/admin/dashboard/recent-users', {
    params: { limit }
  })
  return response
}

/**
 * 인기 논쟁 조회
 */
export const getTopArgus = async (limit = 5) => {
  const response = await api.get('/admin/dashboard/top-argus', {
    params: { limit }
  })
  return response
}

/**
 * 미처리 신고 조회
 */
export const getPendingReports = async (limit = 10) => {
  const response = await api.get('/admin/dashboard/pending-reports', {
    params: { limit }
  })
  return response
}

export const adminDashboardService = {
  getStats,
  getRecentUsers,
  getTopArgus,
  getPendingReports
}

