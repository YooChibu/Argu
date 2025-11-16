/**
 * 관리자 회원 관리 서비스
 * 
 * 회원 조회, 검색, 상태 변경 등 회원 관리 API를 호출하는 서비스입니다.
 */

import api from './api'

/**
 * 회원 목록 조회
 */
export const getUsers = async (params = {}) => {
  const { keyword, status, page = 0, size = 20 } = params
  const response = await api.get('/admin/users', {
    params: { keyword, status, page, size }
  })
  return response
}

/**
 * 회원 상세 조회
 */
export const getUserDetail = async (id) => {
  const response = await api.get(`/admin/users/${id}`)
  return response
}

/**
 * 회원 상태 변경
 */
export const updateUserStatus = async (id, status) => {
  const response = await api.put(`/admin/users/${id}/status`, null, {
    params: { status }
  })
  return response
}

/**
 * 회원 삭제
 */
export const deleteUser = async (id) => {
  const response = await api.delete(`/admin/users/${id}`)
  return response
}

export const adminUserService = {
  getUsers,
  getUserDetail,
  updateUserStatus,
  deleteUser
}

