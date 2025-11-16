/**
 * 관리자 논쟁 관리 서비스
 * 
 * 논쟁 조회, 수정, 삭제, 숨김 처리 등 논쟁 관리 API를 호출하는 서비스입니다.
 */

import api from './api'

/**
 * 논쟁 목록 조회
 */
export const getArgus = async (params = {}) => {
  const { keyword, status, isHidden, page = 0, size = 20 } = params
  const response = await api.get('/admin/argu', {
    params: { keyword, status, isHidden, page, size }
  })
  return response
}

/**
 * 논쟁 상세 조회
 */
export const getArguDetail = async (id) => {
  const response = await api.get(`/admin/argu/${id}`)
  return response
}

/**
 * 논쟁 수정
 */
export const updateArgu = async (id, data) => {
  const { title, content, startDate, endDate } = data
  const response = await api.put(`/admin/argu/${id}`, null, {
    params: { title, content, startDate, endDate }
  })
  return response
}

/**
 * 논쟁 상태 변경
 */
export const updateArguStatus = async (id, status) => {
  const response = await api.put(`/admin/argu/${id}/status`, null, {
    params: { status }
  })
  return response
}

/**
 * 논쟁 숨김 처리
 */
export const toggleArguHidden = async (id) => {
  const response = await api.put(`/admin/argu/${id}/toggle-hidden`)
  return response
}

/**
 * 논쟁 삭제
 */
export const deleteArgu = async (id) => {
  const response = await api.delete(`/admin/argu/${id}`)
  return response
}

export const adminArguService = {
  getArgus,
  getArguDetail,
  updateArgu,
  updateArguStatus,
  toggleArguHidden,
  deleteArgu
}

